$(function(){
    getUserInfo()

    // 点击实现退出功能
    $('#btnLogout').on('click' , function(){
        layer.confirm('确认退出登录吗?', {icon: 3, title:'提示'}, function(index){
            // 1.清空本地操作
            localStorage.removeItem('token')
            // 2.重新跳转到登录页面
            location.href = './login.html'
            // 关闭confirm询问框
            layer.close(index);
          })
    })
})



// 获取用户的个人信息
function getUserInfo(){
    $.ajax({
        method : 'get',
        url : '/my/userinfo',
        headers : {
            Authorization : lacalStorage.getItem('token') || ''
        }, 
        success : function(res){
            if(res.status !== 0){
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用renderAuatar()渲染用户头像
            renderAuatar(res.data)
        }
    })
}

//渲染头像
function renderAuatar(user){
    let name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if(user.user_pic !== null){
        $('.layui-nav-img').attr('src' , user.user_pic).show()
        $('.text-avatar').hide()
    }else{
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
        $('.layui-nav-img').hide()
    }
}