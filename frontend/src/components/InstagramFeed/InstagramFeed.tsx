import React from 'react'
import { Box, Container, Typography, Grid } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram'
import { motion } from 'framer-motion'
import { useScrollReveal, scrollRevealVariants } from '../../utils/useScrollReveal'
import instagramHook from '../../views/Home/useInstagramFeed'

function InstagramFeed() {
    const { posts, loading, error } = instagramHook.useInstagramFeed()
    const { ref, isInView } = useScrollReveal({ threshold: 0.1 })

    if (loading || error || posts.length === 0) return null

    const displayPosts = posts.slice(0, 6)

    return (
        <Box className="instagramSection" py={7}>
            <Container maxWidth="xl">
                <motion.div
                    ref={ref}
                    variants={scrollRevealVariants.fadeUp}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    transition={{ duration: 0.5 }}
                >
                    <Box className="instagramHeader">
                        <InstagramIcon className="instagramIcon" />
                        <Box>
                            <Typography variant="h2" className="sectionTitle">
                                Follow Along
                            </Typography>
                            <Typography variant="body1" className="sectionSubtitle">
                                Daily pup updates on{' '}
                                <a
                                    href="https://instagram.com/boutiqueboarding"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="instagramLink"
                                >
                                    @boutiqueboarding
                                </a>
                            </Typography>
                        </Box>
                    </Box>

                    <Grid container spacing={1.5} mt={1}>
                        {displayPosts.map((post, index) => {
                            const imgSrc =
                                post.media_type === 'VIDEO'
                                    ? post.thumbnail_url ?? ''
                                    : post.media_url

                            return (
                                <Grid item xs={6} sm={4} key={post.id}>
                                    <motion.div
                                        variants={scrollRevealVariants.scaleIn}
                                        initial="hidden"
                                        animate={isInView ? 'visible' : 'hidden'}
                                        transition={{ duration: 0.4, delay: index * 0.07 }}
                                    >
                                        <a
                                            href={post.permalink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="instagramPostLink"
                                        >
                                            <Box className="instagramPost">
                                                <img
                                                    src={imgSrc}
                                                    alt={
                                                        post.caption
                                                            ? post.caption.slice(0, 60)
                                                            : 'Boutique Boarding Instagram post'
                                                    }
                                                    loading="lazy"
                                                    className="instagramImg"
                                                />
                                                <Box className="instagramOverlay">
                                                    <InstagramIcon className="instagramOverlayIcon" />
                                                    {post.caption && (
                                                        <Typography
                                                            variant="caption"
                                                            className="instagramCaption"
                                                        >
                                                            {post.caption.slice(0, 80)}
                                                            {post.caption.length > 80 ? '…' : ''}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            </Box>
                                        </a>
                                    </motion.div>
                                </Grid>
                            )
                        })}
                    </Grid>
                </motion.div>
            </Container>
        </Box>
    )
}

export default InstagramFeed
