/**
 * Created by pc on 2016/9/18.
 */
var log4js = require('log4js');
var path = require('path');

var errorLogsDiv = path.join(__dirname, '../logs/error.log');
var infoLogsDiv = path.join(__dirname, '../logs/info.log');


log4js.configure({
    "appenders": [
        {
            "category": "info",
            "type": "dateFile",
            "pattern": "-yyyy-MM-dd",
            "alwaysIncludePattern": true,
            "filename": infoLogsDiv
        }, {
            "category": "error",
            "type": "dateFile",
            "pattern": "-yyyy-MM-dd",
            "alwaysIncludePattern": true,
            "filename": errorLogsDiv
        }
    ]
});

var errorLogger = log4js.getLogger('error');
var infoLogger = log4js.getLogger('info');

module.exports = {
    error: function (error) {
        if (process.env.NODE_ENV === 'development') {
            console.log(error);
        } else {
            errorLogger.error(error);
        }
    },
    info: function (info) {
        if (process.env.NODE_ENV === 'development') {
            console.log(info);
        } else {
            infoLogger.error(info);
        }
    }
};