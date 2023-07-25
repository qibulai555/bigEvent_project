//在实际请求ajax的时候先调用ajaxPrefilter()
// 在这个函数中我们能拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options){
    //不用每次都写上根目录
    options.url = 'http://www.liulongbin.top:3007' + options.url
})