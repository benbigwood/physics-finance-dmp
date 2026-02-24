import React, { useState, useMemo, useEffect, useRef } from 'react';
import Plot from 'react-plotly.js';

const HadamardGateSimulation = () => {
    // Initial states:
    // |psi> (blue) starts at |0> (theta=0, phi=0)
    // |phi> (orange) starts at |1> (theta=pi, phi=0)
    const [theta1, setTheta1] = useState(0);
    const [phi1, setPhi1] = useState(0);
    const [theta2, setTheta2] = useState(Math.PI);
    const [phi2, setPhi2] = useState(0);

    const [cameraRevision, setCameraRevision] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Animation refs to hold current state during animation loop
    const animState = useRef({
        startT1: 0, startP1: 0, targetT1: 0, targetP1: 0,
        startT2: 0, startP2: 0, targetT2: 0, targetP2: 0,
        startTime: 0
    });
    const requestRef = useRef();

    // Helper: Get target state for Hadamard gate
    const getHadamardTarget = (t, p) => {
        // Normalise angles
        const normT = t % (2 * Math.PI);
        const normP = p % (2 * Math.PI);

        // |0> -> |+> (theta: 0 -> pi/2, phi: 0 -> 0)
        if (Math.abs(normT) < 0.1) return { t: Math.PI / 2, p: 0 };
        // |1> -> |-> (theta: pi -> pi/2, phi: 0 -> pi)
        if (Math.abs(normT - Math.PI) < 0.1) return { t: Math.PI / 2, p: Math.PI };
        // |+> -> |0> (theta: pi/2 -> 0, phi: 0 -> 0)
        if (Math.abs(normT - Math.PI / 2) < 0.1 && Math.abs(normP) < 0.1) return { t: 0, p: 0 };
        // |-> -> |1> (theta: pi/2 -> pi, phi: pi -> 0)
        if (Math.abs(normT - Math.PI / 2) < 0.1 && Math.abs(normP - Math.PI) < 0.1) return { t: Math.PI, p: 0 };

        // Default to current if not a basis state (shouldn't happen in this controlled sim)
        return { t, p };
    };

    const startAnimation = () => {
        if (isAnimating) return;

        const target1 = getHadamardTarget(theta1, phi1);
        const target2 = getHadamardTarget(theta2, phi2);

        animState.current = {
            startT1: theta1, startP1: phi1, targetT1: target1.t, targetP1: target1.p,
            startT2: theta2, startP2: phi2, targetT2: target2.t, targetP2: target2.p,
            startTime: performance.now()
        };

        setIsAnimating(true);
        requestRef.current = requestAnimationFrame(animate);
    };

    const animate = (time) => {
        const duration = 1000; // 1 second animation
        const elapsed = time - animState.current.startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (easeInOutCubic)
        const ease = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        const { startT1, startP1, targetT1, targetP1, startT2, startP2, targetT2, targetP2 } = animState.current;

        setTheta1(startT1 + (targetT1 - startT1) * ease);
        setPhi1(startP1 + (targetP1 - startP1) * ease);
        setTheta2(startT2 + (targetT2 - startT2) * ease);
        setPhi2(startP2 + (targetP2 - startP2) * ease);

        if (progress < 1) {
            requestRef.current = requestAnimationFrame(animate);
        } else {
            setIsAnimating(false);
            // Snap to exact values
            setTheta1(targetT1); setPhi1(targetP1);
            setTheta2(targetT2); setPhi2(targetP2);
        }
    };

    // Cleanup animation on unmount
    useEffect(() => {
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    const data = useMemo(() => {
        const traces = [];

        // --- 1. Sphere Surface (Mesh) ---
        const u = []; const v = [];
        const n_u = 30; const n_v = 15;
        for (let i = 0; i < n_u; i++) u.push((i / (n_u - 1)) * 2 * Math.PI);
        for (let i = 0; i < n_v; i++) v.push((i / (n_v - 1)) * Math.PI);
        const x_surf = v.map(t => u.map(p => Math.sin(t) * Math.cos(p)));
        const y_surf = v.map(t => u.map(p => Math.sin(t) * Math.sin(p)));
        const z_surf = v.map(t => u.map(p => Math.cos(t)));

        traces.push({
            type: 'surface',
            x: x_surf, y: y_surf, z: z_surf,
            opacity: 0.1, colorscale: [[0, 'rgb(200,200,200)'], [1, 'rgb(200,200,200)']],
            showscale: false, hoverinfo: 'none',
            contours: {
                x: { show: true, color: 'rgba(100,100,100,0.2)', width: 1, highlight: false },
                y: { show: true, color: 'rgba(100,100,100,0.2)', width: 1, highlight: false },
                z: { show: false }
            }
        });

        // --- 2. Equator ---
        const circle_res = 100;
        const t_circle = Array.from({ length: circle_res + 1 }, (_, i) => (i / circle_res) * 2 * Math.PI);
        traces.push({
            type: 'scatter3d', mode: 'lines',
            x: t_circle.map(t => Math.cos(t)), y: t_circle.map(t => Math.sin(t)), z: t_circle.map(() => 0),
            line: { color: 'rgba(50,50,50,0.4)', width: 3 }, showlegend: false, hoverinfo: 'none'
        });

        // --- 3. Axes ---
        const axis_len = 1.3; // Extended axes per python script
        const axes = [
            { x: [0, 0], y: [0, 0], z: [-axis_len, axis_len] },
            { x: [-axis_len, axis_len], y: [0, 0], z: [0, 0] },
            { x: [0, 0], y: [-axis_len, axis_len], z: [0, 0] }
        ];
        axes.forEach(axis => {
            traces.push({
                type: 'scatter3d', mode: 'lines', ...axis,
                line: { color: 'black', width: 2 }, showlegend: false, hoverinfo: 'none'
            });
        });

        // Labels
        traces.push({
            type: 'scatter3d', mode: 'text',
            x: [0, axis_len + 0.1, 0, 0, 0],
            y: [0, 0, axis_len + 0.1, 0, 0],
            z: [axis_len + 0.1, 0, 0, 1.1, -1.1],
            text: ['z', 'x', 'y', '|0⟩', '|1⟩'],
            textfont: { size: 14, color: 'black', family: 'serif' },
            showlegend: false, hoverinfo: 'none'
        });

        // --- 4. State Vectors ---
        const drawVector = (t, p, color, label) => {
            const vx = Math.sin(t) * Math.cos(p);
            const vy = Math.sin(t) * Math.sin(p);
            const vz = Math.cos(t);

            // Vector line
            traces.push({
                type: 'scatter3d', mode: 'lines+markers',
                x: [0, vx], y: [0, vy], z: [0, vz],
                line: { color: color, width: 7 }, marker: { size: 5, color: color },
                showlegend: false, hoverinfo: 'text',
                hovertext: `${label}: θ=${(t * 180 / Math.PI).toFixed(0)}°, φ=${(p * 180 / Math.PI).toFixed(0)}°`
            });
            // Label
            traces.push({
                type: 'scatter3d', mode: 'text',
                x: [vx * 1.15], y: [vy * 1.15], z: [vz * 1.15],
                text: [label], textfont: { size: 18, color: color, family: 'serif', weight: 'bold' },
                showlegend: false, hoverinfo: 'none'
            });
            // Projections
            traces.push({
                type: 'scatter3d', mode: 'lines',
                x: [vx, vx], y: [vy, vy], z: [vz, 0],
                line: { color: 'rgba(0,0,0,0.4)', width: 2, dash: 'dash' }, showlegend: false, hoverinfo: 'none'
            });
            traces.push({
                type: 'scatter3d', mode: 'lines',
                x: [0, vx], y: [0, vy], z: [0, 0],
                line: { color: 'rgba(0,0,0,0.4)', width: 2, dash: 'dash' }, showlegend: false, hoverinfo: 'none'
            });
        };

        drawVector(theta1, phi1, '#3b82f6', '|ψ⟩'); // Blue
        drawVector(theta2, phi2, '#f97316', '|φ⟩'); // Orange

        return traces;
    }, [theta1, phi1, theta2, phi2]);

    const layout = useMemo(() => {
        return {
            width: 400, height: 400,
            margin: { l: 0, r: 0, b: 0, t: 0 },
            showlegend: false,
            uirevision: cameraRevision, // Changing this prop forces a camera reset
            scene: {
                xaxis: { showgrid: false, zeroline: false, showticklabels: false, title: '', range: [-1.1, 1.1], visible: false },
                yaxis: { showgrid: false, zeroline: false, showticklabels: false, title: '', range: [-1.1, 1.1], visible: false },
                zaxis: { showgrid: false, zeroline: false, showticklabels: false, title: '', range: [-1.1, 1.1], visible: false },
                aspectmode: 'cube',
                // Explicitly define the initial camera. When uirevision changes, it reverts to this.
                camera: {
                    eye: { x: 1.25, y: 1.25, z: 0.5 },
                    up: { x: 0, y: 0, z: 1 },
                    center: { x: 0, y: 0, z: 0 }
                },
                dragmode: 'orbit'
            },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
        };
    }, [cameraRevision]);

    return (
        <div style={{
            width: '100%', padding: '0.25rem',
            background: 'var(--color-surface)', borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}>
            <h3 style={{ marginBottom: '0.25rem', color: 'var(--color-text-primary)', fontSize: '1rem' }}>Hadamard Gate on |0⟩ and |1⟩</h3>

            <Plot
                data={data}
                layout={layout}
                config={{ displayModeBar: false, scrollZoom: true }}
                // Plotly specifically needs to be told not to update the layout if uirevision is constant
                revision={cameraRevision}
            />

            <div style={{ width: '100%', maxWidth: '300px', marginTop: '0.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                    <button
                        onClick={startAnimation}
                        disabled={isAnimating}
                        style={{
                            padding: '0.3rem 0.8rem',
                            background: isAnimating ? 'var(--color-surface-hover)' : 'var(--color-accent)',
                            color: isAnimating ? 'var(--color-text-tertiary)' : 'white',
                            border: 'none', borderRadius: '4px',
                            cursor: isAnimating ? 'default' : 'pointer',
                            fontSize: '0.8rem', fontWeight: 'bold'
                        }}
                    >
                        {isAnimating ? 'Running...' : 'Apply Hadamard'}
                    </button>

                    <button
                        onClick={() => setCameraRevision(prev => prev + 1)}
                        style={{
                            padding: '0.3rem 0.8rem',
                            background: 'var(--color-surface-hover)',
                            border: '1px solid var(--color-border)', borderRadius: '4px',
                            cursor: 'pointer', fontSize: '0.8rem', color: 'var(--color-text-secondary)'
                        }}
                    >
                        Reset View
                    </button>
                </div>
            </div>

            <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--color-text-tertiary)', textAlign: 'center' }}>
                Applying Hadamard transforms |0⟩ to |+⟩ and |1⟩ to |-⟩.
            </p>
        </div>
    );
};

export default HadamardGateSimulation;
