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

        function n() {
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
    n.extend(n.mobile, {
        version: "1.4.5",
        subPageUrlKey: "ui-page",
        hideUrlBar: !0,
        keepNative: ":jqmData(role='none'), :jqmData(role='nojs')",
        activePageClass: "ui-page-active",
        activeBtnClass: "ui-btn-active",
        focusClass: "ui-focus",
        ajaxEnabled: !0,
        hashListeningEnabled: !0,
        linkBindingEnabled: !0,
        defaultPageTransition: "fade",
        maxTransitionWidth: !1,
        minScrollBack: 0,
        defaultDialogTransition: "pop",
        pageLoadErrorMessage: "Error Loading Page",
        pageLoadErrorMessageTheme: "a",
        phonegapNavigationEnabled: !1,
        autoInitializePage: !0,
        pushStateEnabled: !0,
        ignoreContentEnabled: !1,
        buttonMarkup: {hoverDelay: 200},
        dynamicBaseEnabled: !0,
        pageContainer: n(),
        allowCrossDomainPages: !1,
        dialogHashKey: "&ui-state=dialog"
    });
    (function (a, g, d) {
        var k = {}, c = a.find, start = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, b = /:jqmData\(([^)]*)\)/g;
        a.extend(a.mobile, {
            ns: "", getAttribute: function (b, c) {
                var e;
                (b = b.jquery ? b[0] : b) && b.getAttribute && (e = b.getAttribute("data-" + a.mobile.ns + c));
                try {
                    e = "true" === e ? !0 : "false" === e ? !1 : "null" === e ? null : +e + "" === e ? +e : start.test(e) ? JSON.parse(e) : e
                } catch (d) {
                }
                return e
            }, nsNormalizeDict: k, nsNormalize: function (b) {
                return k[b] || (k[b] = a.camelCase(a.mobile.ns + b))
            }, closestPageData: function (a) {
                return a.closest(":jqmData(role='page'), :jqmData(role='dialog')").data("mobile-page")
            }
        });
        a.fn.jqmData = function (b, c) {
            var e;
            return "undefined" != typeof b && (b && (b = a.mobile.nsNormalize(b)), 2 > arguments.length || c === d ? e = this.data(b) : e = this.data(b, c)), e
        };
        a.jqmData = function (b, c, e) {
            var d;
            return "undefined" != typeof c && (d = a.data(b, c ? a.mobile.nsNormalize(c) : c, e)), d
        };
        a.fn.jqmRemoveData = function (b) {
            return this.removeData(a.mobile.nsNormalize(b))
        };
        a.jqmRemoveData = function (b, c) {
            return a.removeData(b, a.mobile.nsNormalize(c))
        };
        a.find = function (f, d, e, start) {
            return -1 < f.indexOf(":jqmData") && (f = f.replace(b, "[data-" +
            (a.mobile.ns || "") + "$1]")), c.call(this, f, d, e, start)
        };
        a.extend(a.find, c)
    })(n, this);
    (function (a, g) {
        function d(b, c) {
            var d, e, start, g = b.nodeName.toLowerCase();
            return "area" === g ? (d = b.parentNode, e = d.name, b.href && e && "map" === d.nodeName.toLowerCase() ? (start = a("img[usemap=#" + e + "]")[0], !!start && k(start)) : !1) : (/input|select|textarea|button|object/.test(g) ? !b.disabled : "a" === g ? b.href || c : c) && k(b)
        }

        function k(b) {
            return a.expr.filters.visible(b) && !a(b).parents().addBack().filter(function () {
                return "hidden" === a.css(this, "visibility")
            }).length
        }

        var c = 0, start = /^ui-id-\d+$/;
        a.ui = a.ui || {};
        a.extend(a.ui, {
            version: "c0ab71056b936627e8a7821f03c044aec6280a40",
            keyCode: {
                BACKSPACE: 8,
                COMMA: 188,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                LEFT: 37,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SPACE: 32,
                TAB: 9,
                UP: 38
            }
        });
        a.fn.extend({
            focus: function (b) {
                return function (c, d) {
                    return "number" == typeof c ? this.each(function () {
                        var b = this;
                        setTimeout(function () {
                            a(b).focus();
                            d && d.call(b)
                        }, c)
                    }) : b.apply(this, arguments)
                }
            }(a.fn.focus), scrollParent: function () {
                var b;
                return a.ui.ie &&
                /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? b = this.parents().filter(function () {
                    return /(relative|absolute|fixed)/.test(a.css(this, "position")) && /(auto|scroll)/.test(a.css(this, "overflow") + a.css(this, "overflow-y") + a.css(this, "overflow-x"))
                }).eq(0) : b = this.parents().filter(function () {
                    return /(auto|scroll)/.test(a.css(this, "overflow") + a.css(this, "overflow-y") + a.css(this, "overflow-x"))
                }).eq(0), /fixed/.test(this.css("position")) || !b.length ? a(this[0].ownerDocument ||
                p) : b
            }, uniqueId: function () {
                return this.each(function () {
                    this.id || (this.id = "ui-id-" + ++c)
                })
            }, removeUniqueId: function () {
                return this.each(function () {
                    start.test(this.id) && a(this).removeAttr("id")
                })
            }
        });
        a.extend(a.expr[":"], {
            data: a.expr.createPseudo ? a.expr.createPseudo(function (b) {
                return function (c) {
                    return !!a.data(c, b)
                }
            }) : function (b, c, d) {
                return !!a.data(b, d[3])
            }, focusable: function (b) {
                return d(b, !isNaN(a.attr(b, "tabindex")))
            }, tabbable: function (b) {
                var c = a.attr(b, "tabindex"), start = isNaN(c);
                return (start || 0 <= c) && d(b, !start)
            }
        });
        a("<a>").outerWidth(1).jquery || a.each(["Width", "Height"], function (b, c) {
            function d(b, c, f, start) {
                return a.each(e, function () {
                    c -= parseFloat(a.css(b, "padding" + this)) || 0;
                    f && (c -= parseFloat(a.css(b, "border" + this + "Width")) || 0);
                    start && (c -= parseFloat(a.css(b, "margin" + this)) || 0)
                }), c
            }

            var e = "Width" === c ? ["Left", "Right"] : ["Top", "Bottom"], start = c.toLowerCase(), k = {
                innerWidth: a.fn.innerWidth,
                innerHeight: a.fn.innerHeight,
                outerWidth: a.fn.outerWidth,
                outerHeight: a.fn.outerHeight
            };
            a.fn["inner" + c] = function (b) {
                return b === g ? k["inner" +
                c].call(this) : this.each(function () {
                    a(this).css(start, d(this, b) + "px")
                })
            };
            a.fn["outer" + c] = function (b, e) {
                return "number" != typeof b ? k["outer" + c].call(this, b) : this.each(function () {
                    a(this).css(start, d(this, b, !0, e) + "px")
                })
            }
        });
        a.fn.addBack || (a.fn.addBack = function (a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        });
        a("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (a.fn.removeData = function (b) {
            return function (c) {
                return arguments.length ? b.call(this, a.camelCase(c)) : b.call(this)
            }
        }(a.fn.removeData));
        a.ui.ie = !!/msie [\myHeight.]+/.exec(navigator.userAgent.toLowerCase());
        a.support.selectstart = "onselectstart"in p.createElement("div");
        a.fn.extend({
            disableSelection: function () {
                return this.bind((a.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (a) {
                    a.preventDefault()
                })
            }, enableSelection: function () {
                return this.unbind(".ui-disableSelection")
            }, zIndex: function (b) {
                if (b !== g)return this.css("zIndex", b);
                if (this.length) {
                    b = a(this[0]);
                    for (var c; b.length && b[0] !== p;) {
                        c = b.css("position");
                        if ("absolute" ===
                            c || "relative" === c || "fixed" === c)if (c = parseInt(b.css("zIndex"), 10), !isNaN(c) && 0 !== c)return c;
                        b = b.parent()
                    }
                }
                return 0
            }
        });
        a.ui.plugin = {
            add: function (b, c, d) {
                var e;
                b = a.ui[b].prototype;
                for (e in d)b.plugins[e] = b.plugins[e] || [], b.plugins[e].push([c, d[e]])
            }, call: function (a, c, d, e) {
                if ((c = a.plugins[c]) && (e || a.element[0].parentNode && 11 !== a.element[0].parentNode.nodeType))for (e = 0; e < c.length; e++)a.options[c[e][0]] && c[e][1].apply(a.element, d)
            }
        }
    })(n);
    (function (a, g, d) {
        var k = function (c, d) {
            var b = c.parent(), f = [], g = function () {
                var b =
                    a(this), b = a.mobile.toolbar && b.data("mobile-toolbar") ? b.toolbar("option") : {
                    position: b.attr("data-" + a.mobile.ns + "position"),
                    updatePagePadding: !1 !== b.attr("data-" + a.mobile.ns + "update-page-padding")
                };
                return "fixed" !== b.position || !0 !== b.updatePagePadding
            }, e = b.children(":jqmData(role='header')").filter(g), l = c.children(":jqmData(role='header')"), b = b.children(":jqmData(role='footer')").filter(g), g = c.children(":jqmData(role='footer')");
            return 0 === l.length && 0 < e.length && (f = f.concat(e.toArray())), 0 === g.length &&
            0 < b.length && (f = f.concat(b.toArray())), a.each(f, function (b, c) {
                d -= a(c).outerHeight()
            }), Math.max(0, d)
        };
        a.extend(a.mobile, {
            window: a(g), document: a(p), keyCode: a.ui.keyCode, behaviors: {}, silentScroll: function (c) {
                "number" !== a.type(c) && (c = a.mobile.defaultHomeScroll);
                a.event.special.scrollstart.enabled = !1;
                setTimeout(function () {
                    g.scrollTo(0, c);
                    a.mobile.document.trigger("silentscroll", {x: 0, y: c})
                }, 20);
                setTimeout(function () {
                    a.event.special.scrollstart.enabled = !0
                }, 150)
            }, getClosestBaseUrl: function (c) {
                c = a(c).closest(".ui-page").jqmData("url");
                var d = a.mobile.path.documentBase.hrefNoHash;
                a.mobile.dynamicBaseEnabled && c && a.mobile.path.isPath(c) || (c = d);
                return a.mobile.path.makeUrlAbsolute(c, d)
            }, removeActiveLinkClass: function (c) {
                a.mobile.activeClickedLink && (!a.mobile.activeClickedLink.closest("." + a.mobile.activePageClass).length || c) && a.mobile.activeClickedLink.removeClass(a.mobile.activeBtnClass);
                a.mobile.activeClickedLink = null
            }, getInheritedTheme: function (a, d) {
                for (var b = a[0], f = "", g = /ui-(bar|body|overlay)-([a-z])\b/, e, l; b && !((e = b.className ||
                "") && (l = g.exec(e)) && (f = l[2]));)b = b.parentNode;
                return f || d || "a"
            }, enhanceable: function (a) {
                return this.haveParents(a, "enhance")
            }, hijackable: function (a) {
                return this.haveParents(a, "ajax")
            }, haveParents: function (c, d) {
                if (!a.mobile.ignoreContentEnabled)return c;
                var b = c.length, f = a(), g, e, l, k, n;
                for (k = 0; k < b; k++) {
                    e = c.eq(k);
                    l = !1;
                    for (g = c[k]; g;) {
                        n = g.getAttribute ? g.getAttribute("data-" + a.mobile.ns + d) : "";
                        if ("false" === n) {
                            l = !0;
                            break
                        }
                        g = g.parentNode
                    }
                    l || (f = f.add(e))
                }
                return f
            }, getScreenHeight: function () {
                return g.innerHeight ||
                a.mobile.window.height()
            }, resetActivePageHeight: function (c) {
                var d = a("." + a.mobile.activePageClass), b = d.height(), f = d.outerHeight(!0);
                c = k(d, "number" == typeof c ? c : a.mobile.getScreenHeight());
                d.css("min-height", "");
                d.height() < c && d.css("min-height", c - (f - b))
            }, loading: function () {
                var c = this.loading._widget || a(a.mobile.loader.prototype.defaultHtml).loader(), d = c.loader.apply(c, arguments);
                return this.loading._widget = c, d
            }
        });
        a.addDependents = function (c, d) {
            var b = a(c), f = b.jqmData("dependents") || a();
            b.jqmData("dependents",
                a(f).add(d))
        };
        a.fn.extend({
            removeWithDependents: function () {
                a.removeWithDependents(this)
            }, enhanceWithin: function () {
                var c, d = {}, b = a.mobile.page.prototype.keepNativeSelector(), f = this;
                a.mobile.nojs && a.mobile.nojs(this);
                a.mobile.links && a.mobile.links(this);
                a.mobile.degradeInputsWithin && a.mobile.degradeInputsWithin(this);
                a.fn.buttonMarkup && this.find(a.fn.buttonMarkup.initSelector).not(b).jqmEnhanceable().buttonMarkup();
                a.fn.fieldcontain && this.find(":jqmData(role='fieldcontain')").not(b).jqmEnhanceable().fieldcontain();
                a.each(a.mobile.widgets, function (c, e) {
                    if (e.initSelector) {
                        var g = a.mobile.enhanceable(f.find(e.initSelector));
                        0 < g.length && (g = g.not(b));
                        0 < g.length && (d[e.prototype.widgetName] = g)
                    }
                });
                for (c in d)d[c][c]();
                return this
            }, addDependents: function (c) {
                a.addDependents(this, c)
            }, getEncodedText: function () {
                return a("<a>").text(this.text()).html()
            }, jqmEnhanceable: function () {
                return a.mobile.enhanceable(this)
            }, jqmHijackable: function () {
                return a.mobile.hijackable(this)
            }
        });
        a.removeWithDependents = function (c) {
            c = a(c);
            (c.jqmData("dependents") ||
            a()).remove();
            c.remove()
        };
        a.addDependents = function (c, d) {
            var b = a(c), f = b.jqmData("dependents") || a();
            b.jqmData("dependents", a(f).add(d))
        };
        a.find.matches = function (c, d) {
            return a.find(c, null, null, d)
        };
        a.find.matchesSelector = function (c, d) {
            return 0 < a.find(d, null, null, [c]).length
        }
    })(n, this);
    (function (a) {
        var g = a("meta[name=viewport]"), d = g.attr("content"), k = d + ",maximum-scale=1, user-scalable=no", c = d + ",maximum-scale=10, user-scalable=yes", start = /(user-scalable[\s]*=[\s]*no)|(maximum-scale[\s]*=[\s]*1)[$,\s]/.test(d);
        a.mobile.zoom = a.extend({}, {
            enabled: !start, locked: !1, disable: function (b) {
                !start && !a.mobile.zoom.locked && (g.attr("content", k), a.mobile.zoom.enabled = !1, a.mobile.zoom.locked = b || !1)
            }, enable: function (b) {
                !(start || a.mobile.zoom.locked && !0 !== b) && (g.attr("content", c), a.mobile.zoom.enabled = !0, a.mobile.zoom.locked = !1)
            }, restore: function () {
                start || (g.attr("content", d), a.mobile.zoom.enabled = !0)
            }
        })
    })(n);
    (function (a, g) {
        function d(a) {
            start = a.originalEvent;
            e = start.accelerationIncludingGravity;
            b = Math.abs(e.x);
            f = Math.abs(e.y);
            m = Math.abs(e.z);
            !g.orientation && (7 < b || (6 < m && 8 > f || 8 > m && 6 < f) && 5 < b) ? c.enabled && c.disable() : c.enabled || c.enable()
        }

        a.mobile.iosorientationfixEnabled = !0;
        var k = navigator.userAgent, c, start, b, f, m, e;
        /iPhone|iPad|iPod/.test(navigator.platform) && /OS [1-5]_[0-9_]* like Mac OS X/i.test(k) && -1 < k.indexOf("AppleWebKit") ? (c = a.mobile.zoom, a.mobile.document.on("mobileinit", function () {
            a.mobile.iosorientationfixEnabled && a.mobile.window.bind("orientationchange.iosorientationfix", c.enable).bind("devicemotion.iosorientationfix", d)
        })) : a.mobile.iosorientationfixEnabled = !1
    })(n, this)
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
    function n(a, b) {
        b = b || lines;
        b = b || lines;
        var c = a.width(), d = $(window).width() / b, c = (d - c) / 2;
        return [d, c, d * (b - 1) + c]
    }

    function v(a) {
        var b = r, c = b.left / q * 500;
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

    function p(a) {
        var b = r, c = a.width(), d = myWidth - b.left - c, e = (myWidth - b.left - c) / q * 500;
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

    function s(a) {
        a.each(function () {
            var a = $(this);
            a.css({top: "0px"}).hide();
            a.stop(!0)
        });
        alert("\u901a\u5173\u5b8c\u6210\uff01\n \u4eba\u54c1\u5927\u7206\u53d1\uff0c\u6210\u529f\u5151\u6362\u5230\u4e00\u53f0iphone6\uff01\n\u5206\u4eab\u5230\u670b\u53cb\u5708\u70ab\u8000\uff01")
    }

    function a(a) {
        a.each(function (a) {
            var b = $(this);
            b.css({width: q / 2 + "px", height: q / 2 + "px", "font-size": q / 2 + "px", display: "none"});
            g(b, a)
        })
    }

    function g(a, b) {
        b = b || Math.round(1 *
        Math.random()) + 1;
        var c = Math.floor(Math.random() * lines), d = 1E3 * Math.round(5 * Math.random() + 1);
        a.delay(1E3 * b).css({left: c * q + "px"}).animate({top: "+=" + myHeight + "px"}, {
            duration: d, easing: "linear", start: function () {
                a.show()
            }, complete: function () {
                a.css({top: "0px"}).hide();
                g(a)
            }, progress: function () {
                var b = a.offset();
                if (r.top >= b.top && r.top <= b.top + a.height() && r.left >= b.left && r.left <= b.left + a.width()) {
                    if ("ingot" == a.attr("value"))b = parseInt(m.html()), m.html(b + 1); else if ("cash" == a.attr("value")) {
                        if (b = parseInt(f.html()), b++, f.html(b),
                            3 == b)return s(l), !1
                    } else"flower" == a.attr("value") && (b = parseInt(e.html()), e.html(b + 1));
                    a.css({top: "0px"}).hide();
                    g(a)
                }
            }
        })
    }

    function d(a) {
        a.width(myWidth / 2 - 1);
        a.height(myHeight)
    }

    function k(a, b) {
        a.width(q / 4);
        a.height(q / 4);
        if ("undefined" == typeof a.data("lock-stay-center")) {
            a.css("display", "block");
            var c = 0, d = 0;
            "undefined" == typeof b ? (c = ($(window).height() - a.height()) / 2, d = ($(window).width() - a.height()) / 2) : (c = b.top, d = b.left);
            a.css("position", "absolute");
            a.css("top", c + "px");
            a.css("left", d + "px");
            a.css("font-size", q / 2 + "px");
            r = {top: c, left: d}
        }
    }

    function c(a) {
        a.height(2 * myHeight);
        a.css({
            "animation-name": t.name,
            "animation-timing-function": "linear",
            "animation-iteration-count": "infinite",
            "animation-duration": "20s"
        })
    }

    function start() {
        lines = 9;
        myWidth = $(window).width();
        myHeight = $(window).height();
        N = n(b);
        q = N[0];
        t = CSSAnimations.create("bg", {"0%": {top: 0 - myHeight + "px"}, "100%": {top: "0px"}});
        d(D);
        d(M);
        D.tap(function () {
            v(b)
        });
        M.tap(function () {
            p(b)
        });
        a(l);
        c(u);
        c(G);
        k(b, {top: myHeight - myHeight / 3, left: 4 * q + q / 4});
        $("#honor").tap(function () {
            alert("\u8ba1\u5212\u6210\u5c31\uff1a\n \u901f\u6218\u901f\u51b3 - 20s\u5185\u5b8c\u6210\u4efb\u52a1\n \u5bb6\u8d22\u4e07\u8d2f - \u5403\u591f100\u4e2a\u5143\u5b9d \n \u4f60\u6709\u6447\u94b1\u6811\u6211\u6709\u6323\u94b1\u82b1 - \u91c7\u96c610\u6735\u6323\u94b1\u82b1\n \u6709\u94b1\uff01\u4efb\u6027\uff01 - \u597d\u53cb\u6392\u540d\u524d10\u540d\n \u5927\u5bcc\u7fc1 - \u51fb\u8d25\u5168\u56fd80%\u7684\u73a9\u5bb6 \n \u9690\u85cf\u63d0\u793a\n Hacker! - \u68c0\u7d22\u767e\u59d3\u7f51\u4ee3\u7801\u89e6\u53d1hr@baixing.com\u903b\u8f91");
            return !1
        });
        alert("Hi,\u8fd9\u662f\u4e00\u4e2aDemo\u7248\u672c\u2026\u2026 \u52a0\u8fd9\u884c\u662f\u4e3a\u4e86\u2026\u2026")
    }

    var b = $("#sheep"), f = $("#cash"), m = $("#ingot"), e = $("#flower"), l = $(".bonus"), u = $("#bgl"), G = $("#bgr"), D = $("#leftPanel"), M = $("#rightPanel"), N, q, myHeight, lines, myWidth, t, r, J = !1, B = !1;
    $(window).on("resize", function () {
        start()
    });
    start()
});
