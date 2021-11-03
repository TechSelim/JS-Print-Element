! function(u) {

        "use strict";

        function p(e, t, n) {
            for (var r = u(e), o = r.clone(t, n), i = r.find("textarea").add(r.filter("textarea")), a = o.find("textarea").add(o.filter("textarea")), l = r.find("select").add(r.filter("select")), c = o.find("select").add(o.filter("select")), d = 0, f = i.length; d < f; ++d) u(a[d]).val(u(i[d]).val());
            for (d = 0, f = l.length; d < f; ++d)
                for (var s = 0, p = l[d].options.length; s < p; ++s) !0 === l[d].options[s].selected && (c[d].options[s].selected = !0);
            return o
        }

        function h(t) {
            var n = u("");
            try {
                n = p(t)
            } catch (e) {
                n = u("<span />").html(t)
            }
            return n
        }

        function m(t, e, n) {
            var r = u.Deferred();
            try {
                var o = (t = t.contentWindow || t.contentDocument || t).document || t.contentDocument || t;
                n.doctype && o.write(n.doctype), o.write(e), o.close();
                var i = !1,
                    a = function() {
                        if (!i) {
                            t.focus();
                            try {
                                t.document.execCommand("print", !1, null) || t.print(), u("body").focus()
                            } catch (e) {
                                t.print()
                            }
                            t.close(), i = !0, r.resolve()
                        }
                    };
                u(t).on("load", a), setTimeout(a, n.timeout)
            } catch (e) {
                r.reject(e)
            }
            return r
        }

        function y(e, t) {
            return m(window.open(), e, t).always(function() {
                try {
                    t.deferred.resolve()
                } catch (e) {
                    console.warn("Error notifying deferred", e)
                }
            })
        }

        function v(e) {
            return !!("object" == typeof Node ? e instanceof Node : e && "object" == typeof e && "number" == typeof e.nodeType && "string" == typeof e.nodeName)
        }
        u.print = u.fn.print = function() {
            var t, e, n = this;
            n instanceof u && (n = n.get(0)), v(n) ? (e = u(n), 0 < arguments.length && (t = arguments[0])) : 0 < arguments.length ? v((e = u(arguments[0]))[0]) ? 1 < arguments.length && (t = arguments[1]) : (t = arguments[0], e = u("html")) : e = u("html");
            var r = {
                globalStyles: !0,
                mediaPrint: !1,
                stylesheet: null,
                noPrintSelector: ".no-print",
                iframe: !0,
                append: null,
                prepend: null,
                manuallyCopyFormValues: !0,
                deferred: u.Deferred(),
                timeout: 750,
                title: null,
                doctype: "<!doctype html>"
            };
            t = u.extend({}, r, t || {});
            var o = u("");
            t.globalStyles ? o = u("style, link, meta, base, title") : t.mediaPrint && (o = u("link[media=print]")), t.stylesheet && (o = u.merge(o, u('<link rel="stylesheet" href="' + t.stylesheet + '">')));
            var i = p(e);
            if ((i = u("<span/>").append(i)).find(t.noPrintSelector).remove(), i.append(p(o)), t.title) {
                var a = u("title", i);
                0 === a.length && (a = u("<title />"), i.append(a)), a.text(t.title)
            }
            i.append(h(t.append)), i.prepend(h(t.prepend)), t.manuallyCopyFormValues && (i.find("input").each(function() {
                var e = u(this);
                e.is("[type='radio']") || e.is("[type='checkbox']") ? e.prop("checked") && e.attr("checked", "checked") : e.attr("value", e.val())
            }), i.find("select").each(function() {
                u(this).find(":selected").attr("selected", "selected")
            }), i.find("textarea").each(function() {
                var e = u(this);
                e.text(e.val())
            }));
            var l, c, d, f, s = i.html();
            try {
                t.deferred.notify("generated_markup", s, i)
            } catch (e) {
                console.warn("Error notifying deferred", e)
            }
            if (i.remove(), t.iframe) try {
                l = s, d = u((c = t).iframe + ""), 0 === (f = d.length) && (d = u('<iframe height="0" width="0" border="0" wmode="Opaque"/>').prependTo("body").css({
                    position: "absolute",
                    top: -999,
                    left: -999
                })), m(d.get(0), l, c).done(function() {
                    setTimeout(function() {
                        0 === f && d.remove()
                    }, 1e3)
                }).fail(function(e) {
                    console.error("Failed to print from iframe", e), y(l, c)
                }).always(function() {
                    try {
                        c.deferred.resolve()
                    } catch (e) {
                        console.warn("Error notifying deferred", e)
                    }
                })
            } catch (e) {
                console.error("Failed to print from iframe", e.stack, e.message), y(s, t)
            } else y(s, t);
            return this
        }
    }(jQuery);