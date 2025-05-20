<script setup lang="ts">
import type { ButtonGroupProps } from './types'
import { provide, reactive, toRef } from 'vue'
import { BUTTON_GROUP_CTX_KEY } from './constants';

defineOptions({
    name: 'TButtonGroup'
})

const props = defineProps<ButtonGroupProps>()
provide(
    BUTTON_GROUP_CTX_KEY,
    reactive({
        size: toRef(props, 'size'),
        type: toRef(props, 'type'),
    })
)
</script>

<template>
    <div class="t-button-group">
        <slot></slot>
    </div>
</template>

<style scoped>
@import './style.css';
</style>