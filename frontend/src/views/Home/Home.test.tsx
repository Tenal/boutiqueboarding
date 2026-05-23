import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'

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
jest.mock('../../components/PageTransition/PageTransition', () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))
jest.mock('../Reviews/currentReviews.json', () => [
    { dog: 'loki', stars: 5, name: 'Loki Owner', review: 'Great stay!' },
    { dog: 'dakota', stars: 5, name: 'Dakota Owner', review: 'Amazing visit!' },
    { dog: 'louis', stars: 5, name: 'Louis Owner', review: 'Wonderful care!' },
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

    it('should render the stat strip', () => {
        expect(screen.getByText('Bonded & Insured')).toBeInTheDocument()
        expect(screen.getByText('Pet First Aid Certified')).toBeInTheDocument()
        expect(screen.getByText('Daily PUPdates')).toBeInTheDocument()
        expect(screen.getByText('13+ Years Experience')).toBeInTheDocument()
    })

    it('should render the about preview section', () => {
        const aboutImage = screen.getByAltText(
            'Tenal sitting in a park with a dog'
        ) as HTMLImageElement
        expect(aboutImage).toBeInTheDocument()
        expect(aboutImage.src).toContain('/resources/tenal.jpg')

        expect(
            screen.getByText('A boutique experience for your pup')
        ).toBeInTheDocument()

        expect(
            screen.getByRole('button', { name: /Meet Tenal & Ryan/i })
        ).toBeInTheDocument()
    })

    it('should render the boarding details section', () => {
        expect(screen.getByText('Board With Us')).toBeInTheDocument()
        expect(
            screen.getByText('Everything you need to know')
        ).toBeInTheDocument()
        expect(screen.getByText('$95 / night')).toBeInTheDocument()
        expect(screen.getByText('Vaughan, Ontario')).toBeInTheDocument()
    })

    it('should render the featured reviews section', () => {
        expect(screen.getByText('What our clients say')).toBeInTheDocument()
        expect(screen.getByText(/Great stay!/)).toBeInTheDocument()
        expect(screen.getByText(/Amazing visit!/)).toBeInTheDocument()
        expect(screen.getByText(/Wonderful care!/)).toBeInTheDocument()
    })
})
