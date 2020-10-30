<template>
	<view class="home comm">
		<scroll-view id="tab-bar" class="tab-bar" :scroll="false" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
			<view class="flex flex_al-cen flex_ar" style="padding-top: 30upx;padding-bottom: 22upx;">
				<view class="uni-tab-item" v-for="(tab,index) in homenavList" :key="tab.id" :id="tab.id" :ref="'tabitem'+index"
				 :data-id="index" :data-current="index" @click="ontabtap">
					<text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
				</view>
			</view>
		</scroll-view>
		<swiper class="tab-box" ref="swiper1" :current="tabIndex" :duration="100" @change="onswiperchange" @animationfinish="animationfinish"
		 style="margin-top: 88rpx;">
			<swiper-item class="swiper-item" v-for="(page, index) in homenavList" :key="index">
				<scroll-view scroll-y>
					<block>
						<view class="component">
							<!-- 催单 -->
							<view class="page-item">
								<listitem class="pageitem" v-for="(list,i) in jDlist" :key="i" v-if='tabIndex===3'
								:productitem='list'
								 @tap="GoreminDetail">
									<view class="order-title flex flex_be flex_al-cen" slot='ordernum'>
										<text class="color333 font28">订单编号：{{list.bianhao}}</text>
										<text class="colorfac font28">催单中</text>
									</view>
									<view class="flex flex_be flex_al-cen order-bot" slot="orderbot">
										<view class="colorff5 font22">
											￥<text class="font36">{{list.total}}</text>
										</view>
										<view class="handbtn font32 colorfff text_cen">处理</view>
									</view>
								</listitem>
							</view>
							<!-- 待接单 -->
							<view class="page-item">
								<listitem class="pageitem" v-for="(list,i) in jDlist" :key="i" v-if='tabIndex===0' 
								:productitem='list'
								@tap="GoreceiveDetail(list)">
									<view class="order-title flex flex_be flex_al-cen" slot='ordernum'>
										<text class="color333 font28">订单编号：D20200921152114</text>
										<text class="colorfac font28">待接单</text>
									</view>
									<view class="flex flex_be flex_al-cen order-bot" slot="orderbot">
										<view class="colorff5 font22">
											￥<text class="font36">31.00</text>
										</view>
										<view class="flex">
											<view class="refusebtn mr font32 color999 text_cen" @tap.stop="handRefuse">拒绝</view>
											<view class="handbtn font32 colorfff text_cen" @tap.stop="Receorder">接单</view>
										</view>

									</view>
								</listitem>
							</view>
							<!-- 待配送 -->
							<view class="page-item">
								<listitem class="pageitem" v-for="(list,i) in jDlist" :key="i" v-if='tabIndex===1' 
								:productitem='list'
								@tap="GodeliveDetail">
									<view class="order-title flex flex_be flex_al-cen" slot='ordernum'>
										<text class="color333 font28">订单编号：D20200921152114</text>
										<text class="colorfac font28">待配送</text>
									</view>
									<view class="flex flex_be flex_al-cen order-bot" slot="orderbot">
										<view class="colorff5 font22">
											￥<text class="font36">31.00</text>
										</view>
										<view class="handbtn font32 colorfff text_cen" @tap.stop="handps">配送</view>
									</view>
								</listitem>
							</view>
							<!-- 待自提 -->
							<view class="page-item">
								<listitem class="pageitem" v-for="(list,i) in jDlist" :key="i" v-if='tabIndex===2' 
								:productitem='list'
								@tap="GoraiseDetail">
									<view class="order-title flex flex_be flex_al-cen" slot='ordernum'>
										<text class="color333 font28">订单编号：D20200921152114</text>
										<text class="colorfac font28">待自提</text>
									</view>
									<view class="flex flex_be flex_al-cen order-bot" slot="orderbot">
										<view class="colorff5 font22">
											￥<text class="font36">31.00</text>
										</view>
										<view class="handbtn font32 colorfff text_cen">扫码核销</view>
									</view>
								</listitem>
							</view>
							<!-- 退款 -->
							<view class="page-item">
								<listitem class="pageitem" v-for="(list,i) in 3" :key="i" v-if='tabIndex===4' 
								:productitem='list'
								@tap="GoRefundDetails">
									<view class="order-title flex flex_be flex_al-cen" slot='ordernum'>
										<text class="color333 font28">订单编号：D20200921152114</text>
										<text class="colorfac font28">退款中</text>
									</view>
									<view class="flex flex_be flex_al-cen order-bot" slot="orderbot">
										<view class="colorff5 font22">
											￥<text class="font36">31.00</text>
										</view>
										<view class="handbtn font32 colorfff text_cen">退款</view>
									</view>
								</listitem>
							</view>
							<!-- 预订单 -->
							<view class="page-item">
								<listitem class="pageitem" v-for="(list,i) in 3" :key="i" v-if='tabIndex===5' 
								:productitem='list'
								@tap="GovoucherDetail">
									<view class="order-title flex flex_be flex_al-cen" slot='ordernum'>
										<text class="color333 font28">订单编号：D20200921152114</text>
										<text class="colorfac font28">待配送</text>
									</view>
									<view class="flex flex_be flex_al-cen order-bot" slot="orderbot">
										<view class="colorff5 font22">
											￥<text class="font36">31.00</text>
										</view>
										<view class="handbtn font32 colorfff text_cen">配送</view>
									</view>
								</listitem>
							</view>
						</view>
					</block>
				</scroll-view>
			</swiper-item>
		</swiper>
		<Pop>
			<view class="color3434 bold font36 successtxt" slot="successtxt">接单成功</view>
			<view class="color9a9a font26" slot="subtet">记得准时出货哦</view>
			<view class="btnpop font32 text_cen colorfff" slot='btnpop' @tap="hanKnow">知道了</view>
		</Pop>
		<refusepop v-if="isConcatPop">
			<view slot="poptitle">
				<view class="poptitle bold color333 font36">确认拒绝</view>
				<view class="color999 font500 font26">拒绝后订单将被退回</view>
			</view>
		</refusepop>
		<concatpop v-if="isRefusePop"></concatpop>
	</view>
