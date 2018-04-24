<template>
  <header>
    <h1 class="title">{{ title }}</h1>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return { 
      title: '首页'
    }
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  width: 100vw;
  height: 5vh;
  border-bottom: 1px solid #eee;
}
.title {
  text-align: center;
}
</style>
