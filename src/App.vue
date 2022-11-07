<template>
  <div class="container">
    <h4>count :  {{ count }}</h4>
    <!-- doubleCountComputed와 doubleCountMethod() 차이점 콘솔에서 확인. -->
    <h4>double count computed :  {{ doubleCountComputed }}</h4>
    <h4>double count computed :  {{ doubleCountComputed }}</h4>
    <h4>double count method:  {{ doubleCountMethod() }}</h4>
    <h4>double count method:  {{ doubleCountMethod() }}</h4>
    <button @click="count++">Add One</button>
    <h2>To-Do List</h2>
    <!-- 자식컴포넌트(TodoSimpleForm에서 emit으로 보낸 add-todo를 받아와 사용하기 -->
    <TodoSimpleForm @add-todo="addTodo" />
    <div v-if="!todos.length">추가된 Todo가 없습니다.</div>
    <!-- 부노컴포넌트(App)에서 props로 todos의 데이터를 자식컴포넌트(TodoList)로 보내기. -->
    <TodoList 
      :todos="todos" 
      @toggle-todo="toggleTodo" 
      @child-delete-todo="parentsDeleteTodo"
    />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import TodoSimpleForm from "./components/TodoSimpleForm.vue";
import TodoList from "./components/TodoList.vue";

export default {
  name: "App",
  components: {
    TodoSimpleForm,
    TodoList,
  },
  setup() {
    const todos = ref([]);

    const todoStyle = {
      textDecoration: "line-through",
      color: "gray",
    };

    const addTodo = (todo) => {
      console.log("자식->부모 data : ", todo);
      todos.value.push(todo);
    };

    const toggleTodo = (index) => {
      console.log(todos.value[index].completed);
      todos.value[index].completed = !todos.value[index].completed;
      console.log(todos.value[index].completed);
    };

    const parentsDeleteTodo = (index) => {
      todos.value.splice(index, 1);
    };

    // computed와 함수의 차이
    const count = ref(1);
    // computed
    const doubleCountComputed = computed(() => {
      console.log('doubleCountComputed');
      return count.value * 2;
    });
    // 함수
    const doubleCountMethod = () => {
      console.log('doubleCountMethod');
        return count.value * 2;
    }


    return {
      todos,
      addTodo,
      todoStyle,
      parentsDeleteTodo,
      toggleTodo,
      count,
      doubleCountComputed,
      doubleCountMethod,
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
