<template>
  <div class="container">
    <h2>To-Do List</h2>
    <form @submit.prevent="onSubmit">
      <div class="d-flex">
        <div class="flex-grow-1 mr-2">
          <input
            class="form-control"
            type="text"
            v-model="todo"
            placeholder="Type new to-do"
          />
        </div>
        <div>
          <button class="btn btn-primary" type="submit">Add</button>
        </div>
      </div>
      <div v-show="hasError" style="color: red">
        This field cannot be empty
      </div>
    </form>
    <div 
      v-for="t in todos" 
      :key="t.id" 
      class="card mt-2"
    >
      <div class="card-body p-2">
        <div class="form-check">
          <input 
            class="form-check-input" 
            type="checkbox"
            v-model="t.completed"
          >
          <!-- style binding -->
          <!-- <label 
            class="form-check-label" 
            :style="t.completed ? todoStyle : {}" 
          > -->
          <!-- class binding -->
          <label 
            class="form-check-label" 
            :class="{ todo: t.completed }"
          >
            {{ t.subject }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "App",
  setup() {
    const todo = ref("");
    const todos = ref([]);
    const hasError = ref(false);
    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray'
    };

    const onSubmit = () => {
      if (todo.value === '') {
        hasError.value = true;
      } else {
        todos.value.push({
          id: Date.now(),
          subject: todo.value,
          completed: false,
        });
        hasError.value = false;
        todo.value = '';// input 필드 작성 후 add 버튼 누른 후 input 안에 empty 만들어 주기.
      }
    };

    return {
      todo,
      todos,
      onSubmit,
      hasError,
      todoStyle,
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
