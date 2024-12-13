import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Faqs from './Faqs'
import hook from './useFaqs'

// Mock components
jest.mock('./useFaqs')
jest.mock('../../components/TopNav/TopNav', () => () => (
    <div data-testid="TopNav">TopNav Mock</div>
))
jest.mock(
    '../../components/Header/Header',
    () =>
        ({ title }: { title: string }) => (
            <div data-testid="Header">{title}</div>
        )
)
jest.mock('../../components/BottomNav/BottomNav', () => () => (
    <div data-testid="BottomNav">BottomNav Mock</div>
))
jest.mock(
    '../../components/InfoCard/InfoCard',
    () =>
        ({
            icon,
            title,
            clickable,
            onClick,
        }: {
            icon: JSX.Element
            title: string
            clickable: boolean
            onClick: () => void
        }) => (
            <div data-testid="InfoCard" onClick={onClick}>
                {icon}
                <h4>{title}</h4>
            </div>
        )
)
jest.mock(
    '../../components/SingleAccordion/SingleAccordion',
    () =>
        ({ title, body }: { title: string; body: React.ReactNode }) => (
            <div data-testid="SingleAccordion">
                <h2>{title}</h2>
                <div>{body}</div>
            </div>
        )
)

// Mock hook return values
const defaultMockHook = {
    handleScrollToFaqSection: jest.fn(),
    faqsGroupedBySection: {
        '1': [
            {
                section: 1,
                question: 'What services do you offer?',
                answer: 'We offer various pet boarding services.',
            },
            {
                section: 1,
                question: 'Do you provide grooming?',
                answer: 'Yes, grooming is available upon request.',
            },
        ],
        '2': [
            {
                section: 2,
                question: 'Where are you located?',
                answer: 'We are located in Springfield.',
            },
        ],
    },
    sectionHeadings: {
        1: 'Care & Daily Activities',
        2: 'Booking Details & Location',
    },
    sections: [
        {
            id: 1,
            title: 'Care & Daily Activities',
            iconName: 'PetsIcon',
        },
        {
            id: 2,
            title: 'Booking Details & Location',
            iconName: 'LocationIcon',
        },
    ],
}
let mockHook = defaultMockHook

describe('Faqs Component', () => {
    let hookSpy: jest.SpyInstance<any, any>

    beforeEach(() => {
        jest.clearAllMocks()
        hookSpy = jest.spyOn(hook, 'useFaqs')
        hookSpy.mockImplementation(() => mockHook)
    })

    afterEach(() => {
        hookSpy.mockRestore()
    })

    it('should render TopNav, Header, and BottomNav components', () => {
        render(
            <MemoryRouter>
                <Faqs />
            </MemoryRouter>
        )

        expect(screen.getByTestId('TopNav')).toBeInTheDocument()
        expect(screen.getByTestId('Header')).toHaveTextContent('FAQs')
        expect(screen.getByTestId('BottomNav')).toBeInTheDocument()
    })

    it('should render the correct number of InfoCard components with correct titles', () => {
        render(
            <MemoryRouter>
                <Faqs />
            </MemoryRouter>
        )

        const infoCards = screen.getAllByTestId('InfoCard')
        expect(infoCards.length).toBe(2)

        expect(infoCards[0]).toHaveTextContent('Care & Daily Activities')
        expect(infoCards[1]).toHaveTextContent('Booking Details & Location')
    })

    it('should render the correct number of SingleAccordion components with correct content', () => {
        render(
            <MemoryRouter>
                <Faqs />
            </MemoryRouter>
        )

        const accordions = screen.getAllByTestId('SingleAccordion')
        expect(accordions.length).toBe(3)

        // First Section - Care & Daily Activities
        expect(accordions[0]).toHaveTextContent('What services do you offer?')
        expect(accordions[0]).toHaveTextContent(
            'We offer various pet boarding services.'
        )
        expect(accordions[1]).toHaveTextContent('Do you provide grooming?')
        expect(accordions[1]).toHaveTextContent(
            'Yes, grooming is available upon request.'
        )

        // Second Section - Booking Details & Location
        expect(accordions[2]).toHaveTextContent('Where are you located?')
        expect(accordions[2]).toHaveTextContent(
            'We are located in Springfield.'
        )
    })

    it('should call scrollToSection with correct id when InfoCard is clicked', () => {
        render(
            <MemoryRouter>
                <Faqs />
            </MemoryRouter>
        )

        const infoCards = screen.getAllByTestId('InfoCard')

        // Click on the first InfoCard (section id: 1)
        fireEvent.click(infoCards[0])
        expect(mockHook.handleScrollToFaqSection).toHaveBeenCalledWith(1)

        // Click on the second InfoCard (section id: 2)
        fireEvent.click(infoCards[1])
        expect(mockHook.handleScrollToFaqSection).toHaveBeenCalledWith(2)
    })
})
