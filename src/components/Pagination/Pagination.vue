<script setup lang="ts">
import { TIcon } from '..';
import type { PaginationProps, PaginationEmits } from './types';
import { h, ref, defineComponent, render, onMounted, computed } from 'vue'
defineOptions({
    name: 'TPagination'
})

const props = withDefaults(defineProps<PaginationProps>(), {
    size: 'default',
    defaultPageSize: 10,
    pageSizes: () => [10, 20, 30, 40, 50],
    layout: 'total, sizes, prev, pager, next, jumper',
    pagerCount: 7,
    currentPage: 1
})

const emits = defineEmits<PaginationEmits>()

const pagination = ref()

const pageCount = computed(() => {
    return props.pageCount || (props.total ? Math.ceil(props.total / (props.pageSize || props.defaultPageSize)) : 0)
})

const prev = () => h('button', {
    class: 't-pagination-prev'
}, h(TIcon, { icon: 'angle-left' }))
const next = () => h('button', {
    class: 't-pagination-next'
}, h(TIcon, { icon: 'angle-right' }))

const pager = () => h('ul', { class: 't-pagination-pager' }, new Array(pageCount.value).fill(0).map((item, index) => h('li', { class: 't-pagination-pager-number' }, index + 1)))
</script>


<template>
    <div ref="pagination" class="t-pagination" :class="{
        [`t-pagination-${props.size}`]: size,
        'is-background': background,
    }">
        <component :is="prev"></component>
        <component :is="pager"></component>
        <component :is="next"></component>
    </div>


</template>


<style scoped>
@import './style.css';
</style>