/**
 * Created by dayee on 2017/2/13.
 */
;(function(window,document,$,undefined){
    var w={};
    //���������л�����$.param��sirialize()���Ƶ�����
    w.unparam=function(src){
        var dataObj={};
        if(src!==''){
            var str=src.indexOf('?')===0?src.substring(1,src.length):src;
            var arr=str.split('&');
            for(var i= 0,arr1=[];i<arr.length;i++){
                arr1=arr[i].split('=');
                dataObj[arr1[0]]=decodeURIComponent(arr1[1]);
            }
            //������IE,IEûforEach����
            /*str.split('&').forEach(function(i){
                //console.log(i);
                var arr= i.split('=');
                dataObj[arr[0]]=decodeURIComponent(arr[1]);
            })*/
        }
        return dataObj;
    }
    //��ȡURL������w.$_GET['xx'];
    w.$_GET=w.unparam(location.search);

    //�л�����¼�
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
	//��ȡƽ̨��Ϣ
		var _userAgent = navigator.userAgent.toLowerCase();
		w.browser = {
			isWechat:_userAgent.indexOf("micromessenger")>=0,
			isDingTalk:_userAgent.indexOf("dingtalk")>=0,
			isAndroid:(_userAgent.indexOf("dingtalk")<0)&&(_userAgent.indexOf("micromessenger")<0)&&(_userAgent.indexOf("android")>=0),
			isIos:(_userAgent.indexOf("dingtalk")<0)&&(_userAgent.indexOf("micromessenger")<0)&&(_userAgent.indexOf("iphone")>=0),
			userAgent:_userAgent
		};
    //���ڸ�ʽ��
    Date.prototype.format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //�·�
            "d+": this.getDate(), //��
            "h+": this.getHours(), //Сʱ
            "m+": this.getMinutes(), //��
            "s+": this.getSeconds(), //��
            "q+": Math.floor((this.getMonth() + 3) / 3), //����
            "S": this.getMilliseconds() //����
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