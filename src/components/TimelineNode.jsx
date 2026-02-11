import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const TimelineNode = ({ event, isActive, onClick, isFirst, isLast, style }) => {
    return (
        <div
            className="timeline-node"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: '100px',
                position: 'absolute',
                transform: isFirst ? 'translate(0, -50%)' : isLast ? 'translate(-100%, -50%)' : 'translate(-50%, -50%)',
                cursor: 'pointer',
                zIndex: isActive ? 10 : 1,
                ...style
            }}
            onClick={() => onClick(event)}
        >
            {/* Year Label - Top */}
            <span style={{
                marginBottom: '10px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: isActive ? 'var(--color-accent)' : 'var(--color-text-tertiary)',
                fontWeight: 600,
                letterSpacing: '0.05em',
                transition: 'color 0.3s ease',
                background: isActive ? 'var(--color-surface)' : 'transparent',
                padding: '2px 6px',
                borderRadius: '4px',
                backdropFilter: isActive ? 'blur(4px)' : 'none',
                boxShadow: isActive ? 'var(--shadow-sm)' : 'none'
            }}>
                {event.year}
            </span>

            {/* Node Dot */}
            <motion.div
                whileHover={{ scale: 1.15 }}
                animate={{
                    scale: isActive ? 1.25 : 1,
                    backgroundColor: isActive ? 'var(--color-accent)' : 'var(--color-surface)',
                    borderColor: isActive ? 'var(--color-accent)' : 'var(--color-text-tertiary)'
                }}
                style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    border: '2px solid',
                    background: 'var(--color-surface)',
                    boxShadow: isActive ? '0 0 0 4px var(--color-accent-glow)' : 'var(--shadow-sm)',
                    position: 'relative',
                    transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)'
                }}
            >
                {/* Inner white dot for active state to look like target */}
                {isActive && (
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: '#fff'
                    }} />
                )}
            </motion.div>

            {/* Title Label - Bottom */}
            <span style={{
                marginTop: '10px',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-display)',
                color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                fontWeight: isActive ? 600 : 400,
                textAlign: 'center',
                maxWidth: '120px',
                opacity: isActive ? 1 : 0.7,
                transition: 'all 0.3s ease',
                textShadow: isActive ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }}>
                {event.title.split(' ')[0]}
            </span>
        </div>
    );
};

TimelineNode.propTypes = {
    event: PropTypes.object.isRequired,
    isActive: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    isFirst: PropTypes.bool,
    isLast: PropTypes.bool,
    style: PropTypes.object
};

export default TimelineNode;
