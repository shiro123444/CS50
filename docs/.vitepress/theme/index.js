import DefaultTheme from 'vitepress/theme'
import Giscus from './components/Giscus.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Giscus', Giscus)
  }
}
