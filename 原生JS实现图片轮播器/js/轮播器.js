var container = document.getElementById("container");
var list = document.getElementById("list");
var prev = document.getElementById("prev");
var next = document.getElementById("next");
var buttons = document.getElementById("buttons").getElementsByTagName("span");
var tiao = document.getElementById("tiao");
var yulans = document.getElementById("yulanList").getElementsByTagName("img");

var index = 0;
var count = 4;//图片张数
var animated = false;//动画状态 动画状态为true时禁止点击

var interval = 4000;
// var pInterval;

//图片切换计时器
var timer;
//进度条动画计时器
var timerP;


var imgWidth = 800;//图片宽度

// 开始动画
play();
progressAnimate();


container.onmouseover = stop;
container.onmouseout = play;

//滑动动画
function animate(offset) {
    animated = true;
    //获取当前偏移
    var left = parseInt(list.style.left) + offset;

    var time = 100;//位移总时间
    var interval = 10;//位移间隔时间
    var speed = offset/(time/interval);//300ms内进行30次位移循环，每次移动距离为speed，以此实现动画位移
    function go() {
        if ((parseInt(list.style.left) > left) || (parseInt(list.style.left) < left) ) {
            //满足位移条件进行定时器递归 实现动画位移
            list.style.left = parseInt(list.style.left) + speed + "px";
            setTimeout(go,interval);
        } else {
            //不满足位移条件 即动画位移完毕后
            //next到最后一张辅助图时 归位到真图上 
            if (left < (-imgWidth * count)) {
                list.style.left = -imgWidth + "px";
            }
            //prev到最前一张辅助图时 归位到真图上
            if (left > -imgWidth) {
                list.style.left = -imgWidth * count + "px";
            }
            //动画完毕后将动画状态改为false
            animated = false;
        }
    }
    go(); 
}

//切换时 点亮小圆点
function showButton() {
    for (var i = 0;i < buttons.length;i++) {
        if (buttons[i].className == "on") {
            buttons[i].className = "";
            break;
        }
    }
    buttons[index].className = "on";
}

function showYulan() {
    for (var i = 0;i < yulans.length;i++) {
        if(yulans[i].className == "active") {
            yulans[i].className = "";
            break;
        }
    }
    yulans[index].className = "active";
}

//给每一个小圆点添加点击事件
for (var i = 0;i < buttons.length;i++) {
    buttons[i].onclick = function () {
        //如果正在动画，点击无效
        if (animated) {
            return;
        }
        //如果点击的是当前小圆点，点击不发生反应
        if (this.className == "on") {
            return;
        }
        //获取点击的小圆点的index值
        var myIndex = parseInt(this.getAttribute('index'));
        //计算当前小圆点和点击小圆点分别指示的图片之间的偏移量
        var offset = imgWidth * (index - myIndex);
        animate(offset);
        progressAnimate();
        index = myIndex;
        showButton();
    }
}

for (var i = 0;i < yulans.length;i++) {
    yulans[i].onclick = function () {
        if (animated) {
            return;
        }
        if (this.className == "active") {
            return;
        }

        tiao.style.width = "0px";
        clearTimeout(timer);
        progressAnimate();
        play();

        var myIndex = parseInt(this.getAttribute("index"));
        var offset = imgWidth * (index - myIndex);
        animate(offset);

        index = myIndex;
        showYulan();
    }
}
//点击prev按钮
prev.onclick = function () {
    if (animated) {
        return;
    }

    if (index == 0) {
        index = 3;
    } else {
        index--;
    }
    // showButton();
    showYulan();

    animate(imgWidth);
}

//点击next按钮
next.onclick = function () {
    if (animated) {
        return;
    }

    if (index == 3) {
        index = 0;
    } else {
        index++;
    }

    // showButton();
    showYulan();

    tiao.style.width = "0px";
    clearTimeout(timerP);
    progressAnimate();

    animate(-imgWidth);
}

//播放和暂停动画
function play() {
    //根据当前进度条剩余量，判断定时器间隔
    // pInterval = interval * (1 - parseInt(tiao.style.width)/imgWidth);
    //播放进度条动画
    tiao.style.width = "0px";
    timer = setTimeout(function () {
        //切换图片
        next.onclick();
        play();
    }, interval + 600);
}

function stop() {
    //清空计时器
    clearTimeout(timer);
    
}

//进度条
function progressAnimate() {
    clearTimeout(timerP);
    //根据当前进度条剩余量计算进度条速度
    // var speed = (imgWidth - parseInt(tiao.style.width)) / (pInterval / 10);
    var speed = imgWidth / (interval / 10);
    function goPro() {
        if (parseInt(tiao.style.width) < imgWidth) {
            tiao.style.width = parseInt(tiao.style.width) + speed + "px";
            timerP = setTimeout(goPro,10);
        } else {
            //进度条置零
            tiao.style.width = "0px";
            clearTimeout(timerP);
        }
    }
    goPro();
}



