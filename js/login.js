	function loginButoonClick () {
				hj_showSpin("loginTable");
				 var account = $("#account").val();
				 var userPassword = $("#password").val();
				 if (account == "" || userPassword == "") {
				 	alert("账号或密码不能为空");
				 	return;
				 }
//				 console.log(requestUrl+"action=login&account="+account+"&password="+userPassword+"");
				getAjaxBackStr(requestUrl,"action=login&account="+account+"&password="+userPassword+"",function sucBlock (data) {
					if (data != "-1" && data != "0") {
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
		 
					}else
					{
						hideSpin()
						if (data == "-1") {
							alert("该账号不存在");
						}else
						{
							alert("密码错误");
						}
					}
					
			
			
		},function failBlock () {
			hideSpin()
			alert("请求失败！");
		});
			}