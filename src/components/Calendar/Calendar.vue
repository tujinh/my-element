<script setup lang="ts">
import type { CalendarProps, CalendarEmits, Cell, CalendarDateType, CalendarExposed } from './types';
import { computed, ref } from 'vue'
defineOptions({
    name: 'TCalendar'
})

const props = withDefaults(defineProps<CalendarProps>(), {
    modelValue: () => new Date(),
})

const showYear = computed(() => props.modelValue.getFullYear())
const showMonth = computed(() => props.modelValue.getMonth())

const currentTime = new Date()
const currentYear = currentTime.getFullYear(),
    currentDay = currentTime.getDate(),
    currentMonth = currentTime.getMonth() + 1
const emits = defineEmits<CalendarEmits>()

const WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const makeCalendar = (date: Date): Cell[][] => {
    const arr: Cell[][] = [[]]
    const targetTime = new Date(date),
        targetYear = targetTime.getFullYear(),
        targetMonth = targetTime.getMonth(),
        monthEnd = new Date(targetYear, targetMonth + 1, 0).getDate(),
        monthStart = new Date(targetYear, targetMonth, 1).getDay()
    let level = 0
    let lastMonthEnd = new Date(targetYear, targetMonth, 0).getDate()
    let nextMonthStart = new Date(targetYear, targetMonth + 1, 1).getDay()
    for (let i = 0; i < monthStart; i++) {
        arr[level].unshift({
            data: lastMonthEnd--,
            state: 'prev',
            year: targetMonth == 0 ? targetYear - 1 : targetYear,
            month: targetMonth == 0 ? 12 : targetMonth
        })
    }
    for (let i = 1; i <= monthEnd; i++) {
        if (arr[level].length == 7) {
            level++
            arr.push([])
        }
        arr[level].push({
            data: i,
            state: 'current',
            year: targetYear,
            month: targetMonth + 1
        })
    }

    let next = 1
    while (arr[level].length < 7) {
        arr[level].push({
            data: next++,
            state: 'next',
            year: targetMonth == 11 ? targetYear + 1 : targetYear,
            month: targetMonth == 11 ? 1 : targetMonth + 2
        })
    }
    return arr
}

const calendarData = ref(makeCalendar(props.modelValue))

const update = (date: Date) => {
    selectedCell.value = {
        data: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
    }
    calendarData.value = makeCalendar(date)
    emits('update:modelValue', date)
}

const selectDate = (type: CalendarDateType) => {
    if (type === 'today') {
        update(currentTime)
    } else if (type === 'prev-month') {
        update(new Date(showYear.value, showMonth.value - 1))
    } else if (type === 'next-month') {
        update(new Date(showYear.value, showMonth.value + 1))
    } else if (type === 'prev-year') {
        update(new Date(showYear.value - 1, showMonth.value))
    } else {
        update(new Date(showYear.value + 1, showMonth.value))
    }
}

const selectedCell = ref<Omit<Cell, 'state'>>({
    data: currentDay,
    year: currentYear,
    month: currentMonth
})
const selectCell = (cell: Cell) => {
    selectedCell.value = {
        data: cell.data,
        year: cell.year,
        month: cell.month
    }
    if (cell.state == 'prev') {
        selectDate('prev-month')
    } else if (cell.state == 'next') {
        selectDate('next-month')
    }
}

const pickDay = (year: number, month: number, day: number) => {
    update(new Date(year, month - 1, day))
}

defineExpose<CalendarExposed>({
    selectDate,
    selectedDay: selectedCell,
    pickDay
})



</script>


<template>
    <div class="t-calendar">
        <div class="t-calendar-header">
            <slot name="header" :date="showYear + ' ' + modelValue.toLocaleString('default', { month: 'long' })">
                <span>{{ showYear + ' ' + modelValue.toLocaleString('default', { month: 'long' }) }}</span>
                <t-button-group size="small">
                    <t-button @click="selectDate('prev-month')">previous month</t-button>
                    <t-button @click="selectDate('today')">today</t-button>
                    <t-button @click="selectDate('next-month')">next month</t-button>
                    <t-button @click="selectDate('next-year')">next year</t-button>
                    <t-button @click="selectDate('prev-year')">prev year</t-button>
                </t-button-group>
            </slot>
        </div>
        <div class="t-calendar-body">
            <table class="t-calendar-table">
                <thead>
                    <tr>
                        <th v-for="day in WEEK" :key="day">{{ day }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, index) in calendarData.length" :key="index">
                        <td v-for="item in calendarData[index]" :key="item.data" :class="{
                'is-today': item.data == currentDay && item.month == currentMonth && item.year == currentYear,
                'is-selected': item.data == selectedCell.data && item.month == selectedCell.month && item.year == selectedCell.year,
                [item.state]: true
            }">
                            <div @click="selectCell(item)" class="t-calendar-cell">
                                <slot name="date-cell" :data="{
                isSelected: item.data == selectedCell.data && item.month == selectedCell.month && item.year == selectedCell.year,
                type: item.state,
                day: item.year + '-' + (item.month < 10 ? ('0' + item.month) : item.month) + '-' + (item.data < 10 ? '0' + item.data : item.data),
                date: new Date(item.year, item.month - 1, item.data)
            }">{{ item.data }}</slot>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>



    </div>


</template>



<style scoped>
@import './style.css';
</style>