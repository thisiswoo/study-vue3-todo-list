import { computed } from 'vue';
import { useStore } from 'vuex';    // vuex의 store를 사용

export const useToast = () => {
    const store = useStore();
    // const toastMessage = computed(() => store.state.toastMessage);
    const toastMessage = computed(() => store.getters.toastMessageWithSmile);
    const toastAlertType = computed(() => store.state.toastAlertType);
    const showToast = computed(() => store.state.showToast);

    // index.js mutations에 로직 옮기기
    const triggerToast = (message, type = 'success') => {
        store.dispatch('triggerToast', message, type);
    };

    return {
        toastMessage,
        toastAlertType,
        showToast,
        triggerToast,
    }
};