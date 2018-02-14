<template>
  <div class="editor-container paragraph">
    <div class="input-box">
      <input type="text" v-model="post.title" autocomplete="off" required>
      <span class="bar"></span>
      <label><span>標題</span></label>
    </div>
    <span :class="{ 'active': post.meta.image }">{{ img.length === 0 ? '先上傳圖片至內文編輯區' : '請選擇主要圖片' }}</span>
    <div class="img-list">
      <div class="image" :class="{ 'active': post.meta.image === url }" :style="{ 'background-image': `url(${url})` }" alt="" v-for="(url , i) in img" :key="i" @click="post.meta.image = url"></div>
    </div>
    <span>內文編輯區</span>
    <vue-editor class="editor"
      useCustomImageHandler
      @imageAdded="handleImageAdded"
      v-model="post.paragraph"></vue-editor>
      <div class="button" @click="send()"><span>送出</span></div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        post: {
          title: '',
          content: '',
          paragraph: '',
          meta: {
            image: ''
          }
        },
        img: []
      }
    },
    mounted () {
      this.getPost()
    },
    methods: {
      ...mapActions(['uploadFile', 'sendPost', 'getPostByID']),
      async getPost () {
        const res = await this.getPostByID(this.$route.params.pid)
        this.post = res.data
        this.img.push(res.data.meta.image)
      },
      async handleImageAdded (file, Editor, cursorLocation, resetUploader) {
        let formData = new FormData()
        formData.append('image', file)
        let url = await this.uploadFile(formData)
        setTimeout(() => {
          Editor.insertEmbed(cursorLocation, 'image', url)
          this.img.push(url)
        }, 1000)
        resetUploader()
      },
      async send () {
        this.post.content = document.querySelector('.ql-editor').innerText
        let res = await this.sendPost(this.post)
        window.open(`https://limeishu.org.tw/culture/post/${res.pid}`)
      }
    }
  }
</script>