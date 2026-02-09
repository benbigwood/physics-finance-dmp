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
          John Bachelier, Financial Physics notes:
        </h2>

        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>
          Act I: The Illusion of cause.
        </h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Before the 20th Century, prices were generally thought to move because of identifiable, explainable causes (news, harvest, wars ect).
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          It was widely thought that skilled traders could analyse trends/cycles and make a profit in the financial markets.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          The notion of randomness was just considered to be an acute lack of information with price fluctuations generally thought to be noisy however deterministic if a trader was provided with all the information associated with the stock.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Inherent randomness was yet to be conceptualised and hence no rigorous mathematical framework was in place for financial markets of the time.
        </p>

        <h4 style={{ fontSize: '1.2rem', color: 'var(--color-highlight)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
          The role of Louis Bachelier.
        </h4>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Enter Louis Bachelier. Studying mathematics under Henri Poincare, Bachelier published his PHD thesis ‘ Theorie de la Speculation’ which was highly unconventional for the time.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Rather than addressing a classical problem in pure mathematics, he examined the mathematical structure of financial markets, specifically price fluctuations on the Paris Bourse.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          It should be said Louis Bachelier&apos;s contributions to option pricing and financial mathematics were disregarded at the time and not rediscovered until 50 years later.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Meanwhile Bachelier drew many conceptual parallels from the world of physics to finance intentionally.
        </p>

        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>
          Act II:
        </h3>
        <h4 style={{ fontSize: '1.2rem', color: 'var(--color-highlight)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
          The drunken walk:
        </h4>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Bachelier suggested the financial markets evolve randomly over time – an efficient market is one at statistical equilibrium (probabilistically, no one should be able to predict an efficient market).
        </p>
        <MathDisplay math="S_t = S_0 + \sigma W_t" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Similarly:
        </p>
        <MathDisplay math="dS_t = \sigma W_t" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          <MathDisplay math="S_t" inline={true} /> : price of asset at time <MathDisplay math="t" inline={true} />
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          <MathDisplay math="S_0" inline={true} /> : price of asset at <MathDisplay math="t = 0" inline={true} />
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          <MathDisplay math="\sigma" inline={true} /> : volatility parameter ( Scale of price fluctuations)
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          <MathDisplay math="W_t" inline={true} /> : the Wiener process
        </p>

        <h4 style={{ fontSize: '1.2rem', color: 'var(--color-highlight)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
          Key Mathematical Properties
        </h4>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Exact distribution at every time:
        </p>
        <MathDisplay math="W_t \sim \mathcal{N}(0,t)" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Variance grows linearly in time:
        </p>
        <MathDisplay math="\mathbb{E}[W_t^2] = t" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Square-root scaling law:
        </p>
        <MathDisplay math="W_{ct} \stackrel{d}{=} \sqrt{c} W_t" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Diffusion spreads proportionally to <MathDisplay math="\sqrt{t}" inline={true} />.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          In a symmetric random walk, the position at the next step equals the current position plus a random increment that is equally likely to be positive or negative.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          The expected position therefore, remains constant,
        </p>
        <MathDisplay math="\mathbb{E} [ X_n ]= X_0" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          while the variance grows linearly with the number of steps,
        </p>
        <MathDisplay math="\text{Var}( X_n )= n (\Delta x )^2" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Thus the process does not drift on average, but the uncertainty spreads over time, with the typical displacement increasing proportionally to root (n).
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          This linear growth of variance is the fundamental mechanism underlying diffusion in physics and volatility growth in Bachelier’s financial model.
        </p>

        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>
          Act III: First Options pricing model:
        </h3>
        <h4 style={{ fontSize: '1.2rem', color: 'var(--color-highlight)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
          Bachelier and the Heat Equation
        </h4>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          In 1900, Louis Bachelier applied the mathematical structure of Fourier’s heat equation to financial markets.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Fourier had shown that the distribution of heat in a solid evolves according to the diffusion equation,
        </p>
        <MathDisplay math="\partial_t u = \kappa \partial_{xx} u" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          which describes how temperature spreads smoothly over time. Bachelier recognised that the probability distribution of prices evolves in the same way.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          In his model, the density of possible future prices satisfies
        </p>
        <MathDisplay math="\partial_t p  = \frac{\sigma ^2}{2} \partial_{xx} p" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          the same diffusion (heat) equation, with volatility playing the role of thermal diffusivity.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Just as heat spreads out from a hot spot, probability spreads out from the current price.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          The centre remains unchanged on average, but uncertainty increases.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          When applied to option pricing, the equation appears in backward form:
        </p>
        <MathDisplay math="\partial_t V  + \frac{\sigma ^2}{2} \partial_{S} V  = 0" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          After a change of variables, this becomes the standard heat equation.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          The option price evolves exactly like temperature diffusing through space.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          A payoff function at maturity is “smoothed” over time by Gaussian diffusion.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Inherently we can therefor take away that:
        </p>
        <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
          <li>Market dynamics are diffusive: Information disperses like heat.</li>
          <li>Volatility is a diffusion constant: It controls how fast uncertainty spreads</li>
        </ul>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Naturally, the solution to the PDE is found to be:
        </p>
        <MathDisplay math="p(x,t \mid x_0, 0) = \frac{1}{\sqrt{2\pi\sigma^2t}} \exp \left( - \frac{(x-x_0)^2}{2\sigma^2t} \right)" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          The fundamental solution of the heat equation is the Gaussian distribution.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          In Bachelier’s model, this means that conditional on today’s price, future prices are normally distributed with variance <MathDisplay math="\sigma^2( T - t )" inline={true} />.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          The mean remains at the current price (in the zero-drift case), and volatility acts as the diffusion constant determining how quickly the distribution widens over time.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          This result was revolutionary because it provided an explicit probabilistic law for price movements and made option pricing analytically solvable.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          By identifying the market’s uncertainty with the Gaussian solution of the heat equation, Bachelier showed that financial fluctuations obey a precise diffusion structure — transforming speculation into a problem of mathematical analysis and establishing the first continuous-time pricing framework.
        </p>
      </div>
    ),
    derivationContent: (
      <div>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
          Derivations section:
        </h2>

        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>
          1. Discrete random walk and diffusive scaling
        </h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Let <MathDisplay math="\Delta t > 0" inline={true} /> and <MathDisplay math="\Delta x > 0" inline={true} />. Define a discrete-time process <MathDisplay math="\{X_n\}_{n\ge0}" inline={true} /> by
        </p>
        <MathDisplay math="X_{n+1} = X_n + \xi_{n+1}, \quad X_0 = x_0," />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          where <MathDisplay math="\{\xi_n\}" inline={true} /> are i.i.d. with
        </p>
        <MathDisplay math="\mathbb{P}(\xi_n = +\Delta x) = \mathbb{P}(\xi_n = -\Delta x) = \frac{1}{2}." />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          (Interpretation: <MathDisplay math="X_n" inline={true} /> is particle position or “price displacement”; <MathDisplay math="\xi_n" inline={true} /> is collision impulse or price tick.)
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Let <MathDisplay math="t = n\Delta t" inline={true} /> and write <MathDisplay math="X(t) := X_n" inline={true} />.
        </p>

        <h4 style={{ fontSize: '1.2rem', color: 'var(--color-highlight)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
          Lemma 1 (first two moments).
        </h4>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          For <MathDisplay math="n \ge 0" inline={true} />,
        </p>
        <MathDisplay math="\mathbb{E}[X_n] = x_0, \quad \text{Var}(X_n) = n(\Delta x)^2." />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Proof. Since <MathDisplay math="\mathbb{E}[\xi_n] = 0" inline={true} />, <MathDisplay math="\mathbb{E}[X_n] = x_0 + \sum_{k=1}^n \mathbb{E}[\xi_k] = x_0" inline={true} />. Also <MathDisplay math="\text{Var}(\xi_n) = (\Delta x)^2" inline={true} /> and independence gives <MathDisplay math="\text{Var}(X_n) = \sum_{k=1}^n \text{Var}(\xi_k) = n(\Delta x)^2" inline={true} />. <MathDisplay math="\square" inline={true} />
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Define the diffusive scaling parameter
        </p>
        <MathDisplay math="\sigma^2 := \frac{(\Delta x)^2}{\Delta t}," />
        <MathDisplay math="\text{Var}(X(t)) = \sigma^2 t." />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          (Physics notation often uses <MathDisplay math="2D" inline={true} /> in place of <MathDisplay math="\sigma^2" inline={true} />, i.e. <MathDisplay math="\sigma^2 = 2D" inline={true} />.)
        </p>

        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>
          2. Continuum limit: diffusion (heat) equation for the transition density
        </h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Let <MathDisplay math="p(x, t)" inline={true} /> denote the probability density (or, in discrete form, mass function) for <MathDisplay math="X(t)" inline={true} />.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          For one step of the walk,
        </p>
        <MathDisplay math="p(x, t + \Delta t) = \frac{1}{2} p(x - \Delta x, t) + \frac{1}{2} p(x + \Delta x, t). \quad (2.1)" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Assume <MathDisplay math="p" inline={true} /> is smooth enough for Taylor expansion. Expand (2.1) about <MathDisplay math="(x, t)" inline={true} />:
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Left-hand side:
        </p>
        <MathDisplay math="p(x, t + \Delta t) = p(x, t) + \Delta t \, \partial_t p(x, t) + O(\Delta t^2). \quad (2.2)" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Right-hand side:
        </p>
        <MathDisplay math="p(x \pm \Delta x, t) = p(x, t) \pm \Delta x \, \partial_x p(x, t) + \frac{\Delta x^2}{2} \partial_{xx} p(x, t) + O(\Delta x^3). \quad (2.3)" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Averaging the <MathDisplay math="\pm" inline={true} /> expansions cancels the odd term:
        </p>
        <MathDisplay math="\frac{1}{2} (p(x - \Delta x, t) + p(x + \Delta x, t)) = p(x, t) + \frac{\Delta x^2}{2} \partial_{xx} p(x, t) + O(\Delta x^4). \quad (2.4)" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Substituting (2.2) and (2.4) into (2.1), cancelling <MathDisplay math="p(x, t)" inline={true} />, dividing by <MathDisplay math="\Delta t" inline={true} />, and taking the scaling limit <MathDisplay math="\Delta x^2 / \Delta t \to \sigma^2" inline={true} /> yields:
        </p>

        <h4 style={{ fontSize: '1.2rem', color: 'var(--color-highlight)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
          Proposition 2 (diffusion/heat equation).
        </h4>
        <MathDisplay math="\partial_t p(x, t) = \frac{\sigma^2}{2} \partial_{xx} p(x, t). \quad (2.5)" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          (Physics: heat/diffusion equation for a particle ensemble. Finance: diffusion equation for the distribution of price displacements.)
        </p>

        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>
          3. Fundamental solution (Gaussian/heat kernel)
        </h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Consider the initial condition
        </p>
        <MathDisplay math="p(x, 0) = \delta(x - x_0). \quad (3.1)" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Then the solution of (2.5)–(3.1) is the heat kernel:
        </p>
        <h4 style={{ fontSize: '1.2rem', color: 'var(--color-highlight)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
          Proposition 3 (Gaussian transition density).
        </h4>
        <MathDisplay math="p(x, t \mid x_0, 0) = \frac{1}{\sqrt{2\pi\sigma^2 t}} \exp\left( - \frac{(x - x_0)^2}{2\sigma^2 t} \right). \quad (3.2)" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          This has mean <MathDisplay math="x_0" inline={true} /> and variance <MathDisplay math="\sigma^2 t" inline={true} />, matching Lemma 1 in the scaling limit.
        </p>

        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>
          4. Bachelier dynamics and the backward pricing PDE
        </h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Assume the continuous-time limit of the random walk is the diffusion
        </p>
        <MathDisplay math="dX_t = \sigma dW_t, \quad (4.1)" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          where <MathDisplay math="W_t" inline={true} /> is standard Brownian motion.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          (Physics: Brownian particle; Finance: Bachelier arithmetic Brownian model for price/forward-price displacement.)
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Let <MathDisplay math="V(x, t)" inline={true} /> be the value of a contingent claim written on <MathDisplay math="X_t" inline={true} /> with maturity <MathDisplay math="T" inline={true} /> and payoff
        </p>
        <MathDisplay math="V(x, T) = \Phi(x). \quad (4.2)" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Apply Itô’s formula to <MathDisplay math="V(X_t, t)" inline={true} />:
        </p>
        <MathDisplay math="dV = \partial_t V dt + \partial_x V dX_t + \frac{1}{2} \partial_{xx} V (dX_t)^2. \quad (4.3)" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Using (4.1), <MathDisplay math="(dX_t)^2 = \sigma^2 dt" inline={true} />, hence
        </p>
        <MathDisplay math="dV = \left( \partial_t V + \frac{\sigma^2}{2} \partial_{xx} V \right) dt + \sigma \partial_x V dW_t. \quad (4.4)" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Define the self-financing hedged portfolio
        </p>
        <MathDisplay math="\Pi_t := V(X_t, t) - \Delta_t X_t, \quad \Delta_t := \partial_x V(X_t, t). \quad (4.5)" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Then
        </p>
        <MathDisplay math="d\Pi_t = dV - \Delta_t dX_t = \left( \partial_t V + \frac{\sigma^2}{2} \partial_{xx} V \right) dt. \quad (4.6)" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          In Bachelier’s classical (forward/undiscounted) setting, the riskless drift is taken to vanish (equivalently, work in discounted units). The no-arbitrage condition requires the locally riskless portfolio to have zero drift:
        </p>
        <MathDisplay math="d\Pi_t = 0. \quad (4.7)" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Therefore:
        </p>

        <h4 style={{ fontSize: '1.2rem', color: 'var(--color-highlight)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
          Proposition 4 (Bachelier backward PDE).
        </h4>
        <MathDisplay math="\partial_t V(x, t) + \frac{\sigma^2}{2} \partial_{xx} V(x, t) = 0, \quad V(x, T) = \Phi(x). \quad (4.8)" />

        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>
          5. Change of variables to the (forward) heat equation
        </h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Introduce time-to-maturity
        </p>
        <MathDisplay math="\tau := T - t. \quad (5.1)" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Then <MathDisplay math="\partial_t = -\partial_\tau" inline={true} />, and (4.8) becomes:
        </p>
        <h4 style={{ fontSize: '1.2rem', color: 'var(--color-highlight)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
          Corollary 5 (heat equation form).
        </h4>
        <MathDisplay math="\partial_\tau V(x, \tau) = \frac{\sigma^2}{2} \partial_{xx} V(x, \tau), \quad V(x, 0) = \Phi(x). \quad (5.2)" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Thus the pricing function satisfies the standard 1D heat equation in <MathDisplay math="\tau" inline={true} />.
        </p>

        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>
          6. Solution of the pricing PDE (Gaussian convolution)
        </h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          By the heat kernel representation, the solution of (5.2) is
        </p>
        <MathDisplay math="V(x, \tau) = \int_{-\infty}^{\infty} \Phi(y) \frac{1}{\sqrt{2\pi\sigma^2 \tau}} \exp\left( - \frac{(x - y)^2}{2\sigma^2 \tau} \right) dy. \quad (6.1)" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Equivalently, using the Gaussian transition law (3.2),
        </p>
        <MathDisplay math="V(x, t) = \mathbb{E}[\Phi(X_T) \mid X_t = x], \quad X_T \mid X_t = x \sim \mathcal{N}(x, \sigma^2(T - t)). \quad (6.2)" />

        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>
          7. Identification with the 1D heat equation
        </h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          The canonical 1D heat equation is
        </p>
        <MathDisplay math="\partial_t u = \kappa \partial_{xx} u. \quad (7.1)" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Comparing (2.5) and (5.2) gives the identification
        </p>
        <MathDisplay math="\kappa = \frac{\sigma^2}{2}. \quad (7.2)" />
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
    physicist: "Fischer Black and Myron Scholes",
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

        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
          <img
            src={`${import.meta.env.BASE_URL}Ed_thorp.png`}
            alt="Ed Thorp"
            style={{ borderRadius: '8px', maxWidth: '100%', maxHeight: '300px', border: '1px solid var(--color-surface-hover)' }}
          />
        </div>

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

        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
          <img
            src={`${import.meta.env.BASE_URL}Robert_Merton.png`}
            alt="Robert Merton"
            style={{ borderRadius: '8px', maxWidth: '100%', maxHeight: '300px', border: '1px solid var(--color-surface-hover)' }}
          />
        </div>

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
    physicsConnection: (
      <div style={{ lineHeight: '1.6' }}>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>Final Physics Behind Quantum Computers</h2>

        <p style={{ marginBottom: '1rem' }}>
          In classical computers bit are defined as the most basic unit of data represented by a single digit of 1 or 0. In quantum computers, this is represented by the quantum state of an electron.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          This new representation is called a qubit and uses quantum mechanics to redefine the binary digits of 0 or 1.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          Qubits are two quantum state systems. There are several physical objects which can be used as qubits such as, atomic nuclei, a photon and electrons.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          In electrons, their spin can be used to defined these two quantum states, spin up and spin down.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          By applying an external magnetic field to the electron, we can align it into its spin down state analogous to digit 0 in regular bits.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          Energy can then be provided to change quantum state to spin up.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          These two states spin up and down provide the basis of our 2 dimensional complex Hilbert space and are defined using the bra and ket notation.
        </p>

        <MathDisplay math="|0\rangle, |1\rangle" />

        <MathDisplay math="|0\rangle = \begin{pmatrix} 1 \\ 0 \end{pmatrix}, \quad |1\rangle = \begin{pmatrix} 0 \\ 1 \end{pmatrix}" />

        <p style={{ marginBottom: '1rem' }}>
          By the principle of superposition, the electron can be described as a linear combination of these basis wavefunctions.
        </p>

        <MathDisplay math="\psi = \alpha|0\rangle + \beta|1\rangle" />

        <p style={{ marginBottom: '1rem' }}>
          Where <MathDisplay math="|\alpha|^2 + |\beta|^2 = 1" inline={true} />
        </p>

        <p style={{ marginBottom: '1rem' }}>
          The <MathDisplay math="\alpha" inline={true} /> and <MathDisplay math="\beta" inline={true} /> represent the associated amplitudes of the basis wavevectors.
        </p>

        <p style={{ marginBottom: '1rem' }}>
          The probability of finding the electron in either state is found by taking the magnitude squared of these amplitudes.
        </p>

        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>The Bloch Sphere</h3>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
          <img
            src={`${import.meta.env.BASE_URL}bloch_sphere.png`}
            alt="The Bloch Sphere representation of a qubit state"
            style={{ maxWidth: '100%', borderRadius: '8px', border: '1px solid var(--color-surface-hover)' }}
          />
        </div>

        <p style={{ marginBottom: '1rem' }}>
          We can think of a single qubit as a 3D vector on the Bloch Sphere
        </p>

        <MathDisplay math="\psi = \cos(\frac{\theta}{2})|0\rangle + e^{i\phi}\sin(\frac{\theta}{2})|1\rangle" />

        <p style={{ marginBottom: '1rem' }}>
          Where <MathDisplay math="\cos\frac{\theta}{2} = \alpha" inline={true} /> and <MathDisplay math="e^{i\phi}\sin\frac{\theta}{2} = \beta" inline={true} />
        </p>

        <p style={{ marginBottom: '1rem' }}>
          When we consider two interacting qubits the power of quantum computing becomes clearer. Writing the possible basis states, we get
        </p>

        <MathDisplay math="|00\rangle, |01\rangle, |10\rangle, |11\rangle" />

        <MathDisplay math="|00\rangle = \begin{pmatrix} 1 \\ 0 \\ 0 \\ 0 \end{pmatrix}, |01\rangle = \begin{pmatrix} 0 \\ 1 \\ 0 \\ 0 \end{pmatrix}, |10\rangle = \begin{pmatrix} 0 \\ 0 \\ 1 \\ 0 \end{pmatrix}, |11\rangle = \begin{pmatrix} 0 \\ 0 \\ 0 \\ 1 \end{pmatrix}" />

        <p style={{ marginBottom: '1rem' }}>
          And the wavefunction becomes
        </p>

        <MathDisplay math="\psi = \alpha|00\rangle + \beta|01\rangle + \gamma|10\rangle + \delta|11\rangle" />

        <p style={{ marginBottom: '1rem' }}>
          This means we require 4 amplitudes to define the wavefunction for a 2 qubit system.
        </p>

        <p style={{ marginBottom: '1rem' }}>
          This continues to scale exponentially as we need <MathDisplay math="2^N" inline={true} /> different amplitudes to describe N number of qubits.
        </p>

        <p style={{ marginBottom: '1rem' }}>
          This can be mathematically described using tensor products.
        </p>

        <MathDisplay math="\mathcal{H}_{AB} = \mathcal{H}_A \otimes \mathcal{H}_B" />

        <p style={{ marginBottom: '1rem' }}>
          Tensor products allow us to combine two different 2-dimensional Hilbert Spaces into one 4 dimensional one.
        </p>

        <p style={{ marginBottom: '1rem' }}>
          E.g
        </p>

        <MathDisplay math="|0\rangle \otimes |1\rangle = |01\rangle" />

        <MathDisplay math="|a\rangle = \begin{pmatrix} a_1 \\ a_2 \end{pmatrix}, \quad |b\rangle = \begin{pmatrix} b_1 \\ b_2 \end{pmatrix}" />

        <MathDisplay math="a \otimes b = \begin{pmatrix} a_1b_1 \\ a_1b_2 \\ a_2b_1 \\ a_2b_2 \end{pmatrix}" />

        <p style={{ marginBottom: '1rem' }}>
          However, in quantum computing we must have entangled states. Entanglement of quantum particles is where two or more particles become linked in such a way that the state of one particle instantaneously determines the state of another.
        </p>

        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>SIMULATION?</h3>

        <p style={{ marginBottom: '1rem' }}>
          In quantum computing an entangled state is a special type of multi cubit state in which individual qubits do not have independent values.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          Instead, their states are linked meaning measuring one qubit instantly reveals information about the others.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          This allows algorithms to change the amplitudes of many states, creating constructive interference of some states and destructive for others.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          Over time this creates a global property which drastically increases the probability the wavefunction collapsing to the desired answer.
        </p>

        <p style={{ marginBottom: '1rem' }}>
          Mathematically entanglement is a property of using tensor products.
        </p>

        <MathDisplay math="\psi_a \otimes \psi_b \neq \psi" />

        <p style={{ marginBottom: '1rem' }}>
          When we create a two-qubit system there is no individual state for qubit a or qubit b, only the combined 4D system.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          This means the associated amplitudes cannot be factorised back into the two separated states.
        </p>

        <MathDisplay math="\psi_a = a|0\rangle + b|1\rangle, \quad \psi_b = c|0\rangle + d|1\rangle" />
        <MathDisplay math="\psi_{ab} \neq ac|00\rangle + ad|01\rangle + bc|10\rangle + bd|11\rangle" />

        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>Application of Quantum Computers</h3>

        <p style={{ marginBottom: '1rem' }}>
          How we solve problems using quantum computers involves applying quantum gates to the quantum system.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          A quantum gate is a controlled period of time which allows the system to evolve under a chosen Hamiltonian H.
        </p>

        <MathDisplay math="U = e^{-iHt/\hbar}" />

        <p style={{ marginBottom: '1rem' }}>
          Where U is the time evolution operator
        </p>

        <MathDisplay math="\psi_{out} = U\psi_{in}" />

        <p style={{ marginBottom: '1rem' }}>
          This operation must be unitary to not change the total probability.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          Also due to the postulates of quantum mechanics this operator must be reversible
        </p>

        <MathDisplay math="U^{-1} = U^\dagger" />

        <p style={{ marginBottom: '1rem' }}>
          And linear
        </p>

        <MathDisplay math="U(\alpha|0\rangle + \beta|1\rangle) = \alpha U|0\rangle + \beta U|1\rangle" />

        <p style={{ marginBottom: '1rem' }}>
          When we design algorithms for quantum computers, we use a sequence of quantum gates to evolve the system.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          By associating a possible answer to each amplitude of the basis vectors, we can apply a series of these quantum gates to change each given amplitude.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          By having the system constructively interfere with correct answers and destructively interfere with incorrect answers, we can change the probability of the wavefunction collapsing to the correct answer incredibly likely.
        </p>

        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>Limitations of Quantum Computers.</h3>

        <p style={{ marginBottom: '1rem' }}>
          Quantum computers are limited by the type of problems they can solve by the properties of quantum mechanics.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          In quantum mechanics the wavefunction always collapses to only one state.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          This means all other information is lost and makes quantum computers only useful for specific types of problems.
        </p>
      </div >
    ),
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
    ],
    customContent: (
      <div>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
          Quantum Computing in Finance
        </h2>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Quantum computing represents a paradigm shift in how we approach financial modeling. By validly simulating quantum mechanical systems, we can solve optimization problems that are currently intractable for classical computers.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Potential applications include:
        </p>
        <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
          <li><strong>Portfolio Optimization:</strong> Finding the absolute optimal portfolio from a vast number of assets.</li>
          <li><strong>Option Pricing:</strong> Rapidly pricing complex derivatives using quantum amplitude estimation.</li>
          <li><strong>Risk Analysis:</strong> analyzing distinct risk factors in near real-time.</li>
        </ul>
      </div>
    )
  }
];
