
import streamlit as st
import numpy as np
import pandas as pd
import time
from models.bachelier import simulate_paths, theoretical_stats
from ui.components import plot_paths, plot_distribution, render_physics_finance_mapping, render_equations, render_collision_explanation

# Page Config
st.set_page_config(
    page_title="Bachelier Diffusion Simulator",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Custom CSS for theme
st.markdown("""
<style>
    .reportview-container {
        background: #0E1117;
    }
    h1, h2, h3 {
        color: #FFA500 !important; /* Orange Headings */
    }
    .stButton>button {
        color: #1EA7FF;
        border-color: #1EA7FF;
    }
</style>
""", unsafe_allow_html=True)

st.title("Bachelier Diffusion Simulator")
st.markdown("Visualizing financial markets as a particle diffusion process driven by microscopic randomness.")

# --- Initialization of State ---
defaults = {
    'S0': 100.0,
    'sigma': 20.0,
    'mu': 0.0,
    'T': 1.0,
    'dt': 0.01,
    'N': 100,
    'seed': 42,
    'drift_mode': False,
    'show_ensemble': True,
    'view_mode': "Path View"
}

for key, val in defaults.items():
    if key not in st.session_state:
        st.session_state[key] = val

# --- Logic: Run Simulation using current State ---
# Access state directly
S0 = st.session_state.S0
mu = st.session_state.mu if st.session_state.drift_mode else 0.0
sigma = st.session_state.sigma
T = st.session_state.T
dt = st.session_state.dt
N = st.session_state.N
seed = st.session_state.seed
drift_mode = st.session_state.drift_mode
show_ensemble = st.session_state.show_ensemble

t_arr, S = simulate_paths(S0, mu, sigma, T, dt, N, seed)

# Calculate Stats
S_T = S[:, -1]
empirical_mean = np.mean(S_T)
empirical_var = np.var(S_T)
theo_mean, theo_var = theoretical_stats(T, S0, mu, sigma)

# --- Main Layout (3 Columns) ---
col_left, col_center, col_right = st.columns([1, 2, 1])

# --- Left Column: Physics/Finance Mapping ---
with col_left:
    st.subheader("Physics ↔ Finance")
    render_physics_finance_mapping()
    
    st.markdown("---")
    st.subheader("Particle Collision")
    render_collision_explanation()
    
    if st.button("Animate Particle"):
        collision_placeholder = st.empty()
        x_pos = 0
        import plotly.graph_objects as go
        for _ in range(30):
            x_pos += np.random.normal(0, 1)
            fig_part = go.Figure(go.Scatter(
                x=[x_pos], y=[0], mode='markers',
                marker=dict(size=20, color='#1EA7FF')
            ))
            fig_part.update_layout(
                xaxis=dict(range=[-20, 20], showgrid=False, zeroline=True, showticklabels=False),
                yaxis=dict(range=[-1, 1], showgrid=False, visible=False),
                margin=dict(l=0, r=0, t=0, b=0),
                height=150,
                paper_bgcolor='rgba(0,0,0,0)',
                plot_bgcolor='rgba(0,0,0,0)'
            )
            collision_placeholder.plotly_chart(fig_part, use_container_width=True)
            time.sleep(0.05)


# --- Center Column: Charts ---
with col_center:
    # We use radio button here, mapped to state
    st.radio("View Mode", ["Path View", "Distribution View"], horizontal=True, key='view_mode')
    
    if st.session_state.view_mode == "Path View":
        fig_paths = plot_paths(t_arr, S, N, mu, sigma, S0, show_ensemble)
        st.plotly_chart(fig_paths, use_container_width=True)
    else:
        fig_dist = plot_distribution(S_T, T, S0, mu, sigma)
        st.plotly_chart(fig_dist, use_container_width=True)

# --- Right Column: Statistics & Equations ---
with col_right:
    st.subheader("Statistical Summaries")
    
    st.markdown(f"""
    <div style="background-color: #1E1E1E; padding: 15px; border-radius: 10px; border-left: 5px solid #1EA7FF;">
        <p style="margin:0; font-weight:bold; color:orange;">Theoretical</p>
        <p>Mean: {theo_mean:.4f}</p>
        <p>Variance: {theo_var:.4f}</p>
        <hr style="margin: 10px 0; border-color: #333;">
        <p style="margin:0; font-weight:bold; color:#1EA7FF;">Empirical (N={N})</p>
        <p>Mean: {empirical_mean:.4f} <small>({(empirical_mean-theo_mean)/theo_mean*100 if theo_mean!=0 else 0:.2f}%)</small></p>
        <p>Variance: {empirical_var:.4f} <small>({(empirical_var-theo_var)/theo_var*100 if theo_var!=0 else 0:.2f}%)</small></p>
    </div>
    """, unsafe_allow_html=True)
    
    st.markdown("---")
    render_equations(drift_on=drift_mode)


# --- Bottom Row: Controls ---
st.markdown("---")
st.subheader("Simulation Controls")

c1, c2, c3, c4 = st.columns(4)

with c1:
    st.checkbox("Enable Drift (µ)", key='drift_mode')
    st.slider("Drift µ", -50.0, 50.0, key='mu', disabled=not st.session_state.drift_mode)

with c2:
    st.slider("Volatility σ", 1.0, 100.0, key='sigma')
    st.slider("Time Horizon T", 0.1, 5.0, key='T')

with c3:
    st.slider("Time Step dt", 0.001, 0.1, step=0.001, key='dt')
    st.number_input("Number of Paths N", 10, 10000, key='N')

with c4:
    st.number_input("Random Seed", 0, 9999, key='seed')
    st.checkbox("Show Ensemble Paths", key='show_ensemble')
    
    # Download Button (needs to be generated from current S)
    csv = pd.DataFrame(S.T, index=t_arr).to_csv()
    st.download_button(
        label="Download CSV",
        data=csv,
        file_name='bachelier_paths.csv',
        mime='text/csv',
    )
    
    if st.button("Restart"):
        # We don't really need to do anything as button press reruns script
        pass
