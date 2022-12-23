import {createStore } from 'vuex';

// stats: 에 있는 데이터를 App.vue(최상위)에서도 접근하여 사용할 수 이다.
export default createStore({
    state: {
        toastMessage: '',
        toastAlertType: '',
        showToast: false,
        timeout: null
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
        },
        UPDATE_TOAST_TIMEOUT (state, payload) {
            state.timeout = payload;
        }
    },
    // actions를 만들어 함수 만들기
    actions: {
        // context 인자 안에 store.commit이 있다.
        // triggerToast(context, type = 'success') {
        triggerToast({ commit }, message, type = 'success') {
            // toastMessage.value = message;
            commit('UPDATE_TOAST_MESSAGE', message);
            
            // toastAlertType.value = type;
            commit('UPDATE_TOAST_ALERT_TYPE', type);
            
            // showToast.value = true;
            commit('UPDATE_TOAST_STATUS', true);

            timeout.value = setTimeout(() => {
                // toastMessage.value = '';
                commit('UPDATE_TOAST_MESSAGE', ''); // message 초기화 해주기
                // toastAlertType.value = '';
                commit('UPDATE_TOAST_ALERT_TYPE', '');    // type 초기화 해주기
                // showToast.value = false;
                commit('UPDATE_TOAST_STATUS', false);    // status false로 초기화 해주기
            }, 3000);
        }
    }
});