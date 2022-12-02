import { ref, onUnmounted } from 'vue';

export const useToast = () => {
    const toastMessage = ref('');
    const toastAlertType = ref('');
    const showToast = ref(false);
    const timeout = ref(null);
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