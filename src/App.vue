<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'

let d = ref(new Date())
let di = ref()

const reset = () => {
    di.value.resetPosition()
}





</script>

<template>
    <div>
        <t-pagination :total="50"></t-pagination>
    </div>



</template>

<style scoped></style>
