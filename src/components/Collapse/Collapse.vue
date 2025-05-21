<script setup lang="ts">
import { provide, computed, watch, watchEffect } from 'vue';
import type { CollapseExpose, CollapseEmits, CollapseProps, CollapseItemName } from './types'
import { COLLAPSE_INJECTION_KEY } from './constants'
defineOptions({
    name: 'TCollapse'
})

const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()


const activeNames = computed(() => props.modelValue)


const setActiveNames = (value: CollapseItemName[]) => {
    emits('update:modelValue', value)
    emits('change', value)
}

const handleItemClick = (value: CollapseItemName) => {
    let _activeNames = [...activeNames.value]
    if (props.accordion) {
        _activeNames[0] == value ? _activeNames = [''] : _activeNames = [value]
        setActiveNames(_activeNames)
    } else {
        let index = _activeNames.indexOf(value)
        if (index != -1) {
            _activeNames.splice(index, 1)
        } else {
            _activeNames.push(value)
        }
        setActiveNames(_activeNames)
    }

}

provide(COLLAPSE_INJECTION_KEY, {
    activeNames,
    handleItemClick
})


watch(() => props.modelValue, (value) => {
    setActiveNames(value!)
})

defineExpose({
    activeNames,
    setActiveNames
})

</script>


<template>
    <div class="t-collapse">
        <slot></slot>
    </div>

</template>

<style scoped>
@import './style.css';
</style>