import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const About = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'var(--color-bg)',
                        zIndex: 2000,
                        padding: '2rem',
                        overflowY: 'auto'
                    }}
                >
                    <div style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2rem',
                        position: 'relative',
                        paddingBottom: '4rem'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                            <h2 style={{ color: 'var(--color-accent)', fontSize: '2.5rem', margin: 0 }}>About Us!</h2>
                            <button
                                onClick={onClose}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--color-text-secondary)',
                                    fontSize: '2rem',
                                    cursor: 'pointer',
                                    padding: '0.5rem',
                                    lineHeight: 1
                                }}
                            >
                                &times;
                            </button>
                        </div>

                        <div style={{
                            display: 'flex',
                            gap: '5rem',
                            flexWrap: 'wrap',
                            alignItems: 'flex-start',
                            marginTop: '1rem'
                        }}>
                            <div style={{ flex: '1', minWidth: '450px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                                <img
                                    src={`${import.meta.env.BASE_URL}About us photo.png`}
                                    alt="About Us"
                                    style={{
                                        width: 'auto',
                                        height: 'auto',
                                        maxHeight: '450px',
                                        borderRadius: 'var(--radius-lg)',
                                        transform: 'rotate(270deg)',
                                        marginTop: '-50px', // Pulls the visual top up to align with text
                                        boxShadow: 'var(--shadow-lg)'
                                    }}
                                />
                            </div>

                            <div style={{ flex: '2', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ fontSize: '1.1rem' }}>
                                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
                                        Hi! We're Alicia Lamplugh, Ben Bigwood, Will Kitching, Will Murray, and Alex Wilkinson and this is our group project for our digital media project as second-year undergraduate physics students at Durham University taking the Physics in Society module.
                                    </p>
                                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8', marginTop: '1rem' }}>
                                        We're proud of what we've done and hope it helps you understand and explore how the physics we come across in our studies is being applied to finance. We wanted to explore how concepts from the physical world, like Brownian motion and heat diffusion, have been applied to model financial markets. Our goal is to provide an interactive and educational resource for students and enthusiasts to discover these fascinating connections. It's a fascinating field that has taken many inert phenomena such as Brownian motion and applied similar logic and mathematics to predict the financial markets generating trillions of pounds and we have explored many of those scenarios in this website for you.
                                    </p>
                                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8', marginTop: '1rem' }}>
                                        We hope you find it interesting seeing how physics can be applied to finance whether you're curious about just a tiny part of how physics is applied, or want to pick up the pattern of solving these problems and make money yourself!
                                    </p>
                                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8', marginTop: '1.5rem', fontWeight: 500 }}>
                                        Enjoy,<br />
                                        Alicia, Ben, Will, Will, and Alex
                                    </p>
                                </div>

                                <div style={{ fontSize: '1rem', marginTop: '1rem' }}>
                                    <h3 style={{ color: 'var(--color-text-primary)', marginBottom: '0.5rem', fontSize: '1.2rem' }}>AI Statement</h3>
                                    <p style={{ color: 'var(--color-text-tertiary)', lineHeight: '1.6', fontStyle: 'italic' }}>
                                        This project utilised AI assistance for code generation, text drafting, and design inspiration. While AI tools were used to accelerate development and explore creative ideas, all content is our own ideas and intentions. We have reviewed every part and it has all been curated by our team to accuracy and alignment with our educational goals. We have used AI as our tool, but it has not chosen the work or taken from our creative intentions.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: 'auto', paddingTop: '3rem', borderTop: '1px solid var(--color-border)' }}>
                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-tertiary)', textAlign: 'center' }}>
                                Physics in Finance Digital Media Project
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

About.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default About;
