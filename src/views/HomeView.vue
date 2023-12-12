<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <h1 class="font-bold mb-10 text-4xl text-emerald-800">Rans Vue APP</h1>

    <div class="w-full flex justify-between max-w-md">
        <RouterLink to="/translate" class="px-7 py-12 bg-emerald-600 rounded-lg w-5/12 text-center shadow-xl text-white font-bold text-2xl transition hover:scale-110 hover:shadow-2xl duration-300">Translate</RouterLink>
        <RouterLink to="/calculator" class="px-7 py-12 bg-cyan-600 rounded-lg w-5/12 text-center shadow-xl text-white font-bold text-2xl transition hover:scale-110 hover:shadow-2xl duration-300">Calculator</RouterLink>
    </div>
</template>