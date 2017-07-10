define(['jquery', 'template','bootstrap'], function ($, template) {
    /*因为主页面的教师管理使用的a链接有默认跳转功能，所以跳转到指定页面的时候就显示列表数据*/
    $.ajax({
        type: 'get',
        url: '/api/teacher',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            /*在teacher页面书写模板，请求数据成功之后就渲染模板*/
            var html = template('teacherTpl', { list: data.result });
            $('#teacherInfo').html(html);
            /*教师的详情必须要等数据回来才能查看，所以必须要放在请求成功之后*/
            $('#teacherInfo').find('.preview').click(function () {
                /*点击谁的查看按钮就要显示谁的详情模态框*/
                var td = $(this).parent();
                /*获取对应的id*/
                var tcId = td.attr('data-tcId');
                console.log(tcId);
                $.ajax({
                    type: 'get',
                    url: '/api/teacher/view',
                    data: {
                        tc_id: tcId
                    },
                    dataType: 'json',
                    success: function (data) {
                        // console.log(data); 
                        var html=template('modalTpl',data.result);
                        /*显示模态框*/
                        $('#modalInfo').html(html); 
                        /*模态框是bootstrap的，所有要引入它的js文件*/
                        $('#teacherModal').modal(); 

                    }
                });
            });

        }
    });
}); 