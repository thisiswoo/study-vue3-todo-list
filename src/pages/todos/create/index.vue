<template>
    <h1>Create Todo</h1>
    <!-- 
        editing이 default로 false가 되어있기 때문에 따로 
        :editing 바인딩 하지 않아도 된다. 
    -->
    <TodoForm />
</template>

<script>
import TodoForm from '@/components/TodoForm.vue';

export default {
    components: {
        TodoForm
    }
};
</script>

<style>
</style>