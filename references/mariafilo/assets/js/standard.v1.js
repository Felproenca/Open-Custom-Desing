// Last Modified (BRT): 01-07-2026 16:44h
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
      await Promise.allSettled(t.map(([t, ...e]) => t[this.key](...e)));
    }
    async rawNotify(t, ...e) {
      await Promise.allSettled(this.listeners.map((i) => i[t](...e)));
    }
  }
  class e {
    constructor(e) {
      ((this.$ = e), (this.id = "data-layer"), (this.t = new t("onDataLayer")));
    }
    init() {
      this.i = window.dataLayer || (window.dataLayer = []);
      var self = this;
      try {
        Object.defineProperty(window, 'dataLayer', {
          get: function() { return self.i; },
          set: function(v) {
            if (Array.isArray(v) && v !== self.i) {
              for (var x = 0; x < v.length; x++) self.i.push(v[x]);
            }
          },
          configurable: true
        });
      } catch(e) {}
    }
    listen(t) {
      this.t.listen(t);
    }
    removeListener(t) {
      this.t.removeListener(t);
    }
    async o(...t) {
      for (const e of t.filter((t) => "object" == typeof t))
        await this.t.notify("string" == typeof e.event ? e.event : void 0, e);
    }
    ready() {
      console.assert(this.i === window.dataLayer);
      const t = this.i.push;
      let e = this.i;
      const i = this.o.bind(this),
        r = this.$.console.bind(this.$),
        n = [...this.i];
      return (
        (e.push = (...n) => {
          try {
            i(...n);
          } catch (t) {
            r("Erro ao notificar ouvintes do Datalayer:", t);
          }
          return t.call(e, ...n);
        }),
        this.o(...n)
      );
    }
  }
  // Flag de cache-bust: false = sem ?bust= na URL do modulo (cache do CDN/navegador manda).
  // Setar true pra reativar o cache-bust de 5min (Brasilia) — bustTag() permanece intacto.
  const BUST_ENABLED = false;
  const bustTag = () => {
    // Horario de Brasilia (UTC-3, sem DST) — independente do fuso do usuario
    const d = new Date(Date.now() - 3 * 3600 * 1000);
    const p = (n) => String(n).padStart(2, '0');
    return String(d.getUTCFullYear()).slice(-2)
         + p(d.getUTCMonth() + 1)
         + p(d.getUTCDate())
         + p(d.getUTCHours())
         + p(Math.floor(d.getUTCMinutes() / 5) * 5);
  };
  const bustSeg = (cs) => BUST_ENABLED ? `${cs ? '&' : '?'}bust=${bustTag()}` : '';
  function i(t) {
    return null == t;
  }
  function r(t, e) {
    if (i(t) !== i(e)) return !1;
    if (i(t)) return !0;
    if (e.length !== t.length) return !1;
    for (let i = 0; i < t.length; i++) if (!s(t[i], e[i])) return !1;
    return !0;
  }
  function n(t, e) {
    if (Array.isArray(t) && Array.isArray(e)) return r(t, e);
    if (i(t) !== i(e)) return !1;
    if (i(t)) return !0;
    const n = Object.keys(t),
      o = Object.keys(e);
    if (n.length !== o.length) return !1;
    if (!r(n, o)) return !1;
    for (const i of n) if (!s(t[i], e[i])) return !1;
    return !0;
  }
  function s(t, e) {
    if (i(t) !== i(e)) return !1;
    if (i(t)) return !0;
    if (typeof t != typeof e) return !1;
    switch (typeof t) {
      case "function":
        return !0;
      case "object":
        return n(t, e);
      case "symbol":
      case "bigint":
      case "boolean":
      case "number":
      case "string":
        return t === e;
    }
    return !1;
  }
  class o {
    constructor(t, e, i, r, n, s, o, a, c) {
      ((this.hash = t),
        (this.host = e),
        (this.hostname = i),
        (this.href = r),
        (this.origin = n),
        (this.pathname = s),
        (this.port = o),
        (this.protocol = a),
        (this.search = c));
    }
    replace(t) {
      const e = void 0 !== t.protocol ? t.protocol : this.protocol,
        i = void 0 !== t.hostname ? t.hostname : this.hostname,
        r = void 0 !== t.port ? t.port : this.port,
        n = `${i}${("80" === r && "http:" === e) || ("443" === r && "https:" === e) || !r ? "" : ":" + r}`,
        s = `${e}//${n}`,
        a = void 0 !== t.pathname ? t.pathname : this.pathname,
        c = void 0 !== t.search ? t.search : this.search,
        u = void 0 !== t.hash ? t.hash : this.hash;
      return new o(u, n, i, `${s}${a}${c}${u}`, s, a, r, e, c);
    }
    static fromLocation(t) {
      return new o(
        t.hash,
        t.host,
        t.hostname,
        t.href,
        t.origin,
        t.pathname,
        t.port,
        t.protocol,
        t.search,
      );
    }
    equals(t) {
      return n(this, t);
    }
    toString() {
      return this.href;
    }
    matchComponent(t, e = "href") {
      return void 0 === t ? [this[e]] : t.exec(this[e]);
    }
    updatedMatch(t, { component: e, regex: i }) {
      if (void 0 === t) return this.matchComponent(i, e);
      const n = t.matchComponent(i, e),
        s = this.matchComponent(i, e);
      if (null === n) return s;
      if (null === s) return null;
      if (n.length !== s.length) return s;
      if (n.length > 1) {
        if (!r(n.slice(1), s.slice(1))) return s;
      } else if (!r(n, s)) return s;
      return null;
    }
    get source() {
      const t = this.utm;
      return t ? { utm: t } : null;
    }
    get searchParams() {
      return new URLSearchParams(this.search);
    }
    get rootDomain() {
      let t = this.hostname.split(".").reverse(),
        e = 2 != t[0].length || (2 != t[1].length && 3 != t[1].length) ? 2 : 3;
      return t.slice(0, e).reverse().join(".");
    }
    get utm() {
      const t = this.searchParams,
        e = t.get("utm_source"),
        i = t.get("utm_medium"),
        r = t.get("utm_campaign"),
        n = t.get("utm_content"),
        s = t.get("utm_term"),
        o = t.get("utm_ga");
      if (e || i || r || n || s || o) {
        const t = {};
        return (
          e && (t.source = e),
          r && (t.campaign = r),
          i && (t.medium = i),
          n && (t.content = n),
          s && (t.term = s),
          o && (t.ga = o),
          t
        );
      }
      return null;
    }
  }
  class a {
    constructor(e) {
      ((this.$ = e),
        (this.id = "navigation"),
        (this.t = new t("onNavigation")));
    }
    init() {
      this.u = o.fromLocation(window.location);
    }
    listen(t) {
      this.t.listen(t);
    }
    removeListener(t) {
      this.t.removeListener(t);
    }
    async h(t) {
      if (this.u.toString() === t.toString()) return;
      const e = this.u;
      ((this.u = t), await this.t.notify(t, e));
    }
    async ready() {
      const t = this.h.bind(this);
      window.addEventListener("popstate", () => {
        t(o.fromLocation(window.location));
      });
      const e = window.history.pushState;
      window.history.pushState = (...i) => {
        (e.call(history, ...i), t(o.fromLocation(window.location)));
      };
      const i = window.history.replaceState;
      return (
        (window.history.replaceState = (...e) => {
          (i.call(history, ...e), t(o.fromLocation(window.location)));
        }),
        await this.t.notify(this.u, void 0),
        t(o.fromLocation(window.location))
      );
    }
    get current() {
      return this.u || o.fromLocation(window.location);
    }
    get source() {
      return this.current.source;
    }
    get utm() {
      return this.current.utm;
    }
    mutate(t) {
      const e = o.fromLocation(window.location),
        i = t(e);
      return (i.href !== e.href && (window.location.href = i.href), i);
    }
  }
  class c {
    async get(t, e) {
      const i = await this.getString(t);
      if (!i || ["undefined", "null"].includes(i)) return null;
      try {
        const t = JSON.parse(i);
        return e(t) ? t : null;
      } catch (t) {
        return null;
      }
    }
    async has(t, e) {
      return null !== (await this.get(t, e));
    }
    async put(t, e, i) {
      return null === e
        ? (await this.remove(t, i), !0)
        : !!i(e) && this.putString(t, JSON.stringify(e));
    }
    async remove(t, e) {
      const i = await this.removeString(t);
      if (!i || ["undefined", "null"].includes(i)) return null;
      try {
        const t = JSON.parse(i);
        return e(t) ? t : null;
      } catch (t) {
        return null;
      }
    }
  }
  class u extends c {
    getKey(t) {
      return "oppuz" + ((e = t)[0].toUpperCase() + e.substring(1));
      var e;
    }
    getString(t) {
      var e;
      return this.l
        ? Promise.resolve(
            (null === (e = this.l) || void 0 === e
              ? void 0
              : e.getItem(this.getKey(t))) || null,
          )
        : Promise.resolve(null);
    }
    putString(t, e) {
      return this.l
        ? (this.l.setItem(this.getKey(t), e), Promise.resolve(!0))
        : Promise.resolve(!1);
    }
    removeString(t) {
      var e,
        i,
        r =
          (null === (e = this.l) || void 0 === e
            ? void 0
            : e.getItem(this.getKey(t))) || null;
      return (
        null === (i = this.l) || void 0 === i || i.removeItem(this.getKey(t)),
        Promise.resolve(r)
      );
    }
    constructor(t) {
      (super(), (this.$ = t), (this.id = "domain-storage"));
    }
    init() {
      this.l = window.localStorage || null;
    }
  }
  const h = "oppuz_";
  class l extends c {
    constructor(t) {
      (super(),
        (this.$ = t),
        (this.id = "root-domain-storage"),
        (this.deps = ["navigation"]));
    }
    get p() {
      return this.$.getModule("navigation");
    }
    getString(t) {
      return ((t = h + t), Promise.resolve(this.m(t)));
    }
    putString(t, e) {
      return ((t = h + t), this.v(t, e, 365), Promise.resolve(!0));
    }
    removeString(t) {
      t = h + t;
      const e = this.m(t);
      return (this._(t), Promise.resolve(e));
    }
    v(t, e, i) {
      const r = new Date();
      (r.setTime(r.getTime() + 864e5 * i),
        (document.cookie = `${encodeURIComponent(t)}=${encodeURIComponent(e)};expires=${r.toUTCString()};path=/;domain=.${this.p.current.rootDomain}`));
    }
    _(t) {
      document.cookie = `${encodeURIComponent(t)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${this.p.current.rootDomain}`;
    }
    m(t) {
      for (const e of document.cookie.split("; ")) {
        const [i, r] = e.split("=").map((t) => decodeURIComponent(t));
        if (i === t) return r || null;
      }
      return null;
    }
    j(t) {
      for (const e of document.cookie.split("; ")) {
        const [i, r] = e.split("=").map((t) => decodeURIComponent(t));
        i.startsWith(t) && this.v(i, r, 365);
      }
    }
    ready() {
      this.j(h);
    }
  }
  const d = ["x-oppuz-", "opz-"];
  class p {
    constructor(e) {
      ((this.$ = e),
        (this.O = new t("onNavigationHashData")),
        (this.P = new t("onNavigationHashEvent")),
        (this.id = "oppuz-navigation-extension"),
        (this.deps = ["navigation"]));
    }
    listenEvent(t) {
      this.P.listen(t);
    }
    listenData(t) {
      this.O.listen(t);
    }
    removeEventListener(t) {
      this.P.removeListener(t);
    }
    removeDataListener(t) {
      this.O.removeListener(t);
    }
    k(t) {
      const e = Object.assign({}, t),
        i = {};
      for (let r in t) {
        const n = r.match(/^\[(.*)\]-(.*)/);
        if (!n) continue;
        const [s, o, a] = n;
        (((i[o] || (i[o] = {}))[a] = t[r]), delete e[r]);
      }
      const r = e.event || [];
      delete e.event;
      const n = r.map((t) => [
          t,
          Object.assign(
            Object.assign(Object.assign({}, e), i[t] || {}),
            (t.startsWith("oppuz:") && i[t.substring(6)]) || {},
          ),
        ]),
        s = [];
      Object.keys(e).length > 0 && s.push(this.O.notify(e));
      for (const [t, e] of n) s.push(this.P.notify(t, e));
      if (s.length > 0) return Promise.allSettled(s).then();
    }
    L(t) {
      if (!t.hash || "#" === t.hash) return;
      let e;
      try {
        e = new URLSearchParams(t.hash.replace("#", "?"));
      } catch (t) {
        return;
      }
      let i = {};
      for (let [t, r] of e) {
        const e = d.filter((e) => t.startsWith(e));
        if (0 === e.length) continue;
        const [n] = e;
        ((t = t.substring(n.length)), (i[t] || (i[t] = [])).push(r));
      }
      return 0 !== Object.keys(i).length
        ? (this.p.mutate((t) => {
            let e;
            try {
              e = new URLSearchParams(t.hash.replace("#", "?"));
            } catch (e) {
              return t;
            }
            for (const t in i)
              for (const r of i[t]) d.forEach((i) => e.delete(i + t, r));
            return t.replace({ hash: "#" + e });
          }),
          this.k(i))
        : void 0;
    }
    onNavigation(t, e) {
      if (null !== t.updatedMatch(e, { component: "hash" })) return this.L(t);
    }
    get p() {
      return this.$.getModule("navigation");
    }
    init() {
      this.p.listen(this);
    }
  }
  class f {
    constructor(e, i) {
      ((this.$ = e),
        (this.id = "data-layer"),
        (this.t = new t("onDataLayer")),
        (this.ready = this.U(i)));
    }
    listen(t) {
      this.t.listen(t);
    }
    removeListener(t) {
      this.t.removeListener(t);
    }
    async o(...t) {
      for (const e of t.filter((t) => "object" == typeof t))
        await this.t.notify("string" == typeof e.event ? e.event : void 0, e);
    }
    U(t) {
      return () => {
        const e = this.o.bind(this),
          i = this.$.console.bind(this.$),
          r = [...t];
        try {
          ((t.push = ((...t) => {
            try {
              e(...t);
            } catch (t) {
              i("Erro ao notificar ouvintes do Oppuz:", t);
            }
            return 0;
          }).bind(t)),
            (t.length = 0),
            Object.freeze(t));
        } catch (t) {}
        return this.o(...r);
      };
    }
  }
  class g {
    constructor(t, ...e) {
      ((this.$ = t), (this.id = "data-layer"), (this.C = e));
    }
    init() {
      for (let t of this.C) t.init && t.init();
    }
    listen(t) {
      for (let e of this.C) e.listen(t);
    }
    removeListener(t) {
      for (let e of this.C) e.removeListener(t);
    }
    ready() {
      let t = [];
      for (let e of this.C)
        if (e.ready) {
          const i = e.ready();
          i instanceof Promise && t.push(i);
        }
      if (0 !== t.length) return Promise.all(t).then();
    }
  }
  const m = (t) =>
    !(!Array.isArray(t) || 0 === t.length) &&
    t.every((t) =>
      ((t) => {
        if (!Array.isArray(t) || ![3, 4].includes(t.length)) return !1;
        const [e, i, r, n] = t;
        return (
          "string" == typeof e &&
          !!e &&
          "number" == typeof i &&
          i > 0 &&
          Number.isInteger(i) &&
          "number" == typeof r &&
          r > 0 &&
          Number.isFinite(r) &&
          (null == n || ("string" == typeof n && !!n))
        );
      })(t),
    );
  class y {
    constructor(t) {
      ((this.$ = t),
        (this.id = "cart-tracking"),
        (this.deps = ["oppuz-request"]));
      this._cart = [];
    }
    onNavigation(t, e) {}
    get current() {
      return Promise.resolve(this._cart || []);
    }
    async setCurrent({ value: t, notify: e }) {
      void 0 === e && (e = !0);
      const i = this._cart || [];
      this._cart = t;
      return r(i, t) ? i : (e && t && t.length > 0 && (await this.N.cart(t)), t);
    }
    clear() {
      this._cart = [];
      return Promise.resolve([]);
    }
    add(t) {
      return this.mutate({ add: t });
    }
    remove(t) {
      return this.mutate({ remove: t });
    }
    async mutate({ add: t, remove: e, notify: i }) {
      (void 0 === i && (i = !0),
        void 0 === t && (t = []),
        void 0 === e && (e = []));
      const n = this._cart || [];
      if (null === n || 0 === n.length)
        return this.setCurrent({ value: t, notify: i });
      const s = [...n];
      for (const t of e) {
        const [e, i, r, n] = t,
          o = s.findIndex(([t, i, r, s]) => t === e && s === n);
        -1 !== o && ((s[o] = [...s[o]]), (s[o][1] -= i), (s[o][2] = r));
      }
      for (const e of t) {
        const [t, i, r, n] = e,
          o = s.findIndex(([e, i, r, s]) => e === t && s === n);
        -1 !== o
          ? ((s[o] = [...s[o]]), (s[o][1] += i), (s[o][2] = r))
          : s.push(e);
      }
      const o = s.filter((t) => t[1] <= 0);
      for (const t of o) s.splice(s.indexOf(t), 1);
      return this.setCurrent({ value: s, notify: i });
    }
    get N() {
      return this.$.getModule("oppuz-request");
    }
    init() {}
  }
  const w = ["source", "medium", "campaign", "content", "ga", "term"],
    v = (t) =>
      "object" == typeof t &&
      !Array.isArray(t) &&
      "utm" in t &&
      "object" == typeof t.utm &&
      !Array.isArray(t.utm) &&
      w.some(
        (e) => e in t.utm && "string" == typeof t.utm[e] && "" !== t.utm[e],
      ) &&
      w.every(
        (e) =>
          void 0 === t.utm[e] ||
          null === t.utm[e] ||
          "string" == typeof t.utm[e],
      );
  class _ {
    constructor(t) {
      ((this.$ = t),
        (this.deps = ["navigation", "root-domain-storage"]),
        (this.id = "source-tracking"),
        (this.I = null));
    }
    get S() {
      return this.$.getModule("root-domain-storage");
    }
    onNavigation(t, e) {
      if (((this.I = t.source), null !== this.I)) return this.R(this.I).then();
    }
    async R(t) {
      const e = await this.source;
      (null != e && s(e, t)) || this.S.put("src", t, v);
    }
    get source() {
      return this.S.get("src", v);
    }
    get p() {
      return this.$.getModule("navigation");
    }
    init() {
      this.p.listen(this);
    }
  }
  const b = (t) =>
    "object" == typeof t &&
    !Array.isArray(t) &&
    "email" in t &&
    "string" == typeof t.email &&
    t.email.includes("@");
  class j {
    constructor(t) {
      ((this.$ = t),
        (this.id = "user-tracking"),
        (this.deps = ["root-domain-storage", "navigation", "oppuz-request"]));
    }
    onNavigation(t, e) {
      this.current.then(this.D.bind(this));
    }
    get N() {
      return this.$.getModule("oppuz-request");
    }
    get S() {
      return this.$.getModule("root-domain-storage");
    }
    get current() {
      return this.S.get("user", b);
    }
    async M(t) {
      (await this.S.put("user", t, b)) && this.D(t);
      return t;
    }
    async update(t) {
      const cur = (await this.current) || {};
      // Email mudou = outra identidade: nao herda name/birthday/cellphone do usuario
      // anterior (senao trocar de conta mantem dados stale). Mesmo email -> acumula.
      const base = (t && t.email && cur.email && t.email !== cur.email) ? {} : cur;
      const e = Object.assign(Object.assign({}, base), t);
      return b(e) ? this.M(e) : null;
    }
    clear() {
      return this.M(null).then();
    }
    D(t) {
      if (null !== t)
        return this.N.userData(t.email, {
          name: t.name,
          birthday: t.birthday,
          cellphone: t.cellphone,
        });
    }
  }
  class z {
    constructor(t) {
      ((this.$ = t),
        (this.deps = ["navigation", "oppuz-request"]),
        (this.id = "basic-vw-emitter"));
    }
    init() {
      this.p.listen(this);
    }
    onNavigation(t, e) {
      return void 0 === e ||
        t.origin !== e.origin ||
        t.search !== e.search ||
        t.pathname !== e.pathname
        ? this.A(t)
        : void 0;
    }
    async A(t) {
      await this.N.vw(
        t.replace({ hash: "" }).toString(),
        window.document.title,
      );
    }
    get N() {
      return this.$.getModule("oppuz-request");
    }
    get p() {
      return this.$.getModule("navigation");
    }
  }
  const O = (t) =>
      t.map((t) =>
        t.seller_id
          ? [t.sku, t.quantity, t.price, t.seller_id]
          : [t.sku, t.quantity, t.price],
      ),
    P = (t) => (Array.isArray(t) ? t : [t]);
  class $ {
    constructor(t) {
      ((this.$ = t),
        (this.id = "oppuz-data-layer"),
        (this.deps = [
          "cart-tracking",
          "data-layer",
          "user-tracking",
          "oppuz-request",
        ]));
    }
    get N() {
      return this.$.getModule("oppuz-request");
    }
    onDataLayer(t, e) {
      switch (t) {
        case "oppuz:add_to_cart":
          return this.q(e);
        case "oppuz:remove_from_cart":
          return this.T(e);
        case "oppuz:view_cart":
          return this.F(e);
        case "oppuz:view_category":
          return this.J(e);
        case "oppuz:order_placed":
          return this.H(e);
        case "oppuz:user_data":
          return this.V(e);
        case "oppuz:view_product":
          return this.K(e);
        case "oppuz:user_logout":
          return this.B(e);
        case "oppuz:init":
        case "oppuz:install":
        case "oppuz:attach":
          return;
        default:
          (null == t ? void 0 : t.startsWith("oppuz:")) &&
            this.$.error("Unhandled oppuz event: " + t);
      }
    }
    q(t) {
      return this.G.add(O(P(t.items))).then();
    }
    T(t) {
      return this.G.remove(O(P(t.items))).then();
    }
    F(t) {
      return this.G.setCurrent({ value: O(P(t.items)) }).then();
    }
    async H(t) {
      const e = O(P(t.items));
      return (
        await this.G.setCurrent({ value: e, notify: !0 }),
        this.G.setCurrent({ value: [], notify: !1 }),
        this.N.ord(e, t.order_id)
      );
    }
    J(t) {
      const e = P(t.category_tree).map((t) => Object.assign({}, t));
      let i;
      for (const t of e) (void 0 !== i && (t.parent = i), (i = t));
      return this.N.cat(
        e.map((t) =>
          t.parent
            ? [t.id, t.name, t.parent.id, t.parent.name]
            : [t.id, t.name],
        ),
      );
    }
    V(t) {
      const e = {};
      return (
        "string" == typeof t.user.email &&
          t.user.email &&
          (e.email = t.user.email),
        "string" == typeof t.user.name && t.user.name && (e.name = t.user.name),
        "string" == typeof t.user.cellphone &&
          t.user.cellphone &&
          t.user.cellphone.replace(/^\d/g, "") &&
          (e.cellphone = t.user.cellphone.replace(/^\d/g, "")),
        "string" == typeof t.user.birthday &&
          t.user.birthday &&
          (e.birthday = t.user.birthday),
        this.Y.update(e).then()
      );
    }
    B(t) {
      return this.Y.clear();
    }
    K(t) {
      const e = P(t.product.skus).map((e) => {
        var i;
        return {
          id: e.sku,
          parent_id: t.product.id,
          name: e.name,
          available: e.available,
          img: e.img,
          price: e.price,
          url: e.url,
          category_name: e.category.name,
          brand: t.product.id,
          list_price: e.list_price,
          installments: e.installments,
          installment_value: e.installment_value,
          category_id: e.category.id,
          parent_category_id:
            null === (i = e.parent_category) || void 0 === i ? void 0 : i.id,
          raw_metadata: e.description,
        };
      });
      return Promise.all([
        this.N.prd(t.product.skus[0].sku),
        ...e.map((t) => this.N.prdInfo(t)),
      ]).then();
    }
    init() {
      this.W.listen(this);
    }
    get W() {
      return this.$.getModule("data-layer");
    }
    get G() {
      return this.$.getModule("cart-tracking");
    }
    get Y() {
      return this.$.getModule("user-tracking");
    }
  }
  class k {
    constructor(t) {
      ((this.$ = t),
        (this.X = {}),
        (this.Z = {}),
        (this.deps = "dynamic"),
        (this.id = "dynamic-module-registry"));
    }
    onDataLayer(t, e) {
      "oppuz:attach" == t && this.tt(e);
    }
    tt(t) {
      const e = t.module;
      if (!e || "object" != typeof e) return;
      if (!e.moduleKey) return;
      const i = this.Z[e.moduleKey];
      i &&
        (delete this.Z[e.moduleKey],
        (e.id && e.id !== i) || ((e.id = i), this.et(e)));
    }
    et(t) {
      delete t.moduleKey;
      const e = this.X[t.id];
      return this.$.dynamicLoad(t, e.settings).then(
        (t) => {
          ((e.state = { state: "loaded", module: t }), e.resolve(t));
        },
        (t) => {
          ((e.state = { state: "rejected", error: t }), e.reject(t));
        },
      );
    }
    get i() {
      return this.$.getModule("data-layer");
    }
    init() {
      this.i.listen(this);
    }
    it() {
      let t = this.$.config.startupId;
      for (let e = 0; e < 24; e++)
        t += "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(
          Math.floor(26 * Math.random()),
        );
      return t;
    }
    async install(t) {
      if (this.$.hasModule(t.id))
        return Promise.resolve(this.$.getModule(t.id));
      if (t.id in this.X) {
        const e = this.X[t.id];
        switch (e.state.state) {
          case "pending":
            return new Promise((t, i) => {
              const r = e.reject,
                n = e.resolve;
              ((e.reject = (t) => {
                (r(t), i(t));
              }),
                (e.resolve = (e) => {
                  (n(e), t(e));
                }));
            });
          case "loaded":
            return Promise.resolve(e.state.module);
          case "rejected":
            return Promise.reject(e.state.error);
        }
      }
      const e = this.it();
      this.Z[e] = t.id;
      const i = new Promise((e, i) => {
          this.X[t.id] = {
            state: { state: "pending" },
            settings: Object.assign({}, t.settings),
            reject: i,
            resolve: e,
          };
        }),
        r = this.X[t.id],
        n = new URL(t.url),
        s = "#moduleKey=" + encodeURIComponent(e),
        nsp = new URLSearchParams(n.search.slice(1)), _ = nsp.delete('bust'),
        cs = nsp.toString() ? '?' + nsp.toString() : '',
        o = `${n.origin}${n.pathname}${cs}${bustSeg(cs)}${s}`,
        a = document.createElement("script");
      return (
        (a.src = o),
        (a.type = "text/javascript"),
        (a.async = !0),
        (a.onerror = (t) => {
          ((r.state = { state: "rejected", error: t }),
            r.reject(t),
            a.remove());
        }),
        document.head.appendChild(a),
        i
      );
    }
  }
  class L {
    constructor(t) {
      ((this.$ = t),
        (this.id = "showcase-installer"),
        (this.deps = ["data-layer", "dynamic-module-registry"]));
    }
    onDataLayer(t, e) {
      if ("oppuz:install" === t) return this.rt(e);
    }
    rt(t) {
      const e = t.id.match(/showcase.v([0-9]+)/);
      if (e)
        return this.nt
          .install({
            id: "showcase.v" + e[1],
            settings: t.settings || {},
            url: this.st(e[1]),
          })
          .then(
            (e) => {
              var i;
              return null === (i = t.resolve) || void 0 === i
                ? void 0
                : i.call(t, e);
            },
            (e) => {
              var i;
              return null === (i = t.reject) || void 0 === i
                ? void 0
                : i.call(t, e);
            },
          );
    }
    st(t) {
      const e = new URL(this.$.config.selfUrl),
        i = ((t) => {
          for (; t.endsWith("/"); ) t = t.slice(0, t.length - 1);
          return t;
        })(e.pathname),
        r = i.endsWith("bundle.js") ? ".bundle.js" : ".js",
        n = `${((t) => {
          if ((t.startsWith("/") || (t = "/" + t), "/" == t)) return "/";
          const e = t.lastIndexOf("/");
          return e == t.length ? e : t.slice(0, e + 1);
        })(i)}${this.ot(t, r)}`;
      return `${e.origin}${n}${e.search}`;
    }
    ot(t, e) {
      return encodeURIComponent(`module.showcase.v${t}${e}`);
    }
    get i() {
      return this.$.getModule("data-layer");
    }
    get nt() {
      return this.$.getModule("dynamic-module-registry");
    }
    init() {
      this.i.listen(this);
    }
  }
  function U(t) {
    return new Promise((e) => setTimeout(() => e(), t));
  }
  const C = (t) =>
      t && 1 === (t = t.filter((t) => !!t)).length && t[0] ? t[0] : null,
    S = ["email", "name", "birthday", "cellphone"];
  class D {
    constructor(t) {
      ((this.$ = t),
        (this.id = "oppuz-navigation-extension-consumer"),
        (this.deps = ["oppuz-navigation-extension", "user-tracking"]));
    }
    onNavigationHashEvent(t, e) {
      switch (t) {
        case "oppuz:user_data":
        case "user_data":
          return this.V(e);
      }
    }
    V(t) {
      const e = {};
      for (const i of S) {
        const r = C(t[i]);
        r && (e[i] = r);
      }
      0 !== Object.keys(e).length && this.Y.update(e);
    }
    ct(t) {
      C(t);
    }
    onNavigationHashData(t) {
      let e = [];
      if (
        ("etag" in t && e.push(U().then(() => this.ct(t.etag))),
        (e = e.filter((t) => t instanceof Promise)),
        0 !== e.length)
      )
        return Promise.allSettled(e).then();
    }
    get ut() {
      return this.$.getModule("oppuz-navigation-extension");
    }
    get Y() {
      return this.$.getModule("user-tracking");
    }
    init() {
      (this.ut.listenEvent(this), this.ut.listenData(this));
    }
  }
  class N {
    constructor(t) {
      ((this.$ = t),
        (this.id = "enterprise-installer"),
        (this.deps = ["data-layer", "dynamic-module-registry"]));
    }
    et() {
      this.nt
        .install({
          id: `enterprise.${this.$.config.application}.${this.$.config.enterprise}`,
          url: this.st,
          settings: {},
        })
        .then(() => {});
    }
    ready() {
      this.et();
    }
    get nt() {
      return this.$.getModule("dynamic-module-registry");
    }
    get st() {
      const t = new URL(this.$.config.selfUrl),
        e = this.$.config.application,
        i = this.$.config.enterprise,
        r = ((t) => {
          for (; t.endsWith("/"); ) t = t.slice(0, t.length - 1);
          return t;
        })(t.pathname),
        n = r.endsWith("bundle.js") ? ".bundle.js" : ".js",
        s = `${((t) => {
          if ((t.startsWith("/") || (t = "/" + t), "/" == t)) return "/";
          const e = t.lastIndexOf("/");
          return e == t.length ? e : t.slice(0, e + 1);
        })(r)}${this.ot(e, i, n)}`;
      const sp = new URLSearchParams(t.search.slice(1)); sp.delete('bust');
      const cs = sp.toString() ? '?' + sp.toString() : '';
      return `${t.origin}${s}${cs}${bustSeg(cs)}`;
    }
    ot(t, e, i) {
      return encodeURIComponent(`enterprise.${t}${e ? "." + e : ""}${i}`);
    }
  }
  const x = (t) => "string" == typeof t && /^[a-fA-F0-9]{24}$/.test(t),
    I = (t) => {
      if (Array.isArray(t)) {
        const e = {};
        return (
          t.forEach((t, i) => {
            e[i.toString()] = I(t);
          }),
          e
        );
      }
      return null != (e = t) && e.toString() === "" + {}
        ? (Object.keys(t).forEach((e) => {
            t[e] = I(t[e]);
          }),
          t)
        : null == t
          ? t
          : t.toString();
      var e;
    };
  class R {
    constructor(t) {
      ((this.$ = t),
        (this.id = "oppuz-request"),
        (this.deps = [
          "domain-storage",
          "root-domain-storage",
          "source-tracking",
        ]),
        (this.ht = []));
    }
    lt() {
      const t = this.ht;
      if (((this.ht = void 0), t && 0 !== t.length))
        return Promise.allSettled(
          t.map(([t, e, i]) => this.dt(...t).then(e, i)),
        ).then();
    }
    get ft() {
      return this.$.getModule("domain-storage");
    }
    get gt() {
      return this.$.getModule("root-domain-storage");
    }
    get yt() {
      return this.$.getModule("source-tracking");
    }
    get userId() {
      const t = this.wt();
      return "string" == typeof t
        ? t
        : t.then((t) => {
            if (t) return t;
            throw Error("UserId not available");
          });
    }
    async vt() {
      var t = (await this.ft.get("session", x)) || (await this.gt.get("session", x));
      if (typeof t === 'string') { while (t.startsWith('"') && t.endsWith('"')) t = t.slice(1, -1); }
      return t || null;
    }
    async _t(t) {
      return (
        (await this.ft.put("session", t, x)) &&
        (await this.gt.put("session", t, x))
      );
    }
    async bt() {
      const t = await this.jt("https://www.oppuz.com/user_info.json", {
        method: "GET",
        cache: "no-cache",
        mode: "cors",
        credentials: "include",
        maxRetryCount: 5,
      });
      var e = (await t.json()).user_id;
      if (typeof e === 'string') { while (e.startsWith('"') && e.endsWith('"')) e = e.slice(1, -1); }
      return e;
    }
    async wt() {
      var t = await this.vt();
      if (t) return t;
      // Compartilhar uma unica promise de bt() entre chamadas paralelas
      if (!this._btPending) {
        this._btPending = this.bt().then(async (t) => {
          this._btPending = null;
          return (await this._t(t)) ? t : null;
        }).catch((e) => {
          this._btPending = null;
          return null;
        });
      }
      return this._btPending;
    }
    prdInfo(t) {
      return this.dt("prd_info", t, { extra: { filter: "json" } });
    }
    async prd(t) {
      const e = await this.yt.source;
      return this.dt("prd", t, { src: null === e ? void 0 : e });
    }
    async cat(t) {
      const e = await this.yt.source;
      return this.dt("cat", t, { src: null === e ? void 0 : e });
    }
    async vw(t, e) {
      const i = await this.yt.source;
      return this.dt("vw", t, {
        src: null === i ? void 0 : i,
        extra: { page_name: e },
      });
    }
    async ord(t, e) {
      const i = await this.yt.source;
      return this.dt("ord", t, {
        extra: { order_id: e },
        src: null === i ? void 0 : i,
      });
    }
    async cart(t) {
      const e = await this.yt.source;
      return this.dt("cart", t, { src: null === e ? void 0 : e });
    }
    userData(t, { name: e, birthday: i, cellphone: r } = {}) {
      return this.dt(
        "user_data",
        { name: e, email: t, birthday: i, cellphone: r },
        { extra: { filter: "hash" } },
      );
    }
    srcTrk(t) {
      return this.dt("src_trk", void 0, { src: t });
    }
    log(t) {
      return this.dt("log", t, {});
    }
    async dt(t, e, i) {
      if (void 0 !== this.ht)
        return await new Promise((r, n) => this.ht.push([[t, e, i], r, n]));
      let r,
        n = Object.assign(
          { action: t, info: "prd_info" === t ? JSON.stringify(e) : e },
          i,
        );
      if (((n = I(n)), !(r = await this.wt())))
        return void this.$.error("Could not get session id. Skipping request");
      if (typeof r === 'string') { while (r.startsWith('"') && r.endsWith('"')) r = r.slice(1, -1); }
      const s = { track: n, tid: this.$.config.txnId, user_id: r };
      await this.jt(
        "https://www.oppuz.com/track/" + this.$.config.application + "?a=" + t,
        {
          method: "POST",
          body: JSON.stringify(s),
          credentials: "include",
          cache: "no-cache",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
        },
      );
    }
    async ready() {
      var self = this;
      // Garantir que a fila esvazia em no maximo 3s, mesmo se wt() demorar
      var flushTimer = setTimeout(function() { self.lt(); }, 3000);
      try {
        await this.wt();
      } catch (t) {}
      clearTimeout(flushTimer);
      return this.lt();
    }
    async jt(t, e = {}) {
      const i = AbortSignal.timeout(5e3),
        r = Object.assign(Object.assign({}, e), { signal: i }),
        n = e.checkSuccessful,
        s = e.maxRetryCount,
        o = e.retryNumber || 0,
        a = 1e3 * Math.pow(2, o);
      try {
        const i = await fetch(t, r);
        if (!(n ? n(i) : i.ok)) {
          if (void 0 !== s && o >= s) throw Error("Max retries exhausted");
          return (
            await U(a),
            await this.jt(
              t,
              Object.assign(Object.assign({}, e), { retryNumber: o + 1 }),
            )
          );
        }
        return i;
      } catch (i) {
        if (void 0 !== s && o >= s)
          throw (this.$.error("Max retries expired, failing"), i);
        return (
          null == i || i.name,
          await U(a),
          await this.jt(
            t,
            Object.assign(Object.assign({}, e), { retryNumber: o + 1 }),
          )
        );
      }
    }
    provideFor(t) {
      return this;
    }
  }
  class M {
    constructor(t) {
      ((this.$ = t), (this.zt = {}));
    }
    get config() {
      return this.$.config;
    }
    dynamicLoad(t, e) {
      return this.$.dynamicLoad(t, e).then(
        (t) => t,
        (t) => {
          throw t;
        },
      );
    }
    console(...t) {}
    error(...t) {
      this.$.taggedError(this.modId, ...t);
    }
    debug(...t) {}
    getModule(t) {
      if (this.zt[t]) return this.zt[t];
      if ("dynamic" !== this.modDeps && -1 === this.modDeps.indexOf(t))
        throw Error(`Dependency on ${t} not declared!`);
      let e = this.$.getModule(t);
      return (e.provideFor && (e = e.provideFor(this.modId)), (this.zt[t] = e));
    }
    hasModule(t) {
      if (this.zt[t]) return !0;
      if ("dynamic" !== this.modDeps && -1 === this.modDeps.indexOf(t))
        throw Error(`Dependency on ${t} not declared!`);
      return this.$.hasModule(t);
    }
  }
  class E {
    get Ot() {
      return this.Pt.application;
    }
    get config() {
      return this.Pt;
    }
    constructor(t) {
      var e;
      ((this.$t = Symbol()),
        (this.kt = Symbol()),
        (this.X = {}),
        (this.Lt = "uninitialized"));
      const i = Math.random(),
        r =
          (null === (e = document.currentScript) || void 0 === e
            ? void 0
            : e.src) || "";
      let n = t.application || "";
      const s = ("" + i).replace(/[^0-9]*/g, "");
      (n || (console.error("Expected application on config!"), (n = "")),
        (this.Pt = Object.assign(Object.assign({}, t), {
          application: n,
          txnId: i,
          selfUrl: r,
          startupId: s,
        })));
    }
    addModule(t, ...e) {
      if ("function" != typeof t) {
        const e = t;
        return ((this.X[e.id] = e), this);
      }
      return this.addModule(this.constructModule(t, ...e));
    }
    addFactory(t) {
      const e = new M(this),
        i = t(e);
      return ((e.modDeps = i.deps || []), (e.modId = i.id), this.addModule(i));
    }
    upsertModule(t, e) {
      const i = this.X[t] || void 0;
      return (delete this.X[t], this.addFactory((t) => e(t, i)));
    }
    constructModule(t, ...e) {
      const i = new M(this),
        r = new t(i, ...e);
      return ((i.modDeps = r.deps || []), (i.modId = r.id), r);
    }
    console(...t) {}
    debug(...t) {}
    error(...t) {
      console.error(`Oppuz [${this.Ot}]`, ...t);
    }
    taggedConsole(t, ...e) {}
    taggedDebug(t, ...e) {}
    taggedError(t, ...e) {
      this.error(`{${t}}`, ...e);
    }
    getModule(t) {
      if (!(t in this.X)) throw Error("Module not present");
      return this.X[t];
    }
    hasModule(t) {
      return t in this.X;
    }
    Ut(t, e) {
      return this.constructModule(t, e);
    }
    Ct(t, e) {
      const i = new M(this);
      ((t.$ = i), (t.settings = e));
      const r = t;
      return ((i.modId = r.id), (i.modDeps = r.deps || []), r);
    }
    dynamicLoad(t, e) {
      const i = ((t) => "constr" in t && "function" == typeof t.constr)(t)
          ? this.Ut(t.constr, e)
          : this.Ct(t, e),
        r = i.id;
      return (
        (this.X[r] = i),
        new Promise(async (t, e) => {
          var r, n, s, o;
          try {
            null === (r = i.init) || void 0 === r || r.call(i);
            const e = [
              null === (n = i.ready) || void 0 === n ? void 0 : n.call(i),
              null === (o = (s = i).module) || void 0 === o
                ? void 0
                : o.call(s),
            ].filter((t) => t instanceof Promise);
            (0 != e.length && (await Promise.all(e)), t(i));
          } catch (t) {
            e(t);
          }
        })
      );
    }
    St() {
      if ("uninitialized" !== this.Lt) throw Error();
      for (const t of Object.values(this.X))
        void 0 !== t.init &&
          t.init() instanceof Promise &&
          this.taggedError(t.id, "INVALID ASYNC INIT");
      this.Lt = "initialized";
    }
    async Dt() {
      (await Promise.allSettled(
        Object.values(this.X).map((t) => {
          if (void 0 === t.ready) return Promise.resolve();
          try {
            const e = t.ready();
            return e instanceof Promise
              ? e.then(
                  () => {},
                  () => {},
                )
              : Promise.resolve();
          } catch (t) {
            return Promise.reject(t);
          }
        }),
      ),
        (this.Lt = "ready"));
    }
    Nt(t) {}
    postBuild() {
      (this.St(), this.Dt().then(() => {}));
    }
  }
  const A = (t) => {
    (window.oppuz && window.oppuz.impl) ||
      ((t) => {
        const i = (window._oppuzTemp && [...window._oppuzTemp]) || [];
        delete window._oppuzTemp;
        ((t, e) => {
          const i = new E(t);
          (e(i), i.postBuild());
        })(t, (r) => {
          (!0 !== t.disableDataLayer &&
            "true" !== t.disableDataLayer &&
            r.addModule(e),
            r
              .upsertModule("data-layer", (t, e) =>
                e
                  ? r.constructModule(g, e, r.constructModule(f, i))
                  : r.constructModule(f, i),
              )
              .addModule(a)
              .addModule(y)
              .addModule(_)
              .addModule(j)
              .addModule(z)
              .addModule($)
              .addModule(k)
              .addModule(L)
              .addModule(p)
              .addModule(u)
              .addModule(l)
              .addModule(D),
            r.addModule(R),
            "string" == typeof t.enterprise && t.enterprise && r.addModule(N));
        });
        const r = {
          impl: !0,
          track: (t) => i.push(Object.assign({}, t)),
          init: (t) => i.push(Object.assign({ event: "oppuz:init" }, t)),
          install: (t) => i.push(Object.assign({ event: "oppuz:install" }, t)),
          attach: (t) => i.push({ event: "oppuz:attach", module: t }),
        };
        Object.freeze(r);
        try {
          (delete window.oppuz,
            Object.defineProperty(window, "oppuz", {
              configurable: !1,
              value: r,
              writable: !1,
              enumerable: !1,
            }));
        } catch (t) {}
      })(t);
  };
  ((() => {
    var t;
    try {
      const e =
        null === (t = document.currentScript) || void 0 === t ? void 0 : t.src;
      if (!e || !URL.canParse(e)) return !1;
      const i = URL.parse(e);
      if (!i.hash || "#" == i.hash) return !1;
      const r = Object.fromEntries(
        new URLSearchParams(i.hash.replace("#", "?")),
      );
      return !!r.application && (A(r), !0);
    } catch (t) {
      return !1;
    }
  })() ||
    (() => {
      const t = window._oppuzTemp || [],
        e = (t) => {
          if (
            "object" != typeof t ||
            !t.application ||
            "string" != typeof t.application
          )
            return !1;
          const e = Object.assign({}, t);
          return (delete e.event, A(e), !0);
        },
        i = (t) => {
          for (let i of t) {
            if (r) break;
            i && i.event && "oppuz:init" === i.event && i && e(i) && (r = !0);
          }
        };
      let r = !1;
      if ((i(t), r)) return;
      const n = t.push;
      t.push = (...e) => {
        try {
          i(e);
        } catch (t) {}
        return n.call(t, ...e);
      };
    })(),
    (this.Oppuz = {}));
})();
