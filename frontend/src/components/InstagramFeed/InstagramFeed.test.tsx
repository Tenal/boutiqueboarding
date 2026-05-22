import React from 'react'
import { render, screen } from '@testing-library/react'
import InstagramFeed from './InstagramFeed'
import instagramHook from '../../views/Home/useInstagramFeed'

jest.mock('../../views/Home/useInstagramFeed')

const hookSpy = jest.spyOn(instagramHook, 'useInstagramFeed')

describe('InstagramFeed', () => {
    afterEach(() => {
        hookSpy.mockRestore()
    })

    it('renders nothing when loading', () => {
        hookSpy.mockReturnValue({ posts: [], loading: true, error: false })
        const { container } = render(<InstagramFeed />)
        expect(container.firstChild).toBeNull()
    })

    it('renders nothing when there is an error', () => {
        hookSpy.mockReturnValue({ posts: [], loading: false, error: true })
        const { container } = render(<InstagramFeed />)
        expect(container.firstChild).toBeNull()
    })

    it('renders nothing when there are no posts', () => {
        hookSpy.mockReturnValue({ posts: [], loading: false, error: false })
        const { container } = render(<InstagramFeed />)
        expect(container.firstChild).toBeNull()
    })

    it('renders the feed section with posts', () => {
        const mockPosts = [
            {
                id: '1',
                media_type: 'IMAGE' as const,
                media_url: 'http://test.com/1.jpg',
                permalink: 'http://instagram.com/p/1',
                caption: 'A cute dog photo',
            },
            {
                id: '2',
                media_type: 'VIDEO' as const,
                media_url: 'http://test.com/2.mp4',
                thumbnail_url: 'http://test.com/2-thumb.jpg',
                permalink: 'http://instagram.com/p/2',
            },
        ]
        hookSpy.mockReturnValue({ posts: mockPosts, loading: false, error: false })
        render(<InstagramFeed />)

        expect(screen.getByText('Follow Along')).toBeInTheDocument()
        expect(screen.getByText('@boutiqueboarding')).toBeInTheDocument()
        expect(screen.getByAltText('A cute dog photo')).toBeInTheDocument()
        expect(
            screen.getByAltText('Boutique Boarding Instagram post')
        ).toBeInTheDocument()
        expect(screen.getByText('A cute dog photo')).toBeInTheDocument()
    })

    it('truncates long captions', () => {
        const longCaption = 'A'.repeat(90)
        hookSpy.mockReturnValue({
            posts: [
                {
                    id: '1',
                    media_type: 'IMAGE' as const,
                    media_url: 'http://test.com/1.jpg',
                    permalink: 'http://instagram.com/p/1',
                    caption: longCaption,
                },
            ],
            loading: false,
            error: false,
        })
        render(<InstagramFeed />)

        expect(screen.getByText(`${'A'.repeat(80)}…`)).toBeInTheDocument()
    })
})
