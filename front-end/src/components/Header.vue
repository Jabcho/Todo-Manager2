<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{ title: string }>();

</script>

<template>
    <header>
        <h1>{{ props.title }}</h1>
    </header>
</template>