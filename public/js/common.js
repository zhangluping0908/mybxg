
// NProgress.start();


// NProgress.done();

/*这个js文件主要是放置公用的功能，每个页面都有的*/

/*需要那个文件就把哪个文件路径别名放在数组中，函数接收对应的文件返回结果，说明这个模块可以使用这个文件的方法及变量*/
/*因为这个cookie文件就是JQ的一个插件，只是使用了JQ的$方法，所有可以不用书写返回值*/
define(['jquery','template','cookie'], function ($,template) {
	/*点击侧边栏的下拉菜单功能*/
	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});

	/*每个页面的退出功能*/
        $('#logout').click(function(){
            $.ajax({
                type:'post',
                url:'/api/logout',
                dataType:'json',
                success:function(data){
                    console.log(data);
                    if(data.code==200){
						$.removeCookie('loginInfo',{path:'/'});
						/*退出的时候要把保存的cookie数据删除*/
                        location.href='/';  //直接根目录路径（mybxg.com或者mybxg.com/index.php）
                    }
                }
            });
        });

     /*根据用户的登录信息（cookie数据），请求到对应的用户头像及用户名称,然后渲染到主页面*/
    var info = $.cookie('loginInfo');
    // console.log(info);
    //{"tc_name":"admin","tc_avatar":"http://static.botue.com/images/avatar/58d3d54990dea.png"}
    
    var tpl =   '<div class="avatar img-circle">'
                +'<img src="{{tc_avatar}}">'
                +'</div>'
                +'<h4>{{tc_name}}</h4>';
    var html=template.render(tpl,info?JSON.parse(info):{});

    $('.aside .profile').html(html);
    //验证用户是否登录过
    //判断:地址栏输入（没有登录的情况下是不可以进入主页面）
    if(!$.cookie('PHPSESSID')&&location.pathname!='/'&&location.href!='/login'){
        location.href='/';
    }


});