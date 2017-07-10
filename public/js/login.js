define(['jquery', 'cookie'], function ($) {
    $('#btn').on('click', function () {
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $('#loginForm').serialize(),
            dataType: 'json',
            success: function (data) {
                // console.log(data);
                if (data.code == 200) {
                    // console.log(data.result);//返回一个对象

                    /*登录成功后要用cookie保存用户信息。方便其他页面的获取*/

                    $.cookie('loginInfo', JSON.stringify(data.result), { path: '/' });
                    /*这个方法的使用要基于cookie，所有要先导入*/
                    location.href = 'index.php/index/index';
                    //这时候刷新页面会看到地址栏中有index.php,一般情况下要让它隐藏，只需将.htaccess文件放到文件的跟目录下
                }
            }
        });
        return false;
        //去掉了 type="button"，type 就变成默认的 "submit"，区别是 type="submit" 点击以后默认会提交所在的表单，
        // type="button" 没有默认行为。因为你要自定义行为，所以建议你还是加上。
    });



        });

