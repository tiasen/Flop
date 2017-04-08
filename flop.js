/**
	 * [Flop description]	 * 
	 * @param {
			number:数值, 
			el:'dom节点id名或class名（需加对应选择器符号）',	
			duration:动画执行时长（单位：s；默认为:1s;）
			len:翻页盘的个数（默认为数值的长度）
			comma:(是否显示分割逗号；不设置则不显示)
			style:{
				height:翻页牌高度，可不加单位（必须）
				width:翻页牌宽度，可不加单位（必须）
				backgroundColor:翻页盘背景颜色，默认为：#2196f3,
				fontSize： 翻页盘中数字的大小，默认为高度的80%,可不加单位；
				color：翻页盘中数组的颜色：默认为白色；
			}
		}
	 */
	function Flop(option){
		this.option = option;
		this.el = document.querySelector(option.el);		
		this.numToArr();
	}
	Flop.prototype.updateNumber = function(value){
		var arr = [];
		var num = parseInt(value);
		var newNum = num;
		var numlen = num.toString().length;
		var len = this.option.len || numlen;
		var listLen = this.el.querySelectorAll('.numbox').length;
		console.log(listLen)
		if(numlen > len){
			return console.error('The number of digits must be greater than the flop of digits!');
			
		}else{
			// this.createDOMGroup()
			if(listLen < len){
				this.option.number = value;
				this.el.innerHTML = ' ';
				this.createDOMGroup()
			}
			while(newNum > 0){
				var temp = newNum%10;				
				arr.push(temp);
				newNum = parseInt(newNum/10);
			}
			for(var i = 0; i < arr.length;i++){
				this.animate(len - 1 - i,arr[i]);
			}
		}
	}
	Flop.prototype.numToArr = function(){
		var arr = [];
		var num = parseInt(this.option.number);
		var newNum = num;
		var numlen = num.toString().length;
		var len = this.option.len || numlen;	
		if(numlen > len){
			return console.error('The number of digits must be greater than the flop of digits!');
			
		}else{
			this.createDOMGroup()
			while(newNum > 0){
				var temp = newNum%10;				
				arr.push(temp);
				newNum = parseInt(newNum/10);
			}
		
			for(var i = 0; i < arr.length;i++){
				this.animate(len - 1 - i,arr[i]);
			}
		}
		return arr;
	}
	Flop.prototype.createDOM = function(index){
		var width = this.option.style.width.toString().replace(/px/,'');
		var height = this.option.style.height.toString().replace(/px/,'');
		var fontSize = this.option.style.fontSize ? this.option.style.fontSize.toString().replace(/px/,'') : parseInt(height)*0.8;
		var backgroundColor = this.option.style.backgroundColor || '#2196f3';
		var color = this.option.style.color || '#fff';
		var fontFamily = this.option.style.fontFamily || '"Microsoft YaHei",Consolas';
		var el = document.createElement('div');
		el.className = 'flopBox';
		el.setAttribute('data-key',index);
		el.style.cssText = 'width:'+width+'px;height:'+ height +'px;background:'+ backgroundColor +';border-radius:5px;overflow:hidden;float:left;margin:0 5px;font-family:'+fontFamily+';text-align:center;line-height:'+height+'px;color:' + color + ';font-size:' + fontSize + 'px';
		var numboxDiv = document.createElement('div');
		// numboxDiv.style.cssText = 'position:absolute;left:0;top:'+ (-9*height)+'px;'transition:all '+duration+'s easy-in-out;-ms-transition:all '+duration+'s easy-in-out;-webkit-transition:all '+duration+'s easy-in-out;-moz-transition:all '+duration+'s easy-in-out;
		numboxDiv.className = 'numbox';
		numboxDiv.style.cssText = 'transform:translateY('+ (-height)*9+'px);-ms-transform:translateY('+ (-height)*9+'px);-webkit-transform:translateY('+ (-height)*9+'px);-moz-transform:translateY('+ (-height)*9+'px);';
		for(var i = 9; i >=0; i--){
			var div = document.createElement('div');
			div.style.cssText = 'width:'+width+'px;height:'+ parseInt(height) +'px';
			var text = document.createTextNode(i);
			div.appendChild(text);
			numboxDiv.appendChild(div);
		}
		el.appendChild(numboxDiv);	
		return 	el;
	}
	Flop.prototype.createDOMGroup = function(){
        var fontFamily = this.option.style.fontFamily || '"Microsoft YaHei",Consolas';
		var num = parseInt(this.option.number);
		var numlen = num.toString().length;
		var len = this.option.len || numlen;
		var el = this.el;
		var height = this.option.style.height.toString().replace(/px/,'');
		var backgroundColor = this.option.style.backgroundColor ? this.option.style.backgroundColor : '#2196f3';

		for(var i = 0;i < len;i++){			
			if(i%3 === 0 && i !== 0 && this.option.comma){
					var span = document.createElement('span');
					span.style.cssText = 'float:left;height:'+ height + 'px;font-size:' +height*0.8 +'px;color:'+backgroundColor;
					var text = document.createTextNode(',');
					span.appendChild(text);
					el.insertBefore(span,el.firstChild)
				}
			el.style.cssText = 'overflow:hidden;display:inline-block;font-family:' + fontFamily;
			el.insertBefore(this.createDOM(i),el.firstChild)
		}
	}
	Flop.prototype.animate = function(index,number){	
		var height = this.option.style.height.toString().replace(/px/,'');
		var Y = -(9 - number) * height;
		var duration = this.option.duration || 1;
		// var numboxDivdom = this.el.querySelector('.numbox');
		var list = this.el.querySelectorAll('.numbox');
		var numboxDivdom = list[index];
		if(!numboxDivdom){
			return console.error('数字长度超出翻页盘个数！');
		}
		numboxDivdom.style.transition = 'all '+duration+'s';
		numboxDivdom.style.msTransition = 'all '+duration+'s';
		numboxDivdom.style.mozTransition = 'all '+duration+'s';
		numboxDivdom.style.webkitTransition = 'all '+duration+'s';
		setTimeout(function(){
			numboxDivdom.style.transform = 'translateY('+ Y +'px)';
			numboxDivdom.style.mozTransform = 'translateY('+ Y +'px)';
			numboxDivdom.style.msTransform = 'translateY('+ Y +'px)';
			numboxDivdom.style.webkitTransform = 'translateY('+ Y +'px)';
		},5)			
	}