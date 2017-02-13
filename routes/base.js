/**
 * Created by pc on 2016/9/12.
 */
var log4js = require('../middleware/log4js.js');
var base = require('../middleware/base.js');
var path = require('path');

module.exports = function (app) {
    'use strict';

    app.all('*', function (req, res, next) {
        //打印所有请求的UA
        //log4js.info(req.headers['user-agent'] + ' | ' + req.connection.remoteAddress);
        next();
    });

    //响应首页的route
    //app.get('/', function (req, res) {
    //  base.renderJade('index', {title: 'Hey,man', message: 'Hello there!'}, req, res);
    //});

    app.get('/8dbf90e54cbe8743284415dc048d5cf9.txt', function (req, res) {
        var file = path.join(__dirname, '../8dbf90e54cbe8743284415dc048d5cf9.txt');
        res.download(file);
    });

    app.post('/get', function (req, res) {
        var data = req.body;

        if (!data || !data.action) {
            return res.send('error');
        }

        GET(data.action, req, res).then(function (data) {
            res.send(data);
        });
    });

    app.post('/post', function (req, res) {
        var data = req.body;

        if (!data || !data.action) {
            return res.send('error');
        }

        POST(data.action, data, req, res).then(function (data) {
            res.send(data);
        });
    });
};
