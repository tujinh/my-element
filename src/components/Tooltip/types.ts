import type { Placement, Options } from '@popperjs/core'


export interface TooltipProps {
    effect?: 'dark' | 'light'
    content?: string
    placement?: Placement
    trigger?: 'click' | 'contextmenu' | 'hover'
    manual?: boolean
    disabled?: boolean
    popperOptions?: Partial<Options>
    transition?: string
    showTimeout?: number
    hideTimeout?: number
}

export interface TooltipEmits {
    (e: 'visible-change', value: boolean): void
    (e: 'click-outside'): void
}

export interface TooltipExpose {
    show: () => void
    hide: () => void
}