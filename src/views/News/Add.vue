<template>
  <div>
    <div class="editor-container paragraph">
      <div class="input-box">
        <input type="text" v-model="news.title" autocomplete="off" required>
        <span class="bar"></span>
        <label>
          <span>標題</span>
        </label>
      </div>
      <span v-if="!videoAsPreview" :class="{ 'active': news.meta.image }">{{ img.length === 0 ? '先上傳圖片至內文編輯區' : '請選擇主要圖片' }}</span>
      <div v-if="!videoAsPreview" class="img-list">
        <div class="image" :class="{ 'active': news.meta.image === url }" :style="{ 'background-image': `url(${url})` }" alt="" v-for="(url , i) in img"
          :key="i" @click="news.meta.image = url"></div>
      </div>
      <div v-if="!videoAsPreview" class="input-box">
        <input type="text" v-model="news.meta.imageAlt" autocomplete="off" required>
        <span class="bar"></span>
        <label>
          <span>圖片說明</span>
        </label>
      </div>
      <div class="input-box" v-if="videoAsPreview">
        <input type="text" v-model="news.meta.video" autocomplete="off" required>
        <span class="bar"></span>
        <label>
          <span>影片連結</span>
        </label>
      </div>
      <div class="switch-box">
        <p>以圖片作為文章預覽</p>
        <label class="switch">
          <input type="checkbox" v-model="videoAsPreview">
          <div class="slider round"></div>
        </label>
        <p>以影片作為文章預覽</p>
      </div>
      <div>
        <vue-datepicker :singleDateSelection="true" :i18n="i18n" v-model="chooseDate" />
      </div>
      <span>內文編輯區</span>
      <vue-editor class="editor" useCustomImageHandler :editorToolbar="customToolbar" @imageAdded="handleImageAdded" v-model="news.paragraph"></vue-editor>
      <div class="button" @click="news.permission = 0, send()" v-if="user.permission === 1">
        <span>發佈</span>
      </div>
      <div class="button" @click="news.permission = -1, send()">
        <span>儲存為草稿</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    data () {
      return {
        customToolbar: [
          [{'header': [false, 1, 2, 3]}],
          ['bold', 'italic', 'underline'],
          [{'list': 'ordered'}, {'list': 'bullet'}],
          ['link', 'image', 'video'],
          ['clean']
        ],
        videoAsPreview: false,
        news: {
          title: '',
          content: '',
          paragraph: '',
          permission: -1,
          meta: {
            image: '',
            video: '',
            imageAlt: ''
          },
          date: ''
        },
        img: [],
        chooseDate: {},
        i18n: {
          'day-names': [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
          'start-date': 'Start Date',
          'end-date': 'End Date',
          'choose-date': '選擇活動結束日期',
          'month-names': [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
        }
      }
    },
    computed: {
      ...mapGetters({ user: 'userInfo' })
    },
    methods: {
      ...mapActions(['uploadFile', 'sendNews']),
      async handleImageAdded (file, Editor, cursorLocation, resetUploader) {
        let formData = new FormData()
        formData.append('image', file)
        formData.append('uid', this.user.uid)
        let url = await this.uploadFile(formData)
        setTimeout(() => {
          Editor.insertEmbed(cursorLocation, 'image', url)
          this.img.push(url)
        }, 1000)
        resetUploader()
      },
      async send () {
        this.news.date = this.chooseDate.start
        this.news.content = document.querySelector('.ql-editor').innerText
        this.news.uid = this.user.uid
        let res = await this.sendNews(this.news)
        window.open(`https://limeishu.org.tw/culture/news/${res.nid}`)
        this.$router.go(-1)
      },
      addIdTag2SubTitle () {
        const subTitle = Array.from(document.querySelectorAll('.ql-editor>h2'))
        subTitle.forEach(ele => (ele.id = ele.innerText))
      }
    },
    watch: {
      'news.paragraph': function () {
        this.addIdTag2SubTitle()
      }
    }
  }
</script>