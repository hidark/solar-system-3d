# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a multi-project repository containing several web applications:
- **PingPong** - Multiplayer Ping Pong game with WebSocket server
- **electronic-keyboard** - React-based electronic keyboard with MIDI support
- **desktop clock** - Electron desktop clock application

## Commands

### PingPong Project
```bash
cd ../PingPong
npm install
npm start           # Start WebSocket server on port 3000
npm run dev        # Development mode with auto-restart
```

### Electronic Keyboard Project
```bash
cd ../electronic-keyboard
npm install
npm run dev        # Start Vite dev server (usually port 5173)
npm run build      # Build for production
npm run lint       # Run ESLint
```

### Desktop Clock Project
```bash
cd "../desktop clock"
npm install
npm start          # Start React development server
npm run electron-dev  # Run Electron in development mode
npm run dist-win   # Build Windows installer
```

## Architecture

### Electronic Keyboard (React + TypeScript + Vite)
- **State Management**: Zustand store in `src/store/appStore.ts`
- **Audio Engine**: Tone.js for synthesis, @tonejs/midi for MIDI parsing
- **Components**: Modular components with CSS Modules
- **Key Features**: 
  - 85-key virtual piano (C1-C8)
  - MIDI file playback with visualization
  - 8 instrument presets
  - Fingering analysis with TensorFlow.js
  - Audio pitch detection

### PingPong Game (Vanilla JS + WebSocket)
- **Server**: Node.js WebSocket server with room-based matchmaking
- **Client**: Canvas-based rendering with optimized performance
- **Multiplayer**: Real-time synchronization with interpolation
- **Optimizations**: Double buffering, dirty rectangles, event throttling

### Desktop Clock (React + Electron)
- **Main Process**: Electron wrapper in `public/electron.js`
- **Renderer**: React app with Ant Design components
- **Features**: System tray integration, reminders, memos
- **Persistence**: electron-store for local data storage

## Development Notes

### Working with Paths
- Use quotes for paths with spaces: `cd "../desktop clock"`
- Electronic keyboard uses absolute imports from `src/`
- Desktop clock uses relative imports

### TypeScript Projects
For electronic-keyboard, ensure TypeScript types are maintained:
- Run `npm run build` to check type errors
- Use proper types for Tone.js and MIDI objects

### Performance Considerations
- Electronic keyboard: Lazy load components, optimize re-renders
- PingPong: Maintain 60 FPS, batch network updates
- Desktop clock: Minimize Electron main/renderer communication

### Testing
- No automated tests configured currently
- Manual testing recommended before commits
- Electronic keyboard: Test MIDI playback across browsers
- PingPong: Test multiplayer with multiple clients
- Desktop clock: Test on Windows for tray functionality