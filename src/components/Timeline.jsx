import { useRef } from 'react';
import { motion } from 'framer-motion';
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
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    overflowX: 'auto',
                    paddingBottom: 'var(--spacing-md)',
                    position: 'relative',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    gap: 'var(--spacing-sm)'
                }}
            >
                {/* Background Line */}
                <div style={{
                    position: 'absolute',
                    top: 'calc(1.5rem + 10px - 1px)', // Align with node centers
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'var(--color-surface-hover)',
                    zIndex: 0
                }} />

                {events.map((event, index) => (
                    <TimelineNode
                        key={event.id}
                        event={event}
                        isActive={activeEvent && activeEvent.id === event.id}
                        onClick={onEventSelect}
                        isLast={index === events.length - 1}
                    />
                ))}
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
