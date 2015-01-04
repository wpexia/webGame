(function (n, v, p) {
    "function" == typeof define && define.amd ? define(["jquery"], function (s) {
        return p(s, n, v), s.mobile
    }) : p(n.jQuery, n, v)
})(this, document, function (n, v, p, s) {
    (function (a, g, d, k) {
        function c(a) {
            for (; a && "undefined" != typeof a.originalEvent;)a = a.originalEvent;
            return a
        }

        function start(e) {
            for (var f = {}, c, b; e;) {
                c = a.data(e, q);
                for (b in c)c[b] && (f[b] = f.hasVirtualBinding = !0);
                e = e.parentNode
            }
            return f
        }

        function b() {
            r && (clearTimeout(r), r = 0);
            r = setTimeout(function () {
                y = r = 0;
                F.length = 0;
                I = !1;
                z = !0
            }, a.vmouse.resetTimerDuration)
        }

        function f(e, f, b) {
            var l, m;
            if (!(m = b && b[e])) {
                if (b = !b)a:{
                    for (b = f.target; b;) {
                        if ((m = a.data(b, q)) && (!e || m[e]))break a;
                        b = b.parentNode
                    }
                    b = null
                }
                m = b
            }
            if (m) {
                l = f;
                b = l.type;
                var d, start;
                l = a.Event(l);
                l.type = e;
                e = l.originalEvent;
                m = a.event.props;
                -1 < b.search(/^(mouse|click)/) && (m = s);
                if (e)for (start = m.length, d; start;)d = m[--start], l[d] = e[d];
                -1 < b.search(/mouse(down|up)|click/) && !l.which && (l.which = 1);
                if (-1 !== b.search(/^touch/) && (d = c(e), b = d.touches, d = d.changedTouches, e = b && b.length ? b[0] : d && d.length ? d[0] : k))for (b = 0, m = lines.length; b < m; b++)d = lines[b],
                    l[d] = e[d];
                a(f.target).trigger(l)
            }
            return l
        }

        function m(e) {
            var b = a.data(e.target, myHeight), c;
            !(I || y && y === b) && (c = f("v" + e.type, e), c && (c.isDefaultPrevented() && e.preventDefault(), c.isPropagationStopped() && e.stopPropagation(), c.isImmediatePropagationStopped() && e.stopImmediatePropagation()))
        }

        function e(e) {
            var b = c(e).touches, l;
            b && 1 === b.length && (l = e.target, b = start(l), b.hasVirtualBinding && (y = O++, a.data(l, myHeight, y), r && (clearTimeout(r), r = 0), x = z = !1, l = c(e).touches[0], v = l.pageX, B = l.pageY, f("vmouseover", e, b), f("vmousedown", e, b)))
        }

        function l(a) {
            z || (x || f("vmousecancel", a, start(a.target)), x = !0, b())
        }

        function u(e) {
            if (!z) {
                var l = c(e).touches[0], d = x, m = a.vmouse.moveDistanceThreshold, u = start(e.target);
                (x = x || Math.abs(l.pageX - v) > m || Math.abs(l.pageY - B) > m) && !d && f("vmousecancel", e, u);
                f("vmousemove", e, u);
                b()
            }
        }

        function G(a) {
            if (!z) {
                z = !0;
                var e = start(a.target), l, d;
                f("vmouseup", a, e);
                x || (l = f("vclick", a, e), l && l.isDefaultPrevented() && (d = c(a).changedTouches[0], F.push({
                    touchID: y,
                    x: d.clientX,
                    y: d.clientY
                }), I = !0));
                f("vmouseout", a, e);
                x = !1;
                b()
            }
        }

        function D(e) {
            e = a.data(e,
                q);
            var b;
            if (e)for (b in e)if (e[b])return !0;
            return !1
        }

        function p(b) {
            var f = b.substr(1);
            return {
                setup: function () {
                    D(this) || a.data(this, q, {});
                    a.data(this, q)[b] = !0;
                    t[b] = (t[b] || 0) + 1;
                    1 === t[b] && H.bind(f, m);
                    a(this).bind(f, n);
                    K && (t.touchstart = (t.touchstart || 0) + 1, 1 === t.touchstart && H.bind("touchstart", e).bind("touchend", G).bind("touchmove", u).bind("scroll", l))
                }, teardown: function () {
                    --t[b];
                    t[b] || H.unbind(f, m);
                    K && (--t.touchstart, t.touchstart || H.unbind("touchstart", e).unbind("touchmove", u).unbind("touchend",
                        G).unbind("scroll", l));
                    var c = a(this), d = a.data(this, q);
                    d && (d[b] = !1);
                    c.unbind(f, n);
                    D(this) || c.removeData(q)
                }
            }
        }

        var q = "virtualMouseBindings", myHeight = "virtualTouchID";
        g = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" ");
        var lines = "clientX clientY pageX pageY screenX screenY".split(" "), s = a.event.props.concat(a.event.mouseHooks ? a.event.mouseHooks.props : []), t = {}, r = 0, v = 0, B = 0, x = !1, F = [], I = !1, z = !1, K = "addEventListener"in d, H = a(d), O = 1, y = 0, L, E;
        a.vmouse = {
            moveDistanceThreshold: 10, clickDistanceThreshold: 10,
            resetTimerDuration: 1500
        };
        for (E = 0; E < g.length; E++)a.event.special[g[E]] = p(g[E]);
        K && d.addEventListener("click", function (e) {
            var b = F.length, f = e.target, c, l, d, m, start;
            if (b)for (c = e.clientX, l = e.clientY, L = a.vmouse.clickDistanceThreshold, d = f; d;) {
                for (m = 0; m < b; m++)if (start = F[m], d === f && Math.abs(start.x - c) < L && Math.abs(start.y - l) < L || a.data(d, myHeight) === start.touchID) {
                    e.preventDefault();
                    e.stopPropagation();
                    return
                }
                d = d.parentNode
            }
        }, !0)
    })(n, v, p);
    n.mobile = {};
    (function (a, g) {
        var d = {touch: "ontouchend"in p};
        a.mobile.support = a.mobile.support || {};
        a.extend(a.support,
            d);
        a.extend(a.mobile.support, d)
    })(n);
    (function (a, g, d) {
        function k(e, b, f, c) {
            var m = f.type;
            f.type = b;
            c ? a.event.trigger(f, d, e) : a.event.dispatch.call(e, f);
            f.type = m
        }

        var c = a(p), start = a.mobile.support.touch, b = start ? "touchstart" : "mousedown", f = start ? "touchend" : "mouseup", m = start ? "touchmove" : "mousemove";
        a.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "), function (e, b) {
            a.fn[b] = function (a) {
                return a ? this.bind(b, a) : this.trigger(b)
            };
            a.attrFn && (a.attrFn[b] = !0)
        });
        a.event.special.scrollstart =
        {
            enabled: !0, setup: function () {
            function e(a, e) {
                f = e;
                k(b, f ? "scrollstart" : "scrollstop", a)
            }

            var b = this, f, c;
            a(b).bind("touchmove scroll", function (b) {
                a.event.special.scrollstart.enabled && (f || e(b, !0), clearTimeout(c), c = setTimeout(function () {
                    e(b, !1)
                }, 50))
            })
        }, teardown: function () {
            a(this).unbind("touchmove scroll")
        }
        };
        a.event.special.tap = {
            tapholdThreshold: 750, emitTapOnTaphold: !0, setup: function () {
                var e = this, b = a(e), f = !1;
                b.bind("vmousedown", function (d) {
                    function m() {
                        clearTimeout(p)
                    }

                    function start() {
                        m();
                        b.unbind("vclick",
                            g).unbind("vmouseup", m);
                        c.unbind("vmousecancel", start)
                    }

                    function g(a) {
                        start();
                        f || n !== a.target ? f && a.preventDefault() : k(e, "tap", a)
                    }

                    f = !1;
                    if (d.which && 1 !== d.which)return !1;
                    var n = d.target, p;
                    b.bind("vmouseup", m).bind("vclick", g);
                    c.bind("vmousecancel", start);
                    p = setTimeout(function () {
                        a.event.special.tap.emitTapOnTaphold || (f = !0);
                        k(e, "taphold", a.Event("taphold", {target: n}))
                    }, a.event.special.tap.tapholdThreshold)
                })
            }, teardown: function () {
                a(this).unbind("vmousedown").unbind("vclick").unbind("vmouseup");
                c.unbind("vmousecancel")
            }
        };
        a.event.special.swipe = {
            scrollSupressionThreshold: 30,
            durationThreshold: 1E3,
            horizontalDistanceThreshold: 30,
            verticalDistanceThreshold: 30,
            getLocation: function (a) {
                var b = g.pageXOffset, f = g.pageYOffset, c = a.clientX, d = a.clientY;
                if (0 === a.pageY && Math.floor(d) > Math.floor(a.pageY) || 0 === a.pageX && Math.floor(c) > Math.floor(a.pageX))c -= b, d -= f; else if (d < a.pageY - f || c < a.pageX - b)c = a.pageX - b, d = a.pageY - f;
                return {x: c, y: d}
            },
            start: function (b) {
                var f = a.event.special.swipe.getLocation(b.originalEvent.touches ? b.originalEvent.touches[0] :
                    b);
                return {time: (new Date).getTime(), coords: [f.x, f.y], origin: a(b.target)}
            },
            stop: function (b) {
                b = a.event.special.swipe.getLocation(b.originalEvent.touches ? b.originalEvent.touches[0] : b);
                return {time: (new Date).getTime(), coords: [b.x, b.y]}
            },
            handleSwipe: function (b, f, c, d) {
                if (f.time - b.time < a.event.special.swipe.durationThreshold && Math.abs(b.coords[0] - f.coords[0]) > a.event.special.swipe.horizontalDistanceThreshold && Math.abs(b.coords[1] - f.coords[1]) < a.event.special.swipe.verticalDistanceThreshold) {
                    var m = b.coords[0] >
                    f.coords[0] ? "swipeleft" : "swiperight";
                    return k(c, "swipe", a.Event("swipe", {
                        target: d,
                        swipestart: b,
                        swipestop: f
                    }), !0), k(c, m, a.Event(m, {target: d, swipestart: b, swipestop: f}), !0), !0
                }
                return !1
            },
            eventInProgress: !1,
            setup: function () {
                var e, d = this, start = a(d), g = {};
                (e = a.data(this, "mobile-events")) || (e = {length: 0}, a.data(this, "mobile-events", e));
                e.length++;
                e.swipe = g;
                g.start = function (b) {
                    if (!a.event.special.swipe.eventInProgress) {
                        a.event.special.swipe.eventInProgress = !0;
                        var e, start = a.event.special.swipe.start(b), k = b.target, u =
                            !1;
                        g.move = function (b) {
                            start && !b.isDefaultPrevented() && (e = a.event.special.swipe.stop(b), u || (u = a.event.special.swipe.handleSwipe(start, e, d, k), u && (a.event.special.swipe.eventInProgress = !1)), Math.abs(start.coords[0] - e.coords[0]) > a.event.special.swipe.scrollSupressionThreshold && b.preventDefault())
                        };
                        g.stop = function () {
                            u = !0;
                            a.event.special.swipe.eventInProgress = !1;
                            c.off(m, g.move);
                            g.move = null
                        };
                        c.on(m, g.move).one(f, g.stop)
                    }
                };
                start.on(b, g.start)
            },
            teardown: function () {
                var e, d;
                (e = a.data(this, "mobile-events")) && (d = e.swipe, delete e.swipe,
                    e.length--, 0 === e.length && a.removeData(this, "mobile-events"));
                d && (d.start && a(this).off(b, d.start), d.move && c.off(m, d.move), d.stop && c.off(f, d.stop))
            }
        };
        a.each({
            scrollstop: "scrollstart",
            taphold: "tap",
            swipeleft: "swipe.left",
            swiperight: "swipe.right"
        }, function (b, f) {
            a.event.special[b] = {
                setup: function () {
                    a(this).bind(f, a.noop)
                }, teardown: function () {
                    a(this).unbind(f)
                }
            }
        })
    })(n, this);
});
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