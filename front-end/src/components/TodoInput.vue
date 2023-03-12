<script setup lang="ts">
import { ref } from 'vue'
import { useTodoListStore } from '@/store/index'

let newTodoItem = ref('')

const todoListStore = useTodoListStore()

const addTodo = () => {
    if (newTodoItem.value == '') {
        alert('입력하세요');
        return
    }

    todoListStore.addTodo(newTodoItem.value)
    clearInput();
}

const clearInput = () => {
    newTodoItem.value = '';
}

</script>

<template>
    <div id="todoinput">
        <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo" placeholder="Type your todolist">
        <span v-on:click="addTodo">
            <i class="fas fa-plus" aria-hidden="true"></i>
        </span>
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/reset.scss";
@import "@/assets/global.scss";

#todoinput {
    @include inputbox;
    @include shadow;
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 2em;

    input {
        width: calc(100% - 3em);
        border-style: none;
        border-radius: inherit;
        text-align: center;
    }

    input:focus {
        outline: none;
    }

    span {
        background: linear-gradient(to right, #6478FB, #8763FB);
        border-radius: 0 5px 5px 0;
        width: 3em;

        i {
            color: white;
            font-size: 1.5em;
        }
    }
}
</style>