<template>
  <div class="name">
    {{ name }}
  </div>
  <button 
    class="btn btn-primary" 
    v-on:click="updateName"
  >
    Click
  </button>
</template>

<script>
import { ref } from "vue"; // number, string
// import { reactive } from "vue"; // object, arry

export default {
  name: "App",
  setup() {
    // * ref
    // const name = ref('this is woo'); // number, string
    const name = ref({ // object, arry
      id: 1
    });

    // * reactive
    // const name = reactive({ // object, arry
    //   id: 1
    // });

    // const greeting = (name) => {
    //   return 'hello, ' + name;
    // }

    // const greet = greeting(name);

    const updateName = () => {
      // name.value = "this is woo ~~"; // .value -> ref()
      name.value.id = 2;  // .value.xx -> ref()

      // name.id = 2;  // .id -> reactive()
      console.log(name);
    };

    return {
      name,
      updateName,
    };
  },
};
</script>

<style>
.name {
  color: #ff8080;
}
</style>
