import { useState, useEffect } from 'react';
import Timeline from './components/Timeline';
import ContentPanel from './components/ContentPanel';
import Glossary from './components/Glossary';
import Resources from './components/Resources';
import ComparisonChart from './components/ComparisonChart';
import { timelineEvents } from './data/timelineEvents.jsx';
import HeroSection from './components/HeroSection';
import About from './components/About';
import Quiz from './components/Quiz';
import './App.css';

function App() {
  const [activeEvent, setActiveEvent] = useState(null);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);

  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [filterType, setFilterType] = useState('All');
  const [theme, setTheme] = useState('system');
  const [isScrolled, setIsScrolled] = useState(false);

  // Apply Theme
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'system') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', theme);
    }
  }, [theme]);

  // Scroll Listener with Hysteresis to prevent flickering
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Scrolled down past 200px -> Compact mode
      if (scrollY > 200 && !isScrolled) {
        setIsScrolled(true);
      }
      // Scrolled back up past 150px -> Expanded mode
      // Using a lower threshold for expanding ensures clarity when nearly at top
      else if (scrollY < 150 && isScrolled) {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  // Toggle function
  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'system') return 'light';
      if (prev === 'light') return 'dark';
      return 'system';
    });
  };

  const filteredEvents = filterType === 'All'
    ? timelineEvents
    : timelineEvents.filter(e => e.visualType === filterType || (filterType === 'interactive-list' && e.id === 'now'));

  const handleEventSelect = (event) => {
    if (activeEvent && activeEvent.id === event.id) {
      // Optional toggle off logic
    }
    setActiveEvent(event);
  };

  const handleClose = () => {
    setActiveEvent(null);
  };

  return (
    <div style={{
      width: '100%', // Fix: Ensure full width despite margin: 0 auto
      maxWidth: '100%',
      margin: '0 auto',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--color-bg)'
    }}>
      {/* Sticky Glass Header */}
      <header className="glass-header" style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        padding: '0.5rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease, border-bottom 0.4s ease',
        background: isScrolled ? 'var(--gradient-header)' : 'transparent',
        backdropFilter: isScrolled ? 'var(--backdrop-blur)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'var(--backdrop-blur)' : 'none',
        boxShadow: isScrolled ? 'var(--shadow-md)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--color-border)' : '1px solid transparent'
      }}>

        {/* Top Utility Bar */}
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{
            fontWeight: 600,
            fontSize: '0.9rem',
            color: 'var(--color-text-tertiary)',
            opacity: isScrolled ? 0 : 1, // Fade out logo text on scroll
            width: isScrolled ? 0 : 'auto',
            overflow: 'hidden',
            transition: 'opacity 0.3s ease, width 0.4s ease'
          }}>
            PiS DMP
          </div>

          {/* Center Title - Appears when Scrolled */}
          <div style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            fontWeight: 600,
            fontSize: '1.2rem',
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-display)',
            opacity: isScrolled ? 1 : 0,
            pointerEvents: isScrolled ? 'auto' : 'none',
            transition: 'opacity 0.4s ease'
          }}>
            Physics in Finance
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginLeft: 'auto' }}>
            <button
              onClick={toggleTheme}
              style={{
                padding: '0.4rem 0.8rem',
                background: 'var(--color-surface-hover)',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                color: 'var(--color-text-secondary)',
                cursor: 'pointer',
                fontSize: '0.8rem',
                transition: 'all 0.2s ease',
                minWidth: '60px'
              }}
            >
              {theme === 'system' ? 'Auto' : theme === 'light' ? 'Light' : 'Dark'}
            </button>
            <button
              onClick={() => {
                setIsComparisonOpen(true);
                setIsResourcesOpen(false);
                setIsGlossaryOpen(false);
                setIsAboutOpen(false);
                setIsQuizOpen(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-text-secondary)',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 500
              }}
            >
              Comparison
            </button>
            <button
              onClick={() => {
                setIsResourcesOpen(true);
                setIsGlossaryOpen(false);
                setIsComparisonOpen(false);
                setIsAboutOpen(false);
                setIsQuizOpen(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-text-secondary)',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 500
              }}
            >
              Resources
            </button>
            <button
              onClick={() => {
                setIsGlossaryOpen(true);
                setIsResourcesOpen(false);
                setIsComparisonOpen(false);
                setIsAboutOpen(false);
                setIsQuizOpen(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-text-secondary)',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 500
              }}
            >
              Glossary
            </button>
            <button
              onClick={() => {
                setIsAboutOpen(true);
                setIsResourcesOpen(false);
                setIsGlossaryOpen(false);
                setIsComparisonOpen(false);
                setIsQuizOpen(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-text-secondary)',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 500
              }}
            >
              About Us!
            </button>
            <button
              onClick={() => {
                setIsQuizOpen(true);
                setIsAboutOpen(false);
                setIsResourcesOpen(false);
                setIsGlossaryOpen(false);
                setIsComparisonOpen(false);
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid var(--color-accent)',
                color: 'var(--color-accent)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600,
                padding: '0.4rem 1rem',
                borderRadius: '20px',
                marginLeft: '1rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 0 10px var(--color-accent-glow)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 0 15px var(--color-accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 0 10px var(--color-accent-glow)';
              }}
            >
              Quiz 🧠
            </button>
          </div>
        </div>
      </header >

      <HeroSection />

      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '100%', // Full width
        margin: '0 auto',
        padding: '2rem'
      }}>


        <div id="timeline-section" style={{ scrollMarginTop: '100px' }}>
          <Timeline
            events={timelineEvents}
            activeEvent={activeEvent}
            onEventSelect={handleEventSelect}
            filterType={filterType}
            setFilterType={setFilterType}
          />
        </div>

        <div id="content-panel-section">
          <ContentPanel
            activeEvent={activeEvent}
            onClose={handleClose}
          />
        </div>

        {!activeEvent && (
          <div style={{
            textAlign: 'center',
            marginTop: '6rem',
            color: 'var(--color-text-tertiary)',
            opacity: 0.6
          }}>
            <p style={{ fontSize: '1.2rem', fontWeight: 300 }}>Select a timeline node to explore the physics behind financial history.</p>
          </div>
        )}
      </main>

      <Glossary isOpen={isGlossaryOpen} onClose={() => setIsGlossaryOpen(false)} />
      <About isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <Quiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
      <Resources
        isOpen={isResourcesOpen}
        onClose={() => setIsResourcesOpen(false)}
        onNavigate={(eventId) => {
          const event = timelineEvents.find(e => e.id === eventId);
          if (event) {
            setActiveEvent(event);
            setIsResourcesOpen(false);
            // Small timeout to allow modal to close first
            setTimeout(() => {
              const element = document.getElementById('content-panel-section');
              if (element) {
                const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - (window.innerHeight * 0.15);

                // Custom Smooth Scroll Function
                const startPosition = window.scrollY;
                const distance = offsetPosition - startPosition;
                const duration = 1500; // 1.5 seconds for a slower, smoother feel
                let start = null;

                const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

                const step = (timestamp) => {
                  if (!start) start = timestamp;
                  const progress = timestamp - start;
                  const percentage = Math.min(progress / duration, 1);

                  window.scrollTo(0, startPosition + distance * easeInOutCubic(percentage));

                  if (progress < duration) {
                    window.requestAnimationFrame(step);
                  }
                };

                window.requestAnimationFrame(step);
              }
            }, 100);
          }
        }}
      />
      <ComparisonChart
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        onNavigate={(eventId) => {
          const event = timelineEvents.find(e => e.id === eventId);
          if (event) {
            setActiveEvent(event);
            setIsComparisonOpen(false);
            // Small timeout to allow modal to close first
            setTimeout(() => {
              const element = document.getElementById('content-panel-section');
              if (element) {
                const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - (window.innerHeight * 0.15);

                // Custom Smooth Scroll Function
                const startPosition = window.scrollY;
                const distance = offsetPosition - startPosition;
                const duration = 1500; // 1.5 seconds for a slower, smoother feel
                let start = null;

                const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

                const step = (timestamp) => {
                  if (!start) start = timestamp;
                  const progress = timestamp - start;
                  const percentage = Math.min(progress / duration, 1);

                  window.scrollTo(0, startPosition + distance * easeInOutCubic(percentage));

                  if (progress < duration) {
                    window.requestAnimationFrame(step);
                  }
                };

                window.requestAnimationFrame(step);
              }
            }, 100);
          }
        }}
      />

      <footer style={{
        textAlign: 'center',
        marginTop: '6rem',
        borderTop: '1px solid var(--color-border)',
        padding: '3rem',
        color: 'var(--color-text-tertiary)',
        fontSize: '0.85rem'
      }}>
        <p>© {new Date().getFullYear()} Physics in Finance Digital Media Project by Alicia Lamplugh, Ben Bigwood, Will Kitching, Will Murray, and Alex Wilkinson</p>
      </footer>
    </div >
  );
}

export default App;
