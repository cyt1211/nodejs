/**
 * Created by pc on 2016/9/12.
 */
(function () {
    window.util = {
        checkUrl: function (url) {
            var reg = /^(http|https):\/\/[a-z|A-Z|0-9|-]+\.(tmall|taobao|yao.[0-9]*)\.(com|hk)(?=.*id)/;
            return reg.test(url);
        },
        getParam: function (key) {
            var search = location.search;
            try {
                var params = search.split("?")[1].split("&");
                var obj = {};
                for (var i = 0, len = params.length; i < len; i++) {
                    var item = params[i].split("=");
                    obj[item[0]] = item[1];
                }

                return obj[key];
            } catch (e) {
                return false;
            }
        },
        twoDecimals: function (num) {
            return /^[0-9]+(.[0-9]{1,2})?$/.test(num);
        },
        isNum: function (num) {
            return /^[0-9]+$/.test(num);
        },
        isEmail: function (email) {
            return /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(email);
        },
        checkPassword: function (psd) {
            return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/.test(psd);
        },
        isIE7: function () {
            return navigator.appVersion.indexOf("MSIE 7") > -1;
        },
        isIE8: function () {
            return navigator.appVersion.indexOf("MSIE 8") > -1;
        },
        isIE9: function () {
            return navigator.appVersion.indexOf("MSIE 9") > -1;
        }
    }
}());
