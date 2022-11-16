# study-vue3-todo-list

## Project version

- node : 16.17.1
- vue : 3.2.41
- json-server : 0.17.1
- axios : 1.1.3

### Learning Objectives

- vue3와 친해지기

### Description

- `watch`와 `watch effect`사용하기.
- `watch`란? 
    - 특정 데이터가 `변화를 감지`하여 자동으로 특정 로직을 수행해주는 속성. 
    - 특정 데이터가 변경되었을 때 실행, 새로운 데이터와 이전의 데이터를 가져옴 console.log(oldVal, newVal);
        - 특정  반응 속성을 보고 싶거나, old value를 보고 싶을 때 활용
        - 함수 또는 하나 이상의 반응 속성을 감시할 수 있음.
        - reactive 종속성이 변경될 때만 실행됨.
- `watch effect`란? 
    - 의존성이 있는 데이터에 대해서 `즉각적으로 실행`
    - 함수 내부에 있는 여러 반응값을 관찰해야 할 때마다 사용하고 그 중 하나가 업데이트 될 때 마다 반응.
        - watch의 단순화 버전
        - 함수만을 값으로 가진다
        - 정의되거나 reactived의 종속성이 변겨오딜 때 즉시 동작한다.
        - 여러 반응 속성을 감시하고 싶고, 이전 값에 신경을 쓰지 않을 때 사용됨.
        - computed() hook 처럼 동작한다.
        - 함수 내부에 있는 여러 반응값을 관찰해야 할 때마다 사용하고 그 중 하나가 업데이트 될 때 마다 반등.

### Reference

- [watch](https://vuejs.org/guide/essentials/watchers.html)

### Exemple Code

## Watching a Single Source 
- A watcher data sourve can either be getter function that returns a value, or directly a `ref`:
```
// watching a getter
const stat = reactive({ count: 0 });
watch(() => state.count, (count, prevCount) => {
    codes...
});

// directly watching a ref
const count = ref(0);
watch(count, (count, prevCount) => {
    codes...
});
```

## Watching Multiple Sources
- A watcher can also wath multiple sourves at the same time using an array:
```
const firstName = ref('');
const lastName = ref('');

watch([firstName, lastName], (newValues, prevValues) => {
    console.log(newValues, prevValues);
});
```


