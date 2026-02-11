
import os

file_path = r'c:\Users\benjb\OneDrive\Documents\PiS DMP\src\data\timelineEvents.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Verify the target lines to be absolutely sure
start_line = 456 # 1-based 457
end_line = 513   # 1-based 513

# New content
new_content = r"""    customContent: (
      <div>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
          The Man Who Measured the Roughness
        </h2>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Educated at the École Polytechnique and California Institute of Technology, mathematician Benoit Mandelbrot was not drawn to the elegance and simplicity that many of his peers sought after in their mathematical solution. Later, as a Professor of Mathematics at Yale University and IBM Fellow Emeritus, Mandelbrot had the freedom to pursue unconventional problems. The seemingly irregular, messy, disordered and noisy problems that refused to be smoothed out and simplified captivated him.
        </p>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Where many mathematicians saw error and uncertainty, Mandelbrot believed there was an order within randomness and an underlying structure, waiting to be understood. Benoit had questions about the shapes of clouds, trees mountains and coastlines structures mathematics struggled to described. Why does a coastline grow longer and longer the more precisely it’s measured? Why does the structure of a tree repeat itself as you zoom in? His questions about the structure of nature would soon lead him to redefine the mathematics of financial phenomena.
        </p>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Mandelbrot’s description of these structural phenomena was named ‘fractals’: shapes that repeated themselves endlessly with self-similarity and a fractal dimension that exists between integer topological dimensions to define a shapes complexity. His ideas were collected in the “Fractal Geometry of Nature”, showing that irregularity was not a defect but an intrinsic property of nature itself.
        </p>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Mandelbrot turned his focus to the financial world drawing parallels with markets and the roughness he saw in nature. A price chart showed similar patterns irrespective of the time scale, whether it be measured over days, weeks or years. Extreme events repeated and the same patterns re-emerged time after time.
        </p>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Mandelbrot argued that markets were fractal, exhibiting the same order beneath their jagged and seemingly unexplainable nature. Markets were not governed by smooth equilibrium but by a hidden structure beneath their unpredictable behaviour. Mandelbrot challenged the basics of traditional financial theory and reconsidered the ideas of risk, stability and uncertainty. Price changes did not follow the Gaussian distribution they were believed to by the current financial model. Mandelbrot argued they followed power laws and large price changes occurred far more frequently than traditional theory predicted. Jumps greater than five standard deviations were occurring every few years in market data rather than after thousands of years like the traditional theory predicted. Eugene Fama later confirmed stock returns showed much fatter tails than the normal distribution would account for. Mandelbrot then challenged the notion of a gaussian distribution, arguing that smooth Brownian motion was insufficient to describe a markets turbulence and that it was better described by anomalous diffusion which was like turbulent systems in statistical physics. Characterised by volatility clustering, like turbulence in fluids, large changes follow large changes and small changes follow small changes.
        </p>

        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Although the work of Mandelbrot would not allow prices to be predicted it did hold great value elsewhere. He showed instability was inherent to financial systems and crashes were structurally inevitable which challenged the foundations of the Efficient Market Hypothesis and highlighted the limitations of standard risk measures.
        </p>
      </div>
    ),
    derivationContent: (
      <div>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
          Self-Similarity and the Hurst Exponent
        </h2>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          A non-trivial stochastic process <MathDisplay math="X=(X_t, t \ge 0)" inline={true} /> on <MathDisplay math="\mathbb{R}" inline={true} /> is said to be self-similar if for any <MathDisplay math="a > 0" inline={true} /> there exists a <MathDisplay math="H > 0" inline={true} /> such that
        </p>
        <MathDisplay math="(X_{at}, t > 0) \stackrel{d}{=} (a^H X_t, t > 0) \quad \text{(1)}" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          where <MathDisplay math="\stackrel{d}{=}" inline={true} /> means equal in distribution. The Hurst exponent is used as a measure of long term memory of time series. Equation (1) is the mathematical foundation of a fractal time series which exhibits self-similarity. This is in the financial world because price series are fractal. i.e. the statistical properties of price fluctuations are the same after rescaling the time axis.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Defining the return over lagtime <MathDisplay math="\Delta t" inline={true} /> to be
        </p>
        <MathDisplay math="r_{\Delta t}(t) = X(t + \Delta t) - X(t) \quad \text{(2)}" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Using the self-similarity of price equation (1) we obtain
        </p>
        <MathDisplay math="r_{a\tau} \stackrel{d}{=} a^H r_{\tau}" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          where <MathDisplay math="\tau" inline={true} /> is the basic time unit measured (e.g 1 day, 1 week, etc). Let us consider <MathDisplay math="r_{a\tau} \stackrel{d}{=} a^H r_{\tau}" inline={true} />. Assuming stationary increments
        </p>
        <MathDisplay math="X(t + a\tau) - X(t) \stackrel{d}{=} X(a\tau) - X(0) \stackrel{d}{=} a^H(X(\tau) - X(0))" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Squaring LHS AND RHS
        </p>
        <MathDisplay math="(\Delta_{a\tau} X(t))^2 = a^{2H} (\Delta_{\tau} X(t))^2" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Taking expectations
        </p>
        <MathDisplay math="E[|\Delta_{a\tau} X(t)|^2] = a^{2H} E[|\Delta_{\tau} X(t)|^2]" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Hence
        </p>
        <MathDisplay math="E[\Delta X^2] \propto \Delta t^{2H} \quad \text{(3)}" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Which is analogous to diffusion in physics. The Hurst Exponent shows:
        </p>
        <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
          <li><MathDisplay math="H > 0.5" inline={true} />, roughly shows a trending market.</li>
          <li><MathDisplay math="H < 0.5" inline={true} />, roughly shows sideways market.</li>
          <li><MathDisplay math="H = 0.5" inline={true} /> indicates a random walk where prediction cannot be based on past data.</li>
        </ul>
        
        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-accent)', marginTop: '2rem', marginBottom: '1rem' }}>
          Power Laws
        </h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Fractals described how the market looks the same at all scales, it has no characteristic scale and has the same statistical structure at different scales. Mandelbrot proposed that the distribution of price changes had fat tails which were described by Power laws where the probability of a large price change <MathDisplay math="|r|" inline={true} /> is given by
        </p>
        <MathDisplay math="P(|r| > x) \sim x^{-\alpha} \quad \text{(4)}" />
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          where <MathDisplay math="x" inline={true} /> is large. This was consistent with scale invariant fractal behavior.
        </p>
      </div>
    )
"""

# Append newline at the end of replacement if needed
if not new_content.endswith('\n'):
    new_content += "\n"

new_lines = []
for line in new_content.splitlines():
   new_lines.append(line + '\n')

# Check if last line of new_content ended with newline in the multi-line string. 
# splitlines() removes them unless keepends=True.
new_lines = new_content.splitlines(keepends=True)

# Replace
lines[456:513] = new_lines

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("Successfully updated timelineEvents.jsx")
