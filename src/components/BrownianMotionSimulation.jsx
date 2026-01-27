import { useEffect, useRef, useState } from 'react';

const BrownianMotionSimulation = () => {
    const canvasGraphRef = useRef(null);
    const canvasParticleRef = useRef(null);
    const [volatility, setVolatility] = useState(2);
    const [isRunning, setIsRunning] = useState(true);

    const volRef = useRef(volatility);
    useEffect(() => { volRef.current = volatility; }, [volatility]);

    useEffect(() => {
        const canvasP = canvasParticleRef.current;
        const ctxP = canvasP.getContext('2d');
        const canvasG = canvasGraphRef.current;
        const ctxG = canvasG.getContext('2d');

        // Physics State
        const particles = [];
        // Reduced particle count slightly for smaller area (120x200)
        const numParticles = 40;
        const mainParticle = {
            x: canvasP.width / 2,
            y: canvasP.height / 2,
            vx: 0,
            vy: 0,
            radius: 8,
            mass: 4,
            color: '#38bdf8'
        };

        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * canvasP.width,
                y: Math.random() * canvasP.height,
                vx: (Math.random() - 0.5) * volRef.current,
                vy: (Math.random() - 0.5) * volRef.current,
                radius: 3,
                mass: 4,
                color: '#666'
            });
        }

        let animationFrameId;
        const widthG = canvasG.width;
        const heightG = canvasG.height;
        const startY = heightG / 2;

        // Graph State
        let path = [{ x: 0, y: startY }];
        let currentStep = 0;
        const maxSteps = 400;

        const updatePhysics = () => {
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

                if (p.x < 0 || p.x > canvasP.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvasP.height) p.vy *= -1;

                const dx = p.x - mainParticle.x;
                const dy = p.y - mainParticle.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < p.radius + mainParticle.radius) {
                    const angle = Math.atan2(dy, dx);

                    const force = 2.0;
                    const impulseY = Math.sin(angle) * force * p.mass;
                    mainParticle.vy -= impulseY / mainParticle.mass;

                    p.vx = -p.vx;
                    p.vy = -p.vy;

                    const overlap = (p.radius + mainParticle.radius) - dist + 1;
                    p.x += Math.cos(angle) * overlap;
                    p.y += Math.sin(angle) * overlap;
                }
            });

            mainParticle.y += mainParticle.vy;
            mainParticle.x = canvasP.width / 2;

            // HEAVY DAMPING
            mainParticle.vy *= 0.6;

            const dy = (canvasP.height / 2) - mainParticle.y;
            mainParticle.vy += dy * 0.002;

            if (mainParticle.y < mainParticle.radius) {
                mainParticle.y = mainParticle.radius;
                mainParticle.vy *= -0.5;
            }
            if (mainParticle.y > canvasP.height - mainParticle.radius) {
                mainParticle.y = canvasP.height - mainParticle.radius;
                mainParticle.vy *= -0.5;
            }
        };

        const drawParticles = () => {
            ctxP.clearRect(0, 0, canvasP.width, canvasP.height);

            ctxP.beginPath();
            ctxP.moveTo(canvasP.width / 2, 0);
            ctxP.lineTo(canvasP.width / 2, canvasP.height);
            ctxP.strokeStyle = '#333';
            ctxP.lineWidth = 1;
            ctxP.setLineDash([5, 5]);
            ctxP.stroke();
            ctxP.setLineDash([]);

            ctxP.fillStyle = '#888';
            ctxP.font = '11px sans-serif'; // Slightly smaller font
            ctxP.textAlign = 'center';
            ctxP.fillText("Displacement ↕", canvasP.width / 2, 15);

            ctxP.beginPath();
            ctxP.arc(mainParticle.x, mainParticle.y, mainParticle.radius, 0, Math.PI * 2);
            ctxP.fillStyle = mainParticle.color;
            ctxP.fill();

            ctxP.shadowBlur = 0;

            ctxP.fillStyle = '#666';
            particles.forEach(p => {
                ctxP.beginPath();
                ctxP.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctxP.fill();
            });
        };

        const drawGraph = () => {
            const padLeft = 40;
            const padBottom = 20; // Reduced padding
            const padRight = 10;
            const padTop = 10;

            const graphW = widthG - padLeft - padRight;
            const graphH = heightG - padTop - padBottom;

            if (currentStep < maxSteps) {
                const nextX = (currentStep / maxSteps) * graphW;
                const nextY = mainParticle.y;
                path.push({ x: nextX, y: nextY });
                currentStep += 0.5;
            } else {
                path.shift();
                const shiftAmt = graphW / maxSteps;
                path.forEach(p => p.x -= shiftAmt);
                path.push({ x: graphW, y: mainParticle.y });
            }

            ctxG.clearRect(0, 0, widthG, heightG);

            ctxG.strokeStyle = '#555';
            ctxG.lineWidth = 1;
            ctxG.beginPath();
            ctxG.moveTo(padLeft, padTop);
            ctxG.lineTo(padLeft, heightG - padBottom);
            ctxG.lineTo(widthG - padRight, heightG - padBottom);
            ctxG.stroke();

            ctxG.fillStyle = '#aaa';
            ctxG.font = '11px sans-serif';
            ctxG.textAlign = 'center';

            ctxG.fillText("Time →", widthG / 2 + padLeft / 2, heightG - 5);

            ctxG.save();
            ctxG.translate(12, heightG / 2); // Adjusted label pos
            ctxG.rotate(-Math.PI / 2);
            ctxG.fillText("Price ↕", 0, 0);
            ctxG.restore();

            const startYGraph = startY;
            ctxG.beginPath();
            ctxG.strokeStyle = '#444';
            ctxG.setLineDash([4, 4]);
            ctxG.moveTo(padLeft, startYGraph);
            ctxG.lineTo(widthG - padRight, startYGraph);
            ctxG.stroke();
            ctxG.setLineDash([]);

            ctxG.fillStyle = '#666';
            ctxG.font = '10px sans-serif';
            ctxG.textAlign = 'right';
            ctxG.fillText("Start Price", widthG - padRight - 5, startYGraph - 5);

            ctxG.beginPath();
            ctxG.save();
            ctxG.rect(padLeft, padTop, graphW, graphH);
            ctxG.clip();

            ctxG.strokeStyle = '#38bdf8';
            ctxG.lineWidth = 2;

            ctxG.shadowBlur = 0;
            ctxG.shadowColor = 'transparent';

            if (path.length > 0) {
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
    }, [isRunning]);

    const handleRestart = () => {
        setIsRunning(false);
        setTimeout(() => setIsRunning(true), 10);
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ color: 'var(--color-highlight)', marginBottom: '1rem' }}>Physics of Randomness</h3>

            <div style={{ display: 'flex', width: '100%', gap: '1rem', height: '200px', marginBottom: '1rem' }}>

                {/* Particle Tank - Resized to 120px wide, 200px high */}
                <div style={{
                    width: '120px',
                    height: '100%',
                    background: '#111',
                    borderRadius: '8px',
                    border: '1px solid var(--color-surface-hover)',
                    position: 'relative'
                }}>
                    {/* Canvas matches container dimensions */}
                    <canvas ref={canvasParticleRef} width={120} height={200} />
                </div>

                {/* Graph - Resized to 200px high */}
                <div style={{
                    flex: 1,
                    position: 'relative',
                    height: '100%',
                    background: '#111',
                    borderRadius: '8px',
                    border: '1px solid var(--color-surface-hover)'
                }}>
                    <canvas ref={canvasGraphRef} width={500} height={200} style={{ width: '100%', height: '100%' }} />
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button
                    onClick={handleRestart}
                    style={{
                        padding: '0.4rem 0.8rem', // Slightly smaller button
                        background: 'var(--color-accent)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                    }}
                >
                    Restart
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <label style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Molecular Speed:</label>
                    <input
                        type="range"
                        min="1"
                        max="8"
                        step="0.5"
                        value={volatility}
                        onChange={(e) => setVolatility(parseFloat(e.target.value))}
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
