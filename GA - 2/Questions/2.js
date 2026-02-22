var Zt = Object.create;
var ye = Object.defineProperty;
var eo = Object.getOwnPropertyDescriptor;
var to = Object.getOwnPropertyNames;
var oo = Object.getPrototypeOf
    , ro = Object.prototype.hasOwnProperty;
var U = (t, a) => () => (t && (a = t(t = 0)),
    a);
var V = (t, a) => () => (a || t((a = {
    exports: {}
}).exports, a),
    a.exports)
    , q = (t, a) => {
        for (var e in a)
            ye(t, e, {
                get: a[e],
                enumerable: !0
            })
    }
    , no = (t, a, e, s) => {
        if (a && typeof a == "object" || typeof a == "function")
            for (let i of to(a))
                !ro.call(t, i) && i !== e && ye(t, i, {
                    get: () => a[i],
                    enumerable: !(s = eo(a, i)) || s.enumerable
                });
        return t
    }
    ;
var z = (t, a, e) => (e = t != null ? Zt(oo(t)) : {},
    no(a || !t || !t.__esModule ? ye(e, "default", {
        value: t,
        enumerable: !0
    }) : e, t));
var je = V((Pe, be) => {
    (function (t, a, e) {
        function s(o) {
            var c = this
                , d = n();
            c.next = function () {
                var r = 2091639 * c.s0 + c.c * 23283064365386963e-26;
                return c.s0 = c.s1,
                    c.s1 = c.s2,
                    c.s2 = r - (c.c = r | 0)
            }
                ,
                c.c = 1,
                c.s0 = d(" "),
                c.s1 = d(" "),
                c.s2 = d(" "),
                c.s0 -= d(o),
                c.s0 < 0 && (c.s0 += 1),
                c.s1 -= d(o),
                c.s1 < 0 && (c.s1 += 1),
                c.s2 -= d(o),
                c.s2 < 0 && (c.s2 += 1),
                d = null
        }
        function i(o, c) {
            return c.c = o.c,
                c.s0 = o.s0,
                c.s1 = o.s1,
                c.s2 = o.s2,
                c
        }
        function h(o, c) {
            var d = new s(o)
                , r = c && c.state
                , l = d.next;
            return l.int32 = function () {
                return d.next() * 4294967296 | 0
            }
                ,
                l.double = function () {
                    return l() + (l() * 2097152 | 0) * 11102230246251565e-32
                }
                ,
                l.quick = l,
                r && (typeof r == "object" && i(r, d),
                    l.state = function () {
                        return i(d, {})
                    }
                ),
                l
        }
        function n() {
            var o = 4022871197
                , c = function (d) {
                    d = String(d);
                    for (var r = 0; r < d.length; r++) {
                        o += d.charCodeAt(r);
                        var l = .02519603282416938 * o;
                        o = l >>> 0,
                            l -= o,
                            l *= o,
                            o = l >>> 0,
                            l -= o,
                            o += l * 4294967296
                    }
                    return (o >>> 0) * 23283064365386963e-26
                };
            return c
        }
        a && a.exports ? a.exports = h : e && e.amd ? e(function () {
            return h
        }) : this.alea = h
    }
    )(Pe, typeof be == "object" && be, typeof define == "function" && define)
}
);
var qe = V((He, ve) => {
    (function (t, a, e) {
        function s(n) {
            var o = this
                , c = "";
            o.x = 0,
                o.y = 0,
                o.z = 0,
                o.w = 0,
                o.next = function () {
                    var r = o.x ^ o.x << 11;
                    return o.x = o.y,
                        o.y = o.z,
                        o.z = o.w,
                        o.w ^= o.w >>> 19 ^ r ^ r >>> 8
                }
                ,
                n === (n | 0) ? o.x = n : c += n;
            for (var d = 0; d < c.length + 64; d++)
                o.x ^= c.charCodeAt(d) | 0,
                    o.next()
        }
        function i(n, o) {
            return o.x = n.x,
                o.y = n.y,
                o.z = n.z,
                o.w = n.w,
                o
        }
        function h(n, o) {
            var c = new s(n)
                , d = o && o.state
                , r = function () {
                    return (c.next() >>> 0) / 4294967296
                };
            return r.double = function () {
                do
                    var l = c.next() >>> 11
                        , p = (c.next() >>> 0) / 4294967296
                        , u = (l + p) / (1 << 21);
                while (u === 0);
                return u
            }
                ,
                r.int32 = c.next,
                r.quick = r,
                d && (typeof d == "object" && i(d, c),
                    r.state = function () {
                        return i(c, {})
                    }
                ),
                r
        }
        a && a.exports ? a.exports = h : e && e.amd ? e(function () {
            return h
        }) : this.xor128 = h
    }
    )(He, typeof ve == "object" && ve, typeof define == "function" && define)
}
);
var We = V((Oe, $e) => {
    (function (t, a, e) {
        function s(n) {
            var o = this
                , c = "";
            o.next = function () {
                var r = o.x ^ o.x >>> 2;
                return o.x = o.y,
                    o.y = o.z,
                    o.z = o.w,
                    o.w = o.v,
                    (o.d = o.d + 362437 | 0) + (o.v = o.v ^ o.v << 4 ^ (r ^ r << 1)) | 0
            }
                ,
                o.x = 0,
                o.y = 0,
                o.z = 0,
                o.w = 0,
                o.v = 0,
                n === (n | 0) ? o.x = n : c += n;
            for (var d = 0; d < c.length + 64; d++)
                o.x ^= c.charCodeAt(d) | 0,
                    d == c.length && (o.d = o.x << 10 ^ o.x >>> 4),
                    o.next()
        }
        function i(n, o) {
            return o.x = n.x,
                o.y = n.y,
                o.z = n.z,
                o.w = n.w,
                o.v = n.v,
                o.d = n.d,
                o
        }
        function h(n, o) {
            var c = new s(n)
                , d = o && o.state
                , r = function () {
                    return (c.next() >>> 0) / 4294967296
                };
            return r.double = function () {
                do
                    var l = c.next() >>> 11
                        , p = (c.next() >>> 0) / 4294967296
                        , u = (l + p) / (1 << 21);
                while (u === 0);
                return u
            }
                ,
                r.int32 = c.next,
                r.quick = r,
                d && (typeof d == "object" && i(d, c),
                    r.state = function () {
                        return i(c, {})
                    }
                ),
                r
        }
        a && a.exports ? a.exports = h : e && e.amd ? e(function () {
            return h
        }) : this.xorwow = h
    }
    )(Oe, typeof $e == "object" && $e, typeof define == "function" && define)
}
);
var _e = V((Le, ke) => {
    (function (t, a, e) {
        function s(n) {
            var o = this;
            o.next = function () {
                var d = o.x, r = o.i, l, p, u;
                return l = d[r],
                    l ^= l >>> 7,
                    p = l ^ l << 24,
                    l = d[r + 1 & 7],
                    p ^= l ^ l >>> 10,
                    l = d[r + 3 & 7],
                    p ^= l ^ l >>> 3,
                    l = d[r + 4 & 7],
                    p ^= l ^ l << 7,
                    l = d[r + 7 & 7],
                    l = l ^ l << 13,
                    p ^= l ^ l << 9,
                    d[r] = p,
                    o.i = r + 1 & 7,
                    p
            }
                ;
            function c(d, r) {
                var l, p, u = [];
                if (r === (r | 0))
                    p = u[0] = r;
                else
                    for (r = "" + r,
                        l = 0; l < r.length; ++l)
                        u[l & 7] = u[l & 7] << 15 ^ r.charCodeAt(l) + u[l + 1 & 7] << 13;
                for (; u.length < 8;)
                    u.push(0);
                for (l = 0; l < 8 && u[l] === 0; ++l)
                    ;
                for (l == 8 ? p = u[7] = -1 : p = u[l],
                    d.x = u,
                    d.i = 0,
                    l = 256; l > 0; --l)
                    d.next()
            }
            c(o, n)
        }
        function i(n, o) {
            return o.x = n.x.slice(),
                o.i = n.i,
                o
        }
        function h(n, o) {
            n == null && (n = +new Date);
            var c = new s(n)
                , d = o && o.state
                , r = function () {
                    return (c.next() >>> 0) / 4294967296
                };
            return r.double = function () {
                do
                    var l = c.next() >>> 11
                        , p = (c.next() >>> 0) / 4294967296
                        , u = (l + p) / (1 << 21);
                while (u === 0);
                return u
            }
                ,
                r.int32 = c.next,
                r.quick = r,
                d && (d.x && i(d, c),
                    r.state = function () {
                        return i(c, {})
                    }
                ),
                r
        }
        a && a.exports ? a.exports = h : e && e.amd ? e(function () {
            return h
        }) : this.xorshift7 = h
    }
    )(Le, typeof ke == "object" && ke, typeof define == "function" && define)
}
);
var Ge = V((De, xe) => {
    (function (t, a, e) {
        function s(n) {
            var o = this;
            o.next = function () {
                var d = o.w, r = o.X, l = o.i, p, u;
                return o.w = d = d + 1640531527 | 0,
                    u = r[l + 34 & 127],
                    p = r[l = l + 1 & 127],
                    u ^= u << 13,
                    p ^= p << 17,
                    u ^= u >>> 15,
                    p ^= p >>> 12,
                    u = r[l] = u ^ p,
                    o.i = l,
                    u + (d ^ d >>> 16) | 0
            }
                ;
            function c(d, r) {
                var l, p, u, f, v, g = [], y = 128;
                for (r === (r | 0) ? (p = r,
                    r = null) : (r = r + "\0",
                        p = 0,
                        y = Math.max(y, r.length)),
                    u = 0,
                    f = -32; f < y; ++f)
                    r && (p ^= r.charCodeAt((f + 32) % r.length)),
                        f === 0 && (v = p),
                        p ^= p << 10,
                        p ^= p >>> 15,
                        p ^= p << 4,
                        p ^= p >>> 13,
                        f >= 0 && (v = v + 1640531527 | 0,
                            l = g[f & 127] ^= p + v,
                            u = l == 0 ? u + 1 : 0);
                for (u >= 128 && (g[(r && r.length || 0) & 127] = -1),
                    u = 127,
                    f = 4 * 128; f > 0; --f)
                    p = g[u + 34 & 127],
                        l = g[u = u + 1 & 127],
                        p ^= p << 13,
                        l ^= l << 17,
                        p ^= p >>> 15,
                        l ^= l >>> 12,
                        g[u] = p ^ l;
                d.w = v,
                    d.X = g,
                    d.i = u
            }
            c(o, n)
        }
        function i(n, o) {
            return o.i = n.i,
                o.w = n.w,
                o.X = n.X.slice(),
                o
        }
        function h(n, o) {
            n == null && (n = +new Date);
            var c = new s(n)
                , d = o && o.state
                , r = function () {
                    return (c.next() >>> 0) / 4294967296
                };
            return r.double = function () {
                do
                    var l = c.next() >>> 11
                        , p = (c.next() >>> 0) / 4294967296
                        , u = (l + p) / (1 << 21);
                while (u === 0);
                return u
            }
                ,
                r.int32 = c.next,
                r.quick = r,
                d && (d.X && i(d, c),
                    r.state = function () {
                        return i(c, {})
                    }
                ),
                r
        }
        a && a.exports ? a.exports = h : e && e.amd ? e(function () {
            return h
        }) : this.xor4096 = h
    }
    )(De, typeof xe == "object" && xe, typeof define == "function" && define)
}
);
var Fe = V((Me, Ae) => {
    (function (t, a, e) {
        function s(n) {
            var o = this
                , c = "";
            o.next = function () {
                var r = o.b
                    , l = o.c
                    , p = o.d
                    , u = o.a;
                return r = r << 25 ^ r >>> 7 ^ l,
                    l = l - p | 0,
                    p = p << 24 ^ p >>> 8 ^ u,
                    u = u - r | 0,
                    o.b = r = r << 20 ^ r >>> 12 ^ l,
                    o.c = l = l - p | 0,
                    o.d = p << 16 ^ l >>> 16 ^ u,
                    o.a = u - r | 0
            }
                ,
                o.a = 0,
                o.b = 0,
                o.c = -1640531527,
                o.d = 1367130551,
                n === Math.floor(n) ? (o.a = n / 4294967296 | 0,
                    o.b = n | 0) : c += n;
            for (var d = 0; d < c.length + 20; d++)
                o.b ^= c.charCodeAt(d) | 0,
                    o.next()
        }
        function i(n, o) {
            return o.a = n.a,
                o.b = n.b,
                o.c = n.c,
                o.d = n.d,
                o
        }
        function h(n, o) {
            var c = new s(n)
                , d = o && o.state
                , r = function () {
                    return (c.next() >>> 0) / 4294967296
                };
            return r.double = function () {
                do
                    var l = c.next() >>> 11
                        , p = (c.next() >>> 0) / 4294967296
                        , u = (l + p) / (1 << 21);
                while (u === 0);
                return u
            }
                ,
                r.int32 = c.next,
                r.quick = r,
                d && (typeof d == "object" && i(d, c),
                    r.state = function () {
                        return i(c, {})
                    }
                ),
                r
        }
        a && a.exports ? a.exports = h : e && e.amd ? e(function () {
            return h
        }) : this.tychei = h
    }
    )(Me, typeof Ae == "object" && Ae, typeof define == "function" && define)
}
);
var Ne = V(() => { }
);
var ze = V((Be, he) => {
    (function (t, a, e) {
        var s = 256, i = 6, h = 52, n = "random", o = e.pow(s, i), c = e.pow(2, h), d = c * 2, r = s - 1, l;
        function p(w, k, E) {
            var b = [];
            k = k == !0 ? {
                entropy: !0
            } : k || {};
            var m = g(v(k.entropy ? [w, A(a)] : w ?? y(), 3), b)
                , $ = new u(b)
                , x = function () {
                    for (var S = $.g(i), P = o, I = 0; S < c;)
                        S = (S + I) * s,
                            P *= s,
                            I = $.g(1);
                    for (; S >= d;)
                        S /= 2,
                            P /= 2,
                            I >>>= 1;
                    return (S + I) / P
                };
            return x.int32 = function () {
                return $.g(4) | 0
            }
                ,
                x.quick = function () {
                    return $.g(4) / 4294967296
                }
                ,
                x.double = x,
                g(A($.S), a),
                (k.pass || E || function (S, P, I, R) {
                    return R && (R.S && f(R, $),
                        S.state = function () {
                            return f($, {})
                        }
                    ),
                        I ? (e[n] = S,
                            P) : S
                }
                )(x, m, "global" in k ? k.global : this == e, k.state)
        }
        function u(w) {
            var k, E = w.length, b = this, m = 0, $ = b.i = b.j = 0, x = b.S = [];
            for (E || (w = [E++]); m < s;)
                x[m] = m++;
            for (m = 0; m < s; m++)
                x[m] = x[$ = r & $ + w[m % E] + (k = x[m])],
                    x[$] = k;
            (b.g = function (S) {
                for (var P, I = 0, R = b.i, T = b.j, O = b.S; S--;)
                    P = O[R = r & R + 1],
                        I = I * s + O[r & (O[R] = O[T = r & T + P]) + (O[T] = P)];
                return b.i = R,
                    b.j = T,
                    I
            }
            )(s)
        }
        function f(w, k) {
            return k.i = w.i,
                k.j = w.j,
                k.S = w.S.slice(),
                k
        }
        function v(w, k) {
            var E = [], b = typeof w, m;
            if (k && b == "object")
                for (m in w)
                    try {
                        E.push(v(w[m], k - 1))
                    } catch { }
            return E.length ? E : b == "string" ? w : w + "\0"
        }
        function g(w, k) {
            for (var E = w + "", b, m = 0; m < E.length;)
                k[r & m] = r & (b ^= k[r & m] * 19) + E.charCodeAt(m++);
            return A(k)
        }
        function y() {
            try {
                var w;
                return l && (w = l.randomBytes) ? w = w(s) : (w = new Uint8Array(s),
                    (t.crypto || t.msCrypto).getRandomValues(w)),
                    A(w)
            } catch {
                var k = t.navigator
                    , E = k && k.plugins;
                return [+new Date, t, E, t.screen, A(a)]
            }
        }
        function A(w) {
            return String.fromCharCode.apply(0, w)
        }
        if (g(e.random(), a),
            typeof he == "object" && he.exports) {
            he.exports = p;
            try {
                l = Ne()
            } catch { }
        } else
            typeof define == "function" && define.amd ? define(function () {
                return p
            }) : e["seed" + n] = p
    }
    )(typeof self < "u" ? self : Be, [], Math)
}
);
var M = V((Sr, Je) => {
    var lo = je()
        , ho = qe()
        , uo = We()
        , po = _e()
        , mo = Ge()
        , fo = Fe()
        , Z = ze();
    Z.alea = lo;
    Z.xor128 = ho;
    Z.xorwow = uo;
    Z.xorshift7 = po;
    Z.xor4096 = mo;
    Z.tychei = fo;
    Je.exports = Z
}
);
var Ee, Se, Ve = U(() => {
    "use strict";
    Ee = t => new Promise((a, e) => {
        let s = new Image;
        s.onload = () => a(s),
            s.onerror = e,
            s.src = t
    }
    ),
        Se = t => {
            let a = document.createElement("canvas")
                , e = a.getContext("2d");
            return a.width = t.width,
                a.height = t.height,
                e.drawImage(t, 0, 0),
                e.getImageData(0, 0, a.width, a.height).data
        }
}
);
var Xe = {};
q(Xe, {
    default: () => wo
});
import { html as go } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
async function wo({ user: t, weight: a = 1 }) {
    let e = "q-image-compression-dynamic"
        , s = "Compress an image"
        , i = (0,
            Ke.default)(`${t.email}#${e}`)
        , h = document.createElement("canvas");
    h.width = h.height = 500;
    let n = h.getContext("2d");
    n.fillStyle = "#fff",
        n.fillRect(0, 0, 500, 500),
        n.globalAlpha = .5,
        ["red", "green", "blue"].forEach(p => {
            n.fillStyle = p,
                n.fillRect(i() * 400, i() * 400, 100, 100)
        }
        );
    let o = h.toDataURL("image/png")
        , c = await Ee(o)
        , d = Se(c)
        , r = async () => {
            let p = document.getElementById(e);
            if (!p.files.length)
                throw new Error("No image uploaded");
            let u = p.files[0];
            if (u.size > 400)
                throw new Error("Image should be less than 400 bytes");
            let f = await Ee(URL.createObjectURL(u));
            if (c.width !== f.width || c.height !== f.height)
                throw new Error("Image dimensions do not match the original");
            let v;
            try {
                v = Se(f)
            } catch (g) {
                throw new Error(`Could not process image. Is it a browser-supported image? ${g.message}`)
            }
            if (!d.every((g, y) => g === v[y]))
                throw new Error("Image pixels do not match the original");
            return !0
        }
        , l = go`
    <div class="mb-3">
      <p><strong>Case Study: eShopCo Bandwidth Reduction</strong></p>
      <p>
        eShopCo, a global e-commerce platform, delivers thousands of product images every day. By ensuring each image is
        losslessly compressed below 400 bytes, they reduce page load times by 30%, improve search ranking, and cut
        bandwidth costs—all while maintaining crystal-clear visuals that drive customer engagement.
      </p>
      <p>Download the image below and compress it <em>losslessly</em> to an image that is less than 400 bytes.</p>
      <p><img src="${o}" width="500" height="500" /></p>
      <p>By losslessly, we mean that every pixel in the new image should be identical to the original image.</p>
      <label for="${e}" class="form-label"> Upload your losslessly compressed image (less than 400 bytes) </label>
      <input class="form-control" id="${e}" name="${e}" type="file" accept="image/*" />
    </div>
  `;
    return {
        id: e,
        title: s,
        weight: a,
        question: l,
        answer: r
    }
}
var Ke, Ye = U(() => {
    "use strict";
    Ke = z(M(), 1);
    Ve()
}
);
function J(t, a) {
    let e = URL.createObjectURL(t)
        , s = document.createElement("a");
    s.href = e,
        s.download = a,
        document.body.appendChild(s),
        s.click(),
        document.body.removeChild(s),
        URL.revokeObjectURL(e)
}
var oe = U(() => {
    "use strict"
}
);
import Ce from "https://cdn.jsdelivr.net/npm/pako@2/+esm";
async function ue(t) {
    let a = typeof t == "string" ? new TextEncoder().encode(t) : t
        , e = await crypto.subtle.digest("SHA-1", a);
    return Array.from(new Uint8Array(e)).map(i => i.toString(16).padStart(2, "0")).join("")
}
async function X(t) {
    let a = new TextEncoder
        , e = a.encode(t)
        , s = `blob ${e.length}\0`
        , i = a.encode(s)
        , h = new Uint8Array(i.length + e.length);
    h.set(i, 0),
        h.set(e, i.length);
    let n = await ue(h)
        , o = Ce.deflate(h);
    return {
        hash: n,
        compressed: o,
        content: t,
        size: e.length
    }
}
async function pe(t) {
    let a = [...t].sort((r, l) => r.name < l.name ? -1 : r.name > l.name ? 1 : 0)
        , e = [];
    for (let r of a) {
        let p = `${r.mode || "100644"} ${r.name}\0`;
        e.push(new TextEncoder().encode(p));
        let u = new Uint8Array(20);
        for (let f = 0; f < 20; f++)
            u[f] = parseInt(r.hash.substring(f * 2, f * 2 + 2), 16);
        e.push(u)
    }
    let s = e.reduce((r, l) => r + l.length, 0)
        , i = new Uint8Array(s)
        , h = 0;
    for (let r of e)
        i.set(r, h),
            h += r.length;
    let n = new TextEncoder().encode(`tree ${i.length}\0`)
        , o = new Uint8Array(n.length + i.length);
    o.set(n, 0),
        o.set(i, n.length);
    let c = await ue(o)
        , d = Ce.deflate(o);
    return {
        hash: c,
        compressed: d
    }
}
async function me({ treeHash: t, parentHash: a, message: e, author: s, timestamp: i }) {
    let h = `tree ${t}
`;
    a && (h += `parent ${a}
`);
    let n = Math.floor(i.getTime() / 1e3);
    h += `author ${s.name} <${s.email}> ${n} +0000
`,
        h += `committer ${s.name} <${s.email}> ${n} +0000
`,
        h += `
${e}
`;
    let c = `commit ${h.length}\0` + h
        , d = await ue(c)
        , r = Ce.deflate(new TextEncoder().encode(c));
    return {
        hash: d,
        compressed: r,
        content: h
    }
}
async function fe(t, a) {
    let e = [...t].sort((u, f) => u.name < f.name ? -1 : u.name > f.name ? 1 : 0)
        , s = []
        , i = new Uint8Array(12);
    i[0] = 68,
        i[1] = 73,
        i[2] = 82,
        i[3] = 67,
        i[4] = 0,
        i[5] = 0,
        i[6] = 0,
        i[7] = 2;
    let h = e.length;
    i[8] = h >> 24 & 255,
        i[9] = h >> 16 & 255,
        i[10] = h >> 8 & 255,
        i[11] = h & 255,
        s.push(i);
    let n = Math.floor(a.getTime() / 1e3);
    for (let u of e) {
        let f = []
            , v = new Uint8Array(8);
        v[0] = n >> 24 & 255,
            v[1] = n >> 16 & 255,
            v[2] = n >> 8 & 255,
            v[3] = n & 255,
            f.push(v);
        let g = new Uint8Array(8);
        g[0] = n >> 24 & 255,
            g[1] = n >> 16 & 255,
            g[2] = n >> 8 & 255,
            g[3] = n & 255,
            f.push(g),
            f.push(new Uint8Array(8));
        let y = new Uint8Array(4);
        y[0] = 0,
            y[1] = 0,
            y[2] = 129,
            y[3] = 164,
            f.push(y),
            f.push(new Uint8Array(8));
        let A = new Uint8Array(4);
        A[0] = u.size >> 24 & 255,
            A[1] = u.size >> 16 & 255,
            A[2] = u.size >> 8 & 255,
            A[3] = u.size & 255,
            f.push(A);
        let w = new Uint8Array(20);
        for (let R = 0; R < 20; R++)
            w[R] = parseInt(u.hash.substring(R * 2, R * 2 + 2), 16);
        f.push(w);
        let k = Math.min(u.name.length, 4095)
            , E = new Uint8Array(2);
        E[0] = k >> 8 & 15,
            E[1] = k & 255,
            f.push(E);
        let b = new TextEncoder().encode(u.name + "\0")
            , $ = (8 - (62 + b.length) % 8) % 8
            , x = new Uint8Array(b.length + $);
        x.set(b, 0),
            f.push(x);
        let S = f.reduce((R, T) => R + T.length, 0)
            , P = new Uint8Array(S)
            , I = 0;
        for (let R of f)
            P.set(R, I),
                I += R.length;
        s.push(P)
    }
    let o = s.reduce((u, f) => u + f.length, 0)
        , c = new Uint8Array(o)
        , d = 0;
    for (let u of s)
        c.set(u, d),
            d += u.length;
    let r = await ue(c)
        , l = new Uint8Array(20);
    for (let u = 0; u < 20; u++)
        l[u] = parseInt(r.substring(u * 2, u * 2 + 2), 16);
    let p = new Uint8Array(c.length + 20);
    return p.set(c, 0),
        p.set(l, c.length),
        p
}
var Re = U(() => {
    "use strict"
}
);
var Qe, D, Y, ee = U(() => {
    "use strict";
    Qe = (t, a, e) => Y([...t], e).slice(0, a),
        D = (t, a) => t[Math.floor(a() * t.length)],
        Y = function (t, a) {
            for (let e = t.length - 1; e > 0; e--) {
                let s = Math.floor(a() * (e + 1));
                [t[e], t[s]] = [t[s], t[e]]
            }
            return t
        }
}
);
var et = {};
q(et, {
    default: () => xo
});
import yo from "https://cdn.jsdelivr.net/npm/jszip@3/+esm";
import { html as bo } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
async function xo({ user: t, weight: a = 2 }) {
    let e = "q-git-revert-env"
        , s = "Git Security Fix: Reverting .env Commit"
        , i = (0,
            Ze.default)(`${t.email}#${e}`)
        , h = e
        , n = t
        , o = "Developer"
        , c = `${n.email}`
        , d = [{
            key: "DATABASE_URL",
            value: m => `postgres://admin:${ce(m, 16)}@db.prod.internal:5432/maindb`
        }, {
            key: "API_SECRET",
            value: m => `sk_live_${ce(m, 32)}`
        }, {
            key: "JWT_SECRET",
            value: m => ce(m, 64)
        }, {
            key: "AWS_SECRET_ACCESS_KEY",
            value: m => ce(m, 40)
        }, {
            key: "AIPIPE_TOKEN",
            value: m => vo(m, t)
        }]
        , r = ge(i, 15, 25)
        , l = ge(i, 3, Math.floor(r / 2))
        , p = []
        , u = ge(i, 3, 5)
        , f = Y([...d], i);
    for (let m = 0; m < u; m++) {
        let $ = f[m];
        p.push({
            key: $.key,
            value: $.value(i)
        })
    }
    let v = p.map(m => `${m.key}=${m.value}`).join(`
`) + `
`
        , g = []
        , y = Y([...$o], i);
    for (let m = 0; m < r; m++) {
        let $;
        m === 0 ? $ = "Initial commit" : m === l ? $ = D(ko, i) : $ = y[(m - 1) % y.length];
        let x = new Date("2025-09-01T10:00:00Z").getTime()
            , S = m * ge(i, 7200, 86400) * 1e3;
        g.push({
            message: $,
            timestamp: new Date(x + S),
            hasEnv: m >= l
        })
    }
    let A = null
        , w = {
            name: o,
            email: c
        }
        , k = async () => {
            if (A)
                return A;
            let m = new yo
                , $ = m.folder(h)
                , x = $.folder(".git")
                , S = x.folder("objects")
                , P = []
                , I = null
                , R = {
                    readme: 0,
                    app: 0,
                    requirements: 0
                }
                , T = []
                , O = null;
            for (let j = 0; j < g.length; j++) {
                let G = g[j];
                if (O = G.timestamp,
                    j === 0)
                    R.readme = 1,
                        R.app = 1,
                        R.requirements = 1;
                else {
                    let B = j % 3;
                    B === 0 ? R.readme++ : B === 1 ? R.app++ : R.requirements++
                }
                let te = `# ${h}

A Flask-based REST API service.

## Version

${R.readme}.0.0

## Quick Start

\`\`\`bash
pip install -r requirements.txt
python app.py
\`\`\`

## API Endpoints

- \`GET /health\` - Health check
- \`POST /api/v1/login\` - User authentication
- \`GET /api/v1/users\` - List users
- \`POST /api/v1/register\` - Register new user

## Environment Variables

Copy \`.env.example\` to \`.env\` and configure:

- \`DATABASE_URL\` - PostgreSQL connection string
- \`JWT_SECRET\` - Secret for JWT tokens
- \`REDIS_URL\` - Redis connection for caching

## Development

\`\`\`bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
flask run --debug
\`\`\`

## Testing

\`\`\`bash
pytest tests/ -v
\`\`\`

## License

MIT
`
                    , ae = `#!/usr/bin/env python3
"""Flask application entry point.

Version: ${R.app}.0.0
"""
import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, jwt_required, create_access_token

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
jwt = JWTManager(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())


@app.route('/health')
def health():
    """Health check endpoint."""
    return jsonify({"status": "healthy", "version": "${R.app}.0.0"})


@app.route('/api/v1/login', methods=['POST'])
def login():
    """Authenticate user and return JWT token."""
    data = request.get_json()
    # Authentication logic here
    return jsonify({"message": "Login endpoint"})


@app.route('/api/v1/users')
@jwt_required()
def list_users():
    """List all users (protected endpoint)."""
    return jsonify({"users": []})


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
`
                    , C = `# Requirements v${R.requirements}
Flask==2.3.3
Flask-SQLAlchemy==3.1.1
Flask-JWT-Extended==4.5.3
psycopg2-binary==2.9.9
redis==5.0.1
python-dotenv==1.0.0
gunicorn==21.2.0
pytest==7.4.3
`
                    , W = await X(te)
                    , _ = await X(ae)
                    , L = await X(C);
                S.folder(W.hash.substring(0, 2)).file(W.hash.substring(2), W.compressed),
                    S.folder(_.hash.substring(0, 2)).file(_.hash.substring(2), _.compressed),
                    S.folder(L.hash.substring(0, 2)).file(L.hash.substring(2), L.compressed);
                let N = [{
                    mode: "100644",
                    name: "README.md",
                    hash: W.hash
                }, {
                    mode: "100644",
                    name: "app.py",
                    hash: _.hash
                }, {
                    mode: "100644",
                    name: "requirements.txt",
                    hash: L.hash
                }];
                if (T = [{
                    name: "README.md",
                    hash: W.hash,
                    size: W.size,
                    content: W.content
                }, {
                    name: "app.py",
                    hash: _.hash,
                    size: _.size,
                    content: _.content
                }, {
                    name: "requirements.txt",
                    hash: L.hash,
                    size: L.size,
                    content: L.content
                }],
                    G.hasEnv) {
                    let B = await X(v);
                    S.folder(B.hash.substring(0, 2)).file(B.hash.substring(2), B.compressed),
                        N.push({
                            mode: "100644",
                            name: ".env",
                            hash: B.hash
                        }),
                        T.push({
                            name: ".env",
                            hash: B.hash,
                            size: B.size,
                            content: B.content
                        })
                }
                let de = await pe(N);
                S.folder(de.hash.substring(0, 2)).file(de.hash.substring(2), de.compressed);
                let se = await me({
                    treeHash: de.hash,
                    parentHash: I,
                    message: G.message,
                    author: w,
                    timestamp: G.timestamp
                });
                S.folder(se.hash.substring(0, 2)).file(se.hash.substring(2), se.compressed),
                    P.push(se.hash),
                    I = se.hash
            }
            x.file("HEAD", `ref: refs/heads/main
`),
                x.folder("refs").folder("heads").file("main", I + `
`),
                x.file("config", `[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallaliases = false
[user]
	name = ${w.name}
	email = ${w.email}
`);
            let F = T.map(j => ({
                name: j.name,
                hash: j.hash,
                size: j.size
            }))
                , ne = await fe(F, O);
            x.file("index", ne);
            for (let j of T)
                $.file(j.name, j.content);
            return A = await m.generateAsync({
                type: "blob"
            }),
                A
        }
        , E = bo`
    <div class="mb-3">
      <h4>Case Study: Git Security Fix: Reverting .env Commit</h4>
      <p>
        <strong>Scenario:</strong> A developer on your team accidentally committed a <code>.env</code> file containing
        sensitive API keys and database credentials. The security team has flagged this as a critical issue. You need
        to identify when this file was added and remove it from the repository's history entirely.
      </p>
      <ol>
        <li>Download the repository zip file below</li>
        <li>Extract and navigate into the repository folder</li>
        <li>Use git commands to find the commit that added <code>.env</code></li>
        <li>Remove the <code>.env</code> file from every commit in the history</li>
        <li>Ensure <code>.env</code> is gone from the entire history</li>
        <li>Create a <code>.gitignore</code> file and add <code>.env</code> to it</li>
        <li>Create a <code>.env.example</code> file with placeholder values for the secrets (Good practice)</li>
        <li>Commit the <code>.gitignore</code> and <code>.env.example</code> file</li>
        <li>Push the repository to your GitHub account (force push will be needed)</li>
        <li>Enter the GitHub repository URL below</li>
      </ol>
      <p>
        Download the repository:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${async () => J(await k(), `${e}.zip`)}>
          ${e}.zip
        </button>
      </p>
      <label for="${e}" class="form-label">Enter your GitHub repository URL:</label>
      <input
        class="form-control"
        id="${e}"
        name="${e}"
        type="url"
        placeholder="https://github.com/username/repo-name"
      />
    </div>
  `;
    return {
        id: e,
        title: s,
        weight: a,
        question: E,
        answer: async m => {
            if (!m || typeof m != "string")
                throw new Error("GitHub repository URL is required");
            let $ = m.trim();
            if ($.length === 0)
                throw new Error("URL cannot be empty");
            let x = $.match(/github\.com\/([^/]+)\/([^/\s]+)/i);
            if (!x)
                throw new Error("Please provide a valid GitHub repository URL (e.g., https://github.com/username/repo)");
            let [, S, P] = x, I = P.replace(/\.git$/, "").replace(/\/$/, ""), R = `https://api.github.com/repos/${S}/${I}/commits?per_page=100`, T;
            try {
                let C = await fetch(R);
                if (!C.ok)
                    throw C.status === 409 ? new Error("The repository appears to be empty. Did you push your changes?") : C.status === 404 ? new Error("Repository not found. Make sure it exists and is public.") : new Error(`GitHub API error: ${C.status}`);
                T = await C.json()
            } catch (C) {
                throw new Error(`Could not verify commit history: ${C.message}`)
            }
            let O = `https://api.github.com/repos/${S}/${I}/commits?path=.env`
                , F = [];
            try {
                let C = await fetch(O);
                C.ok && (F = await C.json())
            } catch (C) {
                throw new Error(`Could not verify .env history: ${C.message}`)
            }
            if (Array.isArray(F) && F.length > 0)
                throw new Error("The .env file was found in the history. You must remove it from the history.");
            let ne = `https://api.github.com/repos/${S}/${I}/contents/.gitignore`
                , j = null;
            try {
                let C = await fetch(ne);
                if (C.ok) {
                    let W = await C.json();
                    j = atob(W.content)
                } else
                    throw new Error("The .gitignore file is missing. Please create it and add .env to it.")
            } catch (C) {
                throw new Error(`Could not verify .gitignore: ${C.message}`)
            }
            if (!(C => {
                if (!C)
                    return !1;
                let W = [/^\.env$/, /^\/\.env$/, /^\.env\*$/, /^\/\.env\*$/, /^\.env\..+$/];
                return C.split(/\r?\n/).some(_ => {
                    let L = _.trim();
                    return !L || L.startsWith("#") ? !1 : W.some(N => N.test(L))
                }
                )
            }
            )(j))
                throw new Error("The .gitignore file does not contain .env.");
            let te = `https://api.github.com/repos/${S}/${I}/contents/.env.example`;
            try {
                if (!(await fetch(te)).ok)
                    throw new Error("The .env.example file is missing. Please create it with placeholder values.")
            } catch (C) {
                throw new Error(`Could not verify .env.example: ${C.message}`)
            }
            if (!T.some(C => C.commit && C.commit.message && (C.commit.message.toLowerCase().includes("initial commit") || C.commit.message.toLowerCase().includes("flask") || C.commit.message.toLowerCase().includes("authentication") || C.commit.message.toLowerCase().includes("api") || C.commit.message.toLowerCase().includes("database")) && C.commit.author && C.commit.author.email === t.email) || T.length < 10)
                throw new Error("The repository appears to be missing the original commit history. Please use the provided repository.");
            return !0
        }
    }
}
var Ze, ge, ce, vo, $o, ko, tt = U(() => {
    "use strict";
    Ze = z(M(), 1);
    oe();
    Re();
    ee();
    ge = (t, a, e) => Math.floor(t() * (e - a + 1)) + a,
        ce = (t, a) => {
            let e = "0123456789abcdef"
                , s = "";
            for (let i = 0; i < a; i++)
                s += e[Math.floor(t() * e.length)];
            return s
        }
        ,
        vo = (t, a) => {
            let e = {
                alg: "HS256",
                typ: "JWT"
            }
                , s = {
                    email: a.email
                }
                , i = n => btoa(JSON.stringify(n)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
                , h = ce(t, 32);
            return `${i(e)}.${i(s)}.${h}`
        }
        ,
        $o = ["Set up project structure with Flask", "Add user authentication module", "Implement login and registration endpoints", "Add database models for users and posts", "Create REST API for blog posts", "Add pagination to post listing", "Implement search functionality", "Add unit tests for auth module", "Fix password hashing vulnerability", "Update dependencies to latest versions", "Add rate limiting to API endpoints", "Implement caching layer with Redis", "Add Docker configuration for deployment", "Set up CI/CD pipeline with GitHub Actions", "Add API documentation with Swagger", "Implement email verification flow", "Add password reset functionality", "Fix CORS issues for frontend", "Add input validation middleware", "Implement file upload feature", "Add image resizing for thumbnails", "Fix memory leak in background jobs", "Add health check endpoint", "Implement WebSocket notifications", "Add user profile management", "Fix SQL injection vulnerability", "Add admin dashboard endpoints", "Implement audit logging", "Add metrics collection with Prometheus"],
        ko = ["Add project configuration files", "Set up development environment", "Configure application settings", "Add build and deployment scripts", "Update project dependencies", "Refactor configuration management", "Add local development setup", "Configure database connection", "Set up logging configuration", "Add Docker compose for local dev"]
}
);
var nt = {};
q(nt, {
    default: () => Ro
});
import Ao from "https://cdn.jsdelivr.net/npm/jszip@3/+esm";
import { html as Eo } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
async function Ro({ user: t, weight: a = 1.5 }) {
    let e = "q-git-time-travel"
        , s = "Git Time Travel: History Investigation"
        , i = (0,
            rt.default)(`${t.email}#${e}`)
        , h = e
        , n = `${D(ot, i).first} ${D(ot, i).last}`
        , o = `${n.toLowerCase().replace(/ /g, ".")}@${D(Co, i)}`
        , c = Q(i, 50, 60)
        , d = [30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 420, 480, 540, 600, 900, 1200]
        , r = D(d, i)
        , l = Q(i, 10, c - 10)
        , p = []
        , u = new Set;
    for (let b = 0; b < c; b++)
        if (b === l)
            p.push(r),
                u.add(r);
        else {
            let m;
            do
                m = D(d.filter($ => $ !== r), i);
            while (u.has(m) && u.size < d.length - 1);
            p.push(m),
                u.add(m)
        }
    let f = []
        , v = Y([...So], i);
    for (let b = 0; b < c; b++) {
        let m;
        b === 0 ? m = "Initial commit" : b === l ? m = "Update timeout settings" : m = v[b % v.length] + ` (#${Q(i, 100, 999)})`;
        let $ = new Date("2025-08-01T10:00:00Z").getTime()
            , x = b * Q(i, 7200, 172800) * 1e3;
        f.push({
            message: m,
            timeout: p[b],
            timestamp: new Date($ + x),
            retries: Q(i, 1, 5),
            maxConnections: Q(i, 10, 100),
            debug: i() > .7
        })
    }
    let g = null
        , y = null
        , A = {
            name: n,
            email: o
        }
        , w = async () => {
            if (y)
                return y;
            let b = new Ao
                , m = b.folder(h)
                , $ = m.folder(".git")
                , x = $.folder("objects")
                , S = []
                , P = null
                , I = null
                , R = null
                , T = null
                , O = null;
            for (let j = 0; j < f.length; j++) {
                let G = f[j]
                    , te = {
                        appName: h,
                        version: `${Q(i, 1, 3)}.${j}.${Q(i, 0, 9)}`,
                        environment: D(["development", "staging", "production"], i),
                        settings: {
                            timeout: G.timeout,
                            retries: G.retries,
                            maxConnections: G.maxConnections,
                            debug: G.debug,
                            logLevel: D(["debug", "info", "warn", "error"], i)
                        },
                        metadata: {
                            lastUpdated: G.timestamp.toISOString(),
                            updatedBy: A.name
                        }
                    }
                    , ae = JSON.stringify(te, null, 2)
                    , C = j === 0 || i() > .8 ? `# ${h}

Version ${te.version}

A sample project for testing.

## Configuration

See config.json for settings.
` : R
                    , W = await X(ae)
                    , _ = await X(C);
                T = W,
                    O = _,
                    x.folder(W.hash.substring(0, 2)).file(W.hash.substring(2), W.compressed),
                    x.folder(_.hash.substring(0, 2)).file(_.hash.substring(2), _.compressed);
                let L = await pe([{
                    mode: "100644",
                    name: "config.json",
                    hash: W.hash
                }, {
                    mode: "100644",
                    name: "README.md",
                    hash: _.hash
                }]);
                x.folder(L.hash.substring(0, 2)).file(L.hash.substring(2), L.compressed);
                let N = await me({
                    treeHash: L.hash,
                    parentHash: P,
                    message: G.message,
                    author: A,
                    timestamp: G.timestamp
                });
                x.folder(N.hash.substring(0, 2)).file(N.hash.substring(2), N.compressed),
                    S.push(N.hash),
                    P = N.hash,
                    I = ae,
                    R = C
            }
            g = S[l - 1].substring(0, 7),
                $.file("HEAD", `ref: refs/heads/main
`),
                $.folder("refs").folder("heads").file("main", P + `
`),
                $.file("config", `[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallaliases = false
[user]
	name = ${A.name}
	email = ${A.email}
`);
            let F = [{
                name: "config.json",
                hash: T.hash,
                size: T.size
            }, {
                name: "README.md",
                hash: O.hash,
                size: O.size
            }]
                , ne = await fe(F, f[f.length - 1].timestamp);
            return $.file("index", ne),
                m.file("config.json", I),
                m.file("README.md", R),
                y = await b.generateAsync({
                    type: "blob"
                }),
                y
        }
        , k = Eo`
    <div class="mb-3">
      <h4>Case Study: Git Time Travel: History Investigation</h4>
      <p>
        <strong>Scenario:</strong> You're investigating a production incident caused by a configuration change. The
        operations team needs to identify when a specific timeout value was introduced so they can understand what other
        changes were deployed at the same time.
      </p>
      <ol>
        <li>Download the repository zip file below</li>
        <li>Extract and navigate into the repository folder</li>
        <li>
          Use Git commands to explore the commit history (e.g., <code>git log</code>, <code>git show</code>,
          <code>git diff</code>)
        </li>
        <li>
          Find the commit where <code>config.json</code> was modified to change the <code>timeout</code> value to
          <strong>${r}</strong>
        </li>
        <li>Identify the <strong>parent commit</strong> of that commit</li>
        <li>Enter the 7-character short hash of the parent commit</li>
      </ol>
      <p>
        Download the repository:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${async () => J(await w(), `${e}.zip`)}>
          ${e}.zip
        </button>
      </p>
      <label for="${e}" class="form-label">
        What is the 7-character short hash of the <strong>parent</strong> of the commit that set timeout to
        ${r}?
      </label>
      <input
        class="form-control"
        id="${e}"
        name="${e}"
        placeholder="e.g., a1b2c3d"
        pattern="[a-f0-9]{7}"
        maxlength="7"
      />
    </div>
  `;
    return {
        id: e,
        title: s,
        weight: a,
        question: k,
        answer: async b => {
            if (!b || typeof b != "string")
                throw new Error("Answer is required");
            let m = b.trim().toLowerCase();
            if (m.length === 0)
                throw new Error("Answer cannot be empty");
            if (!/^[a-f0-9]{7}$/.test(m))
                throw new Error("Answer must be a 7-character hex string (e.g., a1b2c3d)");
            if (await w(),
                m !== g)
                throw new Error(`Incorrect commit hash. Make sure you found the parent of the commit that set timeout to ${r}.`);
            return !0
        }
    }
}
var rt, Q, So, ot, Co, at = U(() => {
    "use strict";
    rt = z(M(), 1);
    oe();
    Re();
    ee();
    Q = (t, a, e) => Math.floor(t() * (e - a + 1)) + a,
        So = ["Initial commit", "Add configuration file", "Update README", "Fix typo in docs", "Update timeout settings", "Refactor config structure", "Add logging configuration", "Update API endpoint", "Fix configuration bug", "Bump version number", "Add error handling config", "Update database settings", "Modify retry settings", "Change cache duration", "Update security settings", "Add feature flags", "Update rate limiting", "Fix memory leak config", "Add monitoring settings", "Update connection pool", "Refactor timeout logic", "Add backup configuration", "Update SSL settings", "Fix race condition", "Add health check config", "Update worker threads", "Modify batch size", "Change log level", "Update compression settings", "Add circuit breaker", "Fix deadlock issue", "Update queue settings", "Add throttling config", "Update pagination", "Fix null pointer config", "Add validation rules", "Update serialization", "Modify buffer size", "Change polling interval", "Update proxy settings", "Add failover config", "Fix timeout overflow", "Update auth settings", "Add CORS configuration", "Modify chunk size", "Change heartbeat interval", "Update session timeout", "Add cleanup config", "Fix memory settings", "Update thread pool", "Add graceful shutdown", "Modify max connections", "Change request timeout", "Update response cache"],
        ot = [{
            first: "Alice",
            last: "Johnson"
        }, {
            first: "Bob",
            last: "Smith"
        }, {
            first: "Carol",
            last: "Davis"
        }, {
            first: "David",
            last: "Miller"
        }, {
            first: "Eve",
            last: "Wilson"
        }, {
            first: "Frank",
            last: "Moore"
        }, {
            first: "Grace",
            last: "Taylor"
        }, {
            first: "Hank",
            last: "Anderson"
        }, {
            first: "Ivy",
            last: "Thomas"
        }, {
            first: "Jack",
            last: "Jackson"
        }],
        Co = ["example.com", "test.com", "sample.org", "demo.net"]
}
);
var st = {};
q(st, {
    default: () => To
});
import { html as Io } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
async function To({ user: t, weight: a = 1 }) {
    let e = "q-github-pages"
        , s = "Host your portfolio on GitHub Pages"
        , i = async n => {
            if (n = n.trim(),
                !new URL(n).hostname.includes("github.io"))
                throw new Error("URL should be hosted on github.io");
            let c = await fetch(`/proxy/${n}`).then(d => d.text());
            if (!c.match(t.email))
                throw new Error(`${t.email} is not in the response: ${c.slice(0, 1e3)}...`);
            return !0
        }
        , h = Io`
    <div class="mb-3">
      <p>
        Publish a page using <a href="https://pages.github.com/">GitHub Pages</a> that showcases your work. Ensure that
        your email address <strong><code>${t.email}</code></strong> is in the page's HTML.
      </p>
      <p>
        GitHub pages are served via CloudFlare which
        <a href="https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/">obfuscates emails</a>.
        So, wrap your email address inside a:
        <pre><code class="language-html">&lt;!--email_off--&gt;${t.email}&lt;!--/email_off--&gt;</code></pre>
      </p>
      <label for="${e}" class="form-label">
        What is the GitHub Pages URL? It might look like:
        <code>https://[USER].github.io/[REPO]/</code>
      </label>
      <input class="form-control" id="${e}" name="${e}" />
      <p class="text-muted">
        If a recent change that's not reflected, add <code>?v=1</code>, <code>?v=2</code> to the URL to bust the cache.
      </p>
    </div>
  `;
    return {
        id: e,
        title: s,
        weight: a,
        question: h,
        answer: i
    }
}
var it = U(() => {
    "use strict"
}
);
async function K(t) {
    let e = new TextEncoder().encode(t)
        , s = await crypto.subtle.digest("SHA-256", e);
    return Array.from(new Uint8Array(s)).map(n => n.toString(16).padStart(2, "0")).join("")
}
var le = U(() => {
    "use strict"
}
);
var lt = {};
q(lt, {
    default: () => Po
});
import { html as Uo } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
async function Po({ user: t, weight: a = 1 }) {
    let e = "q-github-pages-json-api"
        , s = "Host a JSON Data API on GitHub Pages"
        , i = (0,
            ct.default)(`${t.email}#${e}`)
        , h = (await K(`${t.email}:gh-json-api`)).slice(0, 8)
        , n = ["electronics", "clothing", "books", "home", "sports"]
        , o = ["Premium", "Basic", "Pro", "Elite", "Standard"]
        , c = 15 + Math.floor(i() * 10)
        , d = [];
    for (let g = 0; g < c; g++)
        d.push({
            id: `prod-${h}-${String(g + 1).padStart(3, "0")}`,
            name: `${o[Math.floor(i() * o.length)]} Item ${g + 1}`,
            category: n[Math.floor(i() * n.length)],
            price: Math.round((10 + i() * 490) * 100) / 100,
            stock: Math.floor(i() * 200),
            rating: Math.round((1 + i() * 4) * 10) / 10
        });
    let r = n[Math.floor(i() * n.length)]
        , l = d.filter(g => g.category === r)
        , p = l.length
        , u = Math.round(l.reduce((g, y) => g + y.price * y.stock, 0) * 100) / 100
        , f = async g => {
            g = g.trim();
            let y;
            try {
                y = new URL(g)
            } catch {
                throw /^[a-zA-Z][\w+.-]*:/.test(g) ? new Error("Invalid URL. Please check that your GitHub Pages URL is correct and publicly accessible.") : new Error("Invalid URL. Make sure to include the protocol, e.g. https://username.github.io/repo/file.json")
            }
            if (y.hostname !== "github.io" && !y.hostname.endsWith(".github.io"))
                throw new Error("Host your JSON file on GitHub Pages (URL must end with github.io)");
            let A = await fetch(`/proxy/${g}`);
            if (!A.ok)
                throw new Error(`Failed to fetch JSON: HTTP ${A.status}`);
            let w;
            try {
                w = await A.json()
            } catch {
                throw new Error("Response is not valid JSON. Make sure you're serving a .json file")
            }
            if (!w.metadata)
                throw new Error('JSON must have a "metadata" object at the root');
            if (w.metadata.email !== t.email)
                throw new Error(`metadata.email should be ${t.email}`);
            if (w.metadata.version !== h)
                throw new Error(`metadata.version should be ${h}`);
            if (!Array.isArray(w.products))
                throw new Error('JSON must have a "products" array');
            if (w.products.length !== d.length)
                throw new Error(`Expected ${d.length} products`);
            for (let k = 0; k < d.length; k++) {
                let E = d[k]
                    , b = w.products.find(m => m.id === E.id);
                if (!b)
                    throw new Error(`Missing product with id ${E.id}`);
                if (b.category !== E.category)
                    throw new Error(`Product ${E.id} has wrong category`);
                if (Math.abs(b.price - E.price) > .01)
                    throw new Error(`Product ${E.id} has incorrect price`);
                if (b.stock !== E.stock)
                    throw new Error(`Product ${E.id} has incorrect stock`)
            }
            if (!w.aggregations || typeof w.aggregations != "object")
                throw new Error('JSON must have "aggregations" object');
            for (let k of n) {
                let E = w.aggregations[k];
                if (!E)
                    throw new Error(`aggregations must include category "${k}"`);
                let b = d.filter(x => x.category === k)
                    , m = b.length
                    , $ = b.reduce((x, S) => x + S.price * S.stock, 0);
                if (E.count !== m)
                    throw new Error(`Aggregation count for ${k} should be ${m}`);
                if (Math.abs(E.inventoryValue - $) > 1)
                    throw new Error(`Aggregation inventoryValue for ${k} should be ${$}`)
            }
            return !0
        }
        , v = Uo`
    <div class="mb-3">
      <h4>Case Study: StaticShop Product Catalog</h4>
      <p>
        StaticShop is a small e-commerce company that wants to reduce hosting costs by serving their product catalog as
        a static JSON file instead of running a database-backed API. Since their catalog only updates weekly, GitHub
        Pages is perfect for this use case—it's free, fast, and globally distributed via CDN.
      </p>
      <p>
        Create a JSON file hosted on GitHub Pages that serves as a "static API" for their product catalog. Your JSON
        file must include:
      </p>
      <ol>
        <li>
          A <code>metadata</code> object with:
          <ul>
            <li><code>email</code>: <code>${t.email}</code></li>
            <li><code>version</code>: <code>${h}</code></li>
          </ul>
        </li>
        <li>
          A <code>products</code> array with exactly <strong>${c} products</strong>, each having:
          <code>id</code>, <code>name</code>, <code>category</code>, <code>price</code>, <code>stock</code>, and
          <code>rating</code>
        </li>
        <li>
          An <code>aggregations</code> object with pre-computed stats per category. For the
          <code>${r}</code> category, include:
          <ul>
            <li><code>count</code>: number of products in that category (${p})</li>
            <li>
              <code>inventoryValue</code>: sum of (price × stock) for all products in that category
              (${u.toFixed(2)})
            </li>
          </ul>
        </li>
      </ol>
      <p>Here's the product data you must include (generate matching JSON):</p>
      <details>
        <summary>Click to expand product data</summary>
        <pre style="max-height: 300px; overflow: auto"><code>${JSON.stringify(d, null, 2)}</code></pre>
      </details>
      <p class="mt-3">
        <label for="${e}" class="form-label">GitHub Pages URL to your JSON file:</label>
        <input
          class="form-control"
          id="${e}"
          name="${e}"
          type="url"
          placeholder="https://username.github.io/repo/catalog.json"
        />
      </p>
      <p class="text-muted">
        Tip: Add <code>?v=1</code> to bust CDN cache if recent changes aren't reflected.
      </p>
    </div>
  `;
    return {
        id: e,
        title: s,
        weight: a,
        question: v,
        answer: f
    }
}
var ct, dt = U(() => {
    "use strict";
    ct = z(M(), 1);
    le()
}
);
var ht = {};
q(ht, {
    default: () => Ho
});
import { html as jo } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
async function Ho({ user: t, weight: a = 1 }) {
    let e = "q-github-action"
        , s = "Create a GitHub Action"
        , i = async n => {
            let o = n.match(/https:\/\/github\.com\/([^/]+)\/([^/]+)/);
            if (!o)
                throw new Error("URL does not match https://github.com/<user>/<repo>");
            let [, c, d] = o
                , r = `https://api.github.com/repos/${c}/${d}/actions/runs`
                , { workflow_runs: l } = await fetch(r).then(f => f.json());
            if (!l?.length)
                throw new Error("No runs found");
            let { jobs_url: p } = l[0]
                , { jobs: u } = await fetch(p).then(f => f.json());
            for (let { steps: f } of u)
                for (let { name: v } of f)
                    if (v.includes(t.email))
                        return !0;
            throw new Error(`No step matches ${t.email}`)
        }
        , h = jo`
    <div class="mb-3">
      <p>
        Create a <a href="https://github.com/features/actions">GitHub action</a> on one of your GitHub repositories.
        Make sure one of the steps in the action has a name that contains your email address <code>${t.email}</code>.
        For example:
      </p>
      <pre><code class="language-yaml">
jobs:
  test:
    steps:
      - name: ${t.email}
        run: echo "Hello, world!"
      </code></pre>
      <p>Trigger the action and make sure it is the <strong>most recent action</strong>.</p>
      <p>
        <label for="${e}" class="form-label">
          What is your repository URL? It will look like:
          <code>https://github.com/USER/REPO</code>
        </label>
        <input class="form-control" id="${e}" name="${e}" />
      </p>
    </div>
  `;
    return {
        id: e,
        title: s,
        weight: a,
        question: h,
        answer: i
    }
}
var ut = U(() => {
    "use strict"
}
);
var pt = {};
q(pt, {
    default: () => Oo
});
import { html as qo } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
async function Oo({ user: t, weight: a = 1 }) {
    let e = "q-github-action-cache"
        , s = "Create a GitHub Action with dependency caching"
        , i = (await K(`${t.email}:gha-cache`)).slice(-7)
        , h = `prime-cache-${i}`
        , n = async c => {
            let d = c.trim().match(/https:\/\/github\.com\/([^/]+)\/([^/]+)/);
            if (!d)
                throw new Error("Provide a GitHub repository URL like https://github.com/user/repo");
            let [, r, l] = d
                , p = `https://api.github.com/repos/${r}/${l}/actions/runs`
                , u = await fetch(p);
            if (!u.ok)
                throw new Error(`Unable to fetch workflow runs: HTTP ${u.status}`);
            let { workflow_runs: f } = await u.json();
            if (!f?.length)
                throw new Error("No workflow runs found. Trigger the workflow so it appears in runs list.");
            let v = f[0]
                , g = await fetch(v.jobs_url);
            if (!g.ok)
                throw new Error("Unable to fetch job details for the latest run");
            let { jobs: y } = await g.json()
                , w = y.flatMap($ => $.steps ?? []).find($ => $.name?.includes(h));
            if (!w)
                throw new Error(`No workflow step named ${h}`);
            if (w.conclusion !== "success")
                throw new Error(`Workflow step ${h} did not succeed (status: ${w.conclusion})`);
            let k = v.path;
            if (!k)
                throw new Error("GitHub did not return the workflow path; ensure you're using a normal workflow, not a re-run");
            let E = v.head_branch ?? v.run_attempt?.head_branch ?? "main"
                , b = `https://raw.githubusercontent.com/${r}/${l}/${E}/${k}`
                , m = await fetch(b).then($ => {
                    if (!$.ok)
                        throw new Error(`Unable to download workflow file from ${b}`);
                    return $.text()
                }
                );
            if (!/actions\/cache@v?\d+/i.test(m))
                throw new Error("Workflow file must use actions/cache@v4 (or newer) to prime dependencies");
            if (!m.includes(`key: cache-${i}`))
                throw new Error(`Cache key cache-${i} not found in workflow file`);
            return !0
        }
        , o = qo`
    <div class="mb-3">
      <p>
        Speed up your CI by adding caching. Create a GitHub Actions workflow in one of your repositories that uses
        <code>actions/cache@v4</code> (or newer) to cache dependencies. Prime the cache with a key named
        <code>cache-${i}</code> and include a step named <code>${h}</code> that echoes the cache hit/miss
        result.
      </p>
      <p>
        Push the workflow, run it once, then share your repository. We'll inspect the most recent run and verify that
        the cache step succeeded.
      </p>
      <label for="${e}" class="form-label">Repository URL</label>
      <input class="form-control" id="${e}" name="${e}" placeholder="https://github.com/user/repo" />
      <p class="form-text text-muted">Keep the latest run public until grading completes.</p>
    </div>
  `;
    return {
        id: e,
        title: s,
        weight: a,
        question: o,
        answer: n
    }
}
var mt = U(() => {
    "use strict";
    le()
}
);
var ft = {};
q(ft, {
    default: () => _o
});
import Wo from "https://cdn.jsdelivr.net/npm/js-yaml@4/+esm";
import { html as Lo } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
async function _o({ user: t, weight: a = 1 }) {
    let e = "q-dependabot-config"
        , s = "Configure Dependabot for Security Updates"
        , i = async n => {
            n = n.trim();
            let o;
            try {
                o = new URL(n)
            } catch {
                throw new Error("Provide a GitHub repository URL like https://github.com/user/repo")
            }
            if (o.hostname !== "github.com")
                throw new Error("Provide a GitHub repository URL like https://github.com/user/repo");
            let c = o.pathname.replace(/\/+$/, "").split("/").filter(Boolean);
            if (c.length < 2)
                throw new Error("Provide a GitHub repository URL like https://github.com/user/repo");
            let d = c[0]
                , r = c[1];
            r = r.replace(/\.git$/, "");
            let l = `https://raw.githubusercontent.com/${d}/${r}/main/.github/dependabot.yml`
                , p = await fetch(l);
            if (!p.ok) {
                let m = `https://raw.githubusercontent.com/${d}/${r}/HEAD/.github/dependabot.yml`;
                if (!(await fetch(m)).ok)
                    throw new Error("Could not find .github/dependabot.yml in your repository. Make sure it exists on the main branch.")
            }
            let u = await (async m => (await m).text())(p.ok ? p : fetch(`https://raw.githubusercontent.com/${d}/${r}/HEAD/.github/dependabot.yml`)), f;
            try {
                f = Wo.load(u)
            } catch (m) {
                throw new Error(`Invalid YAML in dependabot.yml: ${m.message}`)
            }
            if (f.version !== 2)
                throw new Error("dependabot.yml must have version: 2");
            if (!Array.isArray(f.updates) || f.updates.length === 0)
                throw new Error('dependabot.yml must have an "updates" array with at least one entry');
            let v = f.updates.find(m => m["package-ecosystem"] === "pip");
            if (!v)
                throw new Error('dependabot.yml must have an update entry with package-ecosystem: "pip"');
            if (!v.schedule || !v.schedule.interval)
                throw new Error("The pip update entry must have a schedule with an interval");
            let g = `https://raw.githubusercontent.com/${d}/${r}/main/requirements.txt`
                , y = await fetch(g);
            if (!y.ok) {
                let m = `https://raw.githubusercontent.com/${d}/${r}/HEAD/requirements.txt`;
                if (y = await fetch(m),
                    !y.ok)
                    throw new Error("Could not find requirements.txt in your repository")
            }
            let w = (await y.text()).split(`
`).map(m => m.trim()).filter(m => m && !m.startsWith("#") && !m.startsWith("-"));
            if (w.length < 3)
                throw new Error(`requirements.txt must have at least 3 dependencies. Found: ${w.length}`);
            let k = `https://raw.githubusercontent.com/${d}/${r}/main/README.md`
                , E = await fetch(k);
            if (!E.ok) {
                let m = `https://raw.githubusercontent.com/${d}/${r}/HEAD/README.md`;
                if (E = await fetch(m),
                    !E.ok)
                    throw new Error("Could not find README.md in your repository")
            }
            if (!(await E.text()).includes(t.email))
                throw new Error(`README.md must contain your email address: ${t.email}`);
            return !0
        }
        , h = Lo`
    <div class="mb-3">
      <h4>Case Study: Automated Security Updates</h4>
      <p>
        A production API was using a vulnerable version of the <code>requests</code> library for 6 months. With
        Dependabot configured, they now get automatic PRs within 24 hours of any CVE disclosure, keeping dependencies
        secure without manual monitoring.
      </p>
      <p>Complete the following steps:</p>
      <ol>
        <li>Create a GitHub repository with a Python project.</li>
        <li>
          Add a <code>requirements.txt</code> with at least 3 dependencies (e.g., <code>fastapi</code>,
          <code>requests</code>, <code>pandas</code>).
        </li>
        <li>
          Create <code>.github/dependabot.yml</code> with the following configuration:
          <pre><code class="language-yaml">version: 2
updates:
  - package-ecosystem: "pip"
    directory: "/"
    schedule:
      interval: "weekly"
    commit-message:
      prefix: "deps"</code></pre>
        </li>
        <li>Add a <code>README.md</code> containing <code>${t.email}</code>.</li>
        <li>Push to GitHub.</li>
      </ol>
      <label for="${e}" class="form-label">
        What is your repository URL? It will look like: <code>https://github.com/USER/REPO</code>
      </label>
      <input
        class="form-control"
        id="${e}"
        name="${e}"
        type="url"
        placeholder="https://github.com/user/repo"
        required
      />
      <p class="form-text text-muted">
        We'll verify that <code>.github/dependabot.yml</code> exists with correct structure,
        <code>requirements.txt</code> has at least 3 dependencies, and <code>README.md</code> contains your email.
      </p>
    </div>
  `;
    return {
        id: e,
        title: s,
        weight: a,
        question: h,
        answer: i
    }
}
var gt = U(() => {
    "use strict"
}
);
var wt = {};
q(wt, {
    default: () => Go
});
import { html as Do } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
async function Go({ user: t, weight: a = 1 }) {
    let e = "q-docker-hub-image"
        , s = "Push an image to Docker Hub"
        , i = async n => {
            n = n.trim();
            let c = n.split("?")[0].match(/https:\/\/hub\.docker\.com\/repository\/docker\/([^/]+)\/([^/]+)\//);
            if (!c)
                throw new Error("URL does not match https://hub.docker.com/repository/docker/<user>/<repo>/...");
            let d = new URL(n).searchParams.get("identifier") ?? c[1]
                , r = new URL(n).searchParams.get("secret")
                , l = `https://hub.docker.com/v2/namespaces/${c[1]}/repositories/${c[2]}/tags`
                , p = {};
            if (r) {
                console.log("Secret", r);
                let { access_token: g } = await fetch("/proxy/https://hub.docker.com/v2/auth/token", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        identifier: d,
                        secret: r
                    })
                }).then(y => y.json());
                p = {
                    Authorization: `Bearer ${g}`
                }
            }
            console.log(p);
            let { results: u } = await fetch(`/proxy/${l}`, {
                headers: p
            }).then(g => g.json())
                , f = u.map(g => g.name)
                , v = t.email.split("@")[0];
            if (!f.includes(v))
                throw new Error(`${v} is not one of the tags in ${l}`);
            return !0
        }
        , h = Do`
    <div class="mb-3">
      <p>
        Create and push an image to <a href="https://hub.docker.com/">Docker Hub</a>. Add a tag named
        <code>${t.email.split("@")[0]}</code> to the image.
      </p>
      <p class="text-muted small">
        If you hit rate limits, add an optional <code>?secret=$TOKEN&identifier=$USER</code> to your URL
        (<a href="https://docs.docker.com/security/for-developers/access-tokens/" target="_blank">get token</a>).
      </p>
      <label for="${e}" class="form-label">
        What is the Docker image URL? It should look like:
        <code>https://hub.docker.com/repository/docker/$USER/$REPO/general?secret=$TOKEN&identifier=$USER</code>
      </label>
      <input class="form-control" id="${e}" name="${e}" />
    </div>
  `;
    return {
        id: e,
        title: s,
        weight: a,
        question: h,
        answer: i
    }
}
var yt = U(() => {
    "use strict"
}
);
var vt = {};
q(vt, {
    default: () => Fo
});
import { html as Mo } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
async function Fo({ user: t, weight: a = 1 }) {
    let e = "q-huggingface-docker"
        , s = "Publish a Docker Space with environment guardrails"
        , i = (0,
            bt.default)(`${t.email}#${e}`)
        , h = 7e3 + Math.floor(i() * 500)
        , n = `ga2-${(await K(`${t.email}:hf-space`)).slice(0, 6)}`
        , o = `GA2_TOKEN_${(await K(`${t.email}:hf-secret`)).slice(-4).toUpperCase()}`
        , c = `deployment-ready-${n}`
        , d = async l => {
            let p = l.trim().replace(/\/$/, "");
            if (!p.startsWith("https://huggingface.co/spaces/"))
                throw new Error("Submit the public Hugging Face Spaces URL (https://huggingface.co/spaces/username/space)");
            let u = p.replace("https://huggingface.co/spaces/", "https://huggingface.co/api/spaces/")
                , f = (x, S = {}) => fetch(x, {
                    cache: "no-store",
                    ...S,
                    referrerPolicy: "no-referrer"
                })
                , v = await f(u).then(x => {
                    if (!x.ok)
                        throw new Error(`Unable to fetch space metadata (HTTP ${x.status})`);
                    return x.json()
                }
                );
            if (v.sdk !== "docker")
                throw new Error("Space must be configured with the Docker SDK");
            if (v.private)
                throw new Error("Space must be public before submitting");
            if (!v.siblings?.length)
                throw new Error("Space repository not found. Ensure it is public");
            let g = v.cardData;
            if (g?.app_port !== h)
                throw new Error(`Set app_port to ${h}`);
            if (g?.title !== n)
                throw new Error(`Space title should be ${n}`);
            let y = `${u}/tree/main`
                , A = await f(y).then(x => x.json());
            if (!((x = "") => A.filter(S => S.path.startsWith(x)).map(S => ({
                path: S.path,
                type: S.type
            })))().some(x => x.path === "Dockerfile"))
                throw new Error("Dockerfile missing in space repository");
            let E = await f(`${l}/raw/main/Dockerfile`).then(x => x.text());
            if (!E.includes("USER user"))
                throw new Error("Dockerfile must switch to non-root user UID 1000");
            if (!E.includes(`EXPOSE ${h}`))
                throw new Error(`Dockerfile should expose port ${h}`);
            if (!/ENV\s+APP_PORT=/.test(E))
                throw new Error("Dockerfile should set ENV APP_PORT from build arguments or defaults");
            let b = await f(`${l}/raw/main/requirements.txt`).then(x => x.text());
            if (!b.toLowerCase().includes("fastapi"))
                throw new Error("requirements.txt must include FastAPI");
            if (!b.toLowerCase().includes("uvicorn"))
                throw new Error("requirements.txt must include uvicorn");
            let m = await f(`${l}/raw/main/README.md`).then(x => x.text());
            if (!m.includes(c))
                throw new Error(`README.md must mention ${c}`);
            if (!new RegExp(`app_port:\\s*${h}`).test(m))
                throw new Error(`README frontmatter should declare app_port: ${h}`);
            if (!/sdk:\s*docker/.test(m))
                throw new Error("README frontmatter should specify sdk: docker");
            if ((v.runtime.hardware.current ?? "CPU-basic") !== "cpu-basic")
                throw new Error("Keep the Space on the free CPU Basic tier (hardware should be cpu-basic)");
            return !0
        }
        , r = Mo`
    <div class="mb-3">
      <p>
        Containerize the deployment observability API on Hugging Face Spaces using the Docker SDK. The grader verifies
        the repository metadata directly from Hugging Face, so make sure your Space stays public while you submit.
      </p>
      <ol>
        <li>Create a Space named <code>${n}</code> using the Docker SDK (public visibility, CPU Basic tier).</li>
        <li>
          Configure <code>README.md</code> frontmatter with <code>sdk: docker</code>, <code>app_port: ${h}</code>,
          and a description that includes <code>${c}</code>.
        </li>
        <li>
          Author a Dockerfile that:
          <ul>
            <li>Uses <code>python:3.11-slim</code> or equivalent and creates UID 1000 user</li>
            <li>Sets <code>ENV APP_PORT</code> and exposes <code>${h}</code></li>
            <li>Runs <code>uvicorn main:app</code> on the configured port</li>
          </ul>
        </li>
        <li>
          Add <code>requirements.txt</code> with <code>fastapi</code> and <code>uvicorn[standard]</code> (plus any
          extras you need).
        </li>
        <li>In the Space settings, create a secret named <code>${o}</code> with any token value.</li>
      </ol>
      <p>
        When the Space builds successfully, paste the public Space URL below (e.g.
        https://huggingface.co/spaces/user/${n}).
      </p>
      <label for="${e}" class="form-label">Hugging Face Space URL</label>
      <input
        class="form-control"
        id="${e}"
        name="${e}"
        type="url"
        placeholder="https://huggingface.co/spaces/you/${n}"
      />
      <p class="form-text text-muted">Keep the Space public until grading is complete.</p>
    </div>
  `;
    return {
        id: e,
        title: s,
        weight: a,
        question: r,
        answer: d
    }
}
var bt, $t = U(() => {
    "use strict";
    bt = z(M(), 1);
    le()
}
);
var kt = {};
q(kt, {
    default: () => zo
});
import { html as No } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
function Bo(t) {
    try {
        return atob(t.replace(/\n/g, ""))
    } catch {
        throw new Error("Unable to decode devcontainer.json returned by GitHub")
    }
}
async function zo({ user: t, weight: a = 1 }) {
    let e = "q-github-codespaces-devcontainer"
        , s = "Configure a Codespace devcontainer"
        , h = `ga2-${(await K(`${t.email}:codespace`)).slice(0, 6)}`
        , n = async c => {
            let d = c.trim().split(/\s+/);
            if (d.length !== 2)
                throw new Error("Submit the repository in owner/repo format followed by a GitHub token (two space-separated parts)");
            let [r, l] = d;
            if (!r.includes("/"))
                throw new Error("Repository should be OWNER/REPO");
            let p = {
                Authorization: `Bearer ${l}`,
                Accept: "application/vnd.github+json"
            }
                , u = await fetch(`https://api.github.com/repos/${r}/codespaces`, {
                    headers: p
                });
            if (!u.ok)
                throw new Error("Unable to list Codespaces for that repo. Keep the codespace running?");
            let { codespaces: f } = await u.json();
            if (!f?.length)
                throw new Error("Create a Codespace for that repository and keep it active while submitting");
            if (!f.find(w => w.state === "Available" || w.state === "InProgress"))
                throw new Error("No active Codespace found (state should be Available)");
            let g = await fetch(`https://api.github.com/repos/${r}/contents/.devcontainer/devcontainer.json`, {
                headers: p
            });
            if (!g.ok)
                throw new Error("Unable to fetch .devcontainer/devcontainer.json (did you commit it to the repo?)");
            let y = await g.json()
                , A = Bo(y.content);
            if (!A.includes('"name"'))
                throw new Error("devcontainer.json should have a name field");
            if (!A.includes(`"${h}"`))
                throw new Error(`Set devcontainer name to ${h}`);
            if (!/ghcr\.io\/devcontainers\/features\/python:1/.test(A))
                throw new Error("Include the python devcontainer feature to preinstall Python");
            if (!A.includes("astral-sh.uv"))
                throw new Error("Install the astral-sh.uv VS Code extension");
            if (!A.includes("ms-python.python"))
                throw new Error("Install the ms-python.python VS Code extension");
            if (!A.includes("postCreateCommand"))
                throw new Error("Add a postCreateCommand that bootstraps dependencies with uv");
            if (!A.toLowerCase().includes("uv pip install fastapi"))
                throw new Error("postCreateCommand should run 'uv pip install fastapi' (or similar) to prime dependencies");
            return !0
        }
        , o = No`
    <div class="mb-3">
      <p>
        For smoother onboarding, set up a Codespace devcontainer that mirrors the deployment tooling stack. Create or
        use a public repository, add a <code>.devcontainer/devcontainer.json</code>, and ensure it:
      </p>
      <ul>
        <li>Has <code>"name": "${h}"</code></li>
        <li>Uses the <code>ghcr.io/devcontainers/features/python:1</code> feature</li>
        <li>Installs VS Code extensions <code>astral-sh.uv</code> and <code>ms-python.python</code></li>
        <li>Runs a <code>postCreateCommand</code> that primes dependencies via <code>uv pip install fastapi</code></li>
      </ul>
      <p>
        Launch a Codespace from that repository and keep it alive. Then run
        <code>echo $GITHUB_REPOSITORY $GITHUB_TOKEN</code>
        inside the Codespace terminal—the same as an authenticated PAT for the duration of the session. Paste the output
        (two space-separated values) below.
      </p>
      <label for="${e}" class="form-label">Repository slug and token</label>
      <input class="form-control" id="${e}" name="${e}" placeholder="OWNER/REPO ghp_xxx" />
    </div>
  `;
    return {
        id: e,
        title: s,
        weight: a,
        question: o,
        answer: n
    }
}
var xt = U(() => {
    "use strict";
    le()
}
);
var At = {};
q(At, {
    default: () => Vo
});
import { html as Jo } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
async function Vo({ user: t, weight: a = 1 }) {
    let e = "q-github-gist"
        , s = "Host a file on GitHub Gist"
        , i = async n => {
            if (n = n.trim(),
                new URL(n).hostname !== "gist.github.com")
                throw new Error("URL should be hosted on gist.github.com");
            let c = await fetch(`/proxy/${n}`).then(d => d.text());
            if (!c.includes(t.email))
                throw new Error(`${t.email} is not in the response: ${c.slice(0, 1e3)}...`);
            return !0
        }
        , h = Jo`
    <div class="mb-3">
      <p>
        Publish a file using <a href="https://gist.github.com/">GitHub Gist</a> that showcases your work. Ensure that
        your email address <strong><code>${t.email}</code></strong> is in the page's HTML.
      </p>
      <p>
        What is the GitHub Gist URL? It might look like:
        <code>https://gist.github.com/[USER]/[GIST_ID]</code>
      </p>
      <label for="${e}" class="form-label">
        What is the GitHub Gist URL?
      </label>
      <input class="form-control" id="${e}" name="${e}" />
      <p class="text-muted">
        If a recent change that's not reflected, add <code>?v=1</code>, <code>?v=2</code> to the URL to bust the cache.
        GitHub Gists are served via Cloudflare which obfuscates emails. Find a creative way to include your email in the HTML content of the Gist page so that it can be verified.
      </p>
    </div>
  `;
    return {
        id: e,
        title: s,
        weight: a,
        question: h,
        answer: i
    }
}
var Et = U(() => {
    "use strict"
}
);
function we(t, a, e = {
    verbose: !1
}, s = "") {
    if (!(t === null && a === null)) {
        if (t === null || a === null)
            throw new Error(`At ${s || "root"}: Expected ${t}, but got ${a}`);
        if (typeof t != "object" && typeof a != "object") {
            if (t !== a)
                throw new Error(`At ${s || "root"}: Values don't match` + (e.verbose ? `. Expected: ${JSON.stringify(t)}. Actual: ${JSON.stringify(a)}` : ""));
            return
        }
        if (Array.isArray(t) !== Array.isArray(a))
            throw new Error(`At ${s || "root"}: Type mismatch - one is array, other is object`);
        if (Array.isArray(t)) {
            if (t.length !== a.length)
                throw new Error(`At ${s || "root"}: Array length mismatch` + (e.verbose ? `. Expected: ${t.length}. Actual: ${a.length}` : ""));
            t.forEach((i, h) => {
                we(i, a[h], e, `${s}[${h}]`)
            }
            )
        } else {
            let i = Object.keys(t).sort()
                , h = Object.keys(a).sort();
            if (i.length !== h.length)
                throw new Error(`At ${s || "root"}: Different number of properties` + (e.verbose ? `. Expected: ${i.length}. Actual: ${h.length}` : ""));
            for (let n = 0; n < i.length; n++)
                if (i[n] !== h[n])
                    throw new Error(`At ${s || "root"}: Property name mismatch` + (e.verbose ? `. Expected: ${JSON.stringify(i[n])}. Actual: ${JSON.stringify(h[n])}` : ""));
            i.forEach(n => {
                we(t[n], a[n], e, s ? `${s}.${n}` : n)
            }
            )
        }
    }
}
var St = U(() => {
    "use strict"
}
);
var Ct, Rt = U(() => {
    "use strict";
    Ct = (t, a, e) => {
        let s = Array.from({
            length: t
        }, (h, n) => ({
            studentId: n + 1,
            class: `${Math.floor(e() * 12) + 1}${String.fromCharCode(65 + Math.floor(e() * 26))}`
        }))
            , i = s.flatMap(h => Array.from({
                length: Math.floor(e() * a) + 1
            }, (n, o) => ({
                studentId: h.studentId,
                subject: `Subject #${o + 1}`
            })));
        return {
            students: s,
            subjects: i
        }
    }
}
);
var Tt = {};
q(Tt, {
    default: () => Xo
});
import { html as Ko } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
async function Xo({ user: t, weight: a = 1 }) {
    let e = "q-fastapi"
        , s = "Write a FastAPI server to serve data"
        , i = (0,
            It.default)(`${t.email}#${e}`)
        , { students: h } = Ct(2e3, 400, i)
        , n = `studentId,class
` + h.map(l => `${l.studentId},${l.class}`).join(`
`)
        , o = new Blob([n], {
            type: "text/csv"
        })
        , c = [...new Set(h.map(l => l.class))]
        , d = async l => {
            if (!l)
                throw new Error("URL is required");
            let p = new URLSearchParams
                , u = Y([...c], Math.random).slice(0, 4);
            u.forEach(g => p.append("class", g));
            let f = await fetch(`${l}?${p.toString()}`).then(g => g.json())
                , v = h.filter(g => u.includes(g.class));
            return we(f.students, v),
                !0
        }
        , r = Ko`
    <div class="mb-3">
      <p>
        Download
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => J(o, `${e}.csv`)}>
          ${e}.csv</button
        >. This file has 2-columns:
        <ol>
          <li>studentId: A unique identifier for each student, e.g. 1, 2, 3, ...</li>
          <li>class: The class (including section) of the student, e.g. 1A, 1B, ... 12A, 12B, ... 12Z</li>
        </ol>
      </p>
      <p>
        Write a FastAPI server that serves this data. For example, <code>/api</code> should return all students data
        (in the same row and column order as the CSV file) as a JSON like this:
      </p>
      <pre><code class="language-json">{
  "students": [
    {
      "studentId": 1,
      "class": "1A"
    },
    {
      "studentId": 2,
      "class": "1B"
    }, ...
  ]
}</code></pre>
      <p>
        If the URL has a query parameter <code>class</code>, it should return only students in those classes. For example,
        <code>/api?class=1A</code> should return only students in class 1A.
        <code>/api?class=1A&class=1B</code> should return only students in class 1A and 1B.
        There may be any number of classes specified.
        Return students in the same order as they appear in the CSV file (not the order of the classes).
      </p>
      <p>Make sure you enable <strong>CORS</strong> to allow GET requests from any origin.</p>
      <label for="${e}" class="form-label">
        What is the API URL endpoint for FastAPI? It might look like:
        <code>http://127.0.0.1:8000/api</code>
      </label>
      <input class="form-control" id="${e}" name="${e}" type="url" required/>
      <p class="text-muted">
        We'll check by sending a request to this URL with <code>?class=...</code> added
        and check if the response matches the data.
      </p>
    </div>
  `;
    return {
        id: e,
        title: s,
        weight: a,
        question: r,
        answer: d
    }
}
var It, Ut = U(() => {
    "use strict";
    It = z(M(), 1);
    oe();
    St();
    ee();
    Rt()
}
);
var qt = {};
q(qt, {
    default: () => Zo
});
import { html as Yo } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
function Qo(t, a) {
    let e = [...t].sort((n, o) => n - o)
        , s = (e.length - 1) * a
        , i = Math.floor(s)
        , h = s - i;
    return e[i + 1] !== void 0 ? e[i] + h * (e[i + 1] - e[i]) : e[i]
}
async function Zo({ user: t, weight: a = 1 }) {
    let e = "q-vercel-latency"
        , s = "Deploy a POST analytics endpoint to Vercel"
        , i = (0,
            Ht.default)(`${t.email}#${e}`)
        , h = [];
    for (let l of Pt)
        for (let p = 0; p < 12; p++) {
            let u = jt[Math.floor(i() * jt.length)]
                , f = 110 + i() * 120
                , v = (i() - .5) * 25
                , g = +(f + v).toFixed(2)
                , y = +(97.1 + i() * 2.4).toFixed(3);
            h.push({
                region: l,
                service: u,
                latency_ms: g,
                uptime_pct: y,
                timestamp: 20250301 + p
            })
        }
    let n = {
        regions: Qe(Pt, 2, i),
        threshold_ms: Math.round(150 + i() * 40)
    }
        , o = new Blob([JSON.stringify(h, null, 2)], {
            type: "application/json"
        })
        , c = n.regions.map(l => {
            let p = h.filter(g => g.region === l)
                , u = p.map(g => g.latency_ms)
                , f = p.map(g => g.uptime_pct)
                , v = p.filter(g => g.latency_ms > n.threshold_ms).length;
            return {
                region: l,
                avg_latency: Number((u.reduce((g, y) => g + y, 0) / u.length).toFixed(2)),
                p95_latency: Number(Qo(u, .95).toFixed(2)),
                avg_uptime: Number((f.reduce((g, y) => g + y, 0) / f.length).toFixed(3)),
                breaches: v
            }
        }
        )
        , d = async l => {
            if (l = l.trim(),
                !new URL(l).hostname.includes("vercel.app"))
                throw new Error("Deploy to Vercel so the hostname ends with vercel.app");
            let u = await fetch(l, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(n)
            });
            if (!u.ok)
                throw new Error(`Server returned HTTP ${u.status}`);
            if (u.headers.get("access-control-allow-origin") !== "*")
                throw new Error("Enable CORS with Access-Control-Allow-Origin: *");
            let v = await u.json()
                , g = Array.isArray(v.regions) ? v.regions : v.regions && typeof v.regions == "object" ? Object.keys(v.regions).map(y => ({
                    region: y,
                    ...v.regions[y]
                })) : null;
            if (!g)
                throw new Error("Response should include a regions array or object");
            for (let y of c) {
                let A = g.find($ => ($.region ?? $.name ?? $.id) === y.region);
                if (!A)
                    throw new Error(`Missing stats for region ${y.region}`);
                let w = $ => typeof $ == "number" ? $ : Number($)
                    , k = w(A.avg_latency ?? A.average_latency)
                    , E = w(A.p95_latency ?? A.p95)
                    , b = w(A.avg_uptime ?? A.uptime)
                    , m = w(A.breaches ?? A.violation_count);
                if (!Number.isFinite(k) || Math.abs(k - y.avg_latency) > .5)
                    throw new Error(`avg_latency for ${y.region} should be ${y.avg_latency}`);
                if (!Number.isFinite(E) || Math.abs(E - y.p95_latency) > .5)
                    throw new Error(`p95_latency for ${y.region} should be ${y.p95_latency}`);
                if (!Number.isFinite(b) || Math.abs(b - y.avg_uptime) > .2)
                    throw new Error(`avg_uptime for ${y.region} should be ${y.avg_uptime}`);
                if (!Number.isFinite(m) || m !== y.breaches)
                    throw new Error(`breaches for ${y.region} should be ${y.breaches}`)
            }
            return !0
        }
        , r = Yo`
    <div class="mb-3">
      <p>
        eShopCo streams latency pings from every storefront to a small FastAPI service. Product managers want a
        serverless endpoint they can call from dashboards to check whether a deployment stays under target latency.
      </p>
      <p>
        Download the sample telemetry bundle
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => J(o, `${e}.json`)}>
          ${e}.json
        </button>
        and deploy a Python endpoint on <strong>Vercel</strong>.
      </p>
      <p>Your endpoint must:</p>
      <ul>
        <li>Accept a <code>POST</code> request with JSON body <code>{"regions": [...], "threshold_ms": 180}</code></li>
        <li>
          Return per-region metrics: <code>avg_latency</code> (mean), <code>p95_latency</code> (95th percentile),
          <code>avg_uptime</code> (mean), and <code>breaches</code> (count of records above threshold)
        </li>
        <li>Enable CORS for <code>POST</code> requests from any origin</li>
      </ul>
      <p>
        We'll send <code>${JSON.stringify(n)}</code> to your endpoint and verify the response (order doesn't
        matter).
      </p>
      <label for="${e}" class="form-label">What is the POST endpoint URL?</label>
      <input class="form-control" id="${e}" name="${e}" placeholder="https://your-app.vercel.app/api/latency" />
    </div>
  `;
    return {
        id: e,
        title: s,
        weight: a,
        question: r,
        answer: d
    }
}
var Ht, Pt, jt, Ot = U(() => {
    "use strict";
    Ht = z(M(), 1);
    oe();
    ee();
    Pt = ["apac", "emea", "amer"],
        jt = ["checkout", "catalog", "analytics", "recommendations", "payments", "support"]
}
);
var _t = {};
q(_t, {
    default: () => sr
});
import { html as er } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
async function sr({ user: t, weight: a = 1.5 }) {
    let e = "q-cloudflare-workers"
        , s = "Cloudflare Workers Serverless Deployment"
        , i = (0,
            Lt.default)(`${t.email}#${e}`)
        , n = D(nr, i)(i)
        , o = er`
    <div class="mb-3">
      <h4>Case Study: Deploying Serverless Functions with Cloudflare Workers</h4>
      <p>
        <strong>Scenario:</strong> Your team needs a lightweight, globally distributed serverless endpoint for
        processing data transformations. Cloudflare Workers provide edge computing capabilities with minimal latency.
        You must deploy a Worker that processes POST requests and returns transformed data.
      </p>
      <ol>
        <li>
          Create and deploy a Cloudflare Worker with a <code>POST /data</code> route using
          <a href="https://developers.cloudflare.com/workers/" target="_blank">Cloudflare Workers</a>.
        </li>
        <li>
          The endpoint should accept JSON with <code>{ "type": "...", "value": ... }</code> and return
          <code>{ "reversed": ..., "email": "${t.email}" }</code>.
        </li>
        <li>
          Based on the <code>type</code> field:
          <ul>
            <li><code>"string"</code>: Reverse the characters of the string value</li>
            <li><code>"array"</code>: Reverse the order of array elements</li>
            <li><code>"words"</code>: Reverse the order of words in the string</li>
            <li><code>"number"</code>: Reverse the digits of the number (return as integer)</li>
          </ul>
        </li>
        <li>Ensure CORS headers allow cross-origin POST requests.</li>
      </ol>
      <p>
        For grading, we will POST this data:
        <code class="d-block my-2">${JSON.stringify(n.payload)}</code>
      </p>
      <label for="${e}" class="form-label"
        >Enter the full URL of your Worker endpoint (e.g., <code>https://your-worker.your-subdomain.workers.dev/data</code>)</label
      >
      <input class="form-control" id="${e}" name="${e}" type="url" />
      <p class="text-muted">
        We'll POST to your endpoint, expect <code>application/json</code> response with <code>reversed</code> and
        <code>email</code> fields, and verify the output matches ${n.summary}.
      </p>
    </div>
  `;
    return {
        id: e,
        title: s,
        weight: a,
        question: o,
        answer: async d => {
            if (!d)
                throw new Error("URL is required");
            if (!d.startsWith("http://") && !d.startsWith("https://"))
                throw new Error("URL must start with http:// or https://");
            if (!d.includes(".workers.dev"))
                throw new Error("URL must be a Cloudflare Workers endpoint (ending with .workers.dev)");
            let r = await fetch(d, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(n.payload)
            });
            if (!r.ok)
                throw new Error(`Endpoint returned ${r.status} ${r.statusText}, expected 200 OK`);
            if (!(r.headers.get("content-type") || "").includes("application/json"))
                throw new Error("Response must be application/json");
            let p;
            try {
                p = await r.json()
            } catch {
                throw new Error("Response body is not valid JSON")
            }
            if (!p || typeof p != "object")
                throw new Error("Response must be a JSON object");
            if (p.email !== t.email)
                throw new Error("Email must match your registered email address");
            let u = ar(p);
            return n.validate(u),
                !0
        }
    }
}
var Lt, re, Wt, tr, or, rr, nr, ar, Dt = U(() => {
    "use strict";
    Lt = z(M(), 1);
    ee();
    re = (t, a, e) => Math.floor(t() * (e - a + 1)) + a,
        Wt = (t, a) => {
            let e = "abcdefghijklmnopqrstuvwxyz"
                , s = "";
            for (let i = 0; i < a; i++)
                s += e[Math.floor(t() * e.length)];
            return s
        }
        ,
        tr = (t, a) => {
            let e = [];
            for (let s = 0; s < a; s++)
                e.push(re(t, 1, 100));
            return e
        }
        ,
        or = t => t.split("").reverse().join(""),
        rr = t => [...t].reverse(),
        nr = [t => {
            let a = Wt(t, re(t, 8, 15))
                , e = or(a);
            return {
                id: `reverse-string-${a}`,
                description: `Reverse the string "${a}"`,
                payload: {
                    type: "string",
                    value: a
                },
                validate: s => {
                    if (s.reversed !== e)
                        throw new Error(`Expected reversed string "${e}", got "${s.reversed}"`)
                }
                ,
                summary: "the reversed string"
            }
        }
            , t => {
                let a = tr(t, re(t, 5, 10))
                    , e = rr(a);
                return {
                    id: `reverse-array-${a.join("-")}`,
                    description: `Reverse the array [${a.join(", ")}]`,
                    payload: {
                        type: "array",
                        value: a
                    },
                    validate: s => {
                        let i = s.reversed;
                        if (!Array.isArray(i))
                            throw new Error("Expected reversed to be an array");
                        if (i.length !== e.length)
                            throw new Error(`Expected array length ${e.length}, got ${i.length}`);
                        for (let h = 0; h < e.length; h++)
                            if (i[h] !== e[h])
                                throw new Error(`Expected ${e[h]} at index ${h}, got ${i[h]}`)
                    }
                    ,
                    summary: "the reversed array"
                }
            }
            , t => {
                let a = []
                    , e = re(t, 3, 6);
                for (let h = 0; h < e; h++)
                    a.push(Wt(t, re(t, 4, 8)));
                let s = a.join(" ")
                    , i = a.reverse().join(" ");
                return {
                    id: `reverse-words-${a.length}`,
                    description: `Reverse the order of words in "${s}"`,
                    payload: {
                        type: "words",
                        value: s
                    },
                    validate: h => {
                        if (h.reversed !== i)
                            throw new Error(`Expected "${i}", got "${h.reversed}"`)
                    }
                    ,
                    summary: "the words in reversed order"
                }
            }
            , t => {
                let a = re(t, 1e3, 99999)
                    , e = parseInt(String(a).split("").reverse().join(""), 10);
                return {
                    id: `reverse-digits-${a}`,
                    description: `Reverse the digits of the number ${a}`,
                    payload: {
                        type: "number",
                        value: a
                    },
                    validate: s => {
                        if (s.reversed !== e)
                            throw new Error(`Expected ${e}, got ${s.reversed}`)
                    }
                    ,
                    summary: "the number with reversed digits"
                }
            }
        ],
        ar = t => {
            if (!t || typeof t != "object")
                throw new Error("Response must be a JSON object with 'reversed' field");
            if (!("reversed" in t))
                throw new Error("Response must include 'reversed' field");
            return t
        }
}
);
var Mt = {};
q(Mt, {
    default: () => cr
});
import { html as ir } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
async function cr({ user: t, weight: a = 1 }) {
    let e = "q-cloudflared-tunnel"
        , s = "Create a Public Tunnel with cloudflared"
        , i = (0,
            Gt.default)(`${t.email}#${e}`)
        , n = D([8e3, 8080, 3e3, 5e3, 5500], i)
        , o = async d => {
            d = d.trim();
            let r;
            try {
                r = new URL(d.startsWith("http") ? d : `https://${d}`)
            } catch {
                throw new Error("Invalid URL format")
            }
            if (!r.hostname.endsWith(".trycloudflare.com"))
                throw new Error("URL must be a trycloudflare.com tunnel (e.g., https://random-words.trycloudflare.com)");
            r.protocol !== "https:" && (r.protocol = "https:");
            let l = await fetch(`/proxy/${r.href}`);
            if (!l.ok)
                throw new Error(`HTTP request failed with status ${l.status}. Make sure your local server is running and the cloudflared tunnel is active.`);
            let p = await l.text();
            if (!p || p.length === 0)
                throw new Error("The tunnel returned an empty response. Make sure your local server is serving content.");
            return !0
        }
        , c = ir`
    <div class="mb-3">
      <h4>Case Study: Secure Internal Dashboard Access</h4>
      <p>
        A company wants to securely expose an internal dashboard to the public internet for remote employees. Instead
        of dealing with complex firewall rules and exposing the server directly, they use a Cloudflare Tunnel. This
        creates a secure, outbound-only connection from their server to the Cloudflare network, making the dashboard
        safely accessible from a public URL.
      </p>
      <p>Complete the following steps:</p>
      <ol>
        <li>
          Start a simple local web server on port ${n}. For example, you can create an <code>index.html</code> file and
          run:
          <pre><code>python3 -m http.server ${n}</code></pre>
        </li>
        <li>
          Use the <code>cloudflared</code> command to create a "quick tunnel" to your local server on port ${n}:
          <pre><code>cloudflared tunnel --url http://localhost:${n}</code></pre>
        </li>
        <li>
          <code>cloudflared</code> will provide you with a public URL for your tunnel, which will end in
          <code>.trycloudflare.com</code>.
        </li>
      </ol>
      <label for="${e}" class="form-label">
        What is the public URL of your cloudflared tunnel? It will look like:
        <code>https://random-words.trycloudflare.com</code>
      </label>
      <input
        class="form-control"
        id="${e}"
        name="${e}"
        type="url"
        placeholder="https://random-words.trycloudflare.com"
        required
      />
      <p class="form-text text-muted">
        We'll make an HTTP GET request to your tunnel URL and verify it returns content from your local server.
      </p>
    </div>
  `;
    return {
        id: e,
        title: s,
        weight: a,
        question: c,
        answer: o
    }
}
var Gt, Ft = U(() => {
    "use strict";
    Gt = z(M(), 1);
    ee()
}
);
var Nt = {};
q(Nt, {
    default: () => dr
});
import { html as lr } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
async function dr({ user: t, weight: a = 1 }) {
    let e = "q-localtunnel"
        , s = "Create a localtunnel tunnel"
        , i = async n => {
            n = n.trim();
            let o = new URL(n);
            if (!o.hostname.includes("localtunnel") && !o.hostname.includes("loca.lt"))
                throw new Error("URL should be hosted on localtunnel (e.g., loca.lt domain)");
            let c = await fetch(`/proxy/${n}`, {
                headers: {
                    "bypass-tunnel-reminder": "1"
                }
            }).then(d => d.text());
            if (!c.match(t.email))
                throw new Error(`${t.email} is not in the response: ${c.slice(0, 1e3)}...`);
            return !0
        }
        , h = lr`
    <div class="mb-3">
      <p>
        Create a <a href="https://theboroer.github.io/localtunnel-www/">localtunnel</a> tunnel to your local server.
        Set up a URL that will serve your email address <code>${t.email}</code>.
      </p>
      <label for="${e}" class="form-label">
        What is the localtunnel URL? It might look like:
        <code>https://[random].loca.lt/...</code>
      </label>
      <input class="form-control" id="${e}" name="${e}" type="url" required />
    </div>
  `;
    return {
        id: e,
        title: s,
        weight: a,
        question: h,
        answer: i
    }
}
var Bt = U(() => {
    "use strict"
}
);
var Jt = {};
q(Jt, {
    default: () => ur
});
import { html as hr } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
async function ur({ user: t, weight: a = 1 }) {
    let e = "q-fastapi-file-validation"
        , s = "Build a FastAPI File Validation Service"
        , i = (0,
            zt.default)(`${t.email}#${e}`)
        , h = [".csv", ".json", ".txt"]
        , n = 50 + Math.floor(i() * 50)
        , o = `X-Upload-Token-${Math.floor(i() * 9e3 + 1e3)}`
        , c = Array.from({
            length: 16
        }, () => "abcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(i() * 36)]).join("")
        , d = ["id", "name", "value", "category"]
        , r = []
        , l = 20 + Math.floor(i() * 30)
        , p = ["A", "B", "C", "D"];
    for (let w = 0; w < l; w++)
        r.push({
            id: w + 1,
            name: `Item_${String(w + 1).padStart(3, "0")}`,
            value: Math.round(i() * 1e3 * 100) / 100,
            category: p[Math.floor(i() * p.length)]
        });
    let u = Math.round(r.reduce((w, k) => w + k.value, 0) * 100) / 100
        , f = {};
    for (let w of r)
        f[w.category] = (f[w.category] || 0) + 1;
    let v = [d.join(","), ...r.map(w => d.map(k => w[k]).join(","))].join(`
`)
        , g = new Blob([v], {
            type: "text/csv"
        })
        , y = async w => {
            w = w.trim().replace(/\/$/, "");
            let k = new FormData;
            if (k.append("file", new Blob(["test"], {
                type: "text/plain"
            }), "test.txt"),
                (await fetch(w, {
                    method: "POST",
                    body: k
                })).ok)
                throw new Error(`Request without ${o} header should be rejected (401 or 403)`);
            let b = new FormData;
            if (b.append("file", new Blob(["test"], {
                type: "application/pdf"
            }), "test.pdf"),
                (await fetch(w, {
                    method: "POST",
                    headers: {
                        [o]: c
                    },
                    body: b
                })).ok)
                throw new Error("PDF files should be rejected (only .csv, .json, .txt allowed)");
            let $ = "x".repeat(150 * 1024)
                , x = new FormData;
            if (x.append("file", new Blob([$], {
                type: "text/plain"
            }), "large.txt"),
                (await fetch(w, {
                    method: "POST",
                    headers: {
                        [o]: c
                    },
                    body: x
                })).ok)
                throw new Error(`Files larger than ${n}KB should be rejected`);
            let P = new FormData;
            P.append("file", g, "data.csv");
            let I = await fetch(w, {
                method: "POST",
                headers: {
                    [o]: c
                },
                body: P
            });
            if (!I.ok)
                throw new Error(`Valid CSV upload failed: HTTP ${I.status}`);
            if (I.headers.get("access-control-allow-origin") !== "*")
                throw new Error("Enable CORS with Access-Control-Allow-Origin: *");
            let T;
            try {
                T = await I.json()
            } catch {
                throw new Error("Response must be valid JSON")
            }
            if (T.email !== t.email)
                throw new Error(`Response must include email: "${t.email}"`);
            if (T.filename !== "data.csv")
                throw new Error('Response must include the original filename as "filename"');
            if (T.rows !== l)
                throw new Error(`Response should report ${l} rows`);
            if (!T.columns || !d.every(O => T.columns.includes(O)))
                throw new Error(`Response should list columns: ${d.join(", ")}`);
            if (Math.abs(T.totalValue - u) > .5)
                throw new Error(`Sum of "value" column should be ${u}`);
            if (!T.categoryCounts)
                throw new Error("Response should include categoryCounts object");
            for (let [O, F] of Object.entries(f))
                if (T.categoryCounts[O] !== F)
                    throw new Error(`Category ${O} should have count ${F}`);
            return !0
        }
        , A = hr`
    <div class="mb-3">
      <h4>Case Study: SecureUpload Data Processor</h4>
      <p>
        SecureUpload processes CSV files from various departments. Before processing, files must be validated for
        security (size limits, file type checks) and authenticity (API token). Invalid uploads should be rejected with
        appropriate error codes.
      </p>

      <h5>Your Task</h5>
      <p>
        Create a FastAPI endpoint that validates and processes file uploads. Download this test file:
        <button class="btn btn-sm btn-outline-primary" type="button" @click=${() => J(g, `${e}.csv`)}>
          ${e}.csv
        </button>
      </p>

      <h5>Validation Rules</h5>
      <ul>
        <li>
          <strong>Authentication:</strong> Require header <code>${o}: ${c}</code>
          <br />Return <code>401 Unauthorized</code> if missing or wrong
        </li>
        <li>
          <strong>File type:</strong> Only accept <code>${h.join(", ")}</code>
          <br />Return <code>400 Bad Request</code> for other types
        </li>
        <li>
          <strong>File size:</strong> Maximum <code>${n}KB</code>
          <br />Return <code>413 Payload Too Large</code> if exceeded
        </li>
      </ul>

      <h5>Success Response</h5>
      <p>For valid CSV uploads, analyze the file and return:</p>
      <pre><code class="language-json">{
  "email": "${t.email}",
  "filename": "data.csv",
  "rows": ${l},
  "columns": ["id", "name", "value", "category"],
  "totalValue": ${u},
  "categoryCounts": ${JSON.stringify(f)}
}</code></pre>

      <h5>Requirements</h5>
      <ul>
        <li>Enable CORS for POST requests from any origin</li>
        <li>Accept file via <code>multipart/form-data</code> with field name <code>file</code></li>
        <li>Parse CSV and compute statistics</li>
      </ul>

      <label for="${e}" class="form-label">Your FastAPI endpoint URL:</label>
      <input class="form-control" id="${e}" name="${e}" type="url" placeholder="http://127.0.0.1:8000/upload" />
    </div>
  `;
    return {
        id: e,
        title: s,
        weight: a,
        question: A,
        answer: y
    }
}
var zt, Vt = U(() => {
    "use strict";
    zt = z(M(), 1);
    oe()
}
);
var Kt = {};
q(Kt, {
    default: () => fr
});
import pr from "https://cdn.jsdelivr.net/npm/jwt-decode@3/build/jwt-decode.esm.js";
import { html as mr } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
async function fr({ user: t, weight: a = 1 }) {
    let e = "q-google-oauth-fastapi"
        , s = "FastAPI Google OAuth Login Verification"
        , i = async n => {
            let o;
            try {
                o = JSON.parse(n)
            } catch {
                throw new Error("Submit a valid JSON object")
            }
            let { id_token: c, client_id: d } = o;
            if (typeof c != "string" || !c)
                throw new Error("Missing or invalid id_token");
            if (typeof d != "string" || !d)
                throw new Error("Missing or invalid client_id");
            let r;
            try {
                r = pr(c)
            } catch {
                throw new Error("Failed to decode JWT")
            }
            if (r.iss !== "https://accounts.google.com")
                throw new Error(`Unexpected issuer: ${r.iss}`);
            if (r.aud !== d)
                throw new Error(`Audience ${r.aud} does not match client_id`);
            if (!r.email_verified)
                throw new Error("email_verified is not true");
            if (r.email !== t.email)
                throw new Error(`Logged-in email ${r.email} does not match expected ${t.email}`);
            let l = Math.floor(Date.now() / 1e3);
            if (r.exp <= l)
                throw new Error("Token has already expired");
            return !0
        }
        , h = mr`
    <div class="mb-3">
      <h4>Case Study: eShopCo Staff Portal Login</h4>
      <p>eShopCo is a fast-growing e-commerce company that uses Google Workspace to manage all staff accounts. They want a secure, password-less portal where employees can:</p>
      <ol>
        <li>View real-time sales dashboards  </li>
        <li>Update inventory levels  </li>
        <li>Manage customer support tickets  </li>
      </ol>
      <p>Rather than building and maintaining yet another username/password system, they’ve chosen to integrate Google SSO (OpenID Connect) via FastAPI.</p>
      <p><strong>Why This Matters</strong>  </p>
      <ul>
        <li><strong>Security &amp; UX</strong>: Google SSO reduces password fatigue, phishing risk, and support overhead.  </li>
        <li><strong>Industry Standard</strong>: OAuth/OpenID Connect is the go-to approach for modern web apps.  </li>
        <li><strong>Hands-On</strong>: You’ll see firsthand how tokens, sessions, and redirects work together.</li>
      </ul>
      <p>As an eShopCo developer, you’ll build a minimal FastAPI application that:</p>
      <ol>
        <li><strong>Redirects</strong> unauthenticated users to Google’s login page</li>
        <li><strong>Handles</strong> the OAuth callback, exchanges the code for tokens</li>
        <li><strong>Stores</strong> the returned <code>id_token</code> in session</li>
        <li><strong>Exposes</strong> an <code>/id_token</code> endpoint that returns the raw <code>id_token</code> as JSON  </li>
      </ol>
      <p>Then, log in as <code>${t.email}</code> and note the <code>id_token</code>.</p>
      <p><strong>Create</strong> the Google Client ID with your <em>personal</em> Google account. <strong>Log in</strong> with the same email ID you've used on this page.</p>
      <p>Submit below as JSON:</p>
      <pre><code>{
  "id_token": "eyJ...",
  "client_id": "YOUR_CLIENT_ID"
}</code></pre>
      <textarea
        class="form-control font-monospace"
        rows="6"
        id="${e}"
        name="${e}"
        placeholder='{"id_token":"...","client_id":"..."}'
      ></textarea>
      <p class="form-text text-muted">
        We’ll decode your <code>id_token</code> with <code>jwt_decode</code> and check:
        <ul>
          <li>Your <code>iss</code> is <code>https://accounts.google.com</code></li>
          <li><code>aud</code> matches your <code>client_id</code></li>
          <li><code>email_verified</code> is <code>true</code></li>
          <li><code>email</code> exactly matches <strong>${t.email}</strong></li>
          <li><code>exp</code> is still in the future</li>
        </ul>
      </p>
    </div>
  `;
    return {
        id: e,
        title: s,
        weight: a,
        question: h,
        answer: i
    }
}
var Xt = U(() => {
    "use strict"
}
);
var Yt = {};
q(Yt, {
    default: () => wr
});
import { html as gr } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
async function wr({ user: t, weight: a = 1 }) {
    let e = "q-ollama"
        , s = "Local Ollama Endpoint"
        , i = async n => {
            if (n = n.trim(),
                !new URL(n).hostname.includes("ngrok"))
                throw new Error("URL must be an ngrok forwarding domain");
            let c = await fetch(`${n.replace(/\/$/, "")}/api/version`, {
                headers: {
                    "ngrok-skip-browser-warning": !0
                }
            });
            if (!(await c.json()).version)
                throw new Error("Server is not running Ollama");
            let r = c.headers.get("x-email");
            if (r !== t.email)
                throw new Error(`X-Email header mismatch; expected ${t.email} but got ${r}`);
            return !0
        }
        , h = gr`
    <div class="mb-3">
      <h4>Case Study: eShopCo AI Chat Diagnostics</h4>
      <p>
        eShopCo operates a local Ollama instance (<code>http://localhost:11434</code>) to power our internal AI chat
        assistant. To allow remote diagnostics and frontend integration, you need to:
      </p>
      <ol>
        <li>
          <strong>Enable CORS</strong> for Ollama. Set the environment variable <code>OLLAMA_ORIGINS="*"</code>. Then
          run Ollama. For example:
          <pre><code>export OLLAMA_ORIGINS="*"
ollama serve</code></pre>
        </li>
        <li>
          <strong>Expose</strong> it via ngrok, injecting your email in the header:
          <pre><code>ngrok http 11434 --response-header-add "X-Email: ${t.email}" --response-header-add 'Access-Control-Expose-Headers: *' --response-header-add 'Access-Control-Allow-Headers: Authorization,Content-Type,User-Agent,Accept,Ngrok-skip-browser-warning'</code></pre>
        </li>
        <li>Note the HTTPS forwarding URL that ngrok prints (e.g. <code>https://abcd1234.ngrok-free.app</code>).</li>
        <li>
          <strong>Verify</strong> via a simple fetch (or curl) that:
          <ul>
            <li>CORS header <code>Access-Control-Allow-Origin: *</code> is present</li>
            <li>Your <code>X-User-Email</code> header is echoed</li>
            <li>The JSON body looks like a valid Ollama response</li>
          </ul>
        </li>
      </ol>
      <label for="${e}" class="form-label"> Paste your ngrok forwarding URL here: </label>
      <input
        class="form-control"
        id="${e}"
        name="${e}"
        type="url"
        placeholder="https://abcd1234.ngrok-free.app"
        required
      />
      <p class="form-text text-muted">We’ll automatically fetch and verify the response headers and body.</p>
    </div>
  `;
    return {
        id: e,
        title: s,
        weight: a,
        question: h,
        answer: i
    }
}
var Qt = U(() => {
    "use strict"
}
);
import { html as ie, render as ao } from "https://cdn.jsdelivr.net/npm/lit-html@3/lit-html.js";
function Ie(t, a) {
    let e = ie`<ol class="mt-3">
    ${t.map(({ id: h, title: n, weight: o }) => ie`<li><a href="#h${h}">${n}</a> (${o} ${o == 1 ? "mark" : "marks"})</li>`)}
  </ol>`
        , s = [ie`<h1 class="display-6">Questions</h1>`, e, ...t.map(({ id: h, title: n, weight: o, question: c, help: d }, r) => (d && !Array.isArray(d) && (d = [d]),
            ie`
        <div class="card my-5" data-question="${h}" id="h${h}">
          <div class="card-header">
            <span class="badge text-bg-primary me-2">${r + 1}</span>
            ${n} (${o} ${o == 1 ? "mark" : "marks"})
          </div>
          ${d ? d.map(l => ie`<div class="card-body border-bottom">${l}</div>`) : ""}
          <div class="card-body">${c}</div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-primary check-answer" data-question="${h}">Check</button>
          </div>
        </div>
      `))]
        , i = {
            index: e,
            questions: s
        };
    for (let [h, n] of a)
        ao(i[n], h)
}
import { unsafeHTML as so } from "https://cdn.jsdelivr.net/npm/lit-html@3/directives/unsafe-html.js";
import { Marked as io } from "https://cdn.jsdelivr.net/npm/marked@13/+esm";
var Te = "https://tds.s-anand.net"
    , Ue = t => t && !t.match(/^(https?|mailto):/)
    , co = new io({
        renderer: {
            image(t, a, e) {
                return Ue(t) && (t = `${Te}/${t}`),
                    `<img src="${t}" alt="${e}" ${a ? `title="${a}"` : ""} class="img-fluid" loading="lazy">`
            },
            link(t, a, e) {
                return Ue(t) && (t = `${Te}/${t.endsWith(".md") ? `#/${t.replace(/\.md$/, "")}` : t}`),
                    `<a href="${t}" ${a ? `title="${a}"` : ""} target="_blank">${e}</a>`
            }
        }
    })
    , H = t => so(co.parse(t));
async function Rn(t, a) {
    let e = [{
        ...await Promise.resolve().then(() => (Ye(),
            Xe)).then(s => s.default({
                user: t,
                weight: .5
            })),
        help: [H(`
![](https://files.s-anand.net/images/q-image-compression-dynamic.webp)

### Ask AI

- [Why bother compressing images? Or rather, when is it worth the effort? Is there a decision tree I could use?](#askai)
- [What are the best modern formats and settings for image compression?](#askai)
- [What are the best tools/libraries for modern image compression?](#askai)
`)]
    }, {
        ...await Promise.resolve().then(() => (tt(),
            et)).then(s => s.default({
                user: t,
                weight: 1.5
            })),
        help: [H(`
![](https://files.s-anand.net/images/q-git-revert-env.webp)

### Ask AI

- [How do I prevent accidentally committing secrets into a Git repository?](#askai)
- [What are the ways of "undo"-ing a commit/push in Git, and which do I use when?](#askai)
- [How do I rewrite my git commits, just removing or modifying one commit? What if I already pushed it?](#askai)
`)]
    }, {
        ...await Promise.resolve().then(() => (at(),
            nt)).then(s => s.default({
                user: t,
                weight: 1
            })),
        help: [H(`
![](https://files.s-anand.net/images/q-git-time-travel.webp)

### Ask AI
- [How do I use git to figure out who/what created a problem? Start with easy tips and progress to the most powerful ones.](#askai)
- [How do I rewrite Git history by creating new commits that modify or remove old commits? What are the implications of doing this, especially if I've already pushed to a remote repository?](#askai)
`)]
    }, {
        ...await Promise.resolve().then(() => (it(),
            st)).then(s => s.default({
                user: t,
                weight: .5
            })),
        help: [H(`
![](https://files.s-anand.net/images/q-github-pages.webp)

### Ask AI

- [What do employers look for when they review GitHub profiles?](#askai)
- [How do the best developers / data scientists create GitHub portfolios that stand out? What do they include/exclude? How do they design & structure them?](#askai)
- [What is GitHub Pages? What are popular, modern alternatives? Give me a decision tree on what to use when.](#askai)
`)]
    }, {
        ...await Promise.resolve().then(() => (dt(),
            lt)).then(s => s.default({
                user: t,
                weight: 1
            })),
        help: [H(`
![](https://files.s-anand.net/images/q-github-pages-json-api.webp)

### Ask AI

- [Can I use GitHub Pages as a simple JSON API? What are the trade-offs vs a real backend?](#askai)
- [When using GitHub pages to serve static data like an API, how best could I structure the files and pre-compute data for efficient loading, querying and caching?](#askai)
`)]
    }, {
        ...await Promise.resolve().then(() => (ut(),
            ht)).then(s => s.default({
                user: t,
                weight: 1
            })),
        help: [H(`
![](https://files.s-anand.net/images/q-github-action.webp)

### Ask AI

- [What is GitHub Actions? Explain workflows, jobs, steps, runners, and their interactions using an analogy and a YAML file](#askai)
- [What useful, interesting things can I do with GitHub Actions? How do experts get the most out of it?](#askai)
- [What are good alternatives to GitHub actions that address the top complaints developers have about it?](#askai)
`)]
    }, {
        ...await Promise.resolve().then(() => (mt(),
            pt)).then(s => s.default({
                user: t,
                weight: 1
            })),
        help: [H(`
![](https://files.s-anand.net/images/q-github-action-cache.webp)

### Ask AI

- [What's caching in GitHub Actions? How do I use it, and when/what should I NOT cache?](#askai)
- [In GitHub Actions, how do we control what to cache and for how long? What else can I control?](#askai)
- [How do I bust the GitHub Actions cache? What other issues do people face with it? How can I monitor/troubleshoot them?](#askai)
`)]
    }, {
        ...await Promise.resolve().then(() => (gt(),
            ft)).then(s => s.default({
                user: t,
                weight: 1
            })),
        help: [H(`
![](https://files.s-anand.net/images/q-dependabot-config.webp)

### Ask AI

- [What is Dependabot? What are popular, modern alternatives? Give me a decision tree on what to use when.](#askai)
- [When is it OK to ignore Dependabot alerts? When (and why) do people often ignore them when they shouldn't?](#askai)
- [What are the most useful, popular scenarios where people customize Dependabot configurations, and how do they customize?](#askai)
`)]
    }, {
        ...await Promise.resolve().then(() => (yt(),
            wt)).then(s => s.default({
                user: t,
                weight: 1
            })),
        help: [H(`
![](https://files.s-anand.net/images/q-docker-hub-image.webp)

### Ask AI

- [What is Docker? What are popular, modern alternatives? Give me a decision tree on what to use when and what's Docker-compatible.](#askai)
- [What are cool, useful things I can do with Docker (locally) that I should know, as a data scientist, and how do I do them?](#askai)
- [What is Docker Hub? What are popular, modern alternatives? Give me a decision tree on what to use when.](#askai)
- [What are cool, useful things I can do with Docker Hub that I should know, as a data scientist, and how do I do them?](#askai)
`)]
    }, {
        ...await Promise.resolve().then(() => ($t(),
            vt)).then(s => s.default({
                user: t,
                weight: 1.5
            })),
        help: [H(`
![](https://files.s-anand.net/images/q-huggingface-docker.webp)

### Ask AI

- [What is Hugging Face Spaces? What are popular, modern alternatives? Give me a decision tree on what to use when.](#askai)
- [How does Docker work in Hugging Face Spaces? What limitations/gotchas should I know about - and what does it mean for me?](#askai)
`)]
    }, {
        ...await Promise.resolve().then(() => (xt(),
            kt)).then(s => s.default({
                user: t,
                weight: .5
            })),
        help: [H(`
![](https://files.s-anand.net/images/q-github-codespaces-devcontainer.webp)

### Ask AI

- [What is a DevContainer in GitHub Codespaces and why would I use it? What are popular, modern alternatives? Give me a decision tree on what to use when.](#askai)
- [How do I access DevContainers in GitHub Codespaces? What are common issues and troubleshooting tips?](#askai)
- [Today, for a data scientist using modern tools, what devcontainer.json setup would you recommend and why? What's changed since last year?](#askai)
`)]
    }, {
        ...await Promise.resolve().then(() => (Et(),
            At)).then(s => s.default({
                user: t,
                weight: 1
            })),
        help: [H(`
![](https://files.s-anand.net/images/q-github-gist.webp)

### Ask AI

- [What is GitHub Gist? What are popular, modern alternatives? Give me a decision tree on what to use when.](#askai)
- [How does GitHub Gist work? What limitations/gotchas should I know about - and what does it mean for me?](#askai)
- [What are the most common issues people face with GitHub Gist? How can I monitor/troubleshoot them?](#askai)
`)]
    }, {
        ...await Promise.resolve().then(() => (Ut(),
            Tt)).then(s => s.default({
                user: t,
                weight: 1
            })),
        help: [H(`
![](https://files.s-anand.net/images/q-fastapi.webp)

### Ask AI

- [What is FastAPI and why would I use it? What are popular, modern alternatives? Give me a decision tree on what to use when.](#askai)
- [Show me some things that seem magical when using FastAPI - with examples!](#askai)
- [What is CORS and how do I enable it in FastAPI applications?](#askai)
`)]
    }, {
        ...await Promise.resolve().then(() => (Ot(),
            qt)).then(s => s.default({
                user: t,
                weight: 1
            })),
        help: [H(`
![](https://files.s-anand.net/images/q-vercel-latency.webp)

### Ask AI

- [What is Vercel? What are popular, modern alternatives? Give me a decision tree on what to use when.](#askai)
- [How does Vercel work? What limitations/gotchas should I know about - and what does it mean for me?](#askai)
- [What are the most common issues people face with Vercel? How can I monitor/troubleshoot them?](#askai)
`)]
    }, {
        ...await Promise.resolve().then(() => (Dt(),
            _t)).then(s => s.default({
                user: t,
                weight: 1
            })),
        help: [H(`
![](https://files.s-anand.net/images/q-cloudflare-workers.webp)

### Ask AI

- [What is Cloudflare Workers? What are popular, modern alternatives? Give me a decision tree on what to use when.](#askai)
- [How does Cloudflare Workers work? What limitations/gotchas should I know about - and what does it mean for me?](#askai)
- [What are the most common issues people face with Cloudflare Workers? How can I monitor/troubleshoot them?](#askai)
- [When/why would I use Cloudflare Workers instead of deploying to a cloud server?](#askai)
- [Can I use Cloudflare Workers to serve a Python FastAPI application? Why or why not?](#askai)
`)]
    }, {
        ...await Promise.resolve().then(() => (Ft(),
            Mt)).then(s => s.default({
                user: t,
                weight: 1
            })),
        help: [H(`
![](https://files.s-anand.net/images/q-cloudflared-tunnel.webp)

### Ask AI

- [What is Cloudflare Tunnels? What are popular, modern alternatives? Give me a decision tree on what to use when.](#askai)
- [When/why would I use a Cloudflare Tunnel instead of deploying to a cloud server?](#askai)
- [What is the difference between Cloudflare Workers and Cloudflare Tunnels? When/why would I use one vs the other?](#askai)
- [What useful, interesting things can I do with Cloudflare Tunnels? How do experts get the most out of it?](#askai)
`)]
    }, {
        ...await Promise.resolve().then(() => (Bt(),
            Nt)).then(s => s.default({
                user: t,
                weight: 1
            })),
        help: [H(`
![](https://files.s-anand.net/images/q-localtunnel.webp)

### Ask AI

- [What is localtunnel? What are popular, modern alternatives? Give me a decision tree on what to use when.](#askai)
- [How does localtunnel work? What limitations/gotchas should I know about - and what does it mean for me?](#askai)
- [What's the difference between localtunnel, ngrok, and Cloudflare Tunnels? When/why would I use one vs the other?](#askai)
`)]
    }, {
        ...await Promise.resolve().then(() => (Vt(),
            Jt)).then(s => s.default({
                user: t,
                weight: 1
            })),
        help: [H(`
![](https://files.s-anand.net/images/q-fastapi-file-validation.webp)

### Ask AI

- [How do I upload files to FastAPI?](#askai)
- [How should I validate files (for security) in FastAPI? E.g. can I just check file extensions?](#askai)
- [What HTTP error code should we return for different validation failures? How does it really matter, practically?](#askai)
`)]
    }, {
        ...await Promise.resolve().then(() => (Xt(),
            Kt)).then(s => s.default({
                user: t,
                weight: 1.5
            })),
        help: [H(`
![](https://files.s-anand.net/images/q-google-auth-fastapi.webp)

### Ask AI

- [How do I implement Google authentication in a FastAPI application?](#askai)
- [What are the security considerations when using OAuth2 with FastAPI?](#askai)
- [How can I handle token refresh and expiration in Google-authenticated FastAPI apps?](#askai)
`)]
    }, {
        ...await Promise.resolve().then(() => (Qt(),
            Yt)).then(s => s.default({
                user: t,
                weight: 1
            })),
        help: [H(`
![](https://files.s-anand.net/images/q-ollama.webp)

### Ask AI

- [What is Ollama and why would I use it? What are popular, modern alternatives? Give me a decision tree on what to use when.](#askai)
- [How do I choose the right model size for my hardware? What's the memory/quality trade-off?](#askai)
- [What's the OLLAMA_ORIGINS environment variable and why do I need it for web access?](#askai)
`)]
    }];
    return Ie(e, a),
        Object.fromEntries(e.map(({ id: s, ...i }) => [s, i]))
}
export { Rn as questions };
