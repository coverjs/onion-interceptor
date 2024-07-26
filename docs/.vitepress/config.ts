import { defineConfig } from 'vitepress'
import navigation from './navigation.json'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'onion-interceptor',
  description: '通用网络请求拦截器工具',
  base: '/onion-interceptor/',
  head: [['link', { rel: 'icon', href: '/onion-interceptor/logo.png' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',
    sidebar: {
      '/src/': navigation
    },
    nav: [{ text: 'Home', link: '/' }],

    socialLinks: [{ icon: 'github', link: 'https://github.com/coverjs/onion-interceptor' }]
  }
})
