# study-vue3-todo-list

## Project version

- node : 16.17.1
- vue : 3.2.41
- json-server : 0.17.1
- axios : 1.1.3

### Learning Objectives

- vue3와 친해지기

### Description

- pagination을 활용하여 paging 처리해주기.
- `xxx.headers['x-total-count']`로 헤더 정보의 count를 가져와서 paging 정보 처리.
- computed를 사용했기 때문에 함수 안에 있는 Reactive State가 바뀔 때마다 `return Math.ceil(numberOfTodos.value / limit);` 부분이 다시 실행 되어 computed property가 업데이트가 됨. 

### Reference
[pagination](https://www.npmjs.com/package/json-server)