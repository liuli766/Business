<template>
	<view>
		<view class="comm">
			<view class="font32 color333 goods-title">基础信息</view>
			<view class="base-info bfff">
				<view class="font28 color333">商品名称</view>
				<input type="text" class="goods-inp font28 color999" :value="goods == 0?goods_name:goods_detail.goods_name" @input="goodsName"
				 placeholder="请输入商品名称" />
				<view style="position: relative;">
					<view class="font28 color333 goods-fenlei">商品分类</view>
					<input type="text" class="goods-inp font28 color999" v-model="selectText.cat_name" placeholder="请输入商品名称" disabled="disabled"
					 @tap="ShowList" />
					<view class="list-container" v-if="isShowList">
						<text class="popper__arrow"></text>
						<view class="meun flex flex-col text_cen font32">
							<text class="font28 color666 cat" v-for="(item,i) in CateList" :key='i' @tap="onClickItem(item)">{{item.cat_name}}</text>
						</view>
					</view>
				</view>
				<view class="font28 color333 goods-fenlei">商品封面图(一张)</view>
				<view class="goods-poster flex flex_jus-cen flex_al-cen" @click="UploadaddImg" v-if="goods == 0">
					<image :src="addImg?addImg:'../../../static/img/add.png'" mode="" class="add-img" :class="{'addimg':addImg}"></image>
				</view>
				<view class="goods-poster flex flex_jus-cen flex_al-cen" @click="UploadaddImg" v-else>
					<image :src="goods_detail.goods_image?goods_detail.goods_image:'../../../static/img/add.png'" mode="" class="add-img"
					 :class="{'addimg':goods_detail.goods_image}"></image>
				</view>
				<view class="font28 color333 goods-fenlei">商品banner图(1-5张)</view>
				<view class="flex imgbox">
					<view class="flex" v-if="goods===0">
						<view class="goods-poster flex flex_jus-cen flex_al-cen" v-for="(img,i) in bannerList" :key='i' >
							<image :src="img" mode="" class="add-img" :class="{'addimg':bannerList.length!==0}"></image>
							<text class="close-view" @tap="close(i)">X</text>
						</view>
					</view>
					<view  class="flex" v-if="goods.id">
						<view class="goods-poster flex flex_jus-cen flex_al-cen" v-for="(img,i) in goods_detail.goods_images" :key='i'
						 >
							<image :src="img" mode="" class="add-img" :class="{'addimg':goods_detail.goods_images!==0}"></image>
							<text class="close-view" @tap="close(i)">X</text>
						</view>
					</view>
					
					<view class="goods-poster flex flex_jus-cen flex_al-cen" @click="UploadaddbannerImg(1)">
						<image src="../../../static/img/add.png" mode="" class="add-img"></image>
					</view>
				</view>
			</view>
			<view class="font32 color333 goods-title flex flex_al-cen">商品
				<view class="flex flex_al-cen flex_ar" style="width: 60%;" v-if='goods == 0'>
					<text class="font28 color65" v-for="(item,i) in attrlist" :key='i'>{{item.attr_name}}</text>
				</view>
				<view class="flex flex_al-cen flex_ar" style="width: 60%;" v-else>
					<text class="font28 color65" v-for="(item,i) in goods_detail.attr" :key='i'>{{item.attr_name}}</text>
				</view>
			</view>
			<view class="base-info bfff color333">
				<view v-for="(item,i) in attrlist" :key='i'>
					<view class="color333 font28" v-if="goods==0">
						<view>{{item.attr_name}}</view>
						<view class="flex goods_attr flex_al-cen flex_be " v-for="(c,v) in item.num" :key="v">
							<input type="text" v-model="c.name" class="goods_attr_p" />
							<input type="text" v-model="c.price" class="goods_attr_p" />
							<text @tap="addItem(item,i,v)" class="color333 font28 attrbtn" v-if="v==0">添加</text>
							<text @tap="remove(item,i,v)" class="color333 font28 attrbtn" v-if="v>0">删除</text>
						</view>
					</view>
				</view>
				<view v-for="(item,i) in goods_detail.attr" :key='i'>
					<view class="color333 font28" v-if="goods.id">
						<view>{{item.attr_name}}</view>
						<view class="flex goods_attr flex_al-cen flex_be " v-for="(c,v) in item.num.length==0?1:item.num" :key="v">
							<input type="text" v-model="c.attr_value" class="goods_attr_p" />
							<input type="text" v-model="c.attr_price" class="goods_attr_p" />
							<text @tap="addItem(item,i,v)" class="color333 font28 attrbtn" v-if="v==0">添加</text>
							<text @tap="remove(item,i,v)" class="color333 font28 attrbtn" v-if="v>0">删除</text>
						</view>
					</view>
				</view>
				<view class="font28 color333 flex goods-out flex_be">
					<view>
						<view>商品售价(元)</view>
						<input type="text" :value="goods == 0?goods_price:goods_detail.goods_price" class="goods_p" @input="goodsPrice" />
					</view>
					<view>
						<view>商品原价(元)</view>
						<input type="text" :value="goods == 0?market_price:goods_detail.market_price" class="goods_p" @input="marketPrice" />
					</view>
					<view>
						<view>商品库存</view>
						<input type="text" :value="goods == 0?goods_number:goods_detail.goods_num" class="goods_p" @input="goodsNumber" />
					</view>
					<view>
						<view>虚拟售量</view>
						<input type="text" :value="goods == 0?sales_volume:goods_detail.sales_volume" class="goods_p" @input="salesVolume" />
					</view>
				</view>
				<view class="font28 color333">打包费(元)</view>
				<input type="text" class="goods-inp font28 color999" :value="goods == 0?pack_fee:goods_detail.pack_fee" @input="packFee" />
				<view class="font28 color333 goods-af">是否上架</view>
				<view class="flex on_shlef ">
					<view class="flex font28 color666" v-for="(c,v) in statuslist" :key='v' @tap='statusSelect(v)'  v-if='goods !== 0'>
						<view class="goods_radio " :class="[goods_detail.status==v?' goods_af_active':'']"></view>
						<view>{{c}}</view>
					</view>
					<view class="flex font28 color666" v-for="(c,v) in statuslist" :key='v' @tap='statusSelect(v)' v-if="goods===0">
						<view class="goods_radio " :class="[statusid==v?'goods_af_active':'']"></view>
						<view>{{c}}</view>
					</view>
				</view>

				<view class="font28 color333 goods-fenlei">商品详细信息(详情页上传)</view>
				<view class="flex imgbox">
					<view class="flex" v-if="goods==0">
						<view class="goods-poster flex flex_jus-cen flex_al-cen" v-for="(img,i) in detailList" :key='i' >
							<image :src="img" mode="" class="add-img" :class="{'addimg':detailList.length!==0}"></image>
							<text class="close-view" @tap="closedetail(i)">X</text>
						</view>
					</view>
					<view class="flex" v-if="goods.id">
						<view class="goods-poster flex flex_jus-cen flex_al-cen" v-for="(img,i) in goods_detail.goods_desc" :key='i' >
							<image :src="img" mode="" class="add-img" :class="{'addimg':goods_detail.goods_desc.length!==0}"></image>
							<text class="close-view" @tap="closedetail(i)">X</text>
						</view>
					</view>

					<view class="goods-poster flex flex_jus-cen flex_al-cen" @click="UploadaddbannerImg(2)">
						<image src="../../../static/img/add.png" mode="" class="add-img"></image>
					</view>
				</view>

				<view class="commbtn colorfff font32 text_cen ml" @tap='addAndupd(goods)'>{{goods==0?'确定添加':'确定修改'}}</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		mapState,
	} from 'vuex';
	import uploadImage from '../../../utils/uploadFile.js'
	import util from '../../../utils/util.js'

	export default {
		data() {
			return {
				addImg: "",
				bannerList: [], //多张轮播图
				detailList: [], //详情图片
				counts: 5, //上传图片数量
				CateList: [], //分类列表
				isShowList: false,
				selectText: { //添加分类id
					cat_name: "",
					id: "",
				},
				attrlist: [], //下拉列表数据
				attrarr: [],
				goods_name: "", //商品名称
				goods_detail: {},
				statuslist: ['下架商品', '上架商品'],
				statusid: 1, //0：否 1：是
				goods_price: "", ///实际价格
				market_price: "", //市场价格
				goods_number: "", //库存
				sales_volume: "", //虚拟销量
				pack_fee: "", //包装费
				names: [],
				update: true, //强制刷新
			}
		},
		computed: {
			...mapState({
				supplier_id: (state) => state.supplier_id, //商户id
				goods: (state) => state.goods,
			}),
		},
		onLoad() {
			let that = this
			let params = {
				supplier_id: this.supplier_id
			}
			if (this.goods == 0) {
				that.request.getdata('getSupplierCateList', params).then(res => {
					this.CateList = res.data
					console.log(res, '分类列表')
				})
				this.goodsDetail();
			} else {
				this.goodsDetail();
				that.request.getdata('getSupplierCateList', params).then(res => {
					this.CateList = res.data
					res.data.map((item, i) => {
						console.log(item)
						console.log(this.goods_detail.cat_id == item.id)
						if (this.goods_detail.cat_id == item.id) {

							this.selectText.cat_name = item.cat_name
							this.selectText.id = item.id
						}
					})
					console.log(res, '分类列表')
				})
			}
			console.log(this.goods)

		},
		methods: {
			UploadaddImg() { //封面图
				let that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						// that.addImg = res.tempFilePaths[0]
						// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
						var tempFilePaths = res.tempFilePaths;
						var nowTime = util.formatTime(new Date());

						//支持多图上传
						for (var i = 0; i < res.tempFilePaths.length; i++) {
							//显示消息提示框
							uni.showLoading({
								title: '上传中' + (i + 1) + '/' + res.tempFilePaths.length,
								mask: true
							})

							//上传图片
							//你的域名下的/cbb文件下的/当前年月日文件下的/图片.png
							//图片路径可自行修改
							uploadImage(res.tempFilePaths[i], 'poster/' + nowTime + '/',
								function(result) {
									console.log("======上传成功图片地址为：", result);
									if (that.goods == 0) {
										that.addImg = result
									} else {
										that.goods_detail.goods_image = result
									}

									uni.hideLoading();
								},
								function(result) {
									console.log("======上传失败======", result);
									uni.hideLoading()
								}
							)
						}
					}
				});
			},
			UploadaddbannerImg(type) { //多张图片上传
				let that = this
				if (type == 1) { //轮播图上传
					uni.chooseImage({
						count: this.counts, //默认9
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album'], //从相册选择
						success: function(res) {
							// for (let i = 0; i < res.tempFilePaths.length; i++) {
							// 	that.bannerList.push(res.tempFilePaths[i])
							// }
							// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
							var tempFilePaths = res.tempFilePaths;
							var nowTime = util.formatTime(new Date());
							let banner_list = "";
							//支持多图上传
							for (var i = 0; i < res.tempFilePaths.length; i++) {

								//显示消息提示框
								uni.showLoading({
									title: '上传中' + (i + 1) + '/' + res.tempFilePaths.length,
									mask: true
								})
								//你的域名下的/cbb文件下的/当前年月日文件下的/图片.png
								//图片路径可自行修改
								uploadImage(res.tempFilePaths[i], 'cbb/' + nowTime + '/',
									function(result) {
										console.log("======上传成功图片地址为：", result);
										if (that.goods == 0) {
											that.bannerList.push(result)
										} else {
											that.goods_detail.goods_images.push(result)
										}

										uni.hideLoading();
									},
									function(result) {
										console.log("======上传失败======", result);
										uni.hideLoading()
									}
								)
							}


						}
					});
				} else if (type == 2) { //详情图片上传
					uni.chooseImage({
						count: this.counts, //默认9
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album'], //从相册选择
						success: function(res) {
							// for (let i = 0; i < res.tempFilePaths.length; i++) {
							// 	that.detailList.push(res.tempFilePaths[i])
							// }
							// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
							var tempFilePaths = res.tempFilePaths;
							var nowTime = util.formatTime(new Date());

							//支持多图上传
							for (var i = 0; i < res.tempFilePaths.length; i++) {
								//显示消息提示框
								uni.showLoading({
									title: '上传中' + (i + 1) + '/' + res.tempFilePaths.length,
									mask: true
								})
								//你的域名下的/cbb文件下的/当前年月日文件下的/图片.png
								//图片路径可自行修改
								uploadImage(res.tempFilePaths[i], 'detail/' + nowTime + '/',
									function(result) {
										console.log("======上传成功图片地址为：", result);
										if (that.goods == 0) {
											that.detailList.push(result)
										} else {
											that.goods_detail.goods_desc.push(result)
											console.log('sxusccdbhcbd', that.goods_detail.goods_desc)
										}

										uni.hideLoading();
									},
									function(result) {
										console.log("======上传失败======", result);
										uni.hideLoading()
									}
								)
							}

						}
					});
				}

			},
			close(index) { //删除当前图片
				if (this.goods == 0) {
					this.bannerList.splice(index, 1);
				} else {
					this.goods_detail.goods_images.splice(index, 1)
				}

			},
			closedetail(index) {
				if (this.goods == 0) {
					this.detailList.splice(index, 1);
				} else {
					this.goods_detail.goods_desc.splice(index, 1)
				}
			},
			ShowList() { //是否显示下拉列表
				this.isShowList = !this.isShowList
			},
			onClickItem(item) { //选中下拉列表值
				console.log(item)
				this.selectText.cat_name = item.cat_name
				this.selectText.id = item.id
				if (this.goods == 0) {
					this.attrlist = []
					this.getAttrType(item)
				} else {

					if (this.goods_detail.cat_id == item.id) {
						this.Attrfn()
					} else {
						this.goods_detail.attr = []
						this.getAttrType(item)
					}


				}
				this.isShowList = false
			},
			getAttrType(item) { //获取商品分类属性
				let that = this;
				let params = {
					cat_id: item.id,
				}
				that.request.getdata('getAttrType', params).then(res => {
					if (that.goods == 0) {
						this.attrlist = res.data
					} else {
						this.goods_detail.attr = res.data
					}
					// this.$forceUpdate(this.attrlist,0,res.data)
					console.log(res.data, this.attrlist, '商品分类属性')
				})
			},
			/*商品规格*/
			addItem(item, i, v) { //增加
				if (this.goods == 0) {
					this.attrlist[i]['num'].push({
						name: "",
						price: "",
					})
				} else {
					this.goods_detail.attr[i]['num'].push({
						name: "",
						price: "",
					})
				}
				console.log(this.goods_detail.attr)
			},
			remove(item, i, v) { //删除
				if (this.goods == 0) {
					this.attrlist[i].num.splice(v, 1);
				} else {
					this.goods_detail.attr[i].num.splice(v, 1);
				}

			},
			addAndupd(goods) { //
				let newattr = []
				console.log()
				let that = this;
				if (this.goods == 0) {
					this.attrlist.map((item, i) => {
						item.num.map((c, v) => {
							this.names.push({
								attr_id: item.id,
								attr_value: c.name,
								attr_price: c.price,
							})
						})
					})
				} else {
					this.goods_detail.attr.map(item => {
						console.log(item)
						item.num.map((c, v) => {
							newattr.push({
								attr_id: item.id,
								attr_value: c.attr_value,
								attr_price: c.attr_price,
							})
						})
					})
				}
				console.log(newattr)
				let params = {
					goods_id: goods.id,
					supplier_id: this.supplier_id,
					goods_name: goods == 0 ? this.goods_name : this.goods_detail.goods_name,
					cat_id: goods == 0 ? this.selectText.id : this.selectText.id,
					cover_image: goods == 0 ? this.addImg : this.goods_detail.goods_image,
					banner_iamge: goods == 0 ? this.bannerList.join(',') : this.goods_detail.goods_images.join(','),
					goods_desc: goods == 0 ? this.detailList.join(',') : this.goods_detail.goods_desc.join(','),
					goods_price: goods == 0 ? this.goods_price : this.goods_detail.goods_price,
					market_price: goods == 0 ? this.market_price : this.goods_detail.market_price,
					goods_number: goods == 0 ? this.goods_number : this.goods_detail.goods_num,
					sales_volume: goods == 0 ? this.sales_volume : this.goods_detail.sales_volume,
					pack_fee: goods == 0 ? this.pack_fee : this.goods_detail.pack_fee,
					status: goods == 0 ? this.statusid : this.goods_detail.status,
					type: goods == 0 ? 1 : 2,
					// attr: goods == 0 ? JSON.stringify(this.names) : JSON.stringify(this.goods_detail.attr)
					attr: goods == 0 ? String(JSON.stringify(this.names)) : String(JSON.stringify(newattr))
				}

				if (goods == 0) {
					if (this.goods_name == "" && this.addImg == "" && this.bannerList.length == 0 && this.detailList.length == 0 &&
						this.goods_price == "" && this.market_price == "" && this.goods_number == "" && this.sales_volume == "" && this.pack_fee ==
						"") {
						uni.showToast({
							title: '请填写完整',
							icon: 'none',
							duration: 3000
						});
						return false;
					}

					console.log(this.names)
					that.request.getdata('getaddGoods', params).then(res => {
						console.log(res, '商品修改/添加')
						uni.showToast({
							title: '添加成功',
							icon: 'none',
							duration: 3000
						});
						uni.navigateBack({
							delta: 1
						});
					})
				} else {
					that.request.getdata('getaddGoods', params).then(res => {
						console.log(res, '商品修改/添加')
						uni.showToast({
							title: '修改成功',
							icon: 'none',
							duration: 3000
						});
						uni.navigateBack({
							delta: 1
						});
					})
				}

			},
			goodsDetail() { //商品详情
				if (this.goods.id) {
					let that = this
					let params = {
						goods_id: this.goods.id,
					}
					that.request.getdata('getgoodsInfo', params).then(res => {
						console.log(res, '商品详情')
						this.goods_detail = res.data
					})
				}
			},
			Attrfn() {
				if (this.goods.id) {
					let that = this
					let params = {
						goods_id: this.goods.id,
					}
					that.request.getdata('getgoodsInfo', params).then(res => {
						console.log(res, '商品详情')
						this.goods_detail.attr = res.data.attr
					})
				}
			},
			goodsName(e) { //商品名称
				if (this.goods == 0) {
					let val = e.detail.value
					this.goods_name = val
				} else {
					let val = e.detail.value
					this.goods_detail.goods_name = val
				}

			},
			statusSelect(i) { //上架，下架
				if (this.goods == 0) {
					this.statusid = i
				} else {
					this.goods_detail.status = i
				}

			},
			goodsPrice(e) {
				let val = e.detail.value
				if (this.goods == 0) {
					this.goods_price = val
				} else {
					this.goods_detail.goods_price = val
				}

			},
			marketPrice(e) {
				let val = e.detail.value
				if (this.goods == 0) {
					this.market_price = val
				} else {
					this.goods_detail.market_price = val
				}

			},
			goodsNumber(e) {
				let val = e.detail.value
				if (this.goods == 0) {
					this.goods_number = val
				} else {
					this.goods_detail.goods_num = val
				}

			},
			salesVolume(e) {
				let val = e.detail.value
				if (this.goods == 0) {
					this.sales_volume = val
				} else {
					this.goods_detail.sales_volume = val
				}

			},
			packFee(e) {
				let val = e.detail.value
				if (this.goods == 0) {
					this.pack_fee = val
				} else {
					this.goods_detail.pack_fee = val
				}

			}
			// urlTobase64(url) {
			// 	uni.request({
			// 		url: url,
			// 		method: 'GET',
			// 		responseType: 'arraybuffer',
			// 		success: ress => {
			// 			let base64 = wx.arrayBufferToBase64(ress.data); //把arraybuffer转成base64 
			// 			base64 = 'data:image/jpeg;base64,' + base64 //不加上这串字符，在页面无法显示的哦
			// 			console.log(base64)
			// 			that.addImg=base64
			// 		}
			// 	})
			// },
		}
	}
