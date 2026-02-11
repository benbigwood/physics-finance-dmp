
import numpy as np

def simulate_paths(S0, mu, sigma, T, dt, N, seed=None):
    """
    Simulates N paths of arithmetic Brownian motion using vectorized operations.
    S_{i+1} = S_i + mu*dt + sigma*sqrt(dt)*Z_i
    """
    if seed is not None:
        np.random.seed(seed)
    
    steps = int(T / dt)
    t = np.linspace(0, T, steps + 1)
    
    # Pre-calculate steps
    drift = mu * dt
    diffusion = sigma * np.sqrt(dt)
    
    # Generate random shocks Z ~ N(0,1)
    # Shape: (N, steps)
    Z = np.random.normal(0, 1, size=(N, steps))
    
    # Calculate increments dS
    # dS = drift + diffusion * Z
    dS = drift + diffusion * Z
    
    # Cumulative sum to get paths starting from 0, then add S0
    path_increments = np.hstack((np.zeros((N, 1)), dS)) # Prepend 0 for initial state
    S = S0 + np.cumsum(path_increments, axis=1)
        
    return t, S

def theoretical_pdf(x, t, S0, mu, sigma):
    """
    Theoretical PDF for ABM at time t.
    p(x,t) ~ N(S0 + mu*t, sigma^2 * t)
    """
    if t <= 0:
        # At t=0, it's a delta function, handled elsewhere or returns infinity/bounds
        return np.zeros_like(x)
        
    mean = S0 + mu * t
    variance = (sigma ** 2) * t
    std_dev = np.sqrt(variance)
    
    if std_dev == 0:
        return np.zeros_like(x)

    return (1 / (std_dev * np.sqrt(2 * np.pi))) * np.exp(-0.5 * ((x - mean) / std_dev) ** 2)

def theoretical_stats(t, S0, mu, sigma):
    """
    Returns theoretical mean and variance at time t.
    """
    mean = S0 + mu * t
    variance = (sigma ** 2) * t
    return mean, variance
