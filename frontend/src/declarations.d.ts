declare module '*.webp'
declare module '*.png'
declare module '*.jpeg'
declare module '*.gif'

declare module '*.jpg' {
    const value: any
    export default value
}

declare module '*.svg' {
    import React from 'react'
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
    const src: any
    export default any
}
