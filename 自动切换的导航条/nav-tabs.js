var navTab = document.getElementById("navList").getElementsByTagName("li");
var page = document.getElementById("content").getElementsByTagName("div");
var index = 0;
var timer;
window.onload = function () {
    play();
}

//自动切换选项卡
function play() {
    if (index == 4) {
        index = 0;
    }
    for (var i = 0; i < navTab.length;i++) {
        if (navTab[i].className == "active") {
            navTab[i].className = "";
            break;
        }
    }
    navTab[index].className = "active";
    displayPage(index);
    index++;
    timer = setTimeout(function() {
        play();
    }, 2000);
}

//为所有选项卡添加鼠标悬停及离开事件
for (var i = 0; i < navTab.length;i++) {
    //悬停时激活选项卡并切换到响应页面
    navTab[i].onmouseover = function () {
        //暂停自动切换
        clearTimeout(timer);
        
        //激活选项卡
        if (this.className == "active") {
            return;
        }
        for (var i = 0; i < navTab.length;i++) {
            if (navTab[i].className == "active") {
                navTab[i].className = "";
                break;
            }
        }
        this.className = "active";
        index = parseInt(this.getAttribute("index"));
        //切换页面
        displayPage(index);
    }
    //离开时继续自动切换
    navTab[i].onmouseout = play;
}


//切换页面
function displayPage(count) {
    for (var i = 0;i < page.length;i++) {
        page[i].className = "hidden";
        if ( i == count) {
            page[i].className = "activePage";
        }
    }
}