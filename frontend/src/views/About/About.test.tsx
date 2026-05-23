import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import About from './About'

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

describe('About Component', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <About />
            </MemoryRouter>
        )
    })

    it('should render TopNav, Header, and BottomNav components', () => {
        expect(screen.getByTestId('TopNav')).toBeInTheDocument()
        expect(screen.getByTestId('Header')).toHaveTextContent('About Us')
        expect(screen.getByTestId('BottomNav')).toBeInTheDocument()
    })

    it('should render the main image with correct alt text', () => {
        const mainImage = screen.getByAltText(
            'Tenal and Ryan with a dog'
        ) as HTMLImageElement
        expect(mainImage).toBeInTheDocument()
        expect(mainImage.src).toContain('/resources/tenalAndRyan.jpg')
    })

    it('should render the main title', () => {
        expect(screen.getByText('Meet Tenal & Ryan')).toBeInTheDocument()
    })

    it('should render credential chips', () => {
        expect(screen.getByText('Bonded & Insured')).toBeInTheDocument()
        expect(screen.getByText('Canine First Aid / CPR')).toBeInTheDocument()
    })

    it('should render certification logos with correct alt text', () => {
        const profurLogo = screen.getByAltText(
            'ProFur Insurance logo'
        ) as HTMLImageElement
        const dogsafeLogo = screen.getByAltText(
            'DogSafe First Aid logo'
        ) as HTMLImageElement
        expect(profurLogo).toBeInTheDocument()
        expect(profurLogo.src).toContain('/resources/profur.jpg')
        expect(dogsafeLogo).toBeInTheDocument()
        expect(dogsafeLogo.src).toContain('/resources/dogsafe.jpg')
    })
})
