import globals from 'globals'
import pluginJs from '@eslint/js'

export default [
  pluginJs.configs.recommended,
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/coverage/**', '**/.vitepress/cache/**']
  }
]
