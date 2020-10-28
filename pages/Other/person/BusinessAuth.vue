<template>
	<view class="comm font30">
		<view class="font28 font500 real-tit">
			请认真填写，<text class="real-rz">一经认证不可更改</text>
		</view>
		<view class="account-head font500 font30 color3434 flex flex_be mb30">
			<text>头像</text>
			<view class="flex flex_al-cen">
				<view class="upload flex flex_al-cen" @click="UploadHeadimg">
					<image :src="headimg" class="user-img"></image>
				</view>
				<view class="iconfont icon-you"></view>
			</view>
		</view>
		<view>
			<view class="flex flex_be list-item line" >
				<text class="color3434 font500 font30" >商家名称</text>
				<view class="flex flex_al-cen flex_jus-cen" >
					<text class="color666">瑞幸咖啡</text>
					<view class="icon-yjt iconfont icon-you"></view>
				</view>
			</view>
			<view class="flex flex_be list-item line" >
				<text class="color3434 font500 font30" >地址</text>
				<view class="flex flex_al-cen flex_jus-cen" >
					<text class="color666">观音桥好吃街</text>
					<view class="icon-yjt iconfont icon-you"></view>
				</view>
			</view>
			<view class="flex flex_be list-item line" >
				<text class="color3434 font500 font30" >电话</text>
				<view class="flex flex_al-cen flex_jus-cen" >
					<text class="color666">13000000000</text>
					<view class="icon-yjt iconfont icon-you"></view>
				</view>
			</view>
			<view class="flex flex_be list-item line" >
				<text class="color3434 font500 font30" >负责人姓名</text>
				<view class="flex flex_al-cen flex_jus-cen" >
					<text class="color666">王小二</text>
					<view class="icon-yjt iconfont icon-you"></view>
				</view>
			</view>
			<view class="flex flex_be list-item line" >
				<text class="color3434 font500 font30" >身份证号码</text>
				<view class="flex flex_al-cen flex_jus-cen" >
					<text class="color666">王小二</text>
					<view class="icon-yjt iconfont icon-you"></view>
				</view>
			</view>
		</view>
		<!-- 上传身份证照片 -->
		<view>
			<view class="color666 font28 upload-card-tit" >
				上传身份证照片
			</view>
			<view class="flex flex_be font24 color333 bfff" style="padding: 30upx;">
				<view class="flex flex-col flex_jus-cen flex_al-cen">
					<image src="../../../static/img/card4.png"  class="card-img"></image>
					<text>上传身份证主页</text>
				</view>
				<view class="flex flex-col flex_jus-cen flex_al-cen">
					<image src="../../../static/img/card3.png"  class="card-img"></image>
					<text>上传身份证副页</text>
				</view>
			</view>
		</view>
		<!-- 商家资质上传 -->
		<view>
			<view class="color666 font28 upload-card-tit" >
				上传身份证照片
			</view>
			<view class="flex flex_be font24 color333 bfff" style="padding: 30upx;">
				<view class="flex flex-col flex_jus-cen flex_al-cen">
					<image src="../../../static/img/card4.png"  class="card-img"></image>
					<text>上传身份证主页</text>
				</view>
				<view class="flex flex-col flex_jus-cen flex_al-cen">
					<image src="../../../static/img/card3.png"  class="card-img"></image>
					<text>上传身份证副页</text>
				</view>
			</view>
		</view>
		<view class="commbtn text_cen colorfff font32 ml">确认提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				headimg: "",
			}
		},
		onLoad: function(option) {

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
	.comm {
		.real-tit {
			padding: 30upx;
		}

		.real-rz {
			color: #FFAC68;
		}
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
		margin-right: 7upx;
	}
	/deep/.rotate{
		transform: rotate(90deg) !important;
		transition: all .2s;
	}
	.upload-card-tit{
		margin: 50upx 0 32upx 32upx;
	}
	.card-img{
		width: 333upx;
		height: 200upx;
		margin-bottom: 16upx;
	}
	.commbtn{
		margin-bottom: 60upx;
	}
</style>
