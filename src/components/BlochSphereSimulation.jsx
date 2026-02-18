import React, { useState, useMemo } from 'react';
import Plot from 'react-plotly.js';

const BlochSphereSimulation = () => {
    // Initial state matching the Python script:
    // theta ~ 51 degrees (pi/3.5), phi = 45 degrees (pi/4)
    const [theta, setTheta] = useState(Math.PI / 3.5);
    const [phi, setPhi] = useState(Math.PI / 4);
    const [cameraRevision, setCameraRevision] = useState(0);

    const data = useMemo(() => {
        const traces = [];

        // --- 1. Sphere Surface (Mesh) ---
        // Create a faint transparent sphere to give depth
        const u = []; // phi [0, 2pi]
        const v = []; // theta [0, pi]
        const n_u = 30;
        const n_v = 15;

        for (let i = 0; i < n_u; i++) u.push((i / (n_u - 1)) * 2 * Math.PI);
        for (let i = 0; i < n_v; i++) v.push((i / (n_v - 1)) * Math.PI);

        // We need 2D arrays for Surface/Mesh3d, but Surface is easiest for a continuous sphere
        // Let's use Surface with constant radius 1
        const x_surf = v.map(t => u.map(p => Math.sin(t) * Math.cos(p)));
        const y_surf = v.map(t => u.map(p => Math.sin(t) * Math.sin(p)));
        const z_surf = v.map(t => u.map(p => Math.cos(t)));

        traces.push({
            type: 'surface',
            x: x_surf,
            y: y_surf,
            z: z_surf,
            opacity: 0.1, // Very faint
            colorscale: [[0, 'rgb(200,200,200)'], [1, 'rgb(200,200,200)']],
            showscale: false,
            hoverinfo: 'none',
            contours: {
                x: { show: true, color: 'rgba(100,100,100,0.2)', width: 1, highlight: false },
                y: { show: true, color: 'rgba(100,100,100,0.2)', width: 1, highlight: false },
                z: { show: false }
            }
        });

        // --- 2. Equator & Main Meridians ---
        const circle_res = 100;
        const t_circle = Array.from({ length: circle_res + 1 }, (_, i) => (i / circle_res) * 2 * Math.PI);

        // Equator
        traces.push({
            type: 'scatter3d', mode: 'lines',
            x: t_circle.map(t => Math.cos(t)),
            y: t_circle.map(t => Math.sin(t)),
            z: t_circle.map(() => 0),
            line: { color: 'rgba(50,50,50,0.4)', width: 3 },
            showlegend: false, hoverinfo: 'none'
        });

        // --- 3. Axes ---
        const axis_len = 1.2;
        // Z-axis
        traces.push({
            type: 'scatter3d', mode: 'lines',
            x: [0, 0], y: [0, 0], z: [-axis_len, axis_len],
            line: { color: 'black', width: 3 },
            showlegend: false, hoverinfo: 'none'
        });
        // X-axis
        traces.push({
            type: 'scatter3d', mode: 'lines',
            x: [-axis_len, axis_len], y: [0, 0], z: [0, 0],
            line: { color: 'black', width: 2 },
            showlegend: false, hoverinfo: 'none'
        });
        // Y-axis
        traces.push({
            type: 'scatter3d', mode: 'lines',
            x: [0, 0], y: [-axis_len, axis_len], z: [0, 0],
            line: { color: 'black', width: 2 },
            showlegend: false, hoverinfo: 'none'
        });

        // Axes Labels
        traces.push({
            type: 'scatter3d', mode: 'text',
            x: [0, axis_len + 0.1, 0],
            y: [0, 0, axis_len + 0.1],
            z: [axis_len + 0.1, 0, 0],
            text: ['z', 'x', 'y'],
            textfont: { size: 14, color: 'black', family: 'serif' }, // Serif looks more "math-like"
            showlegend: false, hoverinfo: 'none'
        });

        // Basis States Labels |0> and |1>
        traces.push({
            type: 'scatter3d', mode: 'text',
            x: [0, 0], y: [0, 0], z: [1.1, -1.1],
            text: ['|0⟩', '|1⟩'],
            textfont: { size: 16, color: 'black', family: 'serif', weight: 'bold' },
            textposition: ['top center', 'bottom center'],
            showlegend: false, hoverinfo: 'none'
        });

        // --- 4. State Vector (|psi>) ---
        // Cartesian coords
        const vx = Math.sin(theta) * Math.cos(phi);
        const vy = Math.sin(theta) * Math.sin(phi);
        const vz = Math.cos(theta);

        traces.push({
            type: 'scatter3d', mode: 'lines+markers',
            x: [0, vx], y: [0, vy], z: [0, vz],
            line: { color: '#3b82f6', width: 7 }, // Thicker, nicer blue
            marker: { size: 5, color: '#3b82f6' },
            showlegend: false, hoverinfo: 'text',
            hovertext: `|ψ⟩: θ=${(theta * 180 / Math.PI).toFixed(0)}°, φ=${(phi * 180 / Math.PI).toFixed(0)}°`
        });

        // Label for |psi>
        traces.push({
            type: 'scatter3d', mode: 'text',
            x: [vx * 1.15], y: [vy * 1.15], z: [vz * 1.15],
            text: ['|ψ⟩'],
            textfont: { size: 18, color: '#3b82f6', family: 'serif', weight: 'bold' },
            showlegend: false, hoverinfo: 'none'
        });


        // --- 5. Projections (Dashed Lines) ---
        // Vertical drop to XY plane
        traces.push({
            type: 'scatter3d', mode: 'lines',
            x: [vx, vx], y: [vy, vy], z: [vz, 0],
            line: { color: 'rgba(100,100,100,0.6)', width: 2, dash: 'dash' },
            showlegend: false, hoverinfo: 'none'
        });
        // Line from origin to shadow
        traces.push({
            type: 'scatter3d', mode: 'lines',
            x: [0, vx], y: [0, vy], z: [0, 0],
            line: { color: 'rgba(100,100,100,0.6)', width: 2, dash: 'dash' },
            showlegend: false, hoverinfo: 'none'
        });

        // --- 6. Angle Arcs ---
        // Theta Arc (from Z axis)
        const r_theta = 0.4;
        const theta_steps = 20;
        const theta_arc_x = [];
        const theta_arc_y = [];
        const theta_arc_z = [];

        for (let i = 0; i <= theta_steps; i++) {
            const t = (i / theta_steps) * theta;
            theta_arc_x.push(r_theta * Math.sin(t) * Math.cos(phi));
            theta_arc_y.push(r_theta * Math.sin(t) * Math.sin(phi));
            theta_arc_z.push(r_theta * Math.cos(t));
        }
        traces.push({
            type: 'scatter3d', mode: 'lines',
            x: theta_arc_x, y: theta_arc_y, z: theta_arc_z,
            line: { color: '#ef4444', width: 4 }, // Red
            showlegend: false, hoverinfo: 'none'
        });
        // Theta Label
        traces.push({
            type: 'scatter3d', mode: 'text',
            x: [theta_arc_x[Math.floor(theta_steps / 2)] * 1.3],
            y: [theta_arc_y[Math.floor(theta_steps / 2)] * 1.3],
            z: [theta_arc_z[Math.floor(theta_steps / 2)]],
            text: ['θ'],
            textfont: { color: '#ef4444', size: 14, family: 'serif' },
            showlegend: false, hoverinfo: 'none'
        });

        // Phi Arc (in XY plane from X axis)
        const r_phi = 0.35;
        const phi_steps = 20;
        const phi_arc_x = [];
        const phi_arc_y = [];
        const phi_arc_z = [];

        for (let i = 0; i <= phi_steps; i++) {
            const p = (i / phi_steps) * phi;
            phi_arc_x.push(r_phi * Math.cos(p));
            phi_arc_y.push(r_phi * Math.sin(p));
            phi_arc_z.push(0);
        }
        traces.push({
            type: 'scatter3d', mode: 'lines',
            x: phi_arc_x, y: phi_arc_y, z: phi_arc_z,
            line: { color: '#22c55e', width: 4 }, // Green
            showlegend: false, hoverinfo: 'none'
        });
        // Phi Label
        traces.push({
            type: 'scatter3d', mode: 'text',
            x: [phi_arc_x[Math.floor(phi_steps / 2)] * 1.4],
            y: [phi_arc_y[Math.floor(phi_steps / 2)] * 1.4],
            z: [0],
            text: ['φ'],
            textfont: { color: '#22c55e', size: 14, family: 'serif' },
            showlegend: false, hoverinfo: 'none'
        });

        return traces;
    }, [theta, phi]);

    const layout = useMemo(() => {
        return {
            width: 400,
            height: 400,
            margin: { l: 0, r: 0, b: 0, t: 0 },
            showlegend: false,
            uirevision: cameraRevision, // Persist camera state unless revision changes
            scene: {
                xaxis: { showgrid: false, zeroline: false, showticklabels: false, title: '', range: [-1.1, 1.1], visible: false },
                yaxis: { showgrid: false, zeroline: false, showticklabels: false, title: '', range: [-1.1, 1.1], visible: false },
                zaxis: { showgrid: false, zeroline: false, showticklabels: false, title: '', range: [-1.1, 1.1], visible: false },
                aspectmode: 'cube',
                camera: {
                    eye: { x: 1.25, y: 1.25, z: 0.5 } // Closer view to make sphere bigger
                },
                dragmode: 'orbit' // Orbit mode is better for spheres
            },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
        };
    }, [cameraRevision]);

    return (
        <div style={{
            width: '100%',
            padding: '0.25rem', // Minimal padding
            background: 'var(--color-surface)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <h3 style={{ marginBottom: '0.25rem', color: 'var(--color-text-primary)', fontSize: '1rem' }}>Bloch Sphere</h3>

            <Plot
                data={data}
                layout={layout}
                config={{ displayModeBar: false, scrollZoom: true }}
            />

            <div style={{ width: '100%', maxWidth: '300px', marginTop: '0.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {/* Theta Control */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ minWidth: '20px', fontWeight: 'bold', color: 'red', fontSize: '0.85rem' }}>θ</span>
                    <input
                        type="range"
                        min="0" max={Math.PI} step="0.01"
                        value={theta}
                        onChange={(e) => setTheta(parseFloat(e.target.value))}
                        style={{ flex: 1 }}
                    />
                    <span style={{ minWidth: '35px', textAlign: 'right', fontSize: '0.75rem' }}>
                        {(theta * 180 / Math.PI).toFixed(0)}°
                    </span>
                </div>

                {/* Phi Control */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ minWidth: '20px', fontWeight: 'bold', color: 'green', fontSize: '0.85rem' }}>φ</span>
                    <input
                        type="range"
                        min="0" max={2 * Math.PI} step="0.01"
                        value={phi}
                        onChange={(e) => setPhi(parseFloat(e.target.value))}
                        style={{ flex: 1 }}
                    />
                    <span style={{ minWidth: '35px', textAlign: 'right', fontSize: '0.75rem' }}>
                        {(phi * 180 / Math.PI).toFixed(0)}°
                    </span>
                </div>

                <button
                    onClick={() => setCameraRevision(prev => prev + 1)}
                    style={{
                        padding: '0.25rem 0.6rem',
                        background: 'var(--color-surface-hover)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        color: 'var(--color-text-secondary)',
                        alignSelf: 'center',
                        marginTop: '0.2rem'
                    }}
                >
                    Reset View
                </button>
            </div>

            <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--color-text-tertiary)', textAlign: 'center' }}>
                Drag to rotate. Adjust sliders to change state |ψ⟩.
            </p>
        </div>
    );
};

export default BlochSphereSimulation;
