<script setup lang="ts">
import { Http } from './api/http'
import { onMounted } from 'vue'

const http = new Http()

onMounted(() => {
  http.get({ url: '/users' }).then((res) => {
    console.log(res)
  })
})
</script>

<template>
  <div>打开控制台查看 洋葱模型效果</div>
</template>
