<template>
	<view class="comm">
		<view class="flex flex_be class-top">
			<view class="flex flex-col">
				<text class="color333 bold font36 lh class-top-tit">商品分类</text>
				<text class="font26 lh color666">店铺菜单根据以下设置排序显示</text>
			</view>
			<view class="colorfac font28" @tap="addClass">添加分类</view>
		</view>
		<view class="class-box font28 color333 bfff">
			<view class="flex class-box-tit flex_be">
				<view>序号</view>
				<view>分类名称</view>
				<view class="text_cen">操作</view>
			</view>
			<view class="flex flex_be class-box-item" v-for="(item,i) in 3" :key="i">
				<view class="number text_cen">1</view>
				<view>分类一</view>
				<view class="font24 colorfff text_cen flex">
					<view class="modify" @tap="updateClass">修改</view>
					<view class="delete" @tap="handDelete">删除</view>
				</view>
			</view>
		</view>
		<plug-pop v-if="ispulgPop">
			<view class="poptitle bold color333 font36" slot="fenlei">{{fiction}}</view>
			<view slot='comminp'>
				<input class="inp" placeholder="填写序号" placeholder-style='color:#999;font-size:26upx;text-align: left;' />
				<input class="inp" placeholder="填写分类名称" placeholder-style='color:#999;font-size:26upx; text-align: left;' />
				<input class="inp" placeholder="填写规格类别，以英文逗号隔开" placeholder-style='color:#999;font-size:26upx; text-align: left;' />
			</view>
		</plug-pop>
		<refusepop v-if="isConcatPop">
			<view slot="poptitle">
				<view class="poptitle bold color333 font36">确认删除</view>
				<view class="color999 font500 font26">删除之后将不可恢复</view>
			</view>
		</refusepop>
	</view>
</template>

<script>
	import plugPop from '@/components/plugPop.vue'
	import refusepop from '@/components/refusePop/refusePop.vue'
	import {
		mapState,
	} from 'vuex';
	export default {
		components: {
			plugPop,
			refusepop,
		},
		data() {
			return {
				fiction: ''
			}
		},
		computed: {
			...mapState({
				ispulgPop: (state) => state.ispulgPop,
				isConcatPop: (state) => state.isConcatPop
			}),
		},

		methods: {
			addClass() {
				this.fiction = '添加分类'
				this.$store.commit("showPlugPop", true);
			},
			handDelete() {
				this.$store.commit("showConcatPop", true);
			},
			updateClass() {
				this.fiction = "修改分类"
				this.$store.commit("showPlugPop", true);
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
			border: 1upx solid #EEEEEE;
			border-radius: 5upx;
		}

		.class-box-item {
			padding: 0 30upx;
			margin-bottom: 30upx;
			padding-bottom: 40upx;
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
