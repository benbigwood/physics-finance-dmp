import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { resourcesData } from '../data/resourcesData';

const Resources = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('library');

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'black',
                            zIndex: 998
                        }}
                    />
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed',
                            bottom: 0,
                            left: '5%',
                            right: '5%',
                            height: '85vh',
                            background: 'var(--color-surface)',
                            zIndex: 999,
                            borderRadius: '20px 20px 0 0',
                            padding: 'var(--spacing-md)',
                            boxShadow: '0 -10px 40px rgba(0,0,0,0.5)',
                            overflowY: 'auto'
                        }}
                    >

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    onClick={() => setActiveTab('library')}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        borderBottom: activeTab === 'library' ? '2px solid var(--color-accent)' : '2px solid transparent',
                                        color: activeTab === 'library' ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                                        fontSize: '1.2rem',
                                        cursor: 'pointer',
                                        paddingBottom: '0.5rem'
                                    }}
                                >
                                    Resource Library
                                </button>
                                <button
                                    onClick={() => setActiveTab('comparison')}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        borderBottom: activeTab === 'comparison' ? '2px solid var(--color-accent)' : '2px solid transparent',
                                        color: activeTab === 'comparison' ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                                        fontSize: '1.2rem',
                                        cursor: 'pointer',
                                        paddingBottom: '0.5rem'
                                    }}
                                >
                                    Comparison Chart
                                </button>
                            </div>
                            <button
                                onClick={onClose}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--color-text-secondary)',
                                    fontSize: '2rem',
                                    cursor: 'pointer'
                                }}
                            >
                                &times;
                            </button>
                        </div>

                        {activeTab === 'library' && (
                            <div style={{ display: 'grid', gap: '2rem' }}>
                                {resourcesData.map((category, index) => (
                                    <div key={index} style={{ padding: '1.5rem', border: '1px solid var(--color-surface-hover)', borderRadius: '12px', background: 'rgba(255,255,255,0.03)' }}>
                                        <h3 style={{ color: 'var(--color-primary)', fontSize: '1.4rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-accent)', paddingBottom: '0.5rem', display: 'inline-block' }}>
                                            {category.category}
                                        </h3>
                                        <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: '1rem' }}>
                                            {category.items.map((item, idx) => (
                                                <li key={idx} style={{ marginBottom: '1.5rem', paddingLeft: '1rem', borderLeft: '2px solid var(--color-surface-hover)' }}>
                                                    <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem' }}>
                                                        <a
                                                            href={item.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            style={{
                                                                color: 'var(--color-accent)',
                                                                textDecoration: 'none',
                                                                fontWeight: 600,
                                                                fontSize: '1.1rem',
                                                                transition: 'color 0.2s ease'
                                                            }}
                                                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-highlight)'}
                                                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-accent)'}
                                                        >
                                                            {item.title}
                                                        </a>
                                                        {item.year && <span style={{ fontSize: '0.9rem', color: 'var(--color-text-tertiary)' }}>({item.year})</span>}
                                                    </div>
                                                    <p style={{ margin: '0.2rem 0', color: 'var(--color-text-secondary)', fontWeight: 500 }}>{item.author}</p>
                                                    <p style={{ margin: '0.2rem 0', fontSize: '0.9rem', color: 'var(--color-text-tertiary)', lineHeight: '1.4' }}>{item.description}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'comparison' && (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--color-text-primary)' }}>
                                    <thead>
                                        <tr style={{ background: 'var(--color-surface-hover)' }}>
                                            <th style={{ padding: '1rem', textAlign: 'left' }}>Physics Concept</th>
                                            <th style={{ padding: '1rem', textAlign: 'left' }}>Financial Application</th>
                                            <th style={{ padding: '1rem', textAlign: 'left' }}>Shared Mathematics</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style={{ borderBottom: '1px solid var(--color-surface-hover)' }}>
                                            <td style={{ padding: '1rem' }}>Brownian Motion (Diffusion)</td>
                                            <td style={{ padding: '1rem' }}>Stock Price Movement</td>
                                            <td style={{ padding: '1rem', fontFamily: 'monospace' }}>Diffusion Equation</td>
                                        </tr>
                                        <tr style={{ borderBottom: '1px solid var(--color-surface-hover)' }}>
                                            <td style={{ padding: '1rem' }}>Statistical Mechanics (Ensembles)</td>
                                            <td style={{ padding: '1rem' }}>Market Microstructure</td>
                                            <td style={{ padding: '1rem', fontFamily: 'monospace' }}>Boltzmann Distribution</td>
                                        </tr>
                                        <tr style={{ borderBottom: '1px solid var(--color-surface-hover)' }}>
                                            <td style={{ padding: '1rem' }}>Turbulence</td>
                                            <td style={{ padding: '1rem' }}>Market Volatility Cascades</td>
                                            <td style={{ padding: '1rem', fontFamily: 'monospace' }}>Navier-Stokes (analogies)</td>
                                        </tr>
                                        <tr style={{ borderBottom: '1px solid var(--color-surface-hover)' }}>
                                            <td style={{ padding: '1rem' }}>Atomic Decay</td>
                                            <td style={{ padding: '1rem' }}>Option Expiry? (Loose analogy)</td>
                                            <td style={{ padding: '1rem', fontFamily: 'monospace' }}>Exponential Decay</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

Resources.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default Resources;
