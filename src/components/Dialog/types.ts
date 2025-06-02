


export interface DialogProps {
    modelValue?: boolean
    title?: string
    width?: string | number
    fullscreen?: boolean
    top?: string
    modal?: boolean
    appendToBody?: boolean
    lockScroll?: boolean
    openDelay?: number
    closeDelay?: number
    closeOnClickModal?: boolean
    showClose?: boolean
    draggable?: boolean
    center?: boolean
    alignCenter?: boolean
    overflow?: boolean,
    beforeClose?: (done: () => void) => void
}

export interface DialogEmits {
    (e: 'update:modelValue', value: boolean): void
    (e: 'open'): void
    (e: 'opened'): void
    (e: 'close'): void
    (e: 'closed'): void
}

export interface DialogExpose {
    resetPosition: () => void
}