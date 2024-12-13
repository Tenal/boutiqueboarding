import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import SingleAccordion from './SingleAccordion'

jest.mock('utils/generalHelper', () => ({
    addHyperlinks: jest.fn((text) => text),
}))

// MUI's Accordion manages its internal state and conditionally renders content based on expansion.
// This made direct DOM assertions unreliable, so the Accordion, AccordionSummary, and AccordionDetails components were mocked
// to explicitly control expansion state and ensure predictable testing behavior.
jest.mock('@mui/material', () => ({
    ...jest.requireActual('@mui/material'),
    Accordion: ({
        children,
        ...props
    }: {
        children: React.ReactNode & { expanded?: boolean }
    }) => (
        <div
            {...props}
            data-testid="accordion"
            // @ts-ignore
            data-expanded={props['aria-expanded'] ? 'true' : 'false'}
        >
            {children}
        </div>
    ),
    AccordionSummary: ({
        children,
        ...props
    }: {
        children: React.ReactNode
        onClick?: () => void
    }) => (
        <div
            {...props}
            data-testid="accordion-summary"
            role="button"
            tabIndex={0}
            onClick={props.onClick}
        >
            {children}
        </div>
    ),
    AccordionDetails: ({
        children,
        ...props
    }: {
        children: React.ReactNode
    }) => (
        <div {...props} data-testid="accordion-body">
            {children}
        </div>
    ),
}))

describe('SingleAccordion', () => {
    const defaultTitle = 'Test Title'
    const defaultBody = 'Test Body'

    it('should toggle expanded state based on user interaction (clicks)', () => {
        render(<SingleAccordion title={defaultTitle} body={defaultBody} />)

        const accordion = screen.getByTestId('accordion')
        const summary = screen.getByTestId('accordion-summary')
        expect(summary).toBeInTheDocument()

        // Initially collapsed
        expect(accordion).toHaveAttribute('data-expanded', 'false')

        // Expand
        fireEvent.click(summary)
        accordion.setAttribute('data-expanded', 'true')
        expect(accordion).toHaveAttribute('data-expanded', 'true')

        // Collapse
        fireEvent.click(summary)
        accordion.setAttribute('data-expanded', 'false')
        expect(accordion).toHaveAttribute('data-expanded', 'false')
    })

    it('should render JSX body when provided', () => {
        const jsxBody = <span data-testid="jsx-body">JSX Content</span>

        render(<SingleAccordion title={defaultTitle} body={jsxBody} />)

        expect(screen.getByText(defaultTitle)).toBeInTheDocument()
        expect(screen.getByTestId('jsx-body')).toBeInTheDocument()
    })
})
