(function ($) {
    var gi=0;
    var time=5000;
    var clo;
    var bodyBlur=`<div id="blur29" style="width: 100vw;height: 100vh;filter: blur(100px);background-color: #685050;z-index:2147483646;position:absolute;"></div>`
    $.fn.formvalue = function (data,t) {
        console.log(data.sequence[0].content.btn_next);
        if (t) {
          time=t;  
        }
         
        $(data.sequence).each(function (index, element) {
            /* let btn_next=$(`<button name="next" type="button">next</button>`);
            let btn_previous=$(`<button name="previous" type="button">previous</button>`); */
            let string = `<a class="btn bg-light btn-sm text-dark position-absolute top-0 end-0 rounded close">Close</a><b>${element.title}</b><p>${element.content.text}</p><hr>`
            
            /* const moonLanding = new Date();
            console.log(moonLanding.getMilliseconds());
            console.log(moonLanding.getMilliseconds()); */
        
            
            if (element.content.btn_previous === true && index!=0) {
                string += `<a class="btn bg-light m-1 previous" type="button">previous</a>`
            }
            console.log(element.content.btn_next);
            if (element.content.btn_next === true) {
                string += `<a class="btn bg-light m-1 next" id="next${++gi}">next</a>`
            }
            console.log(string);

            $(element.element).attr("data-bs-toggle", "tooltip");
            $(element.element).attr("title", string);
            /* $(element.element).attr("data-bs-content", element.content.text); */
            $(element.element).attr("data-bs-trigger", "manual");
            $(element.element).attr("data-bs-html", "true");
            $(element.element).attr("data-bs-template", `<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>`);
        });
        var tooltipTriggerList = $('[data-bs-toggle="tooltip"]')
        var calection = [];
        $.each(tooltipTriggerList, function (index, tooltipTriggerEl) {
            const r = new bootstrap.Tooltip(tooltipTriggerEl)
            calection.push(r);
            console.log(">>>",r);
            
        })
        console.log($(calection[0]));/* ._config.title */
        elClone($(data.sequence[0].element));
        console.log("ajit>>",$(calection[0]).find("id"));
       
            console.log(  $(".tooltip ").length);
            $("body").prepend(bodyBlur);
            
            calection[0].show() 

            $(data.sequence[0].element).css("z-index","2147483647");
            $($(".tooltip").get($(".tooltip ").length-1)).css("z-index","2147483647").css("position","absolute");
                
            toolshow(calection,data); 
            
        /* $.each(tooltipTriggerList,function (index,tooltipTriggerEl) {
            tooltipTriggerEl.show()
          }) */
    };
    let showi=0;
    var style;
    function toolshow(calection,data) {
        console.log(calection,showi);
        var sto;
        
        if(calection.length-1===showi){
            let el=$($(".tooltip").get($(".tooltip ").length-1)).find('a.next');
            el.html("Close")
            el.addClass("close");
            el.removeClass("next");
        }else{
            if($($(".tooltip").get($(".tooltip ").length-1)).find('a.next').length)
            {console.log("ajj",$($(".tooltip").get($(".tooltip ").length-1)).find('a.next'));
                $($(".tooltip").get($(".tooltip ").length-1)).find('a.next').click(function (e) { 
                    calection[showi].hide();
                    calection[++showi].show();
                    console.log("////>>>",data.sequence[showi].element);
                   
                    /* var position =  $(data.sequence[showi].element).position();
                    var clo=$(data.sequence[showi].element).clone().css({
                        "left": position.left,
                        "top": position.top,
                        "position": "absolute",
                        "z-index": "2147483647" 
                    }); */
                    elClone($(data.sequence[showi].element));
                    $($(".tooltip").get($(".tooltip ").length-1)).css("z-index","2147483647").css("position","absolute")
                    toolshow(calection,data); 
                });
            }else{
                sto= setTimeout(function() {
                    calection[showi].hide();
                    calection[++showi].show();
                    $(data.sequence[showi].element).css("z-index","2147483647");
                    $($(".tooltip").get($(".tooltip ").length-1)).css("z-index","2147483647").css("position","absolute");
                    toolshow(calection,data);  
                } , time);
            }
            /* $("body").prepend(bodyBlur); */
        }
        $($(".tooltip").get($(".tooltip ").length-1)).find('a.previous').click(function (e) { 
            calection[showi].hide();
            clearTimeout(sto)
            calection[--showi].show();
            $(data.sequence[showi].element).css("z-index","2147483647");
            $($(".tooltip").get($(".tooltip ").length-1)).css("z-index","2147483647").css("position","absolute")
            toolshow(calection,data); 
        });
        $($(".tooltip").get($(".tooltip ").length-1)).find('.close').click(function (e) { 
            calection[showi].hide();
            $("#blur29").remove();
        });
        
        function cloRemove(){
            alert("a")
            clo.remove();
        }
    }
    function elClone(params) {
        var position =  params.position();
        clo=params.clone().css({
            "left": position.left,
            "top": position.top,
            "position": "absolute",
            "z-index": "2147483647" 
        });
        $("body").append(clo);
    }
}(jQuery));