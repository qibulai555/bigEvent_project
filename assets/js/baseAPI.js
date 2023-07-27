//在实际请求ajax的时候先调用ajaxPrefilter()
// 在这个函数中我们能拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options){
    //不用每次都写上根目录
    options.url = 'http://www.liulongbin.top:3007' + options.url



    // 判断是否由/my/，需要访问权限
    if(options.url.indexof('/my/') !== -1){
        options.headers = {
            Authorization : lacalStorage.getItem('token') || ''
        }
    }


    //控制用户的访问权限
    options.complete = function(res){
        //在res.responseJSON中会返回服务器响应回来的数据
        if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败'){
            // 1.强制清空token
            localStorage.removeItem('token')
            // 2.强制跳转到登录页面
            location.href = '/login.html'
        }
    }
    
})