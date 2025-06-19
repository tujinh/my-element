<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { TNotification } from './index';
const data = [
    {
        id: 1,
        label: 'Level one 1',
        children: [
            {
                id: 4,
                label: 'Level two 1-1',
                children: [
                    {
                        id: 9,
                        label: 'Level three 1-1-1',
                        children: [{
                            id: 11,
                            label: 'level four 1-1-1-1'
                        }]
                    },
                    {
                        id: 10,
                        label: 'Level three 1-1-2',
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        label: 'Level one 2',
        children: [
            {
                id: 5,
                label: 'Level two 2-1',
            },
            {
                id: 6,
                label: 'Level two 2-2',
            },
        ],
    },
    {
        id: 3,
        label: 'Level one 3',
        children: [
            {
                id: 7,
                label: 'Level two 3-1',
            },
            {
                id: 8,
                label: 'Level two 3-2',
            },
        ],
    },
]




const t = ref()

let id = 1000
const generateData = () => {
    const data = []
    for (let i = 1; i <= 15; i++) {
        data.push({
            key: i,
            label: `Option ${i}`,
            disabled: i % 4 === 0,
        })
    }
    return data
}
const data1 = ref(generateData())
const value = ref([2, 5])

let a
const hc = () => {
    a = TNotification.primary({
        title: 'Title',
        message: 'This is a message that does not automatically close',
        duration: 0,
    })
}
const cl = () => {
    TNotification.closeAll()
}

</script>

<template>
    <div>
        <t-button @click="hc">click</t-button>
        <t-button @click="cl">close</t-button>
        <!-- <t-tree ref="t" :data="data" node-key="id">
        </t-tree> -->
        <!-- <t-transfer :data="data1" v-model="value" :titles="['Source', 'Target']"
            :button-texts="['To left', 'To right']"></t-transfer> -->
    </div>



</template>

<style scoped></style>
