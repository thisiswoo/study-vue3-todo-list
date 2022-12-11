<template>
    <div 
        v-for="(item, index) in items" 
        :key="item.id" 
        class="card mt-2"
    >
        <!--  
            부모에 slot을 이용하여 원하는 데이터를 item이름과 index로 보내주기.
        -->
        <slot :item="item" :index="index"></slot>
    </div>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            required: true
        }
    }
};
</script>

<style>

</style>