import { renderHook, act } from '@testing-library/react'
import hook, { IUseInfoCardProps } from './useInfoCard'

describe('useInfoCard Hook', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should call onClick when handleClick is invoked and onClick is provided', () => {
        const onClickMock = jest.fn()
        const props: IUseInfoCardProps = { onClick: onClickMock }

        const { result } = renderHook(() => hook.useInfoCard(props))

        act(() => {
            result.current.handleClick()
        })

        expect(onClickMock).toHaveBeenCalledTimes(1)
    })

    it('should set clickable to true when onClick is provided', () => {
        const onClickMock = jest.fn()
        const props: IUseInfoCardProps = { onClick: onClickMock }

        const { result } = renderHook(() => hook.useInfoCard(props))

        expect(result.current.clickable).toBe(true)
    })

    it('should set clickable to false when onClick is not provided', () => {
        const props: IUseInfoCardProps = {}

        const { result } = renderHook(() => hook.useInfoCard(props))

        expect(result.current.clickable).toBe(false)
    })
})
