;(function(win, doc) {
    var wins = win;
    var docs = doc;

    //获取浏览器总宽度和总高度
    var winWidth = docs.documentElement.clientWidth + "px";
    var winHeight = docs.documentElement.clientHeight + "px";

    var Loading = function(config) {
        this.defaults = {
            name: docs.getElementById("layer") || docs.getElementById(config.name),
            styles: {
                position: "fixed",
                top: "0",
                left: "0",
                right: "0",
                bottom: "0",
                width: winWidth,
                height: winHeight,
                background: "black url(http://images.cheertea.com/loading.gif) center center no-repeat",
                backgroundSize: "contain",
                opacity: "0.9"
            } || config.styles
        }

        //执行showLayer
        this.setStyle();

        //窗口变化的时候
        this.resizeStyle();
    }
    Loading.prototype = {
        constructor: Loading,

        //设置遮罩层的样式
        setStyle: function() {

            //将css格式化成cssText的字符串格式
            var styles = "";
            for(var item in this.defaults.styles) {
                styles += item + ": " + this.defaults.styles[item] + ";";
            }
            this.defaults["name"].style.cssText = styles;
        },

        //重新设置遮罩层
        resizeStyle: function() {
            console.log(1223)
            var context = this;

            //兼容问题
            wins.addEventListener("resize", thottle(function() {
                winWidth = docs.documentElement.clientWidth + "px";
                winHeight = docs.documentElement.clientHeight + "px";
                context.defaults.styles["width"] = winWidth;
                context.defaults.styles["height"] = winHeight;
                context.setStyle();
            }, 250, 500), false);
        },
        close: function() {
            docs.documentElement.removeChild(this.defaults["name"]);
        }
    }

    //函数的节流与去抖
    function thottle(fn, duration, delay) {

        //设置初始时间
        var startTime = +new Date();

        return function() {
            var context = this;
            var args = arguments;

            //设置终止时间
            var endTime = +new Date();
            clearTimeout(fn.timer);

            if(endTime - startTime > duration) {
                fn.apply(context, args);
                startTime = endTime;
            } else {
                fn.timer = setTimeout(function() {
                    fn.apply(context, args);
                }, delay);
            }
        }
    }

    //检测是否为AMD或者CMD，或者window
    if(typeof exports == "object") {
        module.exports = Loading;
    } else if(typeof define == "function" &&define.amd) {
        define([], function() {
            return Loading;
        });
    } else {
        win.Loading = Loading;
    }
})(window, document, undefined);

