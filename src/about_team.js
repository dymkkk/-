jQuery.fn.extend({
    imageLoad: function() {
        this.each(function(){
            //
            if(this.complete)
            {

            }
            //
            $(this).bind("load",function(){
                $(this).fadeIn(800);
                $(this).trigger("imageLoadComplete");
            });
            //
            $(this).data("isLoaded","t");
            $(this).attr("src",$(this).attr("final-src"));
        });

        function appear($dom)
        {
            $dom.fadeIn();
        }
    }
});


this.jPlus = this.jPlus || {};
(function (){
    var aboutTeam ={
        init:function(){
            var cur = this;
            $(".team .colItem").click(function(){
                cur.showDetail($(this));
            });
            //
            $(".teamDetail .icon-close").click(function(){
                cur.hideDetail();
            });
        },
        showDetail:function($dom){
            console.log("show");
            $(".teamDetail .title").html($dom.children(".userName").html());
            $(".teamDetail .job").html($dom.children(".job").html());
            $(".teamDetail .intro").html($dom.children(".intro").html());
            $(".teamDetail .detailImg").attr("final-src",$dom.children(".imageUrl").html());
            $(".teamDetail .detailImg").imageLoad();
            $(".teamDetailContainer").css({"opacity":1,"visibility":"visible"});
        },
        hideDetail:function(){
            $(".teamDetailContainer").css({"opacity":0,"visibility":"hidden"});
        }
    };
    jPlus.aboutTeam = aboutTeam;
})();


