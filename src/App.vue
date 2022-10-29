<template>
  <!-- <input 
    type="text"
    :value="name"
    @input="updateName"
  > -->
  <!-- 
    v-model을 사용하면 주석한 내용의 코드를 간편하게 줄일 수 있다.
  -->
  <input 
    type="text"
    v-model="name"
  >
  <button 
    class="btn btn-primary" 
    @click="onSubmit"
  >
    Click
  </button>
</template>

<script>
import { ref } from "vue"; // number, string

export default {
  name: "App",
  setup() {
    const name = ref('this is'); // number, string
    
    const onSubmit = () => {
      console.log(name.value);
    };

    // const updateName = (e) => {
    //   console.log(e.target.value);
    //   console.log(e);
    //   name.value = e.target.value;
    // };

    return {
      name,
      onSubmit,
      // updateName,
    };
  },
};
</script>

<style>
.name {
  color: #ff8080;
}
</style>
