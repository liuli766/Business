<template>
	<view class="popbox" @tap="Closepop">
		<view class="popup text_cen">
			<view class="poptitle bold color333 font36">联系商家</view>
			<view class="color999 font500 font26">你正在使用一键拨号联系商家</view>
			<view class="btn font32 font500 colorfff" @tap.stop="handCall">
				一键拨号
			</view>
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
				
			}
		},
		computed: {
		    ...mapState({
				isRefusePop:(state) => state.isRefusePop
			}),
		},
		methods: {
			Closepop(){
				this.$store.commit("showRefuse", false);
			},
			handCall(){
				console.log(1)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popbox{
		background: rgba(0,0,0,.3);
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		overflow: hidden;
		transition: all .2s;
		.popup{
			position: absolute;
			top: 50%;
			left: 50%;
			margin-left:-280upx ;
			margin-top: -276.5upx;
			width: 560upx;
			height: 316upx;
			background: #FFFFFF;
			border-radius: 20upx;
			.poptitle{
				margin: 60upx 0 38upx 0;
			}
			.btn{
				width: 560upx;
				height: 80upx;
				background: linear-gradient(81deg, #6D99F8 0%, #3C66DF 100%);
				border-radius: 0px 0px 20upx 20upx;
				line-height: 80upx;
				margin-top: 79upx;
			}
		}
	}
	
	
</style>
