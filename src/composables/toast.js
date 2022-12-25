import { computed } from 'vue';
import { useStore } from 'vuex';    // vuex의 store를 사용

export const useToast = () => {
    const store = useStore();
    const toasts = computed(() => store.state.toast.toasts);

    // const toastMessage = computed(() => store.state.toastMessage);
    // const toastMessage = computed(() => store.getters.toastMessageWithSmile);
    // const toastAlertType = computed(() => store.state.toastAlertType);
    // const showToast = computed(() => store.state.showToast);

    // vuex modules를 활용한 refactoring
    // const toastMessage = computed(() => store.getters[`toast/toastMessageWithSmile`]);
    // const toastAlertType = computed(() => store.state.toast.toastAlertType);
    // const showToast = computed(() => store.state.toast.showToast);

    // index.js mutations에 로직 옮기기
    const triggerToast = (message, type = 'success') => {
        // store.dispatch('triggerToast', message, type);
        
        // vuex modules를 활용한 refactoring
        // store.dispatch('toast/triggerToast', { message: message, type: type });
        store.dispatch('toast/triggerToast', { message, type });
    };

    return {
        toasts,
        triggerToast,
    }
};