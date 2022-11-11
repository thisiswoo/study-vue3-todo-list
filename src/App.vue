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
  </div>
</template>

<script>
import { ref, computed } from "vue";
import TodoSimpleForm from "./components/TodoSimpleForm.vue";
import TodoList from "./components/TodoList.vue";
import axios from 'axios';

export default {
  name: "App",
  components: {
    TodoSimpleForm,
    TodoList,
  },
  setup() {
    const todos = ref([]);
    const error = ref('');

    const todoStyle = {
      textDecoration: "line-through",
      color: "gray",
    };

    const addTodo = (todo) => {
      // DB에 todo 저장. 비동기
      error.value = '';
      console.log('async start');

      axios.post('http://localhost:3000/todos', {
        // json-server에도 auto increment가 적용이됨. id를 적지 않아도 됨.
        subject: todo.subject,
        completed: todo.completed,
      }).then(res => {
        // 성공되면 실행
        console.log('async success : ', res);
        todos.value.push(res.data);
      }).catch(err =>{
        // 실패하면 실행
        console.log('async err : ', err);
        error.value = 'Someting went wrong.';
      });
      console.log('async end');
    };

    const toggleTodo = (index) => {
      console.log(todos.value[index].completed);
      todos.value[index].completed = !todos.value[index].completed;
      console.log(todos.value[index].completed);
    };

    const parentsDeleteTodo = (index) => {
      todos.value.splice(index, 1);
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
      todoStyle,
      parentsDeleteTodo,
      toggleTodo,
      searchText,
      filterTodos,
      error,
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
