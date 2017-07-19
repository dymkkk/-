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
    var common ={
        init:function(){
            this.initResize();
            this.initNav();
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
        initNav:function(){
            var cur = this;
            $(".menuFlag").click(function(){
                cur.toToggle($(".navContainer_m"));
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
    jPlus.common = common;
})();



