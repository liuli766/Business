<template>
	<view class="popbox">
		<view class="popup text_cen">
			<slot name="fenlei"></slot>
			<slot name="comminp"></slot>
			<view class="font32 font500 flex" style="margin-top: 60upx;">
				<view class="confirm color666 text_cen ml mr" @tap="handconfirm">取消</view>
				<view class="cancel colorfff text_cen" @tap="handcancel">确认提交</view>
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
				ispulgPop:(state) => state.ispulgPop
			}),
		},
		methods: {
			handcancel(){
				this.$store.commit("showPlugPop", false);
			},
			handconfirm(){
				this.$store.commit("showPlugPop", false);
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
			margin-top: -317upx;
			width: 560upx;
			height: 634upx;
			background: #FFFFFF;
			border-radius: 20upx;
			padding-bottom: 60upx;
			
			.poptitle{
				margin: 60upx 0 38upx 0;
			}
			.confirm{
				width: 200upx;
				line-height: 80upx;
				border: 1upx solid #EEEEEE;
				border-radius: 10upx;
				
			}
			.cancel{
				width: 280upx;
				line-height: 80upx;
				background: linear-gradient(81deg, #6D99F8 0%, #3C66DF 100%);
				border-radius: 10upx;
				border: none;
			}
		}
	}
	
	
</style>
