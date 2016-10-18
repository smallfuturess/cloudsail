/**
 * Created by gem66 on 2016/10/17.
 */
$(function(){
    $("#toTop").click(function(){
        $("html").animate({"scrollTop": "0px"},100); //IE,FF
        $("body").animate({"scrollTop": "0px"},100); //Webkit
    });
});
$(function() {
    $('.demo-cancel-click').click(function(){return false;});
});

function jsdate(type){
    switch (type){
        case 'jsdate1':Utils.alertwin(Utils.getnowdateformat());break;
        case 'jsdate2':Utils.alertwin(Utils.getdatecompare('2016-10-01','2016-10-05'));break;
        case 'jsdate3':Utils.alertwin(Utils.getweekday('2016-10-01'));break;
        case 'jsdate4':Utils.alertwin(Utils.getstartweekday('2016-10-01'));break;
        case 'jsdate5':Utils.alertwin(Utils.getendweekday('2016-10-01'));break;
        case 'jsdate6':Utils.alertwin(Utils.getdatestr('2016-10-01',-2));break;
        case 'jsdate7':Utils.alertwin(Utils.getdatediff('2016-10-01','2016-10-10'));break;
        case 'jsdate8':Utils.alertwin(Utils.getmonthdateinit().StartTime);break;
        case 'jsdate9':Utils.alertwin(Utils.getmonthdateinit().EndTime);break;
    }
}

function JsAlertConfrim(type){
    switch (type){
        case 'JsAlertConfrim1':Utils.alertwin("添加成功");break;
        case 'JsAlertConfrim2':Utils.alertwin('添加成功',function(){alert("我是回调函数");});break;
        case 'JsAlertConfrim3':Utils.comfirmwin('你确定要删除吗',function(){alert("我是回调函数");});break;
    }
}

function jspage(){
    var data={pageparam:{pageCount:1,pageIndex:1,pageSize:10,rowCount:1},dataparam:[{m_id:1,ym_id:1,ym_isdel:1,ym_loginname:'1234567',ym_name:'呵呵',ym_password:'1234567',ym_phone:'15142154167',ym_sex:'男'},{m_id:1,ym_id:1,ym_isdel:1,ym_loginname:'1234567',ym_name:'呵呵',ym_password:'1234567',ym_phone:'15142154167',ym_sex:'男'},{m_id:1,ym_id:1,ym_isdel:1,ym_loginname:'1234567',ym_name:'呵呵',ym_password:'1234567',ym_phone:'15142154167',ym_sex:'男'},{m_id:1,ym_id:1,ym_isdel:1,ym_loginname:'1234567',ym_name:'呵呵',ym_password:'1234567',ym_phone:'15142154167',ym_sex:'男'},{m_id:1,ym_id:1,ym_isdel:1,ym_loginname:'1234567',ym_name:'呵呵',ym_password:'1234567',ym_phone:'15142154167',ym_sex:'男'}]};
    var datalist=data.dataparam;
    var trs="";
    for(var i=0;i<data.dataparam.length;i++){
        trs+="<tr><td>"+datalist[i].ym_loginname+"</td><td>"+datalist[i].ym_name+"</td><td>"+datalist[i].ym_sex+"</td><td>"+datalist[i].ym_phone+"</td>";
    }
    document.getElementById("listinfo").innerHTML=trs;
    //分页数据展示
    var datalist=data.pageparam;
    Utils.loadpage(datalist.rowCount,datalist.pageIndex,datalist.pageSize);
    $("#pageshow").show();
}