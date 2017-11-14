//document.write('<script src="http://api.map.baidu.com/api?v=2.0&ak=zhlP1cFKHGugf7Tx279vrwiRiHm4DN6L" type="text/javascript"></script>');
var destlat, destlng;
var BaiDuAK = "zhlP1cFKHGugf7Tx279vrwiRiHm4DN6L";

function goToWhere(lonLat) {
    filterString(lonLat);
    getLocation();
}
function hj_goTo(point) {
    destlat = point.lat;
    destlng = point.lng;
    getLocation();
}
function hj2_go(lat, lng) {
    destlat = lat;
    destlng = lng;
    getLocation();
}
function filterString(string) {

    var strArrat = string.split(" ");
    destlng = strArrat[1].replace("(", "");
    
    destlat = strArrat[2].replace(")", "");
    console.log(destlng + " lat==" + destlat);
}
function getLocation() {


    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            onSuccess(r);
           
        }
        else {
            alert('failed' + this.getStatus());
        }
    }, { enableHighAccuracy: true })

}

function baiDuGetNowLocation(callBack) {
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            callBack(r);

        }
        else {
            alert('failed' + this.getStatus());
        }
    }, { enableHighAccuracy: true })

}
function baiDuGetNowLocationWithError(sucBlock, failBlock) {
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            sucBlock(r);

        }
        else {
            failBlock();
        }
    }, { enableHighAccuracy: true })

}
//成功时
function onSuccess(position) {
    //返回用户位置

        //经度
    var longitude = position.point.lng;
        //纬度
    var latitude = position.point.lat;
//       alert("userlat:" + latitude + "userlng:" + longitude);
        //             //使用百度地图API
        //             //创建地图实例  
        //             var map =new BMap.Map("container");
        //
        //             //创建一个坐标
        //             var point =new BMap.Point(longitude,latitude);
        //             //地图初始化，设置中心点坐标和地图级别  
        //             map.centerAndZoom(point,15);
        var lat = parseFloat(destlat);
        var lng = parseFloat(destlng);
//        alert("lat:" + lat + "lng:" + lng);
        window.location.href = "http://api.map.baidu.com/direction?origin=latlng:" + latitude + "," + longitude + "|name:我家&destination=latlng:" + lat + "," + lng + "|name:福州&mode=driving&region=福州&output=html&src=yourCompanyName|yourAppName";
}
////失败时
//function onError(error) {
//    switch (error.code) {
//        case 1:
//            alert("位置服务被拒绝");
//            break;

//        case 2:
//            alert("暂时获取不到位置信息");
//            break;

//        case 3:
//            alert("获取信息超时");
//            break;

//        case 4:
//            alert("未知错误");
//            break;
//    }

//}
//function GPSToBaiDu(position, back) {
//    var convertor = new BMap.Convertor();
//    var pointArr = [];
//    pointArr.push(position);
//    convertor.translate(pointArr, 1, 5, back);
//}
//周边检索
//		http://api.map.baidu.com/place/v2/search?query=银行&location=39.915,116.404&radius=2000&output=xml&ak={您的密钥}
function baiDuSearch(lonLat,searchName,radius,pageIndex,callBack) {
    var searchlng, searchlat;
    var strArrat = lonLat.split(" ");
//    console.log(strArrat);
    searchlng = strArrat[1].replace("(", "");
    searchlat = strArrat[2].replace(")", "");
//    "query="+searchName+"&page_size=10&page_num="+pageIndex+"&scope=1&location="+searchlat+","+searchlng+"&radius="+radius+"&output=json&ak=zhlP1cFKHGugf7Tx279vrwiRiHm4DN6L"
    //    "query=酒店&page_size=10&page_num=1&scope=2&location=39.915,116.404&radius=2000&output=json&ak=zhlP1cFKHGugf7Tx279vrwiRiHm4DN6L"
    baiDugetAjax("http://api.map.baidu.com/place/v2/search", "query=" + searchName + "&page_size=10&page_num=" + pageIndex + "&scope=1&location=" + searchlat + "," + searchlng + "&radius=" + radius + "&output=json&ak="+BaiDuAK+"", function (data) {
        // message:"ok",results:[{address,detail,location{lat,lng},name,street_id,uid}],status:0
        callBack(data.results);
    });
}

function baiDuDetailSearch(uid,callBack) {
    baiDugetAjax("http://api.map.baidu.com/place/v2/detail", "uid=" + uid + "&output=json&scope=2&ak=" + BaiDuAK + "", function (data) {
        callBack(data.result);
    });
}

