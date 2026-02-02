import { useState, useEffect, useRef } from 'react';

const BlackScholesSimulation = () => {
    // State for inputs
    const [S, setS] = useState(100);    // Stock Price
    const [K, setK] = useState(100);    // Strike Price
    const [T, setT] = useState(1);      // Time to Maturity (years)
    const [r, setR] = useState(0.05);   // Risk-free Rate (5%)
    const [sigma, setSigma] = useState(0.20); // Volatility (20%)

    // State for outputs
    const [callPrice, setCallPrice] = useState(0);
    const [putPrice, setPutPrice] = useState(0);

    // Standard Normal Cumulative Distribution Function
    const normalCDF = (x) => {
        var t = 1 / (1 + .2316419 * Math.abs(x));
        var d = .3989423 * Math.exp(-x * x / 2);
        var prob = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
        if (x > 0) prob = 1 - prob;
        return prob;
    };

    const calculateBS = () => {
        const d1 = (Math.log(S / K) + (r + sigma * sigma / 2) * T) / (sigma * Math.sqrt(T));
        const d2 = d1 - sigma * Math.sqrt(T);

        const call = S * normalCDF(d1) - K * Math.exp(-r * T) * normalCDF(d2);
        const put = K * Math.exp(-r * T) * normalCDF(-d2) - S * normalCDF(-d1);

        setCallPrice(call);
        setPutPrice(put);
    };

    useEffect(() => {
        calculateBS();
    }, [S, K, T, r, sigma]);

    const inputStyle = {
        background: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid var(--color-surface-hover)',
        color: 'var(--color-text-primary)',
        padding: '0.5rem',
        borderRadius: '4px',
        width: '100%',
        marginTop: '0.25rem'
    };

    const labelStyle = {
        display: 'block',
        color: 'var(--color-text-secondary)',
        fontSize: '0.9rem',
        marginBottom: '0.5rem'
    };

    return (
        <div style={{ marginTop: '1rem' }}>
            <h3 style={{ color: 'var(--color-highlight)', marginBottom: '1rem', textAlign: 'center' }}>
                Black-Scholes Calculator
            </h3>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '1.5rem',
                background: 'var(--color-bg)',
                padding: '1rem',
                borderRadius: '8px'
            }}>
                <div>
                    <label style={labelStyle}>Stock Price (S)</label>
                    <input
                        type="number"
                        value={S}
                        onChange={(e) => setS(parseFloat(e.target.value))}
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label style={labelStyle}>Strike Price (K)</label>
                    <input
                        type="number"
                        value={K}
                        onChange={(e) => setK(parseFloat(e.target.value))}
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label style={labelStyle}>Time to Maturity (T - Years)</label>
                    <input
                        type="number"
                        step="0.1"
                        value={T}
                        onChange={(e) => setT(parseFloat(e.target.value))}
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label style={labelStyle}>Risk-free Rate (r)</label>
                    <input
                        type="number"
                        step="0.01"
                        value={r}
                        onChange={(e) => setR(parseFloat(e.target.value))}
                        style={inputStyle}
                    />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                    <label style={labelStyle}>Volatility (σ)</label>
                    <input
                        type="number"
                        step="0.01"
                        value={sigma}
                        onChange={(e) => setSigma(parseFloat(e.target.value))}
                        style={inputStyle}
                    />
                </div>
            </div>

            <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center'
            }}>
                <div style={{
                    background: 'rgba(56, 189, 248, 0.1)',
                    border: '1px solid var(--color-accent)',
                    padding: '1rem',
                    borderRadius: '8px',
                    textAlign: 'center',
                    flex: 1
                }}>
                    <h4 style={{ color: 'var(--color-accent)', marginBottom: '0.5rem' }}>Call Option</h4>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                        ${callPrice.toFixed(2)}
                    </span>
                </div>
                <div style={{
                    background: 'rgba(255, 99, 71, 0.1)',
                    border: '1px solid tomato', // Using a distinct color for puts
                    padding: '1rem',
                    borderRadius: '8px',
                    textAlign: 'center',
                    flex: 1
                }}>
                    <h4 style={{ color: 'tomato', marginBottom: '0.5rem' }}>Put Option</h4>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                        ${putPrice.toFixed(2)}
                    </span>
                </div>
            </div>

            {/* Heat Transfer Simulation Section */}
            <div style={{ marginTop: '2rem', borderTop: '1px solid var(--color-surface-hover)', paddingTop: '1.5rem' }}>
                <h3 style={{ color: 'var(--color-highlight)', marginBottom: '1rem', textAlign: 'center' }}>
                    The Physics: Heat Diffusion Analogy
                </h3>
                <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                    Black & Scholes discovered that option prices evolve exactly like heat diffusing through a metal rod.
                    <br />
                    <strong>Diffusivity (How fast heat spreads) ≈ Volatility (σ)</strong>
                </p>

                <HeatDiffusionCanvas sigma={sigma} timeToMaturity={T} />
            </div>
        </div>
    );
};

