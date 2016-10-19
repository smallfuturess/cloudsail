/**
 *调用方法  文档末尾提供了所有函数的功能，使用Utils.方法名即可调用  例如：Utils.alertwin("你好");
 */
$(function () {
	window.Utils=function () {
	/**
	 * alert comfirm 再包装
	 * 需要引入的外部文件 如系统采用bootstap技术，可在此js中统一引入bootstrap，否则在对应jsp/html中引入bootstrap，bootstrap版本自行控制
	 *<link rel="stylesheet" href="static/bootstrap/css/bootstrap.css">
	 *<script src="static/bootstrap/cloudsailjs/jquery-1.10.2.js"></script>
	 *<script src="static/bootstrap/cloudsailjs/bootstrap.min.js"></script>
	 * 调用：
	 * alert方法包装， 一个参数时提示范例：alertwin("提示消息")，两个参数时提供了回调处理：alertwin("提示消息",function(){回调处理});
	 * comfirm 方法包装，comfirmwin("确定要删除吗?"，function(){回调处理})
	 */
	$(function() {
		var alerthtml = "<div class='modal fade' style='overflow:auto;overflow-y:scroll;' id='ycf-alert' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>"
			+ "<div class='modal-dialog' style='width:350px;margin-top:250px;'>"
			+ "<div class='modal-content'>"
			+ "<div class='modal-header'>"
			+ "<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>"
			+ "</button>"
			+ "<h4 class='modal-title'>"
			+ '[Title]'
			+ "</h4>"
			+ "</div>"
			+ "<div class='modal-body'>"
			+ "[Message]"
			+ "</div>"
			+ "<div class='modal-footer'>"
			+ "<button type='button'  class='btn btn-default cancel' data-dismiss='modal'>[BtnCancel]"
			+ "</button>"
			+ "<button type='button' id='alertsure'  class='btn btn-primary ok'>"
			+ "[BtnOk]" + "</button>" + "</div>" + "</div>" + "</div>" + "</div>";
		var oDiv = document.createElement('div');
		oDiv.innerHTML = alerthtml;
		document.body.appendChild(oDiv);
		window.Modal = function() {
			var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
			var alr = $("#ycf-alert");
			var ahtml = alr.html();
			var _alert = function(options) {
				alr.html(ahtml); // 复原
				alr.find('.ok').removeClass('btn-success').addClass('btn-primary');
				alr.find('.cancel').hide();
				_dialog(options);
				$("#alertsure").click(function() {
					$("#ycf-alert").modal('hide');
				});
				return {
					on : function(callback) {
						if (callback && callback instanceof Function) {
							alr.find('.ok').click(function() {
								callback(true)
							});
						}
					}
				};
			};

			var _confirm = function(options) {
				alr.html(ahtml); // 复原
				// alr.find('.ok').removeClass('btn-primary').addClass('btn-success');
				alr.find('.cancel').show();
				_dialog(options);
				return {
					on : function(callback) {
						if (callback && callback instanceof Function) {
							alr.find('.ok').click(function() {
								callback(true);
								$("#ycf-alert").modal('hide');
							});
							alr.find('.cancel').click(function() {
								callback(false);
								$("#ycf-alert").modal('hide');
							});
						}
					}
				};
			};

			var _dialog = function(options) {
				var ops = {
					msg : "提示内容",
					title : "操作提示",
					btnok : "确定",
					btncl : "取消"
				};
				$.extend(ops, options);
				console.log(alr);
				var html = alr.html().replace(reg, function(node, key) {
					return {
						Title : ops.title,
						Message : ops.msg,
						BtnOk : ops.btnok,
						BtnCancel : ops.btncl
					}[key];
				});

				alr.html(html);
				alr.modal({
					width : 500,
					backdrop : 'static'
				});
			}
			return {
				alert : _alert,
				confirm : _confirm
			}
		}();
	});

	var _alertwin=function (message, callback) {
		var length = arguments.length;
		if (length == 1) {
			Modal.alert({
				msg : message
			}).on(function(e) {
				return;
			});
		} else {
			Modal.alert({
				msg : message
			}).on(function(e) {
				callback();
			});
		}
	};

	var _comfirmwin=function (message, callback){
		Modal.confirm({
			msg : message
		}).on(function(e) {
			if (e) {
				callback();
			}
		});
	}

	/**
	 *日期初始化(默认取上一个月的首尾日期) 根据不同需求可自行调整或重写
	 *直接调用 DataInit().StartTime,DataInit().EndTime
	 */
	var _monthdateinit=function (){
		var myDate=new Date();//日期初始化
		var year=myDate.getFullYear();
		var month=myDate.getMonth();
		month=month+1;
		var From;
		var To;
		var flag;
		if((year%4==0 && year%100!=0)||(year%100==0 && year%400==0)){
			flag=true;
		}
		switch(month){
			case 1:year=year-1;From=year+'-'+'12'+'-01 00:00:00';To=year+'-'+'12'+'-31 23:59:59';
				break;
			case 2:case 4:case 6 :case 8:case 9: case 11:
			month=month-1;
			if(month<10){
				month="0"+month;
			}
			From=year+'-'+month+'-01 00:00:00';To=year+'-'+month+'-31 23:59:59';break;
			case 5:case 7:case 10:case 12:
			month=month-1;
			if(month<10){
				month="0"+month;
			}
			From=year+'-'+month+'-01 00:00:00';To=year+'-'+month+'-30 23:59:59';break;
			case 3:
				month=month-1;
				month="0"+month;
				if(flag){
					From=year+'-'+month+'-01 00:00:00';To=year+'-'+month+'-29 23:59:59';break;
				}else{
					From=year+'-'+month+'-01 00:00:00';To=year+'-'+month+'-28 23:59:59';break;
				}
		}
		var datainit={StartTime:From.substr(0,10),EndTime:To.substr(0,10)};
		return datainit;
	};

	/**
	 *计算天数差的函数，通用
	 */
	var _datediff= function  (sDate1,  sDate2){    //sDate1和sDate2是2006-12-18格式
		var startTime = new Date(Date.parse(sDate1.replace(/-/g,"/"))).getTime();
		var endTime = new Date(Date.parse(sDate2.replace(/-/g,"/"))).getTime();
		var dates = Math.abs((startTime - endTime))/(1000*60*60*24);
		return  dates;
	}

	/**
	 *获取当前日期的前后AddDayCount天的日期
	 */
	var _getdatestr=function(date,daycount)
	{
		var ss = new Date(date);
		ss.setDate(ss.getDate()+daycount);//获取AddDayCount天后的日期
		var y = ss.getFullYear();
		var m = (ss.getMonth()+1)<10?"0"+(ss.getMonth()+1):(ss.getMonth()+1);//获取当前月份的日期，不足10补0
		var d = ss.getDate()<10?"0"+ss.getDate():ss.getDate(); //获取当前几号，不足10补0
		return y+"-"+m+"-"+d;
	}

	/**
	 *根据当前日期获取对应的星期
	 */
	var _getweekday=function  (date){
		var d, s = "";
		var x = new Array("星期日", "星期一", "星期二","星期三","星期四", "星期五","星期六");
		d = new Date(date);
		return x[d.getDay()];
	}

	/**
	 *根据当前日期推算当前一周开始日期
	 */
	var _startweekday=function  (date){
		var xingqi=_getweekday(date);
		switch(xingqi){
			case "星期一" : return date;
			case "星期二" : return _getdatestr(date,-1) ;
			case "星期三" : return _getdatestr(date,-2) ;
			case "星期四" : return _getdatestr(date,-3) ;
			case "星期五" : return _getdatestr(date,-4) ;
			case "星期六" : return _getdatestr(date,-5) ;
			case "星期日" : return _getdatestr(date,-6) ;
		}
	}

	/**
	 *根据当前日期推算当前一周结束日期
	 */
	var _endweekday=function(date){
		var xingqi=_getweekday(date);
		switch(xingqi){
			case "星期一" : return _getdatestr(date,6) ;
			case "星期二" : return _getdatestr(date,5) ;
			case "星期三" : return _getdatestr(date,4) ;
			case "星期四" : return _getdatestr(date,3) ;
			case "星期五" : return _getdatestr(date,2) ;
			case "星期六" : return _getdatestr(date,1) ;
			case "星期日" : return date ;
		}
	}

	/**
	 *两个日期比较 格式yyyy-mm-dd
	 */
	var _datecompare=function (date1,date2){
		var t1 = new Date(date1);
		var t2 = new Date(date2);
		if(Date.parse(t1) - Date.parse(t2)==0)
		{
			return 0;//想等
		}
		if(Date.parse(t1) - Date.parse(t2)<0)
		{
			return -1;//前者早于后者
		}
		if(Date.parse(t1) - Date.parse(t2)>0)
		{
			return 1;//前者迟于后者
		}
	}

	/**
	 *当前日期格式化 yyyy-mm-dd
	 */
	var _getnowformatdate=function () {
		var date = new Date();
		var seperator1 = "-";
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var currentdate = year + seperator1 + month + seperator1 + strDate;
		return currentdate;
	}

		/**
		 *分页封装
		 */
var _loadpage=function (rowCount,pageIndex,pageSize){
  var pageCount=Math.ceil(rowCount/pageSize);
  //设置页面
  var page="";
  if(pageCount<=5){
	  var vhtml="";
	  if(pageCount>=1){
		  vhtml="<li id='pagea'><a href='javascript:void(0)' onclick='topage(1,"+pageSize+")'>1</a></li>";
	  }
	  if(pageCount>=2){
		  vhtml+="<li id='pageb'><a href='javascript:void(0)' onclick='topage(2,"+pageSize+")'>2</a></li>";
	  }
	  if(pageCount>=3){
		  vhtml+="<li id='pagec'><a href='javascript:void(0)' onclick='topage(3,"+pageSize+")'>3</a></li>";
	  }
	  if(pageCount>=4){
		  vhtml+="<li id='paged'><a href='javascript:void(0)' onclick='topage(4,"+pageSize+")'>4</a></li>";
	  }
	  if(pageCount>=5){
		  vhtml+="<li id='pagee'><a href='javascript:void(0)' onclick='topage(5,"+pageSize+")'>5</a></li>";
	  }
	  page=	"<ul class='pagination' style='float:right;margin-right:0%'>"
		  +"<li><a href='javascript:void(0)' onclick='topage(1,"+pageSize+","+pageCount+")'>首页</a></li>"
		  +"<li><a href='javascript:void(0)' onclick='topage("+(pageIndex-1)+","+pageSize+","+pageCount+")'>上一页</a></li>"
		  +vhtml
		  +"<li><a href='javascript:void(0)' onclick='topage("+(pageIndex+1)+","+pageSize+","+pageCount+")'>下一页</a></li>"
		  +"<li><a href='javascript:void(0)' onclick='topage("+(pageCount)+","+pageSize+","+pageCount+")'>尾页</a></li>"
		  +"<li><a href='javascript:void(0)'>"+pageCount+"页/共"+rowCount+"条</a></li>"
	  "</ul>";
  }else{
	  if(pageIndex<=2){
		  var lihtml="";
		  if(pageIndex==1){
			  lihtml="<li id='pagea' class='active'><a href='javascript:void(0)'>1</a></li>"
				  +"<li><a id='pageb' href='javascript:void(0)' onclick='topage(2,"+pageSize+")'>2</a></li>";
		  }else{
			  lihtml="<li><a id='pagea' href='javascript:void(0)' onclick='topage(1,"+pageSize+")'>1</a></li>"
				  +"<li id='pageb' class='active'><a href='javascript:void(0)'>2</a></li>";
		  }
		  page="<ul class='pagination' style='float:right;margin-right:0%'>"
			  +"<li><a href='javascript:void(0)' onclick='topage(1,"+pageSize+","+pageCount+")'>首页</a></li>"
			  +"<li><a href='javascript:void(0)' onclick='topage("+(pageIndex-1)+","+pageSize+","+pageCount+")'>上一页</a></li>"
			  +lihtml
			  +"<li id='pagec' ><a href='javascript:void(0)' onclick='topage(3,"+pageSize+")'>3</a></li>"
			  +"<li id='paged'><a href='javascript:void(0)' onclick='topage(4,"+pageSize+")'>4</a></li>"
			  +"<li id='pagee'><a href='javascript:void(0)' onclick='topage(5,"+pageSize+")'>5</a></li>"
			  +"<li><a href='javascript:void(0)' onclick='topage("+(pageIndex+1)+","+pageSize+","+pageCount+")'>下一页</a></li>"
			  +"<li><a href='javascript:void(0)' onclick='topage("+pageCount+","+pageSize+","+pageCount+")'>尾页</a></li>"
			  +"<li><a href='javascript:void(0)'>"+pageCount+"页/共"+rowCount+"条</a></li>"
		  "</ul>";
	  }else if(pageCount>5&&(pageIndex>=(pageCount-2)&&pageIndex<=pageCount)){
		  page=	"<ul class='pagination' style='float:right;margin-right:0%'>"
			  +"<li><a href='javascript:void(0)' onclick='topage(1,"+pageSize+","+pageCount+")'>首页</a></li>"
			  +"<li><a href='javascript:void(0)' onclick='topage("+(pageIndex-1)+","+pageSize+","+pageCount+")'>上一页</a></li>"
			  +"<li id='pagea'><a href='javascript:void(0)' onclick='topage("+(pageCount-4)+","+pageSize+")'>"+(pageCount-4)+"</a></li>"
			  +"<li id='pageb'><a href='javascript:void(0)' onclick='topage("+(pageCount-3)+","+pageSize+")'>"+(pageCount-3)+"</a></li>"
			  +"<li id='pagec'><a href='javascript:void(0)' onclick='topage("+(pageCount-2)+","+pageSize+")'>"+(pageCount-2)+"</a></li>"
			  +"<li id='paged'><a href='javascript:void(0)' onclick='topage("+(pageCount-1)+","+pageSize+")'>"+(pageCount-1)+"</a></li>"
			  +"<li id='pagee'><a href='javascript:void(0)' onclick='topage("+(pageCount)+","+pageSize+")'>"+(pageCount)+"</a></li>"
			  +"<li><a href='javascript:void(0)' onclick='topage("+(pageIndex+1)+","+pageSize+","+pageCount+")'>下一页</a></li>"
			  +"<li><a href='javascript:void(0)' onclick='topage("+(pageCount)+","+pageSize+","+pageCount+")'>尾页</a></li>"
			  +"<li><a href='javascript:void(0)'>"+pageCount+"页/共"+rowCount+"条</a></li>"
		  "</ul>";
	  }else{
		  page=	"<ul class='pagination' style='float:right;margin-right:0%'>"
			  +"<li><a href='javascript:void(0)' onclick='topage(1,"+pageSize+","+pageCount+")'>首页</a></li>"
			  +"<li><a href='javascript:void(0)' onclick='topage("+(pageIndex-1)+","+pageSize+","+pageCount+")'>上一页</a></li>"
			  +"<li id='pagea' ><a href='javascript:void(0)' onclick='topage("+(pageIndex-2)+","+pageSize+")'>"+(pageIndex-2)+"</a></li>"
			  +"<li id='pageb' ><a href='javascript:void(0)' onclick='topage("+(pageIndex-1)+","+pageSize+")'>"+(pageIndex-1)+"</a></li>"
			  +"<li id='pagec' class='active'><a href='javascript:void(0)'>"+(pageIndex)+"</a></li>"
			  +"<li id='paged' ><a href='javascript:void(0)' onclick='topage("+(pageIndex+1)+","+pageSize+")'>"+(pageIndex+1)+"</a></li>"
			  +"<li id='pagee' ><a href='javascript:void(0)' onclick='topage("+(pageIndex+2)+","+pageSize+")'>"+(pageIndex+2)+"</a></li>"
			  +"<li><a href='javascript:void(0)' onclick='topage("+(pageIndex+1)+","+pageSize+","+pageCount+")'>下一页</a></li>"
			  +"<li><a href='javascript:void(0)' onclick='topage("+pageCount+","+pageSize+","+pageCount+")'>尾页</a></li>"
			  +"<li><a href='javascript:void(0)'>"+pageCount+"页/共"+rowCount+"条</a></li>"
		  "</ul>";
	  }

  }
  $("#pagecontent").html(page);
  if(pageCount<=5){
	  switch(pageIndex){
		  case 1:$("#pagea").addClass("active");break;
		  case 2:$("#pageb").addClass("active");break;
		  case 3:$("#pagec").addClass("active");break;
		  case 4:$("#paged").addClass("active"); break;
		  case 5:$("#pagee").addClass("active");break;
	  }
  }

  if(pageCount>5&&(pageIndex>=(pageCount-2)&&pageIndex<=pageCount)){
	  $("#pagea,#pageb,#pagec,#paged,#pagee").removeClass("active");
	  switch(pageIndex){
		  case   pageCount-2:$("#pagec").addClass("active");break;
		  case   pageCount-1:$("#paged").addClass("active");break;
		  case   pageCount:$("#pagee").addClass("active");break;
	  }
  }
};
function topage(pageIndex,pageSize,pageCount){
  if(pageIndex==0){alertwin("已经是第一页了");return;}
  if((pageIndex-1)==pageCount){alertwin("已经是最后一页了");return;}
  SourceLoad(pageIndex,pageSize);
}


    return{
		/**
		 * alert方法包装， 一个参数时提示范例：alertwin("提示消息")，两个参数时提供了回调处理：alertwin("提示消息",function(){回调处理});  参数：1/2
		 */
		alertwin:_alertwin,
		/**
		 * comfirm 方法包装，comfirmwin("确定要删除吗?"，function(){回调处理});参数：1
		 */
		comfirmwin:_comfirmwin,
		/**
		 *日期初始化(默认取上一个月的首尾日期) 根据不同需求可自行调整或重写;参数：0
		 *直接调用 DataInit().StartTime,DataInit().EndTime;
		 */
		getmonthdateinit:_monthdateinit,
		/**
		 *计算天数差的函数，通用;参数：2
		 */
		getdatediff:_datediff,
		/**
		 *获取当前日期的前后AddDayCount天的日期;参数：2
		 */
		getdatestr:_getdatestr,
		/**
		 *根据当前日期获取对应的星期;参数：1
		 */
		getweekday:_getweekday,
		/**
		 *根据当前日期推算当前一周开始日期;参数：1
		 */
		getstartweekday:_startweekday,
		/**
		 *根据当前日期推算当前一周结束日期;参数：1
		 */
		getendweekday:_endweekday,
		/**
		 *两个日期比较 格式yyyy-mm-dd;参数：2
		 */
		getdatecompare:_datecompare,
		/**
		 *当前日期格式化 yyyy-mm-dd;参数：0
		 */
		getnowdateformat:_getnowformatdate,
		/**
		 *分页;参数：3
		 */
		loadpage:_loadpage
	}
	}();
});

