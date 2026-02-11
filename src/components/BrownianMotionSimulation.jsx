import { useEffect, useRef, useState } from 'react';

const BrownianMotionSimulation = () => {
    const canvasGraphRef = useRef(null);
    const canvasParticleRef = useRef(null);
    const [volatility, setVolatility] = useState(2);
    const [isRunning, setIsRunning] = useState(true);

    const volRef = useRef(volatility);
    useEffect(() => { volRef.current = volatility; }, [volatility]);

    // --- Resize / DPI Handling ---
    const [particleSize, setParticleSize] = useState({ w: 0, h: 0 });
    const [graphSize, setGraphSize] = useState({ w: 0, h: 0 });

    const particleContainerRef = useRef(null);
    const graphContainerRef = useRef(null);

    useEffect(() => {
        const handleResize = (entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                if (entry.target === particleContainerRef.current) {
                    setParticleSize({ w: width, h: height });
                } else if (entry.target === graphContainerRef.current) {
                    setGraphSize({ w: width, h: height });
                }
            }
        };

        const observer = new ResizeObserver(handleResize);
        if (particleContainerRef.current) observer.observe(particleContainerRef.current);
        if (graphContainerRef.current) observer.observe(graphContainerRef.current);

        return () => observer.disconnect();
    }, []);

    // --- State for Drawing ---
    useEffect(() => {
        // Need both sizes to be ready
        if (particleSize.w === 0 || graphSize.w === 0) return;

        const dpr = window.devicePixelRatio || 1;

        // Setup Particle Canvas
        const canvasP = canvasParticleRef.current;
        const ctxP = canvasP.getContext('2d');
        canvasP.width = particleSize.w * dpr;
        canvasP.height = particleSize.h * dpr;
        ctxP.scale(dpr, dpr);

        // Setup Graph Canvas
        const canvasG = canvasGraphRef.current;
        const ctxG = canvasG.getContext('2d');
        canvasG.width = graphSize.w * dpr;
        canvasG.height = graphSize.h * dpr;
        ctxG.scale(dpr, dpr);

        // Logic Dimensions (CSS pixels)
        const widthP = particleSize.w;
        const heightP = particleSize.h;
        const widthG = graphSize.w;
        const heightG = graphSize.h;
        const startY = heightG / 2;

        // Physics State (Reset on resize for simplicity or keep? Let's reset to avoid scaling artifacts for now)
        // Actually, let's keep state but clamp.
        const particles = [];
        const numParticles = 40;
        const mainParticle = {
            x: widthP / 2,
            y: heightP / 2,
            vx: 0,
            vy: 0,
            radius: 8,
            mass: 4,
            color: '#38bdf8' // will be overridden by theme
        };

        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * widthP,
                y: Math.random() * heightP,
                vx: (Math.random() - 0.5) * volRef.current,
                vy: (Math.random() - 0.5) * volRef.current,
                radius: 3,
                mass: 4,
                color: '#666'
            });
        }

        // Graph State
        let path = [{ x: 0, y: startY }];
        let currentStep = 0;
        const maxSteps = 400; // Keep fixed resolution in time

        let animationFrameId;

        const updatePhysics = () => {
            // ... (Physics logic same as before, but using widthP/heightP)
            particles.forEach(p => {
                const currentFnSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                const targetSpeed = volRef.current * 1.5;
                if (currentFnSpeed > 0.001) {
                    const ratio = 0.95 + (0.05 * (targetSpeed / currentFnSpeed));
                    p.vx *= ratio;
                    p.vy *= ratio;
                } else {
                    p.vx = (Math.random() - 0.5) * volRef.current;
                    p.vy = (Math.random() - 0.5) * volRef.current;
                }

                p.x += p.vx;
                p.y += p.vy;

                // Bounce off walls
                if (p.x < 0 || p.x > widthP) p.vx *= -1;
                if (p.y < 0 || p.y > heightP) p.vy *= -1;

                // Collision with Main
                const dx = p.x - mainParticle.x;
                const dy = p.y - mainParticle.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < p.radius + mainParticle.radius) {
                    const angle = Math.atan2(dy, dx);
                    const force = 2.0;
                    const impulseY = Math.sin(angle) * force * p.mass;
                    mainParticle.vy -= impulseY / mainParticle.mass;
                    p.vx = -p.vx; p.vy = -p.vy;
                    const overlap = (p.radius + mainParticle.radius) - dist + 1;
                    p.x += Math.cos(angle) * overlap;
                    p.y += Math.sin(angle) * overlap;
                }
            });

            mainParticle.y += mainParticle.vy;
            mainParticle.x = widthP / 2; // Keep centered horizontally

            // Damping & Centering
            mainParticle.vy *= 0.6;
            const dy = (heightP / 2) - mainParticle.y;
            mainParticle.vy += dy * 0.002;

            // Rail bounds
            if (mainParticle.y < mainParticle.radius) {
                mainParticle.y = mainParticle.radius;
                mainParticle.vy *= -0.5;
            }
            if (mainParticle.y > heightP - mainParticle.radius) {
                mainParticle.y = heightP - mainParticle.radius;
                mainParticle.vy *= -0.5;
            }
        };

        const getThemeColors = () => {
            const styles = getComputedStyle(document.documentElement);
            return {
                text: styles.getPropertyValue('--color-text-secondary').trim(),
                textTertiary: styles.getPropertyValue('--color-text-tertiary').trim(),
                grid: styles.getPropertyValue('--color-border').trim(),
                accent: styles.getPropertyValue('--color-accent').trim(),
                bg: styles.getPropertyValue('--color-surface').trim(),
                particle: styles.getPropertyValue('--color-text-tertiary').trim(),
            };
        };

        const drawParticles = () => {
            const colors = getThemeColors();
            // CLEAR using logical dimensions (scaled by ctx.scale)
            ctxP.clearRect(0, 0, widthP, heightP);

            // Rail Line
            ctxP.beginPath();
            ctxP.moveTo(widthP / 2, 0);
            ctxP.lineTo(widthP / 2, heightP);
            ctxP.strokeStyle = colors.grid;
            ctxP.lineWidth = 1;
            ctxP.setLineDash([5, 5]);
            ctxP.stroke();
            ctxP.setLineDash([]);

            // Label - Rotated along the left side to avoid overlapping particles
            ctxP.save();
            ctxP.translate(12, heightP / 2);
            ctxP.rotate(-Math.PI / 2);
            ctxP.fillStyle = colors.textTertiary;
            ctxP.font = '500 12px -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif';
            ctxP.textAlign = 'center';
            ctxP.fillText("Displacement", 0, 0);
            ctxP.restore();

            // Main Particle
            ctxP.beginPath();
            ctxP.arc(mainParticle.x, mainParticle.y, mainParticle.radius, 0, Math.PI * 2);
            ctxP.fillStyle = colors.accent;
            ctxP.fill();

            // Fluid Particles
            ctxP.fillStyle = colors.particle;
            particles.forEach(p => {
                ctxP.beginPath();
                ctxP.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctxP.fill();
            });
        };

        const drawGraph = () => {
            const colors = getThemeColors();
            const padLeft = 40;
            const padBottom = 24;
            const padRight = 16;
            const padTop = 24; // More top padding for "Price" label

            const graphW = widthG - padLeft - padRight;
            const graphH = heightG - padTop - padBottom;

            // Update Path
            if (currentStep < maxSteps) {
                const nextX = (currentStep / maxSteps) * graphW;
                const nextY = mainParticle.y;
                path.push({ x: nextX, y: nextY, vol: volRef.current });
                currentStep += 0.5;
            } else {
                path.shift();
                // Shift all points left to make room
                const shiftAmt = graphW / maxSteps; // Approximate shift
                path.forEach(p => p.x -= shiftAmt);
                path.push({ x: graphW, y: mainParticle.y, vol: volRef.current });
            }

            // Draw
            ctxG.clearRect(0, 0, widthG, heightG);

            // Shaded Volatility Area (Theoretical Band)
            // We'll draw a band based on the CURRENT volatility
            ctxG.save();
            ctxG.beginPath();
            ctxG.rect(padLeft, padTop, graphW, graphH);
            ctxG.clip();

            ctxG.fillStyle = colors.accent;
            ctxG.globalAlpha = 0.05;

            // Draw a symmetrical spreading band: startY +/- sigma * sqrt(t)
            // Note: sigma in the simulation is 'volRef.current'.
            // Scaling factor for visual clarity: vol * 15 * sqrt(relative_time)
            ctxG.beginPath();
            ctxG.moveTo(padLeft, startY);
            for (let i = 0; i <= graphW; i += 5) {
                const relativeT = i / graphW;
                const spread = volRef.current * 15 * Math.sqrt(relativeT);
                ctxG.lineTo(padLeft + i, startY - spread);
            }
            for (let i = graphW; i >= 0; i -= 5) {
                const relativeT = i / graphW;
                const spread = volRef.current * 15 * Math.sqrt(relativeT);
                ctxG.lineTo(padLeft + i, startY + spread);
            }
            ctxG.closePath();
            ctxG.fill();
            ctxG.restore();

            // Time Axis (X)
            ctxG.strokeStyle = colors.textTertiary;
            ctxG.lineWidth = 1;
            ctxG.beginPath();
            ctxG.moveTo(padLeft, heightG - padBottom); // Only draw bottom line
            ctxG.lineTo(widthG - padRight, heightG - padBottom);
            ctxG.stroke();

            // Y Axis line section
            ctxG.beginPath();
            ctxG.moveTo(padLeft, padTop - 12); // Slightly higher for arrow
            ctxG.lineTo(padLeft, heightG - padBottom);
            ctxG.stroke();

            // Axis Arrows
            const headlen = 8; // length of head in pixels
            ctxG.fillStyle = colors.textTertiary;

            // Y-axis arrow
            ctxG.beginPath();
            ctxG.moveTo(padLeft, padTop - 15);
            ctxG.lineTo(padLeft - 4, padTop - 7);
            ctxG.lineTo(padLeft + 4, padTop - 7);
            ctxG.fill();

            // X-axis arrow
            ctxG.beginPath();
            ctxG.moveTo(widthG - padRight + 5, heightG - padBottom);
            ctxG.lineTo(widthG - padRight - 3, heightG - padBottom - 4);
            ctxG.lineTo(widthG - padRight - 3, heightG - padBottom + 4);
            ctxG.fill();

            // Labels - Cleaner, Apple-style, Slightly Larger
            ctxG.fillStyle = colors.textTertiary;
            ctxG.font = '500 13px -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif';

            // X-Axis Label (Time) - Centered
            ctxG.textAlign = 'center';
            ctxG.fillText("Time", padLeft + graphW / 2, heightG - 6);

            // Y-Axis Label (Price) - Top Left, Horizontal
            ctxG.textAlign = 'left';
            ctxG.fillText("Price", padLeft + 12, padTop - 8);

            // Start Price Line
            const startYGraph = startY;

            ctxG.beginPath();
            ctxG.strokeStyle = colors.grid;
            ctxG.setLineDash([4, 4]);
            ctxG.moveTo(padLeft, startYGraph);
            ctxG.lineTo(widthG - padRight, startYGraph);
            ctxG.stroke();
            ctxG.setLineDash([]);

            ctxG.fillStyle = colors.textTertiary;
            ctxG.font = '500 12px -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif';
            ctxG.textAlign = 'right';
            ctxG.fillText("Start Price", widthG - padRight - 5, startYGraph - 5);

            // Clipping Region for Graph Line
            ctxG.save();
            ctxG.beginPath();
            ctxG.rect(padLeft, padTop, graphW, graphH);
            // ctxG.clip(); // Clip disabled to allow line width to bleed slightly if needed, but safer to clip.
            // Let's keep clip but maybe expand it slightly?
            // Actually standard clip is fine.
            ctxG.clip();

            // Draw Path
            ctxG.beginPath();
            ctxG.strokeStyle = colors.accent;
            ctxG.lineWidth = 2;
            ctxG.lineJoin = 'round';
            ctxG.lineCap = 'round';

            // Ensure path points are within graphW
            // Note: path points x are 0..graphW relative to padLeft??
            // In the "Update Path" logic above: `const nextX = (currentStep / maxSteps) * graphW;`
            // So x is 0 to graphW.
            // When drawing, we need to add padLeft.

            if (path.length > 0) {
                // Determine if we need to rescale X because width changed?
                // If widthG changed, old points x are stale.
                // Simple fix: Don't persist path across full re-renders (useEffect dependency on graphSize triggers full reset).
                // For now, let's accept reset on resize.
                ctxG.moveTo(padLeft + path[0].x, path[0].y);
                for (let i = 1; i < path.length; i++) {
                    ctxG.lineTo(padLeft + path[i].x, path[i].y);
                }
            }
            ctxG.stroke();
            ctxG.restore();
        };

        const loop = () => {
            if (!isRunning) return;
            updatePhysics();
            drawParticles();
            drawGraph();
            animationFrameId = requestAnimationFrame(loop);
        };

        loop();
        return () => cancelAnimationFrame(animationFrameId);
    }, [isRunning, particleSize, graphSize]); // Removed volatility to prevent reset

    const handleRestart = () => {
        setIsRunning(false);
        setTimeout(() => setIsRunning(true), 10);
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ color: 'var(--color-highlight)', marginBottom: '1rem' }}>Physics of Randomness</h3>

            <div style={{ display: 'flex', width: '100%', gap: '1rem', height: '220px', marginBottom: '1rem' }}>

                {/* Particle Tank */}
                <div
                    ref={particleContainerRef}
                    style={{
                        width: '120px', // Fixed width for tank logic
                        height: '100%',
                        background: 'var(--color-surface)',
                        backdropFilter: 'var(--backdrop-blur)',
                        WebkitBackdropFilter: 'var(--backdrop-blur)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border)',
                        position: 'relative',
                        boxShadow: 'var(--shadow-sm)',
                        overflow: 'hidden'
                    }}
                >
                    <canvas ref={canvasParticleRef} style={{ width: '100%', height: '100%' }} />
                </div>

                {/* Graph */}
                <div
                    ref={graphContainerRef}
                    style={{
                        flex: 1,
                        position: 'relative',
                        height: '100%',
                        background: 'var(--color-surface)',
                        backdropFilter: 'var(--backdrop-blur)',
                        WebkitBackdropFilter: 'var(--backdrop-blur)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--color-border)',
                        boxShadow: 'var(--shadow-sm)',
                        overflow: 'hidden'
                    }}
                >
                    <canvas ref={canvasGraphRef} style={{ width: '100%', height: '100%' }} />
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(0,0,0,0.05)', padding: '0.6rem 1.2rem', borderRadius: '100px' }}>
                <button
                    onClick={handleRestart}
                    style={{
                        padding: '0.5rem 1.2rem',
                        background: 'var(--color-finance)',
                        color: 'white',
                        border: 'none',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                >
                    Restart
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', fontWeight: '500' }}>
                        Molecular Speed & Volatility:
                    </span>
                    <input
                        type="range"
                        min="0.5"
                        max="8"
                        step="0.1"
                        value={volatility}
                        onChange={(e) => setVolatility(parseFloat(e.target.value))}
                        style={{ width: '120px', accentColor: 'var(--color-finance)' }}
                    />
                </div>
            </div>
            <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', textAlign: 'center', maxWidth: '600px' }}>
                The large blue particle is confined to a vertical rail.
                Collisions with heavy fluid particles cause jagged, random jumps, simulating market volatility.
            </p>
        </div>
    );
};

export default BrownianMotionSimulation;
