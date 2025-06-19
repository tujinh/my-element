<script setup lang="ts">
import type { TreeProps, TreeEmits, TreeExposed } from './types';
import { ref, watch, computed, useSlots } from 'vue'
import { useId, useDrag } from './hook'

const { getId } = useId()
const { source, target, setSource, setTarget } = useDrag()
defineOptions({
    name: 'TTree'
})

const props = withDefaults(defineProps<TreeProps>(), {
    level: 1,
})

const slots = useSlots()


let activeNode: TreeProps['data'][number] | null

const isExpand = (item: TreeProps['data'][number]) => {
    if (props.nodeKey && props.defaultExpandedKeys?.includes(item[props.nodeKey])) {
        return true
    }
    if (item.children && item.children.length > 0) {
        for (let i = 0; i < item.children.length; i++) {
            if (isExpand(item.children[i])) {
                return true
            }
        }
        return false
    } else {
        return false
    }
}

const isCheck = (item: TreeProps['data'][number]) => {
    if (props.nodeKey && props.defaultCheckedKeys?.includes(item[props.nodeKey])) {
        return true
    }
    if (item.parent && item.parent.checked) {
        return true
    } else {
        return false
    }
}


const formatData = (data: TreeProps['data']) => {

    data.forEach(item => {
        item.treeNodeId = getId()
        item.level = props.level
        item.parent = props.parent || null
        item.checked = isCheck(item)
        // console.log(item.checked, item.id)
        item.indeterminate = false
        item.expand = isExpand(item)

    })
    return data
}


const customData = ref(formatData(props.data))


const clickNode = (item: TreeProps['data'][number]) => {
    if (props.accordion) {
        if (!activeNode) {
            activeNode = item
            item.expand = true
        } else {
            if (activeNode === item) {
                activeNode = null
                item.expand = false
            } else {
                activeNode.expand = false
                activeNode = item
                item.expand = true
            }
        }
    } else {
        item.expand = !item.expand
    }


}


watch(() => props.data, (n) => {
    customData.value = formatData(n)
})

function checkDeterminate(item: TreeProps['data'][number]) {

    if (item.children && item.children.length > 0) {
        if (item.children.every((child: TreeProps['data'][number]) => !child.checked && !child.indeterminate)) {
            item.checked = false
            item.indeterminate = false
        }
        else if (item.children.every((child: TreeProps['data'][number]) => child.checked)) {
            item.checked = true
            item.indeterminate = false
        } else {
            item.checked = false
            item.indeterminate = true
        }
        item.children.forEach((child: TreeProps['data'][number]) => {
            checkDeterminate(child)
        })
    }
}
watch(customData, (n) => {
    n.forEach(item => {
        checkDeterminate(item)
    })

}, {
    deep: true
})


const _setHeightZero = (el: HTMLElement) => (el.style.height = '0')

const _setHeightScroll = (el: HTMLElement) => (el.style.height = `${el.scrollHeight}px`)

const _setHeightEmpty = (el: HTMLElement) => (el.style.height = '')

const _setOverflowHidden = (el: HTMLElement) => (el.style.overflow = 'hidden')

const _setOverflowEmpty = (el: HTMLElement) => (el.style.overflow = '')

const transitionEvents: Record<string, (el: HTMLElement) => void> = {
    beforeEnter(el) {
        _setHeightZero(el)
        _setOverflowHidden(el)
    },
    enter: (el) => _setHeightScroll(el),
    afterEnter: (el) => {
        _setHeightEmpty(el)
        _setOverflowEmpty(el)
    },
    beforeLeave(el) {
        _setHeightScroll(el)
        _setOverflowHidden(el)
    },
    leave: (el) => _setHeightZero(el),
    afterLeave: (el) => {
        _setHeightEmpty(el)
        _setOverflowEmpty(el)
    }
}

const clickCheck = (item: TreeProps['data'][number]) => {
    if (item.disabled) return
    item.checked = !item.checked
    checkChildren(item)
    function checkChildren(item: TreeProps['data'][number]) {
        if (item.children && item.children.length > 0) {
            item.children.forEach((child: TreeProps['data'][number]) => {
                child.checked = item.checked
                checkChildren(child)
            })
        }
    }
}


const getCheckedNodes = (leafOnly: boolean = false, includeHalfChecked: boolean = false): Array<{ [key: string]: any }> => {
    if (!props.showCheckbox) return []
    let nodes: Array<{ [key: string]: any }> = []
    customData.value.forEach(item => {
        getNodes(item)
    })
    return nodes
    function getNodes(item: TreeProps['data'][number]) {
        if (item.checked || (includeHalfChecked && item.indeterminate)) {
            if (leafOnly) {
                if (!(item.children && item.children.length > 0)) {
                    nodes.push(item)
                }
            } else {
                nodes.push(item)
            }
        }
        if (item.children && item.children.length > 0) {
            item.children.forEach((child: TreeProps['data'][number]) => {
                getNodes(child)
            })
        }
    }

}

