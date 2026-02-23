import React, { useState, useMemo, useEffect } from 'react';
import Plot from 'react-plotly.js';

// Random Midpoint Displacement (RMD) algorithm for generating fBM
// Returns an array of size 2^N + 1
function generateFBM(N, H, seedModifier = 0) {
    const size = Math.pow(2, N) + 1;
    const result = new Float32Array(size);

    // Initial points
    result[0] = 0;

    // We want some variance but not infinite. We use a simple custom RNG to make it repeatable for specific seeds if needed,
    // though Math.random() is fine for qualitative looks. Let's use Math.random.
    const randomGaussian = () => {
        let u = 0, v = 0;
        while (u === 0) u = Math.random();
        while (v === 0) v = Math.random();
        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    };

    result[size - 1] = randomGaussian();

    let step = size - 1;
    let variance = 1.0;

    // The core RMD loop
    while (step > 1) {
        const halfStep = step / 2;
        // variance scales by (1/2)^(2H) at each level of refinement
        const stdDev = Math.sqrt(variance) * Math.pow(0.5, H);

        for (let i = 0; i < size - 1; i += step) {
            const mid = i + halfStep;
            const avg = (result[i] + result[i + step]) / 2.0;
            result[mid] = avg + randomGaussian() * stdDev;
        }

        variance *= Math.pow(0.5, 2 * H);
        step = halfStep;
    }

    return Array.from(result);
}

// Convert price paths to return paths
// R_t = P_t - P_{t-1}
function toReturns(prices) {
    const returns = [];
    for (let i = 1; i < prices.length; i++) {
        returns.push(prices[i] - prices[i - 1]);
    }
    return returns;
}

const FractionalBrownianMotionSimulation = () => {
    const [hurstExponent, setHurstExponent] = useState(0.5);
    const [seed, setSeed] = useState(0);

    const N = 9; // 2^9 + 1 = 513 points

    // Generate a "Real Market" baseline once (or re-generate on seed change).
    // Real markets often show slight persistence or anti-persistence, but we'll use H=0.55 as a proxy
    // to give it a slightly "trendy" feel compared to pure random walk, while still looking rough.
    const realMarketReturns = useMemo(() => {
        const prices = generateFBM(N, 0.55, seed + 100);
        return toReturns(prices);
    }, [seed]);

    // Generate the fBM Model returns dynamically based on the slider
    const modelReturns = useMemo(() => {
        const prices = generateFBM(N, hurstExponent, seed);
        return toReturns(prices);
    }, [hurstExponent, seed]);

    // X-axis (time)
    const timeAxis = useMemo(() => Array.from({ length: modelReturns.length }, (_, i) => i), [modelReturns.length]);

    const data = [
        {
            x: timeAxis,
            y: realMarketReturns,
            type: 'scatter',
            mode: 'lines',
            name: 'Real Market Returns (Proxy)',
            line: { color: 'rgba(120, 120, 120, 0.5)', width: 1.5 },
        },
        {
            x: timeAxis,
            y: modelReturns,
            type: 'scatter',
            mode: 'lines',
            name: `fBM Model Returns (H=${hurstExponent.toFixed(2)})`,
            line: { color: 'var(--color-accent, #3b82f6)', width: 2 },
        }
    ];

    const layout = {
        title: '',
        margin: { t: 20, r: 20, l: 40, b: 30 },
        autosize: true,
        height: 350,
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        xaxis: {
            title: '',
            showgrid: true,
            gridcolor: 'rgba(150, 150, 150, 0.1)',
            zeroline: false,
            showticklabels: false
        },
        yaxis: {
            title: 'Returns',
            showgrid: true,
            gridcolor: 'rgba(150, 150, 150, 0.1)',
            zeroline: true,
            zerolinecolor: 'rgba(150, 150, 150, 0.3)',
            color: 'var(--color-text-secondary, #a1a1aa)',
            // Fix axis range so the extreme jaggedness of low H doesn't squish everything else
            range: [-5, 5]
        },
        legend: {
            orientation: 'h',
            yanchor: 'bottom',
            y: 1.02,
            xanchor: 'right',
            x: 1,
            font: { color: 'var(--color-text-primary, #f4f4f5)' }
        }
    };

    // Determine the regime text based on H
    let regimeText = "";
    let regimeColor = "var(--color-text-secondary)";
    if (hurstExponent < 0.45) {
        regimeText = "Mean-Reverting & Rough (Sideways Market)";
        regimeColor = "var(--color-finance, #f59e0b)"; // Orange-ish
    } else if (hurstExponent > 0.55) {
        regimeText = "Persistent & Smooth (Trending Market)";
        regimeColor = "var(--color-primary, #6ee7b7)"; // Green-ish
    } else {
        regimeText = "Random Walk (Brownian Motion)";
        regimeColor = "var(--color-text-primary)";
    }

    return (
        <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'var(--color-surface, rgba(255, 255, 255, 0.03))',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid var(--color-border, rgba(255, 255, 255, 0.1))'
        }}>

            <div style={{ width: '100%' }}>
                <Plot
                    data={data}
                    layout={layout}
                    useResizeHandler={true}
                    style={{ width: '100%', height: '100%' }}
                    config={{ displayModeBar: false }}
                />
            </div>

            <div style={{ width: '100%', maxWidth: '500px', marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ color: 'var(--color-text-primary)', fontWeight: 'bold' }}>
                        Hurst Exponent (H): <span style={{ color: 'var(--color-accent)' }}>{hurstExponent.toFixed(2)}</span>
                    </label>
                    <button
                        onClick={() => setSeed(s => s + 1)}
                        style={{
                            padding: '0.4rem 0.8rem',
                            background: 'var(--color-surface-hover)',
                            border: '1px solid var(--color-border)',
                            borderRadius: '4px',
                            color: 'var(--color-text-secondary)',
                            cursor: 'pointer',
                            fontSize: '0.8rem'
                        }}
                    >
                        Regenerate Paths
                    </button>
                </div>

                <input
                    type="range"
                    min="0.01"
                    max="0.99"
                    step="0.01"
                    value={hurstExponent}
                    onChange={(e) => setHurstExponent(parseFloat(e.target.value))}
                    style={{ width: '100%', cursor: 'pointer' }}
                />

                <div style={{
                    padding: '0.8rem',
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: '6px',
                    textAlign: 'center',
                    border: `1px solid ${regimeColor}`,
                    transition: 'border-color 0.3s ease'
                }}>
                    <span style={{ color: regimeColor, fontWeight: 'bold', letterSpacing: '0.5px' }}>
                        {regimeText}
                    </span>
                    <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                        {hurstExponent < 0.45 && "Notice how the model drastically bounces back and forth (anti-persistence), unlike the real market. Prices reverse their direction frequently."}
                        {hurstExponent >= 0.45 && hurstExponent <= 0.55 && "A classic random walk with no memory. Future direction is independent of the past, representing standard Brownian motion."}
                        {hurstExponent > 0.55 && "The path shows momentum and long-term trends (persistence). It looks much smoother than standard Brownian motion, frequently tracking in one direction."}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FractionalBrownianMotionSimulation;
