import { renderHook, act } from '@testing-library/react'
import hook from './useFaqs'
import { scrollToSection } from '../../utils/generalHelper'

// Mocks
jest.mock('../../utils/generalHelper', () => ({
    scrollToSection: jest.fn(),
}))
jest.mock('./currentFaqs.json', () => ({
    __esModule: true, // Ensure ES module mocking
    default: [
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
        {
            section: 2,
            question: 'Where are you located?',
            answer: 'We are located in Springfield.',
        },
    ],
}))

const mockScrollToSection = scrollToSection as jest.MockedFunction<
    typeof scrollToSection
>

describe('useFaqs Hook', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should group FAQs by section correctly', () => {
        const { result } = renderHook(() => hook.useFaqs())

        expect(result.current.faqsGroupedBySection).toEqual({
            1: [
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
            2: [
                {
                    section: 2,
                    question: 'Where are you located?',
                    answer: 'We are located in Springfield.',
                },
            ],
        })
    })

    it('should return correct section headings', () => {
        const { result } = renderHook(() => hook.useFaqs())

        expect(result.current.sectionHeadings).toEqual({
            1: 'Care & Daily Activities',
            2: 'Booking Details & Location',
            3: 'Policies & Preparation',
            4: 'Communication & Updates',
        })
    })

    it('should return correct sections', () => {
        const { result } = renderHook(() => hook.useFaqs())

        expect(result.current.sections).toEqual([
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
            {
                id: 3,
                title: 'Policies & Preparation',
                iconName: 'PolicyIcon',
            },
            {
                id: 4,
                title: 'Communication & Updates',
                iconName: 'ChatIcon',
            },
        ])
    })

    it('should call scrollToSection with correct id when handleScrollToFaqSection is called', () => {
        const { result } = renderHook(() => hook.useFaqs())

        act(() => {
            result.current.handleScrollToFaqSection(1)
        })

        expect(mockScrollToSection).toHaveBeenCalledWith(1)

        act(() => {
            result.current.handleScrollToFaqSection(2)
        })

        expect(mockScrollToSection).toHaveBeenCalledWith(2)
    })
})
