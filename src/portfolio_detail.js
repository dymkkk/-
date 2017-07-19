this.jPlus = this.jPlus || {};
(function (){
    var portfolioDetail ={
        init:function(){
            this.initResize();
            this.initCoverEvent();
        },
        initCover:function(){
            var swiper = new Swiper('.cover', {
                speed: 1000,
                autoplay: 5000,
                effect: 'fade'
            });
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
        }
    };
    jPlus.portfolioDetail = portfolioDetail;
})();


