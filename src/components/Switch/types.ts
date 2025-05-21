export type SwitchValue = boolean | string | number

export interface SwitchProps {
    modelValue?: SwitchValue | undefined
    size?: 'small' | 'default' | 'large'
    disabled?: boolean
    activeText?: string
    inactiveText?: string
    activeColor?: string
    inactiveColor?: string
    activeValue?: SwitchValue
    inactiveValue?: SwitchValue
    width?: string | number
    inlinePrompt?: boolean
}

export interface SwitchEmits {
    (e: 'update:modelValue', value: SwitchValue): void
    (e: 'change', value: SwitchValue): void
}