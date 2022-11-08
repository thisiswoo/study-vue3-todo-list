# study-vue3-todo-list

## Project version

- node : 16.17.1
- vue : 3.2.41

### Learning Objectives

- vue3와 친해지기

### Description

- [json-server](https://www.npmjs.com/package/json-server)는 `Get a full fake REST API`로 간단한 개발에 사용되고 있다. 브라우저를 refresh하였을 때 컴퓨터 메모리에 저장되어 있는 데이터들은 휘발성이기 때문에 사라지게 되는데, `json-server`로 사용하게 되면 간단하게 DB작업을 통해 개발을 할 수 있다.

### Getting started

- npm install -g json-server

```
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
```
- Start JSON Server
`json-server --watch db.json`

