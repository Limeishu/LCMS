<template>
  <div>
    <div class="list-container file">
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
      <Loader v-if="onload"></Loader>
      <div class="files list" :class="file.type" v-for="(file , i) in files" :key="i" @click="file.type === 'directory' ? (files = file.contents, nowPath.push(file.name.replace(/&amp;/g, '&'))) : download(file.name.replace(/&amp;/g, '&'))">
        <p class="name"><font-awesome-icon :icon="file.type === 'directory' ? ['fas', 'folder'] : fileType(file.name.toLowerCase())" /><span>{{ file.name.replace(/&amp;/g, '&') }}</span></p>
        <p class="time">{{ file.time }}</p>
        <p class="size">{{ file.type === 'directory' ? '--' : humenSize(file.size) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { Loader } from '../components/layout'
  import config from '../../server/config.json'
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        files: [],
        fileList: [],
        nowPath: [],
        onload: true
      }
    },
    components: {
      Loader: Loader
    },
    mounted () {
      this.getFile()
    },
    methods: {
      ...mapActions(['getFiles', 'downloadFile']),
      async getFile () {
        this.onload = true
        this.fileList = await this.getFiles()
        this.files = this.fileList
        this.onload = false
      },
      async changeDir (target, index) {
        this.onload = true
        let path = this.nowPath.slice(0, index + 1)
        this.files = this.fileList
        path.forEach(ele => {
          this.files = this.files.filter(e => { return e.name === ele })[0].contents
        })
        this.onload = false
      },
      async download (file) {
        this.onload = true
        let url = `https://${config.fileServer.auth.username}:${encodeURI(config.fileServer.auth.password)}@nas.limeishu.org.tw/紀念館資料/${this.nowPath.join('/')}/${file}`
        const link = document.createElement('a')
        link.href = url.replace(/&amp;/g, '&')
        link.setAttribute('download', file)
        link.setAttribute('target', '_blank')
        document.body.appendChild(link)
        link.click()
        link.remove()
        this.onload = false
      },
      humenSize (size) {
        switch (parseInt(size.toString().length / 3)) {
          case 1:
            return `${(size / Math.pow(10, 3)).toFixed(2)} KB`
          case 2:
            return `${(size / Math.pow(10, 6)).toFixed(2)} MB`
          case 3:
            return `${(size / Math.pow(10, 9)).toFixed(2)} GB`
          case 4:
            return `${(size / Math.pow(10, 12)).toFixed(2)} TB`
          default:
            return `${size} B`
        }
      },
      fileType (filename) {
        switch (true) {
          case /\.(gif|jpg|jpeg|tiff|png|svg|tif|bmp)$/.test(filename):
            return ['fas', 'image']
          case /\.(mp4|mov|flv|mkv|avi|wmv|mts)$/.test(filename):
            return ['fas', 'video']
          case /\.(mp3|m4a|m4r|wav|vob|flac)$/.test(filename):
            return ['fas', 'music']
          case /\.(pptx|ppt|pptm|odp|pps|key)$/.test(filename):
            return ['fas', 'file-powerpoint']
          case /\.(docx|doc|gdoc|docm|pages)$/.test(filename):
            return ['fas', 'file-word']
          case /\.(xlsx|xls|gxls|xlsm|ods|odg|numbers|calc)$/.test(filename):
            return ['fas', 'file-excel']
          case /\.(zip|rar|7z|tar|gz|part|jz|za|xz)$/.test(filename):
            return ['fas', 'file-archive']
          case /\.(pdf|odt)$/.test(filename):
            return ['fas', 'file-pdf']
          case /\.(txt|)$/.test(filename):
            return ['fas', 'file-alt']
          case /\.(xml|csv)$/.test(filename):
            return ['fas', 'address-card']
          case /\.(iso|img|dmg|)$/.test(filename):
            return ['fas', 'dot-circle']
          case /\.(ipsw)$/.test(filename):
            return ['fas', 'mobile']
          case /\.(ai)$/.test(filename):
            return ['fas', 'paint-brush']
          case /\.(ipa)$/.test(filename):
            return ['fas', 'app-store-ios']
          case /\.(apk)$/.test(filename):
            return ['fas', 'android']
          case /\.(exe|msi|ini)$/.test(filename):
            return ['fab', 'windows']
          case /\.(js|ts|coffee|ejs|jade)$/.test(filename):
            return ['fab', 'js-square']
          case /\.(vue)$/.test(filename):
            return ['fab', 'vuejs']
          case /\.(java|jvm|jar)$/.test(filename):
            return ['fab', 'java']
          case /\.(php)$/.test(filename):
            return ['fas', 'php']
          case /\.(py)$/.test(filename):
            return ['fab', 'python']
          case /\.(html|htm|xhtml|shtml)$/.test(filename):
            return ['fab', 'html5']
          case /\.(css|scss|sass)$/.test(filename):
            return ['fab', 'css3-alt']
          case /\.(db|sql|odb|mdb|accdb|dbase)$/.test(filename):
            return ['fas', 'database']
          default:
            return ['fas', 'file']
        }
      }
    }
  }
</script>

<style scoped>

</style>