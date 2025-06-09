import { type ComputedRef } from "vue"
enum Size {
    'large',
    'default',
    'small'
}

export type CheckBoxValue = string | number | boolean | object
export type CheckBoxLabel = Exclude<CheckBoxValue, object>


export interface CheckBoxProps {
    label?: CheckBoxLabel
    value?: CheckBoxValue
    modelValue?: CheckBoxLabel
    disabled?: boolean
    border?: boolean
    size?: Size
    checked?: boolean
    indeterminate?: boolean
}

export interface CheckBoxGroupProps {
    modelValue?: object
    disabled?: boolean
    size?: Size
    min?: number
    max?: number
}

export interface CheckBoxEmits {
    (e: 'update:modelValue', value: CheckBoxLabel): void
    (e: 'change', value: CheckBoxLabel): void
}

export interface CheckBoxGroupEmits {
    (e: 'update:modelValue', value: object): void
    (e: 'change', value: object): void
}

export interface CheckBoxGroupProvide {
    chosedBoxes: ComputedRef<any[]>
    updateCheckList: (value: CheckBoxValue) => void,
    disabled: ComputedRef<boolean>
    min: ComputedRef<number | undefined>
    max: ComputedRef<number | undefined>
}