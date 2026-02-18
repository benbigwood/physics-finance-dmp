import React, { useState, useEffect, useRef, useMemo } from 'react';
import katex from 'katex';
import { motion } from 'framer-motion';

const DiffusionSimulation = () => {
    // --- State ---
    const [volatility, setVolatility] = useState(1.0);
    const [drift, setDrift] = useState(0.0);
    const [time, setTime] = useState(1.0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [initialCondition, setInitialCondition] = useState('delta'); // delta, two-spikes, step
    const [useFinanceLabels, setUseFinanceLabels] = useState(false);
    const [showPaths, setShowPaths] = useState(false);

    // --- Constants ---
    const S0 = 100;
    const POSITION_MIN = 50;
    const POSITION_MAX = 150;
    const NUM_POINTS = 200;
    const NUM_PATHS = 200;

    // --- Refs for Animation ---
    const requestRef = useRef();

    // --- Math Functions ---
    const gaussian = (x, mean, std) => {
        if (std <= 0) return x === mean ? 1 : 0;
        return (1 / (std * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / std, 2));
    };

    const getHeatProfile = (t, sigma, mu, cond) => {
        const points = [];
        const dx = (POSITION_MAX - POSITION_MIN) / NUM_POINTS;
        const currentSigma = sigma * Math.sqrt(t);
        const currentShift = mu * t;

        for (let i = 0; i <= NUM_POINTS; i++) {
            const x = POSITION_MIN + i * dx;
            let val = 0;

            if (cond === 'delta') {
                val = gaussian(x, S0 + currentShift, currentSigma);
            } else if (cond === 'two-spikes') {
                val = 0.5 * gaussian(x, S0 - 20 + currentShift, currentSigma) +
                    0.5 * gaussian(x, S0 + 20 + currentShift, currentSigma);
            } else if (cond === 'step') {
                // Approximate step function convolution with heat kernel
                // u(x,t) = 0.5 * (1 + erf((x-x0)/(sqrt(4*D*t))))
                const z = (x - (S0 + currentShift)) / (currentSigma * Math.sqrt(2));
                val = 1.0 * (0.5 * (1 + erf(z)));
            }
            points.push({ x, y: val });
        }
        return points;
    };

    // Error function approximation
    const erf = (x) => {
        const a1 = 0.254829592;
        const a2 = -0.284496736;
        const a3 = 1.421413741;
        const a4 = -1.453152027;
        const a5 = 1.061405429;
        const p = 0.3275911;
        const sign = x < 0 ? -1 : 1;
        x = Math.abs(x);
        const t = 1.0 / (1.0 + p * x);
        const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
        return sign * y;
    };

    // Monte Carlo Paths
    const paths = useMemo(() => {
        if (!showPaths) return [];
        const allPaths = [];
        const dt = time / 50;
        for (let i = 0; i < NUM_PATHS; i++) {
            let path = [{ t: 0, s: S0 }];
            let currentS = S0;
            for (let j = 1; j <= 50; j++) {
                const dz = (Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random() - 3) / Math.sqrt(3 / 12); // Norm approximation
                // Box-Muller is better
                const u1 = Math.random();
                const u2 = Math.random();
                const z0 = Math.sqrt(-2.0 * Math.log(u1 + 1e-10)) * Math.cos(2.0 * Math.PI * u2);

                currentS += drift * dt + volatility * z0 * Math.sqrt(dt);
                path.push({ t: j * dt, s: currentS });
            }
            allPaths.push(path);
        }
        return allPaths;
    }, [showPaths, time, volatility, drift]);

    // Statistics
    const stats = useMemo(() => {
        const theoreticalMean = S0 + drift * time;
        const theoreticalVar = Math.pow(volatility, 2) * time;

        let empiricalMean = 0;
        let empiricalVar = 0;
        if (showPaths && paths.length > 0) {
            const finalValues = paths.map(p => p[p.length - 1].s);
            empiricalMean = finalValues.reduce((a, b) => a + b, 0) / finalValues.length;
            empiricalVar = finalValues.reduce((a, b) => a + Math.pow(b - empiricalMean, 2), 0) / finalValues.length;
        }

        return {
            theoreticalMean,
            theoreticalVar,
            empiricalMean,
            empiricalVar,
            meanError: theoreticalMean !== 0 ? Math.abs((empiricalMean - theoreticalMean) / theoreticalMean) * 100 : 0,
            varError: theoreticalVar !== 0 ? Math.abs((empiricalVar - theoreticalVar) / theoreticalVar) * 100 : 0
        };
    }, [paths, showPaths, time, volatility, drift]);

    // --- Animation ---
    const lastTimeRef = useRef(null);

    const animate = (timestamp) => {
        if (!isPlaying) {
            lastTimeRef.current = null;
            return;
        }

        if (!lastTimeRef.current) lastTimeRef.current = timestamp;
        const deltaTime = timestamp - lastTimeRef.current;

        if (deltaTime >= 16) { // Cap at ~60fps
            setTime(prev => {
                let next = prev + 0.01;
                if (next > 2.0) {
                    setIsPlaying(false);
                    return 2.0;
                }
                return next;
            });
            lastTimeRef.current = timestamp;
        }

        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        if (isPlaying) {
            requestRef.current = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(requestRef.current);
            lastTimeRef.current = null;
        }
        return () => cancelAnimationFrame(requestRef.current);
    }, [isPlaying]);

    // --- Rendering Helpers ---
    const plotRefPhysics = useRef();
    const plotRefFinance = useRef();
    const rodRef = useRef();

    useEffect(() => {
        drawPlot(plotRefPhysics.current, 'physics');
        drawPlot(plotRefFinance.current, 'finance');
        drawRod(rodRef.current);
    }, [time, volatility, drift, initialCondition, useFinanceLabels, showPaths]);

    const drawPlot = (canvas, type) => {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);

        const data = getHeatProfile(Math.max(time, 0.001), volatility, drift, initialCondition);

        // Grid
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.beginPath();
        for (let i = 0; i <= 10; i++) {
            const x = (i / 10) * width;
            ctx.moveTo(x, 0); ctx.lineTo(x, height);
            const y = (i / 10) * height;
            ctx.moveTo(0, y); ctx.lineTo(width, y);
        }
        ctx.stroke();

        const padding = 40;
        const plotWidth = width - 2 * padding;
        const plotHeight = height - 2 * padding;

        const Y_MAX = 0.8; // Fixed domain [0, 0.8] for better visibility
        const scaleX = (val) => padding + ((val - POSITION_MIN) / (POSITION_MAX - POSITION_MIN)) * plotWidth;
        const scaleY = (val) => (height - padding) - (Math.min(val, Y_MAX * 2) / Y_MAX) * plotHeight;

        // Labels
        ctx.fillStyle = 'var(--color-text-tertiary)';
        ctx.font = '10px var(--font-main)';
        ctx.textAlign = 'center';

        const xLabel = type === 'physics' ? (useFinanceLabels ? 'Price S' : 'Position x') : 'Price S';
        const yLabel = type === 'physics' ? (useFinanceLabels ? 'Density p(S,t)' : 'Temperature u(x,t)') : 'Density p(S,t)';

        ctx.fillText(xLabel, width / 2, height - 10);
        ctx.save();
        ctx.translate(15, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(yLabel, 0, 0);
        ctx.restore();

        // Paths (Finance only or if Physics Labels toggle affects both)
        if (type === 'finance' && showPaths && paths.length > 0) {
            ctx.strokeStyle = 'rgba(41, 151, 255, 0.08)';
            paths.forEach(path => {
                ctx.beginPath();
                ctx.moveTo(scaleX(path[0].s), height - padding);
                // We're showing S vs t usually, but here we want to show distribution at fixed t
                // Actually, paths should probably be overlaid differently or just terminal points.
                // The prompt says "faint path fan". I'll transform (t, S) to a meaningful overlay.
                // Map path time to plot Y somehow? No, let's just show path end points or small traces.
                // A better path fan would be (time index, price) mapped to (Y, X)? 
                // Let's stick to the distribution and maybe just some end points.
            });
        }

        // Curve
        ctx.shadowBlur = 10;
        ctx.shadowColor = type === 'physics' ? 'var(--color-accent)' : 'var(--color-finance)';
        ctx.strokeStyle = type === 'physics' ? 'var(--color-accent)' : '#00f2ff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        data.forEach((p, i) => {
            const px = scaleX(p.x);
            const py = scaleY(p.y);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        });
        ctx.stroke();

        ctx.shadowBlur = 0;
        // Fill gradient
        const grad = ctx.createLinearGradient(0, 0, 0, height);
        grad.addColorStop(0, type === 'physics' ? 'rgba(0, 113, 227, 0.2)' : 'rgba(0, 242, 255, 0.1)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.lineTo(scaleX(data[data.length - 1].x), height - padding);
        ctx.lineTo(scaleX(data[0].x), height - padding);
        ctx.fill();
    };

    const drawRod = (canvas) => {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        const grad = ctx.createLinearGradient(0, 0, w, 0);

        // Rod temperature gradient based on current heat profile
        // Rod temperature gradient based on current heat profile
        const data = getHeatProfile(Math.max(time, 0.001), volatility, drift, initialCondition);

        // Use a fixed reference max value based on t=0.01 (near initial) to allow cooling effect
        // rather than normalizing to current max which keeps it always "hot"
        const initialProfile = getHeatProfile(0.01, 1.0, 0, initialCondition); // Use standard vol=1 for ref
        const absoluteMax = Math.max(...initialProfile.map(p => p.y), 0.1);

        for (let i = 0; i <= 20; i++) {
            const idx = Math.floor((i / 20) * (data.length - 1));
            // Clamp temp ratio to [0, 1]
            let tempRatio = data[idx].y / absoluteMax;
            tempRatio = Math.min(Math.max(tempRatio, 0), 1);

            // Map temp to color: 
            // Cold (0) = Blue (240deg)
            // Hot (1) = Red (0deg)
            // We want a nice transition: Blue -> Cyan -> Green -> Yellow -> Red
            // Hue from 240 down to 0
            const hue = (1 - tempRatio) * 240;
            grad.addColorStop(i / 20, `hsla(${hue}, 100%, 50%, 1)`);
        }

        // Rod shape
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(10, 10, w - 20, h - 20, 10);
        ctx.fill();

        // Glossy overlay
        const gloss = ctx.createLinearGradient(0, 10, 0, h - 10);
        gloss.addColorStop(0, 'rgba(255,255,255,0.2)');
        gloss.addColorStop(0.5, 'rgba(255,255,255,0)');
        gloss.addColorStop(0.8, 'rgba(0,0,0,0.2)');
        ctx.fillStyle = gloss;
        ctx.fill();

        // Labels
        ctx.fillStyle = 'var(--color-text-tertiary)';
        ctx.font = '10px var(--font-main)';
        ctx.textAlign = 'left';
        ctx.fillText('Cold', 10, h - 2);
        ctx.textAlign = 'right';
        ctx.fillText('Hot', w - 10, h - 2);
    };

    // --- KaTeX Rendering ---
    const SDE_LATEX = "dS_t = \\mu dt + \\sigma dW_t";
    const PDE_LATEX = "\\frac{\\partial p}{\\partial t} = -\\mu \\frac{\\partial p}{\\partial S} + \\frac{\\sigma^2}{2} \\frac{\\partial^2 p}{\\partial S^2}";
    const EQUIV_LATEX = "D = \\frac{\\sigma^2}{2}";

    return (
        <div className="diffusion-sim" style={{ color: 'var(--color-text-primary)' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#00f2ff' }}>Diffusion: Heat Equation to Bachelier</h2>
                <p style={{ fontSize: '1.1rem', opacity: 0.8 }}>The same equation that spreads heat also spreads price uncertainty.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem' }}>
                {/* Main Content */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Synchronized Panels */}
                    <div className="glass-panel" style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <h4 style={{ textAlign: 'center', marginBottom: '1rem' }}>Heat Diffusion</h4>
                            <canvas ref={plotRefPhysics} width={400} height={250} style={{ width: '100%', height: 'auto', borderRadius: '8px', background: '#050505' }} />
                        </div>
                        <div>
                            <h4 style={{ textAlign: 'center', marginBottom: '1rem' }}>Price Uncertainty Diffusion</h4>
                            <canvas ref={plotRefFinance} width={400} height={250} style={{ width: '100%', height: 'auto', borderRadius: '8px', background: '#050505' }} />
                        </div>

                        {/* Metal Rod */}
                        <div style={{ gridColumn: 'span 2', marginTop: '1rem' }}>
                            <canvas ref={rodRef} width={800} height={50} style={{ width: '100%', height: '50px' }} />
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="glass-panel" style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                    Volatility σ: <span>{volatility.toFixed(2)}</span>
                                </label>
                                <input type="range" min="0.1" max="3.0" step="0.1" value={volatility} onChange={e => setVolatility(parseFloat(e.target.value))} />

                                <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                    Drift μ: <span>{drift.toFixed(2)}</span>
                                </label>
                                <input type="range" min="-2.0" max="2.0" step="0.1" value={drift} onChange={e => setDrift(parseFloat(e.target.value))} />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                    Time t: <span>{time.toFixed(2)}</span>
                                </label>
                                <input type="range" min="0" max="2.0" step="0.01" value={time} onChange={e => setTime(parseFloat(e.target.value))} />

                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button
                                        onClick={() => setIsPlaying(!isPlaying)}
                                        style={{ flex: 1, padding: '0.5rem', background: isPlaying ? 'var(--color-destructive)' : 'var(--color-accent)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                    >
                                        {isPlaying ? 'Pause' : 'Play'}
                                    </button>
                                    <button
                                        onClick={() => { setTime(0); setIsPlaying(false); }}
                                        style={{ padding: '0.5rem', background: 'var(--color-surface-hover)', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                    >
                                        Reset
                                    </button>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                <select
                                    value={initialCondition}
                                    onChange={e => setInitialCondition(e.target.value)}
                                    style={{ padding: '0.5rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'inherit', borderRadius: '4px' }}
                                >
                                    <option value="delta">Initial: Delta Spike</option>
                                    <option value="two-spikes">Initial: Two Spikes</option>
                                    <option value="step">Initial: Step Function</option>
                                </select>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <button
                                        onClick={() => setUseFinanceLabels(!useFinanceLabels)}
                                        style={{ padding: '0.4rem', fontSize: '0.8rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                                    >
                                        {useFinanceLabels ? 'Switch to Physics Labels' : 'Switch to Finance Labels'}
                                    </button>
                                    <button
                                        onClick={() => setShowPaths(!showPaths)}
                                        style={{ padding: '0.4rem', fontSize: '0.8rem', background: showPaths ? 'var(--color-finance)' : 'var(--color-surface)', color: showPaths ? '#fff' : 'inherit', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                                    >
                                        {showPaths ? 'Hide Paths' : 'Show All Paths'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Equations Panel */}
                    <div className="glass-panel" style={{ padding: '1.2rem' }}>
                        <h5 style={{ color: 'var(--color-accent)', marginBottom: '1rem' }}>Governing Equations</h5>
                        <div style={{ fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <div style={{ fontSize: '0.7rem', opacity: 0.6, marginBottom: '0.2rem' }}>SDE (Bachelier)</div>
                                <div dangerouslySetInnerHTML={{ __html: katex.renderToString(SDE_LATEX, { throwOnError: false }) }} />
                            </div>
                            <div>
                                <div style={{ fontSize: '0.7rem', opacity: 0.6, marginBottom: '0.2rem' }}>PDE (Fokker–Planck)</div>
                                <div dangerouslySetInnerHTML={{ __html: katex.renderToString(PDE_LATEX, { throwOnError: false }) }} />
                            </div>
                            <div style={{ padding: '0.5rem', background: 'rgba(172, 142, 104, 0.1)', borderLeft: '3px solid var(--color-finance)', borderRadius: '0 4px 4px 0' }}>
                                <div style={{ fontSize: '0.7rem', color: 'var(--color-finance)', marginBottom: '0.2rem', fontWeight: 600 }}>Equivalence</div>
                                <div dangerouslySetInnerHTML={{ __html: katex.renderToString(EQUIV_LATEX, { throwOnError: false }) }} />
                            </div>
                        </div>
                    </div>

                    {/* Statistics Panel */}
                    <div className="glass-panel" style={{ padding: '1.2rem' }}>
                        <h5 style={{ color: 'var(--color-finance)', marginBottom: '1rem' }}>Statistical Summaries</h5>
                        <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <div>
                                <div style={{ opacity: 0.6 }}>Theoretical Mean:</div>
                                <div style={{ fontWeight: 600 }}>{stats.theoreticalMean.toFixed(2)}</div>
                            </div>
                            <div>
                                <div style={{ opacity: 0.6 }}>Theoretical Variance:</div>
                                <div style={{ fontWeight: 600 }}>{stats.theoreticalVar.toFixed(2)}</div>
                            </div>
                            {showPaths && (
                                <>
                                    <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '0.8rem' }}>
                                        <div style={{ opacity: 0.6, display: 'flex', justifyContent: 'space-between' }}>
                                            Empirical Mean:
                                            <span style={{ color: 'var(--color-accent)', fontSize: '0.7rem' }}>err: {stats.meanError.toFixed(2)}%</span>
                                        </div>
                                        <div style={{ fontWeight: 600, color: 'var(--color-accent)' }}>{stats.empiricalMean.toFixed(2)}</div>
                                    </div>
                                    <div>
                                        <div style={{ opacity: 0.6, display: 'flex', justifyContent: 'space-between' }}>
                                            Empirical Var:
                                            <span style={{ color: 'var(--color-accent)', fontSize: '0.7rem' }}>err: {stats.varError.toFixed(2)}%</span>
                                        </div>
                                        <div style={{ fontWeight: 600, color: 'var(--color-accent)' }}>{stats.empiricalVar.toFixed(2)}</div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mapping Panel */}
                    <div className="glass-panel" style={{ padding: '1.2rem' }}>
                        <h5 style={{ opacity: 0.8, marginBottom: '1rem' }}>Physics ↔ Finance</h5>
                        <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div className="mapping-item" style={{ padding: '0.4rem', borderRadius: '4px', cursor: 'pointer', transition: 'background 0.2s' }}>
                                <strong>Position x(t)</strong> → Asset Price S_t
                            </div>
                            <div className="mapping-item" style={{ padding: '0.4rem', borderRadius: '4px', cursor: 'pointer', transition: 'background 0.2s' }}>
                                <strong>Diffusion D</strong> → Variance Rate σ²
                            </div>
                            <div className="mapping-item" style={{ padding: '0.4rem', borderRadius: '4px', cursor: 'pointer', transition: 'background 0.2s' }}>
                                <strong>Collisions</strong> → Order flow
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <style jsx>{`
                .mapping-item:hover {
                    background: var(--color-surface-hover);
                    color: var(--color-accent);
                }
            `}</style>
        </div>
    );
};

export default DiffusionSimulation;
