<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/store/index';

const props = defineProps<{
    modelValue: string
    placeholder: string
    type: string
    isBlank: boolean
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', modelValue: string): void,
    (e: 'keyup.enter'): void,
    (e: 'click'): void
}>()

const inputValue = ref(props.modelValue);

const userStore = useUserStore();

const userIdCheck = (async() => {
    const result = await userStore.userIdCheck(inputValue.value);

    if (result === true) {
        userStore.usedId = true;
        alert("사용 가능한 아이디입니다.");
    } else {
        userStore.usedId = false;
        alert("이미 사용중인 아이디입니다.")
    }
})

</script>

<template>
    <div id="signup-container" :class="{'border-red': (isBlank === true)}">
        <input v-model="inputValue" :placeholder="props.placeholder" :type="props.type" @input="$emit('update:modelValue', inputValue)" @keyup.enter="$emit('keyup.enter')">
        <button v-if="props.placeholder==='ID'" @click="userIdCheck">중복확인</button>
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/reset.scss";
@import "@/assets/global.scss";

#signup-container {
    @include inputbox;
    width: 80%;
    padding-left: 1em;
    padding-right: 1em;
    margin-top: 1em;
    position: relative;

    input {
        width: 100%;
    }
    button {
        margin-top: 0.5em;
        height: 70%;
        width: 5em;
        line-height: 70%;
        font-size: 0.8em;
        border-style: solid;
        border-color: gray;
        border-width: 0.1px;
        border-radius: 5px;
        padding: 0.4em;
        background-color: rgb(245, 248, 249);
        position: absolute;
        z-index: 1;
        right: 1em;
        
        &:hover {
            background-color: aliceblue;
        }
    }

    &.border-red {
        border-style: solid;
        border-width: 1px;
        border-color: rgb(245, 111, 111);
    }

}
</style>