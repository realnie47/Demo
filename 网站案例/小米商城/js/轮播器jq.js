$(document).ready(function () {
    //轮播器元素
    var $container = $("#container");
    var $list = $("#list");
    var $buttons = $("#buttons span");
    var $prev = $("#prev");
    var $next = $("#next");
    //图片索引
    var index = 0;
    //图片个数
    var count = 4;
    //自动播放时间间隔
    var interval = 4000;
    //定时器
    var timer;

    //与原生JS相比，无需再写动画的实现函数，因为JQ可以直接实现动画效果
    $next.click(function() {
        if (index == 3) {
            index = 0;
            // $list.animate({"left":"0px"});
            $list.fadeTo("normal",0.5,function() {
                $list.css("left","0px");
            }).fadeTo("narmal",1);
        } else {
            index++;
            // $list.animate({"left":"-=1226px"});
            $list.fadeTo("normal",0.5,function() {
                $list.css("left","-=1226px");
            }).fadeTo("narmal",1);
        }
        showButton();
    })

    $prev.click(function() {
        if (index == 0) {
            index = 3;
            // $list.animate({"left":"-3678px"});
            $list.fadeTo("normal",0.5,function() {
                $list.css("left","-3678px");
            }).fadeTo("narmal",1);
        } else {
            index--;
            // $list.animate({"left":"+=1226px"});
            $list.fadeTo("normal",0.5,function() {
                $list.css("left","+=1226px");
            }).fadeTo("narmal",1);
        }
        showButton();
    })

    function showButton() {
        //点亮当前小圆点，移除其他小圆点
        //eq()选择索引的元素
        //siblings()选择当前元素的兄弟元素
        $buttons.eq(index).addClass("on").siblings().removeClass("on");
    }

    //遍历所有小圆点为每个小圆点添加点击事件
    $buttons.each(function() {
        $(this).click(function() {
            var myIndex = parseInt($(this).attr("index"));
            var offset = -1226 * (myIndex - index);
            var oLeft = parseInt($list.css("left")) + offset + "px";
            // $list.animate({"left":oLeft});
            $list.fadeTo("normal",0.5,function() {
                $list.css("left",oLeft);
            }).fadeTo("narmal",1);
            index = myIndex;
            showButton();
        })
    })

    function play() {
        timer = setTimeout(function() {
            //trigger()触发事件
            $next.trigger("click");
            play();
        }, interval);
    }

    function stop() {
        clearTimeout(timer);
    }

    //鼠标悬停在容器内时，停止播放，鼠标移开时继续播放
    $container.hover(stop,play);
    play();
});