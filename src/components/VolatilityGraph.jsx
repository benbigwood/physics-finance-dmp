import { motion } from 'framer-motion';

const VolatilityGraph = () => {
    // Generate two paths: one low volatility, one high volatility
    // We'll use a simple random walk logic but pre-calculated for consistency or just hardcoded SVG path commands for smoothness

    // Low Volatility Path (S1) - Horizontal trend, small noise
    const pathS1 = "M 50 150 L 100 145 L 150 155 L 200 148 L 250 152 L 300 147 L 350 153 L 400 149 L 450 150";

    // High Volatility Path (S2) - Horizontal trend, large swings
    const pathS2 = "M 50 150 L 80 100 L 120 200 L 160 80 L 200 220 L 250 90 L 300 210 L 360 80 L 400 180 L 450 150";

    return (
        <div style={{
            width: '100%',
            maxWidth: '600px', // Slightly wider for better view
            margin: '2rem auto',
            padding: '1rem',
            background: 'var(--color-bg)',
            borderRadius: '8px',
            border: '1px solid var(--color-surface-hover)',
            textAlign: 'center'
        }}>
            <svg viewBox="0 0 500 300" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
                {/* Axes */}
                <line x1="50" y1="250" x2="450" y2="250" stroke="var(--color-text-secondary)" strokeWidth="2" />
                <line x1="50" y1="250" x2="50" y2="50" stroke="var(--color-text-secondary)" strokeWidth="2" />

                {/* Labels */}
                <text x="460" y="255" fill="var(--color-text-secondary)" fontSize="12">Time</text>
                <text x="40" y="40" fill="var(--color-text-secondary)" fontSize="12" textAnchor="end">Price</text>

                {/* Reference Line (Mean) */}
                <line x1="50" y1="150" x2="450" y2="150" stroke="var(--color-border)" strokeWidth="1" strokeDasharray="5,5" />

                {/* S1 Path - Low Volatility */}
                <motion.path
                    d={pathS1}
                    fill="none"
                    stroke="#4ade80" // Greenish
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />
                <text x="405" y="135" fill="#4ade80" fontSize="14" fontWeight="bold">Low Vol (σ₁)</text>

                {/* S2 Path - High Volatility */}
                <motion.path
                    d={pathS2}
                    fill="none"
                    stroke="#f43f5e" // Reddish
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                />
                <text x="360" y="70" fill="#f43f5e" fontSize="14" fontWeight="bold">High Vol (σ₂)</text>

                {/* Annotation arrow pointing to S2 */}
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="var(--color-text-primary)" />
                    </marker>
                </defs>
                <line x1="200" y1="50" x2="200" y2="75" stroke="var(--color-text-primary)" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                <text x="200" y="40" fill="var(--color-text-primary)" fontSize="12" textAnchor="middle">Volatility = Spread around the mean</text>

            </svg>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
                Figure 1: Visual representation of Volatility (<span style={{ fontFamily: 'KaTeX_Main, Times New Roman, serif' }}>σ</span>)
            </p>
        </div>
    );
};

export default VolatilityGraph;
