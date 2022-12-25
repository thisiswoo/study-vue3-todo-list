import {createStore } from 'vuex';
import modules from './modules';

// stats: 에 있는 데이터를 App.vue(최상위)에서도 접근하여 사용할 수 이다.
export default createStore({
    // js에서는 앞/뒤가 같으면 생략가능
    // modules: modules
    modules
});