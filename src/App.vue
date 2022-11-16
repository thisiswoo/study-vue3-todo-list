<template>
  <div class="container">
    <h2>To-Do List</h2>
    <input
        class="form-control"
        type="text"
        v-model="searchText"
        placeholder="Search"
      />
    <hr />
    <TodoSimpleForm @add-todo="addTodo" />
    <div style="color: red">{{ error }}</div>

    <div v-if="!filterTodos.length">
      There is nothing to display.
    </div>
    <TodoList 
      :todos="filterTodos" 
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
</template>

<script>
import { ref, computed, watch } from "vue";
import axios from 'axios';

import TodoSimpleForm from "./components/TodoSimpleForm.vue";
import TodoList from "./components/TodoList.vue";

export default {
  name: "App",
  components: {
    TodoSimpleForm,
    TodoList,
  },
  setup() {
    const todos = ref([]);
    const error = ref('');
    const numberOfTodos = ref(0);
    let limit = 5;
    const currentPage = ref(1);

    // ref를 사용하여 watch 사용하기.
    // 초기값을 인지하여 실행하는게 아니라 인자로 보낸 
    // 'currentPage'의 값이 변경되면 실행.
    // watch(currentPage, (currentPage, prev) => {
    //   // 현재 currentPage값과, 전의 prev 값을 비교.
    //   console.log(currentPage, prev);
    // });

    // reactive를 사용하여 watch 사용하기.
    // const a = reactive({ b: 1 });
    // watch(() => a.b, (current, prev) => {
    //   console.log(current, prev);
    // });
    // 배열로 watch 사용하기.
    // const a = reactive({ b: 1, c: 3 });
    // watch(() => [a.b, a.c], (current, prev) => {
    //   console.log(current, prev);
    // });
    // a.b = 2;
    watch([currentPage, numberOfTodos], (current, prev) => {
      console.log(current, prev);
    });


    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value / limit);
    });

    // db.json에 있는 todos의 데이터를 모두 가져오기.
    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;
      try {
        const res = await axios.get(`http://localhost:3000/todos?_page=${page}&_limit=${limit}`);
        numberOfTodos.value = res.headers[`x-total-count`]; // db의 총 todo 개수
        todos.value = res.data;
      } catch(err) {
        console.log(err);
        error.value = 'Someting went wrong.';
      }
    };
    // db.json에 있는 todos의 데이터 가져오기 실행.
    getTodos();

    // DB에 todo 저장. 비동기
    const addTodo = async (todo) => {
      error.value = '';
      console.log('async start');
      try {
        const res = await axios.post('http://localhost:3000/todos', {
          subject: todo.subject,
          completed: todo.completed,
        });
        todos.value.push(res.data);
      } catch (err) {
        console.log('async err : ', err);
      }
      console.log('async end');
    };

    // DB에 todo data 삭제하기.
    const parentsDeleteTodo = async (index) => {
      error.value = '';
      const id = todos.value[index].id;
      try {
        await axios.delete('http://localhost:3000/todos/' + id);  // 삭제가 성공하면
        todos.value.splice(index, 1);                             // todos 배열의 인덱스를 가지고 있는 값을 삭제.
      } catch(err) {
        error.value = 'Someting went wrong.';
        console.log(err);
      }
    };

    const toggleTodo = async (index) => {
      error.value = '';
      const id = todos.value[index].id;
      try {
        await axios.patch('http://localhost:3000/todos/' + id, {
          completed: !todos.value[index].completed
        });
        todos.value[index].completed = !todos.value[index].completed;
      } catch (err) {
        console.log(err);
        error.value = 'Someting went wrong.';
      }
    };

    const searchText = ref('');
    const filterTodos = computed(() => {
      // searchText.value가 empty string이 아닌경우
      if(searchText.value) {  
        return todos.value.filter(todo => {
          return todo.subject.includes(searchText.value);
        });
      }
      return todos.value;
    });

    return {
      todos,
      addTodo,
      parentsDeleteTodo,
      toggleTodo,
      searchText,
      filterTodos,
      error,
      numberOfPages,
      currentPage,
      getTodos,
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
