# study-vue3-todo-list

## Project version

- node : 16.17.1
- vue : 3.2.41
- json-server : 0.17.1
- axios : 1.1.3

### Learning Objectives

- vue3와 친해지기

### Description

#### Mutations

> “The only way to actually change state in a Vuex store is by committing a mutation.” - [vuex - mutations](https://vuex.vuejs.org/guide/mutations.html)

- 위 vuex 공식 홈페이지의 mutations소개 글을 번역하자면 “`vuex`안에 있는 `state`를 변경할 수 있는 유일한 방법으로 `mutations`이다.” 라고 한다.

```javascript
// mutations
const store = createStore({
    state: {
        count: 1
  },
  mutations: {
      increment (state) {
          // mutate state
      state.count++
    }
  }
});
```

- `mutations`는 항상 `동기적`으로 작동해야 한다.
- `mutations`는 `debugging` 목적 때문에 `동기적`으로 사용.

```javascript
// Mutations Must Be Synchronous
mutations: {
  someMutation (state) {
    api.callAsyncMethod(() => {
      state.count++
    })
  }
};
```

#### Actions
> “`vuex`에서 사용하는 함수라고 생각하면 된다. ”

- mutations에서만 state값이 변경 가능하기 때문에 `actions는 mutations를 commit 하여 state를 변경`할 수 있다.
- `actions`는 mutations과 다르게 `비동기` 작업을 할 수 있다.

```javascript
const store = createStore({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
});
```

#### Getters
> “getters는 component안에서 사용하는 computed와 같다고 생각하면 된다. veux에서 사용하는 computed라고 생각하면 된다.”

```javascript
const store = createStore({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos (state) {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```

### Reference

- [vuex - mutations](https://vuex.vuejs.org/guide/mutations.html)
- [vuex - actions](https://vuex.vuejs.org/guide/actions.html)
- [vuex - getters](https://vuex.vuejs.org/guide/actions.html)

## 정리

- `vuex`는 vuejs 안에 있는 어떠한 component에도 접근이 가능한 **`state`를 관리하는 tool**이다.
- 어떤 **`component에서든지 store의 state에 접근이 가능`**하다.
- **`state는 mutations을 통해서만 변경이 가능`**하다.
- 함수(function)는 **`acrions에서 정의하여 사용 가능`**하다.
- **`getters 는 component에서 사용하는 computed의 기능과 같다`**.