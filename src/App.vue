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
// watchEffect를 사용하기 위해 'vue'에서 import 받아 setup()에서 사용가능. 
// import { watchEffect, reactive } from 'vue';
import { ref, computed, watchEffect } from "vue";
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
    // const limit = 5;
    const currentPage = ref(1);

    let limit = 5;
    watchEffect(() => {
      // 초기 limit의 값을 감지하여 watchEffect()가 실행 되지만,
      // 추후 limit = 3;을 해준다고 하여도 다시 watchEffect()가 실행되지 않음.
      // 이유는 limit가 reactive state가 아니기 때문.
      console.log(limit);
    });
    limit = 3;


    // reactive, props, computed가 변경 되었을때 도 실행.
    // watchEffect(() => {
    //   // 초기 값 reactive state인 currentPage = ref(1)을 인식하여 동작한다. 
    //   // 밑에 numberOfTodos.value의 값이 변경되어도 재 실행 된다.
    //   // Pagination을 클릭하게 되면 해당 값이 변경되기 때문에 실행하게 된다.
    //   console.log(currentPage.value);
    //   // 초기 값 reactive state인 numberOfTodos = ref(0)을 인식하여 동작한다. 
    //   // numberOfTodos = ref(0)개에서 db에 접속하여 todos[]의 데이터의 개수를 모두 가져온 값이 변경되어 함수가 실행하게 된다. 
    //   console.log(numberOfTodos.value);
    // });

    // computed를 사용했기 때문에 함수 안에 있는 Reactive State가 바뀔 때마다
    // return Math.ceil(numberOfTodos.value / limit); 부분이 다시 실행 되어
    // computed property가 업데이트가 됨.
    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value / limit);
    });
    // computed watchEffect로 확인하기.
    // watchEffect(() => {
    //   // 초기 값 reactive state인 numberOfTodos = ref(0)을 인식하여 동작한다. 
    //   // db에서 todos[]를 불러오면서 계산되어 값이 변경되어 다시 'watchEffect()'가 동작하게 된다.
    //   console.log(numberOfPages.value);
    // });

    // reactive로 확인 하기.
    // const a = reactive({
    //   b: 1
    // });
    // watchEffect(() => {
    //   // 초기값 d: 1이 실행이 된다.
    //   console.log(a.b);
    // });
    // // const a.b(1)를 4로 업데이트 해주어 watchEffect()가 재 실행되어 콘솔에 1과 4가 찍히게 된다.
    // a.b = 4;


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
