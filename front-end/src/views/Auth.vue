<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSignupStore } from '@/store';

const route = useRoute();
const router = useRouter();

const signupStore = useSignupStore();

const email = ref(String(route.query.email));
const authCode = ref();

const auth = (async () => {
    console.log("fkffk")
    console.log(authCode)
    if (authCode === null) {
        alert('인증번호를 입력해 주세요');
        return;
    }

    const result = await signupStore.auth(email.value, authCode.value);

    if (result === 401) {
        alert("인증시간이 만료되었습니다");
        router.push("/signup");
    } else if (result === true) {
        alert("회원가입이 완료되었습니다");
        router.push("/");
    } else {
        alert("인증번호를 다시 확인해 주세요");
        return;
    }

})

</script>

<template>
    <div class="container">
        <h1>이메일 인증</h1>
        {{ email }}
        <p>인증번호를 입력해 주세요</p>
        <div class="auth-container">
            <input v-model="authCode" v-on:keyup.enter="auth" type="text">
            <button @click="auth">Send</button>
        </div>

    </div>

</template>

<style lang="scss" scoped>
@import "@/assets/reset.scss";
@import "@/assets/global.scss";

.auth-container {
    margin-top: 2em;
    
    input{
        @include inputbox;
        border-style: solid;
        border-color: gray;
        border-width: 0.1px;
        margin-right: 0.5em;
    }

    button {
        border-style: solid;
        border-color: gray;
        border-width: 0.1px;
        border-radius: 25px;
        padding: 0.4em;
        background-color: rgb(245, 248, 249);
        
        &:hover {
            background-color: aliceblue;
        }
    }
}

</style>