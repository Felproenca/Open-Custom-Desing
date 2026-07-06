// Last Check: 07-04-2026 14:26h //
(() => {
  class t {
    constructor(t) {
      ((this.key = t), (this.listeners = []));
    }
    listen(t) {
      (console.assert(-1 === this.listeners.indexOf(t)),
        this.listeners.push(t));
    }
    removeListener(t) {
      (console.assert(-1 !== this.listeners.indexOf(t)),
        this.listeners.splice(this.listeners.indexOf(t), 1));
    }
    async notify(...t) {
      return this.rawNotify(this.key, ...t);
    }
    async notifySome(t) {
      await Promise.allSettled(t.map(([t, ...s]) => t[this.key](...s)));
    }
    async rawNotify(t, ...s) {
      await Promise.allSettled(this.listeners.map((n) => n[t](...s)));
    }
  }
  function s(t) {
    return new Promise((s) => setTimeout(() => s(), t));
  }
  class n {
    static object(t, s) {
      return this.instance.makeObject(t, s);
    }
    static function(t, s) {
      return this.instance.makeFunction(t, s);
    }
    static proto(t, s) {
      return this.instance.makeProto(t, s);
    }
  }
  class e extends n {
    makeProto(t, s) {
      for (const n in t) {
        let e = s[n];
        if (!e) continue;
        const i = Reflect.getOwnPropertyDescriptor(t, n);
        if (i && !i.writable) continue;
        const o = t[n];
        if (o instanceof Function)
          try {
            t[n] = new Proxy(o, {
              apply: (t, n, i) =>
                e.call(s, n, (...s) => Reflect.apply(t, n, s), i),
            });
          } catch (t) {}
      }
    }
    makeObject(t, s) {
      return new Proxy(t, {
        get(t, n, e) {
          const i = Reflect.getOwnPropertyDescriptor(t, n);
          if (void 0 !== i && !i.configurable) {
            if (("value" in (o = i) || "writable" in o) && !1 === i.writable)
              return i.value;
            if (((t) => "get" in t || "set" in t)(i) && void 0 === i.get)
              return;
            return i.value;
          }
          var o;
          let c = Reflect.get(t, n),
            r = s[n] || void 0;
          return void 0 === r
            ? c
            : c instanceof Function
              ? (...n) => r.call(s, t, (...s) => c.apply(t, s), n)
              : r.call(s, t, c);
        },
      });
    }
    makeFunction(t, s) {
      return t instanceof Function
        ? new Proxy(t, {
            apply: (t, n, e) =>
              s.apply.call(s, (...s) => Reflect.apply(t, n, s), e),
          })
        : t;
    }
  }
  class i extends n {
    makeProto(t, s) {
      for (const n in t) {
        let e = s[n];
        if (!e) continue;
        const i = t[n];
        if (i instanceof Function)
          try {
            t[n] = function (...t) {
              const n = this;
              return e.call(s, n, (...t) => i.apply(n, t), t);
            };
          } catch (t) {}
      }
    }
    makeObject(t, s) {
      for (const n in t) {
        let e,
          i = t[n],
          o = s[n] || void 0;
        if (void 0 !== o) {
          e =
            i instanceof Function
              ? function (...t) {
                  const n = this;
                  return o.call(s, n, (...t) => i.apply(n, t), t);
                }
              : o.call(s, t, i);
          try {
            t[n] = e;
          } catch (t) {}
        }
      }
      return t;
    }
    makeFunction(t, s) {
      return t instanceof Function
        ? function (...n) {
            const e = this;
            return s.apply.call(s, (...s) => t.apply(e, s), n);
          }
        : t;
    }
  }
  class o {
    constructor(t, s) {
      ((this.t = t), (this.i = s), (this.o = !1));
    }
    h(t) {
      try {
        if ("done" === t || "canceled" === t)
          return void (this.o || ((this.o = !0), this.t(t)));
        this.t(t);
      } catch (t) {
        this.i("_sendEvent:", t);
      }
    }
    async read(t, s, n) {
      const e = await s.apply(null, n);
      return (e.done ? this.h("done") : this.h(e.value), e);
    }
    async cancel(t, s, n) {
      (await s.apply(null, n), this.h("canceled"));
    }
  }
  class c {
    constructor(t, s) {
      ((this.t = t), (this.i = s), (this.o = !1), (this.u = !1));
    }
    h(t) {
      try {
        if ("opened" === t) return void (this.u || ((this.u = !0), this.t(t)));
        if (
          (this.u ||
            "canceled" === t ||
            (this.i("_sendEvent: ", t, "sent before opened event"),
            this.t("opened")),
          "done" === t || "canceled" === t)
        )
          return void (this.o || ((this.o = !0), this.t(t)));
        this.t(t);
      } catch (t) {
        this.i("_sendEvent:", t);
      }
    }
    getReader(t, s, e) {
      if (0 !== e.length) return s.apply(null, e);
      const i = s.apply(null, e);
      return (this.h("opened"), n.object(i, new o(this.h.bind(this), this.i)));
    }
    async cancel(t, s, n) {
      (await s.apply(null, n), this.h("canceled"));
    }
  }
  class r {
    constructor(t, s) {
      ((this.l = t), (this.i = s), (this.v = !1));
    }
    p(t, s) {
      try {
        if (this.v) return;
        ((this.v = !0), this.l(s));
      } catch (t) {
        this.i("_sendSimpleResponse:", t);
      }
    }
    async m(t, n) {
      try {
        let e = new TextDecoder(),
          i = "";
        for (; 0 !== n.length; )
          (await s(), (i += e.decode(n[0])), (n = n.slice(1)));
        const o = i.split("\n").filter((t) => !!t),
          c = t + (o.length > 1 ? 1e4 : 0);
        for (let t = 0; t < o.length; t++) {
          const n = o[t],
            e = JSON.parse(n),
            i = 0 !== t && t === o.length - 1;
          try {
            this.l({ statusCode: i ? 1e3 + c : c, body: e });
          } catch (t) {
            this.i("_staggerDecodeAndSend: send:", t);
          }
          t === o.length - 1 && (await s());
        }
      } catch (t) {
        this.i("_staggerDecodeAndSend:", t);
      }
    }
    R(t, s) {
      var n;
      if ("opened" !== s)
        if ("canceled" !== s) {
          if ("done" === s) {
            if (
              !(null === (n = this._) || void 0 === n ? void 0 : n.length) ||
              this.v
            )
              return;
            return (
              (this.v = !0),
              this.m(t, this._).then(),
              void (this._ = void 0)
            );
          }
          this._ && this._.push(s);
        } else this._ = void 0;
      else this._ = [];
    }
    body(t, s) {
      return null === s
        ? null
        : (t.headers.get("Content-Type") || "").startsWith("application/json")
          ? n.object(s, new c((s) => this.R(t.status, s), this.i))
          : s;
    }
    async arrayBuffer(t, s, n) {
      const e = await s.apply(null, n);
      return (this.p("arrayBuffer", { body: e, statusCode: t.status }), e);
    }
    async blob(t, s, n) {
      const e = await s.apply(null, n);
      return (this.p("blob", { body: e, statusCode: t.status }), e);
    }
    async bytes(t, s, n) {
      const e = await s.apply(null, n);
      return (this.p("bytes", { body: e, statusCode: t.status }), e);
    }
    async formData(t, s, n) {
      const e = await s.apply(null, n);
      return (this.p("formData", { body: e, statusCode: t.status }), e);
    }
    async json(t, s, n) {
      const e = await s.apply(null, n);
      return (this.p("json", { body: e, statusCode: t.status }), e);
    }
    async text(t, s, n) {
      const e = await s.apply(null, n);
      return (this.p("text", { body: e, statusCode: t.status }), e);
    }
  }
  class a {
    constructor(t, s) {
      ((this.j = t), (this.i = s));
    }
    C(t, s) {
      try {
        this.j(t, s);
      } catch (t) {
        this.i("_sendResponse", t);
      }
    }
    async apply(t, s) {
      const e = await t.apply(null, s),
        [i, o] = s;
      let c, a;
      "string" == typeof i
        ? ((c = i), (a = (o && o.body) || void 0))
        : i instanceof URL
          ? ((c = i.toString()), (a = (o && o.body) || void 0))
          : ((c = i.url), (a = void 0));
      const h = { url: c, body: a };
      return n.object(e, new r((t) => this.C(h, t), this.i));
    }
  }
  class h {
    constructor(t, s) {
      ((this.j = t), (this.i = s), (this.extraData = new WeakMap()));
    }
    C(t, s) {
      try {
        this.j(t, s);
      } catch (t) {
        this.i("_sendResponse", t);
      }
    }
    open(t, s, n) {
      s.apply(null, n);
      const [e, i] = n;
      this.extraData.set(t, [e, i]);
    }
    send(t, s, n) {
      s.apply(null, n);
      const [e, i] = this.extraData.get(t) || [void 0, void 0];
      if (!i) return;
      const [o] = n,
        c = { url: i instanceof URL ? i.toString() : i, body: o };
      t.addEventListener("readystatechange", () => {
        try {
          var s;
          if (4 !== t.readyState) return;
          if (t.responseType && t.responseType !== '' && t.responseType !== 'text') return;
          (null === (s = t.getResponseHeader("Content-Type")) || void 0 === s
            ? void 0
            : s.startsWith("application/json")) &&
            this.C(c, { statusCode: t.status, body: t.responseText });
        } catch (e) {}
      });
    }
  }
  (window.oppuz.attach(
    (() => {
      const s = document.currentScript.src;
      return Object.assign(
        Object.assign(
          {},
          Object.fromEntries(
            new URLSearchParams(URL.parse(s).hash.replace("#", "?")),
          ),
        ),
        {
          constr: class {
            constructor(s) {
              ((this.$ = s),
                (this.id = "ajax-hijack"),
                (this.dynamicallyLoadable = "optional"),
                (this.P = new t("onRequest")),
                (this.k = []));
            }
            j(t, s) {
              if (void 0 === this.k) return this.P.notify(t, s);
              this.k.push([t, s]);
            }
            init() {
              "Proxy" in window && "Reflect" in window
                ? (n.instance = new e())
                : (n.instance = new i());
              try {
                n.proto(
                  XMLHttpRequest.prototype,
                  new h(this.j.bind(this), this.$.error.bind(this.$)),
                );
              } catch (t) {}
              try {
                window.fetch = n.function(
                  window.fetch,
                  new a(this.j.bind(this), this.$.error.bind(this.$)),
                );
              } catch (t) {}
            }
            listen(t) {
              this.P.listen(t);
            }
            removeListener(t) {
              this.P.removeListener(t);
            }
            async ready() {
              const t = this.k;
              this.k = void 0;
              for (const s of t) await this.P.notify(...s);
            }
          },
          id: "ajax-hijack",
        },
      );
    })(),
  ),
    (this.Oppuz = {}));
})();
