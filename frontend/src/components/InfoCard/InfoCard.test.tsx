import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import InfoCard from './InfoCard'
import hook from './useInfoCard'

jest.mock('./useInfoCard')

// Mock hook return values
const defaultMockHook = {
    handleClick: jest.fn(),
    clickable: true,
}
let mockHook = defaultMockHook

describe('InfoCard Component', () => {
    let hookSpy: jest.SpyInstance<any, any>

    beforeEach(() => {
        jest.clearAllMocks()
        hookSpy = jest.spyOn(hook, 'useInfoCard')
        hookSpy.mockImplementation(() => mockHook)
    })

    afterEach(() => {
        hookSpy.mockRestore()
    })

    it('should render icon, title, and description correctly', () => {
        render(
            <InfoCard
                icon={<span data-testid="icon">Icon</span>}
                title="Test Title"
                description="Test Description"
            />
        )

        expect(screen.getByTestId('icon')).toBeInTheDocument()
        expect(screen.getByText('Test Title')).toBeInTheDocument()
        expect(screen.getByText('Test Description')).toBeInTheDocument()
    })

    it('should call onClick when clicked if onClick is provided', () => {
        render(
            <InfoCard
                icon={<span>Icon</span>}
                title="Clickable Card"
                onClick={mockHook.handleClick}
            />
        )

        const paperElement = screen.getByTestId('info-card')
        fireEvent.click(paperElement)
        expect(mockHook.handleClick).toHaveBeenCalledTimes(1)
    })

    it('should apply clickable class when onClick is provided', () => {
        render(
            <InfoCard
                icon={<span>Icon</span>}
                title="Clickable Card"
                onClick={mockHook.handleClick}
            />
        )

        const paperElement = screen.getByTestId('info-card')
        expect(paperElement).toHaveClass('infoCard clickable')
    })

    it('should not apply clickable class when onClick is not provided', () => {
        mockHook.clickable = false
        render(<InfoCard icon={<span>Icon</span>} title="Non-Clickable Card" />)

        const paperElement = screen.getByTestId('info-card')
        expect(paperElement).not.toHaveClass('clickable')
    })
})
