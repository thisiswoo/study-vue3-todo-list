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

    <!-- <div v-if="!filterTodos.length">
      There is nothing to display.
    </div> -->
    <div v-if="!todos.length">
      There is nothing to display.
    </div>
    <!-- <TodoList 
      :todos="filterTodos" 
      @toggle-todo="toggleTodo" 
      @child-delete-todo="parentsDeleteTodo"
    /> -->
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
    const searchText = ref('');

    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value / limit);
    });

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

    // watch를 활용하여 검색기능 구현하기.
    // 구현 방법
    // 1. reactive state인 searchText가 empty data이기 때문에 getTodos() 함수가 실행.
    // 2. db에 점근하여 ''와 같은 text있는지 확인하지만 없으니 db데이터 모두 출력.
    // 3. 검색 기능에 db에 있는 값을 입력시, watch()가 searchText를 감시하고 있으므로 변경된 사항이 생겨서 실행하게 됨.
    // 4. getTodos(1)에 인자로 1을 넣어주어 page를 1로 주고 searchText에 검색한 값이 db에 있으면 해당 데이터 출력.
    watch(searchText, () => {
      getTodos(1);
    });

    // 화면 페이지에 5개의 데이터만 가져와서 뿌려주기 때문에
    // 2,3,... 페이지의 데이터를 검색해도 데이터가 나오지 않음.
    // const filterTodos = computed(() => {
    //   // searchText.value가 empty string이 아닌경우
    //   if(searchText.value) {  
    //     return todos.value.filter(todo => {
    //       return todo.subject.includes(searchText.value);
    //     });
    //   }
    //   return todos.value;
    // });

    return {
      todos,
      addTodo,
      parentsDeleteTodo,
      toggleTodo,
      searchText,
      // filterTodos,
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
