<template>
  <div class="block" @click="enterPage">
    <img class="logo" :src="blockSrc" alt="">
    <span class="title">{{ blockTitle }}</span>
    <span>gitlab</span>
    <span>github</span>
    <span>5</span>
  </div>
</template>

<script>
export default {
  name: 'Block',
  data () {
    return { 
      
    }
  },
  props: ['blockTitle','blockSrc'],
  methods: {
    enterPage () {
      this.$createToast({
        txt: this.toastTxt
      }).show()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.block {
  text-align: center;
  width: 25vw;
  float: left;
}
.logo {
  display: block;
  width: 60%;
  margin: 20% auto 0;
}
.title {
  font-size: 18px;
}
</style>
