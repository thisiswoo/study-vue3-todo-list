<template>
  <!-- v-bind: 를 줄이는 방법은 : 만 사용하는 것 -->
  <div :class="nameClass">
    {{ name }}
  </div>
  <!-- 
    *** 주의 input 안의 v-bind를 사용할 때 순서로 인해 
      input box안에 text가 노출되지 않을 수 있음.
  -->
  <input 
    :type="type"  
    :value="name"
  >
  <!-- v-on: 이벤트를 줄이는 방법은 @로 사용 가능 -->
  <button 
    class="btn btn-primary" 
    @click="updateName"
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
    const name = ref('this is'); // number, string
    const type = ref('number');
    const nameClass = ref('');
    // const name = ref({ // object, arry
    //  id: 1
    // });

    // * reactive
    // const name = reactive({ // object, arry
    //   id: 1
    // });
    
    const updateName = () => {
      name.value = "woo ~~"; // .value -> ref()
      type.value = 'text';
      nameClass.value = 'name'
      // name.value.id = 2;  // .value.xx -> ref()

      // name.id = 2;  // .id -> reactive()
    };

    return {
      name,
      updateName,
      type,
      nameClass,
    };
  },
};
</script>

<style>
.name {
  color: #ff8080;
}
</style>
