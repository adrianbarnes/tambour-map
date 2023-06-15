var tooltipLabelsMaps = [
    "nys", "nj", "mi", "ga", "va", "wa", "ma", "mo", "wi", "co", "sc", "al", "la", "or", "ok", "ct", "ut", "ia", "ar", "ms", "ne", "wv", "id", "hi", "nh", "me", "mt", "ri", "de", "sd", "nd", "ak", "dc", "vt", 
    "newzealand", "denmark-municipalities", "scotland", "finland", "portugal", "greece", "switzerland", "austria-districts", "austria-states", "czech", "bangladesh", "thailand", "singapore",  "90570", "south-korea", "algerie", "uscounties", "melbourne-municipalities", "philippines-provinces",
    "world-and-north-america", "sanfran"
];

if (typeof window._x === 'undefined') {
    function _x(location, x) {
        switch (location) {
            default: x += 20;
        }
        return x;
    }
}
if (typeof window._y === 'undefined') {
    function _y(location, y) {
        switch (location) {
            default: y -= 20;

        }
        return y;
    }
}

function rendermap(data, d3, path, width, height, options) {

    d3.select(".map")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 " + width + "  " + height + "")
        .classed("svg-content-responsive", true)
        .html("")
        .append("g")
        .append("g")
        .attr("id", "states");


    data.features.each(function(d) {

        if (d.id == "") {
            d.id = d.properties.id;
        }

        var state = data.states[d.id];
        var a = document.createElementNS("http://www.w3.org/2000/svg", "a");
        var popupcontent;
        var md = window.markdownit({
            html: true,
            linkify: true,
            typographer: true
          }).use(markdownitContainer);


        if (state.popupcontent) {
            popupcontent = state.popupcontent;
            popupcontent = md.render(String(popupcontent));
            popupcontent = popupcontent.replace(/\r?\n/g, '<br />');
        } else {
            popupcontent = "";
        }
        var pattern = /a href=/g;
        var popupcontent = popupcontent.replace(pattern, "a target='_blank' href=");


        a.addEvents({
            click: function(event) {
                event.stop();
                if (state.onClick && !event.control) {
                    state.onClick(event);

                } else {



                    if (state.popup) {

                        var SM = new SimpleModal({
                            "btn_ok": "Close"
                        });
                        SM.show({
                            "title": state.title,
                            "contents": popupcontent
                        });

                        return;
                    }

                    if (!state.link)
                        return;

                    switch (data.options.links.target) {
                        case "_top":
                            top.postMessage("__MM-LOCATION.REDIRECT" + state.link, "*");
                            break;
                        case "_blank":
                            open(state.link);
                            break;
                    }

                    /*
                    if (!state.link)
                        return;

                    switch (data.options.links.target) {
                        case "_top":
                            top.postMessage("__MM-LOCATION.REDIRECT" + state.link, "*");
                            break;
                        case "_blank":
                            open(state.link);
                            break;
                    }
                    */
                }
            },

            mouseover: function() {

                var stateTitle = state.title;
                var abbr = d.properties.abbr;


                /*

                option 1: title hidden / no tool tips
                option 2: title below the map / no tool tips
                option 3: Title displayed above the map as tool tips.

                */

                var size = this.getSize(),
                    pos = this.getPosition();

                var x = _x(abbr, pos.x);
                var y = _y(abbr, pos.y);

                if (tooltipLabelsMaps.contains(data.options.maplocation) == true || options.tooltipLabels == true) {

                    if (stateTitle == "") {
                        stateTitle = abbr;
                    }
                    var instance = ToolTip.instance(this, {
                        hideDelay: 0
                    }, stateTitle);
                    instance.show();
                    instance.toolTip.setStyles({
                        position: "absolute",
                        top: y,
                        left: x,
                    });
                } else {

                    if (data.options.titles.visible == 1 || data.options.titles.visible == 2) {
                        $("title").set("text", state.title);
                    } else if (data.options.titles.visible == 3) {

                        if (stateTitle != "") {
                            var instance = ToolTip.instance(this, {
                                hideDelay: 0
                            }, stateTitle + "<br>" + popupcontent);
                            instance.show();
                            instance.toolTip.setStyles({
                                position: 'absolute',
                                top: y,
                                left: x
                            });
                        }
                    }
                }


            },

            mouseout: function() {
                $("title").set("text", "");
            }
        });


        $("states").adopt(a);

        a = d3.select(a)
            .attr("id", "s" + d.id)
            .attr('rel', 'nofollow ')
            ;

        if (data.options.borders.pattern != "0, 1" ) {
            var strokeSize = 1.0;

            if ( options.strokeSize > 1.0 || options.strokeSize < 1.0 || data.options.strokeSize > 1.0 || data.options.strokeSize < 1.0 ) {
                strokeSize = options.strokeSize;
            } else if (width < '600' || tooltipLabelsMaps=="us3digitzipcodes" ) {
                strokeSize = 0.5;
            }

            a.append("path")
                .attr("d", path(d))
                .attr("stroke", data.options.borders.color)
                .attr("stroke-dasharray", data.options.borders.pattern)
                .attr("stroke-width", strokeSize);

        } else {
            a.append("path")
                .attr("d", path(d))
                .attr("stroke", data.options.states.color.normal);
        }
        /*
        	In editing mode it will show underline or a * if the state to show the user he added a link this state/region.
        */ 
        var stateText = d.properties.abbr;
        var online = getVar("online");
        var disablelink = "";
        var classStateName = stateText;

        if(typeof classStateName === 'string') {
            classStateName.replace(/\s+/g, '-').toLowerCase();
        } else {
            classStateName = "";
        }


        if ((state.link) && online != "true") {
            stateText += "*";
        }
 
        /*
        ** Old version of custom labels.
            The custom labels only show if the user selected of the editor Custom Labels.
            if (data.options.labels.display === 'custom') {
                stateText = "";
                stateText = state.customlabel;
            }
        */
        /*
        ** New version of custom labels.
            The custom labels will show, with the other regular labels even if the user doesn't select custom labels.
            The other pro is that the user can select custom labels, and it will display custom labels only. 
        */
        if( state.customlabel ||  data.options.labels.display === 'custom' ) {
            stateText = "";
            stateText = state.customlabel;
        }
            
        // this is the first version.
            a.append("text")
            .attr("x", _labelPos(path, d)[0])
            .attr("y", _labelPos(path, d)[1])
            .text(stateText)
            .attr('title', stateText)
            .attr('class', 'hint ' + state.cssclass)
            .attr("style", options.editor && state.link ? "text-decoration: underline;" : "");   

            
        /*
        add the invert label to certain states
        */
        var $inverse = "";

        var display = typeof data.options.labels.display;

        if (data.options.labels.display === 'initial' || display === 'undefined') {
            if (_labelIsExt(path, d)) {
                a.classed("inverse", true)
                    .append("line")
                    .attr("x1", path.centroid(d)[0])
                    .attr("y1", path.centroid(d)[1])
                    .attr("x2", _labelIsExt(path, d)[0])
                    .attr("y2", _labelIsExt(path, d)[1]);
                $inverse = "inverse";
            }
        }

        // a.append("circle")
        //     .attr("cx", path.centroid(d)[0])
        //     .attr("cy", path.centroid(d)[1])
        //     .attr("r", 5)
        //     .style("fill", "red");
 

        if (state.link) {
            a.attr("xlink:href", state.link);
        }

        if (state.disablelink && online) {
            disablelink = "disablelink";
        }


        if (data.options.titles.visible == 3) {
            if (state.title == "") {
                a.attr("title", state.name);
            } else {
                a.attr("title", state.title);
            }
        } else {
            a.attr("title", state.name);
        }
        // a.attr("title", state.name);
        // a.attr("title", state.title);
        a.attr("class", "hint "+state.cssclass + " " + $inverse + " " + disablelink);

        var text = d3.select('text');
        text.attr('title', state.name);



        text.attr("class", 'hint ' + classStateName +" "+ state.cssclass );
        
    });

    var fontsize;
    fontsize = getFontSize(data.options.fontsize);
    document.body.setStyles({
        fontSize: fontsize,
        fontFamily: getFont(data.options.font),
        background: data.options.background
    });
    
    var style = "";
    style += "#states a path {";
    style += "  transition: fill .5s ease; -moz-transition: fill .5s ease; -webkit-transition: fill .5s ease; ";
    style += "  fill: " + data.options.states.color.normal + ";";
    style += "}";
    style += "#states a:hover path {";
    style += "  transition: fill .5s ease; -moz-transition: fill .5s ease; -webkit-transition: fill .5s ease; ";
    style += "  fill: " + data.options.states.color.hover + " !important;";
    style += "}";
    Object.each(data.states, function(state) {
        if (state.color) {
            style += "#states #s" + state.id + " path {";
            style += "  transition: fill .5s ease; -moz-transition: fill .5s ease; -webkit-transition: fill .5s ease; ";
            style += "  fill: " + state.color + ";";
            style += "}";

            style += "#states #s" + state.id + " path:hover {";
            style += "  cursor: pointer;";
            style += "  fill: " + data.options.states.color.hover + ";";
            style += "}";

        }
    });

    style += "#states a:hover path {";
    style += "  cursor: pointer;";
    style += "  fill: " + data.options.states.color.hover + ";";
    style += "}";
    style += "#states a text {";
    style += "  cursor: pointer;";
    style += "  fill: " + data.options.labels.color.normal + ";";
        if (data.options.labels.display === 'none') {
            style += "  display: " + data.options.labels.display + ";";
        }
    style += "}";
    style += "#states a:hover text {";
    style += "  fill: " + data.options.labels.color.hover + ";";
    style += "  color: " + data.options.labels.color.hover + ";";
    style += "}";
    style += "#states a.inverse text:hover {";
    style += "  fill: " + data.options.labels.color.hover + ";";
    style += "}";

    style += "#states a.inverse text {";
    style += "  fill: " + data.options.labels.color.inverse + ";";
    style += "}";
    style += ".CCMcredit a {";
    style += "  color: " + data.options.states.color.normal + ";";
    style += "}";

    if (data.options.background === '#000000') {
        style += "#title {";
        style += "  color: #ffffff;";
        style += "}";
    }
    
    if (width <= '750') {
        fontsize = "8px";
    } 

    style += "#states a text {";
    style += "  font-size: " + fontsize + ";";
    style += "}";

    if (tooltipLabelsMaps.contains(data.options.maplocation) == true || options.tooltipLabels == true ) {
        style += " #states a text { display: none; } ";
    }
    style +=".hover-color {"
    style +="fill:"+ data.options.states.color.hover
    style +="}"
  
    style +=".tooltip   {"
    style +="background: "+ data.options.tooltipbackground +" !important;"
    style +="color: "+ data.options.tooltipcolor +" !important;"
    style +="}"

    $("style").set("html", style.clean());

    //$("message").set("text", data.options.message || "");




    window.addEvent('domready', function() {

        var s01 = $$("a.one"); 
        s01.addEvents({
            'mouseenter': function() { 
                $$("a.one path").set('styles', {
                    fill: data.options.states.color.hover
                }); 
            },
            'mouseleave': function() { 
                    $$("a.one path").set('styles', {
                        fill: null 
                    }); 
            }
        }); 
 
        var s02 = $$("a.two"); 
        s02.addEvents({
            'mouseenter': function() { 
                $$("a.two path").set('styles', {
                    fill: data.options.states.color.hover
                }); 
            },
            'mouseleave': function() { 
                $$("a.two path").set('styles', {
                    fill: null
                }); 
            }
        }); 

        var s03 = $$("a.three"); 
        s03.addEvents({
            'mouseenter': function() { 
                
                $$("a.three path").set('styles', {
                    fill: data.options.states.color.hover
                }); 
            },
            'mouseleave': function() { 
                $$("a.three path").set('styles', {
                    fill: null
                }); 
            }
        });
        var s04 = $$("a.four"); 
        s04.addEvents({
            'mouseenter': function() { 
                $$("a.four path").set('styles', {
                    fill: data.options.states.color.hover
                }); 
            },
            'mouseleave': function() { 
                $$("a.four path").set('styles', {
                    fill: null
                }); 
            }
        });
        var s05 = $$("a.five"); 
        s05.addEvents({
            'mouseenter': function() { 
                $$("a.five path").set('styles', {
                    fill: data.options.states.color.hover
                }); 
            },
            'mouseleave': function() { 
                $$("a.five path").set('styles', {
                    fill: null
                }); 
            }
        });
        var s06 = $$("a.six"); 
        s06.addEvents({
            'mouseenter': function() { 
                $$("a.six path").set('styles', {
                    fill: data.options.states.color.hover
                }); 
            },
            'mouseleave': function() { 
                $$("a.six path").set('styles', {
                    fill: null
                }); 
            }
        });
        var s07 = $$("a.seven"); 
        s07.addEvents({
            'mouseenter': function() { 
                $$("a.seven path").set('styles', {
                    fill: data.options.states.color.hover
                }); 
            },
            'mouseleave': function() { 
                $$("a.seven path").set('styles', {
                    fill: null
                }); 
            }
        });
        var s08 = $$("a.eight"); 
        s08.addEvents({
            'mouseenter': function() { 
                $$("a.eight path").set('styles', {
                    fill: data.options.states.color.hover
                }); 
            },
            'mouseleave': function() { 
                $$("a.eight path").set('styles', {
                    fill: null
                }); 
            }
        });
        var s09 = $$("a.nine"); 
        s09.addEvents({
            'mouseenter': function() { 
                $$("a.nine path").set('styles', {
                    fill: data.options.states.color.hover
                }); 
            },
            'mouseleave': function() { 
                $$("a.nine path").set('styles', {
                    fill: null
                }); 
            }
        });
        var s10 = $$("a.ten"); 
        s10.addEvents({
            'mouseenter': function() { 
                $$("a.ten path").set('styles', {
                    fill: data.options.states.color.hover
                }); 
            },
            'mouseleave': function() { 
                $$("a.ten path").set('styles', {
                    fill: null
                }); 
            }
        });
        var s11 = $$("a.eleven"); 
        s11.addEvents({
            'mouseenter': function() { 
                $$("a.eleven path").set('styles', {
                    fill: data.options.states.color.hover
                }); 
            },
            'mouseleave': function() { 
                $$("a.eleven path").set('styles', {
                    fill: null
                }); 
            }
        });
        var s12 = $$("a.twelve"); 
        s12.addEvents({
            'mouseenter': function() { 
                $$("a.twelve path").set('styles', {
                    fill: data.options.states.color.hover
                }); 
            },
            'mouseleave': function() { 
                $$("a.twelve path").set('styles', {
                    fill: null
                }); 
            }
        });
        var s13 = $$("a.thirteen"); 
        s13.addEvents({
            'mouseenter': function() { 
                $$("a.thirteen path").set('styles', {
                    fill: data.options.states.color.hover
                }); 
            },
            'mouseleave': function() { 
                $$("a.thirteen path").set('styles', {
                    fill: null
                }); 
            }
        });
        var s14 = $$("a.fourteen"); 
        s14.addEvents({
            'mouseenter': function() { 
                $$("a.fourteen path").set('styles', {
                    fill: data.options.states.color.hover
                }); 
            },
            'mouseleave': function() { 
                $$("a.fourteen path").set('styles', {
                    fill: null
                }); 
            }
        });
        var s15 = $$("a.fifteen"); 
        s15.addEvents({
            'mouseenter': function() { 
                $$("a.fifteen path").set('styles', {
                    fill: data.options.states.color.hover
                }); 
            },
            'mouseleave': function() { 
                $$("a.fifteen path").set('styles', {
                    fill: null
                }); 
            }
        });
        var s16 = $$("a.sixteen"); 
        s16.addEvents({
            'mouseenter': function() { 
                $$("a.sixteen path").set('styles', {
                    fill: data.options.states.color.hover
                }); 
            },
            'mouseleave': function() { 
                $$("a.sixteen path").set('styles', {
                    fill: null
                }); 
            }
        });
        var s17 = $$("a.seventeen"); 
        s16.addEvents({
            'mouseenter': function() { 
                $$("a.seventeen path").set('styles', {
                    fill: data.options.states.color.hover
                }); 
            },
            'mouseleave': function() { 
                $$("a.seventeen path").set('styles', {
                    fill: null
                }); 
            }
        });
        var s18 = $$("a.eighteen"); 
        s16.addEvents({
            'mouseenter': function() { 
                $$("a.eighteen path").set('styles', {
                    fill: data.options.states.color.hover
                }); 
            },
            'mouseleave': function() { 
                $$("a.eighteen path").set('styles', {
                    fill: null
                }); 
            }
        });
        var s19 = $$("a.nineteen"); 
        s16.addEvents({
            'mouseenter': function() { 
                $$("a.nineteen path").set('styles', {
                    fill: data.options.states.color.hover
                }); 
            },
            'mouseleave': function() { 
                $$("a.nineteen path").set('styles', {
                    fill: null
                }); 
            }
        });
        var s20 = $$("a.twenty"); 
        s16.addEvents({
            'mouseenter': function() { 
                $$("a.twenty path").set('styles', {
                    fill: data.options.states.color.hover
                }); 
            },
            'mouseleave': function() { 
                $$("a.twenty path").set('styles', {
                    fill: null
                }); 
            }
        });
    
    });

}