var on = Object.create;
var re = Object.defineProperty;
var rn = Object.getOwnPropertyDescriptor;
var sn = Object.getOwnPropertyNames;
var ln = Object.getPrototypeOf
    , cn = Object.prototype.hasOwnProperty;
var j = (r, d) => () => (r && (d = r(r = 0)),
    d);
var H = (r, d) => () => (d || r((d = {
    exports: {}
}).exports, d),
    d.exports)
    , M = (r, d) => {
        for (var t in d)
            re(r, t, {
                get: d[t],
                enumerable: !0
            })
    }
    , dn = (r, d, t, i) => {
        if (d && typeof d == "object" || typeof d == "function")
            for (let n of sn(d))
                !cn.call(r, n) && n !== t && re(r, n, {
                    get: () => d[n],
                    enumerable: !(i = rn(d, n)) || i.enumerable
                });
        return r
    }
    ;
var O = (r, d, t) => (t = r != null ? on(ln(r)) : {},
    dn(d || !r || !r.__esModule ? re(t, "default", {
        value: r,
        enumerable: !0
    }) : t, r));
var xe = H((Ie, se) => {
    (function (r, d, t) {
        function i(e) {
            var s = this
                , l = c();
            s.next = function () {
                var o = 2091639 * s.s0 + s.c * 23283064365386963e-26;
                return s.s0 = s.s1,
                    s.s1 = s.s2,
                    s.s2 = o - (s.c = o | 0)
            }
                ,
                s.c = 1,
                s.s0 = l(" "),
                s.s1 = l(" "),
                s.s2 = l(" "),
                s.s0 -= l(e),
                s.s0 < 0 && (s.s0 += 1),
                s.s1 -= l(e),
                s.s1 < 0 && (s.s1 += 1),
                s.s2 -= l(e),
                s.s2 < 0 && (s.s2 += 1),
                l = null
        }
        function n(e, s) {
            return s.c = e.c,
                s.s0 = e.s0,
                s.s1 = e.s1,
                s.s2 = e.s2,
                s
        }
        function p(e, s) {
            var l = new i(e)
                , o = s && s.state
                , a = l.next;
            return a.int32 = function () {
                return l.next() * 4294967296 | 0
            }
                ,
                a.double = function () {
                    return a() + (a() * 2097152 | 0) * 11102230246251565e-32
                }
                ,
                a.quick = a,
                o && (typeof o == "object" && n(o, l),
                    a.state = function () {
                        return n(l, {})
                    }
                ),
                a
        }
        function c() {
            var e = 4022871197
                , s = function (l) {
                    l = String(l);
                    for (var o = 0; o < l.length; o++) {
                        e += l.charCodeAt(o);
                        var a = .02519603282416938 * e;
                        e = a >>> 0,
                            a -= e,
                            a *= e,
                            e = a >>> 0,
                            a -= e,
                            e += a * 4294967296
                    }
                    return (e >>> 0) * 23283064365386963e-26
                };
            return s
        }
        d && d.exports ? d.exports = p : t && t.amd ? t(function () {
            return p
        }) : this.alea = p
    }
    )(Ie, typeof se == "object" && se, typeof define == "function" && define)
}
);
var _e = H((ke, ie) => {
    (function (r, d, t) {
        function i(c) {
            var e = this
                , s = "";
            e.x = 0,
                e.y = 0,
                e.z = 0,
                e.w = 0,
                e.next = function () {
                    var o = e.x ^ e.x << 11;
                    return e.x = e.y,
                        e.y = e.z,
                        e.z = e.w,
                        e.w ^= e.w >>> 19 ^ o ^ o >>> 8
                }
                ,
                c === (c | 0) ? e.x = c : s += c;
            for (var l = 0; l < s.length + 64; l++)
                e.x ^= s.charCodeAt(l) | 0,
                    e.next()
        }
        function n(c, e) {
            return e.x = c.x,
                e.y = c.y,
                e.z = c.z,
                e.w = c.w,
                e
        }
        function p(c, e) {
            var s = new i(c)
                , l = e && e.state
                , o = function () {
                    return (s.next() >>> 0) / 4294967296
                };
            return o.double = function () {
                do
                    var a = s.next() >>> 11
                        , u = (s.next() >>> 0) / 4294967296
                        , h = (a + u) / (1 << 21);
                while (h === 0);
                return h
            }
                ,
                o.int32 = s.next,
                o.quick = o,
                l && (typeof l == "object" && n(l, s),
                    o.state = function () {
                        return n(s, {})
                    }
                ),
                o
        }
        d && d.exports ? d.exports = p : t && t.amd ? t(function () {
            return p
        }) : this.xor128 = p
    }
    )(ke, typeof ie == "object" && ie, typeof define == "function" && define)
}
);
var Se = H(($e, le) => {
    (function (r, d, t) {
        function i(c) {
            var e = this
                , s = "";
            e.next = function () {
                var o = e.x ^ e.x >>> 2;
                return e.x = e.y,
                    e.y = e.z,
                    e.z = e.w,
                    e.w = e.v,
                    (e.d = e.d + 362437 | 0) + (e.v = e.v ^ e.v << 4 ^ (o ^ o << 1)) | 0
            }
                ,
                e.x = 0,
                e.y = 0,
                e.z = 0,
                e.w = 0,
                e.v = 0,
                c === (c | 0) ? e.x = c : s += c;
            for (var l = 0; l < s.length + 64; l++)
                e.x ^= s.charCodeAt(l) | 0,
                    l == s.length && (e.d = e.x << 10 ^ e.x >>> 4),
                    e.next()
        }
        function n(c, e) {
            return e.x = c.x,
                e.y = c.y,
                e.z = c.z,
                e.w = c.w,
                e.v = c.v,
                e.d = c.d,
                e
        }
        function p(c, e) {
            var s = new i(c)
                , l = e && e.state
                , o = function () {
                    return (s.next() >>> 0) / 4294967296
                };
            return o.double = function () {
                do
                    var a = s.next() >>> 11
                        , u = (s.next() >>> 0) / 4294967296
                        , h = (a + u) / (1 << 21);
                while (h === 0);
                return h
            }
                ,
                o.int32 = s.next,
                o.quick = o,
                l && (typeof l == "object" && n(l, s),
                    o.state = function () {
                        return n(s, {})
                    }
                ),
                o
        }
        d && d.exports ? d.exports = p : t && t.amd ? t(function () {
            return p
        }) : this.xorwow = p
    }
    )($e, typeof le == "object" && le, typeof define == "function" && define)
}
);
var Ce = H((Ae, ce) => {
    (function (r, d, t) {
        function i(c) {
            var e = this;
            e.next = function () {
                var l = e.x, o = e.i, a, u, h;
                return a = l[o],
                    a ^= a >>> 7,
                    u = a ^ a << 24,
                    a = l[o + 1 & 7],
                    u ^= a ^ a >>> 10,
                    a = l[o + 3 & 7],
                    u ^= a ^ a >>> 3,
                    a = l[o + 4 & 7],
                    u ^= a ^ a << 7,
                    a = l[o + 7 & 7],
                    a = a ^ a << 13,
                    u ^= a ^ a << 9,
                    l[o] = u,
                    e.i = o + 1 & 7,
                    u
            }
                ;
            function s(l, o) {
                var a, u, h = [];
                if (o === (o | 0))
                    u = h[0] = o;
                else
                    for (o = "" + o,
                        a = 0; a < o.length; ++a)
                        h[a & 7] = h[a & 7] << 15 ^ o.charCodeAt(a) + h[a + 1 & 7] << 13;
                for (; h.length < 8;)
                    h.push(0);
                for (a = 0; a < 8 && h[a] === 0; ++a)
                    ;
                for (a == 8 ? u = h[7] = -1 : u = h[a],
                    l.x = h,
                    l.i = 0,
                    a = 256; a > 0; --a)
                    l.next()
            }
            s(e, c)
        }
        function n(c, e) {
            return e.x = c.x.slice(),
                e.i = c.i,
                e
        }
        function p(c, e) {
            c == null && (c = +new Date);
            var s = new i(c)
                , l = e && e.state
                , o = function () {
                    return (s.next() >>> 0) / 4294967296
                };
            return o.double = function () {
                do
                    var a = s.next() >>> 11
                        , u = (s.next() >>> 0) / 4294967296
                        , h = (a + u) / (1 << 21);
                while (h === 0);
                return h
            }
                ,
                o.int32 = s.next,
                o.quick = o,
                l && (l.x && n(l, s),
                    o.state = function () {
                        return n(s, {})
                    }
                ),
                o
        }
        d && d.exports ? d.exports = p : t && t.amd ? t(function () {
            return p
        }) : this.xorshift7 = p
    }
    )(Ae, typeof ce == "object" && ce, typeof define == "function" && define)
}
);
var Ee = H((Te, de) => {
    (function (r, d, t) {
        function i(c) {
            var e = this;
            e.next = function () {
                var l = e.w, o = e.X, a = e.i, u, h;
                return e.w = l = l + 1640531527 | 0,
                    h = o[a + 34 & 127],
                    u = o[a = a + 1 & 127],
                    h ^= h << 13,
                    u ^= u << 17,
                    h ^= h >>> 15,
                    u ^= u >>> 12,
                    h = o[a] = h ^ u,
                    e.i = a,
                    h + (l ^ l >>> 16) | 0
            }
                ;
            function s(l, o) {
                var a, u, h, I, w, f = [], b = 128;
                for (o === (o | 0) ? (u = o,
                    o = null) : (o = o + "\0",
                        u = 0,
                        b = Math.max(b, o.length)),
                    h = 0,
                    I = -32; I < b; ++I)
                    o && (u ^= o.charCodeAt((I + 32) % o.length)),
                        I === 0 && (w = u),
                        u ^= u << 10,
                        u ^= u >>> 15,
                        u ^= u << 4,
                        u ^= u >>> 13,
                        I >= 0 && (w = w + 1640531527 | 0,
                            a = f[I & 127] ^= u + w,
                            h = a == 0 ? h + 1 : 0);
                for (h >= 128 && (f[(o && o.length || 0) & 127] = -1),
                    h = 127,
                    I = 4 * 128; I > 0; --I)
                    u = f[h + 34 & 127],
                        a = f[h = h + 1 & 127],
                        u ^= u << 13,
                        a ^= a << 17,
                        u ^= u >>> 15,
                        a ^= a >>> 12,
                        f[h] = u ^ a;
                l.w = w,
                    l.X = f,
                    l.i = h
            }
            s(e, c)
        }
        function n(c, e) {
            return e.i = c.i,
                e.w = c.w,
                e.X = c.X.slice(),
                e
        }
        function p(c, e) {
            c == null && (c = +new Date);
            var s = new i(c)
                , l = e && e.state
                , o = function () {
                    return (s.next() >>> 0) / 4294967296
                };
            return o.double = function () {
                do
                    var a = s.next() >>> 11
                        , u = (s.next() >>> 0) / 4294967296
                        , h = (a + u) / (1 << 21);
                while (h === 0);
                return h
            }
                ,
                o.int32 = s.next,
                o.quick = o,
                l && (l.X && n(l, s),
                    o.state = function () {
                        return n(s, {})
                    }
                ),
                o
        }
        d && d.exports ? d.exports = p : t && t.amd ? t(function () {
            return p
        }) : this.xor4096 = p
    }
    )(Te, typeof de == "object" && de, typeof define == "function" && define)
}
);
var Pe = H((je, ue) => {
    (function (r, d, t) {
        function i(c) {
            var e = this
                , s = "";
            e.next = function () {
                var o = e.b
                    , a = e.c
                    , u = e.d
                    , h = e.a;
                return o = o << 25 ^ o >>> 7 ^ a,
                    a = a - u | 0,
                    u = u << 24 ^ u >>> 8 ^ h,
                    h = h - o | 0,
                    e.b = o = o << 20 ^ o >>> 12 ^ a,
                    e.c = a = a - u | 0,
                    e.d = u << 16 ^ a >>> 16 ^ h,
                    e.a = h - o | 0
            }
                ,
                e.a = 0,
                e.b = 0,
                e.c = -1640531527,
                e.d = 1367130551,
                c === Math.floor(c) ? (e.a = c / 4294967296 | 0,
                    e.b = c | 0) : s += c;
            for (var l = 0; l < s.length + 20; l++)
                e.b ^= s.charCodeAt(l) | 0,
                    e.next()
        }
        function n(c, e) {
            return e.a = c.a,
                e.b = c.b,
                e.c = c.c,
                e.d = c.d,
                e
        }
        function p(c, e) {
            var s = new i(c)
                , l = e && e.state
                , o = function () {
                    return (s.next() >>> 0) / 4294967296
                };
            return o.double = function () {
                do
                    var a = s.next() >>> 11
                        , u = (s.next() >>> 0) / 4294967296
                        , h = (a + u) / (1 << 21);
                while (h === 0);
                return h
            }
                ,
                o.int32 = s.next,
                o.quick = o,
                l && (typeof l == "object" && n(l, s),
                    o.state = function () {
                        return n(s, {})
                    }
                ),
                o
        }
        d && d.exports ? d.exports = p : t && t.amd ? t(function () {
            return p
        }) : this.tychei = p
    }
    )(je, typeof ue == "object" && ue, typeof define == "function" && define)
}
);
var Me = H(() => { }
);
var Le = H((De, Q) => {
    (function (r, d, t) {
        var i = 256, n = 6, p = 52, c = "random", e = t.pow(i, n), s = t.pow(2, p), l = s * 2, o = i - 1, a;
        function u(g, y, x) {
            var _ = [];
            y = y == !0 ? {
                entropy: !0
            } : y || {};
            var v = f(w(y.entropy ? [g, m(d)] : g ?? b(), 3), _)
                , S = new h(_)
                , $ = function () {
                    for (var C = S.g(n), E = e, k = 0; C < s;)
                        C = (C + k) * i,
                            E *= i,
                            k = S.g(1);
                    for (; C >= l;)
                        C /= 2,
                            E /= 2,
                            k >>>= 1;
                    return (C + k) / E
                };
            return $.int32 = function () {
                return S.g(4) | 0
            }
                ,
                $.quick = function () {
                    return S.g(4) / 4294967296
                }
                ,
                $.double = $,
                f(m(S.S), d),
                (y.pass || x || function (C, E, k, T) {
                    return T && (T.S && I(T, S),
                        C.state = function () {
                            return I(S, {})
                        }
                    ),
                        k ? (t[c] = C,
                            E) : C
                }
                )($, v, "global" in y ? y.global : this == t, y.state)
        }
        function h(g) {
            var y, x = g.length, _ = this, v = 0, S = _.i = _.j = 0, $ = _.S = [];
            for (x || (g = [x++]); v < i;)
                $[v] = v++;
            for (v = 0; v < i; v++)
                $[v] = $[S = o & S + g[v % x] + (y = $[v])],
                    $[S] = y;
            (_.g = function (C) {
                for (var E, k = 0, T = _.i, D = _.j, R = _.S; C--;)
                    E = R[T = o & T + 1],
                        k = k * i + R[o & (R[T] = R[D = o & D + E]) + (R[D] = E)];
                return _.i = T,
                    _.j = D,
                    k
            }
            )(i)
        }
        function I(g, y) {
            return y.i = g.i,
                y.j = g.j,
                y.S = g.S.slice(),
                y
        }
        function w(g, y) {
            var x = [], _ = typeof g, v;
            if (y && _ == "object")
                for (v in g)
                    try {
                        x.push(w(g[v], y - 1))
                    } catch { }
            return x.length ? x : _ == "string" ? g : g + "\0"
        }
        function f(g, y) {
            for (var x = g + "", _, v = 0; v < x.length;)
                y[o & v] = o & (_ ^= y[o & v] * 19) + x.charCodeAt(v++);
            return m(y)
        }
        function b() {
            try {
                var g;
                return a && (g = a.randomBytes) ? g = g(i) : (g = new Uint8Array(i),
                    (r.crypto || r.msCrypto).getRandomValues(g)),
                    m(g)
            } catch {
                var y = r.navigator
                    , x = y && y.plugins;
                return [+new Date, r, x, r.screen, m(d)]
            }
        }
        function m(g) {
            return String.fromCharCode.apply(0, g)
        }
        if (f(t.random(), d),
            typeof Q == "object" && Q.exports) {
            Q.exports = u;
            try {
                a = Me()
            } catch { }
        } else
            typeof define == "function" && define.amd ? define(function () {
                return u
            }) : t["seed" + c] = u
    }
    )(typeof self < "u" ? self : De, [], Math)
}
);
var N = H((La, Re) => {
    var gn = xe()
        , fn = _e()
        , yn = Se()
        , wn = Ce()
        , bn = Ee()
        , vn = Pe()
        , U = Le();
    U.alea = gn;
    U.xor128 = fn;
    U.xorwow = yn;
    U.xorshift7 = wn;
    U.xor4096 = bn;
    U.tychei = vn;
    Re.exports = U
}
);
function L(r, d) {
    let t = URL.createObjectURL(r)
        , i = document.createElement("a");
    i.href = t,
        i.download = d,
        document.body.appendChild(i),
        i.click(),
        document.body.removeChild(i),
        URL.revokeObjectURL(t)
}
var V = j(() => {
    "use strict"
}
);
var ee, A, me, F = j(() => {
    "use strict";
    ee = (r, d, t) => me([...r], t).slice(0, d),
        A = (r, d) => r[Math.floor(d() * r.length)],
        me = function (r, d) {
            for (let t = r.length - 1; t > 0; t--) {
                let i = Math.floor(d() * (t + 1));
                [r[t], r[i]] = [r[i], r[t]]
            }
            return r
        }
}
);
var Oe = {};
M(Oe, {
    default: () => xn
});
import { html as In } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import *as W from "https://cdn.jsdelivr.net/npm/xlsx/+esm";
async function xn({ user: r, weight: d = 1 }) {
    let t = "q-excel-operational-metrics"
        , i = "Excel: Operational margin consolidation"
        , n = (0,
            Ne.default)(`${r.email}#${t}`)
        , p = .37
        , c = [{
            canonical: "North America",
            variants: ["NorthAmerica", "N. America", "N America", "North-Am"]
        }, {
            canonical: "Latin America",
            variants: ["LatAm", "Latin-America", "LAT AM", "LatinAmerica"]
        }, {
            canonical: "Europe",
            variants: ["EU", "Europa", "Europe Region", "E.U."]
        }, {
            canonical: "Middle East & Africa",
            variants: ["MEA", "MiddleEast&Africa", "M. East Africa", "Middle East/Africa"]
        }, {
            canonical: "Asia Pacific",
            variants: ["APAC", "Asia-Pacific", "AsiaPac", "Asia Pacific Region"]
        }]
        , e = ["Fulfillment", "Returns", "Support", "Logistics", "Billing", "Onboarding"]
        , s = ["Ops Control", "Warehouse", "Customer Care", "Payments", "Routing", "Automation", "Partner Success"]
        , l = k => `${" ".repeat(Math.floor(n() * 3))}${k}${" ".repeat(Math.floor(n() * 2))}`
        , o = new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
        , a = k => {
            let T = `$${o.format(k)}`;
            return n() < .5 ? l(`${T} USD`) : n() < .5 ? l(`USD ${T.replace("$", "")}`) : l(T)
        }
        , u = [k => k.toISOString().split("T")[0], k => `${String(k.getDate()).padStart(2, "0")}/${String(k.getMonth() + 1).padStart(2, "0")}/${k.getFullYear()}`, k => `${k.toLocaleString("en-US", {
            month: "short"
        })} ${String(k.getDate()).padStart(2, "0")}, ${k.getFullYear()}`, k => `${k.getFullYear()} Q${Math.floor(k.getMonth() / 3) + 1}`]
        , h = (k, T) => new Date(k.getTime() + n() * (T.getTime() - k.getTime()))
        , I = [["Record ID", "Region", "Closing Period", "Revenue (reported)", "Expense (reported)", "Ops Notes", "Controller Comments"]]
        , w = []
        , f = 650;
    for (let k = 0; k < f; k++) {
        let T = A(c, n)
            , D = A(e, n)
            , R = A(s, n)
            , q = h(new Date(2023, 0, 1), new Date(2024, 11, 31))
            , Y = Math.floor(n() * 85e3) + 15e3
            , X = 1 + n() * .1
            , z = Math.round(Y * X)
            , G = n() > .18
            , te = z * (.42 + n() * .28)
            , B = G ? Math.round(te) : null
            , ne = `RC-${String(k + 1).padStart(5, "0")}`
            , ae = n() < .5 ? T.canonical : A(T.variants, n)
            , oe = A(u, n)(q)
            , nn = `${D}|${R}|${q.getFullYear()}-${String(Math.floor(q.getMonth() / 3) + 1).padStart(2, "0")}`
            , an = `${A(["Reviewed via reconciliation workbook", "Pending vendor accrual confirmation", "Include in true-up journal", "Adjust for FX in final submission", "Validated by controller team", "Cross-check with warehouse logs", "Flagged for automation audit"], n)}; ref #${Math.floor(n() * 9e3 + 1e3)}`;
        I.push([l(ne), l(ae), l(oe), a(z), B === null ? n() < .5 ? "" : "USD TBD" : a(B), l(nn), l(an)]),
            w.push({
                region: T.canonical,
                category: D,
                team: R,
                period: q,
                revenue: z,
                expense: B
            })
    }
    let b = W.utils.book_new()
        , m = W.utils.aoa_to_sheet(I);
    W.utils.book_append_sheet(b, m, "Operational Close");
    let g = W.write(b, {
        bookType: "xlsx",
        type: "array"
    })
        , y = new Blob([g], {
            type: "application/octet-stream"
        })
        , x = A(c, n).canonical
        , _ = A(e, n)
        , v = h(new Date(2024, 0, 1), new Date(2024, 9, 30))
        , S = w.filter(({ region: k, category: T, period: D }) => k === x && T === _ && D.getTime() <= v.getTime()).reduce((k, T) => {
            let D = T.expense === null ? T.revenue * p : T.expense;
            return k + (T.revenue - D)
        }
            , 0)
        , $ = k => k.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        })
        , C = async k => {
            typeof k == "string" && (k = k.replace(/[,$\s]/g, ""));
            let T = Number(k);
            if (!Number.isFinite(T))
                throw new Error("Enter the variance as a number.");
            if (Math.abs(T - S) > .5)
                throw new Error("Variance does not match your cleaned workbook.");
            return !0
        }
        , E = In`
    <div class="mb-3">
      <h2 id="closing-the-ops-books-for-orbit-commerce">Closing the Ops Books for Orbit Commerce</h2>
      <p>
        <strong>Orbit Commerce</strong> operates a global fulfillment network. The finance team receives a monthly
        operational close workbook compiled from regional controllers. Because the workbook is stitched together from
        regional submissions, it contains inconsistent region names, mixed date formats, and currency strings in the
        numeric columns. Expense values are occasionally missing when the region has not submitted final vendor
        invoices.
      </p>
      <p>
        You have been asked to consolidate the workbook in Excel. The file includes a single sheet titled
        <code>Operational Close</code> with these columns:
      </p>
      <ul>
        <li><strong>Record ID</strong>: sometimes padded with extra spaces.</li>
        <li>
          <strong>Region</strong>: canonical names such as “North America” or “Asia Pacific”, but also aliases like
          <em>N. America</em> or <em>APAC</em>.
        </li>
        <li>
          <strong>Closing Period</strong>: dates captured as <code>YYYY-MM-DD</code>, <code>DD/MM/YYYY</code>,
          <code>Mon DD, YYYY</code>, or fiscal quarter strings like <code>2024 Q3</code>.
        </li>
        <li>
          <strong>Revenue (reported)</strong> and <strong>Expense (reported)</strong>: strings containing currency
          symbols, spacing variations, or the text <code>USD TBD</code>.
        </li>
        <li><strong>Ops Notes</strong>: pipe-delimited metadata (<code>Category|Team|FiscalQuarter</code>).</li>
        <li><strong>Controller Comments</strong>: free-form notes.</li>
      </ul>
      <h3>What you need to do in Excel</h3>
      <ol>
        <li>Trim whitespace and standardise the region names into their canonical form.</li>
        <li>
          Convert <strong>Closing Period</strong> strings into real dates. Treat a quarter code like
          <code>2024 Q3</code>
          as the final calendar day of that quarter.
        </li>
        <li>
          Clean the numeric columns by stripping currency text and thousands separators. If <strong>Expense</strong> is
          blank or marked <code>USD TBD</code>, fill it as <strong>37% of the reported revenue</strong>.
        </li>
        <li>
          Split the <strong>Ops Notes</strong> column so you can filter by the first component (the operations
          category).
        </li>
        <li>
          Filter the table for the <strong>${_}</strong> category in the
          <strong>${x}</strong> region for records dated on or before
          <strong>${$(v)}</strong>.
        </li>
        <li>
          Compute the <strong>total variance</strong> for the filtered records using <code>Revenue − Expense</code>. The
          result may be negative if expenses exceeded revenue.
        </li>
      </ol>
      <p>
        Download the workbook:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => L(y, `${t}.xlsx`)}>
          ${t}.xlsx
        </button>
      </p>
      <label for="${t}" class="form-label">
        What is the total variance (in USD) for ${_} in ${x} up to
        ${$(v)}?
      </label>
      <input class="form-control" id="${t}" name="${t}" required />
      <p class="text-muted">Enter a number (e.g. <code>12345.67</code> or <code>-9843.21</code>).</p>
    </div>
  `;
    return {
        id: t,
        title: i,
        weight: d,
        question: E,
        answer: C
    }
}
var Ne, qe = j(() => {
    "use strict";
    Ne = O(N(), 1);
    V();
    F()
}
);
var Ve = {};
M(Ve, {
    default: () => _n
});
import { html as kn } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
async function _n({ user: r, weight: d = .75 }) {
    let t = "q-excel-zscore-outlier"
        , i = "Excel: Z-Score Outlier Surveillance"
        , n = (0,
            Fe.default)(`${r.email}#${t}`)
        , p = 90 + Math.floor(n() * 20)
        , c = [["Store_ID", "Customer_Satisfaction_Score"]]
        , e = []
        , s = () => {
            let m = Math.max(n(), Number.EPSILON)
                , g = n();
            return Math.sqrt(-2 * Math.log(m)) * Math.cos(2 * Math.PI * g)
        }
        ;
    for (let m = 1; m <= p; m++) {
        let g = 78 + s() * 5.2;
        e.push(g)
    }
    let l = 6 + Math.floor(n() * 3);
    for (let m = 0; m < l; m++) {
        let g = n() < .5 ? -1 : 1
            , y = 12 + n() * 6;
        e[Math.floor(n() * e.length)] += g * y
    }
    for (let m = 0; m < e.length; m++)
        e[m] = Math.max(40, Math.min(100, e[m])),
            c.push([`LOC-${String(m + 1).padStart(3, "0")}`, e[m].toFixed(2)]);
    let o = e.reduce((m, g) => m + g, 0) / e.length
        , a = e.reduce((m, g) => m + Math.pow(g - o, 2), 0) / (e.length - 1)
        , u = Math.sqrt(a)
        , h = e.filter(m => Math.abs((m - o) / u) >= 2.5).length
        , I = c.map(m => m.join(",")).join(`
`)
        , w = new Blob([I], {
            type: "text/csv"
        })
        , f = async m => {
            let g = parseInt(m.replace(/[^\d-]/g, ""), 10);
            if (Number.isNaN(g))
                throw new Error("Enter the number of stores flagged as z-score outliers.");
            if (Math.abs(g - h) > 1)
                throw new Error("Your outlier count is off by more than one store. Confirm the mean and sample standard deviation, then count every location where |z-score| \u2265 2.5.");
            return !0
        }
        , b = kn`
    <div class="mb-3">
      <h2>PulseCare Clinics: Service Quality Outlier Watch</h2>
      <p>
        PulseCare operates a network of clinics and surveys patients weekly. A few clinics are rumored to deliver
        exceptional experiences (or terrible ones). Leadership wants an <strong>automated Excel check</strong> that
        flags statistically extreme satisfaction scores.
      </p>

      <h3>Your objective</h3>
      <ol>
        <li>Import the satisfaction scores into Excel.</li>
        <li>
          Compute the <strong>z-score</strong> for each clinic using <code>=STANDARDIZE(score, mean, stdev)</code>.
        </li>
        <li>
          Count locations where <code>ABS(z-score) ≥ 2.5</code> (use COUNTIFS or a helper column). These are the clinics
          that demand executive attention.
        </li>
      </ol>

      <p>
        Download the clinic satisfaction data:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => L(w, `${t}.csv`)}>
          ${t}.csv
        </button>
      </p>

      <label for="${t}" class="form-label"> How many clinics have |z-score| ≥ 2.5 based on the latest survey? </label>
      <input class="form-control" id="${t}" name="${t}" placeholder="e.g. 7" required />
      <p class="text-muted">
        Use <code>AVERAGE</code>, <code>STDEV.S</code>, and <code>STANDARDIZE</code> (or the Descriptive Statistics
        summary) to compute z-scores accurately.
      </p>
    </div>
  `;
    return {
        id: t,
        title: i,
        weight: d,
        question: b,
        answer: f
    }
}
var Fe, He = j(() => {
    "use strict";
    Fe = O(N(), 1);
    V()
}
);
var Je = {};
M(Je, {
    default: () => $n
});
import { html as Z } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
async function $n({ user: r, weight: d = 1 }) {
    let t = "q-dbt-customer-analytics"
        , i = "dbt: Customer Analytics Model"
        , n = (0,
            ze.default)(`${r.email}#${t}`)
        , c = A([{
            name: "e-commerce",
            metrics: ["orders", "revenue", "cart_abandonment"]
        }, {
            name: "SaaS",
            metrics: ["subscriptions", "mrr", "churn_rate"]
        }, {
            name: "marketplace",
            metrics: ["transactions", "gmv", "seller_count"]
        }, {
            name: "fintech",
            metrics: ["transactions", "volume", "fees"]
        }], n)
        , e = A(c.metrics, n)
        , s = A(["daily", "weekly", "monthly"], n)
        , l = A([30, 60, 90], n)
        , a = A(["staging model", "intermediate model", "mart model"], n)
        , u = {
            "staging model": ["select * from {{ source(", "renamed as (", "select * from renamed"],
            "intermediate model": ["select * from {{ ref(", "with", "from source"],
            "mart model": ["select * from {{ ref(", "group by", "order by"]
        }
        , h = async w => {
            let f = w.toLowerCase().trim();
            if (!f)
                throw new Error("Please provide a dbt model");
            if (!f.includes("{{") || !f.includes("}}"))
                throw new Error("dbt model should use Jinja templating with {{ }}");
            let b = u[a]
                , m = 0;
            for (let k of b)
                f.includes(k.toLowerCase()) && m++;
            if (m < 2)
                throw new Error(`${a} should follow dbt best practices`);
            if (a === "staging model")
                if (f.includes("source(")) {
                    if (!f.includes("ref("))
                        throw new Error(`${a} should reference other models using {{ ref() }}`)
                } else
                    throw new Error("Staging model should reference sources using {{ source() }}");
            let x = ({
                "e-commerce": ["order", "product", "customer", "cart", "purchase"],
                SaaS: ["subscription", "user", "account", "billing", "trial"],
                marketplace: ["transaction", "seller", "buyer", "listing", "commission"],
                fintech: ["transaction", "payment", "account", "balance", "fee"]
            }[c.name] || []).some(k => f.includes(k));
            if (a === "mart model" && !x)
                throw new Error(`Mart model should include business context relevant to ${c.name} domain`);
            let S = ({
                revenue: ["sum(", "total", "amount", "value"],
                mrr: ["sum(", "avg(", "monthly", "recurring"],
                volume: ["sum(", "total", "amount"],
                orders: ["count(", "sum("],
                transactions: ["count(", "sum("],
                subscriptions: ["count(", "sum("],
                gmv: ["sum(", "total", "value"],
                fees: ["sum(", "total"],
                cart_abandonment: ["count(", "rate", "abandoned"],
                churn_rate: ["count(", "rate", "churn"],
                seller_count: ["count(", "distinct"]
            }[e] || []).some(k => f.includes(k));
            if ((a === "mart model" || a === "intermediate model" && f.includes("group by")) && !S)
                throw new Error(`Model should include logic appropriate for ${e} analysis`);
            let E = ({
                daily: ["date_trunc('day'", "date(", "::date"],
                weekly: ["date_trunc('week'", "extract(week", "week"],
                monthly: ["date_trunc('month'", "extract(month", "month"]
            }[s] || []).some(k => f.includes(k)) || f.includes(s);
            if (a === "mart model" && f.includes("group by") && !E)
                throw new Error(`${s} aggregation should include appropriate time grouping logic`);
            if (a === "mart model" && f.includes("where") && !(f.includes("date") && (f.includes(">=") || f.includes(">") || f.includes("between"))))
                throw new Error("Mart model should include date filtering for time-based analysis");
            if (s !== "daily" && a === "mart model" && !f.includes("group by"))
                throw new Error(`${s} aggregation typically requires GROUP BY clause`);
            return !0
        }
        , I = Z`
    <div class="mb-3">
      <h2>
        Building Customer Analytics with dbt for
        ${c.name.charAt(0).toUpperCase() + c.name.slice(1)} Business
      </h2>

      <p>
        You're working as a data engineer at a ${c.name} company that wants to build a robust data
        transformation pipeline using dbt (data build tool). The analytics team needs reliable, tested, and
        well-documented models to power their business intelligence dashboards.
      </p>

      <h3>Business Context</h3>
      <p>
        The company needs to track <strong>${e}</strong> metrics with
        <strong>${s}</strong> granularity. The analytics team wants to analyze trends over the last
        <strong>${l} days</strong> to make informed business decisions.
      </p>

      <h3>Your Task</h3>
      <p>
        Write a dbt <strong>${a}</strong> that transforms raw data for customer analytics. Your model
        should:
      </p>

      <ul>
        ${a === "staging model" ? Z`
              <li>Use <code>{{ source() }}</code> function to reference raw source tables</li>
              <li>Apply basic transformations like column renaming and data type casting</li>
              <li>Follow the pattern: select from source → rename columns → select from renamed</li>
              <li>Handle data quality issues like NULL values and inconsistent formatting</li>
            ` : Z`
              <li>Use <code>{{ ref() }}</code> function to reference upstream dbt models</li>
              <li>Implement business logic appropriate for ${e} analysis</li>
              ${a === "mart model" ? Z`
                    <li>Include aggregations grouped by ${s} periods</li>
                    <li>Calculate key metrics relevant to ${c.name} business</li>
                    <li>Order results chronologically for easy consumption by BI tools</li>
                  ` : Z`
                    <li>Prepare cleaned data for downstream mart models</li>
                    <li>Apply intermediate transformations and joins</li>
                  `}
            `}
      </ul>

      <h3>dbt Best Practices to Follow</h3>
      <ul>
        <li><strong>Use CTEs:</strong> Structure your SQL with Common Table Expressions for readability</li>
        <li><strong>Jinja templating:</strong> Use {{ }} syntax for dbt functions and macros</li>
        <li>
          <strong>Consistent naming:</strong> Follow dbt naming conventions (staging models: stg_, marts: fct_ or dim_)
        </li>
        <li><strong>Documentation:</strong> Add comments explaining complex business logic</li>
      </ul>

      <h3>Example ${a} structure:</h3>
      <pre class="bg-light p-3 rounded"><code>${a === "staging model" ? `-- models/staging/stg_orders.sql
with source as (
    select * from {{ source('raw_data', 'orders') }}
),

renamed as (
    select
        order_id,
        customer_id,
        order_date,
        total_amount as order_value
    from source
)

select * from renamed` : a === "intermediate model" ? `-- models/intermediate/int_customer_orders.sql
with orders as (
    select * from {{ ref('stg_orders') }}
),

customers as (
    select * from {{ ref('stg_customers') }}
),

joined as (
    select
        c.customer_id,
        c.customer_name,
        o.order_date,
        o.order_value
    from customers c
    left join orders o using (customer_id)
)

select * from joined` : `-- models/marts/fct_${s}_${e}.sql
with daily_orders as (
    select * from {{ ref('int_customer_orders') }}
),

aggregated as (
    select
        date_trunc('${s}', order_date) as period,
        count(*) as order_count,
        sum(order_value) as total_${e}
    from daily_orders
    where order_date >= current_date - ${l}
    group by 1
)

select * from aggregated
order by period`}</code></pre>

      <label for="${t}" class="form-label">
        Write a dbt ${a} for ${s} ${e} analysis:
      </label>
      <textarea
        class="form-control font-monospace text-bg-dark"
        rows="15"
        id="${t}"
        name="${t}"
        placeholder="-- models/${a.replace(" ", "_")}/your_model_name.sql&#10;&#10;with source as (&#10;    -- Your dbt model code here&#10;)"
      ></textarea>

      <div class="mt-2">
        <small class="text-muted">
          <strong>Hint:</strong> Make sure to use proper dbt syntax with {{ }} for referencing sources or models, and
          structure your SQL with CTEs for better readability.
        </small>
      </div>
    </div>
  `;
    return {
        id: t,
        title: i,
        weight: d,
        question: I,
        answer: h
    }
}
var ze, Ge = j(() => {
    "use strict";
    ze = O(N(), 1);
    F()
}
);
var Be = {};
M(Be, {
    default: () => An
});
import { html as Sn } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
async function An({ user: r, weight: d = 1 }) {
    let t = "q-dbt-operations-dashboard"
        , i = "dbt: Operations performance mart"
        , n = (0,
            Ue.default)(`${r.email}#${t}`)
        , c = A([{
            name: "fulfillment",
            metrics: ["delayed_shipments", "ontime_percentage", "avg_transit_days"],
            businessTerms: ["shipment", "carrier", "warehouse", "delivery", "transit"]
        }, {
            name: "inventory",
            metrics: ["stockouts", "avg_days_on_hand", "cycle_accuracy"],
            businessTerms: ["inventory", "sku", "cycle", "stock", "warehouse"]
        }, {
            name: "returns",
            metrics: ["rma_volume", "percent_refunded", "avg_processing_hours"],
            businessTerms: ["return", "rma", "refund", "restock", "inspection"]
        }, {
            name: "support",
            metrics: ["sla_breaches", "avg_handle_minutes", "first_contact_resolution"],
            businessTerms: ["ticket", "agent", "sla", "queue", "contact"]
        }], n)
        , e = A(c.metrics, n)
        , s = A(["daily", "weekly"], n)
        , l = A([14, 30, 45], n)
        , a = A(["mart model", "intermediate model"], n)
        , u = {
            "mart model": [{
                name: "uses_ref",
                pattern: /{{\s*ref\(/i,
                message: "Mart models should use {{ ref() }} for dependencies."
            }, {
                name: "group_by",
                pattern: /\bgroup\s+by\b/i,
                message: "Mart models require grouping for aggregations."
            }, {
                name: "order_by",
                pattern: /\border\s+by\b/i,
                message: "Mart models should order results for BI friendliness."
            }],
            "intermediate model": [{
                name: "uses_ref",
                pattern: /{{\s*ref\(/i,
                message: "Intermediate models should source data via {{ ref() }}."
            }, {
                name: "cte",
                pattern: /\bwith\b/i,
                message: "Intermediate models should be structured with CTEs."
            }]
        }
        , h = {
            delayed_shipments: ["case", "delay", "interval", "count"],
            ontime_percentage: ["count", "case", "%", "ratio"],
            avg_transit_days: ["avg", "date_diff", "datediff"],
            stockouts: ["count", "stockout", "zero", "quantity"],
            avg_days_on_hand: ["avg", "days_on_hand", "inventory"],
            cycle_accuracy: ["count", "cycle", "accuracy"],
            rma_volume: ["count", "rma"],
            percent_refunded: ["sum", "refund", "amount"],
            avg_processing_hours: ["avg", "hour", "timestamp"],
            sla_breaches: ["case", "sla", "breach"],
            avg_handle_minutes: ["avg", "handle", "minute"],
            first_contact_resolution: ["count", "resolution", "first"]
        }
        , I = {
            daily: [/date_trunc\s*\(\s*'day'/i, /\b::date\b/i],
            weekly: [/date_trunc\s*\(\s*'week'/i, /\bextract\s*\(\s*week/i]
        }
        , w = A(c.businessTerms, n)
        , f = async m => {
            let g = m.trim();
            if (!g)
                throw new Error("Provide a dbt SQL model.");
            if (!g.includes("{{"))
                throw new Error("Use Jinja templating ({{ }}) for dbt models.");
            for (let { pattern: x, message: _ } of u[a])
                if (!x.test(g))
                    throw new Error(_);
            if (!g.match(I[s][0]) && !g.match(I[s][1]))
                throw new Error(`Include ${s} date handling (e.g. date_trunc('${s}', ...) or EXTRACT).`);
            let y = h[e] || [];
            if (!y.some(x => g.toLowerCase().includes(x.toLowerCase())))
                throw new Error(`Include logic related to ${e} (patterns like ${y.join(", ")}).`);
            if (!g.toLowerCase().includes(w.toLowerCase()))
                throw new Error(`Reference domain concepts such as "${w}" for the ${c.name} flow.`);
            if (!/where\s+.+\bdate\b.+(>=|between)/i.test(g))
                throw new Error(`Filter the dataset for the last ${l} days.`);
            if (!/select/i.test(g) || !/from/i.test(g))
                throw new Error("SQL must include SELECT and FROM clauses.");
            if (!/coalesce|ifnull|0\)/i.test(g))
                throw new Error("Handle missing values using COALESCE/IFNULL.");
            if (!/{{\s*config\s*\(/i.test(g))
                throw new Error("Add a {{ config(...) }} block to declare materialization and freshness.");
            return !0
        }
        , b = Sn`
    <div class="mb-3">
      <h2 id="operations-performance-mart">Operations performance mart for Orbit Ops</h2>
      <p>
        Orbit Ops uses dbt to publish dashboards for operational leaders. You have been asked to build a
        <strong>${a}</strong> that powers the <strong>${c.name}</strong> dashboards. The team focuses
        on <strong>${e.replace("_", " ")}</strong> at a <strong>${s}</strong> grain covering the last
        <strong>${l} days</strong>.
      </p>
      <h3>Data sources</h3>
      <p>
        Upstream models expose staging tables (e.g. <code>stg_shipments</code>, <code>stg_returns</code>) with clean
        column names. You will build on top of these using {{ ref() }} and Jinja templating.
      </p>
      <h3>Your dbt model must:</h3>
      <ul>
        <li>Use <code>{{ config(...) }}</code> to declare materialization and freshness metadata.</li>
        <li>Reference upstream models via <code>{{ ref() }}</code> (and <code>{{ source() }}</code> if needed).</li>
        <li>Filter rows to the last ${l} days relative to <code>current_date</code>.</li>
        <li>Aggregate results at ${s} grain (use <code>date_trunc</code> or similar).</li>
        <li>
          Compute business-ready metrics for ${e.replace("_", " ")}; include logic referencing
          "${w}" and other domain terms.
        </li>
        <li>Handle NULLs with <code>coalesce</code> / <code>ifnull</code>.</li>
        <li>Return columns ready for BI consumption, ordered by date.</li>
      </ul>
      <p>
        Write your dbt SQL (with Jinja) below. You can assume a warehouse dialect compatible with Snowflake/BigQuery.
      </p>
      <label for="${t}" class="form-label">Paste your dbt model:</label>
      <textarea class="form-control font-monospace text-bg-dark" rows="12" id="${t}" name="${t}"></textarea>
      <p class="text-muted">Your answer is validated for structure and domain coverage.</p>
    </div>
  `;
    return {
        id: t,
        title: i,
        weight: d,
        question: b,
        answer: f
    }
}
var Ue, We = j(() => {
    "use strict";
    Ue = O(N(), 1);
    F()
}
);
var Xe = {};
M(Xe, {
    default: () => Tn
});
import { html as Cn } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
async function Tn({ user: r, weight: d = 1 }) {
    let t = "q-openrefine-supplier-spend"
        , i = "OpenRefine: Supplier spend consolidation"
        , n = (0,
            Ye.default)(`${r.email}#${t}`)
        , p = [{
            canonical: "Astra Supplies",
            variants: ["Astra Supplies", "AstraSupply", "Astra-Supplies", "Astra suppl.", "Astra Spp"]
        }, {
            canonical: "Nova Packaging",
            variants: ["Nova Packaging", "Nova Packg.", "Nova-Packaging", "Novapackaging", "NovaPack"]
        }, {
            canonical: "Lumen Analytics",
            variants: ["Lumen Analytics", "Lumen-Analytics", "Lumen Analytix", "LumenAnalytics", "LumenAnalytic"]
        }, {
            canonical: "Vertex Logistics",
            variants: ["Vertex Logistics", "VertexLogistics", "Vertex Log.", "Vertex-Logistics", "Vtx Logistics"]
        }, {
            canonical: "Helios Robotics",
            variants: ["Helios Robotics", "Helios-Robotics", "Helios Robotix", "HeliosRobotics", "HELIOS ROBOTICS"]
        }, {
            canonical: "Zenith Components",
            variants: ["Zenith Components", "Zenith-Components", "Zenith Component", "ZenithComponents", "Zenith Comp."]
        }]
        , c = ["Hardware", "Software", "Logistics", "Professional Services", "Facility", "Cloud"]
        , e = new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
        , s = [["invoice_id", "supplier_name", "category", "invoice_date", "status", "amount_usd", "comment"]]
        , l = []
        , o = (y, x) => new Date(y.getTime() + n() * (x.getTime() - y.getTime()))
        , a = y => `${" ".repeat(Math.floor(n() * 2))}${y}${" ".repeat(Math.floor(n() * 2))}`
        , u = 520;
    for (let y = 0; y < u; y++) {
        let x = A(p, n)
            , _ = A(c, n)
            , v = n()
            , S = v > .8 ? "Pending" : v > .65 ? "On Hold" : v > .55 ? "Rejected" : "Approved"
            , $ = Math.round((n() * 9500 + 500) * 100) / 100
            , C = o(new Date("2024-01-01T00:00:00Z"), new Date("2024-09-30T00:00:00Z"))
            , E = `INV-${String(Math.floor(n() * 9e5) + 1e5)}`
            , k = ["vendor submitted via portal", "match to PO required", "price variance escalated", "three-way match complete", "pending shipping confirmation", "requires VAT documentation"]
            , T = n() < .6 ? `$${e.format($)}` : `USD ${e.format($).replace(",", n() < .4 ? "," : ", ")}`;
        s.push([E, a(A(x.variants, n)), a(_), a(C.toISOString().split("T")[0]), a(S), a(T), a(`${A(k, n)}; cost center ${Math.floor(n() * 20) + 100}`)]),
            l.push({
                invoiceId: E,
                supplier: x.canonical,
                category: _,
                status: S,
                amount: $
            }),
            n() < .08 && s.push([E, a(A(x.variants, n)), a(_), a(C.toISOString().split("T")[0]), a(S), a(T), a("duplicate submit; consolidate in close process")])
    }
    let h = s.map(y => y.map(x => `"${String(x).replace(/"/g, '""')}"`).join(",")).join(`
`)
        , I = new Blob([h], {
            type: "text/csv"
        })
        , w = A(p, n).canonical
        , f = A(c, n)
        , b = l.filter(({ supplier: y, category: x, status: _ }) => y === w && x === f && _ === "Approved").reduce((y, x) => y + x.amount, 0)
        , m = async y => {
            typeof y == "string" && (y = y.replace(/[,\s$]/g, ""));
            let x = Number(y);
            if (!Number.isFinite(x))
                throw new Error("Please enter the supplier spend in USD.");
            if (Math.abs(x - b) > .1)
                throw new Error("Spend total does not match the cleaned dataset.");
            return !0
        }
        , g = Cn`
    <div class="mb-3">
      <h2 id="supplier-spend-normalisation-for-orbit-commerce">Supplier spend normalisation for Orbit Commerce</h2>
      <p>
        The procurement operations team exported invoices from their ERP into CSV, but supplier names appear with many
        variations (punctuation differences, abbreviations, inconsistent casing) and duplicates exist where invoices
        were resubmitted. To complete the month-end spend reconciliation you must clean the data using OpenRefine.
      </p>
      <h3>Dataset fields</h3>
      <ul>
        <li><strong>invoice_id</strong>: may be duplicated when vendors resubmitted paperwork.</li>
        <li><strong>supplier_name</strong>: inconsistent casing, punctuation, or abbreviations.</li>
        <li><strong>category</strong>: spend category.</li>
        <li><strong>invoice_date</strong>: ISO date string.</li>
        <li><strong>status</strong>: Approved, Pending, Rejected, or On Hold.</li>
        <li><strong>amount_usd</strong>: currency text with USD prefixes, symbols, or spacing issues.</li>
        <li><strong>comment</strong>: free-form notes.</li>
      </ul>
      <h3>Workflow in OpenRefine</h3>
      <ol>
        <li>Import the CSV and trim whitespace on textual columns.</li>
        <li>
          Cluster <strong>supplier_name</strong> using key collision and nearest-neighbour methods, merging variants
          into canonical names.
        </li>
        <li>
          Remove duplicate invoices by <strong>invoice_id</strong>, keeping the row that contains the cleanest notes
          (you can use facets to pick the first entry).
        </li>
        <li>
          Clean <strong>amount_usd</strong> by stripping currency strings and converting to numbers (e.g. via GREL:
          <code>cells["amount_usd"].value.replace(/[^0-9.]/, "")</code>).
        </li>
        <li>
          Filter rows to <strong>${w}</strong> in the <strong>${f}</strong> category with
          status <strong>Approved</strong>.
        </li>
        <li>Compute the total spend in USD.</li>
      </ol>
      <p>
        Download the invoice export:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => L(I, `${t}.csv`)}>
          ${t}.csv
        </button>
      </p>
      <label for="${t}" class="form-label">
        What is the total Approved spend (USD) for ${w} in the ${f} category after cleaning?
      </label>
      <input class="form-control" id="${t}" name="${t}" required />
    </div>
  `;
    return {
        id: t,
        title: i,
        weight: d,
        question: g,
        answer: m
    }
}
var Ye, Ke = j(() => {
    "use strict";
    Ye = O(N(), 1);
    V();
    F()
}
);
var Qe = {};
M(Qe, {
    default: () => jn
});
import { html as En } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
async function jn({ user: r, weight: d = 1 }) {
    let t = "q-json-sensor-rollup"
        , i = "JSON: Sensor roll-up analytics"
        , n = (0,
            Ze.default)(`${r.email}#${t}`)
        , p = ["Plant-01", "Plant-02", "Plant-03", "Lab-East", "Lab-West", "Depot-North", "Depot-South"]
        , c = ["boiler", "compressor", "chiller", "condenser", "exchange", "pump"]
        , e = ["ok", "warning", "maintenance", "offline"]
        , s = []
        , l = []
        , o = (v, S) => Math.floor(n() * (S - v + 1)) + v
        , a = (v, S, $ = 2) => {
            let C = 10 ** $;
            return Math.round((v + n() * (S - v)) * C) / C
        }
        , u = (v, S) => new Date(v.getTime() + n() * (S.getTime() - v.getTime()))
        , h = new Date("2024-06-01T00:00:00Z")
        , I = new Date("2024-08-31T23:59:59Z")
        , w = 480;
    for (let v = 0; v < w; v++) {
        let S = A(p, n)
            , $ = A(c, n)
            , C = `${$}-${String(o(1, 18)).padStart(3, "0")}`
            , E = u(h, I)
            , k = A(e, n)
            , T = a(45, 95, 2)
            , D = n() < .25
            , R = D ? Math.round((T * 9 / 5 + 32) * 100) / 100 : T
            , q = D ? "F" : "C"
            , Y = a(95, 125, 2)
            , X = a(25, 85, 1)
            , z = {
                x: a(.05, .6, 3),
                y: a(.05, .6, 3),
                z: a(.05, .6, 3)
            }
            , G = {
                site: S,
                device: C,
                captured_at: E.toISOString(),
                status: k,
                metrics: {
                    temperature: {
                        value: R,
                        unit: q
                    },
                    pressure: {
                        value: Y,
                        unit: "kPa"
                    },
                    vibration: z
                },
                environmental: {
                    humidity: {
                        value: X,
                        unit: "%"
                    },
                    airflow: a(18, 40, 2)
                },
                notes: {
                    operator: `shift-${o(1, 5)}`,
                    calibration_due: u(new Date("2024-09-01T00:00:00Z"), new Date("2024-12-31T00:00:00Z")).toISOString()
                }
            };
        s.push({
            site: S,
            deviceType: $,
            capturedAt: E,
            status: k,
            temperatureC: T,
            temperatureUnit: q,
            skip: k === "maintenance" || k === "offline",
            payload: G
        }),
            l.push(JSON.stringify(G))
    }
    let f = new Blob([l.join(`
`)], {
        type: "application/jsonl"
    })
        , b = {}
        , m = [];
    for (; !m.length;) {
        b.site = A(p, n),
            b.deviceType = A(c, n);
        let v = u(h, I)
            , S = new Date(v.getTime() + o(5, 15) * 24 * 60 * 60 * 1e3);
        b.start = v < I ? v : h,
            b.end = S < I ? S : I,
            m = s.filter(({ site: $, deviceType: C, capturedAt: E, skip: k }) => $ === b.site && C === b.deviceType && !k && E.getTime() >= b.start.getTime() && E.getTime() <= b.end.getTime())
    }
    let g = m.reduce((v, S) => v + S.temperatureC, 0) / m.length
        , y = async v => {
            typeof v == "string" && (v = v.replace(/[^\d.-]/g, ""));
            let S = Number(v);
            if (!Number.isFinite(S))
                throw new Error("Enter the average temperature in \xB0C.");
            if (Math.abs(S - g) > .05)
                throw new Error("Average temperature does not match cleaned data.");
            return !0
        }
        , x = v => v.toISOString().replace(".000Z", "Z").replace(/T/, " ")
        , _ = En`
    <div class="mb-3">
      <h2 id="sensor-rollup-for-thermal-watch">Sensor roll-up for ThermalWatch</h2>
      <p>
        ThermalWatch aggregates IoT telemetry from industrial plants. Each device emits a JSON document per minute with
        nested metrics. Operators need a cleaned dataset to monitor temperature drift by equipment type and site.
      </p>
      <p>
        Unfortunately, older firmware reports some temperatures in Fahrenheit while the newer firmware uses Celsius, and
        maintenance events are logged even when the sensor is offline. You must build a script (or use tools such as
        <code>jq</code>, <code>ijson</code>, or pandas) to compute a normalised average temperature for a specific
        device family.
      </p>
      <h3>Steps</h3>
      <ol>
        <li>Stream the JSONL file to avoid loading it fully into memory.</li>
        <li>
          Filter to <strong>${b.site}</strong> and devices whose id starts with
          <strong>${b.deviceType}</strong>.
        </li>
        <li>
          Restrict the time window to <strong>${x(b.start)} UTC</strong> through
          <strong>${x(b.end)} UTC</strong>.
        </li>
        <li>Exclude records where <code>status</code> is <code>maintenance</code> or <code>offline</code>.</li>
        <li>Convert all temperature readings to Celsius before aggregating.</li>
        <li>Compute the average temperature to two decimal places.</li>
      </ol>
      <p>
        Download the sensor feed:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => L(f, `${t}.jsonl`)}>
          ${t}.jsonl
        </button>
      </p>
      <label for="${t}" class="form-label">
        What is the average temperature in °C for ${b.deviceType} devices at ${b.site} within the
        specified window?
      </label>
      <input class="form-control" id="${t}" name="${t}" required />
      <p class="text-muted">Round to two decimal places.</p>
    </div>
  `;
    return {
        id: t,
        title: i,
        weight: d,
        question: _,
        answer: y
    }
}
var Ze, et = j(() => {
    "use strict";
    Ze = O(N(), 1);
    V();
    F()
}
);
var nt = {};
M(nt, {
    default: () => Ln
});
import { en as Pn, Faker as Mn } from "https://cdn.jsdelivr.net/npm/@faker-js/faker@9/+esm";
import { html as Dn } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
async function Ln({ user: r, weight: d = 1 }) {
    let t = "q-json-customer-flatten"
        , i = "JSON: Flatten nested customer orders"
        , n = (0,
            tt.default)(`${r.email}#${t}`)
        , p = new Mn({
            locale: [Pn],
            seed: Math.round(n() * 1e6)
        })
        , c = ["North America", "Europe", "Asia Pacific", "Latin America"]
        , e = ["Enterprise", "Growth", "SMB"]
        , s = ["Marketplace", "Direct", "Reseller", "App"]
        , l = ["Analytics", "Security", "Collaboration", "Commerce", "Infrastructure"]
        , o = []
        , a = []
        , u = ($, C) => Math.floor(n() * (C - $ + 1)) + $
        , h = ($, C) => new Date($.getTime() + n() * (C.getTime() - $.getTime()))
        , I = new Date("2024-01-01T00:00:00Z")
        , w = new Date("2024-09-30T23:59:59Z")
        , f = 180;
    for (let $ = 0; $ < f; $++) {
        let C = A(c, n)
            , E = A(e, n)
            , k = `CUST-${String(u(1e5, 999999))}`
            , T = []
            , D = u(1, 5);
        for (let q = 0; q < D; q++) {
            let Y = `ORD-${String(u(1e5, 999999))}`
                , X = h(I, w).toISOString()
                , z = A(s, n)
                , G = []
                , te = u(1, 4);
            for (let B = 0; B < te; B++) {
                let ne = A(l, n)
                    , ae = u(1, 12)
                    , oe = u(250, 4500);
                G.push({
                    sku: `SKU-${String(u(1e3, 9999))}`,
                    category: ne,
                    channel: z,
                    quantity: ae,
                    unit_price: oe,
                    discount_pct: n() < .35 ? u(5, 20) : 0
                })
            }
            T.push({
                order_id: Y,
                order_date: X,
                channel: z,
                items: G
            })
        }
        let R = {
            customer_id: k,
            company: p.company.name(),
            region: C,
            segment: E,
            orders: T
        };
        o.push(R),
            a.push(JSON.stringify(R))
    }
    let b = new Blob([a.join(`
`)], {
        type: "application/jsonl"
    })
        , m = {
            region: A(c, n),
            category: A(l, n),
            channel: A(s, n)
        }
        , g = h(I, w)
        , y = new Date(g.getTime() + u(20, 60) * 24 * 60 * 60 * 1e3);
    m.start = g,
        m.end = y < w ? y : w;
    let x = 0;
    if (o.forEach($ => {
        $.region === m.region && $.orders.forEach(C => {
            let E = new Date(C.order_date);
            E < m.start || E > m.end || C.items.forEach(k => {
                k.category === m.category && k.channel === m.channel && (x += k.quantity)
            }
            )
        }
        )
    }
    ),
        x === 0) {
        let $ = A(o, n)
            , C = A($.orders, n)
            , E = A(C.items, n);
        m.region = $.region,
            m.category = E.category,
            m.channel = E.channel;
        let k = new Date(C.order_date);
        m.start = new Date(k.getTime() - 7 * 24 * 60 * 60 * 1e3),
            m.end = new Date(k.getTime() + 14 * 24 * 60 * 60 * 1e3),
            x = 0,
            o.forEach(T => {
                T.region === m.region && T.orders.forEach(D => {
                    let R = new Date(D.order_date);
                    R < m.start || R > m.end || D.items.forEach(q => {
                        q.category === m.category && q.channel === m.channel && (x += q.quantity)
                    }
                    )
                }
                )
            }
            )
    }
    let _ = async $ => {
        let C = Number($);
        if (!Number.isFinite(C))
            throw new Error("Enter the total quantity.");
        if (C !== x)
            throw new Error("Quantity does not match the flattened dataset.");
        return !0
    }
        , v = $ => $.toISOString().split("T")[0]
        , S = Dn`
    <div class="mb-3">
      <h2 id="customer-order-flattening-for-slingshot">Customer order flattening for Slingshot Cloud</h2>
      <p>
        Slingshot Cloud combines marketplace, reseller, and direct orders into JSON records per customer. Each line in
        the JSONL export contains a customer with nested orders and line items. To answer a product analytics request
        you must flatten these objects.
      </p>
      <h3>Goal</h3>
      <p>
        Compute the total quantity of <strong>${m.category}</strong> items sold through the
        <strong>${m.channel}</strong> channel to customers in <strong>${m.region}</strong> between
        <strong>${v(m.start)}</strong> and <strong>${v(m.end)}</strong>.
      </p>
      <h3>Recommended workflow</h3>
      <ol>
        <li>Read the JSONL stream (use Python <code>ijson</code>, <code>jq</code>, or Node streams).</li>
        <li>Explode the <code>orders</code> array, emitting one row per <code>order.items</code> element.</li>
        <li>Filter by region, channel, category, and order date.</li>
        <li>Sum the <code>quantity</code> field.</li>
      </ol>
      <p>
        Download the customer order feed:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => L(b, `${t}.jsonl`)}>
          ${t}.jsonl
        </button>
      </p>
      <label for="${t}" class="form-label"> What is the total quantity matching the criteria above? </label>
      <input class="form-control" id="${t}" name="${t}" type="number" required />
    </div>
  `;
    return {
        id: t,
        title: i,
        weight: d,
        question: S,
        answer: _
    }
}
var tt, at = j(() => {
    "use strict";
    tt = O(N(), 1);
    V();
    F()
}
);
var rt = {};
M(rt, {
    default: () => qn
});
import { en as Rn, Faker as Nn } from "https://cdn.jsdelivr.net/npm/@faker-js/faker@9/+esm";
import { html as On } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
async function qn({ user: r, weight: d = 1 }) {
    let t = "q-parse-partial-json"
        , i = "Parse partial JSON"
        , n = (0,
            ot.default)(`${r.email}#${t}`)
        , p = new Nn({
            locale: [Rn],
            seed: Math.round(n() * 1e6)
        })
        , c = 0
        , e = Array.from({
            length: 100
        }, () => {
            let l = p.number.int({
                min: 100,
                max: 1e3
            });
            c += l;
            let o = {
                city: p.location.city(),
                product: p.commerce.product(),
                sales: l
            }
                , a = {};
            for (let h of ee(Object.keys(o), 6, n))
                a[h] = o[h];
            a.id = p.string.uuid();
            let u = JSON.stringify(a);
            return u.slice(0, u.length - Math.floor(n() * 44))
        }
        ).join(`
`)
        , s = On`
    <div class="mb-3">
      <h2>
        <strong>Case Study: Recovering Sales Data for ReceiptRevive Analytics</strong>
      </h2>
      <p>
        <strong>ReceiptRevive Analytics</strong> is a data recovery and business intelligence firm specializing in
        processing legacy sales data from paper receipts. Many of the client companies have archives of receipts from
        past years, which have been digitized using OCR (Optical Character Recognition) techniques. However, due to the
        condition of some receipts (e.g., torn, faded, or partially damaged), the OCR process sometimes produces
        incomplete JSON data. These imperfections can lead to truncated fields or missing values, which complicates the
        process of data aggregation and analysis.
      </p>
      <p>
        One of ReceiptRevive’s major clients, <strong>RetailFlow Inc.</strong>, operates numerous brick-and-mortar
        stores and has an extensive archive of old receipts. RetailFlow Inc. needs to recover total sales information
        from a subset of these digitized receipts to analyze historical sales performance. The provided JSON data
        contains 100 rows, with each row representing a sales entry. Each entry is expected to include four keys:
      </p>
      <ul>
        <li><strong>city</strong>: The city where the sale was made.</li>
        <li><strong>product</strong>: The product that was sold.</li>
        <li><strong>sales</strong>: The number of units sold (or sales revenue).</li>
        <li><strong>id</strong>: A unique identifier for the receipt.</li>
      </ul>
      <p>
        Due to damage to some receipts during the digitization process, the JSON entries are truncated at the end, and
        the <code>id</code> field is missing. Despite this, RetailFlow Inc. is primarily interested in the aggregate
        sales value.
      </p>
      <h2>Your Task</h2>
      <p>As a data recovery analyst at ReceiptRevive Analytics, your task is to develop a program that will:</p>
      <ol>
        <li>
          <strong>Parse the Sales Data:</strong><br />Read the provided JSON file containing 100 rows of sales data.
          Despite the truncated data (specifically the missing <code>id</code>), you must accurately extract the
          <code>sales</code> figures from each row.
        </li>
        <li>
          <strong>Data Validation and Cleanup:</strong><br />Ensure that the data is properly handled even if some
          fields are incomplete. Since the <code>id</code> is missing for some entries, your focus will be solely on the
          <code>sales</code> values.
        </li>
        <li>
          <strong>Calculate Total Sales:</strong><br />Sum the <code>sales</code> values across all 100 rows to provide
          a single aggregate figure that represents the total sales recorded.
        </li>
      </ol>
      <p>
        By successfully recovering and aggregating the sales data, ReceiptRevive Analytics will enable RetailFlow Inc.
        to:
      </p>
      <ul>
        <li>
          <strong>Reconstruct Historical Sales Data:</strong> Gain insights into past sales performance even when
          original receipts are damaged.
        </li>
        <li>
          <strong>Inform Business Decisions:</strong> Use the recovered data to understand sales trends, adjust
          inventory, and plan future promotions.
        </li>
        <li>
          <strong>Enhance Data Recovery Processes:</strong> Improve methods for handling imperfect OCR data, reducing
          future data loss and increasing data accuracy.
        </li>
        <li>
          <strong>Build Client Trust:</strong> Demonstrate the ability to extract valuable insights from challenging
          datasets, thereby reinforcing client confidence in ReceiptRevive&#39;s services.
        </li>
      </ul>
      <p>
        Download the data from
        <button
          class="btn btn-sm btn-outline-primary"
          type="button"
          @click=${() => L(new Blob([e], {
            type: "text/plain"
        }), `${t}.jsonl`)}
        >
          ${t}.jsonl
        </button>
      </p>
      <label for="${t}" class="form-label"> What is the total sales value? </label>
      <input class="form-control" id="${t}" name="${t}" type="number" required />
    </div>
  `;
    return {
        id: t,
        title: i,
        weight: d,
        question: s,
        answer: c
    }
}
var ot, st = j(() => {
    "use strict";
    ot = O(N(), 1);
    V();
    F()
}
);
var it = {};
M(it, {
    default: () => zn
});
import { html as Fn } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as Vn } from "https://cdn.jsdelivr.net/npm/seedrandom/+esm";
async function zn({ user: r, weight: d = 1 }) {
    let t = "q-copilot-data-transform"
        , i = "GitHub Copilot Data Transformation"
        , n = Vn(`${r.email}#${t}`)
        , p = A(Hn, n)
        , c = Fn`
    <div class="mb-3">
      <h4>Case Study: Using GitHub Copilot for Code Generation</h4>
      <p>
        <strong>Scenario:</strong> Your team uses GitHub Copilot to accelerate development by generating data
        transformation functions. You need to demonstrate that Copilot can generate working code from natural language
        descriptions.
      </p>

      <ol>
        <li>
          Open Visual Studio Code with
          <a href="https://marketplace.visualstudio.com/items?itemName=GitHub.copilot" target="_blank"
            >GitHub Copilot extension</a
          >
          installed and activated.
        </li>
        <li>Create a new JavaScript file (e.g., <code>transform.js</code>).</li>
        <li>
          Write a comment describing the function:
          <pre class="border p-2 my-2 bg-light"><code>// Function that ${p.description}</code></pre>
        </li>
        <li>
          Let GitHub Copilot suggest the function implementation. Accept the suggestion and test it with the provided
          data.
        </li>
        <li>Paste the working function code below.</li>
      </ol>

      <div class="alert alert-info">
        <strong>Test Data:</strong>
        <pre class="mb-0"><code>${JSON.stringify(p.testData, null, 2)}</code></pre>
        <small class="text-muted d-block mt-2"
          >Your function should process this data and return the correctly transformed result.</small
        >
      </div>

      <div class="mt-3">
        <label for="${t}" class="form-label">Paste the JavaScript function generated by GitHub Copilot</label>
        <textarea
          class="form-control font-monospace"
          id="${t}"
          name="${t}"
          rows="12"
          placeholder="function transform(data) {
  // Your Copilot-generated code here
  return result;
}"
        ></textarea>
        <div class="form-text">
          Paste the complete function that ${p.description}. The function should accept the test data as a parameter.
        </div>
      </div>

      <p class="text-muted mt-3">
        <strong>Tips:</strong>
        <br />
        • Write a clear comment describing what the function should do
        <br />
        • Wait for Copilot to suggest the implementation (usually appears in gray text)
        <br />
        • Press Tab to accept the suggestion
        <br />
        • Test the function with the provided data before submitting
      </p>
    </div>
  `;
    return {
        id: t,
        title: i,
        weight: d,
        question: c,
        answer: async s => {
            if (!s || s.trim().length < 20)
                throw new Error("Function code is required and must be at least 20 characters");
            let l = String(s).trim();
            if (!l.match(/function|=>\s*{|const\s+\w+\s*=/i))
                throw new Error("Response must contain a valid JavaScript function");
            try {
                let o = async function () { }
                    .constructor
                    , u = await new o("data", `
        ${l}
        
        // Try to find and call the function
        const functionNames = Object.keys(this).filter(k => typeof this[k] === 'function');
        if (functionNames.length > 0) {
          const fn = this[functionNames[0]];
          return fn(data);
        }
        
        // Try to execute if it's an arrow function or expression
        try {
          return (${l})(data);
        } catch {
          // Try wrapping in a function
          const fn = new Function('data', 'return (' + ${JSON.stringify(l)} + ')(data)');
          return fn(data);
        }
      `).call({}, p.testData);
                if (!p.validate(u))
                    throw new Error(`Function output doesn't match expected result. Expected: ${JSON.stringify(p.expected)}, Got: ${JSON.stringify(u)}`);
                return !0
            } catch (o) {
                throw o.message.includes("Expected:") ? o : new Error(`Function execution failed: ${o.message}. Make sure your function is syntactically correct and handles the test data properly.`)
            }
        }
    }
}
var Hn, lt = j(() => {
    "use strict";
    F();
    Hn = [{
        id: "group-sum",
        description: "groups array of objects by 'category' field and sums their 'amount' values",
        testData: [{
            category: "food",
            amount: 50
        }, {
            category: "travel",
            amount: 100
        }, {
            category: "food",
            amount: 30
        }, {
            category: "travel",
            amount: 75
        }],
        expected: {
            food: 80,
            travel: 175
        },
        validate: r => JSON.stringify(r) === JSON.stringify({
            food: 80,
            travel: 175
        })
    }, {
        id: "flatten-nested",
        description: "flattens a nested array structure into a single-level array",
        testData: [1, [2, 3], [4, [5, 6]], 7],
        expected: [1, 2, 3, 4, 5, 6, 7],
        validate: r => JSON.stringify(r) === JSON.stringify([1, 2, 3, 4, 5, 6, 7])
    }, {
        id: "filter-unique",
        description: "removes duplicate values from an array while preserving order",
        testData: [1, 2, 3, 2, 4, 1, 5, 3],
        expected: [1, 2, 3, 4, 5],
        validate: r => JSON.stringify(r) === JSON.stringify([1, 2, 3, 4, 5])
    }, {
        id: "pivot-data",
        description: "converts array of {name, value} objects into an object with name as keys",
        testData: [{
            name: "a",
            value: 10
        }, {
            name: "b",
            value: 20
        }, {
            name: "c",
            value: 30
        }],
        expected: {
            a: 10,
            b: 20,
            c: 30
        },
        validate: r => JSON.stringify(r) === JSON.stringify({
            a: 10,
            b: 20,
            c: 30
        })
    }, {
        id: "count-frequency",
        description: "counts frequency of each item in an array",
        testData: ["apple", "banana", "apple", "orange", "banana", "apple"],
        expected: {
            apple: 3,
            banana: 2,
            orange: 1
        },
        validate: r => JSON.stringify(r) === JSON.stringify({
            apple: 3,
            banana: 2,
            orange: 1
        })
    }, {
        id: "merge-objects",
        description: "deeply merges two objects, with second object values taking precedence",
        testData: [{
            a: 1,
            b: {
                c: 2,
                d: 3
            }
        }, {
            b: {
                c: 4,
                e: 5
            },
            f: 6
        }],
        expected: {
            a: 1,
            b: {
                c: 4,
                d: 3,
                e: 5
            },
            f: 6
        },
        validate: r => JSON.stringify(r) === JSON.stringify({
            a: 1,
            b: {
                c: 4,
                d: 3,
                e: 5
            },
            f: 6
        })
    }, {
        id: "extract-nested",
        description: "extracts all 'id' fields from deeply nested object structure",
        testData: {
            id: 1,
            children: [{
                id: 2,
                children: [{
                    id: 3
                }]
            }, {
                id: 4
            }]
        },
        expected: [1, 2, 3, 4],
        validate: r => JSON.stringify(r.sort()) === JSON.stringify([1, 2, 3, 4])
    }, {
        id: "chunk-array",
        description: "splits array into chunks of specified size (size=3)",
        testData: [1, 2, 3, 4, 5, 6, 7, 8],
        expected: [[1, 2, 3], [4, 5, 6], [7, 8]],
        validate: r => JSON.stringify(r) === JSON.stringify([[1, 2, 3], [4, 5, 6], [7, 8]])
    }, {
        id: "transpose-matrix",
        description: "transposes a 2D array (matrix)",
        testData: [[1, 2, 3], [4, 5, 6]],
        expected: [[1, 4], [2, 5], [3, 6]],
        validate: r => JSON.stringify(r) === JSON.stringify([[1, 4], [2, 5], [3, 6]])
    }, {
        id: "sort-objects",
        description: "sorts array of objects by 'priority' field (descending) then by 'name' field (ascending)",
        testData: [{
            name: "task3",
            priority: 2
        }, {
            name: "task1",
            priority: 3
        }, {
            name: "task2",
            priority: 3
        }, {
            name: "task4",
            priority: 1
        }],
        expected: [{
            name: "task1",
            priority: 3
        }, {
            name: "task2",
            priority: 3
        }, {
            name: "task3",
            priority: 2
        }, {
            name: "task4",
            priority: 1
        }],
        validate: r => JSON.stringify(r) === JSON.stringify([{
            name: "task1",
            priority: 3
        }, {
            name: "task2",
            priority: 3
        }, {
            name: "task3",
            priority: 2
        }, {
            name: "task4",
            priority: 1
        }])
    }]
}
);
var ut = {};
M(ut, {
    default: () => Gn
});
import { html as Jn } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
async function ct(r) {
    let t = new TextEncoder().encode(r)
        , i = await crypto.subtle.digest("SHA-256", t);
    return Array.from(new Uint8Array(i)).map(c => c.toString(16).padStart(2, "0")).join("")
}
async function Gn({ user: r, weight: d = 1 }) {
    let t = "q-ai-formula-extract-zipcode"
        , i = "Google Sheets: AI Formula to Extract Zip Codes from Noisy Addresses"
        , n = (0,
            dt.default)(`${r.email}#${t}`)
        , p = ["123 Main St", "456 Oak Avenue", "789 Elm Road", "321 Pine Lane", "654 Maple Drive", "987 Birch Boulevard", "111 Cedar Court", "222 Spruce Way", "333 Willow Circle", "444 Ash Place"]
        , c = ["Springfield", "Riverdale", "Sunnyville", "Oaktown", "Pineville", "Lakewood", "Hillside", "Westchester", "Eastbrook", "Northtown"]
        , e = ["IL", "CA", "TX", "NY", "FL", "PA", "OH", "GA", "NC", "MI"]
        , s = ["62704", "90210", "75001", "10001", "33101", "19101", "43085", "30301", "28202", "48201", "60601", "94105", "77001", "10002", "33102", "19102", "43086", "30302", "28203", "48202"]
        , l = [];
    for (let b = 0; b < 100; b++) {
        let m = p[Math.floor(n() * p.length)]
            , g = c[Math.floor(n() * c.length)]
            , y = e[Math.floor(n() * e.length)]
            , x = Math.floor(n() * s.length)
            , _ = s[x]
            , v = `${m}, ${g}, ${y}`
            , S = Math.floor(n() * 6);
        if (S === 0)
            v = `Ship to: ${v} ${_}`;
        else if (S === 1)
            v = `${v} ${_}. Please deliver after 5pm.`;
        else if (S === 2)
            v = `Deliver to ${m}, postal code is ${_}, in ${g}, ${y}`;
        else if (S === 3) {
            v = `${m}, ${g}, ${y}. No postal code available.`,
                l.push(v);
            continue
        } else if (S === 4) {
            v = `${m}, ${g}, ${y}. International destination.`,
                l.push(v);
            continue
        } else
            v = `${m}, ${g}, ${y} ${_}`;
        l.push(v)
    }
    let a = l.map(b => {
        let m = b.match(/\b\d{5}\b/);
        return m ? m[0] : "N/A"
    }
    ).join(",")
        , u = await ct(a)
        , h = `address
` + l.map(b => `"${b}"`).join(`
`)
        , I = new Blob([h], {
            type: "text/csv"
        })
        , w = URL.createObjectURL(I)
        , f = Jn`
    <p>
      <strong>Scenario:</strong> You are a logistics analyst working with messy, real-world shipping data. You need to extract zip codes from 100 addresses with varying formats and quality.
    </p>
    <p>
      <strong>Challenge:</strong> Some addresses have extra text, some have no zip code, and some have inconsistent formatting. You must use the =AI() formula in Google Sheets to handle this complexity.
    </p>
    <p><strong>Instructions:</strong></p>
    <ol>
      <li>Download your personalized CSV file: <a href="${w}" download="addresses_${r.email}.csv">addresses_${r.email}.csv</a></li>
      <li>Import the CSV into Google Sheets.</li>
      <li>In column B, use the =AI() formula to extract the zip code (or postal code) from each address. If no zip code exists, return "N/A".</li>
      <li>Example formula: <code>=AI("Extract the zip code (or postal code) from this address. If none exists, return N/A: " & A2)</code></li>
      <li>Fill down the formula for all 100 rows (B2:B101).</li>
      <li>In a new cell, concatenate all your results: <code>=TEXTJOIN(",", TRUE, B2:B101)</code></li>
      <li>Paste the concatenated result into the answer box below.</li>
    </ol>

    <div class="mb-3">
      <label for="${t}" class="form-label">
        Paste your concatenated zip code results here
      </label>
      <textarea class="form-control" id="${t}" name="${t}" rows="4" placeholder="e.g., 62704,N/A,75001,90210,..." required></textarea>
    </div>
  `;
    return {
        id: t,
        title: i,
        weight: d,
        description: "Download a CSV of 100 noisy addresses with varying formats. Use the =AI() formula in Google Sheets to extract zip codes, handling missing data and inconsistent formats. Concatenate results and submit.",
        question: f,
        answer: async b => {
            let m = b.trim();
            if (await ct(m) === u || m === a)
                return !0;
            throw new Error("Zip code extraction does not match expected results. Please verify your =AI() formula and results.")
        }
        ,
        tags: ["google sheets", "ai formula", "data extraction", "noisy data", "wrangle"]
    }
}
var dt, mt = j(() => {
    "use strict";
    dt = O(N(), 1)
}
);
var pt = {};
M(pt, {
    default: () => Bn
});
import { html as Un } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
async function Bn({ weight: r = 1 }) {
    let d = "q-fastapi-sentiment-batch"
        , t = "FastAPI Batch Sentiment Analysis"
        , i = [{
            text: "I absolutely love this product, it changed my life!",
            sentiment: "happy"
        }, {
            text: "This is the worst experience I've ever had.",
            sentiment: "sad"
        }, {
            text: "The weather today is quite average.",
            sentiment: "neutral"
        }, {
            text: "I'm so excited about my upcoming vacation!",
            sentiment: "happy"
        }, {
            text: "I lost my favorite book and I'm heartbroken.",
            sentiment: "sad"
        }, {
            text: "The meeting is scheduled for 3 PM.",
            sentiment: "neutral"
        }, {
            text: "This movie brought tears of joy to my eyes.",
            sentiment: "happy"
        }, {
            text: "I failed my exam and feel terrible about it.",
            sentiment: "sad"
        }, {
            text: "The package arrived on time.",
            sentiment: "neutral"
        }, {
            text: "Winning the competition was a dream come true!",
            sentiment: "happy"
        }, {
            text: "My pet passed away yesterday.",
            sentiment: "sad"
        }, {
            text: "The report contains 50 pages.",
            sentiment: "neutral"
        }, {
            text: "I'm thrilled to announce our engagement!",
            sentiment: "happy"
        }, {
            text: "The project was rejected by the committee.",
            sentiment: "sad"
        }, {
            text: "The store opens at 9 AM.",
            sentiment: "neutral"
        }, {
            text: "Best day ever! Everything went perfectly!",
            sentiment: "happy"
        }, {
            text: "I'm devastated by the news.",
            sentiment: "sad"
        }, {
            text: "The temperature is 72 degrees.",
            sentiment: "neutral"
        }, {
            text: "I can't stop smiling after hearing that!",
            sentiment: "happy"
        }, {
            text: "Nobody showed up to my birthday party.",
            sentiment: "sad"
        }, {
            text: "The file is saved in the documents folder.",
            sentiment: "neutral"
        }, {
            text: "This is amazing! I'm so grateful!",
            sentiment: "happy"
        }, {
            text: "I regret making that decision.",
            sentiment: "sad"
        }, {
            text: "The train departs at 6:30 PM.",
            sentiment: "neutral"
        }, {
            text: "I feel fantastic today!",
            sentiment: "happy"
        }, {
            text: "The company announced massive layoffs.",
            sentiment: "sad"
        }, {
            text: "There are 12 items in the list.",
            sentiment: "neutral"
        }, {
            text: "This is exactly what I was hoping for!",
            sentiment: "happy"
        }, {
            text: "I'm disappointed with the results.",
            sentiment: "sad"
        }, {
            text: "The conference room is on the third floor.",
            sentiment: "neutral"
        }, {
            text: "I'm overjoyed with this opportunity!",
            sentiment: "happy"
        }, {
            text: "The diagnosis was worse than expected.",
            sentiment: "sad"
        }, {
            text: "The document is 10 pages long.",
            sentiment: "neutral"
        }, {
            text: "What a wonderful surprise!",
            sentiment: "happy"
        }, {
            text: "I feel lonely and abandoned.",
            sentiment: "sad"
        }, {
            text: "The meeting will last 2 hours.",
            sentiment: "neutral"
        }, {
            text: "I'm so proud of what we accomplished!",
            sentiment: "happy"
        }, {
            text: "Everything is falling apart.",
            sentiment: "sad"
        }, {
            text: "The website has three main sections.",
            sentiment: "neutral"
        }, {
            text: "This is the happiest moment of my life!",
            sentiment: "happy"
        }, {
            text: "I'm struggling with depression.",
            sentiment: "sad"
        }, {
            text: "The office is located downtown.",
            sentiment: "neutral"
        }, {
            text: "I'm delighted with the service!",
            sentiment: "happy"
        }, {
            text: "The relationship ended badly.",
            sentiment: "sad"
        }, {
            text: "The system requires an update.",
            sentiment: "neutral"
        }, {
            text: "I'm blessed to have such wonderful friends!",
            sentiment: "happy"
        }, {
            text: "I feel hopeless about the situation.",
            sentiment: "sad"
        }, {
            text: "The price is $50.",
            sentiment: "neutral"
        }, {
            text: "This is pure bliss!",
            sentiment: "happy"
        }, {
            text: "I'm crying because of the pain.",
            sentiment: "sad"
        }, {
            text: "The button is on the left side.",
            sentiment: "neutral"
        }, {
            text: "I'm ecstatic about the promotion!",
            sentiment: "happy"
        }, {
            text: "My heart is broken.",
            sentiment: "sad"
        }, {
            text: "The application is available for download.",
            sentiment: "neutral"
        }, {
            text: "Life is beautiful!",
            sentiment: "happy"
        }, {
            text: "I'm miserable and exhausted.",
            sentiment: "sad"
        }, {
            text: "The event starts at noon.",
            sentiment: "neutral"
        }, {
            text: "I'm radiating with happiness!",
            sentiment: "happy"
        }, {
            text: "The accident left me traumatized.",
            sentiment: "sad"
        }, {
            text: "The folder contains 25 files.",
            sentiment: "neutral"
        }, {
            text: "I'm jumping for joy!",
            sentiment: "happy"
        }, {
            text: "I feel utterly defeated.",
            sentiment: "sad"
        }, {
            text: "The password must be 8 characters.",
            sentiment: "neutral"
        }, {
            text: "This exceeded all my expectations!",
            sentiment: "happy"
        }, {
            text: "I'm drowning in sorrow.",
            sentiment: "sad"
        }, {
            text: "The form has five fields.",
            sentiment: "neutral"
        }, {
            text: "I'm on cloud nine!",
            sentiment: "happy"
        }, {
            text: "Everything I touch turns to failure.",
            sentiment: "sad"
        }, {
            text: "The menu has four options.",
            sentiment: "neutral"
        }, {
            text: "I'm bursting with excitement!",
            sentiment: "happy"
        }, {
            text: "I feel empty inside.",
            sentiment: "sad"
        }, {
            text: "The course lasts 6 weeks.",
            sentiment: "neutral"
        }, {
            text: "Today is the best day of my life!",
            sentiment: "happy"
        }, {
            text: "I'm suffering from anxiety.",
            sentiment: "sad"
        }, {
            text: "The building has 10 floors.",
            sentiment: "neutral"
        }, {
            text: "I'm incredibly fortunate!",
            sentiment: "happy"
        }, {
            text: "I lost everything in the fire.",
            sentiment: "sad"
        }, {
            text: "The session duration is 30 minutes.",
            sentiment: "neutral"
        }, {
            text: "I'm grinning from ear to ear!",
            sentiment: "happy"
        }, {
            text: "I'm consumed by grief.",
            sentiment: "sad"
        }, {
            text: "The table has 4 columns.",
            sentiment: "neutral"
        }, {
            text: "This is a dream come true!",
            sentiment: "happy"
        }, {
            text: "I'm worried sick about this.",
            sentiment: "sad"
        }, {
            text: "The deadline is next Friday.",
            sentiment: "neutral"
        }, {
            text: "I'm absolutely thrilled!",
            sentiment: "happy"
        }, {
            text: "I'm shattered by the betrayal.",
            sentiment: "sad"
        }, {
            text: "The parking lot has 100 spaces.",
            sentiment: "neutral"
        }, {
            text: "I feel alive and energized!",
            sentiment: "happy"
        }, {
            text: "I'm overwhelmed with sadness.",
            sentiment: "sad"
        }, {
            text: "The manual is 200 pages.",
            sentiment: "neutral"
        }, {
            text: "I'm celebrating this wonderful news!",
            sentiment: "happy"
        }, {
            text: "I'm haunted by regret.",
            sentiment: "sad"
        }, {
            text: "The warranty lasts one year.",
            sentiment: "neutral"
        }, {
            text: "I'm filled with pure joy!",
            sentiment: "happy"
        }, {
            text: "I'm crushed by disappointment.",
            sentiment: "sad"
        }, {
            text: "The server is hosted in the cloud.",
            sentiment: "neutral"
        }, {
            text: "This is absolutely spectacular!",
            sentiment: "happy"
        }, {
            text: "I'm burdened by endless problems.",
            sentiment: "sad"
        }, {
            text: "The API accepts JSON requests.",
            sentiment: "neutral"
        }]
        , n = async c => {
            if (!c || !c.trim().startsWith("http"))
                throw new Error("Please provide a valid HTTP URL (e.g., http://localhost:8000)");
            let e = c.trim().replace(/\/$/, "")
                , l = me([...i], Math.random).slice(0, 10)
                , o = 0
                , a = [];
            try {
                let u = l.map(w => w.text)
                    , h = await fetch(`${e}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            sentences: u
                        })
                    });
                if (!h.ok)
                    throw new Error(`HTTP ${h.status}: ${h.statusText}`);
                let I = await h.json();
                if (!I.results || !Array.isArray(I.results))
                    throw new Error("Response must contain 'results' array");
                if (I.results.length !== 10)
                    throw new Error(`Expected 10 results but got ${I.results.length}`);
                for (let w = 0; w < l.length; w++) {
                    let f = l[w]
                        , b = I.results[w];
                    if (!b || !b.sentence || !b.sentiment) {
                        a.push(`Result ${w + 1}: Missing 'sentence' or 'sentiment' field`);
                        continue
                    }
                    if (b.sentence !== f.text) {
                        a.push(`Result ${w + 1}: Sentence mismatch`);
                        continue
                    }
                    let m = b.sentiment.toLowerCase().trim();
                    if (!["happy", "sad", "neutral"].includes(m)) {
                        a.push(`Result ${w + 1}: Invalid sentiment "${b.sentiment}"`);
                        continue
                    }
                    m === f.sentiment ? o++ : a.push(`Result ${w + 1}: Expected "${f.sentiment}" but got "${m}"`)
                }
            } catch (u) {
                throw new Error(`Request failed: ${u.message}`)
            }
            if (o < 7)
                throw new Error(`Only ${o}/10 test cases passed (need at least 7). Errors: ${a.slice(0, 5).join("; ")}`);
            return !0
        }
        , p = Un`
    <h3>Create a FastAPI endpoint for batch sentiment analysis</h3>

    <p>
      Build a <code>POST</code> endpoint at <code>/sentiment</code> that accepts multiple sentences and returns their
      sentiments. You can use any method (Ollama, rule-based, ML model, etc.).
    </p>

    <h4>Requirements:</h4>
    <ul>
      <li>Accept JSON with array of sentences: <code>{"sentences": ["I love this!", "I'm sad.", ...]}</code></li>
      <li>
        Return JSON with results array:
        <code>{"results": [{"sentence": "I love this!", "sentiment": "happy"}, ...]}</code>
      </li>
      <li>Valid sentiments: <code>"happy"</code>, <code>"sad"</code>, or <code>"neutral"</code></li>
      <li>Return all sentences in the same order as input</li>
      <li>Pass at least 7 out of 10 test cases to get full score</li>
    </ul>

    <h4>Example Request:</h4>
    <pre><code>POST http://localhost:8000/sentiment
Content-Type: application/json

{
  "sentences": [
    "I love this product!",
    "This is terrible.",
    "The meeting is at 3 PM."
  ]
}</code></pre>

    <h4>Example Response:</h4>
    <pre><code>{
  "results": [
    {"sentence": "I love this product!", "sentiment": "happy"},
    {"sentence": "This is terrible.", "sentiment": "sad"},
    {"sentence": "The meeting is at 3 PM.", "sentiment": "neutral"}
  ]
}</code></pre>

    <div class="mb-3">
      <label for="${d}" class="form-label">Enter your FastAPI URL:</label>
      <input type="text" class="form-control" id="${d}" name="${d}" placeholder="http://localhost:8000" required />
    </div>

    <p class="text-muted"><em>Note: The evaluation will test 10 random sentences in a single POST request.</em></p>
  `;
    return {
        id: d,
        title: t,
        question: p,
        answer: n,
        weight: r
    }
}
var ht = j(() => {
    "use strict";
    F()
}
);
var yt = {};
M(yt, {
    default: () => Yn
});
import { html as Wn } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
async function gt(r) {
    let t = new TextEncoder().encode(r)
        , i = await crypto.subtle.digest("SHA-256", t);
    return Array.from(new Uint8Array(i)).map(p => p.toString(16).padStart(2, "0")).join("")
}
async function Yn({ user: r, weight: d = 1 }) {
    let t = "q-shell-csv-log-parsing"
        , i = "Shell: Parse and aggregate messy CSV transaction logs"
        , n = (0,
            ft.default)(`${r.email}#${t}`)
        , p = ["Electronics", "Groceries", "Clothing", "Books", "Furniture", "Sports", "Beauty", "Toys"]
        , c = ["TechMart", "FreshMart", "StyleShop", "BookWorld", "FurniturePro", "SportZone", "BeautyHub", "ToyStore", "MegaMart", "QuickShop"]
        , e = ["NYC", "LA", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego"]
        , s = [];
    for (let b = 0; b < 1e5 + Math.floor(n() * 5e3); b++) {
        let m = `2025-0${Math.floor(n() * 8) + 1}-${String(Math.floor(n() * 28) + 1).padStart(2, "0")}`, g = (n() * 500 + 10).toFixed(2), y = p[Math.floor(n() * p.length)], x = c[Math.floor(n() * c.length)], _ = e[Math.floor(n() * e.length)], v = `TXN${String(b + 1).padStart(6, "0")}`, S = n(), $;
        S < .2 ? $ = `${v}|${m}|${g}||${_}` : S < .35 ? $ = `${v}  ,  ${m},  ${g}  , ${y}  , ${x}  , ${_}` : S < .5 ? $ = `${v}|${m}|${g}|${y}|${x}|${_}|EXTRA|JUNK` : S < .65 ? $ = `${v}|${m},${g}|${y},${x}|${_}` : $ = `${v}|${m}|${g}|${y}|${x}|${_}`,
            s.push($)
    }
    let l = `TransactionID|Date|Amount|Category|Merchant|City
` + s.join(`
`)
        , o = {};
    s.forEach(b => {
        let m = b.split(/[|,]/);
        if (m.length >= 4 && m[3].trim()) {
            let g = m[3].trim()
                , y = parseFloat(m[2]);
            isNaN(y) || (o[g] = (o[g] || 0) + y)
        }
    }
    );
    let u = Object.keys(o).sort().map(b => {
        let m = o[b].toFixed(2);
        return `${b}:${m}`
    }
    ).join("|")
        , h = await gt(u)
        , I = new Blob([l], {
            type: "text/csv"
        })
        , w = URL.createObjectURL(I)
        , f = Wn`
    <p>
      <strong>Scenario:</strong> You are a data analyst working with messy transaction logs from multiple sources.
      The data has inconsistent formatting, missing fields, and mixed separators. You need to clean and aggregate
      the data.
    </p>

    <p><strong>Task:</strong> Download the CSV file and use shell tools to:</p>
    <ol>
      <li>Handle inconsistent separators (pipes and commas)</li>
      <li>Clean up extra whitespace</li>
      <li>Filter out rows with missing category data</li>
      <li>Calculate the total transaction amount for EACH category</li>
      <li>Output results in format: <code>Category:Amount|Category:Amount|...</code> (sorted alphabetically by category, amounts must have exactly 2 decimal places, no scientific notation)</li>
    </ol>

    <p>
      <strong>Suggested approach:</strong> Use <code>sed</code>, <code>awk</code>, <code>cut</code>, <code>sort</code>,
      and <code>uniq</code> to clean and aggregate.
    </p>

    <p>
      Download:
      <a href="${w}" download="transactions_${r.email}.csv" class="btn btn-sm btn-outline-primary">
        transactions_${r.email}.csv
      </a>
    </p>

    <div class="mb-3">
      <label for="${t}" class="form-label">
        Paste the results (format: <code>Category:Total|Category:Total|...</code>)
      </label>
      <textarea class="form-control" id="${t}" name="${t}" rows="4" placeholder="e.g., Beauty:1234.56|Books:2345.67|..." required></textarea>
    </div>
  `;
    return {
        id: t,
        title: i,
        weight: d,
        description: "Download a CSV with 100,000+ messy transaction logs with inconsistent formatting. Use shell tools to clean and aggregate amounts by category.",
        question: f,
        answer: async b => {
            let m = b.trim();
            if (await gt(m) === h || m === u)
                return !0;
            throw new Error("Aggregation does not match expected results. Please verify your cleaning and aggregation logic. Expected format: Category1:Amount1|Category2:Amount2|... (sorted alphabetically)")
        }
        ,
        tags: ["shell", "awk", "sed", "csv", "data cleaning", "aggregation", "wrangle"]
    }
}
var ft, wt = j(() => {
    "use strict";
    ft = O(N(), 1)
}
);
var It = {};
M(It, {
    default: () => Zn
});
import Xn from "https://cdn.jsdelivr.net/npm/jszip@3/+esm";
import { html as Kn } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
async function bt(r) {
    let t = new TextEncoder().encode(r)
        , i = await crypto.subtle.digest("SHA-256", t);
    return Array.from(new Uint8Array(i)).map(p => p.toString(16).padStart(2, "0")).join("")
}
async function Zn({ user: r, weight: d = 1 }) {
    let t = "q-shell-json-extraction"
        , i = "Shell: Extract and flatten nested JSON from multiple files"
        , n = (0,
            vt.default)(`${r.email}#${t}`)
        , p = new Xn
        , c = []
        , e = 50 + Math.floor(n() * 30);
    for (let w = 0; w < e; w++) {
        let f = []
            , b = 5 + Math.floor(n() * 8);
        for (let m = 0; m < b; m++) {
            let g = `USR${String(Math.floor(n() * 1e4)).padStart(5, "0")}`
                , y = `User${Math.floor(n() * 1e3)}`
                , x = `${y.toLowerCase()}@example.com`
                , _ = {
                    id: g,
                    profile: {
                        name: y,
                        contact: {
                            email: x,
                            phone: `555-${String(Math.floor(n() * 1e4)).padStart(4, "0")}`
                        }
                    },
                    metrics: {
                        score: Math.floor(n() * 100),
                        level: Math.floor(n() * 10) + 1
                    }
                };
            f.push(_),
                c.push({
                    ..._,
                    file: `file_${w}.json`
                })
        }
        p.file(`file_${w}.json`, JSON.stringify(f, null, 2))
    }
    let s = {};
    c.forEach(w => {
        let f = w.metrics.level;
        s[f] = (s[f] || 0) + 1
    }
    );
    let o = Object.keys(s).sort((w, f) => parseInt(w) - parseInt(f)).map(w => `level${w}:${s[w]}`).join("|")
        , a = await bt(o)
        , u = await p.generateAsync({
            type: "blob"
        })
        , h = URL.createObjectURL(u)
        , I = Kn`
    <p>
      <strong>Scenario:</strong> You have a ZIP archive containing 50+ JSON files from an API. Each file contains
      nested user records with deeply nested profile and metrics data. You need to extract and aggregate the data.
    </p>

    <p><strong>Task:</strong> Download the ZIP and use shell tools to:</p>
    <ol>
      <li>Extract all JSON files from the ZIP</li>
      <li>Use <code>jq</code> to extract the nested <code>metrics.level</code> field from all records</li>
      <li>Count how many records have each level (1-10)</li>
      <li>Output results in format: <code>level1:count|level2:count|...</code> (sorted by level number)</li>
    </ol>

    <p>
      <strong>Suggested approach:</strong> Use <code>unzip</code>, <code>find</code>, <code>jq</code>,
      <code>sort</code>, and <code>uniq -c</code> to process and aggregate.
    </p>

    <p>
      Download:
      <a href="${h}" download="api_data_${r.email}.zip" class="btn btn-sm btn-outline-primary">
        api_data_${r.email}.zip
      </a>
    </p>

    <div class="mb-3">
      <label for="${t}" class="form-label">
        Paste the results (format: <code>level1:count|level2:count|...</code>)
      </label>
      <textarea class="form-control" id="${t}" name="${t}" rows="4" placeholder="e.g., level1:23|level2:45|level3:12|..." required></textarea>
    </div>
  `;
    return {
        id: t,
        title: i,
        weight: d,
        description: "Download a ZIP with 50+ JSON files containing nested user records. Use jq to extract and aggregate metrics.level field.",
        question: I,
        answer: async w => {
            let f = w.trim();
            if (await bt(f) === a || f === o)
                return !0;
            throw new Error("JSON extraction and aggregation does not match expected results. Please verify your jq extraction and counting logic. Expected format: level1:count|level2:count|... (sorted by level number)")
        }
        ,
        tags: ["shell", "jq", "json", "extraction", "aggregation", "wrangle"]
    }
}
var vt, xt = j(() => {
    "use strict";
    vt = O(N(), 1)
}
);
var $t = {};
M($t, {
    default: () => ea
});
import { html as Qn } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
async function kt(r) {
    let t = new TextEncoder().encode(r)
        , i = await crypto.subtle.digest("SHA-256", t);
    return Array.from(new Uint8Array(i)).map(p => p.toString(16).padStart(2, "0")).join("")
}
async function ea({ user: r, weight: d = 1 }) {
    let t = "q-shell-text-aggregation"
        , i = "Shell: Deduplicate and aggregate semi-structured address data"
        , n = (0,
            _t.default)(`${r.email}#${t}`)
        , p = ["Main St", "Oak Ave", "Elm Rd", "Pine Ln", "Maple Dr", "Cedar Ct", "Birch Blvd", "Spruce Way", "Willow Cir", "Ash Pl", "Juniper Way", "Magnolia Dr"]
        , c = ["Springfield", "Riverdale", "Sunnyville", "Oaktown", "Pineville", "Lakewood", "Hillside", "Westchester", "Eastbrook", "Northtown"]
        , e = ["IL", "CA", "TX", "NY", "FL", "PA", "OH", "GA", "NC", "MI"]
        , s = []
        , l = new Set
        , o = 1e3 + Math.floor(n() * 500);
    for (let m = 0; m < o; m++) {
        let g = Math.floor(n() * 999) + 1
            , y = p[Math.floor(n() * p.length)]
            , x = c[Math.floor(n() * c.length)]
            , _ = e[Math.floor(n() * e.length)]
            , v = String(Math.floor(n() * 9e4) + 1e4)
            , S = `${g} ${y}, ${x}, ${_} ${v}`;
        l.add(S);
        let $ = n(), C;
        $ < .2 ? C = `${g}  ${y},  ${x},  ${_}  ${v}` : $ < .4 ? C = `${g} ${y.toUpperCase()}, ${x.toLowerCase()}, ${_} ${v}` : $ < .6 ? C = `${g} ${y} ${x} ${_} ${v}` : $ < .8 ? C = `Address: ${g} ${y}, ${x}, ${_} ${v} (VALID)` : C = S,
            s.push(C)
    }
    let u = s.sort(() => n() - .5).join(`
`)
        , h = `unique_addresses:${l.size}`
        , I = await kt(h)
        , w = new Blob([u], {
            type: "text/plain"
        })
        , f = URL.createObjectURL(w)
        , b = Qn`
    <p>
      <strong>Scenario:</strong> You have a large text file with 1000+ semi-structured address lines. The data has
      many duplicate entries with slight variations in formatting (extra spaces, capitalization, extra text). You need
      to deduplicate and aggregate the data.
    </p>

    <p><strong>Task:</strong> Download the text file and use shell tools to:</p>
    <ol>
      <li>Extract the core address from each line (handling extra text, spaces, and capitalization)</li>
      <li>Normalize addresses to a canonical format</li>
      <li>Deduplicate and count unique addresses</li>
      <li>Output results in format: <code>unique_addresses:count</code></li>
    </ol>

    <p>
      <strong>Suggested approach:</strong> Use <code>grep</code>, <code>sed</code>, <code>tr</code> to normalize,
      then <code>sort</code>, <code>uniq</code> to deduplicate and count.
    </p>

    <p>
      Download:
      <a href="${f}" download="addresses_${r.email}.txt" class="btn btn-sm btn-outline-primary">
        addresses_${r.email}.txt
      </a>
    </p>

    <div class="mb-3">
      <label for="${t}" class="form-label">
        Paste the results (format: <code>unique_addresses:count</code>)
      </label>
      <input type="text" class="form-control" id="${t}" name="${t}" placeholder="e.g., unique_addresses:245" required />
    </div>
  `;
    return {
        id: t,
        title: i,
        weight: d,
        description: "Download a text file with 1000+ semi-structured address lines with duplicates and formatting variations. Normalize, deduplicate, and count unique addresses.",
        question: b,
        answer: async m => {
            let g = m.trim();
            if (await kt(g) === I || g === h)
                return !0;
            throw new Error("Unique address count does not match expected results. Please verify your normalization and deduplication logic. Expected format: unique_addresses:count")
        }
        ,
        tags: ["shell", "grep", "sed", "sort", "uniq", "text processing", "deduplication", "wrangle"]
    }
}
var _t, St = j(() => {
    "use strict";
    _t = O(N(), 1)
}
);
async function At(r) {
    return async d => {
        let { expectedHash: t, totalSum: i } = await he(r);
        if (!d || typeof d != "string")
            throw new Error("Please submit a valid hash.");
        let n = d.trim().toLowerCase();
        if (n === t || n === i.toString())
            return !0;
        throw new Error("Incorrect hash. Make sure you sum all valid target values, output ONLY the sum (no newlines) and calculate its SHA-256 hash.")
    }
}
var pe, he, Ct = j(() => {
    "use strict";
    pe = O(N(), 1),
        he = async r => {
            let d = "q-recursive-corrupted-json-server"
                , t = (0,
                    pe.default)(`${r?.email ?? ""}#${d}`)
                , i = `metric_${Math.floor(t() * 1e4)}`
                , n = 1e5
                , p = 0
                , c = function* () {
                    for (let o = 0; o < n; o++) {
                        let a = t() < .2
                            , u = t() < .1
                            , h = Math.floor(t() * 1e3)
                            , I = Math.floor(t() * 1e5);
                        if (u) {
                            yield `Exception in thread "main" java.lang.RuntimeException: Uncaught exception at line ${I}
	at com.example.service.DataProcessor.process(DataProcessor.java:45)
	at com.example.service.Worker.run(Worker.java:12)
	at java.base/java.lang.Thread.run(Thread.java:834)
`;
                            continue
                        }
                        let w = `{"timestamp":"2026-02-23T12:${String(Math.floor(t() * 60)).padStart(2, "0")}:${String(Math.floor(t() * 60)).padStart(2, "0")}Z","level":"INFO","message":"Processed event","context":{"system":{"process":{"metrics":{"${i}":${h}}}}}}`;
                        if (a) {
                            let f = Math.floor(t() * 5);
                            f === 0 ? w = w.replace('"level"', "level") : f === 1 ? w = w.replace(':{"system":', ':"system":') : f === 2 ? w = w.replace('"Processed event"', `"Processed
stack.trace.Exception(Trace.java:10)
event"`) : f === 3 ? w = w.replace('{"timestamp":', '{"timestamp"') : f === 4 && (w += "}")
                        } else
                            p += h;
                        yield w + `
`
                    }
                };
            for (let o of c())
                ;
            let e = p.toString(), s = new TextEncoder, l;
            if (typeof crypto < "u" && crypto.subtle) {
                let o = s.encode(e)
                    , a = await crypto.subtle.digest("SHA-256", o);
                l = Array.from(new Uint8Array(a)).map(h => h.toString(16).padStart(2, "0")).join("")
            } else
                l = e;
            return {
                targetField: i,
                lineCount: n,
                totalSum: p,
                expectedHash: l,
                generator: function* () {
                    let o = (0,
                        pe.default)(`${r?.email ?? ""}#${d}`);
                    Math.floor(o() * 1e4);
                    for (let a = 0; a < n; a++) {
                        let u = o() < .2
                            , h = o() < .1
                            , I = Math.floor(o() * 1e3)
                            , w = Math.floor(o() * 1e5);
                        if (h) {
                            yield `Exception in thread "main" java.lang.RuntimeException: Uncaught exception at line ${w}
	at com.example.service.DataProcessor.process(DataProcessor.java:45)
	at com.example.service.Worker.run(Worker.java:12)
	at java.base/java.lang.Thread.run(Thread.java:834)
`;
                            continue
                        }
                        let f = `{"timestamp":"2026-02-23T12:${String(Math.floor(o() * 60)).padStart(2, "0")}:${String(Math.floor(o() * 60)).padStart(2, "0")}Z","level":"INFO","message":"Processed event","context":{"system":{"process":{"metrics":{"${i}":${I}}}}}}`;
                        if (u) {
                            let b = Math.floor(o() * 5);
                            b === 0 ? f = f.replace('"level"', "level") : b === 1 ? f = f.replace(':{"system":', ':"system":') : b === 2 ? f = f.replace('"Processed event"', `"Processed
stack.trace.Exception(Trace.java:10)
event"`) : b === 3 ? f = f.replace('{"timestamp":', '{"timestamp"') : b === 4 && (f += "}")
                        }
                        yield f + `
`
                    }
                }
            }
        }
}
);
var Tt = {};
M(Tt, {
    default: () => aa
});
import ta from "https://cdn.jsdelivr.net/npm/jszip@3/+esm";
import { html as na } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
async function aa({ user: r, weight: d = 1 }) {
    let t = "q-recursive-corrupted-json-server"
        , i = "The Recursive Corrupted JSON Fixer"
        , { targetField: n, generator: p } = await he(r)
        , c = na`
    <p>
      <strong>Scenario:</strong> You've been given a highly nested JSON log file (over ~40MB) that contains random catastrophic schema violations 
      (unquoted keys, missing brackets, raw stack traces inserted in the middle of strings).
    </p>

    <p><strong>Your Task:</strong></p>
    <ol>
      <li>Download the corrupted log file (~40-50MB)</li>
      <li>Write a memory-efficient <code>gawk</code> or Python streaming script to salvage valid JSON records line by line</li>
      <li>Sum the values of the specific deeply nested field <code>${n}</code> across all VALID records</li>
      <li>Do not try to fix or include values from invalid and corrupted JSON records</li>
      <li>Calculate the <strong>SHA-256 hash</strong> of the integer sum, outputted without any trailing newlines.</li>
      <li>Submit only the SHA-256 hash!</li>
    </ol>

    <p>
      <button 
        class="btn btn-primary btn-sm"
        @click=${async e => {
                let s = e.target
                    , l = s.innerHTML;
                try {
                    s.innerHTML = "\u23F3 Generating (might take 5-10 seconds)...",
                        s.disabled = !0;
                    let o = ""
                        , a = p();
                    for (let f = 0; f < 15e4; f++) {
                        let b = a.next();
                        if (b.done)
                            break;
                        o += b.value
                    }
                    let u = new ta;
                    u.file("corrupted_logs.json", o),
                        u.file("README.md", `# Your target field

Sum all valid integers for: \`` + n + "`\n"),
                        s.innerHTML = "\u23F3 Zipping...";
                    let h = await u.generateAsync({
                        type: "blob",
                        compression: "DEFLATE"
                    })
                        , I = URL.createObjectURL(h)
                        , w = document.createElement("a");
                    w.href = I,
                        w.download = "corrupted_logs.zip",
                        document.body.appendChild(w),
                        w.click(),
                        document.body.removeChild(w),
                        URL.revokeObjectURL(I),
                        s.innerHTML = "\u2705 Downloaded!",
                        setTimeout(() => {
                            s.innerHTML = l,
                                s.disabled = !1
                        }
                            , 3e3)
                } catch (o) {
                    console.error(o),
                        s.innerHTML = "\u274C Generation failed: " + o.message,
                        s.disabled = !1
                }
            }
            }
      >
        📥 Download Corrupted Logs (ZIP)
      </button>
    </p>

    <details class="my-3">
      <summary><strong>🔍 Validation Instructions</strong></summary>

      <h6>Shell Calculation:</h6>
      <pre><code># If your sum is 1234567:
echo -n "1234567" | sha256sum

# Output should be submitted exactly as outputted (64 character hex string)</code></pre>

      <h6>Python Calculation:</h6>
      <pre><code>import hashlib
total_sum = 1234567
print(hashlib.sha256(str(total_sum).encode('utf-8')).hexdigest())</code></pre>
    </details>

    <div class="mb-3">
      <label for="${t}" class="form-label">
        <strong>Submit your SHA-256 Hash</strong>
      </label>
      <input
        type="text"
        class="form-control font-monospace"
        id="${t}"
        name="${t}"
        placeholder="e.g. b5d4045c3f466fa91fe2cc6abe79232a1a57cdf104f7a26e716e0a1e2789df78"
        required
      />
      <div class="form-text">
        The hash must be EXACTLY the SHA-256 hash of the integer sum, with no newlines or spaces.
      </div>
    </div>

    <div class="alert alert-info" role="alert">
      <strong>🎓 This question tests your ability to:</strong>
      <ul class="mb-0">
        <li>Process multi-megabyte files in a streaming fashion (without blowing up memory).</li>
        <li>Gracefully handle and discard corrupt data during analytics.</li>
        <li>Aggregate deeply nested fields dynamically.</li>
        <li>Format inputs into precise cryptographic outputs.</li>
      </ul>
    </div>
  `;
    return {
        id: t,
        title: i,
        weight: d,
        question: c,
        answer: await At(r)
    }
}
var Et = j(() => {
    "use strict";
    Ct()
}
);
function ge(r) {
    let d = "q-cross-lingual-entity-disambiguation-server"
        , t = r?.email ?? ""
        , i = (0,
            Pt.default)(`${t}#${d}`)
        , n = 16 + Math.floor(i() * 6)
        , p = ee([...ra], n, i)
        , c = {};
    p.forEach((l, o) => {
        c[l.canonicalName] = `E${String(o + 1).padStart(3, "0")}`
    }
    );
    let e = []
        , s = {};
    for (let l = 0; l < 1e3; l++) {
        let o = `DOC-${String(l + 1).padStart(4, "0")}`, a = A(p, i), u = A(jt, i), h = a.variants[u], I = A(sa[u], i), w = A(ia[u], i), f = A(la, i), b = a.era.match(/(\d+)/g), m;
        if (b && b.length >= 1) {
            let x = parseInt(b[0])
                , _ = b.length >= 2 ? parseInt(b[1]) : x + 50;
            m = x + Math.floor(i() * Math.max(1, _ - x))
        } else
            m = A(Mt, i);
        let g = h;
        if (i() < .08) {
            let x = Math.floor(i() * Math.max(1, g.length - 2)) + 1;
            g = g.slice(0, x) + g[x + 1] + g[x] + g.slice(x + 2)
        }
        let y = `${I} ${g} ${w} (${f}, ${m}).`;
        e.push({
            doc_id: o,
            language: u,
            year: m,
            text: y,
            mentioned_name: g,
            source_region: a.region
        }),
            s[o] = c[a.canonicalName]
    }
    return {
        documents: e,
        selectedEntities: p,
        entityMap: c,
        answerMapping: s,
        languages: jt,
        languageNames: oa
    }
}
async function Dt(r) {
    return async d => {
        let { answerMapping: t } = ge(r);
        if (!d || !d.trim())
            throw new Error("Please paste your CSV mapping.");
        let i = d.trim().split(/\r?\n/)
            , n = i[0].toLowerCase().includes("doc_id") ? 1 : 0
            , p = i.slice(n);
        if (p.length !== 1e3)
            throw new Error(`Expected 1000 data rows, got ${p.length}. Submit one row per document.`);
        let c = 0
            , e = [];
        for (let l of p) {
            let o = l.split(",").map(h => h.trim());
            if (o.length < 2) {
                e.push(`Malformed line: "${l}"`);
                continue
            }
            let [a, u] = o;
            if (!t[a]) {
                e.push(`Unknown doc_id: ${a}`);
                continue
            }
            t[a] === u && c++
        }
        let s = c / 1e3;
        if (s < .95)
            throw new Error(`Accuracy: ${(s * 100).toFixed(1)}% (${c}/1000 correct). Need \u226595%. ${e.length > 0 ? `First issue: ${e[0]}` : ""}`);
        return !0
    }
}
var Pt, jt, oa, ra, sa, ia, la, Mt, Lt = j(() => {
    "use strict";
    Pt = O(N(), 1);
    F();
    jt = ["en", "es", "fr", "de", "it", "pt", "nl", "ru", "pl", "cs", "ar", "zh", "ja", "ko", "tr"],
        oa = {
            en: "English",
            es: "Spanish",
            fr: "French",
            de: "German",
            it: "Italian",
            pt: "Portuguese",
            nl: "Dutch",
            ru: "Russian",
            pl: "Polish",
            cs: "Czech",
            ar: "Arabic",
            zh: "Chinese",
            ja: "Japanese",
            ko: "Korean",
            tr: "Turkish"
        },
        ra = [{
            canonicalName: "John I of Portugal",
            role: "King",
            era: "1357\u20131433",
            region: "Portugal",
            variants: {
                en: "John I",
                es: "Juan I de Portugal",
                fr: "Jean Ier de Portugal",
                de: "Johann I. von Portugal",
                it: "Giovanni I del Portogallo",
                pt: "Jo\xE3o I de Portugal",
                nl: "Jan I van Portugal",
                ru: "\u0416\u0443\u0430\u043D I \u041F\u043E\u0440\u0442\u0443\u0433\u0430\u043B\u044C\u0441\u043A\u0438\u0439",
                pl: "Jan I Portugalski",
                cs: "Jan I. Portugalsk\xFD",
                ar: "\u062C\u0648\u0627\u0648 \u0627\u0644\u0623\u0648\u0644",
                zh: "\u82E5\u6602\u4E00\u4E16",
                ja: "\u30B8\u30E7\u30A2\u30F31\u4E16",
                ko: "\uC8FC\uC559 1\uC138",
                tr: "I. Jo\xE3o"
            }
        }, {
            canonicalName: "John II of Castile",
            role: "King",
            era: "1405\u20131454",
            region: "Castile",
            variants: {
                en: "John II",
                es: "Juan II de Castilla",
                fr: "Jean II de Castille",
                de: "Johann II. von Kastilien",
                it: "Giovanni II di Castiglia",
                pt: "Jo\xE3o II de Castela",
                nl: "Jan II van Castili\xEB",
                ru: "\u0425\u0443\u0430\u043D II \u041A\u0430\u0441\u0442\u0438\u043B\u044C\u0441\u043A\u0438\u0439",
                pl: "Jan II Kastylijski",
                cs: "Jan II. Kastilsk\xFD",
                ar: "\u062E\u0648\u0627\u0646 \u0627\u0644\u062B\u0627\u0646\u064A",
                zh: "\u80E1\u5B89\u4E8C\u4E16",
                ja: "\u30D5\u30A2\u30F32\u4E16",
                ko: "\uD6C4\uC548 2\uC138",
                tr: "II. Juan"
            }
        }, {
            canonicalName: "Ivan III of Russia",
            role: "Grand Prince",
            era: "1440\u20131505",
            region: "Russia",
            variants: {
                en: "Ivan III",
                es: "Iv\xE1n III de Rusia",
                fr: "Ivan III de Russie",
                de: "Iwan III.",
                it: "Ivan III di Russia",
                pt: "Iv\xE3 III da R\xFAssia",
                nl: "Ivan III van Rusland",
                ru: "\u0418\u0432\u0430\u043D III \u0412\u0435\u043B\u0438\u043A\u0438\u0439",
                pl: "Iwan III Srogi",
                cs: "Ivan III. Velik\xFD",
                ar: "\u0625\u064A\u0641\u0627\u0646 \u0627\u0644\u062B\u0627\u0644\u062B",
                zh: "\u4F0A\u51E1\u4E09\u4E16",
                ja: "\u30A4\u30F4\u30A1\u30F33\u4E16",
                ko: "\uC774\uBC18 3\uC138",
                tr: "III. \u0130van"
            }
        }, {
            canonicalName: "Ivan IV of Russia",
            role: "Tsar",
            era: "1530\u20131584",
            region: "Russia",
            variants: {
                en: "Ivan IV the Terrible",
                es: "Iv\xE1n IV el Terrible",
                fr: "Ivan IV le Terrible",
                de: "Iwan IV. der Schreckliche",
                it: "Ivan IV il Terribile",
                pt: "Iv\xE3 IV o Terr\xEDvel",
                nl: "Ivan IV de Verschrikkelijke",
                ru: "\u0418\u0432\u0430\u043D IV \u0413\u0440\u043E\u0437\u043D\u044B\u0439",
                pl: "Iwan IV Gro\u017Any",
                cs: "Ivan IV. Hrozn\xFD",
                ar: "\u0625\u064A\u0641\u0627\u0646 \u0627\u0644\u0631\u0627\u0628\u0639 \u0627\u0644\u0631\u0647\u064A\u0628",
                zh: "\u4F0A\u51E1\u56DB\u4E16",
                ja: "\u30A4\u30F4\u30A1\u30F34\u4E16\u96F7\u5E1D",
                ko: "\uC774\uBC18 4\uC138",
                tr: "IV. \u0130van"
            }
        }, {
            canonicalName: "Charles V, Holy Roman Emperor",
            role: "Emperor",
            era: "1500\u20131558",
            region: "Holy Roman Empire",
            variants: {
                en: "Charles V",
                es: "Carlos V",
                fr: "Charles Quint",
                de: "Karl V.",
                it: "Carlo V",
                pt: "Carlos V",
                nl: "Karel V",
                ru: "\u041A\u0430\u0440\u043B V",
                pl: "Karol V",
                cs: "Karel V.",
                ar: "\u0634\u0627\u0631\u0644 \u0627\u0644\u062E\u0627\u0645\u0633",
                zh: "\u67E5\u7406\u4E94\u4E16",
                ja: "\u30AB\u30FC\u30EB5\u4E16",
                ko: "\uCE74\uB97C 5\uC138",
                tr: "V. Karl"
            }
        }, {
            canonicalName: "Charles I of England",
            role: "King",
            era: "1600\u20131649",
            region: "England",
            variants: {
                en: "Charles I",
                es: "Carlos I de Inglaterra",
                fr: "Charles Ier d'Angleterre",
                de: "Karl I. von England",
                it: "Carlo I d'Inghilterra",
                pt: "Carlos I de Inglaterra",
                nl: "Karel I van Engeland",
                ru: "\u041A\u0430\u0440\u043B I \u0410\u043D\u0433\u043B\u0438\u0439\u0441\u043A\u0438\u0439",
                pl: "Karol I Stuart",
                cs: "Karel I. Anglick\xFD",
                ar: "\u062A\u0634\u0627\u0631\u0644\u0632 \u0627\u0644\u0623\u0648\u0644",
                zh: "\u67E5\u7406\u4E00\u4E16",
                ja: "\u30C1\u30E3\u30FC\u30EB\u30BA1\u4E16",
                ko: "\uCC30\uC2A4 1\uC138",
                tr: "I. Charles"
            }
        }, {
            canonicalName: "Peter the Great",
            role: "Tsar/Emperor",
            era: "1672\u20131725",
            region: "Russia",
            variants: {
                en: "Peter the Great",
                es: "Pedro el Grande",
                fr: "Pierre le Grand",
                de: "Peter der Gro\xDFe",
                it: "Pietro il Grande",
                pt: "Pedro o Grande",
                nl: "Peter de Grote",
                ru: "\u041F\u0451\u0442\u0440 \u0412\u0435\u043B\u0438\u043A\u0438\u0439",
                pl: "Piotr Wielki",
                cs: "Petr Velik\xFD",
                ar: "\u0628\u0637\u0631\u0633 \u0627\u0644\u0623\u0643\u0628\u0631",
                zh: "\u5F7C\u5F97\u5927\u5E1D",
                ja: "\u30D4\u30E7\u30FC\u30C8\u30EB\u5927\u5E1D",
                ko: "\uD45C\uD2B8\uB974 \uB300\uC81C",
                tr: "B\xFCy\xFCk Petro"
            }
        }, {
            canonicalName: "Peter III of Russia",
            role: "Emperor",
            era: "1728\u20131762",
            region: "Russia",
            variants: {
                en: "Peter III",
                es: "Pedro III de Rusia",
                fr: "Pierre III de Russie",
                de: "Peter III.",
                it: "Pietro III di Russia",
                pt: "Pedro III da R\xFAssia",
                nl: "Peter III van Rusland",
                ru: "\u041F\u0451\u0442\u0440 III",
                pl: "Piotr III",
                cs: "Petr III.",
                ar: "\u0628\u0637\u0631\u0633 \u0627\u0644\u062B\u0627\u0644\u062B",
                zh: "\u5F7C\u5F97\u4E09\u4E16",
                ja: "\u30D4\u30E7\u30FC\u30C8\u30EB3\u4E16",
                ko: "\uD45C\uD2B8\uB974 3\uC138",
                tr: "III. Petro"
            }
        }, {
            canonicalName: "Frederick the Great",
            role: "King",
            era: "1712\u20131786",
            region: "Prussia",
            variants: {
                en: "Frederick the Great",
                es: "Federico el Grande",
                fr: "Fr\xE9d\xE9ric le Grand",
                de: "Friedrich der Gro\xDFe",
                it: "Federico il Grande",
                pt: "Frederico o Grande",
                nl: "Frederik de Grote",
                ru: "\u0424\u0440\u0438\u0434\u0440\u0438\u0445 \u0412\u0435\u043B\u0438\u043A\u0438\u0439",
                pl: "Fryderyk Wielki",
                cs: "Fridrich Velik\xFD",
                ar: "\u0641\u0631\u064A\u062F\u0631\u064A\u0634 \u0627\u0644\u0639\u0638\u064A\u0645",
                zh: "\u8153\u7279\u70C8\u5927\u5E1D",
                ja: "\u30D5\u30EA\u30FC\u30C9\u30EA\u30D2\u5927\u738B",
                ko: "\uD504\uB9AC\uB4DC\uB9AC\uD788 \uB300\uC655",
                tr: "B\xFCy\xFCk Friedrich"
            }
        }, {
            canonicalName: "Frederick I of Prussia",
            role: "King",
            era: "1657\u20131713",
            region: "Prussia",
            variants: {
                en: "Frederick I",
                es: "Federico I de Prusia",
                fr: "Fr\xE9d\xE9ric Ier de Prusse",
                de: "Friedrich I. in Preu\xDFen",
                it: "Federico I di Prussia",
                pt: "Frederico I da Pr\xFAssia",
                nl: "Frederik I van Pruisen",
                ru: "\u0424\u0440\u0438\u0434\u0440\u0438\u0445 I \u041F\u0440\u0443\u0441\u0441\u043A\u0438\u0439",
                pl: "Fryderyk I Pruski",
                cs: "Fridrich I. Prusk\xFD",
                ar: "\u0641\u0631\u064A\u062F\u0631\u064A\u0634 \u0627\u0644\u0623\u0648\u0644",
                zh: "\u8153\u7279\u70C8\u4E00\u4E16",
                ja: "\u30D5\u30EA\u30FC\u30C9\u30EA\u30D21\u4E16",
                ko: "\uD504\uB9AC\uB4DC\uB9AC\uD788 1\uC138",
                tr: "I. Friedrich"
            }
        }, {
            canonicalName: "Louis XIV of France",
            role: "King",
            era: "1638\u20131715",
            region: "France",
            variants: {
                en: "Louis XIV",
                es: "Luis XIV de Francia",
                fr: "Louis XIV",
                de: "Ludwig XIV.",
                it: "Luigi XIV",
                pt: "Lu\xEDs XIV",
                nl: "Lodewijk XIV",
                ru: "\u041B\u044E\u0434\u043E\u0432\u0438\u043A XIV",
                pl: "Ludwik XIV",
                cs: "Ludv\xEDk XIV.",
                ar: "\u0644\u0648\u064A\u0633 \u0627\u0644\u0631\u0627\u0628\u0639 \u0639\u0634\u0631",
                zh: "\u8DEF\u6613\u5341\u56DB",
                ja: "\u30EB\u30A414\u4E16",
                ko: "\uB8E8\uC774 14\uC138",
                tr: "XIV. Louis"
            }
        }, {
            canonicalName: "Louis XVI of France",
            role: "King",
            era: "1754\u20131793",
            region: "France",
            variants: {
                en: "Louis XVI",
                es: "Luis XVI de Francia",
                fr: "Louis XVI",
                de: "Ludwig XVI.",
                it: "Luigi XVI",
                pt: "Lu\xEDs XVI",
                nl: "Lodewijk XVI",
                ru: "\u041B\u044E\u0434\u043E\u0432\u0438\u043A XVI",
                pl: "Ludwik XVI",
                cs: "Ludv\xEDk XVI.",
                ar: "\u0644\u0648\u064A\u0633 \u0627\u0644\u0633\u0627\u062F\u0633 \u0639\u0634\u0631",
                zh: "\u8DEF\u6613\u5341\u516D",
                ja: "\u30EB\u30A416\u4E16",
                ko: "\uB8E8\uC774 16\uC138",
                tr: "XVI. Louis"
            }
        }, {
            canonicalName: "Alexander the Great",
            role: "King/Conqueror",
            era: "356\u2013323 BC",
            region: "Macedonia",
            variants: {
                en: "Alexander the Great",
                es: "Alejandro Magno",
                fr: "Alexandre le Grand",
                de: "Alexander der Gro\xDFe",
                it: "Alessandro Magno",
                pt: "Alexandre o Grande",
                nl: "Alexander de Grote",
                ru: "\u0410\u043B\u0435\u043A\u0441\u0430\u043D\u0434\u0440 \u0412\u0435\u043B\u0438\u043A\u0438\u0439",
                pl: "Aleksander Wielki",
                cs: "Alexandr Velik\xFD",
                ar: "\u0627\u0644\u0625\u0633\u0643\u0646\u062F\u0631 \u0627\u0644\u0623\u0643\u0628\u0631",
                zh: "\u4E9A\u5386\u5C71\u5927\u5927\u5E1D",
                ja: "\u30A2\u30EC\u30AF\u30B5\u30F3\u30C9\u30ED\u30B9\u5927\u738B",
                ko: "\uC54C\uB809\uC0B0\uB4DC\uB85C\uC2A4 \uB300\uC655",
                tr: "B\xFCy\xFCk \u0130skender"
            }
        }, {
            canonicalName: "Alexander I of Russia",
            role: "Emperor",
            era: "1777\u20131825",
            region: "Russia",
            variants: {
                en: "Alexander I",
                es: "Alejandro I de Rusia",
                fr: "Alexandre Ier de Russie",
                de: "Alexander I.",
                it: "Alessandro I di Russia",
                pt: "Alexandre I da R\xFAssia",
                nl: "Alexander I van Rusland",
                ru: "\u0410\u043B\u0435\u043A\u0441\u0430\u043D\u0434\u0440 I",
                pl: "Aleksander I",
                cs: "Alexandr I.",
                ar: "\u0623\u0644\u0643\u0633\u0646\u062F\u0631 \u0627\u0644\u0623\u0648\u0644",
                zh: "\u4E9A\u5386\u5C71\u5927\u4E00\u4E16",
                ja: "\u30A2\u30EC\u30AF\u30B5\u30F3\u30C9\u30EB1\u4E16",
                ko: "\uC54C\uB809\uC0B0\uB4DC\uB974 1\uC138",
                tr: "I. Aleksandr"
            }
        }, {
            canonicalName: "Alexander II of Russia",
            role: "Emperor",
            era: "1818\u20131881",
            region: "Russia",
            variants: {
                en: "Alexander II",
                es: "Alejandro II de Rusia",
                fr: "Alexandre II de Russie",
                de: "Alexander II.",
                it: "Alessandro II di Russia",
                pt: "Alexandre II da R\xFAssia",
                nl: "Alexander II van Rusland",
                ru: "\u0410\u043B\u0435\u043A\u0441\u0430\u043D\u0434\u0440 II",
                pl: "Aleksander II",
                cs: "Alexandr II.",
                ar: "\u0623\u0644\u0643\u0633\u0646\u062F\u0631 \u0627\u0644\u062B\u0627\u0646\u064A",
                zh: "\u4E9A\u5386\u5C71\u5927\u4E8C\u4E16",
                ja: "\u30A2\u30EC\u30AF\u30B5\u30F3\u30C9\u30EB2\u4E16",
                ko: "\uC54C\uB809\uC0B0\uB4DC\uB974 2\uC138",
                tr: "II. Aleksandr"
            }
        }, {
            canonicalName: "Philip II of Spain",
            role: "King",
            era: "1527\u20131598",
            region: "Spain",
            variants: {
                en: "Philip II",
                es: "Felipe II de Espa\xF1a",
                fr: "Philippe II d'Espagne",
                de: "Philipp II.",
                it: "Filippo II di Spagna",
                pt: "Filipe II de Espanha",
                nl: "Filips II van Spanje",
                ru: "\u0424\u0438\u043B\u0438\u043F\u043F II \u0418\u0441\u043F\u0430\u043D\u0441\u043A\u0438\u0439",
                pl: "Filip II Hiszpa\u0144ski",
                cs: "Filip II. \u0160pan\u011Blsk\xFD",
                ar: "\u0641\u064A\u0644\u064A\u0628 \u0627\u0644\u062B\u0627\u0646\u064A",
                zh: "\u8153\u529B\u4E8C\u4E16",
                ja: "\u30D5\u30A7\u30EA\u30DA2\u4E16",
                ko: "\uD3A0\uB9AC\uD398 2\uC138",
                tr: "II. Felipe"
            }
        }, {
            canonicalName: "Philip IV of Spain",
            role: "King",
            era: "1605\u20131665",
            region: "Spain",
            variants: {
                en: "Philip IV",
                es: "Felipe IV de Espa\xF1a",
                fr: "Philippe IV d'Espagne",
                de: "Philipp IV.",
                it: "Filippo IV di Spagna",
                pt: "Filipe IV de Espanha",
                nl: "Filips IV van Spanje",
                ru: "\u0424\u0438\u043B\u0438\u043F\u043F IV \u0418\u0441\u043F\u0430\u043D\u0441\u043A\u0438\u0439",
                pl: "Filip IV Hiszpa\u0144ski",
                cs: "Filip IV. \u0160pan\u011Blsk\xFD",
                ar: "\u0641\u064A\u0644\u064A\u0628 \u0627\u0644\u0631\u0627\u0628\u0639",
                zh: "\u8153\u529B\u56DB\u4E16",
                ja: "\u30D5\u30A7\u30EA\u30DA4\u4E16",
                ko: "\uD3A0\uB9AC\uD398 4\uC138",
                tr: "IV. Felipe"
            }
        }, {
            canonicalName: "George III of Britain",
            role: "King",
            era: "1738\u20131820",
            region: "Great Britain",
            variants: {
                en: "George III",
                es: "Jorge III del Reino Unido",
                fr: "George III du Royaume-Uni",
                de: "Georg III.",
                it: "Giorgio III del Regno Unito",
                pt: "Jorge III",
                nl: "George III",
                ru: "\u0413\u0435\u043E\u0440\u0433 III",
                pl: "Jerzy III",
                cs: "Ji\u0159\xED III.",
                ar: "\u062C\u0648\u0631\u062C \u0627\u0644\u062B\u0627\u0644\u062B",
                zh: "\u4E54\u6CBB\u4E09\u4E16",
                ja: "\u30B8\u30E7\u30FC\u30B83\u4E16",
                ko: "\uC870\uC9C0 3\uC138",
                tr: "III. George"
            }
        }, {
            canonicalName: "George I of Greece",
            role: "King",
            era: "1845\u20131913",
            region: "Greece",
            variants: {
                en: "George I of Greece",
                es: "Jorge I de Grecia",
                fr: "Georges Ier de Gr\xE8ce",
                de: "Georg I. von Griechenland",
                it: "Giorgio I di Grecia",
                pt: "Jorge I da Gr\xE9cia",
                nl: "George I van Griekenland",
                ru: "\u0413\u0435\u043E\u0440\u0433 I \u0413\u0440\u0435\u0447\u0435\u0441\u043A\u0438\u0439",
                pl: "Jerzy I Grecki",
                cs: "Ji\u0159\xED I. \u0158eck\xFD",
                ar: "\u062C\u0648\u0631\u062C \u0627\u0644\u0623\u0648\u0644 \u0645\u0644\u0643 \u0627\u0644\u064A\u0648\u0646\u0627\u0646",
                zh: "\u4E54\u6CBB\u4E00\u4E16",
                ja: "\u30B2\u30AA\u30EB\u30AE\u30AA\u30B91\u4E16",
                ko: "\uC694\uB974\uC694\uC2A4 1\uC138",
                tr: "I. Georgios"
            }
        }, {
            canonicalName: "Henry VIII of England",
            role: "King",
            era: "1491\u20131547",
            region: "England",
            variants: {
                en: "Henry VIII",
                es: "Enrique VIII de Inglaterra",
                fr: "Henri VIII d'Angleterre",
                de: "Heinrich VIII.",
                it: "Enrico VIII d'Inghilterra",
                pt: "Henrique VIII",
                nl: "Hendrik VIII",
                ru: "\u0413\u0435\u043D\u0440\u0438\u0445 VIII",
                pl: "Henryk VIII",
                cs: "Jind\u0159ich VIII.",
                ar: "\u0647\u0646\u0631\u064A \u0627\u0644\u062B\u0627\u0645\u0646",
                zh: "\u4EA8\u5229\u516B\u4E16",
                ja: "\u30D8\u30F3\u30EA\u30FC8\u4E16",
                ko: "\uD5E8\uB9AC 8\uC138",
                tr: "VIII. Henry"
            }
        }, {
            canonicalName: "Henry IV of France",
            role: "King",
            era: "1553\u20131610",
            region: "France",
            variants: {
                en: "Henry IV",
                es: "Enrique IV de Francia",
                fr: "Henri IV de France",
                de: "Heinrich IV. von Frankreich",
                it: "Enrico IV di Francia",
                pt: "Henrique IV de Fran\xE7a",
                nl: "Hendrik IV van Frankrijk",
                ru: "\u0413\u0435\u043D\u0440\u0438\u0445 IV \u0424\u0440\u0430\u043D\u0446\u0443\u0437\u0441\u043A\u0438\u0439",
                pl: "Henryk IV Francuski",
                cs: "Jind\u0159ich IV. Francouzsk\xFD",
                ar: "\u0647\u0646\u0631\u064A \u0627\u0644\u0631\u0627\u0628\u0639",
                zh: "\u4EA8\u5229\u56DB\u4E16",
                ja: "\u30A2\u30F3\u30EA4\u4E16",
                ko: "\uC559\uB9AC 4\uC138",
                tr: "IV. Henri"
            }
        }, {
            canonicalName: "William I of England",
            role: "King",
            era: "1028\u20131087",
            region: "England",
            variants: {
                en: "William the Conqueror",
                es: "Guillermo el Conquistador",
                fr: "Guillaume le Conqu\xE9rant",
                de: "Wilhelm der Eroberer",
                it: "Guglielmo il Conquistatore",
                pt: "Guilherme o Conquistador",
                nl: "Willem de Veroveraar",
                ru: "\u0412\u0438\u043B\u044C\u0433\u0435\u043B\u044C\u043C \u0417\u0430\u0432\u043E\u0435\u0432\u0430\u0442\u0435\u043B\u044C",
                pl: "Wilhelm Zdobywca",
                cs: "Vil\xE9m Dobyvatel",
                ar: "\u0648\u0644\u064A\u0627\u0645 \u0627\u0644\u0641\u0627\u062A\u062D",
                zh: "\u5F81\u670D\u8005\u5A01\u5EC9",
                ja: "\u30A6\u30A3\u30EA\u30A2\u30E0\u5F81\u670D\u738B",
                ko: "\uC815\uBCF5\uC655 \uC70C\uB9AC\uC5C4",
                tr: "Fatih William"
            }
        }, {
            canonicalName: "William III of England",
            role: "King",
            era: "1650\u20131702",
            region: "England/Netherlands",
            variants: {
                en: "William III",
                es: "Guillermo III de Inglaterra",
                fr: "Guillaume III d'Angleterre",
                de: "Wilhelm III.",
                it: "Guglielmo III d'Inghilterra",
                pt: "Guilherme III",
                nl: "Willem III",
                ru: "\u0412\u0438\u043B\u044C\u0433\u0435\u043B\u044C\u043C III",
                pl: "Wilhelm III",
                cs: "Vil\xE9m III.",
                ar: "\u0648\u0644\u064A\u0627\u0645 \u0627\u0644\u062B\u0627\u0644\u062B",
                zh: "\u5A01\u5EC9\u4E09\u4E16",
                ja: "\u30A6\u30A3\u30EA\u30A2\u30E03\u4E16",
                ko: "\uC70C\uB9AC\uC5C4 3\uC138",
                tr: "III. William"
            }
        }, {
            canonicalName: "Catherine the Great",
            role: "Empress",
            era: "1729\u20131796",
            region: "Russia",
            variants: {
                en: "Catherine the Great",
                es: "Catalina la Grande",
                fr: "Catherine la Grande",
                de: "Katharina die Gro\xDFe",
                it: "Caterina la Grande",
                pt: "Catarina a Grande",
                nl: "Catharina de Grote",
                ru: "\u0415\u043A\u0430\u0442\u0435\u0440\u0438\u043D\u0430 \u0412\u0435\u043B\u0438\u043A\u0430\u044F",
                pl: "Katarzyna Wielka",
                cs: "Kate\u0159ina Velik\xE1",
                ar: "\u0643\u0627\u062B\u0631\u064A\u0646 \u0627\u0644\u0639\u0638\u0645\u0649",
                zh: "\u53F6\u5361\u6377\u7433\u5A1C\u5927\u5E1D",
                ja: "\u30A8\u30AB\u30C1\u30A7\u30EA\u30FC\u30CA\u5927\u5E1D",
                ko: "\uC608\uCE74\uD14C\uB9AC\uB098 \uB300\uC81C",
                tr: "B\xFCy\xFCk Katerina"
            }
        }, {
            canonicalName: "Catherine de' Medici",
            role: "Queen",
            era: "1519\u20131589",
            region: "France",
            variants: {
                en: "Catherine de' Medici",
                es: "Catalina de M\xE9dici",
                fr: "Catherine de M\xE9dicis",
                de: "Katharina von Medici",
                it: "Caterina de' Medici",
                pt: "Catarina de M\xE9dici",
                nl: "Catharina de' Medici",
                ru: "\u0415\u043A\u0430\u0442\u0435\u0440\u0438\u043D\u0430 \u041C\u0435\u0434\u0438\u0447\u0438",
                pl: "Katarzyna Medycejska",
                cs: "Kate\u0159ina Medicejsk\xE1",
                ar: "\u0643\u0627\u062B\u0631\u064A\u0646 \u062F\u064A \u0645\u064A\u062F\u064A\u062A\u0634\u064A",
                zh: "\u51EF\u745F\u7433\xB7\u5FB7\xB7\u7F8E\u7B2C\u5947",
                ja: "\u30AB\u30C8\u30EA\u30FC\u30CC\u30FB\u30C9\u30FB\u30E1\u30C7\u30A3\u30B7\u30B9",
                ko: "\uCE74\uD2B8\uB9B0 \uB4DC \uBA54\uB514\uC2DC\uC2A4",
                tr: "Catherine de M\xE9dicis"
            }
        }],
        sa = {
            en: ["In the chronicles of", "Historical records state that", "According to the annals,", "Scholars note that"],
            es: ["En las cr\xF3nicas de", "Los registros hist\xF3ricos indican que", "Seg\xFAn los anales,", "Los eruditos se\xF1alan que"],
            fr: ["Dans les chroniques de", "Les archives historiques montrent que", "Selon les annales,", "Les historiens notent que"],
            de: ["In den Chroniken von", "Historische Aufzeichnungen besagen, dass", "Laut den Annalen,", "Wissenschaftler stellen fest, dass"],
            it: ["Nelle cronache di", "I documenti storici affermano che", "Secondo gli annali,", "Gli studiosi notano che"],
            pt: ["Nas cr\xF4nicas de", "Os registros hist\xF3ricos indicam que", "De acordo com os anais,", "Os estudiosos observam que"],
            nl: ["In de kronieken van", "Historische verslagen vermelden dat", "Volgens de annalen,", "Geleerden merken op dat"],
            ru: ["\u0412 \u0445\u0440\u043E\u043D\u0438\u043A\u0430\u0445", "\u0418\u0441\u0442\u043E\u0440\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0437\u0430\u043F\u0438\u0441\u0438 \u0433\u043B\u0430\u0441\u044F\u0442, \u0447\u0442\u043E", "\u0421\u043E\u0433\u043B\u0430\u0441\u043D\u043E \u043B\u0435\u0442\u043E\u043F\u0438\u0441\u044F\u043C,", "\u0423\u0447\u0451\u043D\u044B\u0435 \u043E\u0442\u043C\u0435\u0447\u0430\u044E\u0442, \u0447\u0442\u043E"],
            pl: ["W kronikach", "Zapisy historyczne wskazuj\u0105, \u017Ce", "Wed\u0142ug rocznik\xF3w,", "Uczeni zauwa\u017Caj\u0105, \u017Ce"],
            cs: ["V kronik\xE1ch", "Historick\xE9 z\xE1znamy uv\xE1d\u011Bj\xED, \u017Ee", "Podle letopis\u016F,", "U\u010Denci poznamen\xE1vaj\xED, \u017Ee"],
            ar: ["\u0641\u064A \u0633\u062C\u0644\u0627\u062A", "\u062A\u0634\u064A\u0631 \u0627\u0644\u0648\u062B\u0627\u0626\u0642 \u0627\u0644\u062A\u0627\u0631\u064A\u062E\u064A\u0629 \u0625\u0644\u0649 \u0623\u0646", "\u0648\u0641\u0642\u064B\u0627 \u0644\u0644\u062D\u0648\u0644\u064A\u0627\u062A\u060C", "\u064A\u0644\u0627\u062D\u0638 \u0627\u0644\u0639\u0644\u0645\u0627\u0621 \u0623\u0646"],
            zh: ["\u5728\u7F16\u5E74\u53F2\u4E2D", "\u5386\u53F2\u8BB0\u5F55\u8868\u660E", "\u6839\u636E\u53F2\u518C\u8BB0\u8F7D\uFF0C", "\u5B66\u8005\u4EEC\u6CE8\u610F\u5230"],
            ja: ["\u5E74\u4EE3\u8A18\u306B\u3088\u308B\u3068", "\u6B74\u53F2\u7684\u8A18\u9332\u306F\u8FF0\u3079\u3066\u3044\u308B", "\u5E74\u9451\u306B\u3088\u308C\u3070\u3001", "\u5B66\u8005\u305F\u3061\u306F\u6307\u6458\u3059\u308B"],
            ko: ["\uC5F0\uB300\uAE30\uC5D0 \uB530\uB974\uBA74", "\uC5ED\uC0AC\uC801 \uAE30\uB85D\uC5D0 \uC758\uD558\uBA74", "\uC5F0\uAC10\uC5D0 \uB530\uB974\uBA74,", "\uD559\uC790\uB4E4\uC740 \uC9C0\uC801\uD55C\uB2E4"],
            tr: ["Kroniklerde", "Tarih\xEE kay\u0131tlar \u015Funu belirtir:", "Y\u0131ll\u0131klara g\xF6re,", "Bilginler \u015Funu not eder:"]
        },
        ia = {
            en: ["ascended to the throne", "declared war on", "signed a treaty with", "commissioned the construction of", "was crowned in"],
            es: ["ascendi\xF3 al trono", "declar\xF3 la guerra a", "firm\xF3 un tratado con", "orden\xF3 la construcci\xF3n de", "fue coronado en"],
            fr: ["acc\xE9da au tr\xF4ne", "d\xE9clara la guerre \xE0", "signa un trait\xE9 avec", "ordonna la construction de", "fut couronn\xE9 \xE0"],
            de: ["bestieg den Thron", "erkl\xE4rte den Krieg gegen", "unterzeichnete einen Vertrag mit", "beauftragte den Bau von", "wurde gekr\xF6nt in"],
            it: ["sal\xEC al trono", "dichiar\xF2 guerra a", "firm\xF2 un trattato con", "commission\xF2 la costruzione di", "fu incoronato a"],
            pt: ["ascendeu ao trono", "declarou guerra a", "assinou um tratado com", "encomendou a constru\xE7\xE3o de", "foi coroado em"],
            nl: ["besteeg de troon", "verklaarde de oorlog aan", "tekende een verdrag met", "opdracht gaf tot de bouw van", "werd gekroond in"],
            ru: ["\u0432\u0437\u043E\u0448\u0451\u043B \u043D\u0430 \u043F\u0440\u0435\u0441\u0442\u043E\u043B", "\u043E\u0431\u044A\u044F\u0432\u0438\u043B \u0432\u043E\u0439\u043D\u0443", "\u043F\u043E\u0434\u043F\u0438\u0441\u0430\u043B \u0434\u043E\u0433\u043E\u0432\u043E\u0440 \u0441", "\u0437\u0430\u043A\u0430\u0437\u0430\u043B \u0441\u0442\u0440\u043E\u0438\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u043E", "\u0431\u044B\u043B \u043A\u043E\u0440\u043E\u043D\u043E\u0432\u0430\u043D \u0432"],
            pl: ["wst\u0105pi\u0142 na tron", "wypowiedzia\u0142 wojn\u0119", "podpisa\u0142 traktat z", "zleci\u0142 budow\u0119", "zosta\u0142 koronowany w"],
            cs: ["nastoupil na tr\u016Fn", "vyhl\xE1sil v\xE1lku", "podepsal smlouvu s", "nechal postavit", "byl korunov\xE1n v"],
            ar: ["\u0627\u0639\u062A\u0644\u0649 \u0627\u0644\u0639\u0631\u0634", "\u0623\u0639\u0644\u0646 \u0627\u0644\u062D\u0631\u0628 \u0639\u0644\u0649", "\u0648\u0642\u0651\u0639 \u0645\u0639\u0627\u0647\u062F\u0629 \u0645\u0639", "\u0623\u0645\u0631 \u0628\u0628\u0646\u0627\u0621", "\u062A\u064F\u0648\u0651\u062C \u0641\u064A"],
            zh: ["\u767B\u4E0A\u738B\u4F4D", "\u5411\u2026\u5BA3\u6218", "\u4E0E\u2026\u7B7E\u8BA2\u6761\u7EA6", "\u4E0B\u4EE4\u5EFA\u9020", "\u5728\u2026\u52A0\u5195"],
            ja: ["\u738B\u4F4D\u306B\u5C31\u3044\u305F", "\u306B\u5BA3\u6226\u5E03\u544A\u3057\u305F", "\u3068\u6761\u7D04\u3092\u7D50\u3093\u3060", "\u306E\u5EFA\u8A2D\u3092\u547D\u3058\u305F", "\u3067\u6234\u51A0\u3057\u305F"],
            ko: ["\uC655\uC704\uC5D0 \uC62C\uB790\uB2E4", "\uC5D0 \uC120\uC804\uD3EC\uACE0\uD588\uB2E4", "\uC640 \uC870\uC57D\uC744 \uCCB4\uACB0\uD588\uB2E4", "\uAC74\uC124\uC744 \uBA85\uB839\uD588\uB2E4", "\uC5D0\uC11C \uB300\uAD00\uC2DD\uC744 \uAC00\uC84C\uB2E4"],
            tr: ["tahta \xE7\u0131kt\u0131", "sava\u015F ilan etti", "antla\u015Fma imzalad\u0131", "in\u015Fa ettirdi", "ta\xE7 giydi"]
        },
        la = ["Constantinople", "Rome", "Paris", "London", "Madrid", "Vienna", "Berlin", "Moscow", "Prague", "Warsaw", "Lisbon", "Amsterdam", "Cairo", "Beijing", "Constantinople", "Venice", "Florence", "Ankara", "Athens", "Stockholm", "Copenhagen", "Seoul", "Kyoto"],
        Mt = [];
    for (let r = 1e3; r <= 1900; r += 1)
        Mt.push(r)
}
);
var Rt = {};
M(Rt, {
    default: () => ua
});
import ca from "https://cdn.jsdelivr.net/npm/jszip@3/+esm";
import { html as da } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
async function ua({ user: r, weight: d = 1 }) {
    let t = "q-cross-lingual-entity-disambiguation-server"
        , i = "Cross-Lingual Entity Disambiguation"
        , { documents: n, selectedEntities: p, entityMap: c, languages: e, languageNames: s } = ge(r)
        , l = ["entity_id,canonical_name,role,era,region"];
    for (let f of p)
        l.push(`${c[f.canonicalName]},"${f.canonicalName}",${f.role},"${f.era}",${f.region}`);
    let o = l.join(`
`)
        , a = n.map(f => JSON.stringify(f)).join(`
`)
        , u = new ca;
    u.file("documents.jsonl", a),
        u.file("entity_reference.csv", o),
        u.file("README.md", `# Cross-Lingual Entity Disambiguation Challenge

## Dataset
- **documents.jsonl**: ${n.length} historical document excerpts across ${e.length} languages
- **entity_reference.csv**: Reference list of ${p.length} canonical historical entities

## Document Format (JSONL)
Each line is a JSON object with:
- \`doc_id\`: Unique document identifier (DOC-0001 to DOC-1000)
- \`language\`: ISO 639-1 language code (${e.join(", ")})
- \`year\`: Year of the event described
- \`text\`: The document text mentioning a historical figure
- \`mentioned_name\`: The name as it appears in the document (may include typos)
- \`source_region\`: Geographic region

## Entity Reference CSV
Contains canonical entity information:
- \`entity_id\`: Unique entity identifier (E001, E002, ...)
- \`canonical_name\`: The standardised English name
- \`role\`: Historical role (King, Emperor, etc.)
- \`era\`: Time period
- \`region\`: Geographic origin

## Task
Map each document to its correct entity_id. Names like "Juan", "Jean", "Johann",
"Giovanni", "Jo\xE3o", and "Ivan" may all refer to DIFFERENT historical persons.
Your pipeline must disambiguate based on context, era, region, and cross-lingual
name equivalences.

## Output Format
Submit a CSV with exactly two columns:
\`\`\`
doc_id,entity_id
DOC-0001,E003
DOC-0002,E017
...
\`\`\`
`);
    let h = await u.generateAsync({
        type: "blob"
    })
        , I = await Dt(r)
        , w = da`
    <div class="mb-3">
      <h2 id="cross-lingual-entity-disambiguation">Cross-Lingual Entity Disambiguation Pipeline</h2>
      <p>
        <strong>HistoriGraph AI</strong> is building the world's largest knowledge graph of historical figures. They
        have collected <strong>1,000 document excerpts</strong> in <strong>${e.length} languages</strong>
        (${Object.values(s).join(", ")}), each mentioning a historical figure. However, the same person
        may be referred to by very different names across languages — e.g., <em>John</em> (English),
        <em>Juan</em> (Spanish), <em>Jean</em> (French), <em>Johann</em> (German), <em>Giovanni</em> (Italian),
        <em>Иван</em> (Russian).
      </p>

      <p>
        The challenge is that multiple <strong>different</strong> historical persons share the same root name.
        For example, "Ivan III" and "Ivan IV" are different people; "Catherine the Great" and
        "Catherine de' Medici" are different people — even though their names look similar within and across languages.
      </p>

      <h3>Your Task</h3>
      <ol>
        <li>Download the ZIP archive containing the document dataset and entity reference</li>
        <li>
          Build an <strong>LLM-powered pipeline</strong> that reads each document, identifies which historical
          entity is being mentioned, and maps it to the correct <code>entity_id</code> from the reference list
        </li>
        <li>
          Your pipeline must handle:
          <ul>
            <li><strong>Cross-lingual name variants</strong> (Juan = Jean = Johann = Giovanni = ...)</li>
            <li><strong>Disambiguation</strong> between similar entities (Ivan III ≠ Ivan IV)</li>
            <li><strong>Minor typos</strong> in names (~8% of documents have character swaps)</li>
            <li><strong>Contextual clues</strong> like era, region, and described events</li>
          </ul>
        </li>
        <li>Output a strict CSV with columns: <code>doc_id,entity_id</code></li>
      </ol>

      <p>
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => L(h, `${t}.zip`)}>
          📥 Download Dataset (ZIP)
        </button>
      </p>

      <details class="my-3">
        <summary><strong>📊 Dataset Statistics</strong></summary>
        <ul>
          <li><strong>Documents:</strong> ${n.length}</li>
          <li><strong>Languages:</strong> ${e.length} (${e.join(", ")})</li>
          <li><strong>Unique entities:</strong> ${p.length}</li>
          <li><strong>Documents with typos:</strong> ~8%</li>
        </ul>
      </details>

      <details class="my-3">
        <summary><strong>💡 Approach Hints</strong></summary>
        <h6>Recommended pipeline:</h6>
        <ol>
          <li>Parse the JSONL documents and entity reference CSV</li>
          <li>For each document, extract the <code>mentioned_name</code>, <code>language</code>, <code>year</code>,
              and <code>source_region</code></li>
          <li>Use an LLM to match mentioned names to entity candidates by considering:
            <ul>
              <li>Cross-lingual name equivalence tables</li>
              <li>Era/date range overlap</li>
              <li>Geographic context</li>
            </ul>
          </li>
          <li>For ambiguous cases, use the full document text for disambiguation</li>
        </ol>

        <h6>Python skeleton:</h6>
        <pre><code>import json, csv

# Load documents
docs = [json.loads(line) for line in open("documents.jsonl")]

# Load entity reference
entities = list(csv.DictReader(open("entity_reference.csv")))

# For each document, call LLM to disambiguate
results = []
for doc in docs:
    prompt = f"""Given this historical document excerpt:
    Text: {doc['text']}
    Language: {doc['language']}
    Year: {doc['year']}
    Mentioned name: {doc['mentioned_name']}

    Which of these entities is mentioned?
    {entities}

    Reply with just the entity_id."""

    entity_id = call_llm(prompt)  # Your LLM call here
    results.append({"doc_id": doc["doc_id"], "entity_id": entity_id})

# Write CSV
with open("output.csv", "w") as f:
    writer = csv.DictWriter(f, fieldnames=["doc_id", "entity_id"])
    writer.writeheader()
    writer.writerows(results)</code></pre>
      </details>

      <details class="my-3">
        <summary><strong>⚠️ Important Notes</strong></summary>
        <ul>
          <li><strong>Accuracy threshold:</strong> Your mapping must be ≥95% correct (at least 950/1000)</li>
          <li><strong>CSV format:</strong> Exactly two columns — <code>doc_id,entity_id</code></li>
          <li><strong>Include all 1000 documents</strong> in your output</li>
          <li><strong>Entity IDs</strong> must match exactly (e.g., E001, E017, not the canonical name)</li>
          <li>The header row <code>doc_id,entity_id</code> is optional</li>
        </ul>
      </details>

      <label for="${t}" class="form-label">
        <strong>Paste your CSV mapping below</strong> (doc_id,entity_id — 1000 rows)
      </label>
      <textarea
        class="form-control font-monospace"
        id="${t}"
        name="${t}"
        rows="15"
        placeholder="doc_id,entity_id&#10;DOC-0001,E003&#10;DOC-0002,E017&#10;..."
        required
        style="font-size: 0.875rem"
      ></textarea>
      <div class="form-text">
        Submit a CSV with 1000 rows mapping each doc_id to its entity_id. Accuracy must be ≥95%.
      </div>
    </div>

    <div class="alert alert-info" role="alert">
      <strong>🎓 This question tests your ability to:</strong>
      <ul class="mb-0">
        <li>Build an LLM-powered entity disambiguation pipeline</li>
        <li>Handle cross-lingual name variation (15 languages)</li>
        <li>Disambiguate similar entities using contextual clues</li>
        <li>Process large structured datasets programmatically</li>
        <li>Produce clean, validated CSV output</li>
      </ul>
    </div>
  `;
    return {
        id: t,
        title: i,
        weight: d,
        question: w,
        answer: I
    }
}
var Nt = j(() => {
    "use strict";
    Lt();
    V()
}
);
function fe(r) {
    let d = "q-llm-hallucination-trap-matrix-server"
        , t = r?.email ?? ""
        , i = (0,
            qt.default)(`${t}#${d}`)
        , n = Math.floor(i() * 1e3)
        , p = `script_${String(n).padStart(3, "0")}.py`
        , c = [];
    for (let e = 0; e < 1e3; e++) {
        let s = e === n
            , l = Ot[Math.floor(i() * Ot.length)]
            , o = l.base
            , a = Object.keys(l.options)
            , u = new Set;
        if (!s) {
            let f = 1 + Math.floor(i() * 3);
            for (; u.size < f && u.size < a.length;)
                u.add(Math.floor(i() * a.length))
        }
        a.forEach((f, b) => {
            let m = l.options[f], g;
            if (s || !u.has(b))
                g = m[0];
            else {
                let y = 1 + Math.floor(i() * (m.length - 1));
                g = m[y]
            }
            o = o.replace(`{${f}}`, g)
        }
        );
        let h = ["data_val", "temp_res", "cache_obj", "info_dict", "log_str"]
            , w = `    # extra internal state
    ${h[Math.floor(i() * h.length)]} = ${Math.floor(i() * 1e3)}
`;
        o = o.replace(/(def [^:]+:\n)/, `$1${w}`),
            c.push({
                filename: `script_${String(e).padStart(3, "0")}.py`,
                content: o
            })
    }
    return {
        scripts: c,
        correctScriptId: p
    }
}
async function Ft(r) {
    return async d => {
        let { correctScriptId: t } = fe(r);
        if (!d || !d.trim())
            throw new Error("Please submit the correct script filename.");
        let i = d.trim();
        if (i === t)
            return !0;
        if (i === t.replace(".py", ""))
            throw new Error("Almost there! Please include the .py extension in your submitted filename (e.g., script_123.py).");
        let n = i.match(/(\d{1,3})/);
        if (n) {
            let p = n[1].padStart(3, "0")
                , c = `script_${p}.py`;
            if (c === t)
                throw new Error(`It looks like you found the right index ${p}, but please format it exactly as: ${c}`)
        }
        throw new Error(`Incorrect. The script '${i}' contains synthetic hallucinations (or is an invalid filename). The truth is out there...`)
    }
}
var qt, Ot, Vt = j(() => {
    "use strict";
    qt = O(N(), 1),
        Ot = [{
            name: "pandas_csv",
            base: `import pandas as pd

def process_sales_data(csv_path: str, min_sales: int):
    # Load dataset
    df = {pd_read_csv}(csv_path)
    
    # Clean data
    df = {df_dropna}()
    
    # Filter 
    valid_df = {df_filter}
    
    # Aggregate
    summary = {df_groupby_sum}
    
    # Format
    final_df = {df_rename}
    
    return final_df
`,
            options: {
                pd_read_csv: ["pd.read_csv", "pd.load_csv", "pd.read_csv_file", "pd.parse_csv"],
                df_dropna: ["df.dropna", "df.drop_nulls", "df.remove_nan", "df.drop_empty"],
                df_filter: ["df[df['sales'] > min_sales]", "df.filter_rows('sales', '>', min_sales)", "df.select_where('sales > min_sales')", "df.query_rows(sales > min_sales)"],
                df_groupby_sum: ["valid_df.groupby('category')['revenue'].sum()", "valid_df.group_by('category')['revenue'].aggregate_sum()", "valid_df.group_and_sum('category', 'revenue')", "valid_df.aggregate_by('category').sum('revenue')"],
                df_rename: ["summary.rename(columns={'revenue': 'total_revenue'})", "summary.rename_columns({'revenue': 'total_revenue'})", "summary.change_columns({'revenue': 'total_revenue'})", "summary.map_column_names({'revenue': 'total_revenue'})"]
            }
        }, {
            name: "requests_api",
            base: `import requests

def fetch_user_data(api_url: str, user_id: int):
    url = f"{api_url}/users/{user_id}"
    
    # Make request
    response = {req_get}(url)
    
    # Check status
    if {req_status} != 200:
        return None
        
    # Validate headers
    content_type = {req_header}
    if 'application/json' not in content_type:
        raise ValueError("Invalid content type")
        
    # Parse json
    data = {req_json}()
    
    return data
`,
            options: {
                req_get: ["requests.get", "requests.fetch", "requests.download", "requests.request_get"],
                req_status: ["response.status_code", "response.code", "response.http_status", "response.get_status_code()"],
                req_header: ["response.headers.get('Content-Type', '')", "response.headers.fetch('Content-Type', '')", "response.get_header('Content-Type')", "response.headers.read('Content-Type')"],
                req_json: ["response.json", "response.to_json", "response.get_json", "response.parse_json"]
            }
        }, {
            name: "datetime_ops",
            base: `from datetime import datetime, timedelta

def get_next_billing_date(created_at_str: str):
    # Parse date
    created_at = {dt_parse}
    
    # Calculate next month
    if created_at.month == 12:
        next_month_date = {dt_replace_year}
    else:
        next_month_date = {dt_replace_month}
        
    # Add grace period
    grace_period = {timedelta_days}
    final_date = next_month_date + grace_period
    
    # Format output
    return {dt_format}
`,
            options: {
                dt_parse: ["datetime.strptime(created_at_str, '%Y-%m-%d')", "datetime.parse(created_at_str, '%Y-%m-%d')", "datetime.from_string(created_at_str)", "datetime.string_to_date(created_at_str)"],
                dt_replace_year: ["created_at.replace(year=created_at.year + 1, month=1)", "created_at.update(year=created_at.year + 1, month=1)", "created_at.set_date(year=created_at.year + 1, month=1)"],
                dt_replace_month: ["created_at.replace(month=created_at.month + 1)", "created_at.update(month=created_at.month + 1)", "created_at.set_month(created_at.month + 1)"],
                timedelta_days: ["timedelta(days=7)", "timedelta(timespan_days=7)", "TimeDelta(days=7)", "timedelta(weeks_days=7)"],
                dt_format: ["final_date.strftime('%Y-%m-%d')", "final_date.format('%Y-%m-%d')", "final_date.to_string('%Y-%m-%d')", "final_date.date_format('%Y-%m-%d')"]
            }
        }, {
            name: "json_dict",
            base: `import json

def process_config(json_payload: str):
    try:
        # Parse payload
        config = {json_loads}(json_payload)
    except {json_error}:
        return None
        
    # Get settings
    settings = {dict_get}
    
    # Update nested
    if 'theme' in settings:
        settings.update({'is_dark': True})
    else:
        {dict_merge}
        
    # Serialize
    return {json_dumps}(config)
`,
            options: {
                json_loads: ["json.loads", "json.parse", "json.from_string", "json.load_str"],
                json_error: ["json.JSONDecodeError", "json.ParseError", "json.InvalidJSONError", "json.DecodeException"],
                dict_get: ["config.get('settings', {})", "config.get_or_default('settings', {})", "config.fetch('settings', {})", "config.retrieve('settings', fallback={})"],
                dict_merge: ["settings.update({'theme': 'default'})", "settings.merge({'theme': 'default'})", "settings.combine({'theme': 'default'})", "settings.append({'theme': 'default'})"],
                json_dumps: ["json.dumps", "json.stringify", "json.to_string", "json.dump_str"]
            }
        }, {
            name: "os_file",
            base: `import os

def backup_log_file(log_dir: str, file_name: str, backup_dir: str):
    source_path = {os_join_src}
    
    # Check if exists
    if not {os_exists}(source_path):
        return False
        
    # Ensure backup dir
    {os_makedirs}
        
    dest_path = {os_join_dest}
    
    # Read and copy
    with open(source_path, 'r') as src:
        content = {file_read}
        
    with open(dest_path, 'w') as dest:
        dest.write(content)
        
    return True
`,
            options: {
                os_join_src: ["os.path.join(log_dir, file_name)", "os.join_path(log_dir, file_name)", "os.path.concat(log_dir, file_name)", "os.path.build_path(log_dir, file_name)"],
                os_exists: ["os.path.exists", "os.exists", "os.path.is_existing", "os.file_exists"],
                os_makedirs: ["os.makedirs(backup_dir, exist_ok=True)", "os.make_dirs(backup_dir, ignore_existing=True)", "os.create_directory(backup_dir)", "os.mkdir_recursive(backup_dir)"],
                os_join_dest: ["os.path.join(backup_dir, file_name)", "os.join_path(backup_dir, file_name)", "os.path.concat(backup_dir, file_name)", "os.path.build_path(backup_dir, file_name)"],
                file_read: ["src.read()", "src.read_all()", "src.get_content()", "src.read_to_string()"]
            }
        }]
}
);
var Ht = {};
M(Ht, {
    default: () => ha
});
import ma from "https://cdn.jsdelivr.net/npm/jszip@3/+esm";
import { html as pa } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
async function ha({ user: r, weight: d = 1 }) {
    let t = "q-llm-hallucination-trap-matrix-server"
        , i = "LLM Hallucination Trap Matrix"
        , { scripts: n } = fe(r)
        , p = new ma
        , c = p.folder("scripts");
    for (let o of n)
        c.file(o.filename, o.content);
    p.file("README.md", `# The Hallucination Matrix

## Mission Brief
You have been provided with 1000 Python scripts generated by a rogue LLM.
999 of them contain subtle, highly convincing logical hallucinations. They make calls to 
methods that sound completely plausible but do not actually exist in the Python standard library 
or third-party libraries like \`pandas\` or \`requests\`.

Example of a hallucinated method:
\`\`\`python
# Fake
df.drop_nulls()
# Real
df.dropna()
\`\`\`

## Objective
Exactly ONE script in this folder is 100% syntactically and logically valid, using only real methods and functions.

Write a tool (e.g., using an LLM to statically analyze them, or an AST parser, or simply trying to execute/parse them) to scan through all 1000 files and identify the single correct script.

## Output Structure
Submit the name of the correct script file.
Example: \`script_042.py\`
`);
    let e = await p.generateAsync({
        type: "blob"
    })
        , s = await Ft(r)
        , l = pa`
    <div class="mb-3">
      <h2 id="llm-hallucinations">LLM Hallucination Trap Matrix</h2>
      <p>
        <strong>Syntactic Mirage Detection.</strong> We have a directory of <strong>1000 Python scripts</strong> 
        generated by a misaligned AI.
      </p>

      <p>
        <strong>999</strong> of these scripts contain at least one subtle "hallucination"—a method call that 
        sounds extremely plausible but does not exist in reality (e.g., <code>df.drop_nulls()</code> instead of 
        <code>df.dropna()</code>, or <code>json.parse()</code> instead of <code>json.loads()</code>).
      </p>
      
      <p>
        Exactly <strong>ONE</strong> script out of the 1000 is completely correct and free from hallucinatory method calls.
      </p>

      <h3>Your Task</h3>
      <ol>
        <li>Download the ZIP archive containing the 1000 Python files.</li>
        <li>
          Write a script that uses an LLM (or robust AST/static analysis) to scan through 
          all the files and identify the one valid script.
        </li>
        <li>Find the true script ID and submit it below.</li>
      </ol>

      <p>
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => L(e, `${t}.zip`)}>
          📥 Download Scripts (ZIP)
        </button>
      </p>

      <details class="my-3">
        <summary><strong>💡 Approach Hints</strong></summary>
        <h6>Recommended pipeline:</h6>
        <ol>
          <li>Iterate through the directory containing the 1000 scripts.</li>
          <li>For each file, ask an LLM (like GPT-4o-mini, Claude 3.5 Haiku) if the script contains hallucinated methods. Provide a system prompt defining what "hallucinated methods" are in this context.</li>
          <li>Alternatively, write a rule-based AST visitor to look for common method signatures, or try to dynamically <code>mock</code> the libraries. LLM analysis is generally faster to write.</li>
        </ol>

        <h6>Python skeleton:</h6>
        <pre><code>import os
from openai import OpenAI

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

def check_script_validity(code):
    prompt = f"""Does the following Python script call any fictional/hallucinated methods (e.g., json.parse, df.drop_nulls, requests.fetch)?
Reply with ONLY 'true' if no hallucinations exist, and 'false' if it contains hallucinations.

Code:
{code}"""
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0,
    )
    return "true" in response.choices[0].message.content.lower()

for filename in os.listdir("scripts"):
    with open(f"scripts/{filename}", "r") as f:
        content = f.read()
        
    if check_script_validity(content):
        print(f"Found the real script: {filename}")
        break  # Try more if you get false positives
</code></pre>
      </details>

      <label for="${t}" class="form-label">
        <strong>Identify the correct script</strong> (e.g., script_404.py)
      </label>
      <input
        type="text"
        class="form-control font-monospace"
        id="${t}"
        name="${t}"
        placeholder="script_000.py"
        required
      />
      <div class="form-text">
        Submit the exact filename (including .py) of the one valid script.
      </div>
    </div>

    <div class="alert alert-info" role="alert">
      <strong>🎓 This question tests your ability to:</strong>
      <ul class="mb-0">
        <li>Automate static source code analysis</li>
        <li>Leverage LLMs as programmatic evaluation engines</li>
        <li>Identify common AI hallucinations in code generation</li>
        <li>Build batch processing pipelines</li>
      </ul>
    </div>
  `;
    return {
        id: t,
        title: i,
        weight: d,
        question: l,
        answer: s
    }
}
var zt = j(() => {
    "use strict";
    Vt();
    V()
}
);
var Gt = {};
M(Gt, {
    default: () => Ia
});
import *as J from "https://cdn.jsdelivr.net/npm/@duckdb/duckdb-wasm@1.29.0/+esm";
import { html as ga } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as fa } from "https://cdn.jsdelivr.net/npm/seedrandom/+esm";
async function Ia({ user: r, weight: d = 1 }) {
    let t = "q-duckdb-data-preparation"
        , i = "DuckDB: Data Preparation for RetailCo Analytics"
        , n = fa(`${r.email}#${t}`)
        , p = await Jt.connect()
        , c = ["US", "EU", "APAC", "LATAM"]
        , e = ["Widget", "Gadget", "Gizmo", "Doohickey", "Thingamajig"]
        , s = "LATAM"
        , l = 720
        , o = 323
        , a = "medium"
        , u = [];
    for (let y = 1; y <= 200; y++) {
        let x = c[Math.floor(n() * c.length)]
            , _ = e[Math.floor(n() * e.length)] + " " + y
            , v = Math.floor(n() * 90001) / 100
            , S = y % 5 === 0 ? null : `Customer ${y}`
            , $ = Math.floor(n() * 364)
            , E = new Date(Date.UTC(2025, 0, 1) + $ * 864e5).toISOString().split("T")[0];
        u.push({
            order_id: y,
            customer: S,
            order_date: E,
            product: _,
            amount: v,
            region: x
        })
    }
    await p.query(`
    CREATE TABLE orders (
      order_id INTEGER,
      customer VARCHAR,
      order_date DATE,
      product VARCHAR,
      amount DECIMAL(10,2),
      region VARCHAR
    );
  `);
    for (let y of u) {
        let x = y.customer === null ? "NULL" : `'${y.customer.replace(/'/g, "''")}'`;
        await p.query(`INSERT INTO orders VALUES (${y.order_id}, ${x}, DATE '${y.order_date}', '${y.product.replace(/'/g, "''")}', ${y.amount}, '${y.region}');`)
    }
    let h = `
    SELECT
      COUNT(*) AS order_count,
      ROUND(SUM(amount), 2) AS total_amount
    FROM (
      SELECT
        COALESCE(customer, 'Unknown') AS customer,
        amount,
        CASE
          WHEN amount > ${l} THEN 'high'
          WHEN amount > ${o}  THEN 'medium'
          ELSE 'low'
        END AS price_band
      FROM orders
      WHERE region = '${s}'
    ) sub
    WHERE price_band = '${a}';
  `
        , w = (await p.query(h)).toArray().map(y => y.toJSON())[0]
        , f = Number(w.order_count)
        , b = Number(w.total_amount) / 100
        , m = async y => {
            try {
                let _ = (await p.query(y)).toArray().map(E => E.toJSON());
                if (console.table(_),
                    _.length !== 1)
                    throw new Error(`Expected 1 row, got ${_.length}. See console for your response.`);
                let v = _[0];
                if (!("order_count" in v))
                    throw new Error("Missing column: order_count");
                if (!("total_amount" in v))
                    throw new Error("Missing column: total_amount");
                if (Number(v.order_count) !== f)
                    throw new Error(`order_count: expected ${f}, got ${Number(v.order_count)}`);
                let S = Number(v.total_amount)
                    , $ = S / 100
                    , C = Math.abs($ - b) <= .01 ? $ : S;
                if (Math.abs(C - b) > .01)
                    throw new Error(`total_amount: expected ${b}, got ${C}`);
                return !0
            } catch (x) {
                throw new Error(`Query error: ${x.message}`)
            }
        }
        , g = ga`
    <div class="mb-3">
      <h2>Data Preparation for RetailCo Analytics</h2>
      <p>
        <strong>RetailCo</strong> needs to analyse orders from their <strong>LATAM</strong> region. The database
        contains a table called <code>orders</code> with these columns:
      </p>
      <ul>
        <li><code>order_id</code>: Unique order identifier (INTEGER).</li>
        <li><code>customer</code>: Customer name — some rows are <code>NULL</code> (missing).</li>
        <li><code>order_date</code>: Date of the order (DATE).</li>
        <li><code>product</code>: Product name (VARCHAR).</li>
        <li><code>amount</code>: Order value as a decimal, e.g. <code>452.75</code> (range 0–900).</li>
        <li><code>region</code>: One of <code>US</code>, <code>EU</code>, <code>APAC</code>, <code>LATAM</code>.</li>
      </ul>
      <p>Write a <strong>single DuckDB SQL query</strong> that:</p>
      <ol>
        <li>Filters to orders from the <strong>LATAM</strong> region only.</li>
        <li>Replaces <code>NULL</code> customer names with <code>'Unknown'</code> using <code>COALESCE</code>.</li>
        <li>
          Assigns each order a <code>price_band</code> using a <code>CASE</code> expression:
          <ul>
            <li><code>'high'</code> if <code>amount &gt; 720</code></li>
            <li><code>'medium'</code> if <code>amount &gt; 323</code></li>
            <li><code>'low'</code> otherwise</li>
          </ul>
        </li>
        <li>
          Returns exactly <strong>one row</strong> for the <strong><code>medium</code></strong> price band containing:
          <ul>
            <li><code>order_count</code>: the number of orders in that band.</li>
            <li><code>total_amount</code>: the sum of amounts in that band (rounded to 2 decimal places).</li>
          </ul>
        </li>
      </ol>
      <label for="${t}" class="form-label">Enter your DuckDB SQL query:</label>
      <textarea class="form-control font-monospace text-bg-dark" rows="8" id="${t}" name="${t}"></textarea>
      <p class="text-muted">Open the browser console to inspect your query output.</p>
    </div>
  `;
    return {
        id: t,
        title: i,
        weight: d,
        question: g,
        answer: m
    }
}
var ya, ye, wa, ba, va, Jt, Ut = j(async () => {
    "use strict";
    ya = J.getJsDelivrBundles(),
        ye = await J.selectBundle(ya),
        wa = URL.createObjectURL(new Blob([`importScripts("${ye.mainWorker}");`], {
            type: "text/javascript"
        })),
        ba = new Worker(wa),
        va = new J.ConsoleLogger,
        Jt = new J.AsyncDuckDB(va, ba);
    await Jt.instantiate(ye.mainModule, ye.pthreadWorker)
}
);
var Bt, Wt, Yt = j(() => {
    "use strict";
    Bt = r => new Promise((d, t) => {
        let i = new Image;
        i.onload = () => d(i),
            i.onerror = t,
            i.src = r
    }
    ),
        Wt = r => {
            let d = document.createElement("canvas")
                , t = d.getContext("2d");
            return d.width = r.width,
                d.height = r.height,
                t.drawImage(r, 0, 0),
                t.getImageData(0, 0, d.width, d.height).data
        }
}
);
var Zt = {};
M(Zt, {
    default: () => xa
});
import { html as Xt } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
async function xa({ weight: r = 1 }) {
    let d = "q-image-grayscale-rebuild"
        , t = "Reconstruct and desaturate an image"
        , i = await fetch("jigsaw.webp").then(I => I.blob())
        , n = await createImageBitmap(i)
        , p = 5
        , c = n.width / p
        , e = n.height / p
        , s = document.createElement("canvas");
    s.width = n.width,
        s.height = n.height;
    let l = s.getContext("2d");
    Object.entries(Kt).forEach(([I, w]) => {
        let [f, b] = I.split(",").map(Number)
            , [m, g] = w.split(",").map(Number)
            , y = b * c
            , x = f * e
            , _ = g * c
            , v = m * e;
        l.drawImage(n, y, x, c, e, _, v, c, e)
    }
    );
    let o = l.getImageData(0, 0, s.width, s.height)
        , a = new Uint8ClampedArray(o.data.length);
    for (let I = 0; I < o.data.length; I += 4) {
        let w = o.data[I]
            , f = o.data[I + 1]
            , b = o.data[I + 2]
            , m = o.data[I + 3]
            , g = Math.round(.2126 * w + .7152 * f + .0722 * b);
        a[I] = a[I + 1] = a[I + 2] = g,
            a[I + 3] = m
    }
    let u = async () => {
        let I = document.getElementById(d);
        if (!I.files.length)
            throw new Error("Upload your reconstructed grayscale image.");
        let w = I.files[0]
            , f = await Bt(URL.createObjectURL(w));
        if (f.width !== s.width || f.height !== s.height)
            throw new Error("Image dimensions do not match the original.");
        let b = Wt(f);
        for (let m = 0; m < a.length; m++)
            if (a[m] !== b[m])
                throw new Error("Pixel data does not match the expected grayscale reconstruction.");
        return !0
    }
        , h = Xt`
    <div class="mb-3">
      <h2 id="forensic-desaturation-task">Forensic desaturation task for PixelGuard</h2>
      <p>
        PixelGuard received a scrambled promotional image. To trace tampering, they need a desaturated (grayscale)
        reconstruction of the original picture. The puzzle is identical to the one used in the internal orientation, but
        this time the legal team wants a grayscale version to highlight contrast changes.
      </p>
      <h3>Steps</h3>
      <ol>
        <li>Download the scrambled puzzle (<code>jigsaw.webp</code>).</li>
        <li>Reassemble the 5×5 grid using the mapping provided below.</li>
        <li>
          Convert the reconstructed image to grayscale using luminance coefficients (0.2126 R, 0.7152 G, 0.0722 B).
        </li>
        <li>
          Export the grayscale image without resizing or recompression artefacts (lossless formats such as PNG or WEBP).
        </li>
      </ol>
      <p>
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => L(i, "jigsaw.webp")}>
          Download jigsaw.webp
        </button>
      </p>
      <table class="table table-sm">
        <thead>
          <tr>
            <th>Scrambled Row</th>
            <th>Scrambled Column</th>
            <th>Original Row</th>
            <th>Original Column</th>
          </tr>
        </thead>
        <tbody>
          ${Object.entries(Kt).map(([I, w]) => Xt`<tr>
                <td>${I.split(",")[0]}</td>
                <td>${I.split(",")[1]}</td>
                <td>${w.split(",")[0]}</td>
                <td>${w.split(",")[1]}</td>
              </tr>`)}
        </tbody>
      </table>
      <label for="${d}" class="form-label">Upload the reconstructed grayscale image:</label>
      <input class="form-control" id="${d}" name="${d}" type="file" accept="image/*" />
      <p class="text-muted">Your upload must exactly match the luminance-based grayscale conversion.</p>
    </div>
  `;
    return {
        id: d,
        title: t,
        weight: r,
        question: h,
        answer: u
    }
}
var Kt, Qt = j(() => {
    "use strict";
    V();
    Yt();
    Kt = {
        "0,0": "2,1",
        "0,1": "1,1",
        "0,2": "4,1",
        "0,3": "0,3",
        "0,4": "0,1",
        "1,0": "1,4",
        "1,1": "2,0",
        "1,2": "2,4",
        "1,3": "4,2",
        "1,4": "2,2",
        "2,0": "0,0",
        "2,1": "3,2",
        "2,2": "4,3",
        "2,3": "3,0",
        "2,4": "3,4",
        "3,0": "1,0",
        "3,1": "2,3",
        "3,2": "3,3",
        "3,3": "4,4",
        "3,4": "0,2",
        "4,0": "3,1",
        "4,1": "1,2",
        "4,2": "1,3",
        "4,3": "0,4",
        "4,4": "4,0"
    }
}
);
var en = {};
M(en, {
    default: () => $a
});
import { html as ka } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
import { default as _a } from "https://cdn.jsdelivr.net/npm/seedrandom/+esm";
async function $a({ user: r, weight: d = 1 }) {
    let t = "q-audio-transcript-extraction"
        , i = "Extracting Audio and Transcripts"
        , n = _a(`${r.email}#${t}`)
        , p = [{
            url: "https://www.youtube.com/watch?v=MPV7JXTWPWI",
            title: "FFmpeg in 12 Minutes",
            segments: [{
                start: "00:00:10",
                end: "00:00:40",
                keywords: ["command line", "file format conversion", "license", "background"]
            }, {
                start: "00:01:00",
                end: "00:01:30",
                keywords: ["random wednesday", "install", "basics", "0612"]
            }, {
                start: "00:02:00",
                end: "00:02:30",
                keywords: ["static version", "archive", "download", "convenient"]
            }, {
                start: "00:03:00",
                end: "00:03:30",
                keywords: ["path variable", "folder", "convert files", "optional"]
            }]
        }, {
            url: "https://www.youtube.com/watch?v=6Qs3wObeWwc",
            title: "Python Tutorial: Image Manipulation with Pillow",
            segments: [{
                start: "00:00:15",
                end: "00:00:45",
                keywords: ["displaying", "resizing", "thumbnails", "resize", "script"]
            }, {
                start: "00:01:10",
                end: "00:01:40",
                keywords: ["documentation", "pip install", "homebrew", "brew install", "external libraries"]
            }, {
                start: "00:02:05",
                end: "00:02:35",
                keywords: ["from pil import", "pil import", "pip install pillow", "no errors", "no output"]
            }, {
                start: "00:03:10",
                end: "00:03:40",
                keywords: ["image.open", "image one", "pup one", "jpeg", "preview"]
            }]
        }, {
            url: "https://www.youtube.com/watch?v=wjcBOoReYc0",
            title: "ImageMagick Introduction",
            segments: [{
                start: "00:00:20",
                end: "00:00:50",
                keywords: ["documentation", "introduction", "manipulate", "command line"]
            }, {
                start: "00:01:15",
                end: "00:01:45",
                keywords: ["automating", "script", "saving", "manipulation"]
            }, {
                start: "00:02:10",
                end: "00:02:40",
                keywords: ["version 6", "identify command", "image magic", "print"]
            }, {
                start: "00:03:05",
                end: "00:03:35",
                keywords: ["verbose", "wordy", "terminal", "identify"]
            }]
        }]
        , c = p[Math.floor(n() * p.length)]
        , e = c.segments[Math.floor(n() * c.segments.length)]
        , s = async o => {
            let a = o.trim();
            if (!a)
                throw new Error("Transcript is empty. Please paste the transcribed text.");
            let u = a.split(/\s+/).filter(Boolean).length;
            if (u < 15)
                throw new Error(`Transcript is too short (${u} words). The segment is 30 seconds \u2014 transcribe all spoken words from ${e.start} to ${e.end}.`);
            let h = a.toLowerCase();
            if (!e.keywords.some(w => h.includes(w.toLowerCase())))
                throw new Error(`Transcript does not appear to match the expected segment. Make sure you are transcribing the correct video ("${c.title}") between ${e.start} and ${e.end}.`);
            return !0
        }
        , l = ka`
    <div class="mb-3">
      <h2>Audio Extraction and Transcription for MediaIndex</h2>
      <p>
        <strong>MediaIndex</strong> is building a searchable archive of educational video content. They need you to
        extract and transcribe a specific 30-second segment from a YouTube video.
      </p>
      <ul>
        <li>
          <strong>Video:</strong>
          <a href="${c.url}" target="_blank">${c.title}</a>
        </li>
        <li><strong>Start time:</strong> <code>${e.start}</code></li>
        <li><strong>End time:</strong> <code>${e.end}</code></li>
      </ul>
      <p><strong>Steps:</strong></p>
      <ol>
        <li>
          Download the audio using <code>yt-dlp</code>:
          <pre><code class="language-bash">yt-dlp -f "ba[abr&lt;50]/worstaudio" --extract-audio --audio-format mp3 --audio-quality 32k \
  -o "audio.%(ext)s" "${c.url}"</code></pre>
        </li>
        <li>
          Trim to the required segment using <code>ffmpeg</code>:
          <pre><code class="language-bash">ffmpeg -ss ${e.start} -to ${e.end} -i audio.mp3 -c copy segment.mp3</code></pre>
        </li>
        <li>
          Transcribe using <code>faster-whisper</code> or the Gemini API:
          <pre><code class="language-bash"># Option A: faster-whisper (install: pip install faster-whisper)
faster-whisper segment.mp3 --model medium --language en

# Option B: Gemini API
curl -s -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-002:generateContent?key=$GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"contents\":[{\"parts\":[{\"inline_data\":{\"mime_type\":\"audio/mp3\",\"data\":\"$(base64 --wrap=0 segment.mp3)\"}},{\"text\":\"Transcribe this audio faithfully.\"}]}]}"</code></pre>
        </li>
        <li>Paste the full transcript text below.</li>
      </ol>
      <label for="${t}" class="form-label">
        Paste the transcript of the segment from <strong>${e.start}</strong> to
        <strong>${e.end}</strong>:
      </label>
      <textarea class="form-control" id="${t}" name="${t}" rows="6" placeholder="Paste all spoken words here..."></textarea>
      <p class="text-muted">Include all spoken words. Punctuation and exact casing are not required.</p>
    </div>
  `;
    return {
        id: t,
        title: i,
        weight: d,
        question: l,
        answer: s
    }
}
var tn = j(() => {
    "use strict"
}
);
import { html as K, render as un } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
function we(r, d) {
    let t = K`<ol class="mt-3">
    ${r.map(({ id: p, title: c, weight: e }) => K`<li><a href="#h${p}">${c}</a> (${e} ${e == 1 ? "mark" : "marks"})</li>`)}
  </ol>`
        , i = [K`<h1 class="display-6">Questions</h1>`, t, ...r.map(({ id: p, title: c, weight: e, question: s, help: l }, o) => (l && !Array.isArray(l) && (l = [l]),
            K`
        <div class="card my-5" data-question="${p}" id="h${p}">
          <div class="card-header">
            <span class="badge text-bg-primary me-2">${o + 1}</span>
            ${c} (${e} ${e == 1 ? "mark" : "marks"})
          </div>
          ${l ? l.map(a => K`<div class="card-body border-bottom">${a}</div>`) : ""}
          <div class="card-body">${s}</div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-primary check-answer" data-question="${p}">Check</button>
          </div>
        </div>
      `))]
        , n = {
            index: t,
            questions: i
        };
    for (let [p, c] of d)
        un(n[c], p)
}
import { unsafeHTML as mn } from "https://cdn.jsdelivr.net/npm/lit-html@3/directives/unsafe-html.js";
import { Marked as pn } from "https://cdn.jsdelivr.net/npm/marked@13/+esm";
var be = "https://tds.s-anand.net"
    , ve = r => r && !r.match(/^(https?|mailto):/)
    , hn = new pn({
        renderer: {
            image(r, d, t) {
                return ve(r) && (r = `${be}/${r}`),
                    `<img src="${r}" alt="${t}" ${d ? `title="${d}"` : ""} class="img-fluid" loading="lazy">`
            },
            link(r, d, t) {
                return ve(r) && (r = `${be}/${r.endsWith(".md") ? `#/${r.replace(/\.md$/, "")}` : r}`),
                    `<a href="${r}" ${d ? `title="${d}"` : ""} target="_blank">${t}</a>`
            }
        }
    })
    , P = r => mn(hn.parse(r));
async function zo(r, d) {
    let t = [{
        ...await Promise.resolve().then(() => (qe(),
            Oe)).then(i => i.default({
                user: r,
                weight: 1
            })),
        help: [P(`
### Ask AI
- [How do I consolidate operational metrics across regions in Excel?](#askai)
- [What Excel functions are best for cleaning and standardizing messy data?](#askai)
- [How do I automate aggregation and reporting in Excel for large datasets?](#askai)
      `)]
    }, {
        ...await Promise.resolve().then(() => (He(),
            Ve)).then(i => i.default({
                user: r,
                weight: 1
            })),
        help: [P(`
### Ask AI
- [How do I detect outliers in Excel using Z-scores?](#askai)
- [What are the best practices for flagging and handling outliers in business data?](#askai)
- [How can I visualize outliers in Excel charts?](#askai)
      `)]
    }, {
        ...await Promise.resolve().then(() => (Ge(),
            Je)).then(i => i.default({
                user: r,
                weight: 1
            })),
        help: [P(`
### Ask AI
- [How do I build customer analytics models in dbt?](#askai)
- [What are the best practices for staging and mart models in dbt?](#askai)
- [How do I validate and test dbt models for accuracy?](#askai)
      `)]
    }, {
        ...await Promise.resolve().then(() => (We(),
            Be)).then(i => i.default({
                user: r,
                weight: 1
            })),
        help: [P(`
### Ask AI
- [How do I build operations dashboards in dbt?](#askai)
- [What metrics are most useful for monitoring fulfillment and support flows?](#askai)
- [How do I automate dashboard updates with dbt and BI tools?](#askai)
      `)]
    }, {
        ...await Promise.resolve().then(() => (Ke(),
            Xe)).then(i => i.default({
                user: r,
                weight: 1
            })),
        help: [P(`
### Ask AI
- [How do I use OpenRefine to clean and consolidate supplier data?](#askai)
- [What are the best OpenRefine transformations for messy real-world data?](#askai)
- [How do I export and use OpenRefine results in other tools?](#askai)
      `)]
    }, {
        ...await Promise.resolve().then(() => (et(),
            Qe)).then(i => i.default({
                user: r,
                weight: 1
            })),
        help: [P(`
### Ask AI
- [How do I aggregate sensor data from JSON logs?](#askai)
- [What are the best ways to handle missing or inconsistent JSON fields?](#askai)
- [How do I automate roll-up analytics for IoT data?](#askai)
      `)]
    }, {
        ...await Promise.resolve().then(() => (at(),
            nt)).then(i => i.default({
                user: r,
                weight: 1
            })),
        help: [P(`
### Ask AI
- [How do I flatten nested JSON structures for analytics?](#askai)
- [What tools and libraries help with JSON flattening in Python/JavaScript?](#askai)
- [How do I validate and test flattened data for correctness?](#askai)
      `)]
    }, {
        ...await Promise.resolve().then(() => (st(),
            rt)).then(i => i.default({
                user: r,
                weight: 1
            })),
        help: [P(`
### Ask AI
- [How do I recover and parse partial or corrupted JSON data?](#askai)
- [What are the best practices for error handling in JSON parsing?](#askai)
- [How do I aggregate values from incomplete data sources?](#askai)
      `)]
    }, {
        ...await Promise.resolve().then(() => (lt(),
            it)).then(i => i.default({
                user: r,
                weight: 1
            })),
        help: [P(`
### Ask AI
- [How do I automate data transformation tasks with AI tools?](#askai)
- [What are the best practices for validating programmatic data transformations?](#askai)
- [How do I integrate AI-driven transformations into business workflows?](#askai)
      `)]
    }, {
        ...await Promise.resolve().then(() => (mt(),
            ut)).then(i => i.default({
                user: r,
                weight: 1
            })),
        help: [P(`
### Ask AI
- [How do I use the =AI() formula in Google Sheets to extract data from noisy text?](#askai)
- [What are best practices for handling missing or inconsistent data with AI formulas?](#askai)
- [How can I validate AI formula results for data quality?](#askai)
      `)]
    }, {
        ...await Promise.resolve().then(() => (ht(),
            pt)).then(i => i.default({
                weight: 1
            })),
        help: [P(`
### Ask AI
- [How do I build a FastAPI endpoint for batch text classification?](#askai)
- [What are best practices for sentiment analysis in production systems?](#askai)
- [How do I test and validate ML model outputs in an API?](#askai)
      `)]
    }, {
        ...await Promise.resolve().then(() => (wt(),
            yt)).then(i => i.default({
                user: r,
                weight: 1
            })),
        help: [P(`
### Ask AI
- [How do I clean and parse messy CSV data in the shell?](#askai)
- [What awk and sed patterns are useful for data transformation?](#askai)
- [How do I aggregate data using shell tools?](#askai)
      `)]
    }, {
        ...await Promise.resolve().then(() => (xt(),
            It)).then(i => i.default({
                user: r,
                weight: 1
            })),
        help: [P(`
### Ask AI
- [How do I use jq to extract nested JSON fields?](#askai)
- [What are best practices for processing multiple JSON files in the shell?](#askai)
- [How do I aggregate and count data from JSON using shell tools?](#askai)
      `)]
    }, {
        ...await Promise.resolve().then(() => (St(),
            $t)).then(i => i.default({
                user: r,
                weight: 1
            })),
        help: [P(`
### Ask AI
- [How do I normalize and deduplicate text data in the shell?](#askai)
- [What tools are best for handling semi-structured data?](#askai)
- [How do I count unique values efficiently using shell commands?](#askai)
      `)]
    }, {
        ...await Promise.resolve().then(() => (Et(),
            Tt)).then(i => i.default({
                user: r,
                weight: 1
            })),
        help: [P(`
### Ask AI
- [How do I parse and filter highly corrupted JSON line by line?](#askai)
- [How can I process 50MB files without running out of memory in Node or Python?](#askai)
- [What's the best way to write a awk or python script to salvage valid JSON records?](#askai)
      `)]
    }, {
        ...await Promise.resolve().then(() => (Nt(),
            Rt)).then(i => i.default({
                user: r,
                weight: 1
            })),
        help: [P(`
### Ask AI
- [How do I build an LLM pipeline to disambiguate named entities across multiple languages?](#askai)
- [What are best practices for cross-lingual entity resolution with contextual clues?](#askai)
- [How do I handle name variants like John/Juan/Jean/Johann across 15 languages?](#askai)
      `)]
    }, {
        ...await Promise.resolve().then(() => (zt(),
            Ht)).then(i => i.default({
                user: r,
                weight: 1
            })),
        help: [P(`
### Ask AI
- [How can I use an LLM to identify subtle method name hallucinations in code?](#askai)
- [Write a prompt to detect non-existent Python function calls.](#askai)
- [How do I automate static analysis across 500 files using an AI API?](#askai)
      `)]
    }, {
        ...await Ut().then(() => Gt).then(i => i.default({
            user: r,
            weight: 1
        })),
        help: [P(`
### Ask AI
- [How do I use COALESCE in DuckDB to replace NULL values?](#askai)
- [How do I write a CASE expression in DuckDB to bin numeric values into categories?](#askai)
- [How do I filter rows and aggregate totals in a single DuckDB SQL query?](#askai)
      `)]
    }, {
        ...await Promise.resolve().then(() => (Qt(),
            Zt)).then(i => i.default({
                user: r,
                weight: 1
            })),
        help: [P(`
### Ask AI
- [How do I reassemble a scrambled image grid using Pillow?](#askai)
- [How do I convert an image to grayscale using the luminance formula in Python?](#askai)
- [What is the ITU-R BT.601 luminance formula and why is it used for grayscale conversion?](#askai)
      `)]
    }, {
        ...await Promise.resolve().then(() => (tn(),
            en)).then(i => i.default({
                user: r,
                weight: 1
            })),
        help: [P(`
### Ask AI
- [How do I download audio from a YouTube video using yt-dlp?](#askai)
- [How do I trim an audio file to a specific start and end time using ffmpeg?](#askai)
- [How do I transcribe an audio segment using faster-whisper or the Gemini API?](#askai)
      `)]
    }];
    return we(t, d),
        Object.fromEntries(t.map(({ id: i, ...n }) => [i, n]))
}
export { zo as questions };
