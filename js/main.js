(function () {
    function n(a, g) {
        for (var d = a.cssRules || a.rules || [], k = 0; k < d.length; k++) {
            var c = d[k];
            c.type == CSSRule.IMPORT_RULE ? n(c.styleSheet, g) : c.type !== CSSRule.KEYFRAMES_RULE && c.type !== CSSRule.MOZ_KEYFRAMES_RULE && c.type !== CSSRule.WEBKIT_KEYFRAMES_RULE || g(c, a, k)
        }
    }

    function v(a) {
        this.original = a;
        this.keyText = a.keyText;
        this.css = {};
        a = a.style.cssText.split(";");
        for (var g = 0; g < a.length; g++) {
            var d = a[g].split(":");
            if (2 == d.length) {
                var k = d[0].replace(/^\s+|\s+$/g, ""), d = d[1].replace(/^\s+|\s+$/g, "");
                this.css[k] = d
            }
        }
    }

    function p(a) {
        this.original = a;
        this.name = a.name;
        this.keyframes = [];
        this.keytexts = [];
        this.keyframeHash = {};
        this.initKeyframes()
    }

    function s() {
        this.animations = {};
        for (var a = document.styleSheets, g = this.animations, d = 0; d < a.length; d++)try {
            n(a[d], function (a) {
                g[a.name] = new p(a)
            })
        } catch (k) {
        }
    }

    p.prototype.initKeyframes = function () {
        this.keyframes = [];
        this.keytexts = [];
        this.keyframeHash = {};
        for (var a = this.original, g = 0; g < a.cssRules.length; g++) {
            var d = new v(a.cssRules[g]);
            this.keyframes.push(d);
            this.keytexts.push(d.keyText);
            this.keyframeHash[d.keyText] = d
        }
    };
    p.prototype.getKeyframeTexts = function () {
        return this.keytexts
    };
    p.prototype.getKeyframe = function (a) {
        return this.keyframeHash[a]
    };
    p.prototype.setKeyframe = function (a, g) {
        var d = a + " {", k;
        for (k in g)d += k + ":" + g[k] + ";";
        d += "}";
        "appendRule"in this.original ? this.original.appendRule(d) : this.original.insertRule(d);
        this.initKeyframes();
        return this
    };
    p.prototype.setKeyframes = function (a) {
        for (var g in a)this.setKeyframe(g, a[g])
    };
    p.prototype.clear = function () {
        for (var a = 0; a < this.keyframes.length; a++)this.original.deleteRule(this.keyframes[a].keyText)
    };
    s.prototype.get = function (a) {
        return this.animations[a]
    };
    s.prototype.getDynamicSheet = function () {
        if (!this.dynamicSheet) {
            var a = document.createElement("style");
            a.rel = "stylesheet";
            a.type = "text/css";
            document.getElementsByTagName("head")[0].appendChild(a);
            this.dynamicSheet = a.sheet
        }
        return this.dynamicSheet
    };
    s.prototype.create = function (a, g) {
        var d = this.getDynamicSheet();
        "object" === typeof a && (g = a, a = null);
        a || (a = "anim" + Math.floor(1E5 * Math.random()));
        try {
            var k = d.insertRule("@keyframes " + a + "{}", d.cssRules.length)
        } catch (c) {
            if ("SYNTAX_ERR" ==
                c.name || "SyntaxError" == c.name)k = d.insertRule("@-webkit-keyframes " + a + "{}", d.cssRules.length); else throw c;
        }
        d = new p(d.cssRules[k]);
        this.animations[a] = d;
        g && d.setKeyframes(g);
        return d
    };
    s.prototype.remove = function (a) {
        var g = this.getDynamicSheet();
        a = a instanceof p ? a.name : a;
        this.animations[a] = null;
        try {
            n(g, function (d, c, g) {
                d.name == a && c.deleteRule(g)
            })
        } catch (d) {
        }
    };
    "function" == typeof define && define.amd ? define(function () {
        return new s
    }) : window.CSSAnimations = new s
})();



