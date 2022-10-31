# study-vue3-todo-list

## Project version

- node : 16.17.1
- vue : 3.2.41

### Learning Objectives

- vue3와 친해지기

### Description

- v-show와 v-if의 사용과 차이점 알아보기.
- [v-show VS v-if vue.js 공식문서](https://vuejs.org/guide/essentials/conditional.html)
- v-show : 초기 렌더링 비용이 더 높다. 실제(real) 조건부 렌더링이기 때문에 초기 렌더링 시 조건이 거짓(false)면 아무 작업도 하지 않고, 참(true)가 될 때까지 렌더링 되지 않는다.
- v-if : 토글 비용이 더 높다. v-if, v-else-if 또는 v-else를 모두 렌더링 해야 하기 때문에 초기 렌더링 비용이 더 높다. 렌더링 된 후 조건에 따라 css속성이 display: block 또는 display: none으로 속성을 전환한다.

- **결론** toggle 같은 기능을 자주 사용하는 경우 `v-show`를, runtime 동안 조건이 거의 바뀌지 않을때는 `v-if`를
