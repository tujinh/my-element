


export interface PaginationProps {
    size?: 'large' | 'default' | 'small'
    background?: boolean
    pageSize?: number
    defaultPageSize?: number
    total?: number
    pageSizes?: number[]
    layout?: string
    pageCount?: number
    pagerCount?: number
    currentPage?: number
    hideOnSinglePage?: boolean
    disabled?: boolean
}

export interface PaginationEmits {
    (e: 'update:currentPage', value: number): void
    (e: 'update:pageSize', value: number): void
}