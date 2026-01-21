export const timelineEvents = [
  {
    id: "1900",
    year: "1900",
    title: "Speculation Theory",
    physicist: "Louis Bachelier",
    physicsConnection: "Brownian Motion",
    context: "Before Einstein explained Brownian motion physically, Bachelier used similar mathematics to model stock price movements.",
    math: "P(x, t) = \\frac{1}{\\sqrt{2\\pi \\sigma^2 t}} e^{-\\frac{x^2}{2\\sigma^2 t}}",
    impact: "Laid the foundation for stochastic processes in finance, decades before it was widely recognized.",
    image: "bachelier.jpg", 
    visualType: "brownian"
  },
  {
    id: "1952",
    year: "1952",
    title: "Modern Portfolio Theory",
    physicist: "Harry Markowitz",
    physicsConnection: "Statistical Variances & Covariances",
    context: "Investors needed a way to mathematically maximize returns for a given level of risk.",
    math: "\\sigma_p^2 = \\sum \\sum w_i w_j \\sigma_{ij}",
    impact: "Transformed portfolio management from qualitative stock picking to quantitative risk/return optimization.",
    image: "markowitz.jpg",
    visualType: "distribution"
  },
  {
    id: "1960",
    year: "1960s",
    title: "Fractal Markets",
    physicist: "Benoit Mandelbrot",
    physicsConnection: "Fractals & Power Laws",
    context: "Standard models assumed normal distributions (Bell curves), but markets showed 'fat tails' and extreme events.",
    math: "P(X > x) \\sim x^{-\\alpha}",
    impact: "Challenged the Efficient Market Hypothesis and introduced the idea of roughness in financial data.",
    image: "mandelbrot.jpg",
    visualType: "fractal"
  },
  {
    id: "1973",
    year: "1973",
    title: "Black-Scholes Model",
    physicist: "Fisher Black, Myron Scholes, Robert Merton",
    physicsConnection: "Heat Diffusion Equation",
    context: "There was no standard way to price options/derivatives accurately over time.",
    math: "\\frac{\\partial V}{\\partial t} + \\frac{1}{2}\\sigma^2 S^2 \\frac{\\partial^2 V}{\\partial S^2} + rS\\frac{\\partial V}{\\partial S} - rV = 0",
    impact: "Exploded the derivatives market, allowing for complex hedging and risk management.",
    image: "black-scholes.jpg",
    visualType: "heat-equation"
  },
  {
    id: "1990",
    year: "1990s",
    title: "Econophysics",
    physicist: "Eugene Stanley & others",
    physicsConnection: "Statistical Mechanics",
    context: "Physicists began applying concepts from phase transitions and critical phenomena to economic systems.",
    math: "H = -\\sum J_{ij} S_i S_j",
    impact: "Established a dedicated field for applying physical laws to social and economic dynamics.",
    image: "stanley.jpg",
    visualType: "network"
  },
  {
    id: "2000",
    year: "2000s+",
    title: "Computational Finance",
    physicist: "Various",
    physicsConnection: "Monte Carlo Simulations",
    context: "Complex derivatives became too hard to solve analytically, requiring massive computational power.",
    math: "E[f(X)] \\approx \\frac{1}{N} \\sum_{i=1}^N f(X_i)",
    impact: "Enabled high-frequency trading and pricing of exotic instruments.",
    image: "computer.jpg",
    visualType: "simulation"
  },
  {
    id: "now",
    year: "NOW",
    title: "What's Happening Now?",
    physicist: "Current Researchers",
    physicsConnection: "Quantum, Complexity, AI",
    context: "The frontier of physics and finance is merging with advanced computing and AI.",
    math: "|\\psi\\rangle = \\sum c_i |\\phi_i\\rangle",
    impact: "Exploring quantum algorithms for optimization and detecting systemic risk in complex networks.",
    image: "future.jpg",
    visualType: "interactive-list",
    subPaths: [
      { id: "quantum", title: "Quantum Computing", desc: "Portfolio optimization using quantum annealing." },
      { id: "network", title: "Network Physics", desc: "Modeling systemic risk and contagion in banking networks." },
      { id: "complexity", title: "Complex Systems", desc: "Understanding market crashes as phase transitions." },
      { id: "ai", title: "AI & Stat Mech", desc: "Using Boltzmann machines and thermodynamics in ML." }
    ]
  }
];
