import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { quizData } from '../data/quizData';

const Quiz = ({ isOpen, onClose }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    // Reset quiz state when opened
    useEffect(() => {
        if (isOpen) {
            setCurrentQuestion(0);
            setScore(0);
            setShowScore(false);
            setSelectedOption(null);
            setIsCorrect(null);
        }
    }, [isOpen]);

    const handleOptionClick = (index) => {
        if (selectedOption !== null) return; // Prevent multiple clicks

        setSelectedOption(index);
        const correct = index === quizData[currentQuestion].correctAnswer;
        setIsCorrect(correct);

        if (correct) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < quizData.length) {
            setCurrentQuestion(nextQuestion);
            setSelectedOption(null);
            setIsCorrect(null);
        } else {
            setShowScore(true);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setSelectedOption(null);
        setIsCorrect(null);
    };

    const getRank = (score) => {
        const percentage = (score / quizData.length) * 100;
        if (percentage === 100) return "👑 Nobel Laureate";
        if (percentage >= 80) return "🧙‍♂️ Quant Wizard";
        if (percentage >= 60) return "🎓 Financial Analyst";
        if (percentage >= 40) return "📚 Econ Student";
        return "🌱 Market Novice";
    };

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
                            left: '5%', // Keep it slightly wider than other modals if needed
                            right: '5%',
                            height: '85vh',
                            background: 'var(--color-bg)',
                            zIndex: 999,
                            borderRadius: '20px 20px 0 0',
                            padding: 'var(--spacing-md)',
                            boxShadow: '0 -10px 40px rgba(0,0,0,0.5)',
                            display: 'flex',
                            flexDirection: 'column',
                            color: 'var(--color-text-primary)'
                        }}
                    >
                        {/* Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <div>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: 600, color: 'var(--color-text-primary)', margin: 0 }}>
                                    Quiz 🧠
                                </h2>
                                {!showScore && (
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                                        Just for fun! Question {currentQuestion + 1} of {quizData.length}
                                    </p>
                                )}
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

                        {/* Progress Bar */}
                        {!showScore && (
                            <div style={{
                                width: '100%',
                                height: '6px',
                                background: 'var(--color-surface)',
                                borderRadius: '3px',
                                marginBottom: '2rem',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    width: `${((currentQuestion + 1) / quizData.length) * 100}%`,
                                    height: '100%',
                                    background: 'var(--gradient-primary)',
                                    transition: 'width 0.3s ease'
                                }} />
                            </div>
                        )}

                        {/* Content */}
                        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '2rem' }}>
                            {showScore ? (
                                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                                    <h3 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Quiz Complete!</h3>
                                    <div style={{ fontSize: '4rem', fontWeight: 700, color: 'var(--color-accent)', marginBottom: '1rem' }}>
                                        {score} / {quizData.length}
                                    </div>
                                    <p style={{ fontSize: '1.5rem', color: 'var(--color-text-secondary)' }}>
                                        Rank: <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{getRank(score)}</span>
                                    </p>
                                    <button
                                        onClick={restartQuiz}
                                        style={{
                                            marginTop: '2rem',
                                            padding: '1rem 2.5rem',
                                            background: 'var(--color-primary)',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: 'var(--radius-md)',
                                            fontSize: '1.2rem',
                                            cursor: 'pointer',
                                            fontWeight: 600,
                                            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                                            transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-3px)';
                                            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                                        }}
                                    >
                                        Restart Quiz
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3 style={{ fontSize: '1.4rem', marginBottom: '2rem', lineHeight: '1.5' }}>
                                        {quizData[currentQuestion].question}
                                    </h3>

                                    <div style={{ display: 'grid', gap: '1rem' }}>
                                        {quizData[currentQuestion].options.map((option, index) => {
                                            let backgroundColor = 'var(--color-surface)';
                                            let borderColor = 'transparent';

                                            // Logic for coloring options after selection
                                            if (selectedOption !== null) {
                                                if (index === quizData[currentQuestion].correctAnswer) {
                                                    backgroundColor = 'rgba(76, 175, 80, 0.2)'; // Green tint
                                                    borderColor = '#4CAF50';
                                                } else if (index === selectedOption) {
                                                    backgroundColor = 'rgba(244, 67, 54, 0.2)'; // Red tint
                                                    borderColor = '#F44336';
                                                }
                                            }

                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => handleOptionClick(index)}
                                                    disabled={selectedOption !== null}
                                                    style={{
                                                        padding: '1.2rem',
                                                        textAlign: 'left',
                                                        background: backgroundColor,
                                                        border: `2px solid ${borderColor}`,
                                                        borderRadius: 'var(--radius-md)',
                                                        color: 'var(--color-text-primary)',
                                                        fontSize: '1.1rem',
                                                        cursor: selectedOption !== null ? 'default' : 'pointer',
                                                        transition: 'all 0.2s ease',
                                                        opacity: (selectedOption !== null && index !== quizData[currentQuestion].correctAnswer && index !== selectedOption) ? 0.5 : 1
                                                    }}
                                                >
                                                    {option}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {selectedOption !== null && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            style={{
                                                marginTop: '2rem',
                                                padding: '1.5rem',
                                                background: 'var(--color-surface-hover)',
                                                borderRadius: 'var(--radius-md)',
                                                borderLeft: `4px solid ${isCorrect ? '#4CAF50' : '#F44336'}`
                                            }}
                                        >
                                            <h4 style={{ color: isCorrect ? '#4CAF50' : '#F44336', marginBottom: '0.5rem' }}>
                                                {isCorrect ? 'Correct!' : 'Incorrect'}
                                            </h4>
                                            <p style={{ margin: 0, color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                                                {quizData[currentQuestion].explanation}
                                            </p>
                                            <div style={{ textAlign: 'right', marginTop: '1rem' }}>
                                                <button
                                                    onClick={handleNextQuestion}
                                                    style={{
                                                        padding: '0.8rem 1.5rem',
                                                        background: 'var(--color-accent)',
                                                        color: '#fff',
                                                        border: 'none',
                                                        borderRadius: 'var(--radius-sm)',
                                                        cursor: 'pointer',
                                                        fontWeight: 600
                                                    }}
                                                >
                                                    {currentQuestion === quizData.length - 1 ? 'Finish' : 'Next Question'}
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

Quiz.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default Quiz;
