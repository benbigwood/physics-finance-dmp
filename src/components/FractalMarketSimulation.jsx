import { useEffect, useRef, useState, useMemo } from 'react';

const FractalMarketSimulation = () => {
    const canvasRef = useRef(null);
    const [zoomLevel, setZoomLevel] = useState(1); // 1 = full view, higher = zoomed in
    const [selectionStart, setSelectionStart] = useState(0.4); // 0 to 1, start of user selection window
    const [windowWidth, setWindowWidth] = useState(0.2); // 0 to 1, width of selection

    // Generate fractional brownian motion or just standard BW for demo
    // We need a LOT of points to support deep zooming without pixelation/linear interpolation looking too smooth
    const totalPoints = 4000;

    const [refreshSeed, setRefreshSeed] = useState(0);

    // Generate fractal path with Volatility Clustering (Regime Switching)
    const data = useMemo(() => {
        const points = new Float32Array(totalPoints);
        let price = 100;
        points[0] = price;

        // Seed logic implicitly handled by component re-render when refreshSeed changes
        // But Math.random() is non-deterministic anyway.
        // We just need useMemo to re-run.
        // We can use refreshSeed in the dependency array.

        let volatility = 0.5;
        let regimeDuration = 0;

        // Use a regime-switching model to simulate Volatility Clustering
        // (Large changes follow large changes, small follow small)

        for (let i = 1; i < totalPoints; i++) {
            // Regime switching logic
            if (regimeDuration <= 0) {
                // Pick a new regime: Calm (low vol) or Turbulent (high vol)
                const isTurbulent = Math.random() > 0.7; // 30% chance of turbulence
                volatility = isTurbulent ? (Math.random() * 1.5 + 1.0) : (Math.random() * 0.3 + 0.1);
                regimeDuration = Math.floor(Math.random() * 300 + 50); // Duration of this regime
            }
            regimeDuration--;

            // Standard normal random
            let u = 0, v = 0;
            while (u === 0) u = Math.random();
            while (v === 0) v = Math.random();
            const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

            const change = z * volatility;
            price = price + change;

            // Prevent negative prices (Geometric-ish constraint but strictly arithmetic step for visual simplicity)
            if (price < 10) price = 10;

            points[i] = price;
        }
        return points;
    }, [refreshSeed]);

    const drawGraph = (ctx, width, height, dataSubset, label, color) => {
        ctx.clearRect(0, 0, width, height);

        // Background
        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, width, height);

        // Grid lines
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < width; i += 50) { ctx.moveTo(i, 0); ctx.lineTo(i, height); }
        for (let j = 0; j < height; j += 30) { ctx.moveTo(0, j); ctx.lineTo(width, j); }
        ctx.stroke();

        // Find min/max for scaling
        let min = Infinity, max = -Infinity;
        // Optimization: sample points if array is huge? No, user subset might be small.
        // But for the macro view, we might process too many points.
        // Start/End indices
        const step = Math.max(1, Math.floor(dataSubset.length / width)); // Decimation for rendering

        for (let i = 0; i < dataSubset.length; i++) {
            if (dataSubset[i] < min) min = dataSubset[i];
            if (dataSubset[i] > max) max = dataSubset[i];
        }

        const padding = 10;
        const scaleY = (height - padding * 2) / (max - min);

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;

        for (let i = 0; i < dataSubset.length; i++) {
            const x = (i / (dataSubset.length - 1)) * width;
            const y = height - padding - (dataSubset[i] - min) * scaleY;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Label
        ctx.fillStyle = '#aaa';
        ctx.font = '12px sans-serif';
        ctx.fillText(label, 10, 20);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        // Split canvas into two viewports: Top (Macro) and Bottom (Micro)
        const margin = 10;
        const graphHeight = (height - margin * 3) / 2;

        // Viewport 1: Macro (All Data)
        // We draw to a temp canvas or just use offsets?
        // Let's simpler: Use two canvas elements? Or just math.
        // Let's use math on one canvas for perfect sync.

        ctx.clearRect(0, 0, width, height);

        // 1. Draw Macro Graph (Top)
        // -----------
        const drawInRect = (rect, subData, title, highlightRange = null) => {
            const PAD_LEFT = 40;
            const PAD_BOTTOM = 20;

            // Draw Bg (clip to rect)
            ctx.fillStyle = '#111';
            ctx.fillRect(rect.x, rect.y, rect.w, rect.h);

            // Define active graph area
            const graphX = rect.x + PAD_LEFT;
            const graphY = rect.y;
            const graphW = rect.w - PAD_LEFT;
            const graphH = rect.h - PAD_BOTTOM;

            // Determine bounds
            let min = Infinity, max = -Infinity;
            for (let val of subData) {
                if (val < min) min = val;
                if (val > max) max = val;
            }
            if (min === max) { min -= 1; max += 1; }
            const range = max - min;

            // Draw Grid & Axes
            ctx.strokeStyle = '#222';
            ctx.lineWidth = 1;
            ctx.beginPath();

            // Horizontal grid (Price)
            const gridStepsY = 4;
            for (let i = 0; i <= gridStepsY; i++) {
                const y = graphY + graphH - (i / gridStepsY) * graphH;
                ctx.moveTo(graphX, y);
                ctx.lineTo(graphX + graphW, y);

                // Price Label
                const price = min + (i / gridStepsY) * range;
                ctx.fillStyle = '#666';
                ctx.textAlign = 'right';
                ctx.font = '10px Inter, sans-serif';
                ctx.fillText(price.toFixed(1), graphX - 5, y + 3);
            }

            // Vertical grid (Time)
            const gridStepsX = 6;
            for (let i = 0; i <= gridStepsX; i++) {
                const x = graphX + (i / gridStepsX) * graphW;
                ctx.moveTo(x, graphY);
                ctx.lineTo(x, graphY + graphH);
            }
            ctx.stroke();

            // Main Box Border
            ctx.strokeStyle = '#333';
            ctx.strokeRect(graphX, graphY, graphW, graphH);

            // Draw Line Plot
            ctx.beginPath();
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 1.5;

            const len = subData.length;
            const drawStep = Math.max(1, Math.floor(len / graphW));

            for (let i = 0; i < len; i += drawStep) {
                const px = graphX + (i / (len - 1)) * graphW;
                const py = (graphY + graphH) - ((subData[i] - min) / range) * graphH;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.stroke();

            // Axis Titles
            ctx.save();
            ctx.fillStyle = '#888';
            ctx.font = '10px Inter, sans-serif';

            // X-Axis Title (Time)
            // Calc time range based on title/context (Hackathon style)
            let timeLabel = "Time";
            if (title.includes("Macro")) timeLabel = "10 Years";
            else {
                // Approximate time based on zoom
                const years = (windowWidth * 10).toFixed(1);
                timeLabel = `${years} Years`;
            }
            ctx.textAlign = 'center';
            ctx.fillText(timeLabel, graphX + graphW / 2, graphY + graphH + 15);

            // Y-Axis Title (Price)
            ctx.translate(12, graphY + graphH / 2);
            ctx.rotate(-Math.PI / 2);
            ctx.fillText("Price ($)", 0, 0);
            ctx.restore();

            // Main Title
            ctx.fillStyle = 'var(--color-text-secondary)';
            ctx.textAlign = 'left';
            ctx.font = '12px Inter, sans-serif';
            ctx.fillText(title, graphX + 10, graphY + 20);

            // Highlight Box (Selection) - Only for Macro
            if (highlightRange) {
                const hx = graphX + highlightRange.start * graphW;
                const hw = highlightRange.width * graphW;

                ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
                ctx.fillRect(hx, graphY, hw, graphH);

                ctx.strokeStyle = 'var(--color-accent)';
                ctx.lineWidth = 1;
                ctx.strokeRect(hx, graphY, hw, graphH);

                // Connecting lines to bottom graph
                // Need to know where bottom graph starts relative to this rect
                // Since drawInRect scope is limited, we just draw lines downwards offscreen-ish or to edge
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                ctx.setLineDash([5, 5]);

                // To connect visually to the micro graph, we need to know the Micro Graph's position.
                // But this function is generic. 
                // Let's just draw small indicators pointing down
                ctx.moveTo(hx, graphY + graphH);
                ctx.lineTo(hx - 10, graphY + graphH + 15);

                ctx.moveTo(hx + hw, graphY + graphH);
                ctx.lineTo(hx + hw + 10, graphY + graphH + 15);

                ctx.stroke();
                ctx.setLineDash([]);
            }
        };

        const macroRect = { x: 0, y: 0, w: width, h: graphHeight };
        drawInRect(macroRect, data, "Macro View (All Data)", { start: selectionStart, width: windowWidth });

        // 2. Draw Micro Graph (Bottom)
        // -----------
        const startIdx = Math.floor(selectionStart * (data.length - 1));
        const endIdx = Math.floor((selectionStart + windowWidth) * (data.length - 1));
        const microData = data.slice(startIdx, endIdx);

        const microRect = { x: 0, y: graphHeight + margin + 20, w: width, h: graphHeight };
        drawInRect(microRect, microData, "Micro View (Zoomed Focus)");

    }, [data, selectionStart, windowWidth]);

    const handleZoomAnimation = () => {
        // Pick a random new spot
        const newStart = Math.random() * 0.8;
        // Animate selectionStart to newStart
        // This is a simple impl, ideally use requestAnimationFrame for smoothness,
        // but react state update might be enough for this simple tool
        setSelectionStart(newStart);
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ color: 'var(--color-highlight)', marginBottom: '1rem' }}>Fractal Self-Similarity & Volatility Clustering</h3>

            <div style={{ position: 'relative', width: '100%', maxWidth: '600px', height: '400px' }}>
                <canvas
                    ref={canvasRef}
                    width={600}
                    height={400}
                    style={{
                        width: '100%',
                        height: '100%',
                        cursor: 'ew-resize'
                        // Drag functionality could be added here overlaying a div
                    }}
                    onMouseMove={(e) => {
                        // Simple hover drag logic if mouse is down
                        if (e.buttons === 1) {
                            const rect = e.target.getBoundingClientRect();
                            // Check if dealing with top half
                            // if (y > 200) return; // Only drag on top

                            const x = e.clientX - rect.left;
                            const ratio = Math.max(0, Math.min(1, x / rect.width));
                            // Center the window on mouse
                            let newStart = ratio - (windowWidth / 2);
                            if (newStart < 0) newStart = 0;
                            if (newStart + windowWidth > 1) newStart = 1 - windowWidth;
                            setSelectionStart(newStart);
                        }
                    }}
                />
            </div>

            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button
                    disabled={windowWidth <= 0.05}
                    onClick={() => {
                        // "Zoom In" - decrease window width
                        setWindowWidth(prev => Math.max(0.05, prev / 2));
                    }}
                    style={{
                        padding: '0.5rem 1rem',
                        background: windowWidth <= 0.05 ? 'var(--color-surface-hover)' : 'var(--color-accent)',
                        color: windowWidth <= 0.05 ? 'var(--color-text-secondary)' : 'white',
                        opacity: windowWidth <= 0.05 ? 0.5 : 1,
                        border: 'none',
                        borderRadius: '4px',
                        cursor: windowWidth <= 0.05 ? 'not-allowed' : 'pointer'
                    }}
                >
                    Zoom In
                </button>
                <button
                    disabled={windowWidth >= 0.5}
                    onClick={() => {
                        // "Zoom Out" - increase window width
                        setWindowWidth(prev => Math.min(0.5, prev * 2));
                    }}
                    style={{
                        padding: '0.5rem 1rem',
                        background: 'var(--color-surface)',
                        color: windowWidth >= 0.5 ? 'var(--color-text-secondary)' : 'var(--color-text-primary)',
                        opacity: windowWidth >= 0.5 ? 0.5 : 1,
                        border: '1px solid var(--color-text-secondary)',
                        borderRadius: '4px',
                        cursor: windowWidth >= 0.5 ? 'not-allowed' : 'pointer'
                    }}
                >
                    Zoom Out
                </button>

                <div style={{ width: '1px', height: '20px', background: 'var(--color-surface-hover)', margin: '0 0.5rem' }}></div>

                <button
                    onClick={() => {
                        setRefreshSeed(s => s + 1);
                    }}
                    style={{ padding: '0.5rem 1rem', background: 'var(--color-bg)', color: 'var(--color-accent)', border: '1px solid var(--color-accent)', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Regenerate Graph
                </button>

                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginLeft: '0.5rem' }}>
                    Drag top graph to pan.
                </span>
            </div>

            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', maxWidth: '600px' }}>
                <strong style={{ color: 'var(--color-highlight)' }}>Observation: Volatility Clustering</strong>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
                    Notice how large price swings typically cluster together, followed by periods of relative calm?
                    This "clumping" of risk is a key feature of fractal markets that standard "Bell Curve" models fail to predict.
                    Try zooming in—you will see this same clustering pattern repeats at smaller time scales!
                </p>
            </div>
        </div>
    );
};

export default FractalMarketSimulation;
