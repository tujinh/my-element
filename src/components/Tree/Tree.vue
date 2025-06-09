<script setup lang="ts">
import type { TreeProps, TreeEmits, TreeExposed } from './types';
import { ref, watch, computed } from 'vue'
defineOptions({
    name: 'TTree'
})

const props = withDefaults(defineProps<TreeProps>(), {
    parentTreeNodeId: 0,
    level: 1
})



let pTNId = props.parentTreeNodeId

const showChildrenNode = ref<number[]>([])
const formatData = (data: TreeProps['data']) => {
    data.forEach(item => {
        item.treeNodeId = pTNId++
        item.level = props.level
        item.checked = props.nodeKey ? props.defaultCheckedKeys?.includes(item[props.nodeKey]) : false
        item.indeterminate = false
        if (props.nodeKey) {
            if (props.defaultExpandedKeys?.includes(item[props.nodeKey])) {
                showChildrenNode.value.push(item.treeNodeId)
            }
        }
    })
    return data
}


const customData = ref(formatData(props.data))


const clickNode = (item: TreeProps['data'][number]) => {
    let index = showChildrenNode.value.indexOf(item.treeNodeId)
    if (index > -1) {
        showChildrenNode.value.splice(index, 1)
    } else {
        showChildrenNode.value.push(item.treeNodeId)
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



</script>



<template>
    <div class="t-tree">
        <div class="t-tree-node" v-for="(item) in customData" :key="item.label">
            <div @click="clickNode(item)" class="t-tree-node-content"
                :style="{ paddingLeft: (item.level - 1) * 18 + 'px' }">
                <t-icon icon="caret-right" :color="item.children && item.children.length > 0 ? '' : 'transparent'"
                    class="t-tree-node-icon"
                    :class="[showChildrenNode.includes(item.treeNodeId) ? 'is-showchildren' : '']"></t-icon>
                <t-check-box :disabled="item.disabled" v-show="showCheckbox" @click.stop="clickCheck(item)"
                    :indeterminate="item.indeterminate" class="t-tree-node-checkbox"
                    :checked="item.checked"></t-check-box>
                <span class="t-tree-node-label">{{ item.label }} {{ item.id }}</span>
            </div>
            <transition name="down" v-on="transitionEvents">
                <div class="t-tree-node-children" v-show="showChildrenNode.includes(item.treeNodeId)"
                    v-if="item.children && item.children.length > 0">
                    <t-tree :data="item.children" :parentTreeNodeId="pTNId" :level="level + 1"
                        :show-checkbox="showCheckbox" :defaultCheckedKeys="defaultCheckedKeys"
                        :defaultExpandedKeys="defaultExpandedKeys" :node-key="nodeKey"></t-tree>
                </div>
            </transition>

        </div>
    </div>
</template>



<style scoped>
@import './style.css';
</style>