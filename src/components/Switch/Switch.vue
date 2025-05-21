<script setup lang="ts">
import type { SwitchProps, SwitchEmits } from './types'
import { ref, computed, watch } from 'vue'

defineOptions({
    name: 'TSwitch'
})

const props = withDefaults(defineProps<SwitchProps>(), {
    modelValue: undefined,
    activeValue: true,
    inactiveValue: false,
})

const emits = defineEmits<SwitchEmits>()

console.log(props.modelValue)
const isActive = ref(props.modelValue)
watch(() => props.modelValue, (value) => {
    isActive.value = value
})
const changeSwitch = () => {
    if (props.modelValue == undefined || props.disabled) return
    isActive.value = isActive.value == props.activeValue ? props.inactiveValue : props.activeValue
    emits('update:modelValue', isActive.value)
    emits('change', isActive.value)
}


</script>


<template>
    <div class="t-switch" @click="changeSwitch" :class="{
        'is-active': isActive == activeValue ? true : false,
        [`t-switch-${size}`]: size,
        'is-disable': disabled,
    }">
        <span class="t-switch-label front-label" v-if="inactiveText && !inlinePrompt">{{ inactiveText }}</span>
        <span class="t-switch-core" :style="{ width: props.width ? (props.width + 'px') : '' }">
            <div class="t-switch-inner-prompt" v-if="inlinePrompt">
                {{ isActive == activeValue ? activeText : inactiveText }}
            </div>
            <span class="t-switch-core-inner"></span>
        </span>
        <span class="t-switch-label back-label" v-if="activeText && !inlinePrompt">{{ activeText }}</span>
    </div>

</template>


<style scoped>
@import './style.css';
</style>