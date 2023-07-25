$(function(){
    // 点击切换登录注册页面
    //点击'去注册账户'链接
    $('#link_reg').click(function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //点击'去登录'链接
    $('#link_login').click(function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })



    //自定义正则
    let form = layui.form
    let layer = layui.layer
    form.verify({
        // 密码
        pwd : [/^[\S]{6,12}$/, '密码必须为6到12位的非空字符'],
        // 确认密码
        repwd : function(value){
            // 通过形参拿到的是确认密码框中的值
            //要拿到密码框中的内容，进行一次判断，如果不符合return
            let pwd = $('.reg-box input[name="passwords"]').val()
            if(pwd != value){
                return '两次密码不一致'
            }
            }
    })
    


    //监控注册页面提交
    $('#form_reg').on('submit' , function(e){
        e.preventDefault()
        let data = {username : $('#form_reg [name="username"]').val(), 
        password : $('#form_reg [name="passwords"]').val()}
        // post发送到端口
        $.post('/api/reguser' , 
        data , 
        function(res){
            if(res.status != 0){
                return layer.msg(res.message)
            }
            layer.msg('注册成功')
        }
        )

    })

    //监控登录页面提交
    $('#form_login').on('submit' , function(e){
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method : 'post' ,
            data : $(this).serialize(),
            success : function(res){
                if(res.status !== 0){
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                // 将token的值存储到本地
                localStorage.setItem('token' , res.token)
                //跳转到index.html
                localStorage.href = './index.html'
            }

        })
    })

})