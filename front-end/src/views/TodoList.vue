<script setup lang="ts">
import { ref } from 'vue';

import TodoInput from '@/components/TodoInput.vue';
import AllList from '@/components/AllList.vue';
import Banner from '@/components/Banner.vue';

let markClicked = ref(false);

const clickMark = () => {
    if ( markClicked.value === false ) {
        markClicked.value = true;
    } else {
        markClicked.value = false;
    }
}

</script>

<template>
    <div v-if="markClicked === false" class="banner">
        <Banner></Banner>
    </div>
    <div v-if="markClicked === false" class="container">
        <h1>TODOLIST</h1>
        <TodoInput></TodoInput>
        <AllList></AllList>
    </div>
    <div v-if="markClicked === true" class="show-banner">
        <Banner></Banner>
    </div>
    <div class="banner-icon">
        <v-icon v-if="markClicked === false" name="hi-view-list" scale="1.7" class="list-icon" @click="clickMark"></v-icon>
        <v-icon v-if="markClicked === true" name="io-close-circle-outline" scale="1.7" @click="clickMark"></v-icon>
    </div>

</template>

<style lang="scss">
@import "@/assets/reset.scss";
@import "@/assets/global.scss";

.banner{
    @include mobile {
        display: none;
    }
    background-color: #f2f2f2;
    border-radius: 3px 20px 20px 3px;
    width: 25%;
    position: relative;
    z-index: 1;
    box-shadow: rgba(61, 61, 61, 0.3) 1em 0px 2.4em 0.2em;
    
}

.show-banner{
    background-color: #f2f2f2;
    border-radius: 3px;
    width: 100%;
    padding: 0 5em;
}

.banner-icon{
    position: absolute;
    z-index: 1;
    width: 95%;
    padding: 3.5em 2.5em;
    text-align: right;
    color: rgb(105, 104, 104);
    .list-icon{
        display: none;
        @include mobile{
            display: block;
        }
    }
}

.container{
    width: 75%;
    @include mobile {
        width: 100%;
    }
}
</style>