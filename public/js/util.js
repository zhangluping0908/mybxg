define(['jquery'],function($){
    //获取地址栏中指定的信息
    function qs(key,param){
    var obj={};
    if(param){
        var str=param.substr(1);
        if(str){
            var arr=str.split('&');
            arr.forEach(function(item){
                var kv=item.split('=');
                obj[kv[0]]=kv[1];
            })
        }
    }
    return obj[key]
}

return {
    qs:qs
}
    
});