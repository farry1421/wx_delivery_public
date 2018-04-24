<template>
  <div class="form">
    <cube-form 
      :model="model" 
      :schema="schema" 
      :immediate-validate="false" 
      :option="options" 
      @validate="validateHandler" 
      @submit="submitHandler" 
      @reset="resetHandler">
    </cube-form>
  </div>
  <!-- model 就是整个表单需要的数据源，schema 就是生成表单所定义的模式
  immediate-validate 如果为 true 则初始时立即做校验，options 则是配置选项
  submit 校验成功后提交事件，validate 每次有数据校验更新的事件，reset 则是重置事件 -->
</template>

<script>
export default {
  name: 'Form',
  data () {
    return { 
      validity: {},
      valid: undefined,
      //整个表单需要的数据源
      model: {
        inputValue: '',
        checkboxValue: false,
        checkboxGroupValue: [],
        radioValue: '',
        rateValue: 0,
        selectValue: 2018,
        switchValue: true,
        textareaValue: '',
        uploadValue: []
      },
      //生成表单所定义的模式，用于定义表单中的各个字段，可以选择是否分组
      //无分组，直接包含fields即可，有分组，可以设置groups
      schema: {
				groups: [{
            legend: '基础',
            //定义表单字段
						fields: [
              {
                type: 'input',
                //在表单的model数据源对象中所对应的key名字
								modelKey: 'inputValue',
								label: '输入框label',
								props: {
									placeholder: '请输入'
								},
								rules: {
									required: true
								},
								//如果设置为'blur'那么则会在离焦后校验
								trigger: 'blur'
              },
              {
								type: 'checkbox',
								modelKey: 'checkboxValue',
								props: {
									option: {
										label: 'Checkbox',
										value: true
									}
								},
								rules: {
									required: true
								},
								messages: {
									required: 'Please check this field'
								}
							},
							{
								type: 'checkbox-group',
								modelKey: 'checkboxGroupValue',
								label: 'CheckboxGroup',
								props: {
									options: ['1', '2', '3']
								},
								rules: {
									required: true
								}
							},
							{
								type: 'radio-group',
								modelKey: 'radioValue',
								label: 'Radio',
								props: {
									options: ['1', '2', '3']
								},
								rules: {
									required: true
								}
							},
							{
								type: 'select',
								modelKey: 'selectValue',
								label: 'Select',
								props: {
									options: [2015, 2016, 2017, 2018, 2019, 2020]
								},
								rules: {
									required: true
								}
							},
							{
								type: 'switch',
								modelKey: 'switchValue',
								label: 'Switch',
								rules: {
									required: true
								}
							},
							{
								type: 'textarea',
								modelKey: 'textareaValue',
								label: 'Textarea',
								rules: {
									required: true
								},
								// debounce validate
								// if set to true, the default debounce time will be 200(ms)
								debounce: 100
							}
						]
					},
					{
						legend: '高级',
						fields: [
              {
								type: 'rate',
								modelKey: 'rateValue',
								label: 'Rate',
								rules: {
									required: true
								}
							},
							{
								type: 'upload',
								modelKey: 'uploadValue',
								label: 'Upload',
								events: {
									'file-removed': (...args) => {
										console.log('file removed', args)
									}
								},
								rules: {
									required: true,
									uploaded: (val, config) => {
										return Promise.all(val.map((file, i) => {
											return new Promise((resolve, reject) => {
												if (file.uploadedUrl) {
													return resolve()
												}
												// fake request
												setTimeout(() => {
													if (i % 2) {
														reject(new Error())
													} else {
														file.uploadedUrl = 'uploaded/url'
														resolve()
													}
												}, 1000)
											})
										})).then(() => {
											return true
										})
									}
								},
								messages: {
									uploaded: '上传失败'
								}
							}
						]
					},
					{
						fields: [{
								type: 'submit',
								label: 'Submit'
							},
							{
								type: 'reset',
								label: 'Reset'
							}
						]
					}
				]
			},
			options: {
				scrollToInvalidField: true,
				layout: 'standard' // classic fresh
			}
    }
  },
  methods: {
    submitHandler(e) {
			e.preventDefault()
			console.log('submit', e)
		},
		validateHandler(result) {
			this.validity = result.validity
			this.valid = result.valid
			console.log('validity', result.validity, result.valid, result.dirty, result.firstInvalidFieldIndex)
		},
		resetHandler(e) {
			console.log('reset', e)
		}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
