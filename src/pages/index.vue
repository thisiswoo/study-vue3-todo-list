<template>
    <div>Home Page</div>
    <div>{{ count }}</div>
    <button @click="count++">Add</button>
</template>

<script>
import { useCount } from '@/composables/toRefs';    // .js확장자명은 생략 가능

export default {
    setup() {
        
        // 구조 분해하여 'useCount()'안에 'count'사용하기
        const { count } = useCount();   // reactive 한 함수의 값을 구조분해하여 꺼내오면 reactive하지 않게 된다.
        console.log(count);

        return {
            count
        }
    }
};
</script>

<style lang="scss" scoped>

</style>