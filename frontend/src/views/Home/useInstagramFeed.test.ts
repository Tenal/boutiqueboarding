import { renderHook, act } from '@testing-library/react'
import fetchMock from 'jest-fetch-mock'
import hook from './useInstagramFeed'

const CACHE_KEY = 'bb_instagram_feed'

describe('useInstagramFeed', () => {
    beforeEach(() => {
        fetchMock.resetMocks()
        localStorage.clear()
        delete process.env.REACT_APP_INSTAGRAM_TOKEN
    })

    it('sets loading to false with empty posts when no token', async () => {
        const { result } = renderHook(() => hook.useInstagramFeed())

        await act(async () => {})

        expect(result.current.loading).toBe(false)
        expect(result.current.posts).toEqual([])
        expect(result.current.error).toBe(false)
    })

    it('returns cached posts when a valid cache entry exists', async () => {
        process.env.REACT_APP_INSTAGRAM_TOKEN = 'test-token'
        const cached = [
            {
                id: '1',
                media_type: 'IMAGE',
                media_url: 'http://test.com/1.jpg',
                permalink: 'http://instagram.com/p/1',
            },
        ]
        localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ posts: cached, timestamp: Date.now() })
        )

        const { result } = renderHook(() => hook.useInstagramFeed())

        await act(async () => {})

        expect(result.current.posts).toEqual(cached)
        expect(result.current.loading).toBe(false)
        expect(result.current.error).toBe(false)
    })

    it('fetches posts from the API when no cache and token is present', async () => {
        process.env.REACT_APP_INSTAGRAM_TOKEN = 'test-token'
        const fetchedPosts = [
            {
                id: '2',
                media_type: 'IMAGE',
                media_url: 'http://test.com/2.jpg',
                permalink: 'http://instagram.com/p/2',
            },
        ]
        fetchMock.mockResponseOnce(
            JSON.stringify({ data: fetchedPosts })
        )

        const { result } = renderHook(() => hook.useInstagramFeed())

        await act(async () => {})

        expect(result.current.posts).toEqual(fetchedPosts)
        expect(result.current.loading).toBe(false)
        expect(result.current.error).toBe(false)
    })

    it('sets error to true when the API call fails', async () => {
        process.env.REACT_APP_INSTAGRAM_TOKEN = 'test-token'
        fetchMock.mockRejectOnce(new Error('Network error'))

        const { result } = renderHook(() => hook.useInstagramFeed())

        await act(async () => {})

        expect(result.current.error).toBe(true)
        expect(result.current.loading).toBe(false)
    })

    it('sets error to true when the API returns a non-ok response', async () => {
        process.env.REACT_APP_INSTAGRAM_TOKEN = 'test-token'
        fetchMock.mockResponseOnce('', { status: 500 })

        const { result } = renderHook(() => hook.useInstagramFeed())

        await act(async () => {})

        expect(result.current.error).toBe(true)
        expect(result.current.loading).toBe(false)
    })

    it('ignores expired cache and fetches fresh data', async () => {
        process.env.REACT_APP_INSTAGRAM_TOKEN = 'test-token'
        const expired = [{ id: 'old', media_type: 'IMAGE', media_url: '', permalink: '' }]
        localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ posts: expired, timestamp: Date.now() - 2 * 60 * 60 * 1000 })
        )
        const freshPosts = [{ id: 'new', media_type: 'IMAGE', media_url: 'http://test.com/new.jpg', permalink: 'http://instagram.com/p/new' }]
        fetchMock.mockResponseOnce(JSON.stringify({ data: freshPosts }))

        const { result } = renderHook(() => hook.useInstagramFeed())

        await act(async () => {})

        expect(result.current.posts).toEqual(freshPosts)
    })
})
