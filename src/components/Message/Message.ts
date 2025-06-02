import Message from './Message.vue'
import { h, createApp, isVNode, shallowReactive, render } from 'vue'
import type { MessageType, MessageHandler, MessageOptions, Message as IMessage, MessageProps, MessageInstance, MessageFn } from './types'
import { isString, findIndex, each, set } from 'lodash-es'

export const optionDefaults = {
    type: 'info',
    plain: false,
    duration: 3000,
    showClose: false,
    offset: 16
} as const

let seed = 0

const instances: MessageInstance[] = shallowReactive([])

export const normalizeOptions = (options: MessageOptions): MessageProps => {
    const result = !options || isVNode(options) || isString(options) ? {
        message: options
    } : options
    return { ...optionDefaults, ...result }
}

const createMessage = (props: MessageProps): MessageInstance => {
    const id = `message_${seed++}`
    const container = document.createElement('div')

    const close = () => {
        const index = findIndex(instances, id)
        if (index == -1) return
        instances.splice(index, 1)
        render(null, container)
    }

    const _props = {
        ...props,
        id,
        onClose: close
    }

    const vnode = h(Message, _props)
    render(vnode, container)
    document.body.appendChild(container.firstElementChild!)

    const vm = vnode.component!
    const handler: MessageHandler = {
        close: () => vm.exposed!.close()
    }
    const instance: MessageInstance = {
        id,
        vnode,
        props: _props,
        vm,
        handler
    }

    instances.push(instance)
    return instance

}
export const TMessage: MessageFn & Partial<IMessage> = (options = {}) => {
    const normalized = normalizeOptions(options)
    const instance = createMessage(normalized)
    return instance.handler
}

export const closeAll = (type?: MessageType) => {
    each(instances, (instance) => {
        if (type) {
            instance.props.type === type && instance.handler.close()
            return
        }
        instance.handler.close()
    })
}

each(['success', 'info', 'warning', 'error'] as const, (type) => {
    set(TMessage, type, (options: MessageOptions) => {
        const normalized = normalizeOptions(options)
        return TMessage({ ...normalized, type })
    })
})
TMessage.closeAll = closeAll

