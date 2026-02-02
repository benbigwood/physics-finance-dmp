import { useEffect, useRef, useState, useMemo } from 'react';

const FractalTreeComparison = () => {
    const treeCanvasRef = useRef(null);
    const graphCanvasRef = useRef(null);
    const [step, setStep] = useState(0); // 0 to 5
    const [isAnimating, setIsAnimating] = useState(false);

    // Current Visual State (interpolated)
    const animRef = useRef({
        t: 0, // 0 to 5 (float) representing current progress
        currentStep: 0
    });
    const reqRef = useRef(null);

    // Zoom Parameters
    const MAX_STEPS = 5;
    const TREE_SCALE_FACTOR = 1 / 0.7; // ~1.428
    const TREE_ANGLE = 25 * Math.PI / 180;

    // Graph Parameters
    const GRAPH_SCALE_X = 2; // Zoom into half

    // Fixed Data: Cyclic Fractal Construction (Period 5)
    const graphPoints = useMemo(() => {
        // We want the graph to look distinct at steps 1-4, but identical at step 5 (loops to 0).
        // Cycle length = 5.
        // We accumulate layers. Layer L uses Pattern(L % 5).

        const layers = 15; // 3 cycles of 5
        const points = [];
        const patternResolution = 40;

        const patterns = [];
        for (let p = 0; p < 5; p++) {
            const pat = [];
            for (let i = 0; i <= patternResolution; i++) {
                const t = i / patternResolution;
                // Unique seed for this pattern index
                const k = p + 1;
                // Randomized smooth curve
                let val = Math.sin(t * k * 3) * 0.2 + Math.cos(t * (k + 2) * 4) * 0.1;

                if (p === 0) val += t * 0.4;
                if (p === 1) val -= t * 0.2;
                if (p === 2) val += Math.sin(t * 10) * 0.1;
                if (p === 3) val += t * 0.8; // Steep
                if (p === 4) val -= t * 0.1;
                pat.push(val);
            }
            patterns.push(pat);
        }

        let currentX = 0;
        let currentY = 0;

        for (let layer = layers; layer >= 0; layer--) {
            // Cycle the pattern
            // To ensure Scale 5 looks like Scale 0:
            // Layer K needs to match Layer K+5 visually
            const patternIndex = layer % 5;
            const pat = patterns[patternIndex];

            const scaleX = Math.pow(0.5, layer);
            // Height scaling: Constant H=0.5 -> 2^-0.5 per layer
            const scaleY = Math.pow(Math.pow(2, 0.5), -layer);

            const startX = Math.pow(0.5, layer + 1);
            const endX = Math.pow(0.5, layer);
            const spanX = endX - startX;

            for (let i = 0; i < pat.length; i++) {
                if (i === 0 && layer === layers) {
                    points.push({ x: 0, y: 0 });
                }

                if (i > 0) {
                    const stepY = (pat[i] - pat[i - 1]) * scaleY; // scaled diff
                    // Adjust stepY to "connect" smoother? No, raw fractal is jagged.

                    const stepX = (1 / patternResolution) * spanX;
                    currentX += stepX;
                    currentY += stepY;
                    points.push({ x: currentX, y: currentY });
                }
            }
        }
        return points;
    }, []);

    const handleZoom = () => {
        if (isAnimating) return;
        // Logic: Increment step. If step hits MAX, we'll animate to it, then silent reset.
        setStep(s => s + 1);
    };

    const handleReset = () => {
        setStep(0);
        animRef.current.t = 0;
        draw(0);
    };

    // Animation Loop
    useEffect(() => {
        const animate = () => {
            let currentT = animRef.current.t;
            const targetT = step;

            let nextT = currentT;
            const speed = 0.08; // Faster zoom

            if (currentT < targetT) {
                setIsAnimating(true);
                nextT = currentT + speed;
                if (nextT >= targetT) {
                    nextT = targetT;
                    // Check for Loop
                    if (nextT >= MAX_STEPS) {
                        // Silent Reset
                        nextT = 0;
                        setStep(0);
                        // Force update ref immediately so next frame starts at 0
                        animRef.current.t = 0;
                        setIsAnimating(false); // Done
                        draw(0);
                        return; // Stop loop
                    }
                    setIsAnimating(false);
                }
                animRef.current.t = nextT;
                draw(nextT);
                reqRef.current = requestAnimationFrame(animate);
            } else if (currentT > targetT) {
                // Should only happen on manual Reset or loop wrap if handled differently
                nextT = targetT;
                animRef.current.t = nextT;
                setIsAnimating(false);
                draw(nextT);
            }
        };

        if (step !== animRef.current.t) {
            reqRef.current = requestAnimationFrame(animate);
        }

        return () => cancelAnimationFrame(reqRef.current);
    }, [step, graphPoints]);

    const draw = (t) => {
        // --- TREE ---
        if (treeCanvasRef.current) {
            const ctx = treeCanvasRef.current.getContext('2d');
            const w = treeCanvasRef.current.width;
            const h = treeCanvasRef.current.height;
            ctx.clearRect(0, 0, w, h);

            ctx.save();
            ctx.translate(w / 2, h - 20);

            const L = 60;
            // Tree Transform:

            const intStep = Math.floor(t);
            const fracStep = t - intStep;

            for (let i = 0; i < intStep; i++) {
                ctx.scale(TREE_SCALE_FACTOR, TREE_SCALE_FACTOR);
                ctx.rotate(TREE_ANGLE);
                ctx.translate(0, L);
            }
            if (fracStep > 0) {
                const s = Math.pow(TREE_SCALE_FACTOR, fracStep);
                const r = TREE_ANGLE * fracStep;
                const tr = L * fracStep;
                ctx.scale(s, s);
                ctx.rotate(r);
                ctx.translate(0, tr);
            }

            drawTree(ctx, 0, 0, L, -90, 8); // Depth 8 for deep zoom
            ctx.restore();
        }

        // --- GRAPH ---
        if (graphCanvasRef.current) {
            const ctx = graphCanvasRef.current.getContext('2d');
            const w = graphCanvasRef.current.width;
            const h = graphCanvasRef.current.height;
            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = '#111';
            ctx.fillRect(0, 0, w, h);

            ctx.save();
            ctx.translate(0, h / 2);

            const sx = Math.pow(GRAPH_SCALE_X, t);
            const sy = Math.pow(Math.pow(2, 0.5), t);

            ctx.scale(sx, sy);

            ctx.beginPath();
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 2 / sx;

            for (let i = 0; i < graphPoints.length; i++) {
                const p = graphPoints[i];
                const px = p.x * w;
                const py = p.y * (h / 4);
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.stroke();
            ctx.restore();
        }
    };

    const drawTree = (ctx, x, y, len, angleDeg, depth) => {
        if (depth <= 0) return;

        const rad = angleDeg * Math.PI / 180;
        const x2 = x + len * Math.cos(rad);
        const y2 = y + len * Math.sin(rad);

        ctx.lineWidth = depth < 1 ? 1 : depth;
        ctx.strokeStyle = `hsl(150, ${50 + depth * 10}%, ${40 + depth * 10}%)`;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        drawTree(ctx, x2, y2, len * 0.7, angleDeg - 25, depth - 1);
        drawTree(ctx, x2, y2, len * 0.7, angleDeg + 25, depth - 1);
    };

    return (
        <div style={{
            width: '100%',
            marginTop: '2rem',
            padding: '1rem',
            borderTop: '1px solid var(--color-surface-hover)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <h3 style={{ color: 'var(--color-highlight)', marginBottom: '1rem' }}>Fractal Zoom Comparison</h3>
            <p style={{ maxWidth: '600px', textAlign: 'center', marginBottom: '1.5rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                Comparing the branching of a tree to the 'branching' of stock prices.
                Both exhibit similar structures when zoomed in (Self-Similarity).
            </p>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: '240px', height: '200px',
                        background: '#111',
                        borderRadius: '8px',
                        border: '1px solid var(--color-surface-hover)',
                        overflow: 'hidden',
                        position: 'relative'
                    }}>
                        <canvas ref={treeCanvasRef} width={240} height={200} />
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#888', display: 'block', marginTop: '0.5rem' }}>Tree Branching</span>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: '240px', height: '200px',
                        background: '#111',
                        borderRadius: '8px',
                        border: '1px solid var(--color-surface-hover)',
                        overflow: 'hidden'
                    }}>
                        <canvas ref={graphCanvasRef} width={240} height={200} />
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#888', display: 'block', marginTop: '0.5rem' }}>Market Price</span>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button
                    onClick={handleZoom}
                    disabled={isAnimating}
                    style={{
                        padding: '0.6rem 2rem',
                        background: 'var(--color-accent)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: isAnimating ? 'default' : 'pointer',
                        fontSize: '1rem',
                        transition: 'all 0.2s',
                        fontWeight: 'bold',
                        opacity: isAnimating ? 0.8 : 1
                    }}
                >
                    Zoom In
                </button>

                <button
                    onClick={handleReset}
                    disabled={isAnimating}
                    style={{
                        padding: '0.6rem 1rem',
                        background: 'transparent',
                        color: 'var(--color-text-secondary)',
                        border: '1px solid var(--color-surface-hover)',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s'
                    }}
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default FractalTreeComparison;
