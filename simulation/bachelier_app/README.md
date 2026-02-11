
# Bachelier Diffusion Simulator

A complete interactive web app illustrating Louis Bachelier's speculation theory, visualizing financial markets as a diffusion process.

## Theory Overview

Louis Bachelier (1900) modeled stock prices as a random walk, pre-dating Einstein's work on Brownian Motion. In this model:
- Price changes are independent and identically distributed.
- The distribution of prices spreads out over time like heat diffusing through a rod.
- Volatility $\sigma$ acts as the diffusion coefficient.

### Equations

**SDE (Stochastic Differential Equation):**
$$dS_t = \mu dt + \sigma dW_t$$

**PDE (Heat Equation):**
The probability density $p(x,t)$ satisfies:
$$\frac{\partial p}{\partial t} = \frac{\sigma^2}{2} \frac{\partial^2 p}{\partial x^2}$$

**Solution:**
$$p(x,t) = \frac{1}{\sqrt{2\pi\sigma^2 t}} e^{-\frac{(x-S_0 - \mu t)^2}{2\sigma^2 t}}$$

## Application Structure

- `app.py`: Main Streamlit application.
- `models/bachelier.py`: Core simulation logic using NumPy.
- `ui/components.py`: Plotly charting and UI rendering components.
- `tests/test_bachelier.py`: Unit tests for validating statistical properties.

## How to Run

1. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the App:**
   ```bash
   streamlit run app.py
   ```

3. **View in Browser:**
   Open `http://localhost:8501`.

## Integration with React Website

This application is designed to be embedded or linked within the main specific React website.
A "Simulation 2" tab has been added to the Bachelier section which expects this app to be running on port 8501.
