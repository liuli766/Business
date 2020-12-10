<template>
	<view class="home comm">
		<scroll-view id="tab-bar" class="tab-bar" :scroll="false" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
			<view class="flex flex_al-cen flex_ar" style="padding-top: 30upx;padding-bottom: 22upx;">
				<view class="uni-tab-item" v-for="(tab,index) in homenavList" :key="tab.id" :id="tab.id" :ref="'tabitem'+index"
				 :data-id="index" :data-current="index" @click="ontabtap">
					<text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' :''">{{tab.name}}</text>
				</view>
			</view>
		</scroll-view>
						<view class="component" style="padding-top: 80upx;">
							<!-- 催单 -->
							<view class="page-item" v-if='tabIndex===4'>
								<view v-if="orderList.length!==0">
									<listitem class="pageitem" v-for="(list,i) in orderList" :key="i" :productitem='list' @tap="GoreceiveDetail(list,'催单中')">
										<view class="order-title flex flex_be flex_al-cen" slot='ordernum'>
											<text class="color333 font28">订单编号：{{list.order_sn}}</text>
											<text class="colorfac font28">催单中</text>
										</view>
										<view class="flex flex_be flex_al-cen order-bot" slot="orderbot">
											<view class="colorff5 font22">
												￥<text class="font36">{{list.total_money}}</text>
											</view>
											<view class="handbtn font32 colorfff text_cen" @tap.stop="handps(list,2)">处理</view>
										</view>
									</listitem>
								</view>
								<!-- <view v-else class="flex flex_jus-cen flex_al-cen font26 color666">-没有更多数据拉(*^_^*)-</view> -->
							</view>
							<!-- 待接单 -->
							<view class="page-item" v-if='tabIndex===0'>
								<view v-if="orderList.length!==0">
									<listitem class="pageitem" v-for="(list,i) in orderList" :key="i" :productitem='list' @tap="GoreceiveDetail(list,'待接单')">
										<view class="order-title flex flex_be flex_al-cen" slot='ordernum'>
											<text class="color333 font28">订单编号：{{list.order_sn}}</text>
											<text class="colorfac font28">待接单</text>
										</view>
										<view class="flex flex_be flex_al-cen order-bot" slot="orderbot">
											<view class="colorff5 font22">
												￥<text class="font36">{{list.total_money}}</text>
											</view>
											<view class="flex">
												<view class="refusebtn mr font32 color999 text_cen" @tap.stop="handRefuse(list)">拒绝</view>
												<view class="handbtn font32 colorfff text_cen" @tap.stop="Receorder(list)">接单</view>
											</view>
										</view>
									</listitem>
								</view>
								<!-- <view v-else class="flex flex_jus-cen flex_al-cen font26 color666">-没有更多数据拉(*^_^*)-</view> -->
							</view>
							<!-- 待配送 -->
							<view class="page-item" v-if='tabIndex===1'>
								<view v-if="orderList.length!==0">
									<listitem class="pageitem" v-for="(list,i) in orderList" :key="i" :productitem='list' @tap="GoreceiveDetail(list,'待配送')">
										<view class="order-title flex flex_be flex_al-cen" slot='ordernum'>
											<text class="color333 font28">订单编号：{{list.order_sn}}</text>
											<text class="colorfac font28">待配送</text>
										</view>
										<view class="flex flex_be flex_al-cen order-bot" slot="orderbot">
											<view class="colorff5 font22">
												￥<text class="font36">{{list.total_money}}</text>
											</view>
											<view class="handbtn font32 colorfff text_cen" @tap.stop="handps(list,1)">配送</view>
										</view>
									</listitem>
								</view>
								<!-- <view v-else class="flex flex_jus-cen flex_al-cen font26 color666">-没有更多数据拉(*^_^*)-</view> -->
							</view>
							<!-- 配送中 -->
							<view class="page-item" v-if='tabIndex===2'>
								<view v-if="orderList.length!==0">
									<listitem class="pageitem" v-for="(list,i) in orderList" :key="i" :productitem='list' @tap="GoreceiveDetail(list,'配送中')">
										<view class="order-title flex flex_be flex_al-cen" slot='ordernum'>
											<text class="color333 font28">订单编号：{{list.order_sn}}</text>
											<text class="colorfac font28">配送中</text>
										</view>
										<view class="flex flex_be flex_al-cen order-bot" slot="orderbot">
											<view class="colorff5 font22">
												￥<text class="font36">{{list.total_money}}</text>
											</view>
											<!-- <view class="handbtn font32 colorfff text_cen">配送中</view> -->
										</view>
									</listitem>
								</view>
							</view>
							<!-- 待自提 -->
							<view class="page-item" v-if='tabIndex===3'>
								<view v-if="orderList.length!==0">
									<listitem class="pageitem" v-for="(list,i) in orderList" :key="i" :productitem='list' @tap="GoreceiveDetail(list,'待自提')">
										<view class="order-title flex flex_be flex_al-cen" slot='ordernum'>
											<text class="color333 font28">订单编号：{{list.order_sn}}</text>
											<text class="colorfac font28">待自提</text>
										</view>
										<view class="flex flex_be flex_al-cen order-bot" slot="orderbot">
											<view class="colorff5 font22">
												￥<text class="font36">{{list.total_money}}</text>
											</view>
											<view class="handbtn font32 colorfff text_cen" @tap.stop="handps(list,3)">确认自取</view>
										</view>
									</listitem>
								</view>
								<!-- <view v-else class="flex flex_jus-cen flex_al-cen font26 color666">-没有更多数据拉(*^_^*)-</view> -->
							</view>
							<!-- 退款 -->
							<view class="page-item" v-if='tabIndex===5'>
								<view v-if="orderList.length!==0">
									<listitem class="pageitem" v-for="(list,i) in orderList" :key="i" :productitem='list' @tap="GoreceiveDetail(list,'退款中')">
										<view class="order-title flex flex_be flex_al-cen" slot='ordernum'>
											<text class="color333 font28">订单编号：{{list.order_sn}}</text>
											<text class="colorfac font28">退款中</text>
										</view>
										<view class="flex flex_be flex_al-cen order-bot" slot="orderbot">
											<view class="colorff5 font22">
												￥<text class="font36">{{list.total_money}}</text>
											</view>
											<view class="handbtn font32 colorfff text_cen" @tap.stop="handps(list,4)">退款</view>
										</view>
									</listitem>
								</view>
								<!-- <view v-else class="flex flex_jus-cen flex_al-cen font26 color666">-没有更多数据拉(*^_^*)-</view> -->
							</view>
							<!-- 预订单 -->
							<view class="page-item" v-if='tabIndex===6'>
								<view v-if="orderList.length!==0">
									<listitem class="pageitem" v-for="(list,i) in orderList" :key="i" :productitem='list' @tap="GoreceiveDetail(list,'待配送')">
										<view class="order-title flex flex_be flex_al-cen" slot='ordernum'>
											<text class="color333 font28">订单编号：{{list.order_sn}}</text>
											<text class="colorfac font28">待配送</text>
										</view>
										<view class="flex flex_be flex_al-cen order-bot" slot="orderbot">
											<view class="colorff5 font22">
												￥<text class="font36">{{list.total_money}}</text>
											</view>
											<view class="handbtn font32 colorfff text_cen" @tap.stop="handps(list,1)">配送</view>
										</view>
									</listitem>
								</view>
								<!-- <view v-else class="flex flex_jus-cen flex_al-cen font26 color666">-没有更多数据拉(*^_^*)-</view> -->
							</view>
							<!-- 进行中 -->
						</view>
		<!-- 抢单弹框 -->
		<Pop>
			<view class="color3434 bold font36 successtxt" slot="successtxt">接单成功</view>
			<view class="color9a9a font26" slot="subtet">记得准时出货哦</view>
			<view class="btnpop font32 text_cen colorfff" slot='btnpop' @tap="hanKnow">知道了</view>
		</Pop>
		<!-- 拒绝弹框 -->
		<refusepop v-if="isConcatPop" :deleteType=4>
			<view slot="poptitle">
				<view class="poptitle bold color333 font36">确认拒绝</view>
				<view class="color999 font500 font26">拒绝后订单将被退回</view>
			</view>
		</refusepop>
		<!-- 联系一键拨号弹框 -->
		<concatpop v-if="isRefusePop"></concatpop>
		<uni-load-more :loadingType="loadingType" />
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex';
	import listitem from '@/components/listItem/listItem.vue'
	import Pop from '@/components/PopBox/PopBox.vue'
	import refusepop from '@/components/refusePop/refusePop.vue'
	import concatpop from '@/components/ConcatPop/ConcatPop.vue'
	import UniLoadMore from "@/components/uni-load-more.vue"
	export default {
		components: {
			listitem,
			Pop,
			refusepop,
			concatpop,
			UniLoadMore
		},
		computed: {
			...mapState({
				isPop: (state) => state.isPop,
				isConcatPop: (state) => state.isConcatPop,
				isRefusePop: (state) => state.isRefusePop,
				supplier_id: (state) => state.supplier_id, //商户id
				refuseOrder: (state) => state.refuseOrder, //拒接接单
			}),
			
		},
		data() {
			return {
				homenavList: [{
						id: "tab01",
						name: '待接单',
						newsid: 0
					},
					{
						id: "tab02",
						name: '待配送',
						newsid: 1
					},
					{
						id: "tab02",
						name: '配送中',
						newsid: 2
					},
					{
						id: "tab03",
						name: '待自提',
						newsid: 3
					},
					{
						id: "tab04",
						name: '催单',
						newsid: 4
					},
					{
						id: "tab05",
						name: '退款',
						newsid: 5
					},
					{
						id: "tab06",
						name: '预订单',
						newsid: 6
					},
				],
				tabIndex: 0,
				scrollInto: "",
				indicatorLineLeft: 64,
				isTap: false,
				orderList: [], //订单列表数据
				pages:1,
				loadingType: "",
			}
		},
		onLoad() {
			this.orderList=[]
			this.getOrderCenter()
			if (!this.supplier_id) {
				uni.switchTab({
					url: '../../register/register',
				})
			}
			console.log(this.supplier_id)
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.pages = 1;
			this.orderList = []
			this.getOrderCenter()
		},
		// 上拉加载
		onReachBottom() {
			this.pages++;
			this.getOrderCenter()
		},
		methods: {
			getOrderCenter() { //获取订单列表
				console.log('???')
				let that = this;
				let params = {
					id: that.supplier_id,
					type:that.tabIndex+1,
					page: that.pages,
				}
				that.request.getdata('getOrderList', params).then(res => {
					// this.orderList = res.data.orderList
					console.log(res, '订单列表')
					uni.stopPullDownRefresh();
					console.log(res, '订单列表')
					
					if (that.orderList.length < 1) {
						console.log('23232')
						that.orderList = res.data.orderList
					} else {
						console.log('6888877')
						res.data.orderList.map((news) => {
							that.orderList.push(news);
						});
					}
					if (that.orderList.length == res.data.total) {
						that.loadingType = 2;
					} else {
						that.loadingType = 0;
					}
				})
			},
			ontabtap(e) {
				let index = e.currentTarget.dataset.id;
				this.tabIndex = index
				const query = uni.createSelectorQuery().in(this);
				query.select('.uni-tab-item-title-active').boundingClientRect(data => {
					console.log(data);
					var offsetX = data.left
					var offsetXEl = data.right
					var lineL = (2 * (offsetXEl) - (1.5 * (offsetXEl - offsetX)))
				}).exec();
				this.pages = 1;
				this.orderList = [];
				this.getOrderCenter()
			},
			animationfinish(e) {
				let index = e.detail.current;
				this.tabIndex = index
			},
			GoreceiveDetail(item, text) { //订单详情
				uni.navigateTo({
					url: `../../Detail/receiveDetail/receiveDetail?order_id=${item.id}&text=${text}`
				});
			},
			Receorder(item) { //接单
				let that = this;
				let params = {
					order_id: item.id,
					supplier_id: this.supplier_id,
					type: 1, //2:拒绝接单 1:接单
				}
				that.request.getdata('getOrderTaking', params).then(res => {
					that.$store.commit("showPop", true);
					console.log(res, '接单')
					this.pages = 1;
					that.orderList = [];
					console.log(that.orderList);
					that.getOrderCenter()
				})
			},

			handRefuse(item) { //拒接接单
				this.$store.commit("showConcatPop", true);
				this.$store.commit("CancleOrder", item);
			},

			hanKnow() {
				this.$store.commit("showPop", false);
				this.pages=1;
				this.orderList=[]
				this.getOrderCenter()
			},
			handps(item,num) { //1=配送2=催单3=自取确认4=退款
				// this.$store.commit("handTel", item.supplier_tel);
				// this.$store.commit("showRefuse", true);
				
				let that = this;
				let params = {
					order_id: item.id,
					supplier_id: that.supplier_id,
					type: num,
				}
				that.request.getdata('getorderSend', params).then(res => {
					console.log(res, '配送')
					setTimeout(function(){
						{
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 3000
							});
						}
					},3000)
					this.pages = 1;
					that.orderList = [];
					console.log(that.orderList);
					this.getOrderCenter()
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.tab-bar {
		width: 750upx;
		white-space: nowrap;
		background: #fff;
		position: fixed;
		top: 0;
		z-index: 999;

		.uni-tab-item {
			font: 500 28upx/1 'PingFang SC';
			color: #666;
		}

		.uni-tab-item-title-active {
			font: bold 32upx/1 'PingFang SC';
			color: #343434;
			padding-bottom: 28upx;
			position: relative;
			transition: all 0.1s;
		}

		.uni-tab-item-title-active:after {
			content: "";
			position: absolute;
			left: 50%;
			bottom: 8upx;
			width: 50upx;
			border-radius: 3px;
			padding: 6upx;
			background: #5E82FF;
			margin-left: -27upx;
		}

		.scroll-view-indicator {
			position: relative;
			height: 6upx;
			background-color: transparent;
			margin-top: 28upx;
		}

		.scroll-view-underline {
			position: absolute;
			top: 0;
			bottom: 0;
			width: 50upx;
			background-color: #5E82FF;
		}
	}

	.tab-bar ::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}

	/deep/ wx-swiper .wx-swiper-wrapper {
		overflow: visible;
	}

	/deep/ .swiper-item {
		overflow: visible !important;
	}

	/deep/ wx-swiper {
		height: auto;
	}

	.page-item {
		margin: 30upx;
	}

	.pageitem {
		margin-bottom: 30upx;
	}

	.successtxt {
		margin: 42upx 0 20upx 0;
	}

	.order-title {
		border-bottom: 1px solid #EEEEEE;
		padding-bottom: 30upx;
	}

	.order-bot {
		padding: 30upx 0 0 0;
		box-sizing: border-box;

		.colorff5 {
			color: #FF5D5D;
		}

		.handbtn,
		.refusebtn {
			width: 200upx;
			height: 60upx;
			background: linear-gradient(81deg, #6D99F8 0%, #3C66DF 100%);
			box-shadow: 0px 5upx 20upx 0px rgba(209, 108, 77, 0.2);
			border-radius: 30upx;
			line-height: 60upx;
		}

		.refusebtn {
			border: 1px solid #CCCCCC;
			box-shadow: 0px 5upx 20upx 0px rgba(209, 108, 77, 0.2);
			background: #fff;
		}
	}
</style>
