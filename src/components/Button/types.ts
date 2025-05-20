import type { Component, Ref, ComputedRef } from "vue"
import ButtonGroup from "./ButtonGroup.vue"
export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export type ButtonSize = 'large' | 'default' | 'small'

export interface ButtonProps {
    type?: ButtonType
    size?: ButtonSize
    plain?: boolean
    round?: boolean
    circle?: boolean
    disabled?: boolean
    icon?: string
    tag?: string | Component
    loading?: boolean
    loadingIcon?: string | Component
    autofocus?: boolean
}

export interface ButtonExpose {
    ref: Ref<HTMLButtonElement | void>,
    size: ComputedRef<ButtonSize | ''>,
    type: ComputedRef<ButtonType | ''>
    disabled: ComputedRef<boolean>
}

export interface ButtonGroupProps {
    type?: ButtonType
    size?: ButtonSize
}