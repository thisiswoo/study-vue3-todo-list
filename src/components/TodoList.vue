<template>
  <div 
    v-for="(t, index) in todos" 
    :key="t.id" 
    class="card mt-2"
  >
    <div class="card-body p-2 d-flex align-items-center">
      <div class="form-check flex-grow-1">
        <input 
          class="form-check-input" 
          type="checkbox" 
          :checked="t.completed" 
          @change="toggleTodo(index)"
        />
        <label 
          class="form-check-label" 
          :class="{ todo: t.completed }"
        >
          {{ t.subject }}
        </label>
      </div>
      <div>
        <button 
          class="btn btn-danger btn-sm" 
          @click="childDeleteTodo(index)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import { watchEffect } from 'vue';
export default {
  name: "StudyVue3TodoListTodoList",
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
  emits: ['toggle-todo', 'child-delete-todo'],
  setup(props, { emit }) {

    const toggleTodo = (index) => {
      emit("toggle-todo", index);
    };

    const childDeleteTodo = (index) => {
      emit("child-delete-todo", index);
    };

    return {
      toggleTodo,
      childDeleteTodo,
    }
  }
};
</script>

<style lang="scss" scoped>
</style>