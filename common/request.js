export default{
	base:'http://192.168.1.6/index.php/api',
	interface:{
		getRegister:'/Rider/register' //骑手注册
	},
	getdata: function(url,data,method) {
		let vm = this;
		uni.showLoading({
			title:"加载中..."
		})
	    if (this.interface[url]) {
	        let u = vm.base + this.interface[url];
	        let header = {
				"X-Requested-With": "XMLHttpRequest" //则为 Ajax 异步请求。
	        }
			return new Promise(function (resolve, reject) {
				uni.request({
					url: u,
					data: data,
					header: header,
					method: method?method:'POST',
					success: (res) => {
						if(res.data.status == 200){
							resolve(res.data);
						}
						if(res.data.status == 401){
							uni.showToast({
								title: '请先登录',
								icon: 'none',
								duration:3000
							});
						}
						if(res.data.status == 400 || res.data.status == 404){
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
								duration:3000
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
	    }else{
	        return new Promise(function (resolve, reject) {
	            reject('接口错误');
	        })
	    }
	},
}