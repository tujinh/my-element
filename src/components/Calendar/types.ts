import { type Ref } from "vue"
export type CalendarDateType =
    | 'prev-month'
    | 'next-month'
    | 'prev-year'
    | 'next-year'
    | 'today'

export interface CalendarProps {
    modelValue?: Date
    range?: Date[]
}

export type Cell = {
    data: number,
    state: 'current' | 'prev' | 'next',
    year: number,
    month: number
}

export interface CalendarEmits {
    (e: 'update:modelValue', value: Date): void
}

export interface CalendarExposed {
    selectDate(type: CalendarDateType): void
    selectedDay: Ref<Omit<Cell, 'state'>>
    pickDay(year: number, month: number, day: number): void
}