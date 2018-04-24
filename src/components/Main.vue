<template>
  <div class="hello">
    <Block blockTitle="个人中心" blockSrc="/src/assets/icon.png" />
    <Block blockTitle="个人中心2" blockSrc="/src/assets/logo.png" />
    <Block blockTitle="个人中心3" blockSrc="/src/assets/icon.png" />
    <Block blockTitle="个人中心4" blockSrc="/src/assets/logo.png" />
    <Block blockTitle="个人中心5" blockSrc="/src/assets/icon.png" />
    <!-- <h1>{{ msg }}</h1> -->
    <!-- <cube-button @click="showToast">show toast</cube-button> -->
  </div>
</template>

<script>
import Block from '@/components/Block'
export default {
  name: 'Main',
  data () {
    return {

    }
  },
  components: {
    Block
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
