<template>
  <div v-for="(t, index) in todos" :key="t.id" class="card mt-2">
    <div class="card-body p-2 d-flex align-items-center">
      <div class="form-check flex-grow-1">
        <input class="form-check-input" type="checkbox" v-model="t.completed" />
        <label class="form-check-label" :class="{ todo: t.completed }">
          {{ t.subject }}
        </label>
      </div>
      <div>
        <button class="btn btn-danger btn-sm" @click="deleteTodo(index)">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudyVue3TodoListTodoList",
  // 부모컴포넌트(App)에서 :바인딩 시켜 보내온 데이터를 props에서 받는다.
  //   props: ["todos"],      // 방법 1)
  // Object로 부모컴포넌트에서 데이터 받기.
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>