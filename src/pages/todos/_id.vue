<template>
    <h1>To-Do Page</h1>
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
import { ref, computed, onUnmounted } from 'vue';
import _ from 'lodash';
import Toast from '@/components/Toast.vue';

export default {
    components: {
        Toast
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const todo = ref(null);
        const originalTodo = ref(null);
        const loading = ref(true);
        const showToast = ref(false);
        const toastMessage = ref('');
        const toastAlertType = ref('');
        const timeout = ref(null);
        const todoId = route.params.id;

        // component가 존재하게 되면 onBeforeUnmount와 onUnmounted가 실행되지 않는다
        // 메모리 누수를 방지하기 위해 많이 사용되는 함수.
        onUnmounted(() => {
            console.log('unmounted');
            // js clearTimeout()를 통해 아래 triggerToast() 함수의 setTimeout의 WEB APIs를 작동을 멈추어
            // 무분별한 메모리 사용을 방지하기 위함. 
            clearTimeout(timeout.value);
        });

        const getTodo = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/todos/${todoId}`);
                // 'res.data'의 같은 객체를 담게 되면 같은 메모리 주소를 바라보기 때문에
                // todo를 업데이트 하게 되면 originalTodo까지 업데이트가 되는 현상이 발생.
                // 이를 방지하기 위해 { ...res.data } <---- 스프레드 오퍼레이트.
                todo.value = { ...res.data };
                originalTodo.value = { ...res.data };
                loading.value = false;
            } catch(error) {
                console.log(error);
                triggerToast('Someting went wrong', 'danger');
            }
        };

        // 위 todo 값이 변경되었으면 Save 버튼을 disabled 처리
        // 변경 되지 않았다면 disabled처리 하지 않음.
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

        getTodo();

        const triggerToast = (message, type = 'success') => {
            toastMessage.value = message;
            toastAlertType.value = type;
            showToast.value = true;
            timeout.value = setTimeout(() => {
                console.log('hello');   // setTimeout 확인
                toastMessage.value = '';
                toastAlertType.value = '';
                showToast.value = false;
            }, 2000);
        };

        const onSave = async () => {
            try {
                const res = await axios.put(`http://localhost:3000/todos/${todoId}`, {
                    subject: todo.value.subject,
                    completed: todo.value.completed
                });
                console.log(res);
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