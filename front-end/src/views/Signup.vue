<script setup lang="ts">
import SignupInput from '@/components/SignupInput.vue';
import { ref } from 'vue';
import { useSignupStore, useUserStore } from '@/store';
import { useRouter } from 'vue-router';


const signupStore = useSignupStore();
const userStore = useUserStore();

const router = useRouter();

const userName = ref('');
const userId = ref('');
const userPw = ref('');
const userPwCheck = ref('');
const userEmail = ref('');
const userNameBlank = ref(false);
const userIdBlank = ref(false);
const userPwBlank = ref(false);
const userPwCheckBlank = ref(false);
const userEmailBlank = ref(false);
const isBlank = ref(false);

const pwCheckErr = ref(false);

const blankCheck = () => {
    if (userName.value.length == 0) {
        userNameBlank.value = true;
        isBlank.value = true;
    } 
    if (userId.value.length == 0) {
        userIdBlank.value = true;
        isBlank.value = true;
    } 
    if (userPw.value.length == 0) {
        userPwBlank.value = true;
        isBlank.value = true;
    } 
    if (userPwCheck.value.length == 0) {
        userPwCheckBlank.value = true;
        isBlank.value = true;
    } 
    if (userPw.value != userPwCheck.value) {
        pwCheckErr.value = true;
        userPwCheckBlank.value = true;
        isBlank.value = true;
    }
    if (userEmail.value.length == 0) {
        userEmailBlank.value = true;
        isBlank.value = true;
    }
    return isBlank.value;
}

const signUp = (async() => {
    if (blankCheck()) {
        return;
    }
    if (userStore.usedId === false) {
        alert('아이디 중복여부를 확인해주세요');
        return;
    }

    const result = await signupStore.signUp(userName.value, userId.value, userPw.value, userEmail.value)

    if (result === true) {
        router.push({
         path: "/auth",
         query: { email: userEmail.value }   
        });
        return;
    } else {
        alert("다시 시도해 주세요");
    }
})

</script>

<template>
    <div class="container">
        <h1>SIGNUP</h1>
        <SignupInput v-model="userName" placeholder="이름" type="string" v-on:keyup.enter="signUp" :isBlank="userNameBlank"></SignupInput>
        <SignupInput v-model="userId" placeholder="ID" type="string" v-on:keyup.enter="signUp" :isBlank="userIdBlank"></SignupInput>
        <SignupInput v-model="userPw" placeholder="비밀번호" type="password" v-on:keyup.enter="signUp" :isBlank="userPwBlank"></SignupInput>
        <SignupInput v-model="userPwCheck" placeholder="비밀번호 확인" type="password" v-on:keyup.enter="signUp" :isBlank="userPwCheckBlank"></SignupInput>
        <div v-if="pwCheckErr" class="pwCheck">비밀번호가 일치하지 않습니다</div>
        <SignupInput v-model="userEmail" placeholder="E-mail" type="string" v-on:keyup.enter="signUp" :isBlank="userEmailBlank"></SignupInput>
        <button @click="signUp">Sign Up</button>
    </div>

</template>

<style lang="scss" scoped>
@import "@/assets/reset.scss";
@import "@/assets/global.scss";

.pwCheck {
    width: 70%;
    color: rgb(245, 111, 111);
    font-size: 0.5em;
    text-align: left;
    margin-top: 0.5em;
    padding-left: 1em;
}

button {
    width: 70%;
    background-color: rgb(68, 133, 189);
    color: white;
    border-radius: 5px;
    height: 2.5em;
    margin-top: 1.5em;
}

</style>