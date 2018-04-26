<template>
  <cube-upload 
    ref="upload" 
    :action="action"
    :simultaneous-uploads="1" 
    @file-submitted="fileSubmitted" />
</template>

<script>
export default {
  data() {
    return {
      action: {
        target: '',
        prop: 'base64Value'
      }
    }
  },
  methods: {
    fileSubmitted(file) {
      file.base64Value = file.file.base64
    }
  }
}
</script>

<style scoped>

</style>

<!--

  action.target : 上传的URL地址
  action.prop : 采用处理后的file对象的哪个属性所对应的值上传,这里设置的就是base64Value的值
  :process-file : (函数)处理原生文件。调用next回调的话,参数是处理完的文件对象,这里示例的就是调用compress做压缩,处理完后会回调next
  @file-submitted : (事件)每个文件处理完后添加到upload实例的files数组中后触发,参数就是一个处理后的文件对象

-->