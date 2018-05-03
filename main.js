    function versions() {
        var u = navigator.userAgent,
            app = navigator.appVersion;
        return {
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
            weixin: u.indexOf('MicroMessenger') > -1
        };
    }
    var versionsRes = versions();
    (function(window) {
        function _$(arg) {
            return new VQuery(arg);
        }

        function myAddEvent(obj, evt, fn) { //事件绑定，将会让一个事件发生多个
            if (obj.attachEvent) {
                obj.attachEvent('on' + evt, fn); //attachEvent方法只支持IE浏览器,执行顺序是，后绑定的先执行．
            } else {
                //功能相同的指令是addEventListener,该指令支持FF等浏览器，并且是W3C标准
                obj.addEventListener(evt, fn, false); //执行顺序是，先绑定的先执行
            }
        }

        function getByClass(oparent, oclass) { //指定标签名下的className
            var aEle = oparent.getElementsByTagName('*');
            var result = [];
            var i = 0;
            for (i = 0; i < aEle.length; i++) {
                if (aEle[i].className.indexOf(oclass)!=-1) {
                    result.push(aEle[i]);
                }
            }            
            return result;
        }

        function getStyle(obj, attr) {
            if (obj.currentStyle) { //行内样式
                return obj.currentStyle[attr];
            } else { //嵌入样式，外联样式
                return getComputedStyle(obj, false)[attr];
            }
        }

        function setAttribute(o, a, v) {
            if (typeof o != 'object' || typeof a != 'string') return;
            a == 'class' ? o.className = v : o.setAttribute(a, v);
        }
        /*
         * 获取HTML元素属性值
         * @param object o 要获取属性的HTML元素
         * @param string a 要获取的属性名
         * @return 返回要获取的属性值
         */
        function getAttribute(o, a) {
            if (typeof o != 'object' || typeof a != 'string') return;
            return a == 'class' ? o.className : o.getAttribute(a);
        }
        /*
         * 移除HTML元素属性
         * @param object o 要移除属性的HTML元素
         * @param string a 要移除的属性名        
         */
        function removeAttribute(o, a) {
            if (typeof o != 'object' || typeof a != 'string') return;
            o.removeAttribute(a);
            if (a == 'class') o.removeAttribute('className');
        }
        //arg类型：
        //1.函数
        //2.字符串:  #xxx,.xxx,X
        //3.对象
        function VQuery(arg) {
            //用来保存选中的元素
            this.elements = [];
            switch (typeof arg) {
                case 'function':
                    myAddEvent(window, 'load', arg); //使用window.onload当多个时间发生时，会产生覆盖
                    break;
                case 'string':
                    if (arg.indexOf(",") == -1) {
                        // console.log(arg.substring(1));
                        switch (arg.charAt(0)) {
                            case '#': //Id
                                //#id
                                var obj = document.getElementById(arg.substring(1));
                                this.elements.push(obj);
                                break;
                            case '.': //className
                                //.class
                                this.elements = getByClass(document, arg.substring(1));
                                //console.dir(this.elements);
                                break;
                            default: //TagName   
                                this.elements = document.getElementsByTagName(arg);
                        }
                    } else {
                        var argArr = arg.split(",");
                        for (var i = 0; i < argArr.length; i++) {
                            if (argArr[i].charAt(0) == '#') {
                                var obj2 = document.getElementById(argArr[i].substring(1));
                                this.elements.push(obj2);
                            } else if (argArr[i].charAt(0) == '.') {
                                var newArr = getByClass(document, argArr[i].substring(1));
                                for (var k = 0; k < newArr.length; k++) {
                                    this.elements.push(newArr[k]);
                                }
                            } else {
                                var newArr2 = document.getElementsByTagName(argArr[i]);
                                for (var j = 0; j < newArr2.length; j++) {
                                    this.elements.push(newArr2[j]);
                                }
                            }
                        }
                    }
                    break;
                case 'object':
                    this.elements.push(arg);
            }
        }
        //点击事件
        VQuery.prototype.click = function(fn) {
            for (var i = 0; i < this.elements.length; i++) {                
                myAddEvent(this.elements[i], 'click', fn);
            }
        };

        VQuery.prototype.show = function() {
            for (var i = 0; i < this.elements.length; i++) {
                this.elements[i].style.display = 'block';
            }
        };
        VQuery.prototype.hide = function() {
            for (var i = 0; i < this.elements.length; i++) {
                this.elements[i].style.display = 'none';
            }
        };
        VQuery.prototype.hover = function(over, out) {
            for (var i = 0; i < this.elements.length; i++) {
                myAddEvent(this.elements[i], 'mouseover', over);
                myAddEvent(this.elements[i], 'mouseout', out);
            }
        };
        VQuery.prototype.css = function(attr, value) {
            if (arguments.length == 2) {
                for (var i = 0; i < this.elements.length; i++) {
                    this.elements[i].style[attr] = value;
                }
            } else {
                return getStyle(this.elements[0], attr);
            }
        }
        VQuery.prototype.attr = function(attr, value) {
            if (arguments.length == 2) {
                for (var i = 0; i < this.elements.length; i++) {
                    setAttribute(this.elements[i], attr, value);
                }
            } else {
                return getAttribute(this.elements[0], attr);
            }
        }
        window._$ = _$;
    })(window);
    _$(".download,.downBtn").click(function() {
        if (versionsRes.android) {
            //  android
            if (_$('.androidUrl').attr('href') != "#2") {
                window.location.href = _$('.androidUrl').attr('href');
            } else {
                alert('敬請期待');
            }
        } else if (versionsRes.ios) {
            // ios
            if (_$('.iosUrl').attr('href') != "#1") {
                window.location.href = _$('.iosUrl').attr('href');
            } else {
                alert('敬請期待');
            }
        }
    });