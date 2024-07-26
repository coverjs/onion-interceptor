<script setup lang="ts">
import { http } from './api/http'
import { onMounted } from 'vue'

// const http = new XAxios()

onMounted(() => {
  http.get('/users').then((res) => {
    console.log(res)
  })
})
</script>

<template>
  <div>打开控制台查看 洋葱模型效果</div>
</template>
