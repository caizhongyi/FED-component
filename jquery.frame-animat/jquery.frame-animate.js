$.fn.frameAnimate = function(classes,replay,duration,callback){
		replay = replay || false;
		var _this = this;
		var i = 0;
		function length(){
			return classes.length;
		}
		function step(){
			if(i < length() - 1 ){
				$(_this).removeClass(classes[i]);
				i++;
				$(_this).addClass(classes[i]);
			}
			else{
				clearInterval(timer);
			}
		}
		var timer = setInterval(function(){
			step();
		},(duration || 500)); 
		return this;
}