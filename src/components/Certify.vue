<template>
	<cube-form class="cube-form_groups" 
		:model="model" 
		@validate="validateHandler" 
		@submit="submitHandler">
		<cube-form-group legend="位置" >
			<!--所在城市-->
			<cube-form-item :field="fields[0]"></cube-form-item>
		</cube-form-group>
		<cube-form-group legend="身份证正面">
			<!--证件正面-->
			<cube-form-item :field="fields[1]">
				<cube-upload
					ref="upload"
					action="" 
					:max="1"
					:simultaneous-upload="1" 
					:process-file="idcardFrontProcessFile"
					@files-added="idcardFrontAdded"
					@file-submitted="idcardFrontSubmitted" />
			</cube-form-item>
			<!--头像-->
			<cube-form-item :field="fields[2]">
				<img class="cube-form-item-right-img" src="../assets/icon.png" alt="">
			</cube-form-item>
			<!--姓名-->
			<cube-form-item :field="fields[3]"></cube-form-item>
			<!--性别-->
			<cube-form-item :field="fields[4]"></cube-form-item>
			<!--民族-->
			<cube-form-item :field="fields[5]"></cube-form-item>
			<!--身份证号-->
			<cube-form-item :field="fields[6]"></cube-form-item>
			<!--家庭住址-->
			<cube-form-item :field="fields[7]"></cube-form-item>
		</cube-form-group>
		<cube-form-group legend="身份证背面">
			<!--证件背面-->
			<cube-form-item :field="fields[8]">
				<cube-upload
					action="" 
					:max="1"
					:simultaneous-upload="1" 
					@files-added="idcardBackAdded"
					@file-submitted="idcardBackSubmitted" />
			</cube-form-item>
			<!--签发机关-->
			<cube-form-item :field="fields[9]"></cube-form-item>
			<!--有效期限-->
			<cube-form-item :field="fields[10]"></cube-form-item>
		</cube-form-group>
		<cube-form-group>
			<cube-button type="submit">提交</cube-button>
		</cube-form-group>
	</cube-form>
</template>

<script>
import compress from '../assets/image'
const ethnicities = ['阿昌族','鄂温克族','傈僳族','水族','白族','高山族','珞巴族','塔吉克族','保安族','仡佬族','满族','塔塔尔族','布朗族','哈尼族','毛南族','土家族','布依族','哈萨克族','门巴族','土族','朝鲜族','汉族','蒙古族','佤族','达斡尔族','赫哲族','苗族','维吾尔族','傣族','回族','仫佬族','乌孜别克族','德昂族','基诺族','纳西族','锡伯族','东乡族','京族','怒族','瑶族','侗族','景颇族','普米族','彝族','独龙族','柯尔克孜族','羌族','裕固族','俄罗斯族','拉祜族','撒拉族','藏族','鄂伦春族','黎族','畲族','壮族']
const fujiancities = ['福州市','厦门市','宁德市','南平市','泉州市','漳州市','龙岩市','莆田市','三明市','平潭']
const fields = [
	{
		type: 'select',
		modelKey: 'fujiancity',
		label: '所在城市',
		props: {
			options: fujiancities
		},
		rules: {
			required: true
		}
	},
	{
		type: 'upload',
		modelKey: 'idcardFront',
		label: '证件正面',
		rules: {
			required: true
		}
	},
	{
		type: 'upload',
		modelKey: 'idcardHeadImg',
		label: '头像',
		rules: {
			required: true
		}
	},
	{
		type: 'input',
		modelKey: 'name',
		label: '姓名',
		props: {
			placeholder: '请填写姓名'
		},
		rules: {
			required: true
		}
	},
	{
		type: 'radio-group',
		modelKey: 'sex',
		label: '性别',
		props: {
			options: ['男', '女']
		},
		rules: {
			required: true
		}
	},
	{
		type: 'select',
		modelKey: 'ethnicity',
		label: '民族',
		props: {
			options: ethnicities
		},
		rules: {
			required: true
		}
	},
	{
		type: 'input',
		modelKey: 'idcardNumber',
		label: '身份证号',
		props: {
			placeholder: '请填写身份证号'
		},
		rules: {
			required: true
		}
	},
	{
		type: 'textarea',
		modelKey: 'address',
		label: '家庭住址',
		props: {
			placeholder: '请填写家庭住址'
		},
		rules: {
			required: true
		},
		// debounce validate
		// if set to true, the default debounce time will be 200(ms)
		debounce: 100
	},
	{
		type: 'upload',
		modelKey: 'idcardBack',
		label: '证件背面',
		rules: {
			required: true
		}
	},
	{
		type: 'input',
		modelKey: 'organization',
		label: '签发机关',
		props: {
			placeholder: '请填写签发机关'
		},
		rules: {
			required: true
		}
	},
	{
		type: 'input',
		modelKey: 'expDate',
		label: '有效期限',
		props: {
			placeholder: '请填写有效期限'
		},
		rules: {
			required: true
		}
	}
]
export default {
  data() {
    return {
      validity: {},
			valid: undefined,
      model: {
				fujiancity: '',
				idcardFront: [],
				idcardHeadImg: '123',
				name: '',
				sex: '',
				ethnicity: '',
				idcardNumber: '',
				address: '',
				idcardBack: [],
				organization: '',
				expDate: ''
			},
      fields: fields
    }
  },
  methods: {
		idcardFrontProcessFile(file, next) {
      compress(file, {
        compress: {
          width: 1600,
          height: 1600,
          quality: 0.5
        }
      }, next)
    },
		idcardFrontAdded(files) {
      let hasIgnore = false
      const maxSize = 0.2*1024*1024 //1M
      for (let k in files) {
				console.log(files[k])
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
		},
		idcardFrontSubmitted(file) {
			console.log(file)
			this.model.idcardFront = [];
			this.model.idcardFront.push(file)
			// file.base64Value = file.file.base64
			// file.file.base64调孙晨借口
		},
		idcardBackAdded(files) {
      let hasIgnore = false
      const maxSize = 0.2*1024*1024 //1M
      for (let k in files) {
				console.log(files[k])
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
		},
		idcardBackSubmitted(file) {
			console.log(file)
			this.model.idcardBack = [];
			this.model.idcardBack.push(file)
			// file.base64Value = file.file.base64
			// file.file.base64调孙晨借口
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
    },
    submitHandler(e, model) {
			console.log('submit')
			console.log(model)
			e.preventDefault()
		}
  }
}
</script>

<style scoped>
.cube-form-item-right-img {
	margin: 0.2rem 0; 
	width: 2.133333rem;
	height: 2.133333rem;
}
</style>

