import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Main from '@/components/Main'
import Block from '@/components/Block'
import Scroll from '@/components/Scroll'
import Form from '@/components/Form'
import Certify from '@/components/Certify'
import Upload from '@/components/Upload'
import UploadBase64 from '@/components/UploadBase64'
import UploadSlot from '@/components/UploadSlot'
import CascadePicker from '@/components/CascadePicker'
import Qrcode from '@/components/Qrcode'
import Axios from '@/components/Axios'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    },
    {
      path: '/block',
      name: 'Block',
      component: Block
    },
    {
      path: '/scroll',
      name: 'Scroll',
      component: Scroll
    },
    {
      path: '/form',
      name: 'Form',
      component: Form
    },
    {
      path: '/certify',
      name: 'Certify',
      component: Certify
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Upload
    },
    {
      path: '/uploadbase64',
      name: 'UploadBase64',
      component: UploadBase64
    },
    {
      path: '/uploadslot',
      name: 'UploadSlot',
      component: UploadSlot
    },
    {
      path: '/cascadePicker',
      name: 'CascadePicker',
      component: CascadePicker
    },
    {
      path: '/qrcode',
      name: 'Qrcode',
      component: Qrcode
    },
    {
      path: '/axios',
      name: 'Axios',
      component: Axios
    }
  ]
})
