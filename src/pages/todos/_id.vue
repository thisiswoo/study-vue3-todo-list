<template>
    <h1>To-Do Page</h1>
    <div v-if="loading">
        Loading...
    </div>
    <!-- form 태그 안에 버튼이 있는 경우 그 버튼을 누를 경우 sumbmit이 된다. -->
    <form v-else>
        <div class="row">
            <div class="col-6">
                <div class="form-group">
                    <label>Subject</label>
                    <input 
                        type="text" 
                        class="form-control"
                        v-model="todo.subject"
                    >
                </div>
            </div>
            <div class="col-6">
                <div class="form-group">
                    <label>Status</label>
                    <div>
                        <button 
                            type="button"
                            class="btn"
                            :class="todo.completed ? 'btn-success' : 'btn-danger'"
                            @click="toggleTodoStatus"
                        >
                            {{ todo.completed ? 'Completed' : 'Incomplete' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <button 
            type="submit"
            class="btn btn-primary"
        >
            Save
        </button>
        <button 
            class="btn btn-outline-dark ml-2"
            @click="moveToTodoListPage"
        >
            Cancel
        </button>
    </form>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { ref } from '@vue/reactivity';

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        const todo = ref(null);
        const loading = ref(true);

        const getTodo = async () => {
            const res = await axios.get('http://localhost:3000/todos/' + route.params.id);
            todo.value = res.data;
            loading.value = false;
        };

        const toggleTodoStatus = () => {
            todo.value.completed = !todo.value.completed;
        };

        // cancel 버튼 클릭시
        const moveToTodoListPage = () => {
            router.push({
                name: 'Todos'
            });
        };

        getTodo();
        // useRoute()를 통한 id값 확인 하기.
        console.log(route.params.id);

        return {
            todo,
            loading,
            toggleTodoStatus,
            moveToTodoListPage,
        };
    }
};
</script>

<style>

</style>