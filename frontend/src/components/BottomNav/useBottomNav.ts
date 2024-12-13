import { useState, useEffect, useCallback } from 'react'
import { useForm } from '@formspree/react'

const useBottomNav = () => {
    const [email, setEmail] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false)
    const formKey = process.env.REACT_APP_FORMSPREE_KEY as string
    const [state, handleSubmit] = useForm(formKey)
    const { succeeded, errors, submitting } = state
    const currentYear = new Date().getFullYear()

    const resetForm = useCallback(() => {
        setEmail(null)
        setMessage(null)
        setShowSuccessMessage(false)
    }, [])

    const handleSuccess = useCallback(() => {
        if (succeeded) {
            setShowSuccessMessage(true)
            const timer = setTimeout(() => {
                resetForm()
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [succeeded, resetForm])

    useEffect(() => {
        handleSuccess()
    }, [handleSuccess])

    return {
        email,
        setEmail,
        message,
        setMessage,
        showSuccessMessage,
        errors,
        submitting,
        handleSubmit,
        currentYear,
    }
}

const hook = {
    useBottomNav,
}

export default hook
