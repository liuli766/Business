<template>
	<view class="comm">
		<view class="bfff flex assess-top font28 mb30">
			<text v-for="(item,i) in asscenterList" :key='i' :class="{'active-nav':i===asscenId}" @tap="handAssessNav(i)">
				<text>{{item.name}}</text>
				<text>{{item.val}}</text>
			</text>
		</view>
		<view class="bfff user-item " v-for="(item,i) in CommentList" :key='i' v-if="asscenId+1" @tap.stop="Closereplay">
			<view class="flex">
				<image :src="item.head_img" mode="" class="user-img"></image>
				<view class="flex flex-col">
					<text class="color333 font32 lh">{{item.user_name}}</text>
					<view class="flex">
						<image src="../../../static/img/xx.png" mode="" v-for="(val,k) in item.supplier_points" class="xx-img"></image>
					</view>
				</view>
				<view class="font26 color999 user-time">{{item.add_time}}</view>
			</view>
			<view class="color65 font28 user-info">
				{{item.comment}}
			</view>
			<view class="flex zhansi-box flex_be">
				<image :src="c" mode="" class="user-zhansi" v-for="(c,v) in item.images" :key='v'></image>
			</view>
			<view class="font28 reply" @tap.stop="handReply(item.id)">回复</view>
			<view class="replay-content font28 color666" v-if="item.comment_echo==null"></view>
			<view class="replay-content font28 color666" v-else>
				<text class="color333"> 商家回复：</text>{{item.comment_echo}}
			</view>
			<!-- 回复输入框 -->
			<view class="replay-bot" v-if="showreply==item.id" @click.stop.native="stop">
				<input type="text" class="font26" placeholder="在此输入你的回复" :focus="true" :value="content" @input.stop="Content" />
				<view class="font28 replay-bot-reply colorfff text_cen" @tap.stop="handSend(item.id)">回复</view>
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
	export default {
		components: {
			UniLoadMore
		},
		data() {
			return {
				asscenterList: [],
				asscenId: 0,
				showreply: "", //回复输入框
				replyContent: "", //回复内容
				content: "",
				pages: 1, //分页
				loadingType: "",
				CommentList: [], //商家评论列表
			}
		},
		computed: {
			...mapState({
				supplier_id: (state) => state.supplier_id, //商户id
			}),
		},
		onLoad() {
			this.CommentList = []
			this.getCommentList()
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.pages = 1;
			this.CommentList = []
			this.getCommentList()
		},
		// 上拉加载
		onReachBottom() {
			this.pages++;
			this.getCommentList()
		},
		methods: {
			stop() {},
			Content(e) {
				let val = e.detail.value
				this.content = val
			},
			getCommentList() { //商家评论列表
				let that = this;
				let params = {
					supplier_id: that.supplier_id,
					page: that.pages,
					type: that.asscenId + 1,
				}
				let arr = []
				that.request.getdata('getCommentList', params).then(res => {
					uni.stopPullDownRefresh();
					arr.push({
						name: '全部',
						val: res.data.total['all']
					})
					arr.push({
						name: '好评',
						val: res.data.total['good']
					})
					arr.push({
						name: '带图',
						val: res.data.total['img']
					})
					arr.push({
						name: '差评',
						val: res.data.total['bad']
					})
					this.asscenterList = arr.filter(function(value, index, self) {
						return self.indexOf(value) === index;
					});
					console.log(arr,this.asscenterList)
					console.log(res, '商家评论列表')
					if (that.CommentList.length < 1) {
						that.CommentList = res.data.commentList
					} else {
						res.data.commentList.map((news) => {
							that.CommentList.push(news);
						});
					}
					if (that.asscenId + 1 == 1) {
						if (that.CommentList.length == res.data.total.all) {
							that.loadingType = 2;
						} else {
							that.loadingType = 0;
						}
					} else if (that.asscenId + 1 == 2) {
						if (that.CommentList.length == res.data.total.good) {
							that.loadingType = 2;
						} else {
							that.loadingType = 0;
						}
					} else if (that.asscenId + 1 == 3) {
						if (that.CommentList.length == res.data.total.img) {
							that.loadingType = 2;
						} else {
							that.loadingType = 0;
						}
					} else if (that.asscenId + 1 == 4) {
						if (that.CommentList.length == res.data.total.bad) {
							that.loadingType = 2;
						} else {
							that.loadingType = 0;
						}
					}

				})
			},
			handAssessNav(i) {
				this.pages = 1
				this.CommentList = []
				this.asscenId = i
				this.getCommentList()
			},
			handReply(id) {
				this.showreply = id

			},
			handSend(id) {
				console.log(id)
				if (this.content == "") {
					uni.showToast({
						title: '不能发送空白内容',
						icon: 'none',
						duration: 3000
					});
					return;
				}
				let that = this;
				let params = {
					comment_id: id,
					text: that.content
				}
				that.request.getdata('getcommentEcho', params).then(res => {
					console.log(res, '回复评论')
					that.CommentList = []
					that.getCommentList();
					that.content = ""
				})
				this.showreply = false
			},
			Closereplay() {
				this.showreply = false
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
			margin-right: 10upx;
		}

		.user-time {
			flex: 1;
			text-align: right;
		}

		.user-info {
			line-height: 52upx;
			text-align: justify;
			margin: 21upx 0upx 33upx 100upx;
		}

		.zhansi-box {
			margin: 0 0upx 34upx 100upx;

			.user-zhansi {
				width: 182upx;
				height: 130upx;
				border-radius: 10upx;
			}
		}

		.reply {
			color: #FFAB67;
			flex: 1;
			text-align: right;
			margin-bottom: 10upx;
		}

		.replay-content {
			padding: 29upx 45upx 28upx 31upx;
			background: #F7F9FA;
		}
	}

	.replay-bot {
		width: 750upx;
		height: 98upx;
		background: #FFFFFF;
		box-shadow: -1upx -6upx 16upx 0px rgba(0, 0, 0, 0.06);
		position: fixed;
		bottom: 0;
		width: 100%;
		transition: all .2s;
		display: flex;
		left: 0;

		input {
			height: 98upx;
			padding-left: 30upx;
		}

		.replay-bot-reply {
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
	.none{
		display: none;
	}
</style>
