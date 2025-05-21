

export type AlertType = 'success' | 'info' | 'warning' | 'error'


export interface AlertProps {
    title?: string,
    type?: AlertType,
    closable?: boolean,
    closeText?: string,
    description?: string,
    center?: boolean,
    showIcon?: boolean,
    effect?: 'light' | 'dark'
}

export interface AlertEmits {
    (e: 'close'): void
}

export interface AlertExpose {
    open: () => void
}