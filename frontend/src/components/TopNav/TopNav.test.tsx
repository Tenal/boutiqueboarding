import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TopNav from './TopNav'
import hook from './useTopNav'

// Mock components
jest.mock('./useTopNav')
jest.mock('../../resources/logo.png', () => 'mock-image-path')

// Mock hook return values
const defaultMockHook = {
    menuOpen: false,
    isSmallScreen: false,
    pages: ['About', 'FAQs', 'Reviews'],
    theme: { zIndex: { drawer: 1200 }, mixins: { toolbar: { minHeight: 64 } } },
    handleMenuToggle: jest.fn(),
    handleCloseMenu: jest.fn(),
    handleMenuKeyDown: jest.fn(),
}
let mockHook = defaultMockHook

describe('TopNav', () => {
    let hookSpy: jest.SpyInstance<any, any>

    beforeEach(() => {
        jest.clearAllMocks()
        hookSpy = jest.spyOn(hook, 'useTopNav')
        hookSpy.mockImplementation(() => mockHook)
    })

    afterEach(() => {
        hookSpy.mockRestore()
    })

    it('should render links and logo', () => {
        render(
            <MemoryRouter>
                <TopNav />
            </MemoryRouter>
        )

        expect(screen.getByAltText(/cartoon dog/i)).toBeInTheDocument()
        expect(screen.getByText('Boutique Boarding')).toBeInTheDocument()
        expect(screen.getByText('About')).toBeInTheDocument()
        expect(screen.getByText('FAQs')).toBeInTheDocument()
        expect(screen.getByText('Reviews')).toBeInTheDocument()
    })

    it('should toggle menu on click', () => {
        mockHook = { ...defaultMockHook, isSmallScreen: true }
        render(
            <MemoryRouter>
                <TopNav />
            </MemoryRouter>
        )

        const menuToggle = screen.getByRole('button', { name: /menu/i })
        fireEvent.click(menuToggle)

        expect(mockHook.handleMenuToggle).toHaveBeenCalled()
    })

    it('should render mobile menu when menuOpen is true', () => {
        mockHook = { ...defaultMockHook, menuOpen: true, isSmallScreen: true }
        render(
            <MemoryRouter>
                <TopNav />
            </MemoryRouter>
        )

        expect(screen.getByText('About')).toBeInTheDocument()
        expect(screen.getByText('FAQs')).toBeInTheDocument()
        expect(screen.getByText('Reviews')).toBeInTheDocument()
    })

    it('should close menu when Backdrop is clicked', () => {
        mockHook = { ...defaultMockHook, menuOpen: true }
        render(
            <MemoryRouter>
                <TopNav />
            </MemoryRouter>
        )

        const backdrop = screen.getByTestId('menu-backdrop')
        fireEvent.click(backdrop)

        expect(mockHook.handleCloseMenu).toHaveBeenCalled()
    })

    it('should call handleMenuKeyDown on keydown', () => {
        mockHook = { ...defaultMockHook, isSmallScreen: true }
        render(
            <MemoryRouter>
                <TopNav />
            </MemoryRouter>
        )

        const menuToggle = screen.getByRole('button', { name: /menu/i })
        fireEvent.keyDown(menuToggle, { key: 'Enter' })

        expect(mockHook.handleMenuKeyDown).toHaveBeenCalled()
    })
})
