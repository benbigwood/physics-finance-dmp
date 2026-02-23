import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const ComparisonChart = ({ isOpen, onClose, onNavigate }) => {
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
                            background: 'var(--color-bg)',
                            zIndex: 999,
                            borderRadius: '20px 20px 0 0',
                            padding: 'var(--spacing-md)',
                            boxShadow: '0 -10px 40px rgba(0,0,0,0.5)',
                            overflowY: 'auto'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>
                                Physics & Finance Comparison
                            </h2>
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

                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--color-text-primary)' }}>
                                <thead>
                                    <tr style={{ background: 'var(--color-bg)' }}>
                                        <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid var(--color-surface-hover)' }}>Physics Concept</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid var(--color-surface-hover)' }}>Financial Application</th>
                                        <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid var(--color-surface-hover)' }}>Shared Mathematics</th>
                                    </tr>
                                </thead>
                                <tbody style={{ background: 'var(--color-bg)' }}>
                                    <tr
                                        onClick={() => {
                                            if (onNavigate) {
                                                onNavigate('1900');
                                                onClose();
                                            }
                                        }}
                                        style={{
                                            borderBottom: '1px solid var(--color-surface-hover)',
                                            cursor: 'pointer',
                                            transition: 'background 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-surface-hover)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                    >
                                        <td style={{ padding: '1rem', color: 'var(--color-accent)' }}>Brownian Motion (Diffusion) ↗</td>
                                        <td style={{ padding: '1rem' }}>Speculation & Price Discovery</td>
                                        <td style={{ padding: '1rem', fontFamily: 'monospace' }}>Diffusion Equation</td>
                                    </tr>
                                    <tr
                                        onClick={() => {
                                            if (onNavigate) {
                                                onNavigate('1952');
                                                onClose();
                                            }
                                        }}
                                        style={{
                                            borderBottom: '1px solid var(--color-surface-hover)',
                                            cursor: 'pointer',
                                            transition: 'background 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-surface-hover)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                    >
                                        <td style={{ padding: '1rem', color: 'var(--color-accent)' }}>Coupled Oscillators & Energy ↗</td>
                                        <td style={{ padding: '1rem' }}>Modern Portfolio Theory</td>
                                        <td style={{ padding: '1rem', fontFamily: 'monospace' }}>Quadratic Forms</td>
                                    </tr>
                                    <tr
                                        onClick={() => {
                                            if (onNavigate) {
                                                onNavigate('1960');
                                                onClose();
                                            }
                                        }}
                                        style={{
                                            borderBottom: '1px solid var(--color-surface-hover)',
                                            cursor: 'pointer',
                                            transition: 'background 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-surface-hover)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                    >
                                        <td style={{ padding: '1rem', color: 'var(--color-accent)' }}>Turbulence & Self-Similarity ↗</td>
                                        <td style={{ padding: '1rem' }}>Fractal Market Volatility</td>
                                        <td style={{ padding: '1rem', fontFamily: 'monospace' }}>Power Laws</td>
                                    </tr>
                                    <tr
                                        onClick={() => {
                                            if (onNavigate) {
                                                onNavigate('1973');
                                                onClose();
                                            }
                                        }}
                                        style={{
                                            borderBottom: '1px solid var(--color-surface-hover)',
                                            cursor: 'pointer',
                                            transition: 'background 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-surface-hover)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                    >
                                        <td style={{ padding: '1rem', color: 'var(--color-accent)' }}>Thermodynamics & Heat Flux ↗</td>
                                        <td style={{ padding: '1rem' }}>Options Pricing (Black-Scholes)</td>
                                        <td style={{ padding: '1rem', fontFamily: 'monospace' }}>Heat Equation</td>
                                    </tr>
                                    <tr
                                        onClick={() => {
                                            if (onNavigate) {
                                                onNavigate('now');
                                                onClose();
                                            }
                                        }}
                                        style={{
                                            borderBottom: '1px solid var(--color-surface-hover)',
                                            cursor: 'pointer',
                                            transition: 'background 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-surface-hover)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                    >
                                        <td style={{ padding: '1rem', color: 'var(--color-accent)' }}>Quantum Mechanics & Computing ↗</td>
                                        <td style={{ padding: '1rem' }}>Portfolio Optimisation & Contagion Modelling</td>
                                        <td style={{ padding: '1rem', fontFamily: 'monospace' }}>Hilbert Spaces & Tensor Products</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

ComparisonChart.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onNavigate: PropTypes.func
};

export default ComparisonChart;
