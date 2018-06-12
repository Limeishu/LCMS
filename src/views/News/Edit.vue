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
      <span :class="{ 'active': news.meta.image }">{{ img.length === 0 ? '先上傳圖片至內文編輯區' : '請選擇主要圖片' }}</span>
      <div class="img-list">
        <div class="image" :class="{ 'active': news.meta.image === url }" :style="{ 'background-image': `url(${url})` }" alt="" v-for="(url , i) in img"
          :key="i" @click="news.meta.image = url"></div>
      </div>
      <div>
        <vue-datepicker :singleDateSelection="true" :i18n="i18n" v-model="chooseDate" />
      </div>
      <span>內文編輯區</span>
      <vue-editor class="editor" useCustomImageHandler @imageAdded="handleImageAdded" v-model="news.paragraph"></vue-editor>
      <div class="button" @click="news.permission = 0, update()">
        <span>發佈</span>
      </div>
      <div class="button" @click="news.permission = -1, update()">
        <span>封存為草稿</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    data () {
      return {
        news: {
          title: '',
          content: '',
          paragraph: '',
          permission: -1,
          meta: {
            image: ''
          },
          date: ''
        },
        img: [],
        chooseDate: {
          start: ''
        },
        i18n: {
          'day-names': [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
          'start-date': 'Start Date',
          'end-date': 'End Date',
          'choose-date': '改變活動結束日期',
          'month-names': [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
        }
      }
    },
    mounted () {
      this.getNews()
    },
    computed: {
      ...mapGetters({ user: 'userInfo' })
    },
    methods: {
      ...mapActions(['uploadFile', 'updateNews', 'getNewsByID']),
      async getNews () {
        const res = await this.getNewsByID(this.$route.params.nid)
        this.news = res.data
        this.chooseDate.start = new Date(this.news.date)
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
      async update () {
        this.news.date = this.chooseDate.start
        this.news.content = document.querySelector('.ql-editor').innerText
        this.news.uid = this.user.uid
        let res = await this.updateNews({news: this.news, nid: this.$route.params.nid})
        window.open(`https://limeishu.org.tw/culture/news/${res.nid}`)
        this.$router.go(-1)
      }
    }
  }
</script>