# study-vue3-todo-list

## Project version

- node : 16.17.1
- vue : 3.2.41

### Learning Objectives

- vue3와 친해지기

### Description

- const count = ref(1);
- const plusOne = computed(() => count.value + 1);
- computed가 선언된 값의 안에 Reactive state를 감시하고 있다가 변경이 되면 변경된 값이 적용이 됨.
- console.log(plusOne.value);   // 2

### Computed VS Funtion

- 1. Computed는 인자를 받아올 수 없으며, Computed 함수 안에 reactive state가 변경이 될 때만 변수에 담아 준다.
- 2. Computed는 값을 cache(캐쉬)한다. 즉, 한 번 계산된 값은 저장된다.
- 3. Computed는 값을 cache(캐쉬)하기 때문에 `값이 변경되지 않으면 한번만 작동`되고, Function의 경우 `호출한거에 따라` 계속 작동 됨.

### Reference

- [Vue.js Computed](https://vuejs.org/guide/essentials/computed.html)
