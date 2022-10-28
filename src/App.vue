<template>
  <div class="name">{{ name }}</div>
</template>

<script>

export default {
  name: 'App',
  setup() {
    const name = 'thisis woo';

    return {
      name,
    }
  }
}
</script>

<style>
  .name {
    color: skyblue;
  }
</style>
