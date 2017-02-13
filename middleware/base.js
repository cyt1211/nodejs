/**
 * Created by pc on 2016/9/18.
 */
var log4js = require('../middleware/log4js.js');
var email = require('../middleware/email.js');
var request = require('request');

var Q = require('q');



global.scm = 'http://192.168.30.100:8082/api';
global.coop = 'http://192.168.30.100:8081/api';
//
//
//if (process.env.NODE_ENV === 'production') {
//    global.scm = 'http://scm.service.fanhuan.com/api';
//    global.coop = 'http://hezuo.service.fanhuan.com/api';
//} else if (process.env.NODE_ENV === 'rc') {
//    global.scm = 'http://192.168.10.158:8082/api';
//    global.coop = 'http://192.168.10.158:8081/api';
//
//}

//渲染jade的方法统一处理
global.renderJade =  function (jadeUrl, data, req, res) {
    try {
        res.render(jadeUrl,
            data,
            function (error, html) {
                if (error) {
                    log4js.error(error);
                    email.mailAlert('jade render error | ' + error + ' | URL:/' + req.originalUrl + ' | ' + JSON.stringify(data));
                    res.render("error500", {});
                } else {
                    res.send(html);
                }
            }
        );
    } catch (e) {
        log4js.error(e);
    }
};

// GET请求
global.GET = function (url, req, res) {
    var api = req.body.site == "coop" ? global.coop : global.scm;
    url = api + url;

    if (process.env.NODE_ENV === 'development') {
        console.log("GET: " + url);
    }

    var defer = Q.defer();

    request.get({
            url: url,
            //rejectUnauthorized: false,
            headers: {
                'Content-Type': 'application/json',
                'A9D5EMD96D5E5G': encodeURIComponent(req.cookies.A9D5EMD96D5E5G)
            }
        }, function (error, response, body) {
            try {
                if (!error && response.statusCode === 200) {

                    if (process.env.NODE_ENV === 'development') {
                        console.log('return:');
                        console.log(body);
                    }

                    defer.resolve(JSON.parse(body));

                } else {
                    email.mailAlert(req.originalUrl + '|' + url + ' | GET | ' + JSON.stringify(body) + ' | ' + 'HTTP request error | ' + error + ' | HTTP return:' + JSON.parse(body));
                    res.render("error500", {});
                    defer.reject();
                }
            } catch (e) {
                email.mailAlert(req.originalUrl + '|'+ url + ' | GET | ' + 'HTTP request try{}Catch error, ' + error + ' | HTTP return:' + JSON.parse(body));
                res.render("error500", {});
                defer.reject();
            }
        }
    );

    return defer.promise;

};

//POST请求
global.POST = function (url, data, req, res) {
    var api = req.body.site == "coop" ? global.coop : global.scm;
    url = api + url;

    if (process.env.NODE_ENV === 'development') {
        //console.log("POST: " + url);
        //console.log(data);
    }

    var defer = Q.defer();

    request.post({
            url: url,
            form: data,
            //rejectUnauthorized: false,
            headers: {
                'Content-Type': 'application/json',
                'requestTimeSpan': data.requestTimeSpan,
                'sign': data.sign,
                'A9D5EMD96D5E5G': encodeURIComponent(req.cookies.A9D5EMD96D5E5G)
            }
        }, function (error, response, body) {
            try {
                if (!error && response.statusCode === 200) {

                    if (process.env.NODE_ENV === 'development') {
                        //console.log('return:');
                        //console.log(body);
                    }

                    defer.resolve(JSON.parse(body));

                } else {
                    email.mailAlert(req.originalUrl + '|' + url + ' | POST | ' + JSON.stringify(data) + ' | ' + 'HTTP request error | ' + error + ' | HTTP return:' + JSON.parse(body));
                    res.render("error500", {});
                    defer.reject();
                }
            } catch (e) {
                email.mailAlert(req.originalUrl + '|' + url + ' | POST | ' + 'HTTP request Try{}Catch error, ' + error + ' | HTTP return:' + JSON.parse(body));
                res.render("error500", {});
                defer.reject();
            }
        }
    );

    return defer.promise;
};

//通过UA获取当前访问的设备
global.getPlatform = function (req) {
    var userAgent = req.headers['user-agent'];

    if (userAgent.match(/iPad|iPod|iPhone/i)) {
        return 'iOS';
    }
    else if (userAgent.match(/Android/i)) {
        return 'Android';
    }

    return "others";
}