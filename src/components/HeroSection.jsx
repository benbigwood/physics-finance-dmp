import React from 'react';
import { timelineEvents } from '../data/timelineEvents';

const HeroSection = () => {
    return (
        <div style={{
            textAlign: 'center',
            padding: '4rem 2rem 2rem 2rem',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <h1 style={{
                margin: 0,
                fontSize: '3.5rem',
                letterSpacing: '-0.03em',
                color: 'var(--color-text-primary)'
            }}>
                Physics in Finance
            </h1>
            <p style={{
                margin: '0.5rem 0 1.5rem 0',
                color: 'var(--color-text-secondary)',
                fontSize: '1.3rem',
                fontWeight: 400
            }}>
                From Speculation to Simulation
            </p>

            <div style={{
                maxWidth: '800px',
                margin: '0 auto 0 auto',
                color: 'var(--color-text-secondary)',
                lineHeight: '1.6',
                fontSize: '1rem',
                textAlign: 'center'
            }}>
                <p style={{ marginBottom: '1rem' }}>
                    This platform is engineered for university physics students to bridge the gap between theoretical physics and financial modelling. It elucidates how physical principles—from Brownian motion to Quantum mechanics—have evolved to describe market dynamics, offering a rigorous insight into the 'Physics of Finance'. Ultimately, this serves to highlight the versatility of physics, demonstrating how its models can be adapted to unravel complexity in fields far beyond the natural sciences.
                </p>
                <p>
                    <strong>Navigating the Timeline:</strong> The interactive graph below represents the chronological evolution of these models. Select any node to explore the historical context, the mathematical derivations linking physics to finance, and interactive simulations that visualize these theories in real-time.
                </p>
            </div>
        </div>
    );
};

export default HeroSection;
