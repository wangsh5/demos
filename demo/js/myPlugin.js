/**
 * Created by dayee on 2017/2/13.
 */
;(function(window,document,$,undefined){
    var w={};
    //反解析序列化对象，$.param和sirialize()类似的数据
    w.unparam=function(src){
        var dataObj={};
        if(src!==''){
            var str=src.indexOf('?')===0?src.substring(1,src.length):src;
            var arr=str.split('&');
            for(var i= 0,arr1=[];i<arr.length;i++){
                arr1=arr[i].split('=');
                dataObj[arr1[0]]=decodeURIComponent(arr1[1]);
            }
            //不兼容IE,IE没forEach方法
            /*str.split('&').forEach(function(i){
                //console.log(i);
                var arr= i.split('=');
                dataObj[arr[0]]=decodeURIComponent(arr[1]);
            })*/
        }
        return dataObj;
    }
    //获取URL参数；w.$_GET['xx'];
    w.$_GET=w.unparam(location.search);

    //切换点击事件
    /*$('xxx').switch(function(){xxx},function(){xxx});*/
    $.fn.switch=function(fn1,fn2){
        this.data('switch-tag',0);
        this.on('click',function(){
            if($(this).data('switch-tag')==0){
                fn1.call(this);
                $(this).data('switch-tag',1)
            }else{
                fn2.call(this);
                $(this).data('switch-tag',0)
            }
        })
    }
	//获取平台信息
		var _userAgent = navigator.userAgent.toLowerCase();
		w.browser = {
			isWechat:_userAgent.indexOf("micromessenger")>=0,
			isDingTalk:_userAgent.indexOf("dingtalk")>=0,
			isAndroid:(_userAgent.indexOf("dingtalk")<0)&&(_userAgent.indexOf("micromessenger")<0)&&(_userAgent.indexOf("android")>=0),
			isIos:(_userAgent.indexOf("dingtalk")<0)&&(_userAgent.indexOf("micromessenger")<0)&&(_userAgent.indexOf("iphone")>=0),
			userAgent:_userAgent
		};
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
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
        };
        for (var k in o){
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    };

    window.zpb=w;
    w=null;
})(window,document,jQuery);