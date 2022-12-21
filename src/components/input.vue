<template>
    <div class="form-group">
        <label>{{ label }}</label>
        <input 
            type="text" 
            class="form-control"
            :value="subject"
            @input="onInput"
        >
        <div 
            v-if="error"
            class="text-red"
        >
            {{ error }}
        </div>
    </div>
</template>

<script>
import { getCurrentInstance } from 'vue';   // getCurrentInstance()를 통해 emit 사용하기

export default {
    props: {
        label: {
            type: String,
            required: true
        },
        error: {
            type: String,
            required: true
        },
        subject: {
            type: String,
            required: true
        },
    },
    // setup(props, { emit }) {
    setup() {
        // getCurrentInstance()를 통해 emit 사용하기
        const { emit } = getCurrentInstance();

        const onInput = (e) => {
            // 부모component v-model: 에 보낼때 문법
            emit('update:subject', e.target.value);
        };

        return {
            onInput,
        }
    }
};
</script>

<style scoped>
    .text-red {
        color: red;
    }
</style>