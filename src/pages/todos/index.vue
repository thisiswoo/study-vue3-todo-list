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
import axios from 'axios';
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

    // composables/toast.js에서 return해준 로직 받아 사용하기.
    const {
      toastMessage,
      toastAlertType,
      showToast,
      triggerToast
    } = useToast();

    // db.json에 있는 todos의 데이터를 모두 가져오기.
    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;
      try {
        const res = await axios.get(`http://localhost:3000/todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`);
        numberOfTodos.value = res.headers[`x-total-count`]; // db의 총 todo 개수
        todos.value = res.data;
      } catch(err) {
        console.log(err);
        error.value = 'Someting went wrong.';
        triggerToast('Someting went wrong', 'danger');
      }
    };
    // db.json에 있는 todos의 데이터 가져오기 실행.
    getTodos();

    // DB에 todo 저장. 비동기
    const addTodo = async (todo) => {
      error.value = '';
      console.log('async start');
      try {
        await axios.post('http://localhost:3000/todos', {
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

    // DB에 todo data 삭제하기.
    const parentsDeleteTodo = async (index) => {
      error.value = '';
      const id = todos.value[index].id;
      try {
        await axios.delete('http://localhost:3000/todos/' + id);  // 삭제가 성공하면
        getTodos();
      } catch(err) {
        error.value = 'Someting went wrong.';
        triggerToast('Someting went wrong', 'danger');
        console.log(err);
      }
    };

    // 자식에서 받아온 event.target.checked 값 인자로 받아 명확하게 값 바꾸어주기.
    const toggleTodo = async (index, checked) => {
      // 자식에서 받아온 checked 값 확인
      console.log(checked);
      error.value = '';
      const id = todos.value[index].id;
      try {
        await axios.patch('http://localhost:3000/todos/' + id, {
          // completed: !todos.value[index].completed
          completed: checked
        });
        // todos.value[index].completed = !todos.value[index].completed;
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
    // keyup.enter 이벤트로 키보드 enter를 쳤을때 실행되는 함수.
    const searchTodo = () => {
      // clearTimeout으로 초기화.
      clearTimeout(timeout);
      getTodos(1);
    };
    // searchText가 변경 되면 watch 함수가 실행.
    watch(searchText, () => {
      // 시작하자 마자 clearTimeout으로 초기화.
      clearTimeout(timeout);
      // 2초 후 실행하게 하기.
      timeout = setTimeout(() => {
        getTodos(1);
      }, 2000)  // 2초 후 실행
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
/* class binding */
.todo {
  color: gray;
  text-decoration: line-through;
}
</style>
