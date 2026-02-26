import React, { useState, useEffect, useMemo } from 'react';
import Plot from 'react-plotly.js';

// --- Pure JS Math Helpers ---

// Box-Muller transform for standard normal distribution (mean=0, std=1)
function randomNormal() {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// Matrix Multiplication (A * B)
function multiplyMatrices(m1, m2) {
    const r1 = m1.length;
    const c1 = m1[0].length;
    const r2 = m2.length;
    const c2 = m2[0].length;
    if (c1 !== r2) return null;
    let mResult = new Array(r1);
    for (let r = 0; r < r1; ++r) {
        mResult[r] = new Array(c2);
        for (let c = 0; c < c2; ++c) {
            mResult[r][c] = 0;
            for (let i = 0; i < c1; ++i) {
                mResult[r][c] += m1[r][i] * m2[i][c];
            }
        }
    }
    return mResult;
}

// Matrix Transpose
function transposeMatrix(m) {
    return m[0].map((_, colIndex) => m.map(row => row[colIndex]));
}

// Covariance of a random matrix A (A * A.T)
function calculateCovarianceFromRandom(n) {
    // Generate random matrix A (n x n)
    const A = Array.from({ length: n }, () =>
        Array.from({ length: n }, () => randomNormal())
    );
    // Cov = A * A.T
    const AT = transposeMatrix(A);
    const cov = multiplyMatrices(A, AT);
    return cov;
}

/**
 * Modern Portfolio Theory Simulation
 * Pure JS implementation - Zero external math dependencies
 */
const ModernPortfolioSimulation = () => {
    // --- State ---
    const [numAssets, setNumAssets] = useState(5);
    const [riskFreeRate, setRiskFreeRate] = useState(2); // Percent
    const [returnRange, setReturnRange] = useState([5, 15]); // Percent
    const [volatilityRange, setVolatilityRange] = useState([10, 25]); // Percent

    // --- Simulation Data ---
    const [simulationData, setSimulationData] = useState(null);

    // --- Logic ---
    useEffect(() => {
        // Immediate run on first load, debounce subsequent updates
        const timeoutId = setTimeout(() => {
            runSimulation();
        }, 50);
        return () => clearTimeout(timeoutId);
    }, [numAssets, riskFreeRate, returnRange, volatilityRange]);

    const runSimulation = () => {
        const n = numAssets;
        const rfrDec = riskFreeRate / 100;

        // 1. Generate Market Data
        const names = Array.from({ length: n }, (_, i) => `Asset ${String.fromCharCode(65 + i)}`);

        // Random Returns
        const returns = Array.from({ length: n }, () =>
            (Math.random() * (returnRange[1] - returnRange[0]) + returnRange[0]) / 100
        );

        // Random Volatilities
        const vols = Array.from({ length: n }, () =>
            (Math.random() * (volatilityRange[1] - volatilityRange[0]) + volatilityRange[0]) / 100
        );

        // Covariance Matrix Generation (Pure JS)
        // 1. Create a valid correlation structure first
        // We simulate this by generating a random covariance matrix and normalising it to correlation
        const rawCov = calculateCovarianceFromRandom(n);

        // Convert to correlation matrix
        const rawDiags = rawCov.map((row, i) => row[i]);
        const corr = rawCov.map((row, i) =>
            row.map((val, j) => val / Math.sqrt(rawDiags[i] * rawDiags[j]))
        );

        // 2. Apply target volatilities to get final Covariance Matrix
        // Cov_ij = Corr_ij * Vol_i * Vol_j
        const finalCov = Array.from({ length: n }, (_, i) =>
            Array.from({ length: n }, (_, j) =>
                corr[i][j] * vols[i] * vols[j]
            )
        );

        // 2. Monte Carlo Simulation
        const numPortfolios = 5000;
        const results = {
            rets: new Float32Array(numPortfolios),
            vols: new Float32Array(numPortfolios),
            sharpes: new Float32Array(numPortfolios)
        };

        // Trackers for optimal points
        let maxSharpe = -Infinity;
        let maxSharpePt = null;
        let minVol = Infinity;
        let minVolPt = null;

        // Reusable arrays
        const w = new Float32Array(n);

        for (let i = 0; i < numPortfolios; i++) {
            // Random weights
            let sumW = 0;
            for (let j = 0; j < n; j++) {
                // Use exponential distribution for more spread, or just uniform
                const val = Math.random();
                w[j] = val;
                sumW += val;
            }

            // Normalise & Calculate Expected Return
            let portRet = 0;
            for (let j = 0; j < n; j++) {
                w[j] /= sumW;
                portRet += w[j] * returns[j];
            }

            // Calculate Variance: w^T * Cov * w
            // variance = sum(w[i] * w[j] * Cov[i][j])
            let variance = 0;
            for (let r = 0; r < n; r++) {
                // Optimisation: Compute row sum first
                let rowTerm = 0;
                for (let c = 0; c < n; c++) {
                    rowTerm += w[c] * finalCov[r][c];
                }
                variance += w[r] * rowTerm;
            }

            const portVol = Math.sqrt(variance);
            const sharpe = (portRet - rfrDec) / portVol;

            results.rets[i] = portRet;
            results.vols[i] = portVol;
            results.sharpes[i] = sharpe;

            // Track Optimal Points
            if (sharpe > maxSharpe) {
                maxSharpe = sharpe;
                maxSharpePt = { x: portVol, y: portRet };
            }
            if (portVol < minVol) {
                minVol = portVol;
                minVolPt = { x: portVol, y: portRet };
            }
        }

        // 3. Approximate Efficient Frontier
        const frontierBins = {};
        const numBins = 100;
        const minRet = minVolPt.y;

        // Ensure max return asset is considered
        let maxAssetRet = -Infinity;
        let maxAssetVol = 0;
        for (let i = 0; i < n; i++) {
            if (returns[i] > maxAssetRet) {
                maxAssetRet = returns[i];
                maxAssetVol = vols[i];
            }
        }

        const maxRet = Math.max(...results.rets); // Use MC max
        const binSize = (maxAssetRet - minRet) / numBins;

        for (let i = 0; i < numPortfolios; i++) {
            const r = results.rets[i];
            const v = results.vols[i];

            if (r >= minRet) {
                const bin = Math.floor((r - minRet) / binSize);
                if (!frontierBins[bin] || v < frontierBins[bin].x) {
                    frontierBins[bin] = { x: v, y: r };
                }
            }
        }
        // Force endpoint
        frontierBins[numBins] = { x: maxAssetVol, y: maxAssetRet };

        const frontierPts = Object.values(frontierBins).sort((a, b) => a.y - b.y);

        // 4. CML
        const slope = (maxSharpePt.y - rfrDec) / maxSharpePt.x;
        // Extend line a bit past the optimal point
        const cmlX = [0, maxSharpePt.x, maxSharpePt.x * 1.5];
        const cmlY = [rfrDec, maxSharpePt.y, rfrDec + slope * (maxSharpePt.x * 1.5)];

        setSimulationData({
            assets: { names, returns, vols },
            mc: results,
            frontier: frontierPts,
            cml: { x: cmlX, y: cmlY },
            maxSharpePt,
            minVolPt
        });
    };

    // --- Render ---
    return (
        <div style={{ padding: '1rem', background: 'var(--color-bg)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>



            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>

                {/* Controls */}
                <div style={{ flex: '1 1 250px', background: 'var(--color-surface)', padding: '1.5rem', borderRadius: '8px' }}>
                    <ControlGroup label="Number of Assets">
                        <input
                            type="range" min="3" max="10" step="1"
                            value={numAssets}
                            onChange={(e) => setNumAssets(parseInt(e.target.value))}
                            style={{ width: '100%' }}
                        />
                        <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{numAssets}</div>
                    </ControlGroup>

                    <ControlGroup label={`Risk Free Rate: ${riskFreeRate}%`}>
                        <input
                            type="range" min="0" max="5" step="0.1"
                            value={riskFreeRate}
                            onChange={(e) => setRiskFreeRate(parseFloat(e.target.value))}
                            style={{ width: '100%' }}
                        />
                    </ControlGroup>

                    <ControlGroup label={`Exp. Return Range: ${returnRange[0]}% - ${returnRange[1]}%`}>
                        <MultiRangeSlider
                            min={0} max={30}
                            values={returnRange}
                            onChange={setReturnRange}
                        />
                    </ControlGroup>

                    <ControlGroup label={`Volatility Range: ${volatilityRange[0]}% - ${volatilityRange[1]}%`}>
                        <MultiRangeSlider
                            min={5} max={50}
                            values={volatilityRange}
                            onChange={setVolatilityRange}
                        />
                    </ControlGroup>

                    <button
                        onClick={runSimulation}
                        style={{
                            width: '100%', marginTop: '1rem', padding: '0.5rem',
                            background: 'var(--color-accent)', color: 'white',
                            border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600
                        }}
                    >
                        Rerun Simulation
                    </button>
                </div>

                {/* Graph */}
                <div style={{ flex: '2 1 400px', minHeight: '400px' }}>
                    {simulationData ? (
                        <Plot
                            data={[
                                // 1. Monte Carlo Cloud
                                {
                                    x: simulationData.mc.vols,
                                    y: simulationData.mc.rets,
                                    mode: 'markers',
                                    type: 'scatter',
                                    name: 'Random Portfolios',
                                    marker: {
                                        color: simulationData.mc.sharpes,
                                        colorscale: 'Tealgrn',
                                        size: 4,
                                        opacity: 0.6,
                                        showscale: false
                                    },
                                    hoverinfo: 'none' // Performance
                                },
                                // 2. CML
                                {
                                    x: simulationData.cml.x,
                                    y: simulationData.cml.y,
                                    mode: 'lines',
                                    type: 'scatter',
                                    name: 'Capital Market Line',
                                    line: { color: 'rgba(255, 99, 71, 0.6)', width: 2, dash: 'dot' }
                                },
                                // 3. Efficient Frontier
                                {
                                    x: simulationData.frontier.map(p => p.x),
                                    y: simulationData.frontier.map(p => p.y),
                                    mode: 'lines',
                                    type: 'scatter',
                                    name: 'Efficient Frontier',
                                    line: { color: '#333', width: 3 }
                                },
                                // 4. Individual Assets
                                {
                                    x: simulationData.assets.vols,
                                    y: simulationData.assets.returns,
                                    mode: 'markers+text',
                                    type: 'scatter',
                                    name: 'Assets',
                                    text: simulationData.assets.names,
                                    textposition: 'top center',
                                    marker: { color: 'purple', size: 10, symbol: 'diamond' }
                                },
                                // 5. Optimal Points
                                {
                                    x: [simulationData.maxSharpePt.x],
                                    y: [simulationData.maxSharpePt.y],
                                    mode: 'markers',
                                    type: 'scatter',
                                    name: 'Max Sharpe',
                                    marker: { color: 'gold', size: 16, symbol: 'star', line: { width: 1, color: 'black' } }
                                },
                                {
                                    x: [simulationData.minVolPt.x],
                                    y: [simulationData.minVolPt.y],
                                    mode: 'markers',
                                    type: 'scatter',
                                    name: 'Min Volatility',
                                    marker: { color: 'cyan', size: 12, symbol: 'circle', line: { width: 1, color: 'black' } }
                                }
                            ]}
                            layout={{
                                autosize: true,
                                height: 500,
                                margin: { l: 80, r: 30, t: 40, b: 60 },
                                xaxis: {
                                    title: { text: 'Volatility (Risk)', font: { size: 14 } },
                                    tickformat: '.0%',
                                    rangemode: 'tozero',
                                    showline: true,
                                    linewidth: 1,
                                    linecolor: 'rgba(128,128,128,0.5)',
                                    zeroline: true,
                                    zerolinewidth: 1,
                                    zerolinecolor: 'rgba(128,128,128,0.5)',
                                    gridcolor: 'rgba(128,128,128,0.2)'
                                },
                                yaxis: {
                                    title: { text: 'Expected Return', font: { size: 14 } },
                                    tickformat: '.0%',
                                    showline: true,
                                    linewidth: 1,
                                    linecolor: 'rgba(128,128,128,0.5)',
                                    zeroline: true,
                                    zerolinewidth: 1,
                                    zerolinecolor: 'rgba(128,128,128,0.5)',
                                    gridcolor: 'rgba(128,128,128,0.2)'
                                },
                                font: {
                                    family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                                    color: 'rgba(128,128,128,0.9)'
                                },
                                legend: { orientation: 'h', y: 1.1, x: 0.5, xanchor: 'center' },
                                hovermode: 'closest',
                                showlegend: true,
                                paper_bgcolor: 'rgba(0,0,0,0)',
                                plot_bgcolor: 'rgba(0,0,0,0)'
                            }}
                            style={{ width: '100%', height: '100%' }}
                            config={{ responsive: true, displayModeBar: false }}
                        />
                    ) : (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            Loading Simulation...
                        </div>
                    )}
                </div>
            </div>

            <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
                    Simulation Explanation
                </h3>
                <div style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <p>
                        Each blue-green dot represents a unique randomly generated portfolio made up of differing weights of each asset (such as a share of Coca-Cola), with each asset represented by a purple diamond. As can be seen, taking a portfolio with a mixture of the assets improves the return to risk ratio compared to investing in only a single asset, the fundamental basis of modern portfolio theory.
                    </p>
                    <p>
                        Along the efficient frontier lies the best ‘bang for your buck’ portfolios for any given risk, with the best portfolio of all (determined by the greatest Sharpe ratio) highlighted with a <span style={{ color: 'gold', fontWeight: 'bold' }}>golden star</span>. However, not all investors will go for this point, as someone feeling extra confident may decide to opt for a portfolio further along the efficient frontier aiming for a greater expected return, but with the risk of greater volatility.
                    </p>
                    <p>
                        The risk free rate is the % return on a completely risk free asset such as a government bond. The Capital Market Line (CML) displays the risk and return of investing different proportions into a risk free asset, and your optimal golden star portfolio. Therefore, the CML begins at (0,y), where y is the risk free rate, where here one is investing into the risk free asset only. The CML return value then increases due to an increasing proportion of one’s investment being placed into the golden star portfolio. The CML then reaches the golden star, where the only investment is into the optimal portfolio. Past this point one borrows money at the risk free rate and invests it into the optimal portfolio, taking on extra risk.
                    </p>
                    <p>
                        A key point made here is that the minimum volatility portfolio often isn’t a smart investment option, as the CML clearly lies at a greater expected return than it, for the same risk.
                    </p>
                    <p>
                        You will also see that the efficient frontier ends at a particular asset, this is due to this asset having the greatest expected return, therefore it is mathematically impossible to increase this return by diversifying with lower return assets. On the contrary, the efficient frontier won’t begin at an asset, as it is instead the point of lowest volatility, obtained by a diverse mixture of stocks.
                    </p>
                </div>
            </div>
        </div>
    );
};

// Helper Components
const ControlGroup = ({ label, children }) => (
    <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
            {label}
        </label>
        {children}
    </div>
);

// Simplified MultiRange Slider for React (Custom implementation since HTML doesn't support dual-thumb range input natively)
const MultiRangeSlider = ({ min, max, values, onChange }) => {
    // A simplified UI: Two inputs. In a real app we'd use a library like rc-slider
    return (
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input
                type="number" min={min} max={values[1]}
                value={values[0]}
                onChange={(e) => onChange([Math.min(parseInt(e.target.value), values[1]), values[1]])}
                style={{ width: '60px', padding: '4px' }}
            />
            <span style={{ color: 'var(--color-text-tertiary)' }}>-</span>
            <input
                type="number" min={values[0]} max={max}
                value={values[1]}
                onChange={(e) => onChange([values[0], Math.max(parseInt(e.target.value), values[0])])}
                style={{ width: '60px', padding: '4px' }}
            />
        </div>
    );
};

export default ModernPortfolioSimulation;
