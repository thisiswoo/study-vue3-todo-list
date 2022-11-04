# study-vue3-todo-list

## Project version

- node : 16.17.1
- vue : 3.2.41

### Learning Objectives

- vue3와 친해지기

### Description

- 모든 `props`는 `one-way-down binding`만 가능하다.
- 즉, 부모에서 자식으로만 데이터를 내려준다.
- 부모 컴포넌트에 `property`가 변경이 되면  `props로 받은 자식 컴포넌트의 데이터도 같이 변경된다`.
- **자식 컴포넌트에서 부모에게 받은 데이터를 변경하면 안된다.**

### Reference
- [Vue.js props One-Way Data Flow](https://vuejs.org/guide/components/props.html) 공식 문서 참고.
