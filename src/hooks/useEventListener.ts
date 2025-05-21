import { onMounted, onBeforeUnmount, watch, isRef, unref, type MaybeRef } from "vue";

export default function useEventListener(
    target: MaybeRef<EventTarget | HTMLElement | void>,
    event: string,
    handler: (e: Event) => any) {
    if (isRef(target)) {
        watch(target, (newTarget, oldTarget) => {
            oldTarget?.removeEventListener(event, handler)
            newTarget?.addEventListener(event, handler)
        })
    } else {
        onMounted(() => {
            target?.addEventListener(event, handler)
        })
    }
    onBeforeUnmount(() => {
        unref(target)?.removeEventListener(event, handler)
    })
}