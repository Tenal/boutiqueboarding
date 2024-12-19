import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import BottomNav from './BottomNav'
import hook from './useBottomNav'

// Mock components
jest.mock('./useBottomNav')

// Mock hook return values
const defaultMockHook = {
    email: '',
    setEmail: jest.fn(),
    message: '',
    setMessage: jest.fn(),
    showSuccessMessage: false,
    state: {
        succeeded: false,
        errors: [] as { field: string; message: string }[],
    },
    onFormSubmit: jest.fn(),
    handleSubmit: jest.fn(),
    currentYear: 2023,
}
let mockHook = defaultMockHook

describe('BottomNav', () => {
    let hookSpy: jest.SpyInstance<any, any>

    beforeEach(() => {
        jest.clearAllMocks()
        jest.useFakeTimers()
        hookSpy = jest.spyOn(hook, 'useBottomNav')
        hookSpy.mockImplementation(() => mockHook)
    })

    afterEach(() => {
        jest.useRealTimers()
        hookSpy.mockRestore()
    })

    it('should render navigation links correctly', () => {
        render(
            <MemoryRouter>
                <BottomNav />
            </MemoryRouter>
        )

        expect(screen.getByText('Boutique Boarding')).toBeInTheDocument()
        expect(screen.getByText('About')).toBeInTheDocument()
        expect(screen.getByText('FAQs')).toBeInTheDocument()
        expect(screen.getByText('Reviews')).toBeInTheDocument()
    })

    it('should render form correctly', () => {
        mockHook = { ...defaultMockHook }

        render(
            <MemoryRouter>
                <BottomNav />
            </MemoryRouter>
        )

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
        expect(screen.getByText('Submit')).toBeInTheDocument()
    })

    it('should show success message after form submission', async () => {
        mockHook = { ...defaultMockHook, showSuccessMessage: true }

        render(
            <MemoryRouter>
                <BottomNav />
            </MemoryRouter>
        )

        expect(screen.getByText('Email received!')).toBeInTheDocument()
        expect(
            screen.getByText('We will respond within 24 hours.')
        ).toBeInTheDocument()
    })

    it('should call handleSubmit on form submission', () => {
        const handleSubmit = jest.fn()
        mockHook = { ...defaultMockHook, handleSubmit }

        render(
            <MemoryRouter>
                <BottomNav />
            </MemoryRouter>
        )

        const form = screen.getByTestId('contact-form')
        form.onsubmit = jest.fn()

        fireEvent.submit(form)

        expect(handleSubmit).toHaveBeenCalled()
    })

    it('should handle email input change', () => {
        render(
            <MemoryRouter>
                <BottomNav />
            </MemoryRouter>
        )

        const emailInput = screen.getByLabelText(/email/i)
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
        expect(mockHook.setEmail).toHaveBeenCalledWith('test@example.com')
    })

    it('should handle message input change', () => {
        render(
            <MemoryRouter>
                <BottomNav />
            </MemoryRouter>
        )

        const messageInput = screen.getByLabelText(/message/i)
        fireEvent.change(messageInput, { target: { value: 'Test message' } })
        expect(mockHook.setMessage).toHaveBeenCalledWith('Test message')
    })

    it('should show success message when showSuccessMessage is true', () => {
        mockHook = { ...defaultMockHook, showSuccessMessage: true }
        render(
            <MemoryRouter>
                <BottomNav />
            </MemoryRouter>
        )

        expect(screen.getByText('Email received!')).toBeInTheDocument()
        expect(
            screen.getByText('We will respond within 24 hours.')
        ).toBeInTheDocument()
        expect(screen.queryByTestId('contact-form')).not.toBeInTheDocument()
    })

    it('should display current year in copyright', () => {
        render(
            <MemoryRouter>
                <BottomNav />
            </MemoryRouter>
        )

        expect(
            screen.getByText(
                `©${mockHook.currentYear} Boutique Boarding. All rights reserved.`
            )
        ).toBeInTheDocument()
    })
})
