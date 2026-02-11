import { useRef } from 'react';
import TimelineNode from './TimelineNode';
import PropTypes from 'prop-types';

const Timeline = ({ events, activeEvent, onEventSelect }) => {
    const scrollRef = useRef(null);

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

    // Calculate coordinates using full width (0% to 100%)
    const points = events.map((event, index) => {
        const x = (index / (events.length - 1)) * 100; // Map 0-1 to range
        const y = 100 - (marketData[index] || 50); // Invert for CSS/SVG (0 is top)
        return { x, y, id: event.id };
    });

    // Generate SVG Path
    const pathD = points.map((p, i) => (
        `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
    )).join(' ');

    // Area fill path (close the loop to the bottom)
    // Area fill path (close the loop to the bottom)
    const areaPathD = `${pathD} L 100 100 L 0 100 Z`;

    return (
        <div style={{ width: '100%', padding: '0', overflow: 'visible' }}>
            <div style={{
                textAlign: 'center',
                marginBottom: 'var(--spacing-lg)',
            }}>
                <h2 style={{
                    color: 'var(--color-text-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    margin: 0
                }}>
                    Timeline Progression
                </h2>
            </div>

            <div
                ref={scrollRef}
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '220px', // Slightly shorter for cleaner look
                    margin: '0 auto',
                    // maxWidth removed to ensure full width
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
                            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.15" />
                            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
                        </linearGradient>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="1" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
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
                        vectorEffect="non-scaling-stroke" // Keeps line width constant despite scaling
                        style={{
                            strokeWidth: '2px',
                            strokeLinecap: 'round',
                            strokeLinejoin: 'round',
                            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
                        }}
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
                            isFirst={index === 0}
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
