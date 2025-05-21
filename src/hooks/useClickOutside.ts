import { type Ref } from 'vue'
import useEventListener from './useEventListener'


export default function useClickOutside(
    elementRef: Ref<HTMLElement | void>,
    callback: (e: MouseEvent) => any) {
    useEventListener(document, 'click', e => {
        if (elementRef.value && e.target) {
            if (!elementRef.value.contains(e.target as HTMLElement)) {
                callback(e as MouseEvent)
            }
        }
    })
}