$(function () {
    function clearance(a, b) {
        b = b || lines;
        b = b || lines;
        var c = a.width(),linenum = $(window).width() / b, c = (linenum - c) / 2;
        return [linenum, c, linenum * (b - 1) + c]
    }

    function changeleft(a) {
        var b = r, c = b.left / linenum * 500;
        0 == J && 0 < b.left && (a.stop(!0), a.animate({left: "-=" + b.left + "px"}, {
            duration: c, start: function () {
                J = !0
            }, progress: function () {
                r = a.offset()
            }, easing: "linear", always: function () {
                J = !1
            }
        }));
        return !1
    }

    function changeright(a) {
        var b = r, c = a.width(), d = myWidth - b.left - c, e = (myWidth - b.left - c) / linenum * 500;
        0 == B && b.left + c < myWidth && (a.stop(!0), a.animate({left: "+=" + d + "px"}, {
            duration: e, start: function () {
                B = !0
            }, progress: function () {
                r =
                    a.offset()
            }, easing: "linear", always: function () {
                B = !1
            }
        }));
        return !1
    }

    function top(a) {
        a.each(function () {
            var a = $(this);
            a.css({top: "0px"}).hide();
            a.stop(!0)
        });
    }

    function setbonus(a) {
        a.each(function (a) {
            var b = $(this);
            b.css({width: linenum / 2 + "px", height: linenum / 2 + "px", "font-size": linenum / 2 + "px", display: "none"});
            drop(b, a)
        })
    }

    function drop(a, b) {
        b = b || Math.round(1 * Math.random()) + 1;
        var c = Math.floor(Math.random() * lines), d = 1E3 * Math.round(5 * Math.random() + 1);
        a.delay(1E3 * b).css({left: c * linenum + "px"}).animate({top: "+=" + myHeight + "px"}, {
            duration: d, easing: "linear", start: function () {
                a.show()
            }, complete: function () {
                a.css({top: "0px"}).hide();
                drop(a)
            }, progress: function () {
                var b = a.offset();
                if (r.top >= b.top && r.top <= b.top + a.height() && r.left >= b.left && r.left <= b.left + a.width()) {
                    if ("ingot" == a.attr("value"))b = parseInt(ingot.html()), ingot.html(b + 1); else if ("cash" == a.attr("value")) {
                        if (b = parseInt(cash.html()), b++, cash.html(b),
                            3 == b)return top(bonus), !1
                    } else"flower" == a.attr("value") && (b = parseInt(flower.html()), flower.html(b + 1));
                    a.css({top: "0px"}).hide();
                    drop(a)
                }
            }
        })
    }

    function reset(a) {
        a.width(myWidth / 2 - 1);
        a.height(myHeight)
    }

    function setstart(a, b) {
        a.width(linenum / 4);
        a.height(linenum / 4);
        if ("undefined" == typeof a.data("lock-stay-center")) {
            a.css("display", "block");
            var c = 0, d = 0;
            "undefined" == typeof b ? (c = ($(window).height() - a.height()) / 2, d = ($(window).width() - a.height()) / 2) : (c = b.top, d = b.left);
            a.css("position", "absolute");
            a.css("top", c + "px");
            a.css("left", d + "px");
            a.css("font-size", linenum / 2 + "px");
            r = {top: c, left: d}
        }
    }

    function changeback(a) {
        a.height(2 * myHeight);
        a.css({
            "animation-name": bg.name,
            "animation-timing-function": "linear",
            "animation-iteration-count": "infinite",
            "animation-duration": "20s"
        })
    }

    function start() {
        lines = 9;
        myWidth = $(window).width();
        myHeight = $(window).height();
        param = clearance(sheep);
        linenum = param[0];
        bg = CSSAnimations.create("bg", {"0%": {top: 0 - myHeight + "px"}, "100%": {top: "0px"}});
        reset(left);
        reset(right);
        left.tap(function () {
            changeleft(sheep)
        });
        right.tap(function () {
            changeright(sheep)
        });
        setbonus(bonus);
        changeback(bgl);
        changeback(bgr);
        setstart(sheep, {top: myHeight - myHeight / 3, left: 4 * linenum + linenum / 4});
        alert("Hi,欢迎参与本游戏，点左半页或者右半页是盒子左移或者右移，接住从空中掉下的柠檬。")
    }

    var sheep = $("#sheep"), cash = $("#cash"), ingot = $("#ingot"), flower = $("#flower"), bonus = $(".bonus"), bgl = $("#bgl"), bgr = $("#bgr"), left = $("#leftPanel"), right = $("#rightPanel"), param, linenum, myHeight, lines, myWidth, bg, r, J = !1, B = !1;
    $(window).on("resize", function () {
        start()
    });
    start()
});
