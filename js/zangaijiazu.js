//选中的图片文件数组
var choosePicturesArray = [];
var articleModelArray = [];
var userModelArray = [];
$(function() {
// checkUserIsLogined();
     hj_checkIsLogin();
 getArticle(function suc () {
   	$("img.lazy").lazyload(
    {
    		effect : "fadeIn",
    		failure_limit : 20,
    		threshold : 200
    }
    );
   },function fai () {
   	alert("游记获取失败")
   })
  
   getUser(function suc () {
   	
   	$("img.lazy").lazyload(
    {
    		effect : "fadeIn",
    		failure_limit : 20,
    		threshold : 200
    }
    );
   	
   },function fai () {
   	
   })
})
//看cookie是否存储有用户ID有的话直接登录即可
//function checkUserIsLogined () {
//	if (getCookie("userID")) {
//		$(".loginUl").hide();
//		$(".userDetailDiv img").attr("src",IMGURL+getCookie("userIMGNAME"));
//		$(".userDetailDiv p").text(getCookie("userName"));
//		$(".userDetailDiv").show()
//	}else
//	{ 
//		$(".userDetailDiv").hide();
//		$(".loginUl").show()
//	}
//}
//请求帖子
function getArticle (Sblock,Fblock) {
	$(".articleDetailDiv").remove();
//	$(".hotArticle").each(function  (index) {
//		if ($(this).attr("class") == "articleDetailDiv") {
//			$(this).remove();
//		}
//	});
	getAjax(articleRequestUrl,"action=getArticle&pageIndex=1&pageSize=10",function sucBlock (data) {
		articleModelArray = data;
		for (var i = 0; i < data.length; i++) {
		var articleModel = 	data[i];
		var allUrl = IMGURL + articleModel.AUTHOR.HEADURL;
		var articleHtml = '<a href="articleDetail.html?articleID='+articleModel.ARTICLEID+'" class="articleDetailDiv"><p class="AuthorName">'+articleModel.AUTHOR.NAME+'</p><img class="lazy userHeadImg" alt="" width="40" height="40"  data-original="'+allUrl+'"/><p class="articleTitle">'+articleModel.ARTICLENAME+'</p><p class = "articleContent">'+articleModel.ARTICLECONTENT+'</p><div class="timeAndDiscussDiv"><div class = "timeLabel"><img src="img/time.png"/><p>'+articleModel.lastEditTime+'</p></div><div class="watchNumberLabel"><img src="img/lookNumber.png"/><p>'+articleModel.LOOKCOUNT+'</p></div><div class="discussNumberLabel"><img src="img/discussNumber.png"/><p>'+articleModel.DISCUSSCOUNT+'</p></div></div></a>';
//		var articleHtml = '<a href="#" class="articleDetailDiv"><p class="AuthorName">我是一个用户</p><img class="lazy userHeadImg" alt="" width="40" height="40"  data-original="img/0.jpg"/><p class="articleTitle">我是一个标题</p><p class = "articleContent">今天天气不错啊啊啊啊啊啊啊啊啊啊啊啊啊啊</p><div class="timeAndDiscussDiv"><div class = "timeLabel"><img src="img/time.png"/><p>2017/5/67 12:56:45</p></div><div class="watchNumberLabel"><img src="img/lookNumber.png"/><p>45</p></div><div class="discussNumberLabel"><img src="img/discussNumber.png"/><p>56</p></div></div></a>';
		$(".hotArticle").append(articleHtml);
		if (articleModel.ARTICLEIMG != "") {
			var imgContentHtml = '<div class="imgContentDiv"></div>';
			$(".articleContent:last").after(imgContentHtml);
			var tmpImgArray = articleModel.ARTICLEIMG.split(",");
			for (var J = 0; J < tmpImgArray.length; J++) {
			  var imgUrl = tmpImgArray[J];
			  var allUrl = IMGURL+imgUrl;
			  var imgHtml = '<img class="lazy" alt="" width="250" height="250"  data-original="'+allUrl+'"/>';
			  $(".imgContentDiv:last").append(imgHtml);
			}
		}
		}
		initXiaoGuo();
		Sblock();
	},function failblock () {
		Fblock();
	})
}
//请求用户
function getUser (Sblock,Fblock) {
	$(".zhaoHuanShiUl").empty();
	getAjax(articleRequestUrl,"action=getUser&pageIndex=1&pageSize=10",function sucBlock (data) {
		userModelArray = data;
		for (var i = 0; i < data.length; i++) {
		var userModel = data[i];
		var userImg = IMGURL + userModel.HEADURL;
		var jianJie = "简介:";
		if (userModel.DESCRIPTION != "") {
			jianJie = jianJie+userModel.DESCRIPTION;
		}else
		{
			jianJie = jianJie+"这个人很懒,什么都没写";
		}
		var userHtml = '<li><a href="#" class="zhaoHuanContent"><img class="lazy zhaoHuanShiImg" alt="" width="60" height="60"  data-original="'+userImg+'"/><p class="zhaoHuanShiName">'+userModel.NAME+'</p><p class="jianJie">'+jianJie+'</p></a></li>';
		$(".zhaoHuanShiUl").append(userHtml);
		}
		Sblock();
	},function FailBlock () {
		Fblock();
	})
}
//选中图片
function chooseImgClick (element) {
		var objUrl;
		var picCount = 3;
		if (choosePicturesArray.length+element.files.length > 3) {
			alert("最多选择三张图片");
			return;
		}
		
			picCount = element.files.length;
		 
			for (var i = 0; i < picCount; i++) {
				choosePicturesArray.push(element.files[i]);
			}
			
			dealFile();

}
//删除图片方法
function deleteClick (deleteButton) {
	var imgDiv = $(deleteButton).parent();
  choosePicturesArray.splice(parseInt($(deleteButton).attr("index")),1);console.log(choosePicturesArray);
  dealFile();
}
//文件数组变化后处理方法
function dealFile () {
	 $(".choosePictureDiv").children().each(function  () {
		  	if ($(this).attr("class") == "imgDiv") {
		  		$(this).remove();
		  	}
		  })
			for (var i = 0; i < choosePicturesArray.length; i++) {
			  var tmpfile = choosePicturesArray[i];
//			  var name = element.files[i].name;
			
			if(navigator.userAgent.indexOf("MSIE")>0){
objUrl = element.value;
}else{ 
//	var tmpFile = element.files[i];
	objUrl = hj_getFileURL(tmpfile);

}
var imgHtml = '<div class="imgDiv"><img src="'+objUrl+'" class="chooseImg" alt="" /><button class="deleteButton" index="'+i+'" onclick="deleteClick(this)"></button></div>';
$(".choosePictureDiv").append(imgHtml);
			}
}

