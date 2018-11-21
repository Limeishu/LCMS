<template>
  <div>
    <div class="list-container">
      <div class="list head">
        <div class="title">
          <p>標題</p>
        </div>
        <div class="content">
          <p>內容預覽</p>
        </div>
        <div class="action">
          <p>編輯</p>
          <p>查看</p>
          <p>刪除</p>
        </div>
      </div>
      <div class="list" v-for="(item, i) in news.data" :key="i">
        <div class="title">
          <span class="tag" v-if="item.permission === -1">草稿</span>
          <p>{{ item.title }}</p>
        </div>
        <div class="content">
          <p>{{ `${item.content.substring(0, 50)}...` }}</p>
        </div>
        <div class="action">
          <p @click="$router.push(`news/edit/${item._id}`)">
            <font-awesome-icon icon="edit" />
          </p>
          <p @click="openView(item._id)">
            <font-awesome-icon icon="eye" />
          </p>
          <p @click="deleteAction(item._id)">
            <font-awesome-icon icon="minus-circle" />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['news']),
      ...mapGetters({ user: 'userInfo' })
    },
    mounted () {
      this.getAllNews()
    },
    methods: {
      ...mapActions(['getAllNews', 'deleteNews', 'setMessage']),
      async deleteAction (nid) {
        if (confirm('確定要刪除這篇文章？此動作不可回復')) {
          let success = await this.deleteNews({uid: this.user.uid, nid})
          if (success) {
            this.getAllNews()
          } else {
            this.setMessage({ title: '操作失敗，你沒有權限進行此操作', status: 'error' })
          }
        }
      },
      openView (nid) {
        window.open(`https://limeishu.org.tw/culture/news/${nid}`)
      }
    }
  }
</script>
