<template>
	<view class="comm">
		<view class="flex flex_be class-top">
			<view class="flex flex-col">
				<text class="color333 bold font36 lh class-top-tit">商品管理</text>
				<text class="font26 lh color666">序号若相同，则最新添加商品优先显示</text>
			</view>
			<view class="colorfac font28" @tap="addClass(0)">添加商品</view>
		</view>
		<view class="class-box font28 color333 bfff">
			<view class="flex class-box-tit flex_be">
				<view>序号</view>
				<view>商品名称</view>
				<view class="text_cen">操作</view>
			</view>
			<view class="flex flex_be class-box-item flex_al-cen" v-for="(item,i) in GoodsList" :key="i">
				<view class="number text_cen">{{item.id}}</view>
				<view class="flex flex_al-cen flex_jus-cen" style="flex: 1;">
					<image :src="item.goods_image" mode="" class="goods_img"></image>
					<view style="width: 60%;text-align: center;">{{item.goods_name}}</view>
				</view>
				<view class="font24 colorfff text_cen flex">
					<view class="modify" @tap="addClass(item)">修改</view>
					<view class="delete" @tap="handDelete(item)">删除</view>
				</view>
			</view>
		</view>
		<refusepop v-if="isConcatPop" :deleteType='type' @updata='updata' >
			<view slot="poptitle">
				<view class="poptitle bold color333 font36">确认删除</view>
				<view class="color999 font500 font26">删除之后将不可恢复</view>
			</view>
		</refusepop>
		<uni-load-more :loadingType="loadingType" />
	</view>
</template>

<script>
	import refusepop from '@/components/refusePop/refusePop.vue'
	import UniLoadMore from "@/components/uni-load-more.vue";
	import {
		mapState,
	} from 'vuex';
	export default {
		components: {
			refusepop,
			UniLoadMore
		},
		data() {
			return {
				fiction: "",
				GoodsList: [], //商品管理数据
				type: "", //1为删除
				pages:1,
				loadingType:""
			}
		},
		computed: {
			...mapState({
				isConcatPop: (state) => state.isConcatPop,
				supplier_id: (state) => state.supplier_id, //商户id
				deleteGoods: (state) => state.deleteGoods,  //删除商品
				goods: (state) => state.goods, //修改商品
			}),
		},
		onShow() {
			this.GoodsList=[]
			this.getGoodsList();
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.pages = 1;
			this.GoodsList = []
			this.getGoodsList()
		},
		// 上拉加载
		onReachBottom() {
			this.pages++;
			this.getGoodsList()
		},
		methods: {
			updata(){
				uni.redirectTo({
					url:'GoodsMangent'
				});
			},
			addClass(item) {
				uni.navigateTo({
					url: "./AddGoods"
				})
				this.$store.commit("addgoods", item);
			},
			handDelete(item) { //删除商品
				this.type = 1
				this.$store.commit("showConcatPop", true);
				this.$store.commit("DeleteGoods", item);
			},
			getGoodsList() {
				let that = this;
				let params = {
					supplier_id: that.supplier_id,
					page: that.pages,
				}
				that.request.getdata('getGoodsList', params).then(res => {
					uni.stopPullDownRefresh();
					if(that.GoodsList.length<1){
						that.GoodsList = res.data
					}else{
						res.data.map((news) => {
							that.GoodsList.push(news);
						});
					}
					
					if (that.GoodsList.length == res.total) {
						that.loadingType = 2;
					} else {
						that.loadingType = 0;
					}
					console.log(res, '商品列表')
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.class-top {
		margin: 39upx 31upx;

		.class-top-tit {
			margin-bottom: 21upx;
		}
	}

	.class-box {
		border-radius: 10upx;
		width: 690upx;
		margin: 0 30upx;

		.number {
			width: 48upx;
			line-height: 48upx;
			border: 1px solid #EEEEEE;
			border-radius: 5upx;
			height: 48upx;
		}

		.class-box-item {
			padding: 0 30upx;
			margin-bottom: 30upx;
			padding-bottom: 40upx;

			.goods_img {
				width: 110upx;
				height: 80upx;
				border-radius: 10upx;
				// margin-right: 20upx;
			}
		}

		.class-box-tit {
			border-bottom: 1px solid #eee;
			padding: 40upx 30upx 30upx 30upx;
			margin-bottom: 30upx;

			>view {
				width: 33.3%;
			}
		}

		.modify,
		.delete {
			width: 80upx;
			height: 36upx;
			background: #5D82FF;
			border-radius: 18upx;
			line-height: 36upx;
		}

		.delete {
			background: #FF6868;
			margin-left: 20upx;
		}
	}
</style>
