<template>
	<view class="comm">
		<view class="bfff userxy mb30">
			<view class="font32 bold color333 mb30">用户协议</view>
			<view class="font28 color666 userxy-content">
				{{data1}}
			</view>
		</view>
		<view class="bfff userxy mb30">
			<view class="font32 bold color333 mb30">入驻须知</view>
			<view class="font28 color666 userxy-content" v-html="data2">
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data1:'',
				data2:''
			}
		},
		onLoad() {
			this.getxieyi();
		},
		methods: {
			getxieyi(){
				this.request.getdata('getxieyi').then(res => {
					console.log(res, '协议')
					this.data1=res.data1.info
					this.data2=res.data2.info
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.userxy{
	padding: 40upx 49upx 39upx 32upx;
	.userxy-content{
		line-height: 52upx;
		text-align: justify;
	}
}
</style>
