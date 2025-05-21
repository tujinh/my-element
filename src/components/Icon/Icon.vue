<script setup lang="ts">
import type { IconProps } from './types'
import { computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { omit } from 'lodash-es'

defineOptions({
    name: 'TIcon',
    inheritAttrs: false
})

const props = defineProps<IconProps>()

const filterProps = computed(() => omit(props, ['color']))

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