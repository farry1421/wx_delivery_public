<template>
  <cube-upload
    action="" 
    :max="1"
    :simultaneous-upload="1" 
    @files-added="filesAdded" />
</template>

<script>
export default {
  methods: {
    filesAdded(files) {
      let hasIgnore = false
      const maxSize = 0.2*1024*1024 //1M
      for (let k in files) {
        const file = files[k]
        if (file.size > maxSize) {
          file.ignore = true
          hasIgnore = true
        }
      }
      hasIgnore && this.$createToast({
        type: 'warn',
        time: 1000,
        txt: '请勿上传超过0.2M的文件'
      }).show()
    }
  }
}
</script>

<style scoped>

</style>

<!--

  action : 上传的URL地址
  :simultaneous-uploads : 支持的并发上传个数
  @files-added : (事件)实现文件过滤,在事件方法里设置file.ignore=true实现过滤

-->
