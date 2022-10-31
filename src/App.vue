<template>
  <!-- 
    v-show : 초기 브라우저가 랜더링 될 때
            onst toggle = ref(false) <-- false로 지정해줘서
            태그 안에 style display:none으로 지정되어 false인 div만 출력 됨.
            * 초기 렌더링 비용이 많이 소모됨.
            이유 : 지금 같이 if,else의 div를 모두 렌더링 해야 하므로...
            *** toggle 같은 기능을 자주 사용하는 경우 v-show를 사용해야 함.

    <div v-show="toggle">true</div>
    <div v-show="!toggle">false</div> 
  -->

  <!-- 
    v-if : 초기 브라우저 렌더링 될 때 
          const toggle = ref(false) <-- false로 지정해줘서
          초기 값이 false인 div가 노출 됨.
          * toggle 하는데 비용이 많이 들어감.
          *** runtime 동안 조건이 거의 바뀌지 않을때 사용해야 함.
  -->
  <div v-if="toggle">true</div>
  <div v-else>false</div>

  <button @click="onToggle">Toggle</button>

  <div class="container">
    <h2>To-Do List</h2>
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
      <div v-show="hasError" style="color: red">
        This field cannot be empty
      </div>
    </form>
    <!-- {{ todos }} -->
    <div v-for="t in todos" :key="t.id" class="card mt-2">
      <div class="card-body p-2">
        {{ t.subject }}
      </div>
    </div>
    <!-- 
      <div class="card mt-2">
        <div class="card-body p-2">
          {{ todos[1].subject }}
        </div>
      </div> 
    -->
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "App",
  setup() {
    const toggle = ref(false);
    const todo = ref("");
    const todos = ref([
      {
        id: 1,
        subject: "휴대폰 사기",
      },
      {
        id: 2,
        subject: "삼겹살 사기",
      },
    ]);
    const hasError = ref(false);

    const onSubmit = () => {
      if (todo.value === '') {
        hasError.value = true;
      } else {
        todos.value.push({
          id: Date.now(),
          subject: todo.value,
        });
        hasError.value = false;
      }
    };

    // v-show
    const onToggle = () => {
      toggle.value = !toggle.value;
    };

    return {
      todo,
      todos,
      onSubmit,
      toggle,
      onToggle,
      hasError,
    };
  },
};
</script>

<style>
.name {
  color: #ff8080;
}
</style>
