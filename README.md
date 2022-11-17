# study-vue3-todo-list

## Project version

- node : 16.17.1
- vue : 3.2.41
- json-server : 0.17.1
- axios : 1.1.3

### Learning Objectives

- vue3와 친해지기

### Description

- `watch`를 사용하여 검색기능 구현하기.
- `watch`란? 
    - 특정 데이터가 `변화를 감지`하여 자동으로 특정 로직을 수행해주는 속성. 
    - 특정 데이터가 변경되었을 때 실행, 새로운 데이터와 이전의 데이터를 가져옴 console.log(oldVal, newVal);
        - 특정  반응 속성을 보고 싶거나, old value를 보고 싶을 때 활용
        - 함수 또는 하나 이상의 반응 속성을 감시할 수 있음.
        - reactive 종속성이 변경될 때만 실행됨.

### Reference

- [npm json-server](https://www.npmjs.com/package/json-server)
```
GET /posts?title_like=server
```


