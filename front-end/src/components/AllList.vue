<script setup lang="ts">
import { computed } from 'vue'
import { useTodoListStore } from '@/store/index'

const todoListStore = useTodoListStore();

const todoItems = computed(() => {
    console.log('에라이', todoListStore.todoItems);
    return todoListStore.todoItems;
})

const removeTodo = (id: number) => {
    todoListStore.removeTodo(id);
}

const clearAllTodo = () => {
    console.log("ㅅㅂ")
    // if (!confirm("Do you really want to delete all??")){
    //     return
    // }
    todoListStore.clearAll();
}

</script>

<template>
    <div id="todo-list">
        <div v-if="todoItems.length == 0" class="empty-list">
            <p>아직 목록이 없습니다. 목록을 추가해 주세요.</p>
        </div>
        <ul v-if="todoItems.length > 0">
            <li v-for="todoItem, idx in todoItems" v-bind:key="idx">
                <v-icon name="bi-check-circle" class="checkBtn"/>
                {{ todoItem.list }}
                <v-icon name="co-delete" class="removeBtn" v-on:click="removeTodo(todoItem.id)"/>
            </li>
        </ul>
    </div>
    <div class="clear-button" type="button" v-on:click="clearAllTodo" >
        <span>Clear All</span>
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/reset.scss";
@import "@/assets/global.scss";

empty-list {
    margin-top: 2em;
}

#todo-list{
    width: 100%
}

li {
    @include inputbox;
    @include shadow;
    margin-bottom: 0.7em;
    text-align: left;
    transition: all 2s;
    transform: translateY(0.7em);
    display: flex;
    padding-left: 0.9em;
    padding-right: 0.9em;

    .checkBtn {
        color: #62acde;
        margin-right: 0.5em;
        margin-top: 0.5em;
    }
    .removeBtn {
        margin-left: auto;
        margin-top: 0.5em;
        color: #de4343;
        cursor: pointer;
    }

}

.clear-button{
    margin-top: 3em;
    background: linear-gradient(rgb(189, 62, 83), rgb(201, 95, 95), rgb(189, 62, 83));
    width: 8.5em;
    height: 2em;
    line-height: 2em;
    border-radius: 5px;
    color: white;
    cursor: pointer;
}
</style>