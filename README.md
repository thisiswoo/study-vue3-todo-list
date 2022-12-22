# study-vue3-todo-list

## Project version

- node : 16.17.1
- vue : 3.2.41
- json-server : 0.17.1
- axios : 1.1.3

### Learning Objectives

- vue3와 친해지기

### Description

- axios를 통해 비동기, back-end 작업 여러 군데에서 하고 있는데 url이 localhost:3000로 작업하고 있다.
나중에 production 라이브 웹 사이트에 build 하여 올리게 되면 해당 url이 localhost:3000 요청되게 되는데 production에 올라가게 되면 보통 back-end의 url이 바뀌게 된다.
그때마다 axios 요청을 보낸 곳마다 찾아서 url을 변경해 줘야 하는 번거로움이 발생할 수 있다.
또한 프로젝트의 규모가 커질수록 axios 요청이 많아지기 때문에 `기본url(baseUrl)`을 한곳에 만들어 놓고 가져다 사용하는 방법을 알아보기.

### Reference

- [axios](https://www.npmjs.com/package/axios)