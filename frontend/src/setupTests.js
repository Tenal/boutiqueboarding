const React = require('react')
require('@testing-library/jest-dom/extend-expect')
require('jest-fetch-mock').enableMocks()

React.useLayoutEffect = React.useEffect

// Suppress console messages
global.console = {
    ...console,
    // uncomment to ignore a specific log level
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
}
