$(function () {
    function clearance(a, b) {
        b = b || lines;
        b = b || lines;
        var c = a.width(), linenum = $(window).width() / b, c = (linenum - c) / 2;
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
            b.css({
                width: linenum / 2 + "px",
                height: linenum / 2 + "px",
                "font-size": linenum / 2 + "px",
                display: "none"
            });
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
