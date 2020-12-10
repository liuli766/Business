<template>
	<view class="comm">
		<view class="bfff about-top">
			<image src="../../../static/img/about.png" mode=""></image>
			<view class="font28 color333">这里是平台介绍</view>
		</view>
		
		<button open-type='contact' session-from=server class="commbtn text_cen colorfff">联系客服</button>


	</view>
</template>

<script>
	export default {
		data() {
			return {
					server:""
			}
		},
		onLoad() {
			this.aboutUs();
			this.getxieyi();
		},
		methods: {
			aboutUs(){
				this.request.getdata('getaboutUs').then(res => {
					console.log(res, '联系客服')
					this.server=res.info
				})
			},
			getxieyi(){
				this.request.getdata('getxieyi').then(res => {
					console.log(res, '协议')
				})
			}
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
