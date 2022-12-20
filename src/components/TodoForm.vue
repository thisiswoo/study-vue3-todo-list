<template>
    <div v-if="loading">
        Loading...
    </div>
    <form 
        v-else
        @submit.prevent="onSave"
    >
        <div class="row">
            <div class="col-6">
                <!-- 
                    todo.subject를 props로 input.vue에 내려줄때
                    아래 주석한것처럼 길게 사용할 필요 없이
                    v-model:props{}에서 정의한 object를 적게 되면
                    간편해 진다.
                -->
                <!-- <Input 
                    label="subject"
                    v-model="todo.subject"
                    :subject="todo.subject"
                    :error="subjectError"
                    @update-subject="updateTodoSubject"
                /> -->
                <!-- 
                    만약 여러개의 양방향 바인딩이 필요할땐 
                    v-model:props{}에서 정의한 object를 여러개 지정하여
                    구현할 수 있다.
                -->
                <Input 
                    label="subject"
                    v-model:subject="todo.subject"
                    :error="subjectError"
                />
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
            {{ editing ? 'Update' : 'Create' }}
        </button>
        <button 
            class="btn btn-outline-dark ml-2"
            @click="moveToTodoListPage"
        >
            Cancel
        </button>
    </form>
    <transition name="fade">
        <Toast
            v-if="showToast"
            :message="toastMessage"
            :type="toastAlertType"
        />
    </transition>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { ref, computed, onUpdated } from 'vue';
import _ from 'lodash';
import Toast from '@/components/Toast.vue';
import { useToast } from '@/composables/toast';
import Input from '@/components/input.vue';

export default {
    components: {
        Toast,
        Input,
    },
    props: {
        editing: {
            type: Boolean,
            default: false,
        }
    },
    setup(props) {
        const route = useRoute();
        const router = useRouter();
        const todo = ref({
            subject: '',
            computed: false,
            body: ''
        });
        // vue lifecycle의 onUpdated를 이용하여 input.vue의 component의
        // 값이 잘 바뀌는지(update가 되는지) 확인.
        onUpdated(() => {
            console.log(todo.value.subject);
        });
        const subjectError = ref('');
        const originalTodo = ref(null);
        const loading = ref(false);

        const {
            toastMessage,
            toastAlertType,
            showToast,
            triggerToast
        } = useToast();

        const todoId = route.params.id;

        // component로 뺀 input의 subject 제목을 부모 컴포넌트의 함수로 정의.
        // const updateTodoSubject = (newVal) => {
        //     todo.value.subject = newVal;
        //     console.log(todo.value.subject);
        // };

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

        const toggleTodoStatus = () => {
            todo.value.completed = !todo.value.completed;
        };

        const moveToTodoListPage = () => {
            router.push({
                name: 'Todos'
            });
        };

        if (props.editing) {
            getTodo();
        }

        const onSave = async () => {
            subjectError.value = '';
            if (!todo.value.subject) {
                subjectError.value = 'Subject is required';
                return;
            }
            try {
                let res;    
                const data = {
                    subject: todo.value.subject,
                    completed: todo.value.completed,
                    body: todo.value.body,
                };
                if (props.editing) {
                    res = await axios.put(`http://localhost:3000/todos/${todoId}`, data);
                    originalTodo.value = { ...res.data };
                } else {
                    res = await axios.post(`http://localhost:3000/todos`, data);
                    todo.value.subject = '';
                    todo.value.body = '';
                }
                const message = 'Successfully ' + (props.editing ? 'Updated' : 'Created!');
                triggerToast(message);
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
            subjectError,
            // updateTodoSubject,
        };
    }
};
</script>

<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
        transform: translateY(-30px);   
    }
    .fade-enter-to,
    .fade-leave-from {
        opacity: 1;
        transform: translateY(0px);
    }

</style>