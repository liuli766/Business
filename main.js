import Vue from 'vue'
import App from './App'
import store from './store'
import request from './common/request.js'
 Vue.prototype.request=request
 import upImage from './common/UpImg.js'
 Vue.prototype.upImage=upImage
 import time from './common/time.js'
 Vue.prototype.time=time
 
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
