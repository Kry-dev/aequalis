/* == Page scroll to id == Version: 1.6.2, License: MIT License (MIT) */
!function($,window,document,undefined){var selector,opt,_init,_trigger,_clicked,_target,_to,_axis,_offset,_dataOffset,_liveTimer,_speed,defaults={scrollSpeed:1e3,autoScrollSpeed:!0,scrollEasing:"easeInOutQuint",scrollingEasing:"easeOutQuint",pageEndSmoothScroll:!0,layout:"vertical",offset:0,highlightSelector:!1,clickedClass:"mPS2id-clicked",targetClass:"mPS2id-target",highlightClass:"mPS2id-highlight",forceSingleHighlight:!1,keepHighlightUntilNext:!1,highlightByNextTarget:!1,disablePluginBelow:!1,clickEvents:!0,appendHash:!1,onStart:function(){},onComplete:function(){},defaultSelector:!1,live:!0,liveSelector:!1,excludeSelectors:!1},_totalInstances=0,methods={init:function(options){options=$.extend(!0,{},defaults,options);if($(document).data("mPS2id",options),opt=$(document).data("mPS2id"),!this.selector){this.each(function(){var el=$(this);el.hasClass("__mPS2id")||el.addClass("__mPS2id")}),this.selector=".__mPS2id"}opt.liveSelector&&(this.selector+=","+opt.liveSelector),selector=selector?selector+","+this.selector:this.selector,opt.defaultSelector&&("object"==typeof $(selector)&&0!==$(selector).length||(selector=".m_PageScroll2id,a[rel~='m_PageScroll2id'],.page-scroll-to-id,a[rel~='page-scroll-to-id'],._ps2id")),opt.clickEvents&&$(document).undelegate(".mPS2id").delegate(selector,"click.mPS2id",function(e){if(functions._isDisabled.call(null))functions._removeClasses.call(null);else{var $this=$(this),href=$this.attr("href"),hrefProp=$this.prop("href").baseVal||$this.prop("href");opt.excludeSelectors&&$this.is(opt.excludeSelectors)||href&&-1!==href.indexOf("#/")||(functions._reset.call(null),_dataOffset=$this.data("ps2id-offset")||0,functions._isValid.call(null,href,hrefProp)&&functions._findTarget.call(null,href)&&(e.preventDefault(),_trigger="selector",_clicked=$this,functions._setClasses.call(null,!0),functions._scrollTo.call(null)))}}),$(window).unbind(".mPS2id").bind("scroll.mPS2id resize.mPS2id",function(){if(functions._isDisabled.call(null))functions._removeClasses.call(null);else{var targets=$("._mPS2id-t");targets.each(function(i){var t=$(this),id=t.attr("id"),h=functions._findHighlight.call(null,id);functions._setClasses.call(null,!1,t,h),i==targets.length-1&&functions._extendClasses.call(null)})}}),_init=!0,functions._setup.call(null),functions._live.call(null)},scrollTo:function(id,options){if(functions._isDisabled.call(null))functions._removeClasses.call(null);else if(id&&void 0!==id){functions._isInit.call(null);var defaults={layout:opt.layout,offset:opt.offset,clicked:!1};options=$.extend(!0,{},defaults,options);functions._reset.call(null),_axis=options.layout,_offset=options.offset,id=-1!==id.indexOf("#")?id:"#"+id,functions._isValid.call(null,id)&&functions._findTarget.call(null,id)&&(_trigger="scrollTo",(_clicked=options.clicked)&&functions._setClasses.call(null,!0),functions._scrollTo.call(null))}},destroy:function(){$(window).unbind(".mPS2id"),$(document).undelegate(".mPS2id").removeData("mPS2id"),$("._mPS2id-t").removeData("mPS2id"),functions._removeClasses.call(null,!0)}},functions={_isDisabled:function(){var e=window,a="inner",val=opt.disablePluginBelow instanceof Array?[opt.disablePluginBelow[0]||0,opt.disablePluginBelow[1]||0]:[opt.disablePluginBelow||0,0];return"innerWidth"in window||(a="client",e=document.documentElement||document.body),e[a+"Width"]<=val[0]||e[a+"Height"]<=val[1]},_isValid:function(href,hrefProp){if(href){var str=-1!==(hrefProp=hrefProp||href).indexOf("#/")?hrefProp.split("#/")[0]:hrefProp.split("#")[0],loc=window.location.toString().split("#")[0];return"#"!==href&&-1!==href.indexOf("#")&&(""===str||decodeURIComponent(str)===decodeURIComponent(loc))}},_setup:function(){var el=functions._highlightSelector(),i=1,tp=0;return $(el).each(function(){var $this=$(this),href=$this.attr("href"),hrefProp=$this.prop("href").baseVal||$this.prop("href");if(functions._isValid.call(null,href,hrefProp)){if(opt.excludeSelectors&&$this.is(opt.excludeSelectors))return;var id=-1!==href.indexOf("#/")?href.split("#/")[1]:href.split("#")[1],t=$("#"+id);if(0<t.length){opt.highlightByNextTarget&&t!==tp&&(tp?tp.data("mPS2id",{tn:t}):t.data("mPS2id",{tn:"0"}),tp=t),t.hasClass("_mPS2id-t")||t.addClass("_mPS2id-t"),t.data("mPS2id",{i:i}),$this.hasClass("_mPS2id-h")||$this.addClass("_mPS2id-h");var h=functions._findHighlight.call(null,id);functions._setClasses.call(null,!1,t,h),_totalInstances=i,++i==$(el).length&&functions._extendClasses.call(null)}}})},_highlightSelector:function(){return opt.highlightSelector&&""!==opt.highlightSelector?opt.highlightSelector:selector},_findTarget:function(str){var val=-1!==str.indexOf("#/")?str.split("#/")[1]:str.split("#")[1],el=$("#"+val);if(el.length<1||"fixed"===el.css("position")){if("top"!==val)return;el=$("body")}return _target=el,_axis||(_axis=opt.layout),_offset=functions._setOffset.call(null),(_to=[(el.offset().top-_offset[0]).toString(),(el.offset().left-_offset[1]).toString()])[0]=_to[0]<0?0:_to[0],_to[1]=_to[1]<0?0:_to[1],_to},_setOffset:function(){var val,obj,y,x;switch(_offset||(_offset=opt.offset?opt.offset:0),_dataOffset&&(_offset=_dataOffset),typeof _offset){case"object":case"string":0<(obj=[(val=[_offset.y?_offset.y:_offset,_offset.x?_offset.x:_offset])[0]instanceof jQuery?val[0]:$(val[0]),val[1]instanceof jQuery?val[1]:$(val[1])])[0].length?(y=obj[0].height(),"fixed"===obj[0].css("position")&&(y+=obj[0][0].offsetTop)):y=!isNaN(parseFloat(val[0]))&&isFinite(val[0])?parseInt(val[0]):0,0<obj[1].length?(x=obj[1].width(),"fixed"===obj[1].css("position")&&(x+=obj[1][0].offsetLeft)):x=!isNaN(parseFloat(val[1]))&&isFinite(val[1])?parseInt(val[1]):0;break;case"function":(val=_offset.call(null))instanceof Array?(y=val[0],x=val[1]):y=x=val;break;default:y=x=parseInt(_offset)}return[y,x]},_findHighlight:function(id){var wLoc=window.location,loc=wLoc.toString().split("#")[0],locPath=wLoc.pathname;return-1!==loc.indexOf("'")&&(loc=loc.replace("'","\\'")),-1!==locPath.indexOf("'")&&(locPath=locPath.replace("'","\\'")),loc=decodeURIComponent(loc),locPath=decodeURIComponent(locPath),$("._mPS2id-h[href='#"+id+"'],._mPS2id-h[href='"+loc+"#"+id+"'],._mPS2id-h[href='"+locPath+"#"+id+"'],._mPS2id-h[href='#/"+id+"'],._mPS2id-h[href='"+loc+"#/"+id+"'],._mPS2id-h[href='"+locPath+"#/"+id+"']")},_setClasses:function(c,t,h){var cc=opt.clickedClass,tc=opt.targetClass,hc=opt.highlightClass;c&&cc&&""!==cc?($("."+cc).removeClass(cc),_clicked.addClass(cc)):t&&tc&&""!==tc&&h&&hc&&""!==hc&&(functions._currentTarget.call(null,t)?(t.addClass(tc),h.addClass(hc)):(!opt.keepHighlightUntilNext||1<$("."+hc).length)&&(t.removeClass(tc),h.removeClass(hc)))},_extendClasses:function(){var tc=opt.targetClass,hc=opt.highlightClass,$tc=$("."+tc),$hc=$("."+hc),ftc=tc+"-first",ltc=tc+"-last",fhc=hc+"-first",lhc=hc+"-last";$("._mPS2id-t").removeClass(ftc+" "+ltc),$("._mPS2id-h").removeClass(fhc+" "+lhc),opt.forceSingleHighlight?opt.keepHighlightUntilNext&&1<$tc.length?($tc.slice(0,1).removeClass(tc),$hc.slice(0,1).removeClass(hc)):($tc.slice(1).removeClass(tc),$hc.slice(1).removeClass(hc)):($tc.slice(0,1).addClass(ftc).end().slice(-1).addClass(ltc),$hc.slice(0,1).addClass(fhc).end().slice(-1).addClass(lhc))},_removeClasses:function(destroy){$("."+opt.clickedClass).removeClass(opt.clickedClass),$("."+opt.targetClass).removeClass(opt.targetClass+" "+opt.targetClass+"-first "+opt.targetClass+"-last"),$("."+opt.highlightClass).removeClass(opt.highlightClass+" "+opt.highlightClass+"-first "+opt.highlightClass+"-last"),destroy&&($("._mPS2id-t").removeClass("_mPS2id-t"),$("._mPS2id-h").removeClass("_mPS2id-h"))},_currentTarget:function(t){var o=opt["target_"+t.data("mPS2id").i],dataTarget=t.data("ps2id-target"),rect=dataTarget&&$(dataTarget)[0]?$(dataTarget)[0].getBoundingClientRect():t[0].getBoundingClientRect();if(void 0!==o){var y=t.offset().top,x=t.offset().left,from=o.from?o.from+y:y,to=o.to?o.to+y:y,fromX=o.fromX?o.fromX+x:x,toX=o.toX?o.toX+x:x;return rect.top>=to&&rect.top<=from&&rect.left>=toX&&rect.left<=fromX}var wh=$(window).height(),ww=$(window).width(),th=dataTarget?$(dataTarget).height():t.height(),tw=dataTarget?$(dataTarget).width():t.width(),base=1+th/wh,top=base,bottom=th<wh?base*(wh/th):base,baseX=1+tw/ww,left=baseX,right=tw<ww?baseX*(ww/tw):baseX,val=[rect.top<=wh/top,rect.bottom>=wh/bottom,rect.left<=ww/left,rect.right>=ww/right];if(opt.highlightByNextTarget){var tn=t.data("mPS2id").tn;if(tn){var rectn=tn[0].getBoundingClientRect();"vertical"===opt.layout?val=[rect.top<=wh/2,rectn.top>wh/2,1,1]:"horizontal"===opt.layout&&(val=[1,1,rect.left<=ww/2,rectn.left>ww/2])}}return val[0]&&val[1]&&val[2]&&val[3]},_scrollTo:function(){_speed=functions._scrollSpeed.call(null),_to=opt.pageEndSmoothScroll?functions._pageEndSmoothScroll.call(null):_to;var _scrollable=$("html,body"),speed=opt.autoScrollSpeed?functions._autoScrollSpeed.call(null):_speed,easing=_scrollable.is(":animated")?opt.scrollingEasing:opt.scrollEasing,_t=$(window).scrollTop(),_l=$(window).scrollLeft();switch(_axis){case"horizontal":_l!=_to[1]&&(functions._callbacks.call(null,"onStart"),_scrollable.stop().animate({scrollLeft:_to[1]},speed,easing).promise().then(function(){functions._callbacks.call(null,"onComplete")}));break;case"auto":var left;if(_t!=_to[0]||_l!=_to[1])if(functions._callbacks.call(null,"onStart"),navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/))_scrollable.stop().animate({pageYOffset:_to[0],pageXOffset:_to[1]},{duration:speed,easing:easing,step:function(now,fx){"pageXOffset"==fx.prop?left=now:"pageYOffset"==fx.prop&&window.scrollTo(left,now)}}).promise().then(function(){functions._callbacks.call(null,"onComplete")});else _scrollable.stop().animate({scrollTop:_to[0],scrollLeft:_to[1]},speed,easing).promise().then(function(){functions._callbacks.call(null,"onComplete")});break;default:_t!=_to[0]&&(functions._callbacks.call(null,"onStart"),_scrollable.stop().animate({scrollTop:_to[0]},speed,easing).promise().then(function(){functions._callbacks.call(null,"onComplete")}))}},_pageEndSmoothScroll:function(){var _dh=$(document).height(),_dw=$(document).width(),_wh=$(window).height(),_ww=$(window).width();return[_dh-_to[0]<_wh?_dh-_wh:_to[0],_dw-_to[1]<_ww?_dw-_ww:_to[1]]},_scrollSpeed:function(){var speed=opt.scrollSpeed;return _clicked&&_clicked.length&&_clicked.add(_clicked.parent()).each(function(){var $this=$(this);if($this.attr("class")){var clickedClasses=$this.attr("class").split(" ");for(var index in clickedClasses)if(String(clickedClasses[index]).match(/^ps2id-speed-\d+$/)){speed=clickedClasses[index].split("ps2id-speed-")[1];break}}}),parseInt(speed)},_autoScrollSpeed:function(){var _t=$(window).scrollTop(),_l=$(window).scrollLeft(),_h=$(document).height(),_w=$(document).width(),val=[_speed+_speed*Math.floor(Math.abs(_to[0]-_t)/_h*100)/100,_speed+_speed*Math.floor(Math.abs(_to[1]-_l)/_w*100)/100];return Math.max.apply(Math,val)},_callbacks:function(c){if(opt)switch(this.mPS2id={trigger:_trigger,clicked:_clicked,target:_target,scrollTo:{y:_to[0],x:_to[1]}},c){case"onStart":if(opt.appendHash&&window.history&&window.history.pushState&&_clicked&&_clicked.length){var h="#"+_clicked.attr("href").split("#")[1];h!==window.location.hash&&history.pushState("","",h)}opt.onStart.call(null,this.mPS2id);break;case"onComplete":opt.onComplete.call(null,this.mPS2id)}},_reset:function(){_axis=_offset=_dataOffset=!1},_isInit:function(){_init||methods.init.apply(this)},_live:function(){_liveTimer=setTimeout(function(){opt.live?$(functions._highlightSelector()).length!==_totalInstances&&functions._setup.call(null):_liveTimer&&clearTimeout(_liveTimer),functions._live.call(null)},1e3)},_easing:function(){function __bounceOut(x){var n1=7.5625,d1=2.75;return x<1/d1?n1*x*x:x<2/d1?n1*(x-=1.5/d1)*x+.75:x<2.5/d1?n1*(x-=2.25/d1)*x+.9375:n1*(x-=2.625/d1)*x+.984375}$.easing.easeInQuad=$.easing.easeInQuad||function(x){return x*x},$.easing.easeOutQuad=$.easing.easeOutQuad||function(x){return 1-(1-x)*(1-x)},$.easing.easeInOutQuad=$.easing.easeInOutQuad||function(x){return x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2},$.easing.easeInCubic=$.easing.easeInCubic||function(x){return x*x*x},$.easing.easeOutCubic=$.easing.easeOutCubic||function(x){return 1-Math.pow(1-x,3)},$.easing.easeInOutCubic=$.easing.easeInOutCubic||function(x){return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2},$.easing.easeInQuart=$.easing.easeInQuart||function(x){return x*x*x*x},$.easing.easeOutQuart=$.easing.easeOutQuart||function(x){return 1-Math.pow(1-x,4)},$.easing.easeInOutQuart=$.easing.easeInOutQuart||function(x){return x<.5?8*x*x*x*x:1-Math.pow(-2*x+2,4)/2},$.easing.easeInQuint=$.easing.easeInQuint||function(x){return x*x*x*x*x},$.easing.easeOutQuint=$.easing.easeOutQuint||function(x){return 1-Math.pow(1-x,5)},$.easing.easeInOutQuint=$.easing.easeInOutQuint||function(x){return x<.5?16*x*x*x*x*x:1-Math.pow(-2*x+2,5)/2},$.easing.easeInExpo=$.easing.easeInExpo||function(x){return 0===x?0:Math.pow(2,10*x-10)},$.easing.easeOutExpo=$.easing.easeOutExpo||function(x){return 1===x?1:1-Math.pow(2,-10*x)},$.easing.easeInOutExpo=$.easing.easeInOutExpo||function(x){return 0===x?0:1===x?1:x<.5?Math.pow(2,20*x-10)/2:(2-Math.pow(2,-20*x+10))/2},$.easing.easeInSine=$.easing.easeInSine||function(x){return 1-Math.cos(x*Math.PI/2)},$.easing.easeOutSine=$.easing.easeOutSine||function(x){return Math.sin(x*Math.PI/2)},$.easing.easeInOutSine=$.easing.easeInOutSine||function(x){return-(Math.cos(Math.PI*x)-1)/2},$.easing.easeInCirc=$.easing.easeInCirc||function(x){return 1-Math.sqrt(1-Math.pow(x,2))},$.easing.easeOutCirc=$.easing.easeOutCirc||function(x){return Math.sqrt(1-Math.pow(x-1,2))},$.easing.easeInOutCirc=$.easing.easeInOutCirc||function(x){return x<.5?(1-Math.sqrt(1-Math.pow(2*x,2)))/2:(Math.sqrt(1-Math.pow(-2*x+2,2))+1)/2},$.easing.easeInElastic=$.easing.easeInElastic||function(x){return 0===x?0:1===x?1:-Math.pow(2,10*x-10)*Math.sin((10*x-10.75)*(2*Math.PI/3))},$.easing.easeOutElastic=$.easing.easeOutElastic||function(x){return 0===x?0:1===x?1:Math.pow(2,-10*x)*Math.sin((10*x-.75)*(2*Math.PI/3))+1},$.easing.easeInOutElastic=$.easing.easeInOutElastic||function(x){return 0===x?0:1===x?1:x<.5?-Math.pow(2,20*x-10)*Math.sin((20*x-11.125)*(2*Math.PI/4.5))/2:Math.pow(2,-20*x+10)*Math.sin((20*x-11.125)*(2*Math.PI/4.5))/2+1},$.easing.easeInBack=$.easing.easeInBack||function(x){return 2.70158*x*x*x-1.70158*x*x},$.easing.easeOutBack=$.easing.easeOutBack||function(x){return 1+2.70158*Math.pow(x-1,3)+1.70158*Math.pow(x-1,2)},$.easing.easeInOutBack=$.easing.easeInOutBack||function(x){return x<.5?Math.pow(2*x,2)*(7.189819*x-2.5949095)/2:(Math.pow(2*x-2,2)*(3.5949095*(2*x-2)+2.5949095)+2)/2},$.easing.easeInBounce=$.easing.easeInBounce||function(x){return 1-__bounceOut(1-x)},$.easing.easeOutBounce=$.easing.easeOutBounce||__bounceOut,$.easing.easeInOutBounce=$.easing.easeInOutBounce||function(x){return x<.5?(1-__bounceOut(1-2*x))/2:(1+__bounceOut(2*x-1))/2}}};functions._easing.call(),$.fn.mPageScroll2id=function(method){return methods[method]?methods[method].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof method&&method?void $.error("Method "+method+" does not exist"):methods.init.apply(this,arguments)},$.mPageScroll2id=function(method){return methods[method]?methods[method].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof method&&method?void $.error("Method "+method+" does not exist"):methods.init.apply(this,arguments)},$.mPageScroll2id.defaults=defaults}(jQuery,window,document);
