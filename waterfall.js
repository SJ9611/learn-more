$(window).on("load",function () {
	waterfall();
	var dataInt ={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'4.jpg'},{'src':'5.jpg'},{'src':'9.jpg'},{'src':'17.jpg'}]};
	$(window).on('scroll',function(){
		if(checkscroll){
			$.each(dataInt.data,function(key,value){
				var html='<div class="pin"><div class="box"><img src="images/'+$(value).attr('src')+'"></div></div>';
				$('#main').append(html);
			})
			waterfall();
		}
	})
});

function waterfall(){
	var $aPin = $('#main>div');
	var $iPinW = $aPin.eq(0).outerWidth();//一个块框pin的宽
	var num = Math.floor($(window).width()/$iPinW);//每行中能容纳的pin个数【窗口宽度除以一个块框宽度】
	$('#main').css({              //设置父级居中样式
		'width':$iPinW * num,
		'margin':'0 auto'
	});

	var pinArr=[];//用于存储每列中的所有块框相加的高度
	$aPin.each(function(index,value){
			var pinH = $aPin.eq(index).outerHeight();
			if(index<num){
				pinArr[index] = pinH;
			}else{
				var minH = Math.min.apply(null,pinArr);
				var minHindex = $.inArray(minH,pinArr);
				$(value).css({
						'position':'absolute',
						'top': minH +'px',
						'left':$iPinW*minHindex+'px'
				})
				pinArr[minHindex]+=$aPin.eq(index).outerHeight();
			}
	});
}

function checkscroll(){
	var $lastpin =$('#main>div').last();
	var lastpinH = $lastpin.offset().top+Math.floor($lastpin.outerHeight()/2);
	var scrollTop = $(window).scrollTop();
	var documentH = $(window).height();
	return (lastpinH<scrollTop+documentH)?true:false;
}























