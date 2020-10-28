<template>
	<view class="login-box">
		<view class="login-bg">
			<image src="../../static/img/business-bg.png" mode=""></image>
			<view class="login-nav">
				<text class="back iconfont icon-iconfont-left"></text>
				<text class="colorfff bold font36">商家登录</text>
			</view>
		</view>
		<view class="login-img flex flex_al-cen flex_jus-cen">
			<image src="../../static/img/login.png" mode=""></image>
		</view>
		<view class="form">
			<form @submit="formSubmit">
				<view class="login-list">
					<view class="color3434 font32 font500 login-user">账号</view>
					<input type="text" value="" placeholder="请输入你的账号" />
				</view>
				<view class="login-list mb">
					<view class="color3434 font32 font500 login-user">密码</view>
					<input type="password" value="" placeholder="请输入你的密码" />
				</view>
				<view class="flex flex_al-cen pad">
					<text class="cicle"></text>
					<text class="color666 font500 font26">记住密码</text>
				</view>
				<button form-type="submit" class="login-btn text_cen colorfff font32 font500">确定登录</button>
			</form>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value
				uni.showModal({
					content: '表单数据内容：' + JSON.stringify(formdata),
					showCancel: false
				});
			},
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
			border: 1upx solid #666666;
			border-radius: 50%;
			margin-right: 10upx;
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
