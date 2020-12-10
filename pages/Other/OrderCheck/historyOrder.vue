<template>
	<!-- 历史订单 -->
	<view class="comm">
		<view class="bfff historyorder font28 color333" v-for="(item,k) in orderHistoryList" :key='k'>
			<view class="tit mb30">订单编号：{{item.order_sn}}</view>
			<view class="flex flex_be info" v-for="(c,i) in item.goods_list" :key='i'>
				<view class="flex">
					<image :src="c.goods_image" mode=""></image>
					<view class="flex flex-col">
						<text>{{c.goods_name}}</text>
						<text  class="font26 color999" style="margin: 9upx 0;">{{c.goods_attr}}</text>
						<text class="font26 color999">x{{c.goods_number}}</text>
					</view>
				</view>
				<view >￥{{c.goods_price}}</view>
			</view>
			<view class="history_content">
				<view class="flex flex_be">
					<text>下单时间</text>
					<text>{{item.pay_time}}</text>
				</view>
				<view class="flex flex_be">
					<text>收货地址</text>
					<text>{{item.address}}</text>
				</view>
				<view class="flex flex_be">
					<text>配送员</text>
					<text>{{item.postman_name}}</text>
				</view>
			</view>
			<!--  -->
			<view class="flex font32 color333 juchi flex flex_al-cen">
				<image :src="item.head_img" mode="" class="head-img"></image>
				<text>{{item.user_name}}</text>
			</view>
		</view>
		<uni-load-more :loadingType="loadingType" />
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex';
	import UniLoadMore from "@/components/uni-load-more.vue"
	export default{
		components: {
			UniLoadMore
		},
		data(){
			return{
				page:1,//分页
				orderHistoryList:[],
				loadingType:""
			}
		},
		computed: {
			...mapState({
				supplier_id: (state) => state.supplier_id, //商户id
			}),
		},
		onLoad() {
			this.orderHistoryList=[]
			this.getorderHistory()
		},
		// 上拉加载
		onReachBottom() {
			this.page++;
			this.getorderHistory()
		},
		methods: {
			getorderHistory(){
				let that = this;
				let params = {
					id:that.supplier_id,
					page:that.page,
				}
				that.request.getdata("getorderHistory",params).then(res=>{
					console.log(res,'历史订单')
					if (that.orderHistoryList.length < 1) {
						that.orderHistoryList = res.data
					} else {
						res.data.map((news) => {
							that.orderHistoryList.push(news);
						});
					}
					if (that.orderHistoryList.length == res.total) {
						that.loadingType = 2;
					} else {
						that.loadingType = 0;
					}
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.historyorder{
		border-radius: 10upx;
		padding: 0 30upx;
		margin: 30upx;
		box-sizing: border-box;
		.tit{
			border-bottom: 1px solid #eee;
			line-height: 86upx;
		}
		.info{
			border-bottom: 1px solid #eee;
			margin-bottom: 46upx;
			padding-bottom: 30upx;
		}
		.history_content{
			border-bottom: 2px dashed #eee;
			padding-bottom: 14upx;
			>view{
				margin-bottom: 54upx;
			}
		}
		image{
			width: 110upx;
			height: 110upx;
			border-radius: 10px;
			margin-right: 20upx;
		}
		.head-img{
			width: 80upx;
			height: 80upx;
			border-radius: 50%;
			margin-right: 19upx;
		}
		.juchi{
			line-height: 140upx;
			position: relative;
		}
		.juchi::before{
			content: "";
			background: #F7F9FA;
			width: 20upx;
			height: 32upx;
			border-radius: 0 100% 100% 0;//左上--右上--右下--左下
			display: block;
			border-left: none;
			position: absolute;
			top:-13%;
			left: -15px;
		}
		.juchi::after{
			content: "";
			background: #F7F9FA;
			width: 20upx;
			height: 32upx;
			border-radius: 100% 0 0 100%;//左上--右上--右下--左下
			display: block;
			border-left: none;
			position: absolute;
			top:-13%;
			right: -15px;
		}
	}
</style>
