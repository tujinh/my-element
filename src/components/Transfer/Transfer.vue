<script setup lang="ts">
import type { TransferProps, TransferEmits } from './types'
import { ref } from 'vue'
defineOptions({
    name: 'TTransfer'
})

const props = withDefaults(defineProps<TransferProps>(), {
    modelValue: () => [],
    data: () => [],
})

const emits = defineEmits<TransferEmits>()

const leftData = ref<(typeof props.data)>(props.data.filter(item => !props.modelValue.includes(item.key)))
const rightData = ref<(typeof props.data)>(props.data.filter(item => props.modelValue.includes(item.key)))

const checkListLeft = ref<(typeof props.data)>([])
const checkAllLeft = ref(false)
const isIndeterminateLeft = ref(false)

const checkListRight = ref<(typeof props.data)>([])
const checkAllRight = ref(false)
const isIndeterminateRight = ref(false)

const handleChange = (value: string[], direction: 'left' | 'right') => {
    if (direction == 'left') {
        checkAllLeft.value = value.length == leftData.value.length
        isIndeterminateLeft.value = value.length > 0 && value.length < leftData.value.length
    } else {
        checkAllRight.value = value.length == rightData.value.length
        isIndeterminateRight.value = value.length > 0 && value.length < rightData.value.length
    }

}
const handleCheckAll = (val: boolean, direction: 'left' | 'right') => {
    if (direction == 'left') {
        checkListLeft.value = val ? leftData.value : []
        isIndeterminateLeft.value = false
    } else {
        checkListRight.value = val ? rightData.value : []
        isIndeterminateRight.value = false
    }

}

const move = (place: 'left' | 'right') => {
    if (place == 'left') {
        rightData.value = rightData.value.filter(item => !checkListRight.value.includes(item))
        leftData.value.push(...checkListRight.value)
        leftData.value.sort((a, b) => a.key - b.key)
        emits('change', rightData.value.map(item => item.key), 'left', checkListRight.value.map(item => item.key))
        checkListRight.value = []
        isIndeterminateRight.value = false
    } else {
        leftData.value = leftData.value.filter(item => !checkListLeft.value.includes(item))
        rightData.value.push(...checkListLeft.value)
        rightData.value.sort((a, b) => a.key - b.key)
        emits('change', rightData.value.map(item => item.key), 'right', checkListLeft.value.map(item => item.key))
        checkListLeft.value = []
        isIndeterminateLeft.value = false
    }
    emits('update:modelValue', rightData.value.map(item => item.key))


}

</script>



<template>
    <div class="t-transfer">
        <div class="t-transfer-panel">
            <div class="t-transfer-panel-head">
                <t-check-box v-model="checkAllLeft" :indeterminate="isIndeterminateLeft"
                    @change="(val) => handleCheckAll(val, 'left')">{{ titles ? titles[0] : 'list1' }}<span
                        class="t-transfer-count">{{ checkListLeft.length }}/{{ leftData.length }}</span></t-check-box>
            </div>
            <div class="t-transfer-panel-body">
                <t-check-box-group v-model="checkListLeft" @change="val => handleChange(val, 'left')">
                    <t-check-box :disabled="item.disabled" class="t-transfer-panel-item" v-for="item in leftData"
                        :key="item.value" :label="item.label" :value="item"></t-check-box>
                </t-check-box-group>
            </div>
        </div>
        <div class="t-transfer-button">
            <t-button @click="move('left')" type="primary" :disabled="checkListRight.length == 0">
                <t-icon icon="angle-left"></t-icon>
                <span v-show="buttonTexts">{{ buttonTexts ? buttonTexts[0] : '' }}</span>
            </t-button>
            <t-button @click="move('right')" type="primary" :disabled="checkListLeft.length == 0">
                <span v-show="buttonTexts">{{ buttonTexts ? buttonTexts[1] : '' }}</span>
                <t-icon icon="angle-right"></t-icon>
            </t-button>
        </div>
        <div class="t-transfer-panel">
            <div class="t-transfer-panel-head">
                <t-check-box v-model="checkAllRight" :indeterminate="isIndeterminateRight"
                    @change="(val) => handleCheckAll(val, 'right')">
                    {{ titles ? titles[1] : 'list2' }}<span class="t-transfer-count">{{ checkListRight.length }}/{{
                    rightData.length }}</span></t-check-box>
            </div>
            <div class="t-transfer-panel-body">
                <t-check-box-group v-model="checkListRight" @change="val => handleChange(val, 'right')">
                    <t-check-box :disabled="item.disabled" class="t-transfer-panel-item" v-for="item in rightData"
                        :key="item.value" :label="item.label" :value="item"></t-check-box>
                </t-check-box-group>
            </div>
        </div>
    </div>


</template>

<style scoped>
@import './style.css';
</style>