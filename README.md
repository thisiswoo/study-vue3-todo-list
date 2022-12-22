# study-vue3-todo-list

## Project version

- node : 16.17.1
- vue : 3.2.41
- json-server : 0.17.1
- axios : 1.1.3

### Learning Objectives

- vue3와 친해지기

### Description


- teleport를 사용하게 될때 다른 Component에 teleport를 가지고 있지 않은 다른 페이지로 이동하게 된다면 Component가 DOM에서 빠지게 되고 teleport도 같이 사라지게 된다.
- 새로운 Todo가 생성 되었을때 list로 화면 이동과 함께 `Toast` 컴포넌트를 `App.vue` 컴포넌트로 옮겨 어디서든 사용할 수 있게 하기.
- 프로젝트가 커지면 커질수록 최하위 컴포넌트에서 최상위 컴포넌트로 데이터를 보낼 때 emit을 사용할 텐데 그렇게 하게 되면 코드도 길어지고 굉장히 불편해진다. 이때 `vuex`를 이용하여 문제 해결하기.
- main.js에 `store` 추가

### Reference

- [axios](https://www.npmjs.com/package/axios)

### Install

```shell
npm install vuex@next --save
```
- [vuex](https://vuex.vuejs.org/installation.html#direct-download-cdn)