var selectIndex;
var newIndexModel;
var discussPageIndex = 1;

$(function  () {
   artileId = getUrlParam("articleID");
   if (IsNullOrEmpty(artileId)) {
   	alert("不是有效的帖子");
   } else{
 	hj_showSpin("content");
   	 getArticleDetail(artileId,discussPageIndex);
   }
	hj_checkIsLogin();
})

//选中的图片文件数组
var choosePicturesArray = [];
//帖子的ID
var artileId = "";
//帖子详情模型和评论模型数组
var articleDetailModel,discussModelArray;
//获取帖子详情
function getArticleDetail (articleID,pageIndex) {
	getAjaxBackStr(articleRequestUrl,"action=getArticleDetail&articleID="+articleID+"&pageIndex="+pageIndex+"",function suc(data) {
		if (data == "-1") {
		alert("该帖子已被删除");
		} else{
			var jsonData = eval("("+data+")");
			addDataToview(jsonData);
			$(".prePage").css("color","#8a8a8a");
			
		}
	},function  fail() {
		alert("请求失败");
	})
}

//将帖子加入到页面上
function addDataToview (jsonData) {
articleDetailModel = jsonData.articleDetail;
discussModelArray = jsonData.discussDetail;

  addAuthorText(articleDetailModel)
   addDisscussMethod(discussModelArray);
}
//添加帖子主题
function addAuthorText (articelDetailModel) {
	 $(".article_authorli .article_title").text(articleDetailModel.ARTICLENAME);
 $(".article_authorli .userMessageDiv .article_userImg").attr("src",IMGURL+articleDetailModel.author.HEADURL);
  $(".article_authorli .userMessageDiv .article_userName").text(articleDetailModel.author.NAME);
  $(".article_authorli .article_contentDiv .articleDetail_contentDiv .article_content").text(articleDetailModel.ARTICLECONTENT);
  var imgNameArray = [];

if (articleDetailModel.ARTICLEIMG != "") {
  	imgNameArray = articleDetailModel.ARTICLEIMG.split(",");
//var array1 = testStr.split(",");
}
$(".article_authorli .article_contentDiv .articleDetail_contentDiv .articleDetail_imgDiv").empty();
  for (var i = 0; i < imgNameArray.length; i++) {
  var imgName = IMGURL + imgNameArray[i];
  var imgHtml = '<img src="'+imgName+'"/>';
  $(".article_authorli .article_contentDiv .articleDetail_contentDiv .articleDetail_imgDiv").append(imgHtml);
  }
  $(".article_authorli .article_contentDiv .article_timeP").text(articleDetailModel.ARTICLEDATE.replace(".0",""));
}
//添加底下评论
function addDisscussMethod (discussModelArray) {
	if (discussModelArray.length < 10) {
				$(".nextPage").css("color","#8a8a8a");
			}else
			{
			$(".nextPage").css("color","blue");
			}
			if (discussPageIndex > 1) {
				$(".prePage").css("color","#blue");
			}else
			{
				$(".prePage").css("color","#8a8a8a");
			}
	$(".articleUl").children().each(function  (index) {
		if($(this).attr("class") != "article_authorli"){
			$(this).remove();
		}
	})
	//添加底下的评论
  for (var i = 0; i < discussModelArray.length; i++) {
  var discussModel = discussModelArray[i];
  var discussUserImg = IMGURL + discussModel.author.HEADURL;
  var discussUserName = discussModel.author.NAME;
  var content = discussModel.content;
  var discussTime = discussModel.TIME.replace(".0","");
  var discussHtml = '<li class="article_li" index = '+i+'><a class="userMessageDiv"><img src="'+discussUserImg+'"/ class="lazy article_userImg"><p class="article_userName">'+discussUserName+'</p></a>\
					<div class="article_contentDiv">\
						<div class="articleDetail_contentDiv">\
							<p class="article_content">'+content+'</p>\
						</div>\
						<span id="article_replyButton"  onclick="replyButtonClick(this)">回复</span>\
						<p class="article_timeP">'+discussTime+'</p>\
						<div class = "replyUlContentDiv"><ul class="replyUl" id="replyUl'+i+'"></ul><div class="replypageDiv" id="replypageDiv'+i+'">\
				<span class="replyprePage" onclick="replyprePage(this)">\
					上一页\
				</span>\
				<span class="replynextPage" onclick="replynextPage(this)">\
					下一页\
				</span>\
			</div></div></div></li>';
						$(".articleUl").append(discussHtml);
						var imageNameArr = [];
						if (discussModel.images != "") {
  	imageNameArr = discussModel.images.split(",");
//var array1 = testStr.split(",");
}
						var imgHtml = '';
  for (var j = 0; j < imageNameArr.length; j++) {
  var imgName = IMGURL + imageNameArr[j];
  imgHtml = imgHtml + '<img src="'+imgName+'"/>';
 
  }
  if (imgHtml != "") {
  	var imgDiv = '<div class="articleDetail_imgDiv">'+imgHtml+'</div>';
  	$(".articleDetail_contentDiv:last").append(imgDiv);
  }
						
						
						//添加二级回复
						var replyArray = discussModel.reply;
						for (var z = 0;z < replyArray.length;z++) {
						var replyModel = replyArray[z];
						var replyHtml
						if (replyModel.toPerson.UID == discussModel.from_id) {
							replyHtml = '<li class = "secondReplyLi" index = '+z+'><p class="replyUserP"><span class="fromUserNameSpan">'+replyModel.author.NAME+'</span> :</p>\
						<p class="replyContent">'+replyModel.content+'</p><span class = "timeSpan">'+replyModel.TIME.replace(".0","")+'</span>\
						<a class="replyA" onclick = "secondReplyClick(this)">回复</a></li>';
						}else
						{
							replyHtml = '<li class = "secondReplyLi" index = '+z+'><p class="replyUserP"><span class="fromUserNameSpan">'+replyModel.author.NAME+'</span>回复 <span class="toUserNameSpan">'+replyModel.toPerson.NAME+'</span>:</p>\
						<p class="replyContent">'+replyModel.content+'</p><span class = "timeSpan">'+replyModel.TIME.replace(".0","")+'</span>\
						<a class="replyA" onclick = "secondReplyClick(this)">回复</a></li>';
						}
					   $(".replyUl:last").append(replyHtml)
					  
						}
						 discussModel["pageIndex"] = 1;
						if ($(".replyUl:last").children().length >=10) {
							$(".replypageDiv:last").show();
							$(".replynextPage:last").css("color","blue");
						}else
						{
							$(".replynextPage:last").css("color","#8a8a8a");
						}
						
  }
  $("html,body").animate({"scrollTop":"0px"},800);
  hideSpin()
}
//添加评论
//function addDiscuss() {
//	$
//}
//索引的模型
function indexModel (x,y) {
	this.x = x;
	this.y = y;
}
//针对二级回复的回复
function secondReplyClick (ele) {
	var yIndex = $(ele).parents(".secondReplyLi").attr("index");
	var xIndex = $(ele).parents(".article_li").attr("index");
	newIndexModel = new indexModel(xIndex,yIndex);
	var top = $(ele).offset().top;
	$(".replyInput").css({"top":top+$(ele).height()});
	$(".replyInput").show();
	$(".replyInput textarea").val("");
}
//针对评论的回复
function replyButtonClick (element) {
	var top = $(element).offset().top;
	$(".replyInput").css({"top":top+$(element).height()});
	$(".replyInput").show();
	$(".replyInput textarea").val("");
	var tmpEle = $(element).parents(".article_li");
    
	selectIndex = $(element).parents(".article_li").attr("index");
	newIndexModel = new indexModel(selectIndex,-1);
}
//针对作者的回复
function replyAuthorButtonClick (ele) {
	$("html,body").animate({"scrollTop":$(".writeArticleDiv").offset().top},800);
}
function clickReply () {
	var uid = hj_getUserId();
	if (IsNullOrEmpty(uid)) {
		window.location.href = "login.html";
	
	}else{
	var replyContent = $(".replyInput textarea").val();
	if (IsNullOrEmpty(replyContent)) {
		alert("回复内容不能为空");
	}else{
		var to_uid = "";
		if (newIndexModel != null ) {
			if (newIndexModel.y != -1 && newIndexModel.y != null) {
				var discussModel1 = discussModelArray[newIndexModel.x];
				to_uid = discussModel1.reply[newIndexModel.y].author.UID;
			}else
			{
				to_uid = discussModelArray[newIndexModel.x].from_id;
			}
			 var discussModel = discussModelArray[newIndexModel.x];
	   publishReply(discussModel,replyContent,to_uid);
		}else
		{
		alert("不是正确的索引");
		}
	  
	}
	}
}
//提交回复
function publishReply (disModel,content,touid) {
	hj_showSpin("replyInput");
	var uid = hj_getUserId();
	 var indexModel1 = new indexModel(newIndexModel.x,newIndexModel.y);
	getAjaxBackStr(articleRequestUrl,"action=publishReply&articleID="+articleDetailModel.ARTICLEID+"&commentid="+disModel.discussID+"&content="+content+"&fromuid="+uid+"&touid="+touid+"",function sucBlock (str) {
		hideSpin();
		if (str == "1") {
			alert("发表成功！")
			$(".replyInput").hide();
			var discussModel = discussModelArray[indexModel1.x];
			if (discussModel.reply.length < 10) {
				refreshReplyUl(indexModel1,function  () {
					
				},function  () {
					
				});
			}else
			{
				
			}
			
			
		}else
		{
			alert("发表失败");
		}
		
	},function failBlock () {
		alert("发表失败")
		hideSpin();
	})
}

