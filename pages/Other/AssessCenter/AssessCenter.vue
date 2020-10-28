<template>
	<view class="comm">
		<view class="bfff flex assess-top font28 mb30">
			<text v-for="(item,i) in asscenterList" :key='i' :class="{'active-nav':i===asscenId}" @tap="handAssessNav(i)">{{item}}</text>
		</view>
		<view class="bfff user-item ">
			<view class="flex">
				<image src="../../../static/img/pltu.png" mode="" class="user-img"></image>
				<view class="flex flex-col">
					<text class="color333 font32 lh">我是一名小保安</text>
					<image src="../../../static/img/xx.png" mode="" class="xx-img"></image>
				</view>
				<view class="font26 color999 user-time">2020-09-22</view>
			</view>
			<view class="color65 font28 user-info">
				蛋糕挺好看的的，送的准时，我是提前一晚上订的，第二天中午送过来的。感觉不太卫生，没有特别好，也没有特别差，体验感一般吧！
			</view>
			<view class="flex zhansi-box flex_be">
				<image src="../../../static/img/pltu.png" mode="" class="user-zhansi" v-for="(c,v) in 3" :key='v'></image>
			</view>
			<view class="font28 reply" @tap="handReply">回复</view>
			<view class="replay-content font28 color666">
				<text class="color333"> 商家回复：</text>{{replyContent}}
			</view>
		</view>
		<!-- 回复输入框 -->
		<view class="replay-bot" v-if="showreply">
			<input type="text" class="font26" placeholder="在此输入你的回复" v-model="content"/>
			<view class="font28 replay-bot-reply colorfff text_cen" @tap="handSend">回复</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				asscenterList: ['全部(1456)', '好评(874)', '带图(528)', '差评(28)'],
				asscenId: 0,
				showreply:false,//回复输入框
				replyContent:'',//回复内容
				content:''
			}
		},
		methods: {
			handAssessNav(i) {
				this.asscenId = i
			},
			handReply(){
				this.showreply=true
			},
			handSend(){
				this.showreply=false
				this.replyContent=this.content
			}
		}
	}
</script>

<style lang="scss" scoped>
	.assess-top {
		flex-wrap: wrap;
		color: #656565;
		padding: 30upx;
		padding-bottom: 0;

		>text {
			padding: 15upx 25upx;
			border: 1px solid #656565;
			border-radius: 29px;
			margin-right: 40upx;
			margin-bottom: 30upx;
		}

		.active-nav {
			color: #5D81FF;
			border: 1px solid #5D81FF;
			transition: all .2s;
		}
	}

	.user-item {
		padding: 21upx 30upx 30upx 30upx;

		.user-img {
			width: 80upx;
			height: 80upx;
			border-radius: 50%;
			margin-right: 19upx;
		}

		.xx-img {
			width: 24upx;
			height: 24upx;
			margin-top: 21upx;
		}

		.user-time {
			flex: 1;
			text-align: right;
		}
		.user-info{
			line-height: 52upx;
			text-align: justify;
			margin: 21upx 0upx 33upx 100upx;
		}
		.zhansi-box{
			margin: 0 0upx 34upx 100upx;
			.user-zhansi{
				width: 182upx;
				height: 130upx;
				border-radius: 10upx;
			}
		}
		.reply{
			color: #FFAB67;
			flex: 1;
			text-align: right;
		}
		.replay-content{
			padding: 29upx 45upx 28upx 31upx;
			background: #F7F9FA;
		}
	}
	.replay-bot{
		width: 750upx;
		height: 98upx;
		background: #FFFFFF;
		box-shadow: -1upx -6upx 16upx 0px rgba(0, 0, 0, 0.06);
		position: fixed;
		bottom: 0;
		width: 100%;
		transition: all .2s;
		input{
			height: 98upx;
			padding-left: 30upx;
		}
		.replay-bot-reply{
			width: 103upx;
			background: #5D81FF;
			border-radius: 4upx;
			line-height: 50upx;
			position: absolute;
			top: 24upx;
			right: 30upx;
			z-index: 9;
		}
	}
</style>
