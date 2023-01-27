/**
 * Spin Wheel (IIFE) v3.3.0
 * https://github.com/CrazyTim/spin-wheel#readme
 * Copyright (c) CrazyTim 2022.
 * Distributed under the MIT License.
 */
var wheel = (() => {
  var R = Object.defineProperty;
  var p = Object.getOwnPropertySymbols;
  var D = Object.prototype.hasOwnProperty,
    j = Object.prototype.propertyIsEnumerable;
  var f = Math.pow,
    y = (i, e, t) => e in i ? R(i, e, {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: t
    }) : i[e] = t,
    c = (i, e) => {
      for (var t in e || (e = {})) D.call(e, t) && y(i, t, e[t]);
      if (p)
        for (var t of p(e)) j.call(e, t) && y(i, t, e[t]);
      return i
    };
  var B = i => R(i, "__esModule", {
    value: !0
  });
  var T = (i, e) => {
    B(i);
    for (var t in e) R(i, t, {
      get: e[t],
      enumerable: !0
    })
  };
  var H = {};
  T(H, {
    Wheel: () => W
  });

  function S(i = 0, e = 0) {
    return i = Math.ceil(i), e = Math.floor(e), Math.floor(Math.random() * (e - i)) + i
  }

  function l(i = 0) {
    return i * Math.PI / 180
  }

  function x(i, e) {
    let t = 0;
    for (let s of i) {
      let n = s[e];
      n && (t += typeof n == "number" ? n : 1)
    }
    return t
  }

  function w(i, e, t) {
    return e < t ? e <= i && i < t : e <= i || i < t
  }

  function I(i, e, t, s) {
    s.save(), s.font = `1px ${e}`;
    let n = s.measureText(i).width;
    return s.restore(), t / n
  }

  function A(i = {
    x: 0,
    y: 0
  }, e, t, s) {
    return f(i.x - e, 2) + f(i.y - t, 2) <= f(s, 2)
  }

  function b(i = {
    x: 0,
    y: 0
  }, e = {}, t = 1) {
    let s = e.getBoundingClientRect();
    return {
      x: (i.x - s.left) * t,
      y: (i.y - s.top) * t
    }
  }

  function M(i, e, t, s) {
    let n = i - t,
      r = e - s,
      a = Math.atan2(-r, -n);
    return a *= 180 / Math.PI, a < 0 && (a += 360), a
  }

  function _(i = 0, e = 0) {
    let t = i + e,
      s;
    return t > 0 ? s = t % 360 : s = 360 + t % 360, s === 360 && (s = 0), s
  }

  function E(i = 0, e = 0) {
    let t = 180 - e,
      s = _(i, t);
    return 180 - s
  }

  function g(i) {
    return typeof i == "object" && !Array.isArray(i) && i !== null
  }
  var u = -90,
    m = 500,
    v = 250,
    O = Object.freeze({
      left: "left",
      right: "right",
      center: "center"
    }),
    o = Object.freeze({
      wheel: {
        borderColor: "#000",
        borderWidth: 0,
        debug: !1,
        image: null,
        isInteractive: !0,
        itemBackgroundColors: ["#fff"],
        itemLabelAlign: O.right,
        itemLabelBaselineOffset: 0,
        itemLabelColors: ["#000"],
        itemLabelFont: "sans-serif",
        itemLabelFontSizeMax: m,
        itemLabelRadius: .85,
        itemLabelRadiusMax: .2,
        itemLabelRotation: 0,
        items: [],
        lineColor: "#000",
        lineWidth: 1,
        pixelRatio: null,
        radius: .95,
        rotation: 0,
        rotationResistance: -35,
        rotationSpeed: 0,
        rotationSpeedMax: 250,
        offset: {
          w: 0,
          h: 0
        },
        onCurrentIndexChange: null,
        onRest: null,
        onSpin: null,
        overlayImage: null,
        pointerAngle: 0
      },
      item: {
        backgroundColor: null,
        image: null,
        imageRadius: .5,
        imageRotation: 0,
        imageScale: 1,
        label: "",
        labelColor: null,
        labelFont: null,
        weight: 1
      }
    }),
    C = Object.freeze({
      pointerLineColor: "#ff00ff",
      labelOutlineColor: "#ff00ff",
      dragEventHue: 200
    });

  function z(i = {}) {
    let e = i.canvas;
    i._handler_onPointerMoveRefreshCursor = (s = {}) => {
      let n = {
        x: s.clientX,
        y: s.clientY
      };
      i.isCursorOverWheel = i.wheelHitTest(n), i.refreshCursor()
    }, i._handler_onMouseMoveRefreshCursor = (s = {}) => {
      let n = {
        x: s.clientX,
        y: s.clientY
      };
      i.isCursorOverWheel = i.wheelHitTest(n), i.refreshCursor()
    }, i._handler_onPointerDown = (s = {}) => {
      let n = {
        x: s.clientX,
        y: s.clientY
      };
      if (!i.isInteractive || !i.wheelHitTest(n)) return;
      s.preventDefault(), i.dragStart(n), e.setPointerCapture(s.pointerId), e.addEventListener("pointermove", r), e.addEventListener("pointerup", a), e.addEventListener("pointercancel", a);

      function r(h = {}) {
        h.preventDefault(), i.dragMove({
          x: h.clientX,
          y: h.clientY
        })
      }

      function a(h = {}) {
        h.preventDefault(), e.releasePointerCapture(h.pointerId), e.removeEventListener("pointermove", r), e.removeEventListener("pointerup", a), e.removeEventListener("pointercancel", a), i.dragEnd()
      }
    }, i._handler_onMouseDown = (s = {}) => {
      let n = {
        x: s.clientX,
        y: s.clientY
      };
      if (!i.isInteractive || !i.wheelHitTest(n)) return;
      i.dragStart(n), document.addEventListener("mousemove", r), document.addEventListener("mouseup", a);

      function r(h = {}) {
        h.preventDefault(), i.dragMove({
          x: h.clientX,
          y: h.clientY
        })
      }

      function a(h = {}) {
        h.preventDefault(), document.removeEventListener("mousemove", r), document.removeEventListener("mouseup", a), i.dragEnd()
      }
    }, i._handler_onTouchStart = (s = {}) => {
      let n = {
        x: s.targetTouches[0].clientX,
        y: s.targetTouches[0].clientY
      };
      if (!i.isInteractive || !i.wheelHitTest(n)) return;
      s.preventDefault(), i.dragStart(n), e.addEventListener("touchmove", r), e.addEventListener("touchend", a), e.addEventListener("touchcancel", a);

      function r(h = {}) {
        h.preventDefault(), i.dragMove({
          x: h.targetTouches[0].clientX,
          y: h.targetTouches[0].clientY
        })
      }

      function a(h = {}) {
        h.preventDefault(), e.removeEventListener("touchmove", r), e.removeEventListener("touchend", a), e.removeEventListener("touchcancel", a), i.dragEnd()
      }
    }, "PointerEvent" in window ? (e.addEventListener("pointerdown", i._handler_onPointerDown), e.addEventListener("pointermove", i._handler_onPointerMoveRefreshCursor)) : (e.addEventListener("touchstart", i._handler_onTouchStart), e.addEventListener("mousedown", i._handler_onMouseDown), e.addEventListener("mousemove", i._handler_onMouseMoveRefreshCursor)), i._handler_onResize = i.resize.bind(i), window.addEventListener("resize", i._handler_onResize);
    let t = () => {
      i.resize(), matchMedia(`(resolution: ${pr}dppx)`).addEventListener("change", t, {
        once: !0
      })
    }
  }

  function F(i = {}) {
    let e = i.canvas;
    "PointerEvent" in window ? (e.removeEventListener("pointerdown", i._handler_onPointerDown), e.removeEventListener("pointermove", i._handler_onPointerMoveRefreshCursor)) : (e.removeEventListener("touchstart", i._handler_onTouchStart), e.removeEventListener("mousedown", i._handler_onMouseDown), e.removeEventListener("mousemove", i._handler_onMouseMoveRefreshCursor)), window.removeEventListener("resize", i._handler_onResize)
  }
  var L = class {
    constructor(e, t = {}) {
      if (!g(e) && e !== null) throw "wheel parameter must be an Object";
      if (!g(t) && t !== null) throw "props parameter must be an Object or null";
      this._wheel = e;
      for (let s of Object.keys(o.item)) this["_" + s] = o.item[s];
      t ? this.init(t) : this.init(o.item)
    }
    init(e = {}) {
      this.backgroundColor = e.backgroundColor, this.image = e.image, this.imageRadius = e.imageRadius, this.imageRotation = e.imageRotation, this.imageScale = e.imageScale, this.label = e.label, this.labelColor = e.labelColor, this.weight = e.weight
    }
    get backgroundColor() {
      return this._backgroundColor
    }
    set backgroundColor(e) {
      typeof e == "string" ? this._backgroundColor = e : this._backgroundColor = o.item.backgroundColor, this._wheel.refresh()
    }
    get image() {
      return this._image
    }
    set image(e) {
      typeof e == "string" ? (this._image = new Image, this._image.src = e, this._image.onload = (t) => {this._wheel.refresh()}, this._image.onerror = t => (this._image.error = !0, !0)) : this._image = o.item.image, this._wheel.refresh()
    }
    get imageRadius() {
      return this._imageRadius
    }
    set imageRadius(e) {
      typeof e == "number" ? this._imageRadius = e : this._imageRadius = o.item.imageRadius, this._wheel.refresh()
    }
    get imageRotation() {
      return this._imageRotation
    }
    set imageRotation(e) {
      typeof e == "number" ? this._imageRotation = e : this._imageRotation = o.item.imageRotation, this._wheel.refresh()
    }
    get imageScale() {
      return this._imageScale
    }
    set imageScale(e) {
      typeof e == "number" ? this._imageScale = e : this._imageScale = o.item.imageScale, this._wheel.refresh()
    }
    get label() {
      return this._label
    }
    set label(e) {
      typeof e == "string" ? this._label = e : this._label = o.item.label, this._wheel.refresh()
    }
    get labelColor() {
      return this._labelColor
    }
    set labelColor(e) {
      typeof e == "string" ? this._labelColor = e : this._labelColor = o.item.labelColor, this._wheel.refresh()
    }
    get weight() {
      return this._weight
    }
    set weight(e) {
      typeof e == "number" ? this._weight = e : this._weight = o.item.weight, this._wheel.refreshItemWeight()
    }
  };
  var W = class {
    constructor(e, t = {}) {
      if (this.frameRequestId = null, !(e instanceof Element)) throw "container parameter must be an Element";
      if (!g(t) && t !== null) throw "props parameter must be an Object or null";
      this.canvasContainer = e, this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.addCanvas(), z(this);
      for (let s of Object.keys(o.wheel)) this["_" + s] = o.wheel[s];
      t ? this.init(t) : this.init(o.wheel)
    }
    init(e = {}) {
      this._isInitialising = !0, this.borderColor = e.borderColor, this.borderWidth = e.borderWidth, this.debug = e.debug, this.image = e.image, this.isInteractive = e.isInteractive, this.itemBackgroundColors = e.itemBackgroundColors, this.itemLabelAlign = e.itemLabelAlign, this.itemLabelBaselineOffset = e.itemLabelBaselineOffset, this.itemLabelColors = e.itemLabelColors, this.itemLabelFont = e.itemLabelFont, this.itemLabelFontSizeMax = e.itemLabelFontSizeMax, this.itemLabelRadius = e.itemLabelRadius, this.itemLabelRadiusMax = e.itemLabelRadiusMax, this.itemLabelRotation = e.itemLabelRotation, this.items = e.items, this.lineColor = e.lineColor, this.lineWidth = e.lineWidth, this.pixelRatio = e.pixelRatio, this.rotationSpeedMax = e.rotationSpeedMax, this.radius = e.radius, this.rotation = e.rotation, this.rotationResistance = e.rotationResistance, this.rotationSpeed = e.rotationSpeed, this.offset = e.offset, this.onCurrentIndexChange = e.onCurrentIndexChange, this.onRest = e.onRest, this.onSpin = e.onSpin, this.overlayImage = e.overlayImage, this.pointerAngle = e.pointerAngle
    }
    addCanvas() {
      this.canvasContainer.appendChild(this.canvas)
    }
    removeCanvas() {
      this.canvasContainer.removeChild(this.canvas)
    }
    remove() {
      window.cancelAnimationFrame(this.frameRequestId), F(this), this.removeCanvas()
    }
    resize() {
      let [e, t] = [this.canvasContainer.clientWidth * this.getActualPixelRatio(), this.canvasContainer.clientHeight * this.getActualPixelRatio()], s = Math.min(e, t), n = {
        w: s - s * this.offset.w,
        h: s - s * this.offset.h
      }, r = Math.min(e / n.w, t / n.h);
      this.size = Math.max(n.w * r, n.h * r), this.canvas.style.width = this.canvasContainer.clientWidth + "px", this.canvas.style.height = this.canvasContainer.clientHeight + "px", this.canvas.width = e, this.canvas.height = t, this.center = {
        x: e / 2 + e * this.offset.w,
        y: t / 2 + t * this.offset.h
      }, this.actualRadius = this.size / 2 * this.radius, this.itemLabelFontSize = this.itemLabelFontSizeMax * (this.size / m), this.labelMaxWidth = this.actualRadius * (this.itemLabelRadius - this.itemLabelRadiusMax);
      for (let a of this._items) this.itemLabelFontSize = Math.min(this.itemLabelFontSize, I(a.label, this.itemLabelFont, this.labelMaxWidth, this.context));
      this.refresh()
    }
    draw(e = 0) {
      this.frameRequestId = null;
      let t = this.context;
      t.clearRect(0, 0, this.canvas.width, this.canvas.height), this.animateRotation(e);
      let s = this.getItemAngles(this.rotation),
        n = this.getActualBorderWidth();
      t.textBaseline = "middle", t.textAlign = this.itemLabelAlign, t.font = this.itemLabelFontSize + "px " + this.itemLabelFont, t.save();
      for (let [r, a] of s.entries()) {
        let h = new Path2D;
        h.moveTo(this.center.x, this.center.y), h.arc(this.center.x, this.center.y, this.actualRadius - n / 2, l(a.start + u), l(a.end + u)), this._items[r].path = h
      }
      this.drawItemBackgrounds(t, s), this.drawItemImages(t, s), this.drawItemLines(t, s), this.drawItemLabels(t, s), this.drawBorder(t), this.drawImage(t, this.image, !1), this.drawImage(t, this.overlayImage, !0), this.drawPointerLine(t), this.drawDragEvents(t), this._isInitialising = !1
    }
    drawItemBackgrounds(e, t = []) {
      var s;
      for (let [n, r] of t.entries()) {
        let a = this._items[n];
        e.fillStyle = (s = a.backgroundColor) != null ? s : this.itemBackgroundColors[n % this.itemBackgroundColors.length], e.fill(a.path)
      }
    }
    drawItemImages(e, t = []) {
      for (let [s, n] of t.entries()) {
        let r = this._items[s];
        if (!r.image || !r.image.complete || r.image.error) continue;
        e.save(), e.clip(r.path);
        let a = n.start + (n.end - n.start) / 2;
        e.translate(this.center.x + Math.cos(l(a + u)) * (this.actualRadius * r.imageRadius), this.center.y + Math.sin(l(a + u)) * (this.actualRadius * r.imageRadius)), e.rotate(l(a + r.imageRotation));
        let h = this.size / 500 * r.image.width * r.imageScale,
          d = this.size / 500 * r.image.height * r.imageScale,
          k = -h / 2,
          P = -d / 2;
        e.drawImage(r.image, k, P, h, d), e.restore()
      }
    }
    drawImage(e, t, s = !1) {
      if (!t) return;
      e.translate(this.center.x, this.center.y), s || e.rotate(l(this.rotation));
      let n = s ? this.size : this.size * this.radius,
        r = -(n / 2);
      e.drawImage(t, r, r, n, n), e.resetTransform()
    }
    drawPointerLine(e, t, s = !1) {
      !this.debug || (e.translate(this.center.x, this.center.y), e.rotate(l(this.pointerAngle + u)), e.beginPath(), e.moveTo(0, 0), e.lineTo(this.actualRadius * 2, 0), e.strokeStyle = C.pointerLineColor, e.lineWidth = 2, e.stroke(), e.resetTransform())
    }
    drawBorder(e) {
      let t = this.getActualBorderWidth();
      e.beginPath(), e.strokeStyle = this.borderColor, e.lineWidth = t, e.arc(this.center.x, this.center.y, this.actualRadius - t / 2, 0, 2 * Math.PI), e.stroke()
    }
    drawItemLines(e, t = []) {
      if (this.lineWidth <= 0) return;
      let s = this.lineWidth / m * this.size;
      e.translate(this.center.x, this.center.y);
      for (let [n, r] of t.entries()) e.rotate(l(r.start + u)), e.beginPath(), e.moveTo(0, 0), e.lineTo(this.actualRadius - s, 0), e.strokeStyle = this.lineColor, e.lineWidth = s, e.stroke(), e.rotate(-l(r.start + u));
      e.resetTransform()
    }
    drawItemLabels(e, t = []) {
      var n;
      let s = this.itemLabelFontSize * -this.itemLabelBaselineOffset;
      for (let [r, a] of t.entries()) {
        let h = this._items[r];
        if (!h.label) continue;
        e.save(), e.clip(h.path);
        let d = a.start + (a.end - a.start) / 2;
        e.translate(this.center.x + Math.cos(l(d + u)) * (this.actualRadius * this.itemLabelRadius), this.center.y + Math.sin(l(d + u)) * (this.actualRadius * this.itemLabelRadius)), e.rotate(l(d + u)), e.rotate(l(this.itemLabelRotation)), this.debug && (e.beginPath(), e.moveTo(0, 0), e.lineTo(-this.labelMaxWidth, 0), e.strokeStyle = C.labelOutlineColor, e.lineWidth = 1, e.stroke(), e.strokeRect(0, -this.itemLabelFontSize / 2, -this.labelMaxWidth, this.itemLabelFontSize)), e.fillStyle = (n = h.labelColor) != null ? n : this.itemLabelColors[r % this.itemLabelColors.length], e.fillText(h.label, 0, s), e.restore()
      }
    }
    drawDragEvents(e) {
      var s;
      if (!this.debug || !((s = this.dragEvents) == null ? void 0 : s.length)) return;
      let t = [...this.dragEvents].reverse();
      for (let [n, r] of t.entries()) {
        let a = n / this.dragEvents.length * 100;
        e.beginPath(), e.arc(r.x, r.y, 5, 0, 2 * Math.PI), e.fillStyle = `hsl(${C.dragEventHue},100%,${a}%)`, e.strokeStyle = "#000", e.lineWidth = .5, e.fill(), e.stroke()
      }
    }
    animateRotation(e = 0) {
      if (this.rotationSpeed !== 0) {
        this.refresh(), this.lastRotationFrame === void 0 && (this.lastRotationFrame = e);
        let t = e - this.lastRotationFrame;
        t > 0 && (this.rotation += t / 1e3 * this.rotationSpeed % 360, this.rotationSpeed = this.getRotationSpeedPlusDrag(t), this.rotationSpeed === 0 && this.raiseEvent_onRest(), this.lastRotationFrame = e);
        return
      }
      this.lastRotationFrame = void 0
    }
    getRotationSpeedPlusDrag(e = 0) {
      let t = this.rotationSpeed + this.rotationResistance * (e / 1e3) * this._rotationDirection;
      return this._rotationDirection === 1 && t < 0 || this._rotationDirection === -1 && t >= 0 ? 0 : t
    }
    spin(e = 0, t = 0) {
      let s = t / 2;
      this.rotationSpeed = S(e * (1 - s), e * (1 + s)), this.rotationSpeed !== 0 && this.raiseEvent_onSpin()
    }
    getActualBorderWidth() {
      return this.borderWidth / m * this.size
    }
    getActualPixelRatio() {
      var e;
      return (e = this._pixelRatio) != null ? e : window.devicePixelRatio
    }
    wheelHitTest(e = {
      x: 0,
      y: 0
    }) {
      let t = b(e, this.canvas, this.getActualPixelRatio());
      return A(t, this.center.x, this.center.y, this.actualRadius)
    }
    refreshCursor() {
      if (this.isDragging) {
        this.canvas.style.cursor = "grabbing";
        return
      }
      if (this.isInteractive && this.isCursorOverWheel) {
        this.canvas.style.cursor = "grab";
        return
      }
      this.canvas.style.cursor = null
    }
    getAngleFromCenter(e = {
      x: 0,
      y: 0
    }) {
      return (M(this.center.x, this.center.y, e.x, e.y) + 90) % 360
    }
    getCurrentIndex() {
      return this._currentIndex
    }
    refreshCurrentIndex(e = []) {
      this._items.length === 0 && (this._currentIndex = -1);
      for (let [t, s] of e.entries())
        if (!!w(this.pointerAngle, s.start % 360, s.end % 360)) {
          if (this._currentIndex === t) break;
          this._currentIndex = t, this._isInitialising || this.raiseEvent_onCurrentIndexChange();
          break
        }
    }
    refreshItemWeight() {
      this._items.length ? this.weightedItemAngle = 360 / x(this._items, "weight") : this.weightedItemAngle = 0, this.refresh()
    }
    getItemAngles(e = 0) {
      let t = [],
        s, n = e;
      for (let r of this._items) s = r.weight * this.weightedItemAngle, t.push({
        start: n,
        end: n + s
      }), n += s;
      return this._items.length > 1 && (t[t.length - 1].end = t[0].start + 360), t
    }
    refresh() {
      this.frameRequestId === null && (this.frameRequestId = window.requestAnimationFrame(this.draw.bind(this)))
    }
    get borderColor() {
      return this._borderColor
    }
    set borderColor(e) {
      typeof e == "string" ? this._borderColor = e : this._borderColor = o.wheel.borderColor, this.refresh()
    }
    get borderWidth() {
      return this._borderWidth
    }
    set borderWidth(e) {
      typeof e == "number" ? this._borderWidth = e : this._borderWidth = o.wheel.borderWidth, this.refresh()
    }
    get debug() {
      return this._debug
    }
    set debug(e) {
      typeof e == "boolean" ? this._debug = e : this._debug = o.wheel.debug, this.refresh()
    }
    get image() {
      return this._image
    }
    set image(e) {
      typeof e == "string" ? (this._image = new Image, this._image.src = e, this._image.onload = t => this._wheel.refresh()) : this._image = o.wheel.image, this.refresh()
    }
    get isInteractive() {
      return this._isInteractive
    }
    set isInteractive(e) {
      typeof e == "boolean" ? this._isInteractive = e : this._isInteractive = o.wheel.isInteractive, this.refresh()
    }
    get itemBackgroundColors() {
      return this._itemBackgroundColors
    }
    set itemBackgroundColors(e) {
      Array.isArray(e) ? this._itemBackgroundColors = e : this._itemBackgroundColors = o.wheel.itemBackgroundColors, this.refresh()
    }
    get itemLabelAlign() {
      return this._itemLabelAlign
    }
    set itemLabelAlign(e) {
      typeof e == "string" ? this._itemLabelAlign = e : this._itemLabelAlign = o.wheel.itemLabelAlign, this.refresh()
    }
    get itemLabelBaselineOffset() {
      return this._itemLabelBaselineOffset
    }
    set itemLabelBaselineOffset(e) {
      typeof e == "number" ? this._itemLabelBaselineOffset = e : this._itemLabelBaselineOffset = o.wheel.itemLabelBaselineOffset, this.resize()
    }
    get itemLabelColors() {
      return this._itemLabelColors
    }
    set itemLabelColors(e) {
      Array.isArray(e) ? this._itemLabelColors = e : this._itemLabelColors = o.wheel.itemLabelColors, this.refresh()
    }
    get itemLabelFont() {
      return this._itemLabelFont
    }
    set itemLabelFont(e) {
      typeof e == "string" ? this._itemLabelFont = e : this._itemLabelFont = o.wheel.itemLabelFont, this.resize()
    }
    get itemLabelFontSizeMax() {
      return this._itemLabelFontSizeMax
    }
    set itemLabelFontSizeMax(e) {
      typeof e == "number" ? this._itemLabelFontSizeMax = e : this._itemLabelFontSizeMax = o.wheel.itemLabelFontSizeMax, this.refresh()
    }
    get itemLabelRadius() {
      return this._itemLabelRadius
    }
    set itemLabelRadius(e) {
      typeof e == "number" ? this._itemLabelRadius = e : this._itemLabelRadius = o.wheel.itemLabelRadius, this.refresh()
    }
    get itemLabelRadiusMax() {
      return this._itemLabelRadiusMax
    }
    set itemLabelRadiusMax(e) {
      typeof e == "number" ? this._itemLabelRadiusMax = e : this._itemLabelRadiusMax = o.wheel.itemLabelRadiusMax, this.refresh()
    }
    get itemLabelRotation() {
      return this._itemLabelRotation
    }
    set itemLabelRotation(e) {
      typeof e == "number" ? this._itemLabelRotation = e : this._itemLabelRotation = o.wheel.itemLabelRotation, this.refresh()
    }
    get items() {
      return this._items
    }
    set items(e) {
      if (Array.isArray(e)) {
        this._items = [];
        for (let t of e) this._items.push(new L(this, {
          backgroundColor: t.backgroundColor,
          image: t.image,
          imageRadius: t.imageRadius,
          imageRotation: t.imageRotation,
          imageScale: t.imageScale,
          label: t.label,
          labelColor: t.labelColor,
          weight: t.weight
        }))
      } else this._items = o.wheel.items;
      this.refreshItemWeight(), this.refreshCurrentIndex(this.getItemAngles(this.rotation))
    }
    get lineColor() {
      return this._lineColor
    }
    set lineColor(e) {
      typeof e == "string" ? this._lineColor = e : this._lineColor = o.wheel.lineColor, this.refresh()
    }
    get lineWidth() {
      return this._lineWidth
    }
    set lineWidth(e) {
      typeof e == "number" ? this._lineWidth = e : this._lineWidth = o.wheel.lineWidth, this.refresh()
    }
    get radius() {
      return this._radius
    }
    set radius(e) {
      typeof e == "number" ? this._radius = e : this._radius = o.wheel.radius, this.resize()
    }
    get rotation() {
      return this._rotation
    }
    set rotation(e) {
      typeof e == "number" ? this._rotation = e : this._rotation = o.wheel.rotation, this.refreshCurrentIndex(this.getItemAngles(this.rotation)), this.refresh()
    }
    get rotationResistance() {
      return this._rotationResistance
    }
    set rotationResistance(e) {
      typeof e == "number" ? this._rotationResistance = e : this._rotationResistance = o.wheel.rotationResistance
    }
    get pixelRatio() {
      return this._pixelRatio
    }
    set pixelRatio(e) {
      typeof e == "number" || e === null ? this._pixelRatio = e : this._pixelRatio = o.wheel.pixelRatio, this.resize()
    }
    get rotationSpeed() {
      return this._rotationSpeed
    }
    set rotationSpeed(e) {
      if (typeof e == "number") {
        let t = Math.min(e, this.rotationSpeedMax);
        t = Math.max(t, -this.rotationSpeedMax), this._rotationDirection = t > 0 ? 1 : -1, this._rotationSpeed = t
      } else this._rotationDirection = 0, this._rotationSpeed = o.wheel.rotationSpeed;
      this.refresh()
    }
    get rotationSpeedMax() {
      return this._rotationSpeedMax
    }
    set rotationSpeedMax(e) {
      typeof e == "number" ? this._rotationSpeedMax = e : this._rotationSpeedMax = o.wheel.rotationSpeedMax
    }
    get offset() {
      return this._offset
    }
    set offset(e) {
      e ? this._offset = e : this._offset = o.wheel.offset, this.resize()
    }
    get onCurrentIndexChange() {
      return this._onCurrentIndexChange
    }
    set onCurrentIndexChange(e) {
      typeof e == "function" ? this._onCurrentIndexChange = e : this._onCurrentIndexChange = o.wheel.onCurrentIndexChange
    }
    get onRest() {
      return this._onRest
    }
    set onRest(e) {
      typeof e == "function" ? this._onRest = e : this._onRest = o.wheel.onRest
    }
    get onSpin() {
      return this._onSpin
    }
    set onSpin(e) {
      typeof e == "function" ? this._onSpin = e : this._onSpin = o.wheel.onSpin
    }
    get overlayImage() {
      return this._overlayImage
    }
    set overlayImage(e) {
      typeof e == "string" ? (this._overlayImage = new Image, this._overlayImage.src = e, this._overlayImage.onload = t => this.refresh()) : this._overlayImage = o.wheel.overlayImage, this.refresh()
    }
    get pointerAngle() {
      return this._pointerAngle
    }
    set pointerAngle(e) {
      typeof e == "number" ? this._pointerAngle = e : this._pointerAngle = o.wheel.pointerAngle
    }
    dragStart(e = {
      x: 0,
      y: 0
    }) {
      let t = b(e, this.canvas, this.getActualPixelRatio()),
        s = -this.getAngleFromCenter(t);
      this.isDragging = !0, this.rotationSpeed = 0, this.dragStartRotation = _(s, this.rotation), this.dragEvents = [{
        distance: 0,
        x: t.x,
        y: t.y,
        now: performance.now()
      }], this.refreshCursor()
    }
    dragMove(e = {
      x: 0,
      y: 0
    }) {
      let t = b(e, this.canvas, this.getActualPixelRatio()),
        s = this.getAngleFromCenter(t),
        n = this.dragEvents[0],
        r = this.getAngleFromCenter(n),
        a = E(r, s);
      this.dragEvents.unshift({
        distance: a,
        x: t.x,
        y: t.y,
        now: performance.now()
      }), this.debug && this.dragEvents.length >= 40 && this.dragEvents.pop(), this.rotation = _(s, this.dragStartRotation)
    }
    dragEnd() {
      this.isDragging = !1;
      let e = 0,
        t = performance.now();
      for (let [s, n] of this.dragEvents.entries()) {
        if (!this.isDragEventTooOld(t, n)) {
          e += n.distance;
          continue
        }
        this.dragEvents.length = s;
        break
      }
      this.refreshCursor(), e !== 0 && (this.rotationSpeed = e * (1e3 / v), this.raiseEvent_onSpin({
        dragEvents: this.dragEvents
      }))
    }
    isDragEventTooOld(e = 0, t = {}) {
      return e - t.now > v
    }
    raiseEvent_onCurrentIndexChange(e = {}) {
      var t;
      (t = this.onCurrentIndexChange) == null || t.call(this, c({
        event: "currentIndexChange",
        currentIndex: this._currentIndex
      }, e))
    }
    raiseEvent_onRest(e = {}) {
      var t;
      (t = this.onRest) == null || t.call(this, c({
        event: "rest",
        currentIndex: this._currentIndex
      }, e))
    }
    raiseEvent_onSpin(e = {}) {
      var t;
      (t = this.onSpin) == null || t.call(this, c({
        event: "spin",
        rotationSpeed: this.rotationSpeed
      }, e))
    }
  };
  return H;
})();
