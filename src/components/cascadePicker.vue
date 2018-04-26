<template>
  <cube-button @click="showCityPicker">City Picker</cube-button>
</template>

<script>
import { provinceList, cityList, areaList } from '../assets/area'
const cityData = provinceList
cityData.forEach(province => {
  province.children = cityList[province.value]
  province.children.forEach(city => {
    city.children = areaList[city.value]
  })
})
export default {
  mounted () {
    this.cityPicker = this.$createCascadePicker({
      title: 'City Picker',
      data: cityData,
      onSelect: (selectedVal, selectedIndex, selectedText) => {
        this.$createDialog({
          type: 'warn',
          content: `Selected Item: <br/> - value: ${selectedVal.join(', ')} <br/>
            - index: ${selectedIndex.join(', ')} <br/> - text: ${selectedText.join(' ')}`,
          icon: 'cubeic-alert'
        }).show()
      },
      onCancel: () => {
        this.$createToast({
          type: 'correct',
          txt: 'Picker canceled',
          time: 1000
        }).show()
      }
    })
  },
  methods: {
    showCityPicker() {
      this.cityPicker.show()
    }
  }
}
</script>

<style scoped>

</style>


