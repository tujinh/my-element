<script setup lang="ts">
import type { IconProps } from './types'
import { computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineOptions({
    name: 'TIcon',
    inheritAttrs: false
})

const props = defineProps<IconProps>()

const filterProps = computed(() => {
    const result: Record<string, any> = {}
    Object.entries(props).forEach(([key, value]) => {
        if (key != 'color') {
            result[key] = value
        }
    })
    return result
})

const customStyles = computed(() => ({ color: props.color ?? void 0 }))


</script>


<template>
    <i class="t-icon" :style="customStyles" v-bind="$attrs">
        <font-awesome-icon v-bind="filterProps" />
    </i>

</template>

<style scoped>
@import './style.css';

:deep(.fa-spinner.fa-spin) {
    animation: fa-spin 3s linear infinite;
}
</style>