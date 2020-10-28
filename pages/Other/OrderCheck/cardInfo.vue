<template>
	<view class="cardinfo comm">
		<view class="flex flex_be list-item mt30 mb30">
			<text>开户行</text>
			<text>中国银行</text>
			<view class="card-meun">
				<view class="sjx"></view>
				<view class="down-meun text_cen">
					<view class="font500 font28 color333" v-for="(item,i) in Carditem" :key='i'>{{item}}</view>
				</view>
			</view>
		</view>
		<view class="font30 font500 color333 mb30">
			<view class="flex flex_be flex_al-cen list-item list-line">
				<text>开户人姓名</text>
				<input type="text" value="王小二" />
			</view>
			<view class="flex flex_be flex_al-cen list-item list-line">
				<text>开户行支行</text>
				<input type="text" placeholder="填写开户行支行" />
			</view>
			<view class="flex flex_be flex_al-cen list-item list-line">
				<text>银行卡号</text>
				<input type="text" placeholder="填写银行卡号" />
			</view>
			<view class="flex flex_be flex_al-cen list-item list-line">
				<text>手机号码</text>
				<input type="text" placeholder="银行预留手机号" />
			</view>
		</view>
		<view>
			<view class="flex flex_be list-item list-line">
				<text>获取验证码</text>
				<text class="code">获取验证码</text>
			</view>
			<view class="flex flex_be list-item flex_al-cen">
				<text>输入验证码</text>
				<input type="text" placeholder="输入验证码" />
			</view>
		</view>
		<view class="btn font32 font500 colorfff text_cen">确定修改</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Carditem:['工商银行','建设银行','招商银行']
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.cardinfo{
		.list-item{
				height: 88upx;
				background: #fff;
				line-height: 88upx;
				padding: 0 30upx;
			}
		.list-line{
			border-bottom: 1px solid #F7F9FA;
		}
		input{
			text-align: right;
		}
		.code{
			color: #FFAC68;
		}
		.card-meun{
			position: absolute;
			top: 0;
			right: 0;
		}
		.down-meun{
			width: 300upx;
			height: 400upx;
			overflow: auto;
			background: #fff;
			position: absolute;
			right: 30upx;
			box-shadow: 0px 5upx 10upx 0px rgba(0, 0, 0, 0.05);
			border-radius: 10upx;
			z-index: 9;
			top: 130upx;
		}
		.sjx{
			width: 0;
			height: 0;
			border: 22upx solid transparent;
			border-bottom-color:#fff ;
			position: absolute;
			right: 60upx;
			top: 90upx;
		}
		.btn{
			width: 690upx;
			height: 80upx;
			background: linear-gradient(81deg, #6D99F8 0%, #3C66DF 100%);
			box-shadow: 0px 5upx 20upx 0px rgba(209, 108, 77, 0.2);
			border-radius: 10upx;
			line-height: 80upx;
			margin: 80upx 30upx 0  30upx;
		}
	}	

</style>
