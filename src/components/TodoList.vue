<template>
  <div 
    v-for="(t, index) in todos" 
    :key="t.id" 
    class="card mt-2"
  >
    <div 
      class="card-body p-2 d-flex align-items-center"
      style="cursor: pointer"
      @click="moveToPage(t.id)"
    >
      <div class="flex-grow-1">
        <!-- 
          * 주의 : @change.stop에 event를 주게 되면 작동하지 않음.
          vue : @click event에 .stop을 작성하여 event bubbling을 막는다 
          javascript : event.stopPropagation() 임.

          toggleTodo(index)에 index 값만 부모 컴포넌트에 보내주어 반대되는 값을 주어
          로직을 구성하게 되는데, 다른 곳에서도 사용할 수 있게 되면 혼란이 될 수 있기 때문에
          정확하게 하기 위해 event.target 값도 같이 부모 컴포넌트에 보내주기. 
        -->
        <input 
          class="ml-2 mr-2"
          type="checkbox" 
          :checked="t.completed" 
          @change="toggleTodo(index, $event)"
          @click.stop
        />
        <span 
          :class="{ todo: t.completed }"
        >
          {{ t.subject }}
        </span>
      </div>
      <div>
        <!-- 
          vue : @click event에 .stop을 작성하여 event bubbling을 막는다 
          javascript : event.stopPropagation() 임.
        -->
        <button 
          class="btn btn-danger btn-sm" 
          @click.stop="childDeleteTodo(index)"
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

    // toggleTodo(index)에 index 값만 부모 컴포넌트에 보내주어 반대되는 값을 주어
    // 로직을 구성하게 되는데, 다른 곳에서도 사용할 수 있게 되면 혼란이 될 수 있기 때문에
    // 정확하게 하기 위해 event.target 값도 같이 부모 컴포넌트에 보내주기. 
    const toggleTodo = (index, event) => {
      // checked 가 되면 true, checked가 되지 않으면 false
      emit("toggle-todo", index, event.target.checked);
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