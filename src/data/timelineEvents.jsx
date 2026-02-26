import MathDisplay from '../components/MathDisplay';
import VolatilityGraph from '../components/VolatilityGraph';
import ModernPortfolioSimulation from '../components/ModernPortfolioSimulation';
import BlochSphereSimulation from '../components/BlochSphereSimulation';
import HadamardGateSimulation from '../components/HadamardGateSimulation';


export const timelineEvents = [
  {
    id: "1900",
    year: "1900",
    title: "Speculation Theory",
    physicist: "Louis Bachelier",
    physicsConnection: "Brownian Motion",
    image: "Louis bachelier.png",
    imageReferenceTitle: "Louis Bachelier Portrait",
    imageSource: "Exante Data",
    visualType: "brownian",
    sourceLink: "https://x.com/ExanteData/status/1679788970262102020",
    references: [
      { id: 1, title: "From Simple Random Walk to Wiener Process and Diffusion Equation", author: "Dr. Christian P. Salas", link: "https://drchristianphsalas.com/2024/04/02/from-simple-random-walk-to-wiener-process-and-diffusion-equation/" },
      { id: 2, title: "Stochastic Processes", author: "University of Leicester", link: "https://www.le.ac.uk/users/dsgp1/COURSES/DERIVATE/PROCESSES.PDF" },
      { id: 3, title: "Phynance (General Financial Physics)", author: "Oxford University Physics", link: "https://users.physics.ox.ac.uk/~Foot/Phynance/" },
      { id: 4, title: "Théorie de la Spéculation", author: "Louis Bachelier (1900)", link: "https://investmenttheory.org/uploads/3/4/8/2/34825752/emhbachelier.pdf" },
      { id: 5, title: "Black-Scholes and Bachelier", author: "arXiv:2104.08686", link: "https://arxiv.org/pdf/2104.08686.pdf" },
      { id: 6, title: "The Heat Equation", author: "Stanford University", link: "https://web.stanford.edu/class/math220b/handouts/heateqn.pdf?utm_source=chatgpt.com" },
      { id: 7, title: "The History of Bachelier's 'Théorie de la Spéculation'", author: "JSTOR", link: "https://www.jstor.org/stable/1182421?utm_source=chatgpt.com" },
      { id: 8, title: "Jules Regnault", author: "Wikipedia contributors (2024)", link: "https://en.wikipedia.org/wiki/Jules_Regnault" },
      { id: 9, title: "Elementary Principles in Statistical Mechanics", author: "Gibbs, J.W. (1902)", link: "https://en.wikipedia.org/wiki/Elementary_Principles_in_Statistical_Mechanics" },
      { id: 10, title: "Between economics and physics…", author: "Huber, T.A. (2016)", link: "https://www.research-collection.ethz.ch/bitstream/handle/20.500.11850/167132/1/content.pdf" },
      { id: 11, title: "Investigations on the Theory of the Brownian Movement", author: "Einstein, A. (1905)", link: "https://einsteinpapers.press.princeton.edu/vol2-trans/137" }
    ],
    customContent: (
      <div>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
          Speculation and a Beginning from Louis Bachelier
        </h2>

        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>
          Act I: The Illusion of Cause
        </h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Before the 20th Century, asset prices were generally thought to move because of identifiable, explainable causes (news, harvest, wars, etc.).
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          It was widely thought that skilled traders could analyse trends/cycles and make a profit in the financial markets.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          The notion of randomness was just considered to be an acute lack of information, with price fluctuations generally thought to be noisy, however, deterministic if a trader was provided with all the information associated with the stock.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Inherent randomness was yet to be conceptualised, and hence no rigorous mathematical framework was in place for financial markets of the time.
        </p>

        <h4 style={{ fontSize: '1.2rem', color: 'var(--color-highlight)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
          The role of Louis Bachelier
        </h4>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Enter Louis Bachelier. Studying mathematics under Henri Poincaré, Bachelier published his PhD thesis ‘Théorie de la Spéculation’<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[4]</a></sup>, which was highly unconventional for the time.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[7]</a></sup>
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Rather than addressing a classical problem in pure mathematics, he examined the mathematical structure of financial markets, specifically price fluctuations on the Paris Bourse.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          The Paris Bourse consisted of two main segments: the cash market (marché au comptant) - immediate settlement, or the forward market (marché à terme) - settlement (financial closing of a trade) at a future date.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Primarily, Bachelier directed his research towards the forward market, which was highly developed and more active than the cash market.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          The forward market followed the regime:
        </p>
        <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
          <li>Today, you agree on a price.</li>
          <li>Actual delivery/payment happens later (often monthly settlement).</li>
          <li>You post a margin deposit.</li>
          <li>You profit if the price moves in your favour before settlement.</li>
        </ul>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          The key issue was the structural temporal gap between agreement and settlement.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          The problem was that future asset prices (forward price) were unknown at the time of contracting, hence the value given to the asset was mostly speculative.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          To counteract this uncertainty, it was widely believed that more information on what could possibly affect the asset price (news, other trades etc.), led to a fairer spot price at settlement.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Louis Bachelier suggested that attempting to catalogue economic events that may influence prices was far from rigorous and depended on unpredictable short-term fluctuations.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          His research reformulated the problem mathematically; future prices should be treated as random variables with pricing following set probability laws.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          In doing so, Bachelier treated the market as a statistical system composed of numerous interacting agents, analogous to a system of gas particles.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Fundamentally, statistical thermodynamics tells us that the behaviour of individual gas particles is known to be virtually impossible to predict.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Bachelier’s mathematical background allowed him to analyse stock prices in the same regard, which he concluded that pricing is structurally random and can only be said to be probabilistic, not deterministic.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Bachelier&apos;s key findings were:
        </p>
        <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
          <li>Modelled asset prices as a continuous random process.</li>
          <li>Introduced Brownian motion into finance.</li>
          <li>Showed price changes are normally distributed and independent.</li>
          <li>Argued expected speculative profit is zero.</li>
          <li>Derived an early mathematical formula for option pricing.</li>
          <li>Intentionally drew many conceptual parallels from the world of physics to finance.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[3]</a></sup></li>
        </ul>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          It should be said that Louis Bachelier&apos;s contributions to option pricing and financial mathematics were disregarded at the time and not rediscovered until 50 years later.
        </p>

        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>
          Act II
        </h3>
        <h4 style={{ fontSize: '1.2rem', color: 'var(--color-highlight)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
          The Drunken Walk:
        </h4>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Bachelier suggested financial markets evolve randomly over time – an efficient market is one at statistical equilibrium (probabilistically, no one should be able to predict an efficient market).<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[1]</a></sup><sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[2]</a></sup>
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Bachelier modelled an asset price to follow that of a random walk – formalised by Einstein 5 years later, who applied this phenomenon to pollen grains in a liquid.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[11]</a></sup>
        </p>
        <MathDisplay math="S_t = S_0 + \sigma W_t" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Similarly:
        </p>
        <MathDisplay math="dS_t = \sigma dW_t" />
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
        <MathDisplay math="W_t \sim \mathcal{N}(0, t)" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Variance grows linearly in time:
        </p>
        <MathDisplay math="\mathbb{E}[W_t^2] = t" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Square-root scaling law:
        </p>
        <MathDisplay math="W_{ct} \stackrel{d}{=} \sqrt{c} W_t" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          where <MathDisplay math="\stackrel{d}{=}" inline={true} /> means equal in distribution.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Diffusion spreads proportionally to <MathDisplay math="t" inline={true} />.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          The <MathDisplay math="W_t" inline={true} /> term introduces a continuous-time random process, making the stock price completely unpredictable by nature.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          In a symmetric random walk, the position at the next step equals the current position plus a random increment that is equally likely to be positive or negative.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          The expected position, therefore, remains constant,
        </p>
        <MathDisplay math="\mathbb{E}[X_n] = X_0" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          while the variance grows linearly with the number of steps,
        </p>
        <MathDisplay math="\text{Var}(X_n) = n(\Delta x)^2" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Thus, the process does not drift on average, but the uncertainty spreads over time, with the typical displacement increasing proportionally to <MathDisplay math="n" inline={true} />.
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
        <MathDisplay math="\partial_t p = \frac{\sigma^2}{2} \partial_{xx} p" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          the same diffusion (heat) equation, with volatility playing the role of thermal diffusivity.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[6]</a></sup>
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Just as heat spreads out from a hot spot, probability spreads out from the current price.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[6]</a></sup>
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          The centre remains unchanged on average, but uncertainty increases.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          When applied to option pricing, the equation appears in backward form:
        </p>
        <MathDisplay math="\partial_t V + \frac{\sigma^2}{2} \partial_S V = 0" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          After a change of variables, this becomes the standard heat equation.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          The option price evolves exactly like temperature diffusing through space.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          A payoff function at maturity is smoothed over time by Gaussian diffusion.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Inherently, we can therefore take away that:
        </p>
        <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
          <li>Market dynamics are diffusive: Information disperses like heat.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[3]</a></sup></li>
          <li>Volatility is a diffusion constant: It controls how fast uncertainty spreads.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[6]</a></sup></li>
        </ul>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Naturally, the solution to the PDE is found to be:
        </p>
        <MathDisplay math="p(x, t \mid x_0, 0) = \frac{1}{\sqrt{2\pi\sigma^2 t}} \exp\left(-\frac{(x - x_0)^2}{2\sigma^2 t}\right)" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          The fundamental solution of the heat equation is the Gaussian distribution.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          In Bachelier’s model, this means that conditional on today’s price, future prices are normally distributed with variance <MathDisplay math="\sigma^2(T-t)" inline={true} />.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          The mean remains at the current price (in the zero-drift case), and volatility acts as the diffusion constant determining how quickly the distribution widens over time.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          This result was revolutionary because it provided an explicit probabilistic law for price movements and made option pricing analytically solvable.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[5]</a></sup>
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          By identifying the market’s uncertainty with the Gaussian solution of the heat equation, Bachelier showed that financial fluctuations obey a precise diffusion structure, transforming speculation into a problem of mathematical analysis and establishing the first continuous-time pricing framework.
        </p>
      </div>
    ),
    derivationContent: (
      <div>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
          Speculation Theory Derivation<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[4]</a></sup>
        </h2>

        <div style={{ marginBottom: '2rem', marginTop: '1.5rem', width: '100%', maxWidth: '800px' }}>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginBottom: '1rem' }}>
            A Video Walkthrough of the Derivation
          </h3>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px', marginBottom: '0.5rem' }}>
            <iframe
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              src="https://www.youtube.com/embed/QDtYwGo7w2M"
              title="A Video Walkthrough of the Derivation"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen>
            </iframe>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', fontStyle: 'italic', marginTop: '0.5rem' }}>
            Below is the typed derivation.
          </p>
        </div>

        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>
          1. Discrete random walk and diffusive scaling<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[1]</a></sup><sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[2]</a></sup>
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
          Proposition 2 (diffusion/heat equation)<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[6]</a></sup>
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
          In Bachelier’s classical (forward/undiscounted) setting, the riskless drift is taken to vanish (equivalently, work in discounted units). The no-arbitrage condition requires the locally riskless portfolio to have zero drift:<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[5]</a></sup>
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
          7. Identification with the 1D heat equation<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[6]</a></sup>
        </h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          The canonical 1D heat equation is
        </p>
        <MathDisplay math="\partial_t u = \kappa \partial_{xx} u. \quad (7.1)" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          where <MathDisplay math="\kappa" inline={true} /> is the thermal diffusivity. Comparing (2.5) and (5.2) gives the identification
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
    context: "Investors needed a way to mathematically maximise returns for a given level of risk.",
    math: "\\sigma_p^2 = \\sum \\sum w_i w_j \\sigma_{ij}",
    impact: "Transformed portfolio management from qualitative stock picking to quantitative risk/return optimisation.",
    image: "Harry Markowitz.png",
    imageReferenceTitle: "Harry Markowitz Portrait",
    imageSource: "UCSD Today",
    sourceLink: "https://today.ucsd.edu/story/harry_markowitz_economic_sciences_1990",
    visualType: "distribution",
    references: [
      { id: 1, title: "60 Years of portfolio optimisation: Practical challenges and current trends", author: "Kolm, P.N., Tütüncü, R. and Fabozzi, F.J. (2014)", link: "https://doi.org/10.1016/j.ejor.2013.10.060" },
      { id: 2, title: "Portfolio Selection: Efficient Diversification of Investments", author: "Markowitz, H.M. (1959)", link: "https://www.jstor.org/stable/j.ctt1bh4c8h" },
      { id: 3, title: "Capital Asset Prices: A Theory of Market Equilibrium Under Conditions of Risk", author: "Sharpe, W.F. (1964)", link: "https://doi.org/10.1111/j.1540-6261.1964.tb02865.x" }
    ],
    customContent: (
      <div>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
          The Birth of Modern Portfolio Theory
        </h2>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Harry Markowitz, an economist from the University of Chicago, introduced mean-variance optimisation in 1952, in a paper that fundamentally changed finance <sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[1]</a></sup>. He was motivated by a challenge that investors frequently encountered: making rational choices when faced with multiple risky assets, where prior to his work investment decisions were largely intuitive rather than objective.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Markowitz formalised risk as the variance of returns and demonstrated that diversification reduces overall portfolio risk, similar to the now common sentiment of “don’t put all your eggs in one basket”. His framework quantified the trade-off between expected return and risk, showing that investors could construct portfolios with a risk-to-return trade-off that lies along an mathematically formulated ‘efficient frontier’. Along this efficient frontier we can read off the values of the maximised expected return for a given level of risk, or the minimised risk for a given return.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          This theory was expanded upon in Markowitz’s 1959 book titled ‘Portfolio Selection: Efficient Diversification of Investment’ <sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[2]</a></sup>, which introduced the covariance matrix of asset returns and other rigorous tools for portfolio optimisation. This work laid out the framework for what is now known as modern portfolio theory.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          In the 1960s, William Sharpe extended Markowitz’s framework by incorporating the concept of the market portfolio and risk-free assets, combining to form the Capital Asset Pricing Model (CAPM). In 1964 Sharpe introduced the Sharpe ratio <sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[3]</a></sup>, a measure of risk-adjusted return, and linked individual asset risk to market-wide risk. Sharpe, along with Markowitz and Merton Miller, were awarded the 1990 Nobel Prize in Economics.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Another key contributor was James Tobin, who in 1958 applied portfolio theory to include risk-free lending and borrowing, developing the separation theorem, where everyone should hold the same optimal risky portfolio alongside a personal amount of risk-free assets. These developments collectively transformed investment management from an art to a science, introducing concepts like optimal diversification, risk to return trade-offs, and efficient frontiers that remain central in finance today.
        </p>
      </div>
    ),
    derivationContent: (
      <div>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
          The Mathematics of Modern Portfolio Theory
        </h2>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Mean-variance portfolio theory uses many tools familiar to physics, due to finance’s heavy reliance on stochastic calculus, derived from the geometric Brownian motion of a particle. In this theory specifically, we see that the portfolio variance <MathDisplay math="\mathbf{w}^T\mathbf{\Sigma}\mathbf{w}" inline={true} /> is of a quadratic form, similar to the energy of a system of coupled oscillators. The minimisation under constraints uses a possibly familiar concept of Lagrange multipliers, exactly like a physicist would use them to solve for equilibrium configurations.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          The covariance matrix denoted <MathDisplay math="\mathbf{\Sigma}" inline={true} /> has variances along the diagonal and covariances on the off diagonal (tell you how asset returns move together) which is analogous to coupling terms in many-body physics such as coupled oscillators. In many-body physics one diagonalises the coupling matrix and transforms to eigenmodes where each mode becomes an independent oscillator, and in portfolio theory one diagonalises <MathDisplay math="\mathbf{\Sigma}" inline={true} />, transforming into eigenvector coordinates, where each eigenvector represents an independent risk factor.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Therefore, mean variance optimisation is essentially a constrained equilibrium problem, mathematically equivalent to finding the equilibrium of a quadratic energy surface under linear constraints.
        </p>

        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>
          1. Introduction and Definitions
        </h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          We formulate the problem of portfolio selection as a constrained optimisation problem in linear algebra. We treat the returns of assets as random variables and seek to minimise the variance of a linear combination of these variables.
        </p>

        <h4 style={{ fontSize: '1.2rem', color: 'var(--color-highlight)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
          1.1 State Vectors and Metrics
        </h4>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Consider a universe of <MathDisplay math="N" inline={true} /> assets. We define the following:
        </p>
        <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
          <li>
            <strong>Asset Returns (<MathDisplay math="\mathbf{r}" inline={true} />):</strong> An <MathDisplay math="N" inline={true} />-dimensional random vector representing the returns of the assets.
          </li>
          <li>
            <strong>Expected Returns (<MathDisplay math="\boldsymbol{\mu}" inline={true} />):</strong> An <MathDisplay math="N \times 1" inline={true} /> vector of the mean values of the returns.
            <MathDisplay math="\boldsymbol{\mu} = \mathbb{E}[\mathbf{r}] = [\mu_1, \mu_2, \dots, \mu_N]^T" />
          </li>
          <li>
            <strong>Covariance Matrix (<MathDisplay math="\mathbf{\Sigma}" inline={true} />):</strong> An <MathDisplay math="N \times N" inline={true} /> symmetric, positive semi-definite matrix representing the covariance between asset returns. In this vector space, <MathDisplay math="\mathbf{\Sigma}" inline={true} /> acts as the metric tensor for risk.
            <MathDisplay math="\Sigma_{ij} = \text{Cov}(r_i, r_j) = \mathbb{E}[(r_i - \mu_i)(r_j - \mu_j)]" />
          </li>
          <li>
            <strong>Portfolio Weights (<MathDisplay math="\mathbf{w}" inline={true} />):</strong> An <MathDisplay math="N \times 1" inline={true} /> vector representing the fraction of total capital invested in each asset.
            <MathDisplay math="\mathbf{w} = [w_1, w_2, \dots, w_N]^T" />
          </li>
        </ul>

        <h4 style={{ fontSize: '1.2rem', color: 'var(--color-highlight)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
          1.2 Macroscopic Observables
        </h4>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          From these definitions, we derive the scalar properties of the portfolio:
        </p>
        <ol style={{ marginBottom: '1rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>Portfolio Mean Return (<MathDisplay math="\mu_p" inline={true} />):</strong> The projection of the weights onto the expected returns.
            <MathDisplay math="\mu_p = \mathbf{w}^T \boldsymbol{\mu}" />
          </li>
          <li>
            <strong>Portfolio Variance (<MathDisplay math="\sigma_p^2" inline={true} />):</strong> The quadratic form of the weights with respect to the covariance metric.
            <MathDisplay math="\sigma_p^2 = \mathbf{w}^T \mathbf{\Sigma} \mathbf{w}" />
          </li>
        </ol>

        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>
          2. The Optimisation Problem
        </h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Our objective is to minimise the portfolio risk (variance) for a specifically chosen target return <MathDisplay math="\mu^*" inline={true} />, subject to the constraint that all capital must be invested (the weights must sum to unity).
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Mathematically, we minimise the scalar field <MathDisplay math="f(\mathbf{w}) = \frac{1}{2}\mathbf{w}^T \mathbf{\Sigma} \mathbf{w}" inline={true} /> subject to two linear constraints:
        </p>
        <ol style={{ marginBottom: '1rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>Return Constraint:</strong> <MathDisplay math="\mathbf{w}^T \boldsymbol{\mu} = \mu^*" inline={true} />
          </li>
          <li>
            <strong>Budget Constraint:</strong> <MathDisplay math="\mathbf{w}^T \mathbf{1} = 1" inline={true} /> (where <MathDisplay math="\mathbf{1}" inline={true} /> is a column vector of ones).
          </li>
        </ol>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6', fontStyle: 'italic', color: 'var(--color-text-secondary)' }}>
          Note: The factor of <MathDisplay math="1/2" inline={true} /> is included for algebraic convenience in differentiation, analogous to kinetic energy <MathDisplay math="\frac{1}{2}mv^2" inline={true} />.
        </p>

        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>
          3. Lagrangian Formulation
        </h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          We introduce two Lagrange multipliers, <MathDisplay math="\lambda_1" inline={true} /> and <MathDisplay math="\lambda_2" inline={true} />, to enforce the constraints. The Lagrangian <MathDisplay math="\mathcal{L}" inline={true} /> is defined as:
        </p>
        <MathDisplay math="\mathcal{L}(\mathbf{w}, \lambda_1, \lambda_2) = \frac{1}{2}\mathbf{w}^T \mathbf{\Sigma} \mathbf{w} - \lambda_1 (\mathbf{w}^T \boldsymbol{\mu} - \mu^*) - \lambda_2 (\mathbf{w}^T \mathbf{1} - 1)" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          To find the optimal weights <MathDisplay math="\mathbf{w}^*" inline={true} />, we apply the principle of stationarity: <MathDisplay math="\nabla \mathcal{L} = 0" inline={true} />.
        </p>

        <h4 style={{ fontSize: '1.2rem', color: 'var(--color-highlight)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
          3.1 First Order Condition
        </h4>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Taking the gradient with respect to the vector <MathDisplay math="\mathbf{w}" inline={true} /> (using the identity <MathDisplay math="\nabla_{\mathbf{w}} (\mathbf{w}^T \mathbf{A} \mathbf{w}) = 2\mathbf{A}\mathbf{w}" inline={true} /> for symmetric <MathDisplay math="\mathbf{A}" inline={true} />):
        </p>
        <MathDisplay math="\nabla_{\mathbf{w}} \mathcal{L} = \mathbf{\Sigma} \mathbf{w} - \lambda_1 \boldsymbol{\mu} - \lambda_2 \mathbf{1} = 0" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Rearranging for <MathDisplay math="\mathbf{w}" inline={true} />:
        </p>
        <MathDisplay math="\mathbf{\Sigma} \mathbf{w} = \lambda_1 \boldsymbol{\mu} + \lambda_2 \mathbf{1}" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Assuming <MathDisplay math="\mathbf{\Sigma}" inline={true} /> is non-singular (invertible), we can solve for the optimal weights:
        </p>
        <MathDisplay math="\mathbf{w}^* = \mathbf{\Sigma}^{-1} (\lambda_1 \boldsymbol{\mu} + \lambda_2 \mathbf{1}) \quad (*)" />

        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>
          4. Solving for Lagrange Multipliers
        </h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          To determine <MathDisplay math="\lambda_1" inline={true} /> and <MathDisplay math="\lambda_2" inline={true} />, we substitute <MathDisplay math="\mathbf{w}^*" inline={true} /> back into our two constraint equations.
        </p>

        <p style={{ marginBottom: '0.5rem', lineHeight: '1.6', fontWeight: 600 }}>
          1. The Return Constraint:
        </p>
        <MathDisplay math="\mu^* = \boldsymbol{\mu}^T \mathbf{w}^* = \boldsymbol{\mu}^T \left( \lambda_1 \mathbf{\Sigma}^{-1} \boldsymbol{\mu} + \lambda_2 \mathbf{\Sigma}^{-1} \mathbf{1} \right)" />
        <MathDisplay math="\mu^* = \lambda_1 (\boldsymbol{\mu}^T \mathbf{\Sigma}^{-1} \boldsymbol{\mu}) + \lambda_2 (\boldsymbol{\mu}^T \mathbf{\Sigma}^{-1} \mathbf{1})" />

        <p style={{ marginBottom: '0.5rem', lineHeight: '1.6', fontWeight: 600 }}>
          2. The Budget Constraint:
        </p>
        <MathDisplay math="1 = \mathbf{1}^T \mathbf{w}^* = \mathbf{1}^T \left( \lambda_1 \mathbf{\Sigma}^{-1} \boldsymbol{\mu} + \lambda_2 \mathbf{\Sigma}^{-1} \mathbf{1} \right)" />
        <MathDisplay math="1 = \lambda_1 (\mathbf{1}^T \mathbf{\Sigma}^{-1} \boldsymbol{\mu}) + \lambda_2 (\mathbf{1}^T \mathbf{\Sigma}^{-1} \mathbf{1})" />

        <h4 style={{ fontSize: '1.2rem', color: 'var(--color-highlight)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
          4.1 Matrix Solution
        </h4>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          We define three scalar constants (<MathDisplay math="A, B, C" inline={true} />) representing the intrinsic geometry of the asset universe:
        </p>
        <MathDisplay math="A = \mathbf{1}^T \mathbf{\Sigma}^{-1} \mathbf{1}, \quad B = \boldsymbol{\mu}^T \mathbf{\Sigma}^{-1} \mathbf{1}, \quad C = \boldsymbol{\mu}^T \mathbf{\Sigma}^{-1} \boldsymbol{\mu}" />

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          This creates a linear system for our multipliers:
        </p>
        <MathDisplay math="\begin{pmatrix} C & B \\ B & A \end{pmatrix} \begin{pmatrix} \lambda_1 \\ \lambda_2 \end{pmatrix} = \begin{pmatrix} \mu^* \\ 1 \end{pmatrix}" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Inverting the matrix (where determinant <MathDisplay math="D = AC - B^2" inline={true} />):
        </p>
        <MathDisplay math="\begin{pmatrix} \lambda_1 \\ \lambda_2 \end{pmatrix} = \frac{1}{D} \begin{pmatrix} A & -B \\ -B & C \end{pmatrix} \begin{pmatrix} \mu^* \\ 1 \end{pmatrix}" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Yielding:
        </p>
        <MathDisplay math="\lambda_1 = \frac{A\mu^* - B}{D}, \quad \lambda_2 = \frac{C - B\mu^*}{D}" />

        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>
          5. The Efficient Frontier Equation
        </h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          We substitute the optimal weights back into the variance definition <MathDisplay math="\sigma_p^2 = \mathbf{w}^{*T} \mathbf{\Sigma} \mathbf{w}^*" inline={true} />. Using Eq. (*), this simplifies to:
        </p>
        <MathDisplay math="\sigma_p^2 = \lambda_1 \mu^* + \lambda_2" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Substituting our solved <MathDisplay math="\lambda" inline={true} /> values:
        </p>
        <MathDisplay math="\sigma_p^2 = \frac{A(\mu^*)^2 - 2B\mu^* + C}{D}" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          This equation describes a <strong>Parabola</strong> in <MathDisplay math="(\sigma_p^2, \mu^*)" inline={true} /> space. However, in standard financial plots involving standard deviation <MathDisplay math="(\sigma_p, \mu^*)" inline={true} />, this equation represents a <strong>Hyperbola</strong>. This hyperbola is the <strong>Efficient Frontier</strong>.
        </p>

        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>
          6. The Tangency Portfolio (Maximum Sharpe Ratio)
        </h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          If a risk-free asset <MathDisplay math="r_f" inline={true} /> is introduced, we instead maximise the Sharpe Ratio <MathDisplay math="S(\mathbf{w})" inline={true} />:
        </p>
        <MathDisplay math="S(\mathbf{w}) = \frac{\mathbf{w}^T \boldsymbol{\mu} - r_f}{\sqrt{\mathbf{w}^T \mathbf{\Sigma} \mathbf{w}}}" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6', fontStyle: 'italic', color: 'var(--color-text-secondary)' }}>
          Note: The explicit vector differentiation of this quotient is omitted here for brevity. It involves applying the quotient rule to vector derivatives.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          The result of the maximisation yields the Tangency Portfolio weights <MathDisplay math="\mathbf{w}_{tan}" inline={true} />:
        </p>
        <MathDisplay math="\mathbf{w}_{tan} \propto \mathbf{\Sigma}^{-1}(\boldsymbol{\mu} - r_f \mathbf{1})" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          This vector represents the point where the Capital Market Line (CML) is tangent to the Efficient Frontier hyperbola.
        </p>
      </div>
    )
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
    image: "fractal photo.png",
    imageReferenceTitle: "Benoit Mandelbrot",
    imageSource: "TED Talk: Fractals and the art of roughness",
    visualType: "fractal",
    sourceLink: "https://www.ted.com/talks/benoit_mandelbrot_fractals_and_the_art_of_roughness",
    sideImages: [
      {
        src: "mandelbrot_set_zoom.jpg",
        caption: "Mandelbrot Set Zoom",
        sourceLink: "https://en.wikipedia.org/wiki/Fractal#/media/File:Mandel_zoom_00_mandelbrot_set.jpg"
      }
    ],
    references: [
      { id: 1, title: "Learning from Benoit Mandelbrot", author: "Masters Invest (2018)", link: "https://mastersinvest.com/newblog/2018/2/18/learning-from-benoit-mandelbrot" },
      { id: 2, title: "Fractals and the art of roughness – Benoit Mandelbrot", author: "TED (2013)", link: "https://www.youtube.com/watch?v=wQTnVEXAtBY" },
      { id: 3, title: "The Fractal Geometry of Nature", author: "Wikipedia", link: "https://en.wikipedia.org/wiki/The_Fractal_Geometry_of_Nature" },
      { id: 4, title: "Fractal market hypothesis and two power-laws", author: "Aleksander Weron, Rafał Weron (2000)", link: "https://doi.org/10.1016/S0960-0779(98)00295-1" },
      { id: 5, title: "Extreme observations and risk assessment in the equity markets of MENA region: Tail measures and Value-at-Risk", author: "A. Assaf (2009)", link: "https://doi.org/10.1016/j.irfa.2009.03.007" },
      { id: 6, title: "Fractal Market Hypothesis: An In-Depth Review", author: "Ambati, Murari (2025)", link: "http://dx.doi.org/10.2139/ssrn.5137493" },
      { id: 7, title: "Mandelbrot Fractal Visualisation", author: "Gart", link: "https://mandel.gart.nz/" },
      { id: 8, title: "Hurst exponent: Calculation, Values and More", author: "Singh, V., Divakar, V. and Garg, A. (2019)", link: "https://blog.quantinsti.com/hurst-exponent/" },
      { id: 9, title: "Fractional Brownian motion in a nutshell", author: "Shevenko, G. (2015)", link: "https://doi.org/10.1142/S2010194515600022" },
      { id: 10, title: "Financial Markets: From fractals to power laws", author: "Olsen, R. (2023)", link: "http://dx.doi.org/10.2139/ssrn.4344887" },
      { id: 11, title: "A theory of power-law distributions in financial market fluctuations", author: "Gabaix, X. et al. (2003)", link: "https://doi.org/10.1038/nature01624" },
      { id: 12, title: "The art of fitting financial time series with Lévy stable distributions", author: "Scalas, E. and Kim, K. (2006)", link: "https://doi.org/10.48550/arXiv.physics/0608224" }
    ],
    customContent: (
      <div>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
          The Man Who Measured the Roughness
        </h2>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Educated at the École Polytechnique and California Institute of Technology, mathematician Benoit Mandelbrot was not drawn to the elegance and simplicity that many of his peers sought after in their mathematical solution. Later, as a Professor of Mathematics at Yale University and IBM Fellow Emeritus, Mandelbrot had the freedom to pursue unconventional problems. The seemingly irregular, messy, disordered and noisy problems that refused to be smoothed out and simplified captivated him.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[1]</a></sup>
        </p>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Where many mathematicians saw error and uncertainty, Mandelbrot believed there was an order within randomness and an underlying structure, waiting to be understood. Benoit had questions about the shapes of clouds, trees, mountains, and coastlines—structures mathematics struggled to describe. Why does a coastline grow longer and longer the more precisely it’s measured? Why does the structure of a tree repeat itself as you zoom in? His questions about the structure of nature would soon lead him to redefine the mathematics of financial phenomena.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[2]</a></sup>
        </p>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Mandelbrot’s description of these structural phenomena was named ‘fractals’: shapes that repeated themselves endlessly with self-similarity and a fractal dimension that exists between integer topological dimensions to define a shape's complexity. His ideas were collected in the “Fractal Geometry of Nature”, showing that irregularity was not a defect but an intrinsic property of nature itself.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[3]</a></sup>
        </p>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          See <a href="https://mandel.gart.nz/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)' }}>this website for a great visualisation on fractals</a>.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[7]</a></sup>
        </p>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Mandelbrot turned his focus to the financial world drawing parallels with markets and the roughness he saw in nature. A price chart showed similar patterns irrespective of the time scale, whether it be measured over days, weeks or years. Extreme events repeated and the same patterns re-emerged time after time.
        </p>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Mandelbrot argued that markets were fractal, exhibiting the same order beneath their jagged and seemingly unexplainable nature. Markets were not governed by smooth equilibrium but by a hidden structure beneath their unpredictable behaviour. Mandelbrot challenged the basics of traditional financial theory and reconsidered the ideas of risk, stability and uncertainty. Price changes did not follow the Gaussian distribution they were believed to by the current financial model. Mandelbrot argued they followed power laws and large price changes occurred far more frequently than traditional theory predicted.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[4]</a></sup> Jumps greater than five standard deviations were occurring every few years in market data rather than after thousands of years like the traditional theory predicted. Eugene Fama later confirmed stock returns showed much fatter tails than the normal distribution would account for. Mandelbrot then challenged the notion of a gaussian distribution, arguing that smooth Brownian motion was insufficient to describe a market's turbulence and that it was better described by anomalous diffusion which was like turbulent systems in statistical physics. Characterised by volatility clustering, like turbulence in fluids, large changes follow large changes and small changes follow small changes.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[5]</a></sup>
        </p>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Although the work of Mandelbrot would not allow prices to be predicted it did hold great value elsewhere. He showed instability was inherent to financial systems and crashes were structurally inevitable which challenged the foundations of the Efficient Market Hypothesis and highlighted the limitations of standard risk measures.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[6]</a></sup>
        </p>
      </div>
    ),
    derivationContent: (
      <div>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
          Self-Similarity and the Hurst Exponent
        </h2>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          A non-trivial stochastic process <MathDisplay math="X=(X_{t}, t \ge 0)" inline={true} /> taking values on <MathDisplay math="\mathbb{R}" inline={true} /> is said to be self-similar if for any <MathDisplay math="a > 0" inline={true} /> there exists <MathDisplay math="H > 0" inline={true} /> such that:
        </p>
        <MathDisplay math="(X_{at}, t \ge 0) \stackrel{d}{=} (a^H X_t, t \ge 0)" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          where <MathDisplay math="\stackrel{d}{=}" inline={true} /> means equal in distribution.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          The Hurst exponent <MathDisplay math="H" inline={true} /> is used as a measure of long-term memory of a time series <sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[8]</a></sup>.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Equation (1) is the mathematical foundation of fractal time series which exhibits self-similarity in the financial world. This is because the statistical properties of price fluctuations are the same after rescaling the time axis.
        </p>

        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>
          Returns and Lag Time
        </h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Defining the return over lag time <MathDisplay math="\Delta t" inline={true} /> to be:
        </p>
        <MathDisplay math="r_{\Delta t}(t) = X(t + \Delta t) - X(t)" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Using the self-similarity of price series and equation (1) we obtain:
        </p>
        <MathDisplay math="r_{\Delta t} \stackrel{d}{=} (\Delta t)^H r_{(1)}" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          where <MathDisplay math="1" inline={true} /> is a basic time unit (returns measured over 1 day, 1 week, etc.).
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Let us consider <MathDisplay math="r_{a\tau} \stackrel{d}{=} a^H r_{\tau}" inline={true} />. Assuming stationary increments:
        </p>
        <MathDisplay math="X(t+a\tau) - X(t) \stackrel{d}{=} X(a\tau) - X(0) \stackrel{d}{=} a^H(X(\tau) - X(0))" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Squaring LHS and RHS:
        </p>
        <MathDisplay math="(\Delta_{a\tau}X(t))^2 = a^{2H}(\Delta_{\tau}X(t))^2" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Taking expectations:
        </p>
        <MathDisplay math="E(|\Delta_{a\tau}X(t)|^2) = a^{2H}E(|\Delta_{\tau}X(t)|^2)" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Hence analogous to anomalous diffusion in physics <sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[9]</a></sup>:
        </p>
        <MathDisplay math="E(\Delta X^2) \propto \Delta t^{2H}" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          The Hurst Exponent value <MathDisplay math="H" inline={true} /> shows:
        </p>
        <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
          <li><MathDisplay math="H > 0.5" inline={true} />, roughly shows a trending market.</li>
          <li><MathDisplay math="H < 0.5" inline={true} />, roughly shows a sideways market.</li>
          <li><MathDisplay math="H = 0.5" inline={true} />, indicates prediction cannot be based on past market data.</li>
        </ul>

        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>
          Power Laws & Fractals
        </h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Fractals describe how a financial market looks the same at all scales and it has no characteristic scale. The statistical structure is the same at different scales.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Mandelbrot proposed that the distribution of price changes had fat tails which were described by power laws <sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[11]</a></sup>. Where the probability of a large price change <MathDisplay math="|r|" inline={true} /> is given by:
        </p>
        <MathDisplay math="P(|r| > x) \sim x^{-\alpha}" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          where <MathDisplay math="x" inline={true} /> is large and <MathDisplay math="\alpha > 0" inline={true} /> <sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[12]</a></sup>. This was consistent with scale-invariant fractal behaviour.
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
    imageReferenceTitle: "Fischer Black and Myron Scholes",
    imageSource: "Greek Soft Institute",
    visualType: "heat-equation",
    sourceLink: "https://greeksoftinstitute.wordpress.com/2016/08/09/what-is-the-black-scholes-model-in-laymans-terms/",
    references: [
      { id: 1, title: "Edward O. Thorp", author: "Wikipedia", link: "https://en.wikipedia.org/wiki/Edward_O._Thorp" },
      { id: 2, title: "Beat the Dealer", author: "Thorp, E. O. (1966)", link: "https://en.wikipedia.org/wiki/Beat_the_Dealer" },
      { id: 3, title: "The Trillion Dollar Equation", author: "Veritasium (YouTube)", link: "https://youtu.be/A5w-dEgIU1M" },
      { id: 4, title: "Beat the Market: A Scientific Stock Market System", author: "Thorp, E. O., and Kassouf, S. T. (1967)", link: "https://en.wikipedia.org/wiki/Beat_the_Market" },
      { id: 5, title: "The Pricing of Options and Corporate Liabilities", author: "Black, F. and Scholes, M. (1973)", link: "https://doi.org/10.1086/260062" },
      { id: 6, title: "Black-Scholes and Bachelier", author: "arXiv:2104.08686", link: "https://arxiv.org/pdf/2104.08686.pdf" },
      { id: 7, title: "Black–Scholes model", author: "Wikipedia", link: "https://en.wikipedia.org/wiki/Black%E2%80%93Scholes_model" },
      { id: 8, title: "The Easiest Way to Derive the Black-Scholes Model", author: "Perfiliev Financial Training (YouTube)", link: "https://youtu.be/NHvQ5CSSgw0" }
    ],
    sideImages: [
      { src: "Robert_Merton.png", caption: "Robert Merton", sourceLink: "https://en.wikipedia.org/wiki/Robert_C._Merton" },
      { src: "Ed_thorp.png", caption: "Ed Thorp", sourceLink: "http://www.edwardothorp.com/" }
    ],
    customContent: (
      <div>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
          From Blackjack to Black-Scholes
        </h2>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          In the late 1950s, <strong>Ed Thorp</strong><sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[1]</a></sup>, a brilliant mathematics PhD student at UCLA, looked at Las Vegas and saw not a playground of chance, but a predictable problem to be solved. While most gamblers relied on superstition and random luck, Thorp relied on the <em>Law of Large Numbers</em>.
        </p>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Thorp realised that Blackjack was a system with "memory." Unlike a roulette wheel, where every spin is independent, a deck of cards changes its probabilities as cards are removed. By mentally tracking the ratio of high cards to low cards, Thorp could identify specific moments when the probability distribution shifted in his favor. When the deck was "hot," he bet big. When it was "cold," he bet the minimum. He wasn't gambling, he was executing a calculation.
        </p>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Thorp invented <strong>card counting</strong> and proceeded to make a lot of money. Eventually casino’s got wise, something was up and banned him from playing. Thorp left the casino’s and published his findings in <em>Beat the Dealer</em><sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[2]</a></sup>, causing a panic in the casino industry. Having "solved" gambling, Thorp took his winnings and turned his eyes toward the “world’s biggest casino: the stock market”<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[3]</a></sup>.
        </p>

        <hr style={{ margin: '1.5rem 0', borderColor: 'var(--color-surface-hover)' }} />

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Thorp approached Wall Street with the same scientific rigor. He identified an anomaly in the pricing of warrants<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[4]</a></sup> (a type of option). Options were notoriously difficult to value because they are derivative—their value depends on the movement of an underlying stock.
        </p>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Thorp devised a strategy called <strong>Delta Hedging</strong> to neutralise risk. The concept is elegant in its physics-like symmetry:
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
            If the stock price rises (<i>dS &gt; 0</i>): You make a profit on the shares you own. You lose money on the option you sold (because it is now more valuable to the buyer), but your share profit covers the loss.
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
          The true revolution arrived in 1973. Two academics, <strong>Fischer Black</strong> and <strong>Myron Scholes</strong>*, made a profound physical analogy: they treated the stock price not as a random walk, but as a particle undergoing <em>Geometric Brownian Motion</em>—the same math used to describe pollen grains jittering in water or heat diffusing through a metal rod.
        </p>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          By applying <strong>Itô’s Lemma</strong> (the stochastic equivalent of the chain rule), they reduced the chaotic movement of the market into a partial differential equation. To the shock of the scientific community, the resulting <strong>Black-Scholes Equation</strong> was actually a variant of the <em>Heat Diffusion Equation</em> used in thermodynamics.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[3]</a></sup><sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[5]</a></sup><sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[6]</a></sup>
        </p>

        <div style={{ margin: '1.5rem 0', padding: '1rem', background: 'var(--color-bg)', borderRadius: '8px', overflowX: 'auto' }}>
          <div style={{ fontFamily: 'Times New Roman, serif', fontSize: '1.2rem', textAlign: 'center' }}>
            <p>The solution allows traders to input observable parameters to output the explicit "fair price" of an option.</p>
          </div>
        </div>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          It was the quickest adoption of a theoretical model in the history of economics. Within two years, Texas Instruments calculators came pre-programmed with the Black-Scholes formula and all traders used or at least knew of the Black-Scholes equation. Traders abandoned gut feeling for physics-based precision. This equation didn't just describe the market; it built the modern multi-trillion dollar derivatives industry, proving that the same laws governing heat transfer could also govern the flow of capital.
        </p>

        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', fontStyle: 'italic', marginTop: '2rem' }}>
          * Robert Merton independently solved this problem at the same time (but using applied stochastic calculus instead).
        </p>
      </div>
    ),
    derivationContent: (
      <div>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
          Black-Scholes Equation Proof
        </h2>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          <MathDisplay math="S \leftarrow" inline={true} /> Current Stock Price<br />
          <MathDisplay math="X \leftarrow" inline={true} /> Strike/Exercise price (price to buy the share/option at said later date)<br />
          <MathDisplay math="T \leftarrow" inline={true} /> Time to expiration<br />
          <MathDisplay math="P \leftarrow" inline={true} /> Premium (purchasing of the contract).<br />
          <MathDisplay math="r \leftarrow" inline={true} /> Risk-free interest rate (theoretical concept of interest rate on "risk-free" asset. Uses government bonds as closest proxy).<br />
          <MathDisplay math="\sigma \leftarrow" inline={true} /> Standard deviation of log returns (volatility).
        </p>

        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>
          Price vs Time Graph
        </h3>

        <VolatilityGraph />

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          <MathDisplay math="C \leftarrow" inline={true} /> Call price (at its fairest).<br />
          <MathDisplay math="\Pi \leftarrow" inline={true} /> Portfolio.<br />
          <MathDisplay math="V(S,t) \leftarrow" inline={true} /> Option
        </p>

        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>
          Derivation
        </h3>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Start with your portfolio value
        </p>
        <MathDisplay math="\Pi = V(S,t) - \Delta S \quad (1)." />

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          We want to know how <MathDisplay math="\Pi" inline={true} /> changes over time. This is
        </p>
        <MathDisplay math="d\Pi = dV - \Delta dS \quad (2)." />

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Using Brownian motion,
        </p>
        <MathDisplay math="dS = \mu S dt + \sigma S dW \quad (3)." />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          <MathDisplay math="\mu S dt \rightarrow" inline={true} /> General Stock drift<br />
          <MathDisplay math="\sigma S dW \rightarrow" inline={true} /> The volatility / The uncertainty in <MathDisplay math="dS" inline={true} /> from Brownian motion
        </p>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Using Ito's Lemma because <MathDisplay math="V" inline={true} /> is a function of the stochastic process <MathDisplay math="S" inline={true} />, i.e.
        </p>
        <MathDisplay math="dV = \frac{\partial V}{\partial t}dt + \frac{\partial V}{\partial S}dS + \frac{1}{2}\frac{\partial^{2}V}{\partial S^{2}}dS^{2} \quad (4)." />

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          To simplify, we square equation (3) to find <MathDisplay math="dS^{2}" inline={true} />:
        </p>
        <MathDisplay math="dS^{2} = \mu^{2}S^{2}dt^{2} + 2\mu\sigma S^{2}dtdW + \sigma^{2}S^{2}dW^{2} \quad (5)." />

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          In stochastic calculus <MathDisplay math="dt^{2}=0" inline={true} />, <MathDisplay math="dtdW=0" inline={true} /> and <MathDisplay math="dWdW=dt" inline={true} />. Hence,
        </p>
        <MathDisplay math="dS^{2} = \sigma^{2}S^{2}dt \quad (6)." />

        <MathDisplay math="dV = \frac{\partial V}{\partial t}dt + \frac{\partial V}{\partial S}dS + \frac{1}{2}\sigma^{2}S^{2}\frac{\partial^{2}V}{\partial S^{2}}dt \quad (7)." />

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Substitute <MathDisplay math="dV" inline={true} /> into <MathDisplay math="d\Pi" inline={true} />.
        </p>
        <MathDisplay math="d\Pi = \left( \frac{\partial V}{\partial t} + \frac{1}{2}\sigma^{2}S^{2}\frac{\partial^{2}V}{\partial S^{2}} \right)dt + \left( \frac{\partial V}{\partial S} - \Delta \right)dS \quad (8)." />

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Set
        </p>
        <MathDisplay math="\Delta = \frac{\partial V}{\partial S} \quad (9)." />

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Thus
        </p>
        <MathDisplay math="d\Pi = \left( \frac{\partial V}{\partial t} + \frac{1}{2}\sigma^{2}S^{2}\frac{\partial^{2}V}{\partial S^{2}} \right)dt \quad (10)." />

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          The portfolio is now just a <MathDisplay math="dt" inline={true} /> term so it's deterministic. It carries no risk. So, it yields a risk-free rate <MathDisplay math="r" inline={true} />. So,
        </p>
        <MathDisplay math="d\Pi = r\Pi dt \quad (11)" />
        <MathDisplay math="= r(V - \Delta S)dt" />

        <MathDisplay math="d\Pi = \left( rV - rS\frac{\partial V}{\partial S} \right)dt \quad (12)." />

        <MathDisplay math="rV - rS\frac{\partial V}{\partial S} = \frac{\partial V}{\partial t} + \frac{1}{2}\sigma^{2}S^{2}\frac{\partial^{2}V}{\partial S^{2}} \quad (13)." />

        <MathDisplay math="\frac{\partial V}{\partial t} + rS\frac{\partial V}{\partial S} + \frac{1}{2}\sigma^{2}S^{2}\frac{\partial^{2}V}{\partial S^{2}} - rV = 0 \quad (14)." />

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          This is the Black-Scholes equation.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[5]</a></sup><sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[6]</a></sup><sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[7]</a></sup><sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[8]</a></sup>
        </p>

        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>
          Solving the PDE: The Physics Connection
        </h3>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Equation (14) represents a complex financial reality, but its structure is remarkably similar to equations found in thermodynamics. Black and Scholes realised that by transforming the coordinate system and the value function, they could map the chaotic movement of markets onto the smooth diffusion of heat.
        </p>

        <h4 style={{ fontSize: '1.2rem', color: 'var(--color-highlight)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
          Step 1: Transforming to the Heat Equation
        </h4>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          We first change to log-price coordinates and reverse the time to look forward from maturity:
          <br />
          <MathDisplay math="x = \ln(S/X), \quad \tau = \frac{\sigma^2}{2}(T-t), \quad V(S,t) = X \cdot v(x, \tau)" inline={true} />
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Substituting these into the Black-Scholes PDE yields a simpler diffusion-drift equation:
        </p>
        <MathDisplay math="\frac{\partial v}{\partial \tau} = \frac{\partial^2 v}{\partial x^2} + (k-1)\frac{\partial v}{\partial x} - kv \quad \text{where } k = \frac{2r}{\sigma^2}" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          To eliminate the drift and decay terms, we apply a "gauge transformation" common in physics:
        </p>
        <MathDisplay math="v(x, \tau) = e^{\alpha x + \beta \tau} u(x, \tau)" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          By choosing <MathDisplay math="\alpha = -\frac{1}{2}(k-1)" inline={true} /> and <MathDisplay math="\beta = -\frac{1}{4}(k+1)^2" inline={true} />, all first-order and constant terms vanish, leaving the canonical 1D Heat Equation:
        </p>
        <MathDisplay math="\frac{\partial u}{\partial \tau} = \frac{\partial^2 u}{\partial x^2}" />

        <h4 style={{ fontSize: '1.2rem', color: 'var(--color-highlight)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
          Step 2: Solution via the Green's Function (Heat Kernel)
        </h4>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          In physics, the solution to the heat equation is found by convolving the initial state with the <strong>Green's function</strong> (or Heat Kernel), which represents how a point source of heat spreads over time:
        </p>
        <MathDisplay math="\Phi(x-y, \tau) = \frac{1}{\sqrt{4\pi\tau}} e^{-\frac{(x-y)^2}{4\tau}}" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          The solution for the transformed option value is then:
        </p>
        <MathDisplay math="u(x, \tau) = \int_{-\infty}^{\infty} u(y, 0) \Phi(x-y, \tau) dy" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          where <MathDisplay math="u(y, 0)" inline={true} /> is the transformed version of the option's payoff at maturity <MathDisplay math="\max(S-X, 0)" inline={true} />.
        </p>

        <h4 style={{ fontSize: '1.2rem', color: 'var(--color-highlight)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
          Step 3: The Cumulative Normal Distribution Emerges
        </h4>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          When we evaluate this integral, the Gaussian nature of the Heat Kernel naturally gives rise to the <strong>Cumulative Normal Distribution</strong>, denoted as <MathDisplay math="N(d)" inline={true} />. After transforming back to our original variables <MathDisplay math="S" inline={true} /> and <MathDisplay math="t" inline={true} />, we arrive at the Black-Scholes formula:
        </p>

        <MathDisplay math="C(S,t) = S N(d_1) - X e^{-r(T-t)} N(d_2)" />

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Where the diffusion of probability determines the weightings:
        </p>
        <MathDisplay math="d_1 = \frac{\ln(S/X) + (r + \sigma^2/2)(T-t)}{\sigma\sqrt{T-t}}, \quad d_2 = d_1 - \sigma\sqrt{T-t}" />

        <h4 style={{ fontSize: '1.2rem', color: 'var(--color-highlight)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
          Intuition: What does the equation mean?
        </h4>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          The formula represents the "fair value" as the Difference between two expected outcomes:
        </p>
        <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong><MathDisplay math="S N(d_1)" inline={true} /></strong>: The expected value of receiving the stock, multiplied by the probability-weighted delta. This tells us how much of the stock we must hold to remain perfectly hedged.
          </li>
          <li>
            <strong><MathDisplay math="X e^{-r(T-t)} N(d_2)" inline={true} /></strong>: The present value of the cost to exercise the option. <MathDisplay math="N(d_2)" inline={true} /> is the risk-adjusted probability that the stock price will exceed the strike price at expiration.
          </li>
        </ul>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          In essence, the option price is the discounted expected profit from a perfectly balanced tug-of-war between the asset's growth and its inherent volatility.
        </p>
      </div>
    )
  },

  {
    id: "now",
    year: "NOW",
    title: "What's happening now?",
    physicist: "IBM Quantum Computer",
    physicsConnection: "Quantum Computing & Information Theory",
    context: "The frontier of physics and finance is merging with advanced computing and AI.",
    math: "|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle",
    impact: "Exploring quantum algorithms for optimisation and detecting systemic risk in complex networks.",
    image: "quatum computer.png",
    imageAspectRatio: "3/4",
    visualType: "quantum",
    references: [
      { id: 1, title: "Principles Of Quantum Computation And Information", author: "Giuliano, Benenti, et al. (2004)", link: "" },
      { id: 2, title: "An Introduction to Quantum Computing", author: "Kaye, Phillip, et al. (2007)", link: "" },
      { id: 3, title: "Fundamentals of Quantum Entanglement", author: "Duarte, F. J. (2022)", link: "" },
      { id: 4, title: "Quantum Mechanics", author: "Stefanovich, Eugene (2018)", link: "" },
      { id: 5, title: "Quantum Communication and Computing: Elevating the Banking Sector", author: "McKinsey & Company (2020)", link: "https://www.mckinsey.com/industries/financial-services/our-insights/quantum-communication-and-computing-elevating-the-banking-sector" },
      { id: 6, title: "Quantum computing for finance", author: "Herman, D., Googin, C., Liu, X. et al. (2023)", link: "https://doi.org/10.1038/s42254-023-00603-1" },
      { id: 7, title: "Quantum Computing: an Applied Approach", author: "Hidary, Jack D. (2019)", link: "" },
      { id: 8, title: "On the Role of Hadamard Gates in Quantum Circuits", author: "Shepherd, D.J. (2006)", link: "https://doi.org/10.1007/s11128-006-0023-4" },
      { id: 9, title: "Quantum Computing", author: "Mehta, Nihal D. (2020)", link: "" },
      { id: 10, title: "Quantum Computing Explained", author: "McMahon, David (2007)", link: "" }
    ],
    derivationContent: (
      <div>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
          What is Quantum Computing
        </h2>



        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginBottom: '1rem' }}>
          Quantum computation as a physical theory of information
        </h3>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          In classical computers bits are defined as the most basic unit of data represented by a single digit of 1 or 0. In quantum computers, this can be represented by the quantum state of an electron. This new representation is called a qubit and uses quantum mechanics to redefine the binary digits of 0 or 1.
        </p>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Qubits are two level quantum systems described by a two-dimensional complex Hilbert space. There are several physical objects which can be used as qubits such as, atomic nuclei, a photon and electrons.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[1]</a></sup> In electrons, their spin can be used to define these two quantum states, spin up and spin down. By applying an external magnetic field to the electron, we can align it into its spin down state analogous to digit 0 in regular bits. Energy can then be provided to change quantum state to spin up.
        </p>
      </div>
    ),
    subPaths: [
      {
        id: "math-background",
        title: "Mathematical and Physical Background",
        content: (
          <div>
            <h4 style={{ fontSize: '1.2rem', color: 'var(--color-highlight)', marginBottom: '0.5rem' }}>
              Mathematical description of qubits
            </h4>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              In this complex Hilbert space, using the Dirac notation, we can define a pair of normalised and mutually orthogonal quantum states as <MathDisplay math="|0\rangle, |1\rangle" inline={true} /> where
            </p>
            <MathDisplay math="|0\rangle = \begin{pmatrix} 1 \\ 0 \end{pmatrix} \quad |1\rangle = \begin{pmatrix} 0 \\ 1 \end{pmatrix}" />
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              which form a basis representing spin down and spin up called the computational basis. By the principle of superposition, any state of an electron can be described as a linear combination of this basis.
            </p>
            <MathDisplay math="\psi = \alpha|0\rangle + \beta|1\rangle" />
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              Where <MathDisplay math="|\alpha|^2 + |\beta|^2 = 1" inline={true} />. The <MathDisplay math="\alpha" inline={true} /> and <MathDisplay math="\beta" inline={true} /> represent the associated amplitudes of the basis wavevectors. The probability of finding the electron in either state is found by taking the magnitude squared of these amplitudes. Compared to a classical bit which only allows two, this system allows for a continuum of possible states. A way to visualise this continuum is the Bloch sphere, a sphere with radius 1 in the two-dimensional Hilbert space <MathDisplay math="|0\rangle, |1\rangle" inline={true} />.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[2]</a></sup>
            </p>

            {/* Simulation Placeholder 1 */}
            <div style={{ margin: '2rem 0' }}>
              <BlochSphereSimulation />
            </div>

            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              We can think of a single qubit’s state as a 3D vector on the Bloch Sphere. This state will have the coordinates
            </p>
            <MathDisplay math="\psi = \cos\left(\frac{\theta}{2}\right)|0\rangle + e^{i\phi}\sin\left(\frac{\theta}{2}\right)|1\rangle" />
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              Where <MathDisplay math="\cos\left(\frac{\theta}{2}\right) = \alpha" inline={true} /> and <MathDisplay math="e^{i\phi}\sin\left(\frac{\theta}{2}\right) = \beta" inline={true} /><sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[2]</a></sup> and the phase of the qubit is represented by <MathDisplay math="\phi" inline={true} />.
            </p>

            <h4 style={{ fontSize: '1.2rem', color: 'var(--color-highlight)', marginTop: '2rem', marginBottom: '0.5rem' }}>
              Composite systems and entanglement
            </h4>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              When we consider two interacting qubits the power of quantum computing becomes clearer. Writing the possible basis states, we get
            </p>
            <MathDisplay math="|00\rangle, |01\rangle, |10\rangle, |11\rangle" />
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              where
            </p>
            <MathDisplay math="|00\rangle = \begin{pmatrix} 1 \\ 0 \\ 0 \\ 0 \end{pmatrix}, \quad |01\rangle = \begin{pmatrix} 0 \\ 1 \\ 0 \\ 0 \end{pmatrix}, \quad |10\rangle = \begin{pmatrix} 0 \\ 0 \\ 1 \\ 0 \end{pmatrix}, \quad |11\rangle = \begin{pmatrix} 0 \\ 0 \\ 0 \\ 1 \end{pmatrix}" />
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              And the wavefunction becomes
            </p>
            <MathDisplay math="\psi = \alpha|00\rangle + \beta|01\rangle + \gamma|10\rangle + \delta|11\rangle" />
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              This means we require 4 amplitudes to define the wavefunction for a 2-qubit system. This continues to scale exponentially as we need <MathDisplay math="2^N" inline={true} /> different amplitudes to describe N number of qubits.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[1]</a></sup> However, in quantum computing we must have entangled states. Entanglement of quantum particles is where two or more particles become linked in such a way that the state of one particle instantaneously determines the state of another.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[3]</a></sup> This requires inter qubit interactions i.e. a two-qubit gate. This can be mathematically described using tensor products.
            </p>
            <MathDisplay math="H_{AB} = H_A \otimes H_B" />
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              Tensor products allow us to combine two different 2-dimensional Hilbert spaces into one 4-dimensional one. For example:
            </p>
            <MathDisplay math="|0\rangle \otimes |1\rangle = |01\rangle" />
            <MathDisplay math="|a\rangle = \begin{pmatrix} a_1 \\ a_2 \end{pmatrix} \quad |b\rangle = \begin{pmatrix} b_1 \\ b_2 \end{pmatrix}" />
            <MathDisplay math="|a\rangle \otimes |b\rangle = \begin{pmatrix} a_1b_1 \\ a_1b_2 \\ a_2b_1 \\ a_2b_2 \end{pmatrix}" />
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              In quantum computing an entangled state is a special type of multi-qubit state in which individual qubits do not have independent values.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[1]</a></sup> Instead, their states are linked meaning measuring one qubit instantly reveals information about the others. This allows algorithms to change the amplitudes of many states, creating constructive interference for some states and destructive for others. Over time this creates a global property which drastically increases the probability of the wavefunction collapsing to the desired answer.
            </p>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              Mathematically entanglement is a property of using tensor products.
            </p>
            <MathDisplay math="\psi_a \otimes \psi_b \neq \psi_{ab}" />
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              When we create a two-qubit system there is no individual state for qubit a or qubit b, only the combined 4D system. This means the associated amplitudes cannot be factorised back into the two separated states – they are non-separable.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[1]</a></sup>
            </p>
            <MathDisplay math="\psi_a = a|0\rangle + b|1\rangle \quad \psi_b = c|0\rangle + d|1\rangle" />
            <MathDisplay math="\psi_{ab} \neq ac|00\rangle + ad|01\rangle + bc|10\rangle + bd|11\rangle" />

            <h4 style={{ fontSize: '1.2rem', color: 'var(--color-highlight)', marginTop: '2rem', marginBottom: '0.5rem' }}>
              Measurement of Quantum Systems
            </h4>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              In classical systems, we assume that measuring a variable has no impact on the state of the system. However, in quantum mechanics the action of measuring the system alters its behaviour. When we measure a wavefunction, it collapses from a superposition of many states into a single basis state. Mathematically, every physical property we want to measure, e.g. spin or position, can be described by a Hermitian operator <MathDisplay math="O" inline={true} /> called an observable. Where our measurement outcome is given by the equation
            </p>
            <MathDisplay math="O|\phi_n\rangle = \lambda_n|\phi_n\rangle" />
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              Where <MathDisplay math="\phi_n" inline={true} /> are the eigenstates and <MathDisplay math="\lambda_n" inline={true} /> the eigenvalues corresponding to the eigenstates.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[4]</a></sup> The Born Rule determines the probability of the system collapsing to a specific eigenstate
            </p>
            <MathDisplay math="\psi = \alpha|0\rangle + \beta|1\rangle" />
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              The <MathDisplay math="P_0 = |\alpha|^2" inline={true} /> and <MathDisplay math="P_1 = |\beta|^2" inline={true} />. More generally
            </p>
            <MathDisplay math="P_{\lambda_n} = |\langle\phi_n|\psi\rangle|^2" />
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              <sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[4]</a></sup> When we measure multi-qubit systems the non-separable nature of entangled particles means applying a measurement operator to one qubit affects the state of the entire system. This means, for example, if we measure the first qubit to collapse to the <MathDisplay math="|0\rangle" inline={true} /> state the other is guaranteed to also be <MathDisplay math="|0\rangle" inline={true} />. An important note: when we measure the system to have a defined value, the system will always continue to have this value, the probability distribution collapses completely to this single answer.
            </p>
          </div>
        )
      },
      {
        id: "how-it-works",
        title: "How Quantum Computers Actually Work",
        content: (
          <div>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              To perform a quantum computation, three steps must be followed. First, the system is prepared in a well-defined initial state called the fiducial state.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[1]</a></sup> This state corresponds to all qubits in an initial state in the computational basis of <MathDisplay math="|0\rangle" inline={true} />. Secondly, the quantum computer evolves this state using unitary transformations U (<MathDisplay math="\psi_{out} = U\psi_{in}" inline={true} />). Lastly, upon completion of the algorithm, a measurement is performed in the computational basis, determining if each qubit is in the spin up or down state.
            </p>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              In practice, quantum computation is performed using quantum gates. A quantum gate is a controlled period of time which allows the system to evolve under a chosen Hamiltonian. The resulting time-evolution operator is given by
            </p>
            <MathDisplay math="U = e^{-iHt/\hbar}" />
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              where <MathDisplay math="t" inline={true} /> is the duration of the evolution, <MathDisplay math="\hbar" inline={true} /> is the reduced Planck constant and H is the Hamiltonian.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[7]</a></sup> These quantum gates can be combined to produce algorithms in gate-based quantum computers to manipulate the state of qubits.
            </p>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              From quantum mechanics the time evolution of a wavefunction must be described by the Schrödinger equation. This dictates the quantum evolution must conserve the total probability of the system and therefore the operator U must be unitary. This means it has several properties. Firstly, the operation is reversible
            </p>
            <MathDisplay math="U^{-1} = U^{\dagger}" />
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              where <MathDisplay math="U^{\dagger}" inline={true} /> denotes the Hermitian conjugate of <MathDisplay math="U" inline={true} />. Secondly the operator must be linear so that
            </p>
            <MathDisplay math="U(\alpha|0\rangle + \beta|1\rangle) = \alpha U|0\rangle + \beta U|1\rangle" />
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              For a single qubit, these conditions mean the operator can be described by a 2x2 unitary matrix. An important example of one a quantum gate is the Hadamard gate. The Hadamard gate is defined as
            </p>
            <MathDisplay math="H = \frac{1}{\sqrt{2}} \begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}" />
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              This turns the computational basis <MathDisplay math="|0\rangle, |1\rangle" inline={true} /> into the Hadamard basis <MathDisplay math="|+\rangle, |-\rangle" inline={true} />.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[8]</a></sup> Where the states are a superposition of the states of the computational basis
            </p>
            <MathDisplay math="H|0\rangle = \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle) \equiv |+\rangle" />
            <MathDisplay math="H|1\rangle = \frac{1}{\sqrt{2}}(|0\rangle - |1\rangle) \equiv |-\rangle" />

            {/* Simulation: Bloch Sphere with Gates */}
            <div style={{ margin: '2rem 0' }}>
              <HadamardGateSimulation />
            </div>

            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              The Hadamard gate also shows us the quantum interference. Interference arises from the relative phase differences between amplitudes. If we consider summing the Hadamard Basis states
            </p>
            <MathDisplay math="\frac{1}{\sqrt{2}}(|+\rangle + |-\rangle) = \frac{1}{2}(|0\rangle + |1\rangle) + \frac{1}{2}(|0\rangle - |1\rangle) = |0\rangle" />
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              the amplitudes of the <MathDisplay math="|1\rangle" inline={true} /> cancel due to destructive interference while the <MathDisplay math="|0\rangle" inline={true} /> interfere constructively.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[8]</a></sup> The Hadamard gate plays a key role in quantum computing as this is usually the first gate applied to systems at the start of algorithms.
            </p>

            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              Quantum algorithms are constructed by applying sequences of such quantum gates to evolve the system’s wavefunction over time. Each basis state of the system corresponds to a possible answer, and the amplitudes associated with these states describe the probability of observing each outcome upon measurement. This can be seen with the tensor products state vector
            </p>
            <MathDisplay math="\begin{pmatrix} 00 \\ 01 \\ 10 \\ 11 \end{pmatrix} = \begin{pmatrix} \alpha \\ \beta \\ \gamma \\ \delta \end{pmatrix}" />
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              Where we can assign a different answer to each state with a different probability amplitude(<MathDisplay math="\alpha, \beta, \gamma, \delta" inline={true} />). By designing a sequence of quantum gates, the algorithm causes amplitudes corresponding to correct solutions to interfere constructively, while amplitudes corresponding to incorrect solutions interfere destructively. This process dramatically increases the likelihood that a measurement yields the correct answer. However, designing these algorithms is incredibly difficult.
            </p>

            <h4 style={{ fontSize: '1.2rem', color: 'var(--color-highlight)', marginTop: '2rem', marginBottom: '0.5rem' }}>
              Grover's Algorithm
            </h4>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              An example of a quantum algorithm is Grover’s. This algorithm is used to accelerate database searching, where we want to find a unique item within an unsorted database. A classical computer would brute force the search, looking at each individual item until the correct is found. This results in a computational complexity of order O(N), meaning the average time the algorithm takes increases linearly with the number of items in the database.
            </p>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              A quantum computation can speed this computation up quadratically, reducing the search time to order <MathDisplay math="\sqrt{N}" inline={true} />.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[9]</a></sup>
            </p>

            <h4 style={{ fontSize: '1.2rem', color: 'var(--color-highlight)', marginTop: '2rem', marginBottom: '0.5rem' }}>
              Methodology
            </h4>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              The algorithm begins with all possible states having equal probability of occurring called a uniform superposition. Within this state space, we define a target solution as <MathDisplay math="w" inline={true} /> with all other solutions defined as <MathDisplay math="r" inline={true} />. We can apply a series of quantum gates which, when the correct solution is found, cause the sign of the associated amplitude to flip and when an incorrect solution is found, it remains unchanged. For example, if these states had the probability amplitudes <MathDisplay math="\alpha, \beta, \gamma, \delta" inline={true} />
            </p>
            <MathDisplay math="\begin{pmatrix} 00 \\ 01 \\ 10 \\ 11 \end{pmatrix} = \begin{pmatrix} r \\ r \\ w \\ r \end{pmatrix} = \begin{pmatrix} \alpha \\ \beta \\ \gamma \\ \delta \end{pmatrix}" />
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              After the series of gates was applied
            </p>
            <MathDisplay math="\begin{pmatrix} r \\ r \\ w \\ r \end{pmatrix} = \begin{pmatrix} \alpha \\ \beta \\ -\gamma \\ \delta \end{pmatrix}" />
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              This can be represented using a matrix called the Oracle Operator<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[9]</a></sup>
            </p>
            <MathDisplay math="U_f = \begin{pmatrix} -1 & 0 \\ 0 & 1 \end{pmatrix}" />
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              We can then apply another matrix to the wavevector called the Diffusion operator. This operator reflects the function about its initial state of uniform superposition. Given by the matrix
            </p>
            <MathDisplay math="D = \begin{pmatrix} \cos(2\theta) & \sin(2\theta) \\ \sin(2\theta) & -\cos(2\theta) \end{pmatrix}" />
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              Where <MathDisplay math="\theta" inline={true} /> is the angle between the uniform superposition state and all of the non-solution states.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[9]</a></sup> These two transformations are combined to form the Grover iteration <MathDisplay math="G = DU_f" inline={true} />, which is the key to this algorithm. The algorithm is repeatedly applied with each successive iteration constructively interferes with the <MathDisplay math="w" inline={true} /> state. This increases the probability of the system collapsing to this state upon measurement. After k iterations the probability of measuring the target state is given by
            </p>
            <MathDisplay math="P_k = \sin^2((2k+1)\theta)" />
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              Where the optimal number of solutions is given by <MathDisplay math="k \approx \frac{\pi}{4}\sqrt{N}" inline={true} />.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[9]</a></sup> By applying Grover’s Algorithm, we can find a solution of the order <MathDisplay math="O(\sqrt{N})" inline={true} /> in a much faster time than a classical of order <MathDisplay math="O(N)" inline={true} />.
            </p>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              For a more geometric interpretation of Grover’s Algorithm, watch this YouTube video by 3Blue1Brown on the topic:{' '}
              <a href="https://www.youtube.com/watch?v=RQWpF2Gb-gU&t=2s" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-finance)' }}>
                https://www.youtube.com/watch?v=RQWpF2Gb-gU&t=2s
              </a>
            </p>
          </div>
        )
      },
      {
        id: "applications",
        title: "Applications and Limitations",
        content: (
          <div>
            <h4 style={{ fontSize: '1.2rem', color: 'var(--color-highlight)', marginBottom: '0.5rem' }}>
              Advantages
            </h4>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              The core advantage of quantum computing is in quantum parallelism. In contrast to a classical computer which require separate runs to process different inputs, a quantum computer can evaluate a function across a combination of possible states simultaneously. A single quantum operation can act upon <MathDisplay math="2^n" inline={true} /> number of inputs for n number of qubits. While we cannot extract the result of every calculation, it allows algorithms to achieve a quadratic speedup (Grover’s) and some even an exponential speedup compared to regular computers.
            </p>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              Another advantage of quantum computers comes how they naturally encode high dimensional probability distributions into quantum states. Classical computers struggle to model complex stochastic systems such as stock market fluctuations or weather patterns due to the number of interacting variables. Quantum computers can use entanglement of qubits to create non-separable probability distributions which model these systems.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[6]</a></sup> This makes quantum computers run simulations of these systems where the interactions between variables are run with the quantum state itself rather than by approximations, which are used by classical computers.
            </p>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              Quantum computers are also well suited to optimisation. Optimisation involves finding a global minimum within a dataset, for example finding the lowest level of risk for a given rate of return in portfolio investing. This is an incredibly difficult task for classical computers, given large datasets where the total number of combinations is <MathDisplay math="\frac{(n-1)!}{2}" inline={true} />. Quantum computers can use parallelism to simulate many inputs simultaneously, reducing the time and computing power required. Furthermore, classical computers can risk becoming trapped in local minima, which means the algorithm fails to find the global minimum. Quantum computers can use quantum tunnelling to pass through the energy barriers allowing them to find the global minimum more efficiently.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[6]</a></sup>
            </p>

            <h4 style={{ fontSize: '1.2rem', color: 'var(--color-highlight)', marginTop: '2rem', marginBottom: '0.5rem' }}>
              Limitations
            </h4>
            <h5 style={{ fontSize: '1.05rem', color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>Hardware Fragility</h5>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              One of the main challenges in the development of quantum computers is decoherence. This is where a quantum system loses its quantum properties due to interactions with its environment. This causes the superposition of states of qubits to collapse into classical states. This is effectively measuring the system however the measurement is an uncontrolled premature interaction with the environment, making the output information useless.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[2]</a></sup> For a qubit to perform useful computations it must be isolated from the external environment, however in practice this is extremely difficult. The state can interact with its environment due to many influences including thermal fluctuations, electromagnetic radiation or even cosmic radiation. The quantum states are very delicate meaning even small disturbances can introduce errors.
            </p>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              There are two types of decoherence, energy relaxation and dephasing.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[10]</a></sup> Energy relaxation occurs when a qubit loses energy to the environment causing transitions from high to a lower energy state. For example, a spin up qubit may lose energy over time causing it to flip to the lower energy spin down state. Dephasing occurs when noise causes random fluctuations in the phase relationship between states. This effectively causes the interference to average out making the state classical.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[10]</a></sup> Techniques have been developed to reduce these errors including quantum error correction, dynamical decoupling and operating the qubits at extremely low temperatures, often a few mK above absolute zero.
            </p>

            <h5 style={{ fontSize: '1.05rem', color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>Not applicable to all tasks</h5>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              A common misconception in quantum computing is that quantum computers are a universally superior version of existing computers. This is not true and their advantages only apply to a limited number of problems. For most general tasks such as playing a game or making a website, quantum computers are no better than conventional computers, and they are much more expensive! The advantage to quantum computers are seen in problems where quantum mechanical effects can be exploited algorithmically. To expand the range of problems quantum computers can solve, more algorithms need to be discovered. These algorithms are extremely difficult to produce and despite decades of research only a small number have been produced.
            </p>

            <h5 style={{ fontSize: '1.05rem', color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>Scalability Challenges</h5>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              There are huge engineering challenges in building and running large scale quantum computers. To gain significant advantages in quantum computers many problems would likely require thousands of high-quality qubits reliably working together. Building and running these systems is extremely challenging. Firstly, qubits are kept at extremely low temperatures, completely isolated from external interactions. This requires extremely complex cryogenic systems which are very complex and expensive. As the number of qubits increases this challenge only becomes harder.
            </p>
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              Another major issue is error accumulation. Currently qubits are not high enough quality to perform algorithms, meaning a higher number must be used. This is because the qubits are imperfect and prone to error. As the number of qubits increase the errors compound limiting the usefulness of the computations.
            </p>
          </div>
        )
      }
    ],
    customContent: (
      <div>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
          Quantum Computing and AI
        </h2>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Currently finance is undergoing a transition through the accelerated integration of new technologies such as artificial intelligence (AI) and machine learning models. This transition will fundamentally change how information is processed and acted upon in financial markets.
        </p>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          In recent years, there has been a huge expansion in the development and implementation of AI across all of society, including the world of finance. Machine learning models are now widely used in portfolio optimisation, credit scoring and macroeconomic forecasting. By finding non-linear relationships between assets which classical models may overlook, machine learning can create more realistic models of market dynamics.
        </p>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          While artificial intelligence has already evolved the sector, quantum computing promises to revolutionise finance, with the potential to solve computational problems which currently push classical computing to its limits. By using the principles of superposition and entanglement, quantum computers could significantly improve areas in finance such as advanced risk profiling, modelling of market dynamics and optimising portfolios.
        </p>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          When managing risk, banks currently use Monte Carlo simulations to predict how markets may respond to economic shocks, such as a sudden rise in interest rates or a spike in oil prices.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[5]</a></sup> These simulations require a huge amount of computing power and time, making them extremely expensive. As a result, financial institutions running these simulations must compromise on the complexity of these calculations.
        </p>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          However, quantum computers can run many possible simulation outcomes simultaneously. By generating a probability distribution of all possible outcomes, including those which classical may discard, quantum computing allows for more complete and accurate assessments of risk.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[6]</a></sup>
        </p>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Another application of this technology is in modelling contagion effects, where the behaviour of one actor in an interconnected system influences others.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[5]</a></sup> Classical models struggle to model such dynamics at a large scale. Quantum computing is inherently designed to represent interacting particles and are well suited to model this type of behaviour.
        </p>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          In financial markets this approach can be used to model panic driven behaviour where investor selloff triggers others to follow.
        </p>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Portfolio optimisation is another application of this technology in finance. Investment firms aim to maximise returns for a given level of risk, but this is an extremely complex problem. Balancing real life constraints such as market volatility and liquidity into these portfolios increases complexity further.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[5]</a></sup> Classical computing limits how quickly firms can rebalance portfolios in response to changing market conditions. Quantum computers can use their ability to identify optimal solutions from a large number of possible combinations to improve portfolio optimisation.<sup><a href="#reference-section" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontSize: '0.8rem' }}>[6]</a></sup> This includes better diversification, faster responses to market volatility and portfolios more aligned with individual investor preferences.
        </p>
      </div>
    )
  }
];
