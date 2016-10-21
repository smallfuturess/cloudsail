/**
 * Created by gem66 on 2016/10/19.
 */
$(function(){
    $("#alertconfirmSource1").click(function(){
        $ ("#ACSource1").slideToggle(500);
    });

});
function JsAlertConfrim(type){
    switch (type){
        case 'JsAlertConfrim1':Utils.alertwin("添加成功");break;
        case 'JsAlertConfrim2':Utils.alertwin('添加成功',function(){alert("我是回调函数");});break;
        case 'JsAlertConfrim3':Utils.comfirmwin('你确定要删除吗',function(){alert("我是回调函数");});break;
    }
}