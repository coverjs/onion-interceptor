import { defineConfig } from "vitepress";
import navigation from "./navigation.json";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "onion-interceptor",
  description: "通用网络请求拦截器工具",
  base: "/onion-interceptor/",
  head: [["link", { rel: "icon", href: "/onion-interceptor/onion.png" }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/onion.svg",
    sidebar: {
      "/src/README": [{ text: "使用指南", link: "/src/README" }],
      "/src/": navigation,
    },
    nav: [
      {
        text: "文档",
        items: [
          { text: "指南", link: "/src/README" },
          { text: "API", link: "/src/globals" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/coverjs/onion-interceptor" },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024-present EricWXY",
    },
  },
});
