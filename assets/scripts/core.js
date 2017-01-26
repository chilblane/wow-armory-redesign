(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*! WoW Game Site Scripts */
function polyfill(t, e, i) {
    t[e] || Object.defineProperty(t, e, {
        enumerable: !1,
        configurable: !0,
        writable: !0,
        value: i
    });
}
function DOMTokenList(t) {
    this.element = t;
    var e = t.className.trim().split(/\s+/);
    Array.prototype.push.apply(this, e);
}
function CustomEvent(t, e) {
    e = e || {};
    var i = document.createEvent("CustomEvent");
    return i.initCustomEvent(t, e.bubbles || !1, e.cancelable || !1, e.detail), i;
}
function trigger(t, e) {
    var i;
    switch (t) {
        case "resize":
            "function" == typeof UIEvent ? i = new UIEvent(t) : (i = document.createEvent("UIEvent"), i.initUIEvent(t, !0, !0, window, 1));
            break;
        default:
            var n = null;
            null != e && (n = {
                detail: e
            }), i = new CustomEvent(t, n);
    }
    this.dispatchEvent(i);
}
function querySelectorAlways(t, e) {
    function i() {
        querySelectorAlways.init();
        querySelectorAlways.addSelector(t, e);
    }
    if (!e) throw new Error("querySelectorAlways expects a callback");
    i();
}
function Media() {
    this.elems = [], this.matches = {};
}
function Mouse() {
    this.x = 0, this.y = 0;
}
function Animation(t) {
    this.fn = t, this.paused = !0, this.timestamp = 0, this.update = this.update.bind(this);
}
function SVG(t) {
    if (this.elem = t, this.href = t.getAttribute("xlink:href"), this.href) {
        var e = this.href.indexOf("#");
        this.url = this.href.substr(0, e), this.id = this.href.substr(e + 1), this.init();
    }
}
polyfill(Array, "from", function (t) {
    return Array.prototype.slice.call(t);
}), polyfill(Array.prototype, "each", Array.prototype.forEach), polyfill(Function.prototype, "bind", function (t) {
    function e() {}
    if ("function" != typeof this) throw new TypeError("Bind must be called on a function");
    var i = this,
        n = Array.from(arguments).slice(1),
        r = function () {
        var r = this instanceof e ? this : t;
        return i.apply(r, n.concat(Array.from(arguments)));
    };
    return e.prototype = i.prototype, r.prototype = new e(), r;
}), polyfill(Object, "assign", function (t, e) {
    function i(e, i) {
        var n = Object.getOwnPropertyDescriptor(e, i);
        void 0 !== n && n.enumerable && (t[i] = e[i]);
    }
    function n(t) {
        null != t && Object.keys(t).map(i.bind(t, t));
    }
    return t = null == t ? {} : Object(t), Array.from(arguments).slice(1).map(n), t;
}), polyfill(Element.prototype, "matches", Element.prototype.msMatchesSelector), ["indexOf", "slice", "forEach", "each", "map", "reduce", "filter", "every", "some"].each(function (t) {
    polyfill(NodeList.prototype, t, Array.prototype[t]);
}), polyfill(NodeList.prototype, "matches", function (t) {
    function e(e) {
        return e.matches(t);
    }
    return this.filter(e);
}), polyfill(NodeList.prototype, "match", function (t) {
    var e,
        i = this.length;
    for (e = 0; e < i; e++) if (this[e].matches(t)) return this[e];
    return null;
}), Object.defineProperty(Node.prototype, "textNodes", {
    enumerable: !1,
    configurable: !0,
    get: function () {
        for (var t, e = {
            SCRIPT: !0,
            NOSCRIPT: !0,
            STYLE: !0
        }, i = [], n = document.createTreeWalker(this, NodeFilter.SHOW_TEXT, null, !1); t = n.nextNode();) e[t.parentNode.nodeName] || i.push(t);
        return i;
    }
}), polyfill(Element.prototype, "attributeSelector", function (t) {
    var e = this,
        i = [];
    return Array.prototype.map.call(arguments, function (t) {
        var n = e.getAttribute(t);
        null == n || "" === n ? i.push("[" + t + "]") : i.push("[" + t + '="' + n + '"]');
    }), i.join("");
}), polyfill(Array.prototype, "sortBy", function (t, e) {
    if (!this.length) return this;
    var i,
        n,
        r = function () {
        return this;
    };
    t && (r = "function" == typeof t ? t : function () {
        return this[t];
    });
    var o = !e && "number" == typeof (t ? r.call(this[this.length - 1]) : this[this.length - 1]);
    return o && (e = function (t, e) {
        return t - e;
    }), t && (i = Object.prototype.toString, n = Array.prototype.toString, Object.prototype.toString = r, Array.prototype.toString = r), e ? Array.prototype.sort.call(this, e) : Array.prototype.sort.call(this), t && (Object.prototype.toString = i, Array.prototype.toString = n), this;
}), "classList" in document.documentElement || (DOMTokenList.prototype = {
    add: function (t) {
        this.contains(t) || (Array.prototype.push.call(this, t), this.element.className = this.toString());
    },
    contains: function (t) {
        return (" " + this.element.className + " ").indexOf(" " + t + " ") >= 0;
    },
    item: function (t) {
        return this[t] || null;
    },
    remove: function (t) {
        if (this.contains(t)) {
            for (var e = 0; e < this.length; e++) this[e] == t && Array.prototype.splice.call(this, e--, 1);
            this.element.className = this.toString();
        }
    },
    toString: function () {
        return Array.prototype.join.call(this, " ");
    },
    toggle: function (t) {
        return this.contains(t) ? this.remove(t) : this.add(t), this.contains(t);
    }
}, window.DOMTokenList = DOMTokenList, Object.defineProperty(Element.prototype, "classList", {
    get: function () {
        return new DOMTokenList(this);
    }
})), CustomEvent.prototype = window.Event.prototype, window.CustomEvent = CustomEvent, polyfill(Element.prototype, "trigger", trigger), window.trigger = trigger, polyfill(Date, "now", function () {
    return new Date().getTime();
}), window.performance = window.performance || {}, polyfill(performance, "now", function () {
    return Date.now();
}), window.setImmediate || window.setImmediate || function (t) {
    setTimeout(t, 1);
}, function () {
    for (var t = 0, e = ["ms", "moz", "webkit", "o"], i = 0; i < e.length && !window.requestAnimationFrame; ++i) window.requestAnimationFrame = window[e[i] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[i] + "CancelAnimationFrame"] || window[e[i] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function (e, i) {
        function n() {
            e(r + o);
        }
        var r = new Date().getTime(),
            o = Math.max(0, 16 - (r - t));
        return t = r + o, window.setTimeout(n, o);
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (t) {
        clearTimeout(t);
    });
}();
var supports = {
    touch: "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch,
    transitionEnd: function () {
        var t,
            e = document.createElement("fakeelement"),
            i = {
            transition: "transitionend",
            OTransition: "oTransitionEnd",
            MozTransition: "transitionend",
            WebkitTransition: "webkitTransitionEnd"
        };
        for (t in i) if (void 0 !== e.style[t]) return i[t];
        return !1;
    }(),
    video: function () {
        var t = document.createElement("video"),
            e = {};
        return e = "canPlayType" in t ? {
            webm: t.canPlayType("video/webm"),
            mp4: t.canPlayType("video/mp4")
        } : {
            webm: !1,
            mp4: !1
        }, t = null, (e.webm || e.mp4) && !window.navigator.userAgent.match(/iPhone|iPad|iPod/i);
    }()
};
Object.keys(supports).map(function (t) {
    supports[t] && document.documentElement.classList.add(t);
}), querySelectorAlways.attribute = "queryselectoralways", querySelectorAlways.init = function () {
    querySelectorAlways.style || (querySelectorAlways.style = document.createElement("style"), querySelectorAlways.style.id = "querySelectorAlways", querySelectorAlways.style.appendChild(document.createTextNode("")), document.head.appendChild(querySelectorAlways.style), ["animationstart", "MSAnimationStart", "webkitAnimationStart"].map(function (t) {
        document.addEventListener(t, querySelectorAlways.onanimationstart, !1);
    }), document.addEventListener("DOMContentLoaded", querySelectorAlways.update));
}, querySelectorAlways.selectors = {}, querySelectorAlways.callbacks = [], querySelectorAlways.addSelector = function (t, e) {
    t = t.trim();
    var i = querySelectorAlways.selectors[t];
    return i ? querySelectorAlways.callbacks[i].push(e) : (i = querySelectorAlways.callbacks.length, querySelectorAlways.selectors[t] = i, querySelectorAlways.callbacks[i] = [e], querySelectorAlways.install(i, t)), i;
}, querySelectorAlways.update = function () {
    var t, e;
    for (t in querySelectorAlways.selectors) {
        e = querySelectorAlways.selectors[t];
        var i = document.querySelectorAll(t);
        Array.prototype.map.call(i, function (t) {
            querySelectorAlways.addNode(e, t);
        });
    }
}, querySelectorAlways.install = function (t, e) {
    function i(t) {
        querySelectorAlways.style.textContent += "\n" + t;
    }
    var n = (querySelectorAlways.style, "querySelectorAlways" + t),
        r = "visibility:hidden!important;",
        o = ":not([" + querySelectorAlways.attribute + '~="' + t + '"])';
    e = e.replace(/(,|$)/g, function (t) {
        return o + t;
    }), i(e + " { " + r + " animation: 0.001ms " + n + "!important; -webkit-animation: 0.001ms " + n + "!important; }"), i("@keyframes " + n + " { from { opacity: 0.999; } to { opacity: 1; } }"), i("@-webkit-keyframes " + n + " { from { opacity: 0.999; } to { opacity: 1; } }\n");
}, querySelectorAlways.regexEvent = /querySelectorAlways(\d+)/, querySelectorAlways.onanimationstart = function (t) {
    var e = t.animationName.match(querySelectorAlways.regexEvent);
    if (e) {
        var i = parseInt(e[1]),
            n = t.target;
        querySelectorAlways.addNode.call(this, i, n);
    }
}, querySelectorAlways.addNode = function (t, e) {
    var i = e.getAttribute(querySelectorAlways.attribute),
        n = i ? i.split(" ") : [];
    if (n.indexOf(String(t)) < 0) {
        n.push(t), e.setAttribute(querySelectorAlways.attribute, n.join(" "));
        var r = querySelectorAlways.callbacks[t];
        r && r.map(function (t) {
            t(e);
        });
    }
}, document.querySelectorAlways = querySelectorAlways, Media.sizes = ["original", "small", "medium", "large", "wide", "huge", "max", "edge", "over"], Media.attrs = Media.sizes.map(function (t) {
    return "media-" + t;
}), Media.query = Media.attrs.map(function (t) {
    return "[" + t + "]";
}).join(","), Media.widths = [0, 320, 540, 720, 980, 1280, 1600, 2400, 9e3], Media.spaceReg = /\s+/, Media.prototype = {
    init: function () {
        this.update(), document.querySelectorAlways(Media.query, this.addElem.bind(this)), window.addEventListener("resize", this.update.bind(this)), window.addEventListener("load", this.resize.bind(this));
    },
    resize: function () {
        window.trigger ? window.trigger("resize") : this.update();
    },
    addElem: function (t) {
        t.setAttribute("media-original", t.className), this.elems.push(t), this.updateElem(t);
    },
    update: function () {
        this.width = window.innerWidth;
        var t = Media.widths[1];
        this.width < t && (this.width = t), Media.widths.map(this.updateWidth.bind(this)), this.elems.map(this.updateElem.bind(this));
    },
    updateWidth: function (t, e) {
        var i = "media-" + Media.sizes[e];
        this.matches[i] = this.width >= t;
    },
    updateElem: function (t) {
        Media.attrs.map(this.updateMedia.bind(this, t));
    },
    updateMedia: function (t, e) {
        var i = t.getAttribute(e);
        if (i) {
            var n = i.split(Media.spaceReg);
            n.map(this.updateClass.bind(this, t, e));
        }
    },
    updateClass: function (t, e, i) {
        var n = this.matches[e],
            r = "!" === i.charAt(0);
        if (r) {
            if (n) {
                var o = "!" === i.charAt(1);
                o ? t.classList.add(i.slice(2)) : t.classList.remove(i.slice(1));
            }
        } else t.classList[n ? "add" : "remove"](i);
    }
};
var media = new Media();
media.init(), Mouse.prototype = {
    init: function () {
        window.addEventListener("mousemove", this.update.bind(this)), window.addEventListener("touchstart", this.update.bind(this)), window.addEventListener("touchmove", this.update.bind(this));
    },
    update: function (t) {
        var e = t.changedTouches ? t.changedTouches[0] : t;
        this.x = e.pageX, this.y = e.pageY;
    }
};
var mouse = new Mouse();
mouse.init(), Animation.prototype = {
    start: function () {
        this.paused && (this.paused = !1, this.timestamp = performance.now(), requestAnimationFrame(this.update));
    },
    stop: function (t) {
        this.paused = !0, t !== !0 && (this.timestamp = 0);
    },
    update: function (t) {
        if (this.timestamp) {
            var e = t - this.timestamp;
            this.timestamp = t, this.fn(e), this.paused || requestAnimationFrame(this.update);
        }
    }
}, Object.assign(SVG, {
    svgs: {},
    support: !/\bTrident\/\d+\b/.test(navigator.userAgent),
    init: function () {
        SVG.support || document.querySelectorAlways("svg use", SVG.create);
    },
    create: function (t) {
        new SVG(t);
    }
}), SVG.prototype = {
    init: function () {
        var t = this.svg();
        t instanceof XMLHttpRequest ? t.addEventListener("load", this.load.bind(this)) : this.load();
    },
    svg: function () {
        var t = document;
        return this.url && (t = SVG.svgs[this.url], t || (t = SVG.svgs[this.url] = this.ajax(this.url))), t;
    },
    ajax: function (t) {
        function e() {
            if (i.status < 400) {
                var e = document.implementation.createHTMLDocument("");
                e.body.innerHTML = i.responseText, SVG.svgs[t] = e.querySelector("svg");
            }
        }
        var i = new XMLHttpRequest();
        return i.open("GET", encodeURI(t), !0), i.addEventListener("load", e), i.send(), i;
    },
    load: function () {
        this.set(this.svg().getElementById(this.id));
    },
    set: function (t) {
        if (t) {
            for (var e = t.cloneNode(!0), i = document.createDocumentFragment(); e.firstChild;) i.appendChild(e.firstChild);
            this.elem.appendChild(i);
        }
    }
}, SVG.init(), window.addEventListener("DOMContentLoaded", function (t) {
    function e(t) {
        var e = t.textContent;
        if (!(e.indexOf("?") < 0)) {
            var i = document.createDocumentFragment();
            e.split("?").each(function (t, e) {
                if (e) {
                    var n = document.createElement("span");
                    n.className = "fontFamily-blizzard", n.textContent = "?", i.appendChild(n);
                }
                i.appendChild(document.createTextNode(t));
            }), t.parentNode.replaceChild(i, t);
        }
    }
    document.body.textNodes.each(e);
}), window.addEventListener("load", function (t) {
    document.body.classList.add("is-preloading");
    var e = document.querySelectorAll(".Tab:not(.is-selected), .Carousel-item:not(.is-selected)");
    e.each(function (t) {
        t.classList.add("preload");
    }), requestAnimationFrame(function () {
        e.each(function (t) {
            t.classList.remove("preload");
        }), document.body.classList.remove("is-preloading");
    });
});

},{}]},{},[1]);
