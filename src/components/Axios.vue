<template>
  <cube-form class="cube-form_groups"
    :model="model" 
    @validate="validateHandler" 
    @submit="submitHandler">
    <cube-form-group legend="寄件人">
      <!--寄件人sender联系电话-->
      <cube-form-item :field="fields[0]"></cube-form-item>
    </cube-form-group>
    <cube-form-group legend="收件人">
      <!--收件人receiver姓名-->
      <cube-form-item :field="fields[1]"></cube-form-item>
      <!--收件人联系电话-->
      <cube-form-item :field="fields[2]"></cube-form-item>
      <!--收件人地区-->
      <cube-form-item :field="fields[3]"></cube-form-item>
      <!--收件人详细地址-->
      <cube-form-item :field="fields[4]"></cube-form-item>
    </cube-form-group>
    <cube-form-group>
      <cube-button type="submit">生成二维码</cube-button>
    </cube-form-group>
  </cube-form>
</template>

<script>
// province, city, area
// select component
import { provinceList, cityList, areaList } from '../assets/area'
import vueqr from 'vue-qr'
const cityData = provinceList
cityData.forEach(province => {
  province.children = cityList[province.value]
  province.children.forEach(city => {
    city.children = areaList[city.value]
  })
})
const PCA = {
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      selected: []
    }
  },
  render(createElement) {
    return createElement('cube-button', {
      on: {
        click: this.showPicker
      }
    }, this.selected.length ? this.selected.join(' ') : '选择地区')
  },
  mounted() {
    this.picker = this.$createCascadePicker({
      title: '地区',
      data: cityData,
      selectedIndex: this.value,
      onSelect: this.selectHandler
    })
  },
  methods: {
    showPicker() {
      this.picker.show()
    },
    selectHandler(selectedVal, selectedIndex, selectedTxt) {
      this.selected = selectedTxt
      this.$emit('input', selectedVal)
    }
  }
}
export default {
  data() {
    return {
      validity: {},
      valid: undefined,
      imgText: 'hello world!',
      model: {
        senderPhone: '',
        receiverName: '',
        receiverPhone: '',
        receiverPCA: [],
        receiverAddress: ''
      },
      fields: [
        {
          type: 'input',
          modelKey: 'senderPhone',
          label: '联系电话',
          props: {
            placeholder: '请填写联系电话'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'receiverName',
          label: '姓名',
          props: {
            placeholder: '请填写姓名'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'receiverPhone',
          label: '联系电话',
          props: {
            placeholder: '请填写联系电话'
          },
          rules: {
            required: true
          }
        },
        {
          component: PCA,
          modelKey: 'receiverPCA',
          label: '地区',
          rules: {
            required: true
          },
          messages: {
            required: '请选择'
          }
        },
        {
          type: 'textarea',
          modelKey: 'receiverAddress',
          label: '详细地址',
          props: {
            placeholder: '请填写详细地址'
          },
          rules: {
            required: true
          },
          // debounce validate
          // if set to true, the default debounce time will be 200(ms)
          debounce: 100
        }
      ]
    }
  },
  methods: {
    submitHandler(e, model) {
      console.log('submit')
      console.log(model)
      
      this.$createDialog({
        type: 'alert',
        confirmBtn: {
          text: '返回',
          active: true
        }
      }, (createElement) => {
        return [
          createElement('div', {
            'class': {
              'my-title': true
            },
            slot: 'title'
          }, [
            createElement(vueqr, {
              'class': {
                'my-title-img': true
              },
              attrs: {
                text: this.imgText
              }
            })
            // createElement('p', '寄件二维码')
          ])

          // createElement('p', {
          //   'class': {
          //     'my-content': true
          //   },
          //   slot: 'content'
          // }, '价格仍按快车计算')
        ]
      }).show()
      this.$http.get('/user?ID=12345')
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
			e.preventDefault()
    },
    validateHandler(result) {
      console.log('validate')
			console.log(result)
      this.validity = result.validity //obj
			this.valid = result.valid //true
			//invalid false
			//dirty true 表单处于dirty状态,也就意味着数据源发生了变化
			//firstInvalidFieldIndex -1 第一个校验不合法的字段索引值
			//先validate再submit,如果validate不通过就不会进入submit
    }
  },
  components: {
    vueqr
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cube-form-item
    .cube-btn
      padding-left: 0
      padding-right: 0
      text-align: left
      color: inherit
      background: none
      border: none
  .my-title-img
    width: 100%
    img 
      width: 100%
  .cube-dialog-content 
    display: none
</style>


