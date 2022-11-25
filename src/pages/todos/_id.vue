<template>
    <div>
        todo page
    </div>
</template>

<script>
import { useRoute } from 'vue-router';

export default {
    setup() {
        const route = useRoute();
        // useRoute()를 통한 id값 확인 하기.
        console.log(route.params.id);
    }
};
</script>

<style>

</style>