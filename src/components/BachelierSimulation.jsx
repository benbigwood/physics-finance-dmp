
import { useState, useEffect, useRef } from 'react';
import MathDisplay from './MathDisplay';

// --- Math Utilities ---
const generateNormal = (mean = 0, std = 1) => {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return mean + z * std;
};

const normalPDF = (x, mean, variance) => {
    const std = Math.sqrt(variance);
    if (std === 0) return x === mean ? 1000 : 0;
    const exponent = -0.5 * Math.pow((x - mean) / std, 2);
    return (1 / (std * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
};

// --- Theme Helper Hook ---
const useTheme = () => {
    const [theme, setTheme] = useState('light'); // default

    useEffect(() => {
        const updateTheme = () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            setTheme(currentTheme);
        };
        // Initial check
        updateTheme();

        // Observer for changes
        const observer = new MutationObserver(updateTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

        return () => observer.disconnect();
    }, []);

    // Derived colors for Canvas usage
    const isDark = theme === 'dark';
    return {
        theme,
        isDark,
        colors: {
            bg: isDark ? '#020617' : '#ffffff', // Canvas background
            text: isDark ? '#94a3b8' : '#475569',
            grid: isDark ? '#334155' : '#e2e8f0',
            axis: isDark ? '#64748b' : '#94a3b8',
            path: isDark ? '#22d3ee' : '#0071e3', // Cyan vs Apple Blue
            pathShadow: isDark ? '#22d3ee' : 'rgba(0, 113, 227, 0.4)',
            theoretical: isDark ? '#FCC419' : '#bf5af2', // Yellow vs Purple
            theoreticalFill: isDark ? 'rgba(250, 204, 21, 0.1)' : 'rgba(191, 90, 242, 0.1)',
            ensemble: isDark ? 'rgba(56, 189, 248, 0.05)' : 'rgba(0, 113, 227, 0.05)',
            barFill: isDark ? 'rgba(56, 189, 248, 0.2)' : 'rgba(0, 113, 227, 0.2)',
            barStroke: isDark ? '#38bdf8' : '#0071e3'
        }
    };
};

const BachelierSimulation = () => {
    const { theme, isDark, colors } = useTheme();

    const [params, setParams] = useState({
        S0: 100, sigma: 20, mu: 0, T: 1.0, dt: 0.01, N: 200, seed: 42,
        driftMode: false, showEnsemble: true, viewMode: 'path'
    });
    const [simData, setSimData] = useState(null);

    useEffect(() => { runSimulation(); }, [params.S0, params.sigma, params.mu, params.T, params.dt, params.N, params.driftMode, params.seed]);

    const runSimulation = () => {
        const { S0, sigma, mu, T, dt, N, driftMode } = params;
        const effectiveMu = driftMode ? mu : 0;
        const steps = Math.floor(T / dt);
        const paths = [];
        const sqrtDt = Math.sqrt(dt);
        const drift = effectiveMu * dt;
        const diffusion = sigma * sqrtDt;

        for (let i = 0; i < N; i++) {
            const path = new Float32Array(steps + 1);
            path[0] = S0;
            for (let j = 0; j < steps; j++) path[j + 1] = path[j] + drift + diffusion * generateNormal();
            paths.push(path);
        }

        const timeSteps = new Float32Array(steps + 1);
        for (let j = 0; j <= steps; j++) timeSteps[j] = j * dt;
        const theoMean = S0 + effectiveMu * T;
        const theoVar = sigma * sigma * T;
        const finalPrices = paths.map(p => p[steps]);
        const empMean = finalPrices.reduce((a, b) => a + b, 0) / N;
        const empVar = finalPrices.reduce((a, b) => a + Math.pow(b - empMean, 2), 0) / N;

        setSimData({ paths, timeSteps, steps, theoMean, theoVar, empMean, empVar, finalPrices });
    };

    const updateParam = (key, value) => setParams(prev => ({ ...prev, [key]: value }));

    return (
        <div style={{
            display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%', minHeight: '800px',
            color: 'var(--color-text-primary)',
            background: 'var(--color-surface)', // Theme-aware background
            padding: '1.5rem', borderRadius: '12px',
            border: '1px solid var(--color-border)',
            fontFamily: "'Inter', sans-serif"
        }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <h2 style={{
                    color: 'var(--color-finance)', // Use theme finance color
                    fontSize: '2rem', fontWeight: '700', margin: '0 0 0.5rem 0'
                }}>
                    Bachelier Diffusion Simulator
                </h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
                    Control the market's behaviour by adjusting <span style={{ color: 'var(--color-accent)' }}>Volatility</span> (particle speed) and <span style={{ color: '#22c55e' }}>Drift</span> (trend bias).
                    Observe how these microscopic interactions in the <strong>Collsions Box</strong> aggregate to form the <strong>Price Path</strong> and probability distribution above.
                    <br /><span style={{ display: 'block', marginTop: '0.5rem', fontStyle: 'italic', color: 'var(--color-text-tertiary)' }}>Enjoy playing around!</span>
                </p>
            </div>

            {/* MAIN CONTENT GRID */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', flex: 1 }}>

                {/* LEFT COLUMN */}
                <div style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 'min-content' }}>
                    <div style={{
                        background: 'var(--color-bg)',
                        borderRadius: '8px', overflow: 'hidden',
                        border: '1px solid var(--color-border)'
                    }}>
                        <div style={{ padding: '0.8rem 1rem', borderBottom: '1px solid var(--color-border)' }}>
                            <div style={{ fontSize: '1rem', fontWeight: 600 }}>
                                <span style={{ color: 'var(--color-finance)' }}>Physics</span>
                                <span style={{ color: 'var(--color-text-tertiary)', margin: '0 0.5rem' }}>↔</span>
                                <span style={{ color: 'var(--color-highlight)' }}>Finance</span>
                            </div>
                        </div>
                        <div style={{
                            display: 'grid', gridTemplateColumns: '1fr auto 1fr',
                            background: 'var(--color-surface-hover)',
                            padding: '0.5rem 1rem', borderBottom: '1px solid var(--color-border)',
                            fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em',
                            color: 'var(--color-text-secondary)', alignItems: 'center'
                        }}>
                            <div>Physics</div>
                            <div style={{ width: '20px' }}></div>
                            <div style={{ borderLeft: '1px solid var(--color-border)', paddingLeft: '1rem', color: 'var(--color-highlight)' }}>Finance</div>
                        </div>
                        <MappingRow icon="📍" phys="Particle Position x(t)" fin="Asset Price St" />
                        <MappingRow icon="💥" phys="Molecular Collisions" fin="Market Order Flow" />
                        <MappingRow icon="⚡" phys="Molecular Speed" fin="Volatility σ" />
                        <MappingRow icon="🌊" phys="Diffusion D" fin="Variance Rate σ²" />
                    </div>
                    <CollisionToy sigma={params.sigma} colors={colors} />
                </div>

                {/* CENTER COLUMN */}
                <div style={{ flex: '2 1 400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', gap: '5px' }}>
                            <ViewToggle active={params.viewMode === 'path'} onClick={() => updateParam('viewMode', 'path')} label="Path View" icon="📈" />
                            <ViewToggle active={params.viewMode === 'distribution'} onClick={() => updateParam('viewMode', 'distribution')} label="Distribution View" icon="📊" />
                        </div>
                        {params.viewMode === 'path' && (
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', background: 'var(--color-bg)', padding: '0.3rem 0.6rem', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                                <input type="checkbox" checked={params.showEnsemble} onChange={(e) => updateParam('showEnsemble', e.target.checked)} />
                                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Show All Paths</span>
                            </label>
                        )}
                    </div>

                    <div style={{
                        flex: 1,
                        background: colors.bg, // Dynamic canvas bg
                        borderRadius: '8px',
                        border: '1px solid var(--color-border)',
                        position: 'relative', overflow: 'hidden', minHeight: '400px',
                        boxShadow: `0 0 15px ${isDark ? 'rgba(30, 167, 255, 0.1)' : 'rgba(0,0,0,0.05)'}`
                    }}>
                        {simData && (
                            params.viewMode === 'path'
                                ? <PathCanvas data={simData} params={params} colors={colors} />
                                : <DistributionCanvas data={simData} params={params} colors={colors} />
                        )}
                    </div>

                    <div style={{
                        background: 'var(--color-bg)',
                        borderRadius: '8px', border: '1px solid var(--color-border)',
                        padding: '1rem', display: 'flex', alignItems: 'center', gap: '1.5rem',
                        flexWrap: 'wrap'
                    }}>
                        <button onClick={runSimulation} style={{ background: 'var(--color-accent)', border: 'none', borderRadius: '4px', color: 'white', padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', minWidth: '80px' }}>Restart</button>

                        <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', minWidth: '200px' }}>
                            {/* Volatility */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '150px' }}>
                                <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>Volatility σ:</span>
                                <input type="range" min="1" max="100" value={params.sigma} onChange={(e) => updateParam('sigma', parseFloat(e.target.value))} style={{ flex: 1, accentColor: 'var(--color-accent)', minWidth: 0 }} />
                                <span style={{ color: 'var(--color-text-primary)', minWidth: '25px', textAlign: 'right', fontSize: '0.9rem' }}>{params.sigma}</span>
                            </div>

                            {/* Drift */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '150px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <input type="checkbox" checked={params.driftMode} onChange={(e) => updateParam('driftMode', e.target.checked)} style={{ accentColor: '#22c55e', width: '16px', height: '16px', cursor: 'pointer' }} />
                                    <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>Drift μ:</span>
                                </div>
                                <input type="range" min="-50" max="50" disabled={!params.driftMode} value={params.mu} onChange={(e) => updateParam('mu', parseFloat(e.target.value))} style={{ flex: 1, opacity: params.driftMode ? 1 : 0.5, accentColor: '#22c55e', minWidth: 0 }} />
                                <span style={{ color: 'var(--color-text-primary)', minWidth: '25px', textAlign: 'right', fontSize: '0.9rem', opacity: params.driftMode ? 1 : 0.5 }}>{params.mu}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 'min-content' }}>
                    {simData && (
                        <div style={{ padding: '1rem', background: 'var(--color-bg)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                            <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text-primary)', fontSize: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>Statistical Summaries</h4>
                            <div style={{ marginBottom: '1.2rem' }}>
                                <h5 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>Theoretical</h5>
                                <StatRow label="Mean E[ST]" value={simData.theoMean.toFixed(1)} unit="" />
                                <StatRow label="Var(ST)" value={simData.theoVar.toFixed(3)} unit="" />
                            </div>
                            <div style={{ borderTop: '1px dashed var(--color-border)', paddingTop: '1rem' }}>
                                <h5 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>Empirical (N={params.N})</h5>
                                <StatRow label="Mean" value={simData.empMean.toFixed(1)} subtext={`err: ${((simData.empMean - simData.theoMean) / simData.theoMean * 100).toFixed(2)}%`} highlight={true} />
                                <StatRow label="Var" value={simData.empVar.toFixed(3)} subtext={`err: ${((simData.empVar - simData.theoVar) / simData.theoVar * 100).toFixed(2)}%`} highlight={true} />
                            </div>
                        </div>
                    )}

                    <div style={{ padding: '1rem', background: 'var(--color-bg)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                        <h4 style={{ marginTop: 0, color: 'var(--color-text-primary)', fontSize: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Equations</h4>
                        <div style={{ fontFamily: "'Computer Modern', 'Times New Roman', serif", fontSize: '1rem', lineHeight: '2', color: 'var(--color-text-secondary)' }}>

                            {/* SDE Equation */}
                            <div style={{ marginBottom: '1.5rem', background: 'var(--color-surface-hover)', padding: '1rem', borderRadius: '8px', textAlign: 'center', overflowX: 'auto' }}>
                                <strong style={{ display: 'block', color: 'var(--color-text-secondary)', fontSize: '0.8rem', fontFamily: 'var(--font-main)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>SDE (Stochastic Differential Equation)</strong>

                                <div style={{ fontSize: '1.2rem', fontFamily: 'KaTeX_Main, Times New Roman, serif', whiteSpace: 'nowrap', display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: '8px' }}>
                                    <div style={{ display: 'flex' }}><span style={{ color: 'var(--color-highlight)', fontStyle: 'italic' }}>dS</span><sub style={{ fontSize: '0.8em', color: 'var(--color-highlight)' }}>t</sub></div>
                                    <span style={{ color: 'var(--color-text-tertiary)' }}>=</span>

                                    {/* DRIFT TERM (Green) */}
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                                        <span style={{ color: params.driftMode ? '#22c55e' : 'var(--color-text-disabled)', fontWeight: 'bold' }}>
                                            {params.driftMode ? params.mu : 0}
                                        </span>
                                        <span style={{ color: 'var(--color-text-secondary)' }}>dt</span>
                                    </div>

                                    <span style={{ color: 'var(--color-text-tertiary)' }}>+</span>

                                    {/* VOLATILITY TERM (Finance Color) */}
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                                        <span style={{ color: 'var(--color-finance)', fontWeight: 'bold' }}>{params.sigma}</span>
                                        <div style={{ display: 'flex' }}><span style={{ color: 'var(--color-highlight)', fontStyle: 'italic' }}>dW</span><sub style={{ fontSize: '0.8em', color: 'var(--color-highlight)' }}>t</sub></div>
                                    </div>
                                </div>
                            </div>

                            {/* PDE Equation */}
                            <div style={{ marginBottom: '1rem', background: 'var(--color-surface-hover)', padding: '1rem', borderRadius: '8px', textAlign: 'center', overflowX: 'auto' }}>
                                <strong style={{ display: 'block', color: 'var(--color-text-secondary)', fontSize: '0.8rem', fontFamily: 'var(--font-main)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>PDE (Fokker-Planck / Heat Eq)</strong>

                                <div style={{ fontSize: '1.2rem', fontFamily: 'KaTeX_Main, Times New Roman, serif', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <span style={{ borderBottom: '1px solid var(--color-text-secondary)', padding: '0 2px' }}>∂p</span>
                                        <span>∂t</span>
                                    </div>
                                    <span style={{ color: 'var(--color-text-tertiary)' }}>=</span>

                                    {/* DIFFUSION COEFF -> Matches Volatility Color */}
                                    <span style={{ color: 'var(--color-finance)', fontWeight: 'bold' }}>
                                        {(Math.pow(params.sigma, 2) / 2).toFixed(1)}
                                    </span>

                                    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <span style={{ borderBottom: '1px solid var(--color-text-secondary)', padding: '0 2px' }}>∂²p</span>
                                        <span>∂x²</span>
                                    </div>
                                </div>
                            </div>

                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-tertiary)', fontStyle: 'italic', marginTop: '1rem', textAlign: 'center' }}>
                                Solution: <span style={{ fontFamily: 'serif' }}>Gaussian spreading as σ√t</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Sub-components ---
const ViewToggle = ({ active, onClick, label, icon }) => (
    <button onClick={onClick} style={{
        background: active ? 'var(--color-accent)' : 'transparent',
        color: active ? 'white' : 'var(--color-text-secondary)',
        border: active ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
        padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s'
    }}>
        <span>{icon}</span> {label}
    </button>
);

const MappingRow = ({ icon, phys, fin }) => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', padding: '0.8rem 1rem', fontSize: '0.85rem', borderBottom: '1px solid var(--color-border)', alignItems: 'center' }}>
        <div style={{ color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ opacity: 0.6 }}>{icon}</span> {phys}
        </div>
        <div style={{ color: 'var(--color-text-secondary)', display: 'flex', justifyContent: 'center', padding: '0 0.5rem' }}>→</div>
        <div style={{ borderLeft: '1px solid var(--color-border)', paddingLeft: '1rem', color: 'var(--color-highlight)', fontWeight: 500 }}>{fin}</div>
    </div>
);

const StatRow = ({ label, value, unit, subtext, highlight }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
        <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{label}</span>
        <div style={{ textAlign: 'right' }}>
            <span style={{ fontWeight: highlight ? 700 : 400, color: highlight ? 'var(--color-accent)' : 'var(--color-text-primary)', fontSize: '1rem' }}>
                {value} <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>{unit}</span>
            </span>
            {subtext && <div style={{ fontSize: '0.7rem', color: subtext.includes('-') ? 'var(--color-destructive)' : 'var(--color-success)' }}>{subtext}</div>}
        </div>
    </div>
);

const CollisionToy = ({ sigma, colors }) => {
    const canvasRef = useRef(null);

    // Create particles once
    const particleCount = 50;
    const particlesRef = useRef(Array.from({ length: particleCount }, () => ({
        x: Math.random() * 250,
        y: Math.random() * 120,
        vx: (Math.random() - 0.5),
        vy: (Math.random() - 0.5),
        phase: Math.random() * Math.PI * 2
    })));

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const particles = particlesRef.current;

        let main = { x: canvas.width / 2, y: canvas.height / 2, vx: 0, vy: 0 };
        let animationId;

        const loop = () => {
            // Speed factor based on sigma (volatility)
            // Sigma ranges 1-100. Let's map it to a speed multiplier 0.5 - 3.0
            const speedMult = 0.5 + (sigma / 40);

            // Update Background Particles
            particles.forEach(p => {
                p.x += p.vx * speedMult;
                p.y += p.vy * speedMult;

                // Wrap around
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // Interaction with main (Simple "kick")
                const dx = main.x - p.x; const dy = main.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 15) { // Collision radius
                    main.vx += p.vx * 0.05 * speedMult;
                    main.vy += p.vy * 0.05 * speedMult;
                }
            });

            // Dampen main particle
            main.vx *= 0.92;
            main.vy *= 0.92;

            // Move main
            main.x += main.vx;
            main.y += main.vy;

            // Bounds for main (bounce)
            if (main.x < 10) { main.x = 10; main.vx *= -0.5; }
            if (main.x > canvas.width - 10) { main.x = canvas.width - 10; main.vx *= -0.5; }
            if (main.y < 10) { main.y = 10; main.vy *= -0.5; }
            if (main.y > canvas.height - 10) { main.y = canvas.height - 10; main.vy *= -0.5; }

            // Draw
            ctx.fillStyle = colors.bg;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Grid
            ctx.strokeStyle = colors.grid;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            for (let i = 0; i < canvas.width; i += 20) { ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); }
            for (let i = 0; i < canvas.height; i += 20) { ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); }
            ctx.stroke();

            // Draw Particles
            ctx.fillStyle = colors.text;
            ctx.globalAlpha = 0.3;
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;

            // Draw Main Particle
            ctx.beginPath();
            ctx.arc(main.x, main.y, 10, 0, Math.PI * 2);
            ctx.fillStyle = colors.path;
            ctx.shadowBlur = 10;
            ctx.shadowColor = colors.pathShadow;
            ctx.fill();
            ctx.shadowBlur = 0;

            animationId = requestAnimationFrame(loop);
        };
        loop();
        return () => cancelAnimationFrame(animationId);
    }, [sigma, colors]); // Re-run if sigma changes to update speed smoothly (or just read ref)

    return (
        <div style={{ padding: '1rem', background: 'var(--color-bg)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
            <h5 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text-primary)', fontSize: '0.9rem' }}>Micro-Randomness</h5>
            <canvas ref={canvasRef} width={250} height={120} style={{ width: '100%', borderRadius: '4px', background: colors.bg, border: '1px solid var(--color-border)' }} />
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem', textAlign: 'center' }}>
                50 Particles • Speed ∝ σ ({sigma})
            </div>
        </div>
    );
};

// --- Visualization Canvases (Dependent on colors prop) ---
const PathCanvas = ({ data, params, colors }) => {
    const canvasRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const observer = new ResizeObserver(entries => {
            const entry = entries[0];
            if (!entry) return;
            const { width, height } = entry.contentRect;
            if (width > 0 && height > 0 && (Math.abs(width - dimensions.width) > 1 || Math.abs(height - dimensions.height) > 1)) {
                setDimensions({ width, height });
            }
        });
        observer.observe(canvas.parentElement); return () => observer.disconnect();
    }, [dimensions]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || dimensions.width === 0) return;
        const ctx = canvas.getContext('2d');
        const { width, height } = dimensions;
        const dpr = window.devicePixelRatio || 1;
        if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
            canvas.width = width * dpr; canvas.height = height * dpr; ctx.scale(dpr, dpr);
        } else { ctx.clearRect(0, 0, width, height); ctx.scale(dpr, dpr); }
        ctx.clearRect(0, 0, width, height);
        if (!data) return;

        let minPrice = params.S0 * 0.8; let maxPrice = params.S0 * 1.2;
        let dataMin = Infinity; let dataMax = -Infinity;
        const stepSkip = Math.max(1, Math.floor(data.steps / 50));
        const numPathsToCheck = Math.min(data.paths.length, 50);
        for (let i = 0; i < numPathsToCheck; i++) {
            for (let j = 0; j < data.steps; j += stepSkip) {
                const v = data.paths[i][j]; if (v < dataMin) dataMin = v; if (v > dataMax) dataMax = v;
            }
        }
        const theoRange = 3 * params.sigma * Math.sqrt(params.T);
        minPrice = Math.min(dataMin, params.S0 - theoRange) - 5; maxPrice = Math.max(dataMax, params.S0 + theoRange) + 5;

        const scaleX = (val) => (val / params.T) * (width - 50) + 40;
        const scaleY = (val) => height - 30 - ((val - minPrice) / (maxPrice - minPrice)) * (height - 50);

        ctx.strokeStyle = colors.grid; ctx.lineWidth = 1; ctx.setLineDash([2, 4]); ctx.beginPath();
        for (let p = Math.floor(minPrice / 10) * 10; p <= maxPrice; p += 10) { const y = scaleY(p); ctx.moveTo(40, y); ctx.lineTo(width, y); }
        ctx.stroke(); ctx.setLineDash([]);

        ctx.strokeStyle = colors.axis; ctx.beginPath();
        ctx.moveTo(40, height - 30); ctx.lineTo(width, height - 30); ctx.moveTo(40, height - 30); ctx.lineTo(40, 0); ctx.stroke();

        if (params.showEnsemble) {
            ctx.lineWidth = 1;
            const limit = Math.min(data.paths.length, 100);
            for (let i = 1; i < limit; i++) {
                ctx.beginPath(); ctx.strokeStyle = colors.ensemble;
                const path = data.paths[i]; ctx.moveTo(scaleX(0), scaleY(path[0]));
                for (let j = 1; j < path.length; j++) ctx.lineTo(scaleX(data.timeSteps[j]), scaleY(path[j]));
                ctx.stroke();
            }
        }

        const effectiveMu = params.driftMode ? params.mu : 0;
        const drawBand = (sigmaMult, color) => {
            ctx.fillStyle = color; ctx.beginPath();
            for (let t = 0; t <= params.T; t += params.dt * 5) {
                const mean = params.S0 + effectiveMu * t; const dev = sigmaMult * params.sigma * Math.sqrt(t);
                if (t === 0) ctx.moveTo(scaleX(t), scaleY(mean + dev)); else ctx.lineTo(scaleX(t), scaleY(mean + dev));
            }
            for (let t = params.T; t >= 0; t -= params.dt * 5) {
                const mean = params.S0 + effectiveMu * t; const dev = sigmaMult * params.sigma * Math.sqrt(t);
                ctx.lineTo(scaleX(t), scaleY(mean - dev));
            }
            ctx.fill();
        };
        drawBand(2.0, colors.theoreticalFill); drawBand(1.0, colors.theoreticalFill);

        ctx.beginPath(); ctx.strokeStyle = colors.theoretical; ctx.setLineDash([6, 4]); ctx.lineWidth = 1.5;
        ctx.moveTo(scaleX(0), scaleY(params.S0)); ctx.lineTo(scaleX(params.T), scaleY(params.S0 + effectiveMu * params.T));
        ctx.stroke(); ctx.setLineDash([]);

        ctx.fillStyle = colors.theoretical; ctx.font = '10px sans-serif';
        ctx.fillText("Mean", width - 35, scaleY(params.S0 + effectiveMu * params.T) - 5);

        ctx.beginPath(); ctx.strokeStyle = colors.path; ctx.lineWidth = 2; ctx.shadowColor = colors.pathShadow; ctx.shadowBlur = 8;
        const mainPath = data.paths[0]; ctx.moveTo(scaleX(0), scaleY(mainPath[0]));
        for (let j = 1; j < mainPath.length; j++) ctx.lineTo(scaleX(data.timeSteps[j]), scaleY(mainPath[j]));
        ctx.stroke(); ctx.shadowBlur = 0;

        ctx.fillStyle = colors.axis; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
        for (let p = Math.floor(minPrice / 10) * 10; p <= maxPrice; p += 20) ctx.fillText(p.toString(), 35, scaleY(p));
        ctx.textAlign = 'center'; ctx.textBaseline = 'top'; ctx.fillText("Time →", width / 2, height - 15);
        ctx.save(); ctx.translate(15, height / 2); ctx.rotate(-Math.PI / 2); ctx.textAlign = 'center'; ctx.fillText("Price", 0, 0); ctx.restore();

    }, [data, params, dimensions, colors]);

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block', position: 'absolute', top: 0, left: 0 }} />;
};

const DistributionCanvas = ({ data, params, colors }) => {
    const canvasRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const observer = new ResizeObserver(entries => {
            const entry = entries[0];
            if (!entry) return;
            const { width, height } = entry.contentRect;
            if (width > 0 && height > 0 && (Math.abs(width - dimensions.width) > 1 || Math.abs(height - dimensions.height) > 1)) {
                setDimensions({ width, height });
            }
        });
        observer.observe(canvas.parentElement); return () => observer.disconnect();
    }, [dimensions]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || dimensions.width === 0) return;
        const ctx = canvas.getContext('2d');
        const { width, height } = dimensions;
        const dpr = window.devicePixelRatio || 1;
        if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
            canvas.width = width * dpr; canvas.height = height * dpr; ctx.scale(dpr, dpr);
        } else { ctx.clearRect(0, 0, width, height); ctx.scale(dpr, dpr); }
        ctx.clearRect(0, 0, width, height);
        if (!data) return;

        const prices = data.finalPrices;
        const minP = Math.min(...prices); const maxP = Math.max(...prices);
        const buffer = (maxP - minP) * 0.2 || 10;
        const rangeMin = minP - buffer; const rangeMax = maxP + buffer;
        const bins = 50; const binWidth = (rangeMax - rangeMin) / bins;
        const counts = new Array(bins).fill(0); let maxCount = 0;
        prices.forEach(p => { const binIdx = Math.floor((p - rangeMin) / binWidth); if (binIdx >= 0 && binIdx < bins) { counts[binIdx]++; if (counts[binIdx] > maxCount) maxCount = counts[binIdx]; } });

        const scaleX = (val) => (val - rangeMin) / (rangeMax - rangeMin) * (width - 50) + 40;
        const scaleY = (val) => height - 30 - (val / maxCount) * (height - 80);

        ctx.fillStyle = colors.barFill; ctx.strokeStyle = colors.barStroke; ctx.lineWidth = 1;
        for (let i = 0; i < bins; i++) {
            const h = maxCount > 0 ? (counts[i] / maxCount) * (height - 60) : 0;
            const x = scaleX(rangeMin + i * binWidth); const y = height - 30 - h; const w = (width - 50) / bins - 1;
            ctx.fillRect(x, y, w, h); ctx.strokeRect(x, y, w, h);
        }

        ctx.beginPath(); ctx.strokeStyle = colors.theoretical; ctx.lineWidth = 3; ctx.shadowColor = colors.theoreticalFill; ctx.shadowBlur = 10;
        const effectiveMu = params.driftMode ? params.mu : 0;
        const theoMean = params.S0 + effectiveMu * params.T; const theoVar = params.sigma ** 2 * params.T;
        const pixelsPerCount = maxCount > 0 ? (height - 80) / maxCount : 0;
        const plotScale = data.paths.length * binWidth * pixelsPerCount;
        let started = false;
        for (let x = rangeMin; x <= rangeMax; x += binWidth / 5) {
            const density = normalPDF(x, theoMean, theoVar);
            const y = height - 30 - (density * plotScale);
            const plotX = scaleX(x);
            if (!started) { ctx.moveTo(plotX, y); started = true; } else ctx.lineTo(plotX, y);
        }
        ctx.stroke(); ctx.shadowBlur = 0;

        ctx.beginPath(); ctx.strokeStyle = colors.theoretical; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
        ctx.moveTo(scaleX(theoMean), height - 30); ctx.lineTo(scaleX(theoMean), 20);
        ctx.stroke(); ctx.setLineDash([]);

        ctx.fillStyle = colors.theoretical; ctx.textAlign = 'center'; ctx.font = 'bold 12px sans-serif';
        ctx.fillText(`Mean: ${theoMean.toFixed(1)}`, scaleX(theoMean), 15);

        ctx.strokeStyle = colors.axis; ctx.lineWidth = 1; ctx.beginPath();
        ctx.moveTo(40, height - 30); ctx.lineTo(width, height - 30); ctx.stroke();
        ctx.fillStyle = colors.axis; ctx.textAlign = "center";
        for (let p = Math.floor(rangeMin / 10) * 10; p <= rangeMax; p += 20) ctx.fillText(p.toString(), scaleX(p), height - 15);
        ctx.fillText("Price at Maturity ST", width / 2, height - 2);

    }, [data, params, dimensions, colors]);

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block', position: 'absolute', top: 0, left: 0 }} />;
};

export default BachelierSimulation;
