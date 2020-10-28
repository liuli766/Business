<template>
	<view class="comm">
		<view class="announ">
			<view class="announ-top flex flex_be">
				<text class="bold font32 color333">公告</text>
				<text class="font26 colorfac" @tap="AllCement">全部公告</text>
			</view>
			<view class="bfff announ-content">
				<view class="main-content">我是公告</view>
				<view class="font26 flex flex_be announ-content-bot">
					<view class="flex flex_al-cen" >
						<view  v-if="selectAll" @tap="isSelect">
							<view class="text_cen" :class="[defult?'cicle_active':'cicle']"></view>
						</view>
						<text class="color999">2020-09-18</text>
					</view>
					<text class="delete">删除</text>
				</view>
			</view>
			<view class="commbtn colorfff text_cen" v-if="selectAll==false">发布公告</view>
			<view class="flex text_cen colorfff font32 commbtn1" v-if="selectAll==true">
				<view class="cancel mr color666">取消</view>
				<view class="delete1">删除</view>
			</view>
		</view> 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectAll: false,
				defult: false
			}
		},
		methods: {
			AllCement() {
				this.selectAll = !this.selectAll
				console.log(this.selectAll)
			},
			isSelect() {
				this.defult = !this.defult
			}
		}
	}
</script>

<style lang="scss" scoped>
	.announ {
		margin: 0 30upx;

		.announ-top {
			line-height: 90upx;
		}

		.announ-content {
			border-radius: 10upx;
			box-sizing: border-box;

			.main-content {
				padding: 30upx 45upx 36upx 30upx;
				border-bottom: 1px solid #eee;
			}

			.announ-content-bot {
				line-height: 80upx;
				padding: 0 30upx;

				.cicle {
					width: 30upx;
					height: 30rpx;
					border-radius: 50%;
					border: 1px solid #999;
					margin-right: 21upx;
					transition: all .2s;
				}

				.cicle_active {
					width: 30upx;
					height: 30rpx;
					border-radius: 50%;
					background: #FF6868;
					border: none;
					margin-right: 21upx;
					transition: all .2s;
				}
			}

			.delete {
				color: #FF6868;
			}
		}
		.commbtn1{
			margin-top: 60upx;
		}
		.cancel{
			width: 250upx;
			line-height: 80upx;
			border: 1upx solid #CCCCCC;
			box-shadow: 0px 5upx 20upx 0px rgba(209, 108, 77, 0.2);
			border-radius: 10upx;
		}
		.delete1{
			width: 410upx;
			line-height: 80upx;
			background: linear-gradient(81deg, #6D99F8 0%, #3C66DF 100%);
			box-shadow: 0px 5upx 20upx 0px rgba(209, 108, 77, 0.2);
			border-radius: 10upx;
		}
	}
</style>
