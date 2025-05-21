import type { Component, ComputedRef } from "vue"


export type CollapseItemName = string | number

export interface CollapseProps {
    accordion?: boolean
    modelValue: CollapseItemName[]
}

export interface CollapseEmits {
    (e: 'update:modelValue', activeNames: CollapseItemName[]): void
    (e: 'change', activeNames: CollapseItemName[]): void
}

export interface CollapseExpose {
    activeNames: ComputedRef<CollapseItemName[]>
    setActiveNames(avtiveNames: CollapseItemName[]): void
}

export interface CollapseProvide {
    activeNames: ComputedRef<CollapseItemName[]>
    handleItemClick(avtiveNames: CollapseItemName): void
}

export interface CollapseItemProps {
    name: CollapseItemName
    title?: string,
    icon?: string | Component
    disabled?: boolean
}

export interface CollapseItemExpose {
    isActive: ComputedRef<boolean | undefined>
}