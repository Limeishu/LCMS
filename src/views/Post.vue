<template>
  <div>
    <vue-editor class="editor"
      useCustomImageHandler
      @imageAdded="handleImageAdded"
      v-model="paragraph"></vue-editor>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    data () {
      return {
        paragraph: ''
      }
    },
    methods: {
      ...mapActions(['uploadFile']),
      async handleImageAdded (file, Editor, cursorLocation, resetUploader) {
        let formData = new FormData()
        formData.append('image', file)
        let url = await this.uploadFile(formData)
        Editor.insertEmbed(cursorLocation, 'image', url)
        resetUploader()
      }
    }
  }
</script>