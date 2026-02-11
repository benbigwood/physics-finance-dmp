import React from 'react';
import { timelineEvents } from '../data/timelineEvents';

const HeroSection = ({ filterType, setFilterType }) => {
    return (
        <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
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

            {/* Filter Controls (Segmented Control Style) */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{
                    background: 'var(--color-surface-hover)',
                    padding: '4px',
                    borderRadius: 'var(--radius-md)',
                    display: 'inline-flex',
                    alignItems: 'center'
                }}>
                    <span style={{
                        fontSize: '0.85rem',
                        color: 'var(--color-text-tertiary)',
                        padding: '0 10px',
                        marginRight: '4px'
                    }}>
                        Explore:
                    </span>
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            background: 'transparent',
                            color: 'var(--color-text-primary)',
                            border: 'none',
                            outline: 'none',
                            fontSize: '0.95rem',
                            fontWeight: 500,
                            cursor: 'pointer'
                        }}
                    >
                        <option value="All">All Concepts</option>
                        {Array.from(new Set(timelineEvents.map(e => e.visualType))).map(type => (
                            <option key={type} value={type}>
                                {type.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
