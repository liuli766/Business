import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		isPop: false,
		isConcatPop: false, //拒绝弹框
		isRefusePop: false, //一键拨号弹框
		Tel: "", //电话
		ispulgPop: false,
		isPopYear: false,
		supplier_id: "", //用户id
		refuseOrder: {}, //拒接接单
		iscomminput: false, //公共输入框值
		addcat: {
			cat_name: "",
			attr: ""
		}, //分类,商品
		deleteGoods: {}, //删除商品
		goods: {}, //修改商品
		statustype: false, //修改状态
		updataId: "",
		activedelete: '', //活动管理删除
		is_real: 0
	},
	getters: {

	},
	mutations: {
		login(state, user) { //登录
			state.supplier_id = user
			uni.setStorageSync('user', JSON.stringify(user));
		},
		initUser(state) { //初始化用户信息
			let user = uni.getStorageSync('user');
			if (user) {
				state.supplier_id = JSON.parse(user)
			}
		},
		CancleOrder(state, data) { //拒接接单
			state.refuseOrder = data
		},
		Showcomminput(state, val) { //获取输入框的值
			state.iscomminput = val
		},
		AddCate(state, data) { //分类,商品
			state.addcat = data
			console.log(state.addcat, data)
		},
		DeleteGoods(state, data) { //删除商品
			state.deleteGoods = data
		},
		addgoods(state, data) { //修改商品
			state.goods = data
		},
		Statustype(state, val) { //修改资料状态
			state.statustype = val
		},
		handleUpdata(state, val) { //活动管理的列表id
			state.updataId = val
		},
		handisreal(state, val) { //实名认证
			state.is_real = val
		},
		handTel(state, val) {
			state.Tel = val
		},
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
		},
	},
	actions: {}
})

export default store
