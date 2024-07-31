<script setup lang="ts">
// import { http, fetchReq } from "./api/http";
import { createFetchInterceptor } from "onion-interceptor";
import { interceptors } from "./interceptor";
import { onMounted } from "vue";

createFetchInterceptor(...interceptors);

onMounted(() => {
  // http.get("/users").then((res) => {
  //   console.log(res);
  // });
  // fetchReq.request("/users").then((res) => {
  //   console.log(res);
  // });
  fetch("https://jsonplaceholder.typicode.com/users", {
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    console.log(res);
  });
});
</script>

<template>
  <div>打开控制台查看 洋葱模型效果</div>
</template>
