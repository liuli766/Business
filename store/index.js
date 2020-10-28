import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		isPop: false,
		isConcatPop: false, //拒绝弹框
		isRefusePop: false, //一键拨号
		ispulgPop: false,
		isPopYear: false,
	},
	getters: {

	},
	mutations: {
		showPop(state, val) {
			state.isPop = val
		},
		showConcatPop(state, val) {
			state.isConcatPop = val
		},
		showRefuse(state, val) {
			state.isRefusePop = val
		},
		showPlugPop(state, val) {
			state.ispulgPop = val
		},
		ShowPopYear(state, val) {
			state.isPopYear = val
		}
	},
	actions: {

	}
})

export default store
