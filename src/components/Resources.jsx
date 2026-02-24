import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { resourcesData } from '../data/resourcesData';

const Resources = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('furtherReading');

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
                                Resource Library
                            </h2>
                            <button
                                onClick={onClose}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--color-text-secondary)',
                                    fontSize: '2.5rem',
                                    lineHeight: 1,
                                    cursor: 'pointer',
                                    padding: '0 0.5rem'
                                }}
                            >
                                &times;
                            </button>
                        </div>

                        {/* Subtabs Navigation */}
                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            marginBottom: '2rem',
                            borderBottom: '1px solid var(--color-surface-hover)',
                            paddingBottom: '1rem'
                        }}>
                            <button
                                onClick={() => setActiveTab('furtherReading')}
                                style={{
                                    background: activeTab === 'furtherReading' ? 'var(--color-accent)' : 'rgba(0,0,0,0.05)',
                                    color: activeTab === 'furtherReading' ? 'white' : 'var(--color-text-primary)',
                                    border: 'none',
                                    padding: '0.8rem 1.5rem',
                                    borderRadius: '50px',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    transition: 'all 0.2s ease',
                                    boxShadow: activeTab === 'furtherReading' ? '0 4px 12px rgba(0,113,227,0.3)' : 'none'
                                }}
                            >
                                Further Reading
                            </button>
                            <button
                                onClick={() => setActiveTab('references')}
                                style={{
                                    background: activeTab === 'references' ? 'var(--color-accent)' : 'rgba(0,0,0,0.05)',
                                    color: activeTab === 'references' ? 'white' : 'var(--color-text-primary)',
                                    border: 'none',
                                    padding: '0.8rem 1.5rem',
                                    borderRadius: '50px',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    transition: 'all 0.2s ease',
                                    boxShadow: activeTab === 'references' ? '0 4px 12px rgba(0,113,227,0.3)' : 'none'
                                }}
                            >
                                All References
                            </button>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {activeTab === 'furtherReading' ? (
                                    <div style={{ display: 'grid', gap: '2rem' }}>
                                        {resourcesData.furtherReading.map((category, index) => (
                                            <div key={index} style={{ padding: '1.5rem', border: '1px solid var(--color-surface-hover)', borderRadius: '12px', background: 'rgba(255,255,255,0.03)' }}>
                                                <h3 style={{ color: 'var(--color-accent)', fontSize: '1.4rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-surface-hover)', paddingBottom: '0.5rem', display: 'inline-block' }}>
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
                                                            <div style={{ marginTop: '0.2rem', marginBottom: '0.4rem' }}>
                                                                <a
                                                                    href={item.link}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    style={{
                                                                        color: 'var(--color-accent)',
                                                                        fontSize: '0.85em',
                                                                        textDecoration: 'none',
                                                                        wordBreak: 'break-all',
                                                                        opacity: 0.8
                                                                    }}
                                                                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                                                                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                                                                >
                                                                    {item.link}
                                                                </a>
                                                            </div>
                                                            <p style={{ margin: '0.2rem 0', color: 'var(--color-text-secondary)', fontWeight: 500 }}>{item.author}</p>
                                                            <p style={{ margin: '0.2rem 0', fontSize: '0.9rem', color: 'var(--color-text-tertiary)', lineHeight: '1.4' }}>{item.description}</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div style={{ display: 'grid', gap: '2rem' }}>
                                        {resourcesData.references.map((category, index) => (
                                            <div key={index} style={{ padding: '1.5rem', border: '1px solid var(--color-surface-hover)', borderRadius: '12px', background: 'rgba(255,255,255,0.03)' }}>
                                                <h3 style={{ color: 'var(--color-accent)', fontSize: '1.4rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-surface-hover)', paddingBottom: '0.5rem', display: 'inline-block' }}>
                                                    {category.category}
                                                </h3>
                                                <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: '1rem' }}>
                                                    {category.items.map((item, idx) => (
                                                        <li key={idx} style={{ marginBottom: '1.5rem', paddingLeft: '1rem', borderLeft: '2px solid var(--color-surface-hover)' }}>
                                                            <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem' }}>
                                                                <span style={{ color: 'var(--color-finance)', fontWeight: 'bold' }}>[{idx + 1}]</span>
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
                                                            <div style={{ marginTop: '0.2rem', marginBottom: '0.4rem' }}>
                                                                <a
                                                                    href={item.link}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    style={{
                                                                        color: 'var(--color-accent)',
                                                                        fontSize: '0.85em',
                                                                        textDecoration: 'none',
                                                                        wordBreak: 'break-all',
                                                                        opacity: 0.8
                                                                    }}
                                                                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                                                                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                                                                >
                                                                    {item.link}
                                                                </a>
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
                            </motion.div>
                        </AnimatePresence>

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
