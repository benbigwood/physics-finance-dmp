import React, { useState, useMemo } from 'react';
import Plot from 'react-plotly.js';

const BlochSphereSimulation = () => {
    const [theta, setTheta] = useState(Math.PI / 4);
    const [phi, setPhi] = useState(Math.PI / 4);
    const [cameraRevision, setCameraRevision] = useState(0);

    const measureState = () => {
        const p0 = Math.pow(Math.cos(theta / 2), 2);
        const collapsedTheta = Math.random() < p0 ? 0 : Math.PI;
        setTheta(collapsedTheta);
        // At the poles (|0> or |1>), phi is unobservable, so practically it collapses to 0.
        setPhi(0);
    };

    const randomiseState = () => {
        // Uniform sampling on sphere:
        // theta from acos(1 - 2*u1), phi from 2*pi*u2
        const u1 = Math.random();
        const u2 = Math.random();
        setTheta(Math.acos(1 - 2 * u1));
        setPhi(2 * Math.PI * u2);
    };

    const data = useMemo(() => {
        const traces = [];

        // 1. Wireframe & Great Circles
        const u = [];
        const v = [];
        const n_u = 30;
        const n_v = 15;
        for (let i = 0; i < n_u; i++) u.push((i / (n_u - 1)) * 2 * Math.PI);
        for (let i = 0; i < n_v; i++) v.push((i / (n_v - 1)) * Math.PI);

        const x_surf = v.map(t => u.map(p => Math.sin(t) * Math.cos(p)));
        const y_surf = v.map(t => u.map(p => Math.sin(t) * Math.sin(p)));
        const z_surf = v.map(t => u.map(p => Math.cos(t)));

        traces.push({
            type: 'surface',
            x: x_surf, y: y_surf, z: z_surf,
            opacity: 0.05,
            colorscale: [[0, 'rgb(150,150,150)'], [1, 'rgb(150,150,150)']],
            showscale: false,
            hoverinfo: 'none',
            contours: {
                x: { show: true, color: 'rgba(100,100,100,0.2)', width: 1, highlight: false },
                y: { show: true, color: 'rgba(100,100,100,0.2)', width: 1, highlight: false },
                z: { show: false }
            }
        });

        // Equator
        const circle_res = 60;
        const t_circle = Array.from({ length: circle_res + 1 }, (_, i) => (i / circle_res) * 2 * Math.PI);
        traces.push({
            type: 'scatter3d', mode: 'lines',
            x: t_circle.map(t => Math.cos(t)),
            y: t_circle.map(t => Math.sin(t)),
            z: t_circle.map(() => 0),
            line: { color: 'black', width: 2 },
            showlegend: false, hoverinfo: 'none'
        });

        // 2. Axes
        const axis_len = 1.1;
        traces.push({
            type: 'scatter3d', mode: 'lines',
            x: [-axis_len, axis_len, null, 0, 0, null, 0, 0],
            y: [0, 0, null, -axis_len, axis_len, null, 0, 0],
            z: [0, 0, null, 0, 0, null, -axis_len, axis_len],
            line: { color: 'rgba(0,0,0,0.6)', width: 2 },
            showlegend: false, hoverinfo: 'none'
        });

        traces.push({
            type: 'scatter3d', mode: 'text',
            x: [axis_len + 0.1, 0, 0],
            y: [0, axis_len + 0.1, 0],
            z: [0, 0, axis_len + 0.2],
            text: ['x', 'y', '|0⟩'],
            textfont: { size: 14, color: 'black', family: 'serif', weight: 'bold' },
            showlegend: false, hoverinfo: 'none'
        });

        traces.push({
            type: 'scatter3d', mode: 'text',
            x: [0], y: [0], z: [-axis_len - 0.2],
            text: ['|1⟩'],
            textfont: { size: 14, color: 'black', family: 'serif', weight: 'bold' },
            showlegend: false, hoverinfo: 'none'
        });

        // State Vector (|psi>)
        const vx = Math.sin(theta) * Math.cos(phi);
        const vy = Math.sin(theta) * Math.sin(phi);
        const vz = Math.cos(theta);

        traces.push({
            type: 'scatter3d', mode: 'lines+markers',
            x: [0, vx], y: [0, vy], z: [0, vz],
            line: { color: '#ef4444', width: 6 },
            marker: { size: 4, color: '#ef4444' }, // Red
            showlegend: false, hoverinfo: 'none'
        });

        traces.push({
            type: 'scatter3d', mode: 'text',
            x: [vx * 1.15], y: [vy * 1.15], z: [vz * 1.15],
            text: ['|ψ⟩'],
            textfont: { size: 16, color: '#ef4444', family: 'serif', weight: 'bold' },
            showlegend: false, hoverinfo: 'none'
        });

        // Projections
        traces.push({
            type: 'scatter3d', mode: 'lines',
            x: [vx, vx, null, 0, vx], y: [vy, vy, null, 0, vy], z: [vz, 0, null, 0, 0],
            line: { color: 'rgba(100,100,100,0.6)', width: 2, dash: 'dash' },
            showlegend: false, hoverinfo: 'none'
        });

        // Angle Arcs
        if (phi > 0.05) {
            const phi_steps = 20;
            const phi_arc_x = [];
            const phi_arc_y = [];
            for (let i = 0; i <= phi_steps; i++) {
                const p = (i / phi_steps) * phi;
                phi_arc_x.push(0.3 * Math.cos(p));
                phi_arc_y.push(0.3 * Math.sin(p));
            }
            traces.push({
                type: 'scatter3d', mode: 'lines',
                x: phi_arc_x, y: phi_arc_y, z: phi_arc_x.map(() => 0),
                line: { color: '#22c55e', width: 4 }, // Green
                showlegend: false, hoverinfo: 'none'
            });
            traces.push({
                type: 'scatter3d', mode: 'text',
                x: [0.35 * Math.cos(phi / 2)], y: [0.35 * Math.sin(phi / 2)], z: [0],
                text: ['φ'],
                textfont: { color: '#22c55e', size: 14, family: 'serif' },
                showlegend: false, hoverinfo: 'none'
            });
        }

        if (theta > 0.05) {
            const theta_steps = 20;
            const theta_arc_x = [];
            const theta_arc_y = [];
            const theta_arc_z = [];
            for (let i = 0; i <= theta_steps; i++) {
                const t = (i / theta_steps) * theta;
                theta_arc_x.push(0.3 * Math.sin(t) * Math.cos(phi));
                theta_arc_y.push(0.3 * Math.sin(t) * Math.sin(phi));
                theta_arc_z.push(0.3 * Math.cos(t));
            }
            traces.push({
                type: 'scatter3d', mode: 'lines',
                x: theta_arc_x, y: theta_arc_y, z: theta_arc_z,
                line: { color: '#3b82f6', width: 4 }, // Blue
                showlegend: false, hoverinfo: 'none'
            });
            traces.push({
                type: 'scatter3d', mode: 'text',
                x: [1.2 * theta_arc_x[10]], y: [1.2 * theta_arc_y[10]], z: [1.2 * theta_arc_z[10]],
                text: ['θ'],
                textfont: { color: '#3b82f6', size: 14, family: 'serif' },
                showlegend: false, hoverinfo: 'none'
            });
        }

        return traces;
    }, [theta, phi]);

    const layout = useMemo(() => {
        return {
            width: 400,
            height: 400,
            margin: { l: 0, r: 0, b: 0, t: 0 },
            showlegend: false,
            uirevision: cameraRevision,
            scene: {
                xaxis: { showgrid: false, zeroline: false, showticklabels: false, title: '', range: [-1.2, 1.2], visible: false },
                yaxis: { showgrid: false, zeroline: false, showticklabels: false, title: '', range: [-1.2, 1.2], visible: false },
                zaxis: { showgrid: false, zeroline: false, showticklabels: false, title: '', range: [-1.2, 1.2], visible: false },
                aspectmode: 'cube',
                camera: {
                    eye: { x: 1.25, y: 1.25, z: 0.4 }
                },
                dragmode: 'turntable' // Restrict rotation to z axis only
            },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
        };
    }, [cameraRevision]);

    // Calculate probabilities
    const p0 = Math.pow(Math.cos(theta / 2), 2);
    const p1 = Math.pow(Math.sin(theta / 2), 2);
    const a = Math.cos(theta / 2);
    const b = Math.sin(theta / 2);

    const formatPhase = (phi) => {
        if (phi < 0.05) return "";
        const phiPhase = (phi / Math.PI).toFixed(2);
        return `e^{${phiPhase} i π}`;
    };

    return (
        <div style={{
            width: '100%',
            padding: '1.5rem',
            background: 'var(--color-surface)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: 'var(--shadow-md)'
        }}>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--color-text-primary)', fontSize: '1.4rem' }}>Interactive Bloch Sphere</h3>

            <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                |ψ⟩ = {a.toFixed(2)}|0⟩ + ({b.toFixed(2)}{formatPhase(phi)})|1⟩
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-tertiary)', marginBottom: '1rem' }}>
                P(|0⟩) = {p0.toFixed(2)} &nbsp;&nbsp;&nbsp; P(|1⟩) = {p1.toFixed(2)}
            </p>

            <div style={{ margin: '-2rem 0 -1.5rem 0' }}>
                <Plot
                    data={data}
                    layout={layout}
                    config={{
                        displayModeBar: false,
                        scrollZoom: false,  // Disable zooming in/out
                        doubleClick: false  // Disable double click zoom
                    }}
                    style={{ cursor: 'grab' }}
                />
            </div>

            <div style={{ width: '100%', maxWidth: '400px', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Theta Control */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ minWidth: '20px', fontWeight: 'bold', color: '#3b82f6', fontSize: '1.1rem' }}>θ</span>
                    <input
                        type="range"
                        min="0" max={Math.PI} step="0.01"
                        value={theta}
                        onChange={(e) => setTheta(parseFloat(e.target.value))}
                        style={{ flex: 1, accentColor: '#3b82f6' }}
                    />
                    <span style={{ minWidth: '45px', textAlign: 'right', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                        {(theta * 180 / Math.PI).toFixed(1)}°
                    </span>
                </div>

                {/* Phi Control */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ minWidth: '20px', fontWeight: 'bold', color: '#22c55e', fontSize: '1.1rem' }}>φ</span>
                    <input
                        type="range"
                        min="0" max={2 * Math.PI} step="0.01"
                        value={phi}
                        onChange={(e) => setPhi(parseFloat(e.target.value))}
                        style={{ flex: 1, accentColor: '#22c55e' }}
                    />
                    <span style={{ minWidth: '45px', textAlign: 'right', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                        {(phi * 180 / Math.PI).toFixed(1)}°
                    </span>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                    <button
                        onClick={randomiseState}
                        style={{
                            padding: '0.6rem 1.2rem',
                            background: 'var(--color-finance)',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            color: '#fff',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 10px rgba(var(--color-finance-rgb, 14, 165, 233), 0.2)'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                        Randomise
                    </button>
                    <button
                        onClick={measureState}
                        style={{
                            padding: '0.6rem 1.2rem',
                            background: 'var(--color-accent)',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            color: '#fff',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 10px rgba(99, 102, 241, 0.3)'
                        }}
                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                        Measure State
                    </button>
                    <button
                        onClick={() => setCameraRevision(prev => prev + 1)}
                        style={{
                            padding: '0.6rem 1.2rem',
                            background: 'transparent',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-md)',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            color: 'var(--color-text-secondary)',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.background = 'var(--color-surface-hover)'}
                        onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    >
                        Reset View
                    </button>
                </div>
            </div>

            <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--color-text-tertiary)', textAlign: 'center' }}>
                Drag to rotate (locked to Z-axis). Zoom is disabled. Click "Measure State" to collapse the wavefunction according to the probabilities.
            </p>
        </div>
    );
};

export default BlochSphereSimulation;
