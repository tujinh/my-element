<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'

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


const check = ref(true)
const check1 = ref(false)
const check2 = ref(false)
// watch(check, (newVal) => {
//     console.log(newVal)
// })

const checkList = ref<any[]>(['123', true])
// watch(checkList, (n) => {
//     console.log(n)
// })
const d = ref(false)

const t = ref()

const getNode = () => {
    console.log(t.value.getCheckedNodes(true, true))
}
const getkey = () => {
    console.log(t.value.getCheckedKeys(true))
}

const setnode = () => {
    t.value.setChecked([3, 4, 6, 9, 11], true)
}

</script>

<template>
    <div>
        <t-button @click="getNode">getnode</t-button>
        <t-button @click="getkey">getkey</t-button>
        <t-button @click="setnode">setnode</t-button>
        <t-tree ref="t" :data="data" show-checkbox node-key="id" :default-expanded-keys="[2, 3]"></t-tree>
        <!-- <t-check-box v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange"></t-check-box>
        <t-check-box-group @change="handleAll" :disabled="d" v-model="checkList">
            <t-check-box label="option" value="123"></t-check-box>
            <t-check-box label="option2" :value="456"></t-check-box>
            <t-check-box label="option3" :value="true"></t-check-box>
        </t-check-box-group> -->

    </div>



</template>

<style scoped></style>
