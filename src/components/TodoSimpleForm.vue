<template>
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
    <div v-show="hasError" style="color: red">This field cannot be empty</div>
  </form>
</template>

<script>
import { ref } from "vue";

export default {
  emits: ['add-todo'],
  // 자식 컴포넌트에서 부모컴포넌트로 데이터를 보낼때 필요한게 'context'안에 들어있다.
  // context -> { emit }으로 객체 구조분해를 통해 emit으로 사용하기.
  setup(props, { emit }) {
    const todo = ref("");
    const hasError = ref(false);

    const onSubmit = () => {
      if (todo.value === "") {
        hasError.value = true;
      } else {
        emit("add-todo", {
          id: Date.now(),
          subject: todo.value,
          completed: false,
        });
        hasError.value = false;
        todo.value = "";
      }
    };

    return {
      todo,
      hasError,
      onSubmit,
    };
  },
};
</script>

<style>
</style>