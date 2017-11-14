var IMGURL = "http://www.zangaijiazu.cn/Images/";
var requestUrl = "http://www.zangaijiazu.cn/zangaijiazu/servlet/user";
var uploadPicHeadUrl = "http://www.zangaijiazu.cn/zangaijiazu/servlet/uploadImg";
var articleRequestUrl = "http://www.zangaijiazu.cn/zangaijiazu/servlet/articleManager";
//uploadPicHeadUrl = "http://localhost:8080/zangaijiazu/servlet/uploadImg";
//articleRequestUrl = "http://localhost:8080/zangaijiazu/servlet/articleManager";
//requestUrl = "http://localhost:8080/zangaijiazu/servlet/user";
function getAjax(url, parm, callBack,failBack) {
    jQuery.support.cors = true;
    $.ajax({
        type: 'post',
        dataType: "text",
        url: url,
        data: parm,
        cache: true,
        async: true, //异步
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            failBack();
        },
        success: function (msg) {
            var json = eval("(" + msg + ")");
            //            alert(msg);
            callBack(json);
        }
    });
}
function getAjaxBackStr(url, parm, callBack, failBack) {
    jQuery.support.cors = true;
    $.ajax({
        type: 'post',
        dataType: "text",
        url: url,
        data: parm,
        cache: true,
        async: true, //异步
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            failBack();
        },
        success: function (msg) {
            
            //            alert(msg);
            callBack(msg);
        }
    });
}


function showSpin() {
    //      var spinnerOpts = {
    //              lines: 11 // 共有几条线组成
    //              , length: 13 // 每条线的长度
    //              , width: 8 // 每条线的长度
    //              , radius: 19 // 内圈的大小
    //              , scale: 0.5 // Scales overall size of the spinner
    //              , corners: 0.1 // 圆角的程度
    //              , color: '#000' // #rgb or #rrggbb or array of colors
    //              , opacity: 0.1 // Opacity of the lines
    //              , rotate: 18 // 整体的角度（因为是个环形的，所以角度变不变其实都差不多）
    //              , direction: 1 // 1: clockwise, -1: counterclockwise
    //              , speed: 0.8 // 速度：每秒的圈数
    //              , trail: 55 //  高亮尾巴的长度
    //              , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
    //              , zIndex: 2e9 // z-index的值 2e9（默认为2000000000
    //              , className: 'spinner' // The CSS class to assign to the spinner
    //              , top: '50%' // Top position relative to parent
    //              , left: '50%' // Left position relative to parent
    //              , shadow: false // 是否要阴影
    //              , hwaccel: false // 是否用硬件加速
    //              , position: 'absolute' // Element positioning
    //      };
    //      var spinTarget = document.getElementById('content');
    //      new Spinner(spinnerOpts).spin(spinTarget);
    //      
    new Spinner().spin(document.getElementById('content'));
}

function hideSpin() {

    $(".spinner").remove();
}

function hj_showSpin(Id){
    if (document.getElementById(Id)) { new Spinner().spin(document.getElementById(Id)); }

}
function hj_noData(isHavaMoreData) {

    if (isHavaMoreData) {
        $(".dropload-refresh").text("↑上拉加载更多");
    } else {
        $(".dropload-refresh").text("暂无数据");
    }
}
function showNodataDiv(duration, elementId) {
    $("#" + elementId + "").css("position", "relative");
    var html = '<p class = "noDataP" style = "position:absolute;width:80px;height:20px;background-color:rgba(0,0,0,0.6);top:50%;left:50%;color:White;margin:-10px 0 0 -40px;text-align:center;border-radius:5px;font-size:13px;line-height:20px">暂无数据</p>';
    $("#"+elementId+"").append(html);
    setTimeout(function () {
        $(".noDataP").fadeOut(function () {
            $(".noDataP").remove();
        });
    }, duration*1000);
}

 function CheckChinese(val) {
        var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
        if (reg.test(val)) { return true; } else {
        return false;
        }
}
function checkIsEmial(value) {
    var emailvalue = value; //获取输入的邮箱
    //var emailreg1 = /^\w+([-+.]\w+)*@("@")\w+([-.]\w+)*\.\w+([-.]\w+)*$/;//这个也可以
    var emailreg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    if (!emailreg.test(emailvalue)) {
        return false;
    }
    return true;
}
function checkIsPhone(value) {
    var tel = value; //获取输入的手机号
    var yidongreg = /^(134[012345678]\d{7}|1[34578][012356789]\d{8})$/;
    var dianxinreg = /^1[3578][01379]\d{8}$/;
    var liantongreg = /^1[34578][01256]\d{8}$/;
    //var reg = /^1[3|4|5|7|8]\d{9}$/;//这一种也可以
    if (yidongreg.test(tel) || dianxinreg.test(tel) || liantongreg.test(tel)) {
        return true;
    }
    return false;
}

//<!--存cookie-->
function setCookie(c_name, value, expireTimes) {
    var times = new Date().getTime() + expireTimes * 1000;
    var exdate = new Date(times);
    //exdate.setDate(exdate.getDate()+expiredays)
    document.cookie = c_name + "=" + escape(value) +
    ((expireTimes == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/";
}

//<!--获取cookie-->
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}

//<!--删除cookie-->
function DelCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString() + ";path=/";
}

//获取页面参数值 
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象 
    var r = window.location.search.substr(1).match(reg); //匹配目标参数 
    if (r != null) return unescape(r[2]); return null; //返回参数值 
}
/**
文本框只允许输入数字
**/
function Keypress(obj) {
    $("#" + obj).bind("contextmenu", function () {
        return false;
    });
    $("#" + obj).css('ime-mode', 'disabled');
    $("#" + obj).keypress(function (e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });
}
/**
刷新页面
**/
function rePage() {
    window.location.href = window.location.href.replace('#', '');
    return false;
}

/**
* 返回上一级
*/
function back() {
    window.history.go(-1);
}

//跳转页面
function Urlhref(url) {
    window.location.href = url;
    return false;
}

//判断字符串是否为空
function IsNullOrEmpty(str) {
    var isOK = false;
    if (str == undefined || str == "") {
        isOK = true;
    }
    return isOK;
}
function createLoginDiv (callBack) {
	var divHtml = '<div style = "position:fixed;z-index:9999;width:100%;height:100%";top:0px;></div>';
}
//根据选中的图片获取到imgURL
function hj_getFileURL(file) {
var url = null ; 
if (window.createObjectURL!=undefined) { // basic
url = window.createObjectURL(file) ;
} else if (window.URL!=undefined) { // mozilla(firefox)
url = window.URL.createObjectURL(file) ;
} else if (window.webkitURL!=undefined) { // webkit or chrome
url = window.webkitURL.createObjectURL(file) ;
}
return url ;
}

function hj_checkIsLogin () {
	if (getCookie("userID")) {
		$(".loginUl").hide();
		$(".userDetailDiv img").attr("src",IMGURL+getCookie("userIMGNAME"));
		$(".userDetailDiv p").text(getCookie("userName"));
		$(".userDetailDiv").show()
	}else
	{ 
		$(".userDetailDiv").hide();
		$(".loginUl").show()
	}
}
function hj_getUserId () {
  var uid = getCookie("userID");
  return uid;
}
function loginOutClick () {
	DelCookie("userID");
	$(".userDetailDiv").hide()
	$(".loginUl").show();
}