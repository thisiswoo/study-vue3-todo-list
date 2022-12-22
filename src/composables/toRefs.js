import {  reactive, toRefs } from 'vue';

export const useCount = () => {

    // 객체 자체는 reactive하지만 객체 안의 값들은 reactive 하지 않기 때문에 
    // index.vue의 count가 Add 버튼을 눌러도 값이 0으로 고정되어 있음.
    // toRefs를 사용하면 ref() 처럼 사용 가능.
    const state = reactive({
        count: 0
    });

    // return state;
    return toRefs(state);   // toRefs()로 감싸주면 위 count의 값이 ref으로 바뀜.
}