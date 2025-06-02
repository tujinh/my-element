<script setup lang="ts">
import type { DialogProps, DialogEmits, DialogExpose } from './types';
import { ref, computed, watch, nextTick } from 'vue'

defineOptions({
    name: 'TDialog'
})

const props = withDefaults(defineProps<DialogProps>(), {
    width: '50%',
    fullscreen: false,
    top: '15vh',
    modal: true,
    lockScroll: false,
    openDelay: 0,
    closeDelay: 0,
    closeOnClickModal: true,
    showClose: true,
})



const emits = defineEmits<DialogEmits>()

const dialogVisible = ref(props.modelValue)
watch(() => props.modelValue, (val) => {
    if (val) {
        let timer = setTimeout(() => {
            dialogVisible.value = val
            emits('open')
            clearTimeout(timer)
            if (props.lockScroll) {
                document.body.style.overflow = 'hidden'
            }
        }, props.openDelay)

    } else {
        let timer = setTimeout(() => {
            dialogVisible.value = val
            emits('close')
            clearTimeout(timer)
            document.body.style.overflow = ''
        }, props.closeDelay)

    }
})
const closeDialog = () => {
    if (props.beforeClose) {
        props.beforeClose(() => emits('update:modelValue', false))
    }
    emits('update:modelValue', false)
}

const clickModal = () => {
    if (props.closeOnClickModal) {
        closeDialog()
    }
}

const resetPosition = () => {
    transX.value = 0
    transY.value = 0
    dialog.value.style.transform = `translate(${transX.value}px, ${transY.value}px)`
}

const isDragging = ref(false)
let startX: number
let startY: number
const dialog = ref()

const handleMouseDown = (e: MouseEvent) => {
    if (!props.draggable) return
    startX = e.clientX
    startY = e.clientY
    isDragging.value = true
    document.onmousemove = handleMouseMove
    document.onmouseup = handleMouseUp
}
const transX = ref(0)
const transY = ref(0)

const handleMouseMove = (e: MouseEvent) => {
    if (isDragging.value) {
        const rect = dialog.value.getBoundingClientRect()
        const offsetX = e.clientX - startX
        const offsetY = e.clientY - startY
        if (props.overflow && ((rect.left <= 0 && offsetX < 0) || (rect.right >= window.innerWidth && offsetX > 0) || (rect.top <= 0 && offsetY < 0) || (rect.bottom >= window.innerHeight && offsetY > 0))) {
            return
        }
        transX.value += offsetX
        transY.value += offsetY
        dialog.value.style.transform = `translate(${transX.value}px, ${transY.value}px)`
        startX = e.clientX
        startY = e.clientY
    }
}

const handleMouseUp = () => {
    isDragging.value = false
}


defineExpose<DialogExpose>({
    resetPosition
})


</script>

<template>
    <transition name="fade">
        <div class="t-overlay" @click="clickModal" v-show="dialogVisible" :class="{
            'hide-modal': !modal
        }" :style="{ paddingRight: (dialogVisible && lockScroll) ? '17px' : '0px' }">
            <div class="t-dialog" ref="dialog" :class="{
            ['show-close']: showClose,
            'content-center': center,
            'dialog-center': alignCenter,
            'is-draggable': draggable,
            'is-fullscreen': fullscreen,
            'is-dragging': isDragging
        }" :style="{ width: typeof width == 'string' ? (/^\d+$/.test(width) ? width + 'px' : width) : width + 'px' }">
                <div class="t-dialog-header" @mousedown="handleMouseDown" @click.stop="() => { }">
                    <t-icon @click="closeDialog" icon="xmark" size="1x" class="t-dialog-close"></t-icon>
                    <slot name="header">
                        <span class="t-dialog-title">this is title</span>
                    </slot>
                </div>
                <div class="t-dialog-body">
                    <slot>this is default</slot>
                </div>
                <div class="t-dialog-footer">
                    <slot name="footer"> this is footer</slot>
                </div>

            </div>
        </div>

    </transition>



</template>


<style scoped>
@import './style.css';
</style>