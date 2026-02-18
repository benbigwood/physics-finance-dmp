export const quizData = [
    {
        id: 1,
        question: "What physical concept did Louis Bachelier use to model stock price movements in 1900?",
        options: ["Quantum Mechanics", "Brownian Motion", "General Relativity", "Fluid Dynamics"],
        correctAnswer: 1,
        explanation: "Bachelier applied the mathematics of Brownian motion (random movement of particles) to finance 5 years before Einstein's famous paper on the subject."
    },
    {
        id: 2,
        question: "Which physicist's work on the 'Heat Equation' is mathematically identical to the Black-Scholes equation?",
        options: ["Isaac Newton", "Joseph Fourier", "Marie Curie", "Enrico Fermi"],
        correctAnswer: 1,
        explanation: "The Black-Scholes equation can be transformed into the Heat Equation, which describes how heat diffuses through a material over time."
    },
    {
        id: 3,
        question: "What does 'Volatility' represent in financial physics models?",
        options: ["The speed of light", "The temperature or 'energy' of the market", "The mass of a stock", "The gravity of a crash"],
        correctAnswer: 1,
        explanation: "In diffusion models, volatility acts like temperature in a gas or thermal diffusivity in a solid, determining how fast the price distribution spreads out."
    },
    {
        id: 4,
        question: "Benoit Mandelbrot challenged the 'Normal Distribution' (Bell Curve) model by introducing what concept?",
        options: ["Fractals and 'Fat Tails'", "String Theory", "Dark Matter", "Perfect Efficiency"],
        correctAnswer: 0,
        explanation: "Mandelbrot showed that markets exhibit 'roughness' and extreme events (crashes) happen far more often than a normal Bell Curve predicts, a concept linked to Fractals."
    },
    {
        id: 5,
        question: "In Modern Portfolio Theory, what does the 'Efficient Frontier' represent?",
        options: ["The limit of high-frequency trading speed", "The optimal set of portfolios offering the highest return for a defined level of risk", "The boundary between profit and loss", "The edge of the chaotic market"],
        correctAnswer: 1,
        explanation: "Harry Markowitz defined the Efficient Frontier as the set of optimal portfolios that offer the highest expected return for a given level of risk."
    },
    {
        id: 6,
        question: "What gambling game did Ed Thorp 'solve' before turning his attention to Wall Street?",
        options: ["Poker", "Roulette", "Blackjack", "Craps"],
        correctAnswer: 2,
        explanation: "Ed Thorp used the Law of Large Numbers to develop card counting in Blackjack, proving it wasn't just a game of chance but a physics problem with memory."
    },
    {
        id: 7,
        question: "The 'Random Walk' theory suggests that:",
        options: ["Stock prices are predictable if you look hard enough", "Future price changes are random and cannot be predicted from past prices", "Prices always go up in the long run", "Market trends are driven by sunspots"],
        correctAnswer: 1,
        explanation: "The Random Walk Hypothesis, rooted in Bachelier's work, posits that stock price changes have the same distribution and are independent of each other."
    },
    {
        id: 8,
        question: "Which Greek letter represents the sensitivity of an option's price to changes in the underlying asset's price?",
        options: ["Alpha", "Beta", "Delta", "Gamma"],
        correctAnswer: 2,
        explanation: "Delta measures how much an option's price is expected to move for every $1 change in the underlying stock. It is crucial for 'Delta Hedging'."
    },
    {
        id: 9,
        question: "What is the primary difference between Bachelier's model and the Black-Scholes model regarding price potential?",
        options: ["Bachelier allows negative prices; Black-Scholes does not.", "Black-Scholes is for bonds; Bachelier is for stocks.", "Bachelier uses fractal math.", "There is no difference."],
        correctAnswer: 0,
        explanation: "Bachelier used an arithmetic Brownian motion which allows prices to drift below zero. Black-Scholes uses Geometric Brownian motion, keeping prices positive (limited liability)."
    },
    {
        id: 10,
        question: "In the context of the Physics in Finance timeline, who is considered the 'father' of financial mathematics?",
        options: ["Albert Einstein", "Louis Bachelier", "Paul Samuelson", "Isaac Newton"],
        correctAnswer: 1,
        explanation: "Louis Bachelier's 1900 thesis 'Théorie de la Spéculation' is widely considered the founding document of modern mathematical finance."
    }
];
