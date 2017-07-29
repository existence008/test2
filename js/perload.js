//图片预加载
;
(function($) {
	function PreLoad(imgs, options) {
		this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
		this.opts = $.extend({}, PreLoad.defaults, options);
		// this._unordered();
		if (this.opts.order === 'ordered') {
			this._ordered();
		} else {
			this._unordered();
		}
	};
	PreLoad.defaults = {
		order: 'unordered', //无序预加载
		each: null, //每张图片加载完毕后执行
		all: null //所有图片加载完毕后执行
	};
	//有序预加载
	PreLoad.prototype._ordered = function() {
		var opts = this.opts,
			imgs = this.imgs,
			length = imgs.length,
			count = 0;

		load();

		function load() {
			var imgObj = new Image();
			$(imgObj).on('load error', function() {
				opts.each && opts.each(count);
				if (count >= length) {
					//所有图片已经加载完毕
					opts.all && opts.all();
				} else {
					load();
				}
				count++;
			});
			imgObj.src = imgs[count];
		}
	};
	//无序预加载
	PreLoad.prototype._unordered = function() { //无序加载
		var imgs = this.imgs,
			opts = this.opts,
			count = 0,
			length = imgs.length;
		$.each(imgs, function(index, src) {
			if (typeof src != 'string') return;
			var imgobj = new Image();
			$(imgobj).on('load', function() {
				opts.each && opts.each(count);
				if (count >= length - 1) {
					opts.all && opts.all();
				};
				count++;
			});
			imgobj.src = src;
		});
	};
	$.extend({
		PreLoad: function(imgs, opts) {
			new PreLoad(imgs, opts);
		}
	});
})(jQuery);