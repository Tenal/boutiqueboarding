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

    it('should render without description when not provided', () => {
        render(
            <InfoCard
                icon={<span data-testid="icon">Icon</span>}
                title="Test Title"
            />
        )

        expect(screen.queryByText('Test Description')).not.toBeInTheDocument()
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

    it('should apply custom grid values', () => {
        const { container } = render(
            <InfoCard
                icon={<span>Icon</span>}
                title="Test Title"
                grid={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            />
        )

        const gridItem = container.firstChild
        expect(gridItem).toHaveClass('MuiGrid-grid-xs-12')
        expect(gridItem).toHaveClass('MuiGrid-grid-sm-6')
        expect(gridItem).toHaveClass('MuiGrid-grid-md-4')
        expect(gridItem).toHaveClass('MuiGrid-grid-lg-3')
    })

    it('should apply default grid values when not provided', () => {
        const { container } = render(
            <InfoCard icon={<span>Icon</span>} title="Test Title" />
        )

        const gridItem = container.firstChild
        expect(gridItem).toHaveClass('MuiGrid-grid-xs-6')
        expect(gridItem).toHaveClass('MuiGrid-grid-sm-3')
        expect(gridItem).toHaveClass('MuiGrid-grid-md-3')
        expect(gridItem).toHaveClass('MuiGrid-grid-lg-3')
    })
})
