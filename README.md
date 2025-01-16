# Boutique Boarding

A web application for dog boarding services built with React, TypeScript, Material UI, and SCSS modules. State management uses Recoil and React Hooks, with Formspree for form submissions. Jest and React Testing Library handle unit testing, integrated with GitHub Actions for CI/CD.

## Table of Contents
- [Overview](#overview)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
  - [Application Structure](#application-structure)
  - [Component Design](#component-design)
  - [State Management](#state-management)
  - [Data Flow](#data-flow)
  - [Styling Strategy](#styling-strategy)
  - [Testing Strategy](#testing-strategy)
- [URLs & Ports](#urls-and-ports)
- [Installation & Setup](#installation-and-setup)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Testing & Coverage](#testing-and-coverage)
- [License](#license)

## Overview
Boutique Boarding is a full-stack web application for dog boarding services. Parts of the application are still under development, but once the backend is complete it will offer features like booking management, customer reviews, and automated email notifications using React and TypeScript.

## Project Structure
```
/boutiqueboarding
  ├── frontend/           # React TypeScript client application
  │  ├── public/          # Static assets and public resources
  │  └── src/
  │     ├── components/   # Shared UI components
  │     ├── resources/    # Application assets (images, icons)
  │     ├── utils/        # Helper functions and shared utilities
  │     ├── views/        # Page-level components and routes
  │     └── styling/
  │        ├── css/       # Global SCSS styles and variables
  │        └── mui/       # Material UI theme and variable customization
  └── backend/            # API service application (in development)
```

## Architecture

#### Application Structure
- **Monorepo**: Managed using npm workspaces.
- **Frontend**: React with TypeScript and Material UI.
- **State Management**: Recoil for global state and React hooks for local state.
- **Forms**: Managed using Formspree.
- **Styling**: SCSS modules and Material UI customization.
- **Testing**: Unit tests using Jest and React Testing Library.

#### Component Design
- **Custom Hooks Pattern**: Components focus on rendering while business logic is delegated to custom hooks.
- **Component Organization**: Each feature is a self-contained module:

```
ComponentName/
├── ComponentName.tsx          # React component
├── ComponentName.test.tsx     # Component tests
├── useComponentName.ts        # Custom hook (if needed)
└── useComponentName.test.ts   # Hook tests (if needed)
```

#### State Management
- **Local State**: Managed using `useState` and `useReducer`.
- **Global State**: Managed using Recoil atoms and selectors.
- **Form State**: Managed with Formspree hooks for server-side submissions.

#### Data Flow
- **Props-Driven**: Components receive data via props.
- **Custom Hooks**: Encapsulate business logic, data fetching, and transformations.
- **Event Handlers**: Handle user interactions at the component level.
- **Async Operations**: Managed within custom hooks using `useEffect` and async functions.

#### Styling Strategy
- **Theming**: Custom Material UI theme overrides.
- **SCSS Modules**: For granular styles beyond MUI's capabilities.
- **Global Variables**: Shared styles using SCSS variables and mixins.
- **Responsive Design**: Managed using Material UI breakpoints.

#### Testing Strategy
- **Tools**: Jest and React Testing Library.
- **Scope**: Focused on unit testing (E2E testing in development).
- **Location**: Tests colocated with components for better context.
- **Organization**: Follows the same feature-based structure as components.

## URLs and Ports

- **Development Environment**
  - Frontend: http://localhost:3000
  - API: TBD

- **QA Environment**
  - Frontend: https://boutiqueboarding-dev.netlify.app
  - API: TBD

- **Production Environment**
  - Frontend: https://www.boutiqueboarding.com
  - API: TBD

## Installation & Setup
_Please note that Formspree is currently used for form submissions. As such, you will need a Formspree Key to run this app._

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Tenal/boutiqueboarding.git
   cd boutiqueboarding
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environmental variables (your env file should be in the /frontend directory):**
   ```
   REACT_APP_FORMSPREE_KEY=xxxxx
   ```
4. **Start the development server:**
   ```bash
   npm run start:frontend
   /or/
   npm run start
   ```

## Scripts
- **Start Frontend:** `npm run start:frontend`
- **Start Backend:** `npm run start:backend`
- **Start Both:** `npm start`
- **Run Tests:** `npm test`
- **Build Project:** `npm run build`
- **Calculate Test Coverage:** `npm run test:coverage`
- **Run linting:** `npm run lint`

## Dependencies
- **Root Dependencies:** `concurrently`
- **Frontend Dependencies:**
  - React ecosystem: `react`, `react-dom`, `react-router-dom`, `recoil`
  - MUI: `@mui/material`, `@mui/icons-material`
  - Styling: `@emotion/react`, `@emotion/styled`, `node-sass`
  - Forms: `@formspree/react`
  - Testing: `jest`, `@testing-library/*`, `jest-fetch-mock`, `jest-environment-jsdom`
  - TypeScript: `typescript`, `ts-jest`
  - Linting: `eslint`, `eslint-config-airbnb`, `eslint-config-prettier`

## Testing & Coverage
Run the following commands to test the application:

```bash
# Run all tests
npm test

# Run tests with coverage
cd frontend && npm run test:coverage

# Watch tests
cd frontend && npm run test:watch
```

- **Coverage Report:** Test coverage is generated in `coverage/coverage-summary.json`.
- **Coverage Threshold:** Set to 80% for statements, branches, functions, and lines. Current coverage averages over 95%.

## License
This project is private and not intended for public use or distribution.