//上一页 下一页
function prePage (ele) {
	if (discussPageIndex == 1) {
		return;
	}else
	{
	   discussPageIndex = discussPageIndex - 1;
	   hj_showSpin("pageDiv")
	   getArticleDetail(artileId,discussPageIndex);
	}
}
function nextPage (ele) {
	if (discussModelArray.length < 10) {
		return;
	}else
	{
		 discussPageIndex = discussPageIndex + 1;
		  hj_showSpin("pageDiv")
	   getArticleDetail(artileId,discussPageIndex);
	}
}
//二级回复列表的上一页和下一页
function replyprePage (ele) {
	var index = $(ele).parents(".article_li").attr("index");
	var discussModel = discussModelArray[index];
	if (discussModel.pageIndex == 1) {
		return;
	}else
	{
		discussModel.pageIndex = discussModel.pageIndex - 1;
	}
	var indexModel1 = new indexModel(index,-1);
	
	refreshReplyUl(indexModel1,function  Suc() {
		
	},function  fail() {
		discussModel.pageIndex = discussModel.pageIndex + 1;
	});
}
function replynextPage (ele) {
	var index = $(ele).parents(".article_li").attr("index");
	var discussModel = discussModelArray[index];
	if (discussModel.reply.length < 10) {
		return;
	}else
	{
		discussModel.pageIndex = discussModel.pageIndex + 1;
	}
	var indexModel1 = new indexModel(index,-1);
	
	refreshReplyUl(indexModel1,function  Suc() {
		
	},function  fail() {
		discussModel.pageIndex = discussModel.pageIndex - 1;
	});
}
//请求一个评论当前的二级回复列表
function refreshReplyUl (indexModel,sucBlc,FaiBlc) {
	var index = indexModel.x;
	var discussModel = discussModelArray[index];
       hj_showSpin("replyUl"+indexModel.x);
		getAjax(articleRequestUrl,"action=getReply&pageIndex="+discussModel.pageIndex+"&commentId="+discussModel.discussID+"",function sucBlock (data) {
		 var refreshReplyUl1 = 	$(".articleUl .article_li:eq("+parseInt(index)+") .replyUl");
		 refreshReplyUl1.empty();
		
		 	
		 	//添加二级回复
						var replyArray = data;
						for (var z = 0;z < replyArray.length;z++) {
						var replyModel = replyArray[z];
						var replyHtml
						if (replyModel.toPerson.UID == discussModel.from_id) {
							replyHtml = '<li class = "secondReplyLi" index = '+z+'><p class="replyUserP"><span class="fromUserNameSpan">'+replyModel.author.NAME+'</span> :</p>\
						<p class="replyContent">'+replyModel.content+'</p><span class = "timeSpan">'+replyModel.TIME.replace(".0","")+'</span>\
						<a class="replyA" onclick = "secondReplyClick(this)">回复</a></li>';
						}else
						{
							replyHtml = '<li class = "secondReplyLi" index = '+z+'><p class="replyUserP"><span class="fromUserNameSpan">'+replyModel.author.NAME+'</span>回复 <span class="toUserNameSpan">'+replyModel.toPerson.NAME+'</span>:</p>\
						<p class="replyContent">'+replyModel.content+'</p><span class = "timeSpan">'+replyModel.TIME.replace(".0","")+'</span>\
						<a class="replyA" onclick = "secondReplyClick(this)">回复</a></li>';
						}
					   $(refreshReplyUl1).append(replyHtml)
					   
						}
						
		 	
		 
		  if (discussModel.pageIndex == 1) {
		  	 if ($(refreshReplyUl1).children().length >=10) {
							$(".articleUl .article_li:eq("+parseInt(index)+") .replypageDiv").show();
							$(".articleUl .article_li:eq("+parseInt(index)+") .replypageDiv .replynextPage").css("color","blue");
						}else
						{
							$(".articleUl .article_li:eq("+parseInt(index)+") .replypageDiv").hide();
							$(".articleUl .article_li:eq("+parseInt(index)+") .replypageDiv .replynextPage").css("color","#8a8a8a");
						}
						$(".articleUl .article_li:eq("+parseInt(index)+") .replypageDiv .replyprePage").css("color","#8a8a8a");
		  }else
		  {
		  	$(".articleUl .article_li:eq("+parseInt(index)+") .replypageDiv").show();
		  	$(".articleUl .article_li:eq("+parseInt(index)+") .replypageDiv .replyprePage").css("color","blue");
		  	
		  	if ($(refreshReplyUl1).children().length >=10) {
							
							$(".articleUl .article_li:eq("+parseInt(index)+") .replypageDiv .replynextPage").css("color","blue");
						}else
						{
					
							$(".articleUl .article_li:eq("+parseInt(index)+") .replypageDiv .replynextPage").css("color","#8a8a8a");
						}
		  	
		  }
		
		 
		 
		 discussModel.reply = data;
		 hideSpin()
		 sucBlc();
		},function failBlock () {
			FaiBlc();
			hideSpin()
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


//var articleTitle = $("#articelTitle").val();
//if (articleTitle == "") {
//	alert("标题不能为空");return;
//}
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
formData.append('articleID', artileId);

formData.append('content', articleContent);
formData.append('from_id', getCookie("userID"));
//formData.append('USERNAME', getCookie("userName"));
//formData.append('USERIMG', getCookie("userIMGNAME"));
formData.append('action', "publishComment");

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
		alert("发表成功");
		if (discussModelArray.length < 10) {
			 getArticleDetail(artileId,discussPageIndex);
		}
		
		
	}else
	{
		alert("出错了");
	}
	
	console.log(res);
}).fail(function(res) {hideSpin(); alert("发表失败");});
}

