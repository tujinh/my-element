<script setup lang="ts">
import type { AlertProps, AlertEmits, AlertExpose } from './types'
import { ref } from 'vue'

const props = withDefaults(defineProps<AlertProps>(), {
    type: 'info',
    closable: true,
    effect: 'light',
    showIcon: true
})

defineOptions({
    name: 'TAlert'
})

const visible = ref(true)

const open = () => {
    visible.value = true
}

defineExpose({
    open
})



const emits = defineEmits<AlertEmits>()

const closeAlert = () => {
    visible.value = false
    emits('close')
}

</script>

<template>
    <transition name="fade">
        <div v-show="visible" class="t-alert" :class="{
            [`t-alert-${type}`]: type,
            'is-center': center,
            [`t-alert-${effect}`]: effect,
            'has-icon': showIcon
        }">
            <template v-if="showIcon">
                <slot name="icon">
                    <t-icon icon="search" class="t-alert-icon"></t-icon>
                </slot>
            </template>

            <div class="t-alert-content">
                <div class="t-alert-title">
                    <slot name="title">{{ title }}</slot>
                </div>
                <div class="t-alert-discriptiton">
                    <slot>{{ description }}</slot>
                </div>
            </div>
            <t-icon v-show="closable" @click="closeAlert" class="t-alert-close" icon="xmark"></t-icon>
        </div>
    </transition>

</template>


<style scoped>
@import './style.css';
</style>