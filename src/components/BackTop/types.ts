



export interface BackTopProps {
    visibleHeight?: number
    right?: number
    bottom?: number,
    // smooth?: boolean
}

export interface BackTopEmits {
    (e: 'click', event: MouseEvent): void
}