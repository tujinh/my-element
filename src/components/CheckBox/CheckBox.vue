<script setup lang="ts">
import type { CheckBoxProps, CheckBoxEmits } from './types';
import { inject, watch, computed, ref } from 'vue'
import { CHECK_BOX_GROUP_KEY } from './constants'
defineOptions({
    name: 'TCheckBox'
})
const props = withDefaults(defineProps<CheckBoxProps>(), {
    label: '',
    checked: false,
    indeterminate: undefined
})

let checked = computed(() => props.checked)


const emits = defineEmits<CheckBoxEmits>()

const ctx = inject(CHECK_BOX_GROUP_KEY, null)
if (ctx && (ctx.chosedBoxes.value as any[]).includes(props.value)) {
    emits('update:modelValue', true)
}


const disableState = computed(() => {
    if (props.disabled) return true
    if (ctx) {
        if (ctx.disabled.value) return true
        if (ctx.max.value) {
            if (ctx.chosedBoxes.value.length >= ctx.max.value && !ctx.chosedBoxes.value.includes(props.value)) {
                return true
            } else {
                if (ctx.min.value) {
                    if (ctx.chosedBoxes.value.length <= ctx.min.value && ctx.chosedBoxes.value.includes(props.value)) {
                        return true
                    } else {
                        return false
                    }
                }
                return false
            }
        }
    }

})



const changeCheck = () => {
    if (disableState.value) return
    if (ctx) {
        let index = (ctx!.chosedBoxes.value as any[]).findIndex(item => item === props.value)
        if (index === -1) {
            ctx.updateCheckList([...(ctx.chosedBoxes.value as any[]), props.value])
        } else {
            ctx.updateCheckList((ctx.chosedBoxes.value as any[]).filter(item => item !== props.value))
        }
    }
    emits('update:modelValue', !props.modelValue)
    emits('change', !props.modelValue)
}


</script>


<template>
    <label class="t-checkbox" :class="{
        'is-disable': disableState,
        [`${props.indeterminate ? 'in' : ''}determinate`]: props.indeterminate != undefined
    }">
        <span class="t-checkbox-input" :class="{
        'is-checked': ctx?.chosedBoxes.value.includes(props.value) || modelValue || checked,
    }">
            <input @click.stop="changeCheck" class="t-checkbox-original" type="checkbox">
            <span class="t-checkbox-inner"></span>
        </span>
        <span v-if="$slots.default?.()" class="t-checkbox-label">
            <slot></slot>
        </span>
        <span v-else v-show="label" class="t-checkbox-label">{{ label }}</span>
    </label>
</template>


<style scoped>
@import './style.css';
</style>