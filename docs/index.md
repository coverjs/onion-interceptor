---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "onion-interceptor"
  text: "洋葱拦截器"
  tagline: 通用网络请求拦截器工具
  image: 
    src: /onion.svg
    alt: Coverjs Logo
  actions:
    - theme: brand
      text: 快速开始
      link: /src/README
features:
  - icon: 🧅
    title: 灵活的洋葱模型中间件
    details: 洋葱拦截器采用洋葱模型设计，允许您轻松实现请求和响应的拦截处理。开发者可以定义多个中间件，它们将按照特定的顺序执行，每个中间件都能够访问和修改请求或响应对象，提供高度的可定制性。

  - icon: 🔌
    title: 强大的拦截能力
    details: 不论是 Axios 还是 Fetch，洋葱拦截器都能够提供一致的拦截体验。您可以在请求发送前进行身份验证、修改请求头或参数，也可以在响应返回后处理错误、修改返回数据等，确保了网络请求的灵活性和健壮性。

  - icon: 🛠️
    title: 易于集成和扩展
    details: 洋葱拦截器设计简洁，易于与现有项目集成。同时，它的扩展性允许开发者根据项目需求添加自定义的中间件，无论是日志记录、性能监控还是请求重试机制，都能够轻松实现，满足不同场景下的开发需求。
---

