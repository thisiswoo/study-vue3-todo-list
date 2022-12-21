# study-vue3-todo-list

## Project version

- node : 16.17.1
- vue : 3.2.41
- json-server : 0.17.1
- axios : 1.1.3

### Learning Objectives

- vue3와 친해지기

### Description

- vue 3.2v에서 `useContext가 deprecated될 예정`으로 인한 기능 `useContext` -> `getCurrentInstance()` 또는 기존 `setup(props, {emit})`을 통해 `emit`을 사용하기.

### Exemple

- **getCurrentInstance 사용 방법 예시**
```vue
<script>
import { getCurrentInstance } from 'vue';
export default {
    props: {
        numberOfPages: {
            type: Number,
            required: true
        },
        currentPage: {
            type: Number,
            required: true
        }
    },
    emits: ['click'],
    setup() {
        const { emit } = getCurrentInstance();
        const onClick = (page) => {
            emit('click', page)
        };

        return {
            onClick
        }
    }
}
</script>
```