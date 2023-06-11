(function ($) {
    let gii = 0;
    let time = 5000;
    let clo=[];
    let curr=0;
    const bodyBlur = `<div id="blur29" style="width: 100vw;height: 100vh;filter: blur(100px);background-color: #685050;z-index:2147483646;position:absolute;"></div>`;

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
                trigger: 'click',
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
                    tooltips[++showi].show();
                    console.log("////>>>", data.sequence[showi].element);
                    elClone($(data.sequence[showi].element),++curr);
                    $($(".tooltip").get($(".tooltip ").length - 1)).css("z-index", "2147483647").css("position", "absolute");
                    toolshow(tooltips, data);
                });
            } else {
                sto = setTimeout(function () {
                    tooltips[showi].hide();
                    cloRemove(showi)
                    tooltips[++showi].show();
                    $(data.sequence[showi].element).css("z-index", "2147483647");
                    $($(".tooltip").get($(".tooltip ").length - 1)).css("z-index", "2147483647").css("position", "absolute");
                    toolshow(tooltips, data);
                }, time);
            }
        }

        $($(".tooltip").get($(".tooltip ").length - 1)).find('a.previous').click(function (e) {
            tooltips[showi].hide();
            clearTimeout(sto);
            tooltips[--showi].show();
            $(data.sequence[showi].element).css("z-index", "2147483647");
            $($(".tooltip").get($(".tooltip ").length - 1)).css("z-index", "2147483647").css("position", "absolute");
            toolshow(tooltips, data);
        });

        $($(".tooltip").get($(".tooltip ").length - 1)).find('.close').click(function (e) {
            tooltips[showi].hide();
            $("#blur29").remove();
            cloRemove()
        });

        
    }
    function cloRemove(i) {
        $.each(clo, function (index, element) { 
            $(element).remove();
        });
    }

    function elClone(params,index) {
        const position = params.position();
        clo[index] = params.clone().css({
            'color':'red',
            "left": position.left,
            "top": position.top,
            "position": "absolute",
            "z-index": "2147483647"
        });
        $("body").append(clo[index]);
    }
}(jQuery));