const getCheckedKeys = (leafOnly: boolean = false) => {
    if (!props.showCheckbox) return []
    let nodes: Array<number | string> = []
    customData.value.forEach(item => {
        getNodes(item)
    })
    return nodes
    function getNodes(item: TreeProps['data'][number]) {
        if (item.checked) {
            if (leafOnly) {
                if (!(item.children && item.children.length > 0)) {
                    nodes.push(item[props.nodeKey!])
                }
            } else {
                nodes.push(item[props.nodeKey!])
            }
        }
        if (item.children && item.children.length > 0) {
            item.children.forEach((child: TreeProps['data'][number]) => {
                getNodes(child)
            })
        }
    }
}
const updateKeyChildren = (key: string | number, data: any) => {

}
const setChecked = (keys: Array<string | number>, leafOnly: boolean = false) => {
    console.log(keys)
    if (!props.nodeKey) return
    customData.value.forEach(item => {
        setNodes(item)
    })

    function setNodes(item: TreeProps['data'][number]) {
        if (keys.includes(item[props.nodeKey!])) {
            item.checked = true
            if (leafOnly) {
                if (!(item.children && item.children.length > 0)) {
                    item.checked = true
                }
            } else {
                if (item.children && item.children.length > 0) {
                    item.children.forEach((child: TreeProps['data'][number]) => {
                        child.checked = true
                    })
                }
                item.checked = true
            }
        }
        if (item.children && item.children.length > 0) {
            item.children.forEach((child: TreeProps['data'][number]) => {
                setNodes(child)
            })
        }
    }
}

defineExpose<TreeExposed>({
    updateKeyChildren,
    getCheckedNodes,
    getCheckedKeys,
    setChecked
})

const handleDragStart = (e: DragEvent, item: TreeProps['data'][number]) => {
    setSource(e.target as HTMLElement)
}

const isInner = (el: HTMLElement) => {
    let p = el.parentNode as HTMLElement
    while (p != document.body) {
        if (p === source.value || p === target.value) {
            return true
        }
        p = p.parentNode as HTMLElement
    }
}

const handleDragEnter = (e: DragEvent, item: TreeProps['data'][number]) => {
    if (e.target === source.value || isInner(e.target as HTMLElement)) {
        return
    }
    setTarget(e.target as HTMLElement);
    (e.target as HTMLElement).classList.add('t-tree-node-drag-enter')
    console.log(e.target);
}
const handleDragOver = (e: DragEvent, item: TreeProps['data'][number]) => {
    if (e.target === source.value || isInner(e.target as HTMLElement)) {
        return
    }
    // console.log(e.target);

    if (e.offsetY < e.target.offsetHeight / 2) {
        (e.target as HTMLElement).classList.remove('bottom');
        (e.target as HTMLElement).classList.add('top')
    } else {
        (e.target as HTMLElement).classList.remove('top');
        (e.target as HTMLElement).classList.add('bottom')
    }

}

const handleDragLeave = (e: DragEvent, item: TreeProps['data'][number]) => {
    // console.log('leave', e.relatedTarget, e.target)
    // console.log('leave', e.target, target.value, e.target === target.value)
    // console.log(target.value, e.target);
    (target.value as HTMLElement)?.classList.remove('t-tree-node-drag-enter');
    (target.value as HTMLElement)?.classList.remove('bottom');
    (target.value as HTMLElement)?.classList.remove('top');
    // console.log(target.value?.classList)
    // if (!e.target.classList.includes('t-tree-node-content')) return
    // if (e.relatedTarget === target.value || e.target === target.value) {
    //     // console.log('leave');
    //     // console.log(e.target, target.value, e.relatedTarget);
    //     (target.value as HTMLElement).classList.remove('t-tree-node-drag-enter');
    //     (target.value as HTMLElement).classList.remove('bottom');
    //     (target.value as HTMLElement).classList.remove('top');
    //     console.log('remove')
    // }

}

const handleDrop = (e: DragEvent, item: TreeProps['data'][number]) => {
    console.log(e, item)
}

</script>



<template>
    <div class="t-tree">
        <div draggable="true" @dragstart="(e) => handleDragStart(e, item)"
            @dragover.stop.prevent="(e) => handleDragOver(e, item)" @dragenter.stop="(e) => handleDragEnter(e, item)"
            @drop.stop="(e) => handleDrop(e, item)" @dragleave.stop="(e) => handleDragLeave(e, item)"
            class="t-tree-node" v-for="(item) in customData" :key="item.label">
            <div @click="clickNode(item)" class="t-tree-node-content"
                :style="{ paddingLeft: (item.level - 1) * 18 + 'px' }">
                <t-icon icon="caret-right" :color="item.children && item.children.length > 0 ? '' : 'transparent'"
                    class="t-tree-node-icon" :class="[item.expand ? 'is-showchildren' : '']"></t-icon>
                <t-check-box :disabled="item.disabled" v-show="showCheckbox" @click.stop="clickCheck(item)"
                    :indeterminate="item.indeterminate" class="t-tree-node-checkbox"
                    :checked="item.checked"></t-check-box>
                <slot v-if="slots.default" :node="item"></slot>
                <span v-else class="t-tree-node-label">{{
                item.label }}</span>
            </div>
            <transition name="down" v-on="transitionEvents">
                <div class="t-tree-node-children" v-show="item.expand" v-if="item.children && item.children.length > 0">
                    <t-tree :data="item.children" :level="level + 1" :show-checkbox="showCheckbox"
                        :defaultCheckedKeys="defaultCheckedKeys" :defaultExpandedKeys="defaultExpandedKeys"
                        :node-key="nodeKey" :parent="item" :accordion="accordion">
                        <template v-if="slots.default" #default="{ node }">
                            <slot :node="node"></slot>
                        </template>
                    </t-tree>
                </div>
            </transition>

        </div>
    </div>
</template>



<style scoped>
@import './style.css';
</style>

<style>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}
</style>