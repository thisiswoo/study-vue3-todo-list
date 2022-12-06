<template>
    <!-- Modal -->
    <div class="modal-wrapper">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <!-- 
                            text가 condition에 맞게 바꿔줘야 하는데,
                            field랑 tag가 들어가게 되는 경우에는 props로 보낼 수 없기 때문에
                            이럴 때 'slot'을 사용하여 보낼 수 있다.
                            또한 여러가지를 보내고 싶을땐
                            slot 태그안에 name을 넣어 사용하면 된다.
                        -->
                        <slot name="title"></slot>
                    </h5>
                    <button type="button" class="close">
                    <span @click="onClose">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <slot name="body"></slot>
                </div>
                <div class="modal-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    setup(props, { emit }) {
        const onClose = () => {
            emit('close');
        };

        return {
            onClose,
        }
    }
};
</script>

<style scoped>
    .modal-wrapper {
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }
</style>