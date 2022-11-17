// import { router } from './router/index.js'
import { myRouter } from './router/routes.js'
import appHeader from './cmps/app-header.cmp.js'
import userMsg from './cmps/user-msg.cmp.js'
import bugList from './cmps/bug-list.cmp.js'

const options = {
  el: '#app',
  router: myRouter,
  template: `
  <section>
    <app-header />
      <user-msg />
      <router-view />
    </section>
    `,
 myRouter,
  components: {
    appHeader,
    userMsg,
    bugList,
  },
}

const app = Vue.createApp(options)
// app.use(router)
app.use(myRouter)
app.mount('#app')
