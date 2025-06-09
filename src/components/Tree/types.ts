

export type Props = {
    label?: string | ((data: TreeProps['data'], node) => string)
    children?: string
    disabled?: string | ((data: TreeProps['data'], node) => boolean)
    isLeaf?: string | ((data: TreeProps['data'], node) => boolean)
    class?: string | ((data: TreeProps['data'], node) => string)
}

export interface TreeProps {
    level?: number
    parentTreeNodeId?: number
    data: Array<{ [key: string]: any }>
    emptyText?: string
    nodeKey?: string
    props?: Props
    showCheckbox?: boolean
    defaultCheckedKeys?: (string | number)[]
    defaultExpandedKeys?: (string | number)[]
}

export interface TreeEmits {
    (e: 'node-click'): void
}

export interface TreeExposed {
    updateKeyChildren(key: string | number, data: any): void
    getCheckedNodes(leafOnly?: boolean, includeHalfChecked?: boolean): Array<{ [key: string]: any }>
    getCheckedKeys(leafOnly?: boolean): Array<number | string>
    setChecked(keys: Array<string | number>, leafOnly?: boolean): void
}