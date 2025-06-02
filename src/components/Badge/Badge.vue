<script setup lang="ts">
import type { BadgeProps } from './types'
import { ref, computed } from 'vue'

defineOptions({
    name: 'TBadge'
})

const props = withDefaults(defineProps<BadgeProps>(), {
    value: '',
    type: 'danger',
    max: 99,
    offset: () => [0, 0],

})



const showValue = computed(() => props.value && !props.isDot)
const showFinal = computed(() => {
    if (typeof props.value == 'number' && props.max && props.value > props.max) {
        return props.max + '+'
    }
    return props.value
})

</script>

<template>
    <div class="t-badge">
        <slot></slot>
        <sup class="t-badge-content" :style="{ marginLeft: offset[0] + 'px', marginTop: offset[1] + 'px' }" :class="{
            [`t-badge-${type}`]: true,
            'is-dot': isDot,
            'is-hide': hide
        }">
            <slot name="content" :value="showFinal">
                {{ showValue ? showFinal : '' }}
            </slot>
        </sup>
    </div>

</template>

<style scoped>
@import './style.css';
</style>