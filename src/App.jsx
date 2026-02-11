import { useState, useEffect } from 'react';
import Timeline from './components/Timeline';
import ContentPanel from './components/ContentPanel';
import Glossary from './components/Glossary';
import Resources from './components/Resources';
import { timelineEvents } from './data/timelineEvents.jsx';
import HeroSection from './components/HeroSection';
import './App.css';

function App() {
  const [activeEvent, setActiveEvent] = useState(null);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
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
        padding: '0.75rem 2rem',
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
              onClick={() => setIsResourcesOpen(true)}
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
              onClick={() => setIsGlossaryOpen(true)}
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

        <Timeline
          events={timelineEvents}
          activeEvent={activeEvent}
          onEventSelect={handleEventSelect}
          filterType={filterType}
          setFilterType={setFilterType}
        />

        <ContentPanel
          activeEvent={activeEvent}
          onClose={handleClose}
        />

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
      <Resources isOpen={isResourcesOpen} onClose={() => setIsResourcesOpen(false)} />

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
