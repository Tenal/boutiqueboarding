import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import FaqStickyNav from './FaqStickyNav'
import useFaqStickyNav from './useFaqStickyNav'

jest.mock('./useFaqStickyNav')

const mockUseFaqStickyNav = useFaqStickyNav as jest.MockedFunction<
    typeof useFaqStickyNav
>

const sections = [
    { id: 1, title: 'General Questions', navLabel: 'General' },
    { id: 2, title: 'Pricing & Booking', navLabel: 'Pricing' },
]

describe('FaqStickyNav', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        mockUseFaqStickyNav.mockReturnValue({ activeSection: null, isMobile: false })
    })

    it('should render a button for each section', () => {
        render(<FaqStickyNav sections={sections} onNavigate={jest.fn()} />)

        expect(screen.getAllByRole('button')).toHaveLength(2)
    })

    it('should display full section titles on desktop', () => {
        render(<FaqStickyNav sections={sections} onNavigate={jest.fn()} />)

        expect(screen.getByText('General Questions')).toBeInTheDocument()
        expect(screen.getByText('Pricing & Booking')).toBeInTheDocument()
    })

    it('should display short navLabels on mobile', () => {
        mockUseFaqStickyNav.mockReturnValue({ activeSection: null, isMobile: true })

        render(<FaqStickyNav sections={sections} onNavigate={jest.fn()} />)

        expect(screen.getByText('General')).toBeInTheDocument()
        expect(screen.getByText('Pricing')).toBeInTheDocument()
    })

    it('should apply active class to the active section button', () => {
        mockUseFaqStickyNav.mockReturnValue({ activeSection: 1, isMobile: false })

        render(<FaqStickyNav sections={sections} onNavigate={jest.fn()} />)

        const buttons = screen.getAllByRole('button')
        expect(buttons[0]).toHaveClass('faqNavPillActive')
        expect(buttons[1]).not.toHaveClass('faqNavPillActive')
    })

    it('should call onNavigate with the section id when a button is clicked', () => {
        const onNavigate = jest.fn()
        render(<FaqStickyNav sections={sections} onNavigate={onNavigate} />)

        fireEvent.click(screen.getByText('Pricing & Booking'))

        expect(onNavigate).toHaveBeenCalledWith(2)
    })
})
