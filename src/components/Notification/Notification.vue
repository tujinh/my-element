<script setup lang="ts">
import type { NotificationProps, NotificationEmits } from './types'
import { Position } from './types'
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'
import TIcon from '../Icon/Icon.vue';
import { useOffset } from './index';

const props = withDefaults(defineProps<NotificationProps>(), {
    position: Position.topRight,
})

const emits = defineEmits<NotificationEmits>()

const Icons = {
    success: 'check-circle',
    info: 'circle-info',
    warning: 'circle-exclamation',
    error: 'circle-xmark',
    primary: 'circle-info',
}

const iconName = computed(() => Icons[props.type || 'info'])

const visible = ref(false)
const notif = ref()
const boxHeight = ref(0)
let timer: number

const startTimer = () => {
    if (props.duration == 0) return
    timer = setTimeout(() => {
        visible.value = false
        emits('close')
    }, props.duration)
}
// watch(visible, (val) => {
//     if (!val) boxHeight.value = -10
// })
const clearTimer = () => {
    clearTimeout(timer)
}

const close = () => {
    visible.value = false
    emits('close')
}

onMounted(() => {
    visible.value = true
    startTimer()
})

const { topOffset, bottomOffset } = useOffset({
    boxHeight,
    id: props.id,
    offset: props.offset || 10
})

onBeforeUnmount(() => {
    clearTimer()
})

defineExpose({
    visible,
    bottomOffset
})

</script>


<template>
    <transition name="fade" @enter="boxHeight = notif.getBoundingClientRect().height">
        <div ref="notif" v-show="visible" class="t-notification" @mouseenter="clearTimer" @mouseleave="startTimer"
            :class="{
        right: position.includes('right'),
        left: position.includes('left'),
        [`t-notification-${type}`]: type,
    }" :style="{ top: topOffset + 'px', zIndex: zIndex }">
            <t-icon class="t-notification-icon" :icon="iconName"></t-icon>
            <div class="t-notification-body">
                <div class="t-notification-head">
                    <span class="t-notification-title">{{ title }}</span>
                    <t-icon v-if="showClose" @click="close" class="t-notification-close" icon="xmark"></t-icon>
                </div>
                <div class="t-notification-content">{{ message }}</div>
            </div>

        </div>
    </transition>



</template>


<style scoped>
@import './style.css';
</style>