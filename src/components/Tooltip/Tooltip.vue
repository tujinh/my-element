<script setup lang="ts">
import type { TooltipEmits, TooltipExpose, TooltipProps } from './types'
import { ref, type Ref, computed, watchEffect, watch, onUnmounted } from 'vue'
import { bind, debounce, isNil, type DebouncedFunc } from 'lodash-es'
import { createPopper, type Instance } from '@popperjs/core'
import { useClickOutside } from '@/hooks'
defineOptions({
    name: 'TTooltip'
})

const props = withDefaults(defineProps<TooltipProps>(), {
    placement: 'bottom',
    trigger: 'hover',
    transition: 'fade',
    showTimeout: 0,
    hideTimeout: 200
})

const emits = defineEmits<TooltipEmits>()

const visible = ref(false)
const virtualTriggering = ref(false)

const events: Ref<Record<string, EventListener>> = ref({})
const outerEvents: Ref<Record<string, EventListener>> = ref({})
const dropdownEvents: Ref<Record<string, EventListener>> = ref({})

const containerNode = ref<HTMLElement>()
const popperNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()

const popperOptions = computed(() => ({
    placement: props.placement,
    modifiers: [
        {
            name: 'offset',
            options: {
                offset: [0, 8]
            }
        }
    ],
    ...props.popperOptions
}))

const openDelay = computed(() => props.trigger === 'hover' ? props.showTimeout : 0)
const closeDelay = computed(() => props.trigger === 'hover' ? props.hideTimeout : 0)

let openDebounce: DebouncedFunc<() => void> | void
let closeDebounce: DebouncedFunc<() => void> | void

function openFinal() {
    closeDebounce?.cancel()
    openDebounce?.()
}

function closeFinal() {
    openDebounce?.cancel()
    closeDebounce?.()
}

function togglePopper() {
    visible.value ? closeFinal() : openFinal()
}
function setVisible(value: boolean) {
    if (props.disabled) return
    visible.value = value
    emits('visible-change', value)
}

function attachEvents() {
    if (props.disabled || props.manual) return
    if (props.trigger == 'hover') {
        events.value['mouseenter'] = openFinal
        outerEvents.value['mouseleave'] = closeFinal
        dropdownEvents.value['mouseenter'] = openFinal
        return
    }
    if (props.trigger == 'click') {
        events.value['click'] = togglePopper
        return
    }
    if (props.trigger == 'contextmenu') {
        events.value['contextmenu'] = (e) => {
            e.preventDefault()
            openFinal()
        }
        return
    }
}

let popperInstance: null | Instance

function destroyPopperInstance() {
    if (isNil(popperInstance)) return
    popperInstance.destroy()
    popperInstance = null

}

function resetEvents() {
    events.value = {}
    outerEvents.value = {}
    dropdownEvents.value = {}
    attachEvents()
}

const show: TooltipExpose['show'] = openFinal
const hide: TooltipExpose['hide'] = function () {
    openDebounce?.cancel()
    setVisible(false)
}

watch(visible, (value) => {
    if (!value) return
    if (triggerNode.value && popperNode.value) {
        popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value)
    }
}, {
    flush: 'post'
})

watch(() => props.manual, (isManual) => {
    if (isManual) {
        resetEvents()
        return
    }
    attachEvents()
})

watch(() => props.trigger, (val, oldVal) => {
    if (val == oldVal) return
    openDebounce?.cancel()
    visible.value = false
    emits('visible-change', false)
    resetEvents()
})

watchEffect(() => {
    if (!props.manual) {
        attachEvents()
    }
    openDebounce = debounce(bind(setVisible, null, true), openDelay.value)
    closeDebounce = debounce(bind(setVisible, null, false), closeDelay.value)
})

useClickOutside(containerNode, () => {
    emits('click-outside')
    if (props.trigger == 'hover' || props.manual) return

    visible.value && closeFinal()

})

onUnmounted(() => {
    destroyPopperInstance()
})

defineExpose<TooltipExpose>(
    {
        show,
        hide
    }
)


</script>

<template>
    <div class="t-tooltip" ref="containerNode" v-on="outerEvents">
        <div class="t-tooltip__trigger" ref="triggerNode" v-on="events" v-if="!virtualTriggering">
            <slot></slot>
        </div>
        <slot name="default" v-else></slot>
        <transition :name="transition" @after-leave="destroyPopperInstance">
            <div class="t-tooltip__popper" ref="popperNode" v-on="dropdownEvents" v-if="visible">
                <slot name="content">{{ content }}</slot>
                <div id="arrow" data-popper-arrow></div>
            </div>
        </transition>
    </div>

</template>


<style scoped></style>