import { useRef } from 'react';
import { motion } from 'framer-motion';
import TimelineNode from './TimelineNode';
import PropTypes from 'prop-types';

const parseYear = (yearStr) => {
    if (String(yearStr).toLowerCase() === 'now') return new Date().getFullYear();
    // match first 4 digits
    const match = String(yearStr).match(/\d{4}/);
    return match ? parseInt(match[0], 10) : 1900;
};

const Timeline = ({ events, activeEvent, onEventSelect }) => {
    const scrollRef = useRef(null);

    // 1. Sort events by parsed year just in case
    const sortedEvents = [...events].sort((a, b) => parseYear(a.year) - parseYear(b.year));

    // 2. Find Range
    if (sortedEvents.length === 0) return null;
    const minYear = parseYear(sortedEvents[0].year);
    const maxYear = parseYear(sortedEvents[sortedEvents.length - 1].year);
    const totalDuration = maxYear - minYear;

    // Safety check for single event or zero duration
    const duration = totalDuration === 0 ? 1 : totalDuration;

    return (
        <div style={{ width: '100%', padding: '0 var(--spacing-md)' }}>
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
                    maxWidth: '1200px',
                    margin: '0 auto',
                    height: '150px', // Fixed height for absolute nodes
                    overflowX: 'auto', // Keep scrolling if screen is too small, though absolute layout logic might need min-width
                }}
            >
                {/* Scrollable Inner Container to ensure min-width for mobile */}
                <div style={{ position: 'relative', minWidth: '800px', height: '100%' }}>

                    {/* Background Line */}
                    <div style={{
                        position: 'absolute',
                        top: '50px', // Vertically centered roughly
                        left: '20px', // Start padding
                        right: '20px', // End padding
                        height: '2px',
                        background: 'var(--color-timeline-line-color)',
                        zIndex: 0
                    }} />

                    {sortedEvents.map((event, index) => {
                        const year = parseYear(event.year);
                        // Calculate percentage position (0 to 1)
                        const relativePos = (year - minYear) / duration;
                        // Convert to percentage string (leave padding on sides)
                        // Mapping 0->0% and 1->100% within the "safe area" (e.g., 5% to 95%)
                        const leftPercent = 5 + (relativePos * 90);

                        return (
                            <div
                                key={event.id}
                                style={{
                                    position: 'absolute',
                                    left: `${leftPercent}%`,
                                    top: '20px', // Adjust to align node circle with line
                                    transform: 'translateX(-50%)', // Center node on the point
                                    zIndex: 1
                                }}
                            >
                                <TimelineNode
                                    event={event}
                                    isActive={activeEvent && activeEvent.id === event.id}
                                    onClick={onEventSelect}
                                    isLast={index === sortedEvents.length - 1}
                                />
                            </div>
                        );
                    })}
                </div>
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
