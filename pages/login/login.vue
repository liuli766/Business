<template>
	<view class="login-box">
		<view class="login-bg">
			<image src="../../static/img/login-bg.png"></image>
			<view class="login-nav">
				<text class="back iconfont icon-iconfont-left"></text>
				<text class="colorfff bold font36">骑手登录</text>
			</view>
		</view>
		<view class="login-img flex flex_al-cen flex_jus-cen">
			<image src="../../static/img/login.png"></image>
		</view>
		<view class="form">
			<form @submit="formSubmit">
				<view class="login-list">
					<view class="color3434 font32 font500 login-user">账号</view>
					<input type="text" placeholder="请输入你的账号" v-if="remberpwd" :value="userinfo.mobile"  @input="mobile"/>
					<input type="text" placeholder="请输入你的账号" v-else  @input="mobile"/>
				</view>
				<view class="login-list mb">
					<view class="color3434 font32 font500 login-user">密码</view>
					<input type="password" placeholder="请输入你的密码" v-if="remberpwd" :value="userinfo.password"  @input="password" />
					<input type="password" placeholder="请输入你的密码" v-else  @input="password" />
				</view>
				<view class="flex flex_al-cen pad" @tap="handRemberPwd">
					<text class="cicle" :class="{'cicle-active':remberpwd}"></text>
					<text class="color666 font500 font26">记住密码</text>
				</view>
				<button form-type="submit" class="login-btn text_cen colorfff font32 font500">确定登录</button>
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
				userinfo: {
					mobile: "",
					password: ""
				},
				remberpwd: false, //记住密码状态
			}
		},
		computed: {
			...mapState({
				supplier_id: (state) => state.supplier_id,
			}),
		},
		onLoad() {
			this.RemberPwd()
		},
		methods: {
			mobile(e){
				let val=e.detail.value
				this.userinfo.mobile=val
			},
			password(e){
				let val=e.detail.value
				this.userinfo.password=val
			},
			formSubmit: function(e) { //登录
				console.log(e)
				let params = {
					mobile: this.userinfo.mobile,
					password: this.userinfo.password,
				}
				if (!this.userinfo.mobile) {
					uni.showToast({
						title: '账号不能为空',
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
				that.request.getdata('getLogin', params).then(res => {
					if(res.code==200){
						uni.setStorageSync('pawd',this.userinfo.password);
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 3000
						});
						this.$store.commit('login',res.supplier_id)
						uni.switchTab({
							url: '../TabBar/Order/Order',
						})
					}else{
						return;
					}
				})
			},
			handRemberPwd() { //记住密码
				if (!this.userinfo.password) {
					uni.showToast({
						title: '请输入密码',
						icon: "none"
					});
					this.remberpwd = false
				} else {
					this.remberpwd = !this.remberpwd
					
					if (this.remberpwd) {
						let data = {
							password: this.userinfo.password,
							mobile: this.userinfo.mobile,
						}
						uni.setStorage({
							key: 'pwd',
							data: JSON.stringify(data)
						})
						uni.showToast({
							title: '记住密码成功',
							icon: "none"
						});
						
					} else {
						uni.removeStorage({
							key: 'pwd',
						});
						this.userinfo.password=''
						uni.showToast({
							title: '取消记住密码成功',
							icon: "none"
						});
					}
				}

			},
			RemberPwd() {
				let that = this
				uni.getStorage({
					key: 'pwd',
					success: function(res) {
						let data = JSON.parse(res.data)
						that.userinfo.password = data.password
						that.userinfo.mobile = data.mobile
						that.remberpwd = true
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-box {
		background-color: #fff;
		height: 100%;
		position: fixed;
		width: 100%;
		overflow: auto;

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

				.back {
					margin-right: 250upx;
				}
			}
		}

		.login-img {
			width: 200upx;
			height: 200upx;
			background: #FFFFFF;
			box-shadow: 1upx 4upx 20upx 0px rgba(0, 0, 0, 0.06);
			border-radius: 10upx;
			position: absolute;
			top: 265upx;
			left: 275upx;

			image {
				width: 140upx;
				height: 140upx;
			}
		}

		.form {
			margin-top: 199upx;
			padding: 0 60upx;
		}

		.login-list {
			border-bottom: 1upx solid #DEDEDE;
			margin-bottom: 60upx;
		}

		.mb {
			margin-bottom: 30upx;
		}

		input {
			padding-bottom: 26upx;
		}

		.login-user {
			margin-bottom: 46upx;
		}

		.cicle {
			display: inline-block;
			width: 32upx;
			height: 32upx;
			border: 1px solid #666666;
			border-radius: 50%;
			margin-right: 10upx;
			position: relative;
		}

		.cicle-active::after {
			content: "";
			display: block;
			position: absolute;
			width: 16upx;
			height: 16upx;
			border-radius: 50%;
			top: 50%;
			left: 50%;
			margin-top: -8upx;
			margin-left: -8upx;
			background: #FFAC68;
		}

		.pad {
			margin-bottom: 105upx;
		}

		.login-btn {
			width: 630upx;
			height: 80upx;
			background: linear-gradient(81deg, #6E9AF8 0%, #3C66DF 100%);
			border-radius: 10upx;
			line-height: 80upx;
		}
	}
</style>
