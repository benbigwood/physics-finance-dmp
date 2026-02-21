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

## ⚡ Easy Start (Recommended for Examiners)

We have included automated scripts to handle dependency installation and startup for you.

### Windows
Double-click `run_easy_start_windows.bat` in the project folder.

### Mac / Linux
Open a terminal in the project folder and run:
```bash
sh run_easy_start_mac_linux.sh
```

## 🔧 Troubleshooting & Permissions

If you encounter issues running the project, please check the following:

### 1. "Script is not signed" / Permission Denied (Windows)
PowerShell often blocks scripts for security. Our `.bat` file should bypass this, but if you are trying to run commands manually in PowerShell and get an error:
1. Open PowerShell as Administrator.
2. Run this command to allow scripts for the current session:
   ```powershell
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
   ```

### 2. "EACCES" or File Permission Errors
This happens if `node_modules` was created by an Administrator but you are running as a standard user (or vice versa).
**Fix:**
1. Delete the `node_modules` folder and `package-lock.json` file.
2. Run `run_easy_start_windows.bat` (or `npm install`) again.
   - *Note: The Windows script has an auto-fix prompt for this!*

### 3. Node Version too old
This project requires Node.js 18+ (bundled with Vite).
- Check your version: `node -v`
- If you see an error or a version like `v12.x`, please install the latest "LTS" version from [nodejs.org](https://nodejs.org/).

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
