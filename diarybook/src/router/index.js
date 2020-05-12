import Vue from 'vue'
import Router from 'vue-router'
import Page from '@/components/Page'
import NoteBook from '@/components/NoteBook'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'page',
      components: {
        page: Page,
        notebook: NoteBook
      }
    }
  ]
})
