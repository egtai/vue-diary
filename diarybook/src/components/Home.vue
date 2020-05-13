<template>
      <div class="home">
          <NoteBook @change-page="changePage" @new-page="newPage" :pages="pages" :activePage="index" />
          <Page @save-page="savePage" @delete-page="deletePage" :page="pages[index]" />
      </div>
</template>

<script>
import NoteBook from '@/components/NoteBook'
import Page from '@/components/Page'
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
      // nothing as of yet
    },
    deletePage () {
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