function commitArticleButtonClick () {

if (IsNullOrEmpty(getCookie("userID"))) {
	Urlhref("login.html");return;
}


var articleTitle = $("#articelTitle").val();
if (articleTitle == "") {
	alert("标题不能为空");return;
}
var articleContent = $(".articelContent").val();
if (articleContent == "") {
	alert("内容不能为空");return;
}
hj_showSpin("writeArticleDiv");
var formData = new FormData();
for (var i = 0; i < choosePicturesArray.length; i++) {
	var tFile =  choosePicturesArray[i];
	formData.append('file', tFile);
}

formData.append('ARTICLENAME', articleTitle);
formData.append('ARTICLECONTENT', articleContent);
formData.append('UID', getCookie("userID"));
//formData.append('USERNAME', getCookie("userName"));
//formData.append('USERIMG', getCookie("userIMGNAME"));
formData.append('action', "addArticle");

$.ajax({
    url: uploadPicHeadUrl,
    type: 'POST',
    cache: false,
    data: formData,
    processData: false,
    contentType: false
}).done(function(res) {
	hideSpin();
	if (res == "1") {
		alert("发布成功");
		rePage();
		
	}else
	{
		alert("出问题了");
	}
	
	console.log(res);
}).fail(function(res) {hideSpin(); alert("发布失败");});
}

//设置鼠标放上去的效果
function initXiaoGuo () {
	//设置鼠标放置上去的效果
		
		$(".articleDetailDiv").each(function  () {
			$(this).hover(function(){
			$(this).children().each(function(){
				
				if($(this).attr("class") == "articleTitle"){
				$(this).css("color","#01c6c8");
				}
				}
			)
			
		},function  () {
			$(this).children().each(function(){
				
				if($(this).attr("class") == "articleTitle"){
				$(this).css("color","rgb(112,112,112)");
				}
				}
			)
		});
		})
}