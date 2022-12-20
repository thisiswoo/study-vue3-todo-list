# study-vue3-todo-list

## Project version

- node : 16.17.1
- vue : 3.2.41
- json-server : 0.17.1
- axios : 1.1.3

### Learning Objectives

- vue3와 친해지기

### Description

- todo page(detail)의 `input` 부분을 component로 빼내기.
- `Multiple v-model`을 이용하여 부모 component와 자식 component에 데이터를 여러개 바인딩 시킬 수 있다.

### Reference

- [Multiple v-model](https://vuejs.org/guide/components/events.html#multiple-v-model-bindings)

### Exemple

- `v-model` 바인딩이 1개인 경우.

- **App.vue(부모)**
```vue
<template>
    <form
        @submit.prevent="onSubmit"
        class="container"
    >
        <Input v-model="email" />
        ...
        <button 
            type="submit"
        ></button>
    </form>
</template>

<script>
import { ref } from 'vue';
import Input from '@/components/Input.vue';

export default {
    components: {
        Input
    },
    setup() {
        const email = ref('');
        const password = ref('');
        const onSubmit = () => {
            console.log(email.value);   // input컴포넌트에서 적은 값 출력.
        };
    }
};
</script>

<style scoped>
</style>
```

- **Input.vue(자식)**
```vue
<template>
    <div class="form-group">
        <lable>
            Email address
        </lable>
        <!-- 
        props에 modelValue로 받기 때문에 :value="modelValue"로 수정
        <input
            :value="email"
            @input="onInput"
            type="email"
            class="form-control"
        >
        -->
        <input
            :value="modelValue"
            @input="onInput"
            type="email"
            class="form-control"
        >
    </div>
</template>

<script>
import { ref } from 'vue';
import Input from '@/components/Input.vue';

export default {
    props: {
        // 부모컴포넌트(App.vue)에 ':value="email"'부분의 email을 
        // 'modelValue'로 받아와 <template>의 
        // <input :value="modelValue">에 넣어주고
        // onInput함수가 실행되면 emit으로 부모 컴포너느에 데이터를 보낸다.
        // email: {
        //     type: String,
        //     required: true
        // }
        modelValue: {
            type: String,
            required: true
        }
    },
    setup(props, { emit }) {
        const onInput = (e) => {
            // emit('update:email', e.target.value);
            emit('update:modelValue', e.target.value);
        };

        return {
            onInput
        }
    }
};
</script>

<style scoped>
</style>
```