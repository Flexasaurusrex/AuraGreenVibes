'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DinoGame from './DinoGame';

export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showEnter, setShowEnter] = useState(false);
  const [entered, setEntered] = useState(false);
  const [openWindows, setOpenWindows] = useState([]);
  const [dinoJump, setDinoJump] = useState(false);

  // Show Enter button after a delay
  useEffect(() => {
    setTimeout(() => {
      setShowEnter(true);
    }, 2000); // Button appears after 2 seconds
  }, []);

  // Dino jump animation
  useEffect(() => {
    if (loading) {
      const jumpInterval = setInterval(() => {
        setDinoJump(true);
        setTimeout(() => setDinoJump(false), 500);
      }, 1500);
      return () => clearInterval(jumpInterval);
    }
  }, [loading]);

  const projects = [
    {
      id: 'lighterpro',
      title: 'LighterPro',
      icon: '🔥',
      description: 'Real-time liquidation tracker for crypto traders',
      tech: 'Next.js • Chrome Extension • WebSockets',
      links: { live: 'https://lighterpro.vercel.app', github: '#' }
    },
    {
      id: 'feylon',
      title: 'Feylon',
      icon: '👁️',
      description: 'Web3 reward distribution system with viral mechanics',
      tech: 'React • Blockchain • Token Distribution',
      links: { live: '#', github: '#' }
    },
    {
      id: 'seen',
      title: 'SEEN',
      icon: '🎨',
      description: 'Anti-marketplace NFT gallery - being seen is enough',
      tech: 'Next.js • NFT APIs • Web3',
      links: { live: 'https://tobeseen.xyz', github: '#' }
    },
    {
      id: 'artclaps',
      title: 'Art Claps',
      icon: '👏',
      description: 'Farcaster-native artist platform',
      tech: 'Farcaster • Social Mechanics • React',
      links: { live: '#', github: '#' }
    },
    {
      id: 'vonmesser',
      title: 'VONMESSER Design',
      icon: '🌊',
      description: 'Premium tourism websites for Albanian Riviera',
      tech: 'Next.js • E-commerce • Custom CMS',
      links: { live: '#', github: '#' }
    },
    {
      id: 'dinogame',
      title: 'Dino Game',
      icon: '🦖',
      description: 'Play the classic Chrome dino game!',
      tech: 'Canvas • JavaScript • Pure Fun',
      isGame: true
    },
    {
      id: 'about',
      title: 'About Me',
      icon: '🦖',
      description: 'The builder behind AuraGreen',
      tech: '',
      content: `> AURAGREEN_CODING

Top 0.5% builder on Replit
59 projects shipped
14 live products
38K+ app views

Like the Chrome dino that never stops running,
I keep building until it works.

12 years running profitable businesses.
Now building Web3 tools, trading platforms,
and premium web experiences.

Available for contract work.`
    },
    {
      id: 'contact',
      title: 'Contact',
      icon: '📬',
      description: 'Let\'s build something',
      tech: '',
      content: `> CONTACT_

GitHub: github.com/yourusername
Twitter: @yourusername
Email: your@email.com

Available for:
• Web3 MVPs (4-6 week sprints)
• Trading Tools & Analytics
• Premium Web Development

Day rate: Contact for quote
Project-based available

Let's build. 🦖`
    }
  ];

  const openWindow = (project) => {
    if (!openWindows.find(w => w.id === project.id)) {
      setOpenWindows([...openWindows, { ...project, x: Math.random() * 200, y: Math.random() * 100 }]);
    }
  };

  const closeWindow = (projectId) => {
    setOpenWindows(openWindows.filter(w => w.id !== projectId));
  };

  if (loading && !entered) {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        background: '#1A1A1A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Press Start 2P", monospace',
        overflow: 'hidden',
        gap: '40px'
      }}>
        {/* Title */}
        <div style={{
          fontSize: '24px',
          color: '#8BC34A',
          textShadow: '0 0 20px rgba(139, 195, 74, 0.5)',
          letterSpacing: '3px',
          marginBottom: '-20px'
        }}>
          AURAGREEN CODING
        </div>

        {/* Playable Dino Game */}
        <DinoGame autoStart={true} onReady={() => {
          setTimeout(() => setShowEnter(true), 2000);
        }} />

        {/* Instructions */}
        <div style={{
          fontSize: '10px',
          color: '#558B2F',
          letterSpacing: '2px',
          textAlign: 'center',
          marginTop: '-20px'
        }}>
          PRESS SPACE TO JUMP<br/>
          🦖 NEVER STOPS RUNNING 🦖
        </div>

        {/* Enter button */}
        <AnimatePresence>
          {showEnter && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEntered(true)}
              style={{
                marginTop: '40px',
                padding: '15px 40px',
                fontSize: '16px',
                background: '#8BC34A',
                border: '3px solid #558B2F',
                color: '#1A1A1A',
                cursor: 'pointer',
                fontFamily: '"Press Start 2P", monospace',
                boxShadow: '0 4px 0 #558B2F, 0 0 20px rgba(139, 195, 74, 0.5)',
                transition: 'all 0.1s',
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'translateY(4px)';
                e.currentTarget.style.boxShadow = '0 0 0 #558B2F, 0 0 20px rgba(139, 195, 74, 0.5)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 0 #558B2F, 0 0 20px rgba(139, 195, 74, 0.5)';
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#9CCC65';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#8BC34A';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 0 #558B2F, 0 0 20px rgba(139, 195, 74, 0.5)';
              }}
            >
              ENTER
            </motion.button>
          )}
        </AnimatePresence>

        {/* Signature */}
        <div style={{
          position: 'absolute',
          bottom: '30px',
          fontSize: '10px',
          color: '#558B2F',
          letterSpacing: '3px'
        }}>
          AURAGREEN CODING
        </div>
      </div>
    );
  }

  // Desktop view
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(180deg, #F5F5DC 0%, #E8E8D0 100%)',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '"Press Start 2P", monospace',
      cursor: 'url("data:image/svg+xml,%3Csvg width=\'24\' height=\'24\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0 L0 16 L4 12 L7 19 L9 18 L6 11 L12 11 Z\' fill=\'black\' stroke=\'white\' stroke-width=\'1\'/%3E%3C/svg%3E") 0 0, auto'
    }}>
      {/* Menu bar */}
      <div style={{
        height: '30px',
        background: '#1A1A1A',
        borderBottom: '2px solid #8BC34A',
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
        gap: '20px',
        fontSize: '10px',
        color: '#8BC34A',
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/Dino.png" alt="Dino" style={{ width: '20px', height: '21px', imageRendering: 'pixelated' }} />
          AURAGREEN
        </span>
        <span style={{ opacity: 0.5 }}>|</span>
        <span style={{ cursor: 'pointer' }}>FILE</span>
        <span style={{ cursor: 'pointer' }}>EDIT</span>
        <span style={{ cursor: 'pointer' }}>VIEW</span>
        <span style={{ cursor: 'pointer' }}>PROJECTS</span>
        <span style={{ marginLeft: 'auto', opacity: 0.7 }}>
          {new Date().toLocaleTimeString()}
        </span>
      </div>

      {/* Desktop icons */}
      <div style={{
        padding: '40px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 120px)',
        gap: '30px',
        height: 'calc(100vh - 30px)',
        overflowY: 'auto'
      }}>
        {projects.map(project => (
          <div
            key={project.id}
            onClick={() => openWindow(project)}
            style={{
              width: '100px',
              height: '100px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              padding: '10px',
              borderRadius: '8px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(139, 195, 74, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <div style={{ fontSize: '40px', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
              {project.icon === '🦖' ? (
                <img src="/Dino.png" alt="Dino" style={{ width: '40px', height: '42px', imageRendering: 'pixelated' }} />
              ) : (
                project.icon
              )}
            </div>
            <div style={{
              fontSize: '8px',
              color: '#1A1A1A',
              textAlign: 'center',
              lineHeight: '12px',
              textShadow: '1px 1px 2px rgba(255,255,255,0.8)'
            }}>
              {project.title}
            </div>
          </div>
        ))}
      </div>

      {/* Windows */}
      {openWindows.map(window => (
          <div key={window.id} style={{
            position: 'absolute',
            left: `${100 + window.x}px`,
            top: `${100 + window.y}px`,
            width: '500px',
            minHeight: '300px',
            background: '#FFFFFF',
            border: '3px solid #558B2F',
            boxShadow: '8px 8px 0 rgba(0,0,0,0.3)',
            zIndex: 1000
          }}>
            {/* Window header */}
            <div
              className="window-header"
              style={{
                height: '35px',
                background: 'linear-gradient(180deg, #8BC34A 0%, #558B2F 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 10px',
                cursor: 'default',
                borderBottom: '2px solid #558B2F'
              }}
            >
              <div style={{ fontSize: '10px', color: '#1A1A1A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>{window.icon}</span>
                <span>{window.title}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => closeWindow(window.id)}
                  style={{
                    width: '20px',
                    height: '20px',
                    background: '#FF5252',
                    border: '2px solid #C62828',
                    cursor: 'pointer',
                    fontSize: '10px',
                    color: '#FFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold'
                  }}
                >
                  ×
                </button>
              </div>
            </div>

            {/* Window content */}
            <div style={{
              padding: '20px',
              background: '#1A1A1A',
              color: '#00FF00',
              fontSize: '10px',
              lineHeight: '18px',
              fontFamily: '"Courier New", monospace',
              minHeight: '250px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: window.isGame ? 'center' : 'flex-start',
              justifyContent: window.isGame ? 'center' : 'flex-start'
            }}>
              {window.isGame ? (
                <DinoGame autoStart={false} />
              ) : window.content ? (
                <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{window.content}</pre>
              ) : (
                <>
                  <div style={{ marginBottom: '15px', color: '#8BC34A' }}>
                    &gt; {window.title.toUpperCase()}_
                  </div>
                  <div style={{ marginBottom: '15px', color: '#FFFFFF' }}>
                    {window.description}
                  </div>
                  {window.tech && (
                    <div style={{ marginBottom: '15px', color: '#00FF00' }}>
                      TECH: {window.tech}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    {window.links?.live && (
                      <a
                        href={window.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '8px 16px',
                          background: '#8BC34A',
                          color: '#1A1A1A',
                          textDecoration: 'none',
                          border: '2px solid #558B2F',
                          cursor: 'pointer',
                          fontSize: '8px'
                        }}
                      >
                        [LIVE SITE]
                      </a>
                    )}
                    {window.links?.github && (
                      <a
                        href={window.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '8px 16px',
                          background: '#558B2F',
                          color: '#FFFFFF',
                          textDecoration: 'none',
                          border: '2px solid #8BC34A',
                          cursor: 'pointer',
                          fontSize: '8px'
                        }}
                      >
                        [GITHUB]
                      </a>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
      ))}
    </div>
  );
}
