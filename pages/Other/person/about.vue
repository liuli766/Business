<template>
	<view class="comm">
		<view class="bfff about-top">
			<image src="../../../static/img/about.png" mode=""></image>
			<view class="font28 color333">这里是平台介绍</view>
		</view>
		<view class="commbtn text_cen colorfff">联系客服</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.about-top{
		padding: 40upx 30upx;
		box-sizing: border-box;
		image {
			margin-bottom: 50upx;
			width: 100%;
			height: 320upx;
		}
	}
	.commbtn{
		margin: 60upx 30upx;
	}
</style>
