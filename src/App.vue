<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'


let di = ref()
let p = ref(1)
let ps = ref(10)

const reset = () => {
    di.value.resetPosition()
}






</script>

<template>
    <div>
        <t-pagination v-model:current-page="p" v-model:page-size="ps" size="small" :background="true" :disabled="true"
            layout="prev,pager,next" :total="150">
        </t-pagination>
    </div>



</template>

<style scoped></style>
