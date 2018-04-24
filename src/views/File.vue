<template>
  <div>
    <div class="list-container">
      <div class="path-conatiner">
        <div class="path" @click="files = fileList, nowPath = []">
          <p><span>主目錄</span><font-awesome-icon icon="angle-right" /></p>
        </div>
        <div class="path" v-for="(path, i) in nowPath" :key="i" @click="changeDir(path, i), nowPath = nowPath.slice(0, i + 1)">
          <p><span>{{ path }}</span><font-awesome-icon icon="angle-right" /></p>
        </div>
      </div>
      <div class="list head">
        <div class="title">
          <p>名稱</p>
        </div>
        <div class="content">
          <p>上次更動時間</p>
        </div>
        <div class="content">
          <p>大小</p>
        </div>
      </div>
      <div class="files list" :class="file.type" v-for="(file , i) in files" :key="i" @click="file.type === 'directory' ? (files = file.contents, nowPath.push(file.name)) : download(file.name)">
        <p class="name"><font-awesome-icon :icon="file.type=== 'directory' ? ['fas', 'folder'] : ['fas', 'file']" /><span>{{ file.name }}</span></p>
        <p class="time">{{ file.time }}</p>
        <p class="size">{{ file.type === 'directory' ? '--' : file.size }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import config from '../../server/config.json'
  import { mapActions } from 'vuex'
  export default {
    // computed: {
    //   ...mapGetters(['files'])
    // },
    data () {
      return {
        files: [],
        fileList: [],
        nowPath: []
      }
    },
    mounted () {
      this.getFile()
    },
    methods: {
      ...mapActions(['getFiles', 'downloadFile']),
      async getFile () {
        this.fileList = await this.getFiles()
        this.files = this.fileList
      },
      async changeDir (target, index) {
        let path = this.nowPath.slice(0, index + 1)
        console.log(path)
        this.files = this.fileList
        path.forEach(ele => {
          this.files = this.files.filter(e => { return e.name === ele })[0].contents
        })
      },
      async download (file) {
        let url = `https://${config.fileServer.auth.username}:${encodeURI(config.fileServer.auth.password)}@nas.limeishu.org.tw/紀念館資料/${this.nowPath.join('/')}/${file}`
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', file)
        link.setAttribute('target', '_blank')
        document.body.appendChild(link)
        link.click()
      }
    }
  }
</script>

<style scoped>

</style>