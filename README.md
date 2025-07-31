# 🥚 Easter Eggs Guide

Welcome to the secret easter eggs documentation for the Hugo site! This file contains all the hidden surprises and fun interactions I've added to make the site more entertaining.

## 🎮 Interactive Easter Eggs

### 1. **Snake Game Easter Egg** (Logo Click)
- **How to trigger**: Click the logo text "Hugo Huang" 10 times on the homepage
- **Effect**: Opens Snake game (same as Konami code)
- **Location**: Homepage only
<!-- - **Note**: One-time trigger, disabled after activation -->

### 2. **Snake Game Easter Egg** (Konami Code)
- **How to trigger**: 
  - Press ↑↑↓↓←→←→BA (up, up, down, down, left, right, left, right, B, A)
  - OR click the about-gif element on homepage
- **Effect**: Opens a fully playable Snake game with Matrix-style green graphics
- **Features**: 
  - Score tracking and collision detection
  - Arrow keys OR WASD controls
  - Touch controls for mobile (swipe gestures)
  - Food spawns anywhere (including on snake body)
  - Only snake head can eat food
  - Proper rectangular canvas handling (20x15 grid)
  - Smooth gameplay without bugs
  - Press R to restart when game over
- **Location**: Any page (Konami code) or homepage (about-gif click)

### 3. **Matrix Effect Easter Egg** (About-Gif Click)
- **How to trigger**: Click the about-gif element on the homepage
- **Effect**: Matrix-style falling characters with improved fade-out transition (10 seconds)
- **Location**: Homepage only

### 4. **Console Commands**
- **`rainbow()`**: Enhanced rainbow color cycling on ALL text elements for 8 seconds with smooth fade-out
- **`matrix()`**: Matrix-style falling characters with improved fade-out transition (10 seconds)
- **`devMode()`**: Special particle explosion effect unlocked after finding 10 easter eggs

### 5. **Keyboard Shortcuts**
- **Ctrl/Cmd + Shift + R**: Activates enhanced rainbow mode
- **Ctrl/Cmd + Shift + M**: Activates matrix effect with smooth transitions
- **Space bar**: Makes the page bounce (counts only once per session)
- **Shift + H + U + G + O**: Secret Hugo sequence (case-insensitive, works on all platforms)

### 6. **Secret Click Areas**
- **How to find**: Click in specific hidden areas of the page
- **Locations**: 
  - Bottom-left corner (5%, 95%)
- **Effect**: Shows colorful popup messages + triggers rainbow effect

### 7. **Footer Easter Egg**
- **How to trigger**: Click the footer 7 times
- **Effect**: Footer gets a rainbow gradient animation

### 8. **Pong Game Easter Egg**
- **How to trigger**: Click on the word "Phong" in "Blinn-Phong shading" text
- **Effect**: Opens a fully playable Pong game with classic black and white graphics
- **Features**: 
  - Player vs AI gameplay with proper scoring
  - W/S keys to control left paddle (desktop)
  - Touch controls for mobile (drag to move paddle)
  - Score tracking (Player - AI format)
  - Win condition: First to 21 points wins
  - Classic Pong aesthetics with dashed center line
  - Robust ball physics and paddle collision detection
  - Progressive speed increase every 3 hits
  - Ball pause system (1-second pause after spawn)
  - Single instance protection (no multiple games)
  - Press R to restart when game over
- **Location**: Homepage featured project and projects page

### 9. **High-Five Easter Egg**
- **How to trigger**: Click the wave emoji (👋) on the homepage
- **Effect**: 
  - Large high-five emoji (🖐️) bounces in center
  - "HIGH FIVE! 🎉" text appears with white background
  - 20 "5" characters rain from top to bottom
  - Original emoji scales and rotates
- **Location**: Homepage only (hero section)

### 10. **Easter Egg Indicator**
- **When it appears**: After 30 seconds on any page
- **Location**: Bottom-right corner (🥚 icon)
- **Effect**: Clicking it gives a hint about console easter eggs
- **Duration**: Disappears after 10 seconds

## 🎯 Easter Egg Counter System

The site tracks how many easter eggs you've found:

- **5 eggs found**: Shows an easter egg guide with hints
- **10 eggs found**: Shows master guide and unlocks `devMode()` function (all activatable easter eggs!)
- **Console messages**: Updates with your progress
- **Accurate counting**: Each easter egg only counts once per session

## 🎨 Visual Effects

### Animations Added:
- `celebration`: Colorful gradient animation
- `popup`: Improved scale and fade animation for popups
- `bounce`: Page bounce effect
- `rainbowText`: Color cycling for text
- `matrixGlow`: Green glow effect
- `secretPulse`: Subtle pulsing animation
- `devModeEffect`: Enhanced particle effect with smooth transitions
- `particleFloat`: Improved floating particle animation
- `trailFade`: Enhanced mouse trail fade effect
- `highFiveBounce`: High-five emoji bounce animation
- `highFiveText`: High-five text slide animation
- `rainFive`: Raining 5s animation

### CSS Classes Added:
- `.secret-area`: Hidden clickable areas
- `.easter-egg-indicator`: The hint indicator
- `.konami-celebration`: Konami code overlay
- `.konami-text`: Konami celebration text
- `.matrix-canvas`: Matrix rain canvas
- `.rainbow-text`: Rainbow text effect
- `.secret-popup`: Secret message popups
- `.footer-easter-egg`: Footer celebration
- `.pong-game-container`: Pong game container
- `.pong-trigger`: Clickable Phong text

## 🔧 Technical Implementation

### JavaScript Features:
- Event listeners for keyboard, mouse, and click events
- **Canvas-based Snake game** with full game logic
- **Canvas-based Pong game** with proper game state management
- **Enhanced Matrix rain effect** with smooth transitions
- Dynamic DOM manipulation for effects
- Console logging with styled messages
- Easter egg counter system with session-based tracking
- Guide popup system
- **Improved animation cleanup** with smooth fade-outs
- **Cross-platform compatibility** for keyboard shortcuts
- **Case-insensitive Hugo sequence** handling
- **Single instance game protection** for Pong
- **Performance optimizations**

### CSS Features:
- Keyframe animations for all effects
- **Enhanced transitions** for smooth fade-outs
- Gradient backgrounds and transitions
- Responsive design considerations
- Z-index management for overlays
- **Improved animation timing** and easing

## 🎉 Easter Egg List Summary

1. **Snake Game (Logo)** - Click logo 10 times
2. **Snake Game (Konami)** - ↑↑↓↓←→←→BA (Konami code)
3. **Matrix Effect** - Click about-gif on homepage OR `matrix()` or Ctrl+Shift+M
4. **Rainbow Mode** - `rainbow()` or Ctrl+Shift+R
5. **Secret Click Areas** - Click in corners (triggers rainbow)
6. **Footer Celebration** - Click footer 7 times
7. **Space Bounce** - Press Space bar (counts once per session)
8. **Hugo Sequence** - Shift+H+U+G+O (case-insensitive)
9. **Pong Game** - Click "Phong" in Blinn-Phong shading
10. **High-Five** - Click wave emoji on homepage
11. **Easter Egg Indicator** - Appears after 30s (not counted)

**Total Activatable Easter Eggs: 10**