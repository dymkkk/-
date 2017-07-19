$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});


this.jPlus = this.jPlus || {};
(function (){
    var main ={
        init:function(){
            this.initResize();
            this.initScroll();
            this.initCover();
            this.initCoverEvent();
            this.initNav();
            this.initBanner();
            this.initAbout();
            this.initService();
            this.initContact();
            this.iniWow();
        },
        initResize:function(){
            $(window).resize(function(){
                //1rem = 16px;这里使用32,因为fontsize小于12px不起作用,css中1rem = 32px;
                var size = Math.min(100,100 * (window.innerWidth / 750));
                size = Math.max(12,size);
                $("html,body").css("fontSize",size+"px");
            });
            $(window).resize();
        },
        initScroll:function(){
            var cur = this;
            $(window).scroll(function(){
                if( $(this).scrollTop() >= $(this).height() ){
                    cur.toShow($(".navContainer"));
                }
                else{
                    cur.toHidden($(".navContainer"));
                }
            });
        },
        initCover:function(){
            var swiper = new Swiper('.cover', {
                speed: 1000,
                autoplay:5000,
                effect: 'fade'
            });
        },
        initNav:function(){
            var cur = this;
            $(".menuFlag").click(function(){
                cur.toToggle($(".navContainer_m"));
            });
        },
        initBanner:function(){
            var swiper = new Swiper('.banner', {
                //autoplay: 5000,//可选选项，自动滑动
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                speed: 1000,
                onSlideChangeStart: function(swiper){
                    var id = swiper.activeIndex;
                    var $dom = $(swiper.slides[id]);
                    $dom.children(".sub1").animateCss("fadeInDown");
                    $dom.children(".sub1_1").animateCss("fadeInDown");
                    $dom.children(".sub2").animateCss("fadeInUp");
                    $dom.children(".sub2_1").animateCss("fadeInUp");
                    $dom.children(".sub3").animateCss("zoomIn");
                    $dom.children(".sub4").animateCss("fadeInUp");
                }
            })
        },
        initAbout:function(){
            var swiper = new Swiper('.about .rightPanel', {
                nextButton: '.about .nextBtn',
                prevButton: '.about .prevBtn',
                /*autoplay:5000,*/
                speed: 500
            });
        },
        initService:function(){
            var swiper = new Swiper('.service .swiper-container', {
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                speed: 1000,
                /*autoplay:5000,*/
                slidesPerView : 'auto',
                slidesPerGroup : 1
            });
        },
        initContact:function(){
            var swiper = new Swiper('.contact .rightContent', {
                pagination: '.swiper-pagination',
                paginationClickable: '.swiper-pagination',
                speed: 500
            });
        },
        toShow:function($dom){
            if($dom.css("visibility") == "hidden"){
                $dom.css({"opacity":1,"visibility":"visible","top":0});
            }
        },
        toHidden:function($dom){
            if($dom.css("visibility") == "visible"){
                $dom.css({"opacity":0,"visibility":"hidden","top":"-100px"});
            }
        },
        toToggle:function($dom){
            if($dom.css("visibility") == "hidden"){
                $dom.css({"opacity":1,"visibility":"visible"});
            }else{
                $dom.css({"opacity":0,"visibility":"hidden"});
            }
        },

        /*第一屏相关事件*/
        initCoverEvent:function(){
            var cur = this;
            this.coverInfo={downY:0,canTouch:true};
            //
            console.log($(document).scrollTop());
            document.addEventListener('touchstart',function(e){
                if(cur.coverInfo.canTouch && $(document).scrollTop()< 10){
                    //e.preventDefault();
                    cur.coverInfo.downY = e.touches[0].clientY;
                }
            },false);
            document.addEventListener('touchmove',function(e){
                if(cur.coverInfo.canTouch && $(document).scrollTop()< 10){
                    e.preventDefault();
                    var tempY = e.touches[0].clientY - cur.coverInfo.downY;
                    console.log(tempY);
                    if(tempY < -50){
                        cur.exitCover();
                    }
                }
            },false);
            //
            $(document).on("mousewheel DOMMouseScroll", function (e) {
                if(cur.coverInfo.canTouch && $(document).scrollTop()< 10){
                    var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) || (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));
                    if (delta < 0) {
                        // 向下滚
                        cur.exitCover();
                    }
                }
            });
            //
            $(".cover .arrow, .cover .scrollTxt").click(function(){
                cur.exitCover();
            });
        },
        exitCover:function(){
            var cur = this;
            this.coverInfo.canTouch = false;
            $("body").stop().animate({scrollTop:window.innerHeight},500,function(){
                cur.coverInfo.canTouch = true;
            });
        },
        //
        iniWow:function(){
            var wow = new WOW({
                boxClass: 'wow',
                animateClass: 'animated',
                offset: 100,
                mobile: true,
                live: true
            });
            wow.init();
        }
    };
    jPlus.main = main;
})();

/*移动端适配等式:
 设备宽度/设计稿宽度 = 某个元素某一距离实际值/该元素在设计稿的值
 例子:
 一个5s宽度320/设计稿宽度640 = 一个元素的高度未知/设计稿上它的高度为20

 可以推出它的实际高度为10，通常我们使用rem作为等式前的值，但是因为太小无法作为html根字体大小使用，所以适当放大，通常为了方便计算，放大100倍，即为:
 document.documentElement.fontSize = document.documentElement.clientWidth / 640 (或实际设计稿宽度) * 100
 那么此时在设计稿上量的的某一距离，比如43px，就等于0.43rem。

 至于文字，我们通常不用rem，因为由于不同的rem计算方式会产生很多奇怪的大小，使得文字出现糊掉或者模糊的情况，通常我们使用媒体查询事先设置好body的字体大小，这样来确保文字的正常显示。
 即为:rem处理适配距离的问题，em处理文字大小问题*/

