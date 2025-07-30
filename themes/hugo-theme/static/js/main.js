// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll effect to header
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    if (header) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project-card, .blog-card, .section-title');
    if (animateElements.length > 0) {
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length > 0) {
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // Doom easter egg - click Hugo Huang 10 times to play E1M1 (homepage only)
    const logoText = document.querySelector('.logo-text');
    let clickCount = 0;
    let doomEasterEggActive = true; // Track if Doom easter egg is still active
    
    // Only enable easter egg on homepage
    if (logoText && window.location.pathname === '/' || window.location.pathname === '/index.html') {
        const doomClickHandler = function(e) {
            e.preventDefault(); // Always prevent navigation
            
            if (!doomEasterEggActive) return; // Don't respond if already triggered
            
            clickCount++;
            
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
            
            // Check if we've reached 10 clicks
            if (clickCount >= 10) {
                // Disable the easter egg (but keep the event listener)
                doomEasterEggActive = false;
                
                // Count as easter egg
                window.easterEggCount('snake');
                triggerKonamiEasterEgg();
                
                // Reset counter
                clickCount = 0;
                
                // Add a subtle visual effect
                this.style.animation = 'doomGlow 2s ease-in-out';
                setTimeout(() => {
                    this.style.animation = '';
                }, 5000);
                
                console.log('🐍 Snake easter egg activated!');
            }
        };
        
        logoText.addEventListener('click', doomClickHandler);
    }

    // ===== EASTER EGGS =====
    
    // 1. Console Easter Egg
    console.log('%c🎉 Welcome to the secret console!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
    console.log('%c💡 Try typing "rainbow()" or "matrix()" in the console for some fun!', 'color: #ec4899; font-size: 14px;');
    console.log('%c🎮 Or try the Konami code: ↑↑↓↓←→←→BA', 'color: #f59e0b; font-size: 14px;');
    console.log('%c⌨️ Try Shift+H+U+G+O for a secret sequence!', 'color: #10b981; font-size: 14px;');
    
    // 2. Konami Code Easter Egg
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.length === konamiSequence.length && 
            konamiCode.every((code, index) => code === konamiSequence[index])) {
            triggerKonamiEasterEgg();
            konamiCode = [];
        }
    });
    
    function triggerKonamiEasterEgg() {
        // Create a snake game instead of just celebration
        const snakeGame = document.createElement('div');
        snakeGame.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.95);
            border: 2px solid #0F0;
            border-radius: 10px;
            padding: 20px;
            z-index: 10000;
            color: #0F0;
            font-family: 'Courier New', monospace;
            text-align: center;
            box-shadow: 0 0 30px rgba(0, 255, 0, 0.5);
        `;
        
        snakeGame.innerHTML = `
            <h3 style="margin: 0 0 15px 0; color: #0F0;">🐍 SNAKE GAME 🐍</h3>
            <canvas id="snakeCanvas" width="400" height="300" style="border: 1px solid #0F0; background: #000;"></canvas>
            <p style="margin: 10px 0 0 0; font-size: 14px;">Score: <span id="snakeScore">0</span></p>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.7;">Use arrow keys or WASD to play</p>
            <button onclick="this.parentElement.remove(); stopSnakeGame();" style="
                background: #0F0;
                color: #000;
                border: none;
                padding: 8px 16px;
                border-radius: 5px;
                margin-top: 10px;
                cursor: pointer;
                font-weight: bold;
            ">Close Game</button>
        `;
        
        document.body.appendChild(snakeGame);
        
        // Initialize snake game
        const canvas = document.getElementById('snakeCanvas');
        const ctx = canvas.getContext('2d');
        const gridSize = 20;
        const tileCountX = canvas.width / gridSize;  // 400/20 = 20
        const tileCountY = canvas.height / gridSize; // 300/20 = 15
        
        let snake = [{x: 10, y: 10}];
        let food = {x: 15, y: 15};
        let dx = 1; // Start moving right
        let dy = 0;
        let score = 0;
        let gameRunning = true;
        
        // Simple food spawning - can spawn anywhere within bounds
        function spawnFood() {
            const newFood = {
                x: Math.floor(Math.random() * tileCountX),  // 0-19
                y: Math.floor(Math.random() * tileCountY)   // 0-14
            };
            return newFood;
        }
        
        // Initialize food position
        food = spawnFood();
        
        function drawSnake() {
            ctx.fillStyle = '#0F0';
            snake.forEach(segment => {
                ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
            });
        }
        
        function drawFood() {
            ctx.fillStyle = '#FF0';
            ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
        }
        
        function moveSnake() {
            const head = {x: snake[0].x + dx, y: snake[0].y + dy};
            snake.unshift(head);
            
            // Only snake head can eat food
            if (head.x === food.x && head.y === food.y) {
                score += 10;
                document.getElementById('snakeScore').textContent = score;
                food = spawnFood(); // Spawn new food anywhere
            } else {
                snake.pop();
            }
        }
        
        function checkCollision() {
            const head = snake[0];
            if (head.x < 0 || head.x >= tileCountX || head.y < 0 || head.y >= tileCountY) {
                return true;
            }
            for (let i = 1; i < snake.length; i++) {
                if (head.x === snake[i].x && head.y === snake[i].y) {
                    return true;
                }
            }
            return false;
        }
        
        function gameLoop() {
            if (!gameRunning) {
                return;
            }
            
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            moveSnake();
            if (checkCollision()) {
                gameRunning = false;
                ctx.fillStyle = '#F00';
                ctx.font = '30px Arial';
                ctx.fillText('GAME OVER!', canvas.width/2 - 80, canvas.height/2);
                ctx.fillStyle = '#fff';
                ctx.font = '16px Arial';
                ctx.fillText('Press R to restart', canvas.width/2 - 60, canvas.height/2 + 30);
                return;
            }
            
            drawFood();
            drawSnake();
            
            setTimeout(gameLoop, 150);
        }
        
        function restartSnakeGame() {
            // Reset game state
            snake = [{x: 10, y: 10}];
            food = spawnFood();
            dx = 1;
            dy = 0;
            score = 0;
            gameRunning = true;
            
            // Update score display
            document.getElementById('snakeScore').textContent = score;
            
            // Remove restart button
            const restartBtn = document.getElementById('snakeRestartBtn');
            if (restartBtn) {
                restartBtn.remove();
            }
            
            // Restart game loop
            gameLoop();
        }
        
        // Add keyboard restart support
        document.addEventListener('keydown', function(e) {
            if (!gameRunning && (e.key === 'r' || e.key === 'R')) {
                restartSnakeGame();
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (!gameRunning) return;
            
            switch(e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    if (dy !== 1) { dx = 0; dy = -1; }
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    if (dy !== -1) { dx = 0; dy = 1; }
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    if (dx !== 1) { dx = -1; dy = 0; }
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    if (dx !== -1) { dx = 1; dy = 0; }
                    break;
            }
        });
        
        // Touch controls for mobile
        let touchStartX = 0;
        let touchStartY = 0;
        
        canvas.addEventListener('touchstart', function(e) {
            e.preventDefault();
            const touch = e.touches[0];
            touchStartX = touch.clientX;
            touchStartY = touch.clientY;
        });
        
        canvas.addEventListener('touchend', function(e) {
            e.preventDefault();
            if (!gameRunning) return;
            
            const touch = e.changedTouches[0];
            const deltaX = touch.clientX - touchStartX;
            const deltaY = touch.clientY - touchStartY;
            
            // Determine swipe direction based on larger delta
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                // Horizontal swipe
                if (deltaX > 30 && dx !== -1) { // Swipe right
                    dx = 1; dy = 0;
                } else if (deltaX < -30 && dx !== 1) { // Swipe left
                    dx = -1; dy = 0;
                }
            } else {
                // Vertical swipe
                if (deltaY > 30 && dy !== -1) { // Swipe down
                    dx = 0; dy = 1;
                } else if (deltaY < -30 && dy !== 1) { // Swipe up
                    dx = 0; dy = -1;
                }
            }
        });
        
        window.stopSnakeGame = function() {
            gameRunning = false;
        };
        
        gameLoop();
    }
    
    // Alternative Snake trigger: click about-gif
    const aboutGif = document.querySelector('.about-gif');
    if (aboutGif) {
        aboutGif.addEventListener('click', function(e) {
            e.preventDefault();
            window.matrix();
            window.easterEggCount('matrix');
        });
        
        // Add visual indication that it's clickable
        aboutGif.style.cursor = 'pointer';
        aboutGif.style.transition = 'transform 0.2s ease';
        
        aboutGif.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        aboutGif.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // 3. Rainbow Mode Function (accessible via console) - ENHANCED
    window.rainbow = function() {
        const elements = document.querySelectorAll('h1, h2, h3, .logo-text, .section-title, .project-title, .publication-title, .blog-card-title a, .nav-link, .btn, .skills-list li, .tech-tag, .project-link, .publication-link');
        let hue = 0;
        
        const rainbowInterval = setInterval(() => {
            elements.forEach(el => {
                el.style.color = `hsl(${hue}, 70%, 60%)`;
                el.style.textShadow = `0 0 10px hsl(${hue}, 70%, 60%)`;
            });
            hue = (hue + 10) % 360;
        }, 100);
        
        // Stop after 8 seconds with smooth fade
        setTimeout(() => {
            clearInterval(rainbowInterval);
            elements.forEach(el => {
                el.style.transition = 'color 1s ease, text-shadow 1s ease';
                el.style.color = '';
                el.style.textShadow = '';
                setTimeout(() => {
                    el.style.transition = '';
                }, 1000);
            });
            console.log('🌈 Rainbow mode disabled!');
        }, 8000);
        
        console.log('🌈 Enhanced rainbow mode activated for 8 seconds!');
    };
    
    // 4. Matrix Rain Effect Function (accessible via console) - ENHANCED
    window.matrix = function() {
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9998;
            pointer-events: none;
            opacity: 0.3;
            transition: opacity 2s ease-out;
        `;
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        const matrixArray = matrix.split("");
        
        const fontSize = 10;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
        
        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        const matrixInterval = setInterval(draw, 35);
        
        // Stop after 10 seconds with smooth fade
        setTimeout(() => {
            clearInterval(matrixInterval);
            canvas.style.opacity = '0';
            setTimeout(() => {
                if (canvas.parentElement) {
                    canvas.parentElement.removeChild(canvas);
                }
                console.log('💚 Matrix rain effect disabled!');
            }, 2000);
        }, 10000);
        
        console.log('💚 Enhanced matrix rain effect activated for 10 seconds!');
    };
    
    // 5. Secret Click Areas
    const secretAreas = [
        { x: 5, y: 95, message: '🎪 Secret circus area!' },
    ];
    
    document.addEventListener('click', function(e) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        secretAreas.forEach(area => {
            if (Math.abs(x - area.x) < 10 && Math.abs(y - area.y) < 10) {
                showSecretMessage(area.message, e.clientX, e.clientY);
                window.easterEggCount('secret-area');
                console.log(`🎯 Secret area found! Clicked at ${x.toFixed(1)}%, ${y.toFixed(1)}% (target: ${area.x}%, ${area.y}%)`);
                window.rainbow();
                window.easterEggCount('rainbow');
            }
        });
    });
    
    function showSecretMessage(message, x, y) {
        const popup = document.createElement('div');
        popup.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y - 50}px;
            background: linear-gradient(135deg, #6366f1, #ec4899);
            color: white;
            padding: 10px 15px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: bold;
            z-index: 10000;
            pointer-events: none;
            animation: popup 2s ease-out forwards;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        `;
        popup.textContent = message;
        document.body.appendChild(popup);
        
        setTimeout(() => {
            document.body.removeChild(popup);
        }, 2000);
    }
    
    // 6. Keyboard Shortcuts
    let spaceBarTriggered = false; // Track if space bar easter egg has been triggered
    
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Shift + R for rainbow mode
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'R') {
            e.preventDefault();
            window.rainbow();
            window.easterEggCount('rainbow');
        }
        
        // Ctrl/Cmd + Shift + M for matrix effect
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'M') {
            e.preventDefault();
            window.matrix();
            window.easterEggCount('matrix');
        }
        
        // Space bar for a fun bounce effect (only count once per session)
        if (e.code === 'Space' && e.target === document.body) {
            e.preventDefault();
            document.body.style.animation = 'bounce 0.5s ease';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 500);
            
            // Only count as easter egg once per session
            if (!spaceBarTriggered) {
                window.easterEggCount('space-bar');
                spaceBarTriggered = true;
            }
        }
        
        // Hugo sequence easter egg: Shift + H + U + G + O
        if (e.shiftKey) {
            let hugoSequence = ['H', 'U', 'G', 'O'];
            let currentIndex = 0;
            
            const hugoHandler = function(e) {
                // Make it case-insensitive by converting to uppercase
                const pressedKey = e.key.toUpperCase();
                if (pressedKey === hugoSequence[currentIndex]) {
                    currentIndex++;
                    if (currentIndex === hugoSequence.length) {
                        // Hugo sequence completed!
                        window.easterEggCount('hugo-sequence');
                        showHugoEasterEgg();
                        document.removeEventListener('keydown', hugoHandler);
                    }
                } else {
                    currentIndex = 0;
                    document.removeEventListener('keydown', hugoHandler);
                }
            };
            
            document.addEventListener('keydown', hugoHandler);
        }
    });
    
    function showHugoEasterEgg() {
        const hugoEffect = document.createElement('div');
        hugoEffect.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #6366f1, #ec4899);
            color: white;
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            z-index: 10001;
            text-align: center;
            animation: popup 0.5s ease-out;
        `;
        
        hugoEffect.innerHTML = `
            <h2 style="margin: 0 0 15px 0; font-size: 2rem;">🎉 HUGO! 🎉</h2>
            <p style="margin: 0; font-size: 1.1rem;">You found the secret Hugo sequence!</p>
            <p style="margin: 10px 0 0 0; font-size: 0.9rem; opacity: 0.8;">Shift + H + U + G + O</p>
            <button onclick="this.parentElement.remove()" style="
                background: white;
                color: #6366f1;
                border: none;
                padding: 10px 20px;
                border-radius: 10px;
                margin-top: 20px;
                cursor: pointer;
                font-weight: bold;
            ">Awesome!</button>
        `;
        
        document.body.appendChild(hugoEffect);
    }
    
    // 7. Hidden Easter Egg in Footer
    const footer = document.querySelector('.footer');
    if (footer) {
        let footerClicks = 0;
        footer.addEventListener('click', function() {
            footerClicks++;
            if (footerClicks === 7) {
                this.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3)';
                this.style.backgroundSize = '400% 400%';
                this.style.animation = 'celebration 3s ease-in-out';
                setTimeout(() => {
                    this.style.background = '';
                    this.style.animation = '';
                }, 3000);
                footerClicks = 0;
                window.easterEggCount('footer');
            }
        });
    }
    
    // 8. Easter Egg Counter
    let discoveredEasterEggs = [];
    window.easterEggCount = function(easterEggName = 'unknown') {
        if (!discoveredEasterEggs.includes(easterEggName)) {
            discoveredEasterEggs.push(easterEggName);
            console.log(`🥚 Easter egg discovered: ${easterEggName}! Total: ${discoveredEasterEggs.length}`);
            
            if (discoveredEasterEggs.length === 5) {
                console.log('%c🎉 You\'ve found 5 easter eggs! You\'re an explorer! 🎉', 'color: #10b981; font-size: 16px; font-weight: bold;');
                showEasterEggGuide();
            } else if (discoveredEasterEggs.length === 10) {
                console.log('%c🏆 MASTER EGG HUNTER! You\'ve found all 10 easter eggs! 🏆', 'color: #f59e0b; font-size: 18px; font-weight: bold;');
                showMasterGuide();
            }
        }
    };
    
    function showEasterEggGuide() {
        const guide = document.createElement('div');
        guide.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #6366f1, #ec4899);
            color: white;
            padding: 30px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            z-index: 10001;
            max-width: 500px;
            text-align: center;
            animation: popup 0.5s ease-out;
        `;
        
        guide.innerHTML = `
            <h3 style="margin: 0 0 20px 0; font-size: 1.5rem;">🥚 Easter Egg Guide 🥚</h3>
            <p style="margin: 0 0 15px 0; font-size: 1rem;">You've found 5 easter eggs! Here are some more to discover:</p>
            <ul style="text-align: left; margin: 0; padding-left: 20px;">
                <li>🎮 Try the Konami code: ↑↑↓↓←→←→BA</li>
                <li>🌈 Type "rainbow()" in console</li>
                <li>💚 Type "matrix()" in console</li>
                <li>🎯 Click in secret areas (hint: corners)</li>
                <li>👣 Click the footer 7 times</li>
                <li>⌨️ Try Ctrl+Shift+R or Ctrl+Shift+M</li>
                <li>🚀 Press Space bar for a bounce</li>
                <li>🎪 Try Shift+H+U+G+O</li>
            </ul>
            <button onclick="this.parentElement.remove()" style="
                background: white;
                color: #6366f1;
                border: none;
                padding: 10px 20px;
                border-radius: 10px;
                margin-top: 20px;
                cursor: pointer;
                font-weight: bold;
            ">Got it!</button>
        `;
        
        document.body.appendChild(guide);
    }
    
    function showMasterGuide() {
        const guide = document.createElement('div');
        guide.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3);
            background-size: 400% 400%;
            animation: celebration 3s ease-in-out;
            color: white;
            padding: 40px;
            border-radius: 25px;
            box-shadow: 0 25px 50px rgba(0,0,0,0.4);
            z-index: 10001;
            max-width: 600px;
            text-align: center;
            animation: celebration 3s ease-in-out, popup 0.5s ease-out;
        `;
        
        guide.innerHTML = `
            <h2 style="margin: 0 0 20px 0; font-size: 2rem;">🏆 MASTER EGG HUNTER! 🏆</h2>
            <p style="margin: 0 0 20px 0; font-size: 1.1rem;">You've found ALL the easter eggs! You're a true explorer!</p>
            <div style="background: rgba(255,255,255,0.2); padding: 20px; border-radius: 15px; margin: 20px 0;">
                <h4 style="margin: 0 0 15px 0;">🎁 Special Reward:</h4>
                <p style="margin: 0; font-size: 0.9rem;">You've unlocked the secret developer mode! Try typing "devMode()" in the console for a special surprise!</p>
            </div>
            <button onclick="this.parentElement.remove()" style="
                background: white;
                color: #ff6b6b;
                border: none;
                padding: 12px 25px;
                border-radius: 12px;
                margin-top: 20px;
                cursor: pointer;
                font-weight: bold;
                font-size: 1.1rem;
            ">Amazing! 🎉</button>
        `;
        
        document.body.appendChild(guide);
        
        // Add the special dev mode function
        window.devMode = function() {
            console.log('%c🚀 DEVELOPER MODE ACTIVATED!', 'color: #ff6b6b; font-size: 24px; font-weight: bold;');
            console.log('%cYou\'ve unlocked the ultimate easter egg!', 'color: #4ecdc4; font-size: 16px;');
            
            // Create a spectacular effect
            const devEffect = document.createElement('div');
            devEffect.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(circle, transparent 20%, #000 70%);
                z-index: 9997;
                pointer-events: none;
                animation: devModeEffect 5s ease-in-out;
                transition: opacity 2s ease-out;
            `;
            document.body.appendChild(devEffect);
            
            // Add floating particles
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const particle = document.createElement('div');
                    particle.style.cssText = `
                        position: fixed;
                        width: 10px;
                        height: 10px;
                        background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3);
                        border-radius: 50%;
                        pointer-events: none;
                        z-index: 9998;
                        left: ${Math.random() * 100}%;
                        top: ${Math.random() * 100}%;
                        animation: particleFloat 3s ease-out forwards;
                        transition: opacity 1s ease-out;
                    `;
                    document.body.appendChild(particle);
                    
                    setTimeout(() => {
                        if (particle.parentElement) {
                            particle.style.opacity = '0';
                            setTimeout(() => {
                                if (particle.parentElement) {
                                    particle.parentElement.removeChild(particle);
                                }
                            }, 1000);
                        }
                    }, 2000);
                }, i * 100);
            }
            
            // Smooth fade out
            setTimeout(() => {
                if (devEffect.parentElement) {
                    devEffect.style.opacity = '0';
                    setTimeout(() => {
                        if (devEffect.parentElement) {
                            devEffect.parentElement.removeChild(devEffect);
                        }
                    }, 2000);
                }
            }, 5000);
        };
    }
    
    // Call the counter for each easter egg
    const originalRainbow = window.rainbow;
    window.rainbow = function() {
        window.easterEggCount('rainbow');
        originalRainbow();
    };
    
    const originalMatrix = window.matrix;
    window.matrix = function() {
        window.easterEggCount('matrix');
        originalMatrix();
    };
    
    // Add counter calls to other easter eggs
    const originalTriggerKonami = triggerKonamiEasterEgg;
    triggerKonamiEasterEgg = function() {
        window.easterEggCount('konami-code');
        originalTriggerKonami();
    };
    
    // Add CSS animations for easter eggs
    const style = document.createElement('style');
    style.textContent = `
        @keyframes celebration {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        @keyframes popup {
            0% { transform: scale(0) translateY(20px); opacity: 0; }
            50% { transform: scale(1.1) translateY(-10px); opacity: 1; }
            100% { transform: scale(1) translateY(0); opacity: 0; }
        }
        
        @keyframes bounce {
            0%, 20%, 60%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            80% { transform: translateY(-5px); }
        }
        
        @keyframes devModeEffect {
            0% { opacity: 0; transform: scale(0.8); }
            50% { opacity: 0.8; transform: scale(1.2); }
            100% { opacity: 0; transform: scale(1.5); }
        }
        
        @keyframes particleFloat {
            0% { 
                transform: translateY(0) scale(0); 
                opacity: 1; 
            }
            50% { 
                transform: translateY(-100px) scale(1); 
                opacity: 0.8; 
            }
            100% { 
                transform: translateY(-200px) scale(0); 
                opacity: 0; 
            }
        }
        
        @keyframes highFiveBounce {
            0% { 
                transform: translate(-50%, -50%) scale(0) rotate(0deg); 
                opacity: 0; 
            }
            20% { 
                transform: translate(-50%, -50%) scale(1.2) rotate(10deg); 
                opacity: 1; 
            }
            40% { 
                transform: translate(-50%, -50%) scale(0.9) rotate(-5deg); 
                opacity: 1; 
            }
            60% { 
                transform: translate(-50%, -50%) scale(1.1) rotate(5deg); 
                opacity: 1; 
            }
            80% { 
                transform: translate(-50%, -50%) scale(0.95) rotate(-2deg); 
                opacity: 0.8; 
            }
            100% { 
                transform: translate(-50%, -50%) scale(1) rotate(0deg); 
                opacity: 0; 
            }
        }
        
        @keyframes highFiveParticle {
            0% { 
                transform: scale(0) rotate(0deg); 
                opacity: 1; 
            }
            30% { 
                transform: scale(1.2) rotate(180deg); 
                opacity: 1; 
            }
            100% { 
                transform: scale(0) rotate(360deg); 
                opacity: 0; 
            }
        }

        @keyframes highFiveText {
            0% { transform: translateY(-50px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
        }

        @keyframes rainFive {
            0% { 
                transform: translateY(-50px) rotate(0deg); 
                opacity: 1; 
            }
            100% { 
                transform: translateY(100vh) rotate(360deg); 
                opacity: 0; 
            }
        }
    `;
    document.head.appendChild(style);

    // 9. Subtle Easter Egg Indicator (appears after 30 seconds)
    setTimeout(() => {
        const indicator = document.createElement('div');
        indicator.className = 'easter-egg-indicator';
        indicator.innerHTML = '🥚';
        indicator.title = 'Easter eggs hidden here...';
        
        indicator.addEventListener('click', function() {
            this.style.animation = 'celebration 1s ease-in-out';
            setTimeout(() => {
                this.remove();
            }, 1000);
            
            const hint = document.createElement('div');
            hint.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 20px;
                border-radius: 15px;
                z-index: 10001;
                text-align: center;
                max-width: 300px;
            `;
            hint.innerHTML = `
                <h4 style="margin: 0 0 10px 0;">🥚 Easter Egg Hint</h4>
                <p style="margin: 0; font-size: 0.9rem;">Try opening the browser console (F12) and look for secret messages!</p>
                <button onclick="this.parentElement.remove()" style="
                    background: #6366f1;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 8px;
                    margin-top: 15px;
                    cursor: pointer;
                ">Got it!</button>
            `;
            document.body.appendChild(hint);
        });
        
        document.body.appendChild(indicator);
        
        // Remove indicator after 10 seconds
        setTimeout(() => {
            if (indicator.parentElement) {
                indicator.remove();
            }
        }, 10000);
    }, 30000);
    
    // 10. Pong Easter Egg (click "Phong" from Blinn-Phong shading)
    
    // Find and make "Phong" clickable
    function setupPongEasterEgg() {
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }
        
        textNodes.forEach(textNode => {
            const text = textNode.textContent;
            if (text.includes('Blinn-Phong')) {
                let parent = textNode.parentNode;
                if (parent.nodeType === Node.TEXT_NODE) {
                    parent = parent.parentNode;
                }
                
                // Only process if not already processed
                if (!parent.classList.contains('pong-processed')) {
                    parent.classList.add('pong-processed');
                    parent.innerHTML = parent.innerHTML.replace(
                        /(Blinn-)(Phong)/g,
                        '$1<span class="pong-trigger" style="cursor: pointer;">$2</span>'
                    );
                }
            }
        });
        
        // Add click listeners to all pong triggers (only if not already added)
        document.querySelectorAll('.pong-trigger').forEach(trigger => {
            // Check if this trigger already has a click listener
            if (!trigger.hasAttribute('data-pong-listener')) {
                trigger.setAttribute('data-pong-listener', 'true');
                trigger.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Check if a game is already running
                    if (window.currentPongGameRunning) {
                        console.log('⏳ Pong game is already running!');
                        return;
                    }
                    
                    window.easterEggCount('pong');
                    startPongGame();
                });
            }
        });
    }
    
    function startPongGame() {
        // Close any existing pong game first
        const existingGame = document.querySelector('.pong-game-container');
        if (existingGame) {
            existingGame.remove();
        }
        
        // Stop any existing game loop
        if (window.currentPongGameRunning !== undefined) {
            window.currentPongGameRunning = false;
        }
        
        const pongGame = document.createElement('div');
        pongGame.className = 'pong-game-container';
        pongGame.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.95);
            border: 2px solid #fff;
            border-radius: 10px;
            padding: 20px;
            z-index: 10000;
            color: #fff;
            font-family: 'Courier New', monospace;
            text-align: center;
            box-shadow: 0 0 30px rgba(255, 255, 255, 0.5);
        `;
        
        const gameId = 'pong-' + Date.now();
        
        pongGame.innerHTML = `
            <h3 style="margin: 0 0 15px 0; color: #fff; font-family: 'Courier New', monospace; text-transform: uppercase; letter-spacing: 2px;">🏓 Phong? Pong! 🏓</h3>
            <canvas id="${gameId}-canvas" width="400" height="300" style="border: 1px solid #fff; background: #000; image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: crisp-edges;"></canvas>
            <p style="margin: 10px 0 0 0; font-size: 14px; font-family: 'Courier New', monospace;">Score: <span id="${gameId}-score">0 - 0</span></p>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.7; font-family: 'Courier New', monospace;">Desktop: W/S keys | Mobile: Touch to move paddle</p>
            <button onclick="endPongGame('${gameId}');" style="
                background: #fff;
                color: #000;
                border: none;
                padding: 8px 16px;
                border-radius: 5px;
                margin-top: 10px;
                cursor: pointer;
                font-weight: bold;
                font-family: 'Courier New', monospace;
                text-transform: uppercase;
            ">Close Game</button>
        `;
        
        document.body.appendChild(pongGame);
        
        // Initialize Pong game
        const canvas = document.getElementById(`${gameId}-canvas`);
        const ctx = canvas.getContext('2d');
        
        // Game objects
        const ball = {
            x: canvas.width / 2 - 5,
            y: canvas.height / 2 - 5,
            size: 10,
            dx: 5,
            dy: 5,
            paused: true // Start paused
        };
        
        // Start ball after 1 second
        setTimeout(() => {
            ball.paused = false;
        }, 1000);
        
        const paddle = {
            x: 10,
            y: Math.floor(canvas.height / 2 / 20) * 20 - 20,
            width: 10,
            height: 40,
            dy: 0,
            speed: 5
        };
        
        const aiPaddle = {
            x: canvas.width - 20,
            y: Math.floor(canvas.height / 2 / 20) * 20 - 20,
            width: 10,
            height: 40,
            speed: 3
        };
        
        let playerScore = 0;
        let aiScore = 0;
        let gameRunning = true;
        let speedMultiplier = 1.0;
        let hitCount = 0;
        
        // Set global flag to track this game instance
        window.currentPongGameRunning = true;
        window.currentPongGameId = gameId;
        
        function drawBall() {
            ctx.fillStyle = '#fff';
            ctx.fillRect(ball.x, ball.y, ball.size, ball.size);
            
            // Add pause indicator
            if (ball.paused) {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                ctx.font = '16px Arial';
            }
        }
        
        function drawPaddle(paddle) {
            ctx.fillStyle = '#fff';
            ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
        }
        
        function drawCenterLine() {
            ctx.setLineDash([5, 15]);
            ctx.beginPath();
            ctx.moveTo(Math.round(canvas.width / 2), 0);
            ctx.lineTo(Math.round(canvas.width / 2), canvas.height);
            ctx.strokeStyle = '#fff';
            ctx.stroke();
            ctx.setLineDash([]);
        }
        
        function updateBall() {
            if (ball.paused) {
                return; // Skip updating if ball is paused
            }
            
            // Store previous position for collision detection
            const prevX = ball.x;
            const prevY = ball.y;
            
            ball.x += ball.dx * speedMultiplier;
            ball.y += ball.dy * speedMultiplier;
            
            // Ball collision with top and bottom
            if (ball.y + ball.size > canvas.height || ball.y < 0) {
                ball.dy = -ball.dy;
                ball.y = ball.y < 0 ? 0 : canvas.height - ball.size; // Prevent sticking to walls
            }
            
            // Improved paddle collision detection
            // Check if ball was on one side of paddle and is now on the other side
            const ballCenterX = ball.x + ball.size / 2;
            const ballCenterY = ball.y + ball.size / 2;
            
            // Player paddle collision (left side)
            if (ball.dx < 0 && // Ball moving left
                prevX + ball.size >= paddle.x && // Ball was to the right of paddle
                ball.x <= paddle.x + paddle.width && // Ball is now at or past paddle
                ballCenterY >= paddle.y && // Ball center is within paddle height
                ballCenterY <= paddle.y + paddle.height) {
                
                // Calculate collision point and adjust ball position
                ball.x = paddle.x + paddle.width;
                ball.dx = -ball.dx;
                hitCount++;
                if (hitCount % 3 === 0) { // Increase speed every 3 paddle hits
                    speedMultiplier += 0.15;
                }
            }
            
            // AI paddle collision (right side)
            if (ball.dx > 0 && // Ball moving right
                prevX <= aiPaddle.x + aiPaddle.width && // Ball was to the left of paddle
                ball.x + ball.size >= aiPaddle.x && // Ball is now at or past paddle
                ballCenterY >= aiPaddle.y && // Ball center is within paddle height
                ballCenterY <= aiPaddle.y + aiPaddle.height) {
                
                // Calculate collision point and adjust ball position
                ball.x = aiPaddle.x - ball.size;
                ball.dx = -ball.dx;
                hitCount++;
                if (hitCount % 3 === 0) { // Increase speed every 3 paddle hits
                    speedMultiplier += 0.15;
                }
            }
            
            // Ball out of bounds
            if (ball.x + ball.size > canvas.width) {
                // Ball passed AI paddle - player scores
                playerScore++;
                const scoreElement = document.getElementById(`${gameId}-score`);
                if (scoreElement && gameRunning) {
                    scoreElement.textContent = playerScore + ' - ' + aiScore;
                }
                // Reset hit count for next round
                hitCount = 0;
                
                // Check for win condition
                if (playerScore >= 21) {
                    gameRunning = false;
                    window.currentPongGameRunning = false;
                    ctx.fillStyle = '#000';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = '#0F0';
                    ctx.font = '30px Arial';
                    ctx.fillText('PLAYER WINS!', canvas.width/2 - 80, canvas.height/2);
                    ctx.fillStyle = '#fff';
                    ctx.font = '16px Arial';
                    ctx.fillText(`Final Score: ${playerScore} - ${aiScore}`, canvas.width/2 - 60, canvas.height/2 + 30);
                    ctx.fillText('Press R to restart', canvas.width/2 - 60, canvas.height/2 + 50);
                    return;
                }
                
                resetBall();
            } else if (ball.x < 0) {
                // Ball passed player paddle - AI scores, but game continues
                aiScore++;
                const scoreElement = document.getElementById(`${gameId}-score`);
                if (scoreElement && gameRunning) {
                    scoreElement.textContent = playerScore + ' - ' + aiScore;
                }
                
                // Check for win condition
                if (aiScore >= 21) {
                    gameRunning = false;
                    window.currentPongGameRunning = false;
                    ctx.fillStyle = '#000';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = '#F00';
                    ctx.font = '30px Arial';
                    ctx.fillText('AI WINS!', canvas.width/2 - 60, canvas.height/2);
                    ctx.fillStyle = '#fff';
                    ctx.font = '16px Arial';
                    ctx.fillText(`Final Score: ${playerScore} - ${aiScore}`, canvas.width/2 - 60, canvas.height/2 + 30);
                    ctx.fillText('Press R to restart', canvas.width/2 - 60, canvas.height/2 + 50);
                    return;
                }
                
                resetBall();
            }
        }
        
        function resetBall() {
            ball.x = canvas.width / 2 - 5;
            ball.y = canvas.height / 2 - 5;
            ball.dx = -ball.dx;
            ball.dy = (Math.random() > 0.5 ? 3 : -3);
            speedMultiplier = 1.0;
            
            // Pause ball movement for 1 second after spawn
            ball.paused = true;
            setTimeout(() => {
                ball.paused = false;
            }, 1000);
        }
        
        function updatePaddles() {
            // Update player paddle
            paddle.y += paddle.dy;
            if (paddle.y < 0) paddle.y = 0;
            if (paddle.y + paddle.height > canvas.height) {
                paddle.y = canvas.height - paddle.height;
            }
            
            // Update AI paddle
            if (aiPaddle.y + aiPaddle.height / 2 < ball.y) {
                aiPaddle.y += aiPaddle.speed;
            } else {
                aiPaddle.y -= aiPaddle.speed;
            }
            
            if (aiPaddle.y < 0) aiPaddle.y = 0;
            if (aiPaddle.y + aiPaddle.height > canvas.height) {
                aiPaddle.y = canvas.height - aiPaddle.height;
            }
        }
        
        function gameLoop() {
            if (!gameRunning || !window.currentPongGameRunning || window.currentPongGameId !== gameId) {
                gameRunning = false;
                return;
            }
            
            // Check if game container still exists
            const gameContainer = document.querySelector('.pong-game-container');
            if (!gameContainer) {
                gameRunning = false;
                window.currentPongGameRunning = false;
                return;
            }
            
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            drawCenterLine();
            drawBall();
            drawPaddle(paddle);
            drawPaddle(aiPaddle);
            
            updateBall();
            updatePaddles();
            
            requestAnimationFrame(gameLoop);
        }
        
        // Keyboard controls
        document.addEventListener('keydown', function(e) {
            if (!gameRunning || !window.currentPongGameRunning || window.currentPongGameId !== gameId) return;
            
            switch(e.key.toLowerCase()) {
                case 'w':
                    paddle.dy = -paddle.speed;
                    break;
                case 's':
                    paddle.dy = paddle.speed;
                    break;
            }
        });
        
        document.addEventListener('keyup', function(e) {
            if (!gameRunning || !window.currentPongGameRunning || window.currentPongGameId !== gameId) return;
            
            switch(e.key.toLowerCase()) {
                case 'w':
                case 's':
                    paddle.dy = 0;
                    break;
            }
        });
        
        // Touch controls for mobile
        let touchStartY = 0;
        let isTouching = false;
        
        canvas.addEventListener('touchstart', function(e) {
            e.preventDefault();
            if (!gameRunning || !window.currentPongGameRunning || window.currentPongGameId !== gameId) return;
            
            const touch = e.touches[0];
            touchStartY = touch.clientY;
            isTouching = true;
        });
        
        canvas.addEventListener('touchmove', function(e) {
            e.preventDefault();
            if (!gameRunning || !window.currentPongGameRunning || window.currentPongGameId !== gameId || !isTouching) return;
            
            const touch = e.touches[0];
            const deltaY = touch.clientY - touchStartY;
            
            // Move paddle based on touch position relative to canvas
            const canvasRect = canvas.getBoundingClientRect();
            const touchY = touch.clientY - canvasRect.top;
            const targetY = (touchY / canvasRect.height) * canvas.height - paddle.height / 2;
            
            // Smooth paddle movement
            if (targetY < paddle.y) {
                paddle.dy = -paddle.speed;
            } else if (targetY > paddle.y) {
                paddle.dy = paddle.speed;
            } else {
                paddle.dy = 0;
            }
        });
        
        canvas.addEventListener('touchend', function(e) {
            e.preventDefault();
            if (!gameRunning || !window.currentPongGameRunning || window.currentPongGameId !== gameId) return;
            
            isTouching = false;
            paddle.dy = 0;
        });
        
        window.stopPongGame = function() {
            gameRunning = false;
            window.currentPongGameRunning = false;
        };
        
        window.endPongGame = function(gameId) {
            gameRunning = false;
            window.currentPongGameRunning = false;
            const canvas = document.getElementById(`${gameId}-canvas`);
            const ctx = canvas.getContext('2d');
            
            // Clear canvas and show game over
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#f00';
            ctx.font = '30px Arial';
            ctx.fillText('GAME OVER!', canvas.width/2 - 80, canvas.height/2);
            
            ctx.fillStyle = '#fff';
            ctx.font = '16px Arial';
            ctx.fillText(`Final Score: ${playerScore} - ${aiScore}`, canvas.width/2 - 60, canvas.height/2 + 30);
            ctx.fillText('Press R to restart', canvas.width/2 - 60, canvas.height/2 + 50);
            
            // Remove the game after a short delay
            setTimeout(() => {
                const gameContainer = document.querySelector('.pong-game-container');
                if (gameContainer) {
                    gameContainer.remove();
                }
            }, 2000);
        };
        
        function restartPongGame(gameId) {
            // Reset game state
            playerScore = 0;
            aiScore = 0;
            speedMultiplier = 1.0;
            hitCount = 0;
            gameRunning = true;
            window.currentPongGameRunning = true;
            
            // Reset ball
            ball.x = canvas.width / 2 - 5;
            ball.y = canvas.height / 2 - 5;
            ball.dx = 5;
            ball.dy = 5;
            ball.paused = true;
            
            // Reset paddles
            paddle.y = Math.floor(canvas.height / 2 / 20) * 20 - 20;
            aiPaddle.y = Math.floor(canvas.height / 2 / 20) * 20 - 20;
            
            // Update score display
            document.getElementById(`${gameId}-score`).textContent = '0 - 0';
            
            // Remove restart button
            const restartBtn = document.getElementById('pongRestartBtn');
            if (restartBtn) {
                restartBtn.remove();
            }
            
            // Start ball after 1 second
            setTimeout(() => {
                ball.paused = false;
            }, 1000);
            
            // Restart game loop
            gameLoop();
        }
        
        // Add keyboard restart support for Pong
        document.addEventListener('keydown', function(e) {
            if (!gameRunning && (e.key === 'r' || e.key === 'R')) {
                restartPongGame(gameId);
            }
        });
        
        gameLoop();
    }
    
    // Setup Pong easter egg when page loads
    setupPongEasterEgg();
    
    // Also setup when content changes (for dynamic content)
    const pongObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                setupPongEasterEgg();
            }
        });
    });
    
    pongObserver.observe(document.body, {
        childList: true,
        subtree: true
    });

    // 12. High-Five Easter Egg (click wave emoji on homepage)
    const heroEmoji = document.querySelector('.hero-emoji');
    if (heroEmoji && (window.location.pathname === '/' || window.location.pathname === '/index.html')) {
        heroEmoji.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Count as easter egg
            window.easterEggCount('high-five');
            
            // Create high-five animation
            const highFive = document.createElement('div');
            highFive.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 120px;
                z-index: 10000;
                pointer-events: none;
                animation: highFiveBounce 1.5s ease-out forwards;
            `;
            highFive.textContent = '🖐️';
            document.body.appendChild(highFive);
            
            // Add high-five text
            const highFiveText = document.createElement('div');
            highFiveText.style.cssText = `
                position: fixed;
                top: 60%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 28px;
                font-weight: bold;
                color: #1e293b;
                background: linear-gradient(135deg, #ffffff, #f8fafc);
                padding: 15px 25px;
                border-radius: 15px;
                border: 3px solid #6366f1;
                z-index: 10000;
                pointer-events: none;
                animation: highFiveText 1.5s ease-out forwards;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
                box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
            `;
            highFiveText.textContent = 'HIGH FIVE! 🎉';
            document.body.appendChild(highFiveText);
            
            // Rain 5s from above
            for (let i = 0; i < 20; i++) {
                setTimeout(() => {
                    const five = document.createElement('div');
                    five.style.cssText = `
                        position: fixed;
                        left: ${Math.random() * 100}%;
                        top: -50px;
                        font-size: ${30 + Math.random() * 40}px;
                        font-weight: bold;
                        color: #6366f1;
                        z-index: 10001;
                        pointer-events: none;
                        animation: rainFive 3s ease-in forwards;
                    `;
                    five.textContent = '5';
                    document.body.appendChild(five);
                    
                    setTimeout(() => {
                        if (five.parentElement) {
                            five.parentElement.removeChild(five);
                        }
                    }, 3000);
                }, i * 100);
            }
            
            // Remove high-five emoji and text after animation
            setTimeout(() => {
                if (highFive.parentElement) {
                    highFive.parentElement.removeChild(highFive);
                }
                if (highFiveText.parentElement) {
                    highFiveText.parentElement.removeChild(highFiveText);
                }
            }, 1500);
            
            // Add visual feedback to the original emoji
            this.style.transform = 'scale(1.3) rotate(15deg)';
            this.style.transition = 'transform 0.3s ease';
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
            
            console.log('🖐️ High-five! Thanks for the friendly gesture!');
        });
        
        // Add hover effect to indicate it's clickable
        heroEmoji.style.cursor = 'pointer';
        heroEmoji.style.transition = 'transform 0.2s ease';
        
        heroEmoji.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        heroEmoji.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
}); 