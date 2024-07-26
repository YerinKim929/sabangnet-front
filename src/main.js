import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { registerPlugins } from '@/plugins'

const app = createApp(App);

registerPlugins(app);

app.use(router);

app.mount('#app');
