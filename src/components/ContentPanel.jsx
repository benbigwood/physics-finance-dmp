import { motion, AnimatePresence } from 'framer-motion';
// import { BlockMath, InlineMath } from 'react-katex'; // We'll use katex directly or simple div if react-katex is an issue, but let's try direct HTML for now with a library if needed or just use simple math display since importing react-katex might require config. 
// Actually, simple way is to use `katex` in `useEffect` to render to a ref.
import 'katex/dist/katex.min.css';
import katex from 'katex';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const MathDisplay = ({ math }) => {
    const containerRef = useRef(null);
    useEffect(() => {
        if (containerRef.current) {
            try {
                katex.render(math, containerRef.current, {
                    throwOnError: false,
                    displayMode: true,
                    output: 'html' // Use HTML output
                });
            } catch (e) {
                containerRef.current.innerText = math;
            }
        }
    }, [math]);
    return <div ref={containerRef} className="math-display" />;
};

MathDisplay.propTypes = { math: PropTypes.string.isRequired };

const ContentPanel = ({ activeEvent, onClose }) => {
    if (!activeEvent) return null;

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
                        cursor: 'pointer'
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
                                    src={`/${activeEvent.image}`}
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
                    </div>

                    {/* Right Column: Content */}
                    <div>
                        {activeEvent.customContent ? (
                            <div className="custom-content">
                                {activeEvent.customContent}
                            </div>
                        ) : (
                            <>
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
                                    <MathDisplay math={activeEvent.math} />
                                </div>

                                <div style={{
                                    padding: 'var(--spacing-sm)',
                                    background: 'rgba(56, 189, 248, 0.1)',
                                    borderLeft: '4px solid var(--color-accent)',
                                    borderRadius: '0 8px 8px 0'
                                }}>
                                    <p><strong>Real-World Impact:</strong> {activeEvent.impact}</p>
                                </div>

                                {/* Sub-paths for "What's Happening Now?" */}
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
                            </>
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