function baiDugetAjax(url, parm, callBack) {
    jQuery.support.cors = true;
    $.ajax({
        type: 'post',
        dataType: "jsonp",
        url: url,
        data: parm,
        cache: true,
        async: true, //异步
        error: function (XMLHttpRequest, textStatus, errorThrown) {

        },
        success: function (msg) {
            //            alert(msg);
            callBack(msg);
        }
    });
}
//驾车路线规划
function baiDuRoutePlan(map, pointArray,ScenceModelArray,hotelPointArray,hotelIndexArray,callBack) {
    // 百度地图API功能
//    var map = new BMap.Map("allmap");
//    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
    //    map.enableScrollWheelZoom(true);
    remove_overlay(map);

    console.log(pointArray);
    var p1 = pointArray[0];
    var p2 = pointArray[pointArray.length-1];

    var driving = new BMap.DrivingRoute(map, { renderOptions: { map: map, autoViewport: true }, onSearchComplete: function (results) {
        if (driving.getStatus() == BMAP_STATUS_SUCCESS) {
            callBack();
            //	 	// 获取第一条方案
            //              var plan = results.getPlan(0);
            //              // 获取方案的驾车线路
            //              var route = plan.getRoute(0);
            //              var array = route.getPath();
            //              for (var i = 0; i < array.length; i++) {
            //              	
            //
            //              }

        }
        console.log("success")
    }, onMarkersSet: function (data) {
        console.log("markerset");
        console.log(data);
        var newDataArray = [];
        if (hotelIndexArray.length != 0) {
            for (i in data) {
                newDataArray.push(data[i]);
                //                for (j in hotelPointArray) {
                //                    var hotelPoint = hotelPointArray[j];
                //                    if (tmpMarker.point.lat == hotelPoint.lat && tmpMarker.point.lng == hotelPoint.lng) { 
                //                    
                //                    data.splice(i,1) };
                //                }
                for (j in hotelIndexArray) {
                    if (hotelIndexArray[j] == i) {
                        newDataArray.pop();
                    }
                }

            }
        } else {
            newDataArray = data;
        }
        var infoWindowArray = [], contentArray = [], markerArray = [];
        for (var i = 0; i < newDataArray.length; i++) {
            var scenceModel = ScenceModelArray[i];
            var content = '<div style="margin:0;line-height:20px;padding:2px; overflow-y:scroll">' +
                    '<img src="' + IMGURL + '' + scenceModel["LITPIC"] + '" alt="" style="float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;"/>' +
                    '地址：' + scenceModel["ADDRESS"] + '<br/>简介：' + scenceModel["DESCRIPTION"] + '' +
                  '</div>';

            //创建检索信息窗口对象
            var searchInfoWindow = null;
            var linkUrl = "";
            if (scenceModel.KINDTYPE == "5") {
                linkUrl = "SubScence.htm?ID=" + scenceModel.ID + "&index=0&isBaiDu=0";

            } else {
                linkUrl = "scenceDetail.htm?scenceID=" + scenceModel.ID;
            }
            searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
                title: scenceModel["ALLNAME"] + '<a href = "' + linkUrl + '" style = "padding-left:5px;" scenceID = "' + scenceModel.ID + '" kindType = "' + scenceModel.KINDTYPE + '">详情》</a>',      //标题
                width: 290,             //宽度
                height: 120,              //高度
                panel: "panel",         //检索结果面板
                enableAutoPan: true,     //自动平移
                searchTypes: [
				BMAPLIB_TAB_SEARCH,   //周边检索
				BMAPLIB_TAB_TO_HERE,  //到这里去
				BMAPLIB_TAB_FROM_HERE //从这里出发
			]
            });
            infoWindowArray[i] = searchInfoWindow;
            contentArray[i] = content;
            var markermodel = newDataArray[i];
            var marker;
            if (markermodel.marker) {
                marker = markermodel.marker;

            } else {
                var array1 = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
                for (x in array1) {
                    var temStr = array1[x] + "m";
                    if (markermodel[temStr]) {
                        marker = markermodel[temStr];
                        
                    }
                }

            }
            markerArray[i] = marker;
            //            if (i == 0) {

            //                infoWindowArray[i].open(markerArray[i]);
            //            }
            markerArray[i].addEventListener("click",
                            (function (k) {
                                // js 闭包
                                return function () {
                                    //将被点击marker置为中心
                                    map.centerAndZoom(markerArray[k].point, 18);
                                    //在marker上打开检索信息窗口
                                    infoWindowArray[k].open(markerArray[k]);
                                }
                            })(i)
                        );
        }


    }, onInfoHtmlSet: function (data) {
        console.log("infohtml");
        console.log(data);
    }, onResultsHtmlSet: function (data) {
        console.log("resulter");
        console.log(data);
    }
    }

);
var WaiPointArray = [];
for (i in pointArray) {
    if (i != 0 & i != pointArray.length - 1) {
        WaiPointArray.push(pointArray[i]);
    }
}
    driving.search(p1, p2, { waypoints: WaiPointArray }); //waypoints表示途经点
}

//清除覆盖物
function remove_overlay(map) {
    map.clearOverlays();
};
//function fromUserLocToThisPlace(lonLat) {
//    baiDuGetNowLocationWithError(function (userpoint) { 
//    
//    }, function () {
//        return "0km";
//    });
//}
function getTwoPlaceDistance(pointA, PointB) {
    var map = new BMap.Map("allmap");
//    var pointA = new BMap.Point(106.486654, 29.490295);  // 创建点坐标A--大渡口区
//    var pointB = new BMap.Point(106.581515, 29.615467);  // 创建点坐标B--江北区
//    alert('从大渡口区到江北区的距离是：' + (map.getDistance(pointA, pointB)).toFixed(2) + ' 米。');  //获取两点距离,保留小数点后两位
    var distance = parseFloat(map.getDistance(pointA, PointB));
    if(distance>1000){
        distance = (distance / 1000).toFixed(1);
        return distance + "km";

    }else
    {
        return distance.toFixed(1) + "m";
    }

}
//function getTwoPlaceDistanceWithLonLat(lonLat1, lonLat2) {
//    var point1 = hj_lonlatTurnTopoint(lonLat1);
//    var point2 = hj_lonlatTurnTopoint(lonLat2);
//    return getTwoPlaceDistance(point1, point2);
//}
function hj_lonlatTurnTopoint(string) {

    var strArrat = string.split(" ");
  var   tmplng = strArrat[1].replace("(", "");
  var tmplat = strArrat[2].replace(")", "");
  var point = new BMap.Point(parseFloat(tmplng), parseFloat(tmplat));
  return point;
}