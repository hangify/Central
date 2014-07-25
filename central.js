/*
The MIT License (MIT)

Copyright (c) 2014 Hangify

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

(function($) {
	var old_pos;

	function get_positions(container) {
		var vis_posits = [];
		container.children('div.block').not('.block-transition').not('.block-padding').each(function(){
			var rect = $(this).position();
			vis_posits.push(rect);
		});
		return vis_posits;
	}

	function get_elements(container) {
		var real_elems = [];
		container.children('div.block').not('.block-transition').not('.block-padding').each(function(){
			real_elems.push(this);
		});
		return real_elems;
	}

	function transition(container) {
		var vis_elems = get_elements(container);
		for (var i=0; i < old_pos.length; i++) {
			container.append($(vis_elems[i]).clone().addClass('block-transition')
							.css({'visibility': 'visible','position': 'absolute', 'top': old_pos[i].top, 'left': old_pos[i].left}));
		}
		var new_pos = get_positions(container);
		container.children('div.block-transition').not('.block-padding').each(function(i){
			$(this).css({'position': 'absolute', 'top': new_pos[i].top, 'left': new_pos[i].left});
		});
	}

	function attachResize(container) {
		container.resize(function(){
			function blocks_missing() {
				var cols = [];
				container.children('div.block').not('.block-transition').not('.block-padding').each(function(i, e){
					var y = $(this).position().top;
					if (cols[y] != null) cols[y].push(e);
					else cols[y] = [e];
				});
				var cols = cols.map(function(item){
					return item.length;
				});
				var col_lengths = [];
				for (var item in cols)
					col_lengths.push(cols[item]);
					
				var max = Math.max.apply(Math, col_lengths);
				var num_in_last_row = col_lengths.reduce(function(prev, curr){
					return prev + curr;
				}, 0) % max;

				if (num_in_last_row)
					return max - num_in_last_row;
				return num_in_last_row;
			}

			var num_missing = blocks_missing();
			for (var i = 0; i < num_missing; i++)
				// &nbsp; is a hack to give it some content.
				container.append('<div class="block block-padding">&nbsp;</div>');
		});
	}

	$.fn.Central = function() {
		var container = $(this);

        attachResize(container);

        container.resize();
		container.css('visibility', 'visible');

		this.retile = function(_css) {
			old_pos = get_positions(container);
			container.children('div.block').hide(100);
            container.children('div.block-padding').remove();
            container.css(_css);
            container.resize();
            transition(container);
            setTimeout(function(){
                // Prevents a flicker when switching between block-transition and block.
                container.children('.block-transition').fadeOut(100, function(){ $(this).remove();});
                container.children('.block').not('.block-padding').each(function(){
                    $(this).show();
                });
            }, 100);
		}

        return this;
    };
}(jQuery));
