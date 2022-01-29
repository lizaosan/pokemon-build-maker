import { createApp } from 'vue'
import App from './App.vue'
import { createGtm } from '@gtm-support/vue-gtm';


createApp(App)
  .use(createGtm({
    id: 'GTM-PCWC6L9',
    debug: true,
    trackOnNextTick: false,
  }))
  .mount('#app')

