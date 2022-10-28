<template>
  <div class="name">{{ greet }}</div>
</template>

<script>

export default {
  name: 'App',
  setup() {
    const name = 'thisis woo';

    const greeting = (name) => {
      return 'hello, ' + name;
    }

    const greet = greeting(name);

    return {
      greet
    }
  }
}
</script>

<style>
  .name {
    color: skyblue;
  }
</style>
