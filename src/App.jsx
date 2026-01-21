import { useState } from 'react';
import Timeline from './components/Timeline';
import ContentPanel from './components/ContentPanel';
import Glossary from './components/Glossary';
import Resources from './components/Resources';
import { timelineEvents } from './data/timelineEvents';

function App() {
  const [activeEvent, setActiveEvent] = useState(null);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [filterType, setFilterType] = useState('All');

  // const physicstypes = ['All', ...new Set(timelineEvents.map(e => e.visualType))];

  const filteredEvents = filterType === 'All'
    ? timelineEvents
    : timelineEvents.filter(e => e.visualType === filterType || (filterType === 'interactive-list' && e.id === 'now'));

  const handleEventSelect = (event) => {
    if (activeEvent && activeEvent.id === event.id) {
      // Optional toggle logic
    }
    setActiveEvent(event);
  };

  const handleClose = () => {
    setActiveEvent(null);
  };

  return (
    <div style={{
      maxWidth: '1440px',
      margin: '0 auto',
      padding: 'var(--spacing-md)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <header style={{
        textAlign: 'center',
        marginBottom: 'var(--spacing-lg)',
        paddingTop: 'var(--spacing-lg)',
        position: 'relative'
      }}>
        <div style={{ position: 'absolute', top: 0, right: 0, display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setIsResourcesOpen(true)}
            style={{
              padding: '0.5rem 1rem',
              background: 'transparent',
              border: '1px solid var(--color-accent)',
              color: 'var(--color-accent)',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: 'var(--font-display)',
              fontSize: '0.9rem'
            }}
          >
            Resources
          </button>
          <button
            onClick={() => setIsGlossaryOpen(true)}
            style={{
              padding: '0.5rem 1rem',
              background: 'transparent',
              border: '1px solid var(--color-accent)',
              color: 'var(--color-accent)',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: 'var(--font-display)',
              fontSize: '0.9rem'
            }}
          >
            Glossary
          </button>
        </div>

        <h1 style={{
          fontSize: '3rem',
          marginBottom: 'var(--spacing-xs)',
          background: 'linear-gradient(to right, #f1f5f9, #94a3b8)',
          display: 'inline-block',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'white'
        }}>
          PHYSICS IN FINANCE
        </h1>
        <p style={{ color: 'var(--color-accent)', letterSpacing: '2px', textTransform: 'uppercase' }}>
          From Speculation to Simulation
        </p>

        {/* Filter Controls */}
        <div style={{ marginTop: 'var(--spacing-md)', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{
              padding: '0.5rem',
              borderRadius: '4px',
              background: 'var(--color-surface)',
              color: 'var(--color-text-primary)',
              border: '1px solid var(--color-surface-hover)'
            }}
          >
            <option value="All">All Concepts</option>
            {/* We can map unique physicsConnections or visualTypes */}
            {Array.from(new Set(timelineEvents.map(e => e.visualType))).map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </header>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Timeline
          events={filteredEvents}
          activeEvent={activeEvent}
          onEventSelect={handleEventSelect}
        />

        <ContentPanel
          activeEvent={activeEvent}
          onClose={handleClose}
        />

        {!activeEvent && (
          <div style={{
            textAlign: 'center',
            marginTop: 'var(--spacing-xl)',
            color: 'var(--color-text-secondary)',
            opacity: 0.5
          }}>
            <p>Select a node on the timeline to explore.</p>
          </div>
        )}
      </main>

      <Glossary isOpen={isGlossaryOpen} onClose={() => setIsGlossaryOpen(false)} />
      <Resources isOpen={isResourcesOpen} onClose={() => setIsResourcesOpen(false)} />

      <footer style={{
        textAlign: 'center',
        marginTop: 'var(--spacing-lg)',
        color: 'var(--color-text-secondary)',
        fontSize: '0.8rem',
        padding: 'var(--spacing-md)'
      }}>
        <p>© {new Date().getFullYear()} Physics in Finance Educational Project</p>
      </footer>
    </div>
  );
}

export default App;
