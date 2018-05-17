<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1>
    <h2>Essential Links</h2> -->
    <!-- <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul> -->
    <div id="main">
      <div @click="showQrcode">
        <img src="../assets/qrcode.png"/>
        <span>码上寄</span>
      </div>
      <div @click="showCertify">
        <img src="../assets/user.png"/>
        <span>实名制</span>
      </div>
    </div>
    <!-- <cube-button @click="showQrcode">码上寄</cube-button> 
    <cube-button @click="showCertify">实名</cube-button> -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      toastTxt: 'cube toast content'
    }
  },
  methods: {
    showQrcode () {
      this.$router.push({ path: 'qrcode' })
    },
    showCertify () {
      this.$router.push({ path: 'certify' })
      // this.$createToast({
      //   txt: this.toastTxt
      // }).show()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#main {
  width: 100%;
  display: flex;
  text-align: center;
}
#main div {
  flex: 1;
  height: 40vw;
  border: 1px solid #efefef;
  margin: 15px;
  border-radius: 5px;
} 
#main img {
  width: 16vw;
  height: 16vw;
  margin: 6vw auto; 
}
#main span {
  display: block;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
}
</style>
