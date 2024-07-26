// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'

export default {
  ...DefaultTheme,
  async enhanceApp() {
    if (!import.meta.env.SSR) {
      const { loadOml2d } = await import('oh-my-live2d')
      loadOml2d({
        models: [
          {
            path: 'https://model.oml2d.com/cat-black/model.json',
            scale: 0.15,
            position: [0, 20],
            stageStyle: {
              height: 350
            }
          }
        ]
      })
    }
  }
}
