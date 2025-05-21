<script setup lang="ts">
import type { CollapseItemExpose, CollapseItemProps } from './types'
import { COLLAPSE_INJECTION_KEY } from './constants'
import { computed, inject, watch } from 'vue'
defineOptions({
    name: 'TCollapseItem'
})

const props = defineProps<CollapseItemProps>()
const ctx = inject(COLLAPSE_INJECTION_KEY)
const isActive = computed(() => {
    return ctx?.activeNames.value.includes(props.name)
})

const handleClick = () => {
    if (props.disabled) return
    ctx?.handleItemClick(props.name)
}



defineExpose<CollapseItemExpose>({
    isActive
})

const _setHeightZero = (el: HTMLElement) => (el.style.height = '0')

const _setHeightScroll = (el: HTMLElement) => (el.style.height = `${el.scrollHeight}px`)

const _setHeightEmpty = (el: HTMLElement) => (el.style.height = '')

const _setOverflowHidden = (el: HTMLElement) => (el.style.overflow = 'hidden')

const _setOverflowEmpty = (el: HTMLElement) => (el.style.overflow = '')

const transitionEvents: Record<string, (el: HTMLElement) => void> = {
    beforeEnter(el) {
        _setHeightZero(el)
        _setOverflowHidden(el)
    },
    enter: (el) => _setHeightScroll(el),
    afterEnter: (el) => {
        _setHeightEmpty(el)
        _setOverflowEmpty(el)
    },
    beforeLeave(el) {
        _setHeightScroll(el)
        _setOverflowHidden(el)
    },
    leave: (el) => _setHeightZero(el),
    afterLeave: (el) => {
        _setHeightEmpty(el)
        _setOverflowEmpty(el)
    }
}

</script>


<template>
    <div class="t-collapse-item" :class="{ 'is-disabled': disabled, 'is-active': isActive }">
        <div class="t-collapse-item__header" @click="handleClick">
            <slot name="title">{{ title }}</slot>
            <slot name="icon">
                <t-icon icon="angle-right" class="header-angle"></t-icon>
            </slot>
        </div>
        <transition name="slide" v-on="transitionEvents">
            <div class="t-collapse-item__wapper" v-show="isActive">
                <div class="t-collapse-item__content" :id="`item-content-${name}`">
                    <slot></slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<style scoped>
@import './style.css';
</style>