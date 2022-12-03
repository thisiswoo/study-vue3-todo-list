<template>
    <div v-if="loading">
        Loading...
    </div>
    <!-- form 태그 안에 버튼이 있는 경우 그 버튼을 누를 경우 sumbmit이 된다. -->
    <form 
        v-else
        @submit.prevent="onSave"
    >
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
            <div v-if="editing" class="col-6">
                <div class="form-group">
                    <label>Status</label>
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
            <div class="col-12">
                <div class="form-group">
                    <label>Body</label>
                    <textarea v-model="todo.body" class="form-control" cols="30" rows="10"></textarea>
                </div>
            </div>
        </div>
        <button 
            type="submit"
            class="btn btn-primary"
            :disabled="!todoUpdated"
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
    <Toast
        v-if="showToast"
        :message="toastMessage"
        :type="toastAlertType"
    />
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { ref, computed } from 'vue';
import _ from 'lodash';
import Toast from '@/components/Toast.vue';
import { useToast } from '@/composables/toast';

export default {
    components: {
        Toast,
    },
    props: {
        // TodoForm을 creating page와 editing page로 나누기 위함
        editing: {
            // false면 creating page로 사용.
            // true면 editing page로 사용.
            type: Boolean,
            default: false,
        }
    },
    // setup() 함수에 인자로 'props'를 받아와 props 데이터에 접근이 가능해짐.
    setup(props) {
        const route = useRoute();
        const router = useRouter();
        const todo = ref({
            subject: '',
            computed: false,
            body: ''
        });
        const originalTodo = ref(null);
        const loading = ref(false);

        // composables/toast.js에서 return해준 로직 받아 사용하기.
        const {
            toastMessage,
            toastAlertType,
            showToast,
            triggerToast
        } = useToast();

        const todoId = route.params.id;

        const getTodo = async () => {
            loading.value = true;
            try {
                const res = await axios.get(`http://localhost:3000/todos/${todoId}`);
                todo.value = { ...res.data };
                originalTodo.value = { ...res.data };
                loading.value = false;
            } catch(error) {
                loading.value = false;
                console.log(error);
                triggerToast('Someting went wrong', 'danger');
            }
        };

        const todoUpdated = computed(() => {
            return !_.isEqual(todo.value, originalTodo.value);
        });

        // 상태변경
        const toggleTodoStatus = () => {
            todo.value.completed = !todo.value.completed;
        };

        // cancel 버튼 클릭시 useRouter를 이용한 페이지 이동
        const moveToTodoListPage = () => {
            router.push({
                name: 'Todos'
            });
        };

        // condition을 주어 props.editing이 'true'이면(즉, editing(detail)) getTodo() 함수 실행.
        if (props.editing) {
            getTodo();
        }

        const onSave = async () => {
            try {
                const res = await axios.put(`http://localhost:3000/todos/${todoId}`, {
                    subject: todo.value.subject,
                    completed: todo.value.completed
                });
                originalTodo.value = { ...res.data };
                triggerToast('Successfully saved!');
            } catch(error) {
                console.log(error);
                triggerToast('Someting went wrong', 'danger');
            }
        };

        return {
            todo,
            loading,
            toggleTodoStatus,
            moveToTodoListPage, 
            onSave,
            todoUpdated,
            showToast,
            toastMessage,
            toastAlertType,
        };
    }
};
</script>

<style>

</style>