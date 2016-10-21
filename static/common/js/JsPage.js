/**
 * Created by gem66 on 2016/10/19.
 */
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