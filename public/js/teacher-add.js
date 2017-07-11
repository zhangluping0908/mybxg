define(['jquery', 'template', 'util','datepicker','language'], function ($, template, util) {

    /*根据a链接跳转路径设置所点击菜单的高亮效果*/
    // $('.aside .navs a[href="'+location.pathname+'"]').addClass('active');
    /*显示讲师管理下面的添加页面时（index/addoredit），应该还是讲师管理显示高亮。再使用以上方法就行不通了必须要写死才行，*/
    // $('.aside .navs a[href="/teacher/list"]').addClass('active');
    util.setMenu('/teacher/list');
    // console.log(location.pathname);//   /teacher/list

    /*添加或编辑讲师信息*/

    /*分析：编辑和添加使用同一个表单模板，并且提交的地址也是一样的，点击提交按钮都要渲染到公用表单模板，
    两者唯一的区别就是编辑的时候需要讲师id号查询到对应数据。*/

    /*编辑讲师信息*/
    /*根据讲师id才能编辑对应信息.封装一个方法去获取讲师的id号(获取地址栏中指定的参数值)。我们在编辑按钮使用拼接字符串方法*/

    /*有tc_id的时候才是编辑功能，才执行下面代码*/
    var tcId = util.qs('tc_id', location.search);
    // console.log(tcId);
    if (tcId) {

        $.ajax({
            type: 'get',
            url: '/api/teacher/edit',
            dataType: 'json',
            data: { tc_id: tcId },
            success: function (data) {
                // console.log(data);
                /*拿到数据要使用模板渲染到页面*/
                // console.log(data.result);
                /*因为讲师添加不能写死，需要一个有别于添加功能的属性，但是data.result中又没有，所以我们可以给它添加一个属性*/
                data.result.tc_operator = '编辑讲师';
                console.log(data.result);

                var html = template('teacherTpl', data.result);//没调用，好大的坑啊

                $('#teacherInfo').html(html);

                $('#swcbtn').click(function () {
                    /*因为按钮是渲染出来的，所以应该是等有数据了才能点击按钮提交*/
                    /*编辑时提交----更新数据发送给服务器，但是必须得知道是更新谁的数据，所以页面中要添加一个tc_id*/
                    submitForm('/api/teacher/update');
                    /*模板中竟然忘记写{{}}*/
                });

            }
        });
    } else {
        /*没有id好就是添加功能*/
        var html = template('teacherTpl', { tc_operator: '添加讲师', tc_gender: 0 });
        /*添加默认文字/选项*/
        $('#teacherInfo').html(html);

        $('#swcbtn').click(function () {
            /*添加时提交--*/
            submitForm('/api/teacher/add')
        });
    }


    // /*绑定表单提交事件*/
    // $('#swcbtn').click(function () {
    //     /*因为按钮是渲染出来的，所以应该是等有数据了才能点击按钮提交*/
    //     if (tcId) {
    //         /*编辑时提交----更新数据*/
    //         submitForm('/api/teacher/update');
    //     } else {
    //         /*添加时提交*/
    //         submitForm('/api/teacher/add')
    //     }
    // });


    function submitForm(url) {
        console.log($('#addForm').serialize());
        /*ajax将数据发送给服务器*/
        $.ajax({
            type: 'post',
            url: url,
            data: $('#addForm').serialize(),
            dataType: 'json',
            success: function (data) {
                // console.log(data);
                if (data.code == 200) {
                    location.href = '/teacher/list';

                }
            }
        });

    }


});