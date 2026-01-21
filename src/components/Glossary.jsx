import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { glossaryTerms } from '../data/glossaryData';
import PropTypes from 'prop-types';

const Glossary = ({ isOpen, onClose }) => {
    const [filter, setFilter] = useState('All');

    const filteredTerms = filter === 'All'
        ? glossaryTerms
        : glossaryTerms.filter(t => t.category === filter);

    const uniqueCategories = ['All', ...new Set(glossaryTerms.map(t => t.category))];

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
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            width: '90%',
                            maxWidth: '400px',
                            height: '100vh',
                            background: 'var(--color-surface)',
                            zIndex: 999,
                            padding: 'var(--spacing-md)',
                            boxShadow: '-5px 0 20px rgba(0,0,0,0.5)',
                            overflowY: 'auto'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
                            <h2 style={{ color: 'var(--color-accent)' }}>Glossary</h2>
                            <button
                                onClick={onClose}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--color-text-secondary)',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer'
                                }}
                            >
                                &times;
                            </button>
                        </div>

                        <div style={{ marginBottom: 'var(--spacing-md)', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {uniqueCategories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '20px',
                                        border: '1px solid var(--color-surface-hover)',
                                        background: filter === cat ? 'var(--color-accent)' : 'transparent',
                                        color: filter === cat ? 'var(--color-bg)' : 'var(--color-text-secondary)',
                                        cursor: 'pointer',
                                        fontSize: '0.8rem'
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                            {filteredTerms.map((item, idx) => (
                                <div key={idx} style={{ padding: '0.75rem', borderBottom: '1px solid var(--color-surface-hover)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                        <h4 style={{ color: 'var(--color-text-primary)' }}>{item.term}</h4>
                                        <span style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase' }}>
                                            {item.category}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                                        {item.definition}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

Glossary.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default Glossary;
