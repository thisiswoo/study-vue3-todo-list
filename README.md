# study-vue3-todo-list

## Project version

- node : 16.17.1
- vue : 3.2.41
- json-server : 0.17.1
- axios : 1.1.3

### Learning Objectives

- vue3와 친해지기

### Description

- `Toas.js`에서 사용하는 `state`를 `vuex`로 refactoring 하기.
```javascript
import { computed } from 'vue';
import { useStore } from 'vuex';    // vuex의 store를 사용

// 이렇게 값만 가져오게 되면 변경된 값을 vuex가 감지를 하지 못하게 된다.
const toastMessage = store.state.toastMessage;

// computed로 감싸주어 변겨된 값을 vuex에서 인지하게 하기.
const toastMessage = computed(() => store.state.toastMessage);
```

### Reference

- [vuex - state](https://vuex.vuejs.org/guide/state.html#single-state-tree)