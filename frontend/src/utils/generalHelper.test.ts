import { addHyperlinks, scrollToSection } from './generalHelper'

describe('addHyperlinks', () => {
    it('should replace "boutiqueboarding" with a hyperlink', () => {
        const input = 'Follow us on boutiqueboarding for updates.'
        const output =
            'Follow us on <a href="https://instagram.com/boutiqueboarding?igshid=MmIzYWVlNDQ5Yg==" class="links">boutiqueboarding</a> for updates.'
        expect(addHyperlinks(input)).toBe(output)
    })

    it('should replace "boutiqueboardingco@gmail.com" with a mailto link', () => {
        const input = 'Contact us at boutiqueboardingco@gmail.com.'
        const output =
            'Contact us at <a href="mailto:boutiqueboardingco@gmail.com" class="links">boutiqueboardingco@gmail.com</a>.'
        expect(addHyperlinks(input)).toBe(output)
    })

    it('should replace both "boutiqueboarding" and "boutiqueboardingco@gmail.com"', () => {
        const input =
            'Follow us on boutiqueboarding and contact us at boutiqueboardingco@gmail.com.'
        const output =
            'Follow us on <a href="https://instagram.com/boutiqueboarding?igshid=MmIzYWVlNDQ5Yg==" class="links">boutiqueboarding</a> and contact us at <a href="mailto:boutiqueboardingco@gmail.com" class="links">boutiqueboardingco@gmail.com</a>.'
        expect(addHyperlinks(input)).toBe(output)
    })

    it('should not replace "boutiqueboarding" if it is part of another word', () => {
        const input = 'Check out boutiqueboardinghouse for more info.'
        const output = 'Check out boutiqueboardinghouse for more info.'
        expect(addHyperlinks(input)).toBe(output)
    })

    it('should handle text with no matches', () => {
        const input = 'This text has no matches.'
        const output = 'This text has no matches.'
        expect(addHyperlinks(input)).toBe(output)
    })
})

describe('scrollToSection', () => {
    beforeEach(() => {
        // Reset DOM before each test
        document.body.innerHTML = ''
        jest.clearAllMocks()
    })

    it('should scroll to the section with the given ID', () => {
        const mockElement = document.createElement('div')
        mockElement.id = 'section-1'
        document.body.appendChild(mockElement)

        const scrollIntoViewMock = jest.fn()
        mockElement.scrollIntoView = scrollIntoViewMock

        scrollToSection(1)

        expect(document.getElementById('section-1')).toBe(mockElement)
        expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' })
    })

    it('should not throw an error if the element does not exist', () => {
        const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation()

        expect(() => scrollToSection(999)).not.toThrow() // non-existent ID

        expect(document.getElementById('section-999')).toBeNull()
        expect(consoleWarnSpy).toHaveBeenCalledWith(
            'Element with ID "section-999" not found.'
        )

        consoleWarnSpy.mockRestore()
    })

    it('should handle multiple sections correctly', () => {
        const mockElement1 = document.createElement('div')
        mockElement1.id = 'section-1'
        document.body.appendChild(mockElement1)

        const mockElement2 = document.createElement('div')
        mockElement2.id = 'section-2'
        document.body.appendChild(mockElement2)

        const scrollIntoViewMock1 = jest.fn()
        mockElement1.scrollIntoView = scrollIntoViewMock1

        const scrollIntoViewMock2 = jest.fn()
        mockElement2.scrollIntoView = scrollIntoViewMock2

        scrollToSection(1)
        expect(scrollIntoViewMock1).toHaveBeenCalledWith({ behavior: 'smooth' })
        expect(scrollIntoViewMock2).not.toHaveBeenCalled()

        scrollToSection(2)
        expect(scrollIntoViewMock2).toHaveBeenCalledWith({ behavior: 'smooth' })
    })
})
