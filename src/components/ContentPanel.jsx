import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BlackScholesSimulation from './BlackScholesSimulation';
import BrownianMotionSimulation from './BrownianMotionSimulation';
import FractalMarketSimulation from './FractalMarketSimulation';
import FractalTreeComparison from './FractalTreeComparison';
import BachelierSimulation from './BachelierSimulation';

const ExplanationView = ({ activeEvent }) => (
    <div className="explanation-view" style={{ animation: 'fadeIn 0.5s ease' }}>
        <h2 style={{
            fontSize: '2.5rem',
            marginBottom: 'var(--spacing-sm)',
            color: 'var(--color-text-primary)'
        }}>
            {activeEvent.title} <span style={{ color: 'var(--color-text-tertiary)', fontWeight: 400 }}>{activeEvent.year}</span>
        </h2>

        {/* Derivation Content Merged Here */}
        {activeEvent.derivationContent && (
            <div style={{
                marginTop: 'var(--spacing-md)',
                paddingTop: 'var(--spacing-md)',
                borderTop: '1px solid var(--color-border)'
            }}>
                {activeEvent.derivationContent}
            </div>
        )}

        {/* Sub-paths for "What's Happening Now?" */}
        {activeEvent.subPaths && (
            <div style={{ marginTop: 'var(--spacing-lg)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {activeEvent.subPaths.map(path => (
                    <motion.div
                        key={path.id}
                        whileHover={{ scale: 1.02, backgroundColor: 'var(--color-surface-hover)' }}
                        style={{
                            padding: '1.5rem',
                            background: 'var(--color-surface)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-md)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: 'var(--shadow-sm)'
                        }}
                    >
                        <h5 style={{ color: 'var(--color-accent)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>{path.title}</h5>
                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', margin: 0 }}>{path.desc}</p>
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

    const scrollToReferences = () => {
        const refSection = document.getElementById('reference-section');
        if (refSection) {
            refSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={activeEvent.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // Apple-like spring
                className="glass-panel"
                style={{
                    padding: 'var(--spacing-lg)',
                    width: '100%',
                    maxWidth: '100%', // Explicitly force full width
                    margin: 'var(--spacing-lg) auto',
                    position: 'relative',
                    overflow: 'hidden' // Ensure rounded corners clip content
                }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: 'var(--spacing-md)',
                        right: 'var(--spacing-md)',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'var(--color-surface-hover)',
                        border: 'none',
                        color: 'var(--color-text-secondary)',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        zIndex: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background 0.2s'
                    }}
                >
                    &times;
                </button>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: (activeTab.includes('simulation') ? '1fr' : '350px 1fr'),
                    gap: 'var(--spacing-xl)',
                    width: '100%'
                }}>
                    {/* Left Column: Image & Figures - Hide on Simulation Tabs */}
                    {!activeTab.includes('simulation') && (
                        <div>
                            <div style={{
                                width: '100%',
                                aspectRatio: '4/3',
                                background: 'var(--color-surface-hover)',
                                borderRadius: 'var(--radius-lg)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                marginBottom: 'var(--spacing-md)',
                                boxShadow: 'var(--shadow-md)'
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
                                    <div style={{ textAlign: 'center', color: 'var(--color-text-tertiary)' }}>
                                        No Image Available
                                        <br />
                                        <small style={{ opacity: 0.7 }}>Visual: {activeEvent.visualType}</small>
                                    </div>
                                )}
                            </div>

                            {activeEvent.sourceLink && (
                                <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-md)' }}>
                                    <button
                                        onClick={scrollToReferences}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            fontSize: '0.8rem',
                                            color: 'var(--color-text-tertiary)',
                                            cursor: 'pointer',
                                            padding: 0
                                        }}
                                    >
                                        Source
                                    </button>
                                </div>
                            )}

                            <div style={{ padding: '0 var(--spacing-xs)' }}>
                                <h4 style={{
                                    color: 'var(--color-text-primary)',
                                    marginBottom: '0.2rem',
                                    fontSize: '1.2rem'
                                }}>
                                    {activeEvent.physicist}
                                </h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Key Figure</p>
                            </div>

                            {/* Side Images */}
                            {activeEvent.sideImages && (
                                <div style={{ marginTop: 'var(--spacing-lg)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {activeEvent.sideImages.map((img, index) => (
                                        <div key={index}>
                                            <div style={{
                                                width: '100%',
                                                borderRadius: 'var(--radius-md)',
                                                overflow: 'hidden',
                                                border: '1px solid var(--color-border)',
                                                boxShadow: 'var(--shadow-sm)'
                                            }}>
                                                <img
                                                    src={`${import.meta.env.BASE_URL}${img.src}`}
                                                    alt={img.caption}
                                                    style={{ width: '100%', height: 'auto', display: 'block' }}
                                                />
                                            </div>
                                            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--color-text-secondary)' }}>
                                                {img.caption}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Right Column: Content */}
                    <div>
                        {hasTabs ? (
                            <>
                                {/* Segmented Control Tab Navigation */}
                                <div style={{
                                    display: 'inline-flex',
                                    background: 'var(--color-surface-hover)',
                                    padding: '4px',
                                    borderRadius: 'var(--radius-md)',
                                    marginBottom: 'var(--spacing-lg)'
                                }}>
                                    {(activeEvent.id === '1900' ? ['story', 'explanation', 'simulation', 'simulation 2'] : ['story', 'explanation', 'simulation']).map(tab => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            style={{
                                                background: activeTab === tab ? 'var(--color-bg)' : 'transparent',
                                                border: 'none',
                                                borderRadius: '6px', // slightly smaller than container
                                                color: activeTab === tab ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                                                padding: '0.5rem 1.5rem',
                                                cursor: 'pointer',
                                                fontSize: '0.95rem',
                                                fontWeight: 500,
                                                boxShadow: activeTab === tab ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                                                transition: 'all 0.2s ease',
                                                textTransform: 'capitalize'
                                            }}
                                        >
                                            {tab === 'explanation' ? 'Physics-Finance' :
                                                (tab === 'story' && activeEvent.id === 'now' ? 'Quantum Computing' : tab)}
                                        </button>
                                    ))}
                                </div>

                                {/* Tab Content */}
                                <div className="tab-content" style={{ minHeight: '400px', position: 'relative' }}>

                                    {/* Story Tab */}
                                    <div style={{ display: activeTab === 'story' ? 'block' : 'none' }}>
                                        <div className="custom-content fade-in">
                                            {activeEvent.customContent}
                                        </div>
                                    </div>

                                    {/* Explanation Tab */}
                                    <div style={{ display: activeTab === 'explanation' ? 'block' : 'none' }}>
                                        <div className="fade-in">
                                            <ExplanationView activeEvent={activeEvent} />
                                        </div>
                                    </div>

                                    {/* Simulation Tab */}
                                    <div style={{ display: activeTab === 'simulation' ? 'block' : 'none', height: '100%' }}>
                                        <div className="fade-in" style={{ height: '100%' }}>
                                            {activeEvent.id === '1973' ? (
                                                <BlackScholesSimulation />
                                            ) : activeEvent.id === '1900' ? (
                                                <BrownianMotionSimulation />
                                            ) : activeEvent.id === '1960' ? (
                                                <>
                                                    <FractalMarketSimulation />
                                                    <FractalTreeComparison />
                                                </>
                                            ) : (
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    height: '400px',
                                                    background: 'var(--color-surface-hover)',
                                                    borderRadius: 'var(--radius-md)',
                                                    color: 'var(--color-text-secondary)'
                                                }}>
                                                    <span style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }}>⚛️</span>
                                                    <h3>Interactive Simulation</h3>
                                                    <p>Coming Soon...</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Bachelier Simulation Tab (Specific to 1900/Bachelier) */}
                                    {activeEvent.id === '1900' && (
                                        <div style={{ display: activeTab === 'simulation 2' ? 'block' : 'none', height: '100%', minHeight: '600px' }}>
                                            <div className="fade-in" style={{ height: '100%' }}>
                                                <BachelierSimulation />
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </>
                        ) : (
                            /* No Tabs - Standard View */
                            <ExplanationView activeEvent={activeEvent} />
                        )}

                        {/* References Section */}
                        <div id="reference-section" style={{
                            marginTop: '4rem',
                            paddingTop: '2rem',
                            borderTop: '1px solid var(--color-border)',
                            color: 'var(--color-text-secondary)',
                            fontSize: '0.85rem'
                        }}>
                            <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>References & Sources</h4>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {activeEvent.sourceLink && (
                                    <li style={{ marginBottom: '0.8rem' }}>
                                        <strong style={{ color: 'var(--color-text-primary)' }}>Main Visual:</strong>
                                        <a href={activeEvent.sourceLink} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '0.5rem', color: 'var(--color-accent)' }}>View Source</a>
                                    </li>
                                )}
                                {activeEvent.sideImages && activeEvent.sideImages.map((img, i) => (
                                    img.sourceLink && (
                                        <li key={i} style={{ marginBottom: '0.8rem' }}>
                                            <strong style={{ color: 'var(--color-text-primary)' }}>{img.caption}:</strong>
                                            <a href={img.sourceLink} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '0.5rem', color: 'var(--color-accent)' }}>View Source</a>
                                        </li>
                                    )
                                ))}
                            </ul>
                        </div>
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
