'use client';

import { useEffect, useRef } from 'react';

export default function DinoGame({ autoStart = false, onReady = () => {} }) {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Load dino sprite
    const dinoImg = new Image();
    dinoImg.src = '/Dino.png';
    let dinoLoaded = false;
    dinoImg.onload = () => {
      dinoLoaded = true;
    };
    
    // Game variables
    let gameRunning = autoStart;
    let gameOver = false;
    let score = 0;
    let highScore = 0;
    let dinoY = 150;
    let dinoVelocity = 0;
    let gravity = 0.6;
    let jumpPower = -12;
    let obstacles = [];
    let gameSpeed = 6;
    let frameCount = 0;

    // Dino sprite (use image if loaded, otherwise fallback)
    const drawDino = (x, y, isJumping) => {
      if (dinoLoaded) {
        // Draw the actual sprite image
        ctx.drawImage(dinoImg, x, y, 44, 47); // Chrome dino is 44x47
      } else {
        // Fallback to green rectangles while loading
        ctx.fillStyle = '#8BC34A';
        ctx.strokeStyle = '#558B2F';
        ctx.lineWidth = 2;
        
        // Body
        ctx.fillRect(x, y, 40, 40);
        ctx.strokeRect(x, y, 40, 40);
        
        // Head
        ctx.fillRect(x + 30, y - 20, 30, 25);
        ctx.strokeRect(x + 30, y - 20, 30, 25);
        
        // Eye
        ctx.fillStyle = '#1A1A1A';
        ctx.fillRect(x + 50, y - 15, 5, 5);
        
        // Legs (animated)
        ctx.fillStyle = '#8BC34A';
        if (!isJumping) {
          const legOffset = Math.floor(frameCount / 10) % 2 === 0 ? 0 : 5;
          ctx.fillRect(x + 5, y + 40, 10, 15 + legOffset);
          ctx.fillRect(x + 25, y + 40, 10, 15 - legOffset);
        } else {
          ctx.fillRect(x + 5, y + 40, 10, 15);
          ctx.fillRect(x + 25, y + 40, 10, 15);
        }
      }
    };

    // Cactus obstacle (green theme)
    const drawCactus = (x, y) => {
      ctx.fillStyle = '#558B2F';
      ctx.strokeStyle = '#33691E';
      ctx.lineWidth = 2;
      
      // Main stem
      ctx.fillRect(x, y, 20, 50);
      ctx.strokeRect(x, y, 20, 50);
      
      // Arms
      ctx.fillRect(x - 10, y + 15, 10, 20);
      ctx.fillRect(x + 20, y + 20, 10, 15);
    };

    // Ground
    const drawGround = () => {
      ctx.strokeStyle = '#8BC34A';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 200);
      ctx.lineTo(canvas.width, 200);
      ctx.stroke();
      
      // Ground dots
      for (let i = 0; i < canvas.width; i += 20) {
        ctx.fillStyle = '#558B2F';
        ctx.fillRect(i + (frameCount % 20), 205, 2, 2);
      }
    };

    // Collision detection - simpler and more reliable
    const checkCollision = (obstacle) => {
      // Dino hitbox (slightly smaller for forgiveness)
      const dinoX = 50 + 5; // Add padding
      const dinoWidth = 44 - 10;
      const dinoHeight = 47 - 10;
      const dinoY_adjusted = dinoY + 5;
      
      // Cactus hitbox  
      const cactusX = obstacle.x + 3;
      const cactusWidth = 20 - 6;
      const cactusY = obstacle.y + 5;
      const cactusHeight = 50 - 5;
      
      // AABB collision
      return (
        dinoX < cactusX + cactusWidth &&
        dinoX + dinoWidth > cactusX &&
        dinoY_adjusted < cactusY + cactusHeight &&
        dinoY_adjusted + dinoHeight > cactusY
      );
    };

    // Game loop
    const gameLoop = () => {
      // Clear canvas
      ctx.fillStyle = '#1A1A1A';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw ground
      drawGround();

      if (gameRunning && !gameOver) {
        // Dino physics
        dinoVelocity += gravity;
        dinoY += dinoVelocity;

        // Ground collision
        if (dinoY > 150) {
          dinoY = 150;
          dinoVelocity = 0;
        }

        // Draw dino
        drawDino(50, dinoY, dinoY < 150);

        // Spawn obstacles
        if (frameCount % 100 === 0) {
          obstacles.push({
            x: canvas.width,
            y: 150
          });
        }

        // Update and draw obstacles
        obstacles = obstacles.filter(obstacle => {
          obstacle.x -= gameSpeed;
          
          if (obstacle.x > -30) {
            drawCactus(obstacle.x, obstacle.y);
            
            // Award point when obstacle passes dino
            if (!obstacle.scored && obstacle.x < 50) {
              obstacle.scored = true;
              score += 10;
            }
            
            // Check collision
            if (checkCollision(obstacle)) {
              gameOver = true;
              if (score > highScore) highScore = score;
            }
            
            return true;
          }
          return false;
        });

        frameCount++;

        // Increase speed over time
        if (frameCount % 500 === 0) {
          gameSpeed += 0.5;
        }

      } else {
        // Draw static dino and frozen obstacles when not running
        drawDino(50, 150, false);
        
        // Draw existing obstacles in their frozen positions
        obstacles.forEach(obstacle => {
          if (obstacle.x > -30) {
            drawCactus(obstacle.x, obstacle.y);
          }
        });
      }

      // Draw score
      ctx.fillStyle = '#8BC34A';
      ctx.font = '20px "Press Start 2P", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`HI ${highScore.toString().padStart(5, '0')}  ${score.toString().padStart(5, '0')}`, canvas.width - 20, 30);

      // Game over text
      if (gameOver) {
        ctx.fillStyle = '#FF5252';
        ctx.font = '30px "Press Start 2P", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 20);
        
        ctx.fillStyle = '#8BC34A';
        ctx.font = '12px "Press Start 2P", monospace';
        ctx.fillText('PRESS SPACE TO RESTART', canvas.width / 2, canvas.height / 2 + 20);
      } else if (!gameRunning) {
        ctx.fillStyle = '#8BC34A';
        ctx.font = '12px "Press Start 2P", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('PRESS SPACE TO START', canvas.width / 2, canvas.height / 2);
      }

      requestAnimationFrame(gameLoop);
    };

    // Input handling
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        
        if (gameOver) {
          // Restart
          gameOver = false;
          score = 0;
          frameCount = 0;
          obstacles = [];
          gameSpeed = 6;
          dinoY = 150;
          dinoVelocity = 0;
          gameRunning = true;
        } else if (!gameRunning) {
          // Start
          gameRunning = true;
        } else if (dinoY === 150) {
          // Jump
          dinoVelocity = jumpPower;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    // Auto-start if enabled
    if (autoStart) {
      setTimeout(() => {
        gameRunning = true;
      }, 500);
    }

    // Start game loop
    gameLoop();

    // Notify parent component that game is ready
    onReady();

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [autoStart, onReady]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={250}
      style={{
        border: '3px solid #8BC34A',
        background: '#1A1A1A',
        boxShadow: '0 0 20px rgba(139, 195, 74, 0.3)'
      }}
    />
  );
}