</template>

<script>
	import listitem from '@/components/listItem/listItem.vue'
	import Pop from '@/components/PopBox/PopBox.vue'
	import refusepop from '@/components/refusePop/refusePop.vue'
	import concatpop from '@/components/ConcatPop/ConcatPop.vue'
	import {
		mapState,
	} from 'vuex';
	export default {
		components: {
			listitem,
			Pop,
			refusepop,
			concatpop
		},
		computed: {
			...mapState({
				isPop: (state) => state.isPop,
				isConcatPop: (state) => state.isConcatPop,
				isRefusePop: (state) => state.isRefusePop,
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
						id: "tab03",
						name: '待自提',
						newsid: 2
					},
					{
						id: "tab04",
						name: '催单',
						newsid: 3
					},
					{
						id: "tab05",
						name: '退款',
						newsid: 4
					},
					{
						id: "tab06",
						name: '预订单',
						newsid: 5
					},
				],
				tabIndex: 0,
				scrollInto: '',
				indicatorLineLeft: 64,
				isTap: false,
				jDlist:[
					{
						bianhao:'D20200921152114',
						name:'单人试吃套餐二',
						name1:'百事可乐(冰)',
						num:1,
						img:require('../../../static/img/pltu.png'),
						price:28,
						dbfei:5,
						total:31
					},
					{
						bianhao:'D20200921152114',
						name:'单人试吃套餐san',
						name1:'百事可乐(冰)',
						num:1,
						img:require('../../../static/img/pltu.png'),
						price:28,
						dbfei:5,
						total:31
					}
				]
			}
		},
		methods: {
			ontabtap(e) {
				let index = e.currentTarget.dataset.id;
				this.tabIndex = index
				const query = uni.createSelectorQuery().in(this);
				query.select('.uni-tab-item-title-active').boundingClientRect(data => {
					console.log(data);
					var offsetX = data.left
					var offsetXEl = data.right
					var lineL = (2 * (offsetXEl) - (1.5 * (offsetXEl - offsetX)))
					// this.updateIndicator(lineL);
				}).exec();
			},
			onswiperchange(e) {
				let index = e.detail.current;
				this.tabIndex = index
				this.scrollInto = this.homenavList[index].id
			},
			animationfinish(e) {
				let index = e.detail.current;
				this.tabIndex = index
			},
			GoreminDetail() {
				uni.navigateTo({
					url: '../../Detail/reminDetail/reminDetail'
				});
			},
			GoreceiveDetail(item) {
				uni.navigateTo({
					url: '../../Detail/receiveDetail/receiveDetail?item='+encodeURIComponent(JSON.stringify(item))
				});
			},
			GodeliveDetail() {
				uni.navigateTo({
					url: '../../Detail/delivereDetail/delivereDetail'
				});
			},
			GoraiseDetail() {
				uni.navigateTo({
					url: '../../Detail/raiseDetail/raiseDetail'
				});
			},
			GoRefundDetails() {
				uni.navigateTo({
					url: '../../Detail/RefundDetails'
				})
			},
			GovoucherDetail() {
				uni.navigateTo({
					url: '../../Detail/voucherDetail'
				})
			},
			Receorder() {
				this.$store.commit("showPop", true);
			},
			hanKnow() {
				this.$store.commit("showPop", false);
			},
			handRefuse() {
				this.$store.commit("showConcatPop", true);
			},
			handps() {
				this.$store.commit("showRefuse", true);
			}
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

	.component {
		margin-bottom: 200upx;
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
