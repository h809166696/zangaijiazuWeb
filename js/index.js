var imgHeadUrl = "http://www.zangaijiazu.cn/Images/";
$(function  () {
	checkUserIsLogined();
})
//看cookie是否存储有用户ID有的话直接登录即可
function checkUserIsLogined () {
	if (getCookie("userID")) {
		$(".loginUl").hide();
		$(".userDetailDiv img").attr("src",imgHeadUrl+getCookie("userIMGNAME"));
		$(".userDetailDiv p").text(getCookie("userName"));
		$(".userDetailDiv").show()
	}else
	{ 
		$(".userDetailDiv").hide();
		$(".loginUl").show()
	}
}