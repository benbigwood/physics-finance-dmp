import { useRef } from 'react';

import TimelineNode from './TimelineNode';
import PropTypes from 'prop-types';

const Timeline = ({ events, activeEvent, onEventSelect }) => {
    const scrollRef = useRef((null)); // Double parens to ensure valid JSX just in case, though null is fine.

    // Manual "Stock Market" Data Points (0-100 scale, where 100 is top)
    // Simulating a volatile but upward trend
    const marketData = [
        20, // 1900 - Start low
        45, // 1952 - Big jump (MPT)
        30, // 1960 - Drop (Fractals/Chaos)
        60, // 1973 - Steady rise (Black-Scholes)
        80, // 2000 - Tech boom
        75, // Now - Slight correction/volatility
        95  // Future - Quantum leap
    ];

    // Calculate coordinates
    const points = events.map((event, index) => {
        const x = (index / (events.length - 1)) * 100; // 0 to 100%
        const y = 100 - (marketData[index] || 50); // Invert for CSS/SVG (0 is top)
        return { x, y, id: event.id };
    });

    // Generate SVG Path
    // M x0 y0 L x1 y1 ...
    // We need to convert % to a coordinate system for SVG.
    // Use viewBox="0 0 100 100" and preserveAspectRatio="none" to stretch.
    const pathD = points.map((p, i) => (
        `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
    )).join(' ');

    // Area fill path (close the loop to the bottom)
    const areaPathD = `${pathD} L 100 100 L 0 100 Z`;

    return (
        <div style={{ width: '100%', padding: '0 var(--spacing-md)', overflowX: 'auto', overflowY: 'hidden' }}>
            <h2 style={{
                textAlign: 'center',
                marginBottom: 'var(--spacing-lg)',
                color: 'var(--color-accent)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontSize: '1rem'
            }}>
                Evolution of Physics in Finance
            </h2>

            <div
                ref={scrollRef}
                style={{
                    position: 'relative',
                    width: '100%',
                    minWidth: '800px', // Ensure enough width for the graph
                    height: '400px',
                    margin: '0 auto',
                    maxWidth: '1200px',
                    padding: '20px 0' // Space for labels
                }}
            >
                {/* SVG Graph Background */}
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}
                >
                    {/* Gradient Definition */}
                    <defs>
                        <linearGradient id="graphGradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Area Fill */}
                    <path
                        d={areaPathD}
                        fill="url(#graphGradient)"
                        stroke="none"
                    />

                    {/* Main Line */}
                    <path
                        d={pathD}
                        fill="none"
                        stroke="var(--color-accent)"
                        strokeWidth="0.5" // Relative to 100x100 coord system
                        vectorEffect="non-scaling-stroke" // Keeps line width constant despite scaling
                        style={{ strokeWidth: '2px' }} // CSS override for consistent thickness
                    />
                </svg>

                {/* Nodes */}
                {events.map((event, index) => {
                    const point = points[index];
                    return (
                        <TimelineNode
                            key={event.id}
                            event={event}
                            isActive={activeEvent && activeEvent.id === event.id}
                            onClick={onEventSelect}
                            isLast={index === events.length - 1}
                            style={{
                                left: `${point.x}%`,
                                top: `${point.y}%`
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};

Timeline.propTypes = {
    events: PropTypes.array.isRequired,
    activeEvent: PropTypes.object,
    onEventSelect: PropTypes.func.isRequired
};

export default Timeline;
