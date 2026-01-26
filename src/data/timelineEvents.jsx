import MathDisplay from '../components/MathDisplay';

export const timelineEvents = [
  {
    id: "1900",
    year: "1900",
    title: "Speculation Theory",
    physicist: "Louis Bachelier",
    physicsConnection: "Brownian Motion",
    image: "bachelier.jpg",
    visualType: "brownian",
    customContent: (
      <div>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
          The Forgotten Physicist of the Bourse
        </h2>

        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>
          Act I: The Illusion of Cause
        </h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Paris, 1900. The turn of the century. At the Paris Bourse (stock exchange), the prevailing wisdom was that the market was a deterministic machine. Traders believed that if you understood the "causes"—wars, harvest reports, political scandals—you could predict the "effects" (price changes). In this worldview, randomness was merely a symptom of ignorance; a "noisy" signal that skilled traders could filter out to find the trend.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Enter <strong>Louis Bachelier</strong>, a student of the legendary mathematician Henri Poincaré. While others were trying to predict why prices moved, Bachelier asked a radical question: <em>What if the movement itself is fundamentally random?</em>
        </p>

        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>
          Act II: The Drunken Walk
        </h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          In his doctoral thesis, <em>Théorie de la Spéculation</em> (1900), Bachelier proposed a shocking idea: the market is in a state of "Statistical Equilibrium". He argued that at any given moment, the market has already priced in all available information—the "news" traders were so obsessed with was already stale. Therefore, the expected gain for a speculator is exactly zero.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          To model this, Bachelier didn't use economics; he used the mathematics of heat and chaos. He modeled asset prices ($x_t$) as evolving randomly over time, governed by the equation:
        </p>
        <MathDisplay math="dx_t = \sigma dW_t" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Where $\sigma$ is volatility and $W_t$ represents a standard Wiener process.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          This was a historic moment in physics. Bachelier had mathematically described <strong>Brownian Motion</strong>—the random jittering of particles—five years before Albert Einstein would publish his famous 1905 paper on the subject.
        </p>

        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>
          Act III: The First Option Pricing Model
        </h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Bachelier didn't just describe the randomness; he solved it. He derived the probability density function for price changes, recognizing it as a Gaussian (Normal) distribution that spreads out over time like a diffusing gas cloud:
        </p>
        <MathDisplay math="p(x,t) = \frac{1}{\sqrt{2\pi\sigma^2 t}} \exp\left(-\frac{x^2}{2\sigma^2 t}\right)" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Using this, he derived the world's first Option Pricing Formula to value European call and put options. His formula expressed the price of a call ($C$) as a function of volatility and time:
        </p>
        <MathDisplay math="C = \sigma \sqrt{T} \phi(d) + (x_0 - k)\Phi(d)" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Where $\phi(d)$ is the standard normal density and $\Phi(d)$ is the cumulative distribution.
        </p>

        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>
          The Legacy: The "Arithmetic" Flaw
        </h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Despite his brilliance, Bachelier's work was largely disregarded for over 50 years. His model had a physical flaw: it assumed <em>Arithmetic Brownian Motion</em> rather than Geometric. This meant that in Bachelier's model, if stock prices diffused long enough, they could mathematically become negative.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          It wasn't until the 1950s that economists "rediscovered" his work. They fixed the flaw by switching to geometric logs (preventing negative prices), eventually leading to the Black-Scholes model you will cover next. But make no mistake: <strong>Louis Bachelier is the true founder of financial physics.</strong>
        </p>
      </div>
    )
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
    visualType: "fractal",
    customContent: (
      <div>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
          The Man Who Measured the Roughness
        </h2>

        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>
          Act I: The Cotton Ghost
        </h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          In the 1960s, <strong>Benoit Mandelbrot</strong>, a Polish-born French-American mathematician, was working as a Fellow at IBM. While his colleagues were focused on computing power, Mandelbrot was obsessed with "monsters"—mathematical shapes that were considered too irregular to be studied.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          He turned his attention to a century of data on cotton prices. According to the standard physics of the time (modeled by Bachelier and later Black-Scholes), price changes should follow a Gaussian (Bell) Curve. This model assumes that extreme events are astronomically rare.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          But when Mandelbrot fed the cotton data into the IBM computers, the "monsters" appeared. He found that price jumps were not smooth. The data showed violent spikes that the Bell Curve said shouldn't exist. If the standard model were true, a specific crash he observed should have happened only once every 7,000 years. In reality, these crashes were happening every 3 to 4 years.
        </p>

        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>
          Act II: The Fractal Lens
        </h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Mandelbrot realized that the "laws" of economics were ignoring the physical reality of roughness. He developed a new type of mathematics called <strong>Fractal Geometry</strong> to describe shapes that are "self-similar"—meaning they look the same from far away as they do up close.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Think of a cauliflower. If you break off a floret, it looks like a miniature version of the whole vegetable. If you break a piece off that floret, it looks like a tiny vegetable again. Mandelbrot saw this same pattern in the stock market.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          He looked at a chart of stock prices over a decade.<br />
          He looked at a chart over a day.<br />
          He looked at a chart over an hour.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          They were geometrically indistinguishable. The "jaggedness" or volatility didn't smooth out over time; it scaled. This meant that the market wasn't a "random walk" (like a drunk stumbling home); it was a <em>Lévy Flight</em>—a walk punctuated by sudden, massive leaps.
        </p>

        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>
          Act III: The Power Law
        </h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Mandelbrot presented a terrifying conclusion to the financial world. He argued that market returns do not follow a Normal Distribution, but rather a Power Law (specifically, a Pareto-Lévy distribution).
        </p>
        <MathDisplay math="P(X > x) \sim x^{-\alpha}" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          In a Gaussian world (Black-Scholes), risk is finite and manageable. In Mandelbrot’s world, the variance (risk) could be infinite. He identified a phenomenon called <strong>Volatility Clustering</strong>: large price changes are usually followed by more large changes, and calm periods by more calm periods. This mimics turbulent flow in fluids rather than simple heat diffusion.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Although Eugene Fama (the father of the Efficient Market Hypothesis) empirically confirmed Mandelbrot's findings, the financial industry largely ignored Mandelbrot for decades. His math was too messy; it didn't offer a clean, solvable equation like Black-Scholes did. It wasn't until the crashes of 1987 and 2008 that the world accepted what Mandelbrot had proven 40 years prior: the "tails" of the market are fat, and the monsters are real.
        </p>
      </div>
    )
  },
  {
    id: "1973",
    year: "1973",
    title: "Black-Scholes Model",
    physicist: "Ed Thorp, Fisher Black, Myron Scholes, Robert Merton",
    physicsConnection: "Heat Diffusion Equation",
    image: "black-scholes.png",
    visualType: "heat-equation",
    customContent: (
      <div>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
          From Blackjack to Black-Scholes
        </h2>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          In the late 1950s, <strong>Ed Thorp</strong>, a brilliant mathematics PhD student at UCLA, looked at the lights of Las Vegas and saw not a playground of chance, but a physics problem to be solved. While the common gambler relied on superstition, Thorp relied on the <em>Law of Large Numbers</em>.
        </p>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Thorp realized that Blackjack was a system with "memory." Unlike a roulette wheel, where every spin is independent, a deck of cards changes its probabilities as cards are removed. By mentally tracking the ratio of high cards to low cards, Thorp could identify specific moments when the probability distribution shifted in his favor. When the deck was "hot," he bet big; when it was "cold," he bet the minimum. He wasn't gambling; he was executing a calculation. This was the invention of <strong>card counting</strong>.
        </p>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Thorp published his findings in <em>Beat the Dealer</em>, causing a panic in the casino industry. They got wise, changed the rules, added multiple decks, and eventually banned him. Having "solved" gambling, Thorp took his winnings and turned his eyes toward the “world’s biggest casino: the stock market”.
        </p>

        <hr style={{ margin: '1.5rem 0', borderColor: 'var(--color-surface-hover)' }} />

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Thorp approached Wall Street with the same scientific rigor. He identified an anomaly in the pricing of warrants (a type of option). Options were notoriously difficult to value because they are derivative—their value depends on the movement of an underlying stock.
        </p>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Thorp devised a strategy called <strong>Delta Hedging</strong> to neutralize risk. The concept is elegant in its physics-like symmetry:
        </p>

        <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
          <li>You buy the stock (Long position).</li>
          <li>You sell (short) the equivalent option (Short position).</li>
        </ul>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          This creates a tug-of-war that cancels out market volatility:
        </p>

        <ol style={{ marginBottom: '1rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
          <li style={{ marginBottom: '0.5rem' }}>
            If the stock price rises (<i>dS &gt; 0</i>): You make profit on the shares you own. You lose money on the option you sold (because it is now more valuable to the buyer), but your share profit covers the loss.
          </li>
          <li>
            If the stock price falls (<i>dS &lt; 0</i>): You lose money on the shares. However, the option you sold drops in value (or expires worthless), allowing you to buy it back cheaper or keep the premium. This profit offsets the share loss.
          </li>
        </ol>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          By constantly adjusting the ratio of stocks to options (rebalancing), Thorp could isolate the small, theoretical profit margin regardless of whether the market went up or down. He kept his "black box" method a secret, generating steady returns for his investors at Princeton Newport Partners. This secret lasted until 1973.
        </p>

        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>
          The Revolution of 1973
        </h3>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          The true revolution arrived in 1973. Two academics, <strong>Fischer Black</strong> and <strong>Myron Scholes</strong>* made a profound physical analogy: they treated the stock price not as a random walk, but as a particle undergoing <em>Geometric Brownian Motion</em>—the same math used to describe pollen grains jittering in water or heat diffusing through a metal rod.
        </p>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          By applying <strong>Ito’s Lemma</strong> (the stochastic equivalent of the chain rule), they reduced the chaotic movement of the market into a partial differential equation. To the shock of the scientific community, the resulting <strong>Black-Scholes Equation</strong> was actually a variant of the <em>Heat Diffusion Equation</em> used in thermodynamics.
        </p>

        <div style={{ margin: '1.5rem 0', padding: '1rem', background: 'var(--color-bg)', borderRadius: '8px', overflowX: 'auto' }}>
          {/* Math display using simple text or maybe integrate a Math component if imported, but safely just text with some styling for now */}
          <div style={{ fontFamily: 'Times New Roman, serif', fontSize: '1.2rem', textAlign: 'center' }}>
            <p>The solution allows traders to input observable parameters to output the explicit "fair price" of an option.</p>
          </div>
        </div>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          It was the quickest adoption of a theoretical model in the history of economics. Within two years, Texas Instruments calculators came pre-programmed with the Black-Scholes formula and all traders used or at least knew of the Black-Scholes equation. Traders abandoned gut feeling for physics-based precision. This equation didn't just describe the market; it built the modern multi-trillion dollar derivatives industry, proving that the same laws governing heat transfer could also govern the flow of capital.
        </p>

        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', fontStyle: 'italic', marginTop: '2rem' }}>
          * Robert Merton independently also solved this problem at the same time (but using applied stochastic calculus instead).
        </p>
      </div>
    )
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
