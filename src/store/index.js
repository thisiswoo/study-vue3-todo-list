import {createStore } from 'vuex';

// stats: 에 있는 데이터를 App.vue(최상위)에서도 접근하여 사용할 수 이다.
export default createStore({
    state: {
        toastMessage: '',
        toastAlertType: '',
        showToast: false,
    },
    // mutations는 첫번째로 state를 인자로 받아 state의 값을 변경
    // 두번째 인자로는 원하는 데이터를 받을 수 있는데 보통 'payload'라는 인자명을 사용한다.
    mutations: {
        UPDATE_TOAST_MESSAGE (state, payload) {
            state.toastMessage = payload;
        },
        UPDATE_TOAST_ALERT_TYPE (state, payload) {
            state.toastAlertType = payload;
        },
        UPDATE_TOAST_STATUS (state, payload) {
            state.showToast = payload;
        }
    },
    // actions를 만들어 함수 만들기
    actions: {
        // context 인자 안에 store.commit이 있다.
        // triggerToast(context, type = 'success') {
        triggerToast({ commit }, message, type = 'success') {
            commit('UPDATE_TOAST_MESSAGE', message);
            commit('UPDATE_TOAST_ALERT_TYPE', type);
            commit('UPDATE_TOAST_STATUS', true);

            setTimeout(() => {
                commit('UPDATE_TOAST_MESSAGE', ''); // message 초기화 해주기
                commit('UPDATE_TOAST_ALERT_TYPE', '');    // type 초기화 해주기
                commit('UPDATE_TOAST_STATUS', false);    // status false로 초기화 해주기
            }, 3000);
        }
    },
    // getters는 component안에서 사용하는 computed와 같다고 생각하면 된다.
    getters: {
        toastMessageWithSmile(state) {
            // 'state.toastMessage'를 watch를 하고 있다가
            // 변경이 되면 변경된 부분과 return해준 부분을 계산하여 다시 캐시해준다.
            return state.toastMessage + '^_^';
        }
    }
});