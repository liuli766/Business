<template>
	<view class="login-box comm">
		<view class="login-bg">
			<image src="../../static/img/register-bg.png"></image>
			<view class="login-nav">
				<text class="back iconfont icon-iconfont-left"></text>
				<text class="colorfff bold font36" style="margin-left: 190rpx;">申请成为商户</text>
			</view>
		</view>
		<view class="form">
			<view class="font32 bold color333 bfff" style="padding:30upx;border-radius: 10upx 10upx 0 0;">请认真填写以下资料</view>
			<form @submit="formSubmit">
				<view class="bfff font32" style="padding:0 30upx;">
					<view class="login-list flex flex_be">
						<view class="color3434 font32 font500 login-user">商户名称</view>
						<input type="text" name='name' placeholder="商户名称" placeholder-style='text-align:right' @input="Name" />
					</view>
					<view class="login-list flex flex_be meun-name" @tap="handDownmeun">
						<view class="color3434 font32 font500 login-user">分类</view>
						<input type="text" v-model="userinfo.cat_id" placeholder="选择分类" name="cat_id" disabled placeholder-style='text-align:right' />
						<view class="meun flex flex-col text_cen font32" v-if="isDownmeun">
							<text v-for="(item,k) in catList" :key='k' @tap.stop="handSex(item)">{{item.cat_name}}</text>
						</view>
					</view>
					<view class="login-list flex flex_be">
						<view class="color3434 font32 font500 login-user">详细地址</view>
						<input type="text" name="address" placeholder="详细地址" placeholder-style='text-align:right' @input="address" />
					</view>
					<view class="login-list flex flex_be">
						<view class="color3434 font32 font500 login-user">联系电话</view>
						<input type="number" name="tel" placeholder="联系电话" placeholder-style='text-align:right' @input="tel" />
					</view>
					<view class="login-list flex flex_be">
						<view class="color3434 font32 font500 login-user">登录手机号</view>
						<input type="number" name="mobile" placeholder="登录手机号" placeholder-style='text-align:right' @input="mobile" />
					</view>
					<view class="flex login-list flex_be" style="border: none;">
						<view class="color3434 font32 font500 login-user">登录密码</view>
						<input type="password" name="surepwd" placeholder="登录密码" placeholder-style='text-align:right' @input="password" />
					</view>
					<view class="login-list flex flex_be meun-name" @tap="handleSchool">
						<view class="color3434 font32 font500 login-user">所在学校</view>
						<input type="text" v-model="school" placeholder="选择学校" name="cat_id" disabled placeholder-style='text-align:right' />
						<view class="meun flex flex-col text_cen font32" v-if="isschool" style="width: 400upx;">
							<text v-for="(item,k) in schoolList" :key='k' @tap.stop="handslectschool(item)">{{item.name}}</text>
						</view>
					</view>
				</view>
				<view class="font24 font500 color999 register-xy">
					我已阅读并同意《<text class="colorfac">平台商户入驻须知</text>》
				</view>
				<button form-type="submit" class="login-btn text_cen colorfff font32 font500">提交申请</button>
			</form>
		</view>

	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex';
	export default {
		data() {
			return {
				isDownmeun: false, //是否显示性别下拉框
				showClearIcon: false,
				userinfo: {
					name: "",
					address: "",
					tel: "",
					mobile: "",
					password: "",
					cat_id: ""
				},
				catList: [], //分类列表
				selectid: 1, //选中分类id
				school:'',
				isschool:false,
				schoolList:[],
				isschoolid:"",
			}
		},
		computed: {
			...mapState({
				supplier_id: (state) => state.supplier_id,
			}),
		},
		created() {
			let that = this;
			that.request.getdata('getCatList', ).then(res => {
				this.catList = res.data
				console.log(res, '注册列表')
			})
			// 第一步 获取定位
			uni.getLocation({
				type: 'wgs84',
				success: function(res) {
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);

					// 第二步：存入缓存
					uni.setStorage({
						key: "latitude",
						data: res.latitude
					})
					uni.setStorage({
						key: "longitude",
						data: res.longitude
					})
				}
			});
			let params = {
				supplier_id: this.supplier_id,
			}
			that.request.getdata('getarrSchool', params).then(res => {
				console.log(res, '学校')
				that.schoolList=res.data
			})
			if (this.supplier_id !== "") {
				uni.switchTab({
					url: '../TabBar/Order/Order',
				})
			}
		},
		methods: {
			/*
			 ***解决uniapp input框输入文字乱跳
			 */
			Name(e) {
				let val = e.detail.value
				this.userinfo.name = val
			},
			address(e) {
				let val = e.detail.value
				this.userinfo.address = val
			},
			tel(e) {
				let val = e.detail.value
				this.userinfo.tel = val
			},
			mobile(e) {
				let val = e.detail.value
				this.userinfo.mobile = val
			},
			password(e) {
				let val = e.detail.value
				this.userinfo.password = val
			},
			formSubmit: function(e) { //注册
				let lon = uni.getStorageSync('longitude');
				let lat = uni.getStorageSync('latitude');

				let params = {
					supplier_name: this.userinfo.name,
					lon,
					lat,
					address: this.userinfo.address,
					cat_id: this.selectid,
					tel: this.userinfo.tel,
					mobile: this.userinfo.mobile,
					password: this.userinfo.password,
					school_id:this.isschoolid,
				}
				if (!this.userinfo.name) {
					uni.showToast({
						title: '商户名称不能为空',
						icon: "none"
					});
					return false;
				}
				if (!this.userinfo.cat_id) {
					uni.showToast({
						title: '请选择分类',
						icon: "none"
					});
					return false;
				}
				if (!this.userinfo.address) {
					uni.showToast({
						title: '详细地址不能为空',
						icon: "none"
					});
					return false;
				}
				if (!this.userinfo.tel) {
					uni.showToast({
						title: '联系电话不能为空',
						icon: "none"
					});
					return false;
				}
				if (!this.userinfo.mobile) {
					uni.showToast({
						title: '登录手机号不能为空',
						icon: "none"
					});
					return false;
				}
				if (!/^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/.test(this.userinfo.tel)) {
					uni.showToast({
						title: '手机号码格式不正确',
						icon: "none"
					});
					return false;
				}
				if (!/^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/.test(this.userinfo.mobile)) {
					uni.showToast({
						title: '手机号码格式不正确',
						icon: "none"
					});
					return false;
				}
				if (!this.userinfo.password) {
					uni.showToast({
						title: '密码不能为空',
						icon: "none"
					});
					return false;
				}

				let that = this
				that.request.getdata('getRegister', params).then(res => {
					console.log(res)
					res.code == 200 && uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 3000
					});

					uni.navigateTo({
						url: '../login/login',
						success: res => {},
						fail: () => {},
						complete: () => {}
					})
				})
			},
			handSex(item) { //选择分类
				this.userinfo.cat_id = item.cat_name;
				this.selectid = item.id
				this.isDownmeun = false
			},
			handDownmeun() { //显示分类下拉框
				this.isDownmeun = !this.isDownmeun
			},
			handleSchool(){
				this.isschool = !this.isschool
			},
			handslectschool(item){
				this.school = item.name
				this.isschool= false
				this.isschoolid= item.id
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-box {
		.login-bg {
			image {
				width: 100%;
				height: 365upx;
				position: relative;
			}

			.login-nav {
				position: absolute;
				width: 100%;
				top: 115upx;
				left: 0;
				padding-left: 38upx;
			}
		}

		.form {
			width: 690rpx;
			height: 716rpx;
			box-sizing: border-box;
			margin: 30upx;
			border-radius: 10upx;
			position: absolute;
			top: 202upx;
			left: 0;

			.login-list {
				line-height: 88rpx;
				border-bottom: 1rpx solid #EEEEEE;
				align-items: center;
				position: relative;
			}

			input {
				text-align: right;
				padding-right: 20upx;
			}

			.login-btn {
				width: 690upx;
				height: 80upx;
				background: #FFAC68;
				opacity: 1;
			}

			.register-xy {
				margin: 40upx 0 80upx 0;
			}

			.meun-name {
				position: relative;

				.meun {
					position: absolute;
					top: 66rpx;
					right: 0;
					width: 200upx;
					height: 500upx;
					background: #fff;
					box-shadow: 0px 5upx 10upx 0px rgba(0, 0, 0, 0.05);
					border-radius: 10upx;
					z-index: 9;
					transition: all .2s;
					overflow: auto;

					text:hover {
						background: #F7F9FA;
					}
				}
			}

		}
	}
</style>
