import { computed, onUnmounted } from 'vue';
import { useStore } from 'vuex';    // vuex의 store를 사용

export const useToast = () => {
    // vuex store state의 데이터를 사용하기 위해 refactoring
    const store = useStore();
    // const toastMessage = ref('');
    // const toastAlertType = ref('');
    // const showToast = ref(false);
    // const timeout = ref(null);

    // 이렇게 값만 가져오게 되면 변경된 값을 vuex가 감지를 하지 못하게 된다.
    // const toastMessage = store.state.toastMessage;
    // const toastAlertType = store.state.toastAlertType;
    // const showToast = store.state.showToast;
    // const timeout = store.state.timeout;
    
    // computed로 감싸주어 변겨된 값을 vuex에서 인지하게 하기.
    const toastMessage = computed(() => store.state.toastMessage);
    const toastAlertType = computed(() => store.state.toastAlertType);
    const showToast = computed(() => store.state.showToast);
    const timeout = computed(() => store.state.timeout);

    const triggerToast = (message, type = 'success') => {
        toastMessage.value = message;
        toastAlertType.value = type;
        showToast.value = true;
        timeout.value = setTimeout(() => {
            console.log('hello');
            toastMessage.value = '';
            toastAlertType.value = '';
            showToast.value = false;
        }, 3000);
    };

    // component가 존재하게 되면 onBeforeUnmount와 onUnmounted가 실행되지 않는다
    // 메모리 누수를 방지하기 위해 많이 사용되는 함수.
    onUnmounted(() => {
        console.log('unmounted');
        // js clearTimeout()를 통해 아래 triggerToast() 함수의 setTimeout의 WEB APIs를 작동을 멈추어
        // 무분별한 메모리 사용을 방지하기 위함. 
        clearTimeout(timeout.value);
    });

    return {
        toastMessage,
        toastAlertType,
        showToast,
        triggerToast,
    }
};