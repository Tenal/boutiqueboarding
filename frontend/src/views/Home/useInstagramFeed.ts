import { useState, useEffect } from 'react'

interface IInstagramPost {
    id: string
    media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
    media_url: string
    thumbnail_url?: string
    permalink: string
    caption?: string
}

interface IInstagramFeedState {
    posts: IInstagramPost[]
    loading: boolean
    error: boolean
}

const CACHE_KEY = 'bb_instagram_feed'
const CACHE_TTL_MS = 60 * 60 * 1000 // 1 hour

function getCachedFeed(): IInstagramPost[] | null {
    try {
        const raw = localStorage.getItem(CACHE_KEY)
        if (!raw) return null
        const { posts, timestamp } = JSON.parse(raw)
        if (Date.now() - timestamp > CACHE_TTL_MS) return null
        return posts
    } catch {
        return null
    }
}

function setCachedFeed(posts: IInstagramPost[]) {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ posts, timestamp: Date.now() }))
    } catch {
        // localStorage unavailable — silently skip caching
    }
}

const useInstagramFeed = (): IInstagramFeedState => {
    const [posts, setPosts] = useState<IInstagramPost[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const token = process.env.REACT_APP_INSTAGRAM_TOKEN
        if (!token) {
            setLoading(false)
            return
        }

        const cached = getCachedFeed()
        if (cached) {
            setPosts(cached)
            setLoading(false)
            return
        }

        const url = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption&limit=9&access_token=${token}`

        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error('Instagram API error')
                return res.json()
            })
            .then((data) => {
                const fetched: IInstagramPost[] = data.data ?? []
                setCachedFeed(fetched)
                setPosts(fetched)
                setLoading(false)
            })
            .catch(() => {
                setError(true)
                setLoading(false)
            })
    }, [])

    return { posts, loading, error }
}

const hook = { useInstagramFeed }
export default hook
