<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'

const handleClose = () => {
    console.log('close')
}
let r = ref()



</script>

<template>
    <div>
        <t-alert :showIcon="false" center title="test" type="success" @close="handleClose">This is a
            description.</t-alert>
        <t-alert title="test" type="warning"></t-alert>
        <t-alert title="test" type="info"></t-alert>
        <t-alert title="test" type="error"></t-alert>
    </div>

</template>

<style scoped></style>
