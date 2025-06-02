<script setup lang="ts">
import type { BackTopEmits, BackTopProps } from './types'
import { onMounted, onBeforeUnmount, ref } from 'vue'

defineOptions({
    name: 'TBackTop'
})

const props = withDefaults(defineProps<BackTopProps>(), {
    visibleHeight: 200,
    right: 50,
    bottom: 50
})

const emits = defineEmits<BackTopEmits>()


const show = ref(false)
const handleScroll = () => {
    if (window.scrollY > props.visibleHeight) {
        show.value = true
    } else {
        show.value = false
    }
}
onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
})

const scrollToTop = (e: MouseEvent) => {
    // if (props.smooth) {
    //     window.scrollTo({
    //         top: 0,
    //         behavior: 'smooth'
    //     })
    // } else {
    //     window.scrollTo(0, 0)
    // }
    emits('click', e)
    window.scrollTo(0, 0)
}


</script>

<template>
    <transition name="fade">
        <div @click="scrollToTop" class="t-backtop" v-show="show"
            :style="{ bottom: bottom + 'px', right: right + 'px' }">
            <slot> <t-icon icon="caret-up" class="header-angle"></t-icon></slot>
        </div>
    </transition>


</template>

<style scoped>
@import './styles.css';
</style>