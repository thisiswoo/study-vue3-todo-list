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

    // db.json에 있는 todos의 데이터를 모두 가져오기.
    const getTodos = async () => {
      try {
        const res = await axios.get('http://localhost:3000/todos');
        todos.value = res.data;
      } catch(err) {
        console.log(err);
        error.value = 'Someting went wrong.';
      }
    };
    // db.json에 있는 todos의 데이터 가져오기 실행.
    getTodos();

    const todoStyle = {
      textDecoration: "line-through",
      color: "gray",
    };

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
