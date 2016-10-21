/**
 * Created by gem66 on 2016/10/19.
 */
$(function(){
    $("#dateSource1").click(function(){
        $ ("#Source1").slideToggle(800);
    });
    $("#dateSource2").click(function(){
        $ ("#Source2").slideToggle(800);
    });
    $("#dateSource3").click(function(){
        $ ("#Source3").slideToggle(800);
    });
    $("#dateSource4").click(function(){
        $ ("#Source4").slideToggle(800);
    });
    $("#dateSource5").click(function(){
        $ ("#Source5").slideToggle(800);
    });
    $("#dateSource6").click(function(){
        $ ("#Source6").slideToggle(800);
    });
    $("#dateSource7").click(function(){
        $ ("#Source7").slideToggle(800);
    });
    $("#dateSource8").click(function(){
        $ ("#Source8").slideToggle(800);
    });
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