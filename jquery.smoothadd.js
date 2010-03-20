(function($){

	$.fn.extend({

		smoothadd: function(text, options) {
			var defaults = {
				maxItems: 5,
				duration: 1500,
				animRatio: 5
			};

			var options = $.extend(defaults, options);

			return this.each(function() {

				if (this.tagName.toLowerCase() != 'ul' &&
					this.tagName.toLowerCase() != 'ol')
				{
					return 'continue';
				}

				var animUnit = options.duration / (2 + options.animRatio);

				var el = $(this);

				var h = el.height();

				el.css({
					height:   h,
					overflow: 'hidden'
				});

				var ulPaddingTop    = parseInt(el.css('padding-top'));
				var ulPaddingBottom = parseInt(el.css('padding-bottom'));

				var numItems = $(el).children().length;

				el.prepend('<li>' + text + '</li>');

				var first = $('li:first', el);
				var last  = $('li:last',  el);

				var foh = first.outerHeight();

				var heightDiff = numItems >= options.maxItems ? foh - last.outerHeight() : foh;

				var oldMarginTop = first.css('margin-top');

				first.css({
					marginTop: 0 - foh,
					position:  'relative',
					top:       0 - ulPaddingTop
				});

				if (numItems >= options.maxItems)
				{
					last.css('position', 'relative');
				}

				pending = numItems >= options.maxItems ? 2 : 1;

				el.animate({ height: h + heightDiff }, options.duration, function() { cleanUp(el); });

				first.animate({ top: 0 }, numItems >= options.maxItems ? animUnit : 2 * animUnit, function() {
					first.animate({ marginTop: oldMarginTop }, animUnit * options.animRatio, numItems >= options.maxItems ? function() {
						last.animate({ top: ulPaddingBottom }, animUnit, function() {
							last.remove();
							cleanUp(el);
						});
					} : '');
				});

			});
		}
	});

	var pending = 0;

	function cleanUp(el) {
		if (!--pending)
		{
			el.css({
				height:   'auto',
				overflow: 'visible'
			});
		}
	}

	// pass jQuery to the function,
	// So that we will able to use any valid Javascript variable name
	// to replace "$" SIGN. But, we'll stick to $ (I like dollar sign: ) )
})(jQuery);
