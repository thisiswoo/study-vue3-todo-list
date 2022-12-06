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
  <!-- 
    최상위 index.html의 id가 modal인 div로 teleport하여 
    부모 컴포넌트인 index.vue(pages/todo/index.vue)의 
    최상위 div의 스타일 style="opacity: 0.5"를 적용 안되게 하기.

  -->
  <teleport to="#modal">
    <!-- 
      slot을 사용하기 위해 import한 component 태그를 </>(닫는 태그)를 만들어 주어
      안에다가 text를 작성한다.
    -->
    <Modal 
      v-if="showModal"
      @close="closeModal"
      @delete="childDeleteTodo"
    />
  </teleport>
</template>

<script>
import { useRouter } from 'vue-router';
import Modal from '@/components/DeleteModal.vue';
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

    const childDeleteTodo = () => {
      emit("child-delete-todo", todoDeleteId.value);
      showModal.value = false;
      todoDeleteId.value = null;
    };

    const moveToPage = (todoId) => {
      router.push({
        name: 'Todo',
        params: {
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