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
        <!-- <button 
          class="btn btn-danger btn-sm" 
          @click.stop="childDeleteTodo(index)"
        > -->
        <button 
          class="btn btn-danger btn-sm" 
          @click.stop="openModal(t.id)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
  <Modal 
    v-if="showModal"
    @close="closeModal"
  />
</template>

<script>
import { useRouter } from 'vue-router';
import Modal from '@/components/Modal.vue';
import { ref } from 'vue';

export default {
  components: {
    Modal,
  },
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
  emits: ['toggle-todo', 'child-delete-todo'],
  setup(props, { emit }) {
    const router = useRouter();
    const showModal = ref(false);
    const todoDeleteId = ref(null);

    const toggleTodo = (index, event) => {
      emit("toggle-todo", index, event.target.checked);
    };

    const openModal = (id) => {
      todoDeleteId.value = id;
      showModal.value = true;
    };

    const closeModal = () => {
      todoDeleteId.value = null;
      showModal.value = false;
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
      showModal,
      openModal,
      closeModal,
    }
  }
};
</script>

<style lang="scss" scoped>
</style>