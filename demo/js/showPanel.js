;(function($,window,document,undefined){
	//示例
	/*$(ele).showPanel({
		data:data,//需渲染的数据，
		codeName:code,//存储code返回值
	})*/
	var defaults={
		version: "1.0.0"
	}
	function ShowPanel(ele,options){
		this.ele=ele;
		this.option=$.extend({}, defaults, options);
		this.list=[];//每次需要渲染的数据
		this.navArr=[];//面包屑导航数据
		this.init();
	}
	ShowPanel.prototype={
		init:function(){
			var allList=[];//所有数据
			this.list=this.option.data;
			allList=this.list;
			this.navArr.push({name:'全部',childList:allList});
			this.templateHtml(this.navArr,this.list);
			this.bindEven();
		},
		//模板创建
		templateHtml: function(){
			if($('.container')){
				$('.container').remove();
			}
			var html="<div class='container'>"
			+"<header class='nav'>";
			for(var i=0;i<this.navArr.length;i++){
				html+="<span class='chanageList' data-index='"+i+"'>"+this.navArr[i].name+"<em>&gt;</em></span>";
			}
			html+="<span class='closeDiv'>&times;</span>"
			html+="</header>"
			+"<ul class='tpList'>";
			for(var j=0;j<this.list.length;j++){
				html+="<li>"
				+"<span class='itemName' data-index='"+j+"'>"+this.list[j].name+"</span>";
				if(this.list[j].childList&&this.list[j].childList.length>0){
					html+="<img class='iconImg' src='../images/choose.png' width='7' height='12'>"
				}
				html+="</li>"
			}
			html+="</ul></div>";
			$("body").append(html);
		},
		//绑定事件
		bindEven: function(){
			var _this=this;
			$('.chanageList').each(function(){
				$(this).on('click',function(){
					var navIndex=$(this).attr('data-index');
					_this.chanageList(navIndex)
				})
			});
			$('.itemName').each(function(){
				$(this).on('click',function(){
					var itemIndex=$(this).attr('data-index');
					_this.getDataById(itemIndex)
				})
			});
			$('.closeDiv').on('click',function(){
				_this.closeDialog();
			})
		},
		//数据渲染
		getDataById: function(i){
			if(this.list[i].childList&&this.list[i].childList.length!=0){
			    var navList=this.list[i];
				this.list=this.list[i].childList;
				this.navArr.push(navList);
				this.templateHtml(this.navArr,this.list);
				this.bindEven();
				this.addColor();
			}else{
			    var selectName='';
			    $.each(this.navArr,function(i,v){
			        if(i>0){
			            selectName+=v.name+'&nbsp';
			        }
			    });
			    selectName+=this.list[i].name;
				this.ele.html(selectName).css('color','#222');
				$('[name="'+this.option.codeName+'"]').val(this.list[i].code);
				this.closeDialog();
			}
		},
		//面包屑导航重新渲染
		chanageList: function(i){
		    i++;
		    var howmany=this.navArr.length-i;
		    this.navArr.splice(i,howmany);
			//console.log(navArr);
		    this.list=this.navArr[i-1].childList;
		    this.templateHtml(this.navArr,this.list);
			this.bindEven();
			this.addColor();
		},
		//面包屑导航颜色变化
		addColor: function(){
		    if(this.navArr.length>1){
				var lastNavIndex=this.navArr.length-1;
		        $('.chanageList:lt('+lastNavIndex+')').css('color','#1aa4fc');
		    }
		},
		//关闭选择页面
		closeDialog: function(){
		    this.navArr=[];
			this.list=[];
			$('.chanageList').off();
			$('.itemName').off();
			$('.closeDiv').off();
			$('.container').fadeOut(function() {
				$(this).remove();
			});
	    }
	}
	$.fn.showPanel = function(options) {
         //创建ShowPanel的实体
        var showPanel = new ShowPanel(this,options);
    };
})(jQuery,window,document)
