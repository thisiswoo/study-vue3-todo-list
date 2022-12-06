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
    @delete="childDeleteTodo"
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