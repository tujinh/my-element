<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'


const v = ref(1)
let i = ref()
onMounted(() => {
    i.value.focus()
    setTimeout(() => {
        i.value.blur()
    }, 1000)
})

</script>

<template>
    <div>
        <t-input ref="i" v-model="v" placeholder="Please input value"></t-input>
    </div>

</template>

<style scoped></style>
