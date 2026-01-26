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
            } catch {
                containerRef.current.innerText = math;
            }
        }
    }, [math]);
    return <div ref={containerRef} className="math-display" />;
};

MathDisplay.propTypes = { math: PropTypes.string.isRequired };

export default MathDisplay;
