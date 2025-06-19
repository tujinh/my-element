


export interface TransferProps {
    modelValue?: Array<string | number>
    data?: Record<string, any>[]
    titles?: [string, string]
    buttonTexts?: [string, string]
}

export interface TransferEmits {
    (e: 'update:modelValue', value: Array<string | number>): void
    (e: 'change', value: Array<string | number>, direction: 'left' | 'right', movedKeys: Array<string | number>): void
}