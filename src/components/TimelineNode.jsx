import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const TimelineNode = ({ event, isActive, onClick, isLast }) => {
    return (
        <div
            className="timeline-node-container"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: '120px',
                position: 'relative'
            }}
        >
            {/* Date Label */}
            <span style={{
                marginBottom: '1rem',
                fontFamily: 'var(--font-display)',
                color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                fontWeight: 'bold'
            }}>
                {event.year}
            </span>

            {/* Node Dot */}
            <motion.button
                onClick={() => onClick(event)}
                whileHover={{ scale: 1.2, backgroundColor: 'var(--color-accent)' }}
                animate={{
                    scale: isActive ? 1.3 : 1,
                    backgroundColor: isActive ? 'var(--color-accent)' : (isLast ? 'transparent' : 'var(--color-surface)'),
                    borderColor: isActive ? 'var(--color-accent)' : (isLast ? 'transparent' : 'var(--color-timeline-line-color)')
                }}
                style={{
                    width: isLast ? '40px' : '20px',
                    height: isLast ? '40px' : '20px',
                    borderRadius: '50%',
                    border: isLast ? 'none' : '2px solid',
                    background: isLast ? 'conic-gradient(from 0deg, #38bdf8, #f59e0b, #38bdf8)' : 'var(--color-surface)',
                    cursor: 'pointer',
                    zIndex: 2,
                    position: 'relative',
                    padding: 0,
                    boxShadow: isActive ? '0 0 15px var(--color-accent-glow)' : 'none'
                }}
                aria-label={`Select event ${event.title}`}
            >
                {isLast && (
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                    />
                )}
            </motion.button>

            {/* Connecting Line (for all but last) */}
            {!isLast && (
                <div style={{
                    position: 'absolute',
                    top: 'calc(1.5rem + 10px - 1px)', // Adjust based on label height + node radius
                    left: '50%',
                    width: '100%',
                    height: '2px',
                    background: 'var(--color-timeline-line-color)',
                    zIndex: 1
                }} />
            )}

            {/* Title (Mobile/Tablet optional) */}
            <span style={{
                marginTop: '0.5rem',
                fontSize: '0.8rem',
                color: 'var(--color-text-secondary)',
                opacity: isActive ? 1 : 0.7,
                textAlign: 'center',
                maxWidth: '100px'
            }}>
                {event.visualType === 'interactive-list' ? 'The Frontier' : event.title.split(' ')[0]}
            </span>
        </div>
    );
};

TimelineNode.propTypes = {
    event: PropTypes.object.isRequired,
    isActive: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    isLast: PropTypes.bool
};

export default TimelineNode;
