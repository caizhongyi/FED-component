Raphael.fn.pieChart = function (cx, cy, r, values, labels, stroke, colors) {
    colors = colors || []; 
    var paper = this,
        rad = Math.PI / 180,
        chart = this.set();
    function sector(cx, cy, r, startAngle, endAngle, params) {
        var x1 = cx + r * Math.cos(-startAngle * rad),
            x2 = cx + r * Math.cos(-endAngle * rad),
            y1 = cy + r * Math.sin(-startAngle * rad),
            y2 = cy + r * Math.sin(-endAngle * rad);
        return paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
    }
    var angle = 0,
        total = 0,
        start = 0,
        process = function (j) {
            var value = values[j],
                angleplus = 360 * value / total,
                popangle = angle + (angleplus / 2),
                color = Raphael.hsb(start, .75, 1),
                ms = 500,
                delta = 30,
                bcolor = colors[j] ?  ( colors[j][0] || colors[j]) : Raphael.hsb(start, 1, 1),
				nextbcolor = colors[j] ? ( colors[j][1] || colors[j]) : Raphael.hsb(start + .1, 1, 1),
                p = sector(cx, cy, r, angle, angle + angleplus, {fill: popangle  + "-"  +  bcolor + '-' + nextbcolor , stroke: stroke, "stroke-width": 3});

				/* line */
				var pos = { left : (cx + (r + delta - r/2 ) * Math.cos(-popangle * rad )), top : cy + (r + delta  - r/2) * Math.sin(-popangle * rad )};
				var offset = {left : r /2 , top : r / 3  };
				var offset1 = {left : r /2 + r/2 , top : r / 3 };
				var offsetX = 40 ;
				var offsetY = 20 ;
				if(popangle > 90 && popangle < 180){
					offset.left = -offset.left;
					offset.top = -offset.top;
					offset1.left = -offset1.left;
					offset1.top = -offset1.top;
					offsetX = - offsetX;
					offsetY= - offsetY;
				}
				else if(popangle > 0 && popangle < 90){
					offset.top = -offset.top;
					offset1.top = -offset1.top;
					offsetY= - offsetY;
				}
				else if(popangle > 270 && popangle < 360){
				}
				else {
					offset.left = -offset.left;
					offset1.left = -offset1.left;
					offsetX = - offsetX;
				}
				
				var M = 'M ' + pos.left + ' ' + pos.top;
				var L = 'L ' + (pos.left + offset.left) + ' ' + (pos.top + offset.top);
				var L1 = 'L ' + (pos.left  + offset1.left) + ' ' + (pos.top + offset1.top);
				paper.path(M + L + L1).attr({stroke:  bcolor}).glow({width : 1 ,color : '#999'});
				
				/* label */
				var labelPos = { x : pos.left  + offset1.left +  offsetX  , y : pos.top + offset1.top }
				var txt = paper.text(labelPos.x, labelPos.y, labels[j] ).attr({fill: bcolor, stroke: "none", opacity: 1, "font-size": 12})
				
				/* percent +  parseInt(value / total *100)+'%'*/
				//var percentPos = { x : pos.left  + offset1.left +  offsetX , y : pos.top + offset1.top }
				//paper.text( percentPos.x , percentPos.y , parseInt(value / total *100)+'%').attr({fill: bcolor, stroke: "none", "font-size": 12});
				
				
			
				p.mouseover(function () {
					p.stop().animate({transform: "s1.1 1.1 " + cx + " " + cy}, ms, "elastic");
					//if(hasAnimate)txt.stop().animate({opacity: 1}, ms, "elastic");
				}).mouseout(function () {
					p.stop().animate({transform: ""}, ms, "elastic");
					//if(hasAnimate)txt.stop().animate({opacity: 0}, ms);
				});
		
            angle += angleplus;
            chart.push(p);
            chart.push(txt);
            start += .2;
        };
    for (var i = 0, ii = values.length; i < ii; i++) {
        total += values[i];
    }
    for (i = 0; i < ii; i++) {
        process(i);
    }
    return chart;
};


