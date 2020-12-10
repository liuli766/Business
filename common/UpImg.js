import uploadImage from '../utils/uploadFile.js'
import util from '../utils/util.js'

export default{
	uploadImg(Images){
		// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
		var tempFilePaths = Images;
		var nowTime = util.formatTime(new Date());
		
		//支持多图上传
		for (var i = 0; i < Images.length; i++) {
			//显示消息提示框
			uni.showLoading({
				title: '上传中' + (i + 1) + '/' + Images.length,
				mask: true
			})
		
			//上传图片
			//你的域名下的/cbb文件下的/当前年月日文件下的/图片.png
			//图片路径可自行修改
			uploadImage(Images[i], 'poster/' + nowTime + '/',
				function(result) {
					console.log("======上传成功图片地址为：", result);
					this.valImg	= result	
					uni.hideLoading();
				},
				function(result) {
					console.log("======上传失败======", result);
					uni.hideLoading()
				}
			)
		}
	}
}