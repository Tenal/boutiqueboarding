import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'

// Mock child components
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
    '../../components/SingleAccordion/SingleAccordion',
    () =>
        ({ title, body }: { title: string; body: React.ReactNode }) => (
            <div data-testid="SingleAccordion">
                <h2>{title}</h2>
                <div>{body}</div>
            </div>
        )
)
jest.mock(
    '../../components/InfoCard/InfoCard',
    () =>
        ({
            icon,
            title,
            description,
        }: {
            icon: React.ReactNode
            title: string
            description?: string
        }) => (
            <div data-testid="InfoCard">
                <div>{icon}</div>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        )
)

// Mock homeInfo.json
jest.mock('./homeInfo.json', () => [
    {
        title: 'FAQ 1',
        body: 'Answer to FAQ 1',
    },
    {
        title: 'FAQ 2',
        body: 'Answer to FAQ 2',
    },
    {
        title: 'FAQ 3',
        body: 'Answer to FAQ 3',
    },
])

describe('Home Component', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        )
    })

    it('should render TopNav, Header, and BottomNav components', () => {
        expect(screen.getByTestId('TopNav')).toBeInTheDocument()
        expect(screen.getByTestId('Header')).toHaveTextContent('home')
        expect(screen.getByTestId('BottomNav')).toBeInTheDocument()
    })

    it('should render the intro section with correct title, description, and button', () => {
        expect(
            screen.getByText('Welcome to the Boutique Pack')
        ).toBeInTheDocument()

        expect(
            screen.getByText(
                /We offer boutique dog boarding that understands the unique needs of your furry family member/i
            )
        ).toBeInTheDocument()

        expect(
            screen.getByRole('button', { name: /Learn about us/i })
        ).toBeInTheDocument()
    })

    it('should render the card section with the correct number of InfoCards', () => {
        const infoCards = screen.getAllByTestId('InfoCard')

        expect(infoCards.length).toBe(4)

        expect(screen.getByText('Bonded & Insured')).toBeInTheDocument()
        expect(screen.getByText('Pet First Aid Certified')).toBeInTheDocument()
        expect(screen.getByText('Daily PUPdates')).toBeInTheDocument()
        expect(screen.getByText('10+ yrs of Experience')).toBeInTheDocument()

        expect(
            screen.getByText(
                'ProFur coverage ensures protection and peace of mind'
            )
        ).toBeInTheDocument()
        expect(
            screen.getByText(
                'Our DogSafe certification assures pet first aid knowledge'
            )
        ).toBeInTheDocument()
        expect(
            screen.getByText(
                'Stay connected with multiple daily updates posted about your pup'
            )
        ).toBeInTheDocument()
        expect(
            screen.getByText(
                'We have extensive dog care experience from training to rescue'
            )
        ).toBeInTheDocument()
    })

    it('should render the boarding section with image, title, accordions, and button', () => {
        const boardingImage = screen.getByAltText(
            'Tenal sitting in a park with a dog'
        ) as HTMLImageElement
        expect(boardingImage).toBeInTheDocument()
        expect(boardingImage.src).toContain('/resources/tenal.jpg')

        expect(screen.getByText('Board With Us')).toBeInTheDocument()

        const accordions = screen.getAllByTestId('SingleAccordion')
        expect(accordions.length).toBe(3)

        expect(screen.getByText('FAQ 1')).toBeInTheDocument()
        expect(screen.getByText('Answer to FAQ 1')).toBeInTheDocument()
        expect(screen.getByText('FAQ 2')).toBeInTheDocument()
        expect(screen.getByText('Answer to FAQ 2')).toBeInTheDocument()
        expect(screen.getByText('FAQ 3')).toBeInTheDocument()
        expect(screen.getByText('Answer to FAQ 3')).toBeInTheDocument()

        expect(
            screen.getByRole('link', { name: /Book Now/i })
        ).toBeInTheDocument()
    })
})
