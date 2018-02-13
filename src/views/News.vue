<template>
  <div class="editor-container paragraph">
    <div class="input-box">
      <input type="text" v-model="news.title" autocomplete="off" required>
      <span class="bar"></span>
      <label><span>標題</span></label>
    </div>
    <span :class="{ 'active': news.meta.image }">{{ img.length === 0 ? '先上傳圖片至內文編輯區' : '請選擇主要圖片' }}</span>
    <div class="img-list">
      <div class="image" :class="{ 'active': news.meta.image === url }" :style="{ 'background-image': `url(${url})` }" alt="" v-for="(url , i) in img" :key="i" @click="news.meta.image = url"></div>
    </div>
    <span>內文編輯區</span>
    <vue-editor class="editor"
      useCustomImageHandler
      @imageAdded="handleImageAdded"
      v-model="news.paragraph"></vue-editor>
      <div class="button" @click="send()"><span>送出</span></div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        news: {
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
    methods: {
      ...mapActions(['uploadFile', 'sendNews']),
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
        this.news.content = document.querySelector('.ql-editor').innerText
        this.sendNews(this.news)
      }
    }
  }
</script>