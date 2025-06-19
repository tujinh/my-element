import type { offset } from "@popperjs/core"
import type { ComponentInternalInstance, VNode, Component } from "vue"

export type Type = 'success' | 'warning' | 'info' | 'error' | 'primary'

export enum Position {
    topLeft = 'top-left',
    topRight = 'top-right',
    bottomLeft = 'bottom-left',
    bottomRight = 'bottom-right'
}

export interface NotificationProps {
    id?: number
    zIndex?: number
    title?: string
    message?: string | VNode | (() => VNode)
    type?: Type
    position?: Position
    icon?: string | Component
    duration?: number
    showClose?: boolean
    onClose?: () => void
    onClick?: () => void
    offset?: number
}

export interface NotificationEmits {
    (e: 'close'): void
}

export interface NotificationInstance {
    id: number
    close: () => void
    vm: ComponentInternalInstance
}

export type NotificationFn = {
    (options: NotificationProps): NotificationInstance
}
export interface NotificationCreator extends NotificationFn {
    success: NotificationFn
    info: NotificationFn
    warning: NotificationFn
    error: NotificationFn
    primary: NotificationFn
    closeAll: () => void
}

