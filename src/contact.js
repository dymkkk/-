this.jPlus = this.jPlus || {};
(function (){
    var contact = {
        init:function(){
            var cur = this;
            $(".job .jobItem .titleBar").each(function(i,dom){
                $(this).data("id",i);
            });
            $(".job .jobItem .titleBar").click(function(){
                var id = $(this).data("id");
                cur.open(id);
            });
            $(".job .jobItem .titleBar").eq(0).click();

        },
        open:function(id){
            $(".job .jobItem .toggleContent").removeClass("openContent").addClass("closeContent");
            $(".job .jobItem .toggleContent").eq(id).removeClass("closeContent").addClass("openContent");
            //
            $(".job .jobItem .titleBar").removeClass("titleBar_open");
            $(".job .jobItem .titleBar").eq(id).addClass("titleBar_open");


        },
        close:function(id){
            $(".job .jobItem .toggleContent").each(function(i,dom){
                if($(dom).hasClass("closeContent")){
                    $(dom).removeClass("closeContent").addClass(".openContent");
                }
                if(i == id){
                    $(dom).removeClass("openContent").addClass(".closeContent");
                }
            });
        }
    };
    jPlus.contact = contact;
})();


