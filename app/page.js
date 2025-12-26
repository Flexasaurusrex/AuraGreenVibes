'use client';

import { useState, useEffect, useCallback } from 'react';
import DinoGame from './DinoGame';

export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  const [showEnter, setShowEnter] = useState(false);
  const [entered, setEntered] = useState(false);
  const [openWindows, setOpenWindows] = useState([]);
  const [minimizedWindows, setMinimizedWindows] = useState([]);
  const [iconPositions, setIconPositions] = useState({});
  const [draggingIcon, setDraggingIcon] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hasDragged, setHasDragged] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [lastClickedIcon, setLastClickedIcon] = useState(null);
  const [trashedItems, setTrashedItems] = useState([]);
  const [isTrashHovered, setIsTrashHovered] = useState(false);

  // Trash sound effect
  const playTrashSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 100;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const handleGameReady = useCallback(() => {
    setTimeout(() => setShowEnter(true), 2000);
  }, []);

  // Auto-open terminal window when entering desktop
  useEffect(() => {
    if (entered && openWindows.length === 0) {
      setTimeout(() => {
        openWindow(projects.find(p => p.id === 'terminal'));
      }, 1500); // Increased delay to let everything load
    }
  }, [entered]);

  const projects = [
    {
      id: 'lighterpro',
      title: 'LighterPro',
      icon: '🔥',
      description: 'Real-time liquidation tracker for crypto traders',
      tech: 'Next.js • Chrome Extension • WebSockets',
      links: { live: 'https://lighterpro.vercel.app', github: '#' },
      position: { x: 40, y: 60 },
      isMainProject: true
    },
    {
      id: 'feylon',
      title: 'Feylon',
      icon: '👁️',
      description: 'Web3 reward distribution system with viral mechanics',
      tech: 'React • Blockchain • Token Distribution',
      links: { live: '#', github: '#' },
      position: { x: 40, y: 160 },
      isMainProject: true
    },
    {
      id: 'seen',
      title: 'SEEN',
      icon: '🎨',
      description: 'Anti-marketplace NFT gallery - being seen is enough',
      tech: 'Next.js • NFT APIs • Web3',
      links: { live: 'https://tobeseen.xyz', github: '#' },
      position: { x: 40, y: 260 },
      isMainProject: true
    },
    {
      id: 'artclaps',
      title: 'Art Claps',
      icon: '👏',
      description: 'Farcaster-native artist platform',
      tech: 'Farcaster • Social Mechanics • React',
      links: { live: '#', github: '#' },
      position: { x: 40, y: 360 },
      isMainProject: true
    },
    {
      id: 'vonmesser',
      title: 'VONMESSER Design',
      icon: '🌊',
      description: 'Premium tourism websites for Albanian Riviera',
      tech: 'Next.js • E-commerce • Custom CMS',
      links: { live: '#', github: '#' },
      position: { x: 40, y: 460 },
      isMainProject: true
    },
    {
      id: 'dinogame',
      title: 'Dino Game',
      icon: '🦖',
      description: 'Play the classic Chrome dino game!',
      tech: 'Canvas • JavaScript • Pure Fun',
      isGame: true,
      position: { x: 40, y: 560 },
      isMainProject: true
    },
    {
      id: 'numbermunchers',
      title: 'Number Munchers',
      icon: '🔢',
      description: 'Classic 90s math education game - dodge Troggles!',
      tech: 'React • Retro Gaming • Educational',
      isNumberMunchers: true,
      position: { x: 160, y: 60 },
      isMainProject: false
    },
    {
      id: 'terminal',
      title: 'README.txt',
      icon: '📄',
      description: 'About AuraGreen Coding',
      tech: '',
      isTerminal: true,
      position: { x: 900, y: 100 },
      content: `> INITIALIZING AURAGREEN_CODING...
> LOADING PROFILE...
> █████████████████████ 100%

HELLO WORLD! 🦖

I'm Flex - a relentless builder who never stops running.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 STATS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Top 0.5% builder on Replit
• 59 projects shipped
• 14 live products
• 38K+ app views
• 12 years running profitable businesses

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💼 CURRENT WORK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Building Web3 tools & trading platforms
• Premium web development for tourism
• NFT ecosystem infrastructure
• 100K+ social media reach

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 EXPERTISE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Next.js / React / Web3
• Chrome Extensions
• Real-time Data Systems
• NFT Platform Development
• E-commerce Solutions

Like the Chrome dino that never stops running,
I keep building until it works.

Available for contract work.
4-6 week MVP sprints preferred.

> EOF_`
    },
    {
      id: 'about',
      title: 'About Me',
      icon: '👤',
      description: 'The builder behind AuraGreen',
      tech: '',
      position: { x: 40, y: 660 },
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
      position: { x: 900, y: 450 },
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
    },
    {
      id: 'trash',
      title: 'Trash',
      icon: '🗑️',
      description: 'Recycle Bin',
      isSystem: true,
      isTrash: true,
      position: { x: 1200, y: 650 }
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: '⚙️',
      description: 'System Preferences',
      isSystem: true,
      position: { x: 1200, y: 450 },
      content: `> SYSTEM_SETTINGS

Display: Retro Mode ✓
Theme: AuraGreen
Font: Press Start 2P
Dino Mode: Always On 🦖

Version: 1.0.0
Built with: Next.js + Canvas`
    }
  ];

  const openWindow = (project) => {
    if (!project) return;
    
    // Check if it's minimized - unminimize instead
    const minimized = minimizedWindows.find(w => w.id === project.id);
    if (minimized) {
      unminimizeWindow(project.id);
      return;
    }
    
    // Don't open if already open
    if (openWindows.find(w => w.id === project.id)) {
      return;
    }
    
    // Center terminal window, random position for others
    const windowX = project.isTerminal ? (window.innerWidth - 450) / 2 : Math.random() * 200 + 100;
    const windowY = project.isTerminal ? (window.innerHeight - 350) / 2 : Math.random() * 100 + 100;
    
    setOpenWindows([...openWindows, { 
      ...project, 
      windowX, 
      windowY 
    }]);
  };

  const closeWindow = (projectId) => {
    setOpenWindows(openWindows.filter(w => w.id !== projectId));
  };

  const minimizeWindow = (projectId) => {
    const window = openWindows.find(w => w.id === projectId);
    if (window) {
      setMinimizedWindows([...minimizedWindows, window]);
      setOpenWindows(openWindows.filter(w => w.id !== projectId));
    }
  };

  const unminimizeWindow = (projectId) => {
    const window = minimizedWindows.find(w => w.id === projectId);
    if (window) {
      setOpenWindows([...openWindows, window]);
      setMinimizedWindows(minimizedWindows.filter(w => w.id !== projectId));
    }
  };

  const handleIconMouseDown = (e, icon) => {
    e.preventDefault();
    const pos = iconPositions[icon.id] || icon.position;
    setDraggingIcon(icon.id);
    setHasDragged(false);
    setDragOffset({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y
    });
  };

  const handleMouseMove = (e) => {
    if (draggingIcon) {
      setHasDragged(true);
      setIconPositions(prev => ({
        ...prev,
        [draggingIcon]: {
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        }
      }));
      
      // Check if hovering over desktop trash icon
      const trashProject = projects.find(p => p.isTrash);
      const trashPos = iconPositions['trash'] || trashProject.position;
      const distanceToTrash = Math.sqrt(
        Math.pow(e.clientX - (trashPos.x + 50), 2) + 
        Math.pow(e.clientY - (trashPos.y + 50), 2)
      );
      const isOverTrash = distanceToTrash < 80;
      setIsTrashHovered(isOverTrash);
    }
  };

  const handleMouseUp = (e) => {
    if (draggingIcon && hasDragged) {
      // Get trash icon position
      const trashProject = projects.find(p => p.isTrash);
      const trashPos = iconPositions['trash'] || trashProject.position;
      
      // Check if dropped on desktop trash icon (100px radius around trash)
      const distanceToTrash = Math.sqrt(
        Math.pow(e.clientX - (trashPos.x + 50), 2) + 
        Math.pow(e.clientY - (trashPos.y + 50), 2)
      );
      const isOverTrash = distanceToTrash < 80;
      
      if (isOverTrash) {
        // Get the project being trashed
        const project = projects.find(p => p.id === draggingIcon);
        // Can't trash: system items, trash itself, or items already in trash
        if (project && !project.isSystem && !project.isTrash && draggingIcon !== 'trash') {
          // Add to trash
          setTrashedItems([...trashedItems, project]);
          // Play sound
          playTrashSound();
          // Close window if open
          closeWindow(draggingIcon);
        }
      }
    }
    setDraggingIcon(null);
    setIsTrashHovered(false);
  };

  const handleIconClick = (e, icon) => {
    // Don't open if user was dragging
    if (hasDragged) {
      return;
    }

    // Double-click detection (300ms window)
    const now = Date.now();
    if (lastClickedIcon === icon.id && now - lastClickTime < 300) {
      // Double click!
      openWindow(icon);
      setLastClickTime(0);
      setLastClickedIcon(null);
    } else {
      // First click
      setLastClickTime(now);
      setLastClickedIcon(icon.id);
    }
  };

  const restoreFromTrash = (item) => {
    setTrashedItems(trashedItems.filter(i => i.id !== item.id));
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
        <div style={{
          fontSize: '24px',
          color: '#8BC34A',
          textShadow: '0 0 20px rgba(139, 195, 74, 0.5)',
          letterSpacing: '3px',
          marginBottom: '-20px'
        }}>
          AURAGREEN CODING
        </div>

        <DinoGame autoStart={true} onReady={handleGameReady} />

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

        {showEnter && (
          <button
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
              transition: 'all 0.1s'
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
          </button>
        )}

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

  return (
    <div 
      style={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(180deg, #F5F5DC 0%, #E8E8D0 100%)',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: '"Press Start 2P", monospace',
        cursor: draggingIcon ? 'grabbing' : 'default',
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
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
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
        zIndex: 9999
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
      {projects.filter(p => !trashedItems.find(t => t.id === p.id)).map(project => {
        const pos = iconPositions[project.id] || project.position;
        const isTrashIcon = project.isTrash;
        const isBeingDraggedOver = isTrashIcon && isTrashHovered && draggingIcon && draggingIcon !== 'trash';
        
        return (
          <div
            key={project.id}
            onMouseDown={(e) => handleIconMouseDown(e, project)}
            onClick={(e) => handleIconClick(e, project)}
            style={{
              position: 'absolute',
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              width: '100px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: draggingIcon === project.id ? 'grabbing' : 'grab',
              transition: draggingIcon === project.id ? 'none' : 'all 0.2s',
              padding: '10px',
              borderRadius: '8px',
              userSelect: 'none',
              border: isBeingDraggedOver ? '3px dashed #FF5252' : '3px solid transparent',
              background: isBeingDraggedOver ? 'rgba(255, 82, 82, 0.2)' : 'transparent',
              transform: isBeingDraggedOver ? 'scale(1.2)' : 'scale(1)'
            }}
            onMouseEnter={(e) => {
              if (!draggingIcon) e.currentTarget.style.background = 'rgba(139, 195, 74, 0.2)';
            }}
            onMouseLeave={(e) => {
              if (!isBeingDraggedOver) e.currentTarget.style.background = 'transparent';
            }}
          >
            <div style={{ fontSize: '40px', textShadow: '2px 2px 4px rgba(0,0,0,0.3)', pointerEvents: 'none' }}>
              {project.icon === '🦖' ? (
                <img src="/Dino.png" alt="Dino" style={{ width: '40px', height: '42px', imageRendering: 'pixelated' }} />
              ) : project.icon === '🔢' ? (
                <img src="/muncher.png" alt="Muncher" style={{ width: '40px', height: '40px', imageRendering: 'pixelated' }} />
              ) : (
                project.icon
              )}
            </div>
            <div style={{
              fontSize: '8px',
              color: '#1A1A1A',
              textAlign: 'center',
              lineHeight: '12px',
              textShadow: '1px 1px 2px rgba(255,255,255,0.8)',
              pointerEvents: 'none'
            }}>
              {project.title}
            </div>
          </div>
        );
      })}

      {/* Windows */}
      {openWindows.map((window, index) => {
        // For trash window, update content dynamically
        const displayWindow = window.isTrashWindow ? {
          ...window,
          trashedItemsCount: trashedItems.length
        } : window;
        
        return (
        <div key={window.id + (window.isTrashWindow ? `-${trashedItems.length}` : '')} style={{
          position: 'absolute',
          left: `${window.windowX}px`,
          top: `${window.windowY}px`,
          width: window.isTerminal ? '450px' : window.isNumberMunchers ? '600px' : '500px',
          minHeight: window.isTerminal ? '300px' : window.isNumberMunchers ? '500px' : '300px',
          background: '#FFFFFF',
          border: '3px solid #558B2F',
          boxShadow: '8px 8px 0 rgba(0,0,0,0.3)',
          zIndex: 1000 + index,
          animation: 'bounceIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }}>
          <style>{`
            @keyframes bounceIn {
              0% {
                transform: scale(0.3);
                opacity: 0;
              }
              50% {
                transform: scale(1.05);
              }
              70% {
                transform: scale(0.9);
              }
              100% {
                transform: scale(1);
                opacity: 1;
              }
            }
          `}</style>
          <div style={{
            height: '35px',
            background: 'linear-gradient(180deg, #8BC34A 0%, #558B2F 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 10px',
            cursor: 'default',
            borderBottom: '2px solid #558B2F'
          }}>
            <div style={{ fontSize: '10px', color: '#1A1A1A', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>{window.icon}</span>
              <span>{window.title}</span>
            </div>
            <div style={{ display: 'flex', gap: '5px' }}>
              <button
                onClick={() => minimizeWindow(window.id)}
                style={{
                  width: '20px',
                  height: '20px',
                  background: '#FFD700',
                  border: '2px solid #FFA500',
                  cursor: 'pointer',
                  fontSize: '10px',
                  color: '#1A1A1A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}
                title="Minimize"
              >
                −
              </button>
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
                title="Close"
              >
                ×
              </button>
            </div>
          </div>

          <div style={{
            padding: '20px',
            background: '#1A1A1A',
            color: '#00FF00',
            fontSize: '10px',
            lineHeight: '18px',
            fontFamily: '"Courier New", monospace',
            minHeight: window.isTerminal ? '250px' : '250px',
            maxHeight: '500px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: window.isGame ? 'center' : 'flex-start',
            justifyContent: window.isGame ? 'center' : 'flex-start'
          }}>
            {window.isGame ? (
              <DinoGame autoStart={false} />
            ) : window.isNumberMunchers ? (
              <iframe 
                src="https://msaperst.github.io/number-munchers/"
                style={{
                  width: '100%',
                  height: '450px',
                  border: 'none',
                  background: '#000'
                }}
                title="Number Munchers Game"
              />
            ) : window.isTrashWindow ? (
              <div style={{ width: '100%' }}>
                <div style={{ marginBottom: '20px', color: '#8BC34A', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>&gt; TRASH_</span>
                  {trashedItems.length > 0 && (
                    <button
                      onClick={() => setTrashedItems([])}
                      style={{
                        padding: '8px 12px',
                        background: '#FF5252',
                        color: '#FFF',
                        border: '2px solid #C62828',
                        cursor: 'pointer',
                        fontSize: '8px',
                        fontFamily: '"Press Start 2P", monospace'
                      }}
                    >
                      EMPTY TRASH
                    </button>
                  )}
                </div>
                {trashedItems.length === 0 ? (
                  <div style={{ color: '#558B2F', fontStyle: 'italic' }}>
                    Empty<br/><br/>
                    Drag icons to the trash can in the dock to delete them.
                  </div>
                ) : (
                  <>
                    <div style={{ marginBottom: '15px', color: '#FFFFFF' }}>
                      {trashedItems.length} item{trashedItems.length > 1 ? 's' : ''} in trash
                    </div>
                    {trashedItems.map(item => (
                      <div
                        key={item.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px',
                          marginBottom: '8px',
                          background: 'rgba(139, 195, 74, 0.1)',
                          border: '1px solid #558B2F',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(139, 195, 74, 0.2)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(139, 195, 74, 0.1)'}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '20px' }}>{item.icon}</span>
                          <span>{item.title}</span>
                        </div>
                        <button
                          onClick={() => restoreFromTrash(item)}
                          style={{
                            padding: '5px 10px',
                            background: '#8BC34A',
                            color: '#1A1A1A',
                            border: '2px solid #558B2F',
                            cursor: 'pointer',
                            fontSize: '8px',
                            fontFamily: '"Press Start 2P", monospace'
                          }}
                        >
                          RESTORE
                        </button>
                      </div>
                    ))}
                  </>
                )}
              </div>
            ) : window.content || window.isTerminal ? (
              <pre style={{ whiteSpace: 'pre-wrap', margin: 0, color: '#8BC34A' }}>{window.content}</pre>
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
        );
      })}

      {/* Bottom Dock */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60px',
        background: 'rgba(26, 26, 26, 0.95)',
        borderTop: '2px solid #8BC34A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '15px',
        padding: '0 20px',
        boxShadow: '0 -2px 20px rgba(0,0,0,0.5)',
        zIndex: 9998
      }}>
        {projects.filter(p => p.isMainProject).map(project => {
          const isOpen = openWindows.find(w => w.id === project.id);
          const isMinimized = minimizedWindows.find(w => w.id === project.id);
          
          return (
          <div
            key={project.id}
            onClick={() => isMinimized ? unminimizeWindow(project.id) : openWindow(project)}
            style={{
              width: '45px',
              height: '45px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '30px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              borderRadius: '8px',
              background: isOpen ? 'rgba(139, 195, 74, 0.3)' : isMinimized ? 'rgba(255, 215, 0, 0.3)' : 'transparent',
              border: isMinimized ? '2px solid #FFD700' : '2px solid transparent',
              boxShadow: isMinimized ? '0 0 10px rgba(255, 215, 0, 0.5)' : 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px) scale(1.1)';
              e.currentTarget.style.background = 'rgba(139, 195, 74, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.background = isOpen ? 'rgba(139, 195, 74, 0.3)' : isMinimized ? 'rgba(255, 215, 0, 0.3)' : 'transparent';
            }}
          >
            {project.icon}
          </div>
          );
        })}
        
        <div style={{ flex: 1 }} />
        
        {/* Trash Can - Just opens window, not a drop zone */}
        <div
          onClick={() => openWindow({ 
            id: 'trash-window',
            title: 'Trash',
            icon: '🗑️',
            isTrashWindow: true
          })}
          style={{
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '35px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            borderRadius: '8px',
            background: trashedItems.length > 0 ? 'rgba(139, 195, 74, 0.2)' : 'transparent'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px) scale(1.1)';
            e.currentTarget.style.background = 'rgba(139, 195, 74, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.background = trashedItems.length > 0 ? 'rgba(139, 195, 74, 0.2)' : 'transparent';
          }}
        >
          🗑️
          {trashedItems.length > 0 && (
            <div style={{
              position: 'absolute',
              top: '5px',
              right: '5px',
              background: '#FF5252',
              color: '#FFF',
              borderRadius: '50%',
              width: '18px',
              height: '18px',
              fontSize: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold'
            }}>
              {trashedItems.length}
            </div>
          )}
        </div>
        
        <div style={{
          fontSize: '10px',
          color: '#8BC34A',
          letterSpacing: '2px',
          marginLeft: '15px'
        }}>
          {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
