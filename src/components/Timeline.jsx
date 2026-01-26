import { useRef } from 'react';

import TimelineNode from './TimelineNode';
import PropTypes from 'prop-types';

const Timeline = ({ events, activeEvent, onEventSelect }) => {
    const scrollRef = useRef(null);

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
                    overflowX: 'auto',
                    paddingBottom: '20px' // Space for scrollbar
                }}
            >
                {/* Flex Container for Even Spacing */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    minWidth: '800px',
                    position: 'relative',
                    padding: '0 40px' // Add padding to sides so first/last nodes aren't on edge
                }}>

                    {/* Continuous Background Line */}
                    <div style={{
                        position: 'absolute',
                        top: '60px', // Adjust to align with the center of the node (approx 1.5rem label + 1rem margin + 20px center)
                        left: '40px', // Matches container padding
                        right: '40px', // Matches container padding
                        height: '2px',
                        background: 'var(--timeline-line-color)',
                        zIndex: 0
                    }} />

                    {events.map((event, index) => (
                        <div key={event.id} style={{ zIndex: 1 }}>
                            <TimelineNode
                                event={event}
                                isActive={activeEvent && activeEvent.id === event.id}
                                onClick={onEventSelect}
                                isLast={index === events.length - 1}
                            />
                        </div>
                    ))}
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
