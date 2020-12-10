<template>
	<view class="comm">
		<view class="announ">
			<view class="announ-top flex flex_be">
				<text class="bold font32 color333">公告</text>
				<text class="font26 colorfac" @tap="AllCement">全部公告</text>
			</view>
			<view class="bfff announ-content" v-for="(item,i) in supplierNewslist" :key="i" >
				<view class="main-content color333 font28">{{item.comment}}</view>
				<view class="font26 flex flex_be announ-content-bot">
					<view class="flex flex_al-cen"  @tap="isSelect(item)">
						<view  v-if="selectAll">
							<view class="text_cen" :class="[item.isdefult?'cicle_active':'cicle']"></view>
						</view>
						<text class="color999">{{item.add_time}}</text>
					</view>
					<text class="delete" @tap="delet(item)">删除</text>
				</view>
			</view>
			<view class="commbtn colorfff text_cen" v-if="selectAll==false" @tap="addNews">发布公告</view>
	<!-- 		<view class="flex text_cen colorfff font32 commbtn1" v-if="selectAll==true">
				<view class="cancel mr color666" @tap="handleAll">全选</view>
				<view class="delete1">删除</view>
			</view> -->
		</view> 
		<uni-load-more :loadingType="loadingType" />
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex';
	import UniLoadMore from "@/components/uni-load-more.vue"
	export default {
		components: {
			UniLoadMore,
		},
		data() {
			return {
				selectAll: false,
				loadingType:"",
				pages:1,
				supplierNewslist:[],
			}
		},
		computed: {
			...mapState({
				supplier_id: (state) => state.supplier_id, //商户id
			})
		},
		onLoad() {
		},
		onShow() {
			this.supplierNewslist=[]
			this.getsupplierNews()
		},
		// 上拉加载
		onReachBottom() {
			this.pages++;
			this.getOrderCenter()
		},
		methods: {
			getsupplierNews(){ //公告管理
				let that = this;
				let params = {
					supplier_id:that.supplier_id,
					page:that.pages,
				}
				that.request.getdata("getsupplierNews",params).then(res=>{
					console.log(res,'公告管理')
					if (that.supplierNewslist.length < 1) {
						
						for(let i =  0;i<res.data.length;i++){
							res.data[i].isdefult=false
						}
						that.supplierNewslist=res.data
					} else {
						res.data.map((news,i) => {
							res.data[i].isdefult=false
							that.supplierNewslist.push(news);
						});
					}
					if (that.supplierNewslist.length == res.total) {
						that.loadingType = 2;
					} else {
						that.loadingType = 0;
					}
				})
			},
			addNews(){//发布公告
				uni.navigateTo({
					url:'./addNews'
				})
			},
			delet(item){
				let params = {
					id: item.id,
				}
				this.request.getdata('getnewsDel', params).then(res => {
					console.log(res, '公告删除')
					setTimeout(function(){
						uni.showToast({
							title: '删除成功',
							icon: 'none',
							duration: 3000
						});
						
					},1000)
					this.supplierNewslist=[];
					this.getsupplierNews()
				})
			},
			AllCement() { //全部公告切换
				this.selectAll = !this.selectAll
			},
			isSelect(item) { //单选
				item.isdefult = !item.isdefult
				console.log(item.isdefult)			
			},
			handleAll(){//全选
				this.supplierNewslist.map((item,i)=>{
					item.isdefult=true
				})
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
			margin-bottom: 30rpx;

			.main-content {
				padding: 30upx 0 36upx 0;
				border-bottom: 1px solid #eee;
				line-height: 54upx;
				margin: 0 30upx;
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
					background: url(../../../static/img/g.png);
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
			border: 1px solid #CCCCCC;
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
