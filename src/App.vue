<template>
  <!-- 
    vue2의 Fragment 기준 : <template></template> 태그 안에
    무조건 코드 작성하기 위한 최상위 <div></div>를 만들어야 함.
  
  <div>  <=========== 최상위 div 만들고 하위에 코드들 작성 
    <div class="name">{{ name }}</div>
    <div> 코드들... </div>
  </div>
  -->

  <!-- vue3에서는 최상위 div 필요 없이 바로 코드들 작성 가능 -->
  <div class="name">{{ name }}</div>
  <div> 코드들... </div>
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
