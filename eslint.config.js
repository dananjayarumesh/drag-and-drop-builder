import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginVitest from '@vitest/eslint-plugin'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
    rules: {
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'indent': ['error', 2],
      'no-multi-spaces': ['error'],
      'brace-style': ['error', '1tbs'],

      'no-unused-vars': ['error'],
      'eqeqeq': ['error', 'always'],
      'no-debugger': 'error',
      'curly': ['error', 'all'],
      'no-undef': 'error',
      'consistent-return': 'error',

      'vue/no-unused-vars': 'error',
      'vue/require-default-prop': 'error',
    }
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },
  skipFormatting,
]
