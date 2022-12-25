<template>
    <div class="toast-box">
        
        <!-- 
            <transition name="slide"> 
            v-for를 사용할때 transition 말고 transition-group을 사용해줘야 한다.
        -->
        <transition-group name="slide">
            <div 
                v-for="toast in toasts"
                :key="toast.id"
                class="alert" 
                role="alert"
                :class="`alert-${toast.type}`"
            >
                {{ toast.message }}
            </div>
        </transition-group>
    </div>
</template>

<script>
import { useToast } from '@/composables/toast';

export default {
    setup() {
        const { toasts } = useToast();

        return {
            toasts
        }
    }
};
</script>

<style scoped>
    .toast-box {
        position: fixed;
        top: 10px;
        right: 10px;
    }
    .slide-enter-active,
    .slide-leave-active {
        transition: all 0.5s ease;
    }

    .slide-enter-from,
    .slide-leave-to {
        opacity: 0;
        transform: translateY(-30px);   
    }
    .slide-enter-to,
    .slide-leave-from {
        opacity: 1;
        transform: translateY(0px);
    }
</style>