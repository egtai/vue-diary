<template>
      <div class="home">
          <NoteBook @change-page="changePage" @new-page="newPage" :pages="pages" :activePage="index" />
          <Page @save-page="savePage" @delete-page="deletePage" :page="pages[index]" />
      </div>
</template>

<script>
import NoteBook from '@/components/NoteBook'
import Page from '@/components/Page'
import * as firebase from 'firebase/app'
// import Firebase from 'firebase/app'
// import 'firebase/<PACKAGE>'
// 调用initializeAp方法，并传入我们的配置信息
// database()在firbase实例上调用方法以取回firbase数据库实例
// 调用ref()获取对根的引用

// firebase init goes here
const firebaseConfig = {
  apiKey: 'apiKey',
  authDomain: 'authDomain',
  databaseURL: 'https://notebook-ac4b8.firebaseio.com/',
  projectId: 'projectId',
  storageBucket: 'storageBucket',
  messagingSenderId: 'messagingSenderId'
}
const database = firebase.initializeApp(firebaseConfig)
export default {
  name: 'Home',
  components: {
    NoteBook,
    Page
  },
  data: () => ({
    pages: [],
    index: 0
  }),
  mounted () {
    // 读取数据库一次，传入value值，数据库返回所有的页面
    database.once('value', (pages) => {
      pages.forEach((page) => {
        this.pages.push({
          ref: page.ref,
          title: page.child('title').val(),
          content: page.child('content').val()
        })
      })
    })
  },
  methods: {
    newPage () {
      this.pages.push({
        title: '',
        content: ''
      })
      this.index = this.pages.length - 1
    },
    changePage (index) {
      this.index = index
    },
    savePage () {
      let page = this.pages[this.index]
      if (page.ref) {
        this.updateExistingPage(page)
      } else {
        this.inserNewPage(page)
      }
    },
    updateExistingPage (page) {
      page.ref.set({
        title: page.title,
        content: page.content
      })
    },
    insertNewPage (page) {
      page.ref = database.push(page)
    },
    deletePage () {
      // 获取页面的引用，告诉firebase我们要移除数据库中的那一条数据
      let ref = this.pages[this.index].ref
      ref && ref.remove()
      this.pages.splice(this.index, 1)
      this.index = Math.max(this.index - 1, 0)
    }
  }
}
</script>

<style scoped lang="stylus">
.home
 font-family: 'Avenir', Helvetica, Arial, sans-serif;
 display: flex;
</style>
