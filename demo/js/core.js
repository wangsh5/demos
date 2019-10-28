;(function(window,document,$,undefined){
	//接口对象
	var u = {};
	//网站根目录
    // u.root = "http://192.168.0.220";	//本地
    u.root = "http://hrsaas.wintalent.cn";	//测试
    //u.root = "http://app.jianliyun.me";	//正式
    //u.root = "http://192.168.0.135:8800";	//本地
	//请求数据
	u.ajax = function(option){
		var timers=setTimeout(function(){
			if($('.loadingGif').length===0){
				$('body').append('<div class="loadingGif"><img src="image/loading.gif" alt="" /></div>');
			}
		},1500);
		setTimeout(function(){
			clearTimeout(timers);
			$('.loadingGif').fadeOut(function(){
				$(this).remove();
			});
		},5000);
		$.ajax({
			url:'/resumeCloud'+option.url,
			data:option.data?option.data:null,
			type:option.type?option.type.toUpperCase():"GET",
			timeout:option.timeout?option.timeout:0
		}).done(function(data){
			if(typeof data.data=="string"&&/[{|[]/.test(data.data)){
				data.data = JSON.parse(data.data);
			}
			if(data.state=="200"){
				if(typeof option.success=="function"){
					option.success(data.data);
				}
			}else if(data.state=="809"){
				$('.popupAlert-container').remove();
				popupAlert(data.msg,function(){
					location.href = 'login.html';
				});
			}else{
				if(typeof option.fail=="function"){
					option.fail(data);
				}else{
					data.msg&&popupAlert(data.msg);
				}
			}
			clearTimeout(timers);
			$('.loadingGif').fadeOut(function(){
				$(this).remove();
			});
		}).fail(function(err){
			//console.log(err);
			clearTimeout(timers);
			$('.loadingGif').fadeOut(function(){
				$(this).remove();
			});
		});
	};
	//上传
	u.ajaxUpLoad = function(option){
		var uploadObj = new FormData();
		for(var i=0;i<option.file.length;i++){
			uploadObj.append(option.paramName,option.file[i]);
		}
		$.ajax({
			url:'/resumeCloud'+option.url,
			data:uploadObj,
			type:'post',
			cache: false,
			processData: false,
		    contentType: false,
			timeout:option.timeout?option.timeout:0
		}).done(function(data){
			if(typeof data.data=="string"&&data.data.indexOf('{')>=0){
				data.data = JSON.parse(data.data);
			}
			if(data.state=="200"){
				if(typeof option.success=="function"){
					option.success(data.data);
				}
			}else{
				popupAlert(data.msg);
			}
		}).fail(function(err){
			console.log(err);
		});
	};
	//数组循环方法
	//日期格式化
	Date.prototype.format = function (fmt) {
	    var o = {
	        "M+": this.getMonth() + 1, //月份
	        "d+": this.getDate(), //日
	        "h+": this.getHours(), //小时
	        "m+": this.getMinutes(), //分
	        "s+": this.getSeconds(), //秒
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
	        "S": this.getMilliseconds() //毫秒
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	};
	//扩展string对象replaceAll
	String.prototype.replaceAll = function(oldStr,newStr){
		var str = this;
		while (new RegExp(oldStr).test(str)){
            str = str.replace(oldStr, newStr);
        }
        return str;
	};
	//反解析序列化对象，$.param和sirialize()类似的数据
	u.unparam=function(str){
		var dataObj = {};
		if(str!==""){
			var src = str.indexOf("?")===0?str.substring(1,str.length):str;
			var arr = src.split('&');
			for(var i=0; i<arr.length; i++){
				var arr2 = arr[i].split('=');
				dataObj[arr2[0]] = decodeURIComponent(arr2[1]);
			}
		}
		return dataObj;
	};
	//把简单数组转换成树状结构数据格式数组
	var transArrayToTree = function(){};
	//把树状结构数据格式数组转换成简单数组
	var transTreeToArray = function(){};
	//根据parentId获取子节点
	u.getChildrenBypId = function(pid,arr){
		var result = [];
		for(var i=0;i<arr.length;i++){
			var col = arr[i];
			if(col.parentId == pid){
				result.push(col);
			}
		}
		return result;
	};
	//阻止事件冒泡
	u.stopPropagation = function(e){
		var event = window.event || e;
		event.stopPropagation();
		event.cancelBubble = true;
	};
	//获取url的GET数据
	u.$_GET=u.unparam(location.search);
	
	window.jly = u;
	u = null;
})(window,document,$,undefined);
