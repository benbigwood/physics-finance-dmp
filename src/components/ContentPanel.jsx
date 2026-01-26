import { motion, AnimatePresence } from 'framer-motion';
import MathDisplay from './MathDisplay';
import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

const ExplanationView = ({ activeEvent }) => (
    <div className="explanation-view">
        <h2 style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)', color: 'var(--color-text-primary)' }}>
            {activeEvent.title} <span style={{ color: 'var(--color-accent)', fontSize: '1.5rem' }}>({activeEvent.year})</span>
        </h2>

        <div style={{ marginBottom: 'var(--spacing-md)' }}>
            <h4 style={{ color: 'var(--color-accent)', marginBottom: '0.5rem' }}>The Physics Connection</h4>
            <p style={{ fontSize: '1.1rem' }}>{activeEvent.physicsConnection}</p>
        </div>

        <div style={{ marginBottom: 'var(--spacing-md)' }}>
            <p><strong>Context:</strong> {activeEvent.context}</p>
        </div>

        <div style={{ marginBottom: 'var(--spacing-md)' }}>
            <h4 style={{ color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>The Mathematics</h4>
            <MathDisplay math={activeEvent.math || ""} />
        </div>

        <div style={{
            padding: 'var(--spacing-sm)',
            background: 'rgba(56, 189, 248, 0.1)',
            borderLeft: '4px solid var(--color-accent)',
            borderRadius: '0 8px 8px 0'
        }}>
            <p><strong>Real-World Impact:</strong> {activeEvent.impact}</p>
        </div>

        {/* Sub-paths for "What's Happening Now?" - Included in Explanation View */}
        {activeEvent.subPaths && (
            <div style={{ marginTop: 'var(--spacing-md)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {activeEvent.subPaths.map(path => (
                    <motion.div
                        key={path.id}
                        whileHover={{ scale: 1.05, backgroundColor: 'var(--color-surface-hover)' }}
                        style={{
                            padding: '1rem',
                            border: '1px solid var(--color-surface-hover)',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}
                    >
                        <h5 style={{ color: 'var(--color-highlight)' }}>{path.title}</h5>
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{path.desc}</p>
                    </motion.div>
                ))}
            </div>
        )}
    </div>
);

ExplanationView.propTypes = { activeEvent: PropTypes.object.isRequired };

const ContentPanel = ({ activeEvent, onClose }) => {
    const [activeTab, setActiveTab] = useState('explanation');

    // Reset tab when event changes
    useEffect(() => {
        if (activeEvent?.customContent) {
            setActiveTab('story');
        } else {
            setActiveTab('explanation');
        }
    }, [activeEvent]);

    if (!activeEvent) return null;

    const hasTabs = !!activeEvent.customContent;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={activeEvent.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                style={{
                    background: 'var(--color-surface)',
                    padding: 'var(--spacing-md)',
                    borderRadius: '16px',
                    maxWidth: '1000px',
                    margin: 'var(--spacing-lg) auto',
                    position: 'relative',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    border: '1px solid var(--color-surface-hover)'
                }}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: 'var(--spacing-md)',
                        right: 'var(--spacing-md)',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--color-text-secondary)',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        zIndex: 10
                    }}
                >
                    &times;
                </button>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--spacing-md)' }}>
                    {/* Left Column: Image & Figures */}
                    <div>
                        <div style={{
                            width: '100%',
                            height: '250px',
                            background: 'var(--color-bg)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            marginBottom: 'var(--spacing-sm)'
                        }}>
                            {/* Image Display */}
                            {activeEvent.image ? (
                                <img
                                    src={`${import.meta.env.BASE_URL}${activeEvent.image}`}
                                    alt={activeEvent.title}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            ) : (
                                <div style={{ textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                                    No Image Available
                                    <br />
                                    <small>Visual: {activeEvent.visualType}</small>
                                </div>
                            )}
                        </div>
                        <h4 style={{ color: 'var(--color-highlight)' }}>{activeEvent.physicist}</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Key Figure</p>


                        {/* Simulation Tab Hint moved here or just kept in tabs */}
                        {hasTabs && activeTab === 'simulation' && (
                            <div style={{ marginTop: '2rem', padding: '1rem', border: '1px dashed var(--color-accent)', borderRadius: '8px', color: 'var(--color-accent)' }}>
                                <small>Simulation Controls will appear here</small>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Content */}
                    <div>
                        {hasTabs ? (
                            <>
                                {/* Tab Navigation */}
                                <div style={{
                                    display: 'flex',
                                    gap: '1rem',
                                    borderBottom: '1px solid var(--color-surface-hover)',
                                    marginBottom: 'var(--spacing-md)'
                                }}>
                                    {['story', 'explanation', 'simulation'].map(tab => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                borderBottom: activeTab === tab ? '2px solid var(--color-accent)' : '2px solid transparent',
                                                color: activeTab === tab ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                                                padding: '0.5rem 1rem',
                                                cursor: 'pointer',
                                                fontSize: '1rem',
                                                textTransform: 'capitalize',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            {tab === 'explanation' ? 'Physics-Finance' : tab}
                                        </button>
                                    ))}
                                </div>

                                {/* Tab Content */}
                                <div className="tab-content">
                                    {activeTab === 'story' && (
                                        <div className="custom-content fade-in">
                                            {activeEvent.customContent}
                                        </div>
                                    )}
                                    {activeTab === 'explanation' && (
                                        <ExplanationView activeEvent={activeEvent} />
                                    )}
                                    {activeTab === 'simulation' && (
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '300px',
                                            background: 'var(--color-bg)',
                                            borderRadius: '8px',
                                            color: 'var(--color-text-secondary)'
                                        }}>
                                            <span style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>⚛️ 📈</span>
                                            <h3>Interactive Simulation</h3>
                                            <p>Coming Soon...</p>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            /* No Tabs - Standard View */
                            <ExplanationView activeEvent={activeEvent} />
                        )}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

ContentPanel.propTypes = {
    activeEvent: PropTypes.object,
    onClose: PropTypes.func.isRequired
};

export default ContentPanel;
