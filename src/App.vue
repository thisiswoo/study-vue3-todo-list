<template>
  <div class="container">
    <h2>To-Do List</h2>
    <!--
      @submit.prevent="xxx" 를 사용하여 간략하게 표현 가능.
      <form 
        @submit="onSubmit"
        class="d-flex"
      > 
    -->
    <form 
      @submit.prevent="onSubmit"
      class="d-flex"
    >
      <div class="flex-grow-1 mr-2">
        <input 
          class="form-control"
          type="text"
          v-model="todo"
          placeholder="Type new to-do"
        >
      </div>
      <div>
        <button 
          class="btn btn-primary" 
          type="submit"
        >
          Add
        </button>
      </div>
    </form>
    {{ todos }}
  </div>
</template>

<script>
import { ref } from "vue"; 

export default {
  name: "App",
  setup() {
    const todo = ref(''); 
    const todos = ref([]);  // arry
    
    // @submit.prevent="xxx" 를 사용하면 코드를 간결하게 줄일 수 있다.
    // const onSubmit = (e) => {
    const onSubmit = () => {
      // e.preventDefault();
      todos.value.push({
        id: Date.now(),
        subject: todo.value,
      });
    };

    return {
      todo,
      todos,
      onSubmit,
    };
  },
};
</script>

<style>
.name {
  color: #ff8080;
}
</style>