const HeatDiffusionCanvas = ({ sigma, timeToMaturity }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Animation State
        let startTime = null;
        const CYCLE_DURATION = 8000; // 8 seconds per cycle
        const SEPARATION_PHASE = 2000; // 2 seconds to approach

        const loop = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;

            const width = canvas.width;
            const height = canvas.height;
            const centerX = width / 2;

            // Cycle Management
            const cycleTime = elapsed % CYCLE_DURATION;

            // Phase Logic
            let separation = 0;
            let displayTime = 0;
            let phase = 'approach'; // 'approach' or 'diffuse'

            if (cycleTime < SEPARATION_PHASE) {
                phase = 'approach';
                // Ease Out Bounce or simple Ease Out Quart
                const progress = cycleTime / SEPARATION_PHASE;
                // Start at 150px, end at 0px
                const ease = 1 - Math.pow(1 - progress, 3); // Cubic ease out
                separation = 150 * (1 - ease);
                displayTime = 0;
            } else {
                phase = 'diffuse';
                separation = 0;
                // Time simulation time
                const vizTime = cycleTime - SEPARATION_PHASE;
                // Map milliseconds to "Years" roughly
                // Speed depends on sigma?
                displayTime = (vizTime / 1000) * 0.1; // Slow down time perception
            }

            ctx.clearRect(0, 0, width, height);

            // --- 1. VISUALIZATION (Top) ---
            const vizY = 30;
            const vizH = 80; // Taller blocks like image

            // Block Drawing Function
            const drawBlocks = () => {

                // --- HOT BLOCK (Left) ---
                const leftBlockW = (width / 2) - (separation / 2) - 20; // 20px padding
                const leftBlockX = (width / 2) - (separation / 2) - leftBlockW;

                // Glow Effect
                const gradHot = ctx.createRadialGradient(
                    leftBlockX + leftBlockW / 2, vizY + vizH / 2, 10,
                    leftBlockX + leftBlockW / 2, vizY + vizH / 2, leftBlockW
                );
                gradHot.addColorStop(0, '#fff1f2'); // Bright White-Pink Center
                gradHot.addColorStop(0.4, '#fb7185'); // Soft Red
                gradHot.addColorStop(1, '#9f1239'); // Dark Red Edge

                // Or linear gradient like the image (looks like light source is left?)
                // Image: Bright white rectangle with red glow surround.

                // Let's do a solid white/pink block with heavy shadow/glow
                ctx.save();
                ctx.shadowBlur = 25;
                ctx.shadowColor = '#f43f5e'; // Red Glow
                ctx.fillStyle = '#ffe4e6'; // Very pale pink/white

                if (phase === 'diffuse') {
                    // It will be drawn pixel-by-pixel later, so we only draw this in approach?
                    // No, "Separated" blocks implies Phase 1.
                    if (separation > 1) {
                        ctx.fillRect(leftBlockX, vizY, leftBlockW, vizH);
                    }
                } else {
                    ctx.fillRect(leftBlockX, vizY, leftBlockW, vizH);
                }
                ctx.restore();

                // --- COLD BLOCK (Right) ---
                const rightBlockX = (width / 2) + (separation / 2);
                const rightBlockW = leftBlockW;

                ctx.save();
                ctx.fillStyle = '#1e40af'; // Blue texture
                // Simple gradient to make it look 3D?
                const gradCold = ctx.createLinearGradient(rightBlockX, vizY, rightBlockX + rightBlockW, vizY);
                gradCold.addColorStop(0, '#1d4ed8');
                gradCold.addColorStop(1, '#172554');
                ctx.fillStyle = gradCold;

                if (phase === 'diffuse') {
                    if (separation > 1) {
                        ctx.fillRect(rightBlockX, vizY, rightBlockW, vizH);
                    }
                } else {
                    ctx.fillRect(rightBlockX, vizY, rightBlockW, vizH);
                }
                ctx.restore();

                // Labels
                if (phase === 'approach') {
                    ctx.fillStyle = 'rgba(255,255,255,0.9)';
                    ctx.font = 'bold 14px sans-serif';
                    ctx.fillText("HOT", leftBlockX + leftBlockW / 2 - 15, vizY + vizH / 2 + 5);
                    ctx.fillText("COLD", rightBlockX + rightBlockW / 2 - 20, vizY + vizH / 2 + 5);
                }
            };

            drawBlocks();

            // --- DIFFUSION RENDERING ---
            if (phase === 'diffuse') {
                // We draw the mixing region over the blocks?
                // Or rather, we completely redraw the rect with the gradient.

                const sigmaVal = Math.max(0.1, sigma);
                const widthParam = Math.sqrt(displayTime) * sigmaVal * 4; // visual scaler
                const scaleX = 100;

                // Iterate across the whole dual-block width
                const leftBlockW = (width / 2) - 20;
                const startX = 20;
                const endX = width - 20;

                for (let x = startX; x < endX; x += 2) {
                    const dist = (x - centerX) / scaleX;

                    // Temp 1 (Hot) -> 0 (Cold)
                    let temp = 0;
                    if (widthParam < 0.001) temp = x < centerX ? 1 : 0;
                    else temp = 1 / (1 + Math.exp(dist / (widthParam * 0.4))); // Logistic

                    // Color Interpolation
                    // Hot: 255, 228, 230 (White/Pink)
                    // Cold: 30, 64, 175 (Blue)
                    // Midpoint: Need a smooth purple/mix?

                    let r, g, b;

                    // Simple Linear Interpolation (Lerp)
                    // Hot Color
                    const hR = 255, hG = 228, hB = 230;
                    // Cold Color
                    const cR = 30, cG = 64, cB = 175;

                    r = hR * temp + cR * (1 - temp);
                    g = hG * temp + cG * (1 - temp);
                    b = hB * temp + cB * (1 - temp);

                    ctx.fillStyle = `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
                    ctx.fillRect(x, vizY, 2, vizH);
                }

                // Add Glow overlay for the "Hot" side that fades
                // The "Hot" side should retain its glow?
            }

            // --- 2. GRAPH (Bottom) ---
            const graphY = 130;
            const graphH = 60;
            const graphBottom = graphY + graphH;

            // Axis
            ctx.strokeStyle = '#475569';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(20, graphBottom);
            ctx.lineTo(width - 20, graphBottom);
            ctx.stroke();

            // Graph Curve
            ctx.beginPath();
            ctx.lineWidth = 3;
            // Gradient Stroke?
            const gradStroke = ctx.createLinearGradient(20, 0, width - 20, 0);
            gradStroke.addColorStop(0, '#f43f5e');
            gradStroke.addColorStop(1, '#3b82f6');
            ctx.strokeStyle = gradStroke;

            const startX = 20;
            const endX = width - 20;

            if (phase === 'approach') {
                // Step Function
                ctx.moveTo(startX, graphY);
                ctx.lineTo(centerX, graphY); // High
                ctx.lineTo(centerX, graphBottom); // Drop
                ctx.lineTo(endX, graphBottom); // Low
            } else {
                // S-Curve
                const sigmaVal = Math.max(0.1, sigma);
                const widthParam = Math.sqrt(displayTime) * sigmaVal * 4;
                const scaleX = 100;

                for (let x = startX; x <= endX; x += 5) {
                    const dist = (x - centerX) / scaleX;
                    let val = 0;
                    if (widthParam < 0.001) val = x < centerX ? 1 : 0;
                    else val = 1 / (1 + Math.exp(dist / (widthParam * 0.4)));

                    const y = graphBottom - (val * graphH);
                    if (x === startX) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
            }
            ctx.stroke();

            // Labels
            ctx.fillStyle = '#64748b';
            ctx.font = '12px sans-serif';
            ctx.fillText("Probability / Temp", 20, graphBottom + 20);

            animationFrameId = requestAnimationFrame(loop);
        };
        animationFrameId = requestAnimationFrame(loop);

        return () => cancelAnimationFrame(animationFrameId);
    }, [sigma, timeToMaturity]);

    return (
        <div style={{
            background: '#0f172a',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid var(--color-surface-hover)',
            marginTop: '1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <canvas ref={canvasRef} width={500} height={220} />
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.5rem', textAlign: 'center' }}>
                Top: Hot metal (Probability=1) mixing with Cold (Probability=0).<br />
                Bottom: The resulting probability curve (Option Delta).<br />
                <strong>Higher Volatility = Faster Mixing.</strong>
            </p>
        </div>
    );
};

export default BlackScholesSimulation;
