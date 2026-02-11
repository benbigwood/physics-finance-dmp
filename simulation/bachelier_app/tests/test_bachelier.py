
import unittest
import numpy as np
from models.bachelier import simulate_paths, theoretical_stats

class TestBachelierSimulation(unittest.TestCase):
    
    def test_no_drift_statistics(self):
        """
        Verify that for large N, empirical mean/var approach theoretical values (No Drift).
        """
        S0 = 100
        mu = 0
        sigma = 20
        T = 1.0
        dt = 0.01
        N = 10000 
        seed = 42
        
        t, S = simulate_paths(S0, mu, sigma, T, dt, N, seed)
        S_T = S[:, -1]
        
        emp_mean = np.mean(S_T)
        emp_var = np.var(S_T)
        
        theo_mean, theo_var = theoretical_stats(T, S0, mu, sigma)
        
        # Mean should be close to S0 (100)
        self.assertAlmostEqual(emp_mean, theo_mean, delta=1.0) # Within 1% of S0 approx
        
        # Variance should be close to sigma^2 * T = 400
        # For N=10000, standard error of variance is higher, so delta needs to be reasonable
        self.assertAlmostEqual(emp_var, theo_var, delta=20.0) # Within 5% approx

    def test_with_drift_statistics(self):
        """
        Verify that for large N, empirical mean/var approach theoretical values (With Drift).
        """
        S0 = 100
        mu = 10
        sigma = 20
        T = 1.0
        dt = 0.01
        N = 10000 
        seed = 42
        
        t, S = simulate_paths(S0, mu, sigma, T, dt, N, seed)
        S_T = S[:, -1]
        
        emp_mean = np.mean(S_T)
        emp_var = np.var(S_T)
        
        theo_mean, theo_var = theoretical_stats(T, S0, mu, sigma)
        
        # Mean should be close to S0 + mu*T = 110
        self.assertAlmostEqual(emp_mean, theo_mean, delta=1.0)
        
        # Variance should be close to sigma^2 * T = 400
        self.assertAlmostEqual(emp_var, theo_var, delta=20.0)

if __name__ == '__main__':
    unittest.main()
