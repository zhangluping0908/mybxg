define(['jquery','util'], function ($,util) {
    /*根据a链接跳转路径设置所点击菜单的高亮效果*/
    // $('.aside .navs a[href="' + location.pathname + '"]').addClass('active');
    util.setMenu(location.pathname);
    // console.log(location.pathname);//   /teacher/list
})