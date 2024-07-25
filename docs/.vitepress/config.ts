import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "onion-interceptor",
  description: "通用网络请求拦截器工具",
  base: '/onion-interceptor/',
  head: [
    ['link', { rel: 'icon', href: '/onion-interceptor/logo.png' }]
  ], 
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
