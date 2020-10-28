<template>
	<view class="accountset comm">
		<view class="account-head font500 font30 color3434 flex flex_be mt30">
			<text>头像</text>
			<view class="flex flex_al-cen">
				<view class="upload flex flex_al-cen" @click="UploadHeadimg">
					<image :src="headimg" class="user-img"></image>
				</view>
				<view class="iconfont icon-you"></view>
			</view>
		</view>
		<view class="flex flex_be list-item line mb30 font30">
			<text class="color3434 font500 font30">店铺封面图</text>
			<view class="flex flex_al-cen flex_jus-cen">
				<text class="color666">点击上传</text>
				<view class="icon-yjt iconfont icon-you"></view>
			</view>
		</view>
		<view class="">
			<view class="flex flex_be list-item line font30">
				<text class="color3434 font500 font30">电话</text>
				<view class="flex flex_al-cen flex_jus-cen">
					<text class="color666">13000000000</text>
					<view class="icon-yjt iconfont icon-you"></view>
				</view>
			</view>
			<view class="flex flex_be list-item line font30">
				<text class="color3434 font500 font30">地址</text>
				<view class="flex flex_al-cen flex_jus-cen">
					<text class="color666">龙湖时代天街</text>
					<view class="icon-yjt iconfont icon-you"></view>
				</view>
			</view>
			<view class="flex flex_be list-item line font30">
				<text class="color3434 font500 font30">归属学校</text>
				<view class="flex flex_al-cen flex_jus-cen">
					<text class="color666">河北科技大学</text>
					<view class="icon-yjt iconfont icon-you"></view>
				</view>
			</view>
		</view>
		<view class="user-btn text_cen font32 font500 colorfff">确定修改</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				headimg: "",
			}
		},
		methods: {
			UploadHeadimg() {
				let that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						that.headimg = res.tempFilePaths
						console.log(JSON.stringify(res.tempFilePaths));
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.accountset {
		.account-head {
			background: #fff;
			line-height: 140upx;
			padding: 0 32upx;
			border-bottom: 1px solid #eee;

			.user-img {
				width: 99upx;
				height: 99upx;
				border-radius: 50%;
				margin-right: 26upx;
			}
		}

		.icon-yjt {
			margin-left: 27upx;
		}

		.list-item {
			height: 88upx;
			background: #fff;
			line-height: 88upx;
			padding: 0 30upx;
		}

		.line {
			border-bottom: 1px solid #EEEEEE;
		}

		input {
			text-align: right;
		}

		.user-btn {
			width: 690upx;
			height: 80upx;
			background: linear-gradient(81deg, #6E9AF8 0%, #3C66DF 100%);
			box-shadow: 1upx 5upx 20upx 0px rgba(209, 109, 78, 0.2);
			border-radius: 10upx;
			line-height: 80upx;
			margin: 0 auto;
			margin-top: 80upx;
		}
	}
</style>
