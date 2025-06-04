<script setup lang="ts">
import { TIcon, TInput } from '..';
import type { PaginationProps, PaginationEmits } from './types';
import { h, ref, defineComponent, render, onMounted, computed, type Ref, useSlots, type VNode } from 'vue'
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
    class: {
        't-pagination-prev': true,
        'is-disable': props.disabled || props.currentPage == 1
    },
    disabled: props.disabled || props.currentPage == 1,
    onClick: prevPage
}, h(TIcon, { icon: 'angle-left' }))
const next = () => h('button', {
    class: {
        't-pagination-next': true,
        'is-disable': props.disabled || props.currentPage == pageCount.value
    },
    disabled: props.disabled || props.currentPage == pageCount.value,
    onClick: nextPage
}, h(TIcon, { icon: 'angle-right' }))

const icons = {
    more: 'ellipsis-h',
    left: 'angles-left',
    right: 'angles-right'
}

const licon = ref(icons.more), ricon = ref(icons.more)

const pagerNumbers = computed(() => {
    const pagerArrs = []
    if (pageCount.value <= props.pagerCount) {
        for (let i = 1; i <= pageCount.value; i++) {
            pagerArrs.push(i)
        }

    } else {
        const each = Math.floor(props.pagerCount / 2)  //4
        if (props.currentPage <= each + 1) {
            for (let i = 1; i < props.pagerCount; i++) {
                pagerArrs.push(i)
            }
            pagerArrs.push(h(TIcon, { icon: ricon.value }))
            pagerArrs.push(pageCount.value)
        } else if (props.currentPage > each + 1 && props.currentPage < pageCount.value - each) {
            pagerArrs.push(1)
            pagerArrs.push(h(TIcon, { icon: licon.value }))
            for (let i = props.currentPage - each + 1; i <= props.currentPage + each - 1; i++) {
                pagerArrs.push(i)
            }
            pagerArrs.push(h(TIcon, { icon: ricon.value }))
            pagerArrs.push(pageCount.value)
        } else {
            pagerArrs.push(1)
            pagerArrs.push(h(TIcon, { icon: licon.value }))
            for (let i = pageCount.value - props.pagerCount + 2; i <= pageCount.value; i++) {
                pagerArrs.push(i)
            }
        }
    }
    return pagerArrs
})

const handleClick = (item: number | VNode) => {
    if (typeof item === 'number') {
        changePage(item)
    } else {
        if (Array.from(item.el!.parentNode.classList).includes('left')) {
            changePage(Math.max(1, props.currentPage - props.pagerCount + 2))
        } else {
            changePage(Math.min(pageCount.value, props.currentPage + props.pagerCount - 2))
        }

    }
}

const handleHover = (e: MouseEvent) => {
    if (props.disabled) return
    const itemClass = Array.from((e.target! as unknown as { classList: any }).classList)
    if (itemClass.includes('t-pagination-pager-more')) {
        if (itemClass.includes('left')) {
            licon.value = icons.left

        } else {
            ricon.value = icons.right
        }
    }
}

const handleLeave = (e: MouseEvent) => {
    licon.value = icons.more
    ricon.value = icons.more
}
const pager = () => h('ul',
    { class: 't-pagination-pager' },
    pagerNumbers.value.map((item, index) => h('li', { class: { 't-pagination-pager-number': !!Number(item), 'is-current': props.currentPage == item, 't-pagination-pager-more': !Number(item), 'left': typeof item != 'number' && index == 1, 'right': typeof item != 'number' && index == pagerNumbers.value.length - 2 }, onClick: () => handleClick(item), onMouseenter: handleHover, onMouseleave: handleLeave }, item)))

const total = () => h('span', { class: 't-pagination-total' }, `Total ${props.total}`)
const jumper = () => {
    const inputRef = ref(null)
    const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            const value = ((inputRef.value!) as { ref: Ref }).ref.value
            if (value) changePage(Number(value));
        }
    };

    return h('span', { class: 't-pagination-jumper' }, [
        h('span', { class: 't-pagination-jumper-goto' }, 'Go to'),
        h(TInput, {
            class: 't-pagination-jumper-input',
            modelValue: props.currentPage,
            ref: inputRef,
            onBlur: (e: any) => changePage(Number(e.target.value)),
            onKeydown: handleKeydown,
        }),
    ]);
};

const slots = useSlots()

const changePage = (page: number) => {
    if (props.disabled || page == props.currentPage) return
    if (page < 1) {
        page = 1
    } else if (page > pageCount.value) {
        page = pageCount.value
    }
    emits('update:currentPage', page)
}
const prevPage = () => {
    emits('update:currentPage', props.currentPage - 1)
}

const nextPage = () => {
    emits('update:currentPage', props.currentPage + 1)
}
const compMap = {
    prev,
    next,
    pager,
    total,
    jumper,
    slot: slots.default?.()[0]
}
const comps = computed(() => props.layout.split(','))
const arrowPlace = computed(() => comps.value.findIndex(comp => comp == '->'))
const leftComps = computed(() => {
    if (arrowPlace.value == -1 || arrowPlace.value + 1 == comps.value.length) {
        return comps.value
    } else {
        let comp = []
        for (let i = 0; i < arrowPlace.value; i++) {
            comp.push(comps.value[i])
        }
        return comp
    }
})

const rightComps = computed(() => {
    if (arrowPlace.value == -1 || arrowPlace.value + 1 == comps.value.length) {
        return []
    } else {
        let comp = []
        for (let i = arrowPlace.value + 1; i < comps.value.length; i++) {
            comp.push(comps.value[i])
        }
        return comp
    }
})

const getComp = (name: string) => {
    return compMap[name as keyof typeof compMap]
}



</script>


<template>
    <div v-show="!(hideOnSinglePage && pageCount == 1)" ref="pagination" class="t-pagination" :class="{
        [`t-pagination-${props.size}`]: size,
        'is-background': background,
        'is-disable': disabled
    }">
        <component v-for="comp in leftComps" :is="getComp(comp)" :key="comp"></component>
        <div v-if="rightComps.length > 0" class="t-pagination-right-wrapper">
            <component v-for="comp in rightComps" :is="getComp(comp)" :key="comp"></component>
        </div>
    </div>


</template>


<style scoped>
@import './style.css';
</style>