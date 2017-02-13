/**
 * Created by pc on 2016/9/19.
 */
'use strict';

var request = require('request');

module.exports = function (app) {
    var data;

//    app.use(function (req, res, next) {
//        global.userId = req.cookies.userDetial && req.cookies.userDetial.split("|")[1];
//        next();
//    });

    //重定向
    app.get('/applylist', function (req, res) {
        res.redirect("/");
    });

    // 首页
    app.get('/', function (req, res) {
        require("./route/index.js")(req, res);
    });


    // 规则
    app.get('/rule', function (req, res) {
        data = {
            title: "返还网商家免费报名平台",
            page: "rule",
            tab: req.query.tab
        };
        renderJade('rule', data, req, res);
    });


    // 专题品牌团报名成功
    app.get('/apply/brandApplySuccess', function (req, res) {
        data = {
            title: "返还网商家免费报名平台",
            page: "apply",
            type: req.query.type
        };
        renderJade('brandApplySuccess', data, req, res);
    });

};
