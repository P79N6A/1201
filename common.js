$(function(){
	$(".navIconUp").click(function(){
		if($(".navInfo").height()==434){
			$(this).addClass("navIconDown");
			$(".navInfo,.navShadow").animate({"height":"0","paddingTop":"0"},800,function(){
				$(".navInfo").css("overflow","hidden");
			});
		}
	});
	
	$(".navIconUp").mouseover(function(){
		if($(".navInfo").height()==0){
			$(this).removeClass("navIconDown");
			$(".navInfo").animate({"height":"434px","paddingTop":"30px"},800);
			$(".navShadow").animate({"height":"464px"},800,function(){
				$(".navInfo").css("overflow","visible");
			});
		}
	});
	
	$(".nav ul li").hover(function(){
		$(this).find(".navShadowLink,dl").show();
	},function(){
		$(this).find(".navShadowLink,dl").hide();
	});
	$(".nav ul li dl").hover(function(){
		$(this).parent().find("a:first").addClass("hover");	
	},function(){
		$(this).parent().find("a:first").removeClass("hover");	
	});
	
	for(i=0;i<3;i++){
		if($(".QJscroll_box").eq(i).is(":hidden")){
			$(".QJscroll_right").eq(i).hide();
		}	
	}

	$(".navShadowLink").eq(0).height(($(".navInfo ul li dl").eq(0).find("dd").length)*34);
	$(".navShadowLink").eq(1).height(($(".navInfo ul li dl").eq(1).find("dd").length)*34);
	$(".navShadowLink").eq(2).height(($(".navInfo ul li dl").eq(2).find("dd").length)*34);
	$(".navShadowLink").eq(3).height(($(".navInfo ul li dl").eq(3).find("dd").length)*34);
	$(".navShadowLink").eq(4).height(($(".navInfo ul li dl").eq(4).find("dd").length)*34);
	$(".navShadowLink").eq(5).height(($(".navInfo ul li dl").eq(5).find("dd").length)*34);
	$(".navShadowLink").eq(6).height(($(".navInfo ul li dl").eq(6).find("dd").length)*34);
	$(".navShadowLink").eq(7).height(($(".navInfo ul li dl").eq(7).find("dd").length)*34);
});
function doClick(o) {  
    o.className="lb";
    var j;
    var id;
    var e;
    for (var i = 1; i <= 8; i++) {
        id = "m_"+i;
        j = document.getElementById(id); 
        e = document.getElementById("s_ul" + i);
        if (id != o.id) { 
		    j.className = "lc"; 
            e.style.display = "none";
        } else { 
            e.style.display = "block";
        }
    } 
     o.className="lb";
}
 