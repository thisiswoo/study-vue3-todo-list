<template>
  <div class="container">
    <h4>count :  {{ count }}</h4>
    <h2>To-Do List</h2>
    <input
        class="form-control"
        type="text"
        v-model="searchText"
        placeholder="Search"
      />
    <hr />
    <TodoSimpleForm @add-todo="addTodo" />

    <div v-if="!filterTodos.length">
      There is nothing to display.
    </div>
    <!-- <TodoList 
      :todos="todos" 
      @toggle-todo="toggleTodo" 
      @child-delete-todo="parentsDeleteTodo"
    /> -->
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

export default {
  name: "App",
  components: {
    TodoSimpleForm,
    TodoList,
  },
  setup() {
    const todos = ref([]);

    const todoStyle = {
      textDecoration: "line-through",
      color: "gray",
    };

    const addTodo = (todo) => {
      console.log("자식->부모 data : ", todo);
      todos.value.push(todo);
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
