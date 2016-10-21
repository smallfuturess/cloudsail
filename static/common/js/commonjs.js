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

