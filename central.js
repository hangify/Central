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
		container.children('div.block').not('.block-transition').not('.block-padding').each(function(i, e){
			var rect = $(this).position();
			vis_posits.push(rect);
		});
		return vis_posits;
	}

	function transition(container) {
		for (var i=0; i < old_pos.length; i++) {
			container.append($('<div class="block block-transition block-show"></div>')
				.css({'position': 'absolute', 'top': old_pos[i].top, 'left': old_pos[i].left}));
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
				container.append('<div class="block block-padding"></div>');
		});
	}

	function attachWindowResize(container, initial_width) {
		var before_width = initial_width;
		$(window).resize(function(event){
			var current_width = container.width();
			container.width(initial_width);
			

			before_width = container.width();
		});
	}

	$.fn.Central = function() {
		var container = $(this);
		var initial_width = container.width();

        //attachWindowResize(container, initial_width);
        attachResize(container);

        container.resize();
		container.css('visibility', 'visible');

		this.retile = function(_css) {
			old_pos = get_positions(container);
			container.children('div.block-padding').remove();
			container.children('div.block').each(function(){
				$(this).css('visibility', 'hidden');
			});
		    container.css(_css);
		    container.resize();
		    transition(container);
		    setTimeout(function(){
		    	container.children('.block-transition').remove();
			    container.children('.block').not('.block-padding').each(function(){
					$(this).css('visibility', 'visible');
				});
			}, 500);
		}

        return this;
    };
}(jQuery));