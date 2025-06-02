<script setup lang="ts">
import { isFunction } from 'lodash-es';
import type { MessageProps } from './types'
import { onMounted, ref, defineComponent } from 'vue'

defineOptions({
    name: 'TMessage'
})

const props = withDefaults(defineProps<MessageProps>(), {
    type: 'info',
    plain: false,
    duration: 3000,
    showClose: false,
    offset: 16
})

const visible = ref(false)
const _ref = ref<HTMLDivElement>()
let timer: number
const startTimer = () => {
    if (props.duration == 0) return
    timer = setTimeout(close, props.duration)
}

const clearTimer = () => {
    clearTimeout(timer)
}

const close = () => {
    visible.value = false
}

onMounted(() => {
    visible.value = true
    startTimer()
})

const RenderVnode = defineComponent({
    props: {
        vNode: {
            type: [String, Object, Function],
            required: true
        }
    },
    setup(props) {
        return () => (isFunction(props.vNode) ? props.vNode() : props.vNode)
    }
})

defineExpose({
    close
})

</script>


<template>
    <transiton name=fade>
        <div class="t-message" ref="_ref" :class="{
            [`t-message-${type}`]: type,
            'is-close': showClose,
        }" v-show="visible" @mouseenter="clearTimer" @mouseleave="startTimer">
            <t-icon class="t-message-icon" icon="search" size="1x"></t-icon>
            <div class="t-message-content">
                <slot>
                    <render-vnode v-if="message" :vNode="message"></render-vnode>"
                </slot>
            </div>
            <t-icon v-if="showClose" @click="close" class="t-message-close" icon="xmark" size="1x"></t-icon>
        </div>
    </transiton>


</template>


<style scoped>
@import './style.css';
</style>