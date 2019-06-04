function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

var conf={
"chanpinjieshao":"产品介绍",
"shiyongjiaochengjicui":"使用教程集萃",
"kuaisuanzhuangdaima":"快速安装代码",
"baobiaojiedu":"报表解读",
"wangzhangaikuang":"网站概况",
"liuliangfenxi":"流量分析",
"laiyuanfenxi":"来源分析",
"shoufangfenxi":"受访分析",
"fangkefenxi":"访客分析",
"jiazhitoushi":"价值透视",
"zhuanhualujingfenxi":"转化路径分析",
"zhandianshezhi":"站点设置",
"zhanghushezhi":"账户设置",
"mingcijieshi":"名词解释",
"changjianwenti":"常见问题",
"shujuyichangwenti":"数据异常问题",
"shujuzhunquexingwenti":"数据准确性问题",
"qitachangjianwenti":"其它常见问题"
};

var yy_conf={
"s":"CNZZ首页",
"qj":"全景首页",
"lt":"论坛首页"
}
cnzzneedle = dplus;
var yy=GetQueryString("yy");

if(yy){
yy=yy.replace(/%/g,"");
var rsnum=yy.slice(-1);
var rs=yy.replace(rsnum,"");
cnzzneedle.register({"来源位置": yy_conf[rs]});
cnzzneedle.register({"轮播屏位置": rsnum});
}
var timestamp=new Date().getTime();
(function () {


  // ��ȡ��ǰҳ��� pathname
  var _pathname = location.pathname;

  // ����ҳ�������е�a��ǩ
  $('a').each(function(i, val){
    var obj = $(val)
      , obj_href = obj.attr('href')
      , obj_text = obj.html()
	  , obj_tag = ""
	  , l_url = location.href
      , obj_cls = 'cn' + Math.random().toString(16).replace('.','').slice(0 ,5) + Math.random().toString(16).replace('.','').slice(0 ,5);

    if(obj_href){
		obj.addClass(obj_cls);
		obj_tag = obj_href.split('/')[1];
		
      
    }

 cnzzneedle.track_links('#left_cont a.' + obj_cls ,'点击左侧菜单',{
      菜单名称: obj_text
    })
 cnzzneedle.track_links('a.' + obj_cls ,'频道输出',{
      页面标题: document.getElementById("title").value,
      一级分类:conf[_pathname.split('/')[2]],
二级分类:conf[_pathname.split('/')[3]],
来源一级分类:conf[document.referrer.split('/')[4]],
来源二级分类:conf[document.referrer.split('/')[5]],
引流一级页面:conf[obj_href.split('/')[2]],
引流二级页面:conf[obj_href.split('/')[3]]
    
})




    /*
     *** ��ֻ����ⲿ���ӽ��е��ͳ��
     *
     * if(!is_same_host){
     *   cnzzneedle.track_links('a.' + obj_cls ,'click_outer_nav',{
     *     target_host : obj_href,
     *     target_name : obj_text
     *   })
     * }
     *
     ***
     */
  })
cnzzneedle.track('页面信息',{
      页面标题: document.getElementById("title").value,
      一级分类:conf[_pathname.split('/')[2]],
二级分类:conf[_pathname.split('/')[3]],
来源一级分类:conf[document.referrer.split('/')[4]],
来源二级分类:conf[document.referrer.split('/')[5]],
url:location.href
    
})
cnzzneedle.track_forms("#searchkey", '点击站内搜索' , {
'一级分类':conf[_pathname.split('/')[2]],
'二级分类':conf[_pathname.split('/')[3]]
},function(ele, prop){
  prop['搜索词'] = $('#search-keyword').val();
})
})();