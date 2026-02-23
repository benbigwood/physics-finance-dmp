import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BlackScholesSimulation from './BlackScholesSimulation';
import BrownianMotionSimulation from './BrownianMotionSimulation';
import FractalMarketSimulation from './FractalMarketSimulation';
import ModernPortfolioSimulation from './ModernPortfolioSimulation';

import BachelierSimulation from './BachelierSimulation';
import DiffusionSimulation from './DiffusionSimulation';
import FractionalBrownianMotionSimulation from './FractionalBrownianMotionSimulation';

const ExplanationView = ({ activeEvent }) => {
    const [activeSubTab, setActiveSubTab] = useState(activeEvent.subPaths ? activeEvent.subPaths[0].id : null);

    useEffect(() => {
        if (activeEvent.subPaths && activeEvent.subPaths.length > 0) {
            setActiveSubTab(activeEvent.subPaths[0].id);
        }
    }, [activeEvent.id]); // Reset when event ID changes

    const currentSubPath = activeEvent.subPaths?.find(p => p.id === activeSubTab);

    return (
        <div className="explanation-view" style={{ animation: 'fadeIn 0.5s ease' }}>
            <h2 style={{
                fontSize: '2.5rem',
                marginBottom: 'var(--spacing-sm)',
                color: 'var(--color-text-primary)'
            }}>
                {activeEvent.title} {activeEvent.year !== 'NOW' && <span style={{ color: 'var(--color-text-tertiary)', fontWeight: 400 }}>{activeEvent.year}</span>}
            </h2>

            {/* Derivation Content / Intro */}
            {activeEvent.derivationContent && (
                <div style={{
                    marginTop: 'var(--spacing-md)',
                    paddingTop: 'var(--spacing-md)',
                    borderTop: '1px solid var(--color-border)'
                }}>
                    {activeEvent.derivationContent}
                </div>
            )}

            {/* Interactive Sub-tabs */}
            {activeEvent.subPaths && (
                <div id="subtabs-container" style={{ marginTop: 'var(--spacing-lg)' }}>
                    {/* Sub-tab Navigation */}
                    <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        marginBottom: '1.5rem',
                        flexWrap: 'wrap'
                    }}>
                        {activeEvent.subPaths.map((path, index) => (
                            <button
                                key={path.id}
                                onClick={() => setActiveSubTab(path.id)}
                                style={{
                                    padding: '0.8rem 1.5rem',
                                    background: activeSubTab === path.id ? 'var(--color-accent)' : 'var(--color-surface)',
                                    color: activeSubTab === path.id ? '#fff' : 'var(--color-text-secondary)',
                                    border: activeSubTab === path.id ? 'none' : '1px solid var(--color-border)',
                                    borderRadius: '8px', // More rectangular
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    transition: 'all 0.2s ease',
                                    whiteSpace: 'nowrap',
                                    boxShadow: activeSubTab === path.id ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <span style={{
                                    opacity: activeSubTab === path.id ? 1 : 0.7,
                                    fontSize: '0.9em',
                                    fontWeight: activeSubTab === path.id ? 700 : 500
                                }}>
                                    {index + 1}.
                                </span>
                                {path.title}
                            </button>
                        ))}
                    </div>

                    {/* Sub-tab Content */}
                    <div style={{ animation: 'fadeIn 0.3s ease' }}>
                        {currentSubPath?.content || (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '1rem'
                            }}>
                                {/* Fallback to old grid view if no content property */}
                                {activeEvent.subPaths.map(path => (
                                    <motion.div
                                        key={path.id}
                                        whileHover={{ scale: 1.02, backgroundColor: 'var(--color-surface-hover)' }}
                                        style={{
                                            padding: '1.5rem',
                                            background: 'var(--color-surface)',
                                            border: '1px solid var(--color-border)',
                                            borderRadius: 'var(--radius-md)',
                                        }}
                                    >
                                        <h5 style={{ color: 'var(--color-accent)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>{path.title}</h5>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', margin: 0 }}>{path.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Next Sub-tab Button */}
                    {activeEvent.subPaths && activeEvent.subPaths.length > 1 && (
                        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
                            {(() => {
                                const currentIndex = activeEvent.subPaths.findIndex(p => p.id === activeSubTab);
                                if (currentIndex !== -1 && currentIndex < activeEvent.subPaths.length - 1) {
                                    const nextTab = activeEvent.subPaths[currentIndex + 1];
                                    return (
                                        <button
                                            onClick={() => {
                                                setActiveSubTab(nextTab.id);
                                                // Scroll to top of subtabs container with a slight delay to allow render
                                                setTimeout(() => {
                                                    document.getElementById('subtabs-container')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                                }, 50);
                                            }}
                                            style={{
                                                padding: '0.8rem 1.5rem',
                                                background: 'var(--color-finance)',
                                                color: '#fff',
                                                border: 'none',
                                                borderRadius: 'var(--radius-md)',
                                                cursor: 'pointer',
                                                fontSize: '1rem',
                                                fontWeight: 600,
                                                transition: 'all 0.2s ease',
                                                boxShadow: 'var(--shadow-md)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem'
                                            }}
                                            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                                            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                                        >
                                            Next: {nextTab.title} &rarr;
                                        </button>
                                    );
                                }
                                return null;
                            })()}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

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
                    gridTemplateColumns: (activeTab.includes('simulation') || activeTab === 'calculator' ? '1fr' : '350px 1fr'),
                    gap: 'var(--spacing-xl)',
                    width: '100%'
                }}>
                    {/* Left Column: Image & Figures - Hide on Simulation/Calculator Tabs */}
                    {!activeTab.includes('simulation') && activeTab !== 'calculator' && (
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
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '100%',
                                        height: '100%',
                                        background: 'radial-gradient(circle, rgba(var(--color-accent-rgb, 99,102,241), 0.15) 0%, transparent 70%)'
                                    }}>
                                        <span style={{
                                            fontSize: '8rem',
                                            fontWeight: 700,
                                            color: 'var(--color-accent)',
                                            textShadow: '0 0 30px rgba(var(--color-accent-rgb, 99,102,241), 0.4)',
                                            lineHeight: 1,
                                            opacity: 0.85
                                        }}>?</span>
                                    </div>
                                )}
                            </div>



                            {activeEvent.imageCaption && (
                                <p style={{
                                    fontSize: '0.85rem',
                                    marginTop: '0.5rem',
                                    color: 'var(--color-accent)',
                                    fontStyle: 'italic',
                                    textAlign: 'center',
                                    fontWeight: 500
                                }}>
                                    {activeEvent.imageCaption}
                                </p>
                            )}

                            <p
                                onClick={scrollToReferences}
                                style={{
                                    fontSize: '0.8rem',
                                    marginTop: '0.5rem',
                                    color: 'var(--color-text-secondary)',
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                    textDecorationColor: 'transparent',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.color = 'var(--color-accent)';
                                    e.target.style.textDecorationColor = 'var(--color-accent)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color = 'var(--color-text-secondary)';
                                    e.target.style.textDecorationColor = 'transparent';
                                }}
                            >
                                {activeEvent.physicist}
                            </p>

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
                                            <p
                                                onClick={scrollToReferences}
                                                style={{
                                                    fontSize: '0.8rem',
                                                    marginTop: '0.5rem',
                                                    color: 'var(--color-text-secondary)',
                                                    cursor: 'pointer',
                                                    textDecoration: 'underline',
                                                    textDecorationColor: 'transparent',
                                                    transition: 'all 0.2s ease'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.color = 'var(--color-accent)';
                                                    e.target.style.textDecorationColor = 'var(--color-accent)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.color = 'var(--color-text-secondary)';
                                                    e.target.style.textDecorationColor = 'transparent';
                                                }}
                                            >
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
                                    {(activeEvent.id === '1973' ? ['story', 'explanation', 'calculator', 'diffusion'] : ['story', 'explanation', 'simulation']).map(tab => (
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
                                                (tab === 'story' && activeEvent.id === 'now' ? 'Modern Finance' : tab)}
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

                                    {/* Simulation / Calculator Tab */}
                                    <div style={{ display: activeTab === 'calculator' || activeTab === 'simulation' ? 'block' : 'none', height: '100%' }}>
                                        <div className="fade-in" style={{ height: '100%' }}>
                                            {activeEvent.id === '1973' ? (
                                                <BlackScholesSimulation />
                                            ) : activeEvent.id === '1900' ? (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                                                    {/* Simulation 1: Brownian Motion */}
                                                    <div>
                                                        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
                                                            1. The Physics: Brownian Motion
                                                        </h3>
                                                        <p style={{ marginBottom: '1.5rem', lineHeight: '1.6', color: 'var(--color-text-secondary)' }}>
                                                            In 1827, botanist Robert Brown observed pollen grains jiggling erratically in water. This "Brownian motion" was later explained by Einstein as the result of invisible water molecules colliding with the pollen. In this simulation, the large particle represents the price (or pollen), and the smaller particles represent the random market orders (or water molecules) kicking it around.
                                                        </p>
                                                        <BrownianMotionSimulation />
                                                    </div>

                                                    {/* Simulation 2: Bachelier Model */}
                                                    <div>
                                                        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary)', marginBottom: '1rem', borderTop: '1px solid var(--color-border)', paddingTop: '2rem' }}>
                                                            2. The Finance: Bachelier's Diffusion
                                                        </h3>
                                                        <p style={{ marginBottom: '1.5rem', lineHeight: '1.6', color: 'var(--color-text-secondary)' }}>
                                                            Louis Bachelier took this physical concept and applied it to finance. He realized that if prices are driven by countless independent shocks (like the collisions above), their probability distribution spreads out over time exactly like heat diffusing through a metal rod.
                                                        </p>
                                                        <p style={{ marginBottom: '1.5rem', lineHeight: '1.6', color: 'var(--color-text-secondary)' }}>
                                                            Unlike the single particle above, this simulation generates thousands of potential price paths to visualize the market's "risk envelope". The bell curve on the right shows the Normal (Gaussian) distribution of possible future prices, widening as time (volatility) increases.
                                                        </p>
                                                        <BachelierSimulation />
                                                    </div>
                                                </div>
                                            ) : activeEvent.id === '1960' ? (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                                                    {/* Simulation 1: Volatility Clustering */}
                                                    <div>
                                                        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
                                                            1. Volatility Clustering
                                                        </h3>
                                                        <p style={{ marginBottom: '1.5rem', lineHeight: '1.6', color: 'var(--color-text-secondary)' }}>
                                                            Mandelbrot observed that large price changes tend to be followed by large price changes, and small changes by small ones. This creates distinct visual "regimes" of high and low volatility that repeat at different scales.
                                                        </p>
                                                        <FractalMarketSimulation />
                                                    </div>

                                                    {/* Simulation 2: Fractional Brownian Motion */}
                                                    <div>
                                                        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary)', marginBottom: '1rem', borderTop: '1px solid var(--color-border)', paddingTop: '2rem' }}>
                                                            2. Fractional Brownian Motion & Hurst Exponent
                                                        </h3>
                                                        <p style={{ marginBottom: '1.5rem', lineHeight: '1.6', color: 'var(--color-text-secondary)' }}>
                                                            Unlike standard Brownian motion (where H = 0.5), Fractal Markets exhibit "memory". Adjust the Hurst Exponent ($H$) to see how a market can become mean-reverting (H &lt; 0.5) or persistently trending (H &gt; 0.5), comparing the fractal model to a real market proxy.
                                                        </p>
                                                        <FractionalBrownianMotionSimulation />
                                                    </div>
                                                </div>
                                            ) : activeEvent.id === '1952' ? (
                                                <ModernPortfolioSimulation />
                                            ) : activeEvent.id === 'now' ? (
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    height: '400px',
                                                    background: 'var(--color-surface-hover)',
                                                    borderRadius: 'var(--radius-md)',
                                                    color: 'var(--color-text-secondary)',
                                                    textAlign: 'center',
                                                    padding: '2rem'
                                                }}>
                                                    <span style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔮</span>
                                                    <p style={{ fontSize: '1.2rem', fontStyle: 'italic' }}>
                                                        "Well if we had a real simulation, we’d be quite successful! - see in the physics-finance simulation for simulations of some of the concepts."
                                                    </p>
                                                </div>
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

                                    {/* Diffusion Tab */}
                                    <div style={{ display: activeTab === 'diffusion' ? 'block' : 'none', height: '100%' }}>
                                        <div className="fade-in" style={{ height: '100%' }}>
                                            <DiffusionSimulation />
                                        </div>
                                    </div>

                                </div>
                            </>
                        ) : (
                            /* No Tabs - Standard View */
                            <ExplanationView activeEvent={activeEvent} />
                        )}

                        {/* References Section */}
                        <div id="reference-section" style={{
                            marginTop: '3rem',
                            padding: '1.5rem',
                            background: 'var(--color-surface-hover)',
                            borderRadius: 'var(--radius-md)',
                            color: 'var(--color-text-secondary)',
                            fontSize: '0.8rem',
                            border: '1px solid var(--color-border)'
                        }}>
                            <h4 style={{
                                marginBottom: '0.75rem',
                                color: 'var(--color-text-primary)',
                                fontSize: '0.9rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                opacity: 0.8
                            }}>
                                References & Sources
                            </h4>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {activeEvent.sourceLink && (
                                    <li style={{ marginBottom: '0.6rem' }}>
                                        <strong style={{ color: 'var(--color-text-primary)' }}>
                                            {activeEvent.imageCaption || "Main Visual"}
                                        </strong>
                                        <span style={{ color: 'var(--color-text-secondary)', margin: '0 0.5rem' }}>
                                            from {activeEvent.imageSource || "Source"}
                                        </span>
                                        <div style={{ marginTop: '0.1rem' }}>
                                            <a
                                                href={activeEvent.sourceLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{
                                                    color: 'var(--color-finance)',
                                                    fontSize: '0.9em',
                                                    textDecoration: 'underline',
                                                    textDecorationColor: 'var(--color-border)',
                                                    wordBreak: 'break-all',
                                                    transition: 'all 0.2s ease',
                                                    opacity: 0.85
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.color = 'var(--color-finance)';
                                                    e.target.style.textDecorationColor = 'var(--color-finance)';
                                                    e.target.style.opacity = '1';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.color = 'var(--color-finance)';
                                                    e.target.style.textDecorationColor = 'var(--color-border)';
                                                    e.target.style.opacity = '0.85';
                                                }}
                                            >
                                                {activeEvent.sourceLink}
                                            </a>
                                        </div>
                                    </li>
                                )}
                                {activeEvent.sideImages && activeEvent.sideImages.map((img, i) => (
                                    img.sourceLink && (
                                        <li key={i} style={{ marginBottom: '0.6rem' }}>
                                            <strong style={{ color: 'var(--color-text-primary)' }}>{img.caption}:</strong>
                                            <div style={{ marginTop: '0.1rem' }}>
                                                <a
                                                    href={img.sourceLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{
                                                        color: 'var(--color-finance)',
                                                        fontSize: '0.85em',
                                                        textDecoration: 'underline',
                                                        textDecorationColor: 'var(--color-border)',
                                                        wordBreak: 'break-all',
                                                        transition: 'all 0.2s ease',
                                                        opacity: 0.85
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.target.style.color = 'var(--color-finance)';
                                                        e.target.style.textDecorationColor = 'var(--color-finance)';
                                                        e.target.style.opacity = '1';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.target.style.color = 'var(--color-finance)';
                                                        e.target.style.textDecorationColor = 'var(--color-border)';
                                                        e.target.style.opacity = '0.85';
                                                    }}
                                                >
                                                    {img.sourceLink}
                                                </a>
                                            </div>
                                        </li>
                                    )
                                ))}
                                {activeEvent.references && activeEvent.references.map((ref, i) => (
                                    <li key={`ref-${i}`} style={{ marginBottom: '0.8rem' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <span style={{ color: 'var(--color-finance)', fontWeight: 600, minWidth: '20px', opacity: 0.9 }}>[{ref.id}]</span>
                                            <div>
                                                <strong style={{ color: 'var(--color-text-primary)', display: 'block', fontSize: '0.85rem' }}>{ref.title}</strong>
                                                {ref.author && <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>{ref.author}</span>}
                                                <div style={{ marginTop: '0.1rem' }}>
                                                    <a
                                                        href={ref.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{
                                                            color: 'var(--color-finance)',
                                                            fontSize: '0.85em',
                                                            textDecoration: 'underline',
                                                            textDecorationColor: 'var(--color-border)',
                                                            wordBreak: 'break-all',
                                                            transition: 'all 0.2s ease',
                                                            opacity: 0.85
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.target.style.color = 'var(--color-finance)';
                                                            e.target.style.textDecorationColor = 'var(--color-finance)';
                                                            e.target.style.opacity = '1';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.target.style.color = 'var(--color-finance)';
                                                            e.target.style.textDecorationColor = 'var(--color-border)';
                                                            e.target.style.opacity = '0.85';
                                                        }}
                                                    >
                                                        {ref.link}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
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
