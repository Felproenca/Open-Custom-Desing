
////////////////////////////////////////
// MARIAFILO /////////////////////////
// Last Modified (BRT): 01-07-2026 16:32h
/////////////////////////////////////


oppuz.attach({
    ...Object.fromEntries(new URLSearchParams(URL.parse(document.currentScript.src).hash.replace("#", '?'))),
    deps: ["navigation", "dynamic-module-registry"],

    get _navigation() { return this.$.getModule("navigation") },
    get _dynamicModuleRegistry() { return this.$.getModule("dynamic-module-registry") },

    // =============================================
    // ===== CONFIG (ESPECIFICO DA LOJA) ==========
    // =============================================

    config: {
        storeName: "mariafilo",
        hijackUrl: "https://storage.googleapis.com/oppuz/module.ajax-hijack.v1.js",
        events: {
            add_to_cart:      "custom_add_to_cart",
            view_cart:        "custom_view_cart",
            remove_from_cart: "custom_remove_from_cart",
            order_placed:     "orderPlaced",
            order_placed_alt: "order_placed",
            purchase:         "purchase",
            view_item:        "custom_view_item"
        },
        selectors: {
            loginCodeEmail:  '.vtex-login-2-x-inputContainerEmail input, input[placeholder="Digite seu email"], input[placeholder="E-mail"]',
            loginCodeBtn:    '.vtex-login-2-x-sendButton button',
            loginPassEmail:  '.vtex-login-2-x-emailAndPasswordForm input[type="text"], input[placeholder="Digite seu email"], input[placeholder="E-mail"]',
            loginPassBtn:    '.vtex-login-2-x-sendButton button',
            loginOptCode:    '.vtex-login-2-x-accessCodeOptionBtn button',
            loginOptPass:    '.vtex-login-2-x-emailPasswordOptionBtn button',
            newsletterForm:  'form._form-wrapper_vffd3_39',
            newsletterEmail: 'input[name="email"]',
            newsletterName:  'input[placeholder="Nome"]',
            newsletterBtn:   'button[type="submit"]',
            pdpSizes:        'div.PDP_sizes div',
            breadcrumb:      'ul.styles-module_bread-crumb-list__Me1a-'
        }
    },

    getSkus() {
        var evt = dataLayer.filter(function(item) { return item.region === 'PDP'; }).pop();
        if (!evt || !evt.skuStocks) return [];
        var skuObj = evt.skuStocks;
        return Object.keys(skuObj).map(function(key) {
            return { sku: Number(key), available: skuObj[key] > 0 };
        });
    },

    getProductImage(evento) {
        var items = (evento.ecommerce && evento.ecommerce.items) || evento.items;
        if (!items || !items[0]) return null;
        return items[0].item_image || null;
    },

    getProductUrl(evento) {
        var items = (evento.ecommerce && evento.ecommerce.items) || evento.items;
        if (!items || !items[0]) return window.location.href;
        return items[0].item_url || window.location.href;
    },

    getCategoryForProduct(evento) {
        var items = (evento.ecommerce && evento.ecommerce.items) || evento.items;
        if (!items || !items[0]) return [];
        var it = items[0];
        return [it.item_category, it.item_category2];
    },

    buildViewItemFromDOM() {
        var meta = document.querySelector('meta[property="og:title"]');
        if (!meta) return null;
        var name = meta.getAttribute('content');
        var pidEl = document.querySelector('[data-product-id]');
        var pid = pidEl ? pidEl.getAttribute('data-product-id') : null;
        var priceEl = document.querySelector('[class*="defaultPrice"]');
        var price = 0;
        if (priceEl) {
            var txt = priceEl.textContent.replace(/[R$\s.]/g, '').replace(',', '.');
            price = parseFloat(txt) || 0;
        }
        var cats = this.getCategoryForNav();
        return {
            event: "view_item",
            ecommerce: {
                items: [{
                    item_id: pid,
                    item_sku: pid,
                    item_name: name,
                    item_brand: "Maria Filó",
                    item_category: cats[0] || null,
                    item_category2: cats[1] || null,
                    item_url: window.location.href,
                    item_image: null,
                    price: price,
                    quantity: 1
                }]
            }
        };
    },

    getCategoryForNav() {
        var nav = document.querySelector(this.config.selectors.breadcrumb);
        if (!nav) return [];
        var sbr = [];
        var wrd = nav.childNodes;
        for (var x = 0; x < wrd.length; x++) {
            sbr.push(wrd[x].textContent.toLowerCase());
        }
        sbr.shift(); // remove "Home"
        return sbr;
    },

    _fetchPlatformEmail(callback) {
        // Ordem: mais fresco primeiro

        // 1. Deco.cx STOREFRONT.USER (sessao atual, sem request)
        try {
            if (window.STOREFRONT && window.STOREFRONT.USER) {
                var user = window.STOREFRONT.USER.getUser();
                if (user && user.email) return callback(user.email);
            }
        } catch(e) {}

        var ditoCookie = document.cookie.split('; ').find(function(c) { return c.startsWith('__dito_user_session'); });

        // 2. VTEX Sessions API (funciona mesmo sem orderForm)
        try {
            fetch('/api/sessions?items=profile.email,profile.firstName,profile.isAuthenticated', {
                credentials: 'include'
            }).then(function(r) { return r.json(); })
              .then(function(data) {
                var profile = data && data.namespaces && data.namespaces.profile;
                if (profile && profile.email && profile.email.value) {
                    return callback(profile.email.value);
                }
                // 3. VTEX OrderForm API
                return fetch('/api/checkout/pub/orderForm', {
                    method: 'POST', body: '{}',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include'
                }).then(function(r) { return r.text(); })
                  .then(function(t) {
                    if (t && t.startsWith('{')) {
                        var d = JSON.parse(t);
                        var em = d && d.clientProfileData && d.clientProfileData.email;
                        if (em) return callback(em);
                    }
                    // 4. Cookie Dito CRM (pode ser stale, ultima opcao)
                    try {
                        if (ditoCookie) {
                            var ditoData = JSON.parse(decodeURIComponent(ditoCookie.split('=').slice(1).join('=')));
                            if (ditoData && ditoData.email && ditoData.email.includes('@')) return callback(ditoData.email);
                        }
                    } catch(e) {}
                    callback(null);
                });
            }).catch(function() {
                try {
                    if (ditoCookie) {
                        var ditoData = JSON.parse(decodeURIComponent(ditoCookie.split('=').slice(1).join('=')));
                        if (ditoData && ditoData.email && ditoData.email.includes('@')) return callback(ditoData.email);
                    }
                } catch(e) {}
                callback(null);
            });
        } catch(e) { callback(null); }
    },

    loginCode() {
        this.$.debug("Oppp::loginCode is On --> Started");
        var self = this;
        setTimeout(function() {
            var em = document.querySelector(self.config.selectors.loginCodeEmail);
            var bt = document.querySelector(self.config.selectors.loginCodeBtn);
            if (!em || !bt) return;
            self._captureFromForm(em, bt, null, null);
        }, 500);
    },

    loginPassword() {
        this.$.debug("Oppp::loginPassword is On --> Started");
        var self = this;
        setTimeout(function() {
            var em = document.querySelector(self.config.selectors.loginPassEmail);
            var bt = document.querySelector(self.config.selectors.loginPassBtn);
            if (!em || !bt) return;
            self._captureFromForm(em, bt, null, null);
        }, 600);
    },

    loginNewsletter() {
        var fm = document.querySelector(this.config.selectors.newsletterForm);
        if (!fm) return;
        var em = fm.querySelector(this.config.selectors.newsletterEmail);
        var bt = fm.querySelector(this.config.selectors.newsletterBtn);
        var fn = fm.querySelector(this.config.selectors.newsletterName);
        this._captureFromForm(em, bt, fn, null);
    },

    loginMainBar() {},

    viewProductSizeBtn() {
        var self = this;
        setTimeout(function() {
            var container = document.querySelector(self.config.selectors.pdpSizes);
            if (!container) return;
            var tam = container.childNodes;
            var skuPdp = self.getSkus();
            for (var i = 0; i < tam.length; i++) {
                (function(idx) {
                    tam[idx].addEventListener('click', function() {
                        setTimeout(function() {
                            self.oppuzViewProductSku(skuPdp[idx]);
                        }, 1000);
                    });
                })(i);
            }
        }, 500);
    },

    onNavigation(location, oldLocation) {

        this.$.debug("NAVV",location)
        this._lastUserDataFingerprint = null;
        this._passiveCartFiredThisPage = false;

        // Captura passiva do carrinho a cada navegacao
        setTimeout(() => { this._tryPassiveCartCapture(); }, 2500);

        // Listener no botao do carrinho — captura quando usuario abre (custom_view_cart dispara entao)
        var self = this;
        setTimeout(function() {
            var cartBtn = document.querySelector('#cart-button');
            if (cartBtn && !cartBtn._oppuzCartListener) {
                cartBtn._oppuzCartListener = true;
                cartBtn.addEventListener('click', function() {
                    self._passiveCartFiredThisPage = false;
                    setTimeout(function() { self._tryPassiveCartCapture(); }, 1500);
                });
                self.$.debug("Oppp::cart button listener installed (#cart-button)");
            }
        }, 1000);


        // Newsletter — presente em todas as páginas
        setTimeout(() => { this.loginNewsletter(); }, 2000);

        // Re-check captura passiva de email em navegacao SPA (se ainda anonimo)
        if (!this._lastEmittedEmail) {
            setTimeout(() => { this._tryPassiveEmailCapture('navigation'); }, 1500);
        }

        // página Principal
        if (location.pathname === "/") {
          this.$.debug("Oppp:: MAIN_PAGE");
        }
        // página Login
        if (location.pathname === "/api/io/login" || location.pathname === "/login") {

            setTimeout(() => {
                  const bte = document.querySelector(this.config.selectors.loginOptCode);
                  const btp = document.querySelector(this.config.selectors.loginOptPass);

                  if (bte) {bte.addEventListener('click', () => {this.loginCode()} );}
                  if (btp) {btp.addEventListener('click', () => {this.loginPassword()});}
                  this.$.debug("Oppp::USER_DATA > login");
            }, 1500);

        }

        // Página de Categoria
        if (location.href.includes("/off/") || location.href.includes("/loja/")) {
            var self = this;
            var fired = false;
            var tryCat = function() {
                if (fired) return;
                var nav = document.querySelector(self.config.selectors.breadcrumb);
                if (nav && nav.childNodes.length > 0) {
                    fired = true;
                    self.$.debug("Oppp::CategoryView is On --> Started");
                    oppuz.track({ event: 'oppuz:view_category', category_tree: self.buildCategoryTree(self.getCategoryForNav()) });
                }
            };
            setTimeout(tryCat, 2000);
            setTimeout(tryCat, 5000);
            setTimeout(tryCat, 10000);
        }

        // página produto
        if (location.pathname.endsWith("/p")) {
            setTimeout(() => {
                this.viewProductSizeBtn();
                var evt = this.getEvent(this.config.events.view_item);
                if (!evt) evt = this.buildViewItemFromDOM();
                if (evt) this.oppuzViewProduct(evt);
            }, 600);

        }

        // página e-mail pré-checkout
        if (location.hash === "#/email") {

            this.$.debug("Oppp::USER_DATA > #/email");
            setTimeout(() => {

                 let em  = document.getElementById('client-pre-email');
                 let bt  = document.getElementById('btn-client-pre-email');
                 if (!em || !bt) return;

                 this._captureFromForm(em, bt, null, null);

            }, 600);
        }

        // página Profile
        if (location.hash === "#/profile") {

            this.$.debug("Oppp::USER_DATA > #/profile");
            setTimeout(() => {

                 let em  = document.querySelector('input#client-email') || document.getElementById('client-pre-email');
                 let bt  = document.querySelector('button#go-to-shipping');
                 if (!em || !bt) return;
                 let fn  = document.querySelector('input#client-first-name');
                 let ln  = document.querySelector('input#client-last-name');
                 let ph  = document.querySelector('input#client-phone');
                 let bd  = document.querySelector('input#client-birthday');

                 this._captureFromForm(em, bt, fn, ln, { phone: ph, birthday: bd });

                 // Se email já preenchido (usuário logado), emite direto
                 if (em.value && em.value.includes('@')) {
                     var name = [fn ? fn.value : null, ln ? ln.value : null].filter(Boolean).join(' ');
                     this._emitUserData(em.value, { name: name || null, cellphone: ph ? ph.value : null, birthday: bd ? bd.value : null }, 'profile');
                 }

            }, 800);
        }

        // página Shippping
        if (location.hash === "#/shipping") {

            setTimeout(() => {
                 this.$.debug("Oppp::USER_DATA > #/shipping");

                 let em  = document.querySelector('input#client-email') || document.getElementById('client-pre-email');
                 let fn  = document.querySelector('input#client-first-name');
                 let ln  = document.querySelector('input#client-last-name');
                 let ph  = document.querySelector('input#client-phone');
                 let bd  = document.querySelector('input#client-birthday');

                 if (em && em.value && em.value.includes('@')) {
                     var name = [fn ? fn.value : null, ln ? ln.value : null].filter(Boolean).join(' '); this._emitUserData(em.value, { name: name || null, cellphone: ph ? ph.value : null, birthday: bd ? bd.value : null }, 'shipping');
                 }

            }, 2500);
        }

        //Página de pagamento
        if (location.hash === "#/payment" ) {

            setTimeout(() => {
                this.$.debug("Oppp::USER_DATA > #/payment -> Started");
                let em  = document.querySelector('input#client-email') || document.getElementById('client-pre-email');
                let fn  = document.querySelector('input#client-first-name');
                let ln  = document.querySelector('input#client-last-name');
                let ph  = document.querySelector('input#client-phone');
                let bd  = document.querySelector('input#client-birthday');

                if (em && em.value && em.value.includes('@')) {
                    var name = [fn ? fn.value : null, ln ? ln.value : null].filter(Boolean).join(' '); this._emitUserData(em.value, { name: name || null, cellphone: ph ? ph.value : null, birthday: bd ? bd.value : null }, 'payment');
                }

            }, 2500);
        }

        // Página profile/edit (VTEX account)
        if ((location.pathname === "/_secure/account" || location.pathname === "/api/io/account") && (location.hash === "#/profile/edit" || location.hash.startsWith("#/profile?success"))) {
            this.$.debug("Oppp::USER_DATA > #/profile/edit");
            var self = this;
            setTimeout(() => {
                self._waitForElement('input[name="email"]', function(em) {
                    var saveBtn = document.querySelector('form[class*="profileContainer"] button[type="submit"]');
                    if (!saveBtn || saveBtn._oppuzListener) return;
                    saveBtn.addEventListener('click', function() {
                        var fn = document.querySelector('input[name="firstName"]');
                        var ln = document.querySelector('input[name="lastName"]');
                        var bd = document.querySelector('input[name="birthDate"]');
                        var ph = document.querySelector('input[name="homePhone"]');
                        var name = [fn ? fn.value : null, ln ? ln.value : null].filter(Boolean).join(' ');
                        self._emitUserData(em.value, {
                            name: name || null,
                            birthday: bd ? bd.value : null,
                            cellphone: ph ? ph.value : null
                        }, 'profile/edit');
                    });
                    saveBtn._oppuzListener = true;

                    // Se email já preenchido, emite direto
                    if (em.value && em.value.includes('@')) {
                        var fn = document.querySelector('input[name="firstName"]');
                        var ln = document.querySelector('input[name="lastName"]');
                        var bd = document.querySelector('input[name="birthDate"]');
                        var ph = document.querySelector('input[name="homePhone"]');
                        var name = [fn ? fn.value : null, ln ? ln.value : null].filter(Boolean).join(' ');
                        self._emitUserData(em.value, {
                            name: name || null,
                            birthday: bd ? bd.value : null,
                            cellphone: ph ? ph.value : null
                        }, 'profile/edit:load');
                    }
                }, 5000);
            }, 1000);
        }

        if (location.search.startsWith("?p")) {
            // pagina de produto vtex
        }

         if (oldLocation && oldLocation.pathname != "/cat" && location.pathname === "cat") {
            //pagina de produto vtex
        }

    },

    // =============================================
    // =============================================
    // ===== ENGINE (IDENTICO EM TODAS AS LOJAS) =====
    // =============================================

    _waitForElement(selector, callback, timeout) {
        var el = document.querySelector(selector);
        if (el) return callback(el);
        if (typeof MutationObserver === 'undefined') return;
        var obs = new MutationObserver(function() {
            var found = document.querySelector(selector);
            if (found) { obs.disconnect(); callback(found); }
        });
        obs.observe(document.body, { childList: true, subtree: true });
        setTimeout(function() { obs.disconnect(); }, timeout || 15000);
    },

    _eventMatch(eventName, configName) {
        if (!configName || !eventName) return false;
        if (eventName === configName) return true;
        if (eventName === "custom_" + configName) return true;
        if (configName.startsWith("custom_") && eventName === configName.slice(7)) return true;
        // view_item <-> view_product (sinonimos)
        var aliases = {"view_item":"view_product","view_product":"view_item"};
        var base = configName.startsWith("custom_") ? configName.slice(7) : configName;
        if (aliases[base]) {
            var alt = aliases[base];
            if (eventName === alt || eventName === "custom_" + alt) return true;
        }
        return false;
    },

    _sentEvents: {},

    _extractEmail(obj) {
        if (!obj || typeof obj !== 'object') return null;
        // Busca apenas em paths que sabemos conter email do USUARIO
        // Evita pegar emails da loja, contato, agencia, etc.
        var candidates = [
            obj.user && obj.user.email,                          // oppuz:user_data
            obj.customer && obj.customer.email,                  // customer object
            obj.ecommerce && obj.ecommerce.user_info && obj.ecommerce.user_info.customer && obj.ecommerce.user_info.customer.email, // custom_user_info (Grupo Soma)
            obj.visitorContactInfo && obj.visitorContactInfo[0], // VTEX orderPlaced
            obj.clientProfileData && obj.clientProfileData.email, // VTEX orderForm
            obj.namespaces && obj.namespaces.profile && obj.namespaces.profile.email && obj.namespaces.profile.email.value // VTEX sessions API
        ];
        for (var i = 0; i < candidates.length; i++) {
            if (candidates[i] && typeof candidates[i] === 'string' && candidates[i].includes('@')) {
                var em = this.validateEmail(candidates[i]);
                if (em !== 'invalid') return em;
            }
        }
        return null;
    },

    // Irmao do _extractEmail: pega o telefone do usuario nas responses VTEX.
    _extractPhone(obj) {
        if (!obj || typeof obj !== 'object') return null;
        var candidates = [
            obj.clientProfileData && obj.clientProfileData.phone,                                                          // VTEX orderForm
            obj.namespaces && obj.namespaces.profile && obj.namespaces.profile.phone && obj.namespaces.profile.phone.value, // VTEX sessions API
            obj.phone,                                                                                                     // dataentities/CL, vtexid
            obj.homePhone,
            obj.user && obj.user.phone,
            obj.customer && obj.customer.phone
        ];
        for (var i = 0; i < candidates.length; i++) {
            var p = candidates[i];
            if (p && typeof p === 'string' && p.replace(/\D/g, '').length >= 10) return p.trim();
        }
        return null;
    },

    _emitUserData(email, extras, source) {
        var validated = this.validateEmail(email);
        if (validated === 'invalid') return false;
        this._lastEmittedEmail = validated;
        var user = { email: validated };
        // Limpa tokens "undefined"/"null" literais que vem de APIs VTEX
        // (ex: visitorContactInfo = [email, "undefined", "undefined"])
        var _cleanName = function(s) {
            if (!s || typeof s !== 'string') return null;
            var c = s.replace(/\bundefined\b/gi, '').replace(/\bnull\b/gi, '').replace(/\s+/g, ' ').trim();
            if (!c || c.indexOf('*') !== -1) return null;
            return c;
        };
        if (extras && typeof extras === 'object') {
            var n = _cleanName(extras.name);
            if (n) user.name = n;
            if (extras.birthday && typeof extras.birthday === 'string') user.birthday = extras.birthday.trim();
            if (extras.cellphone && typeof extras.cellphone === 'string') user.cellphone = extras.cellphone.trim();
        } else if (extras && typeof extras === 'string') {
            var ns = _cleanName(extras);
            if (ns) user.name = ns;
        }
        // Telefone bufferizado (chegou antes de qualquer email): anexa agora que ha identidade
        if (!user.cellphone && this._pendingPhone) {
            user.cellphone = this._pendingPhone;
            this._pendingPhone = null;
        }
        // Dedup: so emitir se email novo OU dados extras novos nesta pagina
        var fingerprint = validated + '|' + (user.name || '') + '|' + (user.birthday || '') + '|' + (user.cellphone || '');
        if (this._lastUserDataFingerprint && this._lastUserDataFingerprint.startsWith(validated + '|')) {
            // "sempre grava phone se tiver": telefone novo nunca e deduplicado
            var _oldPhone = this._lastUserDataFingerprint.split('|')[3] || '';
            var _phoneIsNew = !!(user.cellphone && user.cellphone !== _oldPhone);
            if (!_phoneIsNew) {
                // Mesmo email — so emitir se veio dados novos que nao tinha antes
                if (fingerprint === this._lastUserDataFingerprint) {
                    this.$.debug("Oppp::_emitUserData -> DEDUP skip (" + source + "): " + validated);
                    return true;
                }
                // Novo fingerprint mas mesmo email — so emitir se tem MAIS dados
                var oldParts = this._lastUserDataFingerprint.split('|');
                var newParts = fingerprint.split('|');
                var oldHasExtras = oldParts[1] || oldParts[2] || oldParts[3];
                var newHasExtras = newParts[1] || newParts[2] || newParts[3];
                if (oldHasExtras && !newHasExtras) {
                    this.$.debug("Oppp::_emitUserData -> DEDUP skip (less data) (" + source + "): " + validated);
                    return true;
                }
            }
        }
        this._lastUserDataFingerprint = fingerprint;
        this.$.debug("Oppp::_emitUserData -> " + source + ": " + validated);
        oppuz.track({ event: 'oppuz:user_data', user: user });
        return true;
    },

    _tryPassiveCartCapture() {
        if (this._passiveCartFiredThisPage) return;
        var self = this;
        // 1. criteoBasket (nao disponivel em mariafilo, mas mantido por consistencia)
        try {
            var basket = window.criteoBasket;
            if (basket && Array.isArray(basket) && basket.length > 0) {
                var a = basket.map(function(it) {
                    return { sku: String(it.id), quantity: Number(it.quantity), price: Number(it.price), seller_id: null };
                });
                self._passiveCartFiredThisPage = true;
                self.$.debug("Oppp::_tryPassiveCartCapture (criteoBasket) -> " + a.length + " itens");
                oppuz.track({ event: 'oppuz:view_cart', items: a });
                return;
            }
        } catch(e) {}
        // 2. dataLayer: custom_view_cart (Maria Filo — disponivel quando carrinho aberto)
        try {
            var dl = window.dataLayer || [];
            for (var di = dl.length - 1; di >= 0; di--) {
                var dlev = dl[di];
                if (dlev && dlev.event === 'custom_view_cart' && dlev.ecommerce) {
                    var dlitems = dlev.ecommerce.items || [];
                    if (dlitems.length > 0) {
                        var a2 = dlitems.map(function(it) {
                            return {
                                sku: String(it.item_sku || it.sku || it.item_id || it.id || ''),
                                quantity: Number(it.quantity || it.qty || 1),
                                price: Number(it.price),
                                seller_id: null
                            };
                        });
                        if (a2.length > 0 && a2[0].sku) {
                            self._passiveCartFiredThisPage = true;
                            self.$.debug("Oppp::_tryPassiveCartCapture (dataLayer:custom_view_cart) -> " + a2.length + " itens");
                            oppuz.track({ event: 'oppuz:view_cart', items: a2 });
                            return;
                        }
                    }
                    break;
                }
            }
        } catch(e) {}
        // 3. Fallback: orderForm API (bloqueado por CORS em mariafilo, mantido por consistencia)
        try {
            fetch('/api/checkout/pub/orderForm', {
                method: 'POST', body: '{}',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            }).then(function(r) { return r.json(); })
              .then(function(data) {
                var items = data && data.items;
                if (!items || items.length === 0) return;
                var a = items.map(function(it) {
                    return { sku: it.id, quantity: Number(it.quantity), price: Number(it.sellingPrice) / 100, seller_id: it.seller || null };
                });
                self._passiveCartFiredThisPage = true;
                self.$.debug("Oppp::_tryPassiveCartCapture (orderForm) -> " + a.length + " itens");
                oppuz.track({ event: 'oppuz:view_cart', items: a });
            }).catch(function() {});
        } catch(e) {}
    },

    _tryPassiveEmailCapture(source) {
        // Ja tem email — nao precisa mais procurar
        if (this._lastEmittedEmail) return;
        // Cooldown: nao martelar APIs em navegacoes SPA rapidas
        var now = Date.now();
        if (this._lastPassiveAttempt && (now - this._lastPassiveAttempt) < 5000) return;
        this._lastPassiveAttempt = now;
        var self = this;
        this.$.debug("Oppp::_tryPassiveEmailCapture -> from: " + (source || 'startup'));

        // Ordem: fontes mais frescas primeiro, stale por ultimo

        // 1. Plataforma — API do servidor (mais fresco)
        if (typeof this._fetchPlatformEmail === 'function') {
            this._fetchPlatformEmail(function(email) {
                if (email && self._emitUserData(email, null, 'platform:' + (source || 'startup'))) return;
                // Se API falhar, tenta fontes locais
                self._tryLocalEmailSources();
            });
        } else {
            this._tryLocalEmailSources();
        }
    },

    _tryLocalEmailSources() {
        // 2. dataLayer scan (eventos da sessao atual)
        var dl = window.dataLayer || [];
        for (var i = dl.length - 1; i >= 0; i--) {
            var em = this._extractEmail(dl[i]);
            if (em && this._emitUserData(em, null, 'dataLayer[' + i + ']')) return;
        }

        // 3. localStorage lead_checkout (pode ser stale)
        try {
            var lead = localStorage.getItem('lead_checkout');
            if (lead) {
                var data = JSON.parse(lead);
                var leadEmail = data.email || data.Email;
                if (leadEmail && this._emitUserData(leadEmail, null, 'lead_checkout')) return;
            }
        } catch(e) {}
    },

    _installStorefrontUserSubscriber() {
        var self = this;
        try {
            if (window.STOREFRONT && window.STOREFRONT.USER &&
                typeof window.STOREFRONT.USER.subscribe === 'function') {
                window.STOREFRONT.USER.subscribe(function(sdk) {
                    var user = typeof sdk.getUser === 'function' ? sdk.getUser() : sdk;
                    if (user && user.email) {
                        self._emitUserData(user.email, null, 'STOREFRONT.USER.subscribe');
                    }
                });
                self.$.debug("Oppp::STOREFRONT.USER subscriber installed");
                return true;
            }
        } catch(e) {}
        return false;
    },

    _trackOnce(key, payload) {
        if (this._sentEvents[key]) {
            this.$.debug("Oppp::_trackOnce -> duplicado (mem), skip: " + key);
            return false;
        }
        try {
            if (sessionStorage.getItem('oppuz_sent_' + key)) {
                this.$.debug("Oppp::_trackOnce -> duplicado (session), skip: " + key);
                return false;
            }
        } catch(e) {}
        this._sentEvents[key] = true;
        try { sessionStorage.setItem('oppuz_sent_' + key, '1'); } catch(e) {}
        oppuz.track(payload);
        setTimeout(() => { delete this._sentEvents[key]; }, 10000);
        return true;
    },

    listenDataLayer(listener) {
        const onDataLayer = listener.onDataLayer.bind(listener)
        const debugLog = this.$.debug.bind(this.$)
        window.dataLayer = window.dataLayer || []
        const oldPush = window.dataLayer.push;
        window.dataLayer.push = (function (...args) {
            for (const arg of args) {
                try {
                    onDataLayer(arg)
                } catch (e) {
                    debugLog("error", e)
                }
            }
            oldPush.call(this, ...args);
        })
        for (const arg of new Array(...window.dataLayer)) {
            try {
                onDataLayer(arg)
            } catch (e) {
                this.$.debug("error", e)
            }
        }
    },

    validateEmail(emv) {

      this.$.debug("Oppp::validateEmail -> Started | raw: " + emv);

      if (typeof emv !== "string") {
        this.$.debug("Oppp::validateEmail -> Input is NOT string");
        return "invalid";
      }

      emv = emv.trim();
      if (!emv) {
        this.$.debug("Oppp::validateEmail -> Empty string");
        return "invalid";
      }

      const parts = emv.split('@');
      const vld1 = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emv);
      const vld2 = parts.length === 2 && !emv.includes('..');
      const vld3 = emv.charAt(0) !== '.' && parts[0] !== '.';

      if (vld1 && vld2 && vld3) {
        this.$.debug("Oppp::validateEmail -> OK: " + emv);
        return emv;
      }

      this.$.debug("Oppp::validateEmail -> INVALID: " + emv);
      return "invalid";
    },

    _captureFromForm(emailEl, btnEl, firstNameEl, lastNameEl, extraEls) {
        if (!btnEl) return;
        if (btnEl._oppuzListener) return;
        var self = this;
        btnEl.addEventListener('click', function() {
            var email = emailEl ? emailEl.value : null;
            if (!email) return;
            var fn = firstNameEl ? firstNameEl.value : null;
            var ln = lastNameEl ? lastNameEl.value : null;
            var name = [fn, ln].filter(Boolean).join(' ');
            var phone = (extraEls && extraEls.phone) ? extraEls.phone.value : null;
            var bday  = (extraEls && extraEls.birthday) ? extraEls.birthday.value : null;
            if (phone || bday) {
                self._emitUserData(email, { name: name || null, cellphone: phone || null, birthday: bday || null }, 'form');
            } else {
                self._emitUserData(email, name, 'form');
            }
        });
        btnEl._oppuzListener = true;
    },

    buildCategoryTree(app){

      var ap = app; var ac =  ""; var an = "";
      var obj = {}; var cat = [];

      for (var i = 0; i < ap.length; i++) {
         ac += "/" + ap[i];
         an += (an ? " " : "") + ap[i];
         obj = {id: ac, name:an}
         cat.push(obj);
      }
      return cat;
    },

    getEvent(eventName){
          var self = this;
          var evt = dataLayer.filter( (item) => {
          return self._eventMatch(item.event, eventName);
        }).pop();
        return evt;
    },


    oppuzAddToCart(evento) {

        this.$.debug("Oppp::OppuzAddToCart is On --> Started");
        var items = (evento.ecommerce && evento.ecommerce.items) || evento.items;
        if (!items || !items[0]) return;
        var e = items[0];
        oppuz.track({
            event: 'oppuz:add_to_cart',
            items: [{sku:e.item_sku || e.sku, quantity:Number(e.quantity), price:Number(e.price), seller_id:null}]
        });
    },

    oppuzViewCart(evento) {

        this.$.debug("Oppp::OppuzViewCart is On --> Started");
        var e = (evento.ecommerce && evento.ecommerce.items) || evento.items;
        if (!e) return;
        var a = [];
        for(var i = 0;i<e.length;i++){
          // item_sku preferido; fallback para item_id/id (Maria Filo usa product ID como id)
          a.push({sku: e[i].item_sku || e[i].sku || e[i].item_id || e[i].id, quantity: Number(e[i].quantity || e[i].qty || 1), price: Number(e[i].price), seller_id:null});
        }
        var dedupKey = "view_cart_" + a.map(function(item){ return item.sku; }).join(",");
        this._trackOnce(dedupKey, {event: 'oppuz:view_cart', items:a});

    },

    oppuzRemoveFromCart(evento) {

        this.$.debug("Oppp::oppuzRemoveFromCart is On --> Started");
        var items = (evento.ecommerce && evento.ecommerce.items) || evento.items;
        if (!items || !items[0]) return;
        var e = items[0];
        oppuz.track({
           event: 'oppuz:remove_from_cart',
           items: [{sku:e.item_sku || e.sku, quantity:Number(e.quantity), price:Number(e.price), seller_id:null}]
        });
    },

    _handleOrder(evento) {
        // VTEX structure: transactionProducts, transactionId, visitorContactInfo
        if (evento.transactionProducts && evento.transactionId) {
            this.$.debug("Oppp::_handleOrder -> VTEX structure detected");
            var prd  = evento.transactionProducts;
            var tid  = evento.transactionId;
            var ema  = evento.visitorContactInfo ? evento.visitorContactInfo[0] : null;
            var fna  = evento.visitorContactInfo ? evento.visitorContactInfo[1] : null;
            var lna  = evento.visitorContactInfo ? evento.visitorContactInfo[2] : null;
            var aprds = [];

            for (var x = 0; x < prd.length; x++){
               aprds.push({
                           sku: prd[x].sku,
                           quantity: Number(prd[x].quantity),
                           price: Number(prd[x].price),
                           seller_id: prd[x].sellerId || null
                        });
            }

            var dedupKey = "order_placed_" + tid;
            if (!this._trackOnce(dedupKey, {event: 'oppuz:order_placed', items: aprds, order_id: tid})) return;

            if (ema) {
                var name = [fna, lna].filter(Boolean).join(' ');
                setTimeout(() => { this._emitUserData(ema, name, 'order:vtex'); }, 300);
            }
            return;
        }

        // GA4 structure: ecommerce.items, ecommerce.transaction_id
        var ecom = evento.ecommerce;
        if (!ecom) ecom = evento; // fallback: items at top level
        var items = ecom.items;
        var tid2 = ecom.transaction_id || evento.transaction_id;

        if (items && tid2) {
            this.$.debug("Oppp::_handleOrder -> GA4 structure detected");
            var aprds2 = [];
            for (var y = 0; y < items.length; y++){
               aprds2.push({
                           sku: items[y].item_variant || items[y].item_sku || items[y].sku,
                           quantity: Number(items[y].quantity),
                           price: Number(items[y].price),
                           seller_id: items[y].sellerId || null
                        });
            }

            var dedupKey2 = "order_placed_" + tid2;
            this._trackOnce(dedupKey2, {event: 'oppuz:order_placed', items: aprds2, order_id: tid2});

            // GA4 purchase: tenta capturar email do evento, plataforma, ou fontes locais
            var ga4Email = this._extractEmail(evento);
            if (ga4Email) {
                setTimeout(() => { this._emitUserData(ga4Email, null, 'order:ga4'); }, 300);
            } else if (typeof this._fetchPlatformEmail === 'function') {
                var self = this;
                setTimeout(() => {
                    self._fetchPlatformEmail(function(email) {
                        if (email) { self._emitUserData(email, null, 'order:platform'); }
                        else { self._tryLocalEmailSources(); }
                    });
                }, 300);
            } else {
                setTimeout(() => { this._tryLocalEmailSources(); }, 500);
            }
            return;
        }

        this.$.debug("Oppp::_handleOrder -> Estrutura nao reconhecida, ignorando");
    },

    oppuzViewProduct(evento) {
        this.$.debug("Oppp::oppuzViewProduct is On --> Started");
        var items = (evento.ecommerce && evento.ecommerce.items) || evento.items;
        if (!items || !items[0]) return;
        const p = items[0];
        const skus = this.getSkus();
        const catTree = this.buildCategoryTree(this.getCategoryForProduct(evento));
        const img = this.getProductImage(evento);
        const url = this.getProductUrl(evento);

        var buildSku = function(skuId, available) {
            return {
                sku:               skuId,
                name:              p.item_name,
                available:         available,
                img:               img,
                price:             Number(p.price),
                url:               url,
                category:          catTree[1] || null,
                parent_category:   catTree[0] || null,
                list_price:        Number(p.list_price) || Number(p.price),
                installments:      Number(p.installments) || 1,
                installment_value: Number(p.installment_value) || Number(p.price),
                description:       p.item_variant || null
            };
        };

        // Sort SKUs numericamente e pega o primeiro
        if (skus.length > 1) {
            skus.sort(function(a, b) { return Number(a.sku) - Number(b.sku); });
        }
        var firstSku = skus.length > 0 ? skus[0] : null;
        oppuz.track({
            event: 'oppuz:view_product',
            product: {
                id: p.item_id,
                brand: p.item_brand,
                skus: [buildSku(
                    firstSku ? firstSku.sku : (p.item_sku || p.item_id),
                    firstSku ? firstSku.available : true
                )]
            }
        });
    },

    oppuzViewProductSku(skustk) {
        if (!skustk) return;
        const evt = this.getEvent(this.config.events.view_item);
        if (!evt) return;
        var items = (evt.ecommerce && evt.ecommerce.items) || evt.items;
        if (!items || !items[0]) return;
        const p = items[0];
        const catTree = this.buildCategoryTree(this.getCategoryForProduct(evt));
        const img = this.getProductImage(evt);
        const url = this.getProductUrl(evt);

        this.$.debug("Oppp::oppuzViewProductSku is On --> oppuz.track");

        setTimeout(() => {
            oppuz.track({
                event: 'oppuz:view_product',
                product: {
                    id: p.item_id,
                    brand: p.item_brand,
                    skus: [{
                        sku:               skustk.sku,
                        name:              p.item_name,
                        available:         skustk.available,
                        img:               img,
                        price:             Number(p.price),
                        url:               url,
                        category:          catTree[1] || null,
                        parent_category:   catTree[0] || null,
                        list_price:        Number(p.list_price) || Number(p.price),
                        installments:      Number(p.installments) || 1,
                        installment_value: Number(p.installment_value) || Number(p.price),
                        description:       p.item_variant || null
                    }]
                }
            });
        }, 1000);
    },

    oppuzViewCartHijack(evento) {
        this.$.debug("Oppp::oppuzViewCartHijack is On --> Started");
        var e = evento.orderFormProducts;
        if (!e) return;
        var a = [];
        for (var i = 0; i < e.length; i++) {
            a.push({ sku: e[i].sku, quantity: Number(e[i].quantity), price: Number(e[i].price), seller_id: null });
        }
        var dedupKey = "view_cart_" + a.map(function(item){ return item.sku; }).join(",");
        this._trackOnce(dedupKey, { event: 'oppuz:view_cart', items: a });
    },

    onRequest(request, response) {
        if (!this.config.hijackUrl) return;

        // 1. VTEX RC (orderPlaced + cart)
        if (request.url === "https://rc.vtex.com/v8") {
            try {
                var evtOrd = (typeof request.body == "string") ? JSON.parse(request.body) : request.body;
                this.$.debug("Oppp::onRequest HIJACK RC", evtOrd);
                if (evtOrd.RequestType === 'orderPlaced' || evtOrd.event === 'orderPlaced') {
                    setTimeout(() => { this._handleOrder(evtOrd); }, 500);
                }
                if (evtOrd.RequestType === 'cart' || evtOrd.event === 'cart') {
                    setTimeout(() => { this.oppuzViewCartHijack(evtOrd); }, 400);
                }
            } catch(e) {}
        }

        // 2. Email passivo de responses de APIs de usuario (tempo real, sem flag)
        if (response && response.body) {
            try {
                var url = request.url || '';
                if (url.includes('/api/checkout/pub/orderForm') ||
                    url.includes('/api/sessions') ||
                    url.includes('/api/dataentities/CL') ||
                    url.includes('/api/io/account') ||
                    url.includes('/api/vtexid/pub/authentication/')) {
                    var body = (typeof response.body === 'string') ? JSON.parse(response.body) : response.body;
                    var em = this._extractEmail(body);
                    // P3: obj.email direto para APIs onde top-level email e sempre do usuario
                    if (!em && body && typeof body.email === 'string' && body.email.includes('@') &&
                        (url.includes('/api/dataentities/CL') || url.includes('/api/vtexid/pub/authentication/'))) {
                        em = this.validateEmail(body.email);
                        if (em === 'invalid') em = null;
                    }
                    // Sempre grava o telefone se a response VTEX tiver (orderForm/sessions/CL)
                    var ph = this._extractPhone(body);
                    // Response so com telefone (sem email): atribui ao usuario ja conhecido
                    // pra garantir que o user_data dispare com o cellphone.
                    if (!em && ph && this._lastEmittedEmail) em = this._lastEmittedEmail;
                    // Ainda sem identidade nenhuma: bufferiza o telefone pro proximo email
                    if (!em && ph) this._pendingPhone = ph;
                    if (em) {
                        var extras = ph ? { cellphone: ph } : null;
                        // Delay pra deixar blocos de DOM (que tem nome) dispararem primeiro (2.5s)
                        setTimeout(() => this._emitUserData(em, extras, 'onRequest:' + url.substring(0, 50)), 3000);
                    }
                }
            } catch(e) {}
        }
    },

    openVtexModal() {
        this.$.debug("Oppp::openVtexModal is On-> Started");

        setTimeout(() => {

              const bte = document.getElementById('loginWithAccessKeyBtn');
              const btp = document.getElementById('loginWithUserAndPasswordBtn');

              if (bte) {bte.addEventListener('click', () => {this.loginCode()} );}
              if (btp) {btp.addEventListener('click', () => {this.loginPassword()});}

        }, 1000);
    },

    onDataLayer(item) {
        this.$.debug("Opp::onDataLayer", item);
        var evts = this.config.events;
        var handled = false;
        if (this._eventMatch(item.event, evts.add_to_cart))           { this.oppuzAddToCart(item); handled = true; }
        else if (this._eventMatch(item.event, evts.view_item))        {
            this._sentEvents['view_item_dl'] = true;
            setTimeout(() => { delete this._sentEvents['view_item_dl']; }, 10000);
            // custom_view_item e gerado pelo viewProductSizeBtn e tratado via oppuzViewProductSku
            if (!item.event || !item.event.startsWith('custom_')) {
                this.oppuzViewProduct(item);
            }
            handled = true;
        }
        else if (this._eventMatch(item.event, evts.view_category))     { if (typeof this.oppuzViewCategory === 'function') this.oppuzViewCategory(item); handled = true; }
        else if (this._eventMatch(item.event, evts.view_cart))        { this.oppuzViewCart(item); handled = true; }
        else if (this._eventMatch(item.event, evts.remove_from_cart)) { this.oppuzRemoveFromCart(item); handled = true; }
        else if (this._eventMatch(item.event, evts.order_placed))     { this._handleOrder(item); handled = true; }
        else if (this._eventMatch(item.event, evts.order_placed_alt)) { this._handleOrder(item); handled = true; }
        else if (this._eventMatch(item.event, evts.purchase))         { this._handleOrder(item); handled = true; }

        // Captura de email: extrai do evento se presente
        var em = this._extractEmail(item);
        if (em) {
            // custom_user_info traz nome completo — aproveitar
            var extras = null;
            try {
                var cust = item.ecommerce && item.ecommerce.user_info && item.ecommerce.user_info.customer;
                if (cust) {
                    extras = { name: [cust.firstName, cust.lastName].filter(Boolean).join(' ') || null };
                }
            } catch(e) {}
            this._emitUserData(em, extras, 'onDataLayer');
        }
    },

    // Polling sessions API para capturar email apos login via iframe (Plataforma Social)
    _pollSessionEmail(attempts) {
        if (this._lastEmittedEmail) return;
        if (!attempts || attempts <= 0) return;
        var self = this;
        setTimeout(function() {
            fetch('/api/sessions?items=profile.email,profile.isAuthenticated', { credentials: 'include' })
                .then(function(r) { return r.json(); })
                .then(function(data) {
                    var profile = data && data.namespaces && data.namespaces.profile;
                    if (profile && profile.email && profile.email.value) {
                        self._emitUserData(profile.email.value, null, 'sessions:poll');
                    } else if (profile && profile.isAuthenticated && profile.isAuthenticated.value === 'true') {
                        // Autenticado mas sem email nos items — tenta com mais items
                        fetch('/api/sessions?items=profile.email,profile.firstName,profile.lastName', { credentials: 'include' })
                            .then(function(r) { return r.json(); })
                            .then(function(d2) {
                                var p2 = d2 && d2.namespaces && d2.namespaces.profile;
                                if (p2 && p2.email && p2.email.value) {
                                    self._emitUserData(p2.email.value, null, 'sessions:poll:retry');
                                } else {
                                    self._pollSessionEmail(attempts - 1);
                                }
                            }).catch(function() { self._pollSessionEmail(attempts - 1); });
                    } else {
                        self._pollSessionEmail(attempts - 1);
                    }
                }).catch(function() { self._pollSessionEmail(attempts - 1); });
        }, 5000);
    },

    module() {
        this.$.debug("Hello from enterprise module!!!")
        this.listenDataLayer(this)
        this._navigation.listen(this)
        this.onNavigation(this._navigation.current)
        // Captura passiva de email em dataLayer existente
        setTimeout(() => { this._tryPassiveEmailCapture('startup'); }, 3000);
        // Fallback: ler cookie oppuz_user se nenhuma fonte ativa achou email
        setTimeout(() => {
            if (this._lastEmittedEmail) return;
            try {
                var raw = document.cookie.split('; ').find(function(c) { return c.startsWith('oppuz_user='); });
                if (raw) {
                    var data = JSON.parse(decodeURIComponent(raw.split('=').slice(1).join('=')));
                    if (data && data.email) this._emitUserData(data.email, data.name || null, 'cookie:oppuz_user');
                }
            } catch(e) {}
        }, 5000);
        // Subscrever STOREFRONT.USER para capturar login em tempo real (Deco.cx)
        var self = this;
        if (!this._installStorefrontUserSubscriber()) {
            setTimeout(function() { self._installStorefrontUserSubscriber(); }, 5000);
        }
        // Instalar Ajax Hijack como fallback
        if (this.config.hijackUrl) {
            this._dynamicModuleRegistry.install({
                id: "ajax-hijack",
                settings: {},
                url: this.config.hijackUrl
            }).then((hijack) => {
                hijack.listen(this);
                this.$.debug("Oppp::Hijack installed as fallback");
            }).catch((err) => {
                this.$.debug("Oppp::Hijack install failed (non-blocking)", err);
            });
        }
    }
})
