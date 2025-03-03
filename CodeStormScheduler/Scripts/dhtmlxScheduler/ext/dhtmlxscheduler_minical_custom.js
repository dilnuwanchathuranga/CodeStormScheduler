﻿/*
@license
dhtmlxScheduler v.4.3.1 

This software is covered by GPL license. You also can obtain Commercial or Enterprise license to use it in non-GPL project - please contact sales@dhtmlx.com. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
scheduler.templates.calendar_month = scheduler.date.date_to_str("%F %Y"), scheduler.templates.calendar_scale_date = scheduler.date.date_to_str("%D"), scheduler.templates.calendar_date = scheduler.date.date_to_str("%d"), scheduler.config.minicalendar = { mark_events: !0 }, scheduler._synced_minicalendars = [], scheduler.renderCalendar = function (e, t, a) {
    var r = null, n = e.date || scheduler._currentDate(); if ("string" == typeof n && (n = this.templates.api_date(n)), t) r = this._render_calendar(t.parentNode, n, e, t), scheduler.unmarkCalendar(r);
    else {
        var i = e.container, d = e.position; if ("string" == typeof i && (i = document.getElementById(i)), "string" == typeof d && (d = document.getElementById(d)), d && "undefined" == typeof d.left) { var l = getOffset(d); d = { top: l.top + d.offsetHeight, left: l.left } } i || (i = scheduler._get_def_cont(d)), r = this._render_calendar(i, n, e), r.onclick = function (e) {
            e = e || event; var t = e.target || e.srcElement; if (-1 != t.className.indexOf("dhx_month_head")) {
                var a = t.parentNode.className; if (-1 == a.indexOf("dhx_after") && -1 == a.indexOf("dhx_before")) {
                    var r = scheduler.templates.xml_date(this.getAttribute("date"));

                    r.setDate(parseInt(t.innerHTML, 10)), scheduler.unmarkCalendar(this), scheduler.markCalendar(this, r, "dhx_calendar_click"), this._last_date = r, this.conf.handler && this.conf.handler.call(scheduler, r, this)
                }
            }
        }
    } if (scheduler.config.minicalendar.mark_events) for (var s = scheduler.date.month_start(n), o = scheduler.date.add(s, 1, "month"), _ = this.getEvents(s, o), c = this["filter_" + this._mode], u = 0; u < _.length; u++) {
        var h = _[u]; if (!c || c(h.id, h)) {
            var p = h.start_date; for (p.valueOf() < s.valueOf() && (p = s), p = scheduler.date.date_part(new Date(p.valueOf())) ; p < h.end_date && (this.markCalendar(r, p, "dhx_year_event"),
            p = this.date.add(p, 1, "day"), !(p.valueOf() >= o.valueOf())) ;);
        }
    } return this._markCalendarCurrentDate(r), r.conf = e, e.sync && !a && this._synced_minicalendars.push(r), r.conf._on_xle_handler || (r.conf._on_xle_handler = scheduler.attachEvent("onXLE", function () { scheduler.updateCalendar(r, r.conf.date) })), r
}, scheduler._get_def_cont = function (e) {
    return this._def_count || (this._def_count = document.createElement("DIV"), this._def_count.className = "dhx_minical_popup", this._def_count.onclick = function (e) {
        (e || event).cancelBubble = !0;

    }, document.body.appendChild(this._def_count)), this._def_count.style.left = e.left + "px", this._def_count.style.top = e.top + "px", this._def_count._created = new Date, this._def_count
}, scheduler._locateCalendar = function (e, t) {
    if ("string" == typeof t && (t = scheduler.templates.api_date(t)), +t > +e._max_date || +t < +e._min_date) return null; for (var a = e.childNodes[2].childNodes[0], r = 0, n = new Date(e._min_date) ; +this.date.add(n, 1, "week") <= +t;) n = this.date.add(n, 1, "week"), r++; var i = scheduler.config.start_on_monday, d = (t.getDay() || (i ? 7 : 0)) - (i ? 1 : 0);

    return a.rows[r].cells[d].firstChild
}, scheduler.markCalendar = function (e, t, a) { var r = this._locateCalendar(e, t); r && (r.className += " " + a) }, scheduler.unmarkCalendar = function (e, t, a) { if (t = t || e._last_date, a = a || "dhx_calendar_click", t) { var r = this._locateCalendar(e, t); r && (r.className = (r.className || "").replace(RegExp(a, "g"))) } }, scheduler._week_template = function (e) {
    for (var t = e || 250, a = 0, r = document.createElement("div"), n = this.date.week_start(scheduler._currentDate()), i = 0; 7 > i; i++) this._cols[i] = Math.floor(t / (7 - i)),
    this._render_x_header(i, a, n, r), n = this.date.add(n, 1, "day"), t -= this._cols[i], a += this._cols[i]; return r.lastChild.className += " dhx_scale_bar_last", r
}, scheduler.updateCalendar = function (e, t) { e.conf.date = t, this.renderCalendar(e.conf, e, !0) }, scheduler._mini_cal_arrows = ["&nbsp", "&nbsp"], scheduler._render_calendar = function (e, t, a, r) {
    var n = scheduler.templates, i = this._cols; this._cols = []; var d = this._mode; this._mode = "calendar"; var l = this._colsS; this._colsS = { height: 0 }; var s = new Date(this._min_date), o = new Date(this._max_date), _ = new Date(scheduler._date), c = n.month_day, u = this._ignores_detected;

    this._ignores_detected = 0, n.month_day = n.calendar_date, t = this.date.month_start(t); var h, p = this._week_template(e.offsetWidth - 1 - this.config.minicalendar.padding); if (r ? h = r : (h = document.createElement("DIV"), h.className = "dhx_cal_container dhx_mini_calendar"), h.setAttribute("date", this.templates.xml_format(t)), h.innerHTML = "<div class='dhx_year_month'></div><div class='dhx_year_week'>" + p.innerHTML + "</div><div class='dhx_year_body'></div>", h.childNodes[0].innerHTML = this.templates.calendar_month(t), a.navigation) for (var v = function (e, t) {
    var a = scheduler.date.add(e._date, t, "month"); scheduler.updateCalendar(e, a), scheduler._date.getMonth() == e._date.getMonth() && scheduler._date.getFullYear() == e._date.getFullYear() && scheduler._markCalendarCurrentDate(e)
    }, m = ["dhx_cal_prev_button", "dhx_cal_next_button"], g = ["left:1px;top:2px;position:absolute;", "left:auto; right:1px;top:2px;position:absolute;"], b = [-1, 1], f = function (e) { return function () { if (a.sync) for (var t = scheduler._synced_minicalendars, r = 0; r < t.length; r++) v(t[r], e); else v(h, e) } }, y = 0; 2 > y; y++) {
        var x = document.createElement("DIV"); x.className = m[y], x.style.cssText = g[y], x.innerHTML = this._mini_cal_arrows[y], h.firstChild.appendChild(x), x.onclick = f(b[y])
    } h._date = new Date(t), h.week_start = (t.getDay() - (this.config.start_on_monday ? 1 : 0) + 7) % 7; var k = h._min_date = this.date.week_start(t); h._max_date = this.date.add(h._min_date, 6, "week"), this._reset_month_scale(h.childNodes[2], t, k); for (var w = h.childNodes[2].firstChild.rows, D = w.length; 6 > D; D++) {
        var E = w[w.length - 1]; w[0].parentNode.appendChild(E.cloneNode(!0));

        var M = parseInt(E.childNodes[E.childNodes.length - 1].childNodes[0].innerHTML); M = 10 > M ? M : 0; for (var S = 0; S < w[D].childNodes.length; S++) w[D].childNodes[S].className = "dhx_after", w[D].childNodes[S].childNodes[0].innerHTML = scheduler.date.to_fixed(++M)
    } return r || e.appendChild(h), h.childNodes[1].style.height = h.childNodes[1].childNodes[0].offsetHeight - 1 + "px", this._cols = i, this._mode = d, this._colsS = l, this._min_date = s, this._max_date = o, scheduler._date = _, n.month_day = c, this._ignores_detected = u, h
}, scheduler.destroyCalendar = function (e, t) {
    !e && this._def_count && this._def_count.firstChild && (t || (new Date).valueOf() - this._def_count._created.valueOf() > 500) && (e = this._def_count.firstChild), e && (e.onclick = null, e.innerHTML = "", e.parentNode && e.parentNode.removeChild(e), this._def_count && (this._def_count.style.top = "-1000px"), e.conf && e.conf._on_xle_handler && scheduler.detachEvent(e.conf._on_xle_handler))
}, scheduler.isCalendarVisible = function () { return this._def_count && parseInt(this._def_count.style.top, 10) > 0 ? this._def_count : !1 }, scheduler._attach_minical_events = function () {
    dhtmlxEvent(document.body, "click", function () { scheduler.destroyCalendar() }), scheduler._attach_minical_events = function () { }
}, scheduler.attachEvent("onTemplatesReady", function () { scheduler._attach_minical_events() }), scheduler.templates.calendar_time = scheduler.date.date_to_str("%d-%m-%Y"), scheduler.form_blocks.calendar_time = {
    render: function () {
        var e = "<input class='dhx_readonly' type='text' readonly='true'>", t = scheduler.config, a = this.date.date_part(scheduler._currentDate()), r = 1440, n = 0; t.limit_time_select && (n = 60 * t.first_hour,
        r = 60 * t.last_hour + 1), a.setHours(n / 60), e += " <select>"; for (var i = n; r > i; i += 1 * this.config.time_step) { var d = this.templates.time_picker(a); e += "<option value='" + i + "'>" + d + "</option>", a = this.date.add(a, this.config.time_step, "minute") } e += "</select>"; scheduler.config.full_day; return "<div style='height:30px;padding-top:0; font-size:inherit;' class='dhx_section_time'>" + e + "<span style='font-weight:normal; font-size:10pt;'> &nbsp;&ndash;&nbsp; </span>" + e + "</div>"
    }, set_value: function (e, t, a) {
        function r(e, t, a) {
            s(e, t, a),
            e.value = scheduler.templates.calendar_time(t), e._date = scheduler.date.date_part(new Date(t))
        } var n, i, d = e.getElementsByTagName("input"), l = e.getElementsByTagName("select"), s = function (e, t, a) {
            e.onclick = function () {
                scheduler.destroyCalendar(null, !0), scheduler.renderCalendar({
                    position: e, date: new Date(this._date), navigation: !0, handler: function (t) {
                        e.value = scheduler.templates.calendar_time(t), e._date = new Date(t), scheduler.destroyCalendar(), scheduler.config.event_duration && scheduler.config.auto_end_date && 0 === a && u();

                    }
                })
            }
        }; if (scheduler.config.full_day) {
            if (!e._full_day) { var o = "<label class='dhx_fullday'><input type='checkbox' name='full_day' value='true'> " + scheduler.locale.labels.full_day + "&nbsp;</label></input>"; scheduler.config.wide_form || (o = e.previousSibling.innerHTML + o), e.previousSibling.innerHTML = o, e._full_day = !0 } var _ = e.previousSibling.getElementsByTagName("input")[0], c = 0 === scheduler.date.time_part(a.start_date) && 0 === scheduler.date.time_part(a.end_date); _.checked = c, l[0].disabled = _.checked, l[1].disabled = _.checked,
            _.onclick = function () { if (_.checked === !0) { var t = {}; scheduler.form_blocks.calendar_time.get_value(e, t), n = scheduler.date.date_part(t.start_date), i = scheduler.date.date_part(t.end_date), (+i == +n || +i >= +n && (0 !== a.end_date.getHours() || 0 !== a.end_date.getMinutes())) && (i = scheduler.date.add(i, 1, "day")) } var s = n || a.start_date, o = i || a.end_date; r(d[0], s), r(d[1], o), l[0].value = 60 * s.getHours() + s.getMinutes(), l[1].value = 60 * o.getHours() + o.getMinutes(), l[0].disabled = _.checked, l[1].disabled = _.checked }
        } if (scheduler.config.event_duration && scheduler.config.auto_end_date) {
            var u = function () { n = scheduler.date.add(d[0]._date, l[0].value, "minute"), i = new Date(n.getTime() + 60 * scheduler.config.event_duration * 1e3), d[1].value = scheduler.templates.calendar_time(i), d[1]._date = scheduler.date.date_part(new Date(i)), l[1].value = 60 * i.getHours() + i.getMinutes() }; l[0].onchange = u
        } r(d[0], a.start_date, 0), r(d[1], a.end_date, 1), s = function () { }, l[0].value = 60 * a.start_date.getHours() + a.start_date.getMinutes(), l[1].value = 60 * a.end_date.getHours() + a.end_date.getMinutes()
    }, get_value: function (e, t) {
        var a = e.getElementsByTagName("input"), r = e.getElementsByTagName("select");

        return t.start_date = scheduler.date.add(a[0]._date, r[0].value, "minute"), t.end_date = scheduler.date.add(a[1]._date, r[1].value, "minute"), t.end_date <= t.start_date && (t.end_date = scheduler.date.add(t.start_date, scheduler.config.time_step, "minute")), { start_date: new Date(t.start_date), end_date: new Date(t.end_date) }
    }, focus: function (e) { }
}, scheduler.linkCalendar = function (e, t) {
    var a = function () { var a = scheduler._date, r = new Date(a.valueOf()); return t && (r = t(r)), r.setDate(1), scheduler.updateCalendar(e, r), !0 }; scheduler.attachEvent("onViewChange", a),
    scheduler.attachEvent("onXLE", a), scheduler.attachEvent("onEventAdded", a), scheduler.attachEvent("onEventChanged", a), scheduler.attachEvent("onAfterEventDelete", a), a()
}, scheduler._markCalendarCurrentDate = function (e) {
    var t = scheduler._date, a = scheduler._mode, r = scheduler.date.month_start(new Date(e._date)), n = scheduler.date.add(r, 1, "month"); if ("day" == a || this._props && this._props[a]) r.valueOf() <= t.valueOf() && n > t && scheduler.markCalendar(e, t, "dhx_calendar_click"); else if ("week" == a) for (var i = scheduler.date.week_start(new Date(t.valueOf())), d = 0; 7 > d; d++) r.valueOf() <= i.valueOf() && n > i && scheduler.markCalendar(e, i, "dhx_calendar_click"),
    i = scheduler.date.add(i, 1, "day")
}, scheduler.attachEvent("onEventCancel", function () { scheduler.destroyCalendar(null, !0) });
//# sourceMappingURL=../sources/ext/dhtmlxscheduler_minical.js.map