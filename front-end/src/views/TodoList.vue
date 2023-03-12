<script setup lang="ts">
import TodoInput from '@/components/TodoInput.vue';
import AllList from '@/components/AllList.vue';
import Banner from '@/components/Banner.vue';

</script>

<template>
    <div class="banner">
        <Banner></Banner>
    </div>
    <div class="container">
        <h1>TODOLIST</h1>
        <TodoInput></TodoInput>
        <AllList></AllList>
    </div>

</template>

<style lang="scss">
@import "@/assets/reset.scss";
@import "@/assets/global.scss";

.banner{
    @include mobile {
        display: none;
    }
    background-color: #f0f0f3;
    border-radius: 3px 20px 20px 3px;
    width: 25%;
    position: relative;
    z-index: 1;
    box-shadow: rgba(61, 61, 61, 0.3) 1em 0px 2.4em 0.2em;
}

.container{
    width: 75%;
    @include mobile {
        width: 100%;
    }
}
</style>