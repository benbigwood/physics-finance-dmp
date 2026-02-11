
import streamlit as st
import plotly.graph_objects as go
import numpy as np
import scipy.stats as stats

def plot_paths(t, S, N, mu, sigma, S0, show_ensemble=True, primary_idx=0):
    """
    Plots simulated paths using Plotly.
    Highlight primary_idx path.
    Overlay mean and sigma bands.
    """
    fig = go.Figure()
    
    # Plot ensemble (limit to manageable number if N is large for performance)
    ensemble_limit = min(N, 100) # Only plot 100 max for clarity unless user wants more
    if show_ensemble:
        for i in range(ensemble_limit):
            opacity = 0.1 if i != primary_idx else 1.0
            width = 1 if i != primary_idx else 3
            color = 'rgba(255, 255, 255, 0.1)' if i != primary_idx else '#1EA7FF'
            
            p_S = S[i, :]
            
            trace = go.Scatter(
                x=t, 
                y=p_S, 
                mode='lines',
                line=dict(width=width, color=color),
                showlegend=False,
                hoverinfo='skip' if i != primary_idx else 'all'
            )
            fig.add_trace(trace)
    
    # Primary Path Highlight
    primary_S = S[primary_idx, :]
    fig.add_trace(go.Scatter(
        x=t, 
        y=primary_S, 
        mode='lines',
        name='Primary Path',
        line=dict(color='#1EA7FF', width=3)
    ))

    # Theoretical Mean Line E[S_t] = S0 + mu*t
    # Only if sigma > 0 to show bands clearly
    mean_S = S0 + mu * t
    std_t = sigma * np.sqrt(t)
    
    fig.add_trace(go.Scatter(
        x=t, 
        y=mean_S, 
        mode='lines',
        name='Expected Value E[St]',
        line=dict(color='orange', width=2, dash='dash')
    ))
    
    # Sigma Bands (+/- 1 sigma, +/- 2 sigma)
    # 1 Sigma
    fig.add_trace(go.Scatter(
        x=np.concatenate([t, t[::-1]]),
        y=np.concatenate([mean_S + std_t, (mean_S - std_t)[::-1]]),
        fill='toself',
        fillcolor='rgba(255, 165, 0, 0.1)',
        line=dict(color='rgba(255,165,0,0)'),
        showlegend=True,
        name='±1σ Range'
    ))
    
    # 2 Sigma
    fig.add_trace(go.Scatter(
         x=np.concatenate([t, t[::-1]]),
         y=np.concatenate([mean_S + 2*std_t, (mean_S - 2*std_t)[::-1]]),
         fill='toself',
         fillcolor='rgba(255, 165, 0, 0.05)',
         line=dict(color='rgba(255,165,0,0)'),
         showlegend=True,
         name='±2σ Range'
    ))

    fig.update_layout(
        title="Path View: Arithmetic Brownian Motion",
        xaxis_title="Time (t)",
        yaxis_title="Price (St)",
        margin=dict(l=20, r=20, t=40, b=20),
        template="plotly_dark",
        paper_bgcolor='rgba(0,0,0,0)',
        plot_bgcolor='rgba(0,0,0,0)',
        legend=dict(yanchor="top", y=0.99, xanchor="left", x=0.01)
    )
    
    return fig

def plot_distribution(S_T, T, S0, mu, sigma):
    """
    Plots histogram of S_T simulation results vs theoretical PDF.
    """
    fig = go.Figure()
    
    # Empirical Histogram
    fig.add_trace(go.Histogram(
        x=S_T,
        histnorm='probability density',
        name='Empirical Distribution',
        marker_color='rgba(30, 167, 255, 0.6)',
        marker_line_color='#1EA7FF',
        marker_line_width=1
    ))
    
    # Theoretical PDF
    x_min, x_max = min(S_T), max(S_T)
    x_range = np.linspace(x_min, x_max, 500)
    
    # Theoretical params
    theo_mean = S0 + mu * T
    theo_std = sigma * np.sqrt(T)
    
    pdf_values = stats.norm.pdf(x_range, loc=theo_mean, scale=theo_std)
    
    fig.add_trace(go.Scatter(
        x=x_range,
        y=pdf_values,
        mode='lines',
        name='Theoretical PDF',
        line=dict(color='orange', width=3)
    ))
    
    if mu == 0 and S0 == 0:
         fig.update_layout(title=f"Distribution at T={T} (Bachelier Baseline)")
    else:
         fig.update_layout(title=f"Distribution at T={T} (Drift µ={mu})")

    fig.update_layout(
        xaxis_title="Price at Maturity (ST)",
        yaxis_title="Density",
        margin=dict(l=20, r=20, t=40, b=20),
        template="plotly_dark",
        paper_bgcolor='rgba(0,0,0,0)',
        plot_bgcolor='rgba(0,0,0,0)'
    )
    return fig

def render_physics_finance_mapping():
    st.markdown("""
    ### Physics ↔ Finance Mapping
    | Domain | Concept | Equivalent |
    | :--- | :--- | :--- |
    | **Particle Position** | $x(t)$ | **Asset Price** $S_t$ |
    | **Collisions** | Random kicks | **Order Flow / Shocks** |
    | **Molecular Speed** | Thermal velocity $v_{th}$ | **Volatility** $\sigma$ |
    | **Diffusion** | $\langle x^2 \\rangle \sim Dt$ | **Variance** $\text{Var}(S_t) = \sigma^2 t$ |
    """)

def render_equations(drift_on=False):
    st.markdown("### Model Equations")
    
    st.latex(r"dS_t = \mu dt + \sigma dW_t")
    
    if drift_on:
        st.write("With Drift $\mu \neq 0$")
        st.latex(r"S_t \sim \mathcal{N}(S_0 + \mu t, \sigma^2 t)")
    else:
        st.write("Bachelier (No Drift) $\mu = 0$")
        st.latex(r"S_t \sim \mathcal{N}(S_0, \sigma^2 t)")
        
    st.markdown("#### Heat Equation (PDE)")
    st.latex(r"\frac{\partial p}{\partial t} = \frac{\sigma^2}{2} \frac{\partial^2 p}{\partial x^2}")
    
    st.markdown("#### Solution (Gaussian Kernel)")
    st.latex(r"p(x,t) = \frac{1}{\sqrt{2\pi\sigma^2 t}} e^{-\frac{(x-S_0)^2}{2\sigma^2 t}}")

def render_collision_explanation():
    st.info("Imagine standard Brownian Motion: A large particle is bombarded by smaller fluid molecules. In finance, the 'price' is bombarded by buy/sell orders.")
