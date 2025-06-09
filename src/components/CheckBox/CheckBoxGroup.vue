<script setup lang="ts">
import type { CheckBoxGroupProps, CheckBoxGroupEmits, CheckBoxValue } from './types';
import { CHECK_BOX_GROUP_KEY } from './constants'
import { provide, computed, watch } from 'vue'
defineOptions({
    name: 'TCheckBoxGroup'
})

const props = withDefaults(defineProps<CheckBoxGroupProps>(), {
    modelValue: () => []
})

const chosedBoxes = computed(() => props.modelValue as any[])

const disabled = computed(() => props.disabled)

const min = computed(() => props.min)
const max = computed(() => props.max)


const emits = defineEmits<CheckBoxGroupEmits>()

const updateCheckList = (value: CheckBoxValue) => {
    emits('update:modelValue', value as object)
    emits('change', value as object)
}

provide(CHECK_BOX_GROUP_KEY, { chosedBoxes, updateCheckList, disabled, min, max })



</script>


<template>
    <div class="t-checkbox-group" :class="{
        'is-disable': props.disabled,
    }">
        <slot></slot>
    </div>



</template>



<style scoped>
@import './style.css';
</style>