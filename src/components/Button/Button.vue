<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import type { ButtonProps, ButtonExpose } from './types'
import { BUTTON_GROUP_CTX_KEY } from './constants';
defineOptions({
    name: 'TButton'
})

const props = withDefaults(defineProps<ButtonProps>(), {
    tag: 'button',
    size: 'default',
})

const slots = defineSlots()

const _ref = ref<HTMLButtonElement>()
const ctx = inject(BUTTON_GROUP_CTX_KEY, void 0)
const size = computed(() => {
    return props.size ?? ctx?.size ?? ''
})

const type = computed(() => props.type ?? ctx?.type ?? '')

const disabled = computed(() => props.disabled || false)

const iconStyle = computed(() => ({ marginRight: slots.default ? '6px' : '0px' }))


defineExpose<ButtonExpose>({
    ref: _ref,
    size,
    type,
    disabled

})


</script>

<template>
    <component ref="_ref" :is="tag" :autofocus="autofocus" class="t-button"
        :disabled="disabled || loading ? true : void 0" :class="{
        [`t-button-${type}`]: type,
        [`t-button-${size}`]: size,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
        'is-disabled': disabled,
        'is-loading': loading


    }">
        <template v-if="loading">
            <slot name="loading">
                <t-icon class="loading-icon" :icon="loadingIcon ?? 'spinner'" :style="iconStyle" size="1x" spin />
            </slot>
        </template>
        <t-icon v-if="icon && !loading" :icon="icon" :style="iconStyle" size="1x" spin />
        <slot></slot>
    </component>

</template>

<style scoped>
@import './style.css';
</style>
