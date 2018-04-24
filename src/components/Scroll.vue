<template>
  <!-- 监听pulling-down事件更新数据 -->
  <div class="scroll">
    <cube-scroll
      ref="scroll"  
      :data="items" 
      :options="options" 
      @pulling-down="onPullingDown" 
      @pulling-up="onPullingUp"  
      @click="enterPage">
    </cube-scroll>
  </div>
</template>

<script>
//基于better-scroll https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/options-advanced.html#scrollbar
export default {
  name: 'Scroll',
  data () {
    return { 
      toastTxt: "这是文字",
      items: [1,2,3,4,5,6,7,8,9,0,1,2,3,4],
      itemIndex: 5,
      options: {
        scrollbar: {
          fade: true
        },
        pullUpLoad: {
          threshold: 0,
          txt: {
            more: 'Load more',
            noMore: 'No more data'
          }
        },
        //下拉刷新，通过配置项pullDownRefresh开启pulling-down事件派发和下拉动画
        pullDownRefresh: { 
          threshold: 90,
          stop: 40,
          txt: 'Refresh success'
        }
      }
    }
  },
  methods: {
    onPullingUp () {
      setTimeout(() => {
         if (Math.random() > 0.5) {
          let newPage = [
            'I am line ' + ++this.itemIndex,
            'I am line ' + ++this.itemIndex,
            'I am line ' + ++this.itemIndex,
            'I am line ' + ++this.itemIndex,
            'I am line ' + ++this.itemIndex
          ]
          this.items = this.items.concat(newPage)
        } else {
          this.$refs.scroll.forceUpdate()
        }
      }, 1000)
    },
    //下拉刷新
    onPullingDown () { 
      //模拟更新数据
      setTimeout(() => {
        if (Math.random() > 0.5) {
          //有新数据
          this.items.unshift('I am new data: ' + +new Date())
        } else {
          //如果请求结果是没有新数据，也就是数据与之前一模一样没有变化，则必须用下面这句话结束此次下拉刷新，这样Scroll组件才会开始监听下一次下拉刷新操作。
          this.$refs.scroll.forceUpdate()
        }
      }, 1000)
    },
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
.cube-scroll-wrapper {
  height: 100vh;
}
</style>
