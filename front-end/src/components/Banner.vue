<script setup lang="ts">
import { useUserStore, useTodoListStore } from '@/store/index';
import { useRouter } from 'vue-router';

const todoListStore = useTodoListStore();
const userStore = useUserStore();

const router = useRouter();

const logout = (async () => {
    if (!confirm("로그아웃 하시겠습니까?")){
        return
    }

    const result = await userStore.logout();
    
    if (result === true) {
        userStore.isLoggined = false;
        todoListStore.todoItems = [];
        alert("로그아웃 성공하였습니다.");
        router.push("/");
    } else {
        alert("다시 시도해 주세요");
    }

})

</script>


<template>
    <div class="banner-container">
        <div>
            <v-icon name="ri-calendar-todo-fill" class="v-icon"/>
            <h1>Todo Manager</h1>
        </div>
        <div class="body">
            <ul>
                <li>
                    <v-icon name="la-slack-hash" class="mark-icon"/>
                    <router-link to="/todolist">TodoList</router-link>
                </li>
                <li>
                    <v-icon name="la-slack-hash" class="mark-icon"/>
                    <router-link to="/calendar">Calendar</router-link>
                </li>
            </ul>
        </div>
        <div class="logout">
            <span @click="logout">Logout</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/reset.scss";
@import "@/assets/global.scss";

.banner-container {
    height: 100%;
    padding: 10em 1.5em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}
.v-icon {
    margin-left: 80%;
    transform: rotate(20deg);
}

.body {
    height: 50%;
    width: 80%;
    display: flex;
    flex-direction: column;
    font-size: 1.3em;
    color: rgb(77, 76, 76);

    li {
        display: flex;
        padding: 0.5em 0;
        border-bottom: 0.08em dashed rgb(148, 147, 147);

        .mark-icon{
            margin-right: 0.7em;
        }
    }
}

.logout {
    font-size: 1.2em;
    color: rgb(77, 76, 76);
    cursor: pointer;
}

</style>