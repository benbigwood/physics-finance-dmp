import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const TimelineNode = ({ event, isActive, onClick, isFirst, isLast, style, isDimmed }) => {
    return (
        <div
            className="timeline-node"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: '100px',
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
                cursor: isDimmed ? 'default' : 'pointer',
                zIndex: isActive ? 10 : (isDimmed ? 0 : 1),
                opacity: isDimmed ? 0.3 : 1,
                filter: isDimmed ? 'grayscale(100%)' : 'none',
                transition: 'all 0.5s ease',
                pointerEvents: isDimmed ? 'none' : 'auto',
                ...style
            }}
            onClick={() => !isDimmed && onClick(event)}
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
                whileHover={!isDimmed ? { scale: event.id === 'now' ? 1.35 : 1.15 } : {}}
                animate={{
                    scale: isActive ? (event.id === 'now' ? 1.5 : 1.25) : (event.id === 'now' ? 1.2 : 1),
                    backgroundColor: isActive
                        ? (event.id === 'now' ? 'var(--color-accent)' : 'var(--color-accent)')
                        : (event.id === 'now' ? 'var(--color-text-primary)' : 'var(--color-surface)'),
                    borderColor: isActive ? 'var(--color-accent)' : 'var(--color-text-tertiary)'
                }}
                style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    border: event.id === 'now' ? 'none' : '2px solid',
                    background: event.id === 'now'
                        ? 'linear-gradient(135deg, #FF0080 0%, #7928CA 100%)'
                        : 'var(--color-surface)',
                    boxShadow: isActive
                        ? (event.id === 'now' ? '0 0 15px rgba(121, 40, 202, 0.6)' : '0 0 0 4px var(--color-accent-glow)')
                        : (event.id === 'now' ? '0 0 10px rgba(121, 40, 202, 0.4)' : 'var(--shadow-sm)'),
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
                fontSize: event.id === 'now' ? '0.9rem' : '0.8rem',
                fontFamily: 'var(--font-display)',
                color: isActive
                    ? (event.id === 'now' ? 'var(--color-primary)' : 'var(--color-text-primary)')
                    : (event.id === 'now' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)'),
                fontWeight: isActive ? 600 : 400,
                textAlign: 'center',
                maxWidth: event.id === 'now' ? '160px' : '120px',
                opacity: isActive ? 1 : (event.id === 'now' ? 1 : 0.7),
                transition: 'all 0.3s ease',
                textShadow: isActive ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }}>
                {event.id === 'now' ? event.title : event.title.split(' ')[0]}
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
    style: PropTypes.object,
    isDimmed: PropTypes.bool
};

export default TimelineNode;
