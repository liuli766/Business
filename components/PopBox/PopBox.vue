<template>
	<view class="popbox" v-if="isPop">
		<view class="popup text_cen">
			<view class="pop">
				<image src="../../static/img/succss.png" class="success"></image>
				<slot name="successtxt"></slot>
				<slot name="subtet"></slot>
				<slot name="btnpop"></slot>
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
				isPop: (state) => state.isPop,
			}),
		},
		methods: {
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
			.pop{
				width: 560upx;
				height: 553upx;
				background: #FFFFFF;
				border-radius: 20upx;
				padding-top: 74upx;
				.success{
					width: 150upx;
					height: 158upx;
				}
			}
			.close{
				width: 80upx;
				height: 80upx;
				margin-top: 110upx;
			}
		}
	}
	
	
</style>
