<template>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li v-if="currentPage !== 1" class="page-item">
          <a 
            class="page-link" 
            style="cursor: pointer"
            @click="onClick(currentPage - 1)"
          >
            Previous
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in numberOfPages"
          :key="page"
          :class="currentPage === page ? 'active' : ''"
        >
            <a 
                class="page-link" 
                style="cursor: pointer" 
                @click="onClick(page)"
            >{{ page }}</a>
        </li>
        <li v-if="numberOfPages !== currentPage" class="page-item">
            <a 
                class="page-link" 
                style="cursor: pointer" 
                @click="onClick(currentPage + 1)"
            >Next</a>
        </li>
      </ul>
    </nav>
</template>

<script>
// import { useContext } from 'vue';    // kosie coder와의 차이점 알아보기

export default {
    props: {
        numberOfPages: {
            type: Number,
            required: true
        },
        currentPage: {
            type: Number,
            required: true
        }
    },
    emits: ['click'],
    setup(props, { emit }) {
    // setup() {
        // const { emit } = useContext();   // kosie coder와의 차이점 알아보기
        const onClick = (page) => {
            emit('click', page)
        };
        return {
            onClick
        }
    }
}
</script>

<style>

</style>