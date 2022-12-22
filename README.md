# study-vue3-todo-list

## Project version

- node : 16.17.1
- vue : 3.2.41
- json-server : 0.17.1
- axios : 1.1.3

### Learning Objectives

- vue3와 친해지기

### Description

- 재사용할 수 있는 로직들을 composables폴더에 `composition function`으로 빼내서 재사용 하고 있는데, 이때 reactive를 return해서 사용 할 때 가끔씩 reactivity가 끊어질 때가 있는데 이때 `toRefs`를 통해 해결하기.

```javascript
// js의 import 방법이 두 가지가 있다.

import { 함수명 } from '함수명파일이 있는 경로';
export const 함수명 = () => {
    //...
}

import 함수명 from '함수명파일이 있는 경로';
export defatul 함수명 = () => {
    // ...
}

```

### Reference

- [toRefs](https://vuejs.org/api/reactivity-utilities.html#toref)