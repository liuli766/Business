export default{
	base: 'https://freak.jisapp.cn/index.php/api',
	interface:{
		getRegister:'/Business/register' ,//商户注册
		getLogin:'/Business/login',//商户登录
		getCatList:'/Business/catList',//商户注册-分类列表
		
		getOrderList:'/Business/getOrderList',//首页订单中心
		getOrderInfo:'/Business/orderInfo',//订单详情
		getOrderTaking:'/Business/orderTaking',//接单/拒绝接单
		// 我的
		getSetSupplierLogo:'/Business/setSupplierLogo',//账户设置-上传
		getSupplierSetTing:'/Business/supplierSetTing',//账户设置
		getSupplierInfo:'/Business/supplierInfo',//店铺管理-详情
		
		//分类管理
		getSupplierCateList:'/Business/supplierCateList',//分类列表
		getSupplierAddCate:'/Business/supplierAddCate',//添加分类
		getUpdateCate:'/Business/updateCate',//分类修改
		getCatInfo:'/Business/catInfo',//分类详情
		// 商品管理
		getGoodsList:'/Business/goodsList',//商品列表
		getdeleteGoods:'/Business/deleteGoods',//删除商品
		getuploadGoodsImage:'/Business/uploadGoodsImage',//添加商品-上传图片
		getAttrType:'/Business/getAttrType',//添加商品-选择分类，确认属性
		getaddGoods:'/Business/addGoods',//商品添加/修改
		getgoodsInfo:'/Business/goodsInfo',//商品详情
		
		getsetDate:'/Business/setDate',//设置营业时间
		getsupplierUpload:'/Business/supplierUpload',//商户认证-上传图片
		getsupplierAuth:'/Business/supplierAuth',//商家认证
		getCommentList:'/Supplier/commentList',//商家评论-列表
		getorderSend:'/Business/orderSend',//订单中心-订单操作
		getcommentEcho:'/Supplier/commentEcho',//评论回复
		getsupplierInfoSetTing:'/Business/supplierInfoSetTing',//商家基本信息-设置
		getarrSchool:'/Index/arrSchool',//获取学校列表
		getorderHistory:'/Business/orderHistory',//商家历史订单
		getmoneyRecord:'/Business/moneyRecord',//商家中心-订单对账
		getsupplierCash:'/Business/supplierCash',//商家提现申请
		getbankInfo:'/Business/bankInfo',//商家绑定银行卡获取
		getsupplierMoney:'/Business/supplierMoney',//订单对账-金额
		getBanKList:'/Rider/banKList',//开户行列表
		getSendCode:'/Rider/sendCode',//发送短信
		getBindBank:'/Business/bindBank',//商家绑定银行卡
		getsupplierNews:'/Business/supplierNews',//公告管理
		getaddNews:'/Business/addNews',//添加公告
		getactivityList:'/Business/activityList',//活动管理
		getaddActivity:'/Business/addActivity',//活动管理-添加/修改
		getsupplierCode:'/Business/supplierCode',//商家收款码（扫一扫打开后暂时一个二维码）
		getactivityAgain:'/Business/activityAgain',//活动管理-重新申请
		getbillOrderList:'/Business/billOrderList',//发单列表
		getcatDel:'/Business/catDel',//分类管理的删除
		getactDel:'/Business/actDel',//活动删除和取消接口
		getnewsDel:'/Business/newsDel',//公告删除
		getsupplierSalt:'/Business/supplierSalt',//配送合作
		getsaveSalt:'/Business/saveSalt',//配送合作修改
		getautoOrder:'/Business/autoOrder',//自动接单
		getautoFind:'/Business/autoFind',//自动接单查询
		getaboutUs:'/Users/aboutUs',//联系客服
		getxieyi:"/Users/xieyi",//用户协议
	},
	getdata: function(url, data, method) {
		let vm = this;
		uni.showLoading({
			title: "加载中..."
		})
		if (this.interface[url]) {
			let u = vm.base + this.interface[url];
			let header = {
				"X-Requested-With": "XMLHttpRequest" //则为 Ajax 异步请求。
			}
			return new Promise(function(resolve, reject) {
				uni.request({
					url: u,
					data: data,
					header: header,
					method: method ? method : 'POST',
					success: (res) => {
						if (res.data.code == 200) {
							resolve(res.data);
						}
						if (res.data.code == 300) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
								duration: 3000
							});
							resolve(res.data);
						}
						if (res.data.code == 401) {
							uni.showToast({
								title: '请先登录',
								icon: 'none',
								duration: 3000
							});
						}
						if (res.data.code == 400 || res.data.code == 404) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
								duration: 3000
							});
						}
					},
					fail: (error) => {
						reject(error);
					},
					complete: () => {
						uni.hideLoading();
					}
				});
			})
		} else {
			return new Promise(function(resolve, reject) {
				reject('接口错误');
			})
		}
	},
	uploadFile:function(url,filePath,data) { //上传图片接口
		let vm = this;
		uni.showLoading({
			title: "加载中..."
		})
		if (this.interface[url]) {
			let u = vm.base + this.interface[url];
		    let header = {
				"X-Requested-With": "XMLHttpRequest",
				"Content-Type": "multipart/form-data"//记得设置
		    }
			return new Promise(function (resolve, reject) {
				uni.uploadFile({
					url: u, 
					filePath: filePath,
					name: 'file',
					header: header,
					formData:data,
					success: function(res){
						let data = JSON.parse(res.data);
						resolve(data);
						uni.hideLoading();
					},
					fail: function(error){
						uni.hideLoading();
						reject(error);
					}
				})
		    })
		}else{
		    return new Promise(function (resolve, reject) {
		        reject('参数错误');
		    })
		}
	},
}