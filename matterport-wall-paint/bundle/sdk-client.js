/*! For license information please see sdk-client.js.LICENSE.txt */
window["sdk-client"] = function() {
    var t = {
        436: function(t, e, r) {
            var n, i, o;
            o = function() {
                var t, e, r = document, n = r.getElementsByTagName("head")[0], i = {}, o = {}, s = {}, a = {};
                function h(t, e) {
                    for (var r = 0, n = t.length; r < n; ++r)
                        if (!e(t[r]))
                            return !1;
                    return 1
                }
                function c(t, e) {
                    h(t, (function(t) {
                        return e(t),
                        1
                    }
                    ))
                }
                function u(e, r, n) {
                    e = e.push ? e : [e];
                    var f = r && r.call
                      , d = f ? r : n
                      , p = f ? e.join("") : r
                      , y = e.length;
                    function m(t) {
                        return t.call ? t() : i[t]
                    }
                    function v() {
                        if (!--y)
                            for (var t in i[p] = 1,
                            d && d(),
                            s)
                                h(t.split("|"), m) && !c(s[t], m) && (s[t] = [])
                    }
                    return setTimeout((function() {
                        c(e, (function e(r, n) {
                            return null === r ? v() : (n || /^https?:\/\//.test(r) || !t || (r = -1 === r.indexOf(".js") ? t + r + ".js" : t + r),
                            a[r] ? (p && (o[p] = 1),
                            2 == a[r] ? v() : setTimeout((function() {
                                e(r, !0)
                            }
                            ), 0)) : (a[r] = 1,
                            p && (o[p] = 1),
                            void l(r, v)))
                        }
                        ))
                    }
                    ), 0),
                    u
                }
                function l(t, i) {
                    var o, s = r.createElement("script");
                    s.onload = s.onerror = s.onreadystatechange = function() {
                        s.readyState && !/^c|loade/.test(s.readyState) || o || (s.onload = s.onreadystatechange = null,
                        o = 1,
                        a[t] = 2,
                        i())
                    }
                    ,
                    s.async = 1,
                    s.src = e ? t + (-1 === t.indexOf("?") ? "?" : "&") + e : t,
                    n.insertBefore(s, n.lastChild)
                }
                return u.get = l,
                u.order = function(t, e, r) {
                    !function n(i) {
                        i = t.shift(),
                        t.length ? u(i, n) : u(i, e, r)
                    }()
                }
                ,
                u.path = function(e) {
                    t = e
                }
                ,
                u.urlArgs = function(t) {
                    e = t
                }
                ,
                u.ready = function(t, e, r) {
                    t = t.push ? t : [t];
                    var n, o = [];
                    return !c(t, (function(t) {
                        i[t] || o.push(t)
                    }
                    )) && h(t, (function(t) {
                        return i[t]
                    }
                    )) ? e() : (n = t.join("|"),
                    s[n] = s[n] || [],
                    s[n].push(e),
                    r && r(o)),
                    u
                }
                ,
                u.done = function(t) {
                    u([null], t)
                }
                ,
                u
            }
            ,
            t.exports ? t.exports = o() : void 0 === (i = "function" == typeof (n = o) ? n.call(e, r, e, t) : n) || (t.exports = i)
        },
        772: function(t, e, r) {
            "use strict";
            r.r(e),
            r.d(e, {
                CollectionOperation: function() {
                    return q
                },
                IncomingMessageType: function() {
                    return B
                },
                OutgoingMessageType: function() {
                    return Le
                },
                SdkBuilder: function() {
                    return Be
                }
            });
            var n, i, o = r(436), s = function() {
                function t(t) {
                    this.messageReceiver = t
                }
                return t.prototype.notify = function(t) {
                    this.messageReceiver.onMessageReceived(t)
                }
                ,
                t
            }(), a = function() {
                function t() {
                    this.values = {}
                }
                return t.prototype.add = function(t, e) {
                    this.getValuesAtKey(t).push(e)
                }
                ,
                t.prototype.remove = function(t, e) {
                    var r = this.values[t];
                    if (r) {
                        var n = r.indexOf(e);
                        n > -1 && r.splice(n, 1)
                    }
                }
                ,
                t.prototype.getValuesAtKey = function(t) {
                    var e = this.values[t] || [];
                    return this.values[t] = e,
                    e
                }
                ,
                t.prototype.valuesPerKey = function(t) {
                    return this.getValuesAtKey(t).length
                }
                ,
                Object.defineProperty(t.prototype, "keys", {
                    get: function() {
                        return Object.keys(this.values)
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                t
            }(), h = function() {
                return (h = Object.assign || function(t) {
                    for (var e, r = 1, n = arguments.length; r < n; r++)
                        for (var i in e = arguments[r])
                            Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
                    return t
                }
                ).apply(this, arguments)
            }, c = function() {
                function t(t, e) {
                    this.sourceId = t,
                    this.listenerBridge = e,
                    this.observers = new a
                }
                return t.prototype.init = function() {
                    var t = new (function() {
                        function t(t) {
                            this.messenger = t
                        }
                        return t.prototype.onMessageReceived = function(t) {
                            this.messenger.onMessageReceived(t)
                        }
                        ,
                        t
                    }())(this)
                      , e = new s(t);
                    this.listenerBridge.listen(e)
                }
                ,
                t.prototype.dispose = function() {
                    this.listenerBridge.stopListening()
                }
                ,
                t.prototype.addObserver = function(t) {
                    this.observers.add(t.messageType, t)
                }
                ,
                t.prototype.removeObserver = function(t) {
                    this.observers.remove(t.messageType, t)
                }
                ,
                t.prototype.send = function(t, e, r) {
                    r.send(h(h({}, t), {
                        fromId: this.sourceId,
                        toId: e,
                        timestamp: Date.now()
                    }))
                }
                ,
                t.prototype.onMessageReceived = function(t) {
                    var e, r, n = t.type, i = this.observers.getValuesAtKey(n);
                    if (i)
                        try {
                            for (var o = function(t) {
                                var e = "function" == typeof Symbol && Symbol.iterator
                                  , r = e && t[e]
                                  , n = 0;
                                if (r)
                                    return r.call(t);
                                if (t && "number" == typeof t.length)
                                    return {
                                        next: function() {
                                            return t && n >= t.length && (t = void 0),
                                            {
                                                value: t && t[n++],
                                                done: !t
                                            }
                                        }
                                    };
                                throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.")
                            }(i), s = o.next(); !s.done; s = o.next())
                                s.value.notify(t.payload, t.timestamp)
                        } catch (t) {
                            e = {
                                error: t
                            }
                        } finally {
                            try {
                                s && !s.done && (r = o.return) && r.call(o)
                            } finally {
                                if (e)
                                    throw e.error
                            }
                        }
                }
                ,
                t
            }(), u = function() {
                function t(t) {
                    var e = this;
                    this.sourceWindow = t,
                    this.messageObserver = null,
                    this.onMessage = function(t) {
                        e.messageObserver && e.messageObserver.notify(t.data)
                    }
                }
                return t.prototype.listen = function(t) {
                    this.messageObserver || (this.messageObserver = t,
                    this.sourceWindow.addEventListener("message", this.onMessage))
                }
                ,
                t.prototype.stopListening = function() {
                    this.sourceWindow.removeEventListener("message", this.onMessage),
                    this.messageObserver = null
                }
                ,
                t
            }(), l = function() {
                function t(t, e) {
                    void 0 === e && (e = "*"),
                    this.targetWindow = t,
                    this.targetOrigin = e
                }
                return t.prototype.send = function(t) {
                    this.targetWindow.postMessage(t, this.targetOrigin)
                }
                ,
                t
            }(), f = function() {
                return (f = Object.assign || function(t) {
                    for (var e, r = 1, n = arguments.length; r < n; r++)
                        for (var i in e = arguments[r])
                            Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
                    return t
                }
                ).apply(this, arguments)
            }, d = function() {
                function t(t, e, r) {
                    this.sourceId = t,
                    this.targetId = e,
                    this.messageBridge = r,
                    this.observers = new a
                }
                return t.prototype.init = function() {
                    var t = new (function() {
                        function t(t) {
                            this.messenger = t
                        }
                        return t.prototype.onMessageReceived = function(t) {
                            this.messenger.onMessageReceived(t)
                        }
                        ,
                        t
                    }())(this)
                      , e = new s(t);
                    this.messageBridge.listen(e)
                }
                ,
                t.prototype.dispose = function() {
                    this.messageBridge.stopListening()
                }
                ,
                t.prototype.addObserver = function(t) {
                    this.observers.add(t.messageType, t)
                }
                ,
                t.prototype.removeObserver = function(t) {
                    this.observers.remove(t.messageType, t)
                }
                ,
                t.prototype.send = function(t) {
                    var e = this.sourceId
                      , r = this.targetId;
                    this.messageBridge.send(f(f({}, t), {
                        fromId: e,
                        toId: r,
                        timestamp: Date.now()
                    }))
                }
                ,
                t.prototype.onMessageReceived = function(t) {
                    var e, r;
                    if (this.filterMessageId(t)) {
                        var n = t.type
                          , i = this.observers.getValuesAtKey(n);
                        if (i)
                            try {
                                for (var o = function(t) {
                                    var e = "function" == typeof Symbol && Symbol.iterator
                                      , r = e && t[e]
                                      , n = 0;
                                    if (r)
                                        return r.call(t);
                                    if (t && "number" == typeof t.length)
                                        return {
                                            next: function() {
                                                return t && n >= t.length && (t = void 0),
                                                {
                                                    value: t && t[n++],
                                                    done: !t
                                                }
                                            }
                                        };
                                    throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.")
                                }(i), s = o.next(); !s.done; s = o.next())
                                    s.value.notify(t.payload, t.timestamp)
                            } catch (t) {
                                e = {
                                    error: t
                                }
                            } finally {
                                try {
                                    s && !s.done && (r = o.return) && r.call(o)
                                } finally {
                                    if (e)
                                        throw e.error
                                }
                            }
                    }
                }
                ,
                t.prototype.filterMessageId = function(t) {
                    var e = t.toId
                      , r = t.fromId;
                    return e instanceof Array ? e.indexOf(this.sourceId) > -1 : e === this.sourceId && r === this.targetId
                }
                ,
                t
            }(), p = function() {
                function t(t, e, r) {
                    void 0 === r && (r = "*"),
                    this.listener = new u(t),
                    this.sender = new l(e,r)
                }
                return t.prototype.listen = function(t) {
                    this.listener.listen(t)
                }
                ,
                t.prototype.stopListening = function() {
                    this.listener.stopListening()
                }
                ,
                t.prototype.send = function(t) {
                    this.sender.send(t)
                }
                ,
                t
            }(), y = function() {
                function t(t, e, r, n, i) {
                    void 0 === i && (i = "*"),
                    this.sourceId = t,
                    this.sourceWindow = e,
                    this.targetId = r,
                    this.targetWindow = n,
                    this.targetOrigin = i
                }
                return t.prototype.createMessenger = function() {
                    var t = new p(this.sourceWindow,this.targetWindow,this.targetOrigin);
                    return new d(this.sourceId,this.targetId,t)
                }
                ,
                t
            }();
            !function(t) {
                t.CONNECT = "postmessage.connect"
            }(n || (n = {})),
            function(t) {
                t.HANDSHAKE = "postmessage.handshake",
                t.ACCEPT = "postmessage.accept",
                t.REJECT = "postmessage.reject"
            }(i || (i = {}));
            var m, v = function(t) {
                this.type = n.CONNECT,
                this.payload = {
                    applicationKey: t
                }
            }, b = function() {
                function t(t) {
                    this.receiver = t,
                    this.messageType = i.HANDSHAKE
                }
                return t.prototype.notify = function(t) {
                    this.receiver.handshake()
                }
                ,
                t
            }(), g = function() {
                function t(t) {
                    this.receiver = t,
                    this.messageType = i.ACCEPT
                }
                return t.prototype.notify = function(t) {
                    var e = t.scriptUrl
                      , r = t.warning
                      , n = t.targetId
                      , i = t.targetOrigin
                      , o = t.interface;
                    this.receiver.accept(e, o, n, i, r)
                }
                ,
                t
            }(), x = function() {
                function t(t) {
                    this.receiver = t,
                    this.messageType = i.REJECT
                }
                return t.prototype.notify = function(t) {
                    this.receiver.reject(t.reason)
                }
                ,
                t
            }();
            !function(t) {
                t[t.IDLE = 0] = "IDLE",
                t[t.CONNECTING = 1] = "CONNECTING",
                t[t.HANDSHAKE = 2] = "HANDSHAKE",
                t[t.CONNECTED = 3] = "CONNECTED",
                t[t.REJECTED = 4] = "REJECTED"
            }(m || (m = {}));
            var w, _ = function() {
                function t(t, e) {
                    var r = this;
                    this.messenger = t,
                    this.target = e,
                    this.connectionState = m.IDLE,
                    this.connectionPoll = void 0;
                    var n = new (function() {
                        function t(t) {
                            this.connector = t
                        }
                        return t.prototype.handshake = function() {
                            this.connector.handshake()
                        }
                        ,
                        t.prototype.accept = function(t, e, r, n, i) {
                            this.connector.accept(t, e, r, n, i)
                        }
                        ,
                        t.prototype.reject = function(t) {
                            this.connector.reject(t)
                        }
                        ,
                        t
                    }())(this);
                    this.handshakeObserver = new b(n),
                    this.acceptObserver = new g(n),
                    this.rejectObserver = new x(n),
                    this.connectionPromise = new Promise((function(t, e) {
                        r.resolveConnection = t,
                        r.rejectConnection = e
                    }
                    ))
                }
                return t.prototype.connect = function(t) {
                    var e = this;
                    return this.connectionState === m.IDLE && (this.connectionState = m.CONNECTING,
                    this.messenger.addObserver(this.handshakeObserver),
                    this.messenger.addObserver(this.acceptObserver),
                    this.messenger.addObserver(this.rejectObserver),
                    this.connectionPoll = window.setInterval((function() {
                        e.messenger.send(new v(t), -1, e.target)
                    }
                    ), 500)),
                    this.connectionPromise
                }
                ,
                t.prototype.cancelConnecting = function() {
                    this.connectionState < m.CONNECTED && (this.stopConnectPolling(),
                    this.rejectConnection("User manually cancelled connection"))
                }
                ,
                t.prototype.handshake = function() {
                    this.connectionState < m.HANDSHAKE && (this.connectionState = m.HANDSHAKE,
                    this.stopConnectPolling(),
                    this.messenger.removeObserver(this.handshakeObserver))
                }
                ,
                t.prototype.accept = function(t, e, r, n, i) {
                    this.connectionState < m.CONNECTED && (this.connectionState = m.CONNECTED,
                    this.messenger.removeObserver(this.handshakeObserver),
                    this.messenger.removeObserver(this.acceptObserver),
                    this.messenger.removeObserver(this.rejectObserver),
                    this.stopConnectPolling(),
                    this.resolveConnection({
                        targetId: r,
                        targetOrigin: n,
                        scriptUrl: t,
                        serializedInterface: e,
                        warning: i
                    }))
                }
                ,
                t.prototype.reject = function(t) {
                    this.connectionState < m.CONNECTED && (this.connectionState = m.REJECTED,
                    this.messenger.removeObserver(this.handshakeObserver),
                    this.messenger.removeObserver(this.acceptObserver),
                    this.messenger.removeObserver(this.rejectObserver),
                    this.stopConnectPolling(),
                    this.rejectConnection(t))
                }
                ,
                t.prototype.stopConnectPolling = function() {
                    clearInterval(this.connectionPoll),
                    this.connectionPoll = void 0
                }
                ,
                t
            }(), M = function(t, e, r, n) {
                return new (r || (r = Promise))((function(i, o) {
                    function s(t) {
                        try {
                            h(n.next(t))
                        } catch (t) {
                            o(t)
                        }
                    }
                    function a(t) {
                        try {
                            h(n.throw(t))
                        } catch (t) {
                            o(t)
                        }
                    }
                    function h(t) {
                        var e;
                        t.done ? i(t.value) : (e = t.value,
                        e instanceof r ? e : new r((function(t) {
                            t(e)
                        }
                        ))).then(s, a)
                    }
                    h((n = n.apply(t, e || [])).next())
                }
                ))
            }, O = function(t, e) {
                var r, n, i, o, s = {
                    label: 0,
                    sent: function() {
                        if (1 & i[0])
                            throw i[1];
                        return i[1]
                    },
                    trys: [],
                    ops: []
                };
                return o = {
                    next: a(0),
                    throw: a(1),
                    return: a(2)
                },
                "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                    return this
                }
                ),
                o;
                function a(o) {
                    return function(a) {
                        return function(o) {
                            if (r)
                                throw new TypeError("Generator is already executing.");
                            for (; s; )
                                try {
                                    if (r = 1,
                                    n && (i = 2 & o[0] ? n.return : o[0] ? n.throw || ((i = n.return) && i.call(n),
                                    0) : n.next) && !(i = i.call(n, o[1])).done)
                                        return i;
                                    switch (n = 0,
                                    i && (o = [2 & o[0], i.value]),
                                    o[0]) {
                                    case 0:
                                    case 1:
                                        i = o;
                                        break;
                                    case 4:
                                        return s.label++,
                                        {
                                            value: o[1],
                                            done: !1
                                        };
                                    case 5:
                                        s.label++,
                                        n = o[1],
                                        o = [0];
                                        continue;
                                    case 7:
                                        o = s.ops.pop(),
                                        s.trys.pop();
                                        continue;
                                    default:
                                        if (!((i = (i = s.trys).length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                            s = 0;
                                            continue
                                        }
                                        if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                            s.label = o[1];
                                            break
                                        }
                                        if (6 === o[0] && s.label < i[1]) {
                                            s.label = i[1],
                                            i = o;
                                            break
                                        }
                                        if (i && s.label < i[2]) {
                                            s.label = i[2],
                                            s.ops.push(o);
                                            break
                                        }
                                        i[2] && s.ops.pop(),
                                        s.trys.pop();
                                        continue
                                    }
                                    o = e.call(t, s)
                                } catch (t) {
                                    o = [6, t],
                                    n = 0
                                } finally {
                                    r = i = 0
                                }
                            if (5 & o[0])
                                throw o[1];
                            return {
                                value: o[0] ? o[1] : void 0,
                                done: !0
                            }
                        }([o, a])
                    }
                }
            };
            function C(t, e) {
                for (var r in t) {
                    var n = t[r];
                    if (n) {
                        var i = e[r] || {};
                        for (var o in e[r] = i,
                        t[r])
                            E(r, o, n[o], e)
                    }
                }
            }
            function E(t, e, r, n) {
                var i = n[t] || {};
                n[t] = i,
                i[e] && console.warn("clobbering " + e + " in the " + t + " namespace"),
                i[e] = r
            }
            !function(t) {
                t.connect = function(t, e) {
                    return M(this, void 0, void 0, (function() {
                        var n, i, o, s, a, h, f, d, p, m;
                        return O(this, (function(v) {
                            switch (v.label) {
                            case 0:
                                if ("string" != typeof e)
                                    return [2, Promise.reject("invalid key")];
                                if (!(n = (w = t)instanceof Window ? w : w.contentWindow ? w.contentWindow : null))
                                    return [2, Promise.reject("invalid window")];
                                i = Math.floor(1e6 * Math.random()),
                                o = new u(window),
                                s = new l(n),
                                (a = new c(i,o)).init(),
                                h = new _(a,s),
                                v.label = 1;
                            case 1:
                                return v.trys.push([1, 3, 4, 5]),
                                [4, h.connect(e)];
                            case 2:
                                return f = v.sent(),
                                [3, 5];
                            case 3:
                                throw d = v.sent(),
                                Error(e + "@" + window.location.href + " - " + d);
                            case 4:
                                return h.cancelConnecting(),
                                a.dispose(),
                                [7];
                            case 5:
                                return [4, r(f.scriptUrl)];
                            case 6:
                                return p = v.sent(),
                                m = new y(i,window,f.targetId,n,f.targetOrigin),
                                [2, (b = p,
                                g = m,
                                x = f.serializedInterface,
                                new b(g).build(x))]
                            }
                            var b, g, x, w
                        }
                        ))
                    }
                    ))
                }
                ;
                var e = {};
                function r(t) {
                    return M(this, void 0, void 0, (function() {
                        var r, n;
                        return O(this, (function(i) {
                            if (!t)
                                throw new Error("Unabled to load the sdk");
                            return (r = e[t]) ? [2, r] : (n = new Promise((function(e, r) {
                                try {
                                    o(t, (function() {
                                        var t = window["sdk-client"];
                                        delete window["sdk-client"],
                                        t && t.SdkBuilder && "function" == typeof t.SdkBuilder && e(t.SdkBuilder)
                                    }
                                    ))
                                } catch (e) {
                                    r("Could not load the sdk from " + t)
                                }
                            }
                            )),
                            e[t] = n,
                            [2, n])
                        }
                        ))
                    }
                    ))
                }
            }(w || (w = {}));
            var z = function() {
                function t(t) {
                    this.observer = t,
                    this.messageType = B.EVENT
                }
                return t.prototype.notify = function(t) {
                    this.observer.receiveEvent(t)
                }
                ,
                t
            }()
              , S = function(t) {
                this.type = Le.EVENT_SUB,
                this.payload = {
                    subscription: t
                }
            }
              , R = function(t) {
                this.type = Le.EVENT_UNSUB,
                this.payload = {
                    subscription: t
                }
            }
              , I = function(t, e) {
                var r = "function" == typeof Symbol && t[Symbol.iterator];
                if (!r)
                    return t;
                var n, i, o = r.call(t), s = [];
                try {
                    for (; (void 0 === e || e-- > 0) && !(n = o.next()).done; )
                        s.push(n.value)
                } catch (t) {
                    i = {
                        error: t
                    }
                } finally {
                    try {
                        n && !n.done && (r = o.return) && r.call(o)
                    } finally {
                        if (i)
                            throw i.error
                    }
                }
                return s
            }
              , T = function() {
                for (var t = [], e = 0; e < arguments.length; e++)
                    t = t.concat(I(arguments[e]));
                return t
            }
              , D = function() {
                function t(t) {
                    this.messenger = t,
                    this.eventHandlers = new a;
                    var e = new (function() {
                        function t(t) {
                            this.eventHandler = t
                        }
                        return t.prototype.receiveEvent = function(t) {
                            this.eventHandler.receiveEvent(t)
                        }
                        ,
                        t
                    }())(this);
                    this.eventObserver = new z(e),
                    this.messenger.addObserver(this.eventObserver)
                }
                return t.prototype.build = function() {
                    var t = this;
                    return {
                        on: function(e, r) {
                            return t.subscribe(e, r)
                        },
                        off: function(e, r) {
                            return t.unsubscribe(e, r)
                        }
                    }
                }
                ,
                t.prototype.dispose = function() {
                    this.messenger.removeObserver(this.eventObserver)
                }
                ,
                t.prototype.receiveEvent = function(t) {
                    var e, r, n = this.eventHandlers.getValuesAtKey(t.eventType);
                    if (n)
                        try {
                            for (var i = function(t) {
                                var e = "function" == typeof Symbol && Symbol.iterator
                                  , r = e && t[e]
                                  , n = 0;
                                if (r)
                                    return r.call(t);
                                if (t && "number" == typeof t.length)
                                    return {
                                        next: function() {
                                            return t && n >= t.length && (t = void 0),
                                            {
                                                value: t && t[n++],
                                                done: !t
                                            }
                                        }
                                    };
                                throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.")
                            }(n), o = i.next(); !o.done; o = i.next()) {
                                var s = o.value;
                                t.eventData ? s.apply(void 0, T(t.eventData)) : s()
                            }
                        } catch (t) {
                            e = {
                                error: t
                            }
                        } finally {
                            try {
                                o && !o.done && (r = i.return) && r.call(i)
                            } finally {
                                if (e)
                                    throw e.error
                            }
                        }
                }
                ,
                t.prototype.subscribe = function(t, e) {
                    0 === this.eventHandlers.valuesPerKey(t) && this.messenger.send(new S(t)),
                    this.eventHandlers.add(t, e)
                }
                ,
                t.prototype.unsubscribe = function(t, e) {
                    this.eventHandlers.remove(t, e),
                    0 === this.eventHandlers.valuesPerKey(t) && this.messenger.send(new R(t))
                }
                ,
                t
            }()
              , k = function() {
                function t() {}
                return t.prototype.build = function(t) {
                    var e, r, n = {};
                    try {
                        for (var i = function(t) {
                            var e = "function" == typeof Symbol && Symbol.iterator
                              , r = e && t[e]
                              , n = 0;
                            if (r)
                                return r.call(t);
                            if (t && "number" == typeof t.length)
                                return {
                                    next: function() {
                                        return t && n >= t.length && (t = void 0),
                                        {
                                            value: t && t[n++],
                                            done: !t
                                        }
                                    }
                                };
                            throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.")
                        }(Object.keys(t)), o = i.next(); !o.done; o = i.next()) {
                            var s = t[o.value];
                            if (s) {
                                var a = n[s.namespace] || {};
                                n[s.namespace] = a,
                                a[s.name] = s.values
                            }
                        }
                    } catch (t) {
                        e = {
                            error: t
                        }
                    } finally {
                        try {
                            o && !o.done && (r = i.return) && r.call(i)
                        } finally {
                            if (e)
                                throw e.error
                        }
                    }
                    return n
                }
                ,
                t.prototype.dispose = function() {}
                ,
                t
            }()
              , P = function() {
                function t(t) {
                    this.receiver = t,
                    this.messageType = B.RESPONSE
                }
                return t.prototype.notify = function(t) {
                    this.receiver.receiveResponse(t)
                }
                ,
                t
            }()
              , j = function(t, e, r) {
                this.type = Le.ACTION,
                this.payload = {
                    uid: t,
                    targetFunction: e,
                    params: r
                }
            };
            function A(t, e, r) {
                for (var n = {}, i = void 0 === r ? t.length : r, o = 0; o < i; ++o)
                    n[t[o]] = e[o];
                return n
            }
            var N = function(t, e, r, n) {
                return new (r || (r = Promise))((function(i, o) {
                    function s(t) {
                        try {
                            h(n.next(t))
                        } catch (t) {
                            o(t)
                        }
                    }
                    function a(t) {
                        try {
                            h(n.throw(t))
                        } catch (t) {
                            o(t)
                        }
                    }
                    function h(t) {
                        var e;
                        t.done ? i(t.value) : (e = t.value,
                        e instanceof r ? e : new r((function(t) {
                            t(e)
                        }
                        ))).then(s, a)
                    }
                    h((n = n.apply(t, e || [])).next())
                }
                ))
            }
              , U = function(t, e) {
                var r, n, i, o, s = {
                    label: 0,
                    sent: function() {
                        if (1 & i[0])
                            throw i[1];
                        return i[1]
                    },
                    trys: [],
                    ops: []
                };
                return o = {
                    next: a(0),
                    throw: a(1),
                    return: a(2)
                },
                "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                    return this
                }
                ),
                o;
                function a(o) {
                    return function(a) {
                        return function(o) {
                            if (r)
                                throw new TypeError("Generator is already executing.");
                            for (; s; )
                                try {
                                    if (r = 1,
                                    n && (i = 2 & o[0] ? n.return : o[0] ? n.throw || ((i = n.return) && i.call(n),
                                    0) : n.next) && !(i = i.call(n, o[1])).done)
                                        return i;
                                    switch (n = 0,
                                    i && (o = [2 & o[0], i.value]),
                                    o[0]) {
                                    case 0:
                                    case 1:
                                        i = o;
                                        break;
                                    case 4:
                                        return s.label++,
                                        {
                                            value: o[1],
                                            done: !1
                                        };
                                    case 5:
                                        s.label++,
                                        n = o[1],
                                        o = [0];
                                        continue;
                                    case 7:
                                        o = s.ops.pop(),
                                        s.trys.pop();
                                        continue;
                                    default:
                                        if (!((i = (i = s.trys).length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                            s = 0;
                                            continue
                                        }
                                        if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                            s.label = o[1];
                                            break
                                        }
                                        if (6 === o[0] && s.label < i[1]) {
                                            s.label = i[1],
                                            i = o;
                                            break
                                        }
                                        if (i && s.label < i[2]) {
                                            s.label = i[2],
                                            s.ops.push(o);
                                            break
                                        }
                                        i[2] && s.ops.pop(),
                                        s.trys.pop();
                                        continue
                                    }
                                    o = e.call(t, s)
                                } catch (t) {
                                    o = [6, t],
                                    n = 0
                                } finally {
                                    r = i = 0
                                }
                            if (5 & o[0])
                                throw o[1];
                            return {
                                value: o[0] ? o[1] : void 0,
                                done: !0
                            }
                        }([o, a])
                    }
                }
            }
              , F = function(t) {
                var e = "function" == typeof Symbol && Symbol.iterator
                  , r = e && t[e]
                  , n = 0;
                if (r)
                    return r.call(t);
                if (t && "number" == typeof t.length)
                    return {
                        next: function() {
                            return t && n >= t.length && (t = void 0),
                            {
                                value: t && t[n++],
                                done: !t
                            }
                        }
                    };
                throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.")
            }
              , W = function(t, e) {
                var r = "function" == typeof Symbol && t[Symbol.iterator];
                if (!r)
                    return t;
                var n, i, o = r.call(t), s = [];
                try {
                    for (; (void 0 === e || e-- > 0) && !(n = o.next()).done; )
                        s.push(n.value)
                } catch (t) {
                    i = {
                        error: t
                    }
                } finally {
                    try {
                        n && !n.done && (r = o.return) && r.call(o)
                    } finally {
                        if (i)
                            throw i.error
                    }
                }
                return s
            }
              , L = function() {
                for (var t = [], e = 0; e < arguments.length; e++)
                    t = t.concat(W(arguments[e]));
                return t
            }
              , V = function() {
                function t(t) {
                    this.messenger = t,
                    this.responseResolvers = {},
                    this.currentMsgId = 0,
                    this.routines = {};
                    var e = new (function() {
                        function t(t) {
                            this.functions = t
                        }
                        return t.prototype.receiveResponse = function(t) {
                            this.functions.receiveResponse(t)
                        }
                        ,
                        t
                    }())(this);
                    this.responseObserver = new P(e),
                    this.messenger.addObserver(this.responseObserver)
                }
                return t.prototype.initRoutines = function(t) {
                    for (var e, r, n = [], i = 1; i < arguments.length; i++)
                        n[i - 1] = arguments[i];
                    try {
                        for (var o = F(n), s = o.next(); !s.done; s = o.next()) {
                            var a = s.value
                              , h = new a(t);
                            this.routines[h.key] = h
                        }
                    } catch (t) {
                        e = {
                            error: t
                        }
                    } finally {
                        try {
                            s && !s.done && (r = o.return) && r.call(o)
                        } finally {
                            if (e)
                                throw e.error
                        }
                    }
                }
                ,
                t.prototype.dispose = function() {
                    for (var t in this.messenger.removeObserver(this.responseObserver),
                    this.responseResolvers) {
                        var e = this.responseResolvers[t];
                        e && e.reject("SDK client was disconnected before " + e.funcKey + " was fulfilled")
                    }
                }
                ,
                t.prototype.register = function(t, e) {
                    var r = this;
                    return function() {
                        for (var n = [], i = 0; i < arguments.length; i++)
                            n[i] = arguments[i];
                        return r.dispatchAction.apply(r, L([t, e], n))
                    }
                }
                ,
                t.prototype.dispatchAction = function(t, e) {
                    for (var r = [], n = 2; n < arguments.length; n++)
                        r[n - 2] = arguments[n];
                    return N(this, void 0, void 0, (function() {
                        var n = this;
                        return U(this, (function(i) {
                            return [2, new Promise((function(i, o) {
                                n.responseResolvers[n.currentMsgId] = {
                                    funcKey: t,
                                    funcDef: e,
                                    resolve: i,
                                    reject: o
                                };
                                var s = n.getSubRoutineFromDef(e)
                                  , a = H(s ? s.argsDef.argNames : e.args, r, s ? s.argsDef.varArg : e.varArg)
                                  , h = s ? s.buildMessageData(n.currentMsgId, a) : a;
                                n.messenger.send(new j(n.currentMsgId,t,h)),
                                ++n.currentMsgId
                            }
                            ))]
                        }
                        ))
                    }
                    ))
                }
                ,
                t.prototype.receiveResponse = function(t) {
                    return N(this, void 0, void 0, (function() {
                        var e, r, n, i;
                        return U(this, (function(o) {
                            switch (o.label) {
                            case 0:
                                return (e = this.responseResolvers[t.uid]) ? t.success ? (r = this.getSubRoutineFromDef(e.funcDef)) ? (i = (n = e).resolve,
                                [4, r.onResponse(t.uid, t.message)]) : [3, 2] : [3, 4] : [3, 5];
                            case 1:
                                return i.apply(n, [o.sent()]),
                                [3, 3];
                            case 2:
                                e.resolve(t.message),
                                o.label = 3;
                            case 3:
                                return [3, 5];
                            case 4:
                                e.reject(t.error),
                                o.label = 5;
                            case 5:
                                return delete this.responseResolvers[t.uid],
                                [2]
                            }
                        }
                        ))
                    }
                    ))
                }
                ,
                t.prototype.getSubRoutineFromDef = function(t) {
                    if (t.subRoutine) {
                        var e = this.routines[t.subRoutine];
                        if (!e)
                            throw new Error(t.subRoutine + " sub-routine was not provided for " + t);
                        return e
                    }
                    return null
                }
                ,
                t
            }();
            function H(t, e, r) {
                if (void 0 === r && (r = !1),
                r) {
                    var n = A(t, e, t.length - 1)
                      , i = t.length - 1;
                    return n[t[i]] = e.slice(i),
                    n
                }
                return A(t, e)
            }
            var B, q, K = function() {
                function t(t) {
                    this.registration = t
                }
                return t.prototype.build = function(t) {
                    var e, r, n = {};
                    try {
                        for (var i = function(t) {
                            var e = "function" == typeof Symbol && Symbol.iterator
                              , r = e && t[e]
                              , n = 0;
                            if (r)
                                return r.call(t);
                            if (t && "number" == typeof t.length)
                                return {
                                    next: function() {
                                        return t && n >= t.length && (t = void 0),
                                        {
                                            value: t && t[n++],
                                            done: !t
                                        }
                                    }
                                };
                            throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.")
                        }(Object.keys(t)), o = i.next(); !o.done; o = i.next()) {
                            var s = o.value
                              , a = t[s];
                            if (a) {
                                var h = n[a.namespace] || {};
                                n[a.namespace] = h,
                                h[a.name] = this.registration.register(s, a)
                            }
                        }
                    } catch (t) {
                        e = {
                            error: t
                        }
                    } finally {
                        try {
                            o && !o.done && (r = i.return) && r.call(i)
                        } finally {
                            if (e)
                                throw e.error
                        }
                    }
                    return n
                }
                ,
                t
            }(), X = function() {
                function t(t) {
                    this.observer = t,
                    this.messageType = B.OBSERVATION
                }
                return t.prototype.notify = function(t) {
                    this.observer.observe(t)
                }
                ,
                t
            }(), Y = function(t) {
                this.type = Le.OBSERVABLE_SUB,
                this.payload = {
                    observableKey: t
                }
            }, Z = function(t) {
                this.type = Le.OBSERVABLE_UNSUB,
                this.payload = {
                    observableKey: t
                }
            }, Q = function(t) {
                var e = "function" == typeof Symbol && Symbol.iterator
                  , r = e && t[e]
                  , n = 0;
                if (r)
                    return r.call(t);
                if (t && "number" == typeof t.length)
                    return {
                        next: function() {
                            return t && n >= t.length && (t = void 0),
                            {
                                value: t && t[n++],
                                done: !t
                            }
                        }
                    };
                throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.")
            }, G = function() {
                function t(t) {
                    this.messenger = t,
                    this.dataCache = {},
                    this.subscribedObservers = new a,
                    this.observersToRemove = new a,
                    this.objectFactories = {},
                    this.observableToFactoryMap = {};
                    var e = new (function() {
                        function t(t) {
                            this.observables = t
                        }
                        return t.prototype.observe = function(t) {
                            this.observables.observe(t)
                        }
                        ,
                        t
                    }())(this);
                    this.observableObserver = new X(e),
                    this.messenger.addObserver(this.observableObserver)
                }
                return t.prototype.dispose = function() {
                    var t, e;
                    try {
                        for (var r = Q(this.subscribedObservers.keys), n = r.next(); !n.done; n = r.next()) {
                            var i = n.value;
                            this.messenger.send(new Z(i))
                        }
                    } catch (e) {
                        t = {
                            error: e
                        }
                    } finally {
                        try {
                            n && !n.done && (e = r.return) && e.call(r)
                        } finally {
                            if (t)
                                throw t.error
                        }
                    }
                    this.messenger.removeObserver(this.observableObserver)
                }
                ,
                t.prototype.register = function(t, e) {
                    var r = this
                      , n = function() {
                        function e() {}
                        return e.prototype.subscribe = function(e) {
                            return r.subscribe(t, e)
                        }
                        ,
                        e.prototype.waitUntil = function(e) {
                            return r.waitUntil(t, e)
                        }
                        ,
                        e
                    }();
                    if (e) {
                        var i = this.objectFactories[e];
                        if (!i)
                            throw new Error(e + " factory was not provided for " + t);
                        this.observableToFactoryMap[t] = i
                    }
                    return new n
                }
                ,
                t.prototype.initObjectFactories = function(t) {
                    for (var e, r, n = [], i = 1; i < arguments.length; i++)
                        n[i - 1] = arguments[i];
                    try {
                        for (var o = Q(n), s = o.next(); !s.done; s = o.next()) {
                            var a = s.value
                              , h = new a(t);
                            this.objectFactories[h.observableKey] = h
                        }
                    } catch (t) {
                        e = {
                            error: t
                        }
                    } finally {
                        try {
                            s && !s.done && (r = o.return) && r.call(o)
                        } finally {
                            if (e)
                                throw e.error
                        }
                    }
                }
                ,
                t.prototype.subscribe = function(t, e) {
                    if ("function" == typeof e)
                        return this.subscribeWithCallback(t, e);
                    if (e.onChanged && "function" == typeof e.onChanged)
                        return this.subscribeWithObserver(t, e);
                    throw Error("The argument provided to subscribe was not a valid observer\nExpected a function or an object with an `onChanged` function")
                }
                ,
                t.prototype.subscribeWithCallback = function(t, e) {
                    var r = function() {
                        function t() {}
                        return t.prototype.onChanged = function(t) {
                            e(t)
                        }
                        ,
                        t
                    }();
                    return this.addObserver(t, new r)
                }
                ,
                t.prototype.subscribeWithObserver = function(t, e) {
                    var r = function() {
                        function t() {}
                        return t.prototype.onChanged = function(t) {
                            e.onChanged(t)
                        }
                        ,
                        t
                    }();
                    return this.addObserver(t, new r)
                }
                ,
                t.prototype.waitUntil = function(t, e) {
                    if ("function" == typeof e)
                        return this.waitWithCallback(t, e);
                    if (e.hasOwnProperty("waitUntil") && "function" == typeof e.waitUntil)
                        return this.waitWithWaiter(t, e);
                    throw Error("The argument provided to waitUntil was not a valid waiter\nExpected a function or an object with an `waitUntil` function")
                }
                ,
                t.prototype.waitWithCallback = function(t, e) {
                    var r = this
                      , n = function() {
                        function r(t, e) {
                            this.obsIntfBuilder = t,
                            this.res = e
                        }
                        return r.prototype.onChanged = function(r) {
                            e(r) && (this.res(),
                            this.obsIntfBuilder.observersToRemove.add(t, this))
                        }
                        ,
                        r
                    }();
                    return new Promise((function(e) {
                        r.addObserver(t, new n(r,e))
                    }
                    ))
                }
                ,
                t.prototype.waitWithWaiter = function(t, e) {
                    var r = this
                      , n = function() {
                        function r(t, e) {
                            this.obsIntfBuilder = t,
                            this.res = e
                        }
                        return r.prototype.onChanged = function(r) {
                            e.waitUntil(r) && (this.res(),
                            this.obsIntfBuilder.observersToRemove.add(t, this))
                        }
                        ,
                        r
                    }();
                    return new Promise((function(e) {
                        r.addObserver(t, new n(r,e))
                    }
                    ))
                }
                ,
                t.prototype.observe = function(t) {
                    var e, r, n = t.observableKey, i = t.observableData, o = this.observableToFactoryMap[n];
                    this.dataCache[t.observableKey] = o ? o.create(i, this.dataCache[t.observableKey]) : i;
                    var s = this.subscribedObservers.getValuesAtKey(n);
                    if (s)
                        try {
                            for (var a = Q(s), h = a.next(); !h.done; h = a.next())
                                h.value.onChanged(this.dataCache[t.observableKey])
                        } catch (t) {
                            e = {
                                error: t
                            }
                        } finally {
                            try {
                                h && !h.done && (r = a.return) && r.call(a)
                            } finally {
                                if (e)
                                    throw e.error
                            }
                        }
                    this.removeDeadObservers(n)
                }
                ,
                t.prototype.addObserver = function(t, e) {
                    0 === this.subscribedObservers.valuesPerKey(t) && this.messenger.send(new Y(t)),
                    this.subscribedObservers.add(t, e);
                    var r = this.dataCache[t];
                    r && (e.onChanged(r),
                    this.removeDeadObservers(t));
                    var n = this;
                    return new (function() {
                        function r() {}
                        return r.prototype.cancel = function() {
                            n.removeObserver(t, e)
                        }
                        ,
                        r
                    }())
                }
                ,
                t.prototype.removeObserver = function(t, e) {
                    this.subscribedObservers.remove(t, e),
                    0 === this.subscribedObservers.valuesPerKey(t) && this.messenger.send(new Z(t))
                }
                ,
                t.prototype.removeDeadObservers = function(t) {
                    var e, r, n = this.observersToRemove.getValuesAtKey(t);
                    try {
                        for (var i = Q(n), o = i.next(); !o.done; o = i.next()) {
                            var s = o.value;
                            this.removeObserver(t, s),
                            this.observersToRemove.remove(t, s)
                        }
                    } catch (t) {
                        e = {
                            error: t
                        }
                    } finally {
                        try {
                            o && !o.done && (r = i.return) && r.call(i)
                        } finally {
                            if (e)
                                throw e.error
                        }
                    }
                }
                ,
                t
            }(), J = function() {
                function t(t) {
                    this.registration = t
                }
                return t.prototype.build = function(t) {
                    var e, r, n = {};
                    try {
                        for (var i = function(t) {
                            var e = "function" == typeof Symbol && Symbol.iterator
                              , r = e && t[e]
                              , n = 0;
                            if (r)
                                return r.call(t);
                            if (t && "number" == typeof t.length)
                                return {
                                    next: function() {
                                        return t && n >= t.length && (t = void 0),
                                        {
                                            value: t && t[n++],
                                            done: !t
                                        }
                                    }
                                };
                            throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.")
                        }(Object.keys(t)), o = i.next(); !o.done; o = i.next()) {
                            var s = o.value
                              , a = t[s];
                            if (a) {
                                var h = n[a.namespace] || {};
                                n[a.namespace] = h,
                                h[a.name] = this.registration.register(s, a.objectFactory)
                            }
                        }
                    } catch (t) {
                        e = {
                            error: t
                        }
                    } finally {
                        try {
                            o && !o.done && (r = i.return) && r.call(i)
                        } finally {
                            if (e)
                                throw e.error
                        }
                    }
                    return n
                }
                ,
                t
            }(), $ = function() {
                function t(t) {
                    this.observer = t,
                    this.messageType = B.COLLECTION_UPDATE
                }
                return t.prototype.notify = function(t) {
                    this.observer.observe(t)
                }
                ,
                t
            }();
            !function(t) {
                t.EVENT = "postmessage.event",
                t.RESPONSE = "postmessage.response",
                t.OBSERVATION = "postmessage.observation",
                t.COLLECTION_UPDATE = "collection.updated"
            }(B || (B = {})),
            function(t) {
                t.ITEM_ADDED = "collection.item.added",
                t.ITEM_REMOVED = "collection.item.removed",
                t.ITEM_UPDATED = "collection.item.updated",
                t.COLL_UPDATED = "collection.coll.updated"
            }(q || (q = {}));
            var tt = function(t) {
                this.type = Le.COLLECTION_SUB,
                this.payload = {
                    collectionKey: t
                }
            }
              , et = function(t) {
                this.type = Le.COLLECTION_UNSUB,
                this.payload = {
                    collectionKey: t
                }
            }
              , rt = function(t) {
                var e = "function" == typeof Symbol && Symbol.iterator
                  , r = e && t[e]
                  , n = 0;
                if (r)
                    return r.call(t);
                if (t && "number" == typeof t.length)
                    return {
                        next: function() {
                            return t && n >= t.length && (t = void 0),
                            {
                                value: t && t[n++],
                                done: !t
                            }
                        }
                    };
                throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.")
            }
              , nt = function() {
                function t(t) {
                    this.messenger = t,
                    this.collectionCache = {},
                    this.observers = new a,
                    this.elementFactories = {},
                    this.collectionToElementFactoryMap = {};
                    var e = function() {
                        function t(t) {
                            this.collectionBuilder = t
                        }
                        return t.prototype.observe = function(t) {
                            this.collectionBuilder.observe(t)
                        }
                        ,
                        t
                    }();
                    this.collectionUpdateObserver = new $(new e(this)),
                    this.messenger.addObserver(this.collectionUpdateObserver)
                }
                return t.prototype.dispose = function() {
                    var t, e;
                    try {
                        for (var r = rt(this.observers.keys), n = r.next(); !n.done; n = r.next()) {
                            var i = n.value;
                            this.messenger.send(new et(i))
                        }
                    } catch (e) {
                        t = {
                            error: e
                        }
                    } finally {
                        try {
                            n && !n.done && (e = r.return) && e.call(r)
                        } finally {
                            if (t)
                                throw t.error
                        }
                    }
                    this.messenger.removeObserver(this.collectionUpdateObserver)
                }
                ,
                t.prototype.register = function(t, e) {
                    var r = this
                      , n = function() {
                        function e() {}
                        return e.prototype.subscribe = function(e) {
                            return r.subscribe(t, e)
                        }
                        ,
                        e
                    }();
                    if (e) {
                        var i = this.elementFactories[e];
                        if (!i)
                            throw new Error(e + " element factory was not provided for " + t);
                        this.collectionToElementFactoryMap[t] = i
                    }
                    return new n
                }
                ,
                t.prototype.initElementFactories = function(t) {
                    for (var e, r, n = [], i = 1; i < arguments.length; i++)
                        n[i - 1] = arguments[i];
                    try {
                        for (var o = rt(n), s = o.next(); !s.done; s = o.next()) {
                            var a = s.value
                              , h = new a(t);
                            this.elementFactories[h.collectionKey] = h
                        }
                    } catch (t) {
                        e = {
                            error: t
                        }
                    } finally {
                        try {
                            s && !s.done && (r = o.return) && r.call(o)
                        } finally {
                            if (e)
                                throw e.error
                        }
                    }
                }
                ,
                t.prototype.observe = function(t) {
                    switch (t.operation) {
                    case q.ITEM_ADDED:
                        var e = t
                          , r = e.collectionKey
                          , n = e.collectionIndex
                          , i = e.item;
                        this.onItemAdded(r, n, i);
                        break;
                    case q.ITEM_REMOVED:
                        var o = t;
                        r = o.collectionKey,
                        n = o.collectionIndex,
                        this.onItemRemoved(r, n);
                        break;
                    case q.ITEM_UPDATED:
                        var s = t;
                        r = s.collectionKey,
                        n = s.collectionIndex,
                        i = s.item,
                        this.onItemUpdated(r, n, i);
                        break;
                    case q.COLL_UPDATED:
                        r = t.collectionKey,
                        this.onCollectionUpdated(r)
                    }
                }
                ,
                t.prototype.onItemAdded = function(t, e, r) {
                    var n, i, o = this.collectionCache[t] || {};
                    this.collectionCache[t] = o;
                    var s = this.collectionToElementFactoryMap[t];
                    o[e] = s ? s.create(r) : r;
                    var a = this.observers.getValuesAtKey(t);
                    try {
                        for (var h = rt(a), c = h.next(); !c.done; c = h.next()) {
                            var u = c.value;
                            u.onAdded && u.onAdded(e, o[e], o)
                        }
                    } catch (t) {
                        n = {
                            error: t
                        }
                    } finally {
                        try {
                            c && !c.done && (i = h.return) && i.call(h)
                        } finally {
                            if (n)
                                throw n.error
                        }
                    }
                }
                ,
                t.prototype.onItemRemoved = function(t, e) {
                    var r, n, i = this.collectionCache[t];
                    if (i) {
                        var o = i[e];
                        if (delete i[e],
                        o) {
                            var s = this.observers.getValuesAtKey(t);
                            try {
                                for (var a = rt(s), h = a.next(); !h.done; h = a.next()) {
                                    var c = h.value;
                                    c.onRemoved && c.onRemoved(e, o, i)
                                }
                            } catch (t) {
                                r = {
                                    error: t
                                }
                            } finally {
                                try {
                                    h && !h.done && (n = a.return) && n.call(a)
                                } finally {
                                    if (r)
                                        throw r.error
                                }
                            }
                        }
                    }
                }
                ,
                t.prototype.onItemUpdated = function(t, e, r) {
                    var n, i, o = this.collectionCache[t];
                    if (o) {
                        var s = this.collectionToElementFactoryMap[t];
                        s ? s.create(r, o[e]) : o[e] = r;
                        var a = this.observers.getValuesAtKey(t);
                        try {
                            for (var h = rt(a), c = h.next(); !c.done; c = h.next()) {
                                var u = c.value;
                                u.onUpdated && u.onUpdated(e, r, o)
                            }
                        } catch (t) {
                            n = {
                                error: t
                            }
                        } finally {
                            try {
                                c && !c.done && (i = h.return) && i.call(h)
                            } finally {
                                if (n)
                                    throw n.error
                            }
                        }
                    }
                }
                ,
                t.prototype.onCollectionUpdated = function(t) {
                    var e, r, n = this.collectionCache[t];
                    if (n) {
                        var i = this.observers.getValuesAtKey(t);
                        try {
                            for (var o = rt(i), s = o.next(); !s.done; s = o.next()) {
                                var a = s.value;
                                a.onCollectionUpdated && a.onCollectionUpdated(n)
                            }
                        } catch (t) {
                            e = {
                                error: t
                            }
                        } finally {
                            try {
                                s && !s.done && (r = o.return) && r.call(o)
                            } finally {
                                if (e)
                                    throw e.error
                            }
                        }
                    }
                }
                ,
                t.prototype.subscribe = function(t, e) {
                    var r, n, i = this;
                    0 === this.observers.valuesPerKey(t) && this.messenger.send(new tt(t)),
                    this.observers.add(t, e);
                    var o = this.collectionCache[t];
                    if (o) {
                        try {
                            for (var s = rt(Object.keys(o)), a = s.next(); !a.done; a = s.next()) {
                                var h = a.value;
                                e.onAdded && e.onAdded(h, o[h], o)
                            }
                        } catch (t) {
                            r = {
                                error: t
                            }
                        } finally {
                            try {
                                a && !a.done && (n = s.return) && n.call(s)
                            } finally {
                                if (r)
                                    throw r.error
                            }
                        }
                        e.onCollectionUpdated && e.onCollectionUpdated(o)
                    }
                    return {
                        cancel: function() {
                            return i.unsubscribe(t, e)
                        }
                    }
                }
                ,
                t.prototype.unsubscribe = function(t, e) {
                    this.observers.remove(t, e),
                    0 === this.observers.valuesPerKey(t) && (this.messenger.send(new et(t)),
                    delete this.collectionCache[t])
                }
                ,
                t
            }()
              , it = function() {
                function t(t) {
                    this.registration = t
                }
                return t.prototype.build = function(t) {
                    var e, r, n = {};
                    try {
                        for (var i = function(t) {
                            var e = "function" == typeof Symbol && Symbol.iterator
                              , r = e && t[e]
                              , n = 0;
                            if (r)
                                return r.call(t);
                            if (t && "number" == typeof t.length)
                                return {
                                    next: function() {
                                        return t && n >= t.length && (t = void 0),
                                        {
                                            value: t && t[n++],
                                            done: !t
                                        }
                                    }
                                };
                            throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.")
                        }(Object.keys(t)), o = i.next(); !o.done; o = i.next()) {
                            var s = o.value
                              , a = t[s];
                            if (a) {
                                var h = n[a.namespace] || {};
                                n[a.namespace] = h,
                                h[a.name] = this.registration.register(s, a.elementFactory)
                            }
                        }
                    } catch (t) {
                        e = {
                            error: t
                        }
                    } finally {
                        try {
                            o && !o.done && (r = i.return) && r.call(i)
                        } finally {
                            if (e)
                                throw e.error
                        }
                    }
                    return n
                }
                ,
                t
            }();
            const ot = [];
            for (let t = 0; t < 256; t++)
                ot[t] = (t < 16 ? "0" : "") + t.toString(16);
            let st = 1234567;
            const at = {
                DEG2RAD: Math.PI / 180,
                RAD2DEG: 180 / Math.PI,
                generateUUID: function() {
                    const t = 4294967295 * Math.random() | 0
                      , e = 4294967295 * Math.random() | 0
                      , r = 4294967295 * Math.random() | 0
                      , n = 4294967295 * Math.random() | 0;
                    return (ot[255 & t] + ot[t >> 8 & 255] + ot[t >> 16 & 255] + ot[t >> 24 & 255] + "-" + ot[255 & e] + ot[e >> 8 & 255] + "-" + ot[e >> 16 & 15 | 64] + ot[e >> 24 & 255] + "-" + ot[63 & r | 128] + ot[r >> 8 & 255] + "-" + ot[r >> 16 & 255] + ot[r >> 24 & 255] + ot[255 & n] + ot[n >> 8 & 255] + ot[n >> 16 & 255] + ot[n >> 24 & 255]).toUpperCase()
                },
                clamp: function(t, e, r) {
                    return Math.max(e, Math.min(r, t))
                },
                euclideanModulo: function(t, e) {
                    return (t % e + e) % e
                },
                mapLinear: function(t, e, r, n, i) {
                    return n + (t - e) * (i - n) / (r - e)
                },
                lerp: function(t, e, r) {
                    return (1 - r) * t + r * e
                },
                smoothstep: function(t, e, r) {
                    return t <= e ? 0 : t >= r ? 1 : (t = (t - e) / (r - e)) * t * (3 - 2 * t)
                },
                smootherstep: function(t, e, r) {
                    return t <= e ? 0 : t >= r ? 1 : (t = (t - e) / (r - e)) * t * t * (t * (6 * t - 15) + 10)
                },
                randInt: function(t, e) {
                    return t + Math.floor(Math.random() * (e - t + 1))
                },
                randFloat: function(t, e) {
                    return t + Math.random() * (e - t)
                },
                randFloatSpread: function(t) {
                    return t * (.5 - Math.random())
                },
                seededRandom: function(t) {
                    return void 0 !== t && (st = t % 2147483647),
                    st = 16807 * st % 2147483647,
                    (st - 1) / 2147483646
                },
                degToRad: function(t) {
                    return t * at.DEG2RAD
                },
                radToDeg: function(t) {
                    return t * at.RAD2DEG
                },
                isPowerOfTwo: function(t) {
                    return 0 == (t & t - 1) && 0 !== t
                },
                ceilPowerOfTwo: function(t) {
                    return Math.pow(2, Math.ceil(Math.log(t) / Math.LN2))
                },
                floorPowerOfTwo: function(t) {
                    return Math.pow(2, Math.floor(Math.log(t) / Math.LN2))
                },
                setQuaternionFromProperEuler: function(t, e, r, n, i) {
                    const o = Math.cos
                      , s = Math.sin
                      , a = o(r / 2)
                      , h = s(r / 2)
                      , c = o((e + n) / 2)
                      , u = s((e + n) / 2)
                      , l = o((e - n) / 2)
                      , f = s((e - n) / 2)
                      , d = o((n - e) / 2)
                      , p = s((n - e) / 2);
                    switch (i) {
                    case "XYX":
                        t.set(a * u, h * l, h * f, a * c);
                        break;
                    case "YZY":
                        t.set(h * f, a * u, h * l, a * c);
                        break;
                    case "ZXZ":
                        t.set(h * l, h * f, a * u, a * c);
                        break;
                    case "XZX":
                        t.set(a * u, h * p, h * d, a * c);
                        break;
                    case "YXY":
                        t.set(h * d, a * u, h * p, a * c);
                        break;
                    case "ZYZ":
                        t.set(h * p, h * d, a * u, a * c);
                        break;
                    default:
                        console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + i)
                    }
                }
            };
            class ht {
                constructor(t=0, e=0, r=0, n=1) {
                    Object.defineProperty(this, "isQuaternion", {
                        value: !0
                    }),
                    this._x = t,
                    this._y = e,
                    this._z = r,
                    this._w = n
                }
                static slerp(t, e, r, n) {
                    return r.copy(t).slerp(e, n)
                }
                static slerpFlat(t, e, r, n, i, o, s) {
                    let a = r[n + 0]
                      , h = r[n + 1]
                      , c = r[n + 2]
                      , u = r[n + 3];
                    const l = i[o + 0]
                      , f = i[o + 1]
                      , d = i[o + 2]
                      , p = i[o + 3];
                    if (u !== p || a !== l || h !== f || c !== d) {
                        let t = 1 - s;
                        const e = a * l + h * f + c * d + u * p
                          , r = e >= 0 ? 1 : -1
                          , n = 1 - e * e;
                        if (n > Number.EPSILON) {
                            const i = Math.sqrt(n)
                              , o = Math.atan2(i, e * r);
                            t = Math.sin(t * o) / i,
                            s = Math.sin(s * o) / i
                        }
                        const i = s * r;
                        if (a = a * t + l * i,
                        h = h * t + f * i,
                        c = c * t + d * i,
                        u = u * t + p * i,
                        t === 1 - s) {
                            const t = 1 / Math.sqrt(a * a + h * h + c * c + u * u);
                            a *= t,
                            h *= t,
                            c *= t,
                            u *= t
                        }
                    }
                    t[e] = a,
                    t[e + 1] = h,
                    t[e + 2] = c,
                    t[e + 3] = u
                }
                static multiplyQuaternionsFlat(t, e, r, n, i, o) {
                    const s = r[n]
                      , a = r[n + 1]
                      , h = r[n + 2]
                      , c = r[n + 3]
                      , u = i[o]
                      , l = i[o + 1]
                      , f = i[o + 2]
                      , d = i[o + 3];
                    return t[e] = s * d + c * u + a * f - h * l,
                    t[e + 1] = a * d + c * l + h * u - s * f,
                    t[e + 2] = h * d + c * f + s * l - a * u,
                    t[e + 3] = c * d - s * u - a * l - h * f,
                    t
                }
                get x() {
                    return this._x
                }
                set x(t) {
                    this._x = t,
                    this._onChangeCallback()
                }
                get y() {
                    return this._y
                }
                set y(t) {
                    this._y = t,
                    this._onChangeCallback()
                }
                get z() {
                    return this._z
                }
                set z(t) {
                    this._z = t,
                    this._onChangeCallback()
                }
                get w() {
                    return this._w
                }
                set w(t) {
                    this._w = t,
                    this._onChangeCallback()
                }
                set(t, e, r, n) {
                    return this._x = t,
                    this._y = e,
                    this._z = r,
                    this._w = n,
                    this._onChangeCallback(),
                    this
                }
                clone() {
                    return new this.constructor(this._x,this._y,this._z,this._w)
                }
                copy(t) {
                    return this._x = t.x,
                    this._y = t.y,
                    this._z = t.z,
                    this._w = t.w,
                    this._onChangeCallback(),
                    this
                }
                setFromEuler(t, e) {
                    if (!t || !t.isEuler)
                        throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");
                    const r = t._x
                      , n = t._y
                      , i = t._z
                      , o = t._order
                      , s = Math.cos
                      , a = Math.sin
                      , h = s(r / 2)
                      , c = s(n / 2)
                      , u = s(i / 2)
                      , l = a(r / 2)
                      , f = a(n / 2)
                      , d = a(i / 2);
                    switch (o) {
                    case "XYZ":
                        this._x = l * c * u + h * f * d,
                        this._y = h * f * u - l * c * d,
                        this._z = h * c * d + l * f * u,
                        this._w = h * c * u - l * f * d;
                        break;
                    case "YXZ":
                        this._x = l * c * u + h * f * d,
                        this._y = h * f * u - l * c * d,
                        this._z = h * c * d - l * f * u,
                        this._w = h * c * u + l * f * d;
                        break;
                    case "ZXY":
                        this._x = l * c * u - h * f * d,
                        this._y = h * f * u + l * c * d,
                        this._z = h * c * d + l * f * u,
                        this._w = h * c * u - l * f * d;
                        break;
                    case "ZYX":
                        this._x = l * c * u - h * f * d,
                        this._y = h * f * u + l * c * d,
                        this._z = h * c * d - l * f * u,
                        this._w = h * c * u + l * f * d;
                        break;
                    case "YZX":
                        this._x = l * c * u + h * f * d,
                        this._y = h * f * u + l * c * d,
                        this._z = h * c * d - l * f * u,
                        this._w = h * c * u - l * f * d;
                        break;
                    case "XZY":
                        this._x = l * c * u - h * f * d,
                        this._y = h * f * u - l * c * d,
                        this._z = h * c * d + l * f * u,
                        this._w = h * c * u + l * f * d;
                        break;
                    default:
                        console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + o)
                    }
                    return !1 !== e && this._onChangeCallback(),
                    this
                }
                setFromAxisAngle(t, e) {
                    const r = e / 2
                      , n = Math.sin(r);
                    return this._x = t.x * n,
                    this._y = t.y * n,
                    this._z = t.z * n,
                    this._w = Math.cos(r),
                    this._onChangeCallback(),
                    this
                }
                setFromRotationMatrix(t) {
                    const e = t.elements
                      , r = e[0]
                      , n = e[4]
                      , i = e[8]
                      , o = e[1]
                      , s = e[5]
                      , a = e[9]
                      , h = e[2]
                      , c = e[6]
                      , u = e[10]
                      , l = r + s + u;
                    if (l > 0) {
                        const t = .5 / Math.sqrt(l + 1);
                        this._w = .25 / t,
                        this._x = (c - a) * t,
                        this._y = (i - h) * t,
                        this._z = (o - n) * t
                    } else if (r > s && r > u) {
                        const t = 2 * Math.sqrt(1 + r - s - u);
                        this._w = (c - a) / t,
                        this._x = .25 * t,
                        this._y = (n + o) / t,
                        this._z = (i + h) / t
                    } else if (s > u) {
                        const t = 2 * Math.sqrt(1 + s - r - u);
                        this._w = (i - h) / t,
                        this._x = (n + o) / t,
                        this._y = .25 * t,
                        this._z = (a + c) / t
                    } else {
                        const t = 2 * Math.sqrt(1 + u - r - s);
                        this._w = (o - n) / t,
                        this._x = (i + h) / t,
                        this._y = (a + c) / t,
                        this._z = .25 * t
                    }
                    return this._onChangeCallback(),
                    this
                }
                setFromUnitVectors(t, e) {
                    let r = t.dot(e) + 1;
                    return r < 1e-6 ? (r = 0,
                    Math.abs(t.x) > Math.abs(t.z) ? (this._x = -t.y,
                    this._y = t.x,
                    this._z = 0,
                    this._w = r) : (this._x = 0,
                    this._y = -t.z,
                    this._z = t.y,
                    this._w = r)) : (this._x = t.y * e.z - t.z * e.y,
                    this._y = t.z * e.x - t.x * e.z,
                    this._z = t.x * e.y - t.y * e.x,
                    this._w = r),
                    this.normalize()
                }
                angleTo(t) {
                    return 2 * Math.acos(Math.abs(at.clamp(this.dot(t), -1, 1)))
                }
                rotateTowards(t, e) {
                    const r = this.angleTo(t);
                    if (0 === r)
                        return this;
                    const n = Math.min(1, e / r);
                    return this.slerp(t, n),
                    this
                }
                identity() {
                    return this.set(0, 0, 0, 1)
                }
                invert() {
                    return this.conjugate()
                }
                conjugate() {
                    return this._x *= -1,
                    this._y *= -1,
                    this._z *= -1,
                    this._onChangeCallback(),
                    this
                }
                dot(t) {
                    return this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w
                }
                lengthSq() {
                    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
                }
                length() {
                    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w)
                }
                normalize() {
                    let t = this.length();
                    return 0 === t ? (this._x = 0,
                    this._y = 0,
                    this._z = 0,
                    this._w = 1) : (t = 1 / t,
                    this._x = this._x * t,
                    this._y = this._y * t,
                    this._z = this._z * t,
                    this._w = this._w * t),
                    this._onChangeCallback(),
                    this
                }
                multiply(t, e) {
                    return void 0 !== e ? (console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),
                    this.multiplyQuaternions(t, e)) : this.multiplyQuaternions(this, t)
                }
                premultiply(t) {
                    return this.multiplyQuaternions(t, this)
                }
                multiplyQuaternions(t, e) {
                    const r = t._x
                      , n = t._y
                      , i = t._z
                      , o = t._w
                      , s = e._x
                      , a = e._y
                      , h = e._z
                      , c = e._w;
                    return this._x = r * c + o * s + n * h - i * a,
                    this._y = n * c + o * a + i * s - r * h,
                    this._z = i * c + o * h + r * a - n * s,
                    this._w = o * c - r * s - n * a - i * h,
                    this._onChangeCallback(),
                    this
                }
                slerp(t, e) {
                    if (0 === e)
                        return this;
                    if (1 === e)
                        return this.copy(t);
                    const r = this._x
                      , n = this._y
                      , i = this._z
                      , o = this._w;
                    let s = o * t._w + r * t._x + n * t._y + i * t._z;
                    if (s < 0 ? (this._w = -t._w,
                    this._x = -t._x,
                    this._y = -t._y,
                    this._z = -t._z,
                    s = -s) : this.copy(t),
                    s >= 1)
                        return this._w = o,
                        this._x = r,
                        this._y = n,
                        this._z = i,
                        this;
                    const a = 1 - s * s;
                    if (a <= Number.EPSILON) {
                        const t = 1 - e;
                        return this._w = t * o + e * this._w,
                        this._x = t * r + e * this._x,
                        this._y = t * n + e * this._y,
                        this._z = t * i + e * this._z,
                        this.normalize(),
                        this._onChangeCallback(),
                        this
                    }
                    const h = Math.sqrt(a)
                      , c = Math.atan2(h, s)
                      , u = Math.sin((1 - e) * c) / h
                      , l = Math.sin(e * c) / h;
                    return this._w = o * u + this._w * l,
                    this._x = r * u + this._x * l,
                    this._y = n * u + this._y * l,
                    this._z = i * u + this._z * l,
                    this._onChangeCallback(),
                    this
                }
                equals(t) {
                    return t._x === this._x && t._y === this._y && t._z === this._z && t._w === this._w
                }
                fromArray(t, e=0) {
                    return this._x = t[e],
                    this._y = t[e + 1],
                    this._z = t[e + 2],
                    this._w = t[e + 3],
                    this._onChangeCallback(),
                    this
                }
                toArray(t=[], e=0) {
                    return t[e] = this._x,
                    t[e + 1] = this._y,
                    t[e + 2] = this._z,
                    t[e + 3] = this._w,
                    t
                }
                fromBufferAttribute(t, e) {
                    return this._x = t.getX(e),
                    this._y = t.getY(e),
                    this._z = t.getZ(e),
                    this._w = t.getW(e),
                    this
                }
                _onChange(t) {
                    return this._onChangeCallback = t,
                    this
                }
                _onChangeCallback() {}
            }
            class ct {
                constructor(t=0, e=0, r=0) {
                    Object.defineProperty(this, "isVector3", {
                        value: !0
                    }),
                    this.x = t,
                    this.y = e,
                    this.z = r
                }
                set(t, e, r) {
                    return void 0 === r && (r = this.z),
                    this.x = t,
                    this.y = e,
                    this.z = r,
                    this
                }
                setScalar(t) {
                    return this.x = t,
                    this.y = t,
                    this.z = t,
                    this
                }
                setX(t) {
                    return this.x = t,
                    this
                }
                setY(t) {
                    return this.y = t,
                    this
                }
                setZ(t) {
                    return this.z = t,
                    this
                }
                setComponent(t, e) {
                    switch (t) {
                    case 0:
                        this.x = e;
                        break;
                    case 1:
                        this.y = e;
                        break;
                    case 2:
                        this.z = e;
                        break;
                    default:
                        throw new Error("index is out of range: " + t)
                    }
                    return this
                }
                getComponent(t) {
                    switch (t) {
                    case 0:
                        return this.x;
                    case 1:
                        return this.y;
                    case 2:
                        return this.z;
                    default:
                        throw new Error("index is out of range: " + t)
                    }
                }
                clone() {
                    return new this.constructor(this.x,this.y,this.z)
                }
                copy(t) {
                    return this.x = t.x,
                    this.y = t.y,
                    this.z = t.z,
                    this
                }
                add(t, e) {
                    return void 0 !== e ? (console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),
                    this.addVectors(t, e)) : (this.x += t.x,
                    this.y += t.y,
                    this.z += t.z,
                    this)
                }
                addScalar(t) {
                    return this.x += t,
                    this.y += t,
                    this.z += t,
                    this
                }
                addVectors(t, e) {
                    return this.x = t.x + e.x,
                    this.y = t.y + e.y,
                    this.z = t.z + e.z,
                    this
                }
                addScaledVector(t, e) {
                    return this.x += t.x * e,
                    this.y += t.y * e,
                    this.z += t.z * e,
                    this
                }
                sub(t, e) {
                    return void 0 !== e ? (console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),
                    this.subVectors(t, e)) : (this.x -= t.x,
                    this.y -= t.y,
                    this.z -= t.z,
                    this)
                }
                subScalar(t) {
                    return this.x -= t,
                    this.y -= t,
                    this.z -= t,
                    this
                }
                subVectors(t, e) {
                    return this.x = t.x - e.x,
                    this.y = t.y - e.y,
                    this.z = t.z - e.z,
                    this
                }
                multiply(t, e) {
                    return void 0 !== e ? (console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."),
                    this.multiplyVectors(t, e)) : (this.x *= t.x,
                    this.y *= t.y,
                    this.z *= t.z,
                    this)
                }
                multiplyScalar(t) {
                    return this.x *= t,
                    this.y *= t,
                    this.z *= t,
                    this
                }
                multiplyVectors(t, e) {
                    return this.x = t.x * e.x,
                    this.y = t.y * e.y,
                    this.z = t.z * e.z,
                    this
                }
                applyEuler(t) {
                    return t && t.isEuler || console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."),
                    this.applyQuaternion(lt.setFromEuler(t))
                }
                applyAxisAngle(t, e) {
                    return this.applyQuaternion(lt.setFromAxisAngle(t, e))
                }
                applyMatrix3(t) {
                    const e = this.x
                      , r = this.y
                      , n = this.z
                      , i = t.elements;
                    return this.x = i[0] * e + i[3] * r + i[6] * n,
                    this.y = i[1] * e + i[4] * r + i[7] * n,
                    this.z = i[2] * e + i[5] * r + i[8] * n,
                    this
                }
                applyNormalMatrix(t) {
                    return this.applyMatrix3(t).normalize()
                }
                applyMatrix4(t) {
                    const e = this.x
                      , r = this.y
                      , n = this.z
                      , i = t.elements
                      , o = 1 / (i[3] * e + i[7] * r + i[11] * n + i[15]);
                    return this.x = (i[0] * e + i[4] * r + i[8] * n + i[12]) * o,
                    this.y = (i[1] * e + i[5] * r + i[9] * n + i[13]) * o,
                    this.z = (i[2] * e + i[6] * r + i[10] * n + i[14]) * o,
                    this
                }
                applyQuaternion(t) {
                    const e = this.x
                      , r = this.y
                      , n = this.z
                      , i = t.x
                      , o = t.y
                      , s = t.z
                      , a = t.w
                      , h = a * e + o * n - s * r
                      , c = a * r + s * e - i * n
                      , u = a * n + i * r - o * e
                      , l = -i * e - o * r - s * n;
                    return this.x = h * a + l * -i + c * -s - u * -o,
                    this.y = c * a + l * -o + u * -i - h * -s,
                    this.z = u * a + l * -s + h * -o - c * -i,
                    this
                }
                project(t) {
                    return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)
                }
                unproject(t) {
                    return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)
                }
                transformDirection(t) {
                    const e = this.x
                      , r = this.y
                      , n = this.z
                      , i = t.elements;
                    return this.x = i[0] * e + i[4] * r + i[8] * n,
                    this.y = i[1] * e + i[5] * r + i[9] * n,
                    this.z = i[2] * e + i[6] * r + i[10] * n,
                    this.normalize()
                }
                divide(t) {
                    return this.x /= t.x,
                    this.y /= t.y,
                    this.z /= t.z,
                    this
                }
                divideScalar(t) {
                    return this.multiplyScalar(1 / t)
                }
                min(t) {
                    return this.x = Math.min(this.x, t.x),
                    this.y = Math.min(this.y, t.y),
                    this.z = Math.min(this.z, t.z),
                    this
                }
                max(t) {
                    return this.x = Math.max(this.x, t.x),
                    this.y = Math.max(this.y, t.y),
                    this.z = Math.max(this.z, t.z),
                    this
                }
                clamp(t, e) {
                    return this.x = Math.max(t.x, Math.min(e.x, this.x)),
                    this.y = Math.max(t.y, Math.min(e.y, this.y)),
                    this.z = Math.max(t.z, Math.min(e.z, this.z)),
                    this
                }
                clampScalar(t, e) {
                    return this.x = Math.max(t, Math.min(e, this.x)),
                    this.y = Math.max(t, Math.min(e, this.y)),
                    this.z = Math.max(t, Math.min(e, this.z)),
                    this
                }
                clampLength(t, e) {
                    const r = this.length();
                    return this.divideScalar(r || 1).multiplyScalar(Math.max(t, Math.min(e, r)))
                }
                floor() {
                    return this.x = Math.floor(this.x),
                    this.y = Math.floor(this.y),
                    this.z = Math.floor(this.z),
                    this
                }
                ceil() {
                    return this.x = Math.ceil(this.x),
                    this.y = Math.ceil(this.y),
                    this.z = Math.ceil(this.z),
                    this
                }
                round() {
                    return this.x = Math.round(this.x),
                    this.y = Math.round(this.y),
                    this.z = Math.round(this.z),
                    this
                }
                roundToZero() {
                    return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x),
                    this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y),
                    this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z),
                    this
                }
                negate() {
                    return this.x = -this.x,
                    this.y = -this.y,
                    this.z = -this.z,
                    this
                }
                dot(t) {
                    return this.x * t.x + this.y * t.y + this.z * t.z
                }
                lengthSq() {
                    return this.x * this.x + this.y * this.y + this.z * this.z
                }
                length() {
                    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
                }
                manhattanLength() {
                    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
                }
                normalize() {
                    return this.divideScalar(this.length() || 1)
                }
                setLength(t) {
                    return this.normalize().multiplyScalar(t)
                }
                lerp(t, e) {
                    return this.x += (t.x - this.x) * e,
                    this.y += (t.y - this.y) * e,
                    this.z += (t.z - this.z) * e,
                    this
                }
                lerpVectors(t, e, r) {
                    return this.x = t.x + (e.x - t.x) * r,
                    this.y = t.y + (e.y - t.y) * r,
                    this.z = t.z + (e.z - t.z) * r,
                    this
                }
                cross(t, e) {
                    return void 0 !== e ? (console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."),
                    this.crossVectors(t, e)) : this.crossVectors(this, t)
                }
                crossVectors(t, e) {
                    const r = t.x
                      , n = t.y
                      , i = t.z
                      , o = e.x
                      , s = e.y
                      , a = e.z;
                    return this.x = n * a - i * s,
                    this.y = i * o - r * a,
                    this.z = r * s - n * o,
                    this
                }
                projectOnVector(t) {
                    const e = t.lengthSq();
                    if (0 === e)
                        return this.set(0, 0, 0);
                    const r = t.dot(this) / e;
                    return this.copy(t).multiplyScalar(r)
                }
                projectOnPlane(t) {
                    return ut.copy(this).projectOnVector(t),
                    this.sub(ut)
                }
                reflect(t) {
                    return this.sub(ut.copy(t).multiplyScalar(2 * this.dot(t)))
                }
                angleTo(t) {
                    const e = Math.sqrt(this.lengthSq() * t.lengthSq());
                    if (0 === e)
                        return Math.PI / 2;
                    const r = this.dot(t) / e;
                    return Math.acos(at.clamp(r, -1, 1))
                }
                distanceTo(t) {
                    return Math.sqrt(this.distanceToSquared(t))
                }
                distanceToSquared(t) {
                    const e = this.x - t.x
                      , r = this.y - t.y
                      , n = this.z - t.z;
                    return e * e + r * r + n * n
                }
                manhattanDistanceTo(t) {
                    return Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z)
                }
                setFromSpherical(t) {
                    return this.setFromSphericalCoords(t.radius, t.phi, t.theta)
                }
                setFromSphericalCoords(t, e, r) {
                    const n = Math.sin(e) * t;
                    return this.x = n * Math.sin(r),
                    this.y = Math.cos(e) * t,
                    this.z = n * Math.cos(r),
                    this
                }
                setFromCylindrical(t) {
                    return this.setFromCylindricalCoords(t.radius, t.theta, t.y)
                }
                setFromCylindricalCoords(t, e, r) {
                    return this.x = t * Math.sin(e),
                    this.y = r,
                    this.z = t * Math.cos(e),
                    this
                }
                setFromMatrixPosition(t) {
                    const e = t.elements;
                    return this.x = e[12],
                    this.y = e[13],
                    this.z = e[14],
                    this
                }
                setFromMatrixScale(t) {
                    const e = this.setFromMatrixColumn(t, 0).length()
                      , r = this.setFromMatrixColumn(t, 1).length()
                      , n = this.setFromMatrixColumn(t, 2).length();
                    return this.x = e,
                    this.y = r,
                    this.z = n,
                    this
                }
                setFromMatrixColumn(t, e) {
                    return this.fromArray(t.elements, 4 * e)
                }
                setFromMatrix3Column(t, e) {
                    return this.fromArray(t.elements, 3 * e)
                }
                equals(t) {
                    return t.x === this.x && t.y === this.y && t.z === this.z
                }
                fromArray(t, e=0) {
                    return this.x = t[e],
                    this.y = t[e + 1],
                    this.z = t[e + 2],
                    this
                }
                toArray(t=[], e=0) {
                    return t[e] = this.x,
                    t[e + 1] = this.y,
                    t[e + 2] = this.z,
                    t
                }
                fromBufferAttribute(t, e, r) {
                    return void 0 !== r && console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."),
                    this.x = t.getX(e),
                    this.y = t.getY(e),
                    this.z = t.getZ(e),
                    this
                }
                random() {
                    return this.x = Math.random(),
                    this.y = Math.random(),
                    this.z = Math.random(),
                    this
                }
            }
            const ut = new ct
              , lt = new ht;
            class ft {
                constructor() {
                    Object.defineProperty(this, "isMatrix4", {
                        value: !0
                    }),
                    this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                    arguments.length > 0 && console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")
                }
                set(t, e, r, n, i, o, s, a, h, c, u, l, f, d, p, y) {
                    const m = this.elements;
                    return m[0] = t,
                    m[4] = e,
                    m[8] = r,
                    m[12] = n,
                    m[1] = i,
                    m[5] = o,
                    m[9] = s,
                    m[13] = a,
                    m[2] = h,
                    m[6] = c,
                    m[10] = u,
                    m[14] = l,
                    m[3] = f,
                    m[7] = d,
                    m[11] = p,
                    m[15] = y,
                    this
                }
                identity() {
                    return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1),
                    this
                }
                clone() {
                    return (new ft).fromArray(this.elements)
                }
                copy(t) {
                    const e = this.elements
                      , r = t.elements;
                    return e[0] = r[0],
                    e[1] = r[1],
                    e[2] = r[2],
                    e[3] = r[3],
                    e[4] = r[4],
                    e[5] = r[5],
                    e[6] = r[6],
                    e[7] = r[7],
                    e[8] = r[8],
                    e[9] = r[9],
                    e[10] = r[10],
                    e[11] = r[11],
                    e[12] = r[12],
                    e[13] = r[13],
                    e[14] = r[14],
                    e[15] = r[15],
                    this
                }
                copyPosition(t) {
                    const e = this.elements
                      , r = t.elements;
                    return e[12] = r[12],
                    e[13] = r[13],
                    e[14] = r[14],
                    this
                }
                extractBasis(t, e, r) {
                    return t.setFromMatrixColumn(this, 0),
                    e.setFromMatrixColumn(this, 1),
                    r.setFromMatrixColumn(this, 2),
                    this
                }
                makeBasis(t, e, r) {
                    return this.set(t.x, e.x, r.x, 0, t.y, e.y, r.y, 0, t.z, e.z, r.z, 0, 0, 0, 0, 1),
                    this
                }
                extractRotation(t) {
                    const e = this.elements
                      , r = t.elements
                      , n = 1 / dt.setFromMatrixColumn(t, 0).length()
                      , i = 1 / dt.setFromMatrixColumn(t, 1).length()
                      , o = 1 / dt.setFromMatrixColumn(t, 2).length();
                    return e[0] = r[0] * n,
                    e[1] = r[1] * n,
                    e[2] = r[2] * n,
                    e[3] = 0,
                    e[4] = r[4] * i,
                    e[5] = r[5] * i,
                    e[6] = r[6] * i,
                    e[7] = 0,
                    e[8] = r[8] * o,
                    e[9] = r[9] * o,
                    e[10] = r[10] * o,
                    e[11] = 0,
                    e[12] = 0,
                    e[13] = 0,
                    e[14] = 0,
                    e[15] = 1,
                    this
                }
                makeRotationFromEuler(t) {
                    t && t.isEuler || console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
                    const e = this.elements
                      , r = t.x
                      , n = t.y
                      , i = t.z
                      , o = Math.cos(r)
                      , s = Math.sin(r)
                      , a = Math.cos(n)
                      , h = Math.sin(n)
                      , c = Math.cos(i)
                      , u = Math.sin(i);
                    if ("XYZ" === t.order) {
                        const t = o * c
                          , r = o * u
                          , n = s * c
                          , i = s * u;
                        e[0] = a * c,
                        e[4] = -a * u,
                        e[8] = h,
                        e[1] = r + n * h,
                        e[5] = t - i * h,
                        e[9] = -s * a,
                        e[2] = i - t * h,
                        e[6] = n + r * h,
                        e[10] = o * a
                    } else if ("YXZ" === t.order) {
                        const t = a * c
                          , r = a * u
                          , n = h * c
                          , i = h * u;
                        e[0] = t + i * s,
                        e[4] = n * s - r,
                        e[8] = o * h,
                        e[1] = o * u,
                        e[5] = o * c,
                        e[9] = -s,
                        e[2] = r * s - n,
                        e[6] = i + t * s,
                        e[10] = o * a
                    } else if ("ZXY" === t.order) {
                        const t = a * c
                          , r = a * u
                          , n = h * c
                          , i = h * u;
                        e[0] = t - i * s,
                        e[4] = -o * u,
                        e[8] = n + r * s,
                        e[1] = r + n * s,
                        e[5] = o * c,
                        e[9] = i - t * s,
                        e[2] = -o * h,
                        e[6] = s,
                        e[10] = o * a
                    } else if ("ZYX" === t.order) {
                        const t = o * c
                          , r = o * u
                          , n = s * c
                          , i = s * u;
                        e[0] = a * c,
                        e[4] = n * h - r,
                        e[8] = t * h + i,
                        e[1] = a * u,
                        e[5] = i * h + t,
                        e[9] = r * h - n,
                        e[2] = -h,
                        e[6] = s * a,
                        e[10] = o * a
                    } else if ("YZX" === t.order) {
                        const t = o * a
                          , r = o * h
                          , n = s * a
                          , i = s * h;
                        e[0] = a * c,
                        e[4] = i - t * u,
                        e[8] = n * u + r,
                        e[1] = u,
                        e[5] = o * c,
                        e[9] = -s * c,
                        e[2] = -h * c,
                        e[6] = r * u + n,
                        e[10] = t - i * u
                    } else if ("XZY" === t.order) {
                        const t = o * a
                          , r = o * h
                          , n = s * a
                          , i = s * h;
                        e[0] = a * c,
                        e[4] = -u,
                        e[8] = h * c,
                        e[1] = t * u + i,
                        e[5] = o * c,
                        e[9] = r * u - n,
                        e[2] = n * u - r,
                        e[6] = s * c,
                        e[10] = i * u + t
                    }
                    return e[3] = 0,
                    e[7] = 0,
                    e[11] = 0,
                    e[12] = 0,
                    e[13] = 0,
                    e[14] = 0,
                    e[15] = 1,
                    this
                }
                makeRotationFromQuaternion(t) {
                    return this.compose(yt, t, mt)
                }
                lookAt(t, e, r) {
                    const n = this.elements;
                    return gt.subVectors(t, e),
                    0 === gt.lengthSq() && (gt.z = 1),
                    gt.normalize(),
                    vt.crossVectors(r, gt),
                    0 === vt.lengthSq() && (1 === Math.abs(r.z) ? gt.x += 1e-4 : gt.z += 1e-4,
                    gt.normalize(),
                    vt.crossVectors(r, gt)),
                    vt.normalize(),
                    bt.crossVectors(gt, vt),
                    n[0] = vt.x,
                    n[4] = bt.x,
                    n[8] = gt.x,
                    n[1] = vt.y,
                    n[5] = bt.y,
                    n[9] = gt.y,
                    n[2] = vt.z,
                    n[6] = bt.z,
                    n[10] = gt.z,
                    this
                }
                multiply(t, e) {
                    return void 0 !== e ? (console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."),
                    this.multiplyMatrices(t, e)) : this.multiplyMatrices(this, t)
                }
                premultiply(t) {
                    return this.multiplyMatrices(t, this)
                }
                multiplyMatrices(t, e) {
                    const r = t.elements
                      , n = e.elements
                      , i = this.elements
                      , o = r[0]
                      , s = r[4]
                      , a = r[8]
                      , h = r[12]
                      , c = r[1]
                      , u = r[5]
                      , l = r[9]
                      , f = r[13]
                      , d = r[2]
                      , p = r[6]
                      , y = r[10]
                      , m = r[14]
                      , v = r[3]
                      , b = r[7]
                      , g = r[11]
                      , x = r[15]
                      , w = n[0]
                      , _ = n[4]
                      , M = n[8]
                      , O = n[12]
                      , C = n[1]
                      , E = n[5]
                      , z = n[9]
                      , S = n[13]
                      , R = n[2]
                      , I = n[6]
                      , T = n[10]
                      , D = n[14]
                      , k = n[3]
                      , P = n[7]
                      , j = n[11]
                      , A = n[15];
                    return i[0] = o * w + s * C + a * R + h * k,
                    i[4] = o * _ + s * E + a * I + h * P,
                    i[8] = o * M + s * z + a * T + h * j,
                    i[12] = o * O + s * S + a * D + h * A,
                    i[1] = c * w + u * C + l * R + f * k,
                    i[5] = c * _ + u * E + l * I + f * P,
                    i[9] = c * M + u * z + l * T + f * j,
                    i[13] = c * O + u * S + l * D + f * A,
                    i[2] = d * w + p * C + y * R + m * k,
                    i[6] = d * _ + p * E + y * I + m * P,
                    i[10] = d * M + p * z + y * T + m * j,
                    i[14] = d * O + p * S + y * D + m * A,
                    i[3] = v * w + b * C + g * R + x * k,
                    i[7] = v * _ + b * E + g * I + x * P,
                    i[11] = v * M + b * z + g * T + x * j,
                    i[15] = v * O + b * S + g * D + x * A,
                    this
                }
                multiplyScalar(t) {
                    const e = this.elements;
                    return e[0] *= t,
                    e[4] *= t,
                    e[8] *= t,
                    e[12] *= t,
                    e[1] *= t,
                    e[5] *= t,
                    e[9] *= t,
                    e[13] *= t,
                    e[2] *= t,
                    e[6] *= t,
                    e[10] *= t,
                    e[14] *= t,
                    e[3] *= t,
                    e[7] *= t,
                    e[11] *= t,
                    e[15] *= t,
                    this
                }
                determinant() {
                    const t = this.elements
                      , e = t[0]
                      , r = t[4]
                      , n = t[8]
                      , i = t[12]
                      , o = t[1]
                      , s = t[5]
                      , a = t[9]
                      , h = t[13]
                      , c = t[2]
                      , u = t[6]
                      , l = t[10]
                      , f = t[14];
                    return t[3] * (+i * a * u - n * h * u - i * s * l + r * h * l + n * s * f - r * a * f) + t[7] * (+e * a * f - e * h * l + i * o * l - n * o * f + n * h * c - i * a * c) + t[11] * (+e * h * u - e * s * f - i * o * u + r * o * f + i * s * c - r * h * c) + t[15] * (-n * s * c - e * a * u + e * s * l + n * o * u - r * o * l + r * a * c)
                }
                transpose() {
                    const t = this.elements;
                    let e;
                    return e = t[1],
                    t[1] = t[4],
                    t[4] = e,
                    e = t[2],
                    t[2] = t[8],
                    t[8] = e,
                    e = t[6],
                    t[6] = t[9],
                    t[9] = e,
                    e = t[3],
                    t[3] = t[12],
                    t[12] = e,
                    e = t[7],
                    t[7] = t[13],
                    t[13] = e,
                    e = t[11],
                    t[11] = t[14],
                    t[14] = e,
                    this
                }
                setPosition(t, e, r) {
                    const n = this.elements;
                    return t.isVector3 ? (n[12] = t.x,
                    n[13] = t.y,
                    n[14] = t.z) : (n[12] = t,
                    n[13] = e,
                    n[14] = r),
                    this
                }
                invert() {
                    const t = this.elements
                      , e = t[0]
                      , r = t[1]
                      , n = t[2]
                      , i = t[3]
                      , o = t[4]
                      , s = t[5]
                      , a = t[6]
                      , h = t[7]
                      , c = t[8]
                      , u = t[9]
                      , l = t[10]
                      , f = t[11]
                      , d = t[12]
                      , p = t[13]
                      , y = t[14]
                      , m = t[15]
                      , v = u * y * h - p * l * h + p * a * f - s * y * f - u * a * m + s * l * m
                      , b = d * l * h - c * y * h - d * a * f + o * y * f + c * a * m - o * l * m
                      , g = c * p * h - d * u * h + d * s * f - o * p * f - c * s * m + o * u * m
                      , x = d * u * a - c * p * a - d * s * l + o * p * l + c * s * y - o * u * y
                      , w = e * v + r * b + n * g + i * x;
                    if (0 === w)
                        return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                    const _ = 1 / w;
                    return t[0] = v * _,
                    t[1] = (p * l * i - u * y * i - p * n * f + r * y * f + u * n * m - r * l * m) * _,
                    t[2] = (s * y * i - p * a * i + p * n * h - r * y * h - s * n * m + r * a * m) * _,
                    t[3] = (u * a * i - s * l * i - u * n * h + r * l * h + s * n * f - r * a * f) * _,
                    t[4] = b * _,
                    t[5] = (c * y * i - d * l * i + d * n * f - e * y * f - c * n * m + e * l * m) * _,
                    t[6] = (d * a * i - o * y * i - d * n * h + e * y * h + o * n * m - e * a * m) * _,
                    t[7] = (o * l * i - c * a * i + c * n * h - e * l * h - o * n * f + e * a * f) * _,
                    t[8] = g * _,
                    t[9] = (d * u * i - c * p * i - d * r * f + e * p * f + c * r * m - e * u * m) * _,
                    t[10] = (o * p * i - d * s * i + d * r * h - e * p * h - o * r * m + e * s * m) * _,
                    t[11] = (c * s * i - o * u * i - c * r * h + e * u * h + o * r * f - e * s * f) * _,
                    t[12] = x * _,
                    t[13] = (c * p * n - d * u * n + d * r * l - e * p * l - c * r * y + e * u * y) * _,
                    t[14] = (d * s * n - o * p * n - d * r * a + e * p * a + o * r * y - e * s * y) * _,
                    t[15] = (o * u * n - c * s * n + c * r * a - e * u * a - o * r * l + e * s * l) * _,
                    this
                }
                scale(t) {
                    const e = this.elements
                      , r = t.x
                      , n = t.y
                      , i = t.z;
                    return e[0] *= r,
                    e[4] *= n,
                    e[8] *= i,
                    e[1] *= r,
                    e[5] *= n,
                    e[9] *= i,
                    e[2] *= r,
                    e[6] *= n,
                    e[10] *= i,
                    e[3] *= r,
                    e[7] *= n,
                    e[11] *= i,
                    this
                }
                getMaxScaleOnAxis() {
                    const t = this.elements
                      , e = t[0] * t[0] + t[1] * t[1] + t[2] * t[2]
                      , r = t[4] * t[4] + t[5] * t[5] + t[6] * t[6]
                      , n = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
                    return Math.sqrt(Math.max(e, r, n))
                }
                makeTranslation(t, e, r) {
                    return this.set(1, 0, 0, t, 0, 1, 0, e, 0, 0, 1, r, 0, 0, 0, 1),
                    this
                }
                makeRotationX(t) {
                    const e = Math.cos(t)
                      , r = Math.sin(t);
                    return this.set(1, 0, 0, 0, 0, e, -r, 0, 0, r, e, 0, 0, 0, 0, 1),
                    this
                }
                makeRotationY(t) {
                    const e = Math.cos(t)
                      , r = Math.sin(t);
                    return this.set(e, 0, r, 0, 0, 1, 0, 0, -r, 0, e, 0, 0, 0, 0, 1),
                    this
                }
                makeRotationZ(t) {
                    const e = Math.cos(t)
                      , r = Math.sin(t);
                    return this.set(e, -r, 0, 0, r, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1),
                    this
                }
                makeRotationAxis(t, e) {
                    const r = Math.cos(e)
                      , n = Math.sin(e)
                      , i = 1 - r
                      , o = t.x
                      , s = t.y
                      , a = t.z
                      , h = i * o
                      , c = i * s;
                    return this.set(h * o + r, h * s - n * a, h * a + n * s, 0, h * s + n * a, c * s + r, c * a - n * o, 0, h * a - n * s, c * a + n * o, i * a * a + r, 0, 0, 0, 0, 1),
                    this
                }
                makeScale(t, e, r) {
                    return this.set(t, 0, 0, 0, 0, e, 0, 0, 0, 0, r, 0, 0, 0, 0, 1),
                    this
                }
                makeShear(t, e, r) {
                    return this.set(1, e, r, 0, t, 1, r, 0, t, e, 1, 0, 0, 0, 0, 1),
                    this
                }
                compose(t, e, r) {
                    const n = this.elements
                      , i = e._x
                      , o = e._y
                      , s = e._z
                      , a = e._w
                      , h = i + i
                      , c = o + o
                      , u = s + s
                      , l = i * h
                      , f = i * c
                      , d = i * u
                      , p = o * c
                      , y = o * u
                      , m = s * u
                      , v = a * h
                      , b = a * c
                      , g = a * u
                      , x = r.x
                      , w = r.y
                      , _ = r.z;
                    return n[0] = (1 - (p + m)) * x,
                    n[1] = (f + g) * x,
                    n[2] = (d - b) * x,
                    n[3] = 0,
                    n[4] = (f - g) * w,
                    n[5] = (1 - (l + m)) * w,
                    n[6] = (y + v) * w,
                    n[7] = 0,
                    n[8] = (d + b) * _,
                    n[9] = (y - v) * _,
                    n[10] = (1 - (l + p)) * _,
                    n[11] = 0,
                    n[12] = t.x,
                    n[13] = t.y,
                    n[14] = t.z,
                    n[15] = 1,
                    this
                }
                decompose(t, e, r) {
                    const n = this.elements;
                    let i = dt.set(n[0], n[1], n[2]).length();
                    const o = dt.set(n[4], n[5], n[6]).length()
                      , s = dt.set(n[8], n[9], n[10]).length();
                    this.determinant() < 0 && (i = -i),
                    t.x = n[12],
                    t.y = n[13],
                    t.z = n[14],
                    pt.copy(this);
                    const a = 1 / i
                      , h = 1 / o
                      , c = 1 / s;
                    return pt.elements[0] *= a,
                    pt.elements[1] *= a,
                    pt.elements[2] *= a,
                    pt.elements[4] *= h,
                    pt.elements[5] *= h,
                    pt.elements[6] *= h,
                    pt.elements[8] *= c,
                    pt.elements[9] *= c,
                    pt.elements[10] *= c,
                    e.setFromRotationMatrix(pt),
                    r.x = i,
                    r.y = o,
                    r.z = s,
                    this
                }
                makePerspective(t, e, r, n, i, o) {
                    void 0 === o && console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");
                    const s = this.elements
                      , a = 2 * i / (e - t)
                      , h = 2 * i / (r - n)
                      , c = (e + t) / (e - t)
                      , u = (r + n) / (r - n)
                      , l = -(o + i) / (o - i)
                      , f = -2 * o * i / (o - i);
                    return s[0] = a,
                    s[4] = 0,
                    s[8] = c,
                    s[12] = 0,
                    s[1] = 0,
                    s[5] = h,
                    s[9] = u,
                    s[13] = 0,
                    s[2] = 0,
                    s[6] = 0,
                    s[10] = l,
                    s[14] = f,
                    s[3] = 0,
                    s[7] = 0,
                    s[11] = -1,
                    s[15] = 0,
                    this
                }
                makeOrthographic(t, e, r, n, i, o) {
                    const s = this.elements
                      , a = 1 / (e - t)
                      , h = 1 / (r - n)
                      , c = 1 / (o - i)
                      , u = (e + t) * a
                      , l = (r + n) * h
                      , f = (o + i) * c;
                    return s[0] = 2 * a,
                    s[4] = 0,
                    s[8] = 0,
                    s[12] = -u,
                    s[1] = 0,
                    s[5] = 2 * h,
                    s[9] = 0,
                    s[13] = -l,
                    s[2] = 0,
                    s[6] = 0,
                    s[10] = -2 * c,
                    s[14] = -f,
                    s[3] = 0,
                    s[7] = 0,
                    s[11] = 0,
                    s[15] = 1,
                    this
                }
                equals(t) {
                    const e = this.elements
                      , r = t.elements;
                    for (let t = 0; t < 16; t++)
                        if (e[t] !== r[t])
                            return !1;
                    return !0
                }
                fromArray(t, e=0) {
                    for (let r = 0; r < 16; r++)
                        this.elements[r] = t[r + e];
                    return this
                }
                toArray(t=[], e=0) {
                    const r = this.elements;
                    return t[e] = r[0],
                    t[e + 1] = r[1],
                    t[e + 2] = r[2],
                    t[e + 3] = r[3],
                    t[e + 4] = r[4],
                    t[e + 5] = r[5],
                    t[e + 6] = r[6],
                    t[e + 7] = r[7],
                    t[e + 8] = r[8],
                    t[e + 9] = r[9],
                    t[e + 10] = r[10],
                    t[e + 11] = r[11],
                    t[e + 12] = r[12],
                    t[e + 13] = r[13],
                    t[e + 14] = r[14],
                    t[e + 15] = r[15],
                    t
                }
            }
            const dt = new ct
              , pt = new ft
              , yt = new ct(0,0,0)
              , mt = new ct(1,1,1)
              , vt = new ct
              , bt = new ct
              , gt = new ct;
            class xt {
                constructor(t=0, e=0, r=0, n=xt.DefaultOrder) {
                    Object.defineProperty(this, "isEuler", {
                        value: !0
                    }),
                    this._x = t,
                    this._y = e,
                    this._z = r,
                    this._order = n
                }
                get x() {
                    return this._x
                }
                set x(t) {
                    this._x = t,
                    this._onChangeCallback()
                }
                get y() {
                    return this._y
                }
                set y(t) {
                    this._y = t,
                    this._onChangeCallback()
                }
                get z() {
                    return this._z
                }
                set z(t) {
                    this._z = t,
                    this._onChangeCallback()
                }
                get order() {
                    return this._order
                }
                set order(t) {
                    this._order = t,
                    this._onChangeCallback()
                }
                set(t, e, r, n) {
                    return this._x = t,
                    this._y = e,
                    this._z = r,
                    this._order = n || this._order,
                    this._onChangeCallback(),
                    this
                }
                clone() {
                    return new this.constructor(this._x,this._y,this._z,this._order)
                }
                copy(t) {
                    return this._x = t._x,
                    this._y = t._y,
                    this._z = t._z,
                    this._order = t._order,
                    this._onChangeCallback(),
                    this
                }
                setFromRotationMatrix(t, e, r) {
                    const n = at.clamp
                      , i = t.elements
                      , o = i[0]
                      , s = i[4]
                      , a = i[8]
                      , h = i[1]
                      , c = i[5]
                      , u = i[9]
                      , l = i[2]
                      , f = i[6]
                      , d = i[10];
                    switch (e = e || this._order) {
                    case "XYZ":
                        this._y = Math.asin(n(a, -1, 1)),
                        Math.abs(a) < .9999999 ? (this._x = Math.atan2(-u, d),
                        this._z = Math.atan2(-s, o)) : (this._x = Math.atan2(f, c),
                        this._z = 0);
                        break;
                    case "YXZ":
                        this._x = Math.asin(-n(u, -1, 1)),
                        Math.abs(u) < .9999999 ? (this._y = Math.atan2(a, d),
                        this._z = Math.atan2(h, c)) : (this._y = Math.atan2(-l, o),
                        this._z = 0);
                        break;
                    case "ZXY":
                        this._x = Math.asin(n(f, -1, 1)),
                        Math.abs(f) < .9999999 ? (this._y = Math.atan2(-l, d),
                        this._z = Math.atan2(-s, c)) : (this._y = 0,
                        this._z = Math.atan2(h, o));
                        break;
                    case "ZYX":
                        this._y = Math.asin(-n(l, -1, 1)),
                        Math.abs(l) < .9999999 ? (this._x = Math.atan2(f, d),
                        this._z = Math.atan2(h, o)) : (this._x = 0,
                        this._z = Math.atan2(-s, c));
                        break;
                    case "YZX":
                        this._z = Math.asin(n(h, -1, 1)),
                        Math.abs(h) < .9999999 ? (this._x = Math.atan2(-u, c),
                        this._y = Math.atan2(-l, o)) : (this._x = 0,
                        this._y = Math.atan2(a, d));
                        break;
                    case "XZY":
                        this._z = Math.asin(-n(s, -1, 1)),
                        Math.abs(s) < .9999999 ? (this._x = Math.atan2(f, c),
                        this._y = Math.atan2(a, o)) : (this._x = Math.atan2(-u, d),
                        this._y = 0);
                        break;
                    default:
                        console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + e)
                    }
                    return this._order = e,
                    !1 !== r && this._onChangeCallback(),
                    this
                }
                setFromQuaternion(t, e, r) {
                    return wt.makeRotationFromQuaternion(t),
                    this.setFromRotationMatrix(wt, e, r)
                }
                setFromVector3(t, e) {
                    return this.set(t.x, t.y, t.z, e || this._order)
                }
                reorder(t) {
                    return _t.setFromEuler(this),
                    this.setFromQuaternion(_t, t)
                }
                equals(t) {
                    return t._x === this._x && t._y === this._y && t._z === this._z && t._order === this._order
                }
                fromArray(t) {
                    return this._x = t[0],
                    this._y = t[1],
                    this._z = t[2],
                    void 0 !== t[3] && (this._order = t[3]),
                    this._onChangeCallback(),
                    this
                }
                toArray(t=[], e=0) {
                    return t[e] = this._x,
                    t[e + 1] = this._y,
                    t[e + 2] = this._z,
                    t[e + 3] = this._order,
                    t
                }
                toVector3(t) {
                    return t ? t.set(this._x, this._y, this._z) : new ct(this._x,this._y,this._z)
                }
                _onChange(t) {
                    return this._onChangeCallback = t,
                    this
                }
                _onChangeCallback() {}
            }
            xt.DefaultOrder = "XYZ",
            xt.RotationOrders = ["XYZ", "YZX", "ZXY", "XZY", "YXZ", "ZYX"];
            const wt = new ft
              , _t = new ht;
            function Mt() {}
            Object.assign(Mt.prototype, {
                addEventListener: function(t, e) {
                    void 0 === this._listeners && (this._listeners = {});
                    const r = this._listeners;
                    void 0 === r[t] && (r[t] = []),
                    -1 === r[t].indexOf(e) && r[t].push(e)
                },
                hasEventListener: function(t, e) {
                    if (void 0 === this._listeners)
                        return !1;
                    const r = this._listeners;
                    return void 0 !== r[t] && -1 !== r[t].indexOf(e)
                },
                removeEventListener: function(t, e) {
                    if (void 0 === this._listeners)
                        return;
                    const r = this._listeners[t];
                    if (void 0 !== r) {
                        const t = r.indexOf(e);
                        -1 !== t && r.splice(t, 1)
                    }
                },
                dispatchEvent: function(t) {
                    if (void 0 === this._listeners)
                        return;
                    const e = this._listeners[t.type];
                    if (void 0 !== e) {
                        t.target = this;
                        const r = e.slice(0);
                        for (let e = 0, n = r.length; e < n; e++)
                            r[e].call(this, t)
                    }
                }
            });
            class Ot {
                constructor() {
                    this.mask = 1
                }
                set(t) {
                    this.mask = 1 << t | 0
                }
                enable(t) {
                    this.mask |= 1 << t | 0
                }
                enableAll() {
                    this.mask = -1
                }
                toggle(t) {
                    this.mask ^= 1 << t | 0
                }
                disable(t) {
                    this.mask &= ~(1 << t | 0)
                }
                disableAll() {
                    this.mask = 0
                }
                test(t) {
                    return 0 != (this.mask & t.mask)
                }
            }
            class Ct {
                constructor() {
                    Object.defineProperty(this, "isMatrix3", {
                        value: !0
                    }),
                    this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1],
                    arguments.length > 0 && console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")
                }
                set(t, e, r, n, i, o, s, a, h) {
                    const c = this.elements;
                    return c[0] = t,
                    c[1] = n,
                    c[2] = s,
                    c[3] = e,
                    c[4] = i,
                    c[5] = a,
                    c[6] = r,
                    c[7] = o,
                    c[8] = h,
                    this
                }
                identity() {
                    return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1),
                    this
                }
                clone() {
                    return (new this.constructor).fromArray(this.elements)
                }
                copy(t) {
                    const e = this.elements
                      , r = t.elements;
                    return e[0] = r[0],
                    e[1] = r[1],
                    e[2] = r[2],
                    e[3] = r[3],
                    e[4] = r[4],
                    e[5] = r[5],
                    e[6] = r[6],
                    e[7] = r[7],
                    e[8] = r[8],
                    this
                }
                extractBasis(t, e, r) {
                    return t.setFromMatrix3Column(this, 0),
                    e.setFromMatrix3Column(this, 1),
                    r.setFromMatrix3Column(this, 2),
                    this
                }
                setFromMatrix4(t) {
                    const e = t.elements;
                    return this.set(e[0], e[4], e[8], e[1], e[5], e[9], e[2], e[6], e[10]),
                    this
                }
                multiply(t) {
                    return this.multiplyMatrices(this, t)
                }
                premultiply(t) {
                    return this.multiplyMatrices(t, this)
                }
                multiplyMatrices(t, e) {
                    const r = t.elements
                      , n = e.elements
                      , i = this.elements
                      , o = r[0]
                      , s = r[3]
                      , a = r[6]
                      , h = r[1]
                      , c = r[4]
                      , u = r[7]
                      , l = r[2]
                      , f = r[5]
                      , d = r[8]
                      , p = n[0]
                      , y = n[3]
                      , m = n[6]
                      , v = n[1]
                      , b = n[4]
                      , g = n[7]
                      , x = n[2]
                      , w = n[5]
                      , _ = n[8];
                    return i[0] = o * p + s * v + a * x,
                    i[3] = o * y + s * b + a * w,
                    i[6] = o * m + s * g + a * _,
                    i[1] = h * p + c * v + u * x,
                    i[4] = h * y + c * b + u * w,
                    i[7] = h * m + c * g + u * _,
                    i[2] = l * p + f * v + d * x,
                    i[5] = l * y + f * b + d * w,
                    i[8] = l * m + f * g + d * _,
                    this
                }
                multiplyScalar(t) {
                    const e = this.elements;
                    return e[0] *= t,
                    e[3] *= t,
                    e[6] *= t,
                    e[1] *= t,
                    e[4] *= t,
                    e[7] *= t,
                    e[2] *= t,
                    e[5] *= t,
                    e[8] *= t,
                    this
                }
                determinant() {
                    const t = this.elements
                      , e = t[0]
                      , r = t[1]
                      , n = t[2]
                      , i = t[3]
                      , o = t[4]
                      , s = t[5]
                      , a = t[6]
                      , h = t[7]
                      , c = t[8];
                    return e * o * c - e * s * h - r * i * c + r * s * a + n * i * h - n * o * a
                }
                invert() {
                    const t = this.elements
                      , e = t[0]
                      , r = t[1]
                      , n = t[2]
                      , i = t[3]
                      , o = t[4]
                      , s = t[5]
                      , a = t[6]
                      , h = t[7]
                      , c = t[8]
                      , u = c * o - s * h
                      , l = s * a - c * i
                      , f = h * i - o * a
                      , d = e * u + r * l + n * f;
                    if (0 === d)
                        return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
                    const p = 1 / d;
                    return t[0] = u * p,
                    t[1] = (n * h - c * r) * p,
                    t[2] = (s * r - n * o) * p,
                    t[3] = l * p,
                    t[4] = (c * e - n * a) * p,
                    t[5] = (n * i - s * e) * p,
                    t[6] = f * p,
                    t[7] = (r * a - h * e) * p,
                    t[8] = (o * e - r * i) * p,
                    this
                }
                transpose() {
                    let t;
                    const e = this.elements;
                    return t = e[1],
                    e[1] = e[3],
                    e[3] = t,
                    t = e[2],
                    e[2] = e[6],
                    e[6] = t,
                    t = e[5],
                    e[5] = e[7],
                    e[7] = t,
                    this
                }
                getNormalMatrix(t) {
                    return this.setFromMatrix4(t).copy(this).invert().transpose()
                }
                transposeIntoArray(t) {
                    const e = this.elements;
                    return t[0] = e[0],
                    t[1] = e[3],
                    t[2] = e[6],
                    t[3] = e[1],
                    t[4] = e[4],
                    t[5] = e[7],
                    t[6] = e[2],
                    t[7] = e[5],
                    t[8] = e[8],
                    this
                }
                setUvTransform(t, e, r, n, i, o, s) {
                    const a = Math.cos(i)
                      , h = Math.sin(i);
                    return this.set(r * a, r * h, -r * (a * o + h * s) + o + t, -n * h, n * a, -n * (-h * o + a * s) + s + e, 0, 0, 1),
                    this
                }
                scale(t, e) {
                    const r = this.elements;
                    return r[0] *= t,
                    r[3] *= t,
                    r[6] *= t,
                    r[1] *= e,
                    r[4] *= e,
                    r[7] *= e,
                    this
                }
                rotate(t) {
                    const e = Math.cos(t)
                      , r = Math.sin(t)
                      , n = this.elements
                      , i = n[0]
                      , o = n[3]
                      , s = n[6]
                      , a = n[1]
                      , h = n[4]
                      , c = n[7];
                    return n[0] = e * i + r * a,
                    n[3] = e * o + r * h,
                    n[6] = e * s + r * c,
                    n[1] = -r * i + e * a,
                    n[4] = -r * o + e * h,
                    n[7] = -r * s + e * c,
                    this
                }
                translate(t, e) {
                    const r = this.elements;
                    return r[0] += t * r[2],
                    r[3] += t * r[5],
                    r[6] += t * r[8],
                    r[1] += e * r[2],
                    r[4] += e * r[5],
                    r[7] += e * r[8],
                    this
                }
                equals(t) {
                    const e = this.elements
                      , r = t.elements;
                    for (let t = 0; t < 9; t++)
                        if (e[t] !== r[t])
                            return !1;
                    return !0
                }
                fromArray(t, e=0) {
                    for (let r = 0; r < 9; r++)
                        this.elements[r] = t[r + e];
                    return this
                }
                toArray(t=[], e=0) {
                    const r = this.elements;
                    return t[e] = r[0],
                    t[e + 1] = r[1],
                    t[e + 2] = r[2],
                    t[e + 3] = r[3],
                    t[e + 4] = r[4],
                    t[e + 5] = r[5],
                    t[e + 6] = r[6],
                    t[e + 7] = r[7],
                    t[e + 8] = r[8],
                    t
                }
            }
            let Et = 0;
            const zt = new ct
              , St = new ht
              , Rt = new ft
              , It = new ct
              , Tt = new ct
              , Dt = new ct
              , kt = new ht
              , Pt = new ct(1,0,0)
              , jt = new ct(0,1,0)
              , At = new ct(0,0,1)
              , Nt = {
                type: "added"
            }
              , Ut = {
                type: "removed"
            };
            function Ft() {
                Object.defineProperty(this, "id", {
                    value: Et++
                }),
                this.uuid = at.generateUUID(),
                this.name = "",
                this.type = "Object3D",
                this.parent = null,
                this.children = [],
                this.up = Ft.DefaultUp.clone();
                const t = new ct
                  , e = new xt
                  , r = new ht
                  , n = new ct(1,1,1);
                e._onChange((function() {
                    r.setFromEuler(e, !1)
                }
                )),
                r._onChange((function() {
                    e.setFromQuaternion(r, void 0, !1)
                }
                )),
                Object.defineProperties(this, {
                    position: {
                        configurable: !0,
                        enumerable: !0,
                        value: t
                    },
                    rotation: {
                        configurable: !0,
                        enumerable: !0,
                        value: e
                    },
                    quaternion: {
                        configurable: !0,
                        enumerable: !0,
                        value: r
                    },
                    scale: {
                        configurable: !0,
                        enumerable: !0,
                        value: n
                    },
                    modelViewMatrix: {
                        value: new ft
                    },
                    normalMatrix: {
                        value: new Ct
                    }
                }),
                this.matrix = new ft,
                this.matrixWorld = new ft,
                this.matrixAutoUpdate = Ft.DefaultMatrixAutoUpdate,
                this.matrixWorldNeedsUpdate = !1,
                this.layers = new Ot,
                this.visible = !0,
                this.castShadow = !1,
                this.receiveShadow = !1,
                this.frustumCulled = !0,
                this.renderOrder = 0,
                this.animations = [],
                this.userData = {}
            }
            function Wt() {
                Ft.call(this),
                this.type = "Camera",
                this.matrixWorldInverse = new ft,
                this.projectionMatrix = new ft,
                this.projectionMatrixInverse = new ft
            }
            Ft.DefaultUp = new ct(0,1,0),
            Ft.DefaultMatrixAutoUpdate = !0,
            Ft.prototype = Object.assign(Object.create(Mt.prototype), {
                constructor: Ft,
                isObject3D: !0,
                onBeforeRender: function() {},
                onAfterRender: function() {},
                applyMatrix4: function(t) {
                    this.matrixAutoUpdate && this.updateMatrix(),
                    this.matrix.premultiply(t),
                    this.matrix.decompose(this.position, this.quaternion, this.scale)
                },
                applyQuaternion: function(t) {
                    return this.quaternion.premultiply(t),
                    this
                },
                setRotationFromAxisAngle: function(t, e) {
                    this.quaternion.setFromAxisAngle(t, e)
                },
                setRotationFromEuler: function(t) {
                    this.quaternion.setFromEuler(t, !0)
                },
                setRotationFromMatrix: function(t) {
                    this.quaternion.setFromRotationMatrix(t)
                },
                setRotationFromQuaternion: function(t) {
                    this.quaternion.copy(t)
                },
                rotateOnAxis: function(t, e) {
                    return St.setFromAxisAngle(t, e),
                    this.quaternion.multiply(St),
                    this
                },
                rotateOnWorldAxis: function(t, e) {
                    return St.setFromAxisAngle(t, e),
                    this.quaternion.premultiply(St),
                    this
                },
                rotateX: function(t) {
                    return this.rotateOnAxis(Pt, t)
                },
                rotateY: function(t) {
                    return this.rotateOnAxis(jt, t)
                },
                rotateZ: function(t) {
                    return this.rotateOnAxis(At, t)
                },
                translateOnAxis: function(t, e) {
                    return zt.copy(t).applyQuaternion(this.quaternion),
                    this.position.add(zt.multiplyScalar(e)),
                    this
                },
                translateX: function(t) {
                    return this.translateOnAxis(Pt, t)
                },
                translateY: function(t) {
                    return this.translateOnAxis(jt, t)
                },
                translateZ: function(t) {
                    return this.translateOnAxis(At, t)
                },
                localToWorld: function(t) {
                    return t.applyMatrix4(this.matrixWorld)
                },
                worldToLocal: function(t) {
                    return t.applyMatrix4(Rt.copy(this.matrixWorld).invert())
                },
                lookAt: function(t, e, r) {
                    t.isVector3 ? It.copy(t) : It.set(t, e, r);
                    const n = this.parent;
                    this.updateWorldMatrix(!0, !1),
                    Tt.setFromMatrixPosition(this.matrixWorld),
                    this.isCamera || this.isLight ? Rt.lookAt(Tt, It, this.up) : Rt.lookAt(It, Tt, this.up),
                    this.quaternion.setFromRotationMatrix(Rt),
                    n && (Rt.extractRotation(n.matrixWorld),
                    St.setFromRotationMatrix(Rt),
                    this.quaternion.premultiply(St.invert()))
                },
                add: function(t) {
                    if (arguments.length > 1) {
                        for (let t = 0; t < arguments.length; t++)
                            this.add(arguments[t]);
                        return this
                    }
                    return t === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", t),
                    this) : (t && t.isObject3D ? (null !== t.parent && t.parent.remove(t),
                    t.parent = this,
                    this.children.push(t),
                    t.dispatchEvent(Nt)) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", t),
                    this)
                },
                remove: function(t) {
                    if (arguments.length > 1) {
                        for (let t = 0; t < arguments.length; t++)
                            this.remove(arguments[t]);
                        return this
                    }
                    const e = this.children.indexOf(t);
                    return -1 !== e && (t.parent = null,
                    this.children.splice(e, 1),
                    t.dispatchEvent(Ut)),
                    this
                },
                clear: function() {
                    for (let t = 0; t < this.children.length; t++) {
                        const e = this.children[t];
                        e.parent = null,
                        e.dispatchEvent(Ut)
                    }
                    return this.children.length = 0,
                    this
                },
                attach: function(t) {
                    return this.updateWorldMatrix(!0, !1),
                    Rt.copy(this.matrixWorld).invert(),
                    null !== t.parent && (t.parent.updateWorldMatrix(!0, !1),
                    Rt.multiply(t.parent.matrixWorld)),
                    t.applyMatrix4(Rt),
                    t.updateWorldMatrix(!1, !1),
                    this.add(t),
                    this
                },
                getObjectById: function(t) {
                    return this.getObjectByProperty("id", t)
                },
                getObjectByName: function(t) {
                    return this.getObjectByProperty("name", t)
                },
                getObjectByProperty: function(t, e) {
                    if (this[t] === e)
                        return this;
                    for (let r = 0, n = this.children.length; r < n; r++) {
                        const n = this.children[r].getObjectByProperty(t, e);
                        if (void 0 !== n)
                            return n
                    }
                },
                getWorldPosition: function(t) {
                    return void 0 === t && (console.warn("THREE.Object3D: .getWorldPosition() target is now required"),
                    t = new ct),
                    this.updateWorldMatrix(!0, !1),
                    t.setFromMatrixPosition(this.matrixWorld)
                },
                getWorldQuaternion: function(t) {
                    return void 0 === t && (console.warn("THREE.Object3D: .getWorldQuaternion() target is now required"),
                    t = new ht),
                    this.updateWorldMatrix(!0, !1),
                    this.matrixWorld.decompose(Tt, t, Dt),
                    t
                },
                getWorldScale: function(t) {
                    return void 0 === t && (console.warn("THREE.Object3D: .getWorldScale() target is now required"),
                    t = new ct),
                    this.updateWorldMatrix(!0, !1),
                    this.matrixWorld.decompose(Tt, kt, t),
                    t
                },
                getWorldDirection: function(t) {
                    void 0 === t && (console.warn("THREE.Object3D: .getWorldDirection() target is now required"),
                    t = new ct),
                    this.updateWorldMatrix(!0, !1);
                    const e = this.matrixWorld.elements;
                    return t.set(e[8], e[9], e[10]).normalize()
                },
                raycast: function() {},
                traverse: function(t) {
                    t(this);
                    const e = this.children;
                    for (let r = 0, n = e.length; r < n; r++)
                        e[r].traverse(t)
                },
                traverseVisible: function(t) {
                    if (!1 === this.visible)
                        return;
                    t(this);
                    const e = this.children;
                    for (let r = 0, n = e.length; r < n; r++)
                        e[r].traverseVisible(t)
                },
                traverseAncestors: function(t) {
                    const e = this.parent;
                    null !== e && (t(e),
                    e.traverseAncestors(t))
                },
                updateMatrix: function() {
                    this.matrix.compose(this.position, this.quaternion, this.scale),
                    this.matrixWorldNeedsUpdate = !0
                },
                updateMatrixWorld: function(t) {
                    this.matrixAutoUpdate && this.updateMatrix(),
                    (this.matrixWorldNeedsUpdate || t) && (null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix),
                    this.matrixWorldNeedsUpdate = !1,
                    t = !0);
                    const e = this.children;
                    for (let r = 0, n = e.length; r < n; r++)
                        e[r].updateMatrixWorld(t)
                },
                updateWorldMatrix: function(t, e) {
                    const r = this.parent;
                    if (!0 === t && null !== r && r.updateWorldMatrix(!0, !1),
                    this.matrixAutoUpdate && this.updateMatrix(),
                    null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix),
                    !0 === e) {
                        const t = this.children;
                        for (let e = 0, r = t.length; e < r; e++)
                            t[e].updateWorldMatrix(!1, !0)
                    }
                },
                toJSON: function(t) {
                    const e = void 0 === t || "string" == typeof t
                      , r = {};
                    e && (t = {
                        geometries: {},
                        materials: {},
                        textures: {},
                        images: {},
                        shapes: {},
                        skeletons: {},
                        animations: {}
                    },
                    r.metadata = {
                        version: 4.5,
                        type: "Object",
                        generator: "Object3D.toJSON"
                    });
                    const n = {};
                    function i(e, r) {
                        return void 0 === e[r.uuid] && (e[r.uuid] = r.toJSON(t)),
                        r.uuid
                    }
                    if (n.uuid = this.uuid,
                    n.type = this.type,
                    "" !== this.name && (n.name = this.name),
                    !0 === this.castShadow && (n.castShadow = !0),
                    !0 === this.receiveShadow && (n.receiveShadow = !0),
                    !1 === this.visible && (n.visible = !1),
                    !1 === this.frustumCulled && (n.frustumCulled = !1),
                    0 !== this.renderOrder && (n.renderOrder = this.renderOrder),
                    "{}" !== JSON.stringify(this.userData) && (n.userData = this.userData),
                    n.layers = this.layers.mask,
                    n.matrix = this.matrix.toArray(),
                    !1 === this.matrixAutoUpdate && (n.matrixAutoUpdate = !1),
                    this.isInstancedMesh && (n.type = "InstancedMesh",
                    n.count = this.count,
                    n.instanceMatrix = this.instanceMatrix.toJSON()),
                    this.isMesh || this.isLine || this.isPoints) {
                        n.geometry = i(t.geometries, this.geometry);
                        const e = this.geometry.parameters;
                        if (void 0 !== e && void 0 !== e.shapes) {
                            const r = e.shapes;
                            if (Array.isArray(r))
                                for (let e = 0, n = r.length; e < n; e++) {
                                    const n = r[e];
                                    i(t.shapes, n)
                                }
                            else
                                i(t.shapes, r)
                        }
                    }
                    if (this.isSkinnedMesh && (n.bindMode = this.bindMode,
                    n.bindMatrix = this.bindMatrix.toArray(),
                    void 0 !== this.skeleton && (i(t.skeletons, this.skeleton),
                    n.skeleton = this.skeleton.uuid)),
                    void 0 !== this.material)
                        if (Array.isArray(this.material)) {
                            const e = [];
                            for (let r = 0, n = this.material.length; r < n; r++)
                                e.push(i(t.materials, this.material[r]));
                            n.material = e
                        } else
                            n.material = i(t.materials, this.material);
                    if (this.children.length > 0) {
                        n.children = [];
                        for (let e = 0; e < this.children.length; e++)
                            n.children.push(this.children[e].toJSON(t).object)
                    }
                    if (this.animations.length > 0) {
                        n.animations = [];
                        for (let e = 0; e < this.animations.length; e++) {
                            const r = this.animations[e];
                            n.animations.push(i(t.animations, r))
                        }
                    }
                    if (e) {
                        const e = o(t.geometries)
                          , n = o(t.materials)
                          , i = o(t.textures)
                          , s = o(t.images)
                          , a = o(t.shapes)
                          , h = o(t.skeletons)
                          , c = o(t.animations);
                        e.length > 0 && (r.geometries = e),
                        n.length > 0 && (r.materials = n),
                        i.length > 0 && (r.textures = i),
                        s.length > 0 && (r.images = s),
                        a.length > 0 && (r.shapes = a),
                        h.length > 0 && (r.skeletons = h),
                        c.length > 0 && (r.animations = c)
                    }
                    return r.object = n,
                    r;
                    function o(t) {
                        const e = [];
                        for (const r in t) {
                            const n = t[r];
                            delete n.metadata,
                            e.push(n)
                        }
                        return e
                    }
                },
                clone: function(t) {
                    return (new this.constructor).copy(this, t)
                },
                copy: function(t, e=!0) {
                    if (this.name = t.name,
                    this.up.copy(t.up),
                    this.position.copy(t.position),
                    this.rotation.order = t.rotation.order,
                    this.quaternion.copy(t.quaternion),
                    this.scale.copy(t.scale),
                    this.matrix.copy(t.matrix),
                    this.matrixWorld.copy(t.matrixWorld),
                    this.matrixAutoUpdate = t.matrixAutoUpdate,
                    this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate,
                    this.layers.mask = t.layers.mask,
                    this.visible = t.visible,
                    this.castShadow = t.castShadow,
                    this.receiveShadow = t.receiveShadow,
                    this.frustumCulled = t.frustumCulled,
                    this.renderOrder = t.renderOrder,
                    this.userData = JSON.parse(JSON.stringify(t.userData)),
                    !0 === e)
                        for (let e = 0; e < t.children.length; e++) {
                            const r = t.children[e];
                            this.add(r.clone())
                        }
                    return this
                }
            }),
            Wt.prototype = Object.assign(Object.create(Ft.prototype), {
                constructor: Wt,
                isCamera: !0,
                copy: function(t, e) {
                    return Ft.prototype.copy.call(this, t, e),
                    this.matrixWorldInverse.copy(t.matrixWorldInverse),
                    this.projectionMatrix.copy(t.projectionMatrix),
                    this.projectionMatrixInverse.copy(t.projectionMatrixInverse),
                    this
                },
                getWorldDirection: function(t) {
                    void 0 === t && (console.warn("THREE.Camera: .getWorldDirection() target is now required"),
                    t = new ct),
                    this.updateWorldMatrix(!0, !1);
                    const e = this.matrixWorld.elements;
                    return t.set(-e[8], -e[9], -e[10]).normalize()
                },
                updateMatrixWorld: function(t) {
                    Ft.prototype.updateMatrixWorld.call(this, t),
                    this.matrixWorldInverse.copy(this.matrixWorld).invert()
                },
                updateWorldMatrix: function(t, e) {
                    Ft.prototype.updateWorldMatrix.call(this, t, e),
                    this.matrixWorldInverse.copy(this.matrixWorld).invert()
                },
                clone: function() {
                    return (new this.constructor).copy(this)
                }
            });
            var Lt = 1e-5
              , Vt = function(t, e, r) {
                return void 0 === r && (r = Lt),
                Math.abs(t - e) <= r
            }
              , Ht = function(t, e, r) {
                return void 0 === r && (r = Lt),
                Vt(t.x, e.x, r) && Vt(t.y, e.y, r)
            };
            function Bt(t, e) {
                t.x = e.x,
                t.y = e.y
            }
            function qt(t, e) {
                Bt(t, e),
                t.z = e.z
            }
            var Kt, Xt, Yt = (Kt = function(t, e) {
                return (Kt = Object.setPrototypeOf || {
                    __proto__: []
                }instanceof Array && function(t, e) {
                    t.__proto__ = e
                }
                || function(t, e) {
                    for (var r in e)
                        Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r])
                }
                )(t, e)
            }
            ,
            function(t, e) {
                function r() {
                    this.constructor = t
                }
                Kt(t, e),
                t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype,
                new r)
            }
            ), Zt = function(t) {
                function e(e) {
                    var r = this.constructor
                      , n = t.call(this, e) || this;
                    return n.name = "BaseException",
                    Object.setPrototypeOf(n, r.prototype),
                    n
                }
                return Yt(e, t),
                e
            }(Error), Qt = function() {
                var t = function(e, r) {
                    return (t = Object.setPrototypeOf || {
                        __proto__: []
                    }instanceof Array && function(t, e) {
                        t.__proto__ = e
                    }
                    || function(t, e) {
                        for (var r in e)
                            Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r])
                    }
                    )(e, r)
                };
                return function(e, r) {
                    function n() {
                        this.constructor = e
                    }
                    t(e, r),
                    e.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype,
                    new n)
                }
            }(), Gt = function(t) {
                function e() {
                    var e = t.call(this, "Cannot copy into an array of a different size") || this;
                    return e.name = "ArraySizeMismatch",
                    e
                }
                return Qt(e, t),
                e
            }(Zt);
            function Jt(t, e) {
                var r, n, i, o = 1e-5;
                return t.mode === e.mode && t.sweep === e.sweep && function(t, e, r) {
                    return void 0 === r && (r = Lt),
                    Ht(t, e, r) && Vt(t.z, e.z, r)
                }(t.position, e.position, o) && Ht(t.rotation, e.rotation, o) && (r = t.projection,
                n = e.projection,
                void 0 === (i = o) && (i = Lt),
                r.length === n.length && !Array.prototype.some.call(r, (function(t, e) {
                    return !Vt(t, n[e], i)
                }
                )))
            }
            !function(t) {
                t.INSIDE = "mode.inside",
                t.OUTSIDE = "mode.outside",
                t.DOLLHOUSE = "mode.dollhouse",
                t.FLOORPLAN = "mode.floorplan",
                t.TRANSITIONING = "mode.transitioning"
            }(Xt || (Xt = {})),
            function() {
                function t(t) {
                    this.CwfViewmode = t
                }
                t.prototype.toSdk = function(t, e) {
                    switch (t) {
                    case this.CwfViewmode.Panorama:
                        return e ? Xt.INSIDE : Xt.OUTSIDE;
                    case this.CwfViewmode.Dollhouse:
                        return Xt.DOLLHOUSE;
                    case this.CwfViewmode.Floorplan:
                        return Xt.FLOORPLAN;
                    case this.CwfViewmode.Transition:
                        return Xt.TRANSITIONING;
                    case this.CwfViewmode.Outdoor:
                        return Xt.OUTSIDE;
                    default:
                        return Xt.INSIDE
                    }
                }
                ,
                t.prototype.fromSdk = function(t) {
                    switch (t) {
                    case Xt.INSIDE:
                    case Xt.OUTSIDE:
                        return this.CwfViewmode.Panorama;
                    case Xt.DOLLHOUSE:
                        return this.CwfViewmode.Dollhouse;
                    case Xt.FLOORPLAN:
                        return this.CwfViewmode.Floorplan;
                    case Xt.TRANSITIONING:
                        return this.CwfViewmode.Transition
                    }
                }
            }(),
            function() {
                function t(t) {
                    this.CommandMode = t
                }
                t.prototype.toSdk = function(t, e) {
                    switch (t) {
                    case this.CommandMode.INSIDE:
                        return e ? Xt.INSIDE : Xt.OUTSIDE;
                    case this.CommandMode.DOLLHOUSE:
                        return Xt.DOLLHOUSE;
                    case this.CommandMode.FLOORPLAN:
                        return Xt.FLOORPLAN;
                    case this.CommandMode.TRANSITIONING:
                        return Xt.TRANSITIONING;
                    case this.CommandMode.OUTSIDE:
                        return Xt.OUTSIDE;
                    default:
                        return Xt.INSIDE
                    }
                }
                ,
                t.prototype.fromSdk = function(t) {
                    switch (t) {
                    case Xt.INSIDE:
                        return this.CommandMode.INSIDE;
                    case Xt.OUTSIDE:
                        return this.CommandMode.OUTSIDE;
                    case Xt.DOLLHOUSE:
                        return this.CommandMode.DOLLHOUSE;
                    case Xt.FLOORPLAN:
                        return this.CommandMode.FLOORPLAN;
                    case Xt.TRANSITIONING:
                        return this.CommandMode.TRANSITIONING
                    }
                }
            }();
            var $t = function() {
                function t() {
                    this.tempEuler = new xt,
                    this.tempPosition = new ct,
                    this.camera = new Wt,
                    this.cameraPose = null
                }
                return t.prototype.setCameraFromPose = function(t) {
                    if (!this.cameraPose || !Jt(this.cameraPose, t)) {
                        this.cameraPose = this.cameraPose || te,
                        n = this.cameraPose,
                        i = t,
                        n.sweep = i.sweep,
                        n.mode = i.mode,
                        qt(n.position, i.position),
                        Bt(n.rotation, i.rotation),
                        function(t, e) {
                            if (t.byteLength !== e.byteLength)
                                throw new Gt;
                            for (var r = e.length, n = 0; n < r; ++n)
                                t[n] = e[n]
                        }(n.projection, i.projection);
                        var e = t.position;
                        this.camera.position.set(e.x, e.y, e.z);
                        var r = t.rotation;
                        this.tempEuler.set(r.x * at.DEG2RAD, r.y * at.DEG2RAD, 0, "YXZ"),
                        this.camera.quaternion.setFromEuler(this.tempEuler),
                        this.camera.updateMatrixWorld(),
                        this.camera.projectionMatrix.fromArray(t.projection).transpose()
                    }
                    var n, i
                }
                ,
                t.prototype.worldToNDC = function(t, e) {
                    return this.tempPosition.set(t.x, t.y, t.z),
                    this.tempPosition.project(this.camera),
                    (e = e || {
                        x: 0,
                        y: 0,
                        z: 0
                    }).x = this.tempPosition.x,
                    e.y = this.tempPosition.y,
                    e.z = this.tempPosition.z,
                    e
                }
                ,
                t.prototype.worldToScreen = function(t, e, r) {
                    return (r = this.worldToNDC(t, r)).x = .5 * (this.tempPosition.x + 1) * e.w,
                    r.y = -.5 * (this.tempPosition.y - 1) * e.h,
                    t.z < -1 && (r.x *= -1,
                    r.y *= -1),
                    r
                }
                ,
                t
            }()
              , te = {
                sweep: "",
                mode: Xt.DOLLHOUSE,
                position: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                rotation: {
                    x: 0,
                    y: 0
                },
                projection: new Float32Array(16)
            };
            function ee(t, e) {
                return (e = e || {
                    x: 0,
                    y: 0,
                    z: 0
                }).x = t.anchorPosition.x,
                e.y = t.anchorPosition.y,
                e.z = t.anchorPosition.z,
                e.x += t.stemVector.x,
                e.y += t.stemVector.y,
                e.z += t.stemVector.z,
                e
            }
            var re, ne = function() {
                function t() {
                    this.coordinateConverter = new $t
                }
                return t.prototype.build = function() {
                    return {
                        Conversion: {
                            worldToScreen: (t = this.coordinateConverter,
                            function(e, r, n, i) {
                                return t.setCameraFromPose(r),
                                t.worldToScreen(e, n, i)
                            }
                            )
                        },
                        Mattertag: {
                            getDiscPosition: ee
                        }
                    };
                    var t
                }
                ,
                t
            }(), ie = function(t, e) {
                var r = "function" == typeof Symbol && t[Symbol.iterator];
                if (!r)
                    return t;
                var n, i, o = r.call(t), s = [];
                try {
                    for (; (void 0 === e || e-- > 0) && !(n = o.next()).done; )
                        s.push(n.value)
                } catch (t) {
                    i = {
                        error: t
                    }
                } finally {
                    try {
                        n && !n.done && (r = o.return) && r.call(o)
                    } finally {
                        if (i)
                            throw i.error
                    }
                }
                return s
            }, oe = function() {
                for (var t = [], e = 0; e < arguments.length; e++)
                    t = t.concat(ie(arguments[e]));
                return t
            }, se = function() {
                function t(t, e, r) {
                    var n = this;
                    this.sourceId = t,
                    this.targetId = e,
                    this.target = r,
                    this.messageHandlers = new a,
                    this.onMessage = function(t) {
                        var e, r, i = t.data, o = i.type, s = i.fromId, a = i.toId;
                        if (s === n.targetId || a === n.sourceId) {
                            var h = n.messageHandlers.getValuesAtKey(o);
                            try {
                                for (var c = function(t) {
                                    var e = "function" == typeof Symbol && Symbol.iterator
                                      , r = e && t[e]
                                      , n = 0;
                                    if (r)
                                        return r.call(t);
                                    if (t && "number" == typeof t.length)
                                        return {
                                            next: function() {
                                                return t && n >= t.length && (t = void 0),
                                                {
                                                    value: t && t[n++],
                                                    done: !t
                                                }
                                            }
                                        };
                                    throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.")
                                }(h), u = c.next(); !u.done; u = c.next())
                                    u.value.apply(void 0, oe(t.data.payload))
                            } catch (t) {
                                e = {
                                    error: t
                                }
                            } finally {
                                try {
                                    u && !u.done && (r = c.return) && r.call(c)
                                } finally {
                                    if (e)
                                        throw e.error
                                }
                            }
                        }
                    }
                    ,
                    window.addEventListener("message", this.onMessage)
                }
                return t.prototype.updateTarget = function(t) {
                    this.target = t
                }
                ,
                t.prototype.facade = function() {
                    var t = this;
                    return new (function() {
                        function e() {}
                        return e.prototype.dispose = function() {
                            t.dispose()
                        }
                        ,
                        e.prototype.on = function(e, r) {
                            t.on(e, r)
                        }
                        ,
                        e.prototype.off = function(e, r) {
                            t.off(e, r)
                        }
                        ,
                        e.prototype.send = function(e) {
                            for (var r = [], n = 1; n < arguments.length; n++)
                                r[n - 1] = arguments[n];
                            t.send.apply(t, oe([e], r))
                        }
                        ,
                        e
                    }())
                }
                ,
                t.prototype.dispose = function() {
                    window.removeEventListener("message", this.onMessage),
                    this.messageHandlers = new a
                }
                ,
                t.prototype.on = function(t, e) {
                    this.messageHandlers.add(t, e)
                }
                ,
                t.prototype.off = function(t, e) {
                    this.messageHandlers.remove(t, e)
                }
                ,
                t.prototype.send = function(t) {
                    for (var e = [], r = 1; r < arguments.length; r++)
                        e[r - 1] = arguments[r];
                    this.target.postMessage({
                        toId: this.targetId,
                        fromId: this.sourceId,
                        type: t,
                        payload: e
                    }, "*")
                }
                ,
                t
            }();
            !function(t) {
                t.LOADED = "inject.loaded",
                t.SETUP = "inject.setup",
                t.RESOLVE = "inject.resolve"
            }(re || (re = {}));
            var ae, he = function() {
                return (he = Object.assign || function(t) {
                    for (var e, r = 1, n = arguments.length; r < n; r++)
                        for (var i in e = arguments[r])
                            Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
                    return t
                }
                ).apply(this, arguments)
            };
            !function(t) {
                t[t.POSTMESSAGE = 1] = "POSTMESSAGE"
            }(ae || (ae = {}));
            var ce, ue = function() {
                function t() {
                    this.clientId = Math.floor(1e6 * Math.random()),
                    this.key = "mattertag.inject",
                    this.argsDef = {
                        argNames: ["tagId", "html", "options"],
                        varArg: !1
                    }
                }
                return t.prototype.buildMessageData = function(t, e) {
                    return he(he({}, e), {
                        clientId: this.clientId
                    })
                }
                ,
                t.prototype.onResponse = function(t, e) {
                    var r = this;
                    return new Promise((function(t) {
                        var n;
                        e.messengerType === ae.POSTMESSAGE && window.addEventListener("message", (function(e) {
                            var i = e.data
                              , o = i.toId
                              , s = i.fromId;
                            o === r.clientId && e.data.type === re.RESOLVE && (n ? n.updateTarget(e.source) : (n = new se(r.clientId,s,e.source),
                            t(n.facade())))
                        }
                        ))
                    }
                    ))
                }
                ,
                t
            }();
            !function(t) {
                t.CAMERA = "sensor.sensortype.camera"
            }(ce || (ce = {}));
            var le, fe = {
                namespace: "Sensor",
                name: "addSource",
                varArg: !0,
                args: ["sensorId", "sourceIds"]
            }, de = {
                namespace: "Sensor",
                name: "dispose",
                args: ["sensorId"]
            }, pe = {
                namespace: "Sensor",
                name: "showDebug",
                args: ["sensorId", "show"]
            };
            !function(t) {
                t.map = new Map
            }(le || (le = {}));
            var ye = function(t, e, r, n) {
                return new (r || (r = Promise))((function(i, o) {
                    function s(t) {
                        try {
                            h(n.next(t))
                        } catch (t) {
                            o(t)
                        }
                    }
                    function a(t) {
                        try {
                            h(n.throw(t))
                        } catch (t) {
                            o(t)
                        }
                    }
                    function h(t) {
                        var e;
                        t.done ? i(t.value) : (e = t.value,
                        e instanceof r ? e : new r((function(t) {
                            t(e)
                        }
                        ))).then(s, a)
                    }
                    h((n = n.apply(t, e || [])).next())
                }
                ))
            }
              , me = function(t, e) {
                var r, n, i, o, s = {
                    label: 0,
                    sent: function() {
                        if (1 & i[0])
                            throw i[1];
                        return i[1]
                    },
                    trys: [],
                    ops: []
                };
                return o = {
                    next: a(0),
                    throw: a(1),
                    return: a(2)
                },
                "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                    return this
                }
                ),
                o;
                function a(o) {
                    return function(a) {
                        return function(o) {
                            if (r)
                                throw new TypeError("Generator is already executing.");
                            for (; s; )
                                try {
                                    if (r = 1,
                                    n && (i = 2 & o[0] ? n.return : o[0] ? n.throw || ((i = n.return) && i.call(n),
                                    0) : n.next) && !(i = i.call(n, o[1])).done)
                                        return i;
                                    switch (n = 0,
                                    i && (o = [2 & o[0], i.value]),
                                    o[0]) {
                                    case 0:
                                    case 1:
                                        i = o;
                                        break;
                                    case 4:
                                        return s.label++,
                                        {
                                            value: o[1],
                                            done: !1
                                        };
                                    case 5:
                                        s.label++,
                                        n = o[1],
                                        o = [0];
                                        continue;
                                    case 7:
                                        o = s.ops.pop(),
                                        s.trys.pop();
                                        continue;
                                    default:
                                        if (!((i = (i = s.trys).length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                            s = 0;
                                            continue
                                        }
                                        if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                            s.label = o[1];
                                            break
                                        }
                                        if (6 === o[0] && s.label < i[1]) {
                                            s.label = i[1],
                                            i = o;
                                            break
                                        }
                                        if (i && s.label < i[2]) {
                                            s.label = i[2],
                                            s.ops.push(o);
                                            break
                                        }
                                        i[2] && s.ops.pop(),
                                        s.trys.pop();
                                        continue
                                    }
                                    o = e.call(t, s)
                                } catch (t) {
                                    o = [6, t],
                                    n = 0
                                } finally {
                                    r = i = 0
                                }
                            if (5 & o[0])
                                throw o[1];
                            return {
                                value: o[0] ? o[1] : void 0,
                                done: !0
                            }
                        }([o, a])
                    }
                }
            }
              , ve = function(t, e) {
                var r = "function" == typeof Symbol && t[Symbol.iterator];
                if (!r)
                    return t;
                var n, i, o = r.call(t), s = [];
                try {
                    for (; (void 0 === e || e-- > 0) && !(n = o.next()).done; )
                        s.push(n.value)
                } catch (t) {
                    i = {
                        error: t
                    }
                } finally {
                    try {
                        n && !n.done && (r = o.return) && r.call(o)
                    } finally {
                        if (i)
                            throw i.error
                    }
                }
                return s
            }
              , be = function() {
                for (var t = [], e = 0; e < arguments.length; e++)
                    t = t.concat(ve(arguments[e]));
                return t
            }
              , ge = function(t) {
                var e = "function" == typeof Symbol && Symbol.iterator
                  , r = e && t[e]
                  , n = 0;
                if (r)
                    return r.call(t);
                if (t && "number" == typeof t.length)
                    return {
                        next: function() {
                            return t && n >= t.length && (t = void 0),
                            {
                                value: t && t[n++],
                                done: !t
                            }
                        }
                    };
                throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.")
            }
              , xe = function() {
                function t(t, e, r, n) {
                    this.id = t,
                    this.sensorCalls = e,
                    this.sensorState = r,
                    this.readingCollection = n,
                    this.origin = {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    this.forward = {
                        x: 0,
                        y: 0,
                        z: -1
                    },
                    this.sources = [];
                    var i = function() {
                        function t(t) {
                            this.sensor = t
                        }
                        return t.prototype.onChanged = function(t) {
                            Me(this.sensor.origin, t.origin),
                            Me(this.sensor.forward, t.forward)
                        }
                        ,
                        t
                    }();
                    this.stateObservingCancellable = r.subscribe(new i(this))
                }
                return t.prototype.dispose = function() {
                    this.sensorCalls.dispose(this.id),
                    this.stateObservingCancellable.cancel()
                }
                ,
                Object.defineProperty(t.prototype, "facade", {
                    get: function() {
                        var t = this
                          , e = function() {
                            function t(t) {
                                this.observer = t
                            }
                            return t.prototype.onChanged = function() {
                                try {
                                    this.observerIsCallback(this.observer) ? this.observer(n) : this.observer.onChanged(n)
                                } catch (t) {
                                    throw Error("The argument provided to subscribe was not a valid observer\nExpected a function or an object with an `onChanged` function")
                                }
                            }
                            ,
                            t.prototype.observerIsCallback = function(t) {
                                return !t.onChanged
                            }
                            ,
                            t
                        }()
                          , r = function() {
                            function t(t) {
                                this.condition = t
                            }
                            return t.prototype.waitUntil = function() {
                                try {
                                    return this.conditionIsCallback(this.condition) ? this.condition(n) : this.condition.waitUntil(n)
                                } catch (t) {
                                    throw Error("The argument provided to subscribe was not a valid waiter\nExpected a function or an object with an `waitUntil` function")
                                }
                            }
                            ,
                            t.prototype.conditionIsCallback = function(t) {
                                return !t.waitUntil
                            }
                            ,
                            t
                        }()
                          , n = {
                            get origin() {
                                return t.origin
                            },
                            get forward() {
                                return t.forward
                            },
                            addSource: function() {
                                for (var e = [], r = 0; r < arguments.length; r++)
                                    e[r] = arguments[r];
                                t.addSource.apply(t, be(e))
                            },
                            showDebug: function(e) {
                                t.sensorCalls.showDebug(t.id, e)
                            },
                            readings: {
                                subscribe: function(e) {
                                    return t.readingCollection.subscribe(new we(e,t.sources))
                                }
                            },
                            dispose: function() {
                                t.dispose()
                            },
                            subscribe: function(r) {
                                return t.sensorState.subscribe(new e(r))
                            },
                            waitUntil: function(e) {
                                return t.sensorState.waitUntil(new r(e))
                            }
                        };
                        return n
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                t.prototype.addSource = function() {
                    for (var t = [], e = 0; e < arguments.length; e++)
                        t[e] = arguments[e];
                    return ye(this, void 0, void 0, (function() {
                        var e, r, n, i, o, s, a, h, c;
                        return me(this, (function(u) {
                            (s = this.sources).push.apply(s, be(t)),
                            e = [];
                            try {
                                for (r = ge(t),
                                n = r.next(); !n.done; n = r.next()) {
                                    if (i = n.value,
                                    !(o = le.map.get(i)))
                                        throw Error(i + " was not a valid source. Sources must be created using createSource");
                                    o.id && e.push(o.id)
                                }
                            } catch (t) {
                                a = {
                                    error: t
                                }
                            } finally {
                                try {
                                    n && !n.done && (h = r.return) && h.call(r)
                                } finally {
                                    if (a)
                                        throw a.error
                                }
                            }
                            return (c = this.sensorCalls).addSource.apply(c, be([this.id], e)),
                            [2]
                        }
                        ))
                    }
                    ))
                }
                ,
                t
            }()
              , we = function() {
                function t(t, e) {
                    this.observer = t,
                    this.sources = e,
                    this.sourceMap = new Map,
                    this.internalReadingMap = new Map,
                    this.readingMap = new Map
                }
                return t.prototype.onAdded = function(t, e) {
                    var r = this.sources[this.sourceMap.size];
                    if (r) {
                        this.sourceMap.set(t, r);
                        var n = new _e(e);
                        this.internalReadingMap.set(r, n),
                        this.readingMap.set(r, n.facade),
                        this.observer.onAdded && this.observer.onAdded(r, n.facade, this.readingMap)
                    }
                }
                ,
                t.prototype.onRemoved = function(t, e) {
                    var r = this.sourceMap.get(t);
                    if (r) {
                        var n = this.readingMap.get(r);
                        this.internalReadingMap.delete(r),
                        this.readingMap.delete(r),
                        this.observer.onRemoved && this.observer.onRemoved(r, n, this.readingMap)
                    }
                }
                ,
                t.prototype.onUpdated = function(t, e) {
                    var r = this.sourceMap.get(t);
                    if (r && (this.internalReadingMap.get(r).update(e),
                    this.observer.onUpdated)) {
                        var n = this.readingMap.get(r);
                        this.observer.onUpdated(r, n, this.readingMap)
                    }
                }
                ,
                t.prototype.onCollectionUpdated = function() {
                    this.observer.onCollectionUpdated && this.observer.onCollectionUpdated(this.readingMap)
                }
                ,
                t
            }()
              , _e = function() {
                function t(t) {
                    this.baseReading = t,
                    this.distanceCache = 1 / 0,
                    this.distanceNeedsUpdate = !0
                }
                return Object.defineProperty(t.prototype, "facade", {
                    get: function() {
                        var t = this;
                        return {
                            get inRange() {
                                return t.baseReading.inRange
                            },
                            get inView() {
                                return t.baseReading.inView
                            },
                            get distanceSquared() {
                                return t.baseReading.distanceSquared
                            },
                            get direction() {
                                return t.baseReading.direction
                            },
                            get distance() {
                                return t.distance
                            }
                        }
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                t.prototype.update = function(t) {
                    this.baseReading.inRange = t.inRange,
                    this.baseReading.inView = t.inView,
                    this.updateDistance(t.distanceSquared),
                    this.updateDirection(t.direction)
                }
                ,
                t.prototype.updateDirection = function(t) {
                    Me(this.baseReading.direction, t)
                }
                ,
                t.prototype.updateDistance = function(t) {
                    t && (this.distanceNeedsUpdate = !0,
                    this.baseReading.distanceSquared = t)
                }
                ,
                Object.defineProperty(t.prototype, "distance", {
                    get: function() {
                        return this.distanceNeedsUpdate && (this.distanceNeedsUpdate = !1,
                        this.distanceCache = Math.sqrt(this.baseReading.distanceSquared)),
                        this.distanceCache
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                t
            }();
            function Me(t, e) {
                t.x = e.x,
                t.y = e.y,
                t.z = e.z
            }
            var Oe, Ce = function() {
                function t(t) {
                    this.key = "sensor.create",
                    this.argsDef = {
                        argNames: ["type"],
                        varArg: !1
                    },
                    this.observableRegistry = t.observableRegister,
                    this.collectionRegistry = t.collectionRegister,
                    this.sensorCalls = {
                        addSource: t.functionRegister.register("Sensor.addSource", fe),
                        dispose: t.functionRegister.register("sensor.dispose", de),
                        showDebug: t.functionRegister.register("sensor.showDebug", pe)
                    }
                }
                return t.prototype.buildMessageData = function(t, e) {
                    return e
                }
                ,
                t.prototype.onResponse = function(t, e) {
                    return r = this,
                    n = void 0,
                    o = function() {
                        var t, r;
                        return function(t, e) {
                            var r, n, i, o, s = {
                                label: 0,
                                sent: function() {
                                    if (1 & i[0])
                                        throw i[1];
                                    return i[1]
                                },
                                trys: [],
                                ops: []
                            };
                            return o = {
                                next: a(0),
                                throw: a(1),
                                return: a(2)
                            },
                            "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                                return this
                            }
                            ),
                            o;
                            function a(o) {
                                return function(a) {
                                    return function(o) {
                                        if (r)
                                            throw new TypeError("Generator is already executing.");
                                        for (; s; )
                                            try {
                                                if (r = 1,
                                                n && (i = 2 & o[0] ? n.return : o[0] ? n.throw || ((i = n.return) && i.call(n),
                                                0) : n.next) && !(i = i.call(n, o[1])).done)
                                                    return i;
                                                switch (n = 0,
                                                i && (o = [2 & o[0], i.value]),
                                                o[0]) {
                                                case 0:
                                                case 1:
                                                    i = o;
                                                    break;
                                                case 4:
                                                    return s.label++,
                                                    {
                                                        value: o[1],
                                                        done: !1
                                                    };
                                                case 5:
                                                    s.label++,
                                                    n = o[1],
                                                    o = [0];
                                                    continue;
                                                case 7:
                                                    o = s.ops.pop(),
                                                    s.trys.pop();
                                                    continue;
                                                default:
                                                    if (!((i = (i = s.trys).length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                                        s = 0;
                                                        continue
                                                    }
                                                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                                        s.label = o[1];
                                                        break
                                                    }
                                                    if (6 === o[0] && s.label < i[1]) {
                                                        s.label = i[1],
                                                        i = o;
                                                        break
                                                    }
                                                    if (i && s.label < i[2]) {
                                                        s.label = i[2],
                                                        s.ops.push(o);
                                                        break
                                                    }
                                                    i[2] && s.ops.pop(),
                                                    s.trys.pop();
                                                    continue
                                                }
                                                o = e.call(t, s)
                                            } catch (t) {
                                                o = [6, t],
                                                n = 0
                                            } finally {
                                                r = i = 0
                                            }
                                        if (5 & o[0])
                                            throw o[1];
                                        return {
                                            value: o[0] ? o[1] : void 0,
                                            done: !0
                                        }
                                    }([o, a])
                                }
                            }
                        }(this, (function(n) {
                            return t = this.observableRegistry.register(e.sensorId),
                            r = this.collectionRegistry.register(e.sensorId),
                            [2, new xe(e.sensorId,this.sensorCalls,t,r).facade]
                        }
                        ))
                    }
                    ,
                    new ((i = void 0) || (i = Promise))((function(t, e) {
                        function s(t) {
                            try {
                                h(o.next(t))
                            } catch (t) {
                                e(t)
                            }
                        }
                        function a(t) {
                            try {
                                h(o.throw(t))
                            } catch (t) {
                                e(t)
                            }
                        }
                        function h(e) {
                            var r;
                            e.done ? t(e.value) : (r = e.value,
                            r instanceof i ? r : new i((function(t) {
                                t(r)
                            }
                            ))).then(s, a)
                        }
                        h((o = o.apply(r, n || [])).next())
                    }
                    ));
                    var r, n, i, o
                }
                ,
                t
            }(), Ee = {
                namespace: "Sensor",
                name: "updateSource",
                args: ["sourceId", "type", "options"]
            };
            !function(t) {
                t.SPHERE = "sensor.sourcetype.sphere",
                t.BOX = "sensor.sourcetype.box",
                t.CYLINDER = "sensor.sourcetype.cylinder"
            }(Oe || (Oe = {}));
            var ze = function() {
                return (ze = Object.assign || function(t) {
                    for (var e, r = 1, n = arguments.length; r < n; r++)
                        for (var i in e = arguments[r])
                            Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
                    return t
                }
                ).apply(this, arguments)
            }
              , Se = function() {
                function t(t, e, r, n) {
                    this.id = t,
                    this.updateSourceCall = e,
                    this.userData = r,
                    this.volumeCache = {
                        origin: {
                            x: 0,
                            y: 0,
                            z: 0
                        },
                        radius: 1 / 0
                    },
                    this.updateCache(n.origin, n.radius)
                }
                return Object.defineProperty(t.prototype, "facade", {
                    get: function() {
                        var t = {
                            radius: this.volumeCache.radius,
                            origin: ze({}, this.volumeCache.origin)
                        }
                          , e = function() {
                            function e() {}
                            return Object.defineProperty(e.prototype, "type", {
                                get: function() {
                                    return Oe.SPHERE
                                },
                                enumerable: !1,
                                configurable: !0
                            }),
                            Object.defineProperty(e.prototype, "volume", {
                                get: function() {
                                    return t
                                },
                                enumerable: !1,
                                configurable: !0
                            }),
                            Object.defineProperty(e.prototype, "userData", {
                                get: function() {
                                    return r.userData
                                },
                                enumerable: !1,
                                configurable: !0
                            }),
                            e.prototype.commit = function() {
                                r.commit(this)
                            }
                            ,
                            e
                        }()
                          , r = this
                          , n = new e;
                        return le.map.set(n, this),
                        n
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                t.prototype.commit = function(t) {
                    this.hasSourceChanged(t) && (this.updateCache(t.volume.origin, t.volume.radius),
                    this.updateSourceCall(this.id, Oe.SPHERE, this.volumeCache))
                }
                ,
                t.prototype.hasSourceChanged = function(t) {
                    return !(this.volumeCache.origin.x === t.volume.origin.x && this.volumeCache.origin.y === t.volume.origin.y && this.volumeCache.origin.z === t.volume.origin.z && this.volumeCache.radius === t.volume.radius)
                }
                ,
                t.prototype.updateCache = function(t, e) {
                    this.volumeCache.origin.x = t.x,
                    this.volumeCache.origin.y = t.y,
                    this.volumeCache.origin.z = t.z,
                    this.volumeCache.radius = e
                }
                ,
                t
            }()
              , Re = function(t) {
                var e = "function" == typeof Symbol && Symbol.iterator
                  , r = e && t[e]
                  , n = 0;
                if (r)
                    return r.call(t);
                if (t && "number" == typeof t.length)
                    return {
                        next: function() {
                            return t && n >= t.length && (t = void 0),
                            {
                                value: t && t[n++],
                                done: !t
                            }
                        }
                    };
                throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.")
            }
              , Ie = function() {
                return (Ie = Object.assign || function(t) {
                    for (var e, r = 1, n = arguments.length; r < n; r++)
                        for (var i in e = arguments[r])
                            Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
                    return t
                }
                ).apply(this, arguments)
            }
              , Te = function() {
                function t(t, e, r, n) {
                    this.id = t,
                    this.updateSourceCall = e,
                    this.userData = r,
                    this.volumeCache = {
                        center: {
                            x: 0,
                            y: 0,
                            z: 0
                        },
                        size: {
                            x: 1 / 0,
                            y: 1 / 0,
                            z: 1 / 0
                        },
                        orientation: {
                            yaw: 0,
                            pitch: 0,
                            roll: 0
                        }
                    },
                    this.updateCache(n.center, n.size, n.orientation)
                }
                return Object.defineProperty(t.prototype, "facade", {
                    get: function() {
                        var t = {
                            center: Ie({}, this.volumeCache.center),
                            size: Ie({}, this.volumeCache.size),
                            orientation: Ie({}, this.volumeCache.orientation)
                        }
                          , e = function() {
                            function e() {}
                            return Object.defineProperty(e.prototype, "type", {
                                get: function() {
                                    return Oe.BOX
                                },
                                enumerable: !1,
                                configurable: !0
                            }),
                            Object.defineProperty(e.prototype, "volume", {
                                get: function() {
                                    return t
                                },
                                enumerable: !1,
                                configurable: !0
                            }),
                            Object.defineProperty(e.prototype, "userData", {
                                get: function() {
                                    return r.userData
                                },
                                enumerable: !1,
                                configurable: !0
                            }),
                            e.prototype.commit = function() {
                                r.commit(this)
                            }
                            ,
                            e
                        }()
                          , r = this
                          , n = new e;
                        return le.map.set(n, this),
                        n
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                t.prototype.commit = function(t) {
                    this.hasSourceChanged(t) && (this.updateCache(t.volume.center, t.volume.size, t.volume.orientation),
                    this.updateSourceCall(this.id, Oe.BOX, this.volumeCache))
                }
                ,
                t.prototype.hasSourceChanged = function(t) {
                    return !(this.volumeCache.center.x === t.volume.center.x && this.volumeCache.center.y === t.volume.center.y && this.volumeCache.center.z === t.volume.center.z && this.volumeCache.size.x === t.volume.size.x && this.volumeCache.size.y === t.volume.size.y && this.volumeCache.size.z === t.volume.size.z && this.volumeCache.orientation.yaw === t.volume.orientation.yaw && this.volumeCache.orientation.pitch === t.volume.orientation.pitch && this.volumeCache.orientation.roll === t.volume.orientation.roll)
                }
                ,
                t.prototype.updateCache = function(t, e, r) {
                    qt(this.volumeCache.center, t),
                    qt(this.volumeCache.size, e),
                    function(t, e) {
                        for (var r, n, i = [], o = 2; o < arguments.length; o++)
                            i[o - 2] = arguments[o];
                        try {
                            for (var s = Re(i), a = s.next(); !a.done; a = s.next()) {
                                var h = a.value;
                                t[h] = e[h]
                            }
                        } catch (t) {
                            r = {
                                error: t
                            }
                        } finally {
                            try {
                                a && !a.done && (n = s.return) && n.call(s)
                            } finally {
                                if (r)
                                    throw r.error
                            }
                        }
                    }(this.volumeCache.orientation, r, "yaw", "pitch", "roll")
                }
                ,
                t
            }()
              , De = function() {
                return (De = Object.assign || function(t) {
                    for (var e, r = 1, n = arguments.length; r < n; r++)
                        for (var i in e = arguments[r])
                            Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
                    return t
                }
                ).apply(this, arguments)
            }
              , ke = function() {
                function t(t, e, r, n) {
                    this.id = t,
                    this.updateSourceCall = e,
                    this.userData = r,
                    this.volumeCache = {
                        basePoint: {
                            x: 0,
                            y: 0,
                            z: 0
                        },
                        height: 1 / 0,
                        radius: 1 / 0
                    },
                    this.updateCache(n.basePoint, n.height, n.radius)
                }
                return Object.defineProperty(t.prototype, "facade", {
                    get: function() {
                        var t = {
                            basePoint: De({}, this.volumeCache.basePoint),
                            height: this.volumeCache.height,
                            radius: this.volumeCache.radius
                        }
                          , e = function() {
                            function e() {}
                            return Object.defineProperty(e.prototype, "type", {
                                get: function() {
                                    return Oe.CYLINDER
                                },
                                enumerable: !1,
                                configurable: !0
                            }),
                            Object.defineProperty(e.prototype, "volume", {
                                get: function() {
                                    return t
                                },
                                enumerable: !1,
                                configurable: !0
                            }),
                            Object.defineProperty(e.prototype, "userData", {
                                get: function() {
                                    return r.userData
                                },
                                enumerable: !1,
                                configurable: !0
                            }),
                            e.prototype.commit = function() {
                                r.commit(this)
                            }
                            ,
                            e
                        }()
                          , r = this
                          , n = new e;
                        return le.map.set(n, this),
                        n
                    },
                    enumerable: !1,
                    configurable: !0
                }),
                t.prototype.commit = function(t) {
                    this.hasSourceChanged(t) && (this.updateCache(t.volume.basePoint, t.volume.height, t.volume.radius),
                    this.updateSourceCall(this.id, Oe.CYLINDER, this.volumeCache))
                }
                ,
                t.prototype.hasSourceChanged = function(t) {
                    return !(this.volumeCache.basePoint.x === t.volume.basePoint.x && this.volumeCache.basePoint.y === t.volume.basePoint.y && this.volumeCache.basePoint.z === t.volume.basePoint.z && this.volumeCache.height === t.volume.height && this.volumeCache.radius === t.volume.radius)
                }
                ,
                t.prototype.updateCache = function(t, e, r) {
                    qt(this.volumeCache.basePoint, t),
                    this.volumeCache.height = e,
                    this.volumeCache.radius = r
                }
                ,
                t
            }()
              , Pe = function() {
                return (Pe = Object.assign || function(t) {
                    for (var e, r = 1, n = arguments.length; r < n; r++)
                        for (var i in e = arguments[r])
                            Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
                    return t
                }
                ).apply(this, arguments)
            }
              , je = function() {
                function t(t) {
                    this.userDataMap = new Map,
                    this.key = "source.create",
                    this.argsDef = {
                        argNames: ["type", "options"],
                        varArg: !1
                    },
                    this.updateSourceCall = t.functionRegister.register("Sensor.updateSource", Ee)
                }
                return t.prototype.buildMessageData = function(t, e) {
                    var r, n = e.options.hasOwnProperty("userData") ? e.options.userData : {};
                    if (!(r = n) || "object" != typeof r)
                        throw new Error("Error creating Source, userData was provided but not an object");
                    this.userDataMap.set(t, Pe({}, n));
                    var i = Pe({}, e.options);
                    return delete i.userData,
                    {
                        type: e.type,
                        options: i
                    }
                }
                ,
                t.prototype.onResponse = function(t, e) {
                    return r = this,
                    n = void 0,
                    o = function() {
                        var r;
                        return function(t, e) {
                            var r, n, i, o, s = {
                                label: 0,
                                sent: function() {
                                    if (1 & i[0])
                                        throw i[1];
                                    return i[1]
                                },
                                trys: [],
                                ops: []
                            };
                            return o = {
                                next: a(0),
                                throw: a(1),
                                return: a(2)
                            },
                            "function" == typeof Symbol && (o[Symbol.iterator] = function() {
                                return this
                            }
                            ),
                            o;
                            function a(o) {
                                return function(a) {
                                    return function(o) {
                                        if (r)
                                            throw new TypeError("Generator is already executing.");
                                        for (; s; )
                                            try {
                                                if (r = 1,
                                                n && (i = 2 & o[0] ? n.return : o[0] ? n.throw || ((i = n.return) && i.call(n),
                                                0) : n.next) && !(i = i.call(n, o[1])).done)
                                                    return i;
                                                switch (n = 0,
                                                i && (o = [2 & o[0], i.value]),
                                                o[0]) {
                                                case 0:
                                                case 1:
                                                    i = o;
                                                    break;
                                                case 4:
                                                    return s.label++,
                                                    {
                                                        value: o[1],
                                                        done: !1
                                                    };
                                                case 5:
                                                    s.label++,
                                                    n = o[1],
                                                    o = [0];
                                                    continue;
                                                case 7:
                                                    o = s.ops.pop(),
                                                    s.trys.pop();
                                                    continue;
                                                default:
                                                    if (!((i = (i = s.trys).length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                                        s = 0;
                                                        continue
                                                    }
                                                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                                        s.label = o[1];
                                                        break
                                                    }
                                                    if (6 === o[0] && s.label < i[1]) {
                                                        s.label = i[1],
                                                        i = o;
                                                        break
                                                    }
                                                    if (i && s.label < i[2]) {
                                                        s.label = i[2],
                                                        s.ops.push(o);
                                                        break
                                                    }
                                                    i[2] && s.ops.pop(),
                                                    s.trys.pop();
                                                    continue
                                                }
                                                o = e.call(t, s)
                                            } catch (t) {
                                                o = [6, t],
                                                n = 0
                                            } finally {
                                                r = i = 0
                                            }
                                        if (5 & o[0])
                                            throw o[1];
                                        return {
                                            value: o[0] ? o[1] : void 0,
                                            done: !0
                                        }
                                    }([o, a])
                                }
                            }
                        }(this, (function(n) {
                            return r = this.userDataMap.get(t) || {},
                            this.userDataMap.delete(t),
                            [2, Ae(e, this.updateSourceCall, r).facade]
                        }
                        ))
                    }
                    ,
                    new ((i = void 0) || (i = Promise))((function(t, e) {
                        function s(t) {
                            try {
                                h(o.next(t))
                            } catch (t) {
                                e(t)
                            }
                        }
                        function a(t) {
                            try {
                                h(o.throw(t))
                            } catch (t) {
                                e(t)
                            }
                        }
                        function h(e) {
                            var r;
                            e.done ? t(e.value) : (r = e.value,
                            r instanceof i ? r : new i((function(t) {
                                t(r)
                            }
                            ))).then(s, a)
                        }
                        h((o = o.apply(r, n || [])).next())
                    }
                    ));
                    var r, n, i, o
                }
                ,
                t
            }();
            function Ae(t, e, r) {
                var n = t.sourceId
                  , i = t.type
                  , o = t.volume;
                switch (i) {
                case Oe.SPHERE:
                    return new Se(n,e,r,o);
                case Oe.BOX:
                    return new Te(n,e,r,o);
                case Oe.CYLINDER:
                    return new ke(n,e,r,o)
                }
            }
            var Ne = function() {
                return (Ne = Object.assign || function(t) {
                    for (var e, r = 1, n = arguments.length; r < n; r++)
                        for (var i in e = arguments[r])
                            Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
                    return t
                }
                ).apply(this, arguments)
            }
              , Ue = function() {
                function t() {}
                return t.prototype.create = function(t, e) {
                    var r = {
                        x: 0,
                        y: 0,
                        z: 0
                    }
                      , n = {
                        x: 0,
                        y: 0,
                        z: 0
                    }
                      , i = !0
                      , o = !0
                      , s = function() {
                        function e() {
                            this.id = t.id,
                            this.floorInfo = Ne({}, t.floorInfo),
                            this.bounds = {
                                max: Ne({}, t.bounds.max),
                                min: Ne({}, t.bounds.min)
                            }
                        }
                        return Object.defineProperty(e.prototype, "size", {
                            get: function() {
                                return i && (i = !1,
                                r.x = this.bounds.max.x - this.bounds.min.x,
                                r.y = this.bounds.max.y - this.bounds.min.y,
                                r.z = this.bounds.max.z - this.bounds.min.z),
                                r
                            },
                            enumerable: !1,
                            configurable: !0
                        }),
                        Object.defineProperty(e.prototype, "center", {
                            get: function() {
                                return o && (o = !1,
                                n.x = .5 * (this.bounds.max.x + this.bounds.min.x),
                                n.y = .5 * (this.bounds.max.y + this.bounds.min.y),
                                n.z = .5 * (this.bounds.max.z + this.bounds.min.z)),
                                n
                            },
                            enumerable: !1,
                            configurable: !0
                        }),
                        e
                    }();
                    return (e = e || new s).id = t.id,
                    e.floorInfo = Ne({}, t.floorInfo),
                    e.bounds.min = Ne({}, t.bounds.min),
                    e.bounds.max = Ne({}, t.bounds.max),
                    i = !0,
                    o = !0,
                    e
                }
                ,
                t
            }()
              , Fe = function() {
                function t() {
                    this.roomFactory = new Ue
                }
                return t.prototype.create = function(t, e) {
                    e = e || {
                        rooms: []
                    };
                    for (var r = 0; r < t.rooms.length; ++r)
                        e.rooms[r] = this.roomFactory.create(t.rooms[r], e.rooms[r]);
                    return e.rooms.length = t.rooms.length,
                    e
                }
                ,
                t
            }();
            function We(t, e) {
                var r = new e;
                return function() {
                    function e() {
                        this.collectionKey = t
                    }
                    return e.prototype.create = function(t, e) {
                        return r.create(t, e)
                    }
                    ,
                    e
                }()
            }
            var Le, Ve = function(t, e) {
                var r = "function" == typeof Symbol && t[Symbol.iterator];
                if (!r)
                    return t;
                var n, i, o = r.call(t), s = [];
                try {
                    for (; (void 0 === e || e-- > 0) && !(n = o.next()).done; )
                        s.push(n.value)
                } catch (t) {
                    i = {
                        error: t
                    }
                } finally {
                    try {
                        n && !n.done && (r = o.return) && r.call(o)
                    } finally {
                        if (i)
                            throw i.error
                    }
                }
                return s
            }, He = function() {
                for (var t = [], e = 0; e < arguments.length; e++)
                    t = t.concat(Ve(arguments[e]));
                return t
            }, Be = function() {
                function t(t) {
                    var e, r, n, i = function() {
                        function t(t) {
                            this.sdkBuilder = t
                        }
                        return Object.defineProperty(t.prototype, "functionRegister", {
                            get: function() {
                                return this.sdkBuilder.functionRegistration
                            },
                            enumerable: !1,
                            configurable: !0
                        }),
                        Object.defineProperty(t.prototype, "observableRegister", {
                            get: function() {
                                return this.sdkBuilder.observableRegistration
                            },
                            enumerable: !1,
                            configurable: !0
                        }),
                        Object.defineProperty(t.prototype, "collectionRegister", {
                            get: function() {
                                return this.sdkBuilder.collectionRegistration
                            },
                            enumerable: !1,
                            configurable: !0
                        }),
                        t
                    }();
                    this.messenger = t.createMessenger(),
                    this.functionRegistration = new V(this.messenger),
                    this.observableRegistration = new G(this.messenger),
                    this.collectionRegistration = new nt(this.messenger);
                    var o = new i(this)
                      , s = [ue, Ce, je];
                    (e = this.functionRegistration).initRoutines.apply(e, He([o], s));
                    var a, h, c = [("current.room",
                    a = Fe,
                    h = new a,
                    function() {
                        function t() {
                            this.observableKey = "current.room"
                        }
                        return t.prototype.create = function(t, e) {
                            return h.create(t, e)
                        }
                        ,
                        t
                    }())];
                    (r = this.observableRegistration).initObjectFactories.apply(r, He([o], c));
                    var u = [We("collection.room", Ue)];
                    (n = this.collectionRegistration).initElementFactories.apply(n, He([o], u)),
                    this.clientFcns = new ne,
                    this.enums = new k,
                    this.eventHandler = new D(this.messenger),
                    this.functions = new K(this.functionRegistration),
                    this.observable = new J(this.observableRegistration),
                    this.collections = new it(this.collectionRegistration),
                    this.messenger.init()
                }
                return t.prototype.build = function(t) {
                    var e, r, n = {}, i = this.eventHandler.build();
                    n.on = function(t, e) {
                        return i.on(t, e),
                        n
                    }
                    ,
                    n.off = function(t, e) {
                        return i.off(t, e),
                        n
                    }
                    ;
                    var o = [[this.enums, t.enums], [this.functions, t.functions], [this.observable, t.observables], [this.collections, t.collections]];
                    try {
                        for (var s = function(t) {
                            var e = "function" == typeof Symbol && Symbol.iterator
                              , r = e && t[e]
                              , n = 0;
                            if (r)
                                return r.call(t);
                            if (t && "number" == typeof t.length)
                                return {
                                    next: function() {
                                        return t && n >= t.length && (t = void 0),
                                        {
                                            value: t && t[n++],
                                            done: !t
                                        }
                                    }
                                };
                            throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.")
                        }(o), a = s.next(); !a.done; a = s.next()) {
                            var h = a.value;
                            h[1] && C(h[0].build(h[1]), n)
                        }
                    } catch (t) {
                        e = {
                            error: t
                        }
                    } finally {
                        try {
                            a && !a.done && (r = s.return) && r.call(s)
                        } finally {
                            if (e)
                                throw e.error
                        }
                    }
                    return C(this.clientFcns.build(), n),
                    n
                }
                ,
                t.prototype.dispose = function() {
                    this.enums.dispose(),
                    this.eventHandler.dispose(),
                    this.functionRegistration.dispose(),
                    this.observableRegistration.dispose(),
                    this.collectionRegistration.dispose(),
                    this.messenger.dispose()
                }
                ,
                t
            }();
            !function(t) {
                t.ACTION = "postmessage.action",
                t.EVENT_SUB = "postmessage.subscribe",
                t.EVENT_UNSUB = "postmessage.unsubscribe",
                t.OBSERVABLE_SUB = "postmessage.observe",
                t.OBSERVABLE_UNSUB = "postmessage.unobserve",
                t.COLLECTION_SUB = "collection.sub",
                t.COLLECTION_UNSUB = "collection.unsub"
            }(Le || (Le = {}))
        }
    }
      , e = {};
    function r(n) {
        if (e[n])
            return e[n].exports;
        var i = e[n] = {
            exports: {}
        };
        return t[n](i, i.exports, r),
        i.exports
    }
    return r.d = function(t, e) {
        for (var n in e)
            r.o(e, n) && !r.o(t, n) && Object.defineProperty(t, n, {
                enumerable: !0,
                get: e[n]
            })
    }
    ,
    r.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }
    ,
    r.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }
    ,
    r(772)
}();
