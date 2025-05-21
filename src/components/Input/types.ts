import type { Ref } from 'vue'
export type InputValue = number | string

export interface InputProps {
    modelValue?: InputValue
    type?: HTMLInputElement['type']
    placeholder?: string
    disabled?: boolean
    size?: 'large' | 'default' | 'small'

}

export interface InputEmits {
    (e: 'update:modelValue', value: InputValue): void
    (e: 'blur', value: FocusEvent): void
    (e: 'focus', value: FocusEvent): void
    (e: 'change', value: InputValue): void
    (e: 'input', value: InputValue): void
}

export interface InputExpose {
    focus: () => void
    blur: () => void
    clear: () => void
    input: Ref<HTMLInputElement>
    ref: Ref<HTMLInputElement | HTMLTextAreaElement>
}