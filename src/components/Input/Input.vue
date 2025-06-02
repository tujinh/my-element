<script setup lang="ts">
import type { InputEmits, InputExpose, InputProps } from './types'
import { ref, watch, computed, useAttrs, nextTick } from 'vue'
import { useFocusController } from '@/hooks'
import { each, noop } from 'lodash-es'

defineOptions({
    name: 'TInput',

})

let _ref = ref<HTMLInputElement | HTMLTextAreaElement>()

const props = withDefaults(defineProps<InputProps>(), {
    type: 'text',
    autocomplete: 'off'
})
const emits = defineEmits<InputEmits>()

const attrs = useAttrs()
// console.log(attrs)

const value = ref(props.modelValue)

// watch(value, (val) => {
//     console.log(val)
//     emits('update:modelValue', val)
// })

const isFocus = ref(false)
const showPwd = ref(false)

const isDisable = computed(() => props.disabled)

const showClear = computed(() => props.clearable && !!value.value && !isDisable.value && isFocus.value)

const showPwdArea = computed(() => props.type == 'password' && props.showPassword && !isDisable.value && !!value.value)


const handleFocus = (e: FocusEvent) => {
    if (props.disabled) return
    isFocus.value = true
    emits('focus', e)
    _ref.value?.focus()
}
const handleBlur = (e: FocusEvent) => {
    if (props.disabled) return
    isFocus.value = false
    emits('blur', e)
    _ref.value?.blur()
}

// const { wrapperRef, isFocused, handleFocus, handleBlur } = useFocusController(_ref, {
//     afterBlur() {

//     }
// })
const clear: InputExpose['clear'] = () => {
    value.value = ''
    emits('update:modelValue', '')
    emits('clear')
}

// const focus: InputExpose['focus'] = async () => {
//     await nextTick()
//     _ref.value?.focus()
// }

// const blur: InputExpose['blur'] = async () => {
//     // await nextTick()
//     _ref.value?.blur()
// }

// const select: InputExpose['select'] = async () => {
//     _ref.value?.select()
// }

const handleInput = () => {
    emits('input', value.value)
    emits('update:modelValue', value.value)
}

const handleChange = () => {
    emits('change', value.value)
}

const togglePwdVisible = () => {
    showPwd.value = !showPwd.value
}

watch(() => props.modelValue, (val) => {
    value.value = val
})




// defineExpose<InputExpose>({
//     ref: _ref,
//     focus: focusEvent,
//     blur: blurEvent,
//     clear,
//     select
// })

defineExpose({
    ref: _ref,
    focus: handleFocus,
    blur: handleBlur,
    clear

})
</script>


<template>
    <div :class="{
        [`t-${type == 'textarea' ? 'textarea' : 'input'}`]: true,
        'is-focus': isFocus,
        'is-disable': isDisable,
        'is-prepend': $slots.prepend,
        'is-append': $slots.append,
        'is-prefix': $slots.prefix,
        'is-suffix': $slots.suffix,
        [`t-input-${size}`]: size

    }">
        <textarea v-if="type === 'textarea'" class="t-textarea-inner" v-model="value" ref="_ref"
            :placeholder="placeholder" :disabled="isDisable" :readonly="readonly" :autocomplete="autocomplete"
            :autofocus="autofocus" @input="handleInput" @change="handleChange" @focus="handleFocus"
            @blur="handleBlur"></textarea>
        <template v-else>
            <div class="t-input-prepend" v-if="$slots.prepend">
                <slot name="prepend"></slot>
            </div>
            <div class="t-input-wrapper" ref="wrapperRef">
                <span v-if="$slots.prefox" class="t-input-prefix">
                    <slot name="prefix"></slot>
                </span>
                <input :disabled="isDisable" @blur="handleBlur" @focus="handleFocus" class="t-input-inner"
                    v-model="value" ref="_ref" :type="showPassword ? (showPwd ? 'text' : 'password') : type"
                    :placeholder="placeholder" :readonly="readonly" :autocomplete="autocomplete" :autofocus="autofocus"
                    :form="form" @input="handleInput" @change="handleChange">
                <span v-if="$slots.suffix || showClear || showPwdArea" class="t-input-suffix">
                    <slot name="suffix"></slot>
                    <t-icon icon="circle-xmark" v-if="showClear" class="t-input-clear" @click="clear"
                        @mousedown.prevent="noop" size="2xs"></t-icon>
                    <t-icon @click="togglePwdVisible" v-if="showPwdArea && showPwd" icon="eye" class="t-input-password"
                        size="2xs"></t-icon>
                    <t-icon @click="togglePwdVisible" v-if="showPwdArea && !showPwd" icon="eye-slash"
                        class="t-input-password" size="2xs"></t-icon>
                </span>
            </div>
            <div v-if="$slots.append" class="t-input-append">
                <slot name="append"></slot>
            </div>

        </template>


    </div>


</template>

<style scoped>
@import './style.css';
</style>
