import React from 'react';
import { timelineEvents } from '../data/timelineEvents';
import ParticleBackground from './ParticleBackground';

const HeroSection = () => {
    return (
        <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            {/* Top Section with Particles */}
            <div style={{
                position: 'relative',
                width: '100%',
                padding: '4rem 2rem 3rem 2rem',
                overflow: 'hidden',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderBottom: '1px solid var(--color-border)'
            }}>
                <ParticleBackground />

                <div style={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%'
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
                        Particles to Prices: How physics has been applied to finance
                    </p>
                    <p style={{
                        margin: '-1rem 0 0 0',
                        color: 'var(--color-text-primary)',
                        fontSize: '0.9rem',
                        fontWeight: 400
                    }}>
                        Published and made by Alicia Lamplugh, Ben Bigwood, Will Kitching, Will Murray, and Alex Wilkinson
                    </p>
                </div>
            </div>

            {/* Intro Text Section (Clean Background) */}
            <div style={{
                width: '100%',
                padding: '2rem 2rem 0 2rem',
                display: 'flex',
                justifyContent: 'center',
            }}>
                <div style={{
                    maxWidth: '1100px',
                    color: 'var(--color-text-primary)',
                    lineHeight: '1.6',
                    fontSize: '1.4rem',
                    fontWeight: 500,
                    textAlign: 'center',
                    textShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}>
                    <p style={{
                        marginBottom: '1.5rem',
                        color: 'var(--color-finance)',
                        fontWeight: 600
                    }}>
                        This website is a resource for university physics students to explore the fascinating bridge from physics to finance. It highlights how core physical principles, from the analysis of Brownian motion to advanced quantum mechanics, are being actively applied to financial markets to generate more accurate predictions.
                    </p>
                    <p style={{
                        marginBottom: '1.5rem',
                        color: 'var(--color-finance)',
                        fontWeight: 600
                    }}>
                        The journey began in the early 1900s with Louis Bachelier's pioneering work on the "random walk" nature of the market, progressed significantly with the development of the trillion-pound Black-Scholes equation in 1973, and continues today as physicists leverage the latest quantum technologies for improved forecasting.
                    </p>
                    <p style={{
                        marginBottom: '2rem',
                        color: 'var(--color-finance)',
                        fontWeight: 600
                    }}>
                        We offer an interactive and informative platform to discover the unique applications of your physics studies within finance. Whether you are simply curious about this specialised field or are interested in acquiring the problem-solving patterns needed to potentially profit from these methods, we hope you find this application of physics to finance truly captivating.
                    </p>
                    <p style={{ fontSize: '0.9rem', opacity: 0.8, color: 'var(--color-text-tertiary)', marginBottom: 0 }}>
                        <strong>Navigating the Timeline:</strong> The interactive graph below represents the chronological evolution of these models. Select any node to explore the historical context, the mathematical derivations linking physics to finance, and interactive simulations that visualise these theories in real-time.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
