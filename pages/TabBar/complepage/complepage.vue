<template>
	<!-- 发单列表 -->
	<view class="comm">
		<view class="order-comp-box ml mr mt30 mb30 font28 bfff  color333" v-for="(item,i) in billOrderList" :key='i'>
			<view class="flex flex_be order-comp-tit">
				<view class="bold">订单编号：{{item.order_sn}}</view>
				<view class="colorfac">已完成</view>
			</view>
			<view class="flex flex_be order-comp-info">
				<view>订单名称</view>
				<view class="color666">{{item.goods_name}}</view>
			</view>
			<view class="flex flex_be order-comp-info">
				<view>下单时间</view>
				<view class="color666">{{item.pay_time}}</view>
			</view>
			<view class="flex flex_be order-comp-info">
				<view>送达时间</view>
				<view class="color666">{{item.shipping_time}}</view>
			</view>
			<view class="flex flex_be order-comp-info">
				<view>付款金额</view>
				<view class="color666">{{item.total_money}}</view>
			</view>
			<view class="flex flex_be order-comp-info">
				<view>预计收入</view>
				<view class="color666">{{item.yuji_money}}</view>
			</view>
			<view class="flex flex_be order-comp-info">
				<view>备注信息</view>
				<view class="color666">{{item.remarks?item.remarks:'无'}}</view>
			</view>
			<view class="flex flex_be">
				<view class="order-comp-btn flex flex_jus-cen text_cen" @tap="concatRider(item.postman_mobile)">
					<view class="iconfont icon-dianhua colorfac"></view>
					<view class="">联系骑手</view>
				</view>
				<view class="order-comp-btn flex text_cen flex_jus-cen" @tap="concatCustomers(item.user_mobile)">
					<view class="iconfont icon-dianhua colorfac"></view>
					<view class="">联系顾客</view>
				</view>
			</view>
		</view>
		<concatpop v-if="isRefusePop" :phone='1'></concatpop>
		<uni-load-more :loadingType="loadingType" />
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex';
	import UniLoadMore from "@/components/uni-load-more.vue"
	import concatpop from '@/components/ConcatPop/ConcatPop.vue'
	export default {
		components: {
			UniLoadMore,
			concatpop,
		},
		data() {
			return {
				pages:1,
				billOrderList:[],
				loadingType:""
			}
		},
		computed: {
			...mapState({
				supplier_id: (state) => state.supplier_id, //商户id
				isRefusePop:(state) => state.isRefusePop,
			})
		},
		onLoad() {
			this.billOrderList=[]
			this.getbillOrderList();
		},
		// 上拉加载
		onReachBottom() {
			this.pages++;
			this.getbillOrderList()
		},
		methods: {
			concatRider(tel){ //联系骑手
				if(tel == '骑手未接单'){
					console.log(1)
					uni.showToast({
						title: '骑手未接单',
						icon: 'none',
						duration: 3000
					});
				}else{
					this.$store.commit("showRefuse", true);
					console.log(2)
					 this.$store.commit("handTel", tel);
				}
					
			},
			concatCustomers(tel){//联系顾客
				this.$store.commit("showRefuse", true);
				this.$store.commit("handTel", tel);
			},
			getbillOrderList(){
				let that = this;
				let params = {
					id:that.supplier_id,
					page:this.pages,
				}
				that.request.getdata("getbillOrderList",params).then(res=>{
					console.log(res,'发单列表')
					if (that.billOrderList.length < 1) {
						that.billOrderList = res.data.dataList
					} else {
						res.data.dataList.map((news) => {
							that.billOrderList.push(news);
						});
					}
					if (that.billOrderList.length == res.data.total) {
						that.loadingType = 2;
					} else {
						that.loadingType = 0;
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.order-comp-box{
	border-radius: 10upx;
	padding: 0 30upx 20upx 30upx;
	.order-comp-tit{
		line-height: 86rpx;
		border-bottom: 1px solid #eee;
		margin-bottom: 26upx;
	}
	.order-comp-info{
		margin-bottom: 54upx;
	}
	.order-comp-btn{
		width: 300upx;
		line-height: 80upx;
		border: 1px solid #EEEEEE;
		box-shadow: 0px 5upx 20upx 0px rgba(209, 108, 77, 0.2);
		border-radius: 10upx;
	}
}
</style>
