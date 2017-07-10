<?php

$pathname='index';
$filename='index';

//只要index.php之后输入地址信息就会有一个键值对的出现 'PATH_INFO' => string '/' (length=1)
// var_dump($_SERVER);
// $_SERVER['PATH_INFO']
//isset($_SERVER['PATH_INFO'])返回布尔值

if(isset($_SERVER['PATH_INFO'])){
    //获取index.php之后的地址  '/teacher/list'
    $urlpath=$_SERVER['PATH_INFO'];  
    //去掉字符串的第一个字符  
    $str=substr($urlpath,'1'); //  'teacher/list'
    // echo $str;
    //php中分割字符串
    $arr=explode('/',$str);  //  [teacher,list]

    if(count($arr)==2){
    $pathname=$arr[0];
    $filename=$arr[1]; 
    }else{
        //不是两层路径的直接退出程序
        // echo '404';
        // exit;
        //只要不是两层路径的直接退出程序
        $filename='login';
    }
}else{
    $filename='login';
}


include('./views/'.$pathname.'/'.$filename.'.html');

?>