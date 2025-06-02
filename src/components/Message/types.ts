import type { ComponentInternalInstance, VNode } from "vue"


export type MessageType = 'success' | 'info' | 'warning' | 'error'

export interface MessageProps {
    type?: MessageType
    plain?: boolean
    icon?: string
    duration?: number
    showClose?: boolean
    onClose?: () => void
    offset?: number
    message?: string | VNode
}

export interface MessageHandler {
    close: () => void
}

export type MessageFn = {
    (props: MessageOptions): MessageHandler
    closeAll: () => void
}

export type MessageTypeFn = (props: MessageOptions) => MessageHandler

export interface Message extends MessageFn {
    success: MessageTypeFn,
    info: MessageTypeFn,
    warning: MessageTypeFn,
    error: MessageTypeFn
}

export type MessageOptions = string | VNode | MessageProps

export interface MessageInstance {
    id: string
    vnode: VNode
    props: MessageProps
    vm: ComponentInternalInstance
    handler: MessageHandler
}