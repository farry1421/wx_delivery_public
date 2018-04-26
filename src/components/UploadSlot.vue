<template>
  <cube-upload
    ref="upload"
    v-model="files"
    :action="action"
    @files-added="addedHandler"  
    @file-error="errHandler">
    <div class="clear-fix">
      <cube-upload-file v-for="(file, i) in files" :file="file" :key="i"></cube-upload-file>
      <cube-upload-btn :multiple="false">
        <div>
          <i> + </i>
          <p>Please click to upload ID card</p>
        </div>
      </cube-upload-btn>
    </div>
  </cube-upload>
</template>

<script>
export default {
  data() {
    return {
      action: '',
      files: []
    }
  },
  methods: {
    addedHandler() {
      const file = this.files[0]
      file && this.$refs.upload.removeFile(file)
    },
    errHandler(file) {
      // const msg = file.response.message
      this.$createToast({
        type: 'warn',
        txt: 'Upload fail',
        time: 1000
      }).show()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.cube-upload
  .cube-upload-file, .cube-upload-btn
    margin: 0
    height: 200px
  .cube-upload-file
    margin: 0
    + .cube-upload-btn
      margin-top: -200px
      opacity: 0
  .cube-upload-file-def
    width: 100%
    height: 100%
    .cubeic-wrong
      display: none
  .cube-upload-btn
    display: flex
    align-items: center
    justify-content: center
    > div
      text-align: center
    i
      display: inline-flex
      align-items: center
      justify-content: center
      width: 50px
      height: 50px
      margin-bottom: 20px
      font-size: 32px
      line-height: 1
      font-style: normal
      color: #fff
      background-color: #333
      border-radius: 50%
</style>


