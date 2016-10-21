(function(J, a) {
    "object" === typeof module && module.exports ? module.exports = J.document ? a(J) : a : J.Highcharts = a(J);
})("undefined" !== typeof window ? window : this, function(J) {
    J = function() {
        var a = window, C = a.document, z = a.navigator && a.navigator.userAgent || "", E = C && C.createElementNS && !!C.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, H = /(edge|msie|trident)/i.test(z) && !window.opera, v = !E, n = /Firefox/.test(z), k = n && 4 > parseInt(z.split("Firefox/")[1], 10);
        return a.Highcharts ? a.Highcharts.error(16, !0) : {
            product: "Highstock",
            version: "5.0.0",
            deg2rad: 2 * Math.PI / 360,
            doc: C,
            hasBidiBug: k,
            isMS: H,
            isWebKit: /AppleWebKit/.test(z),
            isFirefox: n,
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(z),
            SVG_NS: "http://www.w3.org/2000/svg",
            idCounter: 0,
            chartCount: 0,
            seriesTypes: {},
            svg: E,
            vml: v,
            win: a,
            charts: [],
            marginNames: [ "plotTop", "marginRight", "marginBottom", "plotLeft" ],
            noop: function() {}
        };
    }();
    (function(a) {
        var C = [], z = a.charts, E = a.doc, H = a.win;
        a.error = function(a, n) {
            var k = "Highcharts error #" + a + ": www.highcharts.com/errors/" + a;
            if (n) throw Error(k);
            H.console && console.log(k);
        };
        a.Fx = function(a, n, k) {
            this.options = n;
            this.elem = a;
            this.prop = k;
        };
        a.Fx.prototype = {
            dSetter: function() {
                var a = this.paths[0], n = this.paths[1], k = [], r = this.now, t = a.length, h;
                if (1 === r) k = this.toD; else if (t === n.length && 1 > r) for (;t--; ) h = parseFloat(a[t]),
                    k[t] = isNaN(h) ? a[t] : r * parseFloat(n[t] - h) + h; else k = n;
                this.elem.attr("d", k);
            },
            update: function() {
                var a = this.elem, n = this.prop, k = this.now, r = this.options.step;
                if (this[n + "Setter"]) this[n + "Setter"](); else a.attr ? a.element && a.attr(n, k) : a.style[n] = k + this.unit;
                r && r.call(a, k, this);
            },
            run: function(a, n, k) {
                var r = this, t = function(a) {
                    return t.stopped ? !1 : r.step(a);
                }, h;
                this.startTime = +new Date();
                this.start = a;
                this.end = n;
                this.unit = k;
                this.now = this.start;
                this.pos = 0;
                t.elem = this.elem;
                t() && 1 === C.push(t) && (t.timerId = setInterval(function() {
                    for (h = 0; h < C.length; h++) C[h]() || C.splice(h--, 1);
                    C.length || clearInterval(t.timerId);
                }, 13));
            },
            step: function(a) {
                var n = +new Date(), k, r = this.options;
                k = this.elem;
                var t = r.complete, h = r.duration, u = r.curAnim, d;
                if (k.attr && !k.element) k = !1; else if (a || n >= h + this.startTime) {
                    this.now = this.end;
                    this.pos = 1;
                    this.update();
                    a = u[this.prop] = !0;
                    for (d in u) !0 !== u[d] && (a = !1);
                    a && t && t.call(k);
                    k = !1;
                } else this.pos = r.easing((n - this.startTime) / h), this.now = this.start + (this.end - this.start) * this.pos,
                    this.update(), k = !0;
                return k;
            },
            initPath: function(v, n, k) {
                function r(a) {
                    for (b = a.length; b--; ) "M" !== a[b] && "L" !== a[b] || a.splice(b + 1, 0, a[b + 1], a[b + 2], a[b + 1], a[b + 2]);
                }
                function t(a, e) {
                    for (;a.length < l; ) {
                        a[0] = e[l - a.length];
                        var f = a.slice(0, w);
                        [].splice.apply(a, [ 0, 0 ].concat(f));
                        c && (f = a.slice(a.length - w), [].splice.apply(a, [ a.length, 0 ].concat(f)),
                            b--);
                    }
                    a[0] = "M";
                }
                function h(a, e) {
                    for (var b = (l - a.length) / w; 0 < b && b--; ) f = a.slice().splice(a.length / m - w, w * m),
                        f[0] = e[l - w - b * w], q && (f[w - 6] = f[w - 2], f[w - 5] = f[w - 1]), [].splice.apply(a, [ a.length / m, 0 ].concat(f)),
                        c && b--;
                }
                n = n || "";
                var u, d = v.startX, g = v.endX, q = -1 < n.indexOf("C"), w = q ? 7 : 3, l, f, b;
                n = n.split(" ");
                k = k.slice();
                var c = v.isArea, m = c ? 2 : 1, e;
                q && (r(n), r(k));
                if (d && g) {
                    for (b = 0; b < d.length; b++) if (d[b] === g[0]) {
                        u = b;
                        break;
                    } else if (d[0] === g[g.length - d.length + b]) {
                        u = b;
                        e = !0;
                        break;
                    }
                    void 0 === u && (n = []);
                }
                n.length && a.isNumber(u) && (l = k.length + u * m * w, e ? (t(n, k), h(k, n)) : (t(k, n),
                    h(n, k)));
                return [ n, k ];
            }
        };
        a.extend = function(a, n) {
            var k;
            a || (a = {});
            for (k in n) a[k] = n[k];
            return a;
        };
        a.merge = function() {
            var v, n = arguments, k, r = {}, t = function(h, u) {
                var d, g;
                "object" !== typeof h && (h = {});
                for (g in u) u.hasOwnProperty(g) && (d = u[g], a.isObject(d, !0) && "renderTo" !== g && "number" !== typeof d.nodeType ? h[g] = t(h[g] || {}, d) : h[g] = u[g]);
                return h;
            };
            !0 === n[0] && (r = n[1], n = Array.prototype.slice.call(n, 2));
            k = n.length;
            for (v = 0; v < k; v++) r = t(r, n[v]);
            return r;
        };
        a.pInt = function(a, n) {
            return parseInt(a, n || 10);
        };
        a.isString = function(a) {
            return "string" === typeof a;
        };
        a.isArray = function(a) {
            a = Object.prototype.toString.call(a);
            return "[object Array]" === a || "[object Array Iterator]" === a;
        };
        a.isObject = function(v, n) {
            return v && "object" === typeof v && (!n || !a.isArray(v));
        };
        a.isNumber = function(a) {
            return "number" === typeof a && !isNaN(a);
        };
        a.erase = function(a, n) {
            for (var k = a.length; k--; ) if (a[k] === n) {
                a.splice(k, 1);
                break;
            }
        };
        a.defined = function(a) {
            return void 0 !== a && null !== a;
        };
        a.attr = function(v, n, k) {
            var r, t;
            if (a.isString(n)) a.defined(k) ? v.setAttribute(n, k) : v && v.getAttribute && (t = v.getAttribute(n)); else if (a.defined(n) && a.isObject(n)) for (r in n) v.setAttribute(r, n[r]);
            return t;
        };
        a.splat = function(v) {
            return a.isArray(v) ? v : [ v ];
        };
        a.syncTimeout = function(a, n, k) {
            if (n) return setTimeout(a, n, k);
            a.call(0, k);
        };
        a.pick = function() {
            var a = arguments, n, k, r = a.length;
            for (n = 0; n < r; n++) if (k = a[n], void 0 !== k && null !== k) return k;
        };
        a.css = function(v, n) {
            a.isMS && !a.svg && n && void 0 !== n.opacity && (n.filter = "alpha(opacity=" + 100 * n.opacity + ")");
            a.extend(v.style, n);
        };
        a.createElement = function(v, n, k, r, t) {
            v = E.createElement(v);
            var h = a.css;
            n && a.extend(v, n);
            t && h(v, {
                padding: 0,
                border: "none",
                margin: 0
            });
            k && h(v, k);
            r && r.appendChild(v);
            return v;
        };
        a.extendClass = function(v, n) {
            var k = function() {};
            k.prototype = new v();
            a.extend(k.prototype, n);
            return k;
        };
        a.pad = function(a, n, k) {
            return Array((n || 2) + 1 - String(a).length).join(k || 0) + a;
        };
        a.relativeLength = function(a, n) {
            return /%$/.test(a) ? n * parseFloat(a) / 100 : parseFloat(a);
        };
        a.wrap = function(a, n, k) {
            var r = a[n];
            a[n] = function() {
                var a = Array.prototype.slice.call(arguments);
                a.unshift(r);
                return k.apply(this, a);
            };
        };
        a.getTZOffset = function(v) {
            var n = a.Date;
            return 6e4 * (n.hcGetTimezoneOffset && n.hcGetTimezoneOffset(v) || n.hcTimezoneOffset || 0);
        };
        a.dateFormat = function(v, n, k) {
            if (!a.defined(n) || isNaN(n)) return a.defaultOptions.lang.invalidDate || "";
            v = a.pick(v, "%Y-%m-%d %H:%M:%S");
            var r = a.Date, t = new r(n - a.getTZOffset(n)), h, u = t[r.hcGetHours](), d = t[r.hcGetDay](), g = t[r.hcGetDate](), q = t[r.hcGetMonth](), w = t[r.hcGetFullYear](), l = a.defaultOptions.lang, f = l.weekdays, b = l.shortWeekdays, c = a.pad, r = a.extend({
                a: b ? b[d] : f[d].substr(0, 3),
                A: f[d],
                d: c(g),
                e: c(g, 2, " "),
                w: d,
                b: l.shortMonths[q],
                B: l.months[q],
                m: c(q + 1),
                y: w.toString().substr(2, 2),
                Y: w,
                H: c(u),
                k: u,
                I: c(u % 12 || 12),
                l: u % 12 || 12,
                M: c(t[r.hcGetMinutes]()),
                p: 12 > u ? "AM" : "PM",
                P: 12 > u ? "am" : "pm",
                S: c(t.getSeconds()),
                L: c(Math.round(n % 1e3), 3)
            }, a.dateFormats);
            for (h in r) for (;-1 !== v.indexOf("%" + h); ) v = v.replace("%" + h, "function" === typeof r[h] ? r[h](n) : r[h]);
            return k ? v.substr(0, 1).toUpperCase() + v.substr(1) : v;
        };
        a.formatSingle = function(v, n) {
            var k = /\.([0-9])/, r = a.defaultOptions.lang;
            /f$/.test(v) ? (k = (k = v.match(k)) ? k[1] : -1, null !== n && (n = a.numberFormat(n, k, r.decimalPoint, -1 < v.indexOf(",") ? r.thousandsSep : ""))) : n = a.dateFormat(v, n);
            return n;
        };
        a.format = function(v, n) {
            for (var k = "{", r = !1, t, h, u, d, g = [], q; v; ) {
                k = v.indexOf(k);
                if (-1 === k) break;
                t = v.slice(0, k);
                if (r) {
                    t = t.split(":");
                    h = t.shift().split(".");
                    d = h.length;
                    q = n;
                    for (u = 0; u < d; u++) q = q[h[u]];
                    t.length && (q = a.formatSingle(t.join(":"), q));
                    g.push(q);
                } else g.push(t);
                v = v.slice(k + 1);
                k = (r = !r) ? "}" : "{";
            }
            g.push(v);
            return g.join("");
        };
        a.getMagnitude = function(a) {
            return Math.pow(10, Math.floor(Math.log(a) / Math.LN10));
        };
        a.normalizeTickInterval = function(v, n, k, r, t) {
            var h, u = v;
            k = a.pick(k, 1);
            h = v / k;
            n || (n = [ 1, 2, 2.5, 5, 10 ], !1 === r && (1 === k ? n = [ 1, 2, 5, 10 ] : .1 >= k && (n = [ 1 / k ])));
            for (r = 0; r < n.length && !(u = n[r], t && u * k >= v || !t && h <= (n[r] + (n[r + 1] || n[r])) / 2); r++) ;
            return u * k;
        };
        a.stableSort = function(a, n) {
            var k = a.length, r, t;
            for (t = 0; t < k; t++) a[t].safeI = t;
            a.sort(function(a, u) {
                r = n(a, u);
                return 0 === r ? a.safeI - u.safeI : r;
            });
            for (t = 0; t < k; t++) delete a[t].safeI;
        };
        a.arrayMin = function(a) {
            for (var n = a.length, k = a[0]; n--; ) a[n] < k && (k = a[n]);
            return k;
        };
        a.arrayMax = function(a) {
            for (var n = a.length, k = a[0]; n--; ) a[n] > k && (k = a[n]);
            return k;
        };
        a.destroyObjectProperties = function(a, n) {
            for (var k in a) a[k] && a[k] !== n && a[k].destroy && a[k].destroy(), delete a[k];
        };
        a.discardElement = function(v) {
            var n = a.garbageBin;
            n || (n = a.createElement("div"));
            v && n.appendChild(v);
            n.innerHTML = "";
        };
        a.correctFloat = function(a, n) {
            return parseFloat(a.toPrecision(n || 14));
        };
        a.setAnimation = function(v, n) {
            n.renderer.globalAnimation = a.pick(v, n.options.chart.animation, !0);
        };
        a.animObject = function(v) {
            return a.isObject(v) ? a.merge(v) : {
                duration: v ? 500 : 0
            };
        };
        a.timeUnits = {
            millisecond: 1,
            second: 1e3,
            minute: 6e4,
            hour: 36e5,
            day: 864e5,
            week: 6048e5,
            month: 24192e5,
            year: 314496e5
        };
        a.numberFormat = function(v, n, k, r) {
            v = +v || 0;
            n = +n;
            var t = a.defaultOptions.lang, h = (v.toString().split(".")[1] || "").length, u, d, g = Math.abs(v);
            -1 === n ? n = Math.min(h, 20) : a.isNumber(n) || (n = 2);
            u = String(a.pInt(g.toFixed(n)));
            d = 3 < u.length ? u.length % 3 : 0;
            k = a.pick(k, t.decimalPoint);
            r = a.pick(r, t.thousandsSep);
            v = (0 > v ? "-" : "") + (d ? u.substr(0, d) + r : "");
            v += u.substr(d).replace(/(\d{3})(?=\d)/g, "$1" + r);
            n && (r = Math.abs(g - u + Math.pow(10, -Math.max(n, h) - 1)), v += k + r.toFixed(n).slice(2));
            return v;
        };
        Math.easeInOutSine = function(a) {
            return -.5 * (Math.cos(Math.PI * a) - 1);
        };
        a.getStyle = function(v, n) {
            var k;
            return "width" === n ? Math.min(v.offsetWidth, v.scrollWidth) - a.getStyle(v, "padding-left") - a.getStyle(v, "padding-right") : "height" === n ? Math.min(v.offsetHeight, v.scrollHeight) - a.getStyle(v, "padding-top") - a.getStyle(v, "padding-bottom") : (k = H.getComputedStyle(v, void 0)) && a.pInt(k.getPropertyValue(n));
        };
        a.inArray = function(a, n) {
            return n.indexOf ? n.indexOf(a) : [].indexOf.call(n, a);
        };
        a.grep = function(a, n) {
            return [].filter.call(a, n);
        };
        a.map = function(a, n) {
            for (var k = [], r = 0, t = a.length; r < t; r++) k[r] = n.call(a[r], a[r], r, a);
            return k;
        };
        a.offset = function(a) {
            var n = E.documentElement;
            a = a.getBoundingClientRect();
            return {
                top: a.top + (H.pageYOffset || n.scrollTop) - (n.clientTop || 0),
                left: a.left + (H.pageXOffset || n.scrollLeft) - (n.clientLeft || 0)
            };
        };
        a.stop = function(a) {
            for (var n = C.length; n--; ) C[n].elem === a && (C[n].stopped = !0);
        };
        a.each = function(a, n, k) {
            return Array.prototype.forEach.call(a, n, k);
        };
        a.addEvent = function(a, n, k) {
            function r(h) {
                h.target = h.srcElement || H;
                k.call(a, h);
            }
            var t = a.hcEvents = a.hcEvents || {};
            a.addEventListener ? a.addEventListener(n, k, !1) : a.attachEvent && (a.hcEventsIE || (a.hcEventsIE = {}),
                a.hcEventsIE[k.toString()] = r, a.attachEvent("on" + n, r));
            t[n] || (t[n] = []);
            t[n].push(k);
        };
        a.removeEvent = function(v, n, k) {
            function r(a, d) {
                v.removeEventListener ? v.removeEventListener(a, d, !1) : v.attachEvent && (d = v.hcEventsIE[d.toString()],
                    v.detachEvent("on" + a, d));
            }
            function t() {
                var a, d;
                if (v.nodeName) for (d in n ? (a = {}, a[n] = !0) : a = u, a) if (u[d]) for (a = u[d].length; a--; ) r(d, u[d][a]);
            }
            var h, u = v.hcEvents, d;
            u && (n ? (h = u[n] || [], k ? (d = a.inArray(k, h), -1 < d && (h.splice(d, 1),
                u[n] = h), r(n, k)) : (t(), u[n] = [])) : (t(), v.hcEvents = {}));
        };
        a.fireEvent = function(v, n, k, r) {
            var t;
            t = v.hcEvents;
            var h, u;
            k = k || {};
            if (E.createEvent && (v.dispatchEvent || v.fireEvent)) t = E.createEvent("Events"),
                t.initEvent(n, !0, !0), a.extend(t, k), v.dispatchEvent ? v.dispatchEvent(t) : v.fireEvent(n, t); else if (t) for (t = t[n] || [],
                                                                                                                                       h = t.length, k.target || a.extend(k, {
                preventDefault: function() {
                    k.defaultPrevented = !0;
                },
                target: v,
                type: n
            }), n = 0; n < h; n++) (u = t[n]) && !1 === u.call(v, k) && k.preventDefault();
            r && !k.defaultPrevented && r(k);
        };
        a.animate = function(v, n, k) {
            var r, t = "", h, u, d;
            a.isObject(k) || (r = arguments, k = {
                duration: r[2],
                easing: r[3],
                complete: r[4]
            });
            a.isNumber(k.duration) || (k.duration = 400);
            k.easing = "function" === typeof k.easing ? k.easing : Math[k.easing] || Math.easeInOutSine;
            k.curAnim = a.merge(n);
            for (d in n) u = new a.Fx(v, k, d), h = null, "d" === d ? (u.paths = u.initPath(v, v.d, n.d),
                u.toD = n.d, r = 0, h = 1) : v.attr ? r = v.attr(d) : (r = parseFloat(a.getStyle(v, d)) || 0,
                "opacity" !== d && (t = "px")), h || (h = n[d]), h.match && h.match("px") && (h = h.replace(/px/g, "")),
                u.run(r, h, t);
        };
        a.seriesType = function(v, n, k, r, t) {
            var h = a.getOptions(), u = a.seriesTypes;
            h.plotOptions[v] = a.merge(h.plotOptions[n], k);
            u[v] = a.extendClass(u[n] || function() {}, r);
            u[v].prototype.type = v;
            t && (u[v].prototype.pointClass = a.extendClass(a.Point, t));
            return u[v];
        };
        H.jQuery && (H.jQuery.fn.highcharts = function() {
            var v = [].slice.call(arguments);
            if (this[0]) return v[0] ? (new (a[a.isString(v[0]) ? v.shift() : "Chart"])(this[0], v[0], v[1]),
                this) : z[a.attr(this[0], "data-highcharts-chart")];
        });
        E && !E.defaultView && (a.getStyle = function(v, n) {
            var k;
            k = {
                width: "clientWidth",
                height: "clientHeight"
            }[n];
            if (v.style[n]) return a.pInt(v.style[n]);
            "opacity" === n && (n = "filter");
            if (k) return v.style.zoom = 1, Math.max(v[k] - 2 * a.getStyle(v, "padding"), 0);
            k = v.currentStyle[n.replace(/\-(\w)/g, function(a, k) {
                return k.toUpperCase();
            })];
            "filter" === n && (k = k.replace(/alpha\(opacity=([0-9]+)\)/, function(a, k) {
                return k / 100;
            }));
            return "" === k ? 1 : a.pInt(k);
        });
        Array.prototype.forEach || (a.each = function(a, n, k) {
            for (var r = 0, t = a.length; r < t; r++) if (!1 === n.call(k, a[r], r, a)) return r;
        });
        Array.prototype.indexOf || (a.inArray = function(a, n) {
            var k, r = 0;
            if (n) for (k = n.length; r < k; r++) if (n[r] === a) return r;
            return -1;
        });
        Array.prototype.filter || (a.grep = function(a, n) {
            for (var k = [], r = 0, t = a.length; r < t; r++) n(a[r], r) && k.push(a[r]);
            return k;
        });
    })(J);
    (function(a) {
        var C = a.each, z = a.isNumber, E = a.map, H = a.merge, v = a.pInt;
        a.Color = function(n) {
            if (!(this instanceof a.Color)) return new a.Color(n);
            this.init(n);
        };
        a.Color.prototype = {
            parsers: [ {
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function(a) {
                    return [ v(a[1]), v(a[2]), v(a[3]), parseFloat(a[4], 10) ];
                }
            }, {
                regex: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
                parse: function(a) {
                    return [ v(a[1], 16), v(a[2], 16), v(a[3], 16), 1 ];
                }
            }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                parse: function(a) {
                    return [ v(a[1]), v(a[2]), v(a[3]), 1 ];
                }
            } ],
            names: {
                white: "#ffffff",
                black: "#000000"
            },
            init: function(n) {
                var k, r, t, h;
                if ((this.input = n = this.names[n] || n) && n.stops) this.stops = E(n.stops, function(h) {
                    return new a.Color(h[1]);
                }); else for (t = this.parsers.length; t-- && !r; ) h = this.parsers[t], (k = h.regex.exec(n)) && (r = h.parse(k));
                this.rgba = r || [];
            },
            get: function(a) {
                var k = this.input, r = this.rgba, t;
                this.stops ? (t = H(k), t.stops = [].concat(t.stops), C(this.stops, function(h, u) {
                    t.stops[u] = [ t.stops[u][0], h.get(a) ];
                })) : t = r && z(r[0]) ? "rgb" === a || !a && 1 === r[3] ? "rgb(" + r[0] + "," + r[1] + "," + r[2] + ")" : "a" === a ? r[3] : "rgba(" + r.join(",") + ")" : k;
                return t;
            },
            brighten: function(a) {
                var k, r = this.rgba;
                if (this.stops) C(this.stops, function(k) {
                    k.brighten(a);
                }); else if (z(a) && 0 !== a) for (k = 0; 3 > k; k++) r[k] += v(255 * a), 0 > r[k] && (r[k] = 0),
                    255 < r[k] && (r[k] = 255);
                return this;
            },
            setOpacity: function(a) {
                this.rgba[3] = a;
                return this;
            }
        };
        a.color = function(n) {
            return new a.Color(n);
        };
    })(J);
    (function(a) {
        var C, z, E = a.addEvent, H = a.animate, v = a.attr, n = a.charts, k = a.color, r = a.css, t = a.createElement, h = a.defined, u = a.deg2rad, d = a.destroyObjectProperties, g = a.doc, q = a.each, w = a.extend, l = a.erase, f = a.grep, b = a.hasTouch, c = a.isArray, m = a.isFirefox, e = a.isMS, D = a.isObject, p = a.isString, B = a.isWebKit, x = a.merge, L = a.noop, G = a.pick, y = a.pInt, F = a.removeEvent, K = a.stop, A = a.svg, I = a.SVG_NS, M = a.win;
        C = a.SVGElement = function() {
            return this;
        };
        C.prototype = {
            opacity: 1,
            SVG_NS: I,
            textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textDecoration textOverflow textShadow".split(" "),
            init: function(a, e) {
                this.element = "span" === e ? t(e) : g.createElementNS(this.SVG_NS, e);
                this.renderer = a;
            },
            animate: function(a, e, A) {
                e = G(e, this.renderer.globalAnimation, !0);
                K(this);
                e ? (A && (e.complete = A), H(this, a, e)) : this.attr(a, null, A);
                return this;
            },
            colorGradient: function(N, e, A) {
                var b = this.renderer, f, I, p, d, l, m, y, D, B, F, g, G = [], w;
                N.linearGradient ? I = "linearGradient" : N.radialGradient && (I = "radialGradient");
                if (I) {
                    p = N[I];
                    l = b.gradients;
                    y = N.stops;
                    F = A.radialReference;
                    c(p) && (N[I] = p = {
                        x1: p[0],
                        y1: p[1],
                        x2: p[2],
                        y2: p[3],
                        gradientUnits: "userSpaceOnUse"
                    });
                    "radialGradient" === I && F && !h(p.gradientUnits) && (d = p, p = x(p, b.getRadialAttr(F, d), {
                        gradientUnits: "userSpaceOnUse"
                    }));
                    for (g in p) "id" !== g && G.push(g, p[g]);
                    for (g in y) G.push(y[g]);
                    G = G.join(",");
                    l[G] ? F = l[G].attr("id") : (p.id = F = "highcharts-" + a.idCounter++, l[G] = m = b.createElement(I).attr(p).add(b.defs),
                        m.radAttr = d, m.stops = [], q(y, function(N) {
                        0 === N[1].indexOf("rgba") ? (f = a.color(N[1]), D = f.get("rgb"), B = f.get("a")) : (D = N[1],
                            B = 1);
                        N = b.createElement("stop").attr({
                            offset: N[0],
                            "stop-color": D,
                            "stop-opacity": B
                        }).add(m);
                        m.stops.push(N);
                    }));
                    w = "url(" + b.url + "#" + F + ")";
                    A.setAttribute(e, w);
                    A.gradient = G;
                    N.toString = function() {
                        return w;
                    };
                }
            },
            applyTextShadow: function(a) {
                var A = this.element, b, I = -1 !== a.indexOf("contrast"), p = {}, c = this.renderer.forExport, f = this.renderer.forExport || void 0 !== A.style.textShadow && !e;
                I && (p.textShadow = a = a.replace(/contrast/g, this.renderer.getContrast(A.style.fill)));
                if (B || c) p.textRendering = "geometricPrecision";
                f ? this.css(p) : (this.fakeTS = !0, this.ySetter = this.xSetter, b = [].slice.call(A.getElementsByTagName("tspan")),
                    q(a.split(/\s?,\s?/g), function(a) {
                        var N = A.firstChild, e, p;
                        a = a.split(" ");
                        e = a[a.length - 1];
                        (p = a[a.length - 2]) && q(b, function(a, b) {
                            var I;
                            0 === b && (a.setAttribute("x", A.getAttribute("x")), b = A.getAttribute("y"), a.setAttribute("y", b || 0),
                                null === b && A.setAttribute("y", 0));
                            I = a.cloneNode(1);
                            v(I, {
                                "class": "highcharts-text-shadow",
                                fill: e,
                                stroke: e,
                                "stroke-opacity": 1 / Math.max(y(p), 3),
                                "stroke-width": p,
                                "stroke-linejoin": "round"
                            });
                            A.insertBefore(I, N);
                        });
                    }));
            },
            attr: function(a, e, A) {
                var b, p = this.element, I, c = this, f;
                "string" === typeof a && void 0 !== e && (b = a, a = {}, a[b] = e);
                if ("string" === typeof a) c = (this[a + "Getter"] || this._defaultGetter).call(this, a, p); else {
                    for (b in a) e = a[b], f = !1, this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(b) && (I || (this.symbolAttr(a),
                        I = !0), f = !0), !this.rotation || "x" !== b && "y" !== b || (this.doTransform = !0),
                        f || (f = this[b + "Setter"] || this._defaultSetter, f.call(this, e, b, p), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(b) && this.updateShadows(b, e, f));
                    this.doTransform && (this.updateTransform(), this.doTransform = !1);
                }
                A && A();
                return c;
            },
            updateShadows: function(a, e, A) {
                for (var b = this.shadows, p = b.length; p--; ) A.call(b[p], "height" === a ? Math.max(e - (b[p].cutHeight || 0), 0) : "d" === a ? this.d : e, a, b[p]);
            },
            addClass: function(a, e) {
                var b = this.attr("class") || "";
                -1 === b.indexOf(a) && (e || (a = (b + (b ? " " : "") + a).replace("  ", " ")),
                    this.attr("class", a));
                return this;
            },
            hasClass: function(a) {
                return -1 !== v(this.element, "class").indexOf(a);
            },
            removeClass: function(a) {
                v(this.element, "class", (v(this.element, "class") || "").replace(a, ""));
                return this;
            },
            symbolAttr: function(a) {
                var e = this;
                q("x y r start end width height innerR anchorX anchorY".split(" "), function(b) {
                    e[b] = G(a[b], e[b]);
                });
                e.attr({
                    d: e.renderer.symbols[e.symbolName](e.x, e.y, e.width, e.height, e)
                });
            },
            clip: function(a) {
                return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none");
            },
            crisp: function(a, e) {
                var b, A = {}, p;
                e = e || a.strokeWidth || 0;
                p = Math.round(e) % 2 / 2;
                a.x = Math.floor(a.x || this.x || 0) + p;
                a.y = Math.floor(a.y || this.y || 0) + p;
                a.width = Math.floor((a.width || this.width || 0) - 2 * p);
                a.height = Math.floor((a.height || this.height || 0) - 2 * p);
                h(a.strokeWidth) && (a.strokeWidth = e);
                for (b in a) this[b] !== a[b] && (this[b] = A[b] = a[b]);
                return A;
            },
            css: function(a) {
                var b = this.styles, p = {}, I = this.element, f, c, d = "";
                f = !b;
                a && a.color && (a.fill = a.color);
                if (b) for (c in a) a[c] !== b[c] && (p[c] = a[c], f = !0);
                if (f) {
                    f = this.textWidth = a && a.width && "text" === I.nodeName.toLowerCase() && y(a.width) || this.textWidth;
                    b && (a = w(b, p));
                    this.styles = a;
                    f && !A && this.renderer.forExport && delete a.width;
                    if (e && !A) r(this.element, a); else {
                        b = function(a, N) {
                            return "-" + N.toLowerCase();
                        };
                        for (c in a) d += c.replace(/([A-Z])/g, b) + ":" + a[c] + ";";
                        v(I, "style", d);
                    }
                    this.added && f && this.renderer.buildText(this);
                }
                return this;
            },
            strokeWidth: function() {
                return this["stroke-width"] || 0;
            },
            on: function(a, e) {
                var A = this, p = A.element;
                b && "click" === a ? (p.ontouchstart = function(a) {
                    A.touchEventFired = Date.now();
                    a.preventDefault();
                    e.call(p, a);
                }, p.onclick = function(a) {
                    (-1 === M.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (A.touchEventFired || 0)) && e.call(p, a);
                }) : p["on" + a] = e;
                return this;
            },
            setRadialReference: function(a) {
                var e = this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                e && e.radAttr && e.animate(this.renderer.getRadialAttr(a, e.radAttr));
                return this;
            },
            translate: function(a, e) {
                return this.attr({
                    translateX: a,
                    translateY: e
                });
            },
            invert: function(a) {
                this.inverted = a;
                this.updateTransform();
                return this;
            },
            updateTransform: function() {
                var a = this.translateX || 0, e = this.translateY || 0, b = this.scaleX, A = this.scaleY, p = this.inverted, f = this.rotation, c = this.element;
                p && (a += this.attr("width"), e += this.attr("height"));
                a = [ "translate(" + a + "," + e + ")" ];
                p ? a.push("rotate(90) scale(-1,1)") : f && a.push("rotate(" + f + " " + (c.getAttribute("x") || 0) + " " + (c.getAttribute("y") || 0) + ")");
                (h(b) || h(A)) && a.push("scale(" + G(b, 1) + " " + G(A, 1) + ")");
                a.length && c.setAttribute("transform", a.join(" "));
            },
            toFront: function() {
                var a = this.element;
                a.parentNode.appendChild(a);
                return this;
            },
            align: function(a, e, b) {
                var A, c, f, I, d = {};
                c = this.renderer;
                f = c.alignedObjects;
                var m, y;
                if (a) {
                    if (this.alignOptions = a, this.alignByTranslate = e, !b || p(b)) this.alignTo = A = b || "renderer",
                        l(f, this), f.push(this), b = null;
                } else a = this.alignOptions, e = this.alignByTranslate, A = this.alignTo;
                b = G(b, c[A], c);
                A = a.align;
                c = a.verticalAlign;
                f = (b.x || 0) + (a.x || 0);
                I = (b.y || 0) + (a.y || 0);
                "right" === A ? m = 1 : "center" === A && (m = 2);
                m && (f += (b.width - (a.width || 0)) / m);
                d[e ? "translateX" : "x"] = Math.round(f);
                "bottom" === c ? y = 1 : "middle" === c && (y = 2);
                y && (I += (b.height - (a.height || 0)) / y);
                d[e ? "translateY" : "y"] = Math.round(I);
                this[this.placed ? "animate" : "attr"](d);
                this.placed = !0;
                this.alignAttr = d;
                return this;
            },
            getBBox: function(a, b) {
                var A, p = this.renderer, c, f, I, d = this.element, l = this.styles, y = this.textStr, D, x = d.style, B, F = p.cache, g = p.cacheKeys, h;
                f = G(b, this.rotation);
                I = f * u;
                c = l && l.fontSize;
                void 0 !== y && (h = y.toString().replace(/[0-9]/g, "0") + [ "", f || 0, c, d.style.width ].join());
                h && !a && (A = F[h]);
                if (!A) {
                    if (d.namespaceURI === this.SVG_NS || p.forExport) {
                        try {
                            B = this.fakeTS && function(a) {
                                q(d.querySelectorAll(".highcharts-text-shadow"), function(e) {
                                    e.style.display = a;
                                });
                            }, m && x.textShadow ? (D = x.textShadow, x.textShadow = "") : B && B("none"), A = d.getBBox ? w({}, d.getBBox()) : {
                                width: d.offsetWidth,
                                height: d.offsetHeight
                            }, D ? x.textShadow = D : B && B("");
                        } catch (K) {}
                        if (!A || 0 > A.width) A = {
                            width: 0,
                            height: 0
                        };
                    } else A = this.htmlGetBBox();
                    p.isSVG && (p = A.width, c = A.height, e && l && "11px" === l.fontSize && "16.9" === c.toPrecision(3) && (A.height = c = 14),
                        f && (A.width = Math.abs(c * Math.sin(I)) + Math.abs(p * Math.cos(I)), A.height = Math.abs(c * Math.cos(I)) + Math.abs(p * Math.sin(I))));
                    if (h && 0 < A.height) {
                        for (;250 < g.length; ) delete F[g.shift()];
                        F[h] || g.push(h);
                        F[h] = A;
                    }
                }
                return A;
            },
            show: function(a) {
                return this.attr({
                    visibility: a ? "inherit" : "visible"
                });
            },
            hide: function() {
                return this.attr({
                    visibility: "hidden"
                });
            },
            fadeOut: function(a) {
                var e = this;
                e.animate({
                    opacity: 0
                }, {
                    duration: a || 150,
                    complete: function() {
                        e.attr({
                            y: -9999
                        });
                    }
                });
            },
            add: function(a) {
                var e = this.renderer, b = this.element, A;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                void 0 !== this.textStr && e.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex) A = this.zIndexSetter();
                A || (a ? a.element : e.box).appendChild(b);
                if (this.onAdd) this.onAdd();
                return this;
            },
            safeRemoveChild: function(a) {
                var e = a.parentNode;
                e && e.removeChild(a);
            },
            destroy: function() {
                var a = this.element || {}, e = this.renderer.isSVG && "SPAN" === a.nodeName && this.parentGroup, b, A;
                a.onclick = a.onmouseout = a.onmouseover = a.onmousemove = a.point = null;
                K(this);
                this.clipPath && (this.clipPath = this.clipPath.destroy());
                if (this.stops) {
                    for (A = 0; A < this.stops.length; A++) this.stops[A] = this.stops[A].destroy();
                    this.stops = null;
                }
                this.safeRemoveChild(a);
                for (this.destroyShadows(); e && e.div && 0 === e.div.childNodes.length; ) a = e.parentGroup,
                    this.safeRemoveChild(e.div), delete e.div, e = a;
                this.alignTo && l(this.renderer.alignedObjects, this);
                for (b in this) delete this[b];
                return null;
            },
            shadow: function(a, e, b) {
                var A = [], p, c, f = this.element, I, d, l, m;
                if (!a) this.destroyShadows(); else if (!this.shadows) {
                    d = G(a.width, 3);
                    l = (a.opacity || .15) / d;
                    m = this.parentInverted ? "(-1,-1)" : "(" + G(a.offsetX, 1) + ", " + G(a.offsetY, 1) + ")";
                    for (p = 1; p <= d; p++) c = f.cloneNode(0), I = 2 * d + 1 - 2 * p, v(c, {
                        isShadow: "true",
                        stroke: a.color || "#000000",
                        "stroke-opacity": l * p,
                        "stroke-width": I,
                        transform: "translate" + m,
                        fill: "none"
                    }), b && (v(c, "height", Math.max(v(c, "height") - I, 0)), c.cutHeight = I), e ? e.element.appendChild(c) : f.parentNode.insertBefore(c, f),
                        A.push(c);
                    this.shadows = A;
                }
                return this;
            },
            destroyShadows: function() {
                q(this.shadows || [], function(a) {
                    this.safeRemoveChild(a);
                }, this);
                this.shadows = void 0;
            },
            xGetter: function(a) {
                "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
                return this._defaultGetter(a);
            },
            _defaultGetter: function(a) {
                a = G(this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a;
            },
            dSetter: function(a, e, b) {
                a && a.join && (a = a.join(" "));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                b.setAttribute(e, a);
                this[e] = a;
            },
            dashstyleSetter: function(a) {
                var e, b = this["stroke-width"];
                "inherit" === b && (b = 1);
                if (a = a && a.toLowerCase()) {
                    a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (e = a.length; e--; ) a[e] = y(a[e]) * b;
                    a = a.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", a);
                }
            },
            alignSetter: function(a) {
                this.element.setAttribute("text-anchor", {
                    left: "start",
                    center: "middle",
                    right: "end"
                }[a]);
            },
            titleSetter: function(a) {
                var e = this.element.getElementsByTagName("title")[0];
                e || (e = g.createElementNS(this.SVG_NS, "title"), this.element.appendChild(e));
                e.firstChild && e.removeChild(e.firstChild);
                e.appendChild(g.createTextNode(String(G(a), "").replace(/<[^>]*>/g, "")));
            },
            textSetter: function(a) {
                a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this));
            },
            fillSetter: function(a, e, b) {
                "string" === typeof a ? b.setAttribute(e, a) : a && this.colorGradient(a, e, b);
            },
            visibilitySetter: function(a, e, b) {
                "inherit" === a ? b.removeAttribute(e) : b.setAttribute(e, a);
            },
            zIndexSetter: function(a, e) {
                var b = this.renderer, A = this.parentGroup, b = (A || b).element || b.box, p, c, f = this.element, I;
                p = this.added;
                var d;
                h(a) && (f.zIndex = a, a = +a, this[e] === a && (p = !1), this[e] = a);
                if (p) {
                    (a = this.zIndex) && A && (A.handleZ = !0);
                    A = b.childNodes;
                    for (d = 0; d < A.length && !I; d++) p = A[d], c = p.zIndex, p !== f && (y(c) > a || !h(a) && h(c)) && (b.insertBefore(f, p),
                        I = !0);
                    I || b.appendChild(f);
                }
                return I;
            },
            _defaultSetter: function(a, e, b) {
                b.setAttribute(e, a);
            }
        };
        C.prototype.yGetter = C.prototype.xGetter;
        C.prototype.translateXSetter = C.prototype.translateYSetter = C.prototype.rotationSetter = C.prototype.verticalAlignSetter = C.prototype.scaleXSetter = C.prototype.scaleYSetter = function(a, e) {
            this[e] = a;
            this.doTransform = !0;
        };
        C.prototype.opacitySetter = C.prototype.displaySetter = function(a, e, b) {
            this[e] = a;
            b.setAttribute(e, a);
        };
        C.prototype["stroke-widthSetter"] = C.prototype.strokeSetter = function(a, e, b) {
            this[e] = a;
            this.stroke && this["stroke-width"] ? (C.prototype.fillSetter.call(this, this.stroke, "stroke", b),
                b.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === e && 0 === a && this.hasStroke && (b.removeAttribute("stroke"),
                this.hasStroke = !1);
        };
        z = a.SVGRenderer = function() {
            this.init.apply(this, arguments);
        };
        z.prototype = {
            Element: C,
            SVG_NS: I,
            init: function(a, e, b, A, p, c) {
                var f;
                A = this.createElement("svg").attr({
                    version: "1.1",
                    "class": "highcharts-root"
                }).css(this.getStyle(A));
                f = A.element;
                a.appendChild(f);
                -1 === a.innerHTML.indexOf("xmlns") && v(f, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = f;
                this.boxWrapper = A;
                this.alignedObjects = [];
                this.url = (m || B) && g.getElementsByTagName("base").length ? M.location.href.replace(/#.*?$/, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                this.createElement("desc").add().element.appendChild(g.createTextNode("Created with Highstock 5.0.0"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = c;
                this.forExport = p;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(e, b, !1);
                var I;
                m && a.getBoundingClientRect && (this.subPixelFix = e = function() {
                    r(a, {
                        left: 0,
                        top: 0
                    });
                    I = a.getBoundingClientRect();
                    r(a, {
                        left: Math.ceil(I.left) - I.left + "px",
                        top: Math.ceil(I.top) - I.top + "px"
                    });
                }, e(), E(M, "resize", e));
            },
            getStyle: function(a) {
                return this.style = w({
                    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                    fontSize: "12px"
                }, a);
            },
            setStyle: function(a) {
                this.boxWrapper.css(this.getStyle(a));
            },
            isHidden: function() {
                return !this.boxWrapper.getBBox().width;
            },
            destroy: function() {
                var a = this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                d(this.gradients || {});
                this.gradients = null;
                a && (this.defs = a.destroy());
                this.subPixelFix && F(M, "resize", this.subPixelFix);
                return this.alignedObjects = null;
            },
            createElement: function(a) {
                var e = new this.Element();
                e.init(this, a);
                return e;
            },
            draw: L,
            getRadialAttr: function(a, e) {
                return {
                    cx: a[0] - a[2] / 2 + e.cx * a[2],
                    cy: a[1] - a[2] / 2 + e.cy * a[2],
                    r: e.r * a[2]
                };
            },
            buildText: function(a) {
                for (var e = a.element, b = this, p = b.forExport, c = G(a.textStr, "").toString(), d = -1 !== c.indexOf("<"), l = e.childNodes, m, D, x, B, F = v(e, "x"), w = a.styles, h = a.textWidth, K = w && w.lineHeight, u = w && w.textShadow, M = w && "ellipsis" === w.textOverflow, k = l.length, t = h && !a.added && this.box, L = function(a) {
                    var e;
                    e = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : w && w.fontSize || b.style.fontSize || 12;
                    return K ? y(K) : b.fontMetrics(e, a).h;
                }; k--; ) e.removeChild(l[k]);
                d || u || M || h || -1 !== c.indexOf(" ") ? (m = /<.*class="([^"]+)".*>/, D = /<.*style="([^"]+)".*>/,
                    x = /<.*href="(http[^"]+)".*>/, t && t.appendChild(e), c = d ? c.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">').replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(/<br.*?>/g) : [ c ],
                    c = f(c, function(a) {
                        return "" !== a;
                    }), q(c, function(c, f) {
                    var d, l = 0;
                    c = c.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||");
                    d = c.split("|||");
                    q(d, function(c) {
                        if ("" !== c || 1 === d.length) {
                            var y = {}, q = g.createElementNS(b.SVG_NS, "tspan"), G, K;
                            m.test(c) && (G = c.match(m)[1], v(q, "class", G));
                            D.test(c) && (K = c.match(D)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), v(q, "style", K));
                            x.test(c) && !p && (v(q, "onclick", 'location.href="' + c.match(x)[1] + '"'), r(q, {
                                cursor: "pointer"
                            }));
                            c = (c.replace(/<(.|\n)*?>/g, "") || " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
                            if (" " !== c) {
                                q.appendChild(g.createTextNode(c));
                                l ? y.dx = 0 : f && null !== F && (y.x = F);
                                v(q, y);
                                e.appendChild(q);
                                !l && f && (!A && p && r(q, {
                                    display: "block"
                                }), v(q, "dy", L(q)));
                                if (h) {
                                    y = c.replace(/([^\^])-/g, "$1- ").split(" ");
                                    G = "nowrap" === w.whiteSpace;
                                    for (var u = 1 < d.length || f || 1 < y.length && !G, k, t, n = [], P = L(q), ba = a.rotation, O = c, z = O.length; (u || M) && (y.length || n.length); ) a.rotation = 0,
                                        k = a.getBBox(!0), t = k.width, !A && b.forExport && (t = b.measureSpanWidth(q.firstChild.data, a.styles)),
                                        k = t > h, void 0 === B && (B = k), M && B ? (z /= 2, "" === O || !k && .5 > z ? y = [] : (O = c.substring(0, O.length + (k ? -1 : 1) * Math.ceil(z)),
                                        y = [ O + (3 < h ? "…" : "") ], q.removeChild(q.firstChild))) : k && 1 !== y.length ? (q.removeChild(q.firstChild),
                                        n.unshift(y.pop())) : (y = n, n = [], y.length && !G && (q = g.createElementNS(I, "tspan"),
                                        v(q, {
                                            dy: P,
                                            x: F
                                        }), K && v(q, "style", K), e.appendChild(q)), t > h && (h = t)), y.length && q.appendChild(g.createTextNode(y.join(" ").replace(/- /g, "-")));
                                    a.rotation = ba;
                                }
                                l++;
                            }
                        }
                    });
                }), B && a.attr("title", a.textStr), t && t.removeChild(e), u && a.applyTextShadow && a.applyTextShadow(u)) : e.appendChild(g.createTextNode(c.replace(/&lt;/g, "<").replace(/&gt;/g, ">")));
            },
            getContrast: function(a) {
                a = k(a).rgba;
                return 510 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF";
            },
            button: function(a, b, A, c, p, f, I, d, l) {
                var y = this.label(a, b, A, l, null, null, null, null, "button"), m = 0;
                y.attr(x({
                    padding: 8,
                    r: 2
                }, p));
                var D, B, F, q;
                p = x({
                    fill: "#f7f7f7",
                    stroke: "#cccccc",
                    "stroke-width": 1,
                    style: {
                        color: "#333333",
                        cursor: "pointer",
                        fontWeight: "normal"
                    }
                }, p);
                D = p.style;
                delete p.style;
                f = x(p, {
                    fill: "#e6e6e6"
                }, f);
                B = f.style;
                delete f.style;
                I = x(p, {
                    fill: "#e6ebf5",
                    style: {
                        color: "#000000",
                        fontWeight: "bold"
                    }
                }, I);
                F = I.style;
                delete I.style;
                d = x(p, {
                    style: {
                        color: "#cccccc"
                    }
                }, d);
                q = d.style;
                delete d.style;
                E(y.element, e ? "mouseover" : "mouseenter", function() {
                    3 !== m && y.setState(1);
                });
                E(y.element, e ? "mouseout" : "mouseleave", function() {
                    3 !== m && y.setState(m);
                });
                y.setState = function(a) {
                    1 !== a && (y.state = m = a);
                    y.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + [ "normal", "hover", "pressed", "disabled" ][a || 0]);
                    y.attr([ p, f, I, d ][a || 0]).css([ D, B, F, q ][a || 0]);
                };
                y.attr(p).css(w({
                    cursor: "default"
                }, D));
                return y.on("click", function(a) {
                    3 !== m && c.call(y, a);
                });
            },
            crispLine: function(a, e) {
                a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - e % 2 / 2);
                a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + e % 2 / 2);
                return a;
            },
            path: function(a) {
                var e = {
                    fill: "none"
                };
                c(a) ? e.d = a : D(a) && w(e, a);
                return this.createElement("path").attr(e);
            },
            circle: function(a, e, b) {
                a = D(a) ? a : {
                    x: a,
                    y: e,
                    r: b
                };
                e = this.createElement("circle");
                e.xSetter = e.ySetter = function(a, e, b) {
                    b.setAttribute("c" + e, a);
                };
                return e.attr(a);
            },
            arc: function(a, e, b, A, c, p) {
                D(a) && (e = a.y, b = a.r, A = a.innerR, c = a.start, p = a.end, a = a.x);
                a = this.symbol("arc", a || 0, e || 0, b || 0, b || 0, {
                    innerR: A || 0,
                    start: c || 0,
                    end: p || 0
                });
                a.r = b;
                return a;
            },
            rect: function(a, e, b, A, c, p) {
                c = D(a) ? a.r : c;
                var f = this.createElement("rect");
                a = D(a) ? a : void 0 === a ? {} : {
                    x: a,
                    y: e,
                    width: Math.max(b, 0),
                    height: Math.max(A, 0)
                };
                void 0 !== p && (a.strokeWidth = p, a = f.crisp(a));
                a.fill = "none";
                c && (a.r = c);
                f.rSetter = function(a, e, b) {
                    v(b, {
                        rx: a,
                        ry: a
                    });
                };
                return f.attr(a);
            },
            setSize: function(a, e, b) {
                var A = this.alignedObjects, c = A.length;
                this.width = a;
                this.height = e;
                for (this.boxWrapper.animate({
                    width: a,
                    height: e
                }, {
                    step: function() {
                        this.attr({
                            viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
                        });
                    },
                    duration: G(b, !0) ? void 0 : 0
                }); c--; ) A[c].align();
            },
            g: function(a) {
                var e = this.createElement("g");
                return a ? e.attr({
                    "class": "highcharts-" + a
                }) : e;
            },
            image: function(a, e, b, A, c) {
                var p = {
                    preserveAspectRatio: "none"
                };
                1 < arguments.length && w(p, {
                    x: e,
                    y: b,
                    width: A,
                    height: c
                });
                p = this.createElement("image").attr(p);
                p.element.setAttributeNS ? p.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : p.element.setAttribute("hc-svg-href", a);
                return p;
            },
            symbol: function(a, e, b, A, c, p) {
                var f = this, I, d = this.symbols[a], y = h(e) && d && d(Math.round(e), Math.round(b), A, c, p), l = /^url\((.*?)\)$/, m, D, B = {};
                d ? (I = this.path(y), I.attr("fill", "none"), w(I, {
                    symbolName: a,
                    x: e,
                    y: b,
                    width: A,
                    height: c
                }), p && w(I, p)) : l.test(a) && (m = a.match(l)[1], I = this.image(m), I.imgwidth = G(B[m] && B[m].width, p && p.width),
                    I.imgheight = G(B[m] && B[m].height, p && p.height), D = function() {
                    I.attr({
                        width: I.width,
                        height: I.height
                    });
                }, q([ "width", "height" ], function(a) {
                    I[a + "Setter"] = function(a, e) {
                        var b = {}, A = this["img" + e];
                        this[e] = a;
                        h(A) && (this.element && this.element.setAttribute(e, A), this.alignByTranslate || (b["width" === e ? "translateX" : "translateY"] = (this[e] - A) / 2,
                            this.attr(b)));
                    };
                }), h(e) && I.attr({
                    x: e,
                    y: b
                }), I.isImg = !0, h(I.imgwidth) && h(I.imgheight) ? D() : (I.attr({
                    width: 0,
                    height: 0
                }), t("img", {
                    onload: function() {
                        var a = n[f.chartIndex];
                        0 === this.width && (r(this, {
                            position: "absolute",
                            top: "-999em"
                        }), g.body.appendChild(this));
                        B[m] = {
                            width: this.width,
                            height: this.height
                        };
                        I.imgwidth = this.width;
                        I.imgheight = this.height;
                        I.element && D();
                        this.parentNode && this.parentNode.removeChild(this);
                        f.imgCount--;
                        if (!f.imgCount && a && a.onload) a.onload();
                    },
                    src: m
                }), this.imgCount++));
                return I;
            },
            symbols: {
                circle: function(a, e, b, A) {
                    var c = .166 * b;
                    return [ "M", a + b / 2, e, "C", a + b + c, e, a + b + c, e + A, a + b / 2, e + A, "C", a - c, e + A, a - c, e, a + b / 2, e, "Z" ];
                },
                square: function(a, e, b, A) {
                    return [ "M", a, e, "L", a + b, e, a + b, e + A, a, e + A, "Z" ];
                },
                triangle: function(a, e, b, A) {
                    return [ "M", a + b / 2, e, "L", a + b, e + A, a, e + A, "Z" ];
                },
                "triangle-down": function(a, e, b, A) {
                    return [ "M", a, e, "L", a + b, e, a + b / 2, e + A, "Z" ];
                },
                diamond: function(a, e, b, A) {
                    return [ "M", a + b / 2, e, "L", a + b, e + A / 2, a + b / 2, e + A, a, e + A / 2, "Z" ];
                },
                arc: function(a, e, b, A, c) {
                    var p = c.start;
                    b = c.r || b || A;
                    var I = c.end - .001;
                    A = c.innerR;
                    var f = c.open, d = Math.cos(p), y = Math.sin(p), m = Math.cos(I), I = Math.sin(I);
                    c = c.end - p < Math.PI ? 0 : 1;
                    return [ "M", a + b * d, e + b * y, "A", b, b, 0, c, 1, a + b * m, e + b * I, f ? "M" : "L", a + A * m, e + A * I, "A", A, A, 0, c, 0, a + A * d, e + A * y, f ? "" : "Z" ];
                },
                callout: function(a, e, b, A, c) {
                    var p = Math.min(c && c.r || 0, b, A), I = p + 6, f = c && c.anchorX;
                    c = c && c.anchorY;
                    var d;
                    d = [ "M", a + p, e, "L", a + b - p, e, "C", a + b, e, a + b, e, a + b, e + p, "L", a + b, e + A - p, "C", a + b, e + A, a + b, e + A, a + b - p, e + A, "L", a + p, e + A, "C", a, e + A, a, e + A, a, e + A - p, "L", a, e + p, "C", a, e, a, e, a + p, e ];
                    f && f > b && c > e + I && c < e + A - I ? d.splice(13, 3, "L", a + b, c - 6, a + b + 6, c, a + b, c + 6, a + b, e + A - p) : f && 0 > f && c > e + I && c < e + A - I ? d.splice(33, 3, "L", a, c + 6, a - 6, c, a, c - 6, a, e + p) : c && c > A && f > a + I && f < a + b - I ? d.splice(23, 3, "L", f + 6, e + A, f, e + A + 6, f - 6, e + A, a + p, e + A) : c && 0 > c && f > a + I && f < a + b - I && d.splice(3, 3, "L", f - 6, e, f, e - 6, f + 6, e, b - p, e);
                    return d;
                }
            },
            clipRect: function(e, b, A, c) {
                var p = "highcharts-" + a.idCounter++, I = this.createElement("clipPath").attr({
                    id: p
                }).add(this.defs);
                e = this.rect(e, b, A, c, 0).add(I);
                e.id = p;
                e.clipPath = I;
                e.count = 0;
                return e;
            },
            text: function(a, e, b, c) {
                var p = !A && this.forExport, I = {};
                if (c && (this.allowHTML || !this.forExport)) return this.html(a, e, b);
                I.x = Math.round(e || 0);
                b && (I.y = Math.round(b));
                if (a || 0 === a) I.text = a;
                a = this.createElement("text").attr(I);
                p && a.css({
                    position: "absolute"
                });
                c || (a.xSetter = function(a, e, b) {
                    var A = b.getElementsByTagName("tspan"), c, p = b.getAttribute(e), I;
                    for (I = 0; I < A.length; I++) c = A[I], c.getAttribute(e) === p && c.setAttribute(e, a);
                    b.setAttribute(e, a);
                });
                return a;
            },
            fontMetrics: function(a, e) {
                var b;
                a = a || this.style && this.style.fontSize;
                a = /px/.test(a) ? y(a) : /em/.test(a) ? 12 * parseFloat(a) : 12;
                b = 24 > a ? a + 3 : Math.round(1.2 * a);
                return {
                    h: b,
                    b: Math.round(.8 * b),
                    f: a
                };
            },
            rotCorr: function(a, e, b) {
                var A = a;
                e && b && (A = Math.max(A * Math.cos(e * u), 4));
                return {
                    x: -a / 3 * Math.sin(e * u),
                    y: A
                };
            },
            label: function(a, e, b, A, c, p, I, f, d) {
                var y = this, m = y.g("button" !== d && "label"), l = m.text = y.text("", 0, 0, I).attr({
                    zIndex: 1
                }), D, B, g = 0, G = 3, K = 0, u, M, k, t, L, n = {}, r, v, z = /^url\((.*?)\)$/.test(A), E = z, H, J, X, V;
                d && m.addClass("highcharts-" + d);
                E = z;
                H = function() {
                    return (r || 0) % 2 / 2;
                };
                J = function() {
                    var a = l.element.style, e = {};
                    B = (void 0 === u || void 0 === M || L) && h(l.textStr) && l.getBBox();
                    m.width = (u || B.width || 0) + 2 * G + K;
                    m.height = (M || B.height || 0) + 2 * G;
                    v = G + y.fontMetrics(a && a.fontSize, l).b;
                    E && (D || (m.box = D = y.symbols[A] || z ? y.symbol(A) : y.rect(), D.addClass(("button" === d ? "" : "highcharts-label-box") + (d ? " highcharts-" + d + "-box" : "")),
                        D.add(m), a = H(), e.x = a, e.y = (f ? -v : 0) + a), e.width = Math.round(m.width),
                        e.height = Math.round(m.height), D.attr(w(e, n)), n = {});
                };
                X = function() {
                    var a = K + G, e;
                    e = f ? 0 : v;
                    h(u) && B && ("center" === L || "right" === L) && (a += {
                        center: .5,
                        right: 1
                    }[L] * (u - B.width));
                    if (a !== l.x || e !== l.y) l.attr("x", a), void 0 !== e && l.attr("y", e);
                    l.x = a;
                    l.y = e;
                };
                V = function(a, e) {
                    D ? D.attr(a, e) : n[a] = e;
                };
                m.onAdd = function() {
                    l.add(m);
                    m.attr({
                        text: a || 0 === a ? a : "",
                        x: e,
                        y: b
                    });
                    D && h(c) && m.attr({
                        anchorX: c,
                        anchorY: p
                    });
                };
                m.widthSetter = function(a) {
                    u = a;
                };
                m.heightSetter = function(a) {
                    M = a;
                };
                m["text-alignSetter"] = function(a) {
                    L = a;
                };
                m.paddingSetter = function(a) {
                    h(a) && a !== G && (G = m.padding = a, X());
                };
                m.paddingLeftSetter = function(a) {
                    h(a) && a !== K && (K = a, X());
                };
                m.alignSetter = function(a) {
                    a = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[a];
                    a !== g && (g = a, B && m.attr({
                        x: k
                    }));
                };
                m.textSetter = function(a) {
                    void 0 !== a && l.textSetter(a);
                    J();
                    X();
                };
                m["stroke-widthSetter"] = function(a, e) {
                    a && (E = !0);
                    r = this["stroke-width"] = a;
                    V(e, a);
                };
                m.strokeSetter = m.fillSetter = m.rSetter = function(a, e) {
                    "fill" === e && a && (E = !0);
                    V(e, a);
                };
                m.anchorXSetter = function(a, e) {
                    c = a;
                    V(e, Math.round(a) - H() - k);
                };
                m.anchorYSetter = function(a, e) {
                    p = a;
                    V(e, a - t);
                };
                m.xSetter = function(a) {
                    m.x = a;
                    g && (a -= g * ((u || B.width) + 2 * G));
                    k = Math.round(a);
                    m.attr("translateX", k);
                };
                m.ySetter = function(a) {
                    t = m.y = Math.round(a);
                    m.attr("translateY", t);
                };
                var ca = m.css;
                return w(m, {
                    css: function(a) {
                        if (a) {
                            var e = {};
                            a = x(a);
                            q(m.textProps, function(b) {
                                void 0 !== a[b] && (e[b] = a[b], delete a[b]);
                            });
                            l.css(e);
                        }
                        return ca.call(m, a);
                    },
                    getBBox: function() {
                        return {
                            width: B.width + 2 * G,
                            height: B.height + 2 * G,
                            x: B.x - G,
                            y: B.y - G
                        };
                    },
                    shadow: function(a) {
                        a && (J(), D && D.shadow(a));
                        return m;
                    },
                    destroy: function() {
                        F(m.element, "mouseenter");
                        F(m.element, "mouseleave");
                        l && (l = l.destroy());
                        D && (D = D.destroy());
                        C.prototype.destroy.call(m);
                        m = y = J = X = V = null;
                    }
                });
            }
        };
        a.Renderer = z;
    })(J);
    (function(a) {
        var C = a.attr, z = a.createElement, E = a.css, H = a.defined, v = a.each, n = a.extend, k = a.isFirefox, r = a.isMS, t = a.isWebKit, h = a.pInt, u = a.SVGRenderer, d = a.win, g = a.wrap;
        n(a.SVGElement.prototype, {
            htmlCss: function(a) {
                var d = this.element;
                if (d = a && "SPAN" === d.tagName && a.width) delete a.width, this.textWidth = d,
                    this.updateTransform();
                a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");
                this.styles = n(this.styles, a);
                E(this.element, a);
                return this;
            },
            htmlGetBBox: function() {
                var a = this.element;
                "text" === a.nodeName && (a.style.position = "absolute");
                return {
                    x: a.offsetLeft,
                    y: a.offsetTop,
                    width: a.offsetWidth,
                    height: a.offsetHeight
                };
            },
            htmlUpdateTransform: function() {
                if (this.added) {
                    var a = this.renderer, d = this.element, l = this.translateX || 0, f = this.translateY || 0, b = this.x || 0, c = this.y || 0, m = this.textAlign || "left", e = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[m], D = this.styles;
                    E(d, {
                        marginLeft: l,
                        marginTop: f
                    });
                    this.shadows && v(this.shadows, function(a) {
                        E(a, {
                            marginLeft: l + 1,
                            marginTop: f + 1
                        });
                    });
                    this.inverted && v(d.childNodes, function(e) {
                        a.invertChild(e, d);
                    });
                    if ("SPAN" === d.tagName) {
                        var p = this.rotation, B = h(this.textWidth), x = D && D.whiteSpace, g = [ p, m, d.innerHTML, this.textWidth, this.textAlign ].join();
                        g !== this.cTT && (D = a.fontMetrics(d.style.fontSize).b, H(p) && this.setSpanRotation(p, e, D),
                            E(d, {
                                width: "",
                                whiteSpace: x || "nowrap"
                            }), d.offsetWidth > B && /[ \-]/.test(d.textContent || d.innerText) && E(d, {
                            width: B + "px",
                            display: "block",
                            whiteSpace: x || "normal"
                        }), this.getSpanCorrection(d.offsetWidth, D, e, p, m));
                        E(d, {
                            left: b + (this.xCorr || 0) + "px",
                            top: c + (this.yCorr || 0) + "px"
                        });
                        t && (D = d.offsetHeight);
                        this.cTT = g;
                    }
                } else this.alignOnAdd = !0;
            },
            setSpanRotation: function(a, g, l) {
                var f = {}, b = r ? "-ms-transform" : t ? "-webkit-transform" : k ? "MozTransform" : d.opera ? "-o-transform" : "";
                f[b] = f.transform = "rotate(" + a + "deg)";
                f[b + (k ? "Origin" : "-origin")] = f.transformOrigin = 100 * g + "% " + l + "px";
                E(this.element, f);
            },
            getSpanCorrection: function(a, d, l) {
                this.xCorr = -a * l;
                this.yCorr = -d;
            }
        });
        n(u.prototype, {
            html: function(a, d, l) {
                var f = this.createElement("span"), b = f.element, c = f.renderer, m = c.isSVG, e = function(a, e) {
                    v([ "display", "opacity", "visibility" ], function(b) {
                        g(a, b + "Setter", function(a, b, c, f) {
                            a.call(this, b, c, f);
                            e[c] = b;
                        });
                    });
                };
                f.textSetter = function(a) {
                    a !== b.innerHTML && delete this.bBox;
                    b.innerHTML = this.textStr = a;
                    f.htmlUpdateTransform();
                };
                m && e(f, f.element.style);
                f.xSetter = f.ySetter = f.alignSetter = f.rotationSetter = function(a, e) {
                    "align" === e && (e = "textAlign");
                    f[e] = a;
                    f.htmlUpdateTransform();
                };
                f.attr({
                    text: a,
                    x: Math.round(d),
                    y: Math.round(l)
                }).css({
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize,
                    position: "absolute"
                });
                b.style.whiteSpace = "nowrap";
                f.css = f.htmlCss;
                m && (f.add = function(a) {
                    var p, d = c.box.parentNode, m = [];
                    if (this.parentGroup = a) {
                        if (p = a.div, !p) {
                            for (;a; ) m.push(a), a = a.parentGroup;
                            v(m.reverse(), function(a) {
                                var b, c = C(a.element, "class");
                                c && (c = {
                                    className: c
                                });
                                p = a.div = a.div || z("div", c, {
                                    position: "absolute",
                                    left: (a.translateX || 0) + "px",
                                    top: (a.translateY || 0) + "px",
                                    display: a.display,
                                    opacity: a.opacity,
                                    pointerEvents: a.styles && a.styles.pointerEvents
                                }, p || d);
                                b = p.style;
                                n(a, {
                                    translateXSetter: function(e, c) {
                                        b.left = e + "px";
                                        a[c] = e;
                                        a.doTransform = !0;
                                    },
                                    translateYSetter: function(e, c) {
                                        b.top = e + "px";
                                        a[c] = e;
                                        a.doTransform = !0;
                                    }
                                });
                                e(a, b);
                            });
                        }
                    } else p = d;
                    p.appendChild(b);
                    f.added = !0;
                    f.alignOnAdd && f.htmlUpdateTransform();
                    return f;
                });
                return f;
            }
        });
    })(J);
    (function(a) {
        var C, z, E = a.createElement, H = a.css, v = a.defined, n = a.deg2rad, k = a.discardElement, r = a.doc, t = a.each, h = a.erase, u = a.extend;
        C = a.extendClass;
        var d = a.isArray, g = a.isNumber, q = a.isObject, w = a.merge;
        z = a.noop;
        var l = a.pick, f = a.pInt, b = a.SVGElement, c = a.SVGRenderer, m = a.win;
        a.svg || (z = {
            docMode8: r && 8 === r.documentMode,
            init: function(a, b) {
                var c = [ "<", b, ' filled="f" stroked="f"' ], f = [ "position: ", "absolute", ";" ], d = "div" === b;
                ("shape" === b || d) && f.push("left:0;top:0;width:1px;height:1px;");
                f.push("visibility: ", d ? "hidden" : "visible");
                c.push(' style="', f.join(""), '"/>');
                b && (c = d || "span" === b || "img" === b ? c.join("") : a.prepVML(c), this.element = E(c));
                this.renderer = a;
            },
            add: function(a) {
                var b = this.renderer, c = this.element, f = b.box, d = a && a.inverted, f = a ? a.element || a : f;
                a && (this.parentGroup = a);
                d && b.invertChild(c, f);
                f.appendChild(c);
                this.added = !0;
                this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform();
                if (this.onAdd) this.onAdd();
                this.className && this.attr("class", this.className);
                return this;
            },
            updateTransform: b.prototype.htmlUpdateTransform,
            setSpanRotation: function() {
                var a = this.rotation, b = Math.cos(a * n), c = Math.sin(a * n);
                H(this.element, {
                    filter: a ? [ "progid:DXImageTransform.Microsoft.Matrix(M11=", b, ", M12=", -c, ", M21=", c, ", M22=", b, ", sizingMethod='auto expand')" ].join("") : "none"
                });
            },
            getSpanCorrection: function(a, b, c, f, d) {
                var m = f ? Math.cos(f * n) : 1, q = f ? Math.sin(f * n) : 0, y = l(this.elemHeight, this.element.offsetHeight), F;
                this.xCorr = 0 > m && -a;
                this.yCorr = 0 > q && -y;
                F = 0 > m * q;
                this.xCorr += q * b * (F ? 1 - c : c);
                this.yCorr -= m * b * (f ? F ? c : 1 - c : 1);
                d && "left" !== d && (this.xCorr -= a * c * (0 > m ? -1 : 1), f && (this.yCorr -= y * c * (0 > q ? -1 : 1)),
                    H(this.element, {
                        textAlign: d
                    }));
            },
            pathToVML: function(a) {
                for (var b = a.length, c = []; b--; ) g(a[b]) ? c[b] = Math.round(10 * a[b]) - 5 : "Z" === a[b] ? c[b] = "x" : (c[b] = a[b],
                    !a.isArc || "wa" !== a[b] && "at" !== a[b] || (c[b + 5] === c[b + 7] && (c[b + 7] += a[b + 7] > a[b + 5] ? 1 : -1),
                    c[b + 6] === c[b + 8] && (c[b + 8] += a[b + 8] > a[b + 6] ? 1 : -1)));
                return c.join(" ") || "x";
            },
            clip: function(a) {
                var b = this, c;
                a ? (c = a.members, h(c, b), c.push(b), b.destroyClip = function() {
                    h(c, b);
                }, a = a.getCSS(b)) : (b.destroyClip && b.destroyClip(), a = {
                    clip: b.docMode8 ? "inherit" : "rect(auto)"
                });
                return b.css(a);
            },
            css: b.prototype.htmlCss,
            safeRemoveChild: function(a) {
                a.parentNode && k(a);
            },
            destroy: function() {
                this.destroyClip && this.destroyClip();
                return b.prototype.destroy.apply(this);
            },
            on: function(a, b) {
                this.element["on" + a] = function() {
                    var a = m.event;
                    a.target = a.srcElement;
                    b(a);
                };
                return this;
            },
            cutOffPath: function(a, b) {
                var c;
                a = a.split(/[ ,]/);
                c = a.length;
                if (9 === c || 11 === c) a[c - 4] = a[c - 2] = f(a[c - 2]) - 10 * b;
                return a.join(" ");
            },
            shadow: function(a, b, c) {
                var d = [], m, q = this.element, g = this.renderer, y, F = q.style, h, A = q.path, I, w, u, k;
                A && "string" !== typeof A.value && (A = "x");
                w = A;
                if (a) {
                    u = l(a.width, 3);
                    k = (a.opacity || .15) / u;
                    for (m = 1; 3 >= m; m++) I = 2 * u + 1 - 2 * m, c && (w = this.cutOffPath(A.value, I + .5)),
                        h = [ '<shape isShadow="true" strokeweight="', I, '" filled="false" path="', w, '" coordsize="10 10" style="', q.style.cssText, '" />' ],
                        y = E(g.prepVML(h), null, {
                            left: f(F.left) + l(a.offsetX, 1),
                            top: f(F.top) + l(a.offsetY, 1)
                        }), c && (y.cutOff = I + 1), h = [ '<stroke color="', a.color || "#000000", '" opacity="', k * m, '"/>' ],
                        E(g.prepVML(h), null, null, y), b ? b.element.appendChild(y) : q.parentNode.insertBefore(y, q),
                        d.push(y);
                    this.shadows = d;
                }
                return this;
            },
            updateShadows: z,
            setAttr: function(a, b) {
                this.docMode8 ? this.element[a] = b : this.element.setAttribute(a, b);
            },
            classSetter: function(a) {
                (this.added ? this.element : this).className = a;
            },
            dashstyleSetter: function(a, b, c) {
                (c.getElementsByTagName("stroke")[0] || E(this.renderer.prepVML([ "<stroke/>" ]), null, null, c))[b] = a || "solid";
                this[b] = a;
            },
            dSetter: function(a, b, c) {
                var f = this.shadows;
                a = a || [];
                this.d = a.join && a.join(" ");
                c.path = a = this.pathToVML(a);
                if (f) for (c = f.length; c--; ) f[c].path = f[c].cutOff ? this.cutOffPath(a, f[c].cutOff) : a;
                this.setAttr(b, a);
            },
            fillSetter: function(a, b, c) {
                var f = c.nodeName;
                "SPAN" === f ? c.style.color = a : "IMG" !== f && (c.filled = "none" !== a, this.setAttr("fillcolor", this.renderer.color(a, c, b, this)));
            },
            "fill-opacitySetter": function(a, b, c) {
                E(this.renderer.prepVML([ "<", b.split("-")[0], ' opacity="', a, '"/>' ]), null, null, c);
            },
            opacitySetter: z,
            rotationSetter: function(a, b, c) {
                c = c.style;
                this[b] = c[b] = a;
                c.left = -Math.round(Math.sin(a * n) + 1) + "px";
                c.top = Math.round(Math.cos(a * n)) + "px";
            },
            strokeSetter: function(a, b, c) {
                this.setAttr("strokecolor", this.renderer.color(a, c, b, this));
            },
            "stroke-widthSetter": function(a, b, c) {
                c.stroked = !!a;
                this[b] = a;
                g(a) && (a += "px");
                this.setAttr("strokeweight", a);
            },
            titleSetter: function(a, b) {
                this.setAttr(b, a);
            },
            visibilitySetter: function(a, b, c) {
                "inherit" === a && (a = "visible");
                this.shadows && t(this.shadows, function(c) {
                    c.style[b] = a;
                });
                "DIV" === c.nodeName && (a = "hidden" === a ? "-999em" : 0, this.docMode8 || (c.style[b] = a ? "visible" : "hidden"),
                    b = "top");
                c.style[b] = a;
            },
            displaySetter: function(a, b, c) {
                c.style[b] = a;
            },
            xSetter: function(a, b, c) {
                this[b] = a;
                "x" === b ? b = "left" : "y" === b && (b = "top");
                this.updateClipping ? (this[b] = a, this.updateClipping()) : c.style[b] = a;
            },
            zIndexSetter: function(a, b, c) {
                c.style[b] = a;
            }
        }, z["stroke-opacitySetter"] = z["fill-opacitySetter"], a.VMLElement = z = C(b, z),
            z.prototype.ySetter = z.prototype.widthSetter = z.prototype.heightSetter = z.prototype.xSetter,
            z = {
                Element: z,
                isIE8: -1 < m.navigator.userAgent.indexOf("MSIE 8.0"),
                init: function(a, b, c) {
                    var f, d;
                    this.alignedObjects = [];
                    f = this.createElement("div").css({
                        position: "relative"
                    });
                    d = f.element;
                    a.appendChild(f.element);
                    this.isVML = !0;
                    this.box = d;
                    this.boxWrapper = f;
                    this.gradients = {};
                    this.cache = {};
                    this.cacheKeys = [];
                    this.imgCount = 0;
                    this.setSize(b, c, !1);
                    if (!r.namespaces.hcv) {
                        r.namespaces.add("hcv", "urn:schemas-microsoft-com:vml");
                        try {
                            r.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } ";
                        } catch (m) {
                            r.styleSheets[0].cssText += "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } ";
                        }
                    }
                },
                isHidden: function() {
                    return !this.box.offsetWidth;
                },
                clipRect: function(a, b, c, f) {
                    var d = this.createElement(), m = q(a);
                    return u(d, {
                        members: [],
                        count: 0,
                        left: (m ? a.x : a) + 1,
                        top: (m ? a.y : b) + 1,
                        width: (m ? a.width : c) - 1,
                        height: (m ? a.height : f) - 1,
                        getCSS: function(a) {
                            var b = a.element, e = b.nodeName, c = a.inverted, A = this.top - ("shape" === e ? b.offsetTop : 0), f = this.left, b = f + this.width, d = A + this.height, A = {
                                clip: "rect(" + Math.round(c ? f : A) + "px," + Math.round(c ? d : b) + "px," + Math.round(c ? b : d) + "px," + Math.round(c ? A : f) + "px)"
                            };
                            !c && a.docMode8 && "DIV" === e && u(A, {
                                width: b + "px",
                                height: d + "px"
                            });
                            return A;
                        },
                        updateClipping: function() {
                            t(d.members, function(a) {
                                a.element && a.css(d.getCSS(a));
                            });
                        }
                    });
                },
                color: function(b, c, f, d) {
                    var m = this, l, q = /^rgba/, y, F, g = "none";
                    b && b.linearGradient ? F = "gradient" : b && b.radialGradient && (F = "pattern");
                    if (F) {
                        var A, I, h = b.linearGradient || b.radialGradient, w, u, k, n, r, P = "";
                        b = b.stops;
                        var v, R = [], z = function() {
                            y = [ '<fill colors="' + R.join(",") + '" opacity="', k, '" o:opacity2="', u, '" type="', F, '" ', P, 'focus="100%" method="any" />' ];
                            E(m.prepVML(y), null, null, c);
                        };
                        w = b[0];
                        v = b[b.length - 1];
                        0 < w[0] && b.unshift([ 0, w[1] ]);
                        1 > v[0] && b.push([ 1, v[1] ]);
                        t(b, function(b, c) {
                            q.test(b[1]) ? (l = a.color(b[1]), A = l.get("rgb"), I = l.get("a")) : (A = b[1],
                                I = 1);
                            R.push(100 * b[0] + "% " + A);
                            c ? (k = I, n = A) : (u = I, r = A);
                        });
                        if ("fill" === f) if ("gradient" === F) f = h.x1 || h[0] || 0, b = h.y1 || h[1] || 0,
                            w = h.x2 || h[2] || 0, h = h.y2 || h[3] || 0, P = 'angle="' + (90 - 180 * Math.atan((h - b) / (w - f)) / Math.PI) + '"',
                            z(); else {
                            var g = h.r, C = 2 * g, H = 2 * g, Z = h.cx, aa = h.cy, W = c.radialReference, U, g = function() {
                                W && (U = d.getBBox(), Z += (W[0] - U.x) / U.width - .5, aa += (W[1] - U.y) / U.height - .5,
                                    C *= W[2] / U.width, H *= W[2] / U.height);
                                P = 'src="' + a.getOptions().global.VMLRadialGradientURL + '" size="' + C + "," + H + '" origin="0.5,0.5" position="' + Z + "," + aa + '" color2="' + r + '" ';
                                z();
                            };
                            d.added ? g() : d.onAdd = g;
                            g = n;
                        } else g = A;
                    } else q.test(b) && "IMG" !== c.tagName ? (l = a.color(b), d[f + "-opacitySetter"](l.get("a"), f, c),
                        g = l.get("rgb")) : (g = c.getElementsByTagName(f), g.length && (g[0].opacity = 1,
                        g[0].type = "solid"), g = b);
                    return g;
                },
                prepVML: function(a) {
                    var b = this.isIE8;
                    a = a.join("");
                    b ? (a = a.replace("/>", ' xmlns="urn:schemas-microsoft-com:vml" />'), a = -1 === a.indexOf('style="') ? a.replace("/>", ' style="display:inline-block;behavior:url(#default#VML);" />') : a.replace('style="', 'style="display:inline-block;behavior:url(#default#VML);')) : a = a.replace("<", "<hcv:");
                    return a;
                },
                text: c.prototype.html,
                path: function(a) {
                    var b = {
                        coordsize: "10 10"
                    };
                    d(a) ? b.d = a : q(a) && u(b, a);
                    return this.createElement("shape").attr(b);
                },
                circle: function(a, b, c) {
                    var f = this.symbol("circle");
                    q(a) && (c = a.r, b = a.y, a = a.x);
                    f.isCircle = !0;
                    f.r = c;
                    return f.attr({
                        x: a,
                        y: b
                    });
                },
                g: function(a) {
                    var b;
                    a && (b = {
                        className: "highcharts-" + a,
                        "class": "highcharts-" + a
                    });
                    return this.createElement("div").attr(b);
                },
                image: function(a, b, c, f, d) {
                    var m = this.createElement("img").attr({
                        src: a
                    });
                    1 < arguments.length && m.attr({
                        x: b,
                        y: c,
                        width: f,
                        height: d
                    });
                    return m;
                },
                createElement: function(a) {
                    return "rect" === a ? this.symbol(a) : c.prototype.createElement.call(this, a);
                },
                invertChild: function(a, b) {
                    var c = this, d = b.style, m = "IMG" === a.tagName && a.style;
                    H(a, {
                        flip: "x",
                        left: f(d.width) - (m ? f(m.top) : 1),
                        top: f(d.height) - (m ? f(m.left) : 1),
                        rotation: -90
                    });
                    t(a.childNodes, function(b) {
                        c.invertChild(b, a);
                    });
                },
                symbols: {
                    arc: function(a, b, c, f, d) {
                        var m = d.start, l = d.end, y = d.r || c || f;
                        c = d.innerR;
                        f = Math.cos(m);
                        var F = Math.sin(m), g = Math.cos(l), A = Math.sin(l);
                        if (0 === l - m) return [ "x" ];
                        m = [ "wa", a - y, b - y, a + y, b + y, a + y * f, b + y * F, a + y * g, b + y * A ];
                        d.open && !c && m.push("e", "M", a, b);
                        m.push("at", a - c, b - c, a + c, b + c, a + c * g, b + c * A, a + c * f, b + c * F, "x", "e");
                        m.isArc = !0;
                        return m;
                    },
                    circle: function(a, b, c, f, d) {
                        d && v(d.r) && (c = f = 2 * d.r);
                        d && d.isCircle && (a -= c / 2, b -= f / 2);
                        return [ "wa", a, b, a + c, b + f, a + c, b + f / 2, a + c, b + f / 2, "e" ];
                    },
                    rect: function(a, b, f, d, m) {
                        return c.prototype.symbols[v(m) && m.r ? "callout" : "square"].call(0, a, b, f, d, m);
                    }
                }
            }, a.VMLRenderer = C = function() {
            this.init.apply(this, arguments);
        }, C.prototype = w(c.prototype, z), a.Renderer = C);
        c.prototype.measureSpanWidth = function(a, b) {
            var c = r.createElement("span"), f;
            f = r.createTextNode(a);
            c.appendChild(f);
            H(c, b);
            this.box.appendChild(c);
            f = c.offsetWidth;
            k(c);
            return f;
        };
    })(J);
    (function(a) {
        function C() {
            var r = a.defaultOptions.global, t, h = r.useUTC, u = h ? "getUTC" : "get", d = h ? "setUTC" : "set";
            a.Date = t = r.Date || k.Date;
            t.hcTimezoneOffset = h && r.timezoneOffset;
            t.hcGetTimezoneOffset = h && r.getTimezoneOffset;
            t.hcMakeTime = function(a, d, w, l, f, b) {
                var c;
                h ? (c = t.UTC.apply(0, arguments), c += H(c)) : c = new t(a, d, n(w, 1), n(l, 0), n(f, 0), n(b, 0)).getTime();
                return c;
            };
            E("Minutes Hours Day Date Month FullYear".split(" "), function(a) {
                t["hcGet" + a] = u + a;
            });
            E("Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "), function(a) {
                t["hcSet" + a] = d + a;
            });
        }
        var z = a.color, E = a.each, H = a.getTZOffset, v = a.merge, n = a.pick, k = a.win;
        a.defaultOptions = {
        		colors: "#7cb5ec #0cf49b #6ba583 #b52cc5 #64ae0b #ff6600 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
            symbols: [ "circle", "diamond", "square", "triangle", "triangle-down" ],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "1月 2月 3月 4月 5月 6月 7月 8月 9月 10月 11月 12月".split(" "),
                weekdays: "周一 周二  周三 周四 周五 周六 周天".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {
                useUTC: !0,
                VMLRadialGradientURL: "http://code.highcharts.com@product.cdnpath@/5.0.0/gfx/vml-radial-gradient.png"
            },
            chart: {
                borderRadius: 0,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [ 10, 10, 15, 10 ],
                resetZoomButton: {
                    theme: {
                        zIndex: 20
                    },
                    position: {
                        align: "right",
                        x: -10,
                        y: 10
                    }
                },
                width: null,
                height: null,
                borderColor: "#335cad",
                backgroundColor: "#ffffff",
                plotBorderColor: "#cccccc"
            },
            title: {
                text: "Chart title",
                align: "center",
                margin: 15,
                style: {
                    color: "#333333",
                    fontSize: "18px"
                },
                widthAdjust: -44
            },
            subtitle: {
                text: "",
                align: "center",
                style: {
                    color: "#666666"
                },
                widthAdjust: -44
            },
            plotOptions: {},
            labels: {
                style: {
                    position: "absolute",
                    color: "#333333"
                }
            },
            legend: {
                enabled: !0,
                align: "center",
                layout: "horizontal",
                labelFormatter: function() {
                    return this.name;
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {
                    activeColor: "#003399",
                    inactiveColor: "#cccccc"
                },
                itemStyle: {
                    color: "#333333",
                    fontSize: "12px",
                    fontWeight: "bold"
                },
                itemHoverStyle: {
                    color: "#000000"
                },
                itemHiddenStyle: {
                    color: "#cccccc"
                },
                shadow: !1,
                itemCheckboxStyle: {
                    position: "absolute",
                    width: "13px",
                    height: "13px"
                },
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {
                    style: {
                        fontWeight: "bold"
                    }
                }
            },
            loading: {
                labelStyle: {
                    fontWeight: "bold",
                    position: "relative",
                    top: "45%"
                },
                style: {
                    position: "absolute",
                    backgroundColor: "#ffffff",
                    opacity: .5,
                    textAlign: "center"
                }
            },
            tooltip: {
                enabled: !0,
                animation: a.svg,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: a.isTouchDevice ? 25 : 10,
                backgroundColor: z("#f7f7f7").setOpacity(.85).get(),
                borderWidth: 1,
                headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
                pointFormat: '{series.name}: <b>{point.y}</b><br/>',
                shadow: !0,
                style: {
                    color: "#333333",
                    cursor: "default",
                    fontSize: "12px",
                    pointerEvents: "none",
                    whiteSpace: "nowrap"
                }
            },
            credits: {
                enabled: !0,
                href: "",
                position: {
                    align: "right",
                    x: -10,
                    verticalAlign: "bottom",
                    y: -5
                },
                style: {
                    cursor: "pointer",
                    color: "#999999",
                    fontSize: "9px"
                },
                text: ""
            }
        };
        a.setOptions = function(k) {
            a.defaultOptions = v(!0, a.defaultOptions, k);
            C();
            return a.defaultOptions;
        };
        a.getOptions = function() {
            return a.defaultOptions;
        };
        a.defaultPlotOptions = a.defaultOptions.plotOptions;
        C();
    })(J);
    (function(a) {
        var C = a.arrayMax, z = a.arrayMin, E = a.defined, H = a.destroyObjectProperties, v = a.each, n = a.erase, k = a.merge, r = a.pick;
        a.PlotLineOrBand = function(a, h) {
            this.axis = a;
            h && (this.options = h, this.id = h.id);
        };
        a.PlotLineOrBand.prototype = {
            render: function() {
                var a = this, h = a.axis, u = h.horiz, d = a.options, g = d.label, q = a.label, w = d.to, l = d.from, f = d.value, b = E(l) && E(w), c = E(f), m = a.svgElem, e = !m, D = [], p, B = d.color, x = r(d.zIndex, 0), n = d.events, D = {
                    "class": "highcharts-plot-" + (b ? "band " : "line ") + (d.className || "")
                }, G = {}, y = h.chart.renderer, F = b ? "bands" : "lines", K = h.log2lin;
                h.isLog && (l = K(l), w = K(w), f = K(f));
                c ? (D = {
                    stroke: B,
                    "stroke-width": d.width
                }, d.dashStyle && (D.dashstyle = d.dashStyle)) : b && (B && (D.fill = B), d.borderWidth && (D.stroke = d.borderColor,
                    D["stroke-width"] = d.borderWidth));
                G.zIndex = x;
                F += "-" + x;
                (B = h[F]) || (h[F] = B = y.g("plot-" + F).attr(G).add());
                e && (a.svgElem = m = y.path().attr(D).add(B));
                if (c) D = h.getPlotLinePath(f, m.strokeWidth()); else if (b) D = h.getPlotBandPath(l, w, d); else return;
                if (e && D && D.length) {
                    if (m.attr({
                        d: D
                    }), n) for (p in d = function(b) {
                        m.on(b, function(c) {
                            n[b].apply(a, [ c ]);
                        });
                    }, n) d(p);
                } else m && (D ? (m.show(), m.animate({
                    d: D
                })) : (m.hide(), q && (a.label = q = q.destroy())));
                g && E(g.text) && D && D.length && 0 < h.width && 0 < h.height && !D.flat ? (g = k({
                    align: u && b && "center",
                    x: u ? !b && 4 : 10,
                    verticalAlign: !u && b && "middle",
                    y: u ? b ? 16 : 10 : b ? 6 : -4,
                    rotation: u && !b && 90
                }, g), this.renderLabel(g, D, b, x)) : q && q.hide();
                return a;
            },
            renderLabel: function(a, h, u, d) {
                var g = this.label, q = this.axis.chart.renderer;
                g || (g = {
                    align: a.textAlign || a.align,
                    rotation: a.rotation,
                    "class": "highcharts-plot-" + (u ? "band" : "line") + "-label " + (a.className || "")
                }, g.zIndex = d, this.label = g = q.text(a.text, 0, 0, a.useHTML).attr(g).add(),
                    g.css(a.style));
                d = [ h[1], h[4], u ? h[6] : h[1] ];
                h = [ h[2], h[5], u ? h[7] : h[2] ];
                u = z(d);
                q = z(h);
                g.align(a, !1, {
                    x: u,
                    y: q,
                    width: C(d) - u,
                    height: C(h) - q
                });
                g.show();
            },
            destroy: function() {
                n(this.axis.plotLinesAndBands, this);
                delete this.axis;
                H(this);
            }
        };
        a.AxisPlotLineOrBandExtension = {
            getPlotBandPath: function(a, h) {
                var u = this.getPlotLinePath(h, null, null, !0), d = this.getPlotLinePath(a, null, null, !0);
                d && u ? (d.flat = d.toString() === u.toString(), d.push(u[4], u[5], u[1], u[2])) : d = null;
                return d;
            },
            addPlotBand: function(a) {
                return this.addPlotBandOrLine(a, "plotBands");
            },
            addPlotLine: function(a) {
                return this.addPlotBandOrLine(a, "plotLines");
            },
            addPlotBandOrLine: function(k, h) {
                var u = new a.PlotLineOrBand(this, k).render(), d = this.userOptions;
                u && (h && (d[h] = d[h] || [], d[h].push(k)), this.plotLinesAndBands.push(u));
                return u;
            },
            removePlotBandOrLine: function(a) {
                for (var h = this.plotLinesAndBands, u = this.options, d = this.userOptions, g = h.length; g--; ) h[g].id === a && h[g].destroy();
                v([ u.plotLines || [], d.plotLines || [], u.plotBands || [], d.plotBands || [] ], function(d) {
                    for (g = d.length; g--; ) d[g].id === a && n(d, d[g]);
                });
            }
        };
    })(J);
    (function(a) {
        var C = a.correctFloat, z = a.defined, E = a.destroyObjectProperties, H = a.isNumber, v = a.merge, n = a.pick, k = a.stop, r = a.deg2rad;
        a.Tick = function(a, h, u, d) {
            this.axis = a;
            this.pos = h;
            this.type = u || "";
            this.isNew = !0;
            u || d || this.addLabel();
        };
        a.Tick.prototype = {
            addLabel: function() {
                var a = this.axis, h = a.options, u = a.chart, d = a.categories, g = a.names, q = this.pos, w = h.labels, l = a.tickPositions, f = q === l[0], b = q === l[l.length - 1], g = d ? n(d[q], g[q], q) : q, d = this.label, l = l.info, c;
                a.isDatetimeAxis && l && (c = h.dateTimeLabelFormats[l.higherRanks[q] || l.unitName]);
                this.isFirst = f;
                this.isLast = b;
                h = a.labelFormatter.call({
                    axis: a,
                    chart: u,
                    isFirst: f,
                    isLast: b,
                    dateTimeLabelFormat: c,
                    value: a.isLog ? C(a.lin2log(g)) : g
                });
                z(d) ? d && d.attr({
                    text: h
                }) : (this.labelLength = (this.label = d = z(h) && w.enabled ? u.renderer.text(h, 0, 0, w.useHTML).css(v(w.style)).add(a.labelGroup) : null) && d.getBBox().width,
                    this.rotation = 0);
            },
            getLabelSize: function() {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0;
            },
            handleOverflow: function(a) {
                var h = this.axis, u = a.x, d = h.chart.chartWidth, g = h.chart.spacing, q = n(h.labelLeft, Math.min(h.pos, g[3])), g = n(h.labelRight, Math.max(h.pos + h.len, d - g[1])), w = this.label, l = this.rotation, f = {
                    left: 0,
                    center: .5,
                    right: 1
                }[h.labelAlign], b = w.getBBox().width, c = h.getSlotWidth(), m = c, e = 1, D, p = {};
                if (l) 0 > l && u - f * b < q ? D = Math.round(u / Math.cos(l * r) - q) : 0 < l && u + f * b > g && (D = Math.round((d - u) / Math.cos(l * r))); else if (d = u + (1 - f) * b,
                        u - f * b < q ? m = a.x + m * (1 - f) - q : d > g && (m = g - a.x + m * f, e = -1),
                    m = Math.min(c, m), m < c && "center" === h.labelAlign && (a.x += e * (c - m - f * (c - Math.min(b, m)))),
                    b > m || h.autoRotation && (w.styles || {}).width) D = m;
                D && (p.width = D, (h.options.labels.style || {}).textOverflow || (p.textOverflow = "ellipsis"),
                    w.css(p));
            },
            getPosition: function(a, h, u, d) {
                var g = this.axis, q = g.chart, w = d && q.oldChartHeight || q.chartHeight;
                return {
                    x: a ? g.translate(h + u, null, null, d) + g.transB : g.left + g.offset + (g.opposite ? (d && q.oldChartWidth || q.chartWidth) - g.right - g.left : 0),
                    y: a ? w - g.bottom + g.offset - (g.opposite ? g.height : 0) : w - g.translate(h + u, null, null, d) - g.transB
                };
            },
            getLabelPosition: function(a, h, u, d, g, q, w, l) {
                var f = this.axis, b = f.transA, c = f.reversed, m = f.staggerLines, e = f.tickRotCorr || {
                    x: 0,
                    y: 0
                }, D = g.y;
                z(D) || (D = 0 === f.side ? u.rotation ? -8 : -u.getBBox().height : 2 === f.side ? e.y + 8 : Math.cos(u.rotation * r) * (e.y - u.getBBox(!1, 0).height / 2));
                a = a + g.x + e.x - (q && d ? q * b * (c ? -1 : 1) : 0);
                h = h + D - (q && !d ? q * b * (c ? 1 : -1) : 0);
                m && (u = w / (l || 1) % m, f.opposite && (u = m - u - 1), h += f.labelOffset / m * u);
                return {
                    x: a,
                    y: Math.round(h)
                };
            },
            getMarkPath: function(a, h, u, d, g, q) {
                return q.crispLine([ "M", a, h, "L", a + (g ? 0 : -u), h + (g ? u : 0) ], d);
            },
            render: function(a, h, u) {
                var d = this.axis, g = d.options, q = d.chart.renderer, w = d.horiz, l = this.type, f = this.label, b = this.pos, c = g.labels, m = this.gridLine, e = l ? l + "Tick" : "tick", D = d.tickSize(e), p = this.mark, B = !p, x = c.step, r = {}, G = !0, y = d.tickmarkOffset, F = this.getPosition(w, b, y, h), K = F.x, F = F.y, A = w && K === d.pos + d.len || !w && F === d.pos ? -1 : 1, I = l ? l + "Grid" : "grid", M = g[I + "LineWidth"], N = g[I + "LineColor"], T = g[I + "LineDashStyle"], I = n(g[e + "Width"], !l && d.isXAxis ? 1 : 0), e = g[e + "Color"];
                u = n(u, 1);
                this.isActive = !0;
                m || (r.stroke = N, r["stroke-width"] = M, T && (r.dashstyle = T), l || (r.zIndex = 1),
                    h && (r.opacity = 0), this.gridLine = m = q.path().attr(r).addClass("highcharts-" + (l ? l + "-" : "") + "grid-line").add(d.gridGroup));
                if (!h && m && (b = d.getPlotLinePath(b + y, m.strokeWidth() * A, h, !0))) m[this.isNew ? "attr" : "animate"]({
                    d: b,
                    opacity: u
                });
                D && (d.opposite && (D[0] = -D[0]), B && (this.mark = p = q.path().addClass("highcharts-" + (l ? l + "-" : "") + "tick").add(d.axisGroup),
                    p.attr({
                        stroke: e,
                        "stroke-width": I
                    })), p[B ? "attr" : "animate"]({
                    d: this.getMarkPath(K, F, D[0], p.strokeWidth() * A, w, q),
                    opacity: u
                }));
                f && H(K) && (f.xy = F = this.getLabelPosition(K, F, f, w, c, y, a, x), this.isFirst && !this.isLast && !n(g.showFirstLabel, 1) || this.isLast && !this.isFirst && !n(g.showLastLabel, 1) ? G = !1 : !w || d.isRadial || c.step || c.rotation || h || 0 === u || this.handleOverflow(F),
                    x && a % x && (G = !1), G && H(F.y) ? (F.opacity = u, f[this.isNew ? "attr" : "animate"](F)) : (k(f),
                    f.attr("y", -9999)), this.isNew = !1);
            },
            destroy: function() {
                E(this, this.axis);
            }
        };
    })(J);
    (function(a) {
        var C = a.addEvent, z = a.animObject, E = a.arrayMax, H = a.arrayMin, v = a.AxisPlotLineOrBandExtension, n = a.color, k = a.correctFloat, r = a.defaultOptions, t = a.defined, h = a.deg2rad, u = a.destroyObjectProperties, d = a.each, g = a.error, q = a.extend, w = a.fireEvent, l = a.format, f = a.getMagnitude, b = a.grep, c = a.inArray, m = a.isArray, e = a.isNumber, D = a.isString, p = a.merge, B = a.normalizeTickInterval, x = a.pick, L = a.PlotLineOrBand, G = a.removeEvent, y = a.splat, F = a.syncTimeout, K = a.Tick;
        a.Axis = function() {
            this.init.apply(this, arguments);
        };
        a.Axis.prototype = {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: "%H:%M:%S.%L",
                    second: "%H:%M:%S",
                    minute: "%H:%M",
                    hour: "%H:%M",
                    day: "%e. %b",
                    week: "%e. %b",
                    month: "%b '%y",
                    year: "%Y"
                },
                endOnTick: !1,
                labels: {
                    enabled: !0,
                    style: {
                        color: "#666666",
                        cursor: "default",
                        fontSize: "11px"
                    },
                    x: 0
                },
                minPadding: .01,
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickmarkPlacement: "between",
                tickPixelInterval: 100,
                tickPosition: "outside",
                title: {
                    align: "middle",
                    style: {
                        color: "#666666"
                    }
                },
                type: "linear",
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                tickColor: "#ccd6eb"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {
                    x: -8
                },
                maxPadding: .05,
                minPadding: .05,
                startOnTick: !0,
                title: {
                    rotation: 270,
                    text: "Values"
                },
                stackLabels: {
                    enabled: !1,
                    formatter: function() {
                        return a.numberFormat(this.total, -1);
                    },
                    style: {
                        fontSize: "11px",
                        fontWeight: "bold",
                        color: "#000000",
                        textShadow: "1px 1px contrast, -1px -1px contrast, -1px 1px contrast, 1px -1px contrast"
                    }
                },
                gridLineWidth: 1,
                lineWidth: 0
            },
            defaultLeftAxisOptions: {
                labels: {
                    x: -15
                },
                title: {
                    rotation: 270
                }
            },
            defaultRightAxisOptions: {
                labels: {
                    x: 15
                },
                title: {
                    rotation: 90
                }
            },
            defaultBottomAxisOptions: {
                labels: {
                    autoRotation: [ -45 ],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            defaultTopAxisOptions: {
                labels: {
                    autoRotation: [ -45 ],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            init: function(a, b) {
                var e = b.isX;
                this.chart = a;
                this.horiz = a.inverted ? !e : e;
                this.isXAxis = e;
                this.coll = this.coll || (e ? "xAxis" : "yAxis");
                this.opposite = b.opposite;
                this.side = b.side || (this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3);
                this.setOptions(b);
                var f = this.options, d = f.type;
                this.labelFormatter = f.labels.formatter || this.defaultLabelFormatter;
                this.userOptions = b;
                this.minPixelPadding = 0;
                this.reversed = f.reversed;
                this.visible = !1 !== f.visible;
                this.zoomEnabled = !1 !== f.zoomEnabled;
                this.hasNames = "category" === d || !0 === f.categories;
                this.categories = f.categories || this.hasNames;
                this.names = this.names || [];
                this.isLog = "logarithmic" === d;
                this.isDatetimeAxis = "datetime" === d;
                this.isLinked = t(f.linkedTo);
                this.ticks = {};
                this.labelEdge = [];
                this.minorTicks = {};
                this.plotLinesAndBands = [];
                this.alternateBands = {};
                this.len = 0;
                this.minRange = this.userMinRange = f.minRange || f.maxZoom;
                this.range = f.range;
                this.offset = f.offset || 0;
                this.stacks = {};
                this.oldStacks = {};
                this.stacksTouched = 0;
                this.min = this.max = null;
                this.crosshair = x(f.crosshair, y(a.options.tooltip.crosshairs)[e ? 0 : 1], !1);
                var m, f = this.options.events;
                -1 === c(this, a.axes) && (e ? a.axes.splice(a.xAxis.length, 0, this) : a.axes.push(this),
                    a[this.coll].push(this));
                this.series = this.series || [];
                a.inverted && e && void 0 === this.reversed && (this.reversed = !0);
                this.removePlotLine = this.removePlotBand = this.removePlotBandOrLine;
                for (m in f) C(this, m, f[m]);
                this.isLog && (this.val2lin = this.log2lin, this.lin2val = this.lin2log);
            },
            setOptions: function(a) {
                this.options = p(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [ this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions ][this.side], p(r[this.coll], a));
            },
            defaultLabelFormatter: function() {
                var b = this.axis, c = this.value, e = b.categories, f = this.dateTimeLabelFormat, d = r.lang.numericSymbols, m = d && d.length, y, p = b.options.labels.format, b = b.isLog ? c : b.tickInterval;
                if (p) y = l(p, this); else if (e) y = c; else if (f) y = a.dateFormat(f, c); else if (m && 1e3 <= b) for (;m-- && void 0 === y; ) e = Math.pow(1e3, m + 1),
                    b >= e && 0 === 10 * c % e && null !== d[m] && 0 !== c && (y = a.numberFormat(c / e, -1) + d[m]);
                void 0 === y && (y = 1e4 <= Math.abs(c) ? a.numberFormat(c, -1) : a.numberFormat(c, -1, void 0, ""));
                return y;
            },
            getSeriesExtremes: function() {
                var a = this, c = a.chart;
                a.hasVisibleSeries = !1;
                a.dataMin = a.dataMax = a.threshold = null;
                a.softThreshold = !a.isXAxis;
                a.buildStacks && a.buildStacks();
                d(a.series, function(f) {
                    if (f.visible || !c.options.chart.ignoreHiddenSeries) {
                        var d = f.options, m = d.threshold, l;
                        a.hasVisibleSeries = !0;
                        a.isLog && 0 >= m && (m = null);
                        if (a.isXAxis) d = f.xData, d.length && (f = H(d), e(f) || f instanceof Date || (d = b(d, function(a) {
                            return e(a);
                        }), f = H(d)), a.dataMin = Math.min(x(a.dataMin, d[0]), f), a.dataMax = Math.max(x(a.dataMax, d[0]), E(d))); else if (f.getExtremes(),
                            l = f.dataMax, f = f.dataMin, t(f) && t(l) && (a.dataMin = Math.min(x(a.dataMin, f), f),
                            a.dataMax = Math.max(x(a.dataMax, l), l)), t(m) && (a.threshold = m), !d.softThreshold || a.isLog) a.softThreshold = !1;
                    }
                });
            },
            translate: function(a, b, c, f, d, m) {
                var l = this.linkedParent || this, y = 1, p = 0, F = f ? l.oldTransA : l.transA;
                f = f ? l.oldMin : l.min;
                var g = l.minPixelPadding;
                d = (l.isOrdinal || l.isBroken || l.isLog && d) && l.lin2val;
                F || (F = l.transA);
                c && (y *= -1, p = l.len);
                l.reversed && (y *= -1, p -= y * (l.sector || l.len));
                b ? (a = (a * y + p - g) / F + f, d && (a = l.lin2val(a))) : (d && (a = l.val2lin(a)),
                    "between" === m && (m = .5), a = y * (a - f) * F + p + y * g + (e(m) ? F * m * l.pointRange : 0));
                return a;
            },
            toPixels: function(a, b) {
                return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos);
            },
            toValue: function(a, b) {
                return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0);
            },
            getPlotLinePath: function(a, b, c, f, d) {
                var m = this.chart, l = this.left, y = this.top, p, F, g = c && m.oldChartHeight || m.chartHeight, q = c && m.oldChartWidth || m.chartWidth, B;
                p = this.transB;
                var h = function(a, b, c) {
                    if (a < b || a > c) f ? a = Math.min(Math.max(b, a), c) : B = !0;
                    return a;
                };
                d = x(d, this.translate(a, null, null, c));
                a = c = Math.round(d + p);
                p = F = Math.round(g - d - p);
                e(d) ? this.horiz ? (p = y, F = g - this.bottom, a = c = h(a, l, l + this.width)) : (a = l,
                    c = q - this.right, p = F = h(p, y, y + this.height)) : B = !0;
                return B && !f ? null : m.renderer.crispLine([ "M", a, p, "L", c, F ], b || 1);
            },
            getLinearTickPositions: function(a, b, c) {
                var f, d = k(Math.floor(b / a) * a), m = k(Math.ceil(c / a) * a), l = [];
                if (b === c && e(b)) return [ b ];
                for (b = d; b <= m; ) {
                    l.push(b);
                    b = k(b + a);
                    if (b === f) break;
                    f = b;
                }
                return l;
            },
            getMinorTickPositions: function() {
                var a = this.options, b = this.tickPositions, c = this.minorTickInterval, f = [], e, d = this.pointRangePadding || 0;
                e = this.min - d;
                var d = this.max + d, m = d - e;
                if (m && m / c < this.len / 3) if (this.isLog) for (d = b.length, e = 1; e < d; e++) f = f.concat(this.getLogTickPositions(c, b[e - 1], b[e], !0)); else if (this.isDatetimeAxis && "auto" === a.minorTickInterval) f = f.concat(this.getTimeTicks(this.normalizeTimeTickInterval(c), e, d, a.startOfWeek)); else for (b = e + (b[0] - e) % c; b <= d; b += c) f.push(b);
                0 !== f.length && this.trimTicks(f, a.startOnTick, a.endOnTick);
                return f;
            },
            adjustForMinRange: function() {
                var a = this.options, b = this.min, c = this.max, f, e = this.dataMax - this.dataMin >= this.minRange, m, l, y, p, F, g;
                this.isXAxis && void 0 === this.minRange && !this.isLog && (t(a.min) || t(a.max) ? this.minRange = null : (d(this.series, function(a) {
                    p = a.xData;
                    for (l = F = a.xIncrement ? 1 : p.length - 1; 0 < l; l--) if (y = p[l] - p[l - 1],
                        void 0 === m || y < m) m = y;
                }), this.minRange = Math.min(5 * m, this.dataMax - this.dataMin)));
                c - b < this.minRange && (g = this.minRange, f = (g - c + b) / 2, f = [ b - f, x(a.min, b - f) ],
                    e && (f[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), b = E(f),
                    c = [ b + g, x(a.max, b + g) ], e && (c[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax),
                    c = H(c), c - b < g && (f[0] = c - g, f[1] = x(a.min, c - g), b = E(f)));
                this.min = b;
                this.max = c;
            },
            getClosest: function() {
                var a;
                this.categories ? a = 1 : d(this.series, function(b) {
                    var c = b.closestPointRange;
                    !b.noSharedTooltip && t(c) && (a = t(a) ? Math.min(a, c) : c);
                });
                return a;
            },
            nameToX: function(a) {
                var b = m(this.categories), f = b ? this.categories : this.names, e = a.options.x, d;
                a.series.requireSorting = !1;
                t(e) || (e = !1 === this.options.nameToX ? a.series.autoIncrement() : c(a.name, f));
                -1 === e ? b || (d = f.length) : d = e;
                this.names[d] = a.name;
                return d;
            },
            updateNames: function() {
                var a = this;
                0 < this.names.length && (this.names.length = 0, this.minRange = void 0, d(this.series || [], function(b) {
                    b.processedXData || (b.processData(), b.generatePoints());
                    d(b.points, function(c, f) {
                        var e;
                        c.options && void 0 === c.options.x && (e = a.nameToX(c), e !== c.x && (c.x = e,
                            b.xData[f] = e));
                    });
                }));
            },
            setAxisTranslation: function(a) {
                var b = this, c = b.max - b.min, f = b.axisPointRange || 0, e, m = 0, l = 0, y = b.linkedParent, p = !!b.categories, F = b.transA, g = b.isXAxis;
                if (g || p || f) y ? (m = y.minPointOffset, l = y.pointRangePadding) : (e = b.getClosest(),
                    d(b.series, function(a) {
                        var c = p ? 1 : g ? x(a.options.pointRange, e, 0) : b.axisPointRange || 0;
                        a = a.options.pointPlacement;
                        f = Math.max(f, c);
                        b.single || (m = Math.max(m, D(a) ? 0 : c / 2), l = Math.max(l, "on" === a ? 0 : c));
                    })), y = b.ordinalSlope && e ? b.ordinalSlope / e : 1, b.minPointOffset = m *= y,
                    b.pointRangePadding = l *= y, b.pointRange = Math.min(f, c), g && (b.closestPointRange = e);
                a && (b.oldTransA = F);
                b.translationSlope = b.transA = F = b.len / (c + l || 1);
                b.transB = b.horiz ? b.left : b.bottom;
                b.minPixelPadding = F * m;
            },
            minFromRange: function() {
                return this.max - this.range;
            },
            setTickInterval: function(a) {
                var b = this, c = b.chart, m = b.options, l = b.isLog, y = b.log2lin, p = b.isDatetimeAxis, F = b.isXAxis, q = b.isLinked, h = m.maxPadding, G = m.minPadding, D = m.tickInterval, u = m.tickPixelInterval, K = b.categories, n = b.threshold, r = b.softThreshold, L, v, z, E;
                p || K || q || this.getTickAmount();
                z = x(b.userMin, m.min);
                E = x(b.userMax, m.max);
                q ? (b.linkedParent = c[b.coll][m.linkedTo], c = b.linkedParent.getExtremes(), b.min = x(c.min, c.dataMin),
                    b.max = x(c.max, c.dataMax), m.type !== b.linkedParent.options.type && g(11, 1)) : (!r && t(n) && (b.dataMin >= n ? (L = n,
                    G = 0) : b.dataMax <= n && (v = n, h = 0)), b.min = x(z, L, b.dataMin), b.max = x(E, v, b.dataMax));
                l && (!a && 0 >= Math.min(b.min, x(b.dataMin, b.min)) && g(10, 1), b.min = k(y(b.min), 15),
                    b.max = k(y(b.max), 15));
                b.range && t(b.max) && (b.userMin = b.min = z = Math.max(b.min, b.minFromRange()),
                    b.userMax = E = b.max, b.range = null);
                w(b, "foundExtremes");
                b.beforePadding && b.beforePadding();
                b.adjustForMinRange();
                !(K || b.axisPointRange || b.usePercentage || q) && t(b.min) && t(b.max) && (y = b.max - b.min) && (!t(z) && G && (b.min -= y * G),
                    !t(E) && h && (b.max += y * h));
                e(m.floor) && (b.min = Math.max(b.min, m.floor));
                e(m.ceiling) && (b.max = Math.min(b.max, m.ceiling));
                r && t(b.dataMin) && (n = n || 0, !t(z) && b.min < n && b.dataMin >= n ? b.min = n : !t(E) && b.max > n && b.dataMax <= n && (b.max = n));
                b.tickInterval = b.min === b.max || void 0 === b.min || void 0 === b.max ? 1 : q && !D && u === b.linkedParent.options.tickPixelInterval ? D = b.linkedParent.tickInterval : x(D, this.tickAmount ? (b.max - b.min) / Math.max(this.tickAmount - 1, 1) : void 0, K ? 1 : (b.max - b.min) * u / Math.max(b.len, u));
                F && !a && d(b.series, function(a) {
                    a.processData(b.min !== b.oldMin || b.max !== b.oldMax);
                });
                b.setAxisTranslation(!0);
                b.beforeSetTickPositions && b.beforeSetTickPositions();
                b.postProcessTickInterval && (b.tickInterval = b.postProcessTickInterval(b.tickInterval));
                b.pointRange && !D && (b.tickInterval = Math.max(b.pointRange, b.tickInterval));
                a = x(m.minTickInterval, b.isDatetimeAxis && b.closestPointRange);
                !D && b.tickInterval < a && (b.tickInterval = a);
                p || l || D || (b.tickInterval = B(b.tickInterval, null, f(b.tickInterval), x(m.allowDecimals, !(.5 < b.tickInterval && 5 > b.tickInterval && 1e3 < b.max && 9999 > b.max)), !!this.tickAmount));
                this.tickAmount || (b.tickInterval = b.unsquish());
                this.setTickPositions();
            },
            setTickPositions: function() {
                var a = this.options, b, c = a.tickPositions, f = a.tickPositioner, e = a.startOnTick, d = a.endOnTick, m;
                this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === a.minorTickInterval && this.tickInterval ? this.tickInterval / 5 : a.minorTickInterval;
                this.tickPositions = b = c && c.slice();
                !b && (b = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max),
                    b.length > this.len && (b = [ b[0], b.pop() ]), this.tickPositions = b, f && (f = f.apply(this, [ this.min, this.max ]))) && (this.tickPositions = b = f);
                this.isLinked || (this.trimTicks(b, e, d), this.min === this.max && t(this.min) && !this.tickAmount && (m = !0,
                    this.min -= .5, this.max += .5), this.single = m, c || f || this.adjustTickAmount());
            },
            trimTicks: function(a, b, c) {
                var f = a[0], e = a[a.length - 1], d = this.minPointOffset || 0;
                if (b) this.min = f; else for (;this.min - d > a[0]; ) a.shift();
                if (c) this.max = e; else for (;this.max + d < a[a.length - 1]; ) a.pop();
                0 === a.length && t(f) && a.push((e + f) / 2);
            },
            alignToOthers: function() {
                var a = {}, b, c = this.options;
                !1 !== this.chart.options.chart.alignTicks && !1 !== c.alignTicks && d(this.chart[this.coll], function(c) {
                    var f = c.options, f = [ c.horiz ? f.left : f.top, f.width, f.height, f.pane ].join();
                    c.series.length && (a[f] ? b = !0 : a[f] = 1);
                });
                return b;
            },
            getTickAmount: function() {
                var a = this.options, b = a.tickAmount, c = a.tickPixelInterval;
                !t(a.tickInterval) && this.len < c && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);
                !b && this.alignToOthers() && (b = Math.ceil(this.len / c) + 1);
                4 > b && (this.finalTickAmt = b, b = 5);
                this.tickAmount = b;
            },
            adjustTickAmount: function() {
                var a = this.tickInterval, b = this.tickPositions, c = this.tickAmount, f = this.finalTickAmt, e = b && b.length;
                if (e < c) {
                    for (;b.length < c; ) b.push(k(b[b.length - 1] + a));
                    this.transA *= (e - 1) / (c - 1);
                    this.max = b[b.length - 1];
                } else e > c && (this.tickInterval *= 2, this.setTickPositions());
                if (t(f)) {
                    for (a = c = b.length; a--; ) (3 === f && 1 === a % 2 || 2 >= f && 0 < a && a < c - 1) && b.splice(a, 1);
                    this.finalTickAmt = void 0;
                }
            },
            setScale: function() {
                var a, b;
                this.oldMin = this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                b = this.len !== this.oldAxisLength;
                d(this.series, function(b) {
                    if (b.isDirtyData || b.isDirty || b.xAxis.isDirty) a = !0;
                });
                b || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(),
                    this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin,
                    this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks();
            },
            setExtremes: function(a, b, c, f, e) {
                var m = this, l = m.chart;
                c = x(c, !0);
                d(m.series, function(a) {
                    delete a.kdTree;
                });
                e = q(e, {
                    min: a,
                    max: b
                });
                w(m, "setExtremes", e, function() {
                    m.userMin = a;
                    m.userMax = b;
                    m.eventArgs = e;
                    c && l.redraw(f);
                });
            },
            zoom: function(a, b) {
                var c = this.dataMin, f = this.dataMax, e = this.options, d = Math.min(c, x(e.min, c)), e = Math.max(f, x(e.max, f));
                this.allowZoomOutside || (t(c) && a <= d && (a = d), t(f) && b >= e && (b = e));
                this.displayBtn = void 0 !== a || void 0 !== b;
                this.setExtremes(a, b, !1, void 0, {
                    trigger: "zoom"
                });
                return !0;
            },
            setAxisSize: function() {
                var a = this.chart, b = this.options, c = b.offsetLeft || 0, f = this.horiz, e = x(b.width, a.plotWidth - c + (b.offsetRight || 0)), d = x(b.height, a.plotHeight), m = x(b.top, a.plotTop), b = x(b.left, a.plotLeft + c), c = /%$/;
                c.test(d) && (d = Math.round(parseFloat(d) / 100 * a.plotHeight));
                c.test(m) && (m = Math.round(parseFloat(m) / 100 * a.plotHeight + a.plotTop));
                this.left = b;
                this.top = m;
                this.width = e;
                this.height = d;
                this.bottom = a.chartHeight - d - m;
                this.right = a.chartWidth - e - b;
                this.len = Math.max(f ? e : d, 0);
                this.pos = f ? b : m;
            },
            getExtremes: function() {
                var a = this.isLog, b = this.lin2log;
                return {
                    min: a ? k(b(this.min)) : this.min,
                    max: a ? k(b(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                };
            },
            getThreshold: function(a) {
                var b = this.isLog, c = this.lin2log, f = b ? c(this.min) : this.min, b = b ? c(this.max) : this.max;
                null === a ? a = f : f > a ? a = f : b < a && (a = b);
                return this.translate(a, 0, 1, 0, 1);
            },
            autoLabelAlign: function(a) {
                a = (x(a, 0) - 90 * this.side + 720) % 360;
                return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center";
            },
            tickSize: function(a) {
                var b = this.options, c = b[a + "Length"], f = x(b[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);
                if (f && c) return "inside" === b[a + "Position"] && (c = -c), [ c, f ];
            },
            labelMetrics: function() {
                return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[0] && this.ticks[0].label);
            },
            unsquish: function() {
                var a = this.options.labels, b = this.horiz, c = this.tickInterval, f = c, e = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / c), m, l = a.rotation, y = this.labelMetrics(), p, F = Number.MAX_VALUE, g, q = function(a) {
                    a /= e || 1;
                    a = 1 < a ? Math.ceil(a) : 1;
                    return a * c;
                };
                b ? (g = !a.staggerLines && !a.step && (t(l) ? [ l ] : e < x(a.autoRotationLimit, 80) && a.autoRotation)) && d(g, function(a) {
                    var b;
                    if (a === l || a && -90 <= a && 90 >= a) p = q(Math.abs(y.h / Math.sin(h * a))),
                        b = p + Math.abs(a / 360), b < F && (F = b, m = a, f = p);
                }) : a.step || (f = q(y.h));
                this.autoRotation = g;
                this.labelRotation = x(m, l);
                return f;
            },
            getSlotWidth: function() {
                var a = this.chart, b = this.horiz, c = this.options.labels, f = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1), e = a.margin[3];
                return b && 2 > (c.step || 0) && !c.rotation && (this.staggerLines || 1) * a.plotWidth / f || !b && (e && e - a.spacing[3] || .33 * a.chartWidth);
            },
            renderUnsquish: function() {
                var a = this.chart, b = a.renderer, c = this.tickPositions, f = this.ticks, e = this.options.labels, m = this.horiz, l = this.getSlotWidth(), y = Math.max(1, Math.round(l - 2 * (e.padding || 5))), F = {}, g = this.labelMetrics(), q = e.style && e.style.textOverflow, B, x = 0, h, G;
                D(e.rotation) || (F.rotation = e.rotation || 0);
                d(c, function(a) {
                    (a = f[a]) && a.labelLength > x && (x = a.labelLength);
                });
                this.maxLabelLength = x;
                if (this.autoRotation) x > y && x > g.h ? F.rotation = this.labelRotation : this.labelRotation = 0; else if (l && (B = {
                    width: y + "px"
                }, !q)) for (B.textOverflow = "clip", h = c.length; !m && h--; ) if (G = c[h], y = f[G].label) y.styles && "ellipsis" === y.styles.textOverflow ? y.css({
                    textOverflow: "clip"
                }) : f[G].labelLength > l && y.css({
                    width: l + "px"
                }), y.getBBox().height > this.len / c.length - (g.h - g.f) && (y.specCss = {
                    textOverflow: "ellipsis"
                });
                F.rotation && (B = {
                    width: (x > .5 * a.chartHeight ? .33 * a.chartHeight : a.chartHeight) + "px"
                }, q || (B.textOverflow = "ellipsis"));
                if (this.labelAlign = e.align || this.autoLabelAlign(this.labelRotation)) F.align = this.labelAlign;
                d(c, function(a) {
                    var b = (a = f[a]) && a.label;
                    b && (b.attr(F), B && b.css(p(B, b.specCss)), delete b.specCss, a.rotation = F.rotation);
                });
                this.tickRotCorr = b.rotCorr(g.b, this.labelRotation || 0, 0 !== this.side);
            },
            hasData: function() {
                return this.hasVisibleSeries || t(this.min) && t(this.max) && !!this.tickPositions;
            },
            getOffset: function() {
                var a = this, b = a.chart, c = b.renderer, f = a.options, e = a.tickPositions, m = a.ticks, l = a.horiz, y = a.side, p = b.inverted ? [ 1, 0, 3, 2 ][y] : y, F, g, q = 0, B, h = 0, G = f.title, w = f.labels, D = 0, u = a.opposite, k = b.axisOffset, b = b.clipOffset, n = [ -1, 1, 1, -1 ][y], r, L = f.className, v = a.axisParent, z = this.tickSize("tick");
                F = a.hasData();
                a.showAxis = g = F || x(f.showEmpty, !0);
                a.staggerLines = a.horiz && w.staggerLines;
                a.axisGroup || (a.gridGroup = c.g("grid").attr({
                    zIndex: f.gridZIndex || 1
                }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (L || "")).add(v),
                    a.axisGroup = c.g("axis").attr({
                        zIndex: f.zIndex || 2
                    }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (L || "")).add(v), a.labelGroup = c.g("axis-labels").attr({
                    zIndex: w.zIndex || 7
                }).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (L || "")).add(v));
                if (F || a.isLinked) d(e, function(b) {
                    m[b] ? m[b].addLabel() : m[b] = new K(a, b);
                }), a.renderUnsquish(), !1 === w.reserveSpace || 0 !== y && 2 !== y && {
                    1: "left",
                    3: "right"
                }[y] !== a.labelAlign && "center" !== a.labelAlign || d(e, function(a) {
                    D = Math.max(m[a].getLabelSize(), D);
                }), a.staggerLines && (D *= a.staggerLines, a.labelOffset = D * (a.opposite ? -1 : 1)); else for (r in m) m[r].destroy(),
                    delete m[r];
                G && G.text && !1 !== G.enabled && (a.axisTitle || ((r = G.textAlign) || (r = (l ? {
                    low: "left",
                    middle: "center",
                    high: "right"
                } : {
                    low: u ? "right" : "left",
                    middle: "center",
                    high: u ? "left" : "right"
                })[G.align]), a.axisTitle = c.text(G.text, 0, 0, G.useHTML).attr({
                    zIndex: 7,
                    rotation: G.rotation || 0,
                    align: r
                }).addClass("highcharts-axis-title").css(G.style).add(a.axisGroup), a.axisTitle.isNew = !0),
                    g && (q = a.axisTitle.getBBox()[l ? "height" : "width"], B = G.offset, h = t(B) ? 0 : x(G.margin, l ? 5 : 10)),
                    a.axisTitle[g ? "show" : "hide"](!0));
                a.renderLine();
                a.offset = n * x(f.offset, k[y]);
                a.tickRotCorr = a.tickRotCorr || {
                    x: 0,
                    y: 0
                };
                c = 0 === y ? -a.labelMetrics().h : 2 === y ? a.tickRotCorr.y : 0;
                h = Math.abs(D) + h;
                D && (h = h - c + n * (l ? x(w.y, a.tickRotCorr.y + 8 * n) : w.x));
                a.axisTitleMargin = x(B, h);
                k[y] = Math.max(k[y], a.axisTitleMargin + q + n * a.offset, h, F && e.length && z ? z[0] : 0);
                f = f.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
                b[p] = Math.max(b[p], f);
            },
            getLinePath: function(a) {
                var b = this.chart, c = this.opposite, f = this.offset, e = this.horiz, d = this.left + (c ? this.width : 0) + f, f = b.chartHeight - this.bottom - (c ? this.height : 0) + f;
                c && (a *= -1);
                return b.renderer.crispLine([ "M", e ? this.left : d, e ? f : this.top, "L", e ? b.chartWidth - this.right : d, e ? f : b.chartHeight - this.bottom ], a);
            },
            renderLine: function() {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),
                    this.axisLine.attr({
                        stroke: this.options.lineColor,
                        "stroke-width": this.options.lineWidth,
                        zIndex: 7
                    }));
            },
            getTitlePosition: function() {
                var a = this.horiz, b = this.left, c = this.top, f = this.len, e = this.options.title, d = a ? b : c, m = this.opposite, l = this.offset, y = e.x || 0, p = e.y || 0, F = this.chart.renderer.fontMetrics(e.style && e.style.fontSize, this.axisTitle).f, f = {
                    low: d + (a ? 0 : f),
                    middle: d + f / 2,
                    high: d + (a ? f : 0)
                }[e.align], b = (a ? c + this.height : b) + (a ? 1 : -1) * (m ? -1 : 1) * this.axisTitleMargin + (2 === this.side ? F : 0);
                return {
                    x: a ? f + y : b + (m ? this.width : 0) + l + y,
                    y: a ? b + p - (m ? this.height : 0) + l : f + p
                };
            },
            render: function() {
                var a = this, b = a.chart, c = b.renderer, f = a.options, m = a.isLog, l = a.lin2log, y = a.isLinked, p = a.tickPositions, g = a.axisTitle, q = a.ticks, B = a.minorTicks, x = a.alternateBands, h = f.stackLabels, G = f.alternateGridColor, w = a.tickmarkOffset, D = a.axisLine, u = b.hasRendered && e(a.oldMin), k = a.showAxis, n = z(c.globalAnimation), r, t;
                a.labelEdge.length = 0;
                a.overlap = !1;
                d([ q, B, x ], function(a) {
                    for (var b in a) a[b].isActive = !1;
                });
                if (a.hasData() || y) a.minorTickInterval && !a.categories && d(a.getMinorTickPositions(), function(b) {
                    B[b] || (B[b] = new K(a, b, "minor"));
                    u && B[b].isNew && B[b].render(null, !0);
                    B[b].render(null, !1, 1);
                }), p.length && (d(p, function(b, c) {
                    if (!y || b >= a.min && b <= a.max) q[b] || (q[b] = new K(a, b)), u && q[b].isNew && q[b].render(c, !0, .1),
                        q[b].render(c);
                }), w && (0 === a.min || a.single) && (q[-1] || (q[-1] = new K(a, -1, null, !0)),
                    q[-1].render(-1))), G && d(p, function(c, f) {
                    t = void 0 !== p[f + 1] ? p[f + 1] + w : a.max - w;
                    0 === f % 2 && c < a.max && t <= a.max + (b.polar ? -w : w) && (x[c] || (x[c] = new L(a)),
                        r = c + w, x[c].options = {
                        from: m ? l(r) : r,
                        to: m ? l(t) : t,
                        color: G
                    }, x[c].render(), x[c].isActive = !0);
                }), a._addedPlotLB || (d((f.plotLines || []).concat(f.plotBands || []), function(b) {
                    a.addPlotBandOrLine(b);
                }), a._addedPlotLB = !0);
                d([ q, B, x ], function(a) {
                    var c, f, e = [], d = n.duration;
                    for (c in a) a[c].isActive || (a[c].render(c, !1, 0), a[c].isActive = !1, e.push(c));
                    F(function() {
                        for (f = e.length; f--; ) a[e[f]] && !a[e[f]].isActive && (a[e[f]].destroy(), delete a[e[f]]);
                    }, a !== x && b.hasRendered && d ? d : 0);
                });
                D && (D[D.isPlaced ? "animate" : "attr"]({
                    d: this.getLinePath(D.strokeWidth())
                }), D.isPlaced = !0, D[k ? "show" : "hide"](!0));
                g && k && (g[g.isNew ? "attr" : "animate"](a.getTitlePosition()), g.isNew = !1);
                h && h.enabled && a.renderStackTotals();
                a.isDirty = !1;
            },
            redraw: function() {
                this.visible && (this.render(), d(this.plotLinesAndBands, function(a) {
                    a.render();
                }));
                d(this.series, function(a) {
                    a.isDirty = !0;
                });
            },
            destroy: function(a) {
                var b = this, f = b.stacks, e, m = b.plotLinesAndBands, l;
                a || G(b);
                for (e in f) u(f[e]), f[e] = null;
                d([ b.ticks, b.minorTicks, b.alternateBands ], function(a) {
                    u(a);
                });
                if (m) for (a = m.length; a--; ) m[a].destroy();
                d("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "), function(a) {
                    b[a] && (b[a] = b[a].destroy());
                });
                m = [ "names", "series", "userMax", "userMin" ];
                for (l in b) b.hasOwnProperty(l) && -1 === c(l, m) && delete b[l];
            },
            drawCrosshair: function(a, b) {
                var c, f = this.crosshair, e, d = this.cross;
                a || (a = this.cross && this.cross.e);
                this.crosshair && !1 !== (t(b) || !x(f.snap, !0)) ? (x(f.snap, !0) ? t(b) && (c = this.isXAxis ? b.plotX : this.len - b.plotY) : c = this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos,
                    c = this.isRadial ? this.getPlotLinePath(this.isXAxis ? b.x : x(b.stackY, b.y)) || null : this.getPlotLinePath(null, null, null, null, c) || null,
                        null === c ? this.hideCrosshair() : (e = this.categories && !this.isRadial, d || (this.cross = d = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (e ? "category " : "thin ") + f.className).attr({
                    zIndex: x(f.zIndex, 2)
                }).add(), d.attr({
                    stroke: f.color || (e ? n("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
                    "stroke-width": x(f.width, 1)
                }), f.dashStyle && d.attr({
                    dashstyle: f.dashStyle
                })), d.show().attr({
                    d: c
                }), e && d.attr({
                    "stroke-width": this.transA
                }), this.cross.e = a)) : this.hideCrosshair();
            },
            hideCrosshair: function() {
                this.cross && this.cross.hide();
            }
        };
        q(a.Axis.prototype, v);
    })(J);
    (function(a) {
        var C = a.Axis, z = a.Date, E = a.defaultOptions, H = a.defined, v = a.each, n = a.extend, k = a.getMagnitude, r = a.getTZOffset, t = a.grep, h = a.normalizeTickInterval, u = a.pick, d = a.timeUnits;
        C.prototype.getTimeTicks = function(a, q, h, l) {
            var f = [], b = {}, c = E.global.useUTC, m, e = new z(q - r(q)), D = z.hcMakeTime, p = a.unitRange, B = a.count;
            if (H(q)) {
                e[z.hcSetMilliseconds](p >= d.second ? 0 : B * Math.floor(e.getMilliseconds() / B));
                if (p >= d.second) e[z.hcSetSeconds](p >= d.minute ? 0 : B * Math.floor(e.getSeconds() / B));
                if (p >= d.minute) e[z.hcSetMinutes](p >= d.hour ? 0 : B * Math.floor(e[z.hcGetMinutes]() / B));
                if (p >= d.hour) e[z.hcSetHours](p >= d.day ? 0 : B * Math.floor(e[z.hcGetHours]() / B));
                if (p >= d.day) e[z.hcSetDate](p >= d.month ? 1 : B * Math.floor(e[z.hcGetDate]() / B));
                p >= d.month && (e[z.hcSetMonth](p >= d.year ? 0 : B * Math.floor(e[z.hcGetMonth]() / B)),
                    m = e[z.hcGetFullYear]());
                if (p >= d.year) e[z.hcSetFullYear](m - m % B);
                if (p === d.week) e[z.hcSetDate](e[z.hcGetDate]() - e[z.hcGetDay]() + u(l, 1));
                q = 1;
                if (z.hcTimezoneOffset || z.hcGetTimezoneOffset) e = e.getTime(), e = new z(e + r(e));
                m = e[z.hcGetFullYear]();
                l = e.getTime();
                for (var x = e[z.hcGetMonth](), k = e[z.hcGetDate](), G = !c || !!z.hcGetTimezoneOffset, y = (d.day + (c ? r(e) : 6e4 * e.getTimezoneOffset())) % d.day; l < h; ) f.push(l),
                    l = p === d.year ? D(m + q * B, 0) : p === d.month ? D(m, x + q * B) : !G || p !== d.day && p !== d.week ? l + p * B : D(m, x, k + q * B * (p === d.day ? 1 : 7)),
                    q++;
                f.push(l);
                v(t(f, function(a) {
                    return p <= d.hour && a % d.day === y;
                }), function(a) {
                    b[a] = "day";
                });
            }
            f.info = n(a, {
                higherRanks: b,
                totalRange: p * B
            });
            return f;
        };
        C.prototype.normalizeTimeTickInterval = function(a, q) {
            var w = q || [ [ "millisecond", [ 1, 2, 5, 10, 20, 25, 50, 100, 200, 500 ] ], [ "second", [ 1, 2, 5, 10, 15, 30 ] ], [ "minute", [ 1, 2, 5, 10, 15, 30 ] ], [ "hour", [ 1, 2, 3, 4, 6, 8, 12 ] ], [ "day", [ 1, 2 ] ], [ "week", [ 1, 2 ] ], [ "month", [ 1, 2, 3, 4, 6 ] ], [ "year", null ] ], l = w[w.length - 1], f = d[l[0]], b = l[1], c;
            for (c = 0; c < w.length && !(l = w[c], f = d[l[0]], b = l[1], w[c + 1] && a <= (f * b[b.length - 1] + d[w[c + 1][0]]) / 2); c++) ;
            f === d.year && a < 5 * f && (b = [ 1, 2, 5 ]);
            w = h(a / f, b, "year" === l[0] ? Math.max(k(a / f), 1) : 1);
            return {
                unitRange: f,
                count: w,
                unitName: l[0]
            };
        };
    })(J);
    (function(a) {
        var C = a.Axis, z = a.getMagnitude, E = a.map, H = a.normalizeTickInterval, v = a.pick;
        C.prototype.getLogTickPositions = function(a, k, r, t) {
            var h = this.options, u = this.len, d = this.lin2log, g = this.log2lin, q = [];
            t || (this._minorAutoInterval = null);
            if (.5 <= a) a = Math.round(a), q = this.getLinearTickPositions(a, k, r); else if (.08 <= a) for (var u = Math.floor(k), w, l, f, b, c, h = .3 < a ? [ 1, 2, 4 ] : .15 < a ? [ 1, 2, 4, 6, 8 ] : [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]; u < r + 1 && !c; u++) for (l = h.length,
                                                                                                                                                                                                                                                                           w = 0; w < l && !c; w++) f = g(d(u) * h[w]), f > k && (!t || b <= r) && void 0 !== b && q.push(b),
                b > r && (c = !0), b = f; else k = d(k), r = d(r), a = h[t ? "minorTickInterval" : "tickInterval"],
                a = v("auto" === a ? null : a, this._minorAutoInterval, h.tickPixelInterval / (t ? 5 : 1) * (r - k) / ((t ? u / this.tickPositions.length : u) || 1)),
                a = H(a, null, z(a)), q = E(this.getLinearTickPositions(a, k, r), g), t || (this._minorAutoInterval = a / 5);
            t || (this.tickInterval = a);
            return q;
        };
        C.prototype.log2lin = function(a) {
            return Math.log(a) / Math.LN10;
        };
        C.prototype.lin2log = function(a) {
            return Math.pow(10, a);
        };
    })(J);
    (function(a) {
        var C = a.addEvent, z = a.dateFormat, E = a.each, H = a.extend, v = a.format, n = a.isNumber, k = a.map, r = a.merge, t = a.pick, h = a.splat, u = a.stop, d = a.syncTimeout, g = a.timeUnits;
        a.Tooltip = function() {
            this.init.apply(this, arguments);
        };
        a.Tooltip.prototype = {
            init: function(a, d) {
                this.chart = a;
                this.options = d;
                this.crosshairs = [];
                this.now = {
                    x: 0,
                    y: 0
                };
                this.isHidden = !0;
                this.split = d.split && !a.inverted;
                this.shared = d.shared || this.split;
                this.split ? this.label = this.chart.renderer.g("tooltip") : (this.label = a.renderer.label("", 0, 0, d.shape || "callout", null, null, d.useHTML, null, "tooltip").attr({
                    padding: d.padding,
                    r: d.borderRadius,
                    display: "none"
                }), this.label.attr({
                    fill: d.backgroundColor,
                    "stroke-width": d.borderWidth
                }).css(d.style).shadow(d.shadow));
                this.label.attr({
                    zIndex: 8
                }).add();
            },
            update: function(a) {
                this.destroy();
                this.init(this.chart, r(!0, this.options, a));
            },
            destroy: function() {
                this.label && (this.label = this.label.destroy());
                clearTimeout(this.hideTimer);
                clearTimeout(this.tooltipTimeout);
            },
            move: function(a, d, l, f) {
                var b = this, c = b.now, m = !1 !== b.options.animation && !b.isHidden && (1 < Math.abs(a - c.x) || 1 < Math.abs(d - c.y)), e = b.followPointer || 1 < b.len;
                H(c, {
                    x: m ? (2 * c.x + a) / 3 : a,
                    y: m ? (c.y + d) / 2 : d,
                    anchorX: e ? void 0 : m ? (2 * c.anchorX + l) / 3 : l,
                    anchorY: e ? void 0 : m ? (c.anchorY + f) / 2 : f
                });
                b.label.attr(c);
                m && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() {
                    b && b.move(a, d, l, f);
                }, 32));
            },
            hide: function(a) {
                var g = this;
                clearTimeout(this.hideTimer);
                a = t(a, this.options.hideDelay, 500);
                this.isHidden || (this.hideTimer = d(function() {
                    g.label[a ? "fadeOut" : "hide"]();
                    g.isHidden = !0;
                }, a));
            },
            getAnchor: function(a, d) {
                var l, f = this.chart, b = f.inverted, c = f.plotTop, m = f.plotLeft, e = 0, g = 0, p, B;
                a = h(a);
                l = a[0].tooltipPos;
                this.followPointer && d && (void 0 === d.chartX && (d = f.pointer.normalize(d)),
                    l = [ d.chartX - f.plotLeft, d.chartY - c ]);
                l || (E(a, function(a) {
                    p = a.series.yAxis;
                    B = a.series.xAxis;
                    e += a.plotX + (!b && B ? B.left - m : 0);
                    g += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!b && p ? p.top - c : 0);
                }), e /= a.length, g /= a.length, l = [ b ? f.plotWidth - g : e, this.shared && !b && 1 < a.length && d ? d.chartY - c : b ? f.plotHeight - e : g ]);
                return k(l, Math.round);
            },
            getPosition: function(a, d, l) {
                var f = this.chart, b = this.distance, c = {}, m = l.h || 0, e, g = [ "y", f.chartHeight, d, l.plotY + f.plotTop, f.plotTop, f.plotTop + f.plotHeight ], p = [ "x", f.chartWidth, a, l.plotX + f.plotLeft, f.plotLeft, f.plotLeft + f.plotWidth ], B = !this.followPointer && t(l.ttBelow, !f.inverted === !!l.negative), x = function(a, f, e, d, l, y) {
                    var p = e < d - b, g = d + b + e < f, q = d - b - e;
                    d += b;
                    if (B && g) c[a] = d; else if (!B && p) c[a] = q; else if (p) c[a] = Math.min(y - e, 0 > q - m ? q : q - m); else if (g) c[a] = Math.max(l, d + m + e > f ? d : d + m); else return !1;
                }, h = function(a, f, e, d) {
                    var m;
                    d < b || d > f - b ? m = !1 : c[a] = d < e / 2 ? 1 : d > f - e / 2 ? f - e - 2 : d - e / 2;
                    return m;
                }, G = function(a) {
                    var b = g;
                    g = p;
                    p = b;
                    e = a;
                }, y = function() {
                    !1 !== x.apply(0, g) ? !1 !== h.apply(0, p) || e || (G(!0), y()) : e ? c.x = c.y = 0 : (G(!0),
                        y());
                };
                (f.inverted || 1 < this.len) && G();
                y();
                return c;
            },
            defaultFormatter: function(a) {
                var d = this.points || h(this), l;
                l = [ a.tooltipFooterHeaderFormatter(d[0]) ];
                l = l.concat(a.bodyFormatter(d));
                l.push(a.tooltipFooterHeaderFormatter(d[0], !0));
                return l;
            },
            refresh: function(a, d) {
                var l = this.chart, f = this.label, b = this.options, c, m, e, g = {}, p, B = [];
                p = b.formatter || this.defaultFormatter;
                var g = l.hoverPoints, x = this.shared;
                clearTimeout(this.hideTimer);
                this.followPointer = h(a)[0].series.tooltipOptions.followPointer;
                e = this.getAnchor(a, d);
                c = e[0];
                m = e[1];
                !x || a.series && a.series.noSharedTooltip ? g = a.getLabelConfig() : (l.hoverPoints = a,
                    g && E(g, function(a) {
                    a.setState();
                }), E(a, function(a) {
                    a.setState("hover");
                    B.push(a.getLabelConfig());
                }), g = {
                    x: a[0].category,
                    y: a[0].y
                }, g.points = B, this.len = B.length, a = a[0]);
                p = p.call(g, this);
                g = a.series;
                this.distance = t(g.tooltipOptions.distance, 16);
                !1 === p ? this.hide() : (this.isHidden && (u(f), f.attr({
                    opacity: 1,
                    display: "block"
                }).show()), this.split ? this.renderSplit(p, l.hoverPoints) : (f.attr({
                    text: p.join ? p.join("") : p
                }), f.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + t(a.colorIndex, g.colorIndex)),
                    f.attr({
                        stroke: b.borderColor || a.color || g.color || "#666666"
                    }), this.updatePosition({
                    plotX: c,
                    plotY: m,
                    negative: a.negative,
                    ttBelow: a.ttBelow,
                    h: e[2] || 0
                })), this.isHidden = !1);
            },
            renderSplit: function(d, g) {
                var l = this, f = [], b = this.chart, c = b.renderer, m = !0, e = this.options, h;
                E(d.slice(0, d.length - 1), function(a, d) {
                    var x = g[d - 1] || {
                        isHeader: !0,
                        plotX: g[0].plotX
                    }, q = x.series || l, G = q.tt, y = x.series || {}, F = "highcharts-color-" + t(x.colorIndex, y.colorIndex, "none");
                    G || (q.tt = G = c.label(null, null, null, x.isHeader && "callout").addClass("highcharts-tooltip-box " + F).attr({
                        padding: e.padding,
                        r: e.borderRadius,
                        fill: e.backgroundColor,
                        stroke: x.color || y.color || "#333333",
                        "stroke-width": e.borderWidth
                    }).add(l.label), x.series && (G.connector = c.path().addClass("highcharts-tooltip-connector " + F).attr({
                        "stroke-width": y.options.lineWidth || 2,
                        stroke: x.color || y.color || "#666666"
                    }).add(l.label), C(x.series, "hide", function() {
                        var a = this.tt;
                        a.connector = a.connector.destroy();
                        a.destroy();
                        this.tt = void 0;
                    })));
                    G.isActive = !0;
                    G.attr({
                        text: a
                    });
                    y = G.getBBox();
                    x.isHeader ? (h = y.height, F = x.plotX + b.plotLeft - y.width / 2) : F = x.plotX + b.plotLeft - t(e.distance, 16) - y.width;
                    0 > F && (m = !1);
                    y = (x.series && x.series.yAxis && x.series.yAxis.pos) + (x.plotY || 0);
                    y -= b.plotTop;
                    f.push({
                        target: x.isHeader ? b.plotHeight + h : y,
                        rank: x.isHeader ? 1 : 0,
                        size: q.tt.getBBox().height + 1,
                        point: x,
                        x: F,
                        tt: G
                    });
                });
                E(b.series, function(a) {
                    var b = a.tt;
                    b && (b.isActive ? b.isActive = !1 : (b.connector = b.connector.destroy(), b.destroy(),
                        a.tt = void 0));
                });
                a.distribute(f, b.plotHeight + h);
                E(f, function(a) {
                    var c = a.point, f = a.tt, d;
                    d = {
                        display: void 0 === a.pos ? "none" : "",
                        x: m || c.isHeader ? a.x : c.plotX + b.plotLeft + t(e.distance, 16),
                        y: a.pos + b.plotTop
                    };
                    c.isHeader && (d.anchorX = c.plotX + b.plotLeft, d.anchorY = d.y - 100);
                    f.attr(d);
                    c.isHeader || f.connector.attr({
                        d: [ "M", c.plotX + b.plotLeft, c.plotY + c.series.yAxis.pos, "L", m ? c.plotX + b.plotLeft - t(e.distance, 16) : c.plotX + b.plotLeft + t(e.distance, 16), a.pos + b.plotTop + f.getBBox().height / 2 ]
                    });
                });
            },
            updatePosition: function(a) {
                var d = this.chart, l = this.label, l = (this.options.positioner || this.getPosition).call(this, l.width, l.height, a);
                this.move(Math.round(l.x), Math.round(l.y || 0), a.plotX + d.plotLeft, a.plotY + d.plotTop);
            },
            getXDateFormat: function(a, d, l) {
                var f;
                d = d.dateTimeLabelFormats;
                var b = l && l.closestPointRange, c, m = {
                    millisecond: 15,
                    second: 12,
                    minute: 9,
                    hour: 6,
                    day: 3
                }, e, h = "millisecond";
                if (b) {
                    e = z("%m-%d %H:%M:%S.%L", a.x);
                    for (c in g) {
                        if (b === g.week && +z("%w", a.x) === l.options.startOfWeek && "00:00:00.000" === e.substr(6)) {
                            c = "week";
                            break;
                        }
                        if (g[c] > b) {
                            c = h;
                            break;
                        }
                        if (m[c] && e.substr(m[c]) !== "01-01 00:00:00.000".substr(m[c])) break;
                        "week" !== c && (h = c);
                    }
                    c && (f = d[c]);
                } else f = d.day;
                return f || d.year;
            },
            tooltipFooterHeaderFormatter: function(a, d) {
                var l = d ? "footer" : "header", f = a.series, b = f.tooltipOptions, c = b.xDateFormat, m = f.xAxis, e = m && "datetime" === m.options.type && n(a.key), l = b[l + "Format"];
                e && !c && (c = this.getXDateFormat(a, b, m));
                e && c && (l = l.replace("{point.key}", "{point.key:" + c + "}"));
                return v(l, {
                    point: a,
                    series: f
                });
            },
            bodyFormatter: function(a) {
                return k(a, function(a) {
                    var d = a.series.tooltipOptions;
                    return (d.pointFormatter || a.point.tooltipFormatter).call(a.point, d.pointFormat);
                });
            }
        };
    })(J);
    (function(a) {
        var C = a.addEvent, z = a.attr, E = a.charts, H = a.color, v = a.css, n = a.defined, k = a.doc, r = a.each, t = a.extend, h = a.fireEvent, u = a.offset, d = a.pick, g = a.removeEvent, q = a.splat, w = a.Tooltip, l = a.win;
        a.hasTouch = k && void 0 !== k.documentElement.ontouchstart;
        a.Pointer = function(a, b) {
            this.init(a, b);
        };
        a.Pointer.prototype = {
            init: function(a, b) {
                this.options = b;
                this.chart = a;
                this.runChartClick = b.chart.events && !!b.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                w && b.tooltip.enabled && (a.tooltip = new w(a, b.tooltip), this.followTouchMove = d(b.tooltip.followTouchMove, !0));
                this.setDOMEvents();
            },
            zoomOption: function() {
                var a = this.chart, b = a.options.chart.zoomType, c = /x/.test(b), b = /y/.test(b), a = a.inverted;
                this.zoomX = c;
                this.zoomY = b;
                this.zoomHor = c && !a || b && a;
                this.zoomVert = b && !a || c && a;
                this.hasZoom = c || b;
            },
            normalize: function(a, b) {
                var c, d;
                a = a || l.event;
                a.target || (a.target = a.srcElement);
                d = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
                b || (this.chartPosition = b = u(this.chart.container));
                void 0 === d.pageX ? (c = Math.max(a.x, a.clientX - b.left), d = a.y) : (c = d.pageX - b.left,
                    d = d.pageY - b.top);
                return t(a, {
                    chartX: Math.round(c),
                    chartY: Math.round(d)
                });
            },
            getCoordinates: function(a) {
                var b = {
                    xAxis: [],
                    yAxis: []
                };
                r(this.chart.axes, function(c) {
                    b[c.isXAxis ? "xAxis" : "yAxis"].push({
                        axis: c,
                        value: c.toValue(a[c.horiz ? "chartX" : "chartY"])
                    });
                });
                return b;
            },
            runPointActions: function(f) {
                var b = this.chart, c = b.series, m = b.tooltip, e = m ? m.shared : !1, l = !0, p = b.hoverPoint, g = b.hoverSeries, x, q, h, y = [], F;
                if (!e && !g) for (x = 0; x < c.length; x++) if (c[x].directTouch || !c[x].options.stickyTracking) c = [];
                g && (e ? g.noSharedTooltip : g.directTouch) && p ? y = [ p ] : (e || !g || g.options.stickyTracking || (c = [ g ]),
                    r(c, function(a) {
                        q = a.noSharedTooltip && e;
                        h = !e && a.directTouch;
                        a.visible && !q && !h && d(a.options.enableMouseTracking, !0) && (F = a.searchPoint(f, !q && 1 === a.kdDimensions)) && F.series && y.push(F);
                    }), y.sort(function(a, b) {
                    var c = a.distX - b.distX, f = a.dist - b.dist;
                    return 0 !== c ? c : 0 !== f ? f : a.series.group.zIndex > b.series.group.zIndex ? -1 : 1;
                }));
                if (e) for (x = y.length; x--; ) (y[x].clientX !== y[0].clientX || y[x].series.noSharedTooltip) && y.splice(x, 1);
                if (y[0] && (y[0] !== this.hoverPoint || m && m.isHidden)) {
                    if (e && !y[0].series.noSharedTooltip) {
                        for (x = 0; 0 <= x; x--) y[x].onMouseOver(f, y[x] !== (g && g.directTouch && p || y[0]));
                        if (g && g.directTouch && p && p !== y[0]) p.onMouseOver(f, !1);
                        y.length && m && m.refresh(y.sort(function(a, b) {
                            return a.series.index - b.series.index;
                        }), f);
                    } else if (m && m.refresh(y[0], f), !g || !g.directTouch) y[0].onMouseOver(f);
                    this.prevKDPoint = y[0];
                    l = !1;
                }
                l && (c = g && g.tooltipOptions.followPointer, m && c && !m.isHidden && (c = m.getAnchor([ {} ], f),
                    m.updatePosition({
                        plotX: c[0],
                        plotY: c[1]
                    })));
                this._onDocumentMouseMove || (this._onDocumentMouseMove = function(b) {
                    if (E[a.hoverChartIndex]) E[a.hoverChartIndex].pointer.onDocumentMouseMove(b);
                }, C(k, "mousemove", this._onDocumentMouseMove));
                r(e ? y : [ d(p, y[0]) ], function(a) {
                    r(b.axes, function(b) {
                        (!a || a.series && a.series[b.coll] === b) && b.drawCrosshair(f, a);
                    });
                });
            },
            reset: function(a, b) {
                var c = this.chart, d = c.hoverSeries, e = c.hoverPoint, l = c.hoverPoints, p = c.tooltip, h = p && p.shared ? l : e;
                a && h && r(q(h), function(b) {
                    b.series.isCartesian && void 0 === b.plotX && (a = !1);
                });
                if (a) p && h && (p.refresh(h), e && (e.setState(e.state, !0), r(c.axes, function(a) {
                    a.crosshair && a.drawCrosshair(null, e);
                }))); else {
                    if (e) e.onMouseOut();
                    l && r(l, function(a) {
                        a.setState();
                    });
                    if (d) d.onMouseOut();
                    p && p.hide(b);
                    this._onDocumentMouseMove && (g(k, "mousemove", this._onDocumentMouseMove), this._onDocumentMouseMove = null);
                    r(c.axes, function(a) {
                        a.hideCrosshair();
                    });
                    this.hoverX = this.prevKDPoint = c.hoverPoints = c.hoverPoint = null;
                }
            },
            scaleGroups: function(a, b) {
                var c = this.chart, d;
                r(c.series, function(e) {
                    d = a || e.getPlotBox();
                    e.xAxis && e.xAxis.zoomEnabled && (e.group.attr(d), e.markerGroup && (e.markerGroup.attr(d),
                        e.markerGroup.clip(b ? c.clipRect : null)), e.dataLabelsGroup && e.dataLabelsGroup.attr(d));
                });
                c.clipRect.attr(b || c.clipBox);
            },
            dragStart: function(a) {
                var b = this.chart;
                b.mouseIsDown = a.type;
                b.cancelClick = !1;
                b.mouseDownX = this.mouseDownX = a.chartX;
                b.mouseDownY = this.mouseDownY = a.chartY;
            },
            drag: function(a) {
                var b = this.chart, c = b.options.chart, d = a.chartX, e = a.chartY, l = this.zoomHor, p = this.zoomVert, g = b.plotLeft, h = b.plotTop, q = b.plotWidth, G = b.plotHeight, y, F = this.selectionMarker, u = this.mouseDownX, A = this.mouseDownY, k = c.panKey && a[c.panKey + "Key"];
                F && F.touch || (d < g ? d = g : d > g + q && (d = g + q), e < h ? e = h : e > h + G && (e = h + G),
                    this.hasDragged = Math.sqrt(Math.pow(u - d, 2) + Math.pow(A - e, 2)), 10 < this.hasDragged && (y = b.isInsidePlot(u - g, A - h),
                    b.hasCartesianSeries && (this.zoomX || this.zoomY) && y && !k && !F && (this.selectionMarker = F = b.renderer.rect(g, h, l ? 1 : q, p ? 1 : G, 0).attr({
                    fill: c.selectionMarkerFill || H("#335cad").setOpacity(.25).get(),
                    "class": "highcharts-selection-marker",
                    zIndex: 7
                }).add()), F && l && (d -= u, F.attr({
                    width: Math.abs(d),
                    x: (0 < d ? 0 : d) + u
                })), F && p && (d = e - A, F.attr({
                    height: Math.abs(d),
                    y: (0 < d ? 0 : d) + A
                })), y && !F && c.panning && b.pan(a, c.panning)));
            },
            drop: function(a) {
                var b = this, c = this.chart, d = this.hasPinched;
                if (this.selectionMarker) {
                    var e = {
                        originalEvent: a,
                        xAxis: [],
                        yAxis: []
                    }, l = this.selectionMarker, p = l.attr ? l.attr("x") : l.x, g = l.attr ? l.attr("y") : l.y, q = l.attr ? l.attr("width") : l.width, u = l.attr ? l.attr("height") : l.height, G;
                    if (this.hasDragged || d) r(c.axes, function(c) {
                        if (c.zoomEnabled && n(c.min) && (d || b[{
                            xAxis: "zoomX",
                            yAxis: "zoomY"
                        }[c.coll]])) {
                            var l = c.horiz, h = "touchend" === a.type ? c.minPixelPadding : 0, A = c.toValue((l ? p : g) + h), l = c.toValue((l ? p + q : g + u) - h);
                            e[c.coll].push({
                                axis: c,
                                min: Math.min(A, l),
                                max: Math.max(A, l)
                            });
                            G = !0;
                        }
                    }), G && h(c, "selection", e, function(a) {
                        c.zoom(t(a, d ? {
                            animation: !1
                        } : null));
                    });
                    this.selectionMarker = this.selectionMarker.destroy();
                    d && this.scaleGroups();
                }
                c && (v(c.container, {
                    cursor: c._cursor
                }), c.cancelClick = 10 < this.hasDragged, c.mouseIsDown = this.hasDragged = this.hasPinched = !1,
                    this.pinchDown = []);
            },
            onContainerMouseDown: function(a) {
                a = this.normalize(a);
                this.zoomOption();
                a.preventDefault && a.preventDefault();
                this.dragStart(a);
            },
            onDocumentMouseUp: function(d) {
                E[a.hoverChartIndex] && E[a.hoverChartIndex].pointer.drop(d);
            },
            onDocumentMouseMove: function(a) {
                var b = this.chart, c = this.chartPosition;
                a = this.normalize(a, c);
                !c || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset();
            },
            onContainerMouseLeave: function(d) {
                var b = E[a.hoverChartIndex];
                b && (d.relatedTarget || d.toElement) && (b.pointer.reset(), b.pointer.chartPosition = null);
            },
            onContainerMouseMove: function(d) {
                var b = this.chart;
                n(a.hoverChartIndex) && E[a.hoverChartIndex] && E[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = b.index);
                d = this.normalize(d);
                d.returnValue = !1;
                "mousedown" === b.mouseIsDown && this.drag(d);
                !this.inClass(d.target, "highcharts-tracker") && !b.isInsidePlot(d.chartX - b.plotLeft, d.chartY - b.plotTop) || b.openMenu || this.runPointActions(d);
            },
            inClass: function(a, b) {
                for (var c; a; ) {
                    if (c = z(a, "class")) {
                        if (-1 !== c.indexOf(b)) return !0;
                        if (-1 !== c.indexOf("highcharts-container")) return !1;
                    }
                    a = a.parentNode;
                }
            },
            onTrackerMouseOut: function(a) {
                var b = this.chart.hoverSeries;
                a = a.relatedTarget || a.toElement;
                if (b && a && !b.options.stickyTracking && !this.inClass(a, "highcharts-tooltip") && !this.inClass(a, "highcharts-series-" + b.index)) b.onMouseOut();
            },
            onContainerClick: function(a) {
                var b = this.chart, c = b.hoverPoint, d = b.plotLeft, e = b.plotTop;
                a = this.normalize(a);
                b.cancelClick || (c && this.inClass(a.target, "highcharts-tracker") ? (h(c.series, "click", t(a, {
                    point: c
                })), b.hoverPoint && c.firePointEvent("click", a)) : (t(a, this.getCoordinates(a)),
                    b.isInsidePlot(a.chartX - d, a.chartY - e) && h(b, "click", a)));
            },
            setDOMEvents: function() {
                var d = this, b = d.chart.container;
                b.onmousedown = function(a) {
                    d.onContainerMouseDown(a);
                };
                b.onmousemove = function(a) {
                    d.onContainerMouseMove(a);
                };
                b.onclick = function(a) {
                    d.onContainerClick(a);
                };
                C(b, "mouseleave", d.onContainerMouseLeave);
                1 === a.chartCount && C(k, "mouseup", d.onDocumentMouseUp);
                a.hasTouch && (b.ontouchstart = function(a) {
                    d.onContainerTouchStart(a);
                }, b.ontouchmove = function(a) {
                    d.onContainerTouchMove(a);
                }, 1 === a.chartCount && C(k, "touchend", d.onDocumentTouchEnd));
            },
            destroy: function() {
                var d;
                g(this.chart.container, "mouseleave", this.onContainerMouseLeave);
                a.chartCount || (g(k, "mouseup", this.onDocumentMouseUp), g(k, "touchend", this.onDocumentTouchEnd));
                clearInterval(this.tooltipTimeout);
                for (d in this) this[d] = null;
            }
        };
    })(J);
    (function(a) {
        var C = a.charts, z = a.each, E = a.extend, H = a.map, v = a.noop, n = a.pick;
        E(a.Pointer.prototype, {
            pinchTranslate: function(a, n, t, h, u, d) {
                (this.zoomHor || this.pinchHor) && this.pinchTranslateDirection(!0, a, n, t, h, u, d);
                (this.zoomVert || this.pinchVert) && this.pinchTranslateDirection(!1, a, n, t, h, u, d);
            },
            pinchTranslateDirection: function(a, n, t, h, u, d, g, q) {
                var w = this.chart, l = a ? "x" : "y", f = a ? "X" : "Y", b = "chart" + f, c = a ? "width" : "height", m = w["plot" + (a ? "Left" : "Top")], e, D, p = q || 1, B = w.inverted, x = w.bounds[a ? "h" : "v"], L = 1 === n.length, G = n[0][b], y = t[0][b], F = !L && n[1][b], K = !L && t[1][b], A;
                t = function() {
                    !L && 20 < Math.abs(G - F) && (p = q || Math.abs(y - K) / Math.abs(G - F));
                    D = (m - y) / p + G;
                    e = w["plot" + (a ? "Width" : "Height")] / p;
                };
                t();
                n = D;
                n < x.min ? (n = x.min, A = !0) : n + e > x.max && (n = x.max - e, A = !0);
                A ? (y -= .8 * (y - g[l][0]), L || (K -= .8 * (K - g[l][1])), t()) : g[l] = [ y, K ];
                B || (d[l] = D - m, d[c] = e);
                d = B ? 1 / p : p;
                u[c] = e;
                u[l] = n;
                h[B ? a ? "scaleY" : "scaleX" : "scale" + f] = p;
                h["translate" + f] = d * m + (y - d * G);
            },
            pinch: function(a) {
                var r = this, t = r.chart, h = r.pinchDown, u = a.touches, d = u.length, g = r.lastValidTouch, q = r.hasZoom, w = r.selectionMarker, l = {}, f = 1 === d && (r.inClass(a.target, "highcharts-tracker") && t.runTrackerClick || r.runChartClick), b = {};
                1 < d && (r.initiated = !0);
                q && r.initiated && !f && a.preventDefault();
                H(u, function(a) {
                    return r.normalize(a);
                });
                "touchstart" === a.type ? (z(u, function(a, b) {
                    h[b] = {
                        chartX: a.chartX,
                        chartY: a.chartY
                    };
                }), g.x = [ h[0].chartX, h[1] && h[1].chartX ], g.y = [ h[0].chartY, h[1] && h[1].chartY ],
                    z(t.axes, function(a) {
                        if (a.zoomEnabled) {
                            var b = t.bounds[a.horiz ? "h" : "v"], d = a.minPixelPadding, f = a.toPixels(n(a.options.min, a.dataMin)), l = a.toPixels(n(a.options.max, a.dataMax)), g = Math.max(f, l);
                            b.min = Math.min(a.pos, Math.min(f, l) - d);
                            b.max = Math.max(a.pos + a.len, g + d);
                        }
                    }), r.res = !0) : h.length && (w || (r.selectionMarker = w = E({
                    destroy: v,
                    touch: !0
                }, t.plotBox)), r.pinchTranslate(h, u, l, w, b, g), r.hasPinched = q, r.scaleGroups(l, b),
                        !q && r.followTouchMove && 1 === d ? this.runPointActions(r.normalize(a)) : r.res && (r.res = !1,
                    this.reset(!1, 0)));
            },
            touch: function(k, r) {
                var t = this.chart, h;
                a.hoverChartIndex = t.index;
                1 === k.touches.length ? (k = this.normalize(k), t.isInsidePlot(k.chartX - t.plotLeft, k.chartY - t.plotTop) && !t.openMenu ? (r && this.runPointActions(k),
                    "touchmove" === k.type && (t = this.pinchDown, h = t[0] ? 4 <= Math.sqrt(Math.pow(t[0].chartX - k.chartX, 2) + Math.pow(t[0].chartY - k.chartY, 2)) : !1),
                    n(h, !0) && this.pinch(k)) : r && this.reset()) : 2 === k.touches.length && this.pinch(k);
            },
            onContainerTouchStart: function(a) {
                this.zoomOption();
                this.touch(a, !0);
            },
            onContainerTouchMove: function(a) {
                this.touch(a);
            },
            onDocumentTouchEnd: function(k) {
                C[a.hoverChartIndex] && C[a.hoverChartIndex].pointer.drop(k);
            }
        });
    })(J);
    (function(a) {
        var C = a.addEvent, z = a.charts, E = a.css, H = a.doc, v = a.extend, n = a.noop, k = a.Pointer, r = a.removeEvent, t = a.win, h = a.wrap;
        if (t.PointerEvent || t.MSPointerEvent) {
            var u = {}, d = !!t.PointerEvent, g = function() {
                var a, d = [];
                d.item = function(a) {
                    return this[a];
                };
                for (a in u) u.hasOwnProperty(a) && d.push({
                    pageX: u[a].pageX,
                    pageY: u[a].pageY,
                    target: u[a].target
                });
                return d;
            }, q = function(d, l, f, b) {
                "touch" !== d.pointerType && d.pointerType !== d.MSPOINTER_TYPE_TOUCH || !z[a.hoverChartIndex] || (b(d),
                    b = z[a.hoverChartIndex].pointer, b[l]({
                    type: f,
                    target: d.currentTarget,
                    preventDefault: n,
                    touches: g()
                }));
            };
            v(k.prototype, {
                onContainerPointerDown: function(a) {
                    q(a, "onContainerTouchStart", "touchstart", function(a) {
                        u[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY,
                            target: a.currentTarget
                        };
                    });
                },
                onContainerPointerMove: function(a) {
                    q(a, "onContainerTouchMove", "touchmove", function(a) {
                        u[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY
                        };
                        u[a.pointerId].target || (u[a.pointerId].target = a.currentTarget);
                    });
                },
                onDocumentPointerUp: function(a) {
                    q(a, "onDocumentTouchEnd", "touchend", function(a) {
                        delete u[a.pointerId];
                    });
                },
                batchMSEvents: function(a) {
                    a(this.chart.container, d ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                    a(this.chart.container, d ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                    a(H, d ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp);
                }
            });
            h(k.prototype, "init", function(a, d, f) {
                a.call(this, d, f);
                this.hasZoom && E(d.container, {
                    "-ms-touch-action": "none",
                    "touch-action": "none"
                });
            });
            h(k.prototype, "setDOMEvents", function(a) {
                a.apply(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(C);
            });
            h(k.prototype, "destroy", function(a) {
                this.batchMSEvents(r);
                a.call(this);
            });
        }
    })(J);
    (function(a) {
        var C, z = a.addEvent, E = a.css, H = a.discardElement, v = a.defined, n = a.each, k = a.extend, r = a.isFirefox, t = a.marginNames, h = a.merge, u = a.pick, d = a.setAnimation, g = a.stableSort, q = a.win, w = a.wrap;
        C = a.Legend = function(a, d) {
            this.init(a, d);
        };
        C.prototype = {
            init: function(a, d) {
                this.chart = a;
                this.setOptions(d);
                d.enabled && (this.render(), z(this.chart, "endResize", function() {
                    this.legend.positionCheckboxes();
                }));
            },
            setOptions: function(a) {
                var d = u(a.padding, 8);
                this.options = a;
                this.itemStyle = a.itemStyle;
                this.itemHiddenStyle = h(this.itemStyle, a.itemHiddenStyle);
                this.itemMarginTop = a.itemMarginTop || 0;
                this.initialItemX = this.padding = d;
                this.initialItemY = d - 5;
                this.itemHeight = this.maxItemWidth = 0;
                this.symbolWidth = u(a.symbolWidth, 16);
                this.pages = [];
            },
            update: function(a, d) {
                var b = this.chart;
                this.setOptions(h(!0, this.options, a));
                this.destroy();
                b.isDirtyLegend = b.isDirtyBox = !0;
                u(d, !0) && b.redraw();
            },
            colorizeItem: function(a, d) {
                a.legendGroup[d ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                var b = this.options, c = a.legendItem, m = a.legendLine, e = a.legendSymbol, g = this.itemHiddenStyle.color, b = d ? b.itemStyle.color : g, p = d ? a.color || g : g, h = a.options && a.options.marker, q = {
                    fill: p
                }, u;
                c && c.css({
                    fill: b,
                    color: b
                });
                m && m.attr({
                    stroke: p
                });
                if (e) {
                    if (h && e.isMarker && (q = a.pointAttribs(), !d)) for (u in q) q[u] = g;
                    e.attr(q);
                }
            },
            positionItem: function(a) {
                var d = this.options, b = d.symbolPadding, d = !d.rtl, c = a._legendItemPos, m = c[0], c = c[1], e = a.checkbox;
                (a = a.legendGroup) && a.element && a.translate(d ? m : this.legendWidth - m - 2 * b - 4, c);
                e && (e.x = m, e.y = c);
            },
            destroyItem: function(a) {
                var d = a.checkbox;
                n([ "legendItem", "legendLine", "legendSymbol", "legendGroup" ], function(b) {
                    a[b] && (a[b] = a[b].destroy());
                });
                d && H(a.checkbox);
            },
            destroy: function() {
                var a = this.group, d = this.box;
                d && (this.box = d.destroy());
                n(this.getAllItems(), function(a) {
                    n([ "legendItem", "legendGroup" ], function(c) {
                        a[c] && (a[c] = a[c].destroy());
                    });
                });
                a && (this.group = a.destroy());
            },
            positionCheckboxes: function(a) {
                var d = this.group.alignAttr, b, c = this.clipHeight || this.legendHeight, m = this.titleHeight;
                d && (b = d.translateY, n(this.allItems, function(e) {
                    var g = e.checkbox, p;
                    g && (p = b + m + g.y + (a || 0) + 3, E(g, {
                        left: d.translateX + e.checkboxOffset + g.x - 20 + "px",
                        top: p + "px",
                        display: p > b - 6 && p < b + c - 6 ? "" : "none"
                    }));
                }));
            },
            renderTitle: function() {
                var a = this.padding, d = this.options.title, b = 0;
                d.text && (this.title || (this.title = this.chart.renderer.label(d.text, a - 3, a - 4, null, null, null, null, null, "legend-title").attr({
                    zIndex: 1
                }).css(d.style).add(this.group)), a = this.title.getBBox(), b = a.height, this.offsetWidth = a.width,
                    this.contentGroup.attr({
                        translateY: b
                    }));
                this.titleHeight = b;
            },
            setText: function(d) {
                var f = this.options;
                d.legendItem.attr({
                    text: f.labelFormat ? a.format(f.labelFormat, d) : f.labelFormatter.call(d)
                });
            },
            renderItem: function(a) {
                var d = this.chart, b = d.renderer, c = this.options, m = "horizontal" === c.layout, e = this.symbolWidth, g = c.symbolPadding, p = this.itemStyle, q = this.itemHiddenStyle, x = this.padding, k = m ? u(c.itemDistance, 20) : 0, G = !c.rtl, y = c.width, F = c.itemMarginBottom || 0, w = this.itemMarginTop, A = this.initialItemX, n = a.legendItem, r = !a.series, t = !r && a.series.drawLegendSymbol ? a.series : a, v = t.options, v = this.createCheckboxForItem && v && v.showCheckbox, S = c.useHTML;
                n || (a.legendGroup = b.g("legend-item").addClass("highcharts-" + t.type + "-series highcharts-color-" + a.colorIndex + " " + (a.options.className || "") + (r ? "highcharts-series-" + a.index : "")).attr({
                    zIndex: 1
                }).add(this.scrollGroup), a.legendItem = n = b.text("", G ? e + g : -g, this.baseline || 0, S).css(h(a.visible ? p : q)).attr({
                    align: G ? "left" : "right",
                    zIndex: 2
                }).add(a.legendGroup), this.baseline || (p = p.fontSize, this.fontMetrics = b.fontMetrics(p, n),
                    this.baseline = this.fontMetrics.f + 3 + w, n.attr("y", this.baseline)), t.drawLegendSymbol(this, a),
                    this.setItemEvents && this.setItemEvents(a, n, S), v && this.createCheckboxForItem(a));
                this.colorizeItem(a, a.visible);
                this.setText(a);
                b = n.getBBox();
                e = a.checkboxOffset = c.itemWidth || a.legendItemWidth || e + g + b.width + k + (v ? 20 : 0);
                this.itemHeight = g = Math.round(a.legendItemHeight || b.height);
                m && this.itemX - A + e > (y || d.chartWidth - 2 * x - A - c.x) && (this.itemX = A,
                    this.itemY += w + this.lastLineHeight + F, this.lastLineHeight = 0);
                this.maxItemWidth = Math.max(this.maxItemWidth, e);
                this.lastItemY = w + this.itemY + F;
                this.lastLineHeight = Math.max(g, this.lastLineHeight);
                a._legendItemPos = [ this.itemX, this.itemY ];
                m ? this.itemX += e : (this.itemY += w + g + F, this.lastLineHeight = g);
                this.offsetWidth = y || Math.max((m ? this.itemX - A - k : e) + x, this.offsetWidth);
            },
            getAllItems: function() {
                var a = [];
                n(this.chart.series, function(d) {
                    var b = d && d.options;
                    d && u(b.showInLegend, v(b.linkedTo) ? !1 : void 0, !0) && (a = a.concat(d.legendItems || ("point" === b.legendType ? d.data : d)));
                });
                return a;
            },
            adjustMargins: function(a, d) {
                var b = this.chart, c = this.options, m = c.align.charAt(0) + c.verticalAlign.charAt(0) + c.layout.charAt(0);
                c.floating || n([ /(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/ ], function(e, g) {
                    e.test(m) && !v(a[g]) && (b[t[g]] = Math.max(b[t[g]], b.legend[(g + 1) % 2 ? "legendHeight" : "legendWidth"] + [ 1, -1, -1, 1 ][g] * c[g % 2 ? "x" : "y"] + u(c.margin, 12) + d[g]));
                });
            },
            render: function() {
                var a = this, d = a.chart, b = d.renderer, c = a.group, m, e, h, p, q = a.box, x = a.options, u = a.padding;
                a.itemX = a.initialItemX;
                a.itemY = a.initialItemY;
                a.offsetWidth = 0;
                a.lastItemY = 0;
                c || (a.group = c = b.g("legend").attr({
                    zIndex: 7
                }).add(), a.contentGroup = b.g().attr({
                    zIndex: 1
                }).add(c), a.scrollGroup = b.g().add(a.contentGroup));
                a.renderTitle();
                m = a.getAllItems();
                g(m, function(a, b) {
                    return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0);
                });
                x.reversed && m.reverse();
                a.allItems = m;
                a.display = e = !!m.length;
                a.lastLineHeight = 0;
                n(m, function(b) {
                    a.renderItem(b);
                });
                h = (x.width || a.offsetWidth) + u;
                p = a.lastItemY + a.lastLineHeight + a.titleHeight;
                p = a.handleOverflow(p);
                p += u;
                q || (a.box = q = b.rect().addClass("highcharts-legend-box").attr({
                    r: x.borderRadius
                }).add(c), q.isNew = !0);
                q.attr({
                    stroke: x.borderColor,
                    "stroke-width": x.borderWidth || 0,
                    fill: x.backgroundColor || "none"
                }).shadow(x.shadow);
                0 < h && 0 < p && (q[q.isNew ? "attr" : "animate"](q.crisp({
                    x: 0,
                    y: 0,
                    width: h,
                    height: p
                }, q.strokeWidth())), q.isNew = !1);
                q[e ? "show" : "hide"]();
                a.legendWidth = h;
                a.legendHeight = p;
                n(m, function(b) {
                    a.positionItem(b);
                });
                e && c.align(k({
                    width: h,
                    height: p
                }, x), !0, "spacingBox");
                d.isResizing || this.positionCheckboxes();
            },
            handleOverflow: function(a) {
                var d = this, b = this.chart, c = b.renderer, m = this.options, e = m.y, e = b.spacingBox.height + ("top" === m.verticalAlign ? -e : e) - this.padding, g = m.maxHeight, p, q = this.clipRect, h = m.navigation, k = u(h.animation, !0), G = h.arrowSize || 12, y = this.nav, F = this.pages, w = this.padding, A, r = this.allItems, t = function(a) {
                    q.attr({
                        height: a
                    });
                    d.contentGroup.div && (d.contentGroup.div.style.clip = "rect(" + w + "px,9999px," + (w + a) + "px,0)");
                };
                "horizontal" === m.layout && (e /= 2);
                g && (e = Math.min(e, g));
                F.length = 0;
                a > e && !1 !== h.enabled ? (this.clipHeight = p = Math.max(e - 20 - this.titleHeight - w, 0),
                    this.currentPage = u(this.currentPage, 1), this.fullHeight = a, n(r, function(a, b) {
                    var c = a._legendItemPos[1], d = Math.round(a.legendItem.getBBox().height), e = F.length;
                    if (!e || c - F[e - 1] > p && (A || c) !== F[e - 1]) F.push(A || c), e++;
                    b === r.length - 1 && c + d - F[e - 1] > p && F.push(c);
                    c !== A && (A = c);
                }), q || (q = d.clipRect = c.clipRect(0, w, 9999, 0), d.contentGroup.clip(q)), t(p),
                    y || (this.nav = y = c.g().attr({
                    zIndex: 1
                }).add(this.group), this.up = c.symbol("triangle", 0, 0, G, G).on("click", function() {
                    d.scroll(-1, k);
                }).add(y), this.pager = c.text("", 15, 10).addClass("highcharts-legend-navigation").css(h.style).add(y),
                    this.down = c.symbol("triangle-down", 0, 0, G, G).on("click", function() {
                        d.scroll(1, k);
                    }).add(y)), d.scroll(0), a = e) : y && (t(b.chartHeight), y.hide(), this.scrollGroup.attr({
                    translateY: 1
                }), this.clipHeight = 0);
                return a;
            },
            scroll: function(a, f) {
                var b = this.pages, c = b.length, m = this.currentPage + a, e = this.clipHeight, g = this.options.navigation, p = this.pager, q = this.padding;
                m > c && (m = c);
                0 < m && (void 0 !== f && d(f, this.chart), this.nav.attr({
                    translateX: q,
                    translateY: e + this.padding + 7 + this.titleHeight,
                    visibility: "visible"
                }), this.up.attr({
                    "class": 1 === m ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                }), p.attr({
                    text: m + "/" + c
                }), this.down.attr({
                    x: 18 + this.pager.getBBox().width,
                    "class": m === c ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                }), this.up.attr({
                    fill: 1 === m ? g.inactiveColor : g.activeColor
                }).css({
                    cursor: 1 === m ? "default" : "pointer"
                }), this.down.attr({
                    fill: m === c ? g.inactiveColor : g.activeColor
                }).css({
                    cursor: m === c ? "default" : "pointer"
                }), b = -b[m - 1] + this.initialItemY, this.scrollGroup.animate({
                    translateY: b
                }), this.currentPage = m, this.positionCheckboxes(b));
            }
        };
        a.LegendSymbolMixin = {
            drawRectangle: function(a, d) {
                var b = a.options, c = b.symbolHeight || a.fontMetrics.f, b = b.squareSymbol;
                d.legendSymbol = this.chart.renderer.rect(b ? (a.symbolWidth - c) / 2 : 0, a.baseline - c + 1, b ? c : a.symbolWidth, c, u(a.options.symbolRadius, c / 2)).addClass("highcharts-point").attr({
                    zIndex: 3
                }).add(d.legendGroup);
            },
            drawLineMarker: function(a) {
                var d = this.options, b = d.marker, c = a.symbolWidth, m = this.chart.renderer, e = this.legendGroup;
                a = a.baseline - Math.round(.3 * a.fontMetrics.b);
                var g;
                g = {
                    "stroke-width": d.lineWidth || 0
                };
                d.dashStyle && (g.dashstyle = d.dashStyle);
                this.legendLine = m.path([ "M", 0, a, "L", c, a ]).addClass("highcharts-graph").attr(g).add(e);
                b && !1 !== b.enabled && (d = b.radius, this.legendSymbol = b = m.symbol(this.symbol, c / 2 - d, a - d, 2 * d, 2 * d, b).addClass("highcharts-point").add(e),
                    b.isMarker = !0);
            }
        };
        (/Trident\/7\.0/.test(q.navigator.userAgent) || r) && w(C.prototype, "positionItem", function(a, d) {
            var b = this, c = function() {
                d._legendItemPos && a.call(b, d);
            };
            c();
            setTimeout(c);
        });
    })(J);
    (function(a) {
        var C = a.addEvent, z = a.animate, E = a.animObject, H = a.attr, v = a.doc, n = a.Axis, k = a.createElement, r = a.defaultOptions, t = a.discardElement, h = a.charts, u = a.css, d = a.defined, g = a.each, q = a.error, w = a.extend, l = a.fireEvent, f = a.getStyle, b = a.grep, c = a.isNumber, m = a.isObject, e = a.isString, D = a.Legend, p = a.marginNames, B = a.merge, x = a.Pointer, L = a.pick, G = a.pInt, y = a.removeEvent, F = a.seriesTypes, K = a.splat, A = a.svg, I = a.syncTimeout, M = a.win, N = a.Renderer, T = a.Chart = function() {
            this.getArgs.apply(this, arguments);
        };
        a.chart = function(a, b, c) {
            return new T(a, b, c);
        };
        T.prototype = {
            callbacks: [],
            getArgs: function() {
                var a = [].slice.call(arguments);
                if (e(a[0]) || a[0].nodeName) this.renderTo = a.shift();
                this.init(a[0], a[1]);
            },
            init: function(b, c) {
                var d, e = b.series;
                b.series = null;
                d = B(r, b);
                d.series = b.series = e;
                this.userOptions = b;
                this.respRules = [];
                var e = d.chart, f = e.events;
                this.margin = [];
                this.spacing = [];
                this.bounds = {
                    h: {},
                    v: {}
                };
                this.callback = c;
                this.isResizing = 0;
                this.options = d;
                this.axes = [];
                this.series = [];
                this.hasCartesianSeries = e.showAxes;
                var m;
                this.index = h.length;
                h.push(this);
                a.chartCount++;
                if (f) for (m in f) C(this, m, f[m]);
                this.xAxis = [];
                this.yAxis = [];
                this.pointCount = this.colorCounter = this.symbolCounter = 0;
                this.firstRender();
            },
            initSeries: function(a) {
                var b = this.options.chart;
                (b = F[a.type || b.type || b.defaultSeriesType]) || q(17, !0);
                b = new b();
                b.init(this, a);
                return b;
            },
            isInsidePlot: function(a, b, c) {
                var d = c ? b : a;
                a = c ? a : b;
                return 0 <= d && d <= this.plotWidth && 0 <= a && a <= this.plotHeight;
            },
            redraw: function(b) {
                var c = this.axes, d = this.series, e = this.pointer, f = this.legend, m = this.isDirtyLegend, y, p, F = this.hasCartesianSeries, q = this.isDirtyBox, h = d.length, x = h, G = this.renderer, A = G.isHidden(), u = [];
                a.setAnimation(b, this);
                A && this.cloneRenderTo();
                for (this.layOutTitles(); x--; ) if (b = d[x], b.options.stacking && (y = !0, b.isDirty)) {
                    p = !0;
                    break;
                }
                if (p) for (x = h; x--; ) b = d[x], b.options.stacking && (b.isDirty = !0);
                g(d, function(a) {
                    a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(),
                        m = !0);
                    a.isDirtyData && l(a, "updatedData");
                });
                m && f.options.enabled && (f.render(), this.isDirtyLegend = !1);
                y && this.getStacks();
                F && g(c, function(a) {
                    a.updateNames();
                    a.setScale();
                });
                this.getMargins();
                F && (g(c, function(a) {
                    a.isDirty && (q = !0);
                }), g(c, function(a) {
                    var b = a.min + "," + a.max;
                    a.extKey !== b && (a.extKey = b, u.push(function() {
                        l(a, "afterSetExtremes", w(a.eventArgs, a.getExtremes()));
                        delete a.eventArgs;
                    }));
                    (q || y) && a.redraw();
                }));
                q && this.drawChartBox();
                g(d, function(a) {
                    a.isDirty && a.visible && (!a.isCartesian || a.xAxis) && a.redraw();
                });
                e && e.reset(!0);
                G.draw();
                l(this, "redraw");
                A && this.cloneRenderTo(!0);
                g(u, function(a) {
                    a.call();
                });
            },
            get: function(a) {
                var b = this.axes, c = this.series, d, e;
                for (d = 0; d < b.length; d++) if (b[d].options.id === a) return b[d];
                for (d = 0; d < c.length; d++) if (c[d].options.id === a) return c[d];
                for (d = 0; d < c.length; d++) for (e = c[d].points || [], b = 0; b < e.length; b++) if (e[b].id === a) return e[b];
                return null;
            },
            getAxes: function() {
                var a = this, b = this.options, c = b.xAxis = K(b.xAxis || {}), b = b.yAxis = K(b.yAxis || {});
                g(c, function(a, b) {
                    a.index = b;
                    a.isX = !0;
                });
                g(b, function(a, b) {
                    a.index = b;
                });
                c = c.concat(b);
                g(c, function(b) {
                    new n(a, b);
                });
            },
            getSelectedPoints: function() {
                var a = [];
                g(this.series, function(c) {
                    a = a.concat(b(c.points || [], function(a) {
                        return a.selected;
                    }));
                });
                return a;
            },
            getSelectedSeries: function() {
                return b(this.series, function(a) {
                    return a.selected;
                });
            },
            setTitle: function(a, b, c) {
                var d = this, e = d.options, f;
                f = e.title = B(e.title, a);
                e = e.subtitle = B(e.subtitle, b);
                g([ [ "title", a, f ], [ "subtitle", b, e ] ], function(a, b) {
                    var c = a[0], e = d[c], f = a[1], m = a[2];
                    e && f && (d[c] = e = e.destroy());
                    m && m.text && !e && (d[c] = d.renderer.text(m.text, 0, 0, m.useHTML).attr({
                        align: m.align,
                        "class": "highcharts-" + c,
                        zIndex: m.zIndex || 4
                    }).add(), d[c].update = function(a) {
                        d.setTitle(!b && a, b && a);
                    }, d[c].css(m.style));
                });
                d.layOutTitles(c);
            },
            layOutTitles: function(a) {
                var b = 0, c, d = this.renderer, e = this.spacingBox;
                g([ "title", "subtitle" ], function(a) {
                    var c = this[a], f = this.options[a], m;
                    c && (m = f.style.fontSize, m = d.fontMetrics(m, c).b, c.css({
                        width: (f.width || e.width + f.widthAdjust) + "px"
                    }).align(w({
                        y: b + m + ("title" === a ? -3 : 2)
                    }, f), !1, "spacingBox"), f.floating || f.verticalAlign || (b = Math.ceil(b + c.getBBox().height)));
                }, this);
                c = this.titleOffset !== b;
                this.titleOffset = b;
                !this.isDirtyBox && c && (this.isDirtyBox = c, this.hasRendered && L(a, !0) && this.isDirtyBox && this.redraw());
            },
            getChartSize: function() {
                var a = this.options.chart, b = a.width, a = a.height, c = this.renderToClone || this.renderTo;
                d(b) || (this.containerWidth = f(c, "width"));
                d(a) || (this.containerHeight = f(c, "height"));
                this.chartWidth = Math.max(0, b || this.containerWidth || 600);
                this.chartHeight = Math.max(0, L(a, 19 < this.containerHeight ? this.containerHeight : 400));
            },
            cloneRenderTo: function(a) {
                var b = this.renderToClone, c = this.container;
                if (a) {
                    if (b) {
                        for (;b.childNodes.length; ) this.renderTo.appendChild(b.firstChild);
                        t(b);
                        delete this.renderToClone;
                    }
                } else c && c.parentNode === this.renderTo && this.renderTo.removeChild(c), this.renderToClone = b = this.renderTo.cloneNode(0),
                    u(b, {
                        position: "absolute",
                        top: "-9999px",
                        display: "block"
                    }), b.style.setProperty && b.style.setProperty("display", "block", "important"),
                    v.body.appendChild(b), c && b.appendChild(c);
            },
            setClassName: function(a) {
                this.container.className = "highcharts-container " + (a || "");
            },
            getContainer: function() {
                var b, d = this.options, f = d.chart, m, y;
                b = this.renderTo;
                var g = "highcharts-" + a.idCounter++, p;
                b || (this.renderTo = b = f.renderTo);
                e(b) && (this.renderTo = b = v.getElementById(b));
                b || q(13, !0);
                m = G(H(b, "data-highcharts-chart"));
                c(m) && h[m] && h[m].hasRendered && h[m].destroy();
                H(b, "data-highcharts-chart", this.index);
                b.innerHTML = "";
                f.skipClone || b.offsetWidth || this.cloneRenderTo();
                this.getChartSize();
                m = this.chartWidth;
                y = this.chartHeight;
                p = w({
                    position: "relative",
                    overflow: "hidden",
                    width: m + "px",
                    height: y + "px",
                    textAlign: "left",
                    lineHeight: "normal",
                    zIndex: 0,
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                });
                this.container = b = k("div", {
                    id: g
                }, p, this.renderToClone || b);
                this._cursor = b.style.cursor;
                this.renderer = new (a[f.renderer] || N)(b, m, y, null, f.forExport, d.exporting && d.exporting.allowHTML);
                this.setClassName(f.className);
                this.renderer.setStyle(f.style);
                this.renderer.chartIndex = this.index;
            },
            getMargins: function(a) {
                var b = this.spacing, c = this.margin, e = this.titleOffset;
                this.resetMargins();
                e && !d(c[0]) && (this.plotTop = Math.max(this.plotTop, e + this.options.title.margin + b[0]));
                this.legend.display && this.legend.adjustMargins(c, b);
                this.extraBottomMargin && (this.marginBottom += this.extraBottomMargin);
                this.extraTopMargin && (this.plotTop += this.extraTopMargin);
                a || this.getAxisMargins();
            },
            getAxisMargins: function() {
                var a = this, b = a.axisOffset = [ 0, 0, 0, 0 ], c = a.margin;
                a.hasCartesianSeries && g(a.axes, function(a) {
                    a.visible && a.getOffset();
                });
                g(p, function(e, f) {
                    d(c[f]) || (a[e] += b[f]);
                });
                a.setChartSize();
            },
            reflow: function(a) {
                var b = this, c = b.options.chart, e = b.renderTo, m = d(c.width), y = c.width || f(e, "width"), c = c.height || f(e, "height"), e = a ? a.target : M;
                if (!m && !b.isPrinting && y && c && (e === M || e === v)) {
                    if (y !== b.containerWidth || c !== b.containerHeight) clearTimeout(b.reflowTimeout),
                        b.reflowTimeout = I(function() {
                            b.container && b.setSize(void 0, void 0, !1);
                        }, a ? 100 : 0);
                    b.containerWidth = y;
                    b.containerHeight = c;
                }
            },
            initReflow: function() {
                var a = this, b = function(b) {
                    a.reflow(b);
                };
                C(M, "resize", b);
                C(a, "destroy", function() {
                    y(M, "resize", b);
                });
            },
            setSize: function(b, c, d) {
                var e = this, f = e.renderer;
                e.isResizing += 1;
                a.setAnimation(d, e);
                e.oldChartHeight = e.chartHeight;
                e.oldChartWidth = e.chartWidth;
                void 0 !== b && (e.options.chart.width = b);
                void 0 !== c && (e.options.chart.height = c);
                e.getChartSize();
                b = f.globalAnimation;
                (b ? z : u)(e.container, {
                    width: e.chartWidth + "px",
                    height: e.chartHeight + "px"
                }, b);
                e.setChartSize(!0);
                f.setSize(e.chartWidth, e.chartHeight, d);
                g(e.axes, function(a) {
                    a.isDirty = !0;
                    a.setScale();
                });
                g(e.series, function(a) {
                    a.isDirty = !0;
                });
                e.isDirtyLegend = !0;
                e.isDirtyBox = !0;
                e.layOutTitles();
                e.getMargins();
                e.setResponsive && e.setResponsive(!1);
                e.redraw(d);
                e.oldChartHeight = null;
                l(e, "resize");
                I(function() {
                    e && l(e, "endResize", null, function() {
                        --e.isResizing;
                    });
                }, E(b).duration);
            },
            setChartSize: function(a) {
                var b = this.inverted, c = this.renderer, d = this.chartWidth, e = this.chartHeight, f = this.options.chart, m = this.spacing, y = this.clipOffset, p, l, F, q;
                this.plotLeft = p = Math.round(this.plotLeft);
                this.plotTop = l = Math.round(this.plotTop);
                this.plotWidth = F = Math.max(0, Math.round(d - p - this.marginRight));
                this.plotHeight = q = Math.max(0, Math.round(e - l - this.marginBottom));
                this.plotSizeX = b ? q : F;
                this.plotSizeY = b ? F : q;
                this.plotBorderWidth = f.plotBorderWidth || 0;
                this.spacingBox = c.spacingBox = {
                    x: m[3],
                    y: m[0],
                    width: d - m[3] - m[1],
                    height: e - m[0] - m[2]
                };
                this.plotBox = c.plotBox = {
                    x: p,
                    y: l,
                    width: F,
                    height: q
                };
                d = 2 * Math.floor(this.plotBorderWidth / 2);
                b = Math.ceil(Math.max(d, y[3]) / 2);
                c = Math.ceil(Math.max(d, y[0]) / 2);
                this.clipBox = {
                    x: b,
                    y: c,
                    width: Math.floor(this.plotSizeX - Math.max(d, y[1]) / 2 - b),
                    height: Math.max(0, Math.floor(this.plotSizeY - Math.max(d, y[2]) / 2 - c))
                };
                a || g(this.axes, function(a) {
                    a.setAxisSize();
                    a.setAxisTranslation();
                });
            },
            resetMargins: function() {
                var a = this, b = a.options.chart;
                g([ "margin", "spacing" ], function(c) {
                    var d = b[c], e = m(d) ? d : [ d, d, d, d ];
                    g([ "Top", "Right", "Bottom", "Left" ], function(d, f) {
                        a[c][f] = L(b[c + d], e[f]);
                    });
                });
                g(p, function(b, c) {
                    a[b] = L(a.margin[c], a.spacing[c]);
                });
                a.axisOffset = [ 0, 0, 0, 0 ];
                a.clipOffset = [ 0, 0, 0, 0 ];
            },
            drawChartBox: function() {
                var a = this.options.chart, b = this.renderer, c = this.chartWidth, d = this.chartHeight, e = this.chartBackground, f = this.plotBackground, m = this.plotBorder, y, g = this.plotBGImage, p = a.backgroundColor, l = a.plotBackgroundColor, F = a.plotBackgroundImage, q, h = this.plotLeft, x = this.plotTop, G = this.plotWidth, A = this.plotHeight, u = this.plotBox, B = this.clipRect, k = this.clipBox, w = "animate";
                e || (this.chartBackground = e = b.rect().addClass("highcharts-background").add(),
                    w = "attr");
                y = a.borderWidth || 0;
                q = y + (a.shadow ? 8 : 0);
                p = {
                    fill: p || "none"
                };
                if (y || e["stroke-width"]) p.stroke = a.borderColor, p["stroke-width"] = y;
                e.attr(p).shadow(a.shadow);
                e[w]({
                    x: q / 2,
                    y: q / 2,
                    width: c - q - y % 2,
                    height: d - q - y % 2,
                    r: a.borderRadius
                });
                w = "animate";
                f || (w = "attr", this.plotBackground = f = b.rect().addClass("highcharts-plot-background").add());
                f[w](u);
                f.attr({
                    fill: l || "none"
                }).shadow(a.plotShadow);
                F && (g ? g.animate(u) : this.plotBGImage = b.image(F, h, x, G, A).add());
                B ? B.animate({
                    width: k.width,
                    height: k.height
                }) : this.clipRect = b.clipRect(k);
                w = "animate";
                m || (w = "attr", this.plotBorder = m = b.rect().addClass("highcharts-plot-border").attr({
                    zIndex: 1
                }).add());
                m.attr({
                    stroke: a.plotBorderColor,
                    "stroke-width": a.plotBorderWidth || 0,
                    fill: "none"
                });
                m[w](m.crisp({
                    x: h,
                    y: x,
                    width: G,
                    height: A
                }, -m.strokeWidth()));
                this.isDirtyBox = !1;
            },
            propFromSeries: function() {
                var a = this, b = a.options.chart, c, d = a.options.series, e, f;
                g([ "inverted", "angular", "polar" ], function(m) {
                    c = F[b.type || b.defaultSeriesType];
                    f = b[m] || c && c.prototype[m];
                    for (e = d && d.length; !f && e--; ) (c = F[d[e].type]) && c.prototype[m] && (f = !0);
                    a[m] = f;
                });
            },
            linkSeries: function() {
                var a = this, b = a.series;
                g(b, function(a) {
                    a.linkedSeries.length = 0;
                });
                g(b, function(b) {
                    var c = b.options.linkedTo;
                    e(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b),
                        b.linkedParent = c, b.visible = L(b.options.visible, c.options.visible, b.visible));
                });
            },
            renderSeries: function() {
                g(this.series, function(a) {
                    a.translate();
                    a.render();
                });
            },
            renderLabels: function() {
                var a = this, b = a.options.labels;
                b.items && g(b.items, function(c) {
                    var d = w(b.style, c.style), e = G(d.left) + a.plotLeft, f = G(d.top) + a.plotTop + 12;
                    delete d.left;
                    delete d.top;
                    a.renderer.text(c.html, e, f).attr({
                        zIndex: 2
                    }).css(d).add();
                });
            },
            render: function() {
                var a = this.axes, b = this.renderer, c = this.options, d, e, f;
                this.setTitle();
                this.legend = new D(this, c.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                c = this.plotWidth;
                d = this.plotHeight -= 21;
                g(a, function(a) {
                    a.setScale();
                });
                this.getAxisMargins();
                e = 1.1 < c / this.plotWidth;
                f = 1.05 < d / this.plotHeight;
                if (e || f) g(a, function(a) {
                    (a.horiz && e || !a.horiz && f) && a.setTickInterval(!0);
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries && g(a, function(a) {
                    a.visible && a.render();
                });
                this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({
                    zIndex: 3
                }).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0;
            },
            addCredits: function(a) {
                var b = this;
                a = B(!0, this.options.credits, a);
                a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function() {
                    a.href && (M.location.href = a.href);
                }).attr({
                    align: a.position.align,
                    zIndex: 8
                }).css(a.style).add().align(a.position), this.credits.update = function(a) {
                    b.credits = b.credits.destroy();
                    b.addCredits(a);
                });
            },
            destroy: function() {
                var b = this, c = b.axes, d = b.series, e = b.container, f, m = e && e.parentNode;
                l(b, "destroy");
                h[b.index] = void 0;
                a.chartCount--;
                b.renderTo.removeAttribute("data-highcharts-chart");
                y(b);
                for (f = c.length; f--; ) c[f] = c[f].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (f = d.length; f--; ) d[f] = d[f].destroy();
                g("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "), function(a) {
                    var c = b[a];
                    c && c.destroy && (b[a] = c.destroy());
                });
                e && (e.innerHTML = "", y(e), m && t(e));
                for (f in b) delete b[f];
            },
            isReadyToRender: function() {
                var a = this;
                return A || M != M.top || "complete" === v.readyState ? !0 : (v.attachEvent("onreadystatechange", function() {
                    v.detachEvent("onreadystatechange", a.firstRender);
                    "complete" === v.readyState && a.firstRender();
                }), !1);
            },
            firstRender: function() {
                var a = this, b = a.options;
                if (a.isReadyToRender()) {
                    a.getContainer();
                    l(a, "init");
                    a.resetMargins();
                    a.setChartSize();
                    a.propFromSeries();
                    a.getAxes();
                    g(b.series || [], function(b) {
                        a.initSeries(b);
                    });
                    a.linkSeries();
                    l(a, "beforeRender");
                    x && (a.pointer = new x(a, b));
                    a.render();
                    a.renderer.draw();
                    if (!a.renderer.imgCount && a.onload) a.onload();
                    a.cloneRenderTo(!0);
                }
            },
            onload: function() {
                g([ this.callback ].concat(this.callbacks), function(a) {
                    a && void 0 !== this.index && a.apply(this, [ this ]);
                }, this);
                l(this, "load");
                this.initReflow();
                this.onload = null;
            }
        };
    })(J);
    (function(a) {
        var C, z = a.each, E = a.extend, H = a.erase, v = a.fireEvent, n = a.format, k = a.isArray, r = a.isNumber, t = a.pick, h = a.removeEvent;
        C = a.Point = function() {};
        C.prototype = {
            init: function(a, d, g) {
                this.series = a;
                this.color = a.color;
                this.applyOptions(d, g);
                a.options.colorByPoint ? (d = a.options.colors || a.chart.options.colors, this.color = this.color || d[a.colorCounter],
                    d = d.length, g = a.colorCounter, a.colorCounter++, a.colorCounter === d && (a.colorCounter = 0)) : g = a.colorIndex;
                this.colorIndex = t(this.colorIndex, g);
                a.chart.pointCount++;
                return this;
            },
            applyOptions: function(a, d) {
                var g = this.series, q = g.options.pointValKey || g.pointValKey;
                a = C.prototype.optionsToObject.call(this, a);
                E(this, a);
                this.options = this.options ? E(this.options, a) : a;
                a.group && delete this.group;
                q && (this.y = this[q]);
                this.isNull = t(this.isValid && !this.isValid(), null === this.x || !r(this.y, !0));
                "name" in this && void 0 === d && g.xAxis && g.xAxis.hasNames && (this.x = g.xAxis.nameToX(this));
                void 0 === this.x && g && (this.x = void 0 === d ? g.autoIncrement(this) : d);
                return this;
            },
            optionsToObject: function(a) {
                var d = {}, g = this.series, q = g.options.keys, h = q || g.pointArrayMap || [ "y" ], l = h.length, f = 0, b = 0;
                if (r(a) || null === a) d[h[0]] = a; else if (k(a)) for (!q && a.length > l && (g = typeof a[0],
                        "string" === g ? d.name = a[0] : "number" === g && (d.x = a[0]), f++); b < l; ) q && void 0 === a[f] || (d[h[b]] = a[f]),
                    f++, b++; else "object" === typeof a && (d = a, a.dataLabels && (g._hasPointLabels = !0),
                    a.marker && (g._hasPointMarkers = !0));
                return d;
            },
            getClassName: function() {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "");
            },
            getZone: function() {
                var a = this.series, d = a.zones, a = a.zoneAxis || "y", g = 0, q;
                for (q = d[g]; this[a] >= q.value; ) q = d[++g];
                q && q.color && !this.options.color && (this.color = q.color);
                return q;
            },
            destroy: function() {
                var a = this.series.chart, d = a.hoverPoints, g;
                a.pointCount--;
                d && (this.setState(), H(d, this), d.length || (a.hoverPoints = null));
                if (this === a.hoverPoint) this.onMouseOut();
                if (this.graphic || this.dataLabel) h(this), this.destroyElements();
                this.legendItem && a.legend.destroyItem(this);
                for (g in this) this[g] = null;
            },
            destroyElements: function() {
                for (var a = [ "graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup" ], d, g = 6; g--; ) d = a[g],
                    this[d] && (this[d] = this[d].destroy());
            },
            getLabelConfig: function() {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                };
            },
            tooltipFormatter: function(a) {
                var d = this.series, g = d.tooltipOptions, q = t(g.valueDecimals, ""), h = g.valuePrefix || "", l = g.valueSuffix || "";
                z(d.pointArrayMap || [ "y" ], function(d) {
                    d = "{point." + d;
                    if (h || l) a = a.replace(d + "}", h + d + "}" + l);
                    a = a.replace(d + "}", d + ":,." + q + "f}");
                });
                return n(a, {
                    point: this,
                    series: this.series
                });
            },
            firePointEvent: function(a, d, g) {
                var q = this, h = this.series.options;
                (h.point.events[a] || q.options && q.options.events && q.options.events[a]) && this.importEvents();
                "click" === a && h.allowPointSelect && (g = function(a) {
                    q.select && q.select(null, a.ctrlKey || a.metaKey || a.shiftKey);
                });
                v(this, a, d, g);
            },
            visible: !0
        };
    })(J);
    (function(a) {
        var C = a.addEvent, z = a.animObject, E = a.arrayMax, H = a.arrayMin, v = a.correctFloat, n = a.Date, k = a.defaultOptions, r = a.defaultPlotOptions, t = a.defined, h = a.each, u = a.erase, d = a.error, g = a.extend, q = a.fireEvent, w = a.grep, l = a.isArray, f = a.isNumber, b = a.isString, c = a.merge, m = a.pick, e = a.removeEvent, D = a.splat, p = a.stableSort, B = a.SVGElement, x = a.syncTimeout, L = a.win;
        a.Series = a.seriesType("line", null, {
            lineWidth: 2,
            allowPointSelect: !1,
            showCheckbox: !1,
            animation: {
                duration: 1e3
            },
            events: {},
            marker: {
                lineWidth: 0,
                lineColor: "#ffffff",
                radius: 4,
                states: {
                    hover: {
                        enabled: !0,
                        radiusPlus: 2,
                        lineWidthPlus: 1
                    },
                    select: {
                        fillColor: "#cccccc",
                        lineColor: "#000000",
                        lineWidth: 2
                    }
                }
            },
            point: {
                events: {}
            },
            dataLabels: {
                align: "center",
                formatter: function() {
                    return null === this.y ? "" : a.numberFormat(this.y, -1);
                },
                style: {
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "contrast",
                    textShadow: "1px 1px contrast, -1px -1px contrast, -1px 1px contrast, 1px -1px contrast"
                },
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                padding: 5
            },
            cropThreshold: 300,
            pointRange: 0,
            softThreshold: !0,
            states: {
                hover: {
                    lineWidthPlus: 1,
                    marker: {},
                    halo: {
                        size: 10,
                        opacity: .25
                    }
                },
                select: {
                    marker: {}
                }
            },
            stickyTracking: !0,
            turboThreshold: 1e3
        }, {
            isCartesian: !0,
            pointClass: a.Point,
            sorted: !0,
            requireSorting: !0,
            directTouch: !1,
            axisTypes: [ "xAxis", "yAxis" ],
            colorCounter: 0,
            parallelArrays: [ "x", "y" ],
            coll: "series",
            init: function(a, b) {
                var c = this, d, e, f = a.series, l = function(a, b) {
                    return m(a.options.index, a._i) - m(b.options.index, b._i);
                };
                c.chart = a;
                c.options = b = c.setOptions(b);
                c.linkedSeries = [];
                c.bindAxes();
                g(c, {
                    name: b.name,
                    state: "",
                    visible: !1 !== b.visible,
                    selected: !0 === b.selected
                });
                e = b.events;
                for (d in e) C(c, d, e[d]);
                if (e && e.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) a.runTrackerClick = !0;
                c.getColor();
                c.getSymbol();
                h(c.parallelArrays, function(a) {
                    c[a + "Data"] = [];
                });
                c.setData(b.data, !1);
                c.isCartesian && (a.hasCartesianSeries = !0);
                f.push(c);
                c._i = f.length - 1;
                p(f, l);
                this.yAxis && p(this.yAxis.series, l);
                h(f, function(a, b) {
                    a.index = b;
                    a.name = a.name || "Series " + (b + 1);
                });
            },
            bindAxes: function() {
                var a = this, b = a.options, c = a.chart, e;
                h(a.axisTypes || [], function(f) {
                    h(c[f], function(c) {
                        e = c.options;
                        if (b[f] === e.index || void 0 !== b[f] && b[f] === e.id || void 0 === b[f] && 0 === e.index) c.series.push(a),
                            a[f] = c, c.isDirty = !0;
                    });
                    a[f] || a.optionalAxis === f || d(18, !0);
                });
            },
            updateParallelArrays: function(a, b) {
                var c = a.series, d = arguments, e = f(b) ? function(d) {
                    var e = "y" === d && c.toYData ? c.toYData(a) : a[d];
                    c[d + "Data"][b] = e;
                } : function(a) {
                    Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(d, 2));
                };
                h(c.parallelArrays, e);
            },
            autoIncrement: function() {
                var a = this.options, b = this.xIncrement, c, d = a.pointIntervalUnit, b = m(b, a.pointStart, 0);
                this.pointInterval = c = m(this.pointInterval, a.pointInterval, 1);
                d && (a = new n(b), "day" === d ? a = +a[n.hcSetDate](a[n.hcGetDate]() + c) : "month" === d ? a = +a[n.hcSetMonth](a[n.hcGetMonth]() + c) : "year" === d && (a = +a[n.hcSetFullYear](a[n.hcGetFullYear]() + c)),
                    c = a - b);
                this.xIncrement = b + c;
                return b;
            },
            setOptions: function(a) {
                var b = this.chart, d = b.options.plotOptions, b = b.userOptions || {}, e = b.plotOptions || {}, f = d[this.type];
                this.userOptions = a;
                d = c(f, d.series, a);
                this.tooltipOptions = c(k.tooltip, k.plotOptions[this.type].tooltip, b.tooltip, e.series && e.series.tooltip, e[this.type] && e[this.type].tooltip, a.tooltip);
                null === f.marker && delete d.marker;
                this.zoneAxis = d.zoneAxis;
                a = this.zones = (d.zones || []).slice();
                !d.negativeColor && !d.negativeFillColor || d.zones || a.push({
                    value: d[this.zoneAxis + "Threshold"] || d.threshold || 0,
                    className: "highcharts-negative",
                    color: d.negativeColor,
                    fillColor: d.negativeFillColor
                });
                a.length && t(a[a.length - 1].value) && a.push({
                    color: this.color,
                    fillColor: this.fillColor
                });
                return d;
            },
            getCyclic: function(a, b, c) {
                var d, e = this.userOptions, f = a + "Index", g = a + "Counter", p = c ? c.length : m(this.chart.options.chart[a + "Count"], this.chart[a + "Count"]);
                b || (d = m(e[f], e["_" + f]), t(d) || (e["_" + f] = d = this.chart[g] % p, this.chart[g] += 1),
                    c && (b = c[d]));
                void 0 !== d && (this[f] = d);
                this[a] = b;
            },
            getColor: function() {
                this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || r[this.type].color, this.chart.options.colors);
            },
            getSymbol: function() {
                var a = this.options.marker;
                this.getCyclic("symbol", a.symbol, this.chart.options.symbols);
                /^url/.test(this.symbol) && (a.radius = 0);
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
            setData: function(a, c, e, g) {
                var p = this, q = p.points, x = q && q.length || 0, B, k = p.options, u = p.chart, w = null, n = p.xAxis, D = k.turboThreshold, r = this.xData, t = this.yData, v = (B = p.pointArrayMap) && B.length;
                a = a || [];
                B = a.length;
                c = m(c, !0);
                if (!1 !== g && B && x === B && !p.cropped && !p.hasGroupedData && p.visible) h(a, function(a, b) {
                    q[b].update && a !== k.data[b] && q[b].update(a, !1, null, !1);
                }); else {
                    p.xIncrement = null;
                    p.colorCounter = 0;
                    h(this.parallelArrays, function(a) {
                        p[a + "Data"].length = 0;
                    });
                    if (D && B > D) {
                        for (e = 0; null === w && e < B; ) w = a[e], e++;
                        if (f(w)) for (e = 0; e < B; e++) r[e] = this.autoIncrement(), t[e] = a[e]; else if (l(w)) if (v) for (e = 0; e < B; e++) w = a[e],
                            r[e] = w[0], t[e] = w.slice(1, v + 1); else for (e = 0; e < B; e++) w = a[e], r[e] = w[0],
                            t[e] = w[1]; else d(12);
                    } else for (e = 0; e < B; e++) void 0 !== a[e] && (w = {
                        series: p
                    }, p.pointClass.prototype.applyOptions.apply(w, [ a[e] ]), p.updateParallelArrays(w, e));
                    b(t[0]) && d(14, !0);
                    p.data = [];
                    p.options.data = p.userOptions.data = a;
                    for (e = x; e--; ) q[e] && q[e].destroy && q[e].destroy();
                    n && (n.minRange = n.userMinRange);
                    p.isDirty = u.isDirtyBox = !0;
                    p.isDirtyData = !!q;
                    e = !1;
                }
                "point" === k.legendType && (this.processData(), this.generatePoints());
                c && u.redraw(e);
            },
            processData: function(a) {
                var b = this.xData, c = this.yData, e = b.length, f;
                f = 0;
                var m, p, g = this.xAxis, l, q = this.options;
                l = q.cropThreshold;
                var h = this.getExtremesFromAll || q.getExtremesFromAll, x = this.isCartesian, q = g && g.val2lin, B = g && g.isLog, k, u;
                if (x && !this.isDirty && !g.isDirty && !this.yAxis.isDirty && !a) return !1;
                g && (a = g.getExtremes(), k = a.min, u = a.max);
                if (x && this.sorted && !h && (!l || e > l || this.forceCrop)) if (b[e - 1] < k || b[0] > u) b = [],
                    c = []; else if (b[0] < k || b[e - 1] > u) f = this.cropData(this.xData, this.yData, k, u),
                    b = f.xData, c = f.yData, f = f.start, m = !0;
                for (l = b.length || 1; --l; ) e = B ? q(b[l]) - q(b[l - 1]) : b[l] - b[l - 1],
                        0 < e && (void 0 === p || e < p) ? p = e : 0 > e && this.requireSorting && d(15);
                this.cropped = m;
                this.cropStart = f;
                this.processedXData = b;
                this.processedYData = c;
                this.closestPointRange = p;
            },
            cropData: function(a, b, c, d) {
                var e = a.length, f = 0, g = e, p = m(this.cropShoulder, 1), l;
                for (l = 0; l < e; l++) if (a[l] >= c) {
                    f = Math.max(0, l - p);
                    break;
                }
                for (c = l; c < e; c++) if (a[c] > d) {
                    g = c + p;
                    break;
                }
                return {
                    xData: a.slice(f, g),
                    yData: b.slice(f, g),
                    start: f,
                    end: g
                };
            },
            generatePoints: function() {
                var a = this.options.data, b = this.data, c, d = this.processedXData, e = this.processedYData, f = this.pointClass, m = d.length, g = this.cropStart || 0, p, l = this.hasGroupedData, q, h = [], x;
                b || l || (b = [], b.length = a.length, b = this.data = b);
                for (x = 0; x < m; x++) p = g + x, l ? (h[x] = new f().init(this, [ d[x] ].concat(D(e[x]))),
                    h[x].dataGroup = this.groupMap[x]) : (b[p] ? q = b[p] : void 0 !== a[p] && (b[p] = q = new f().init(this, a[p], d[x])),
                    h[x] = q), h[x].index = p;
                if (b && (m !== (c = b.length) || l)) for (x = 0; x < c; x++) x !== g || l || (x += m),
                    b[x] && (b[x].destroyElements(), b[x].plotX = void 0);
                this.data = b;
                this.points = h;
            },
            getExtremes: function(a) {
                var b = this.yAxis, c = this.processedXData, d, e = [], m = 0;
                d = this.xAxis.getExtremes();
                var p = d.min, g = d.max, q, h, x, B;
                a = a || this.stackedYData || this.processedYData || [];
                d = a.length;
                for (B = 0; B < d; B++) if (h = c[B], x = a[B], q = (f(x, !0) || l(x)) && (!b.isLog || x.length || 0 < x),
                    h = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (c[B + 1] || h) >= p && (c[B - 1] || h) <= g,
                    q && h) if (q = x.length) for (;q--; ) null !== x[q] && (e[m++] = x[q]); else e[m++] = x;
                this.dataMin = H(e);
                this.dataMax = E(e);
            },
            translate: function() {
                this.processedXData || this.processData();
                this.generatePoints();
                for (var a = this.options, b = a.stacking, c = this.xAxis, d = c.categories, e = this.yAxis, p = this.points, g = p.length, l = !!this.modifyValue, q = a.pointPlacement, h = "between" === q || f(q), x = a.threshold, B = a.startFromThreshold ? x : 0, k, u, w, n, r = Number.MAX_VALUE, a = 0; a < g; a++) {
                    var D = p[a], L = D.x, z = D.y;
                    u = D.low;
                    var E = b && e.stacks[(this.negStacks && z < (B ? 0 : x) ? "-" : "") + this.stackKey], C;
                    e.isLog && null !== z && 0 >= z && (D.isNull = !0);
                    D.plotX = k = v(Math.min(Math.max(-1e5, c.translate(L, 0, 0, 0, 1, q, "flags" === this.type)), 1e5));
                    b && this.visible && !D.isNull && E && E[L] && (n = this.getStackIndicator(n, L, this.index),
                        C = E[L], z = C.points[n.key], u = z[0], z = z[1], u === B && n.key === E[L].base && (u = m(x, e.min)),
                        e.isLog && 0 >= u && (u = null), D.total = D.stackTotal = C.total, D.percentage = C.total && D.y / C.total * 100,
                        D.stackY = z, C.setOffset(this.pointXOffset || 0, this.barW || 0));
                    D.yBottom = t(u) ? e.translate(u, 0, 1, 0, 1) : null;
                    l && (z = this.modifyValue(z, D));
                    D.plotY = u = "number" === typeof z && Infinity !== z ? Math.min(Math.max(-1e5, e.translate(z, 0, 1, 0, 1)), 1e5) : void 0;
                    D.isInside = void 0 !== u && 0 <= u && u <= e.len && 0 <= k && k <= c.len;
                    D.clientX = h ? v(c.translate(L, 0, 0, 0, 1, q)) : k;
                    D.negative = D.y < (x || 0);
                    D.category = d && void 0 !== d[D.x] ? d[D.x] : D.x;
                    D.isNull || (void 0 !== w && (r = Math.min(r, Math.abs(k - w))), w = k);
                }
                this.closestPointRangePx = r;
            },
            getValidPoints: function(a, b) {
                var c = this.chart;
                return w(a || this.points || [], function(a) {
                    return b && !c.isInsidePlot(a.plotX, a.plotY, c.inverted) ? !1 : !a.isNull;
                });
            },
            setClip: function(a) {
                var b = this.chart, c = this.options, d = b.renderer, e = b.inverted, f = this.clipBox, m = f || b.clipBox, p = this.sharedClipKey || [ "_sharedClip", a && a.duration, a && a.easing, m.height, c.xAxis, c.yAxis ].join(), g = b[p], l = b[p + "m"];
                g || (a && (m.width = 0, b[p + "m"] = l = d.clipRect(-99, e ? -b.plotLeft : -b.plotTop, 99, e ? b.chartWidth : b.chartHeight)),
                    b[p] = g = d.clipRect(m), g.count = {
                    length: 0
                });
                a && !g.count[this.index] && (g.count[this.index] = !0, g.count.length += 1);
                !1 !== c.clip && (this.group.clip(a || f ? g : b.clipRect), this.markerGroup.clip(l),
                    this.sharedClipKey = p);
                a || (g.count[this.index] && (delete g.count[this.index], --g.count.length), 0 === g.count.length && p && b[p] && (f || (b[p] = b[p].destroy()),
                    b[p + "m"] && (b[p + "m"] = b[p + "m"].destroy())));
            },
            animate: function(a) {
                var b = this.chart, c = z(this.options.animation), d;
                a ? this.setClip(c) : (d = this.sharedClipKey, (a = b[d]) && a.animate({
                    width: b.plotSizeX
                }, c), b[d + "m"] && b[d + "m"].animate({
                    width: b.plotSizeX + 99
                }, c), this.animate = null);
            },
            afterAnimate: function() {
                this.setClip();
                q(this, "afterAnimate");
            },
            drawPoints: function() {
                var a = this.points, b = this.chart, c, d, e, p, l, q, h, x, B = this.options.marker, k, u, w, n = this.markerGroup, D = m(B.enabled, this.xAxis.isRadial ? !0 : null, this.closestPointRangePx > 2 * B.radius);
                if (!1 !== B.enabled || this._hasPointMarkers) for (e = a.length; e--; ) p = a[e],
                    c = Math.floor(p.plotX), d = p.plotY, x = p.graphic, k = p.marker || {}, u = !!p.marker,
                    l = D && void 0 === k.enabled || k.enabled, w = p.isInside, l && f(d) && null !== p.y ? (l = B.radius,
                    q = m(k.symbol, this.symbol), h = 0 === q.indexOf("url"), x ? x[w ? "show" : "hide"](!0).animate(g({
                    x: c - l,
                    y: d - l
                }, x.symbolName ? {
                    width: 2 * l,
                    height: 2 * l
                } : {})) : w && (0 < l || h) && (p.graphic = x = b.renderer.symbol(q, c - l, d - l, 2 * l, 2 * l, u ? k : B).attr({
                    r: l
                }).add(n)), x && x.attr(this.pointAttribs(p, p.selected && "select")), x && x.addClass(p.getClassName(), !0)) : x && (p.graphic = x.destroy());
            },
            pointAttribs: function(a, b) {
                var c = this.options.marker, d = a && a.options, e = d && d.marker || {}, f = c.lineWidth, m = this.color, d = d && d.color, p = a && a.color, g, l;
                a && this.zones.length && (l = a.getZone()) && l.color && (g = l.color);
                m = d || g || p || m;
                g = e.fillColor || c.fillColor || m;
                m = e.lineColor || c.lineColor || m;
                b && (c = c.states[b], e = e.states && e.states[b] || {}, f = c.lineWidth || f + c.lineWidthPlus,
                    g = e.fillColor || c.fillColor || g, m = e.lineColor || c.lineColor || m);
                return {
                    stroke: m,
                    "stroke-width": f,
                    fill: g
                };
            },
            destroy: function() {
                var a = this, b = a.chart, c = /AppleWebKit\/533/.test(L.navigator.userAgent), d, f = a.data || [], m, p, g;
                q(a, "destroy");
                e(a);
                h(a.axisTypes || [], function(b) {
                    (g = a[b]) && g.series && (u(g.series, a), g.isDirty = g.forceRedraw = !0);
                });
                a.legendItem && a.chart.legend.destroyItem(a);
                for (d = f.length; d--; ) (m = f[d]) && m.destroy && m.destroy();
                a.points = null;
                clearTimeout(a.animationTimeout);
                for (p in a) a[p] instanceof B && !a[p].survive && (d = c && "group" === p ? "hide" : "destroy",
                    a[p][d]());
                b.hoverSeries === a && (b.hoverSeries = null);
                u(b.series, a);
                for (p in a) delete a[p];
            },
            getGraphPath: function(a, b, c) {
                var d = this, e = d.options, f = e.step, m, p = [], g = [], l;
                a = a || d.points;
                (m = a.reversed) && a.reverse();
                (f = {
                    right: 1,
                    center: 2
                }[f] || f && 3) && m && (f = 4 - f);
                !e.connectNulls || b || c || (a = this.getValidPoints(a));
                h(a, function(m, q) {
                    var h = m.plotX, x = m.plotY, B = a[q - 1];
                    (m.leftCliff || B && B.rightCliff) && !c && (l = !0);
                    m.isNull && !t(b) && 0 < q ? l = !e.connectNulls : m.isNull && !b ? l = !0 : (0 === q || l ? B = [ "M", m.plotX, m.plotY ] : d.getPointSpline ? B = d.getPointSpline(a, m, q) : f ? (B = 1 === f ? [ "L", B.plotX, x ] : 2 === f ? [ "L", (B.plotX + h) / 2, B.plotY, "L", (B.plotX + h) / 2, x ] : [ "L", h, B.plotY ],
                        B.push("L", h, x)) : B = [ "L", h, x ], g.push(m.x), f && g.push(m.x), p.push.apply(p, B),
                        l = !1);
                });
                p.xMap = g;
                return d.graphPath = p;
            },
            drawGraph: function() {
                var a = this, b = this.options, c = (this.gappedPath || this.getGraphPath).call(this), d = [ [ "graph", "highcharts-graph", b.lineColor || this.color, b.dashStyle ] ];
                h(this.zones, function(c, e) {
                    d.push([ "zone-graph-" + e, "highcharts-graph highcharts-zone-graph-" + e + " " + (c.className || ""), c.color || a.color, c.dashStyle || b.dashStyle ]);
                });
                h(d, function(d, e) {
                    var f = d[0], m = a[f];
                    m ? (m.endX = c.xMap, m.animate({
                        d: c
                    })) : c.length && (a[f] = a.chart.renderer.path(c).addClass(d[1]).attr({
                        zIndex: 1
                    }).add(a.group), m = {
                        stroke: d[2],
                        "stroke-width": b.lineWidth,
                        fill: a.fillGraph && a.color || "none"
                    }, d[3] ? m.dashstyle = d[3] : "square" !== b.linecap && (m["stroke-linecap"] = m["stroke-linejoin"] = "round"),
                        m = a[f].attr(m).shadow(2 > e && b.shadow));
                    m && (m.startX = c.xMap, m.isArea = c.isArea);
                });
            },
            applyZones: function() {
                var a = this, b = this.chart, c = b.renderer, d = this.zones, e, f, p = this.clips || [], g, l = this.graph, q = this.area, x = Math.max(b.chartWidth, b.chartHeight), B = this[(this.zoneAxis || "y") + "Axis"], k, u, w = b.inverted, n, D, r, t, v = !1;
                d.length && (l || q) && B && void 0 !== B.min && (u = B.reversed, n = B.horiz, l && l.hide(),
                    q && q.hide(), k = B.getExtremes(), h(d, function(d, h) {
                    e = u ? n ? b.plotWidth : 0 : n ? 0 : B.toPixels(k.min);
                    e = Math.min(Math.max(m(f, e), 0), x);
                    f = Math.min(Math.max(Math.round(B.toPixels(m(d.value, k.max), !0)), 0), x);
                    v && (e = f = B.toPixels(k.max));
                    D = Math.abs(e - f);
                    r = Math.min(e, f);
                    t = Math.max(e, f);
                    B.isXAxis ? (g = {
                        x: w ? t : r,
                        y: 0,
                        width: D,
                        height: x
                    }, n || (g.x = b.plotHeight - g.x)) : (g = {
                        x: 0,
                        y: w ? t : r,
                        width: x,
                        height: D
                    }, n && (g.y = b.plotWidth - g.y));
                    w && c.isVML && (g = B.isXAxis ? {
                        x: 0,
                        y: u ? r : t,
                        height: g.width,
                        width: b.chartWidth
                    } : {
                        x: g.y - b.plotLeft - b.spacingBox.x,
                        y: 0,
                        width: g.height,
                        height: b.chartHeight
                    });
                    p[h] ? p[h].animate(g) : (p[h] = c.clipRect(g), l && a["zone-graph-" + h].clip(p[h]),
                        q && a["zone-area-" + h].clip(p[h]));
                    v = d.value > k.max;
                }), this.clips = p);
            },
            invertGroups: function(a) {
                function b() {
                    var d = {
                        width: c.yAxis.len,
                        height: c.xAxis.len
                    };
                    h([ "group", "markerGroup" ], function(b) {
                        c[b] && c[b].attr(d).invert(a);
                    });
                }
                var c = this, d = c.chart;
                c.xAxis && (C(d, "resize", b), C(c, "destroy", function() {
                    e(d, "resize", b);
                }), b(a), c.invertGroups = b);
            },
            plotGroup: function(a, b, c, d, e) {
                var f = this[a], m = !f;
                m && (this[a] = f = this.chart.renderer.g(b).attr({
                    zIndex: d || .1
                }).add(e), f.addClass("highcharts-series-" + this.index + " highcharts-" + this.type + "-series highcharts-color-" + this.colorIndex + " " + (this.options.className || "")));
                f.attr({
                    visibility: c
                })[m ? "attr" : "animate"](this.getPlotBox());
                return f;
            },
            getPlotBox: function() {
                var a = this.chart, b = this.xAxis, c = this.yAxis;
                a.inverted && (b = c, c = this.xAxis);
                return {
                    translateX: b ? b.left : a.plotLeft,
                    translateY: c ? c.top : a.plotTop,
                    scaleX: 1,
                    scaleY: 1
                };
            },
            render: function() {
                var a = this, b = a.chart, c, d = a.options, e = !!a.animate && b.renderer.isSVG && z(d.animation).duration, f = a.visible ? "inherit" : "hidden", m = d.zIndex, p = a.hasRendered, g = b.seriesGroup, l = b.inverted;
                c = a.plotGroup("group", "series", f, m, g);
                a.markerGroup = a.plotGroup("markerGroup", "markers", f, m, g);
                e && a.animate(!0);
                c.inverted = a.isCartesian ? l : !1;
                a.drawGraph && (a.drawGraph(), a.applyZones());
                a.drawDataLabels && a.drawDataLabels();
                a.visible && a.drawPoints();
                a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                a.invertGroups(l);
                !1 === d.clip || a.sharedClipKey || p || c.clip(b.clipRect);
                e && a.animate();
                p || (a.animationTimeout = x(function() {
                    a.afterAnimate();
                }, e));
                a.isDirty = a.isDirtyData = !1;
                a.hasRendered = !0;
            },
            redraw: function() {
                var a = this.chart, b = this.isDirty || this.isDirtyData, c = this.group, d = this.xAxis, e = this.yAxis;
                c && (a.inverted && c.attr({
                    width: a.plotWidth,
                    height: a.plotHeight
                }), c.animate({
                    translateX: m(d && d.left, a.plotLeft),
                    translateY: m(e && e.top, a.plotTop)
                }));
                this.translate();
                this.render();
                b && delete this.kdTree;
            },
            kdDimensions: 1,
            kdAxisArray: [ "clientX", "plotY" ],
            searchPoint: function(a, b) {
                var c = this.xAxis, d = this.yAxis, e = this.chart.inverted;
                return this.searchKDTree({
                    clientX: e ? c.len - a.chartY + c.pos : a.chartX - c.pos,
                    plotY: e ? d.len - a.chartX + d.pos : a.chartY - d.pos
                }, b);
            },
            buildKDTree: function() {
                function a(c, d, e) {
                    var f, m;
                    if (m = c && c.length) return f = b.kdAxisArray[d % e], c.sort(function(a, b) {
                        return a[f] - b[f];
                    }), m = Math.floor(m / 2), {
                        point: c[m],
                        left: a(c.slice(0, m), d + 1, e),
                        right: a(c.slice(m + 1), d + 1, e)
                    };
                }
                var b = this, c = b.kdDimensions;
                delete b.kdTree;
                x(function() {
                    b.kdTree = a(b.getValidPoints(null, !b.directTouch), c, c);
                }, b.options.kdNow ? 0 : 1);
            },
            searchKDTree: function(a, b) {
                function c(a, b, p, g) {
                    var l = b.point, q = d.kdAxisArray[p % g], h, x, y = l;
                    x = t(a[e]) && t(l[e]) ? Math.pow(a[e] - l[e], 2) : null;
                    h = t(a[f]) && t(l[f]) ? Math.pow(a[f] - l[f], 2) : null;
                    h = (x || 0) + (h || 0);
                    l.dist = t(h) ? Math.sqrt(h) : Number.MAX_VALUE;
                    l.distX = t(x) ? Math.sqrt(x) : Number.MAX_VALUE;
                    q = a[q] - l[q];
                    h = 0 > q ? "left" : "right";
                    x = 0 > q ? "right" : "left";
                    b[h] && (h = c(a, b[h], p + 1, g), y = h[m] < y[m] ? h : l);
                    b[x] && Math.sqrt(q * q) < y[m] && (a = c(a, b[x], p + 1, g), y = a[m] < y[m] ? a : y);
                    return y;
                }
                var d = this, e = this.kdAxisArray[0], f = this.kdAxisArray[1], m = b ? "distX" : "dist";
                this.kdTree || this.buildKDTree();
                if (this.kdTree) return c(a, this.kdTree, this.kdDimensions, this.kdDimensions);
            }
        });
    })(J);
    (function(a) {
        function C(a, k, d, g, q) {
            var w = a.chart.inverted;
            this.axis = a;
            this.isNegative = d;
            this.options = k;
            this.x = g;
            this.total = null;
            this.points = {};
            this.stack = q;
            this.rightCliff = this.leftCliff = 0;
            this.alignOptions = {
                align: k.align || (w ? d ? "left" : "right" : "center"),
                verticalAlign: k.verticalAlign || (w ? "middle" : d ? "bottom" : "top"),
                y: t(k.y, w ? 4 : d ? 14 : -6),
                x: t(k.x, w ? d ? -6 : 6 : 0)
            };
            this.textAlign = k.textAlign || (w ? d ? "right" : "left" : "center");
        }
        var z = a.Axis, E = a.Chart, H = a.correctFloat, v = a.defined, n = a.destroyObjectProperties, k = a.each, r = a.format, t = a.pick;
        a = a.Series;
        C.prototype = {
            destroy: function() {
                n(this, this.axis);
            },
            render: function(a) {
                var k = this.options, d = k.format, d = d ? r(d, this) : k.formatter.call(this);
                this.label ? this.label.attr({
                    text: d,
                    visibility: "hidden"
                }) : this.label = this.axis.chart.renderer.text(d, null, null, k.useHTML).css(k.style).attr({
                    align: this.textAlign,
                    rotation: k.rotation,
                    visibility: "hidden"
                }).add(a);
            },
            setOffset: function(a, k) {
                var d = this.axis, g = d.chart, q = g.inverted, w = d.reversed, w = this.isNegative && !w || !this.isNegative && w, l = d.translate(d.usePercentage ? 100 : this.total, 0, 0, 0, 1), d = d.translate(0), d = Math.abs(l - d), f = g.xAxis[0].translate(this.x) + a, b = g.plotHeight, w = {
                    x: q ? w ? l : l - d : f,
                    y: q ? b - f - k : w ? b - l - d : b - l,
                    width: q ? d : k,
                    height: q ? k : d
                };
                if (q = this.label) q.align(this.alignOptions, null, w), w = q.alignAttr, q[!1 === this.options.crop || g.isInsidePlot(w.x, w.y) ? "show" : "hide"](!0);
            }
        };
        E.prototype.getStacks = function() {
            var a = this;
            k(a.yAxis, function(a) {
                a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks);
            });
            k(a.series, function(k) {
                !k.options.stacking || !0 !== k.visible && !1 !== a.options.chart.ignoreHiddenSeries || (k.stackKey = k.type + t(k.options.stack, ""));
            });
        };
        z.prototype.buildStacks = function() {
            var a = this.series, k, d = t(this.options.reversedStacks, !0), g = a.length, q;
            if (!this.isXAxis) {
                this.usePercentage = !1;
                for (q = g; q--; ) a[d ? q : g - q - 1].setStackedPoints();
                for (q = g; q--; ) k = a[d ? q : g - q - 1], k.setStackCliffs && k.setStackCliffs();
                if (this.usePercentage) for (q = 0; q < g; q++) a[q].setPercentStacks();
            }
        };
        z.prototype.renderStackTotals = function() {
            var a = this.chart, k = a.renderer, d = this.stacks, g, q, w = this.stackTotalGroup;
            w || (this.stackTotalGroup = w = k.g("stack-labels").attr({
                visibility: "visible",
                zIndex: 6
            }).add());
            w.translate(a.plotLeft, a.plotTop);
            for (g in d) for (q in a = d[g], a) a[q].render(w);
        };
        z.prototype.resetStacks = function() {
            var a = this.stacks, k, d;
            if (!this.isXAxis) for (k in a) for (d in a[k]) a[k][d].touched < this.stacksTouched ? (a[k][d].destroy(),
                delete a[k][d]) : (a[k][d].total = null, a[k][d].cum = 0);
        };
        z.prototype.cleanStacks = function() {
            var a, k, d;
            if (!this.isXAxis) for (k in this.oldStacks && (a = this.stacks = this.oldStacks),
                a) for (d in a[k]) a[k][d].cum = a[k][d].total;
        };
        a.prototype.setStackedPoints = function() {
            if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var a = this.processedXData, k = this.processedYData, d = [], g = k.length, q = this.options, w = q.threshold, l = q.startFromThreshold ? w : 0, f = q.stack, q = q.stacking, b = this.stackKey, c = "-" + b, m = this.negStacks, e = this.yAxis, n = e.stacks, p = e.oldStacks, B, x, r, G, y, F, K;
                e.stacksTouched += 1;
                for (y = 0; y < g; y++) F = a[y], K = k[y], B = this.getStackIndicator(B, F, this.index),
                    G = B.key, r = (x = m && K < (l ? 0 : w)) ? c : b, n[r] || (n[r] = {}), n[r][F] || (p[r] && p[r][F] ? (n[r][F] = p[r][F],
                    n[r][F].total = null) : n[r][F] = new C(e, e.options.stackLabels, x, F, f)), r = n[r][F],
                    null !== K && (r.points[G] = r.points[this.index] = [ t(r.cum, l) ], v(r.cum) || (r.base = G),
                    r.touched = e.stacksTouched, 0 < B.index && !1 === this.singleStacks && (r.points[G][0] = r.points[this.index + "," + F + ",0"][0])),
                        "percent" === q ? (x = x ? b : c, m && n[x] && n[x][F] ? (x = n[x][F], r.total = x.total = Math.max(x.total, r.total) + Math.abs(K) || 0) : r.total = H(r.total + (Math.abs(K) || 0))) : r.total = H(r.total + (K || 0)),
                    r.cum = t(r.cum, l) + (K || 0), null !== K && (r.points[G].push(r.cum), d[y] = r.cum);
                "percent" === q && (e.usePercentage = !0);
                this.stackedYData = d;
                e.oldStacks = {};
            }
        };
        a.prototype.setPercentStacks = function() {
            var a = this, n = a.stackKey, d = a.yAxis.stacks, g = a.processedXData, q;
            k([ n, "-" + n ], function(k) {
                for (var l = g.length, f, b; l--; ) if (f = g[l], q = a.getStackIndicator(q, f, a.index),
                    f = (b = d[k] && d[k][f]) && b.points[q.key]) b = b.total ? 100 / b.total : 0, f[0] = H(f[0] * b),
                    f[1] = H(f[1] * b), a.stackedYData[l] = f[1];
            });
        };
        a.prototype.getStackIndicator = function(a, k, d) {
            v(a) && a.x === k ? a.index++ : a = {
                x: k,
                index: 0
            };
            a.key = [ d, k, a.index ].join();
            return a;
        };
    })(J);
    (function(a) {
        var C = a.addEvent, z = a.animate, E = a.Axis, H = a.createElement, v = a.css, n = a.defined, k = a.each, r = a.erase, t = a.extend, h = a.fireEvent, u = a.inArray, d = a.isObject, g = a.merge, q = a.pick, w = a.Point, l = a.Series, f = a.seriesTypes, b = a.setAnimation, c = a.splat;
        t(a.Chart.prototype, {
            addSeries: function(a, b, c) {
                var d, f = this;
                a && (b = q(b, !0), h(f, "addSeries", {
                    options: a
                }, function() {
                    d = f.initSeries(a);
                    f.isDirtyLegend = !0;
                    f.linkSeries();
                    b && f.redraw(c);
                }));
                return d;
            },
            addAxis: function(a, b, d, f) {
                var l = b ? "xAxis" : "yAxis", x = this.options;
                a = g(a, {
                    index: this[l].length,
                    isX: b
                });
                new E(this, a);
                x[l] = c(x[l] || {});
                x[l].push(a);
                q(d, !0) && this.redraw(f);
            },
            showLoading: function(a) {
                var b = this, c = b.options, d = b.loadingDiv, f = c.loading, g = function() {
                    d && v(d, {
                        left: b.plotLeft + "px",
                        top: b.plotTop + "px",
                        width: b.plotWidth + "px",
                        height: b.plotHeight + "px"
                    });
                };
                d || (b.loadingDiv = d = H("div", {
                    className: "highcharts-loading highcharts-loading-hidden"
                }, null, b.container), b.loadingSpan = H("span", {
                    className: "highcharts-loading-inner"
                }, null, d), C(b, "redraw", g));
                setTimeout(function() {
                    d.className = "highcharts-loading";
                });
                b.loadingSpan.innerHTML = a || c.lang.loading;
                v(d, t(f.style, {
                    zIndex: 10
                }));
                v(b.loadingSpan, f.labelStyle);
                b.loadingShown || (v(d, {
                    opacity: 0,
                    display: ""
                }), z(d, {
                    opacity: f.style.opacity || .5
                }, {
                    duration: f.showDuration || 0
                }));
                b.loadingShown = !0;
                g();
            },
            hideLoading: function() {
                var a = this.options, b = this.loadingDiv;
                b && (b.className = "highcharts-loading highcharts-loading-hidden", z(b, {
                    opacity: 0
                }, {
                    duration: a.loading.hideDuration || 100,
                    complete: function() {
                        v(b, {
                            display: "none"
                        });
                    }
                }));
                this.loadingShown = !1;
            },
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireUpdateSeries: [ "chart.polar", "chart.ignoreHiddenSeries", "chart.type", "colors", "plotOptions" ],
            update: function(a, b) {
                var d, f = {
                    credits: "addCredits",
                    title: "setTitle",
                    subtitle: "setSubtitle"
                }, l = a.chart, x, h;
                if (l) {
                    g(!0, this.options.chart, l);
                    "className" in l && this.setClassName(l.className);
                    if ("inverted" in l || "polar" in l) this.propFromSeries(), x = !0;
                    for (d in l) l.hasOwnProperty(d) && (-1 !== u("chart." + d, this.propsRequireUpdateSeries) && (h = !0),
                        -1 !== u(d, this.propsRequireDirtyBox) && (this.isDirtyBox = !0));
                    "style" in l && this.renderer.setStyle(l.style);
                }
                for (d in a) {
                    if (this[d] && "function" === typeof this[d].update) this[d].update(a[d], !1); else if ("function" === typeof this[f[d]]) this[f[d]](a[d]);
                    "chart" !== d && -1 !== u(d, this.propsRequireUpdateSeries) && (h = !0);
                }
                a.colors && (this.options.colors = a.colors);
                a.plotOptions && g(!0, this.options.plotOptions, a.plotOptions);
                k([ "xAxis", "yAxis", "series" ], function(b) {
                    a[b] && k(c(a[b]), function(a) {
                        var c = n(a.id) && this.get(a.id) || this[b][0];
                        c && c.coll === b && c.update(a, !1);
                    }, this);
                }, this);
                x && k(this.axes, function(a) {
                    a.update({}, !1);
                });
                h && k(this.series, function(a) {
                    a.update({}, !1);
                });
                a.loading && g(!0, this.options.loading, a.loading);
                l && ("width" in l || "height" in l) ? this.setSize(l.width, l.height) : q(b, !0) && this.redraw();
            },
            setSubtitle: function(a) {
                this.setTitle(void 0, a);
            }
        });
        t(w.prototype, {
            update: function(a, b, c, f) {
                function g() {
                    l.applyOptions(a);
                    null === l.y && k && (l.graphic = k.destroy());
                    d(a, !0) && (k && k.element && a && a.marker && a.marker.symbol && (l.graphic = k.destroy()),
                        a && a.dataLabels && l.dataLabel && (l.dataLabel = l.dataLabel.destroy()));
                    y = l.index;
                    h.updateParallelArrays(l, y);
                    w.data[y] = d(w.data[y], !0) ? l.options : a;
                    h.isDirty = h.isDirtyData = !0;
                    !h.fixedBox && h.hasCartesianSeries && (n.isDirtyBox = !0);
                    "point" === w.legendType && (n.isDirtyLegend = !0);
                    b && n.redraw(c);
                }
                var l = this, h = l.series, k = l.graphic, y, n = h.chart, w = h.options;
                b = q(b, !0);
                !1 === f ? g() : l.firePointEvent("update", {
                    options: a
                }, g);
            },
            remove: function(a, b) {
                this.series.removePoint(u(this, this.series.data), a, b);
            }
        });
        t(l.prototype, {
            addPoint: function(a, b, c, d) {
                var f = this.options, g = this.data, l = this.chart, h = this.xAxis && this.xAxis.names, y = f.data, k, n, w = this.xData, r, u;
                b = q(b, !0);
                k = {
                    series: this
                };
                this.pointClass.prototype.applyOptions.apply(k, [ a ]);
                u = k.x;
                r = w.length;
                if (this.requireSorting && u < w[r - 1]) for (n = !0; r && w[r - 1] > u; ) r--;
                this.updateParallelArrays(k, "splice", r, 0, 0);
                this.updateParallelArrays(k, r);
                h && k.name && (h[u] = k.name);
                y.splice(r, 0, a);
                n && (this.data.splice(r, 0, null), this.processData());
                "point" === f.legendType && this.generatePoints();
                c && (g[0] && g[0].remove ? g[0].remove(!1) : (g.shift(), this.updateParallelArrays(k, "shift"),
                    y.shift()));
                this.isDirtyData = this.isDirty = !0;
                b && l.redraw(d);
            },
            removePoint: function(a, c, d) {
                var f = this, g = f.data, l = g[a], h = f.points, k = f.chart, y = function() {
                    h && h.length === g.length && h.splice(a, 1);
                    g.splice(a, 1);
                    f.options.data.splice(a, 1);
                    f.updateParallelArrays(l || {
                        series: f
                    }, "splice", a, 1);
                    l && l.destroy();
                    f.isDirty = !0;
                    f.isDirtyData = !0;
                    c && k.redraw();
                };
                b(d, k);
                c = q(c, !0);
                l ? l.firePointEvent("remove", null, y) : y();
            },
            remove: function(a, b, c) {
                function d() {
                    f.destroy();
                    g.isDirtyLegend = g.isDirtyBox = !0;
                    g.linkSeries();
                    q(a, !0) && g.redraw(b);
                }
                var f = this, g = f.chart;
                !1 !== c ? h(f, "remove", null, d) : d();
            },
            update: function(a, b) {
                var c = this, d = this.chart, l = this.userOptions, h = this.type, n = a.type || l.type || d.options.chart.type, w = f[h].prototype, y = [ "group", "markerGroup", "dataLabelsGroup" ], r;
                if (n && n !== h || void 0 !== a.zIndex) y.length = 0;
                k(y, function(a) {
                    y[a] = c[a];
                    delete c[a];
                });
                a = g(l, {
                    animation: !1,
                    index: this.index,
                    pointStart: this.xData[0]
                }, {
                    data: this.options.data
                }, a);
                this.remove(!1, null, !1);
                for (r in w) this[r] = void 0;
                t(this, f[n || h].prototype);
                k(y, function(a) {
                    c[a] = y[a];
                });
                this.init(d, a);
                d.linkSeries();
                q(b, !0) && d.redraw(!1);
            }
        });
        t(E.prototype, {
            update: function(a, b) {
                var c = this.chart;
                a = c.options[this.coll][this.options.index] = g(this.userOptions, a);
                this.destroy(!0);
                this.init(c, t(a, {
                    events: void 0
                }));
                c.isDirtyBox = !0;
                q(b, !0) && c.redraw();
            },
            remove: function(a) {
                for (var b = this.chart, c = this.coll, d = this.series, f = d.length; f--; ) d[f] && d[f].remove(!1);
                r(b.axes, this);
                r(b[c], this);
                b.options[c].splice(this.options.index, 1);
                k(b[c], function(a, b) {
                    a.options.index = b;
                });
                this.destroy();
                b.isDirtyBox = !0;
                q(a, !0) && b.redraw();
            },
            setTitle: function(a, b) {
                this.update({
                    title: a
                }, b);
            },
            setCategories: function(a, b) {
                this.update({
                    categories: a
                }, b);
            }
        });
    })(J);
    (function(a) {
        var C = a.color, z = a.each, E = a.map, H = a.pick, v = a.Series, n = a.seriesType;
        n("area", "line", {
            softThreshold: !1,
            threshold: 0
        }, {
            singleStacks: !1,
            getStackPoints: function() {
                var a = [], n = [], t = this.xAxis, h = this.yAxis, u = h.stacks[this.stackKey], d = {}, g = this.points, q = this.index, w = h.series, l = w.length, f, b = H(h.options.reversedStacks, !0) ? 1 : -1, c, m;
                if (this.options.stacking) {
                    for (c = 0; c < g.length; c++) d[g[c].x] = g[c];
                    for (m in u) null !== u[m].total && n.push(m);
                    n.sort(function(a, b) {
                        return a - b;
                    });
                    f = E(w, function() {
                        return this.visible;
                    });
                    z(n, function(e, m) {
                        var g = 0, B, x;
                        if (d[e] && !d[e].isNull) a.push(d[e]), z([ -1, 1 ], function(a) {
                            var g = 1 === a ? "rightNull" : "leftNull", p = 0, h = u[n[m + a]];
                            if (h) for (c = q; 0 <= c && c < l; ) B = h.points[c], B || (c === q ? d[e][g] = !0 : f[c] && (x = u[e].points[c]) && (p -= x[1] - x[0])),
                                c += b;
                            d[e][1 === a ? "rightCliff" : "leftCliff"] = p;
                        }); else {
                            for (c = q; 0 <= c && c < l; ) {
                                if (B = u[e].points[c]) {
                                    g = B[1];
                                    break;
                                }
                                c += b;
                            }
                            g = h.toPixels(g, !0);
                            a.push({
                                isNull: !0,
                                plotX: t.toPixels(e, !0),
                                plotY: g,
                                yBottom: g
                            });
                        }
                    });
                }
                return a;
            },
            getGraphPath: function(a) {
                var n = v.prototype.getGraphPath, t = this.options, h = t.stacking, u = this.yAxis, d, g, q = [], w = [], l = this.index, f, b = u.stacks[this.stackKey], c = t.threshold, m = u.getThreshold(t.threshold), e, t = t.connectNulls || "percent" === h, D = function(d, e, g) {
                    var n = a[d];
                    d = h && b[n.x].points[l];
                    var r = n[g + "Null"] || 0;
                    g = n[g + "Cliff"] || 0;
                    var y, F, n = !0;
                    g || r ? (y = (r ? d[0] : d[1]) + g, F = d[0] + g, n = !!r) : !h && a[e] && a[e].isNull && (y = F = c);
                    void 0 !== y && (w.push({
                        plotX: f,
                        plotY: null === y ? m : u.getThreshold(y),
                        isNull: n
                    }), q.push({
                        plotX: f,
                        plotY: null === F ? m : u.getThreshold(F),
                        doCurve: !1
                    }));
                };
                a = a || this.points;
                h && (a = this.getStackPoints());
                for (d = 0; d < a.length; d++) if (g = a[d].isNull, f = H(a[d].rectPlotX, a[d].plotX),
                    e = H(a[d].yBottom, m), !g || t) t || D(d, d - 1, "left"), g && !h && t || (w.push(a[d]),
                    q.push({
                        x: d,
                        plotX: f,
                        plotY: e
                    })), t || D(d, d + 1, "right");
                d = n.call(this, w, !0, !0);
                q.reversed = !0;
                g = n.call(this, q, !0, !0);
                g.length && (g[0] = "L");
                g = d.concat(g);
                n = n.call(this, w, !1, t);
                g.xMap = d.xMap;
                this.areaPath = g;
                return n;
            },
            drawGraph: function() {
                this.areaPath = [];
                v.prototype.drawGraph.apply(this);
                var a = this, n = this.areaPath, t = this.options, h = [ [ "area", "highcharts-area", this.color, t.fillColor ] ];
                z(this.zones, function(n, d) {
                    h.push([ "zone-area-" + d, "highcharts-area highcharts-zone-area-" + d + " " + n.className, n.color || a.color, n.fillColor || t.fillColor ]);
                });
                z(h, function(h) {
                    var d = h[0], g = a[d];
                    g ? (g.endX = n.xMap, g.animate({
                        d: n
                    })) : (g = a[d] = a.chart.renderer.path(n).addClass(h[1]).attr({
                        fill: H(h[3], C(h[2]).setOpacity(H(t.fillOpacity, .75)).get()),
                        zIndex: 0
                    }).add(a.group), g.isArea = !0);
                    g.startX = n.xMap;
                    g.shiftUnit = t.step ? 2 : 1;
                });
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        });
    })(J);
    (function(a) {
        var C = a.extendClass, z = a.merge, E = a.pick, H = a.Series, v = a.seriesTypes;
        a.defaultPlotOptions.spline = z(a.defaultPlotOptions.line);
        v.spline = C(H, {
            type: "spline",
            getPointSpline: function(a, k, r) {
                var t = k.plotX, h = k.plotY, u = a[r - 1];
                r = a[r + 1];
                var d, g, q, w;
                if (u && !u.isNull && !1 !== u.doCurve && r && !r.isNull && !1 !== r.doCurve) {
                    a = u.plotY;
                    q = r.plotX;
                    r = r.plotY;
                    var l = 0;
                    d = (1.5 * t + u.plotX) / 2.5;
                    g = (1.5 * h + a) / 2.5;
                    q = (1.5 * t + q) / 2.5;
                    w = (1.5 * h + r) / 2.5;
                    q !== d && (l = (w - g) * (q - t) / (q - d) + h - w);
                    g += l;
                    w += l;
                    g > a && g > h ? (g = Math.max(a, h), w = 2 * h - g) : g < a && g < h && (g = Math.min(a, h),
                        w = 2 * h - g);
                    w > r && w > h ? (w = Math.max(r, h), g = 2 * h - w) : w < r && w < h && (w = Math.min(r, h),
                        g = 2 * h - w);
                    k.rightContX = q;
                    k.rightContY = w;
                }
                k = [ "C", E(u.rightContX, u.plotX), E(u.rightContY, u.plotY), E(d, t), E(g, h), t, h ];
                u.rightContX = u.rightContY = null;
                return k;
            }
        });
    })(J);
    (function(a) {
        var C = a.seriesTypes.area.prototype, z = a.seriesType;
        z("areaspline", "spline", a.defaultPlotOptions.area, {
            getStackPoints: C.getStackPoints,
            getGraphPath: C.getGraphPath,
            setStackCliffs: C.setStackCliffs,
            drawGraph: C.drawGraph,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        });
    })(J);
    (function(a) {
        var C = a.animObject, z = a.color, E = a.each, H = a.extend, v = a.isNumber, n = a.merge, k = a.pick, r = a.Series, t = a.seriesType, h = a.stop, u = a.svg;
        t("column", "line", {
            borderRadius: 0,
            groupPadding: .2,
            marker: null,
            pointPadding: .1,
            minPointLength: 0,
            cropThreshold: 50,
            pointRange: null,
            states: {
                hover: {
                    halo: !1,
                    brightness: .1,
                    shadow: !1
                },
                select: {
                    color: "#cccccc",
                    borderColor: "#000000",
                    shadow: !1
                }
            },
            dataLabels: {
                align: null,
                verticalAlign: null,
                y: null
            },
            softThreshold: !1,
            startFromThreshold: !0,
            stickyTracking: !1,
            tooltip: {
                distance: 6
            },
            threshold: 0,
            borderColor: "#ffffff"
        }, {
            cropShoulder: 0,
            directTouch: !0,
            trackerGroups: [ "group", "dataLabelsGroup" ],
            negStacks: !0,
            init: function() {
                r.prototype.init.apply(this, arguments);
                var a = this, g = a.chart;
                g.hasRendered && E(g.series, function(g) {
                    g.type === a.type && (g.isDirty = !0);
                });
            },
            getColumnMetrics: function() {
                var a = this, g = a.options, q = a.xAxis, h = a.yAxis, l = q.reversed, f, b = {}, c = 0;
                !1 === g.grouping ? c = 1 : E(a.chart.series, function(e) {
                    var m = e.options, g = e.yAxis, l;
                    e.type === a.type && e.visible && h.len === g.len && h.pos === g.pos && (m.stacking ? (f = e.stackKey,
                        void 0 === b[f] && (b[f] = c++), l = b[f]) : !1 !== m.grouping && (l = c++), e.columnIndex = l);
                });
                var m = Math.min(Math.abs(q.transA) * (q.ordinalSlope || g.pointRange || q.closestPointRange || q.tickInterval || 1), q.len), e = m * g.groupPadding, n = (m - 2 * e) / c, g = Math.min(g.maxPointWidth || q.len, k(g.pointWidth, n * (1 - 2 * g.pointPadding)));
                a.columnMetrics = {
                    width: g,
                    offset: (n - g) / 2 + (e + ((a.columnIndex || 0) + (l ? 1 : 0)) * n - m / 2) * (l ? -1 : 1)
                };
                return a.columnMetrics;
            },
            crispCol: function(a, g, q, h) {
                var l = this.chart, f = this.borderWidth, b = -(f % 2 ? .5 : 0), f = f % 2 ? .5 : 1;
                l.inverted && l.renderer.isVML && (f += 1);
                q = Math.round(a + q) + b;
                a = Math.round(a) + b;
                h = Math.round(g + h) + f;
                b = .5 >= Math.abs(g) && .5 < h;
                g = Math.round(g) + f;
                h -= g;
                b && h && (--g, h += 1);
                return {
                    x: a,
                    y: g,
                    width: q - a,
                    height: h
                };
            },
            translate: function() {
                var a = this, g = a.chart, q = a.options, h = a.dense = 2 > a.closestPointRange * a.xAxis.transA, h = a.borderWidth = k(q.borderWidth, h ? 0 : 1), l = a.yAxis, f = a.translatedThreshold = l.getThreshold(q.threshold), b = k(q.minPointLength, 5), c = a.getColumnMetrics(), m = c.width, e = a.barW = Math.max(m, 1 + 2 * h), n = a.pointXOffset = c.offset;
                g.inverted && (f -= .5);
                q.pointPadding && (e = Math.ceil(e));
                r.prototype.translate.apply(a);
                E(a.points, function(c) {
                    var q = k(c.yBottom, f), h = 999 + Math.abs(q), h = Math.min(Math.max(-h, c.plotY), l.len + h), w = c.plotX + n, r = e, y = Math.min(h, q), u, t = Math.max(h, q) - y;
                    Math.abs(t) < b && b && (t = b, u = !l.reversed && !c.negative || l.reversed && c.negative,
                        y = Math.abs(y - f) > b ? q - b : f - (u ? b : 0));
                    c.barX = w;
                    c.pointWidth = m;
                    c.tooltipPos = g.inverted ? [ l.len + l.pos - g.plotLeft - h, a.xAxis.len - w - r / 2, t ] : [ w + r / 2, h + l.pos - g.plotTop, t ];
                    c.shapeType = "rect";
                    c.shapeArgs = a.crispCol.apply(a, c.isNull ? [ c.plotX, l.len / 2, 0, 0 ] : [ w, y, r, t ]);
                });
            },
            getSymbol: a.noop,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            drawGraph: function() {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data");
            },
            pointAttribs: function(a, g) {
                var q = this.options, h, l, f = this.pointAttrToOptions || {};
                l = f.stroke || "borderColor";
                var b = f["stroke-width"] || "borderWidth", c = a && a.color || this.color, m = q[l] || this.color || c, f = q.dashStyle, e;
                a && this.zones.length && (c = (h = a.getZone()) && h.color || a.options.color || this.color);
                g && (h = q.states[g], e = h.brightness, c = h.color || void 0 !== e && z(c).brighten(h.brightness).get() || c,
                    m = h[l] || m, f = h.dashStyle || f);
                l = {
                    fill: c,
                    stroke: m,
                    "stroke-width": a[b] || q[b] || this[b] || 0
                };
                q.borderRadius && (l.r = q.borderRadius);
                f && (l.dashstyle = f);
                return l;
            },
            drawPoints: function() {
                var a = this, g = this.chart, q = a.options, k = g.renderer, l = q.animationLimit || 250, f;
                E(a.points, function(b) {
                    var c = b.graphic;
                    v(b.plotY) && null !== b.y ? (f = b.shapeArgs, c ? (h(c), c[g.pointCount < l ? "animate" : "attr"](n(f))) : b.graphic = c = k[b.shapeType](f).attr({
                        "class": b.getClassName()
                    }).add(b.group || a.group), c.attr(a.pointAttribs(b, b.selected && "select")).shadow(q.shadow, null, q.stacking && !q.borderRadius)) : c && (b.graphic = c.destroy());
                });
            },
            animate: function(a) {
                var g = this, q = this.yAxis, h = g.options, l = this.chart.inverted, f = {};
                u && (a ? (f.scaleY = .001, a = Math.min(q.pos + q.len, Math.max(q.pos, q.toPixels(h.threshold))),
                    l ? f.translateX = a - q.len : f.translateY = a, g.group.attr(f)) : (f[l ? "translateX" : "translateY"] = q.pos,
                    g.group.animate(f, H(C(g.options.animation), {
                        step: function(a, c) {
                            g.group.attr({
                                scaleY: Math.max(.001, c.pos)
                            });
                        }
                    })), g.animate = null));
            },
            remove: function() {
                var a = this, g = a.chart;
                g.hasRendered && E(g.series, function(g) {
                    g.type === a.type && (g.isDirty = !0);
                });
                r.prototype.remove.apply(a, arguments);
            }
        });
    })(J);
    (function(a) {
        a = a.seriesType;
        a("bar", "column", null, {
            inverted: !0
        });
    })(J);
    (function(a) {
        var C = a.Series;
        a = a.seriesType;
        a("scatter", "line", {
            lineWidth: 0,
            marker: {
                enabled: !0
            },
            tooltip: {
                headerFormat: '<span style="font-size: 0.85em"> {series.name}</span><br/>',
                pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
            }
        }, {
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: [ "group", "markerGroup", "dataLabelsGroup" ],
            takeOrdinalPosition: !1,
            kdDimensions: 2,
            drawGraph: function() {
                this.options.lineWidth && C.prototype.drawGraph.call(this);
            }
        });
    })(J);
    (function(a) {
        var C = a.pick, z = a.relativeLength;
        a.CenteredSeriesMixin = {
            getCenter: function() {
                var a = this.options, H = this.chart, v = 2 * (a.slicedOffset || 0), n = H.plotWidth - 2 * v, H = H.plotHeight - 2 * v, k = a.center, k = [ C(k[0], "50%"), C(k[1], "50%"), a.size || "100%", a.innerSize || 0 ], r = Math.min(n, H), t, h;
                for (t = 0; 4 > t; ++t) h = k[t], a = 2 > t || 2 === t && /%$/.test(h), k[t] = z(h, [ n, H, r, k[2] ][t]) + (a ? v : 0);
                k[3] > k[2] && (k[3] = k[2]);
                return k;
            }
        };
    })(J);
    (function(a) {
        var C = a.addEvent, z = a.defined, E = a.each, H = a.extend, v = a.inArray, n = a.noop, k = a.pick, r = a.Point, t = a.Series, h = a.seriesType, u = a.setAnimation;
        h("pie", "line", {
            center: [ null, null ],
            clip: !1,
            colorByPoint: !0,
            dataLabels: {
                distance: 30,
                enabled: !0,
                formatter: function() {
                    return null === this.y ? void 0 : this.point.name;
                },
                x: 0
            },
            ignoreHiddenPoint: !0,
            legendType: "point",
            marker: null,
            size: null,
            showInLegend: !1,
            slicedOffset: 10,
            stickyTracking: !1,
            tooltip: {
                followPointer: !0
            },
            borderColor: "#ffffff",
            borderWidth: 1,
            states: {
                hover: {
                    brightness: .1,
                    shadow: !1
                }
            }
        }, {
            isCartesian: !1,
            requireSorting: !1,
            directTouch: !0,
            noSharedTooltip: !0,
            trackerGroups: [ "group", "dataLabelsGroup" ],
            axisTypes: [],
            pointAttribs: a.seriesTypes.column.prototype.pointAttribs,
            animate: function(a) {
                var g = this, q = g.points, h = g.startAngleRad;
                a || (E(q, function(a) {
                    var d = a.graphic, b = a.shapeArgs;
                    d && (d.attr({
                        r: a.startR || g.center[3] / 2,
                        start: h,
                        end: h
                    }), d.animate({
                        r: b.r,
                        start: b.start,
                        end: b.end
                    }, g.options.animation));
                }), g.animate = null);
            },
            updateTotals: function() {
                var a, g = 0, h = this.points, k = h.length, l, f = this.options.ignoreHiddenPoint;
                for (a = 0; a < k; a++) l = h[a], 0 > l.y && (l.y = null), g += f && !l.visible ? 0 : l.y;
                this.total = g;
                for (a = 0; a < k; a++) l = h[a], l.percentage = 0 < g && (l.visible || !f) ? l.y / g * 100 : 0,
                    l.total = g;
            },
            generatePoints: function() {
                t.prototype.generatePoints.call(this);
                this.updateTotals();
            },
            translate: function(a) {
                this.generatePoints();
                var g = 0, h = this.options, n = h.slicedOffset, l = n + (h.borderWidth || 0), f, b, c, m = h.startAngle || 0, e = this.startAngleRad = Math.PI / 180 * (m - 90), m = (this.endAngleRad = Math.PI / 180 * (k(h.endAngle, m + 360) - 90)) - e, r = this.points, p = h.dataLabels.distance, h = h.ignoreHiddenPoint, B, x = r.length, u;
                a || (this.center = a = this.getCenter());
                this.getX = function(b, e) {
                    c = Math.asin(Math.min((b - a[1]) / (a[2] / 2 + p), 1));
                    return a[0] + (e ? -1 : 1) * Math.cos(c) * (a[2] / 2 + p);
                };
                for (B = 0; B < x; B++) {
                    u = r[B];
                    f = e + g * m;
                    if (!h || u.visible) g += u.percentage / 100;
                    b = e + g * m;
                    u.shapeType = "arc";
                    u.shapeArgs = {
                        x: a[0],
                        y: a[1],
                        r: a[2] / 2,
                        innerR: a[3] / 2,
                        start: Math.round(1e3 * f) / 1e3,
                        end: Math.round(1e3 * b) / 1e3
                    };
                    c = (b + f) / 2;
                    c > 1.5 * Math.PI ? c -= 2 * Math.PI : c < -Math.PI / 2 && (c += 2 * Math.PI);
                    u.slicedTranslation = {
                        translateX: Math.round(Math.cos(c) * n),
                        translateY: Math.round(Math.sin(c) * n)
                    };
                    f = Math.cos(c) * a[2] / 2;
                    b = Math.sin(c) * a[2] / 2;
                    u.tooltipPos = [ a[0] + .7 * f, a[1] + .7 * b ];
                    u.half = c < -Math.PI / 2 || c > Math.PI / 2 ? 1 : 0;
                    u.angle = c;
                    l = Math.min(l, p / 5);
                    u.labelPos = [ a[0] + f + Math.cos(c) * p, a[1] + b + Math.sin(c) * p, a[0] + f + Math.cos(c) * l, a[1] + b + Math.sin(c) * l, a[0] + f, a[1] + b, 0 > p ? "center" : u.half ? "right" : "left", c ];
                }
            },
            drawGraph: null,
            drawPoints: function() {
                var a = this, g = a.chart.renderer, h, k, l, f, b = a.options.shadow;
                b && !a.shadowGroup && (a.shadowGroup = g.g("shadow").add(a.group));
                E(a.points, function(c) {
                    if (null !== c.y) {
                        k = c.graphic;
                        f = c.shapeArgs;
                        h = c.sliced ? c.slicedTranslation : {};
                        var m = c.shadowGroup;
                        b && !m && (m = c.shadowGroup = g.g("shadow").add(a.shadowGroup));
                        m && m.attr(h);
                        l = a.pointAttribs(c, c.selected && "select");
                        k ? k.setRadialReference(a.center).attr(l).animate(H(f, h)) : (c.graphic = k = g[c.shapeType](f).addClass(c.getClassName()).setRadialReference(a.center).attr(h).add(a.group),
                            c.visible || k.attr({
                            visibility: "hidden"
                        }), k.attr(l).attr({
                            "stroke-linejoin": "round"
                        }).shadow(b, m));
                    }
                });
            },
            searchPoint: n,
            sortByAngle: function(a, g) {
                a.sort(function(a, d) {
                    return void 0 !== a.angle && (d.angle - a.angle) * g;
                });
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            getCenter: a.CenteredSeriesMixin.getCenter,
            getSymbol: n
        }, {
            init: function() {
                r.prototype.init.apply(this, arguments);
                var a = this, g;
                a.name = k(a.name, "Slice");
                g = function(g) {
                    a.slice("select" === g.type);
                };
                C(a, "select", g);
                C(a, "unselect", g);
                return a;
            },
            setVisible: function(a, g) {
                var h = this, n = h.series, l = n.chart, f = n.options.ignoreHiddenPoint;
                g = k(g, f);
                a !== h.visible && (h.visible = h.options.visible = a = void 0 === a ? !h.visible : a,
                    n.options.data[v(h, n.data)] = h.options, E([ "graphic", "dataLabel", "connector", "shadowGroup" ], function(b) {
                    if (h[b]) h[b][a ? "show" : "hide"](!0);
                }), h.legendItem && l.legend.colorizeItem(h, a), a || "hover" !== h.state || h.setState(""),
                    f && (n.isDirty = !0), g && l.redraw());
            },
            slice: function(a, g, h) {
                var n = this.series;
                u(h, n.chart);
                k(g, !0);
                this.sliced = this.options.sliced = a = z(a) ? a : !this.sliced;
                n.options.data[v(this, n.data)] = this.options;
                a = a ? this.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                };
                this.graphic.animate(a);
                this.shadowGroup && this.shadowGroup.animate(a);
            },
            haloPath: function(a) {
                var g = this.shapeArgs, h = this.series.chart;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(h.plotLeft + g.x, h.plotTop + g.y, g.r + a, g.r + a, {
                    innerR: this.shapeArgs.r,
                    start: g.start,
                    end: g.end
                });
            }
        });
    })(J);
    (function(a) {
        var C = a.addEvent, z = a.arrayMax, E = a.defined, H = a.each, v = a.extend, n = a.format, k = a.map, r = a.merge, t = a.noop, h = a.pick, u = a.relativeLength, d = a.Series, g = a.seriesTypes, q = a.stableSort, w = a.stop;
        a.distribute = function(a, d) {
            function b(a, b) {
                return a.target - b.target;
            }
            var c, m = !0, e = a, g = [], p;
            p = 0;
            for (c = a.length; c--; ) p += a[c].size;
            if (p > d) {
                q(a, function(a, b) {
                    return (b.rank || 0) - (a.rank || 0);
                });
                for (p = c = 0; p <= d; ) p += a[c].size, c++;
                g = a.splice(c - 1, a.length);
            }
            q(a, b);
            for (a = k(a, function(a) {
                return {
                    size: a.size,
                    targets: [ a.target ]
                };
            }); m; ) {
                for (c = a.length; c--; ) m = a[c], p = (Math.min.apply(0, m.targets) + Math.max.apply(0, m.targets)) / 2,
                    m.pos = Math.min(Math.max(0, p - m.size / 2), d - m.size);
                c = a.length;
                for (m = !1; c--; ) 0 < c && a[c - 1].pos + a[c - 1].size > a[c].pos && (a[c - 1].size += a[c].size,
                    a[c - 1].targets = a[c - 1].targets.concat(a[c].targets), a[c - 1].pos + a[c - 1].size > d && (a[c - 1].pos = d - a[c - 1].size),
                    a.splice(c, 1), m = !0);
            }
            c = 0;
            H(a, function(a) {
                var b = 0;
                H(a.targets, function() {
                    e[c].pos = a.pos + b;
                    b += e[c].size;
                    c++;
                });
            });
            e.push.apply(e, g);
            q(e, b);
        };
        d.prototype.drawDataLabels = function() {
            var a = this, d = a.options, b = d.dataLabels, c = a.points, m, e, g = a.hasRendered || 0, p, q, k = h(b.defer, !0), u = a.chart.renderer;
            if (b.enabled || a._hasPointLabels) a.dlProcessOptions && a.dlProcessOptions(b),
                q = a.plotGroup("dataLabelsGroup", "data-labels", k && !g ? "hidden" : "visible", b.zIndex || 6),
                k && (q.attr({
                opacity: +g
            }), g || C(a, "afterAnimate", function() {
                a.visible && q.show(!0);
                q[d.animation ? "animate" : "attr"]({
                    opacity: 1
                }, {
                    duration: 200
                });
            })), e = b, H(c, function(c) {
                var g, k = c.dataLabel, x, w, t = c.connector, D = !0, z, C = {};
                m = c.dlOptions || c.options && c.options.dataLabels;
                g = h(m && m.enabled, e.enabled) && null !== c.y;
                if (k && !g) c.dataLabel = k.destroy(); else if (g) {
                    b = r(e, m);
                    z = b.style;
                    g = b.rotation;
                    x = c.getLabelConfig();
                    p = b.format ? n(b.format, x) : b.formatter.call(x, b);
                    z.color = h(b.color, z.color, a.color, "#000000");
                    if (k) E(p) ? (k.attr({
                        text: p
                    }), D = !1) : (c.dataLabel = k = k.destroy(), t && (c.connector = t.destroy())); else if (E(p)) {
                        k = {
                            fill: b.backgroundColor,
                            stroke: b.borderColor,
                            "stroke-width": b.borderWidth,
                            r: b.borderRadius || 0,
                            rotation: g,
                            padding: b.padding,
                            zIndex: 1
                        };
                        "contrast" === z.color && (C.color = b.inside || 0 > b.distance || d.stacking ? u.getContrast(c.color || a.color) : "#000000");
                        d.cursor && (C.cursor = d.cursor);
                        for (w in k) void 0 === k[w] && delete k[w];
                        k = c.dataLabel = u[g ? "text" : "label"](p, 0, -9999, b.shape, null, null, b.useHTML, null, "data-label").attr(k);
                        k.addClass("highcharts-data-label-color-" + c.colorIndex + " " + (b.className || ""));
                        k.css(v(z, C));
                        k.add(q);
                        k.shadow(b.shadow);
                    }
                    k && a.alignDataLabel(c, k, b, null, D);
                }
            });
        };
        d.prototype.alignDataLabel = function(a, d, b, c, m) {
            var e = this.chart, g = e.inverted, p = h(a.plotX, -9999), q = h(a.plotY, -9999), k = d.getBBox(), n, r = b.rotation, y = b.align, u = this.visible && (a.series.forceDL || e.isInsidePlot(p, Math.round(q), g) || c && e.isInsidePlot(p, g ? c.x + 1 : c.y + c.height - 1, g)), t = "justify" === h(b.overflow, "justify");
            u && (n = b.style.fontSize, n = e.renderer.fontMetrics(n, d).b, c = v({
                x: g ? e.plotWidth - q : p,
                y: Math.round(g ? e.plotHeight - p : q),
                width: 0,
                height: 0
            }, c), v(b, {
                width: k.width,
                height: k.height
            }), r ? (t = !1, g = e.renderer.rotCorr(n, r), g = {
                x: c.x + b.x + c.width / 2 + g.x,
                y: c.y + b.y + {
                    top: 0,
                    middle: .5,
                    bottom: 1
                }[b.verticalAlign] * c.height
            }, d[m ? "attr" : "animate"](g).attr({
                align: y
            }), p = (r + 720) % 360, p = 180 < p && 360 > p, "left" === y ? g.y -= p ? k.height : 0 : "center" === y ? (g.x -= k.width / 2,
                g.y -= k.height / 2) : "right" === y && (g.x -= k.width, g.y -= p ? 0 : k.height)) : (d.align(b, null, c),
                g = d.alignAttr), t ? this.justifyDataLabel(d, b, g, k, c, m) : h(b.crop, !0) && (u = e.isInsidePlot(g.x, g.y) && e.isInsidePlot(g.x + k.width, g.y + k.height)),
                b.shape && !r && d.attr({
                anchorX: a.plotX,
                anchorY: a.plotY
            }));
            u || (w(d), d.attr({
                y: -9999
            }), d.placed = !1);
        };
        d.prototype.justifyDataLabel = function(a, d, b, c, g, e) {
            var h = this.chart, p = d.align, q = d.verticalAlign, k, n, r = a.box ? 0 : a.padding || 0;
            k = b.x + r;
            0 > k && ("right" === p ? d.align = "left" : d.x = -k, n = !0);
            k = b.x + c.width - r;
            k > h.plotWidth && ("left" === p ? d.align = "right" : d.x = h.plotWidth - k, n = !0);
            k = b.y + r;
            0 > k && ("bottom" === q ? d.verticalAlign = "top" : d.y = -k, n = !0);
            k = b.y + c.height - r;
            k > h.plotHeight && ("top" === q ? d.verticalAlign = "bottom" : d.y = h.plotHeight - k,
                n = !0);
            n && (a.placed = !e, a.align(d, null, g));
        };
        g.pie && (g.pie.prototype.drawDataLabels = function() {
            var g = this, f = g.data, b, c = g.chart, m = g.options.dataLabels, e = h(m.connectorPadding, 10), q = h(m.connectorWidth, 1), p = c.plotWidth, n = c.plotHeight, x, r = m.distance, u = g.center, y = u[2] / 2, w = u[1], t = 0 < r, A, v, C, E, T = [ [], [] ], S, Q, J, P, O = [ 0, 0, 0, 0 ];
            g.visible && (m.enabled || g._hasPointLabels) && (d.prototype.drawDataLabels.apply(g),
                H(f, function(a) {
                    a.dataLabel && a.visible && (T[a.half].push(a), a.dataLabel._pos = null);
                }), H(T, function(d, f) {
                var h, q, x = d.length, t, D, K;
                if (x) for (g.sortByAngle(d, f - .5), 0 < r && (h = Math.max(0, w - y - r), q = Math.min(w + y + r, c.plotHeight),
                    t = k(d, function(a) {
                        if (a.dataLabel) return K = a.dataLabel.getBBox().height || 21, {
                            target: a.labelPos[1] - h + K / 2,
                            size: K,
                            rank: a.y
                        };
                    }), a.distribute(t, q + K - h)), P = 0; P < x; P++) b = d[P], C = b.labelPos, A = b.dataLabel,
                    J = !1 === b.visible ? "hidden" : "inherit", D = C[1], t ? void 0 === t[P].pos ? J = "hidden" : (E = t[P].size,
                    Q = h + t[P].pos) : Q = D, S = m.justify ? u[0] + (f ? -1 : 1) * (y + r) : g.getX(Q < h + 2 || Q > q - 2 ? D : Q, f),
                    A._attr = {
                        visibility: J,
                        align: C[6]
                    }, A._pos = {
                    x: S + m.x + ({
                        left: e,
                        right: -e
                    }[C[6]] || 0),
                    y: Q + m.y - 10
                }, C.x = S, C.y = Q, null === g.options.size && (v = A.width, S - v < e ? O[3] = Math.max(Math.round(v - S + e), O[3]) : S + v > p - e && (O[1] = Math.max(Math.round(S + v - p + e), O[1])),
                        0 > Q - E / 2 ? O[0] = Math.max(Math.round(-Q + E / 2), O[0]) : Q + E / 2 > n && (O[2] = Math.max(Math.round(Q + E / 2 - n), O[2])));
            }), 0 === z(O) || this.verifyDataLabelOverflow(O)) && (this.placeDataLabels(), t && q && H(this.points, function(a) {
                var b;
                x = a.connector;
                if ((A = a.dataLabel) && A._pos && a.visible) {
                    J = A._attr.visibility;
                    if (b = !x) a.connector = x = c.renderer.path().addClass("highcharts-data-label-connector highcharts-color-" + a.colorIndex).add(g.dataLabelsGroup),
                        x.attr({
                            "stroke-width": q,
                            stroke: m.connectorColor || a.color || "#666666"
                        });
                    x[b ? "attr" : "animate"]({
                        d: g.connectorPath(a.labelPos)
                    });
                    x.attr("visibility", J);
                } else x && (a.connector = x.destroy());
            }));
        }, g.pie.prototype.connectorPath = function(a) {
            var d = a.x, b = a.y;
            return h(this.options.softConnector, !0) ? [ "M", d + ("left" === a[6] ? 5 : -5), b, "C", d, b, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4], a[5] ] : [ "M", d + ("left" === a[6] ? 5 : -5), b, "L", a[2], a[3], "L", a[4], a[5] ];
        }, g.pie.prototype.placeDataLabels = function() {
            H(this.points, function(a) {
                var d = a.dataLabel;
                d && a.visible && ((a = d._pos) ? (d.attr(d._attr), d[d.moved ? "animate" : "attr"](a),
                    d.moved = !0) : d && d.attr({
                    y: -9999
                }));
            });
        }, g.pie.prototype.alignDataLabel = t, g.pie.prototype.verifyDataLabelOverflow = function(a) {
            var d = this.center, b = this.options, c = b.center, g = b.minSize || 80, e, h;
            null !== c[0] ? e = Math.max(d[2] - Math.max(a[1], a[3]), g) : (e = Math.max(d[2] - a[1] - a[3], g),
                d[0] += (a[3] - a[1]) / 2);
            null !== c[1] ? e = Math.max(Math.min(e, d[2] - Math.max(a[0], a[2])), g) : (e = Math.max(Math.min(e, d[2] - a[0] - a[2]), g),
                d[1] += (a[0] - a[2]) / 2);
            e < d[2] ? (d[2] = e, d[3] = Math.min(u(b.innerSize || 0, e), e), this.translate(d),
                this.drawDataLabels && this.drawDataLabels()) : h = !0;
            return h;
        });
        g.column && (g.column.prototype.alignDataLabel = function(a, f, b, c, g) {
            var e = this.chart.inverted, q = a.series, p = a.dlBox || a.shapeArgs, k = h(a.below, a.plotY > h(this.translatedThreshold, q.yAxis.len)), x = h(b.inside, !!this.options.stacking);
            p && (c = r(p), 0 > c.y && (c.height += c.y, c.y = 0), p = c.y + c.height - q.yAxis.len,
                0 < p && (c.height -= p), e && (c = {
                x: q.yAxis.len - c.y - c.height,
                y: q.xAxis.len - c.x - c.width,
                width: c.height,
                height: c.width
            }), x || (e ? (c.x += k ? 0 : c.width, c.width = 0) : (c.y += k ? c.height : 0,
                c.height = 0)));
            b.align = h(b.align, !e || x ? "center" : k ? "right" : "left");
            b.verticalAlign = h(b.verticalAlign, e || x ? "middle" : k ? "top" : "bottom");
            d.prototype.alignDataLabel.call(this, a, f, b, c, g);
        });
    })(J);
    (function(a) {
        var C = a.Chart, z = a.each, E = a.pick, H = a.addEvent;
        C.prototype.callbacks.push(function(a) {
            function n() {
                var k = [];
                z(a.series, function(a) {
                    var n = a.options.dataLabels, h = a.dataLabelCollections || [ "dataLabel" ];
                    (n.enabled || a._hasPointLabels) && !n.allowOverlap && a.visible && z(h, function(h) {
                        z(a.points, function(a) {
                            a[h] && (a[h].labelrank = E(a.labelrank, a.shapeArgs && a.shapeArgs.height), k.push(a[h]));
                        });
                    });
                });
                a.hideOverlappingLabels(k);
            }
            n();
            H(a, "redraw", n);
        });
        C.prototype.hideOverlappingLabels = function(a) {
            var n = a.length, k, r, t, h, u, d, g, q, w, l = function(a, b, c, d, e, g, p, h) {
                return !(e > a + c || e + p < a || g > b + d || g + h < b);
            };
            for (r = 0; r < n; r++) if (k = a[r]) k.oldOpacity = k.opacity, k.newOpacity = 1;
            a.sort(function(a, b) {
                return (b.labelrank || 0) - (a.labelrank || 0);
            });
            for (r = 0; r < n; r++) for (t = a[r], k = r + 1; k < n; ++k) if (h = a[k], t && h && t.placed && h.placed && 0 !== t.newOpacity && 0 !== h.newOpacity && (u = t.alignAttr,
                d = h.alignAttr, g = t.parentGroup, q = h.parentGroup, w = 2 * (t.box ? 0 : t.padding),
                u = l(u.x + g.translateX, u.y + g.translateY, t.width - w, t.height - w, d.x + q.translateX, d.y + q.translateY, h.width - w, h.height - w))) (t.labelrank < h.labelrank ? t : h).newOpacity = 0;
            z(a, function(a) {
                var b, c;
                a && (c = a.newOpacity, a.oldOpacity !== c && a.placed && (c ? a.show(!0) : b = function() {
                    a.hide();
                }, a.alignAttr.opacity = c, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b)),
                    a.isOld = !0);
            });
        };
    })(J);
    (function(a) {
        var C = a.addEvent, z = a.Chart, E = a.createElement, H = a.css, v = a.defaultOptions, n = a.defaultPlotOptions, k = a.each, r = a.extend, t = a.fireEvent, h = a.hasTouch, u = a.inArray, d = a.isObject, g = a.Legend, q = a.merge, w = a.pick, l = a.Point, f = a.Series, b = a.seriesTypes, c = a.svg;
        a = a.TrackerMixin = {
            drawTrackerPoint: function() {
                var a = this, b = a.chart, c = b.pointer, d = function(a) {
                    for (var c = a.target, d; c && !d; ) d = c.point, c = c.parentNode;
                    if (void 0 !== d && d !== b.hoverPoint) d.onMouseOver(a);
                };
                k(a.points, function(a) {
                    a.graphic && (a.graphic.element.point = a);
                    a.dataLabel && (a.dataLabel.element.point = a);
                });
                a._hasTracking || (k(a.trackerGroups, function(b) {
                    if (a[b]) {
                        a[b].addClass("highcharts-tracker").on("mouseover", d).on("mouseout", function(a) {
                            c.onTrackerMouseOut(a);
                        });
                        if (h) a[b].on("touchstart", d);
                        a.options.cursor && a[b].css(H).css({
                            cursor: a.options.cursor
                        });
                    }
                }), a._hasTracking = !0);
            },
            drawTrackerGraph: function() {
                var a = this, b = a.options, d = b.trackByArea, f = [].concat(d ? a.areaPath : a.graphPath), g = f.length, l = a.chart, q = l.pointer, n = l.renderer, y = l.options.tooltip.snap, r = a.tracker, u, w = function() {
                    if (l.hoverSeries !== a) a.onMouseOver();
                }, t = "rgba(192,192,192," + (c ? 1e-4 : .002) + ")";
                if (g && !d) for (u = g + 1; u--; ) "M" === f[u] && f.splice(u + 1, 0, f[u + 1] - y, f[u + 2], "L"),
                    (u && "M" === f[u] || u === g) && f.splice(u, 0, "L", f[u - 2] + y, f[u - 1]);
                r ? r.attr({
                    d: f
                }) : a.graph && (a.tracker = n.path(f).attr({
                    "stroke-linejoin": "round",
                    visibility: a.visible ? "visible" : "hidden",
                    stroke: t,
                    fill: d ? t : "none",
                    "stroke-width": a.graph.strokeWidth() + (d ? 0 : 2 * y),
                    zIndex: 2
                }).add(a.group), k([ a.tracker, a.markerGroup ], function(a) {
                    a.addClass("highcharts-tracker").on("mouseover", w).on("mouseout", function(a) {
                        q.onTrackerMouseOut(a);
                    });
                    b.cursor && a.css({
                        cursor: b.cursor
                    });
                    if (h) a.on("touchstart", w);
                }));
            }
        };
        b.column && (b.column.prototype.drawTracker = a.drawTrackerPoint);
        b.pie && (b.pie.prototype.drawTracker = a.drawTrackerPoint);
        b.scatter && (b.scatter.prototype.drawTracker = a.drawTrackerPoint);
        r(g.prototype, {
            setItemEvents: function(a, b, c) {
                var d = this, f = d.chart, g = "highcharts-legend-" + (a.series ? "point" : "series") + "-active";
                (c ? b : a.legendGroup).on("mouseover", function() {
                    a.setState("hover");
                    f.seriesGroup.addClass(g);
                    b.css(d.options.itemHoverStyle);
                }).on("mouseout", function() {
                    b.css(a.visible ? d.itemStyle : d.itemHiddenStyle);
                    f.seriesGroup.removeClass(g);
                    a.setState();
                }).on("click", function(b) {
                    var c = function() {
                        a.setVisible && a.setVisible();
                    };
                    b = {
                        browserEvent: b
                    };
                    a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : t(a, "legendItemClick", b, c);
                });
            },
            createCheckboxForItem: function(a) {
                a.checkbox = E("input", {
                    type: "checkbox",
                    checked: a.selected,
                    defaultChecked: a.selected
                }, this.options.itemCheckboxStyle, this.chart.container);
                C(a.checkbox, "click", function(b) {
                    t(a.series || a, "checkboxClick", {
                        checked: b.target.checked,
                        item: a
                    }, function() {
                        a.select();
                    });
                });
            }
        });
        v.legend.itemStyle.cursor = "pointer";
        r(z.prototype, {
            showResetZoom: function() {
                var a = this, b = v.lang, c = a.options.chart.resetZoomButton, d = c.theme, f = d.states, g = "chart" === c.relativeTo ? null : "plotBox";
                this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function() {
                    a.zoomOut();
                }, d, f && f.hover).attr({
                    align: c.position.align,
                    title: b.resetZoomTitle
                }).addClass("highcharts-reset-zoom").add().align(c.position, !1, g);
            },
            zoomOut: function() {
                var a = this;
                t(a, "selection", {
                    resetSelection: !0
                }, function() {
                    a.zoom();
                });
            },
            zoom: function(a) {
                var b, c = this.pointer, f = !1, g;
                !a || a.resetSelection ? k(this.axes, function(a) {
                    b = a.zoom();
                }) : k(a.xAxis.concat(a.yAxis), function(a) {
                    var d = a.axis, g = d.isXAxis;
                    if (c[g ? "zoomX" : "zoomY"] || c[g ? "pinchX" : "pinchY"]) b = d.zoom(a.min, a.max),
                        d.displayBtn && (f = !0);
                });
                g = this.resetZoomButton;
                f && !g ? this.showResetZoom() : !f && d(g) && (this.resetZoomButton = g.destroy());
                b && this.redraw(w(this.options.chart.animation, a && a.animation, 100 > this.pointCount));
            },
            pan: function(a, b) {
                var c = this, d = c.hoverPoints, f;
                d && k(d, function(a) {
                    a.setState();
                });
                k("xy" === b ? [ 1, 0 ] : [ 1 ], function(b) {
                    b = c[b ? "xAxis" : "yAxis"][0];
                    var d = b.horiz, e = a[d ? "chartX" : "chartY"], d = d ? "mouseDownX" : "mouseDownY", g = c[d], h = (b.pointRange || 0) / 2, p = b.getExtremes(), l = b.toValue(g - e, !0) + h, h = b.toValue(g + b.len - e, !0) - h, g = g > e;
                    b.series.length && (g || l > Math.min(p.dataMin, p.min)) && (!g || h < Math.max(p.dataMax, p.max)) && (b.setExtremes(l, h, !1, !1, {
                        trigger: "pan"
                    }), f = !0);
                    c[d] = e;
                });
                f && c.redraw(!1);
                H(c.container, {
                    cursor: "move"
                });
            }
        });
        r(l.prototype, {
            select: function(a, b) {
                var c = this, d = c.series, f = d.chart;
                a = w(a, !c.selected);
                c.firePointEvent(a ? "select" : "unselect", {
                    accumulate: b
                }, function() {
                    c.selected = c.options.selected = a;
                    d.options.data[u(c, d.data)] = c.options;
                    c.setState(a && "select");
                    b || k(f.getSelectedPoints(), function(a) {
                        a.selected && a !== c && (a.selected = a.options.selected = !1, d.options.data[u(a, d.data)] = a.options,
                            a.setState(""), a.firePointEvent("unselect"));
                    });
                });
            },
            onMouseOver: function(a, b) {
                var c = this.series, d = c.chart, f = d.tooltip, g = d.hoverPoint;
                if (d.hoverSeries !== c) c.onMouseOver();
                if (g && g !== this) g.onMouseOut();
                this.series && (this.firePointEvent("mouseOver"), !f || f.shared && !c.noSharedTooltip || f.refresh(this, a),
                    this.setState("hover"), b || (d.hoverPoint = this));
            },
            onMouseOut: function() {
                var a = this.series.chart, b = a.hoverPoints;
                this.firePointEvent("mouseOut");
                b && -1 !== u(this, b) || (this.setState(), a.hoverPoint = null);
            },
            importEvents: function() {
                if (!this.hasImportedEvents) {
                    var a = q(this.series.options.point, this.options).events, b;
                    this.events = a;
                    for (b in a) C(this, b, a[b]);
                    this.hasImportedEvents = !0;
                }
            },
            setState: function(a, b) {
                var c = Math.floor(this.plotX), d = this.plotY, f = this.series, g = f.options.states[a] || {}, h = n[f.type].marker && f.options.marker || {}, l = !1 === h.enabled, k = h.states && h.states[a] || {}, u = !1 === k.enabled, t = f.stateMarkerGraphic, A = this.marker || {}, v = f.chart, z = f.halo;
                a = a || "";
                if (!(a === this.state && !b || this.selected && "select" !== a || !1 === g.enabled || a && (u || l && !1 === k.enabled) || a && A.states && A.states[a] && !1 === A.states[a].enabled)) {
                    h = k.radius || h.radius + (k.radiusPlus || 0);
                    if (this.graphic) this.state && this.graphic.removeClass("highcharts-point-" + this.state),
                        a && this.graphic.addClass("highcharts-point-" + a), c = h ? {
                        x: c - h,
                        y: d - h,
                        width: 2 * h,
                        height: 2 * h
                    } : {}, c = q(f.pointAttribs(this, a), c), this.graphic.attr(c), t && t.hide(); else {
                        if (a && k) {
                            k = A.symbol || f.symbol;
                            t && t.currentSymbol !== k && (t = t.destroy());
                            if (t) t[b ? "animate" : "attr"]({
                                x: c - h,
                                y: d - h
                            }); else k && (f.stateMarkerGraphic = t = v.renderer.symbol(k, c - h, d - h, 2 * h, 2 * h).add(f.markerGroup),
                                t.currentSymbol = k);
                            t && t.attr(f.pointAttribs(this, a));
                        }
                        t && (t[a && v.isInsidePlot(c, d, v.inverted) ? "show" : "hide"](), t.element.point = this);
                    }
                    (g = g.halo) && g.size ? (z || (f.halo = z = v.renderer.path().add(v.seriesGroup)),
                        z[b ? "animate" : "attr"]({
                            d: this.haloPath(g.size)
                        }), z.attr({
                        "class": "highcharts-halo highcharts-color-" + w(this.colorIndex, f.colorIndex)
                    }), z.attr(r({
                        fill: this.color || f.color,
                        "fill-opacity": g.opacity,
                        zIndex: -1
                    }, g.attributes))[b ? "animate" : "attr"]({
                        d: this.haloPath(g.size)
                    })) : z && z.attr({
                        d: []
                    });
                    this.state = a;
                }
            },
            haloPath: function(a) {
                var b = this.series, c = b.chart, d = b.getPlotBox(), f = c.inverted, g = Math.floor(this.plotX);
                return c.renderer.symbols.circle(d.translateX + (f ? b.yAxis.len - this.plotY : g) - a, d.translateY + (f ? b.xAxis.len - g : this.plotY) - a, 2 * a, 2 * a);
            }
        });
        r(f.prototype, {
            onMouseOver: function() {
                var a = this.chart, b = a.hoverSeries;
                if (b && b !== this) b.onMouseOut();
                this.options.events.mouseOver && t(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this;
            },
            onMouseOut: function() {
                var a = this.options, b = this.chart, c = b.tooltip, d = b.hoverPoint;
                b.hoverSeries = null;
                if (d) d.onMouseOut();
                this && a.events.mouseOut && t(this, "mouseOut");
                !c || a.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();
                this.setState();
            },
            setState: function(a) {
                var b = this, c = b.options, d = b.graph, f = c.states, g = c.lineWidth, c = 0;
                a = a || "";
                if (b.state !== a && (k([ b.group, b.markerGroup ], function(c) {
                    c && (b.state && c.removeClass("highcharts-series-" + b.state), a && c.addClass("highcharts-series-" + a));
                }), b.state = a, !f[a] || !1 !== f[a].enabled) && (a && (g = f[a].lineWidth || g + (f[a].lineWidthPlus || 0)),
                    d && !d.dashstyle)) for (f = {
                    "stroke-width": g
                }, d.attr(f); b["zone-graph-" + c]; ) b["zone-graph-" + c].attr(f), c += 1;
            },
            setVisible: function(a, b) {
                var c = this, d = c.chart, f = c.legendItem, g, h = d.options.chart.ignoreHiddenSeries, l = c.visible;
                g = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !l : a) ? "show" : "hide";
                k([ "group", "dataLabelsGroup", "markerGroup", "tracker" ], function(a) {
                    if (c[a]) c[a][g]();
                });
                if (d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) === c) c.onMouseOut();
                f && d.legend.colorizeItem(c, a);
                c.isDirty = !0;
                c.options.stacking && k(d.series, function(a) {
                    a.options.stacking && a.visible && (a.isDirty = !0);
                });
                k(c.linkedSeries, function(b) {
                    b.setVisible(a, !1);
                });
                h && (d.isDirtyBox = !0);
                !1 !== b && d.redraw();
                t(c, g);
            },
            show: function() {
                this.setVisible(!0);
            },
            hide: function() {
                this.setVisible(!1);
            },
            select: function(a) {
                this.selected = a = void 0 === a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                t(this, a ? "select" : "unselect");
            },
            drawTracker: a.drawTrackerGraph
        });
    })(J);
    (function(a) {
        var C = a.Chart, z = a.each, E = a.inArray, H = a.isObject, v = a.pick, n = a.splat;
        C.prototype.setResponsive = function(a) {
            var n = this.options.responsive;
            n && n.rules && z(n.rules, function(n) {
                this.matchResponsiveRule(n, a);
            }, this);
        };
        C.prototype.matchResponsiveRule = function(k, n) {
            var t = this.respRules, h = k.condition, u;
            u = k.callback || function() {
                return this.chartWidth <= v(h.maxWidth, Number.MAX_VALUE) && this.chartHeight <= v(h.maxHeight, Number.MAX_VALUE) && this.chartWidth >= v(h.minWidth, 0) && this.chartHeight >= v(h.minHeight, 0);
            };
            void 0 === k._id && (k._id = a.idCounter++);
            u = u.call(this);
            !t[k._id] && u ? k.chartOptions && (t[k._id] = this.currentOptions(k.chartOptions),
                this.update(k.chartOptions, n)) : t[k._id] && !u && (this.update(t[k._id], n), delete t[k._id]);
        };
        C.prototype.currentOptions = function(a) {
            function r(a, k, d) {
                var g, q;
                for (g in a) if (-1 < E(g, [ "series", "xAxis", "yAxis" ])) for (a[g] = n(a[g]),
                                                                                     d[g] = [], q = 0; q < a[g].length; q++) d[g][q] = {}, r(a[g][q], k[g][q], d[g][q]); else H(a[g]) ? (d[g] = {},
                    r(a[g], k[g] || {}, d[g])) : d[g] = k[g] || null;
            }
            var t = {};
            r(a, this.options, t);
            return t;
        };
    })(J);
    (function(a) {
        var C = a.addEvent, z = a.Axis, E = a.Chart, H = a.css, v = a.dateFormat, n = a.defined, k = a.each, r = a.extend, t = a.noop, h = a.Series, u = a.timeUnits;
        a = a.wrap;
        a(h.prototype, "init", function(a) {
            var g;
            a.apply(this, Array.prototype.slice.call(arguments, 1));
            (g = this.xAxis) && g.options.ordinal && C(this, "updatedData", function() {
                delete g.ordinalIndex;
            });
        });
        a(z.prototype, "getTimeTicks", function(a, g, h, k, l, f, b, c) {
            var m = 0, e, r, p = {}, t, x, z, G = [], y = -Number.MAX_VALUE, F = this.options.tickPixelInterval;
            if (!this.options.ordinal && !this.options.breaks || !f || 3 > f.length || void 0 === h) return a.call(this, g, h, k, l);
            x = f.length;
            for (e = 0; e < x; e++) {
                z = e && f[e - 1] > k;
                f[e] < h && (m = e);
                if (e === x - 1 || f[e + 1] - f[e] > 5 * b || z) {
                    if (f[e] > y) {
                        for (r = a.call(this, g, f[m], f[e], l); r.length && r[0] <= y; ) r.shift();
                        r.length && (y = r[r.length - 1]);
                        G = G.concat(r);
                    }
                    m = e + 1;
                }
                if (z) break;
            }
            a = r.info;
            if (c && a.unitRange <= u.hour) {
                e = G.length - 1;
                for (m = 1; m < e; m++) v("%d", G[m]) !== v("%d", G[m - 1]) && (p[G[m]] = "day",
                    t = !0);
                t && (p[G[0]] = "day");
                a.higherRanks = p;
            }
            G.info = a;
            if (c && n(F)) {
                c = a = G.length;
                e = [];
                var K;
                for (t = []; c--; ) m = this.translate(G[c]), K && (t[c] = K - m), e[c] = K = m;
                t.sort();
                t = t[Math.floor(t.length / 2)];
                t < .6 * F && (t = null);
                c = G[a - 1] > k ? a - 1 : a;
                for (K = void 0; c--; ) m = e[c], k = K - m, K && k < .8 * F && (null === t || k < .8 * t) ? (p[G[c]] && !p[G[c + 1]] ? (k = c + 1,
                    K = m) : k = c, G.splice(k, 1)) : K = m;
            }
            return G;
        });
        r(z.prototype, {
            beforeSetTickPositions: function() {
                var a, g = [], h = !1, n, l = this.getExtremes(), f = l.min, b = l.max, c, m = this.isXAxis && !!this.options.breaks, l = this.options.ordinal, e = this.chart.options.chart.ignoreHiddenSeries;
                if (l || m) {
                    k(this.series, function(b, c) {
                        if (!(e && !1 === b.visible || !1 === b.takeOrdinalPosition && !m) && (g = g.concat(b.processedXData),
                            a = g.length, g.sort(function(a, b) {
                            return a - b;
                        }), a)) for (c = a - 1; c--; ) g[c] === g[c + 1] && g.splice(c, 1);
                    });
                    a = g.length;
                    if (2 < a) {
                        n = g[1] - g[0];
                        for (c = a - 1; c-- && !h; ) g[c + 1] - g[c] !== n && (h = !0);
                        !this.options.keepOrdinalPadding && (g[0] - f > n || b - g[g.length - 1] > n) && (h = !0);
                    }
                    h ? (this.ordinalPositions = g, n = this.val2lin(Math.max(f, g[0]), !0), c = Math.max(this.val2lin(Math.min(b, g[g.length - 1]), !0), 1),
                        this.ordinalSlope = b = (b - f) / (c - n), this.ordinalOffset = f - n * b) : this.ordinalPositions = this.ordinalSlope = this.ordinalOffset = void 0;
                }
                this.isOrdinal = l && h;
                this.groupIntervalFactor = null;
            },
            val2lin: function(a, g) {
                var h = this.ordinalPositions, k;
                if (h) {
                    var l = h.length, f;
                    for (k = l; k--; ) if (h[k] === a) {
                        f = k;
                        break;
                    }
                    for (k = l - 1; k--; ) if (a > h[k] || 0 === k) {
                        h = (a - h[k]) / (h[k + 1] - h[k]);
                        f = k + h;
                        break;
                    }
                    k = g ? f : this.ordinalSlope * (f || 0) + this.ordinalOffset;
                } else k = a;
                return k;
            },
            lin2val: function(a, g) {
                var h = this.ordinalPositions;
                if (h) {
                    var k = this.ordinalSlope, l = this.ordinalOffset, f = h.length - 1, b, c;
                    if (g) 0 > a ? a = h[0] : a > f ? a = h[f] : (f = Math.floor(a), c = a - f); else for (;f--; ) if (b = k * f + l,
                        a >= b) {
                        k = k * (f + 1) + l;
                        c = (a - b) / (k - b);
                        break;
                    }
                    return void 0 !== c && void 0 !== h[f] ? h[f] + (c ? c * (h[f + 1] - h[f]) : 0) : a;
                }
                return a;
            },
            getExtendedPositions: function() {
                var a = this.chart, g = this.series[0].currentDataGrouping, h = this.ordinalIndex, n = g ? g.count + g.unitName : "raw", l = this.getExtremes(), f, b;
                h || (h = this.ordinalIndex = {});
                h[n] || (f = {
                    series: [],
                    chart: a,
                    getExtremes: function() {
                        return {
                            min: l.dataMin,
                            max: l.dataMax
                        };
                    },
                    options: {
                        ordinal: !0
                    },
                    val2lin: z.prototype.val2lin
                }, k(this.series, function(c) {
                    b = {
                        xAxis: f,
                        xData: c.xData,
                        chart: a,
                        destroyGroupedData: t
                    };
                    b.options = {
                        dataGrouping: g ? {
                            enabled: !0,
                            forced: !0,
                            approximation: "open",
                            units: [ [ g.unitName, [ g.count ] ] ]
                        } : {
                            enabled: !1
                        }
                    };
                    c.processData.apply(b);
                    f.series.push(b);
                }), this.beforeSetTickPositions.apply(f), h[n] = f.ordinalPositions);
                return h[n];
            },
            getGroupIntervalFactor: function(a, g, h) {
                var k;
                h = h.processedXData;
                var l = h.length, f = [];
                k = this.groupIntervalFactor;
                if (!k) {
                    for (k = 0; k < l - 1; k++) f[k] = h[k + 1] - h[k];
                    f.sort(function(a, c) {
                        return a - c;
                    });
                    f = f[Math.floor(l / 2)];
                    a = Math.max(a, h[0]);
                    g = Math.min(g, h[l - 1]);
                    this.groupIntervalFactor = k = l * f / (g - a);
                }
                return k;
            },
            postProcessTickInterval: function(a) {
                var g = this.ordinalSlope;
                return g ? this.options.breaks ? this.closestPointRange : a / (g / this.closestPointRange) : a;
            }
        });
        a(E.prototype, "pan", function(a, g) {
            var h = this.xAxis[0], n = g.chartX, l = !1;
            if (h.options.ordinal && h.series.length) {
                var f = this.mouseDownX, b = h.getExtremes(), c = b.dataMax, m = b.min, e = b.max, r = this.hoverPoints, p = h.closestPointRange, f = (f - n) / (h.translationSlope * (h.ordinalSlope || p)), u = {
                    ordinalPositions: h.getExtendedPositions()
                }, p = h.lin2val, x = h.val2lin, t;
                u.ordinalPositions ? 1 < Math.abs(f) && (r && k(r, function(a) {
                    a.setState();
                }), 0 > f ? (r = u, t = h.ordinalPositions ? h : u) : (r = h.ordinalPositions ? h : u,
                    t = u), u = t.ordinalPositions, c > u[u.length - 1] && u.push(c), this.fixedRange = e - m,
                    f = h.toFixedRange(null, null, p.apply(r, [ x.apply(r, [ m, !0 ]) + f, !0 ]), p.apply(t, [ x.apply(t, [ e, !0 ]) + f, !0 ])),
                    f.min >= Math.min(b.dataMin, m) && f.max <= Math.max(c, e) && h.setExtremes(f.min, f.max, !0, !1, {
                    trigger: "pan"
                }), this.mouseDownX = n, H(this.container, {
                    cursor: "move"
                })) : l = !0;
            } else l = !0;
            l && a.apply(this, Array.prototype.slice.call(arguments, 1));
        });
        h.prototype.gappedPath = function() {
            var a = this.options.gapSize, g = this.points.slice(), h = g.length - 1;
            if (a && 0 < h) for (;h--; ) g[h + 1].x - g[h].x > this.closestPointRange * a && g.splice(h + 1, 0, {
                isNull: !0
            });
            return this.getGraphPath(g);
        };
    })(J);
    (function(a) {
        function C() {
            return Array.prototype.slice.call(arguments, 1);
        }
        function z(a) {
            a.apply(this);
            this.drawBreaks(this.xAxis, [ "x" ]);
            this.drawBreaks(this.yAxis, E(this.pointArrayMap, [ "y" ]));
        }
        var E = a.pick, H = a.wrap, v = a.each, n = a.extend, k = a.fireEvent, r = a.Axis, t = a.Series;
        n(r.prototype, {
            isInBreak: function(a, k) {
                var d = a.repeat || Infinity, g = a.from, q = a.to - a.from, d = k >= g ? (k - g) % d : d - (g - k) % d;
                return a.inclusive ? d <= q : d < q && 0 !== d;
            },
            isInAnyBreak: function(a, k) {
                var d = this.options.breaks, g = d && d.length, q, n, l;
                if (g) {
                    for (;g--; ) this.isInBreak(d[g], a) && (q = !0, n || (n = E(d[g].showPoints, this.isXAxis ? !1 : !0)));
                    l = q && k ? q && !n : q;
                }
                return l;
            }
        });
        H(r.prototype, "setTickPositions", function(a) {
            a.apply(this, Array.prototype.slice.call(arguments, 1));
            if (this.options.breaks) {
                var k = this.tickPositions, d = this.tickPositions.info, g = [], q;
                for (q = 0; q < k.length; q++) this.isInAnyBreak(k[q]) || g.push(k[q]);
                this.tickPositions = g;
                this.tickPositions.info = d;
            }
        });
        H(r.prototype, "init", function(a, n, d) {
            d.breaks && d.breaks.length && (d.ordinal = !1);
            a.call(this, n, d);
            if (this.options.breaks) {
                var g = this;
                g.isBroken = !0;
                this.val2lin = function(a) {
                    var d = a, h, f;
                    for (f = 0; f < g.breakArray.length; f++) if (h = g.breakArray[f], h.to <= a) d -= h.len; else if (h.from >= a) break; else if (g.isInBreak(h, a)) {
                        d -= a - h.from;
                        break;
                    }
                    return d;
                };
                this.lin2val = function(a) {
                    var d, h;
                    for (h = 0; h < g.breakArray.length && !(d = g.breakArray[h], d.from >= a); h++) d.to < a ? a += d.len : g.isInBreak(d, a) && (a += d.len);
                    return a;
                };
                this.setExtremes = function(a, d, g, f, b) {
                    for (;this.isInAnyBreak(a); ) a -= this.closestPointRange;
                    for (;this.isInAnyBreak(d); ) d -= this.closestPointRange;
                    r.prototype.setExtremes.call(this, a, d, g, f, b);
                };
                this.setAxisTranslation = function(a) {
                    r.prototype.setAxisTranslation.call(this, a);
                    var d = g.options.breaks;
                    a = [];
                    var h = [], f = 0, b, c, m = g.userMin || g.min, e = g.userMax || g.max, n, p;
                    for (p in d) c = d[p], b = c.repeat || Infinity, g.isInBreak(c, m) && (m += c.to % b - m % b),
                        g.isInBreak(c, e) && (e -= e % b - c.from % b);
                    for (p in d) {
                        c = d[p];
                        n = c.from;
                        for (b = c.repeat || Infinity; n - b > m; ) n -= b;
                        for (;n < m; ) n += b;
                        for (;n < e; n += b) a.push({
                            value: n,
                            move: "in"
                        }), a.push({
                            value: n + (c.to - c.from),
                            move: "out",
                            size: c.breakSize
                        });
                    }
                    a.sort(function(a, b) {
                        return a.value === b.value ? ("in" === a.move ? 0 : 1) - ("in" === b.move ? 0 : 1) : a.value - b.value;
                    });
                    d = 0;
                    n = m;
                    for (p in a) c = a[p], d += "in" === c.move ? 1 : -1, 1 === d && "in" === c.move && (n = c.value),
                        0 === d && (h.push({
                        from: n,
                        to: c.value,
                        len: c.value - n - (c.size || 0)
                    }), f += c.value - n - (c.size || 0));
                    g.breakArray = h;
                    k(g, "afterBreaks");
                    g.transA *= (e - g.min) / (e - m - f);
                    g.min = m;
                    g.max = e;
                };
            }
        });
        H(t.prototype, "generatePoints", function(a) {
            a.apply(this, C(arguments));
            var k = this.xAxis, d = this.yAxis, g = this.points, n, r = g.length, l = this.options.connectNulls, f;
            if (k && d && (k.options.breaks || d.options.breaks)) for (;r--; ) n = g[r], f = null === n.y && !1 === l,
                f || !k.isInAnyBreak(n.x, !0) && !d.isInAnyBreak(n.y, !0) || (g.splice(r, 1), this.data[r] && this.data[r].destroyElements());
        });
        a.Series.prototype.drawBreaks = function(a, n) {
            var d = this, g = d.points, q, r, l, f;
            v(n, function(b) {
                q = a.breakArray || [];
                r = a.isXAxis ? a.min : E(d.options.threshold, a.min);
                v(g, function(c) {
                    f = E(c["stack" + b.toUpperCase()], c[b]);
                    v(q, function(b) {
                        l = !1;
                        if (r < b.from && f > b.to || r > b.from && f < b.from) l = "pointBreak"; else if (r < b.from && f > b.from && f < b.to || r > b.from && f > b.to && f < b.from) l = "pointInBreak";
                        l && k(a, l, {
                            point: c,
                            brk: b
                        });
                    });
                });
            });
        };
        H(a.seriesTypes.column.prototype, "drawPoints", z);
        H(a.Series.prototype, "drawPoints", z);
    })(J);
    (function(a) {
        var C = a.arrayMax, z = a.arrayMin, E = a.Axis, H = a.defaultPlotOptions, v = a.defined, n = a.each, k = a.error, r = a.extend, t = a.format, h = a.isNumber, u = a.merge, d = a.pick, g = a.Point, q = a.Tooltip, w = a.wrap, l = a.Series.prototype, f = l.processData, b = l.generatePoints, c = l.destroy, m = {
            approximation: "average",
            groupPixelWidth: 2,
            dateTimeLabelFormats: {
                millisecond: [ "%A, %b %e, %H:%M:%S.%L", "%A, %b %e, %H:%M:%S.%L", "-%H:%M:%S.%L" ],
                second: [ "%A, %b %e, %H:%M:%S", "%A, %b %e, %H:%M:%S", "-%H:%M:%S" ],
                minute: [ "%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M" ],
                hour: [ "%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M" ],
                day: [ "%A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y" ],
                week: [ "Week from %A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y" ],
                month: [ "%B %Y", "%B", "-%B %Y" ],
                year: [ "%Y", "%Y", "-%Y" ]
            }
        }, e = {
            line: {},
            spline: {},
            area: {},
            areaspline: {},
            column: {
                approximation: "sum",
                groupPixelWidth: 10
            },
            arearange: {
                approximation: "range"
            },
            areasplinerange: {
                approximation: "range"
            },
            columnrange: {
                approximation: "range",
                groupPixelWidth: 10
            },
            candlestick: {
                approximation: "ohlc",
                groupPixelWidth: 10
            },
            ohlc: {
                approximation: "ohlc",
                groupPixelWidth: 5
            }
        }, D = a.defaultDataGroupingUnits = [ [ "millisecond", [ 1, 2, 5, 10, 20, 25, 50, 100, 200, 500 ] ], [ "second", [ 1, 2, 5, 10, 15, 30 ] ], [ "minute", [ 1, 2, 5, 10, 15, 30 ] ], [ "hour", [ 1, 2, 3, 4, 6, 8, 12 ] ], [ "day", [ 1 ] ], [ "week", [ 1 ] ], [ "month", [ 1, 3, 6 ] ], [ "year", null ] ], p = {
            sum: function(a) {
                var b = a.length, c;
                if (!b && a.hasNulls) c = null; else if (b) for (c = 0; b--; ) c += a[b];
                return c;
            },
            average: function(a) {
                var b = a.length;
                a = p.sum(a);
                h(a) && b && (a /= b);
                return a;
            },
            open: function(a) {
                return a.length ? a[0] : a.hasNulls ? null : void 0;
            },
            high: function(a) {
                return a.length ? C(a) : a.hasNulls ? null : void 0;
            },
            low: function(a) {
                return a.length ? z(a) : a.hasNulls ? null : void 0;
            },
            close: function(a) {
                return a.length ? a[a.length - 1] : a.hasNulls ? null : void 0;
            },
            ohlc: function(a, b, c, d) {
                a = p.open(a);
                b = p.high(b);
                c = p.low(c);
                d = p.close(d);
                if (h(a) || h(b) || h(c) || h(d)) return [ a, b, c, d ];
            },
            range: function(a, b) {
                a = p.low(a);
                b = p.high(b);
                if (h(a) || h(b)) return [ a, b ];
            }
        };
        l.groupData = function(a, b, c, d) {
            var e = this.data, f = this.options.data, g = [], m = [], k = [], l = a.length, n, q, r = !!b, t = [ [], [], [], [] ];
            d = "function" === typeof d ? d : p[d];
            var u = this.pointArrayMap, v = u && u.length, w, z = 0;
            for (w = q = 0; w <= l && !(a[w] >= c[0]); w++) ;
            for (w; w <= l; w++) {
                for (;(void 0 !== c[z + 1] && a[w] >= c[z + 1] || w === l) && (n = c[z], this.dataGroupInfo = {
                    start: q,
                    length: t[0].length
                }, q = d.apply(this, t), void 0 !== q && (g.push(n), m.push(q), k.push(this.dataGroupInfo)),
                    q = w, t[0] = [], t[1] = [], t[2] = [], t[3] = [], z += 1, w !== l); ) ;
                if (w === l) break;
                if (u) {
                    n = this.cropStart + w;
                    n = e && e[n] || this.pointClass.prototype.applyOptions.apply({
                        series: this
                    }, [ f[n] ]);
                    var D, C;
                    for (D = 0; D < v; D++) C = n[u[D]], h(C) ? t[D].push(C) : null === C && (t[D].hasNulls = !0);
                } else n = r ? b[w] : null, h(n) ? t[0].push(n) : null === n && (t[0].hasNulls = !0);
            }
            return [ g, m, k ];
        };
        l.processData = function() {
            var a = this.chart, b = this.options.dataGrouping, c = !1 !== this.allowDG && b && d(b.enabled, a.options._stock), e;
            this.forceCrop = c;
            this.groupPixelWidth = null;
            this.hasProcessed = !0;
            if (!1 !== f.apply(this, arguments) && c && this.visible) {
                this.destroyGroupedData();
                var g = this.processedXData, h = this.processedYData, m = a.plotSizeX, a = this.xAxis, k = a.options.ordinal, p = this.groupPixelWidth = a.getGroupPixelWidth && a.getGroupPixelWidth();
                if (p) {
                    this.isDirty = e = !0;
                    var n = a.getExtremes(), c = n.min, n = n.max, k = k && a.getGroupIntervalFactor(c, n, this) || 1, m = p * (n - c) / m * k, p = a.getTimeTicks(a.normalizeTimeTickInterval(m, b.units || D), Math.min(c, g[0]), Math.max(n, g[g.length - 1]), a.options.startOfWeek, g, this.closestPointRange), g = l.groupData.apply(this, [ g, h, p, b.approximation ]), h = g[0], k = g[1];
                    if (b.smoothed) {
                        b = h.length - 1;
                        for (h[b] = Math.min(h[b], n); b-- && 0 < b; ) h[b] += m / 2;
                        h[0] = Math.max(h[0], c);
                    }
                    this.currentDataGrouping = p.info;
                    this.closestPointRange = p.info.totalRange;
                    this.groupMap = g[2];
                    v(h[0]) && h[0] < a.dataMin && (a.min === a.dataMin && (a.min = h[0]), a.dataMin = h[0]);
                    this.processedXData = h;
                    this.processedYData = k;
                } else this.currentDataGrouping = this.groupMap = null;
                this.hasGroupedData = e;
            }
        };
        l.destroyGroupedData = function() {
            var a = this.groupedData;
            n(a || [], function(b, c) {
                b && (a[c] = b.destroy ? b.destroy() : null);
            });
            this.groupedData = null;
        };
        l.generatePoints = function() {
            b.apply(this);
            this.destroyGroupedData();
            this.groupedData = this.hasGroupedData ? this.points : null;
        };
        w(g.prototype, "update", function(a) {
            this.dataGroup ? k(24) : a.apply(this, [].slice.call(arguments, 1));
        });
        w(q.prototype, "tooltipFooterHeaderFormatter", function(b, c, d) {
            var e = c.series, f = e.tooltipOptions, g = e.options.dataGrouping, m = f.xDateFormat, k, p = e.xAxis, l = a.dateFormat;
            return p && "datetime" === p.options.type && g && h(c.key) ? (b = e.currentDataGrouping,
                g = g.dateTimeLabelFormats, b ? (p = g[b.unitName], 1 === b.count ? m = p[0] : (m = p[1],
                k = p[2])) : !m && g && (m = this.getXDateFormat(c, f, p)), m = l(m, c.key), k && (m += l(k, c.key + b.totalRange - 1)),
                t(f[(d ? "footer" : "header") + "Format"], {
                    point: r(c.point, {
                        key: m
                    }),
                    series: e
                })) : b.call(this, c, d);
        });
        l.destroy = function() {
            for (var a = this.groupedData || [], b = a.length; b--; ) a[b] && a[b].destroy();
            c.apply(this);
        };
        w(l, "setOptions", function(a, b) {
            var c = a.call(this, b), d = this.type, f = this.chart.options.plotOptions, g = H[d].dataGrouping;
            e[d] && (g || (g = u(m, e[d])), c.dataGrouping = u(g, f.series && f.series.dataGrouping, f[d].dataGrouping, b.dataGrouping));
            this.chart.options._stock && (this.requireSorting = !0);
            return c;
        });
        w(E.prototype, "setScale", function(a) {
            a.call(this);
            n(this.series, function(a) {
                a.hasProcessed = !1;
            });
        });
        E.prototype.getGroupPixelWidth = function() {
            var a = this.series, b = a.length, c, d = 0, e = !1, f;
            for (c = b; c--; ) (f = a[c].options.dataGrouping) && (d = Math.max(d, f.groupPixelWidth));
            for (c = b; c--; ) (f = a[c].options.dataGrouping) && a[c].hasProcessed && (b = (a[c].processedXData || a[c].data).length,
                a[c].groupPixelWidth || b > this.chart.plotSizeX / d || b && f.forced) && (e = !0);
            return e ? d : 0;
        };
        E.prototype.setDataGrouping = function(a, b) {
            var c;
            b = d(b, !0);
            a || (a = {
                forced: !1,
                units: null
            });
            if (this instanceof E) for (c = this.series.length; c--; ) this.series[c].update({
                dataGrouping: a
            }, !1); else n(this.chart.options.series, function(b) {
                b.dataGrouping = a;
            }, !1);
            b && this.chart.redraw();
        };
    })(J);
    (function(a) {
        var C = a.each, z = a.Point, E = a.seriesType, H = a.seriesTypes;
        E("ohlc", "column", {
            lineWidth: 1,
            tooltip: {
                pointFormat: '<br/>开盘: {point.open}<br/>高: {point.high}<br/>低: {point.low}<br/>收盘: {point.close}<br/>'
            },
            threshold: null,
            states: {
                hover: {
                    lineWidth: 3
                }
            }
        }, {
            pointArrayMap: [ "open", "high", "low", "close" ],
            toYData: function(a) {
                return [ a.open, a.high, a.low, a.close ];
            },
            pointValKey: "high",
            pointAttribs: function(a, n) {
                var k = H.column.prototype.pointAttribs.call(this, a, n), r = this.options;
                delete k.fill;
                k["stroke-width"] = r.lineWidth;
                k.stroke = a.options.color || (a.open < a.close ? r.upColor || this.color : this.color);
                return k;
            },
            translate: function() {
                var a = this, n = a.yAxis, k = !!a.modifyValue, r = [ "plotOpen", "yBottom", "plotClose" ];
                H.column.prototype.translate.apply(a);
                C(a.points, function(t) {
                    C([ t.open, t.low, t.close ], function(h, u) {
                        null !== h && (k && (h = a.modifyValue(h)), t[r[u]] = n.toPixels(h, !0));
                    });
                });
            },
            drawPoints: function() {
                var a = this, n = a.chart;
                C(a.points, function(k) {
                    var r, t, h, u, d = k.graphic, g, q = !d;
                    void 0 !== k.plotY && (d || (k.graphic = d = n.renderer.path().add(a.group)), d.attr(a.pointAttribs(k, k.selected && "select")),
                        t = d.strokeWidth() % 2 / 2, g = Math.round(k.plotX) - t, h = Math.round(k.shapeArgs.width / 2),
                        u = [ "M", g, Math.round(k.yBottom), "L", g, Math.round(k.plotY) ], null !== k.open && (r = Math.round(k.plotOpen) + t,
                        u.push("M", g, r, "L", g - h, r)), null !== k.close && (r = Math.round(k.plotClose) + t,
                        u.push("M", g, r, "L", g + h, r)), d[q ? "attr" : "animate"]({
                        d: u
                    }).addClass(k.getClassName(), !0));
                });
            },
            animate: null
        }, {
            getClassName: function() {
                return z.prototype.getClassName.call(this) + (this.open < this.close ? " highcharts-point-up" : " highcharts-point-down");
            }
        });
    })(J);
    (function(a) {
        var C = a.defaultPlotOptions, z = a.each, E = a.merge, H = a.seriesType, v = a.seriesTypes;
        H("candlestick", "ohlc", E(C.column, {
            states: {
                hover: {
                    lineWidth: 2
                }
            },
            tooltip: C.ohlc.tooltip,
            threshold: null,
            lineColor: "#000000",
            lineWidth: 1,
            upColor: "#f91150"
        }), {
            pointAttribs: function(a, k) {
                var r = v.column.prototype.pointAttribs.call(this, a, k), t = this.options, h = a.open < a.close, u = t.lineColor || this.color;
                r["stroke-width"] = t.lineWidth;
                r.fill = a.options.color || (h ? t.upColor || this.color : this.color);
                r.stroke = a.lineColor || (h ? t.upLineColor || u : u);
                k && (t = t.states[k], r.fill = t.color || r.fill, r.stroke = t.stroke || r.stroke);
                return r;
            },
            drawPoints: function() {
                var a = this, k = a.chart;
                z(a.points, function(r) {
                    var t = r.graphic, h, u, d, g, q, w, l, f = !t;
                    void 0 !== r.plotY && (t || (r.graphic = t = k.renderer.path().add(a.group)), t.attr(a.pointAttribs(r, r.selected && "select")).shadow(a.options.shadow),
                        q = t.strokeWidth() % 2 / 2, w = Math.round(r.plotX) - q, h = r.plotOpen, u = r.plotClose,
                        d = Math.min(h, u), h = Math.max(h, u), l = Math.round(r.shapeArgs.width / 2), u = Math.round(d) !== Math.round(r.plotY),
                        g = h !== r.yBottom, d = Math.round(d) + q, h = Math.round(h) + q, q = [], q.push("M", w - l, h, "L", w - l, d, "L", w + l, d, "L", w + l, h, "Z", "M", w, d, "L", w, u ? Math.round(r.plotY) : d, "M", w, h, "L", w, g ? Math.round(r.yBottom) : h),
                        t[f ? "attr" : "animate"]({
                            d: q
                        }).addClass(r.getClassName(), !0));
                });
            }
        });
    })(J);
    (function(a) {
        var C = a.addEvent, z = a.each, E = a.merge, H = a.noop, v = a.Renderer, n = a.seriesType, k = a.seriesTypes, r = a.TrackerMixin, t = a.VMLRenderer, h = a.SVGRenderer.prototype.symbols;
        n("flags", "column", {
            pointRange: 0,
            shape: "flag",
            stackDistance: 12,
            textAlign: "center",
            tooltip: {
                pointFormat: "{point.text}<br/>"
            },
            threshold: null,
            y: -30,
            fillColor: "#ffffff",
            lineWidth: 1,
            states: {
                hover: {
                    lineColor: "#000000",
                    fillColor: "#ccd6eb"
                }
            },
            style: {
                fontSize: "11px",
                fontWeight: "bold"
            }
        }, {
            sorted: !1,
            noSharedTooltip: !0,
            allowDG: !1,
            takeOrdinalPosition: !1,
            trackerGroups: [ "markerGroup" ],
            forceCrop: !0,
            init: a.Series.prototype.init,
            pointAttribs: function(a, d) {
                var g = this.options, h = a && a.color || this.color, k = g.fillColor;
                d && (k = g.states[d].fillColor);
                return {
                    fill: k || h,
                    stroke: g.lineColor || h,
                    "stroke-width": a && a.lineWidth || g.lineWidth || 0
                };
            },
            translate: function() {
                k.column.prototype.translate.apply(this);
                var a = this.options, d = this.chart, g = this.points, h = g.length - 1, n, l, f = a.onSeries;
                n = f && d.get(f);
                var a = a.onKey || "y", f = n && n.options.step, b = n && n.points, c = b && b.length, m = this.xAxis, e = m.getExtremes(), r = 0, p, t, x;
                if (n && n.visible && c) for (r = (n.pointXOffset || 0) + (n.barW || 0) / 2, n = n.currentDataGrouping,
                                                  t = b[c - 1].x + (n ? n.totalRange : 0), g.sort(function(a, b) {
                    return a.x - b.x;
                }), a = "plot" + a[0].toUpperCase() + a.substr(1); c-- && g[h] && !(n = g[h], p = b[c],
                    p.x <= n.x && void 0 !== p[a] && (n.x <= t && (n.plotY = p[a], p.x < n.x && !f && (x = b[c + 1]) && void 0 !== x[a] && (n.plotY += (n.x - p.x) / (x.x - p.x) * (x[a] - p[a]))),
                    h--, c++, 0 > h)); ) ;
                z(g, function(a, b) {
                    var c;
                    void 0 === a.plotY && (a.x >= e.min && a.x <= e.max ? a.plotY = d.chartHeight - m.bottom - (m.opposite ? m.height : 0) + m.offset - d.plotTop : a.shapeArgs = {});
                    a.plotX += r;
                    (l = g[b - 1]) && l.plotX === a.plotX && (void 0 === l.stackIndex && (l.stackIndex = 0),
                        c = l.stackIndex + 1);
                    a.stackIndex = c;
                });
            },
            drawPoints: function() {
                var a = this.points, d = this.chart, g = d.renderer, h, k, l = this.options, f = l.y, b, c, m, e, n, p, r, t = this.yAxis;
                for (c = a.length; c--; ) m = a[c], r = m.plotX > this.xAxis.len, h = m.plotX, e = m.stackIndex,
                    b = m.options.shape || l.shape, k = m.plotY, void 0 !== k && (k = m.plotY + f - (void 0 !== e && e * l.stackDistance)),
                    n = e ? void 0 : m.plotX, p = e ? void 0 : m.plotY, e = m.graphic, void 0 !== k && 0 <= h && !r ? (e || (e = m.graphic = g.label("", null, null, b, null, null, l.useHTML).attr(this.pointAttribs(m)).css(E(l.style, m.style)).attr({
                    align: "flag" === b ? "left" : "center",
                    width: l.width,
                    height: l.height,
                    "text-align": l.textAlign
                }).addClass("highcharts-point").add(this.markerGroup), e.shadow(l.shadow)), 0 < h && (h -= e.strokeWidth() % 2),
                    e.attr({
                        text: m.options.title || l.title || "A",
                        x: h,
                        y: k,
                        anchorX: n,
                        anchorY: p
                    }), m.tooltipPos = d.inverted ? [ t.len + t.pos - d.plotLeft - k, this.xAxis.len - h ] : [ h, k ]) : e && (m.graphic = e.destroy());
            },
            drawTracker: function() {
                var a = this.points;
                r.drawTrackerPoint.apply(this);
                z(a, function(d) {
                    var g = d.graphic;
                    g && C(g.element, "mouseover", function() {
                        0 < d.stackIndex && !d.raised && (d._y = g.y, g.attr({
                            y: d._y - 8
                        }), d.raised = !0);
                        z(a, function(a) {
                            a !== d && a.raised && a.graphic && (a.graphic.attr({
                                y: a._y
                            }), a.raised = !1);
                        });
                    });
                });
            },
            animate: H,
            buildKDTree: H,
            setClip: H
        });
        h.flag = function(a, d, g, h, k) {
            return [ "M", k && k.anchorX || a, k && k.anchorY || d, "L", a, d + h, a, d, a + g, d, a + g, d + h, a, d + h, "Z" ];
        };
        z([ "circle", "square" ], function(a) {
            h[a + "pin"] = function(d, g, k, n, l) {
                var f = l && l.anchorX;
                l = l && l.anchorY;
                "circle" === a && n > k && (d -= Math.round((n - k) / 2), k = n);
                d = h[a](d, g, k, n);
                f && l && d.push("M", f, g > l ? g : g + n, "L", f, l);
                return d;
            };
        });
        v === t && z([ "flag", "circlepin", "squarepin" ], function(a) {
            t.prototype.symbols[a] = h[a];
        });
    })(J);
    (function(a) {
        function C(a, c, d) {
            this.init(a, c, d);
        }
        var z = a.addEvent, E = a.Axis, H = a.correctFloat, v = a.defaultOptions, n = a.defined, k = a.destroyObjectProperties, r = a.doc, t = a.each, h = a.fireEvent, u = a.hasTouch, d = a.isTouchDevice, g = a.merge, q = a.pick, w = a.removeEvent, l = a.wrap, f = {
            height: d ? 20 : 14,
            barBorderRadius: 0,
            buttonBorderRadius: 0,
            liveRedraw: a.svg && !d,
            margin: 10,
            minWidth: 6,
            step: .2,
            zIndex: 3,
            barBackgroundColor: "#cccccc",
            barBorderWidth: 1,
            barBorderColor: "#cccccc",
            buttonArrowColor: "#333333",
            buttonBackgroundColor: "#e6e6e6",
            buttonBorderColor: "#cccccc",
            buttonBorderWidth: 1,
            rifleColor: "#333333",
            trackBackgroundColor: "#f2f2f2",
            trackBorderColor: "#f2f2f2",
            trackBorderWidth: 1
        };
        v.scrollbar = g(!0, f, v.scrollbar);
        C.prototype = {
            init: function(a, c, d) {
                this.scrollbarButtons = [];
                this.renderer = a;
                this.userOptions = c;
                this.options = g(f, c);
                this.chart = d;
                this.size = q(this.options.size, this.options.height);
                c.enabled && (this.render(), this.initEvents(), this.addEvents());
            },
            render: function() {
                var a = this.renderer, c = this.options, d = this.size, e;
                this.group = e = a.g("scrollbar").attr({
                    zIndex: c.zIndex,
                    translateY: -99999
                }).add();
                this.track = a.rect().addClass("highcharts-scrollbar-track").attr({
                    x: 0,
                    r: c.trackBorderRadius || 0,
                    height: d,
                    width: d
                }).add(e);
                this.track.attr({
                    fill: c.trackBackgroundColor,
                    stroke: c.trackBorderColor,
                    "stroke-width": c.trackBorderWidth
                });
                this.trackBorderWidth = this.track.strokeWidth();
                this.track.attr({
                    y: -this.trackBorderWidth % 2 / 2
                });
                this.scrollbarGroup = a.g().add(e);
                this.scrollbar = a.rect().addClass("highcharts-scrollbar-thumb").attr({
                    height: d,
                    width: d,
                    r: c.barBorderRadius || 0
                }).add(this.scrollbarGroup);
                this.scrollbarRifles = a.path(this.swapXY([ "M", -3, d / 4, "L", -3, 2 * d / 3, "M", 0, d / 4, "L", 0, 2 * d / 3, "M", 3, d / 4, "L", 3, 2 * d / 3 ], c.vertical)).addClass("highcharts-scrollbar-rifles").add(this.scrollbarGroup);
                this.scrollbar.attr({
                    fill: c.barBackgroundColor,
                    stroke: c.barBorderColor,
                    "stroke-width": c.barBorderWidth
                });
                this.scrollbarRifles.attr({
                    stroke: c.rifleColor,
                    "stroke-width": 1
                });
                this.scrollbarStrokeWidth = this.scrollbar.strokeWidth();
                this.scrollbarGroup.translate(-this.scrollbarStrokeWidth % 2 / 2, -this.scrollbarStrokeWidth % 2 / 2);
                this.drawScrollbarButton(0);
                this.drawScrollbarButton(1);
            },
            position: function(a, c, d, e) {
                var f = this.options.vertical, g = 0, h = this.rendered ? "animate" : "attr";
                this.x = a;
                this.y = c + this.trackBorderWidth;
                this.width = d;
                this.xOffset = this.height = e;
                this.yOffset = g;
                f ? (this.width = this.yOffset = d = g = this.size, this.xOffset = c = 0, this.barWidth = e - 2 * d,
                    this.x = a += this.options.margin) : (this.height = this.xOffset = e = c = this.size,
                    this.barWidth = d - 2 * e, this.y += this.options.margin);
                this.group[h]({
                    translateX: a,
                    translateY: this.y
                });
                this.track[h]({
                    width: d,
                    height: e
                });
                this.scrollbarButtons[1].attr({
                    translateX: f ? 0 : d - c,
                    translateY: f ? e - g : 0
                });
            },
            drawScrollbarButton: function(a) {
                var c = this.renderer, d = this.scrollbarButtons, e = this.options, f = this.size, g;
                g = c.g().add(this.group);
                d.push(g);
                g = c.rect().addClass("highcharts-scrollbar-button").add(g);
                g.attr({
                    stroke: e.buttonBorderColor,
                    "stroke-width": e.buttonBorderWidth,
                    fill: e.buttonBackgroundColor
                });
                g.attr(g.crisp({
                    x: -.5,
                    y: -.5,
                    width: f + 1,
                    height: f + 1,
                    r: e.buttonBorderRadius
                }, g.strokeWidth()));
                g = c.path(this.swapXY([ "M", f / 2 + (a ? -1 : 1), f / 2 - 3, "L", f / 2 + (a ? -1 : 1), f / 2 + 3, "L", f / 2 + (a ? 2 : -2), f / 2 ], e.vertical)).addClass("highcharts-scrollbar-arrow").add(d[a]);
                g.attr({
                    fill: e.buttonArrowColor
                });
            },
            swapXY: function(a, c) {
                var d, e = a.length, f;
                if (c) for (d = 0; d < e; d += 3) f = a[d + 1], a[d + 1] = a[d + 2], a[d + 2] = f;
                return a;
            },
            setRange: function(a, c) {
                var d = this.options, e = d.vertical, f = d.minWidth, g = this.barWidth, h, k, l = this.rendered && !this.hasDragged ? "animate" : "attr";
                n(g) && (a = Math.max(a, 0), h = g * a, k = g * Math.min(c, 1), this.calculatedWidth = k = H(k - h),
                    k < f && (h = (g - f + k) * a, k = f), f = Math.floor(h + this.xOffset + this.yOffset),
                    g = k / 2 - .5, this.from = a, this.to = c, e ? (this.scrollbarGroup[l]({
                    translateY: f
                }), this.scrollbar[l]({
                    height: k
                }), this.scrollbarRifles[l]({
                    translateY: g
                }), this.scrollbarTop = f, this.scrollbarLeft = 0) : (this.scrollbarGroup[l]({
                    translateX: f
                }), this.scrollbar[l]({
                    width: k
                }), this.scrollbarRifles[l]({
                    translateX: g
                }), this.scrollbarLeft = f, this.scrollbarTop = 0), 12 >= k ? this.scrollbarRifles.hide() : this.scrollbarRifles.show(!0),
                    !1 === d.showFull && (0 >= a && 1 <= c ? this.group.hide() : this.group.show()),
                    this.rendered = !0);
            },
            initEvents: function() {
                var a = this;
                a.mouseMoveHandler = function(c) {
                    var d = a.chart.pointer.normalize(c), e = a.options.vertical ? "chartY" : "chartX", f = a.initPositions;
                    !a.grabbedCenter || c.touches && 0 === c.touches[0][e] || (d = a.cursorToScrollbarPosition(d)[e],
                        e = a[e], e = d - e, a.hasDragged = !0, a.updatePosition(f[0] + e, f[1] + e), a.hasDragged && h(a, "changed", {
                        from: a.from,
                        to: a.to,
                        trigger: "scrollbar",
                        DOMType: c.type,
                        DOMEvent: c
                    }));
                };
                a.mouseUpHandler = function(c) {
                    a.hasDragged && h(a, "changed", {
                        from: a.from,
                        to: a.to,
                        trigger: "scrollbar",
                        DOMType: c.type,
                        DOMEvent: c
                    });
                    a.grabbedCenter = a.hasDragged = a.chartX = a.chartY = null;
                };
                a.mouseDownHandler = function(c) {
                    c = a.chart.pointer.normalize(c);
                    c = a.cursorToScrollbarPosition(c);
                    a.chartX = c.chartX;
                    a.chartY = c.chartY;
                    a.initPositions = [ a.from, a.to ];
                    a.grabbedCenter = !0;
                };
                a.buttonToMinClick = function(c) {
                    var d = H(a.to - a.from) * a.options.step;
                    a.updatePosition(H(a.from - d), H(a.to - d));
                    h(a, "changed", {
                        from: a.from,
                        to: a.to,
                        trigger: "scrollbar",
                        DOMEvent: c
                    });
                };
                a.buttonToMaxClick = function(c) {
                    var d = (a.to - a.from) * a.options.step;
                    a.updatePosition(a.from + d, a.to + d);
                    h(a, "changed", {
                        from: a.from,
                        to: a.to,
                        trigger: "scrollbar",
                        DOMEvent: c
                    });
                };
                a.trackClick = function(c) {
                    var d = a.chart.pointer.normalize(c), e = a.to - a.from, f = a.y + a.scrollbarTop, g = a.x + a.scrollbarLeft;
                    a.options.vertical && d.chartY > f || !a.options.vertical && d.chartX > g ? a.updatePosition(a.from + e, a.to + e) : a.updatePosition(a.from - e, a.to - e);
                    h(a, "changed", {
                        from: a.from,
                        to: a.to,
                        trigger: "scrollbar",
                        DOMEvent: c
                    });
                };
            },
            cursorToScrollbarPosition: function(a) {
                var c = this.options, c = c.minWidth > this.calculatedWidth ? c.minWidth : 0;
                return {
                    chartX: (a.chartX - this.x - this.xOffset) / (this.barWidth - c),
                    chartY: (a.chartY - this.y - this.yOffset) / (this.barWidth - c)
                };
            },
            updatePosition: function(a, c) {
                1 < c && (a = H(1 - H(c - a)), c = 1);
                0 > a && (c = H(c - a), a = 0);
                this.from = a;
                this.to = c;
            },
            update: function(a) {
                this.destroy();
                this.init(this.chart.renderer, g(!0, this.options, a), this.chart);
            },
            addEvents: function() {
                var a = this.options.inverted ? [ 1, 0 ] : [ 0, 1 ], c = this.scrollbarButtons, d = this.scrollbarGroup.element, e = this.mouseDownHandler, f = this.mouseMoveHandler, g = this.mouseUpHandler, a = [ [ c[a[0]].element, "click", this.buttonToMinClick ], [ c[a[1]].element, "click", this.buttonToMaxClick ], [ this.track.element, "click", this.trackClick ], [ d, "mousedown", e ], [ r, "mousemove", f ], [ r, "mouseup", g ] ];
                u && a.push([ d, "touchstart", e ], [ r, "touchmove", f ], [ r, "touchend", g ]);
                t(a, function(a) {
                    z.apply(null, a);
                });
                this._events = a;
            },
            removeEvents: function() {
                t(this._events, function(a) {
                    w.apply(null, a);
                });
                this._events = void 0;
            },
            destroy: function() {
                var a = this.chart.scroller;
                this.removeEvents();
                t([ "track", "scrollbarRifles", "scrollbar", "scrollbarGroup", "group" ], function(a) {
                    this[a] && this[a].destroy && (this[a] = this[a].destroy());
                }, this);
                a && (a.scrollbar = null, k(a.scrollbarButtons));
            }
        };
        l(E.prototype, "init", function(a) {
            var c = this;
            a.apply(c, [].slice.call(arguments, 1));
            c.options.scrollbar && c.options.scrollbar.enabled && (c.options.scrollbar.vertical = !c.horiz,
                c.options.startOnTick = c.options.endOnTick = !1, c.scrollbar = new C(c.chart.renderer, c.options.scrollbar, c.chart),
                z(c.scrollbar, "changed", function(a) {
                    var b = Math.min(q(c.options.min, c.min), c.min, c.dataMin), d = Math.max(q(c.options.max, c.max), c.max, c.dataMax) - b, f;
                    c.horiz && !c.reversed || !c.horiz && c.reversed ? (f = b + d * this.to, b += d * this.from) : (f = b + d * (1 - this.from),
                        b += d * (1 - this.to));
                    c.setExtremes(b, f, !0, !1, a);
                }));
        });
        l(E.prototype, "render", function(a) {
            var c = Math.min(q(this.options.min, this.min), this.min, this.dataMin), d = Math.max(q(this.options.max, this.max), this.max, this.dataMax), e = this.scrollbar, f;
            a.apply(this, [].slice.call(arguments, 1));
            e && (this.horiz ? e.position(this.left, this.top + this.height + this.offset + 2 + (this.opposite ? 0 : this.axisTitleMargin), this.width, this.height) : e.position(this.left + this.width + 2 + this.offset + (this.opposite ? this.axisTitleMargin : 0), this.top, this.width, this.height),
                    isNaN(c) || isNaN(d) || !n(this.min) || !n(this.max) ? e.setRange(0, 0) : (f = (this.min - c) / (d - c),
                c = (this.max - c) / (d - c), this.horiz && !this.reversed || !this.horiz && this.reversed ? e.setRange(f, c) : e.setRange(1 - c, 1 - f)));
        });
        l(E.prototype, "getOffset", function(a) {
            var c = this.horiz ? 2 : 1, d = this.scrollbar;
            a.apply(this, [].slice.call(arguments, 1));
            d && (this.chart.axisOffset[c] += d.size + d.options.margin);
        });
        l(E.prototype, "destroy", function(a) {
            this.scrollbar && (this.scrollbar = this.scrollbar.destroy());
            a.apply(this, [].slice.call(arguments, 1));
        });
        a.Scrollbar = C;
    })(J);
    (function(a) {
        function C(a) {
            this.init(a);
        }
        var z = a.addEvent, E = a.Axis, H = a.Chart, v = a.color, n = a.defaultOptions, k = a.defined, r = a.destroyObjectProperties, t = a.doc, h = a.each, u = a.erase, d = a.error, g = a.extend, q = a.grep, w = a.hasTouch, l = a.isNumber, f = a.isObject, b = a.isTouchDevice, c = a.merge, m = a.pick, e = a.removeEvent, D = a.Scrollbar, p = a.Series, B = a.seriesTypes, x = a.wrap, L = [].concat(a.defaultDataGroupingUnits), G = function(a) {
            var b = q(arguments, l);
            if (b.length) return Math[a].apply(0, b);
        };
        L[4] = [ "day", [ 1, 2, 3, 4 ] ];
        L[5] = [ "week", [ 1, 2, 3 ] ];
        B = void 0 === B.areaspline ? "line" : "areaspline";
        g(n, {
            navigator: {
                height: 40,
                margin: 25,
                maskInside: !0,
                handles: {
                    backgroundColor: "#f2f2f2",
                    borderColor: "#999999"
                },
                maskFill: v("#6685c2").setOpacity(.3).get(),
                outlineColor: "#cccccc",
                outlineWidth: 1,
                series: {
                    type: B,
                    color: "#335cad",
                    fillOpacity: .05,
                    lineWidth: 1,
                    compare: null,
                    dataGrouping: {
                        approximation: "average",
                        enabled: !0,
                        groupPixelWidth: 2,
                        smoothed: !0,
                        units: L
                    },
                    dataLabels: {
                        enabled: !1,
                        zIndex: 2
                    },
                    id: "highcharts-navigator-series",
                    className: "highcharts-navigator-series",
                    lineColor: null,
                    marker: {
                        enabled: !1
                    },
                    pointRange: 0,
                    shadow: !1,
                    threshold: null
                },
                xAxis: {
                    className: "highcharts-navigator-xaxis",
                    tickLength: 0,
                    lineWidth: 0,
                    gridLineColor: "#e6e6e6",
                    gridLineWidth: 1,
                    tickPixelInterval: 200,
                    labels: {
                        align: "left",
                        style: {
                            color: "#999999"
                        },
                        x: 3,
                        y: -4
                    },
                    crosshair: !1
                },
                yAxis: {
                    className: "highcharts-navigator-yaxis",
                    gridLineWidth: 0,
                    startOnTick: !1,
                    endOnTick: !1,
                    minPadding: .1,
                    maxPadding: .1,
                    labels: {
                        enabled: !1
                    },
                    crosshair: !1,
                    title: {
                        text: null
                    },
                    tickLength: 0,
                    tickWidth: 0
                }
            }
        });
        C.prototype = {
            drawHandle: function(a, b) {
                var c = this.chart.renderer, d = this.handles;
                this.rendered || (d[b] = c.path([ "M", -4.5, .5, "L", 3.5, .5, 3.5, 15.5, -4.5, 15.5, -4.5, .5, "M", -1.5, 4, "L", -1.5, 12, "M", .5, 4, "L", .5, 12 ]).attr({
                    zIndex: 10 - b
                }).addClass("highcharts-navigator-handle highcharts-navigator-handle-" + [ "left", "right" ][b]).add(),
                    c = this.navigatorOptions.handles, d[b].attr({
                    fill: c.backgroundColor,
                    stroke: c.borderColor,
                    "stroke-width": 1
                }).css({
                    cursor: "ew-resize"
                }));
                d[b][this.rendered && !this.hasDragged ? "animate" : "attr"]({
                    translateX: this.scrollerLeft + this.scrollbarHeight + parseInt(a, 10),
                    translateY: this.top + this.height / 2 - 8
                });
            },
            update: function(a) {
                this.destroy();
                c(!0, this.chart.options.navigator, this.options, a);
                this.init(this.chart);
            },
            render: function(a, b, c, d) {
                var e = this.chart, f = e.renderer, g, h, p, n;
                n = this.scrollbarHeight;
                var q = this.xAxis, r = this.navigatorOptions, t = r.maskInside, u = this.height, x = this.top, v = this.navigatorEnabled, w = this.outlineHeight, B;
                B = this.rendered;
                if (l(a) && l(b) && (!this.hasDragged || k(c)) && (this.navigatorLeft = g = m(q.left, e.plotLeft + n),
                    this.navigatorWidth = h = m(q.len, e.plotWidth - 2 * n), this.scrollerLeft = p = g - n,
                    this.scrollerWidth = n = n = h + 2 * n, c = m(c, q.translate(a)), d = m(d, q.translate(b)),
                    l(c) && Infinity !== Math.abs(c) || (c = 0, d = n), !(q.translate(d, !0) - q.translate(c, !0) < e.xAxis[0].minRange))) {
                    this.zoomedMax = Math.min(Math.max(c, d, 0), h);
                    this.zoomedMin = Math.min(Math.max(this.fixedWidth ? this.zoomedMax - this.fixedWidth : Math.min(c, d), 0), h);
                    this.range = this.zoomedMax - this.zoomedMin;
                    b = Math.round(this.zoomedMax);
                    a = Math.round(this.zoomedMin);
                    !B && v && (this.navigatorGroup = c = f.g("navigator").attr({
                        zIndex: 3
                    }).add(), this.leftShade = f.rect().addClass("highcharts-navigator-mask" + (t ? "-inside" : "")).attr({
                        fill: r.maskFill
                    }).css(t && {
                        cursor: "ew-resize"
                    }).add(c), t || (this.rightShade = f.rect().addClass("highcharts-navigator-mask").attr({
                        fill: r.maskFill
                    }).add(c)), this.outline = f.path().addClass("highcharts-navigator-outline").attr({
                        "stroke-width": r.outlineWidth,
                        stroke: r.outlineColor
                    }).add(c));
                    if (v) {
                        f = B && !this.hasDragged ? "animate" : "attr";
                        t = this.outline.strokeWidth();
                        t /= 2;
                        B = x + t;
                        this.leftShade[f](r.maskInside ? {
                            x: g + a,
                            y: x,
                            width: b - a,
                            height: u
                        } : {
                            x: g,
                            y: x,
                            width: a,
                            height: u
                        });
                        if (this.rightShade) this.rightShade[f]({
                            x: g + b,
                            y: x,
                            width: h - b,
                            height: u
                        });
                        this.outline[f]({
                            d: [ "M", p, B, "L", g + a - t, B, g + a - t, B + w, "L", g + b - t, B + w, "L", g + b - t, B, p + n, B ].concat(r.maskInside ? [ "M", g + a + t, B, "L", g + b - t, B ] : [])
                        });
                        this.drawHandle(a + t, 0);
                        this.drawHandle(b + t, 1);
                    }
                    this.scrollbar && (this.scrollbar.hasDragged = this.hasDragged, this.scrollbar.position(this.scrollerLeft, this.top + (v ? this.height : -this.scrollbarHeight), this.scrollerWidth, this.scrollbarHeight),
                        this.scrollbar.setRange(a / h, b / h));
                    this.rendered = !0;
                }
            },
            addEvents: function() {
                var a = this.chart, b = a.container, c = this.mouseDownHandler, d = this.mouseMoveHandler, e = this.mouseUpHandler, f;
                f = [ [ b, "mousedown", c ], [ b, "mousemove", d ], [ t, "mouseup", e ] ];
                w && f.push([ b, "touchstart", c ], [ b, "touchmove", d ], [ t, "touchend", e ]);
                h(f, function(a) {
                    z.apply(null, a);
                });
                this._events = f;
                this.series && this.series[0] && z(this.series[0].xAxis, "foundExtremes", function() {
                    a.scroller.modifyNavigatorAxisExtremes();
                });
                z(a, "redraw", function() {
                    var a = this.scroller, b = a && a.baseSeries && a.baseSeries[0] && a.baseSeries[0].xAxis;
                    b && a.render(b.min, b.max);
                });
            },
            removeEvents: function() {
                this._events && (h(this._events, function(a) {
                    e.apply(null, a);
                }), this._events = void 0);
                this.removeBaseSeriesEvents();
            },
            removeBaseSeriesEvents: function() {
                var a = this.baseSeries || [];
                this.navigatorEnabled && a[0] && !1 !== this.navigatorOptions.adaptToUpdatedData && (h(a, function(a) {
                    e(a, "updatedData", this.updatedDataHandler);
                }, this), a[0].xAxis && e(a[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes));
            },
            init: function(a) {
                var d = a.options, e = d.navigator, f = e.enabled, d = d.scrollbar, g = d.enabled, h = f ? e.height : 0, m = g ? d.height : 0;
                this.handles = [];
                this.scrollbarButtons = [];
                this.elementsToDestroy = [];
                this.chart = a;
                this.setBaseSeries();
                this.height = h;
                this.scrollbarHeight = m;
                this.scrollbarEnabled = g;
                this.navigatorEnabled = f;
                this.navigatorOptions = e;
                this.scrollbarOptions = d;
                this.outlineHeight = h + m;
                var l = this, p, n, f = l.baseSeries;
                l.mouseDownHandler = function(c) {
                    c = a.pointer.normalize(c);
                    var d = l.zoomedMin, e = l.zoomedMax, f = l.top, g = l.scrollerLeft, k = l.scrollerWidth, m = l.navigatorLeft, q = l.navigatorWidth, r = l.scrollbarPad || 0, t = l.range, u = c.chartX, x = c.chartY;
                    c = a.xAxis[0];
                    var A, v = b ? 10 : 7;
                    x > f && x < f + h && (Math.abs(u - d - m) < v ? (l.grabbedLeft = !0, l.otherHandlePos = e,
                        l.fixedExtreme = c.max, a.fixedRange = null) : Math.abs(u - e - m) < v ? (l.grabbedRight = !0,
                        l.otherHandlePos = d, l.fixedExtreme = c.min, a.fixedRange = null) : u > m + d - r && u < m + e + r ? (l.grabbedCenter = u,
                        l.fixedWidth = t, n = u - d) : u > g && u < g + k && (e = u - m - t / 2, 0 > e ? e = 0 : e + t >= q && (e = q - t,
                        A = l.getUnionExtremes().dataMax), e !== d && (l.fixedWidth = t, d = p.toFixedRange(e, e + t, null, A),
                        c.setExtremes(d.min, d.max, !0, null, {
                            trigger: "navigator"
                        }))));
                };
                l.mouseMoveHandler = function(b) {
                    var c = l.scrollbarHeight, d = l.navigatorLeft, e = l.navigatorWidth, f = l.scrollerLeft, g = l.scrollerWidth, h = l.range, k;
                    b.touches && 0 === b.touches[0].pageX || (b = a.pointer.normalize(b), k = b.chartX,
                            k < d ? k = d : k > f + g - c && (k = f + g - c), l.grabbedLeft ? (l.hasDragged = !0,
                        l.render(0, 0, k - d, l.otherHandlePos)) : l.grabbedRight ? (l.hasDragged = !0,
                        l.render(0, 0, l.otherHandlePos, k - d)) : l.grabbedCenter && (l.hasDragged = !0,
                            k < n ? k = n : k > e + n - h && (k = e + n - h), l.render(0, 0, k - n, k - n + h)),
                        l.hasDragged && l.scrollbar && l.scrollbar.options.liveRedraw && (b.DOMType = b.type,
                        setTimeout(function() {
                            l.mouseUpHandler(b);
                        }, 0)));
                };
                l.mouseUpHandler = function(b) {
                    var c, d, e = b.DOMEvent || b;
                    if (l.hasDragged || "scrollbar" === b.trigger) l.zoomedMin === l.otherHandlePos ? c = l.fixedExtreme : l.zoomedMax === l.otherHandlePos && (d = l.fixedExtreme),
                        l.zoomedMax === l.navigatorWidth && (d = l.getUnionExtremes().dataMax), c = p.toFixedRange(l.zoomedMin, l.zoomedMax, c, d),
                        k(c.min) && a.xAxis[0].setExtremes(c.min, c.max, !0, l.hasDragged ? !1 : null, {
                        trigger: "navigator",
                        triggerOp: "navigator-drag",
                        DOMEvent: e
                    });
                    "mousemove" !== b.DOMType && (l.grabbedLeft = l.grabbedRight = l.grabbedCenter = l.fixedWidth = l.fixedExtreme = l.otherHandlePos = l.hasDragged = n = null);
                };
                var d = a.xAxis.length, g = a.yAxis.length, q = f && f[0] && f[0].xAxis || a.xAxis[0];
                a.extraBottomMargin = l.outlineHeight + e.margin;
                a.isDirtyBox = !0;
                l.navigatorEnabled ? (l.xAxis = p = new E(a, c({
                    breaks: q.options.breaks,
                    ordinal: q.options.ordinal
                }, e.xAxis, {
                    id: "navigator-x-axis",
                    yAxis: "navigator-y-axis",
                    isX: !0,
                    type: "datetime",
                    index: d,
                    height: h,
                    offset: 0,
                    offsetLeft: m,
                    offsetRight: -m,
                    keepOrdinalPadding: !0,
                    startOnTick: !1,
                    endOnTick: !1,
                    minPadding: 0,
                    maxPadding: 0,
                    zoomEnabled: !1
                })), l.yAxis = new E(a, c(e.yAxis, {
                    id: "navigator-y-axis",
                    alignTicks: !1,
                    height: h,
                    offset: 0,
                    index: g,
                    zoomEnabled: !1
                })), f || e.series.data ? l.addBaseSeries() : 0 === a.series.length && x(a, "redraw", function(b, c) {
                    0 < a.series.length && !l.series && (l.setBaseSeries(), a.redraw = b);
                    b.call(a, c);
                })) : l.xAxis = p = {
                    translate: function(b, c) {
                        var d = a.xAxis[0], e = d.getExtremes(), f = a.plotWidth - 2 * m, g = G("min", d.options.min, e.dataMin), d = G("max", d.options.max, e.dataMax) - g;
                        return c ? b * d / f + g : f * (b - g) / d;
                    },
                    toFixedRange: E.prototype.toFixedRange
                };
                a.options.scrollbar.enabled && (a.scrollbar = l.scrollbar = new D(a.renderer, c(a.options.scrollbar, {
                    margin: l.navigatorEnabled ? 0 : 10
                }), a), z(l.scrollbar, "changed", function(b) {
                    var c = l.navigatorWidth, d = c * this.to, c = c * this.from;
                    l.hasDragged = l.scrollbar.hasDragged;
                    l.render(0, 0, c, d);
                    (a.options.scrollbar.liveRedraw || "mousemove" !== b.DOMType) && setTimeout(function() {
                        l.mouseUpHandler(b);
                    });
                }));
                l.addBaseSeriesEvents();
                l.addEvents();
            },
            getUnionExtremes: function(a) {
                var b = this.chart.xAxis[0], c = this.xAxis, d = c.options, e = b.options, f;
                a && null === b.dataMin || (f = {
                    dataMin: m(d && d.min, G("min", e.min, b.dataMin, c.dataMin, c.min)),
                    dataMax: m(d && d.max, G("max", e.max, b.dataMax, c.dataMax, c.max))
                });
                return f;
            },
            setBaseSeries: function(a) {
                var b = this.chart, c = this.baseSeries = [];
                a = a || b.options && b.options.navigator.baseSeries || 0;
                this.series && (this.removeBaseSeriesEvents(), h(this.series, function(a) {
                    a.remove();
                }));
                h(b.series || [], function(b, d) {
                    (b.options.showInNavigator || (d === a || b.options.id === a) && !1 !== b.options.showInNavigator) && c.push(b);
                });
                this.xAxis && this.addBaseSeries();
            },
            addBaseSeries: function() {
                var a = this, b = a.chart, d = a.series = [], e = a.baseSeries, f, g, k = a.navigatorOptions.series, l, m = {
                    enableMouseTracking: !1,
                    group: "nav",
                    padXAxis: !1,
                    xAxis: "navigator-x-axis",
                    yAxis: "navigator-y-axis",
                    showInLegend: !1,
                    stacking: !1,
                    isInternal: !0,
                    visible: !0
                };
                e ? h(e, function(e, h) {
                    m.name = "Navigator " + (h + 1);
                    f = e.options || {};
                    l = f.navigatorOptions || {};
                    g = c(f, m, k, l);
                    var p = l.data || k.data;
                    a.hasNavigatorData = a.hasNavigatorData || !!p;
                    g.data = p || f.data && f.data.slice(0);
                    e.navigatorSeries = b.initSeries(g);
                    d.push(e.navigatorSeries);
                }) : (g = c(k, m), g.data = k.data, a.hasNavigatorData = !!g.data, d.push(b.initSeries(g)));
                this.addBaseSeriesEvents();
            },
            addBaseSeriesEvents: function() {
                var a = this, b = a.baseSeries || [];
                b[0] && b[0].xAxis && z(b[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes);
                !1 !== this.navigatorOptions.adaptToUpdatedData && h(b, function(b) {
                    b.xAxis && (z(b, "updatedData", this.updatedDataHandler), b.userOptions.events = g(b.userOptions.event, {
                        updatedData: this.updatedDataHandler
                    }));
                    z(b, "remove", function() {
                        this.navigatorSeries && (u(a.series, this.navigatorSeries), this.navigatorSeries.remove(),
                            delete this.navigatorSeries);
                    });
                }, this);
            },
            modifyNavigatorAxisExtremes: function() {
                var a = this.xAxis, b;
                a.getExtremes && (!(b = this.getUnionExtremes(!0)) || b.dataMin === a.min && b.dataMax === a.max || (a.min = b.dataMin,
                    a.max = b.dataMax));
            },
            modifyBaseAxisExtremes: function() {
                var a = this.chart.scroller, b = this.getExtremes(), c = b.dataMin, d = b.dataMax, b = b.max - b.min, e = a.stickToMin, f = a.stickToMax, g, h, k = a.series && a.series[0], m = !!this.setExtremes;
                this.eventArgs && "rangeSelectorButton" === this.eventArgs.trigger || (e && (h = c,
                    g = h + b), f && (g = d, e || (h = Math.max(g - b, k && k.xData ? k.xData[0] : -Number.MAX_VALUE))),
                    m && (e || f) && l(h) && (this.min = this.userMin = h, this.max = this.userMax = g));
                a.stickToMin = a.stickToMax = null;
            },
            updatedDataHandler: function() {
                var a = this.chart.scroller, b = this.navigatorSeries;
                a.stickToMin = l(this.xAxis.min) && this.xAxis.min <= this.xData[0];
                a.stickToMax = Math.round(a.zoomedMax) >= Math.round(a.navigatorWidth);
                b && !a.hasNavigatorData && (b.options.pointStart = this.xData[0], b.setData(this.options.data, !1, null, !1));
            },
            destroy: function() {
                this.removeEvents();
                this.xAxis && (u(this.chart.xAxis, this.xAxis), u(this.chart.axes, this.xAxis));
                this.yAxis && (u(this.chart.yAxis, this.yAxis), u(this.chart.axes, this.yAxis));
                h(this.series || [], function(a) {
                    a.destroy && a.destroy();
                });
                delete this.series;
                h("xAxis yAxis leftShade rightShade outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup".split(" "), function(a) {
                    this[a] && this[a].destroy && (this[a] = this[a].destroy());
                }, this);
                this.rendered = null;
                h([ this.handles, this.elementsToDestroy ], function(a) {
                    r(a);
                }, this);
            }
        };
        a.Navigator = C;
        x(E.prototype, "zoom", function(a, b, c) {
            var d = this.chart, e = d.options, f = e.chart.zoomType, g = e.navigator, e = e.rangeSelector, h;
            this.isXAxis && (g && g.enabled || e && e.enabled) && ("x" === f ? d.resetZoomButton = "blocked" : "y" === f ? h = !1 : "xy" === f && (d = this.previousZoom,
                k(b) ? this.previousZoom = [ this.min, this.max ] : d && (b = d[0], c = d[1], delete this.previousZoom)));
            return void 0 !== h ? h : a.call(this, b, c);
        });
        x(H.prototype, "init", function(a, b, c) {
            z(this, "beforeRender", function() {
                var a = this.options;
                if (a.navigator.enabled || a.scrollbar.enabled) this.scroller = this.navigator = new C(this);
            });
            a.call(this, b, c);
        });
        x(H.prototype, "getMargins", function(a) {
            var b = this.legend, c = b.options, d = this.scroller, e, f;
            a.apply(this, [].slice.call(arguments, 1));
            d && (e = d.xAxis, f = d.yAxis, d.top = d.navigatorOptions.top || this.chartHeight - d.height - d.scrollbarHeight - this.spacing[2] - ("bottom" === c.verticalAlign && c.enabled && !c.floating ? b.legendHeight + m(c.margin, 10) : 0),
                e && f && (e.options.top = f.options.top = d.top, e.setAxisSize(), f.setAxisSize()));
        });
        x(p.prototype, "addPoint", function(a, b, c, e, g) {
            var h = this.options.turboThreshold;
            h && this.xData.length > h && f(b, !0) && this.chart.scroller && d(20, !0);
            a.call(this, b, c, e, g);
        });
        x(H.prototype, "addSeries", function(a, b, c, d) {
            a.call(this, b, !1, d);
            this.scroller && this.scroller.setBaseSeries();
            m(c, !0) && this.redraw();
        });
        x(p.prototype, "update", function(a, b, c) {
            a.call(this, b, !1);
            this.chart.scroller && this.chart.scroller.setBaseSeries();
            m(c, !0) && this.chart.redraw();
        });
    })(J);
    (function(a) {
        function C(a) {
            this.init(a);
        }
        var z = a.addEvent, E = a.Axis, H = a.Chart, v = a.css, n = a.createElement, k = a.dateFormat, r = a.defaultOptions, t = a.defined, h = a.destroyObjectProperties, u = a.discardElement, d = a.each, g = a.extend, q = a.fireEvent, w = a.Date, l = a.isNumber, f = a.merge, b = a.pick, c = a.pInt, m = a.removeEvent, e = a.splat, D = a.wrap;
        g(r, {
            rangeSelector: {
                buttonTheme: {
                    "stroke-width": 0,
                    width: 28,
                    height: 18,
                    padding: 2,
                    zIndex: 7
                },
                height: 35,
                inputPosition: {
                    align: "right"
                },
                labelStyle: {
                    color: "#666666"
                }
            }
        });
        r.lang = f(r.lang, {
            rangeSelectorZoom: "Zoom",
            rangeSelectorFrom: "From",
            rangeSelectorTo: "To"
        });
        C.prototype = {
            clickButton: function(a, c) {
                var f = this, g = f.selected, h = f.chart, k = f.buttons, m = f.buttonOptions[a], n = h.xAxis[0], q = h.scroller && h.scroller.getUnionExtremes() || n || {}, r = q.dataMin, t = q.dataMax, u, v = n && Math.round(Math.min(n.max, b(t, n.max))), C = m.type, D, q = m._range, H, J, O, R = m.dataGrouping;
                if (null !== r && null !== t && a !== f.selected) {
                    h.fixedRange = q;
                    R && (this.forcedDataGrouping = !0, E.prototype.setDataGrouping.call(n || {
                        chart: this.chart
                    }, R, !1));
                    if ("month" === C || "year" === C) n ? (C = {
                        range: m,
                        max: v,
                        dataMin: r,
                        dataMax: t
                    }, u = n.minFromRange.call(C), l(C.newMax) && (v = C.newMax)) : q = m; else if (q) u = Math.max(v - q, r),
                        v = Math.min(u + q, t); else if ("ytd" === C) if (n) void 0 === t && (r = Number.MAX_VALUE,
                        t = Number.MIN_VALUE, d(h.series, function(a) {
                        a = a.xData;
                        r = Math.min(a[0], r);
                        t = Math.max(a[a.length - 1], t);
                    }), c = !1), v = new w(t), u = v[w.hcGetFullYear](), u = H = Math.max(r || 0, w.UTC(u, 0, 1)),
                        v = v.getTime(), v = Math.min(t || v, v); else {
                        z(h, "beforeRender", function() {
                            f.clickButton(a);
                        });
                        return;
                    } else "all" === C && n && (u = r, v = t);
                    k[g] && k[g].setState(0);
                    k[a] && (k[a].setState(2), f.lastSelected = a);
                    n ? (n.setExtremes(u, v, b(c, 1), null, {
                        trigger: "rangeSelectorButton",
                        rangeSelectorButton: m
                    }), f.setSelected(a)) : (D = e(h.options.xAxis)[0], O = D.range, D.range = q, J = D.min,
                        D.min = H, f.setSelected(a), z(h, "load", function() {
                        D.range = O;
                        D.min = J;
                    }));
                }
            },
            setSelected: function(a) {
                this.selected = this.options.selected = a;
            },
            defaultButtons: [ {
                type: "month",
                count: 1,
                text: "1m"
            }, {
                type: "month",
                count: 3,
                text: "3m"
            }, {
                type: "month",
                count: 6,
                text: "6m"
            }, {
                type: "ytd",
                text: "YTD"
            }, {
                type: "year",
                count: 1,
                text: "1y"
            }, {
                type: "all",
                text: "All"
            } ],
            init: function(a) {
                var b = this, c = a.options.rangeSelector, e = c.buttons || [].concat(b.defaultButtons), f = c.selected, g = b.blurInputs = function() {
                    var a = b.minInput, c = b.maxInput;
                    a && a.blur && q(a, "blur");
                    c && c.blur && q(c, "blur");
                };
                b.chart = a;
                b.options = c;
                b.buttons = [];
                a.extraTopMargin = c.height;
                b.buttonOptions = e;
                z(a.container, "mousedown", g);
                z(a, "resize", g);
                d(e, b.computeButtonRange);
                void 0 !== f && e[f] && this.clickButton(f, !1);
                z(a, "load", function() {
                    z(a.xAxis[0], "setExtremes", function(c) {
                        this.max - this.min !== a.fixedRange && "rangeSelectorButton" !== c.trigger && "updatedData" !== c.trigger && b.forcedDataGrouping && this.setDataGrouping(!1, !1);
                    });
                    z(a.xAxis[0], "afterSetExtremes", function() {
                        b.updateButtonStates(!0);
                    });
                });
            },
            updateButtonStates: function(a) {
                var b = this, c = this.chart, e = c.xAxis[0], f = c.scroller && c.scroller.getUnionExtremes() || e, g = f.dataMin, h = f.dataMax, k = b.selected, l = b.options.allButtonsEnabled, m = b.buttons;
                a && c.fixedRange !== Math.round(e.max - e.min) && (m[k] && m[k].setState(0), b.setSelected(null));
                d(b.buttonOptions, function(a, d) {
                    var f = Math.round(e.max - e.min), n = a._range, p = a.type, q = a.count || 1, r = n > h - g, t = n < e.minRange, u = "all" === a.type && e.max - e.min >= h - g && 2 !== m[d].state, v = c.renderer.forExport && d === k, n = n === f, w = !e.hasVisibleSeries;
                    ("month" === p || "year" === p) && f >= 864e5 * {
                        month: 28,
                        year: 365
                    }[p] * q && f <= 864e5 * {
                        month: 31,
                        year: 366
                    }[p] * q && (n = !0);
                    v || n && d !== k && d === b.lastSelected ? (b.setSelected(d), m[d].setState(2)) : !l && (r || t || u || w) ? m[d].setState(3) : 3 === m[d].state && m[d].setState(0);
                });
            },
            computeButtonRange: function(a) {
                var b = a.type, c = a.count || 1, d = {
                    millisecond: 1,
                    second: 1e3,
                    minute: 6e4,
                    hour: 36e5,
                    day: 864e5,
                    week: 6048e5
                };
                if (d[b]) a._range = d[b] * c; else if ("month" === b || "year" === b) a._range = 864e5 * {
                    month: 30,
                    year: 365
                }[b] * c;
            },
            setInputValue: function(a, b) {
                var c = this.chart.options.rangeSelector;
                t(b) && (this[a + "Input"].HCTime = b);
                this[a + "Input"].value = k(c.inputEditDateFormat || "%Y-%m-%d", this[a + "Input"].HCTime);
                this[a + "DateBox"].attr({
                    text: k(c.inputDateFormat || "%b %e, %Y", this[a + "Input"].HCTime)
                });
            },
            showInput: function(a) {
                var b = this.inputGroup, c = this[a + "DateBox"];
                v(this[a + "Input"], {
                    left: b.translateX + c.x + "px",
                    top: b.translateY + "px",
                    width: c.width - 2 + "px",
                    height: c.height - 2 + "px",
                    border: "2px solid silver"
                });
            },
            hideInput: function(a) {
                v(this[a + "Input"], {
                    border: 0,
                    width: "1px",
                    height: "1px"
                });
                this.setInputValue(a);
            },
            drawInput: function(a) {
                function b() {
                    var a = u.value, f = (m.inputDateParser || Date.parse)(a), g = e.scroller && e.scroller.xAxis ? e.scroller.xAxis : e.xAxis[0], h = g.dataMin, k = g.dataMax;
                    f !== u.previousValue && (u.previousValue = f, l(f) || (f = a.split("-"), f = Date.UTC(c(f[0]), c(f[1]) - 1, c(f[2]))),
                        l(f) && (r.global.useUTC || (f += 6e4 * new Date().getTimezoneOffset()), t ? f > d.maxInput.HCTime ? f = void 0 : f < h && (f = h) : f < d.minInput.HCTime ? f = void 0 : f > k && (f = k),
                        void 0 !== f && e.xAxis[0].setExtremes(t ? f : g.min, t ? g.max : f, void 0, void 0, {
                        trigger: "rangeSelectorInput"
                    })));
                }
                var d = this, e = d.chart, h = e.renderer.style || {}, k = e.renderer, m = e.options.rangeSelector, q = d.div, t = "min" === a, u, w, z = this.inputGroup;
                this[a + "Label"] = w = k.label(r.lang[t ? "rangeSelectorFrom" : "rangeSelectorTo"], this.inputGroup.offset).addClass("highcharts-range-label").attr({
                    padding: 2
                }).add(z);
                z.offset += w.width + 5;
                this[a + "DateBox"] = k = k.label("", z.offset).addClass("highcharts-range-input").attr({
                    padding: 2,
                    width: m.inputBoxWidth || 90,
                    height: m.inputBoxHeight || 17,
                    stroke: m.inputBoxBorderColor || "#cccccc",
                    "stroke-width": 1,
                    "text-align": "center"
                }).on("click", function() {
                    d.showInput(a);
                    d[a + "Input"].focus();
                }).add(z);
                z.offset += k.width + (t ? 10 : 0);
                this[a + "Input"] = u = n("input", {
                    name: a,
                    className: "highcharts-range-selector",
                    type: "text"
                }, {
                    top: e.plotTop + "px"
                }, q);
                w.css(f(h, m.labelStyle));
                k.css(f({
                    color: "#333333"
                }, h, m.inputStyle));
                v(u, g({
                    position: "absolute",
                    border: 0,
                    width: "1px",
                    height: "1px",
                    padding: 0,
                    textAlign: "center",
                    fontSize: h.fontSize,
                    fontFamily: h.fontFamily,
                    left: "-9em"
                }, m.inputStyle));
                u.onfocus = function() {
                    d.showInput(a);
                };
                u.onblur = function() {
                    d.hideInput(a);
                };
                u.onchange = b;
                u.onkeypress = function(a) {
                    13 === a.keyCode && b();
                };
            },
            getPosition: function() {
                var a = this.chart, c = a.options.rangeSelector, a = b((c.buttonPosition || {}).y, a.plotTop - a.axisOffset[0] - c.height);
                return {
                    buttonTop: a,
                    inputTop: a - 10
                };
            },
            render: function(a, c) {
                var e = this, f = e.chart, h = f.renderer, k = f.container, l = f.options, m = l.exporting && !1 !== l.exporting.enabled && l.navigation && l.navigation.buttonOptions, q = l.rangeSelector, u = e.buttons, l = r.lang, v = e.div, v = e.inputGroup, w = q.buttonTheme, z = q.buttonPosition || {}, C = q.inputEnabled, D = w && w.states, E = f.plotLeft, H, J = this.getPosition(), R = e.group, Y = e.rendered;
                !1 !== q.enabled && (Y || (e.group = R = h.g("range-selector-buttons").add(), e.zoomText = h.text(l.rangeSelectorZoom, b(z.x, E), 15).css(q.labelStyle).add(R),
                    H = b(z.x, E) + e.zoomText.getBBox().width + 5, d(e.buttonOptions, function(a, c) {
                    u[c] = h.button(a.text, H, 0, function() {
                        e.clickButton(c);
                        e.isActive = !0;
                    }, w, D && D.hover, D && D.select, D && D.disabled).attr({
                        "text-align": "center"
                    }).add(R);
                    H += u[c].width + b(q.buttonSpacing, 5);
                    e.selected === c && u[c].setState(2);
                }), e.updateButtonStates(), !1 !== C && (e.div = v = n("div", null, {
                    position: "relative",
                    height: 0,
                    zIndex: 1
                }), k.parentNode.insertBefore(v, k), e.inputGroup = v = h.g("input-group").add(),
                    v.offset = 0, e.drawInput("min"), e.drawInput("max"))), R[Y ? "animate" : "attr"]({
                    translateY: J.buttonTop
                }), !1 !== C && (v.align(g({
                    y: J.inputTop,
                    width: v.offset,
                    x: m && J.inputTop < (m.y || 0) + m.height - f.spacing[0] ? -40 : 0
                }, q.inputPosition), !0, f.spacingBox), t(C) || (f = R.getBBox(), v[v.translateX < f.x + f.width + 10 ? "hide" : "show"]()),
                    e.setInputValue("min", a), e.setInputValue("max", c)), e.rendered = !0);
            },
            update: function(a) {
                var b = this.chart;
                f(!0, b.options.rangeSelector, a);
                this.destroy();
                this.init(b);
            },
            destroy: function() {
                var a = this.minInput, b = this.maxInput, c = this.chart, d = this.blurInputs, e;
                m(c.container, "mousedown", d);
                m(c, "resize", d);
                h(this.buttons);
                a && (a.onfocus = a.onblur = a.onchange = null);
                b && (b.onfocus = b.onblur = b.onchange = null);
                for (e in this) this[e] && "chart" !== e && (this[e].destroy ? this[e].destroy() : this[e].nodeType && u(this[e])),
                    this[e] !== C.prototype[e] && (this[e] = null);
            }
        };
        E.prototype.toFixedRange = function(a, c, d, e) {
            var f = this.chart && this.chart.fixedRange;
            a = b(d, this.translate(a, !0));
            c = b(e, this.translate(c, !0));
            d = f && (c - a) / f;
            .7 < d && 1.3 > d && (e ? a = c - f : c = a + f);
            l(a) || (a = c = void 0);
            return {
                min: a,
                max: c
            };
        };
        E.prototype.minFromRange = function() {
            var a = this.range, c = {
                month: "Month",
                year: "FullYear"
            }[a.type], d, e = this.max, f, g, h = function(a, b) {
                var d = new Date(a);
                d["set" + c](d["get" + c]() + b);
                return d.getTime() - a;
            };
            l(a) ? (d = this.max - a, g = a) : d = e + h(e, -a.count);
            f = b(this.dataMin, Number.MIN_VALUE);
            l(d) || (d = f);
            d <= f && (d = f, void 0 === g && (g = h(d, a.count)), this.newMax = Math.min(d + g, this.dataMax));
            l(e) || (d = void 0);
            return d;
        };
        D(H.prototype, "init", function(a, b, c) {
            z(this, "init", function() {
                this.options.rangeSelector.enabled && (this.rangeSelector = new C(this));
            });
            a.call(this, b, c);
        });
        a.RangeSelector = C;
    })(J);
    (function(a) {
        var C = a.addEvent, z = a.isNumber, E = a.removeEvent;
        a.Chart.prototype.callbacks.push(function(a) {
            function v() {
                k = a.xAxis[0].getExtremes();
                z(k.min) && t.render(k.min, k.max);
            }
            function n(a) {
                t.render(a.min, a.max);
            }
            var k, r = a.scroller, t = a.rangeSelector;
            r && (k = a.xAxis[0].getExtremes(), r.render(k.min, k.max));
            t && (C(a.xAxis[0], "afterSetExtremes", n), C(a, "redraw", v), v());
            C(a, "destroy", function() {
                t && (E(a, "redraw", v), E(a.xAxis[0], "afterSetExtremes", n));
            });
        });
    })(J);
    (function(a) {
        var C = a.arrayMax, z = a.arrayMin, E = a.Axis, H = a.Chart, v = a.defined, n = a.each, k = a.extend, r = a.format, t = a.inArray, h = a.isNumber, u = a.isString, d = a.map, g = a.merge, q = a.pick, w = a.Point, l = a.Pointer, f = a.Renderer, b = a.Series, c = a.splat, m = a.stop, e = a.SVGRenderer, D = a.VMLRenderer, p = a.wrap, B = b.prototype, x = B.init, J = B.processData, G = w.prototype.tooltipFormatter;
        a.StockChart = a.stockChart = function(a, b, e) {
            var f = u(a) || a.nodeName, h = arguments[f ? 1 : 0], k = h.series, l, m = q(h.navigator && h.navigator.enabled, !0) ? {
                startOnTick: !1,
                endOnTick: !1
            } : null, n = {
                marker: {
                    enabled: !1,
                    radius: 2
                }
            }, p = {
                shadow: !1,
                borderWidth: 0
            };
            h.xAxis = d(c(h.xAxis || {}), function(a) {
                return g({
                    minPadding: 0,
                    maxPadding: 0,
                    ordinal: !0,
                    title: {
                        text: null
                    },
                    labels: {
                        overflow: "justify"
                    },
                    showLastLabel: !0
                }, a, {
                    type: "datetime",
                    categories: null
                }, m);
            });
            h.yAxis = d(c(h.yAxis || {}), function(a) {
                l = q(a.opposite, !0);
                return g({
                    labels: {
                        y: -2
                    },
                    opposite: l,
                    showLastLabel: !1,
                    title: {
                        text: null
                    }
                }, a);
            });
            h.series = null;
            h = g({
                chart: {
                    panning: !0,
                    pinchType: "x"
                },
                navigator: {
                    enabled: !0
                },
                scrollbar: {
                    enabled: !0
                },
                rangeSelector: {
                    enabled: !0
                },
                title: {
                    text: null,
                    style: {
                        fontSize: "16px"
                    }
                },
                tooltip: {
                    shared: !0,
                    crosshairs: !0
                },
                legend: {
                    enabled: !1
                },
                plotOptions: {
                    line: n,
                    spline: n,
                    area: n,
                    areaspline: n,
                    arearange: n,
                    areasplinerange: n,
                    column: p,
                    columnrange: p,
                    candlestick: p,
                    ohlc: p
                }
            }, h, {
                _stock: !0,
                chart: {
                    inverted: !1
                }
            });
            h.series = k;
            return f ? new H(a, h, e) : new H(h, b);
        };
        p(l.prototype, "init", function(a, b, c) {
            var d = c.chart.pinchType || "";
            a.call(this, b, c);
            this.pinchX = this.pinchHor = -1 !== d.indexOf("x");
            this.pinchY = this.pinchVert = -1 !== d.indexOf("y");
            this.hasZoom = this.hasZoom || this.pinchHor || this.pinchVert;
        });
        p(E.prototype, "autoLabelAlign", function(a) {
            var b = this.chart, c = this.options, b = b._labelPanes = b._labelPanes || {}, d = this.options.labels;
            return this.chart.options._stock && "yAxis" === this.coll && (c = c.top + "," + c.height,
                !b[c] && d.enabled) ? (15 === d.x && (d.x = 0), void 0 === d.align && (d.align = "right"),
                b[c] = 1, "right") : a.call(this, [].slice.call(arguments, 1));
        });
        p(E.prototype, "getPlotLinePath", function(a, b, c, e, f, g) {
            var k = this, l = this.isLinked && !this.series ? this.linkedParent.series : this.series, m = k.chart, p = m.renderer, r = k.left, w = k.top, x, z, B, C, D = [], E = [], G, H;
            if ("colorAxis" === k.coll) return a.apply(this, [].slice.call(arguments, 1));
            E = function(a) {
                var b = "xAxis" === a ? "yAxis" : "xAxis";
                a = k.options[b];
                return h(a) ? [ m[b][a] ] : u(a) ? [ m.get(a) ] : d(l, function(a) {
                    return a[b];
                });
            }(k.coll);
            n(k.isXAxis ? m.yAxis : m.xAxis, function(a) {
                if (v(a.options.id) ? -1 === a.options.id.indexOf("navigator") : 1) {
                    var b = a.isXAxis ? "yAxis" : "xAxis", b = v(a.options[b]) ? m[b][a.options[b]] : m[b][0];
                    k === b && E.push(a);
                }
            });
            G = E.length ? [] : [ k.isXAxis ? m.yAxis[0] : m.xAxis[0] ];
            n(E, function(a) {
                -1 === t(a, G) && G.push(a);
            });
            H = q(g, k.translate(b, null, null, e));
            h(H) && (k.horiz ? n(G, function(a) {
                var b;
                z = a.pos;
                C = z + a.len;
                x = B = Math.round(H + k.transB);
                if (x < r || x > r + k.width) f ? x = B = Math.min(Math.max(r, x), r + k.width) : b = !0;
                b || D.push("M", x, z, "L", B, C);
            }) : n(G, function(a) {
                var b;
                x = a.pos;
                B = x + a.len;
                z = C = Math.round(w + k.height - H);
                if (z < w || z > w + k.height) f ? z = C = Math.min(Math.max(w, z), k.top + k.height) : b = !0;
                b || D.push("M", x, z, "L", B, C);
            }));
            return 0 < D.length ? p.crispPolyLine(D, c || 1) : null;
        });
        E.prototype.getPlotBandPath = function(a, b) {
            var c = this.getPlotLinePath(b, null, null, !0), d = this.getPlotLinePath(a, null, null, !0), e = [], f;
            if (d && c && d.toString() !== c.toString()) for (f = 0; f < d.length; f += 6) e.push("M", d[f + 1], d[f + 2], "L", d[f + 4], d[f + 5], c[f + 4], c[f + 5], c[f + 1], c[f + 2]); else e = null;
            return e;
        };
        e.prototype.crispPolyLine = function(a, b) {
            var c;
            for (c = 0; c < a.length; c += 6) a[c + 1] === a[c + 4] && (a[c + 1] = a[c + 4] = Math.round(a[c + 1]) - b % 2 / 2),
                a[c + 2] === a[c + 5] && (a[c + 2] = a[c + 5] = Math.round(a[c + 2]) + b % 2 / 2);
            return a;
        };
        f === D && (D.prototype.crispPolyLine = e.prototype.crispPolyLine);
        p(E.prototype, "hideCrosshair", function(a, b) {
            a.call(this, b);
            this.crossLabel && (this.crossLabel = this.crossLabel.hide());
        });
        p(E.prototype, "drawCrosshair", function(a, b, c) {
            var d, e;
            a.call(this, b, c);
            if (v(this.crosshair.label) && this.crosshair.label.enabled && this.cross) {
                a = this.chart;
                var f = this.options.crosshair.label, g = this.horiz;
                d = this.opposite;
                e = this.left;
                var h = this.top, l = this.crossLabel, m, n = f.format, p = "", t = "inside" === this.options.tickPosition, u = !1 !== this.crosshair.snap, w = 0;
                b || (b = this.cross && this.cross.e);
                m = g ? "center" : d ? "right" === this.labelAlign ? "right" : "left" : "left" === this.labelAlign ? "left" : "center";
                l || (l = this.crossLabel = a.renderer.label(null, null, null, f.shape || "callout").addClass("highcharts-crosshair-label" + (this.series[0] && " highcharts-color-" + this.series[0].colorIndex)).attr({
                    align: f.align || m,
                    padding: q(f.padding, 8),
                    r: q(f.borderRadius, 3),
                    zIndex: 2
                }).add(this.labelGroup), l.attr({
                    fill: f.backgroundColor || this.series[0] && this.series[0].color || "#666666",
                    stroke: f.borderColor || "",
                    "stroke-width": f.borderWidth || 0
                }).css(k({
                    color: "#ffffff",
                    fontWeight: "normal",
                    fontSize: "11px",
                    textAlign: "center"
                }, f.style)));
                g ? (m = u ? c.plotX + e : b.chartX, h += d ? 0 : this.height) : (m = d ? this.width + e : 0,
                    h = u ? c.plotY + h : b.chartY);
                n || f.formatter || (this.isDatetimeAxis && (p = "%b %d, %Y"), n = "{value" + (p ? ":" + p : "") + "}");
                b = u ? c[this.isXAxis ? "x" : "y"] : this.toValue(g ? b.chartX : b.chartY);
                l.attr({
                    text: n ? r(n, {
                        value: b
                    }) : f.formatter.call(this, b),
                    x: m,
                    y: h,
                    visibility: "visible"
                });
                b = l.getBBox();
                if (g) {
                    if (t && !d || !t && d) h = l.y - b.height;
                } else h = l.y - b.height / 2;
                g ? (d = e - b.x, e = e + this.width - b.x) : (d = "left" === this.labelAlign ? e : 0,
                    e = "right" === this.labelAlign ? e + this.width : a.chartWidth);
                l.translateX < d && (w = d - l.translateX);
                l.translateX + b.width >= e && (w = -(l.translateX + b.width - e));
                l.attr({
                    x: m + w,
                    y: h,
                    anchorX: g ? m : this.opposite ? 0 : a.chartWidth,
                    anchorY: g ? this.opposite ? a.chartHeight : 0 : h + b.height / 2
                });
            }
        });
        B.init = function() {
            x.apply(this, arguments);
            this.setCompare(this.options.compare);
        };
        B.setCompare = function(a) {
            this.modifyValue = "value" === a || "percent" === a ? function(b, c) {
                var d = this.compareValue;
                void 0 !== b && (b = "value" === a ? b - d : b = b / d * 100 - 100, c && (c.change = b));
                return b;
            } : null;
            this.userOptions.compare = a;
            this.chart.hasRendered && (this.isDirty = !0);
        };
        B.processData = function() {
            var a, b = -1, c, d, e, f;
            J.apply(this, arguments);
            if (this.xAxis && this.processedYData) for (c = this.processedXData, d = this.processedYData,
                                                            e = d.length, this.pointArrayMap && (b = t("close", this.pointArrayMap), -1 === b && (b = t(this.pointValKey || "y", this.pointArrayMap))),
                                                            a = 0; a < e - 1; a++) if (f = -1 < b ? d[a][b] : d[a], h(f) && c[a + 1] >= this.xAxis.min && 0 !== f) {
                this.compareValue = f;
                break;
            }
        };
        p(B, "getExtremes", function(a) {
            var b;
            a.apply(this, [].slice.call(arguments, 1));
            this.modifyValue && (b = [ this.modifyValue(this.dataMin), this.modifyValue(this.dataMax) ],
                this.dataMin = z(b), this.dataMax = C(b));
        });
        E.prototype.setCompare = function(a, b) {
            this.isXAxis || (n(this.series, function(b) {
                b.setCompare(a);
            }), q(b, !0) && this.chart.redraw());
        };
        w.prototype.tooltipFormatter = function(b) {
            b = b.replace("{point.change}", (0 < this.change ? "+" : "") + a.numberFormat(this.change, q(this.series.tooltipOptions.changeDecimals, 2)));
            return G.apply(this, [ b ]);
        };
        p(b.prototype, "render", function(a) {
            this.chart.options._stock && this.xAxis && (!this.clipBox && this.animate ? (this.clipBox = g(this.chart.clipBox),
                this.clipBox.width = this.xAxis.len, this.clipBox.height = this.yAxis.len) : this.chart[this.sharedClipKey] ? (m(this.chart[this.sharedClipKey]),
                this.chart[this.sharedClipKey].attr({
                    width: this.xAxis.len,
                    height: this.yAxis.len
                })) : this.clipBox && (this.clipBox.width = this.xAxis.len, this.clipBox.height = this.yAxis.len));
            a.call(this);
        });
    })(J);
    return J;
});