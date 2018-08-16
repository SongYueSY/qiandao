const express = require('express');

const route = express.Router();

var users = [
    {id:1,loginName:'zs',password:'123456'},
    {id:2,loginName:'sy',password:'456789'},
]

var position = {
    jd: 100.254,
    wd: 845.124
}

route.post('/api/login',function(req,res,next){
    // body实体，它后面的变量名称对应ajax
    var loginName = req.body.loginName;
    var password = req.body.password;
    if(!loginName || !password){
        res.json({
            code:201,
            message:"账号和密码不能为空！"
        })
        return;
    }

    var index = users.findIndex(function(v){
        // console.log(v);
        return v.loginName === loginName && v.password === password
    })

    if(index == -1){
        res.json({
            code:202,
            message:"账号或密码出错！"
        })
        return;
    }

    console.log(loginName);
    res.json({
        code:200,
        message:"登陆成功！"
    })
})

route.post('/api/qd',function(req,res,next){
    // ||当前者有值，则使用前者的值，如果没值，则使用后者的值
    var jd = req.body.jd || 0;
    var wd = req.body.wd || 0;

    var distince = Math.sqrt(Math.pow(jd - position.jd,2) + Math.pow(wd - position.wd,2));

    /* if(distince < 100){
        res.json({
            code:200,
            message:"签到成功！"
        })
    }else{
        res.json({
            code:201,
            message:"签到不成功！"
        })
    } */

    distince < 100 ? res.json({
        code: 200,
        message: "签到成功！"
    }) : res.json({
        code: 201,
        message: "签到不成功！"
    })

})

module.exports = route;