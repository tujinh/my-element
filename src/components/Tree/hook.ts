import { ref, type Ref } from 'vue'
let id = ref(0)
export const useId = () => {

    const getId = () => {
        return id.value++
    }
    return {
        id,
        getId
    }
}

let source: Ref<HTMLElement | null> = ref(null), target: Ref<HTMLElement | null> = ref(null)

export const useDrag = () => {
    const setSource = (el: HTMLElement) => {
        source.value = el
    }
    const setTarget = (el: HTMLElement) => {
        target.value = el
    }
    return {
        source,
        target,
        setSource,
        setTarget
    }
}


// export const useDrag = () => {
//     // 使用 ref 包裹，确保响应性
//     const source = ref<HTMLElement | null>(null)
//     const target = ref<HTMLElement | null>(null)

//     const setSource = (el: HTMLElement) => {
//         source.value = el  // 使用 .value 修改
//     }

//     const setTarget = (el: HTMLElement) => {
//         target.value = el
//     }

//     return {
//         source,  // 返回的是 ref 对象，具有响应性
//         target,
//         setSource,
//         setTarget
//     }
// }

// export const useDrag = () => {
//     // 使用 ref 包裹，确保响应性
//     let source: HTMLElement | null = null
//     let target: HTMLElement | null = null

//     const setSource = (el: HTMLElement) => {
//         source = el  // 使用 .value 修改
//         console.log('set', source)
//     }

//     const setTarget = (el: HTMLElement) => {
//         target = el
//     }

//     return {
//         source,  // 返回的是 ref 对象，具有响应性
//         target,
//         setSource,
//         setTarget
//     }
// }