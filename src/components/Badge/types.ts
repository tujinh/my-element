


export interface BadgeProps {
    value?: string | number
    isDot?: boolean
    hide?: boolean
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
    offset?: [number, number]
    max?: number
}