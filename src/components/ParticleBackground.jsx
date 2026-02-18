import React, { useRef, useEffect } from 'react';

const ParticleBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Set canvas size
        const handleResize = () => {
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        // Configuration
        const particleCount = 50;
        const connectionDistance = 100;

        // Equations from the project (Unicode formatting)
        const equationTexts = [
            "dS = μSdt + σSdW",                     // Geometric Brownian Motion
            "∂ₜV + ½σ²S² ∂ₛₛV + rS ∂ₛV − rV = 0",   // Black-Scholes (Compact notation)
            "σₚ² = wᵀΣw",                           // Portfolio Variance
            "P(|r| > x) ∼ x⁻ᵃ",                     // Power Law / Fractals
            "E[Wₜ²] = t",                           // Variance of Wiener Process
            "∂ₜu = κ∂ₓₓu",                          // Heat Equation
            "Xₙ₊₁ = Xₙ + ξₙ₊₁",                     // Random Walk
        ];

        // Physics Helpers
        const resolveCollision = (p1, p2) => {
            const xVelocityDiff = p1.vx - p2.vx;
            const yVelocityDiff = p1.vy - p2.vy;

            const xDist = p2.x - p1.x;
            const yDist = p2.y - p1.y;

            // Prevent accidental overlap
            if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

                // Grab angle between the two colliding particles
                const angle = -Math.atan2(p2.y - p1.y, p2.x - p1.x);

                // Rotated velocities
                const u1 = rotate(p1.vx, p1.vy, angle);
                const u2 = rotate(p2.vx, p2.vy, angle);

                // Swap velocities (Elastic collision, equal mass)
                // New velocities after collision
                const v1 = { x: u2.x, y: u1.y };
                const v2 = { x: u1.x, y: u2.y };

                // Rotate back
                const vFinal1 = rotate(v1.x, v1.y, -angle);
                const vFinal2 = rotate(v2.x, v2.y, -angle);

                // Apply new velocities
                p1.vx = vFinal1.x;
                p1.vy = vFinal1.y;
                p2.vx = vFinal2.x;
                p2.vy = vFinal2.y;
            }
        };

        const rotate = (vx, vy, angle) => {
            return {
                x: vx * Math.cos(angle) - vy * Math.sin(angle),
                y: vx * Math.sin(angle) + vy * Math.cos(angle)
            };
        };

        class Entity {
            constructor(x, y, radius, isText = false, text = "") {
                this.x = x;
                this.y = y;
                this.radius = radius;
                this.isText = isText;
                this.text = text;
                this.color = isText ? 'rgba(100, 100, 100, 0.8)' : 'rgba(150, 150, 150, 0.5)';
                this.opacity = isText ? 0.8 : 0.5;

                // Constant "Medium" Speed
                // We store Speed Magnitude and Angle conceptually, but vx/vy for updates
                // Equations move slightly slower than dots for readability
                const speed = isText ? 0.3 : 0.7;
                const angle = Math.random() * Math.PI * 2;

                this.vx = Math.cos(angle) * speed;
                this.vy = Math.sin(angle) * speed;
            }

            update() {
                // Movement
                this.x += this.vx;
                this.y += this.vy;

                // Wall Collision (Bounce)
                if (this.x - this.radius <= 0) {
                    this.vx = Math.abs(this.vx);
                    this.x = this.radius;
                } else if (this.x + this.radius >= canvas.width) {
                    this.vx = -Math.abs(this.vx);
                    this.x = canvas.width - this.radius;
                }

                if (this.y - this.radius <= 0) {
                    this.vy = Math.abs(this.vy);
                    this.y = this.radius;
                } else if (this.y + this.radius >= canvas.height) {
                    this.vy = -Math.abs(this.vy);
                    this.y = canvas.height - this.radius;
                }
            }

            draw() {
                if (this.isText) {
                    // Using a cleaner font stack for math symbols
                    ctx.font = `italic 16px "Cambria Math", "Times New Roman", serif`;
                    ctx.fillStyle = this.color;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(this.text, this.x, this.y);
                } else {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                    ctx.fillStyle = this.color;
                    ctx.fill();
                }
            }
        }

        const entities = [];

        // Create Equations
        equationTexts.forEach(text => {
            const radius = 35; // Larger radius for collision detection
            const x = Math.random() * (canvas.width - radius * 2) + radius;
            const y = Math.random() * (canvas.height - radius * 2) + radius;
            entities.push(new Entity(x, y, radius, true, text));
        });

        // Create Particles
        for (let i = 0; i < particleCount; i++) {
            const radius = Math.random() * 2 + 1;
            const x = Math.random() * (canvas.width - radius * 2) + radius;
            const y = Math.random() * (canvas.height - radius * 2) + radius;
            entities.push(new Entity(x, y, radius, false));
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and Collide
            for (let i = 0; i < entities.length; i++) {
                entities[i].update();

                // Check collisions with other entities
                for (let j = i + 1; j < entities.length; j++) {
                    const dx = entities[i].x - entities[j].x;
                    const dy = entities[i].y - entities[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const minDistance = entities[i].radius + entities[j].radius;

                    if (distance < minDistance) {
                        resolveCollision(entities[i], entities[j]);

                        // Overlap correction (prevent sticking)
                        const overlap = minDistance - distance;
                        if (overlap > 0) {
                            const angle = Math.atan2(dy, dx);
                            const moveX = Math.cos(angle) * overlap / 2;
                            const moveY = Math.sin(angle) * overlap / 2;

                            entities[i].x += moveX;
                            entities[i].y += moveY;
                            entities[j].x -= moveX;
                            entities[j].y -= moveY;
                        }
                    }
                }
            }

            // Draw everything
            ctx.strokeStyle = `rgba(150, 150, 150, 0.1)`;
            ctx.lineWidth = 0.5;

            for (let i = 0; i < entities.length; i++) {
                entities[i].draw();

                // Draw lines between discrete particles only
                if (!entities[i].isText) {
                    for (let j = i + 1; j < entities.length; j++) {
                        if (!entities[j].isText) {
                            const dx = entities[i].x - entities[j].x;
                            const dy = entities[i].y - entities[j].y;
                            const distance = Math.sqrt(dx * dx + dy * dy);

                            if (distance < connectionDistance) {
                                ctx.beginPath();
                                ctx.moveTo(entities[i].x, entities[i].y);
                                ctx.lineTo(entities[j].x, entities[j].y);
                                ctx.stroke();
                            }
                        }
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0, // Behind content
                pointerEvents: 'none',
                opacity: 0.5
            }}
        />
    );
};

export default ParticleBackground;
