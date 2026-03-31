# Test Genesis Desktop

AI-powered test generation desktop application built with React, Electron, and TypeScript.

## Prerequisites

- **Node.js** 18+ (tested with 20.x)
- **Test Genesis Backend** running on `http://localhost:5000`

## Setup

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env
```

## Development

```bash
# Start Vite dev server + Electron
npm run dev
```

This launches both the Vite dev server (with HMR) and the Electron window. The app connects to the Flask backend at the URL specified in `.env`.

## Build

```bash
# Build for production
npm run build

# Package as Windows installer
npm run build:win
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Desktop Shell | Electron 28 |
| UI Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| UI Library | Ant Design 5 |
| State (Server) | TanStack React Query 5 |
| State (UI) | Zustand 4 |
| HTTP Client | Axios |
| Code Editor | Monaco Editor |
| Charts | Recharts (Phase 2) |
| Routing | React Router 6 (HashRouter) |

## Project Structure

```
├── electron/           # Electron main + preload processes
├── src/
│   ├── components/     # React components by feature
│   │   ├── layout/     # AppLayout, Sidebar, Header
│   │   ├── common/     # Shared components (StatusBadge)
│   │   ├── project/    # Project indexing components
│   │   ├── test-card/  # User story + test card components
│   │   ├── code-generation/  # Code editor + generation controls
│   │   └── execution/  # Test execution + logs
│   ├── pages/          # Route-level page components
│   ├── services/       # API service modules (Axios)
│   ├── hooks/          # TanStack Query hooks
│   ├── store/          # Zustand stores
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Utility functions
├── vite.config.ts      # Vite + Electron plugin config
└── electron-builder.json  # Packaging config
```

## Features (Phase 1)

- **Project Indexing**: Browse and index codebases via Electron file dialog
- **Test Generation Pipeline**: 4-step wizard (User Story -> Test Card -> Code Generation -> Execution)
- **Code Editor**: Monaco-based editor for viewing/editing generated tests
- **Execution History**: Table of all test executions with status, coverage, and duration

## Planned (Phase 2)

- Coverage visualization (heatmaps)
- TLM evaluation scores and confidence metrics
- Analytics dashboard (trends, KPIs, charts)
- Feedback and recommendation panels
- Settings panel (API config, LLM tuning, theme)
