define(['jquery', 'template', 'util'], function ($, template, util) {
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

            }
        });
    }else{
                /*没有id好就是添加功能*/
                var html=template('teacherTpl',{tc_operator:'添加讲师',tc_gender:0});
                /*添加默认文字/选项*/
                $('#teacherInfo').html(html);
    }


    /*添加讲师信息*/
    $('#swcbtn').click(function () {
        console.log($('#addForm').serialize());
        /*ajax将数据发送给服务器*/
        $.ajax({
            type: 'post',
            url: '/api/teacher/add',
            data: $('#addForm').serialize(),
            dataType: 'json',
            success: function (data) {
                // console.log(data);
                if (data.code == 200) {
                    location.href = '/teacher/list';

                }
            }
        });
    });



});