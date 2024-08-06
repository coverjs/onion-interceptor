<script setup lang="ts">
import { http } from "./api/http";

function callapi() {
  http.get("/userss").then((res) => {
    console.log(res);
  });
}
</script>

<template>
  <button @click="callapi" style="margin-bottom: 20px">click me</button>
  <div>打开控制台查看 洋葱模型效果</div>
</template>
