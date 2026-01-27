import { useState, useEffect } from 'react';

const BlackScholesSimulation = () => {
    // State for inputs
    const [S, setS] = useState(100);    // Stock Price
    const [K, setK] = useState(100);    // Strike Price
    const [T, setT] = useState(1);      // Time to Maturity (years)
    const [r, setR] = useState(0.05);   // Risk-free Rate (5%)
    const [sigma, setSigma] = useState(0.20); // Volatility (20%)

    // State for outputs
    const [callPrice, setCallPrice] = useState(0);
    const [putPrice, setPutPrice] = useState(0);

    // Standard Normal Cumulative Distribution Function
    const normalCDF = (x) => {
        var t = 1 / (1 + .2316419 * Math.abs(x));
        var d = .3989423 * Math.exp(-x * x / 2);
        var prob = d * t * (.3193815 + t * (-.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
        if (x > 0) prob = 1 - prob;
        return prob;
    };

    const calculateBS = () => {
        const d1 = (Math.log(S / K) + (r + sigma * sigma / 2) * T) / (sigma * Math.sqrt(T));
        const d2 = d1 - sigma * Math.sqrt(T);

        const call = S * normalCDF(d1) - K * Math.exp(-r * T) * normalCDF(d2);
        const put = K * Math.exp(-r * T) * normalCDF(-d2) - S * normalCDF(-d1);

        setCallPrice(call);
        setPutPrice(put);
    };

    useEffect(() => {
        calculateBS();
    }, [S, K, T, r, sigma]);

    const inputStyle = {
        background: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid var(--color-surface-hover)',
        color: 'var(--color-text-primary)',
        padding: '0.5rem',
        borderRadius: '4px',
        width: '100%',
        marginTop: '0.25rem'
    };

    const labelStyle = {
        display: 'block',
        color: 'var(--color-text-secondary)',
        fontSize: '0.9rem',
        marginBottom: '0.5rem'
    };

    return (
        <div style={{ marginTop: '1rem' }}>
            <h3 style={{ color: 'var(--color-highlight)', marginBottom: '1rem', textAlign: 'center' }}>
                Black-Scholes Calculator
            </h3>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '1.5rem',
                background: 'var(--color-bg)',
                padding: '1rem',
                borderRadius: '8px'
            }}>
                <div>
                    <label style={labelStyle}>Stock Price (S)</label>
                    <input
                        type="number"
                        value={S}
                        onChange={(e) => setS(parseFloat(e.target.value))}
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label style={labelStyle}>Strike Price (K)</label>
                    <input
                        type="number"
                        value={K}
                        onChange={(e) => setK(parseFloat(e.target.value))}
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label style={labelStyle}>Time to Maturity (T - Years)</label>
                    <input
                        type="number"
                        step="0.1"
                        value={T}
                        onChange={(e) => setT(parseFloat(e.target.value))}
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label style={labelStyle}>Risk-free Rate (r)</label>
                    <input
                        type="number"
                        step="0.01"
                        value={r}
                        onChange={(e) => setR(parseFloat(e.target.value))}
                        style={inputStyle}
                    />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                    <label style={labelStyle}>Volatility (σ)</label>
                    <input
                        type="number"
                        step="0.01"
                        value={sigma}
                        onChange={(e) => setSigma(parseFloat(e.target.value))}
                        style={inputStyle}
                    />
                </div>
            </div>

            <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center'
            }}>
                <div style={{
                    background: 'rgba(56, 189, 248, 0.1)',
                    border: '1px solid var(--color-accent)',
                    padding: '1rem',
                    borderRadius: '8px',
                    textAlign: 'center',
                    flex: 1
                }}>
                    <h4 style={{ color: 'var(--color-accent)', marginBottom: '0.5rem' }}>Call Option</h4>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                        ${callPrice.toFixed(2)}
                    </span>
                </div>
                <div style={{
                    background: 'rgba(255, 99, 71, 0.1)',
                    border: '1px solid tomato', // Using a distinct color for puts
                    padding: '1rem',
                    borderRadius: '8px',
                    textAlign: 'center',
                    flex: 1
                }}>
                    <h4 style={{ color: 'tomato', marginBottom: '0.5rem' }}>Put Option</h4>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                        ${putPrice.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default BlackScholesSimulation;
