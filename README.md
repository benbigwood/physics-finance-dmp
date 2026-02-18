# Physics in Finance: Diffusion - Heat Equation to Bachelier

This project is a GitHub-ready interactive web simulation exploring the deep mathematical connection between physics and finance, specifically how the Heat Equation (Brownian Motion) provides the foundation for Asset Pricing (Bachelier Model).

## ✨ Features

- **Side-by-Side Simulation**: Synchronized panels showing Heat Diffusion in a rod vs. Price Uncertainty in financial markets.
- **Metal Rod Visual**: Dynamic temperature gradient animation reflecting the physics state.
- **Interactive Controls**: Real-time adjustment of Volatility (σ), Drift (μ), and Time (t).
- **Mathematical Insights**: Live updates of governing Equations (SDE/PDE) and Statistical Summaries.
- **Monte Carlo Paths**: Optional overlay of arithmetic Brownian motion paths.
- **Physics-Finance Mapping**: Detailed correspondence between physical and financial parameters.

## 🚀 Tech Stack

- **React + Vite**: Fast, modern frontend development.
- **Vanilla CSS**: Premium dark neon aesthetic matching the project's design language.
- **KaTeX**: High-performance LaTeX math rendering.
- **Custom Canvas API**: Smooth 60fps physics animations and data visualization.

## 🛠️ Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build Core Project**:
   ```bash
   npm run build
   ```

## 📦 GitHub Pages Deployment

To deploy this project to GitHub Pages:

1. Ensure `vite.config.js` has the correct `base` path (e.g., `base: '/physics-finance-dmp/'`).
2. Run the build command:
   ```bash
   npm run build
   ```
3. Use the `gh-pages` package to deploy the `dist` folder:
   ```bash
   npx gh-pages -d dist
   ```

Alternatively, set up a GitHub Action to deploy on push to the `main` branch.

## 🧪 The Physics-Finance Analogy

The same equation that describes how heat spreads through a metal rod also describes how uncertainty about a future asset price spreads through a market.

| Physics Concept | Financial Equivalence |
| :--- | :--- |
| Particle Position $x(t)$ | Asset Price $S_t$ |
| Diffusion Rate $D$ | Variance Rate $\sigma^2/2$ |
| Heat Concentration $u(x,t)$ | Probability Density $p(S,t)$ |
| Molecular Collisions | Order Flow / Market Shocks |

---
*Created as part of the Physics in Finance Digital Media Project.*
