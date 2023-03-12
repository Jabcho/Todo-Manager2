<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import { useTodoListStore, useUserStore } from '@/store/index';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const todoListStore = useTodoListStore();

const userId: Ref<string> = ref('');
const userPw = ref('');

const router = useRouter(); 

const loginSubmit = (async () => {
    if (userId.value.trim() == "") {
        alert("아이디를 입력하세요");
    } else if (userPw.value.trim() == '') {
        alert("비밀번호를 입력하세요")
    } else {
        const result = await userStore.login(userId.value, userPw.value)

        if (result === true) {
            todoListStore.getAllTodo();
            router.push("/todolist");
        } else {
            alert("로그인 정보를 다시 확인해주세요.")
        }
    }
})


</script>

<template>
    <div class="container">
        <h1>LOGIN</h1>
        <div id="login-container">
            <div id="login-input">
                <v-icon name="fa-user-alt" class="v-icon"/>
                <input v-model="userId" v-on:keyup.enter="loginSubmit" type="text" placeholder="ID">
            </div>
            <div id="login-input">
                <v-icon name="fa-lock" class="v-icon" />
                <input v-model="userPw" v-on:keyup.enter="loginSubmit" type="password" placeholder="password">
            </div>
        </div>
        <button @click="loginSubmit">Login</button>
        <router-link to="/signup" class="signupBtn">Sign up</router-link>
    </div>
    
</template>

<style lang="scss" scoped>
@import "@/assets/reset.scss";
@import "@/assets/global.scss";

#login-container {
    margin-bottom: 1.5em;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%
}

#login-input {
    @include inputbox;
    @include shadow;
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin-bottom: 0.7em;

    .v-icon {
        margin-top: 0.5em;
        margin-left: 0.8em;
        width: 0.9em;
    }
    input {
        width: calc(100% - 3em);
    }
}

button {
    width: 70%;
    background-color: rgb(68, 133, 189);
    color: white;
    border-radius: 5px;
    height: 2.5em;
}
.signupBtn {
    width: 70%;
    background-color: white;
    color: rgb(0, 0, 0);
    border-radius: 5px;
    height: 2.5em;
    line-height: 2.5em;
    margin-top: 0.7em;
    border-style: solid;
    border-width: 0.1px;
    border-color: rgb(225, 225, 216);
}

</style>