import type { Ref } from 'vue'
export type InputValue = number | string

export interface InputProps {
    id?: string
    modelValue?: InputValue
    type?: HTMLInputElement['type']
    placeholder?: string
    disabled?: boolean
    size?: 'large' | 'default' | 'small',
    showPassword?: boolean
    maxLength?: number,
    clearable?: boolean
    readonly?: boolean
    autocomplete?: string
    autofocus?: boolean
    form?: string

}

export interface InputEmits {
    (e: 'update:modelValue', value: InputValue): void
    (e: 'blur', value: FocusEvent): void
    (e: 'focus', value: FocusEvent): void
    (e: 'change', value: InputValue): void
    (e: 'input', value: InputValue): void
    (e: 'clear'): void
}

export interface InputExpose {
    focus: () => void
    blur: () => void
    clear: () => void
    select: () => void
    ref: Ref<HTMLInputElement | HTMLTextAreaElement>
}