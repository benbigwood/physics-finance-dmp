import 'katex/dist/katex.min.css';
import katex from 'katex';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const MathDisplay = ({ math, inline = false }) => {
    const containerRef = useRef(null);
    useEffect(() => {
        if (containerRef.current) {
            try {
                katex.render(math, containerRef.current, {
                    throwOnError: false,
                    displayMode: !inline,
                    output: 'html' // Use HTML output
                });
            } catch {
                containerRef.current.innerText = math;
            }
        }
    }, [math, inline]);
    return <span ref={containerRef} className={inline ? "math-inline" : "math-display"} />;
};

MathDisplay.propTypes = {
    math: PropTypes.string.isRequired,
    inline: PropTypes.bool
};

export default MathDisplay;
