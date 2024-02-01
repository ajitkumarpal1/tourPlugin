(function ($) {
    let gii = 0;
    let time = 5000;
    let clo=[];
    let curr=0;
    const bodyBlur = `<div id="blur29" style="width: 100vw;height: 100vh;background-color: rgba(0, 0, 0, .3);z-index:2147483646;position:absolute; "></div>`;

    $.fn.formvalue = function (data, t) {
        console.log(data.sequence[0].content.btn_next);
        if (t) {
            time = t;
        }
        /* const tooltipTriggerList = $('[data-bs-toggle="tooltip"]'); */

        const tooltipTriggerList = $.map(data.sequence, function(element) {
            return $('' + element.element);
          });
          
          console.log(tooltipTriggerList);


        const tooltipCollection = tooltipTriggerList.map((tooltipTriggerEl, index) => {
            /* alert(data.sequence[index].title + ' , ' + data.sequence[index].content.text) */
            var string1 = `<a class="btn bg-light btn-sm text-dark position-absolute top-0 end-0 rounded close">Close</a><b>${data.sequence[index].title}</b><p>${data.sequence[index].content.text}</p><hr>`;

            if (data.sequence[index].content.btn_previous === true && index != 0) {
                string1 += `<a class="btn bg-light m-1 previous" type="button">previous</a>`;
            }

            if (data.sequence[index].content.btn_next === true) {
                string1 += `<a class="btn bg-light m-1 next" id="next${++gii}">next</a>`;
            }

            console.log("lllllllllll>",string1);

            const tooltip = new bootstrap.Tooltip(tooltipTriggerEl, {
                title: string1,
                trigger: 'manual',
                html: true,
                template: `<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>`
            });
            console.log(">>>", tooltip);
            return tooltip;
        });

        console.log($(tooltipCollection[0]));/* ._config.title */
        elClone($(data.sequence[0].element),0);
        console.log("ajit>>", $(tooltipCollection[0]).find("id"));

        console.log($(".tooltip ").length);
        $("body").prepend(bodyBlur);

        tooltipCollection[0].show();

        $(data.sequence[0].element).css("z-index", "2147483647");
        $($(".tooltip").get($(".tooltip ").length - 1)).css("z-index", "2147483647").css("position", "absolute");

        toolshow(tooltipCollection, data);
    };

    let showi = 0;
    let sto;

    function toolshow(tooltips, data) {
        console.log(tooltips, showi);

        if (tooltips.length - 1 === showi) {
            const closeButton = $($(".tooltip").get($(".tooltip ").length - 1)).find('a.next');
            closeButton.html("Close");
            closeButton.addClass("close");
            closeButton.removeClass("next");
        } else {
            if ($($(".tooltip").get($(".tooltip ").length - 1)).find('a.next').length) {
                $($(".tooltip").get($(".tooltip ").length - 1)).find('a.next').click(function (e) {
                    tooltips[showi].hide();
                    cloRemove(showi,false)
                    tooltips[++showi].show();
                    console.log("////>>>", data.sequence[showi].element);
                    elClone($(data.sequence[showi].element),++curr);
                    $($(".tooltip").get($(".tooltip ").length - 1)).css("z-index", "2147483647").css("position", "absolute");
                    toolshow(tooltips, data);
                });
            } else {
                sto = setTimeout(function () {
                    tooltips[showi].hide();
                    cloRemove(showi,false)
                    tooltips[++showi].show();
                    elClone($(data.sequence[showi].element),++curr);
                    /* $(data.sequence[showi].element).css("z-index", "2147483647"); */
                    $($(".tooltip").get($(".tooltip ").length - 1)).css("z-index", "2147483647").css("position", "absolute");
                    toolshow(tooltips, data);
                }, time);
            }
        }

        $($(".tooltip").get($(".tooltip ").length - 1)).find('a.previous').click(function (e) {
            tooltips[showi].hide();
            if(sto){
                clearTimeout(sto);
            }
            
            cloRemove(showi,false)
            
            tooltips[--showi].show();
            elClone($(data.sequence[showi].element),--curr);
            $($(".tooltip").get($(".tooltip ").length - 1)).css("z-index", "2147483647").css("position", "absolute");
            toolshow(tooltips, data);
        });

        $($(".tooltip").get($(".tooltip ").length - 1)).find('.close').click(function (e) {
            tooltips[showi].hide();
            $("#blur29").remove();
            cloRemove(0,true)
        });

        
    }
    function cloRemove(i,All) {
        if(sto){
            clearTimeout(sto);
        }
        if (All) {
            
            $.each(clo, function (index, element) { 
                $(element).remove();
            });
        } else {
            $(clo[i]).remove();
        }
        /* $.each(clo, function (index, element) { 
            $(element).remove();
        }); */
    }

    function elClone(params,index) {
        const position = params.position();
        clo[index] = params.clone().css({
            "left": position.left,
            "top": position.top,
            "width": params.width(),
            "height":params.height(),
            "position": "absolute",
            "z-index": "2147483647",
            "outline": "white solid",
            "box-shadow": "red 0px 0px 100px " 
        });
        clo[index].removeAttr("id")
        params.after(clo[index]);
    }
}(jQuery));

