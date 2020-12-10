<template>
	<view class="popbox">
		<view class="popup text_cen">
			<slot name="poptitle"></slot>
			<view class="font32 font500 flex" style="margin-top: 56upx;">
				<view class="confirm color666 text_cen" @tap="handconfirm">确认</view>
				<view class="cancel colorfff text_cen" @tap="handcancel">取消</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex';
	export default {
		props: {
			deleteType: {
				type: String,
				default: ""
			}
		},
		data() {
			return {

			}
		},
		computed: {
			...mapState({
				isConcatPop: (state) => state.isConcatPop,
				refuseOrder: (state) => state.refuseOrder, //拒接接单
				supplier_id: (state) => state.supplier_id, //商户id
				deleteGoods: (state) => state.deleteGoods, //删除商品
				updataId: (state) => state.updataId,
			}),
		},
		methods: {
			handcancel() { //取消
				this.$store.commit("showConcatPop", false);
			},
			handconfirm() {
				if (this.deleteType == 1) { //删除商品管理
					let that = this;
					let params = {
						goods_id: this.deleteGoods.id,
					}

					that.request.getdata('getdeleteGoods', params).then(res => {
						this.$store.commit("showConcatPop", false);
						// this.$parent.getGoodsList();
						this.$emit('updata')
						console.log(res, '删除商品')
					})
				} else if (this.deleteType == 2) { //删除分类管理
					let that = this;
					let params = {
						cat_id: this.$parent.deleteId,
					}
					that.request.getdata('getcatDel', params).then(res => {
						this.$store.commit("showConcatPop", false);
						console.log(res, '删除')
						this.$parent.CateList = []
						this.$parent.getSupplier()
					})
				} else if (this.deleteType == 3) { //活动管理
					if (this.$parent.activeid == 2) {
						let that = this;
						let params = {
							act_id: this.updataId,
						}
						that.request.getdata('getactivityAgain', params).then(res => {
							this.$store.commit("showConcatPop", false);
							console.log(res, '重新申请')
						})
					}
					if(this.$parent.activeid==1){ //活动删除
						let params = {
							act_id: this.$parent.actdleteid,
						}
						this.request.getdata('getactDel', params).then(res => {
							this.$store.commit("showConcatPop", false);
							console.log(res, '活动删除')
							this.$parent.activityList=[];
							this.$parent.getactivityList()
						})
					}

				} else if(this.deleteType == 4){
					if(this.$parent.tabIndex==0){
						//确认,拒接接单
							let that = this;
							let params = {
								order_id: this.refuseOrder.id,
								supplier_id: this.supplier_id,
								type: 2, //2:拒绝接单 1:接单
							}
							that.request.getdata('getOrderTaking', params).then(res => {
								if (res.code == 200) {
									this.$store.commit("showConcatPop", false);
									console.log(res, '拒接接单')
								}
							})
					}
					
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	.popbox {
		background: rgba(0, 0, 0, .3);
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		overflow: hidden;
		transition: all .2s;

		.popup {
			position: absolute;
			top: 50%;
			left: 50%;
			margin-left: -280upx;
			margin-top: -276.5upx;
			width: 560upx;
			height: 316upx;
			background: #FFFFFF;
			border-radius: 20upx;
			box-sizing: border-box;

			.confirm {
				width: 280upx;
				line-height: 80upx;
				border: 1px solid #EEEEEE;
				border-radius: 0px 0px 0px 20upx;
			}

			.cancel {
				width: 280upx;
				line-height: 80upx;
				background: linear-gradient(81deg, #6D99F8 0%, #3C66DF 100%);
				border-radius: 0px 0px 20upx 0px;
				border: none;
			}
		}
	}
</style>
