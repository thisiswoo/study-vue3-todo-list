<template>
  <!-- <div 
    v-for="(t, index) in todos" 
    :key="t.id" 
    class="card mt-2"
  > -->
  <List
    :items="todos"
  >
    <!-- 
      이름을 저장하지 않으면 default로 저장됨.
      <template v-slot:default>
      아래 "slotProps" 안에 List.vue에서 보내온 item이 객체로 정보가 담겨 있다.
      또한 객체를 받은것 중 원하는 것만 빼서 사용도 가능함.
    -->
    <!-- <template #default="slotProps"> -->
    <template #default="{ item, index }">
      <!-- <div 
        class="card-body p-2 d-flex align-items-center"
        style="cursor: pointer"
        @click="moveToPage(t.id)"
      > -->
      <div 
        class="card-body p-2 d-flex align-items-center"
        style="cursor: pointer"
        @click="moveToPage(item.id)"
      >
        <div class="flex-grow-1">
          <input 
            class="ml-2 mr-2"
            type="checkbox" 
            :checked="item.completed" 
            @change="toggleTodo(index, $event)"
            @click.stop
          />
          <span 
            :class="{ todo: item.completed }"
          >
            {{ item.subject }}
          </span>
        </div>
        <div>
          <!-- <button 
            class="btn btn-danger btn-sm" 
            @click.stop="childDeleteTodo(index)"
          > -->
          <button 
            class="btn btn-danger btn-sm" 
            @click.stop="openModal(item.id)"
          >
            Delete
          </button>
        </div>
      </div>
    <!-- </div> -->
    </template>
  </List>
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
import List from '@/components/List.vue';
import { getCurrentInstance } from 'vue'; // getCurrentInstance()를 통해 emit 사용하기

export default {
  components: {
    Modal,
    List,
  },
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
  emits: ['toggle-todo', 'child-delete-todo'],
  // setup(props, { emit }) {
  setup() {
    // getCurrentInstance()를 통해 emit 사용하기
    const { emit } = getCurrentInstance();

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