/* (function ($) {
    let gii = 0;
    let time = 5000;
    let clo=[];
    let curr=0;
    const bodyBlur = `<div id="blur29" style="width: 100vw;height: 100vh;background-color: rgba(0, 0, 0, .3);z-index:2147483646;position:absolute; "></div>`;

    $.fn.formvalue = function (data, t) {
        console.log(data.sequence[0].content.btn_next);
        if (t) {
            time = t;
        }

        const tooltipTriggerList = $.map(data.sequence, function(element) {
            return $('' + element.element);
          });
          
          console.log(tooltipTriggerList);


        const tooltipCollection = tooltipTriggerList.map((tooltipTriggerEl, index) => {
            var string1 = `<a class="btn bg-light btn-sm text-dark position-absolute top-0 end-0 rounded close">Close</a><b>${data.sequence[index].title}</b><p>${data.sequence[index].content.text}</p><hr>`;

            if (data.sequence[index].content.btn_previous === true && index != 0) {
                string1 += `<a class="btn bg-light m-1 previous" type="button">previous</a>`;
            }

            if (data.sequence[index].content.btn_next === true) {
                string1 += `<a class="btn bg-light m-1 next" id="next${++gii}">next</a>`;
            }

            console.log("lllllllllll>",string1);

            const tooltip = new bootstrap.Tooltip(tooltipTriggerEl, {
                title: string1,
                trigger: 'manual',
                html: true,
                template: `<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>`
            });
            console.log(">>>", tooltip);
            return tooltip;
        });

        console.log($(tooltipCollection[0]));
        elClone($(data.sequence[0].element),0);
        console.log("ajit>>", $(tooltipCollection[0]).find("id"));

        console.log($(".tooltip ").length);
        $("body").prepend(bodyBlur);

        tooltipCollection[0].show();

        $(data.sequence[0].element).css("z-index", "2147483647");
        $($(".tooltip").get($(".tooltip ").length - 1)).css("z-index", "2147483647").css("position", "absolute");

        toolshow(tooltipCollection, data);
    };

    let showi = 0;
    let sto;

    function toolshow(tooltips, data) {
        console.log(tooltips, showi);

        if (tooltips.length - 1 === showi) {
            const closeButton = $($(".tooltip").get($(".tooltip ").length - 1)).find('a.next');
            closeButton.html("Close");
            closeButton.addClass("close");
            closeButton.removeClass("next");
        } else {
            if ($($(".tooltip").get($(".tooltip ").length - 1)).find('a.next').length) {
                $($(".tooltip").get($(".tooltip ").length - 1)).find('a.next').click(function (e) {
                    tooltips[showi].hide();
                    cloRemove(showi,false)
                    tooltips[++showi].show();
                    console.log("////>>>", data.sequence[showi].element);
                    elClone($(data.sequence[showi].element),++curr);
                    $($(".tooltip").get($(".tooltip ").length - 1)).css("z-index", "2147483647").css("position", "absolute");
                    toolshow(tooltips, data);
                });
            } else {
                sto = setTimeout(function () {
                    tooltips[showi].hide();
                    cloRemove(showi,false)
                    tooltips[++showi].show();
                    elClone($(data.sequence[showi].element),++curr);
                    $($(".tooltip").get($(".tooltip ").length - 1)).css("z-index", "2147483647").css("position", "absolute");
                    toolshow(tooltips, data);
                }, time);
            }
        }

        $($(".tooltip").get($(".tooltip ").length - 1)).find('a.previous').click(function (e) {
            tooltips[showi].hide();
            if(sto){
                clearTimeout(sto);
            }
            
            cloRemove(showi,false)
            
            tooltips[--showi].show();
            elClone($(data.sequence[showi].element),--curr);
            $($(".tooltip").get($(".tooltip ").length - 1)).css("z-index", "2147483647").css("position", "absolute");
            toolshow(tooltips, data);
        });

        $($(".tooltip").get($(".tooltip ").length - 1)).find('.close').click(function (e) {
            tooltips[showi].hide();
            $("#blur29").remove();
            cloRemove(0,true)
        });

        
    }
    function cloRemove(i,All) {
        if(sto){
            clearTimeout(sto);
        }
        if (All) {
            
            $.each(clo, function (index, element) { 
                $(element).remove();
            });
        } else {
            $(clo[i]).remove();
        }
        
    }

    function elClone(params,index) {
        const position = params.position();
        clo[index] = params.clone().css({
            "left": position.left,
            "top": position.top,
            "width": params.width(),
            "height":params.height(),
            "position": "absolute",
            "z-index": "2147483647",
            "outline": "white solid",
            "box-shadow": "red 0px 0px 100px " 
        });
        clo[index].removeAttr("id")
        params.after(clo[index]);
    }
}(jQuery));
 */
