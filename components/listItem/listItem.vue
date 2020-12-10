<template>
	<view class="content">
		<slot name="ordernum"></slot>
		<view class="flex flex_be order-pro-box" v-for="(item,k) in productitem.goods_list" :key="k">
			<view class="flex" >
				<image :src="item.goods_image" mode="" class="order-img"></image>
				<view class="flex flex-col">
					<text class="font28 font500 color333 lh">{{item.goods_name}}</text>
					<text class="font26 font500 color999 lh mar19">{{item.goods_attr}}</text>
					<text class="font26 font500 color999 lh">x{{item.goods_number}}</text>
				</view>
			</view>
			<text class="font500 font28 color333">￥{{item.goods_price}}</text>
		</view>
		<view class="order-price">
			<view class="flex flex_be ">
				<text class="font500 font28 color333">打包费</text>
				<text class="font500 font28 color333">￥{{productitem.packing_money}}</text>
			</view>
			<slot name="deliver"></slot>
		</view>
		<slot name="orderbot"></slot>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex';
	export default {
		props: {
			productitem: {
				type: [Object,Array],
				default: function() {
					return {}
				}
			},
		},
		created() {
			console.log(this.productitem, '11111')
		},
		data() {
			return {

			}
		},
		methods: {
			GunList() {
				this.$store.commit("showPop", true);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background: #fff;
		padding: 30upx;
		border-radius: 10upx;
		margin-bottom: 30upx;

		.order-pro-box {
			padding: 30upx 0;
			border-bottom: 1px solid #eee;

			.order-img {
				width: 110upx;
				height: 110upx;
				border-radius: 10upx;
				margin-right: 20upx;
			}

			.mar19 {
				margin: 19upx 0;
			}
		}

		.order-price {
			padding: 30upx 0;
			border-bottom: 1px solid #eee;
		}

	}
</style>
