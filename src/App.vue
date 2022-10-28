<template>
  <div class="name">{{ name }}</div>
  <button 
    class="btn btn-primary" 
    v-on:click="updateName"
  >
    Click
  </button>
</template>

<script>

export default {
  name: 'App',
  setup() {
    let name = 'thisis woo';

    // const greeting = (name) => {
    //   return 'hello, ' + name;
    // }

    // const greet = greeting(name);

    const updateName = () => {
      name = 'this is woo ~~'
      console.log(name);
    }

    return {
      name,
      updateName
    }
  }
}
</script>

<style>
  .name {
    color: #ff8080;
  }
</style>
