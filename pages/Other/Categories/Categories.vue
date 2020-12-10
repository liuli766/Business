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
			<view class="flex flex_be class-box-item" v-for="(item,i) in CateList" :key="i">
				<view class="number text_cen">{{item.id}}</view>
				<view>{{item.cat_name}}</view>
				<view class="font24 colorfff text_cen flex">
					<view class="modify" @tap="updateClass(item)">修改</view>
					<view class="delete" @tap="handDelete(item)">删除</view>
				</view>
			</view>
		</view>
		<plug-pop v-if="ispulgPop" :cattype='type'>
			<view class="poptitle bold color333 font36" slot="fenlei">{{fiction}}</view>
			<view slot='comminp'>
				<!-- <input class="inp" placeholder="填写序号"  placeholder-style='color:#999;font-size:26upx;text-align: left;' @focus="GetVal("")" /> -->
				<input class="inp" placeholder="填写分类名称" placeholder-style='color:#999;font-size:26upx; text-align: left;' v-model="addcat.cat_name" />
				<input class="inp" placeholder="实例： 规格,甜度,小料" placeholder-style='color:#999;font-size:26upx; text-align: left;'
				 v-model="addcat.attr" />
			</view>
		</plug-pop>
		<refusepop v-if="isConcatPop" :deleteType='delettype' >
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
				fiction: "",
				CateList: [], //分类列表
				attr: "",
				type: "",//1为添加分类，2为修改分类
				delettype:"",
				deleteId:''
			}
		},
		computed: {
			...mapState({
				ispulgPop: (state) => state.ispulgPop,
				isConcatPop: (state) => state.isConcatPop,
				supplier_id: (state) => state.supplier_id, //商户id
				addcat: (state) => state.addcat,
			}),
		},
		onShow() {
			this.CateList=[]
			this.getSupplier()
		},
		methods: {
			addClass() { //添加分类
				this.fiction = '添加分类'
				this.$store.commit("showPlugPop", true);
				this.type = 1
			},
			handDelete(item) { //删除商品
				this.delettype=2
				this.$store.commit("showConcatPop", true);
				console.log(item)
				this.deleteId=item.id
			},
			updateClass(item) { //修改分类
				this.fiction = "修改分类"
				this.$store.commit("showPlugPop", true);
				this.type = 2
				let that = this;
				let params = {
					cat_id: item.id,
				}
				that.request.getdata('getCatInfo', params).then(res => {
					let attr = res.data.attr;
					console.log(attr, '分类详情')
					this.$store.commit("AddCate", {
						cat_name: item.cat_name,
						attr: attr,
						cat_id:item.id
					})
					that.getSupplier();
				})
				
			},
			getSupplier() {
				let that = this;
				let params = {
					supplier_id: this.supplier_id,
				}
				that.request.getdata('getSupplierCateList', params).then(res => {
					this.CateList = res.data
					console.log(res, '分类列表')
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
