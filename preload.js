//图片预加载
(function($){
	function Preload(imgs,options){
		this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
		this.opts = $.extend({},Preload.DEFAULTS,options);
		this._unoredered();
	}
	Preload.DEFAULTS = {
		each:null,//每一张图片加载完毕后执行
		all:null,//所有图片加载完毕后执行
	};
	Preload.prototype._unoredered = function(){  //无序加载
		var imgs = this.imgs;
		var opts = this.opts;
		var count = 0;
		var len = imgs.length;

		$.each(imgs,function(i,src){
			if(typeof src !='string') return;

			var imgObj = new Image();//实例化img对象

			$(imgObj).on('load error',function(){
				opts.each && opts.each(count);

				if (count >= len-1) {
					opts.all && opts.all();
				}
				count++;

			});

			imgObj.src = src;
		});
	};

	$.extend({
		preload: function(imgs,opts){
			new Preload(imgs,opts);
		}
	});


})(jQuery);