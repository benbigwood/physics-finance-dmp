import { useRef } from 'react';
import TimelineNode from './TimelineNode';
import PropTypes from 'prop-types';
import { timelineEvents } from '../data/timelineEvents';

const Timeline = ({ events, activeEvent, onEventSelect, filterType, setFilterType }) => {
    const scrollRef = useRef(null);

    // Manual "Stock Market" Data Points (0-100 scale, where 100 is top)
    // Simulating a volatile but upward trend
    const marketData = [
        20, // 1900 - Start low
        45, // 1952 - Big jump (MPT)
        30, // 1960 - Drop (Fractals/Chaos)
        60, // 1973 - Steady rise (Black-Scholes)

        75, // Now - Slight correction/volatility
        95  // Future - Quantum leap
    ];

    // Calculate coordinates using padded width (5% to 95%) to prevent clipping
    const PADDING_X = 5;
    const points = events.map((event, index) => {
        const xRaw = (index / (events.length - 1));
        const x = PADDING_X + xRaw * (100 - 2 * PADDING_X); // Map 0-1 to 5-95%
        const y = 100 - (marketData[index] || 50);
        return { x, y, id: event.id };
    });

    // Generate SVG Path
    const pathD = points.map((p, i) => (
        `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
    )).join(' ');

    // Area fill path (drop down to bottom, close loop)
    const areaPathD = `${pathD} L ${points[points.length - 1].x} 100 L ${points[0].x} 100 Z`;

    // Mapping for user-friendly labels in the Explore dropdown
    const typeLabels = {
        'brownian': 'Brownian Motion',
        'distribution': 'Modern Portfolio Theory',
        'fractal': 'Fractal Markets',
        'heat-equation': 'Black-Scholes Model',
        'simulation': 'Computational Finance',
        'interactive-list': 'Quantum & Future Finance'
    };

    return (
        <div style={{ width: '100%', padding: '0', overflow: 'visible' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: 'var(--spacing-lg)',
                padding: '0 10px'
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

                {/* Compact Filter Controls */}
                <div style={{
                    background: 'var(--color-surface-hover)',
                    padding: '2px 4px',
                    borderRadius: 'var(--radius-md)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    transform: 'translateY(4px)' // Small alignment adjustment
                }}>
                    <span style={{
                        fontSize: '0.75rem',
                        color: 'var(--color-text-tertiary)',
                        padding: '0 6px',
                        fontWeight: 500
                    }}>
                        Explore:
                    </span>
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            background: 'transparent',
                            color: 'var(--color-text-primary)',
                            border: 'none',
                            outline: 'none',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        <option value="All">All Concepts</option>
                        {Array.from(new Set(timelineEvents.map(e => e.visualType))).map(type => (
                            <option key={type} value={type}>
                                {typeLabels[type] || type.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div
                ref={scrollRef}
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '320px', // Slightly shorter for cleaner look
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
                    const isRelevant = filterType === 'All' || event.visualType === filterType;

                    return (
                        <TimelineNode
                            key={event.id}
                            event={event}
                            isActive={activeEvent && activeEvent.id === event.id}
                            isDimmed={!isRelevant}
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
    onEventSelect: PropTypes.func.isRequired,
    filterType: PropTypes.string,
    setFilterType: PropTypes.func
};

export default Timeline;
