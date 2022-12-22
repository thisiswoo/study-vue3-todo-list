<template>
  <div>
    <div class="d-flex justify-content-between mb-3">
      <h2>To-Do List</h2>
      <button 
        class="btn btn-primary"
        @click="moveToCreatePage"
      >
        Create Todo
      </button>
    </div>
    <input
        class="form-control"
        type="text"
        v-model="searchText"
        placeholder="Search"
        @keyup.enter="searchTodo"
      />
    <hr />

    <div v-if="!todos.length">
      There is nothing to display.
    </div>
    <TodoList 
      :todos="todos" 
      @toggle-todo="toggleTodo" 
      @child-delete-todo="parentsDeleteTodo"
    />
    <hr />
    <!-- 추후 pagination components로 빼기. -->
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li v-if="currentPage !== 1" class="page-item">
          <a 
            class="page-link" 
            style="cursor: pointer"
            @click="getTodos(currentPage - 1)"
          >
            Previous
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in numberOfPages"
          :key="page"
          :class="currentPage === page ? 'active' : ''"
        >
          <a class="page-link" style="cursor: pointer" @click="getTodos(page)">{{page}}</a>
        </li>
        <li v-if="numberOfPages !== currentPage" class="page-item">
          <a class="page-link" style="cursor: pointer" @click="getTodos(currentPage + 1)">
            Next
          </a>
        </li>
      </ul>
    </nav>
  </div>
  <Toast
      v-if="showToast"
      :message="toastMessage"
      :type="toastAlertType"
    />
</template>

<script>
import { ref, computed, watch } from "vue";
// import axios from 'axios';
import axios from '@/axios';  // axios.js 파일의 axios를 가져와 사용하기.
// @는 src 경로를 의미함.
import TodoList from "@/components/TodoList.vue";
import Toast from '@/components/Toast.vue';
import { useToast } from '@/composables/toast';
import { useRouter } from 'vue-router';

export default {
  name: "App",
  components: {
    TodoList,
    Toast,
  },
  setup() {
    const router = useRouter();
    const todos = ref([]);
    const error = ref('');
    const numberOfTodos = ref(0);
    let limit = 5;
    const currentPage = ref(1);
    const searchText = ref('');

    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value / limit);
    });

    const {
      toastMessage,
      toastAlertType,
      showToast,
      triggerToast
    } = useToast();

    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;
      try {
        // baseUrl을 통해 해당 url경로만 지정해주기.
        const res = await axios.get(`todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`);
        numberOfTodos.value = res.headers[`x-total-count`]; // db의 총 todo 개수
        todos.value = res.data;
      } catch(err) {
        console.log(err);
        error.value = 'Someting went wrong.';
        triggerToast('Someting went wrong', 'danger');
      }
    };
    getTodos();

    const addTodo = async (todo) => {
      error.value = '';
      console.log('async start');
      try {
        // baseUrl을 통해 해당 url경로만 지정해주기.
        await axios.post('todos', {
          subject: todo.subject,
          completed: todo.completed,
        });
        getTodos();
      } catch (err) {
        console.log('async err : ', err);
        error.value = 'Someting went wrong.';
        triggerToast('Someting went wrong', 'danger');
      }
      console.log('async end');
    };

    const parentsDeleteTodo = async (id) => {
      error.value = '';
      try {
        // baseUrl을 통해 해당 url경로만 지정해주기.
        await axios.delete('todos/' + id);  // 삭제가 성공하면
        getTodos();
      } catch(err) {
        error.value = 'Someting went wrong.';
        triggerToast('Someting went wrong', 'danger');
        console.log(err);
      }
    };

    const toggleTodo = async (index, checked) => {
      console.log(checked);
      error.value = '';
      const id = todos.value[index].id;
      try {
        // baseUrl을 통해 해당 url경로만 지정해주기.
        await axios.patch('todos/' + id, {
          completed: checked
        });
        todos.value[index].completed = checked;
      } catch (err) {
        console.log(err);
        error.value = 'Someting went wrong.';
        triggerToast('Someting went wrong', 'danger');
      }
    };

    const moveToCreatePage = () => {
      router.push({
        name: 'TodoCreate',
      })
    };

    let timeout = null;
    const searchTodo = () => {
      clearTimeout(timeout);
      getTodos(1);
    };

    watch(searchText, () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        getTodos(1);
      }, 2000) 
    });

    return {
      searchTodo,
      todos,
      addTodo,
      parentsDeleteTodo,
      toggleTodo,
      searchText,
      error,
      numberOfPages,
      currentPage,
      getTodos,
      toastMessage,
      toastAlertType,
      showToast,
      moveToCreatePage,
    };
  },
};
</script>

<style>
.todo {
  color: gray;
  text-decoration: line-through;
}
</style>
