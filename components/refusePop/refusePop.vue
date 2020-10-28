<template>
	<view class="popbox">
		<view class="popup text_cen">
			<slot name="poptitle"></slot>
			<view class="font32 font500 flex" style="margin-top: 56upx;">
				<view class="confirm color666 text_cen" @tap="handconfirm">确认</view>
				<view class="cancel colorfff text_cen" @tap="handcancel">取消</view>
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
				isConcatPop:(state) => state.isConcatPop
			}),
		},
		methods: {
			handcancel(){
				this.$store.commit("showConcatPop", false);
			},
			handconfirm(){
				this.$store.commit("showConcatPop", false);
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
			box-sizing: border-box;
			
			.confirm{
				width: 280upx;
				line-height: 80upx;
				border: 1upx solid #EEEEEE;
				border-radius: 0px 0px 0px 20upx;
			}
			.cancel{
				width: 280upx;
				line-height: 80upx;
				background: linear-gradient(81deg, #6D99F8 0%, #3C66DF 100%);
				border-radius: 0px 0px 20upx 0px;
				border: none;
			}
		}
	}
	
	
</style>
