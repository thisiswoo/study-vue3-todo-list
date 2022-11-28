<template>
  <div 
    v-for="(t, index) in todos" 
    :key="t.id" 
    class="card mt-2"
  >
    <div 
      class="card-body p-2 d-flex align-items-center"
      @click="moveToPage(t.id)"
    >
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
import { useRouter } from 'vue-router';

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
    const router = useRouter();

    const toggleTodo = (index) => {
      emit("toggle-todo", index);
    };

    const childDeleteTodo = (index) => {
      emit("child-delete-todo", index);
    };

    const moveToPage = (todoId) => {
      // 원하는 페이지로 이동
      console.log(todoId);

      // router.push('/todos/' + todoId);

      // 위 코드처럼 짧게 사용할 수 있지만 아래 처럼 object를 사용하는 이유는
      // 프로젝트가 커지게 되면 짧게 코드를 작성 했을때 만약 path의 경로가 바뀌게 되면
      // 짧은 코드 모두 바꿔야 하지만 object 형식으로 하게 되면 index.js의 path 경로만 바꿔주면 된다.
      router.push({
        name: 'Todo',
        params: {
          // index.js에서 router path에서 `path: '/todos/:id'`에서 적어준 id
          id: todoId
        }
      });
    };

    return {
      toggleTodo,
      childDeleteTodo,
      moveToPage,
    }
  }
};
</script>

<style lang="scss" scoped>
</style>