</script>

<style lang="scss" scoped>
	.goods-title {
		padding: 30upx;
		background: #F7F9FA;
	}

	.base-info {
		padding: 30upx;

		.inps {
			border: 1px solid #EDEDED;
			border-radius: 10upx;
			padding: 0 15upx;
			width: 100upx;
		}

		.add_wrap {
			flex-wrap: wrap;

			>view {
				width: 22%;
			}
		}

		.attrbtn {
			color: #FFAC68;
			margin-left: 10upx;
		}

		.goods-inp {
			width: 690upx;
			height: 80upx;
			border: 1px solid #EDEDED;
			border-radius: 10upx;
			padding-left: 30upx;
			margin-top: 20upx;
			box-sizing: border-box;
		}

		.goods-fenlei {
			padding: 39upx 0 20upx 0;
		}

		.goods-af {
			padding: 39upx 0 0upx 0;
		}

		.goods-poster {
			width: 160upx;
			height: 120upx;
			border: 1px solid #EDEDED;
			border-radius: 10upx;
			margin-right: 10upx;
			position: relative;
			margin-bottom: 15upx;

			.add-img {
				width: 48upx;
				height: 48upx;
			}

			.addimg {
				width: 160upx;
				height: 120upx;
				border-radius: 10upx;
			}
		}

		.goods-out {
			flex-wrap: wrap;
			margin-top: 39upx;

			>view {
				width: 48%;
				margin-bottom: 39upx;
			}

			.goods_p {
				width: 330upx;
				height: 80upx;
				border: 1px solid #EEEEEE;
				border-radius: 10upx;
				padding-left: 30upx;
				box-sizing: border-box;
				margin-top: 20upx;
			}
		}

		.goods_radio {
			width: 48upx;
			height: 48upx;
			border: 1px solid #EEEEEE;
			border-radius: 50%;
			position: relative;
			margin-right: 20upx;
		}

		.goods_af_active:after {
			content: "";
			width: 20upx;
			height: 20upx;
			background: #FFAC68;
			border-radius: 10upx;
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -10upx;
			margin-left: -10upx;
		}

		.on_shlef {
			padding-top: 20upx;
			>view {
				margin-right: 39upx;
			}
		}
	}

	.commbtn {
		margin: 60upx auto;
		margin-bottom: 60upx;
	}

	.imgbox {
		flex-wrap: wrap;
	}

	.close-view {
		text-align: center;
		line-height: 24rpx;
		height: 32rpx;
		width: 32rpx;
		border-radius: 50%;
		background: rgba(0, 0, 0, .5);
		color: #ffffff;
		position: absolute;
		top: -12rpx;
		right: -8rpx;
		font-size: 24rpx;
		display: inline-block;
	}

	.list-container {
		box-shadow: 3px -3px 3px #eee, -3px 3px 3px #eee;
		border-radius: 10upx;
		background: #FFFFFF;
		position: absolute;
		top: 208rpx;
		left: 82rpx;
		z-index: 9;
		width: 400upx;

		.popper__arrow {
			transform: translateX(-400%);
			position: absolute;
			display: block;
			width: 0;
			height: 0;
			border-color: transparent;
			border-style: solid;
			border-width: 6px;
			filter: drop-shadow(0 2px 12px rgba(0, 0, 0, .03));
			left: 30%;
			margin-right: 3px;
			border-top-width: 0;
			border-bottom-color: #dcdfe6;
			top: -5px;

			&:after {
				content: " ";
				border-width: 6px;
				position: absolute;
				display: block;
				width: 0;
				height: 0;
				border-color: transparent;
				border-style: solid;
				top: 1px;
				margin-left: -6px;
				border-top-width: 0;
				border-bottom-color: #fff;
			}
		}

		.meun {
			width: 400upx;
			height: 400upx;
			overflow: auto;
		}

		.cat {
			line-height: 48upx;

			&:hover {
				background: #eee;
			}
		}
	}

	.goods_attr {
		flex-wrap: wrap;
	}

	.goods_attr_p {
		width: 300upx;
		height: 80upx;
		border: 1px solid #EEEEEE;
		border-radius: 10upx;
		padding-left: 30upx;
		box-sizing: border-box;
		margin-top: 10upx;
	}
</style>
