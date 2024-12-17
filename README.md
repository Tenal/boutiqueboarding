# Boutique Boarding

Full-stack web application for dog boarding services using React and TypeScript.

## Overview
This monorepo contains two main projects:
- **Frontend:** A React application using TypeScript.
- **Backend:** API services (TBD).

## Project Structure
```
/boutiqueboarding
  ├── frontend/ # React TypeScript application 
  └── backend/ # Backend application (TBD)
```

## Installation
To set up the project, run the following in the root directory:
```bash
# Install dependencies
npm install
```

## Scripts
#### Root Scripts
- **Start Both:** `npm start`
- **Start Frontend:** `npm run start:frontend`
- **Start Backend:** `npm run start:backend`
- **Run Tests:** `npm test`
- **Build Project:** `npm run build`

#### Frontend Scripts
- **Start Frontend:** `npm start`
- **Build:** `npm run build`
- **Run Tests:** `npm run test`
- **Watch Tests:** `npm run test:watch`
- **Test Coverage:** `npm run test:coverage`

## Dependencies
#### Root Dependencies
- `concurrently`: ^8.0.0

#### Frontend Dependencies
- React ecosystem: `react`, `react-dom`, `react-router-dom`, `recoil`
- MUI: `@mui/material`, `@mui/icons-material`
- Styling: `@emotion/react`, `@emotion/styled`, `node-sass`
- Forms: `@formspree/react`
- Testing: `jest`, `@testing-library/*`, `jest-fetch-mock`, `jest-environment-jsdom`
- TypeScript: `typescript`, `ts-jest`
- Linting: `eslint`, `eslint-config-airbnb`, `eslint-config-prettier`

## Development Setup
1. Clone the repository.
2. Run `npm install` in the root directory to install all dependencies.
3. Use the provided scripts to start the app or run tests.

## Testing
#### Running Tests
```bash
# Run all tests
npm test

# Run frontend tests with coverage
cd frontend && npm run test:coverage

# Run frontend tests in watch mode
cd frontend && npm run test:watch
```

## License
Private

