<script setup lang="ts">
import type { InputEmits, InputExpose, InputProps } from './types'
import { ref, watch } from 'vue'

defineOptions({
    name: 'TInput'
})

let _ref = ref<HTMLInputElement | HTMLTextAreaElement>()

const props = withDefaults(defineProps<InputProps>(), {
    type: 'text'
})
const emits = defineEmits<InputEmits>()

let value = ref(props.modelValue)

watch(value, (val) => {
    console.log(val)
    emits('update:modelValue', val)
})

let isFocus = ref(false)

const focusEvent = () => {
    isFocus.value = true
    _ref.value?.focus()
}
const blurEvent = () => _ref.value?.blur()






defineExpose({
    ref: _ref,
    focus: focusEvent,
    blur: blurEvent

})
</script>


<template>
    <div class="t-input" :class="{
        'is-focus': isFocus
    }">
        <input @blur="isFocus = false" @focus="isFocus = true" class="t-input-inner" v-model="value" ref="_ref" :type="type"
            :placeholder="placeholder">
    </div>


</template>

<style scoped>
@import './style.css';
</style>
