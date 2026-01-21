import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

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
                            top: 0, 0: 0,
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
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                <div style={{ padding: '1rem', border: '1px solid var(--color-surface-hover)', borderRadius: '8px' }}>
                                    <h3 style={{ color: 'var(--color-text-primary)' }}>Seminal Papers</h3>
                                    <ul style={{ listStyle: 'none', marginTop: '0.5rem', paddingLeft: 0 }}>
                                        <li style={{ marginBottom: '0.5rem' }}>
                                            <a href="#" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>L. Bachelier (1900). "Théorie de la spéculation"</a>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>The first mathematical model of Brownian motion.</p>
                                        </li>
                                        <li style={{ marginBottom: '0.5rem' }}>
                                            <a href="#" style={{ color: 'var(--color-accent)', textDecoration: 'none' }}>Black, F., & Scholes, M. (1973). "The Pricing of Options and Corporate Liabilities"</a>
                                        </li>
                                    </ul>
                                </div>
                                <div style={{ padding: '1rem', border: '1px solid var(--color-surface-hover)', borderRadius: '8px' }}>
                                    <h3 style={{ color: 'var(--color-text-primary)' }}>Books & Further Reading</h3>
                                    <ul style={{ listStyle: 'none', marginTop: '0.5rem', paddingLeft: 0 }}>
                                        <li style={{ marginBottom: '0.5rem' }}><em>The Physics of Wall Street</em> by James Owen Weatherall</li>
                                        <li style={{ marginBottom: '0.5rem' }}><em>My Life as a Quant</em> by Emanuel Derman</li>
                                    </ul>
                                </div>
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
