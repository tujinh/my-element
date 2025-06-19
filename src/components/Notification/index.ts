import Notification from "./Notification.vue"
import { computed, h, ref, render, watch } from 'vue'
import type { NotificationCreator, NotificationProps, NotificationInstance } from './types'

const defaultOptions = {
    title: '',
    message: '',
    duration: 3000,

}
let seed = 0
const instances = ref<NotificationInstance[]>([])

export const TNotification: NotificationCreator = (options: NotificationProps) => {
    const id = seed++
    const close = () => {
        console.log(id)
        const index = instances.value.findIndex(item => item.id === id)
        if (index == -1) return
        instances.value.splice(index, 1)
        options.onClose?.()
        vm.exposed!.visible.value = false
        let timer = setTimeout(() => {
            clearTimeout(timer)
            render(null, container)
        }, 300)
    }



    const props = { ...defaultOptions, ...options, onClose: close, id, zIndex: 1000 + seed }
    const container = document.createElement('div')
    const vnode = h(Notification, props)
    render(vnode, container)
    const vm = vnode.component!
    document.body.appendChild(container.firstElementChild!)
    const instance = {
        close,
        id,
        vm
    }
    instances.value.push(instance)
    return {
        close
    }
}
(['success', 'info', 'warning', 'error', 'primary'] as const).forEach(type => {
    TNotification[type] = options => {
        return TNotification({
            ...options,
            type
        })
    }
})

const closeAll = () => {
    while (instances.value.length) {
        instances.value[0].close()
    }
}

TNotification.closeAll = closeAll

const getLastBottomOffset = (id) => {
    const index = instances.value.findIndex(item => item.id === id)
    if (index <= 0) return 0
    return instances.value[index - 1].vm.exposed!.bottomOffset.value
}
export function useOffset(option) {
    const lastBottomOffset = computed(() => getLastBottomOffset(option.id))
    const topOffset = computed(() => option.offset + lastBottomOffset.value)
    const bottomOffset = computed(() => topOffset.value + option.boxHeight.value)
    // console.log(lastBottomOffset.value, topOffset.value, bottomOffset.value)
    return {
        topOffset,
        bottomOffset
    }
}