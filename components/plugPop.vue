<template>
	<view class="popbox">
		<view class="popup text_cen">
			<slot name="fenlei"></slot>
			<slot name="comminp"></slot>
			<view class="font32 font500 flex" style="margin-top: 60upx;">
				<view class="confirm color666 text_cen ml mr" @tap="handconfirm">取消</view>
				<view class="cancel colorfff text_cen" @tap="handcancel">确认提交</view>
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
			cattype: {
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
				ispulgPop: (state) => state.ispulgPop,
				addcat: (state) => state.addcat,
			}),
		},
		methods: {
			handcancel() {
				console.log(this.cattype)
				if (this.addcat.cat_name == "") {
					uni.showToast({
						title: '请填写',
						icon: 'none',
						duration: 3000
					});
					return false;
				}
				if (this.cattype == 1) {
					let that = this;
					let params = {
						supplier_id: this.supplier_id,
						cat_name: this.addcat.cat_name,
						attr: this.addcat.attr,
					}

					that.request.getdata('getSupplierAddCate', params).then(res => {
						console.log(res, '添加分类')
						this.$parent.getSupplier();
					})
				} else if (this.cattype == 2) {
						let that = this;
						let params = {
							cat_id: this.addcat.cat_id,
							cat_name:this.addcat.cat_name,
							attr: this.addcat.attr,
						}
						that.request.getdata('getUpdateCate', params).then(res => {
							console.log(res, '修改分类')
							this.$parent.getSupplier();
						})
				}

				this.$store.commit("showPlugPop", false);
			},
			handconfirm() {
				this.$store.commit("showPlugPop", false);
				this.$store.commit("AddCate", {
					cat_name: "",
					attr: "",
				});
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
			margin-top: -317upx;
			width: 560upx;
			height: 634upx;
			background: #FFFFFF;
			border-radius: 20upx;
			padding-bottom: 60upx;

			.poptitle {
				margin: 60upx 0 38upx 0;
			}

			.confirm {
				width: 200upx;
				line-height: 80upx;
				border: 1px solid #EEEEEE;
				border-radius: 10upx;

			}

			.cancel {
				width: 280upx;
				line-height: 80upx;
				background: linear-gradient(81deg, #6D99F8 0%, #3C66DF 100%);
				border-radius: 10upx;
				border: none;
			}
		}
	}
</style>
