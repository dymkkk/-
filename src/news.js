this.jPlus = this.jPlus || {};
(function (){
    var news ={
        init:function(){
            this.initSelect();
        },
        initSelect:function(){
            var cur = this;
            $(".selectMC .selected").click(function(){
                cur.toToggle($(".selectMC .list"));
            });
            $(".selectMC .op").click(function(){
                cur.toHidden($(".selectMC .list"));
            });
            this.toHidden($(".selectMC .list"));
        },
        toShow:function($dom){
            if($dom.css("visibility") == "hidden"){
                $dom.css({"opacity":1,"visibility":"visible",maxHeight:"200px"});
            }
        },
        toHidden:function($dom){
            if($dom.css("visibility") == "visible"){
                $dom.css({"opacity":0,"visibility":"hidden",maxHeight:0});
            }
        },
        toToggle:function($dom){
            if($dom.css("visibility") == "hidden"){
                $dom.css({"opacity":1,"visibility":"visible",maxHeight:"200px"});
            }else{
                $dom.css({"opacity":0,"visibility":"hidden",maxHeight:0});
            }
        }
    };
    jPlus.news = news;
})();