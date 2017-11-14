var url = "http://www.zangaijiazu.cn/zangaijiazu/servlet/user";
$(function  () {
//	$("table tr td input").each(function  (index) {
//		if (index<4) {
//			$(this).on("focus",function  () {
//			$(this).parent().next().children().each(function  () {
//				if ($(this).attr("class") != "error") {
//					$(this).css("display","inline-block");
//				}
//			})
//			
//			})
//			$(this).on("blur",function  () {
//			$(this).parent().next().children().css("display","none");
//			
//			})
//		}
//	})
})

function registerButtonClick(){
hj_showSpin("registerTable");
	var nickName = $("#nickName").val();
	if (nickName == "") {
		alert("昵称不能为空");
		return;
	}
	var account = $("#username").val();
	if (account == "") {
		alert("用户名不能为空");
		return;
	}
	var password1 = $("#password").val();
	if (password1 == "") {
		alert("密码不能为空");
		return;
	}
	var password2 = $("#repassword").val();
	if (password2 != password1) {
		alert("两次密码不一致");
		return;
	}
	var sexType = "";
//	$(".chooseSex").each(function  () {
//		if ($(this).attr("checked") == "checked") {
//			sexType = $(this).attr("sexType");
//		}
//	})\

var sexType=$('input:radio[name="sex"]:checked').attr("sexType");
	getAjaxBackStr(requestUrl,"action=register&sex="+sexType+"&account="+account+"&password="+password1+"&name="+nickName+"&kouLing=",function sucBlock(data) {
		hideSpin();
		switch (data){
			case "1":
			{
				alert("注册成功");
			}
				break;
				case "0":
				{
				alert("账号已存在");
				return;
			}
				break;
				case "-1":
				{
				alert("昵称已存在");
				return;
			}
				break;
			default:
			{
				alert("未知的错误");
				return;
			}
				break;
		}
		getAjaxBackStr(url,"action=login&account="+account+"&password="+password1+"",function sucBlock (data) {
			
			if (data != "-1" && data !="0") {
		
			 data = eval("("+data+")");
			data = data[0];
				setCookie("userID",data.UID,6000);
			setCookie("userName",data.NAME,6000);
			var imgName = "test.jpg";
			if (data.HEADURL != "") {
				imgName = data.HEADURL;
			}
			setCookie("userIMGNAME",imgName,6000);
			hideSpin();
		back();
			}
			hideSpin();
		},function failBlock () {
			hideSpin();
		});
	},function failerBlock () {
		hideSpin();
	})
}

