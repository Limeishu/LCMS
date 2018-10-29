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
      <div class="list" v-for="(item, i) in post.data" :key="i">
        <div class="title">
          <span class="tag" v-if="item.permission === -1">草稿</span>
          <p>{{ item.title }}</p>
        </div>
        <div class="content">
          <p>{{ `${item.content.substring(0, 50)}...` }}</p>
        </div>
        <div class="action">
          <p @click="$router.push(`post/edit/${item._id}`)">
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
      ...mapGetters(['post']),
      ...mapGetters({ user: 'userInfo' })
    },
    mounted () {
      this.getAllPost()
    },
    methods: {
      ...mapActions(['getAllPost', 'deletePost', 'setMessage']),
      async deleteAction (pid) {
        if (confirm('確定要刪除這篇文章？此動作不可回復')) {
          let success = await this.deletePost({uid: this.user.uid, pid})
          if (success) {
            this.getAllPost()
          } else {
            this.setMessage({ title: '操作失敗，請洽系統管理員', status: 'error' })
          }
        }
      },
      openView (pid) {
        window.open(`https://limeishu.org.tw/culture/post/${pid}`)
      }
    }
  }
</script>
