import { useState, useEffect, useCallback } from 'react'
import { useForm } from '@formspree/react'

const useReviews = () => {
    const formKey = process.env.REACT_APP_FORMSPREE_KEY as string
    const [dog, setDog] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [review, setReview] = useState<string>('')
    const [rating, setRating] = useState<number | null>(null)
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false)
    const [state, handleSubmit] = useForm(formKey)

    const handleDogChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDog(event.target.value)
    }

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReview(event.target.value)
    }

    const handleRatingChange = (
        _event: React.SyntheticEvent<Element, Event>,
        newValue: number | null
    ) => {
        setRating(newValue)
    }

    const resetForm = useCallback(() => {
        setDog('')
        setName('')
        setReview('')
        setRating(null)
        setShowSuccessMessage(false)
    }, [])

    const handleSuccess = useCallback(() => {
        if (state.succeeded) {
            setShowSuccessMessage(true)
            const timer = setTimeout(() => {
                resetForm()
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [state.succeeded, resetForm])

    const onFormSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        if (dog && name && review && rating !== null) {
            handleSubmit({ dog, name, review, rating })
        }
    }

    useEffect(() => {
        handleSuccess()
    }, [handleSuccess])

    return {
        dog,
        name,
        review,
        rating,
        showSuccessMessage,
        state,
        onFormSubmit,
        handleDogChange,
        handleNameChange,
        handleReviewChange,
        handleRatingChange,
    }
}

const hook = {
    useReviews,
}

export default hook
