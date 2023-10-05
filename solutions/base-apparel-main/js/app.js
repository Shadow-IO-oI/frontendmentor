(() => {
    "use strict";
    const modules_flsModules = {};
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    function functions_FLS(message) {
        setTimeout((() => {
            if (window.FLS) console.log(message);
        }), 0);
    }
    class MousePRLX {
        constructor(props, data = null) {
            let defaultConfig = {
                init: true,
                logging: true
            };
            this.config = Object.assign(defaultConfig, props);
            if (this.config.init) {
                const paralaxMouse = document.querySelectorAll("[data-prlx-mouse]");
                if (paralaxMouse.length) {
                    this.paralaxMouseInit(paralaxMouse);
                    this.setLogging(`Прокинувся, стежу за об'єктами: (${paralaxMouse.length})`);
                } else this.setLogging("Немає жодного обєкта. Сплю...zzZZZzZZz...");
            }
        }
        paralaxMouseInit(paralaxMouse) {
            paralaxMouse.forEach((el => {
                const paralaxMouseWrapper = el.closest("[data-prlx-mouse-wrapper]");
                const paramСoefficientX = el.dataset.prlxCx ? +el.dataset.prlxCx : 100;
                const paramСoefficientY = el.dataset.prlxCy ? +el.dataset.prlxCy : 100;
                const directionX = el.hasAttribute("data-prlx-dxr") ? -1 : 1;
                const directionY = el.hasAttribute("data-prlx-dyr") ? -1 : 1;
                const paramAnimation = el.dataset.prlxA ? +el.dataset.prlxA : 50;
                let positionX = 0, positionY = 0;
                let coordXprocent = 0, coordYprocent = 0;
                setMouseParallaxStyle();
                if (paralaxMouseWrapper) mouseMoveParalax(paralaxMouseWrapper); else mouseMoveParalax();
                function setMouseParallaxStyle() {
                    const distX = coordXprocent - positionX;
                    const distY = coordYprocent - positionY;
                    positionX += distX * paramAnimation / 1e3;
                    positionY += distY * paramAnimation / 1e3;
                    el.style.cssText = `transform: translate3D(${directionX * positionX / (paramСoefficientX / 10)}%,${directionY * positionY / (paramСoefficientY / 10)}%,0);`;
                    requestAnimationFrame(setMouseParallaxStyle);
                }
                function mouseMoveParalax(wrapper = window) {
                    wrapper.addEventListener("mousemove", (function(e) {
                        const offsetTop = el.getBoundingClientRect().top + window.scrollY;
                        if (offsetTop >= window.scrollY || offsetTop + el.offsetHeight >= window.scrollY) {
                            const parallaxWidth = window.innerWidth;
                            const parallaxHeight = window.innerHeight;
                            const coordX = e.clientX - parallaxWidth / 2;
                            const coordY = e.clientY - parallaxHeight / 2;
                            coordXprocent = coordX / parallaxWidth * 100;
                            coordYprocent = coordY / parallaxHeight * 100;
                        }
                    }));
                }
            }));
        }
        setLogging(message) {
            this.config.logging ? functions_FLS(`[PRLX Mouse]: ${message}`) : null;
        }
    }
    modules_flsModules.mousePrlx = new MousePRLX({});
    let formValidate = {
        getErrors(form) {
            let error = 0;
            let formRequiredItems = form.querySelectorAll("*[data-required]");
            if (formRequiredItems.length) formRequiredItems.forEach((formRequiredItem => {
                if ((null !== formRequiredItem.offsetParent || "SELECT" === formRequiredItem.tagName) && !formRequiredItem.disabled) error += this.validateInput(formRequiredItem);
            }));
            return error;
        },
        validateInput(formRequiredItem) {
            let error = 0;
            if ("email" === formRequiredItem.dataset.required) {
                formRequiredItem.value = formRequiredItem.value.replace(" ", "");
                if (this.emailTest(formRequiredItem)) {
                    this.addError(formRequiredItem);
                    error++;
                } else this.removeError(formRequiredItem);
            } else if ("checkbox" === formRequiredItem.type && !formRequiredItem.checked) {
                this.addError(formRequiredItem);
                error++;
            } else if (!formRequiredItem.value.trim()) {
                this.addError(formRequiredItem);
                error++;
            } else this.removeError(formRequiredItem);
            return error;
        },
        addError(formRequiredItem) {
            formRequiredItem.classList.add("_form-error");
            formRequiredItem.parentElement.classList.add("_form-error");
            let inputError = formRequiredItem.parentElement.querySelector(".form__error");
            if (inputError) formRequiredItem.parentElement.removeChild(inputError);
            if (formRequiredItem.dataset.error) formRequiredItem.parentElement.insertAdjacentHTML("beforeend", `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
        },
        removeError(formRequiredItem) {
            formRequiredItem.classList.remove("_form-error");
            formRequiredItem.parentElement.classList.remove("_form-error");
            if (formRequiredItem.parentElement.querySelector(".form__error")) formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector(".form__error"));
        },
        formClean(form) {
            form.reset();
            setTimeout((() => {
                let inputs = form.querySelectorAll("input,textarea");
                for (let index = 0; index < inputs.length; index++) {
                    const el = inputs[index];
                    el.parentElement.classList.remove("_form-focus");
                    el.classList.remove("_form-focus");
                    formValidate.removeError(el);
                }
                let checkboxes = form.querySelectorAll(".checkbox__input");
                if (checkboxes.length > 0) for (let index = 0; index < checkboxes.length; index++) {
                    const checkbox = checkboxes[index];
                    checkbox.checked = false;
                }
                if (modules_flsModules.select) {
                    let selects = form.querySelectorAll(".select");
                    if (selects.length) for (let index = 0; index < selects.length; index++) {
                        const select = selects[index].querySelector("select");
                        modules_flsModules.select.selectBuild(select);
                    }
                }
            }), 0);
        },
        emailTest(formRequiredItem) {
            return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
        }
    };
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    function _assertThisInitialized(self) {
        if (void 0 === self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return self;
    }
    function _inheritsLoose(subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype);
        subClass.prototype.constructor = subClass;
        subClass.__proto__ = superClass;
    }
    /*!
 * GSAP 3.11.5
 * https://greensock.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/    var _suppressOverwrites, _reverting, _context, _globalTimeline, _win, _coreInitted, _doc, _coreReady, _lastRenderedFrame, _quickTween, _tickerActive, _config = {
        autoSleep: 120,
        force3D: "auto",
        nullTargetWarn: 1,
        units: {
            lineHeight: ""
        }
    }, _defaults = {
        duration: .5,
        overwrite: false,
        delay: 0
    }, _bigNum = 1e8, _tinyNum = 1 / _bigNum, _2PI = 2 * Math.PI, _HALF_PI = _2PI / 4, _gsID = 0, _sqrt = Math.sqrt, _cos = Math.cos, _sin = Math.sin, _isString = function _isString(value) {
        return "string" === typeof value;
    }, _isFunction = function _isFunction(value) {
        return "function" === typeof value;
    }, _isNumber = function _isNumber(value) {
        return "number" === typeof value;
    }, _isUndefined = function _isUndefined(value) {
        return "undefined" === typeof value;
    }, _isObject = function _isObject(value) {
        return "object" === typeof value;
    }, _isNotFalse = function _isNotFalse(value) {
        return false !== value;
    }, _windowExists = function _windowExists() {
        return "undefined" !== typeof window;
    }, _isFuncOrString = function _isFuncOrString(value) {
        return _isFunction(value) || _isString(value);
    }, _isTypedArray = "function" === typeof ArrayBuffer && ArrayBuffer.isView || function() {}, _isArray = Array.isArray, _strictNumExp = /(?:-?\.?\d|\.)+/gi, _numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, _numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, _complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, _relExp = /[+-]=-?[.\d]+/, _delimitedValueExp = /[^,'"\[\]\s]+/gi, _unitExp = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, _globals = {}, _installScope = {}, _install = function _install(scope) {
        return (_installScope = _merge(scope, _globals)) && gsap;
    }, _missingPlugin = function _missingPlugin(property, value) {
        return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
    }, _warn = function _warn(message, suppress) {
        return !suppress && console.warn(message);
    }, _addGlobal = function _addGlobal(name, obj) {
        return name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj) || _globals;
    }, _emptyFunc = function _emptyFunc() {
        return 0;
    }, _startAtRevertConfig = {
        suppressEvents: true,
        isStart: true,
        kill: false
    }, _revertConfigNoKill = {
        suppressEvents: true,
        kill: false
    }, _revertConfig = {
        suppressEvents: true
    }, _reservedProps = {}, _lazyTweens = [], _lazyLookup = {}, _plugins = {}, _effects = {}, _nextGCFrame = 30, _harnessPlugins = [], _callbackNames = "", _harness = function _harness(targets) {
        var harnessPlugin, i, target = targets[0];
        _isObject(target) || _isFunction(target) || (targets = [ targets ]);
        if (!(harnessPlugin = (target._gsap || {}).harness)) {
            i = _harnessPlugins.length;
            while (i-- && !_harnessPlugins[i].targetTest(target)) ;
            harnessPlugin = _harnessPlugins[i];
        }
        i = targets.length;
        while (i--) targets[i] && (targets[i]._gsap || (targets[i]._gsap = new GSCache(targets[i], harnessPlugin))) || targets.splice(i, 1);
        return targets;
    }, _getCache = function _getCache(target) {
        return target._gsap || _harness(toArray(target))[0]._gsap;
    }, _getProperty = function _getProperty(target, property, v) {
        return (v = target[property]) && _isFunction(v) ? target[property]() : _isUndefined(v) && target.getAttribute && target.getAttribute(property) || v;
    }, _forEachName = function _forEachName(names, func) {
        return (names = names.split(",")).forEach(func) || names;
    }, _round = function _round(value) {
        return Math.round(1e5 * value) / 1e5 || 0;
    }, _roundPrecise = function _roundPrecise(value) {
        return Math.round(1e7 * value) / 1e7 || 0;
    }, _parseRelative = function _parseRelative(start, value) {
        var operator = value.charAt(0), end = parseFloat(value.substr(2));
        start = parseFloat(start);
        return "+" === operator ? start + end : "-" === operator ? start - end : "*" === operator ? start * end : start / end;
    }, _arrayContainsAny = function _arrayContainsAny(toSearch, toFind) {
        var l = toFind.length, i = 0;
        for (;toSearch.indexOf(toFind[i]) < 0 && ++i < l; ) ;
        return i < l;
    }, _lazyRender = function _lazyRender() {
        var i, tween, l = _lazyTweens.length, a = _lazyTweens.slice(0);
        _lazyLookup = {};
        _lazyTweens.length = 0;
        for (i = 0; i < l; i++) {
            tween = a[i];
            tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
        }
    }, _lazySafeRender = function _lazySafeRender(animation, time, suppressEvents, force) {
        _lazyTweens.length && !_reverting && _lazyRender();
        animation.render(time, suppressEvents, force || _reverting && time < 0 && (animation._initted || animation._startAt));
        _lazyTweens.length && !_reverting && _lazyRender();
    }, _numericIfPossible = function _numericIfPossible(value) {
        var n = parseFloat(value);
        return (n || 0 === n) && (value + "").match(_delimitedValueExp).length < 2 ? n : _isString(value) ? value.trim() : value;
    }, _passThrough = function _passThrough(p) {
        return p;
    }, _setDefaults = function _setDefaults(obj, defaults) {
        for (var p in defaults) p in obj || (obj[p] = defaults[p]);
        return obj;
    }, _setKeyframeDefaults = function _setKeyframeDefaults(excludeDuration) {
        return function(obj, defaults) {
            for (var p in defaults) p in obj || "duration" === p && excludeDuration || "ease" === p || (obj[p] = defaults[p]);
        };
    }, _merge = function _merge(base, toMerge) {
        for (var p in toMerge) base[p] = toMerge[p];
        return base;
    }, _mergeDeep = function _mergeDeep(base, toMerge) {
        for (var p in toMerge) "__proto__" !== p && "constructor" !== p && "prototype" !== p && (base[p] = _isObject(toMerge[p]) ? _mergeDeep(base[p] || (base[p] = {}), toMerge[p]) : toMerge[p]);
        return base;
    }, _copyExcluding = function _copyExcluding(obj, excluding) {
        var p, copy = {};
        for (p in obj) p in excluding || (copy[p] = obj[p]);
        return copy;
    }, _inheritDefaults = function _inheritDefaults(vars) {
        var parent = vars.parent || _globalTimeline, func = vars.keyframes ? _setKeyframeDefaults(_isArray(vars.keyframes)) : _setDefaults;
        if (_isNotFalse(vars.inherit)) while (parent) {
            func(vars, parent.vars.defaults);
            parent = parent.parent || parent._dp;
        }
        return vars;
    }, _arraysMatch = function _arraysMatch(a1, a2) {
        var i = a1.length, match = i === a2.length;
        while (match && i-- && a1[i] === a2[i]) ;
        return i < 0;
    }, _addLinkedListItem = function _addLinkedListItem(parent, child, firstProp, lastProp, sortBy) {
        if (void 0 === firstProp) firstProp = "_first";
        if (void 0 === lastProp) lastProp = "_last";
        var t, prev = parent[lastProp];
        if (sortBy) {
            t = child[sortBy];
            while (prev && prev[sortBy] > t) prev = prev._prev;
        }
        if (prev) {
            child._next = prev._next;
            prev._next = child;
        } else {
            child._next = parent[firstProp];
            parent[firstProp] = child;
        }
        if (child._next) child._next._prev = child; else parent[lastProp] = child;
        child._prev = prev;
        child.parent = child._dp = parent;
        return child;
    }, _removeLinkedListItem = function _removeLinkedListItem(parent, child, firstProp, lastProp) {
        if (void 0 === firstProp) firstProp = "_first";
        if (void 0 === lastProp) lastProp = "_last";
        var prev = child._prev, next = child._next;
        if (prev) prev._next = next; else if (parent[firstProp] === child) parent[firstProp] = next;
        if (next) next._prev = prev; else if (parent[lastProp] === child) parent[lastProp] = prev;
        child._next = child._prev = child.parent = null;
    }, _removeFromParent = function _removeFromParent(child, onlyIfParentHasAutoRemove) {
        child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) && child.parent.remove(child);
        child._act = 0;
    }, _uncache = function _uncache(animation, child) {
        if (animation && (!child || child._end > animation._dur || child._start < 0)) {
            var a = animation;
            while (a) {
                a._dirty = 1;
                a = a.parent;
            }
        }
        return animation;
    }, _recacheAncestors = function _recacheAncestors(animation) {
        var parent = animation.parent;
        while (parent && parent.parent) {
            parent._dirty = 1;
            parent.totalDuration();
            parent = parent.parent;
        }
        return animation;
    }, _rewindStartAt = function _rewindStartAt(tween, totalTime, suppressEvents, force) {
        return tween._startAt && (_reverting ? tween._startAt.revert(_revertConfigNoKill) : tween.vars.immediateRender && !tween.vars.autoRevert || tween._startAt.render(totalTime, true, force));
    }, _hasNoPausedAncestors = function _hasNoPausedAncestors(animation) {
        return !animation || animation._ts && _hasNoPausedAncestors(animation.parent);
    }, _elapsedCycleDuration = function _elapsedCycleDuration(animation) {
        return animation._repeat ? _animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
    }, _animationCycle = function _animationCycle(tTime, cycleDuration) {
        var whole = Math.floor(tTime /= cycleDuration);
        return tTime && whole === tTime ? whole - 1 : whole;
    }, _parentToChildTotalTime = function _parentToChildTotalTime(parentTime, child) {
        return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
    }, _setEnd = function _setEnd(animation) {
        return animation._end = _roundPrecise(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || _tinyNum) || 0));
    }, _alignPlayhead = function _alignPlayhead(animation, totalTime) {
        var parent = animation._dp;
        if (parent && parent.smoothChildTiming && animation._ts) {
            animation._start = _roundPrecise(parent._time - (animation._ts > 0 ? totalTime / animation._ts : ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) / -animation._ts));
            _setEnd(animation);
            parent._dirty || _uncache(parent, animation);
        }
        return animation;
    }, _postAddChecks = function _postAddChecks(timeline, child) {
        var t;
        if (child._time || child._initted && !child._dur) {
            t = _parentToChildTotalTime(timeline.rawTime(), child);
            if (!child._dur || _clamp(0, child.totalDuration(), t) - child._tTime > _tinyNum) child.render(t, true);
        }
        if (_uncache(timeline, child)._dp && timeline._initted && timeline._time >= timeline._dur && timeline._ts) {
            if (timeline._dur < timeline.duration()) {
                t = timeline;
                while (t._dp) {
                    t.rawTime() >= 0 && t.totalTime(t._tTime);
                    t = t._dp;
                }
            }
            timeline._zTime = -_tinyNum;
        }
    }, _addToTimeline = function _addToTimeline(timeline, child, position, skipChecks) {
        child.parent && _removeFromParent(child);
        child._start = _roundPrecise((_isNumber(position) ? position : position || timeline !== _globalTimeline ? _parsePosition(timeline, position, child) : timeline._time) + child._delay);
        child._end = _roundPrecise(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));
        _addLinkedListItem(timeline, child, "_first", "_last", timeline._sort ? "_start" : 0);
        _isFromOrFromStart(child) || (timeline._recent = child);
        skipChecks || _postAddChecks(timeline, child);
        timeline._ts < 0 && _alignPlayhead(timeline, timeline._tTime);
        return timeline;
    }, _scrollTrigger = function _scrollTrigger(animation, trigger) {
        return (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", trigger)) && _globals.ScrollTrigger.create(trigger, animation);
    }, _attemptInitTween = function _attemptInitTween(tween, time, force, suppressEvents, tTime) {
        _initTween(tween, time, tTime);
        if (!tween._initted) return 1;
        if (!force && tween._pt && !_reverting && (tween._dur && false !== tween.vars.lazy || !tween._dur && tween.vars.lazy) && _lastRenderedFrame !== _ticker.frame) {
            _lazyTweens.push(tween);
            tween._lazy = [ tTime, suppressEvents ];
            return 1;
        }
    }, _parentPlayheadIsBeforeStart = function _parentPlayheadIsBeforeStart(_ref) {
        var parent = _ref.parent;
        return parent && parent._ts && parent._initted && !parent._lock && (parent.rawTime() < 0 || _parentPlayheadIsBeforeStart(parent));
    }, _isFromOrFromStart = function _isFromOrFromStart(_ref2) {
        var data = _ref2.data;
        return "isFromStart" === data || "isStart" === data;
    }, _renderZeroDurationTween = function _renderZeroDurationTween(tween, totalTime, suppressEvents, force) {
        var pt, iteration, prevIteration, prevRatio = tween.ratio, ratio = totalTime < 0 || !totalTime && (!tween._start && _parentPlayheadIsBeforeStart(tween) && !(!tween._initted && _isFromOrFromStart(tween)) || (tween._ts < 0 || tween._dp._ts < 0) && !_isFromOrFromStart(tween)) ? 0 : 1, repeatDelay = tween._rDelay, tTime = 0;
        if (repeatDelay && tween._repeat) {
            tTime = _clamp(0, tween._tDur, totalTime);
            iteration = _animationCycle(tTime, repeatDelay);
            tween._yoyo && 1 & iteration && (ratio = 1 - ratio);
            if (iteration !== _animationCycle(tween._tTime, repeatDelay)) {
                prevRatio = 1 - ratio;
                tween.vars.repeatRefresh && tween._initted && tween.invalidate();
            }
        }
        if (ratio !== prevRatio || _reverting || force || tween._zTime === _tinyNum || !totalTime && tween._zTime) {
            if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents, tTime)) return;
            prevIteration = tween._zTime;
            tween._zTime = totalTime || (suppressEvents ? _tinyNum : 0);
            suppressEvents || (suppressEvents = totalTime && !prevIteration);
            tween.ratio = ratio;
            tween._from && (ratio = 1 - ratio);
            tween._time = 0;
            tween._tTime = tTime;
            pt = tween._pt;
            while (pt) {
                pt.r(ratio, pt.d);
                pt = pt._next;
            }
            totalTime < 0 && _rewindStartAt(tween, totalTime, suppressEvents, true);
            tween._onUpdate && !suppressEvents && _callback(tween, "onUpdate");
            tTime && tween._repeat && !suppressEvents && tween.parent && _callback(tween, "onRepeat");
            if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
                ratio && _removeFromParent(tween, 1);
                if (!suppressEvents && !_reverting) {
                    _callback(tween, ratio ? "onComplete" : "onReverseComplete", true);
                    tween._prom && tween._prom();
                }
            }
        } else if (!tween._zTime) tween._zTime = totalTime;
    }, _findNextPauseTween = function _findNextPauseTween(animation, prevTime, time) {
        var child;
        if (time > prevTime) {
            child = animation._first;
            while (child && child._start <= time) {
                if ("isPause" === child.data && child._start > prevTime) return child;
                child = child._next;
            }
        } else {
            child = animation._last;
            while (child && child._start >= time) {
                if ("isPause" === child.data && child._start < prevTime) return child;
                child = child._prev;
            }
        }
    }, _setDuration = function _setDuration(animation, duration, skipUncache, leavePlayhead) {
        var repeat = animation._repeat, dur = _roundPrecise(duration) || 0, totalProgress = animation._tTime / animation._tDur;
        totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
        animation._dur = dur;
        animation._tDur = !repeat ? dur : repeat < 0 ? 1e10 : _roundPrecise(dur * (repeat + 1) + animation._rDelay * repeat);
        totalProgress > 0 && !leavePlayhead && _alignPlayhead(animation, animation._tTime = animation._tDur * totalProgress);
        animation.parent && _setEnd(animation);
        skipUncache || _uncache(animation.parent, animation);
        return animation;
    }, _onUpdateTotalDuration = function _onUpdateTotalDuration(animation) {
        return animation instanceof Timeline ? _uncache(animation) : _setDuration(animation, animation._dur);
    }, _zeroPosition = {
        _start: 0,
        endTime: _emptyFunc,
        totalDuration: _emptyFunc
    }, _parsePosition = function _parsePosition(animation, position, percentAnimation) {
        var i, offset, isPercent, labels = animation.labels, recent = animation._recent || _zeroPosition, clippedDuration = animation.duration() >= _bigNum ? recent.endTime(false) : animation._dur;
        if (_isString(position) && (isNaN(position) || position in labels)) {
            offset = position.charAt(0);
            isPercent = "%" === position.substr(-1);
            i = position.indexOf("=");
            if ("<" === offset || ">" === offset) {
                i >= 0 && (position = position.replace(/=/, ""));
                return ("<" === offset ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0) * (isPercent ? (i < 0 ? recent : percentAnimation).totalDuration() / 100 : 1);
            }
            if (i < 0) {
                position in labels || (labels[position] = clippedDuration);
                return labels[position];
            }
            offset = parseFloat(position.charAt(i - 1) + position.substr(i + 1));
            if (isPercent && percentAnimation) offset = offset / 100 * (_isArray(percentAnimation) ? percentAnimation[0] : percentAnimation).totalDuration();
            return i > 1 ? _parsePosition(animation, position.substr(0, i - 1), percentAnimation) + offset : clippedDuration + offset;
        }
        return null == position ? clippedDuration : +position;
    }, _createTweenType = function _createTweenType(type, params, timeline) {
        var irVars, parent, isLegacy = _isNumber(params[1]), varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1), vars = params[varsIndex];
        isLegacy && (vars.duration = params[1]);
        vars.parent = timeline;
        if (type) {
            irVars = vars;
            parent = timeline;
            while (parent && !("immediateRender" in irVars)) {
                irVars = parent.vars.defaults || {};
                parent = _isNotFalse(parent.vars.inherit) && parent.parent;
            }
            vars.immediateRender = _isNotFalse(irVars.immediateRender);
            type < 2 ? vars.runBackwards = 1 : vars.startAt = params[varsIndex - 1];
        }
        return new Tween(params[0], vars, params[varsIndex + 1]);
    }, _conditionalReturn = function _conditionalReturn(value, func) {
        return value || 0 === value ? func(value) : func;
    }, _clamp = function _clamp(min, max, value) {
        return value < min ? min : value > max ? max : value;
    }, getUnit = function getUnit(value, v) {
        return !_isString(value) || !(v = _unitExp.exec(value)) ? "" : v[1];
    }, clamp = function clamp(min, max, value) {
        return _conditionalReturn(value, (function(v) {
            return _clamp(min, max, v);
        }));
    }, _slice = [].slice, _isArrayLike = function _isArrayLike(value, nonEmpty) {
        return value && _isObject(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && _isObject(value[0])) && !value.nodeType && value !== _win;
    }, _flatten = function _flatten(ar, leaveStrings, accumulator) {
        if (void 0 === accumulator) accumulator = [];
        return ar.forEach((function(value) {
            var _accumulator;
            return _isString(value) && !leaveStrings || _isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, toArray(value)) : accumulator.push(value);
        })) || accumulator;
    }, toArray = function toArray(value, scope, leaveStrings) {
        return _context && !scope && _context.selector ? _context.selector(value) : _isString(value) && !leaveStrings && (_coreInitted || !_wake()) ? _slice.call((scope || _doc).querySelectorAll(value), 0) : _isArray(value) ? _flatten(value, leaveStrings) : _isArrayLike(value) ? _slice.call(value, 0) : value ? [ value ] : [];
    }, selector = function selector(value) {
        value = toArray(value)[0] || _warn("Invalid scope") || {};
        return function(v) {
            var el = value.current || value.nativeElement || value;
            return toArray(v, el.querySelectorAll ? el : el === value ? _warn("Invalid scope") || _doc.createElement("div") : value);
        };
    }, shuffle = function shuffle(a) {
        return a.sort((function() {
            return .5 - Math.random();
        }));
    }, distribute = function distribute(v) {
        if (_isFunction(v)) return v;
        var vars = _isObject(v) ? v : {
            each: v
        }, ease = _parseEase(vars.ease), from = vars.from || 0, base = parseFloat(vars.base) || 0, cache = {}, isDecimal = from > 0 && from < 1, ratios = isNaN(from) || isDecimal, axis = vars.axis, ratioX = from, ratioY = from;
        if (_isString(from)) ratioX = ratioY = {
            center: .5,
            edges: .5,
            end: 1
        }[from] || 0; else if (!isDecimal && ratios) {
            ratioX = from[0];
            ratioY = from[1];
        }
        return function(i, target, a) {
            var originX, originY, x, y, d, j, max, min, wrapAt, l = (a || vars).length, distances = cache[l];
            if (!distances) {
                wrapAt = "auto" === vars.grid ? 0 : (vars.grid || [ 1, _bigNum ])[1];
                if (!wrapAt) {
                    max = -_bigNum;
                    while (max < (max = a[wrapAt++].getBoundingClientRect().left) && wrapAt < l) ;
                    wrapAt--;
                }
                distances = cache[l] = [];
                originX = ratios ? Math.min(wrapAt, l) * ratioX - .5 : from % wrapAt;
                originY = wrapAt === _bigNum ? 0 : ratios ? l * ratioY / wrapAt - .5 : from / wrapAt | 0;
                max = 0;
                min = _bigNum;
                for (j = 0; j < l; j++) {
                    x = j % wrapAt - originX;
                    y = originY - (j / wrapAt | 0);
                    distances[j] = d = !axis ? _sqrt(x * x + y * y) : Math.abs("y" === axis ? y : x);
                    d > max && (max = d);
                    d < min && (min = d);
                }
                "random" === from && shuffle(distances);
                distances.max = max - min;
                distances.min = min;
                distances.v = l = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l ? l - 1 : !axis ? Math.max(wrapAt, l / wrapAt) : "y" === axis ? l / wrapAt : wrapAt) || 0) * ("edges" === from ? -1 : 1);
                distances.b = l < 0 ? base - l : base;
                distances.u = getUnit(vars.amount || vars.each) || 0;
                ease = ease && l < 0 ? _invertEase(ease) : ease;
            }
            l = (distances[i] - distances.min) / distances.max || 0;
            return _roundPrecise(distances.b + (ease ? ease(l) : l) * distances.v) + distances.u;
        };
    }, _roundModifier = function _roundModifier(v) {
        var p = Math.pow(10, ((v + "").split(".")[1] || "").length);
        return function(raw) {
            var n = _roundPrecise(Math.round(parseFloat(raw) / v) * v * p);
            return (n - n % 1) / p + (_isNumber(raw) ? 0 : getUnit(raw));
        };
    }, snap = function snap(snapTo, value) {
        var radius, is2D, isArray = _isArray(snapTo);
        if (!isArray && _isObject(snapTo)) {
            radius = isArray = snapTo.radius || _bigNum;
            if (snapTo.values) {
                snapTo = toArray(snapTo.values);
                if (is2D = !_isNumber(snapTo[0])) radius *= radius;
            } else snapTo = _roundModifier(snapTo.increment);
        }
        return _conditionalReturn(value, !isArray ? _roundModifier(snapTo) : _isFunction(snapTo) ? function(raw) {
            is2D = snapTo(raw);
            return Math.abs(is2D - raw) <= radius ? is2D : raw;
        } : function(raw) {
            var dx, dy, x = parseFloat(is2D ? raw.x : raw), y = parseFloat(is2D ? raw.y : 0), min = _bigNum, closest = 0, i = snapTo.length;
            while (i--) {
                if (is2D) {
                    dx = snapTo[i].x - x;
                    dy = snapTo[i].y - y;
                    dx = dx * dx + dy * dy;
                } else dx = Math.abs(snapTo[i] - x);
                if (dx < min) {
                    min = dx;
                    closest = i;
                }
            }
            closest = !radius || min <= radius ? snapTo[closest] : raw;
            return is2D || closest === raw || _isNumber(raw) ? closest : closest + getUnit(raw);
        });
    }, random = function random(min, max, roundingIncrement, returnFunction) {
        return _conditionalReturn(_isArray(min) ? !max : true === roundingIncrement ? !!(roundingIncrement = 0) : !returnFunction, (function() {
            return _isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 1e-5) && (returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min - roundingIncrement / 2 + Math.random() * (max - min + .99 * roundingIncrement)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
        }));
    }, pipe = function pipe() {
        for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) functions[_key] = arguments[_key];
        return function(value) {
            return functions.reduce((function(v, f) {
                return f(v);
            }), value);
        };
    }, unitize = function unitize(func, unit) {
        return function(value) {
            return func(parseFloat(value)) + (unit || getUnit(value));
        };
    }, normalize = function normalize(min, max, value) {
        return mapRange(min, max, 0, 1, value);
    }, _wrapArray = function _wrapArray(a, wrapper, value) {
        return _conditionalReturn(value, (function(index) {
            return a[~~wrapper(index)];
        }));
    }, wrap = function wrap(min, max, value) {
        var range = max - min;
        return _isArray(min) ? _wrapArray(min, wrap(0, min.length), max) : _conditionalReturn(value, (function(value) {
            return (range + (value - min) % range) % range + min;
        }));
    }, wrapYoyo = function wrapYoyo(min, max, value) {
        var range = max - min, total = 2 * range;
        return _isArray(min) ? _wrapArray(min, wrapYoyo(0, min.length - 1), max) : _conditionalReturn(value, (function(value) {
            value = (total + (value - min) % total) % total || 0;
            return min + (value > range ? total - value : value);
        }));
    }, _replaceRandom = function _replaceRandom(value) {
        var i, nums, end, isArray, prev = 0, s = "";
        while (~(i = value.indexOf("random(", prev))) {
            end = value.indexOf(")", i);
            isArray = "[" === value.charAt(i + 7);
            nums = value.substr(i + 7, end - i - 7).match(isArray ? _delimitedValueExp : _strictNumExp);
            s += value.substr(prev, i - prev) + random(isArray ? nums : +nums[0], isArray ? 0 : +nums[1], +nums[2] || 1e-5);
            prev = end + 1;
        }
        return s + value.substr(prev, value.length - prev);
    }, mapRange = function mapRange(inMin, inMax, outMin, outMax, value) {
        var inRange = inMax - inMin, outRange = outMax - outMin;
        return _conditionalReturn(value, (function(value) {
            return outMin + ((value - inMin) / inRange * outRange || 0);
        }));
    }, interpolate = function interpolate(start, end, progress, mutate) {
        var func = isNaN(start + end) ? 0 : function(p) {
            return (1 - p) * start + p * end;
        };
        if (!func) {
            var p, i, interpolators, l, il, isString = _isString(start), master = {};
            true === progress && (mutate = 1) && (progress = null);
            if (isString) {
                start = {
                    p: start
                };
                end = {
                    p: end
                };
            } else if (_isArray(start) && !_isArray(end)) {
                interpolators = [];
                l = start.length;
                il = l - 2;
                for (i = 1; i < l; i++) interpolators.push(interpolate(start[i - 1], start[i]));
                l--;
                func = function func(p) {
                    p *= l;
                    var i = Math.min(il, ~~p);
                    return interpolators[i](p - i);
                };
                progress = end;
            } else if (!mutate) start = _merge(_isArray(start) ? [] : {}, start);
            if (!interpolators) {
                for (p in end) _addPropTween.call(master, start, p, "get", end[p]);
                func = function func(p) {
                    return _renderPropTweens(p, master) || (isString ? start.p : start);
                };
            }
        }
        return _conditionalReturn(progress, func);
    }, _getLabelInDirection = function _getLabelInDirection(timeline, fromTime, backward) {
        var p, distance, label, labels = timeline.labels, min = _bigNum;
        for (p in labels) {
            distance = labels[p] - fromTime;
            if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
                label = p;
                min = distance;
            }
        }
        return label;
    }, _callback = function _callback(animation, type, executeLazyFirst) {
        var params, scope, result, v = animation.vars, callback = v[type], prevContext = _context, context = animation._ctx;
        if (!callback) return;
        params = v[type + "Params"];
        scope = v.callbackScope || animation;
        executeLazyFirst && _lazyTweens.length && _lazyRender();
        context && (_context = context);
        result = params ? callback.apply(scope, params) : callback.call(scope);
        _context = prevContext;
        return result;
    }, _interrupt = function _interrupt(animation) {
        _removeFromParent(animation);
        animation.scrollTrigger && animation.scrollTrigger.kill(!!_reverting);
        animation.progress() < 1 && _callback(animation, "onInterrupt");
        return animation;
    }, _registerPluginQueue = [], _createPlugin = function _createPlugin(config) {
        if (!_windowExists()) {
            _registerPluginQueue.push(config);
            return;
        }
        config = !config.name && config["default"] || config;
        var name = config.name, isFunc = _isFunction(config), Plugin = name && !isFunc && config.init ? function() {
            this._props = [];
        } : config, instanceDefaults = {
            init: _emptyFunc,
            render: _renderPropTweens,
            add: _addPropTween,
            kill: _killPropTweensOf,
            modifier: _addPluginModifier,
            rawVars: 0
        }, statics = {
            targetTest: 0,
            get: 0,
            getSetter: _getSetter,
            aliases: {},
            register: 0
        };
        _wake();
        if (config !== Plugin) {
            if (_plugins[name]) return;
            _setDefaults(Plugin, _setDefaults(_copyExcluding(config, instanceDefaults), statics));
            _merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config, statics)));
            _plugins[Plugin.prop = name] = Plugin;
            if (config.targetTest) {
                _harnessPlugins.push(Plugin);
                _reservedProps[name] = 1;
            }
            name = ("css" === name ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin";
        }
        _addGlobal(name, Plugin);
        config.register && config.register(gsap, Plugin, PropTween);
    }, _255 = 255, _colorLookup = {
        aqua: [ 0, _255, _255 ],
        lime: [ 0, _255, 0 ],
        silver: [ 192, 192, 192 ],
        black: [ 0, 0, 0 ],
        maroon: [ 128, 0, 0 ],
        teal: [ 0, 128, 128 ],
        blue: [ 0, 0, _255 ],
        navy: [ 0, 0, 128 ],
        white: [ _255, _255, _255 ],
        olive: [ 128, 128, 0 ],
        yellow: [ _255, _255, 0 ],
        orange: [ _255, 165, 0 ],
        gray: [ 128, 128, 128 ],
        purple: [ 128, 0, 128 ],
        green: [ 0, 128, 0 ],
        red: [ _255, 0, 0 ],
        pink: [ _255, 192, 203 ],
        cyan: [ 0, _255, _255 ],
        transparent: [ _255, _255, _255, 0 ]
    }, _hue = function _hue(h, m1, m2) {
        h += h < 0 ? 1 : h > 1 ? -1 : 0;
        return (6 * h < 1 ? m1 + (m2 - m1) * h * 6 : h < .5 ? m2 : 3 * h < 2 ? m1 + (m2 - m1) * (2 / 3 - h) * 6 : m1) * _255 + .5 | 0;
    }, splitColor = function splitColor(v, toHSL, forceAlpha) {
        var r, g, b, h, s, l, max, min, d, wasHSL, a = !v ? _colorLookup.black : _isNumber(v) ? [ v >> 16, v >> 8 & _255, v & _255 ] : 0;
        if (!a) {
            if ("," === v.substr(-1)) v = v.substr(0, v.length - 1);
            if (_colorLookup[v]) a = _colorLookup[v]; else if ("#" === v.charAt(0)) {
                if (v.length < 6) {
                    r = v.charAt(1);
                    g = v.charAt(2);
                    b = v.charAt(3);
                    v = "#" + r + r + g + g + b + b + (5 === v.length ? v.charAt(4) + v.charAt(4) : "");
                }
                if (9 === v.length) {
                    a = parseInt(v.substr(1, 6), 16);
                    return [ a >> 16, a >> 8 & _255, a & _255, parseInt(v.substr(7), 16) / 255 ];
                }
                v = parseInt(v.substr(1), 16);
                a = [ v >> 16, v >> 8 & _255, v & _255 ];
            } else if ("hsl" === v.substr(0, 3)) {
                a = wasHSL = v.match(_strictNumExp);
                if (!toHSL) {
                    h = +a[0] % 360 / 360;
                    s = +a[1] / 100;
                    l = +a[2] / 100;
                    g = l <= .5 ? l * (s + 1) : l + s - l * s;
                    r = 2 * l - g;
                    a.length > 3 && (a[3] *= 1);
                    a[0] = _hue(h + 1 / 3, r, g);
                    a[1] = _hue(h, r, g);
                    a[2] = _hue(h - 1 / 3, r, g);
                } else if (~v.indexOf("=")) {
                    a = v.match(_numExp);
                    forceAlpha && a.length < 4 && (a[3] = 1);
                    return a;
                }
            } else a = v.match(_strictNumExp) || _colorLookup.transparent;
            a = a.map(Number);
        }
        if (toHSL && !wasHSL) {
            r = a[0] / _255;
            g = a[1] / _255;
            b = a[2] / _255;
            max = Math.max(r, g, b);
            min = Math.min(r, g, b);
            l = (max + min) / 2;
            if (max === min) h = s = 0; else {
                d = max - min;
                s = l > .5 ? d / (2 - max - min) : d / (max + min);
                h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
                h *= 60;
            }
            a[0] = ~~(h + .5);
            a[1] = ~~(100 * s + .5);
            a[2] = ~~(100 * l + .5);
        }
        forceAlpha && a.length < 4 && (a[3] = 1);
        return a;
    }, _colorOrderData = function _colorOrderData(v) {
        var values = [], c = [], i = -1;
        v.split(_colorExp).forEach((function(v) {
            var a = v.match(_numWithUnitExp) || [];
            values.push.apply(values, a);
            c.push(i += a.length + 1);
        }));
        values.c = c;
        return values;
    }, _formatColors = function _formatColors(s, toHSL, orderMatchData) {
        var c, shell, d, l, result = "", colors = (s + result).match(_colorExp), type = toHSL ? "hsla(" : "rgba(", i = 0;
        if (!colors) return s;
        colors = colors.map((function(color) {
            return (color = splitColor(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
        }));
        if (orderMatchData) {
            d = _colorOrderData(s);
            c = orderMatchData.c;
            if (c.join(result) !== d.c.join(result)) {
                shell = s.replace(_colorExp, "1").split(_numWithUnitExp);
                l = shell.length - 1;
                for (;i < l; i++) result += shell[i] + (~c.indexOf(i) ? colors.shift() || type + "0,0,0,0)" : (d.length ? d : colors.length ? colors : orderMatchData).shift());
            }
        }
        if (!shell) {
            shell = s.split(_colorExp);
            l = shell.length - 1;
            for (;i < l; i++) result += shell[i] + colors[i];
        }
        return result + shell[l];
    }, _colorExp = function() {
        var p, s = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
        for (p in _colorLookup) s += "|" + p + "\\b";
        return new RegExp(s + ")", "gi");
    }(), _hslExp = /hsl[a]?\(/, _colorStringFilter = function _colorStringFilter(a) {
        var toHSL, combined = a.join(" ");
        _colorExp.lastIndex = 0;
        if (_colorExp.test(combined)) {
            toHSL = _hslExp.test(combined);
            a[1] = _formatColors(a[1], toHSL);
            a[0] = _formatColors(a[0], toHSL, _colorOrderData(a[1]));
            return true;
        }
    }, _ticker = function() {
        var _id, _req, _raf, _self, _delta, _i, _getTime = Date.now, _lagThreshold = 500, _adjustedLag = 33, _startTime = _getTime(), _lastUpdate = _startTime, _gap = 1e3 / 240, _nextTime = _gap, _listeners = [], _tick = function _tick(v) {
            var overlap, dispatch, time, frame, elapsed = _getTime() - _lastUpdate, manual = true === v;
            elapsed > _lagThreshold && (_startTime += elapsed - _adjustedLag);
            _lastUpdate += elapsed;
            time = _lastUpdate - _startTime;
            overlap = time - _nextTime;
            if (overlap > 0 || manual) {
                frame = ++_self.frame;
                _delta = time - 1e3 * _self.time;
                _self.time = time /= 1e3;
                _nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
                dispatch = 1;
            }
            manual || (_id = _req(_tick));
            if (dispatch) for (_i = 0; _i < _listeners.length; _i++) _listeners[_i](time, _delta, frame, v);
        };
        _self = {
            time: 0,
            frame: 0,
            tick: function tick() {
                _tick(true);
            },
            deltaRatio: function deltaRatio(fps) {
                return _delta / (1e3 / (fps || 60));
            },
            wake: function wake() {
                if (_coreReady) {
                    if (!_coreInitted && _windowExists()) {
                        _win = _coreInitted = window;
                        _doc = _win.document || {};
                        _globals.gsap = gsap;
                        (_win.gsapVersions || (_win.gsapVersions = [])).push(gsap.version);
                        _install(_installScope || _win.GreenSockGlobals || !_win.gsap && _win || {});
                        _raf = _win.requestAnimationFrame;
                        _registerPluginQueue.forEach(_createPlugin);
                    }
                    _id && _self.sleep();
                    _req = _raf || function(f) {
                        return setTimeout(f, _nextTime - 1e3 * _self.time + 1 | 0);
                    };
                    _tickerActive = 1;
                    _tick(2);
                }
            },
            sleep: function sleep() {
                (_raf ? _win.cancelAnimationFrame : clearTimeout)(_id);
                _tickerActive = 0;
                _req = _emptyFunc;
            },
            lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
                _lagThreshold = threshold || 1 / 0;
                _adjustedLag = Math.min(adjustedLag || 33, _lagThreshold);
            },
            fps: function fps(_fps) {
                _gap = 1e3 / (_fps || 240);
                _nextTime = 1e3 * _self.time + _gap;
            },
            add: function add(callback, once, prioritize) {
                var func = once ? function(t, d, f, v) {
                    callback(t, d, f, v);
                    _self.remove(func);
                } : callback;
                _self.remove(callback);
                _listeners[prioritize ? "unshift" : "push"](func);
                _wake();
                return func;
            },
            remove: function remove(callback, i) {
                ~(i = _listeners.indexOf(callback)) && _listeners.splice(i, 1) && _i >= i && _i--;
            },
            _listeners
        };
        return _self;
    }(), _wake = function _wake() {
        return !_tickerActive && _ticker.wake();
    }, _easeMap = {}, _customEaseExp = /^[\d.\-M][\d.\-,\s]/, _quotesExp = /["']/g, _parseObjectInString = function _parseObjectInString(value) {
        var index, val, parsedVal, obj = {}, split = value.substr(1, value.length - 3).split(":"), key = split[0], i = 1, l = split.length;
        for (;i < l; i++) {
            val = split[i];
            index = i !== l - 1 ? val.lastIndexOf(",") : val.length;
            parsedVal = val.substr(0, index);
            obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
            key = val.substr(index + 1).trim();
        }
        return obj;
    }, _valueInParentheses = function _valueInParentheses(value) {
        var open = value.indexOf("(") + 1, close = value.indexOf(")"), nested = value.indexOf("(", open);
        return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
    }, _configEaseFromString = function _configEaseFromString(name) {
        var split = (name + "").split("("), ease = _easeMap[split[0]];
        return ease && split.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [ _parseObjectInString(split[1]) ] : _valueInParentheses(name).split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(name) ? _easeMap._CE("", name) : ease;
    }, _invertEase = function _invertEase(ease) {
        return function(p) {
            return 1 - ease(1 - p);
        };
    }, _propagateYoyoEase = function _propagateYoyoEase(timeline, isYoyo) {
        var ease, child = timeline._first;
        while (child) {
            if (child instanceof Timeline) _propagateYoyoEase(child, isYoyo); else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) if (child.timeline) _propagateYoyoEase(child.timeline, isYoyo); else {
                ease = child._ease;
                child._ease = child._yEase;
                child._yEase = ease;
                child._yoyo = isYoyo;
            }
            child = child._next;
        }
    }, _parseEase = function _parseEase(ease, defaultEase) {
        return !ease ? defaultEase : (_isFunction(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
    }, _insertEase = function _insertEase(names, easeIn, easeOut, easeInOut) {
        if (void 0 === easeOut) easeOut = function easeOut(p) {
            return 1 - easeIn(1 - p);
        };
        if (void 0 === easeInOut) easeInOut = function easeInOut(p) {
            return p < .5 ? easeIn(2 * p) / 2 : 1 - easeIn(2 * (1 - p)) / 2;
        };
        var lowercaseName, ease = {
            easeIn,
            easeOut,
            easeInOut
        };
        _forEachName(names, (function(name) {
            _easeMap[name] = _globals[name] = ease;
            _easeMap[lowercaseName = name.toLowerCase()] = easeOut;
            for (var p in ease) _easeMap[lowercaseName + ("easeIn" === p ? ".in" : "easeOut" === p ? ".out" : ".inOut")] = _easeMap[name + "." + p] = ease[p];
        }));
        return ease;
    }, _easeInOutFromOut = function _easeInOutFromOut(easeOut) {
        return function(p) {
            return p < .5 ? (1 - easeOut(1 - 2 * p)) / 2 : .5 + easeOut(2 * (p - .5)) / 2;
        };
    }, _configElastic = function _configElastic(type, amplitude, period) {
        var p1 = amplitude >= 1 ? amplitude : 1, p2 = (period || (type ? .3 : .45)) / (amplitude < 1 ? amplitude : 1), p3 = p2 / _2PI * (Math.asin(1 / p1) || 0), easeOut = function easeOut(p) {
            return 1 === p ? 1 : p1 * Math.pow(2, -10 * p) * _sin((p - p3) * p2) + 1;
        }, ease = "out" === type ? easeOut : "in" === type ? function(p) {
            return 1 - easeOut(1 - p);
        } : _easeInOutFromOut(easeOut);
        p2 = _2PI / p2;
        ease.config = function(amplitude, period) {
            return _configElastic(type, amplitude, period);
        };
        return ease;
    }, _configBack = function _configBack(type, overshoot) {
        if (void 0 === overshoot) overshoot = 1.70158;
        var easeOut = function easeOut(p) {
            return p ? --p * p * ((overshoot + 1) * p + overshoot) + 1 : 0;
        }, ease = "out" === type ? easeOut : "in" === type ? function(p) {
            return 1 - easeOut(1 - p);
        } : _easeInOutFromOut(easeOut);
        ease.config = function(overshoot) {
            return _configBack(type, overshoot);
        };
        return ease;
    };
    _forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", (function(name, i) {
        var power = i < 5 ? i + 1 : i;
        _insertEase(name + ",Power" + (power - 1), i ? function(p) {
            return Math.pow(p, power);
        } : function(p) {
            return p;
        }, (function(p) {
            return 1 - Math.pow(1 - p, power);
        }), (function(p) {
            return p < .5 ? Math.pow(2 * p, power) / 2 : 1 - Math.pow(2 * (1 - p), power) / 2;
        }));
    }));
    _easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;
    _insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());
    (function(n, c) {
        var n1 = 1 / c, n2 = 2 * n1, n3 = 2.5 * n1, easeOut = function easeOut(p) {
            return p < n1 ? n * p * p : p < n2 ? n * Math.pow(p - 1.5 / c, 2) + .75 : p < n3 ? n * (p -= 2.25 / c) * p + .9375 : n * Math.pow(p - 2.625 / c, 2) + .984375;
        };
        _insertEase("Bounce", (function(p) {
            return 1 - easeOut(1 - p);
        }), easeOut);
    })(7.5625, 2.75);
    _insertEase("Expo", (function(p) {
        return p ? Math.pow(2, 10 * (p - 1)) : 0;
    }));
    _insertEase("Circ", (function(p) {
        return -(_sqrt(1 - p * p) - 1);
    }));
    _insertEase("Sine", (function(p) {
        return 1 === p ? 1 : -_cos(p * _HALF_PI) + 1;
    }));
    _insertEase("Back", _configBack("in"), _configBack("out"), _configBack());
    _easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
        config: function config(steps, immediateStart) {
            if (void 0 === steps) steps = 1;
            var p1 = 1 / steps, p2 = steps + (immediateStart ? 0 : 1), p3 = immediateStart ? 1 : 0, max = 1 - _tinyNum;
            return function(p) {
                return ((p2 * _clamp(0, max, p) | 0) + p3) * p1;
            };
        }
    };
    _defaults.ease = _easeMap["quad.out"];
    _forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", (function(name) {
        return _callbackNames += name + "," + name + "Params,";
    }));
    var GSCache = function GSCache(target, harness) {
        this.id = _gsID++;
        target._gsap = this;
        this.target = target;
        this.harness = harness;
        this.get = harness ? harness.get : _getProperty;
        this.set = harness ? harness.getSetter : _getSetter;
    };
    var Animation = function() {
        function Animation(vars) {
            this.vars = vars;
            this._delay = +vars.delay || 0;
            if (this._repeat = vars.repeat === 1 / 0 ? -2 : vars.repeat || 0) {
                this._rDelay = vars.repeatDelay || 0;
                this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
            }
            this._ts = 1;
            _setDuration(this, +vars.duration, 1, 1);
            this.data = vars.data;
            if (_context) {
                this._ctx = _context;
                _context.data.push(this);
            }
            _tickerActive || _ticker.wake();
        }
        var _proto = Animation.prototype;
        _proto.delay = function delay(value) {
            if (value || 0 === value) {
                this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
                this._delay = value;
                return this;
            }
            return this._delay;
        };
        _proto.duration = function duration(value) {
            return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
        };
        _proto.totalDuration = function totalDuration(value) {
            if (!arguments.length) return this._tDur;
            this._dirty = 0;
            return _setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
        };
        _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
            _wake();
            if (!arguments.length) return this._tTime;
            var parent = this._dp;
            if (parent && parent.smoothChildTiming && this._ts) {
                _alignPlayhead(this, _totalTime);
                !parent._dp || parent.parent || _postAddChecks(parent, this);
                while (parent && parent.parent) {
                    if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) parent.totalTime(parent._tTime, true);
                    parent = parent.parent;
                }
                if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && _totalTime < this._tDur || this._ts < 0 && _totalTime > 0 || !this._tDur && !_totalTime)) _addToTimeline(this._dp, this, this._start - this._delay);
            }
            if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === _tinyNum || !_totalTime && !this._initted && (this.add || this._ptLookup)) {
                this._ts || (this._pTime = _totalTime);
                _lazySafeRender(this, _totalTime, suppressEvents);
            }
            return this;
        };
        _proto.time = function time(value, suppressEvents) {
            return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + _elapsedCycleDuration(this)) % (this._dur + this._rDelay) || (value ? this._dur : 0), suppressEvents) : this._time;
        };
        _proto.totalProgress = function totalProgress(value, suppressEvents) {
            return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio;
        };
        _proto.progress = function progress(value, suppressEvents) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(1 & this.iteration()) ? 1 - value : value) + _elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio;
        };
        _proto.iteration = function iteration(value, suppressEvents) {
            var cycleDuration = this.duration() + this._rDelay;
            return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? _animationCycle(this._tTime, cycleDuration) + 1 : 1;
        };
        _proto.timeScale = function timeScale(value) {
            if (!arguments.length) return this._rts === -_tinyNum ? 0 : this._rts;
            if (this._rts === value) return this;
            var tTime = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime;
            this._rts = +value || 0;
            this._ts = this._ps || value === -_tinyNum ? 0 : this._rts;
            this.totalTime(_clamp(-Math.abs(this._delay), this._tDur, tTime), true);
            _setEnd(this);
            return _recacheAncestors(this);
        };
        _proto.paused = function paused(value) {
            if (!arguments.length) return this._ps;
            if (this._ps !== value) {
                this._ps = value;
                if (value) {
                    this._pTime = this._tTime || Math.max(-this._delay, this.rawTime());
                    this._ts = this._act = 0;
                } else {
                    _wake();
                    this._ts = this._rts;
                    this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, 1 === this.progress() && Math.abs(this._zTime) !== _tinyNum && (this._tTime -= _tinyNum));
                }
            }
            return this;
        };
        _proto.startTime = function startTime(value) {
            if (arguments.length) {
                this._start = value;
                var parent = this.parent || this._dp;
                parent && (parent._sort || !this.parent) && _addToTimeline(parent, this, value - this._delay);
                return this;
            }
            return this._start;
        };
        _proto.endTime = function endTime(includeRepeats) {
            return this._start + (_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
        };
        _proto.rawTime = function rawTime(wrapRepeats) {
            var parent = this.parent || this._dp;
            return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
        };
        _proto.revert = function revert(config) {
            if (void 0 === config) config = _revertConfig;
            var prevIsReverting = _reverting;
            _reverting = config;
            if (this._initted || this._startAt) {
                this.timeline && this.timeline.revert(config);
                this.totalTime(-.01, config.suppressEvents);
            }
            "nested" !== this.data && false !== config.kill && this.kill();
            _reverting = prevIsReverting;
            return this;
        };
        _proto.globalTime = function globalTime(rawTime) {
            var animation = this, time = arguments.length ? rawTime : animation.rawTime();
            while (animation) {
                time = animation._start + time / (animation._ts || 1);
                animation = animation._dp;
            }
            return !this.parent && this._sat ? this._sat.vars.immediateRender ? -1 : this._sat.globalTime(rawTime) : time;
        };
        _proto.repeat = function repeat(value) {
            if (arguments.length) {
                this._repeat = value === 1 / 0 ? -2 : value;
                return _onUpdateTotalDuration(this);
            }
            return -2 === this._repeat ? 1 / 0 : this._repeat;
        };
        _proto.repeatDelay = function repeatDelay(value) {
            if (arguments.length) {
                var time = this._time;
                this._rDelay = value;
                _onUpdateTotalDuration(this);
                return time ? this.time(time) : this;
            }
            return this._rDelay;
        };
        _proto.yoyo = function yoyo(value) {
            if (arguments.length) {
                this._yoyo = value;
                return this;
            }
            return this._yoyo;
        };
        _proto.seek = function seek(position, suppressEvents) {
            return this.totalTime(_parsePosition(this, position), _isNotFalse(suppressEvents));
        };
        _proto.restart = function restart(includeDelay, suppressEvents) {
            return this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
        };
        _proto.play = function play(from, suppressEvents) {
            null != from && this.seek(from, suppressEvents);
            return this.reversed(false).paused(false);
        };
        _proto.reverse = function reverse(from, suppressEvents) {
            null != from && this.seek(from || this.totalDuration(), suppressEvents);
            return this.reversed(true).paused(false);
        };
        _proto.pause = function pause(atTime, suppressEvents) {
            null != atTime && this.seek(atTime, suppressEvents);
            return this.paused(true);
        };
        _proto.resume = function resume() {
            return this.paused(false);
        };
        _proto.reversed = function reversed(value) {
            if (arguments.length) {
                !!value !== this.reversed() && this.timeScale(-this._rts || (value ? -_tinyNum : 0));
                return this;
            }
            return this._rts < 0;
        };
        _proto.invalidate = function invalidate() {
            this._initted = this._act = 0;
            this._zTime = -_tinyNum;
            return this;
        };
        _proto.isActive = function isActive() {
            var rawTime, parent = this.parent || this._dp, start = this._start;
            return !!(!parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - _tinyNum);
        };
        _proto.eventCallback = function eventCallback(type, callback, params) {
            var vars = this.vars;
            if (arguments.length > 1) {
                if (!callback) delete vars[type]; else {
                    vars[type] = callback;
                    params && (vars[type + "Params"] = params);
                    "onUpdate" === type && (this._onUpdate = callback);
                }
                return this;
            }
            return vars[type];
        };
        _proto.then = function then(onFulfilled) {
            var self = this;
            return new Promise((function(resolve) {
                var f = _isFunction(onFulfilled) ? onFulfilled : _passThrough, _resolve = function _resolve() {
                    var _then = self.then;
                    self.then = null;
                    _isFunction(f) && (f = f(self)) && (f.then || f === self) && (self.then = _then);
                    resolve(f);
                    self.then = _then;
                };
                if (self._initted && 1 === self.totalProgress() && self._ts >= 0 || !self._tTime && self._ts < 0) _resolve(); else self._prom = _resolve;
            }));
        };
        _proto.kill = function kill() {
            _interrupt(this);
        };
        return Animation;
    }();
    _setDefaults(Animation.prototype, {
        _time: 0,
        _start: 0,
        _end: 0,
        _tTime: 0,
        _tDur: 0,
        _dirty: 0,
        _repeat: 0,
        _yoyo: false,
        parent: null,
        _initted: false,
        _rDelay: 0,
        _ts: 1,
        _dp: 0,
        ratio: 0,
        _zTime: -_tinyNum,
        _prom: 0,
        _ps: false,
        _rts: 1
    });
    var Timeline = function(_Animation) {
        _inheritsLoose(Timeline, _Animation);
        function Timeline(vars, position) {
            var _this;
            if (void 0 === vars) vars = {};
            _this = _Animation.call(this, vars) || this;
            _this.labels = {};
            _this.smoothChildTiming = !!vars.smoothChildTiming;
            _this.autoRemoveChildren = !!vars.autoRemoveChildren;
            _this._sort = _isNotFalse(vars.sortChildren);
            _globalTimeline && _addToTimeline(vars.parent || _globalTimeline, _assertThisInitialized(_this), position);
            vars.reversed && _this.reverse();
            vars.paused && _this.paused(true);
            vars.scrollTrigger && _scrollTrigger(_assertThisInitialized(_this), vars.scrollTrigger);
            return _this;
        }
        var _proto2 = Timeline.prototype;
        _proto2.to = function to(targets, vars, position) {
            _createTweenType(0, arguments, this);
            return this;
        };
        _proto2.from = function from(targets, vars, position) {
            _createTweenType(1, arguments, this);
            return this;
        };
        _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
            _createTweenType(2, arguments, this);
            return this;
        };
        _proto2.set = function set(targets, vars, position) {
            vars.duration = 0;
            vars.parent = this;
            _inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
            vars.immediateRender = !!vars.immediateRender;
            new Tween(targets, vars, _parsePosition(this, position), 1);
            return this;
        };
        _proto2.call = function call(callback, params, position) {
            return _addToTimeline(this, Tween.delayedCall(0, callback, params), position);
        };
        _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
            vars.duration = duration;
            vars.stagger = vars.stagger || stagger;
            vars.onComplete = onCompleteAll;
            vars.onCompleteParams = onCompleteAllParams;
            vars.parent = this;
            new Tween(targets, vars, _parsePosition(this, position));
            return this;
        };
        _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
            vars.runBackwards = 1;
            _inheritDefaults(vars).immediateRender = _isNotFalse(vars.immediateRender);
            return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
        };
        _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
            toVars.startAt = fromVars;
            _inheritDefaults(toVars).immediateRender = _isNotFalse(toVars.immediateRender);
            return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
        };
        _proto2.render = function render(totalTime, suppressEvents, force) {
            var time, child, next, iteration, cycleDuration, prevPaused, pauseTween, timeScale, prevStart, prevIteration, yoyo, isYoyo, prevTime = this._time, tDur = this._dirty ? this.totalDuration() : this._tDur, dur = this._dur, tTime = totalTime <= 0 ? 0 : _roundPrecise(totalTime), crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur);
            this !== _globalTimeline && tTime > tDur && totalTime >= 0 && (tTime = tDur);
            if (tTime !== this._tTime || force || crossingStart) {
                if (prevTime !== this._time && dur) {
                    tTime += this._time - prevTime;
                    totalTime += this._time - prevTime;
                }
                time = tTime;
                prevStart = this._start;
                timeScale = this._ts;
                prevPaused = !timeScale;
                if (crossingStart) {
                    dur || (prevTime = this._zTime);
                    (totalTime || !suppressEvents) && (this._zTime = totalTime);
                }
                if (this._repeat) {
                    yoyo = this._yoyo;
                    cycleDuration = dur + this._rDelay;
                    if (this._repeat < -1 && totalTime < 0) return this.totalTime(100 * cycleDuration + totalTime, suppressEvents, force);
                    time = _roundPrecise(tTime % cycleDuration);
                    if (tTime === tDur) {
                        iteration = this._repeat;
                        time = dur;
                    } else {
                        iteration = ~~(tTime / cycleDuration);
                        if (iteration && iteration === tTime / cycleDuration) {
                            time = dur;
                            iteration--;
                        }
                        time > dur && (time = dur);
                    }
                    prevIteration = _animationCycle(this._tTime, cycleDuration);
                    !prevTime && this._tTime && prevIteration !== iteration && this._tTime - prevIteration * cycleDuration - this._dur <= 0 && (prevIteration = iteration);
                    if (yoyo && 1 & iteration) {
                        time = dur - time;
                        isYoyo = 1;
                    }
                    if (iteration !== prevIteration && !this._lock) {
                        var rewinding = yoyo && 1 & prevIteration, doesWrap = rewinding === (yoyo && 1 & iteration);
                        iteration < prevIteration && (rewinding = !rewinding);
                        prevTime = rewinding ? 0 : dur;
                        this._lock = 1;
                        this.render(prevTime || (isYoyo ? 0 : _roundPrecise(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;
                        this._tTime = tTime;
                        !suppressEvents && this.parent && _callback(this, "onRepeat");
                        this.vars.repeatRefresh && !isYoyo && (this.invalidate()._lock = 1);
                        if (prevTime && prevTime !== this._time || prevPaused !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) return this;
                        dur = this._dur;
                        tDur = this._tDur;
                        if (doesWrap) {
                            this._lock = 2;
                            prevTime = rewinding ? dur : -1e-4;
                            this.render(prevTime, true);
                            this.vars.repeatRefresh && !isYoyo && this.invalidate();
                        }
                        this._lock = 0;
                        if (!this._ts && !prevPaused) return this;
                        _propagateYoyoEase(this, isYoyo);
                    }
                }
                if (this._hasPause && !this._forcing && this._lock < 2) {
                    pauseTween = _findNextPauseTween(this, _roundPrecise(prevTime), _roundPrecise(time));
                    if (pauseTween) tTime -= time - (time = pauseTween._start);
                }
                this._tTime = tTime;
                this._time = time;
                this._act = !timeScale;
                if (!this._initted) {
                    this._onUpdate = this.vars.onUpdate;
                    this._initted = 1;
                    this._zTime = totalTime;
                    prevTime = 0;
                }
                if (!prevTime && time && !suppressEvents && !iteration) {
                    _callback(this, "onStart");
                    if (this._tTime !== tTime) return this;
                }
                if (time >= prevTime && totalTime >= 0) {
                    child = this._first;
                    while (child) {
                        next = child._next;
                        if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
                            if (child.parent !== this) return this.render(totalTime, suppressEvents, force);
                            child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);
                            if (time !== this._time || !this._ts && !prevPaused) {
                                pauseTween = 0;
                                next && (tTime += this._zTime = -_tinyNum);
                                break;
                            }
                        }
                        child = next;
                    }
                } else {
                    child = this._last;
                    var adjustedTime = totalTime < 0 ? totalTime : time;
                    while (child) {
                        next = child._prev;
                        if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
                            if (child.parent !== this) return this.render(totalTime, suppressEvents, force);
                            child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force || _reverting && (child._initted || child._startAt));
                            if (time !== this._time || !this._ts && !prevPaused) {
                                pauseTween = 0;
                                next && (tTime += this._zTime = adjustedTime ? -_tinyNum : _tinyNum);
                                break;
                            }
                        }
                        child = next;
                    }
                }
                if (pauseTween && !suppressEvents) {
                    this.pause();
                    pauseTween.render(time >= prevTime ? 0 : -_tinyNum)._zTime = time >= prevTime ? 1 : -1;
                    if (this._ts) {
                        this._start = prevStart;
                        _setEnd(this);
                        return this.render(totalTime, suppressEvents, force);
                    }
                }
                this._onUpdate && !suppressEvents && _callback(this, "onUpdate", true);
                if (tTime === tDur && this._tTime >= this.totalDuration() || !tTime && prevTime) if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) if (!this._lock) {
                    (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1);
                    if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime || !tDur)) {
                        _callback(this, tTime === tDur && totalTime >= 0 ? "onComplete" : "onReverseComplete", true);
                        this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
                    }
                }
            }
            return this;
        };
        _proto2.add = function add(child, position) {
            var _this2 = this;
            _isNumber(position) || (position = _parsePosition(this, position, child));
            if (!(child instanceof Animation)) {
                if (_isArray(child)) {
                    child.forEach((function(obj) {
                        return _this2.add(obj, position);
                    }));
                    return this;
                }
                if (_isString(child)) return this.addLabel(child, position);
                if (_isFunction(child)) child = Tween.delayedCall(0, child); else return this;
            }
            return this !== child ? _addToTimeline(this, child, position) : this;
        };
        _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
            if (void 0 === nested) nested = true;
            if (void 0 === tweens) tweens = true;
            if (void 0 === timelines) timelines = true;
            if (void 0 === ignoreBeforeTime) ignoreBeforeTime = -_bigNum;
            var a = [], child = this._first;
            while (child) {
                if (child._start >= ignoreBeforeTime) if (child instanceof Tween) tweens && a.push(child); else {
                    timelines && a.push(child);
                    nested && a.push.apply(a, child.getChildren(true, tweens, timelines));
                }
                child = child._next;
            }
            return a;
        };
        _proto2.getById = function getById(id) {
            var animations = this.getChildren(1, 1, 1), i = animations.length;
            while (i--) if (animations[i].vars.id === id) return animations[i];
        };
        _proto2.remove = function remove(child) {
            if (_isString(child)) return this.removeLabel(child);
            if (_isFunction(child)) return this.killTweensOf(child);
            _removeLinkedListItem(this, child);
            if (child === this._recent) this._recent = this._last;
            return _uncache(this);
        };
        _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
            if (!arguments.length) return this._tTime;
            this._forcing = 1;
            if (!this._dp && this._ts) this._start = _roundPrecise(_ticker.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
            _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);
            this._forcing = 0;
            return this;
        };
        _proto2.addLabel = function addLabel(label, position) {
            this.labels[label] = _parsePosition(this, position);
            return this;
        };
        _proto2.removeLabel = function removeLabel(label) {
            delete this.labels[label];
            return this;
        };
        _proto2.addPause = function addPause(position, callback, params) {
            var t = Tween.delayedCall(0, callback || _emptyFunc, params);
            t.data = "isPause";
            this._hasPause = 1;
            return _addToTimeline(this, t, _parsePosition(this, position));
        };
        _proto2.removePause = function removePause(position) {
            var child = this._first;
            position = _parsePosition(this, position);
            while (child) {
                if (child._start === position && "isPause" === child.data) _removeFromParent(child);
                child = child._next;
            }
        };
        _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
            var tweens = this.getTweensOf(targets, onlyActive), i = tweens.length;
            while (i--) _overwritingTween !== tweens[i] && tweens[i].kill(targets, props);
            return this;
        };
        _proto2.getTweensOf = function getTweensOf(targets, onlyActive) {
            var children, a = [], parsedTargets = toArray(targets), child = this._first, isGlobalTime = _isNumber(onlyActive);
            while (child) {
                if (child instanceof Tween) {
                    if (_arrayContainsAny(child._targets, parsedTargets) && (isGlobalTime ? (!_overwritingTween || child._initted && child._ts) && child.globalTime(0) <= onlyActive && child.globalTime(child.totalDuration()) > onlyActive : !onlyActive || child.isActive())) a.push(child);
                } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) a.push.apply(a, children);
                child = child._next;
            }
            return a;
        };
        _proto2.tweenTo = function tweenTo(position, vars) {
            vars = vars || {};
            var initted, tl = this, endTime = _parsePosition(tl, position), _vars = vars, startAt = _vars.startAt, _onStart = _vars.onStart, onStartParams = _vars.onStartParams, immediateRender = _vars.immediateRender, tween = Tween.to(tl, _setDefaults({
                ease: vars.ease || "none",
                lazy: false,
                immediateRender: false,
                time: endTime,
                overwrite: "auto",
                duration: vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale()) || _tinyNum,
                onStart: function onStart() {
                    tl.pause();
                    if (!initted) {
                        var duration = vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale());
                        tween._dur !== duration && _setDuration(tween, duration, 0, 1).render(tween._time, true, true);
                        initted = 1;
                    }
                    _onStart && _onStart.apply(tween, onStartParams || []);
                }
            }, vars));
            return immediateRender ? tween.render(0) : tween;
        };
        _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
            return this.tweenTo(toPosition, _setDefaults({
                startAt: {
                    time: _parsePosition(this, fromPosition)
                }
            }, vars));
        };
        _proto2.recent = function recent() {
            return this._recent;
        };
        _proto2.nextLabel = function nextLabel(afterTime) {
            if (void 0 === afterTime) afterTime = this._time;
            return _getLabelInDirection(this, _parsePosition(this, afterTime));
        };
        _proto2.previousLabel = function previousLabel(beforeTime) {
            if (void 0 === beforeTime) beforeTime = this._time;
            return _getLabelInDirection(this, _parsePosition(this, beforeTime), 1);
        };
        _proto2.currentLabel = function currentLabel(value) {
            return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
        };
        _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
            if (void 0 === ignoreBeforeTime) ignoreBeforeTime = 0;
            var p, child = this._first, labels = this.labels;
            while (child) {
                if (child._start >= ignoreBeforeTime) {
                    child._start += amount;
                    child._end += amount;
                }
                child = child._next;
            }
            if (adjustLabels) for (p in labels) if (labels[p] >= ignoreBeforeTime) labels[p] += amount;
            return _uncache(this);
        };
        _proto2.invalidate = function invalidate(soft) {
            var child = this._first;
            this._lock = 0;
            while (child) {
                child.invalidate(soft);
                child = child._next;
            }
            return _Animation.prototype.invalidate.call(this, soft);
        };
        _proto2.clear = function clear(includeLabels) {
            if (void 0 === includeLabels) includeLabels = true;
            var next, child = this._first;
            while (child) {
                next = child._next;
                this.remove(child);
                child = next;
            }
            this._dp && (this._time = this._tTime = this._pTime = 0);
            includeLabels && (this.labels = {});
            return _uncache(this);
        };
        _proto2.totalDuration = function totalDuration(value) {
            var prev, start, parent, max = 0, self = this, child = self._last, prevStart = _bigNum;
            if (arguments.length) return self.timeScale((self._repeat < 0 ? self.duration() : self.totalDuration()) / (self.reversed() ? -value : value));
            if (self._dirty) {
                parent = self.parent;
                while (child) {
                    prev = child._prev;
                    child._dirty && child.totalDuration();
                    start = child._start;
                    if (start > prevStart && self._sort && child._ts && !self._lock) {
                        self._lock = 1;
                        _addToTimeline(self, child, start - child._delay, 1)._lock = 0;
                    } else prevStart = start;
                    if (start < 0 && child._ts) {
                        max -= start;
                        if (!parent && !self._dp || parent && parent.smoothChildTiming) {
                            self._start += start / self._ts;
                            self._time -= start;
                            self._tTime -= start;
                        }
                        self.shiftChildren(-start, false, -Infinity);
                        prevStart = 0;
                    }
                    child._end > max && child._ts && (max = child._end);
                    child = prev;
                }
                _setDuration(self, self === _globalTimeline && self._time > max ? self._time : max, 1, 1);
                self._dirty = 0;
            }
            return self._tDur;
        };
        Timeline.updateRoot = function updateRoot(time) {
            if (_globalTimeline._ts) {
                _lazySafeRender(_globalTimeline, _parentToChildTotalTime(time, _globalTimeline));
                _lastRenderedFrame = _ticker.frame;
            }
            if (_ticker.frame >= _nextGCFrame) {
                _nextGCFrame += _config.autoSleep || 120;
                var child = _globalTimeline._first;
                if (!child || !child._ts) if (_config.autoSleep && _ticker._listeners.length < 2) {
                    while (child && !child._ts) child = child._next;
                    child || _ticker.sleep();
                }
            }
        };
        return Timeline;
    }(Animation);
    _setDefaults(Timeline.prototype, {
        _lock: 0,
        _hasPause: 0,
        _forcing: 0
    });
    var _overwritingTween, _forceAllPropTweens, _addComplexStringPropTween = function _addComplexStringPropTween(target, prop, start, end, setter, stringFilter, funcParam) {
        var result, startNums, color, endNum, chunk, startNum, hasRandom, a, pt = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter), index = 0, matchIndex = 0;
        pt.b = start;
        pt.e = end;
        start += "";
        end += "";
        if (hasRandom = ~end.indexOf("random(")) end = _replaceRandom(end);
        if (stringFilter) {
            a = [ start, end ];
            stringFilter(a, target, prop);
            start = a[0];
            end = a[1];
        }
        startNums = start.match(_complexStringNumExp) || [];
        while (result = _complexStringNumExp.exec(end)) {
            endNum = result[0];
            chunk = end.substring(index, result.index);
            if (color) color = (color + 1) % 5; else if ("rgba(" === chunk.substr(-5)) color = 1;
            if (endNum !== startNums[matchIndex++]) {
                startNum = parseFloat(startNums[matchIndex - 1]) || 0;
                pt._pt = {
                    _next: pt._pt,
                    p: chunk || 1 === matchIndex ? chunk : ",",
                    s: startNum,
                    c: "=" === endNum.charAt(1) ? _parseRelative(startNum, endNum) - startNum : parseFloat(endNum) - startNum,
                    m: color && color < 4 ? Math.round : 0
                };
                index = _complexStringNumExp.lastIndex;
            }
        }
        pt.c = index < end.length ? end.substring(index, end.length) : "";
        pt.fp = funcParam;
        if (_relExp.test(end) || hasRandom) pt.e = 0;
        this._pt = pt;
        return pt;
    }, _addPropTween = function _addPropTween(target, prop, start, end, index, targets, modifier, stringFilter, funcParam, optional) {
        _isFunction(end) && (end = end(index || 0, target, targets));
        var pt, currentValue = target[prop], parsedStart = "get" !== start ? start : !_isFunction(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !_isFunction(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](), setter = !_isFunction(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc;
        if (_isString(end)) {
            if (~end.indexOf("random(")) end = _replaceRandom(end);
            if ("=" === end.charAt(1)) {
                pt = _parseRelative(parsedStart, end) + (getUnit(parsedStart) || 0);
                if (pt || 0 === pt) end = pt;
            }
        }
        if (!optional || parsedStart !== end || _forceAllPropTweens) {
            if (!isNaN(parsedStart * end) && "" !== end) {
                pt = new PropTween(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), "boolean" === typeof currentValue ? _renderBoolean : _renderPlain, 0, setter);
                funcParam && (pt.fp = funcParam);
                modifier && pt.modifier(modifier, this, target);
                return this._pt = pt;
            }
            !currentValue && !(prop in target) && _missingPlugin(prop, end);
            return _addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || _config.stringFilter, funcParam);
        }
    }, _processVars = function _processVars(vars, index, target, targets, tween) {
        _isFunction(vars) && (vars = _parseFuncOrString(vars, tween, index, target, targets));
        if (!_isObject(vars) || vars.style && vars.nodeType || _isArray(vars) || _isTypedArray(vars)) return _isString(vars) ? _parseFuncOrString(vars, tween, index, target, targets) : vars;
        var p, copy = {};
        for (p in vars) copy[p] = _parseFuncOrString(vars[p], tween, index, target, targets);
        return copy;
    }, _checkPlugin = function _checkPlugin(property, vars, tween, index, target, targets) {
        var plugin, pt, ptLookup, i;
        if (_plugins[property] && false !== (plugin = new _plugins[property]).init(target, plugin.rawVars ? vars[property] : _processVars(vars[property], index, target, targets, tween), tween, index, targets)) {
            tween._pt = pt = new PropTween(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);
            if (tween !== _quickTween) {
                ptLookup = tween._ptLookup[tween._targets.indexOf(target)];
                i = plugin._props.length;
                while (i--) ptLookup[plugin._props[i]] = pt;
            }
        }
        return plugin;
    }, _initTween = function _initTween(tween, time, tTime) {
        var cleanVars, i, p, pt, target, hasPriority, gsData, harness, plugin, ptLookup, index, harnessVars, overwritten, vars = tween.vars, ease = vars.ease, startAt = vars.startAt, immediateRender = vars.immediateRender, lazy = vars.lazy, onUpdate = vars.onUpdate, onUpdateParams = vars.onUpdateParams, callbackScope = vars.callbackScope, runBackwards = vars.runBackwards, yoyoEase = vars.yoyoEase, keyframes = vars.keyframes, autoRevert = vars.autoRevert, dur = tween._dur, prevStartAt = tween._startAt, targets = tween._targets, parent = tween.parent, fullTargets = parent && "nested" === parent.data ? parent.vars.targets : targets, autoOverwrite = "auto" === tween._overwrite && !_suppressOverwrites, tl = tween.timeline;
        tl && (!keyframes || !ease) && (ease = "none");
        tween._ease = _parseEase(ease, _defaults.ease);
        tween._yEase = yoyoEase ? _invertEase(_parseEase(true === yoyoEase ? ease : yoyoEase, _defaults.ease)) : 0;
        if (yoyoEase && tween._yoyo && !tween._repeat) {
            yoyoEase = tween._yEase;
            tween._yEase = tween._ease;
            tween._ease = yoyoEase;
        }
        tween._from = !tl && !!vars.runBackwards;
        if (!tl || keyframes && !vars.stagger) {
            harness = targets[0] ? _getCache(targets[0]).harness : 0;
            harnessVars = harness && vars[harness.prop];
            cleanVars = _copyExcluding(vars, _reservedProps);
            if (prevStartAt) {
                prevStartAt._zTime < 0 && prevStartAt.progress(1);
                time < 0 && runBackwards && immediateRender && !autoRevert ? prevStartAt.render(-1, true) : prevStartAt.revert(runBackwards && dur ? _revertConfigNoKill : _startAtRevertConfig);
                prevStartAt._lazy = 0;
            }
            if (startAt) {
                _removeFromParent(tween._startAt = Tween.set(targets, _setDefaults({
                    data: "isStart",
                    overwrite: false,
                    parent,
                    immediateRender: true,
                    lazy: !prevStartAt && _isNotFalse(lazy),
                    startAt: null,
                    delay: 0,
                    onUpdate,
                    onUpdateParams,
                    callbackScope,
                    stagger: 0
                }, startAt)));
                tween._startAt._dp = 0;
                tween._startAt._sat = tween;
                time < 0 && (_reverting || !immediateRender && !autoRevert) && tween._startAt.revert(_revertConfigNoKill);
                if (immediateRender) if (dur && time <= 0 && tTime <= 0) {
                    time && (tween._zTime = time);
                    return;
                }
            } else if (runBackwards && dur) if (!prevStartAt) {
                time && (immediateRender = false);
                p = _setDefaults({
                    overwrite: false,
                    data: "isFromStart",
                    lazy: immediateRender && !prevStartAt && _isNotFalse(lazy),
                    immediateRender,
                    stagger: 0,
                    parent
                }, cleanVars);
                harnessVars && (p[harness.prop] = harnessVars);
                _removeFromParent(tween._startAt = Tween.set(targets, p));
                tween._startAt._dp = 0;
                tween._startAt._sat = tween;
                time < 0 && (_reverting ? tween._startAt.revert(_revertConfigNoKill) : tween._startAt.render(-1, true));
                tween._zTime = time;
                if (!immediateRender) _initTween(tween._startAt, _tinyNum, _tinyNum); else if (!time) return;
            }
            tween._pt = tween._ptCache = 0;
            lazy = dur && _isNotFalse(lazy) || lazy && !dur;
            for (i = 0; i < targets.length; i++) {
                target = targets[i];
                gsData = target._gsap || _harness(targets)[i]._gsap;
                tween._ptLookup[i] = ptLookup = {};
                _lazyLookup[gsData.id] && _lazyTweens.length && _lazyRender();
                index = fullTargets === targets ? i : fullTargets.indexOf(target);
                if (harness && false !== (plugin = new harness).init(target, harnessVars || cleanVars, tween, index, fullTargets)) {
                    tween._pt = pt = new PropTween(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);
                    plugin._props.forEach((function(name) {
                        ptLookup[name] = pt;
                    }));
                    plugin.priority && (hasPriority = 1);
                }
                if (!harness || harnessVars) for (p in cleanVars) if (_plugins[p] && (plugin = _checkPlugin(p, cleanVars, tween, index, target, fullTargets))) plugin.priority && (hasPriority = 1); else ptLookup[p] = pt = _addPropTween.call(tween, target, p, "get", cleanVars[p], index, fullTargets, 0, vars.stringFilter);
                tween._op && tween._op[i] && tween.kill(target, tween._op[i]);
                if (autoOverwrite && tween._pt) {
                    _overwritingTween = tween;
                    _globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(time));
                    overwritten = !tween.parent;
                    _overwritingTween = 0;
                }
                tween._pt && lazy && (_lazyLookup[gsData.id] = 1);
            }
            hasPriority && _sortPropTweensByPriority(tween);
            tween._onInit && tween._onInit(tween);
        }
        tween._onUpdate = onUpdate;
        tween._initted = (!tween._op || tween._pt) && !overwritten;
        keyframes && time <= 0 && tl.render(_bigNum, true, true);
    }, _updatePropTweens = function _updatePropTweens(tween, property, value, start, startIsRelative, ratio, time) {
        var pt, rootPT, lookup, i, ptCache = (tween._pt && tween._ptCache || (tween._ptCache = {}))[property];
        if (!ptCache) {
            ptCache = tween._ptCache[property] = [];
            lookup = tween._ptLookup;
            i = tween._targets.length;
            while (i--) {
                pt = lookup[i][property];
                if (pt && pt.d && pt.d._pt) {
                    pt = pt.d._pt;
                    while (pt && pt.p !== property && pt.fp !== property) pt = pt._next;
                }
                if (!pt) {
                    _forceAllPropTweens = 1;
                    tween.vars[property] = "+=0";
                    _initTween(tween, time);
                    _forceAllPropTweens = 0;
                    return 1;
                }
                ptCache.push(pt);
            }
        }
        i = ptCache.length;
        while (i--) {
            rootPT = ptCache[i];
            pt = rootPT._pt || rootPT;
            pt.s = (start || 0 === start) && !startIsRelative ? start : pt.s + (start || 0) + ratio * pt.c;
            pt.c = value - pt.s;
            rootPT.e && (rootPT.e = _round(value) + getUnit(rootPT.e));
            rootPT.b && (rootPT.b = pt.s + getUnit(rootPT.b));
        }
    }, _addAliasesToVars = function _addAliasesToVars(targets, vars) {
        var copy, p, i, aliases, harness = targets[0] ? _getCache(targets[0]).harness : 0, propertyAliases = harness && harness.aliases;
        if (!propertyAliases) return vars;
        copy = _merge({}, vars);
        for (p in propertyAliases) if (p in copy) {
            aliases = propertyAliases[p].split(",");
            i = aliases.length;
            while (i--) copy[aliases[i]] = copy[p];
        }
        return copy;
    }, _parseKeyframe = function _parseKeyframe(prop, obj, allProps, easeEach) {
        var p, a, ease = obj.ease || easeEach || "power1.inOut";
        if (_isArray(obj)) {
            a = allProps[prop] || (allProps[prop] = []);
            obj.forEach((function(value, i) {
                return a.push({
                    t: i / (obj.length - 1) * 100,
                    v: value,
                    e: ease
                });
            }));
        } else for (p in obj) {
            a = allProps[p] || (allProps[p] = []);
            "ease" === p || a.push({
                t: parseFloat(prop),
                v: obj[p],
                e: ease
            });
        }
    }, _parseFuncOrString = function _parseFuncOrString(value, tween, i, target, targets) {
        return _isFunction(value) ? value.call(tween, i, target, targets) : _isString(value) && ~value.indexOf("random(") ? _replaceRandom(value) : value;
    }, _staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", _staggerPropsToSkip = {};
    _forEachName(_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger", (function(name) {
        return _staggerPropsToSkip[name] = 1;
    }));
    var Tween = function(_Animation2) {
        _inheritsLoose(Tween, _Animation2);
        function Tween(targets, vars, position, skipInherit) {
            var _this3;
            if ("number" === typeof vars) {
                position.duration = vars;
                vars = position;
                position = null;
            }
            _this3 = _Animation2.call(this, skipInherit ? vars : _inheritDefaults(vars)) || this;
            var tl, i, copy, l, p, curTarget, staggerFunc, staggerVarsToMerge, _this3$vars = _this3.vars, duration = _this3$vars.duration, delay = _this3$vars.delay, immediateRender = _this3$vars.immediateRender, stagger = _this3$vars.stagger, overwrite = _this3$vars.overwrite, keyframes = _this3$vars.keyframes, defaults = _this3$vars.defaults, scrollTrigger = _this3$vars.scrollTrigger, yoyoEase = _this3$vars.yoyoEase, parent = vars.parent || _globalTimeline, parsedTargets = (_isArray(targets) || _isTypedArray(targets) ? _isNumber(targets[0]) : "length" in vars) ? [ targets ] : toArray(targets);
            _this3._targets = parsedTargets.length ? _harness(parsedTargets) : _warn("GSAP target " + targets + " not found. https://greensock.com", !_config.nullTargetWarn) || [];
            _this3._ptLookup = [];
            _this3._overwrite = overwrite;
            if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
                vars = _this3.vars;
                tl = _this3.timeline = new Timeline({
                    data: "nested",
                    defaults: defaults || {},
                    targets: parent && "nested" === parent.data ? parent.vars.targets : parsedTargets
                });
                tl.kill();
                tl.parent = tl._dp = _assertThisInitialized(_this3);
                tl._start = 0;
                if (stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
                    l = parsedTargets.length;
                    staggerFunc = stagger && distribute(stagger);
                    if (_isObject(stagger)) for (p in stagger) if (~_staggerTweenProps.indexOf(p)) {
                        staggerVarsToMerge || (staggerVarsToMerge = {});
                        staggerVarsToMerge[p] = stagger[p];
                    }
                    for (i = 0; i < l; i++) {
                        copy = _copyExcluding(vars, _staggerPropsToSkip);
                        copy.stagger = 0;
                        yoyoEase && (copy.yoyoEase = yoyoEase);
                        staggerVarsToMerge && _merge(copy, staggerVarsToMerge);
                        curTarget = parsedTargets[i];
                        copy.duration = +_parseFuncOrString(duration, _assertThisInitialized(_this3), i, curTarget, parsedTargets);
                        copy.delay = (+_parseFuncOrString(delay, _assertThisInitialized(_this3), i, curTarget, parsedTargets) || 0) - _this3._delay;
                        if (!stagger && 1 === l && copy.delay) {
                            _this3._delay = delay = copy.delay;
                            _this3._start += delay;
                            copy.delay = 0;
                        }
                        tl.to(curTarget, copy, staggerFunc ? staggerFunc(i, curTarget, parsedTargets) : 0);
                        tl._ease = _easeMap.none;
                    }
                    tl.duration() ? duration = delay = 0 : _this3.timeline = 0;
                } else if (keyframes) {
                    _inheritDefaults(_setDefaults(tl.vars.defaults, {
                        ease: "none"
                    }));
                    tl._ease = _parseEase(keyframes.ease || vars.ease || "none");
                    var a, kf, v, time = 0;
                    if (_isArray(keyframes)) {
                        keyframes.forEach((function(frame) {
                            return tl.to(parsedTargets, frame, ">");
                        }));
                        tl.duration();
                    } else {
                        copy = {};
                        for (p in keyframes) "ease" === p || "easeEach" === p || _parseKeyframe(p, keyframes[p], copy, keyframes.easeEach);
                        for (p in copy) {
                            a = copy[p].sort((function(a, b) {
                                return a.t - b.t;
                            }));
                            time = 0;
                            for (i = 0; i < a.length; i++) {
                                kf = a[i];
                                v = {
                                    ease: kf.e,
                                    duration: (kf.t - (i ? a[i - 1].t : 0)) / 100 * duration
                                };
                                v[p] = kf.v;
                                tl.to(parsedTargets, v, time);
                                time += v.duration;
                            }
                        }
                        tl.duration() < duration && tl.to({}, {
                            duration: duration - tl.duration()
                        });
                    }
                }
                duration || _this3.duration(duration = tl.duration());
            } else _this3.timeline = 0;
            if (true === overwrite && !_suppressOverwrites) {
                _overwritingTween = _assertThisInitialized(_this3);
                _globalTimeline.killTweensOf(parsedTargets);
                _overwritingTween = 0;
            }
            _addToTimeline(parent, _assertThisInitialized(_this3), position);
            vars.reversed && _this3.reverse();
            vars.paused && _this3.paused(true);
            if (immediateRender || !duration && !keyframes && _this3._start === _roundPrecise(parent._time) && _isNotFalse(immediateRender) && _hasNoPausedAncestors(_assertThisInitialized(_this3)) && "nested" !== parent.data) {
                _this3._tTime = -_tinyNum;
                _this3.render(Math.max(0, -delay) || 0);
            }
            scrollTrigger && _scrollTrigger(_assertThisInitialized(_this3), scrollTrigger);
            return _this3;
        }
        var _proto3 = Tween.prototype;
        _proto3.render = function render(totalTime, suppressEvents, force) {
            var time, pt, iteration, cycleDuration, prevIteration, isYoyo, ratio, timeline, yoyoEase, prevTime = this._time, tDur = this._tDur, dur = this._dur, isNegative = totalTime < 0, tTime = totalTime > tDur - _tinyNum && !isNegative ? tDur : totalTime < _tinyNum ? 0 : totalTime;
            if (!dur) _renderZeroDurationTween(this, totalTime, suppressEvents, force); else if (tTime !== this._tTime || !totalTime || force || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== isNegative) {
                time = tTime;
                timeline = this.timeline;
                if (this._repeat) {
                    cycleDuration = dur + this._rDelay;
                    if (this._repeat < -1 && isNegative) return this.totalTime(100 * cycleDuration + totalTime, suppressEvents, force);
                    time = _roundPrecise(tTime % cycleDuration);
                    if (tTime === tDur) {
                        iteration = this._repeat;
                        time = dur;
                    } else {
                        iteration = ~~(tTime / cycleDuration);
                        if (iteration && iteration === tTime / cycleDuration) {
                            time = dur;
                            iteration--;
                        }
                        time > dur && (time = dur);
                    }
                    isYoyo = this._yoyo && 1 & iteration;
                    if (isYoyo) {
                        yoyoEase = this._yEase;
                        time = dur - time;
                    }
                    prevIteration = _animationCycle(this._tTime, cycleDuration);
                    if (time === prevTime && !force && this._initted) {
                        this._tTime = tTime;
                        return this;
                    }
                    if (iteration !== prevIteration) {
                        timeline && this._yEase && _propagateYoyoEase(timeline, isYoyo);
                        if (this.vars.repeatRefresh && !isYoyo && !this._lock) {
                            this._lock = force = 1;
                            this.render(_roundPrecise(cycleDuration * iteration), true).invalidate()._lock = 0;
                        }
                    }
                }
                if (!this._initted) {
                    if (_attemptInitTween(this, isNegative ? totalTime : time, force, suppressEvents, tTime)) {
                        this._tTime = 0;
                        return this;
                    }
                    if (prevTime !== this._time) return this;
                    if (dur !== this._dur) return this.render(totalTime, suppressEvents, force);
                }
                this._tTime = tTime;
                this._time = time;
                if (!this._act && this._ts) {
                    this._act = 1;
                    this._lazy = 0;
                }
                this.ratio = ratio = (yoyoEase || this._ease)(time / dur);
                if (this._from) this.ratio = ratio = 1 - ratio;
                if (time && !prevTime && !suppressEvents && !iteration) {
                    _callback(this, "onStart");
                    if (this._tTime !== tTime) return this;
                }
                pt = this._pt;
                while (pt) {
                    pt.r(ratio, pt.d);
                    pt = pt._next;
                }
                timeline && timeline.render(totalTime < 0 ? totalTime : !time && isYoyo ? -_tinyNum : timeline._dur * timeline._ease(time / this._dur), suppressEvents, force) || this._startAt && (this._zTime = totalTime);
                if (this._onUpdate && !suppressEvents) {
                    isNegative && _rewindStartAt(this, totalTime, suppressEvents, force);
                    _callback(this, "onUpdate");
                }
                this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && _callback(this, "onRepeat");
                if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
                    isNegative && !this._onUpdate && _rewindStartAt(this, totalTime, true, true);
                    (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1);
                    if (!suppressEvents && !(isNegative && !prevTime) && (tTime || prevTime || isYoyo)) {
                        _callback(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);
                        this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
                    }
                }
            }
            return this;
        };
        _proto3.targets = function targets() {
            return this._targets;
        };
        _proto3.invalidate = function invalidate(soft) {
            (!soft || !this.vars.runBackwards) && (this._startAt = 0);
            this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0;
            this._ptLookup = [];
            this.timeline && this.timeline.invalidate(soft);
            return _Animation2.prototype.invalidate.call(this, soft);
        };
        _proto3.resetTo = function resetTo(property, value, start, startIsRelative) {
            _tickerActive || _ticker.wake();
            this._ts || this.play();
            var ratio, time = Math.min(this._dur, (this._dp._time - this._start) * this._ts);
            this._initted || _initTween(this, time);
            ratio = this._ease(time / this._dur);
            if (_updatePropTweens(this, property, value, start, startIsRelative, ratio, time)) return this.resetTo(property, value, start, startIsRelative);
            _alignPlayhead(this, 0);
            this.parent || _addLinkedListItem(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0);
            return this.render(0);
        };
        _proto3.kill = function kill(targets, vars) {
            if (void 0 === vars) vars = "all";
            if (!targets && (!vars || "all" === vars)) {
                this._lazy = this._pt = 0;
                return this.parent ? _interrupt(this) : this;
            }
            if (this.timeline) {
                var tDur = this.timeline.totalDuration();
                this.timeline.killTweensOf(targets, vars, _overwritingTween && true !== _overwritingTween.vars.overwrite)._first || _interrupt(this);
                this.parent && tDur !== this.timeline.totalDuration() && _setDuration(this, this._dur * this.timeline._tDur / tDur, 0, 1);
                return this;
            }
            var overwrittenProps, curLookup, curOverwriteProps, props, p, pt, i, parsedTargets = this._targets, killingTargets = targets ? toArray(targets) : parsedTargets, propTweenLookup = this._ptLookup, firstPT = this._pt;
            if ((!vars || "all" === vars) && _arraysMatch(parsedTargets, killingTargets)) {
                "all" === vars && (this._pt = 0);
                return _interrupt(this);
            }
            overwrittenProps = this._op = this._op || [];
            if ("all" !== vars) {
                if (_isString(vars)) {
                    p = {};
                    _forEachName(vars, (function(name) {
                        return p[name] = 1;
                    }));
                    vars = p;
                }
                vars = _addAliasesToVars(parsedTargets, vars);
            }
            i = parsedTargets.length;
            while (i--) if (~killingTargets.indexOf(parsedTargets[i])) {
                curLookup = propTweenLookup[i];
                if ("all" === vars) {
                    overwrittenProps[i] = vars;
                    props = curLookup;
                    curOverwriteProps = {};
                } else {
                    curOverwriteProps = overwrittenProps[i] = overwrittenProps[i] || {};
                    props = vars;
                }
                for (p in props) {
                    pt = curLookup && curLookup[p];
                    if (pt) {
                        if (!("kill" in pt.d) || true === pt.d.kill(p)) _removeLinkedListItem(this, pt, "_pt");
                        delete curLookup[p];
                    }
                    if ("all" !== curOverwriteProps) curOverwriteProps[p] = 1;
                }
            }
            this._initted && !this._pt && firstPT && _interrupt(this);
            return this;
        };
        Tween.to = function to(targets, vars) {
            return new Tween(targets, vars, arguments[2]);
        };
        Tween.from = function from(targets, vars) {
            return _createTweenType(1, arguments);
        };
        Tween.delayedCall = function delayedCall(delay, callback, params, scope) {
            return new Tween(callback, 0, {
                immediateRender: false,
                lazy: false,
                overwrite: false,
                delay,
                onComplete: callback,
                onReverseComplete: callback,
                onCompleteParams: params,
                onReverseCompleteParams: params,
                callbackScope: scope
            });
        };
        Tween.fromTo = function fromTo(targets, fromVars, toVars) {
            return _createTweenType(2, arguments);
        };
        Tween.set = function set(targets, vars) {
            vars.duration = 0;
            vars.repeatDelay || (vars.repeat = 0);
            return new Tween(targets, vars);
        };
        Tween.killTweensOf = function killTweensOf(targets, props, onlyActive) {
            return _globalTimeline.killTweensOf(targets, props, onlyActive);
        };
        return Tween;
    }(Animation);
    _setDefaults(Tween.prototype, {
        _targets: [],
        _lazy: 0,
        _startAt: 0,
        _op: 0,
        _onInit: 0
    });
    _forEachName("staggerTo,staggerFrom,staggerFromTo", (function(name) {
        Tween[name] = function() {
            var tl = new Timeline, params = _slice.call(arguments, 0);
            params.splice("staggerFromTo" === name ? 5 : 4, 0, 0);
            return tl[name].apply(tl, params);
        };
    }));
    var _setterPlain = function _setterPlain(target, property, value) {
        return target[property] = value;
    }, _setterFunc = function _setterFunc(target, property, value) {
        return target[property](value);
    }, _setterFuncWithParam = function _setterFuncWithParam(target, property, value, data) {
        return target[property](data.fp, value);
    }, _setterAttribute = function _setterAttribute(target, property, value) {
        return target.setAttribute(property, value);
    }, _getSetter = function _getSetter(target, property) {
        return _isFunction(target[property]) ? _setterFunc : _isUndefined(target[property]) && target.setAttribute ? _setterAttribute : _setterPlain;
    }, _renderPlain = function _renderPlain(ratio, data) {
        return data.set(data.t, data.p, Math.round(1e6 * (data.s + data.c * ratio)) / 1e6, data);
    }, _renderBoolean = function _renderBoolean(ratio, data) {
        return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
    }, _renderComplexString = function _renderComplexString(ratio, data) {
        var pt = data._pt, s = "";
        if (!ratio && data.b) s = data.b; else if (1 === ratio && data.e) s = data.e; else {
            while (pt) {
                s = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round(1e4 * (pt.s + pt.c * ratio)) / 1e4) + s;
                pt = pt._next;
            }
            s += data.c;
        }
        data.set(data.t, data.p, s, data);
    }, _renderPropTweens = function _renderPropTweens(ratio, data) {
        var pt = data._pt;
        while (pt) {
            pt.r(ratio, pt.d);
            pt = pt._next;
        }
    }, _addPluginModifier = function _addPluginModifier(modifier, tween, target, property) {
        var next, pt = this._pt;
        while (pt) {
            next = pt._next;
            pt.p === property && pt.modifier(modifier, tween, target);
            pt = next;
        }
    }, _killPropTweensOf = function _killPropTweensOf(property) {
        var hasNonDependentRemaining, next, pt = this._pt;
        while (pt) {
            next = pt._next;
            if (pt.p === property && !pt.op || pt.op === property) _removeLinkedListItem(this, pt, "_pt"); else if (!pt.dep) hasNonDependentRemaining = 1;
            pt = next;
        }
        return !hasNonDependentRemaining;
    }, _setterWithModifier = function _setterWithModifier(target, property, value, data) {
        data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
    }, _sortPropTweensByPriority = function _sortPropTweensByPriority(parent) {
        var next, pt2, first, last, pt = parent._pt;
        while (pt) {
            next = pt._next;
            pt2 = first;
            while (pt2 && pt2.pr > pt.pr) pt2 = pt2._next;
            if (pt._prev = pt2 ? pt2._prev : last) pt._prev._next = pt; else first = pt;
            if (pt._next = pt2) pt2._prev = pt; else last = pt;
            pt = next;
        }
        parent._pt = first;
    };
    var PropTween = function() {
        function PropTween(next, target, prop, start, change, renderer, data, setter, priority) {
            this.t = target;
            this.s = start;
            this.c = change;
            this.p = prop;
            this.r = renderer || _renderPlain;
            this.d = data || this;
            this.set = setter || _setterPlain;
            this.pr = priority || 0;
            this._next = next;
            if (next) next._prev = this;
        }
        var _proto4 = PropTween.prototype;
        _proto4.modifier = function modifier(func, tween, target) {
            this.mSet = this.mSet || this.set;
            this.set = _setterWithModifier;
            this.m = func;
            this.mt = target;
            this.tween = tween;
        };
        return PropTween;
    }();
    _forEachName(_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", (function(name) {
        return _reservedProps[name] = 1;
    }));
    _globals.TweenMax = _globals.TweenLite = Tween;
    _globals.TimelineLite = _globals.TimelineMax = Timeline;
    _globalTimeline = new Timeline({
        sortChildren: false,
        defaults: _defaults,
        autoRemoveChildren: true,
        id: "root",
        smoothChildTiming: true
    });
    _config.stringFilter = _colorStringFilter;
    var _media = [], _listeners = {}, _emptyArray = [], _lastMediaTime = 0, _dispatch = function _dispatch(type) {
        return (_listeners[type] || _emptyArray).map((function(f) {
            return f();
        }));
    }, _onMediaChange = function _onMediaChange() {
        var time = Date.now(), matches = [];
        if (time - _lastMediaTime > 2) {
            _dispatch("matchMediaInit");
            _media.forEach((function(c) {
                var match, p, anyMatch, toggled, queries = c.queries, conditions = c.conditions;
                for (p in queries) {
                    match = _win.matchMedia(queries[p]).matches;
                    match && (anyMatch = 1);
                    if (match !== conditions[p]) {
                        conditions[p] = match;
                        toggled = 1;
                    }
                }
                if (toggled) {
                    c.revert();
                    anyMatch && matches.push(c);
                }
            }));
            _dispatch("matchMediaRevert");
            matches.forEach((function(c) {
                return c.onMatch(c);
            }));
            _lastMediaTime = time;
            _dispatch("matchMedia");
        }
    };
    var Context = function() {
        function Context(func, scope) {
            this.selector = scope && selector(scope);
            this.data = [];
            this._r = [];
            this.isReverted = false;
            func && this.add(func);
        }
        var _proto5 = Context.prototype;
        _proto5.add = function add(name, func, scope) {
            if (_isFunction(name)) {
                scope = func;
                func = name;
                name = _isFunction;
            }
            var self = this, f = function f() {
                var result, prev = _context, prevSelector = self.selector;
                prev && prev !== self && prev.data.push(self);
                scope && (self.selector = selector(scope));
                _context = self;
                result = func.apply(self, arguments);
                _isFunction(result) && self._r.push(result);
                _context = prev;
                self.selector = prevSelector;
                self.isReverted = false;
                return result;
            };
            self.last = f;
            return name === _isFunction ? f(self) : name ? self[name] = f : f;
        };
        _proto5.ignore = function ignore(func) {
            var prev = _context;
            _context = null;
            func(this);
            _context = prev;
        };
        _proto5.getTweens = function getTweens() {
            var a = [];
            this.data.forEach((function(e) {
                return e instanceof Context ? a.push.apply(a, e.getTweens()) : e instanceof Tween && !(e.parent && "nested" === e.parent.data) && a.push(e);
            }));
            return a;
        };
        _proto5.clear = function clear() {
            this._r.length = this.data.length = 0;
        };
        _proto5.kill = function kill(revert, matchMedia) {
            var _this4 = this;
            if (revert) {
                var tweens = this.getTweens();
                this.data.forEach((function(t) {
                    if ("isFlip" === t.data) {
                        t.revert();
                        t.getChildren(true, true, false).forEach((function(tween) {
                            return tweens.splice(tweens.indexOf(tween), 1);
                        }));
                    }
                }));
                tweens.map((function(t) {
                    return {
                        g: t.globalTime(0),
                        t
                    };
                })).sort((function(a, b) {
                    return b.g - a.g || -1;
                })).forEach((function(o) {
                    return o.t.revert(revert);
                }));
                this.data.forEach((function(e) {
                    return !(e instanceof Animation) && e.revert && e.revert(revert);
                }));
                this._r.forEach((function(f) {
                    return f(revert, _this4);
                }));
                this.isReverted = true;
            } else this.data.forEach((function(e) {
                return e.kill && e.kill();
            }));
            this.clear();
            if (matchMedia) {
                var i = _media.indexOf(this);
                !!~i && _media.splice(i, 1);
            }
        };
        _proto5.revert = function revert(config) {
            this.kill(config || {});
        };
        return Context;
    }();
    var MatchMedia = function() {
        function MatchMedia(scope) {
            this.contexts = [];
            this.scope = scope;
        }
        var _proto6 = MatchMedia.prototype;
        _proto6.add = function add(conditions, func, scope) {
            _isObject(conditions) || (conditions = {
                matches: conditions
            });
            var mq, p, active, context = new Context(0, scope || this.scope), cond = context.conditions = {};
            this.contexts.push(context);
            func = context.add("onMatch", func);
            context.queries = conditions;
            for (p in conditions) if ("all" === p) active = 1; else {
                mq = _win.matchMedia(conditions[p]);
                if (mq) {
                    _media.indexOf(context) < 0 && _media.push(context);
                    (cond[p] = mq.matches) && (active = 1);
                    mq.addListener ? mq.addListener(_onMediaChange) : mq.addEventListener("change", _onMediaChange);
                }
            }
            active && func(context);
            return this;
        };
        _proto6.revert = function revert(config) {
            this.kill(config || {});
        };
        _proto6.kill = function kill(revert) {
            this.contexts.forEach((function(c) {
                return c.kill(revert, true);
            }));
        };
        return MatchMedia;
    }();
    var _gsap = {
        registerPlugin: function registerPlugin() {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
            args.forEach((function(config) {
                return _createPlugin(config);
            }));
        },
        timeline: function timeline(vars) {
            return new Timeline(vars);
        },
        getTweensOf: function getTweensOf(targets, onlyActive) {
            return _globalTimeline.getTweensOf(targets, onlyActive);
        },
        getProperty: function getProperty(target, property, unit, uncache) {
            _isString(target) && (target = toArray(target)[0]);
            var getter = _getCache(target || {}).get, format = unit ? _passThrough : _numericIfPossible;
            "native" === unit && (unit = "");
            return !target ? target : !property ? function(property, unit, uncache) {
                return format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
            } : format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
        },
        quickSetter: function quickSetter(target, property, unit) {
            target = toArray(target);
            if (target.length > 1) {
                var setters = target.map((function(t) {
                    return gsap.quickSetter(t, property, unit);
                })), l = setters.length;
                return function(value) {
                    var i = l;
                    while (i--) setters[i](value);
                };
            }
            target = target[0] || {};
            var Plugin = _plugins[property], cache = _getCache(target), p = cache.harness && (cache.harness.aliases || {})[property] || property, setter = Plugin ? function(value) {
                var p = new Plugin;
                _quickTween._pt = 0;
                p.init(target, unit ? value + unit : value, _quickTween, 0, [ target ]);
                p.render(1, p);
                _quickTween._pt && _renderPropTweens(1, _quickTween);
            } : cache.set(target, p);
            return Plugin ? setter : function(value) {
                return setter(target, p, unit ? value + unit : value, cache, 1);
            };
        },
        quickTo: function quickTo(target, property, vars) {
            var _merge2;
            var tween = gsap.to(target, _merge((_merge2 = {}, _merge2[property] = "+=0.1", _merge2.paused = true, 
            _merge2), vars || {})), func = function func(value, start, startIsRelative) {
                return tween.resetTo(property, value, start, startIsRelative);
            };
            func.tween = tween;
            return func;
        },
        isTweening: function isTweening(targets) {
            return _globalTimeline.getTweensOf(targets, true).length > 0;
        },
        defaults: function defaults(value) {
            value && value.ease && (value.ease = _parseEase(value.ease, _defaults.ease));
            return _mergeDeep(_defaults, value || {});
        },
        config: function config(value) {
            return _mergeDeep(_config, value || {});
        },
        registerEffect: function registerEffect(_ref3) {
            var name = _ref3.name, effect = _ref3.effect, plugins = _ref3.plugins, defaults = _ref3.defaults, extendTimeline = _ref3.extendTimeline;
            (plugins || "").split(",").forEach((function(pluginName) {
                return pluginName && !_plugins[pluginName] && !_globals[pluginName] && _warn(name + " effect requires " + pluginName + " plugin.");
            }));
            _effects[name] = function(targets, vars, tl) {
                return effect(toArray(targets), _setDefaults(vars || {}, defaults), tl);
            };
            if (extendTimeline) Timeline.prototype[name] = function(targets, vars, position) {
                return this.add(_effects[name](targets, _isObject(vars) ? vars : (position = vars) && {}, this), position);
            };
        },
        registerEase: function registerEase(name, ease) {
            _easeMap[name] = _parseEase(ease);
        },
        parseEase: function parseEase(ease, defaultEase) {
            return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
        },
        getById: function getById(id) {
            return _globalTimeline.getById(id);
        },
        exportRoot: function exportRoot(vars, includeDelayedCalls) {
            if (void 0 === vars) vars = {};
            var child, next, tl = new Timeline(vars);
            tl.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);
            _globalTimeline.remove(tl);
            tl._dp = 0;
            tl._time = tl._tTime = _globalTimeline._time;
            child = _globalTimeline._first;
            while (child) {
                next = child._next;
                if (includeDelayedCalls || !(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])) _addToTimeline(tl, child, child._start - child._delay);
                child = next;
            }
            _addToTimeline(_globalTimeline, tl, 0);
            return tl;
        },
        context: function context(func, scope) {
            return func ? new Context(func, scope) : _context;
        },
        matchMedia: function matchMedia(scope) {
            return new MatchMedia(scope);
        },
        matchMediaRefresh: function matchMediaRefresh() {
            return _media.forEach((function(c) {
                var found, p, cond = c.conditions;
                for (p in cond) if (cond[p]) {
                    cond[p] = false;
                    found = 1;
                }
                found && c.revert();
            })) || _onMediaChange();
        },
        addEventListener: function addEventListener(type, callback) {
            var a = _listeners[type] || (_listeners[type] = []);
            ~a.indexOf(callback) || a.push(callback);
        },
        removeEventListener: function removeEventListener(type, callback) {
            var a = _listeners[type], i = a && a.indexOf(callback);
            i >= 0 && a.splice(i, 1);
        },
        utils: {
            wrap,
            wrapYoyo,
            distribute,
            random,
            snap,
            normalize,
            getUnit,
            clamp,
            splitColor,
            toArray,
            selector,
            mapRange,
            pipe,
            unitize,
            interpolate,
            shuffle
        },
        install: _install,
        effects: _effects,
        ticker: _ticker,
        updateRoot: Timeline.updateRoot,
        plugins: _plugins,
        globalTimeline: _globalTimeline,
        core: {
            PropTween,
            globals: _addGlobal,
            Tween,
            Timeline,
            Animation,
            getCache: _getCache,
            _removeLinkedListItem,
            reverting: function reverting() {
                return _reverting;
            },
            context: function context(toAdd) {
                if (toAdd && _context) {
                    _context.data.push(toAdd);
                    toAdd._ctx = _context;
                }
                return _context;
            },
            suppressOverwrites: function suppressOverwrites(value) {
                return _suppressOverwrites = value;
            }
        }
    };
    _forEachName("to,from,fromTo,delayedCall,set,killTweensOf", (function(name) {
        return _gsap[name] = Tween[name];
    }));
    _ticker.add(Timeline.updateRoot);
    _quickTween = _gsap.to({}, {
        duration: 0
    });
    var _getPluginPropTween = function _getPluginPropTween(plugin, prop) {
        var pt = plugin._pt;
        while (pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop) pt = pt._next;
        return pt;
    }, _addModifiers = function _addModifiers(tween, modifiers) {
        var p, i, pt, targets = tween._targets;
        for (p in modifiers) {
            i = targets.length;
            while (i--) {
                pt = tween._ptLookup[i][p];
                if (pt && (pt = pt.d)) {
                    if (pt._pt) pt = _getPluginPropTween(pt, p);
                    pt && pt.modifier && pt.modifier(modifiers[p], tween, targets[i], p);
                }
            }
        }
    }, _buildModifierPlugin = function _buildModifierPlugin(name, modifier) {
        return {
            name,
            rawVars: 1,
            init: function init(target, vars, tween) {
                tween._onInit = function(tween) {
                    var temp, p;
                    if (_isString(vars)) {
                        temp = {};
                        _forEachName(vars, (function(name) {
                            return temp[name] = 1;
                        }));
                        vars = temp;
                    }
                    if (modifier) {
                        temp = {};
                        for (p in vars) temp[p] = modifier(vars[p]);
                        vars = temp;
                    }
                    _addModifiers(tween, vars);
                };
            }
        };
    };
    var gsap = _gsap.registerPlugin({
        name: "attr",
        init: function init(target, vars, tween, index, targets) {
            var p, pt, v;
            this.tween = tween;
            for (p in vars) {
                v = target.getAttribute(p) || "";
                pt = this.add(target, "setAttribute", (v || 0) + "", vars[p], index, targets, 0, 0, p);
                pt.op = p;
                pt.b = v;
                this._props.push(p);
            }
        },
        render: function render(ratio, data) {
            var pt = data._pt;
            while (pt) {
                _reverting ? pt.set(pt.t, pt.p, pt.b, pt) : pt.r(ratio, pt.d);
                pt = pt._next;
            }
        }
    }, {
        name: "endArray",
        init: function init(target, value) {
            var i = value.length;
            while (i--) this.add(target, i, target[i] || 0, value[i], 0, 0, 0, 0, 0, 1);
        }
    }, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap)) || _gsap;
    Tween.version = Timeline.version = gsap.version = "3.11.5";
    _coreReady = 1;
    _windowExists() && _wake();
    _easeMap.Power0, _easeMap.Power1, _easeMap.Power2, _easeMap.Power3, _easeMap.Power4, 
    _easeMap.Linear, _easeMap.Quad, _easeMap.Cubic, _easeMap.Quart, _easeMap.Quint, 
    _easeMap.Strong, _easeMap.Elastic, _easeMap.Back, _easeMap.SteppedEase, _easeMap.Bounce, 
    _easeMap.Sine, _easeMap.Expo, _easeMap.Circ;
    /*!
 * CSSPlugin 3.11.5
 * https://greensock.com
 *
 * Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
    var CSSPlugin_win, CSSPlugin_doc, _docElement, _pluginInitted, _tempDiv, _recentSetterPlugin, CSSPlugin_reverting, _supports3D, CSSPlugin_windowExists = function _windowExists() {
        return "undefined" !== typeof window;
    }, _transformProps = {}, _RAD2DEG = 180 / Math.PI, _DEG2RAD = Math.PI / 180, _atan2 = Math.atan2, CSSPlugin_bigNum = 1e8, _capsExp = /([A-Z])/g, _horizontalExp = /(left|right|width|margin|padding|x)/i, _complexExp = /[\s,\(]\S/, _propertyAliases = {
        autoAlpha: "opacity,visibility",
        scale: "scaleX,scaleY",
        alpha: "opacity"
    }, _renderCSSProp = function _renderCSSProp(ratio, data) {
        return data.set(data.t, data.p, Math.round(1e4 * (data.s + data.c * ratio)) / 1e4 + data.u, data);
    }, _renderPropWithEnd = function _renderPropWithEnd(ratio, data) {
        return data.set(data.t, data.p, 1 === ratio ? data.e : Math.round(1e4 * (data.s + data.c * ratio)) / 1e4 + data.u, data);
    }, _renderCSSPropWithBeginning = function _renderCSSPropWithBeginning(ratio, data) {
        return data.set(data.t, data.p, ratio ? Math.round(1e4 * (data.s + data.c * ratio)) / 1e4 + data.u : data.b, data);
    }, _renderRoundedCSSProp = function _renderRoundedCSSProp(ratio, data) {
        var value = data.s + data.c * ratio;
        data.set(data.t, data.p, ~~(value + (value < 0 ? -.5 : .5)) + data.u, data);
    }, _renderNonTweeningValue = function _renderNonTweeningValue(ratio, data) {
        return data.set(data.t, data.p, ratio ? data.e : data.b, data);
    }, _renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd(ratio, data) {
        return data.set(data.t, data.p, 1 !== ratio ? data.b : data.e, data);
    }, _setterCSSStyle = function _setterCSSStyle(target, property, value) {
        return target.style[property] = value;
    }, _setterCSSProp = function _setterCSSProp(target, property, value) {
        return target.style.setProperty(property, value);
    }, _setterTransform = function _setterTransform(target, property, value) {
        return target._gsap[property] = value;
    }, _setterScale = function _setterScale(target, property, value) {
        return target._gsap.scaleX = target._gsap.scaleY = value;
    }, _setterScaleWithRender = function _setterScaleWithRender(target, property, value, data, ratio) {
        var cache = target._gsap;
        cache.scaleX = cache.scaleY = value;
        cache.renderTransform(ratio, cache);
    }, _setterTransformWithRender = function _setterTransformWithRender(target, property, value, data, ratio) {
        var cache = target._gsap;
        cache[property] = value;
        cache.renderTransform(ratio, cache);
    }, _transformProp = "transform", _transformOriginProp = _transformProp + "Origin", _saveStyle = function _saveStyle(property, isNotCSS) {
        var _this = this;
        var target = this.target, style = target.style;
        if (property in _transformProps) {
            this.tfm = this.tfm || {};
            if ("transform" !== property) {
                property = _propertyAliases[property] || property;
                ~property.indexOf(",") ? property.split(",").forEach((function(a) {
                    return _this.tfm[a] = _get(target, a);
                })) : this.tfm[property] = target._gsap.x ? target._gsap[property] : _get(target, property);
            } else return _propertyAliases.transform.split(",").forEach((function(p) {
                return _saveStyle.call(_this, p, isNotCSS);
            }));
            if (this.props.indexOf(_transformProp) >= 0) return;
            if (target._gsap.svg) {
                this.svgo = target.getAttribute("data-svg-origin");
                this.props.push(_transformOriginProp, isNotCSS, "");
            }
            property = _transformProp;
        }
        (style || isNotCSS) && this.props.push(property, isNotCSS, style[property]);
    }, _removeIndependentTransforms = function _removeIndependentTransforms(style) {
        if (style.translate) {
            style.removeProperty("translate");
            style.removeProperty("scale");
            style.removeProperty("rotate");
        }
    }, _revertStyle = function _revertStyle() {
        var i, p, props = this.props, target = this.target, style = target.style, cache = target._gsap;
        for (i = 0; i < props.length; i += 3) props[i + 1] ? target[props[i]] = props[i + 2] : props[i + 2] ? style[props[i]] = props[i + 2] : style.removeProperty("--" === props[i].substr(0, 2) ? props[i] : props[i].replace(_capsExp, "-$1").toLowerCase());
        if (this.tfm) {
            for (p in this.tfm) cache[p] = this.tfm[p];
            if (cache.svg) {
                cache.renderTransform();
                target.setAttribute("data-svg-origin", this.svgo || "");
            }
            i = CSSPlugin_reverting();
            if ((!i || !i.isStart) && !style[_transformProp]) {
                _removeIndependentTransforms(style);
                cache.uncache = 1;
            }
        }
    }, _getStyleSaver = function _getStyleSaver(target, properties) {
        var saver = {
            target,
            props: [],
            revert: _revertStyle,
            save: _saveStyle
        };
        target._gsap || gsap.core.getCache(target);
        properties && properties.split(",").forEach((function(p) {
            return saver.save(p);
        }));
        return saver;
    }, _createElement = function _createElement(type, ns) {
        var e = CSSPlugin_doc.createElementNS ? CSSPlugin_doc.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : CSSPlugin_doc.createElement(type);
        return e.style ? e : CSSPlugin_doc.createElement(type);
    }, _getComputedProperty = function _getComputedProperty(target, property, skipPrefixFallback) {
        var cs = getComputedStyle(target);
        return cs[property] || cs.getPropertyValue(property.replace(_capsExp, "-$1").toLowerCase()) || cs.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty(target, _checkPropPrefix(property) || property, 1) || "";
    }, _prefixes = "O,Moz,ms,Ms,Webkit".split(","), _checkPropPrefix = function _checkPropPrefix(property, element, preferPrefix) {
        var e = element || _tempDiv, s = e.style, i = 5;
        if (property in s && !preferPrefix) return property;
        property = property.charAt(0).toUpperCase() + property.substr(1);
        while (i-- && !(_prefixes[i] + property in s)) ;
        return i < 0 ? null : (3 === i ? "ms" : i >= 0 ? _prefixes[i] : "") + property;
    }, _initCore = function _initCore() {
        if (CSSPlugin_windowExists() && window.document) {
            CSSPlugin_win = window;
            CSSPlugin_doc = CSSPlugin_win.document;
            _docElement = CSSPlugin_doc.documentElement;
            _tempDiv = _createElement("div") || {
                style: {}
            };
            _createElement("div");
            _transformProp = _checkPropPrefix(_transformProp);
            _transformOriginProp = _transformProp + "Origin";
            _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0";
            _supports3D = !!_checkPropPrefix("perspective");
            CSSPlugin_reverting = gsap.core.reverting;
            _pluginInitted = 1;
        }
    }, _getBBoxHack = function _getBBoxHack(swapIfPossible) {
        var bbox, svg = _createElement("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), oldParent = this.parentNode, oldSibling = this.nextSibling, oldCSS = this.style.cssText;
        _docElement.appendChild(svg);
        svg.appendChild(this);
        this.style.display = "block";
        if (swapIfPossible) try {
            bbox = this.getBBox();
            this._gsapBBox = this.getBBox;
            this.getBBox = _getBBoxHack;
        } catch (e) {} else if (this._gsapBBox) bbox = this._gsapBBox();
        if (oldParent) if (oldSibling) oldParent.insertBefore(this, oldSibling); else oldParent.appendChild(this);
        _docElement.removeChild(svg);
        this.style.cssText = oldCSS;
        return bbox;
    }, _getAttributeFallbacks = function _getAttributeFallbacks(target, attributesArray) {
        var i = attributesArray.length;
        while (i--) if (target.hasAttribute(attributesArray[i])) return target.getAttribute(attributesArray[i]);
    }, _getBBox = function _getBBox(target) {
        var bounds;
        try {
            bounds = target.getBBox();
        } catch (error) {
            bounds = _getBBoxHack.call(target, true);
        }
        bounds && (bounds.width || bounds.height) || target.getBBox === _getBBoxHack || (bounds = _getBBoxHack.call(target, true));
        return bounds && !bounds.width && !bounds.x && !bounds.y ? {
            x: +_getAttributeFallbacks(target, [ "x", "cx", "x1" ]) || 0,
            y: +_getAttributeFallbacks(target, [ "y", "cy", "y1" ]) || 0,
            width: 0,
            height: 0
        } : bounds;
    }, _isSVG = function _isSVG(e) {
        return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && _getBBox(e));
    }, _removeProperty = function _removeProperty(target, property) {
        if (property) {
            var style = target.style;
            if (property in _transformProps && property !== _transformOriginProp) property = _transformProp;
            if (style.removeProperty) {
                if ("ms" === property.substr(0, 2) || "webkit" === property.substr(0, 6)) property = "-" + property;
                style.removeProperty(property.replace(_capsExp, "-$1").toLowerCase());
            } else style.removeAttribute(property);
        }
    }, _addNonTweeningPT = function _addNonTweeningPT(plugin, target, property, beginning, end, onlySetAtEnd) {
        var pt = new PropTween(plugin._pt, target, property, 0, 1, onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
        plugin._pt = pt;
        pt.b = beginning;
        pt.e = end;
        plugin._props.push(property);
        return pt;
    }, _nonConvertibleUnits = {
        deg: 1,
        rad: 1,
        turn: 1
    }, _nonStandardLayouts = {
        grid: 1,
        flex: 1
    }, _convertToUnit = function _convertToUnit(target, property, value, unit) {
        var px, parent, cache, isSVG, curValue = parseFloat(value) || 0, curUnit = (value + "").trim().substr((curValue + "").length) || "px", style = _tempDiv.style, horizontal = _horizontalExp.test(property), isRootSVG = "svg" === target.tagName.toLowerCase(), measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"), amount = 100, toPixels = "px" === unit, toPercent = "%" === unit;
        if (unit === curUnit || !curValue || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) return curValue;
        "px" !== curUnit && !toPixels && (curValue = _convertToUnit(target, property, value, "px"));
        isSVG = target.getCTM && _isSVG(target);
        if ((toPercent || "%" === curUnit) && (_transformProps[property] || ~property.indexOf("adius"))) {
            px = isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty];
            return _round(toPercent ? curValue / px * amount : curValue / 100 * px);
        }
        style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
        parent = ~property.indexOf("adius") || "em" === unit && target.appendChild && !isRootSVG ? target : target.parentNode;
        if (isSVG) parent = (target.ownerSVGElement || {}).parentNode;
        if (!parent || parent === CSSPlugin_doc || !parent.appendChild) parent = CSSPlugin_doc.body;
        cache = parent._gsap;
        if (cache && toPercent && cache.width && horizontal && cache.time === _ticker.time && !cache.uncache) return _round(curValue / cache.width * amount); else {
            (toPercent || "%" === curUnit) && !_nonStandardLayouts[_getComputedProperty(parent, "display")] && (style.position = _getComputedProperty(target, "position"));
            parent === target && (style.position = "static");
            parent.appendChild(_tempDiv);
            px = _tempDiv[measureProperty];
            parent.removeChild(_tempDiv);
            style.position = "absolute";
            if (horizontal && toPercent) {
                cache = _getCache(parent);
                cache.time = _ticker.time;
                cache.width = parent[measureProperty];
            }
        }
        return _round(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
    }, _get = function _get(target, property, unit, uncache) {
        var value;
        _pluginInitted || _initCore();
        if (property in _propertyAliases && "transform" !== property) {
            property = _propertyAliases[property];
            if (~property.indexOf(",")) property = property.split(",")[0];
        }
        if (_transformProps[property] && "transform" !== property) {
            value = _parseTransform(target, uncache);
            value = "transformOrigin" !== property ? value[property] : value.svg ? value.origin : _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) + " " + value.zOrigin + "px";
        } else {
            value = target.style[property];
            if (!value || "auto" === value || uncache || ~(value + "").indexOf("calc(")) value = _specialProps[property] && _specialProps[property](target, property, unit) || _getComputedProperty(target, property) || _getProperty(target, property) || ("opacity" === property ? 1 : 0);
        }
        return unit && !~(value + "").trim().indexOf(" ") ? _convertToUnit(target, property, value, unit) + unit : value;
    }, _tweenComplexCSSString = function _tweenComplexCSSString(target, prop, start, end) {
        if (!start || "none" === start) {
            var p = _checkPropPrefix(prop, target, 1), s = p && _getComputedProperty(target, p, 1);
            if (s && s !== start) {
                prop = p;
                start = s;
            } else if ("borderColor" === prop) start = _getComputedProperty(target, "borderTopColor");
        }
        var a, result, startValues, startNum, color, startValue, endValue, endNum, chunk, endUnit, startUnit, endValues, pt = new PropTween(this._pt, target.style, prop, 0, 1, _renderComplexString), index = 0, matchIndex = 0;
        pt.b = start;
        pt.e = end;
        start += "";
        end += "";
        if ("auto" === end) {
            target.style[prop] = end;
            end = _getComputedProperty(target, prop) || end;
            target.style[prop] = start;
        }
        a = [ start, end ];
        _colorStringFilter(a);
        start = a[0];
        end = a[1];
        startValues = start.match(_numWithUnitExp) || [];
        endValues = end.match(_numWithUnitExp) || [];
        if (endValues.length) {
            while (result = _numWithUnitExp.exec(end)) {
                endValue = result[0];
                chunk = end.substring(index, result.index);
                if (color) color = (color + 1) % 5; else if ("rgba(" === chunk.substr(-5) || "hsla(" === chunk.substr(-5)) color = 1;
                if (endValue !== (startValue = startValues[matchIndex++] || "")) {
                    startNum = parseFloat(startValue) || 0;
                    startUnit = startValue.substr((startNum + "").length);
                    "=" === endValue.charAt(1) && (endValue = _parseRelative(startNum, endValue) + startUnit);
                    endNum = parseFloat(endValue);
                    endUnit = endValue.substr((endNum + "").length);
                    index = _numWithUnitExp.lastIndex - endUnit.length;
                    if (!endUnit) {
                        endUnit = endUnit || _config.units[prop] || startUnit;
                        if (index === end.length) {
                            end += endUnit;
                            pt.e += endUnit;
                        }
                    }
                    if (startUnit !== endUnit) startNum = _convertToUnit(target, prop, startValue, endUnit) || 0;
                    pt._pt = {
                        _next: pt._pt,
                        p: chunk || 1 === matchIndex ? chunk : ",",
                        s: startNum,
                        c: endNum - startNum,
                        m: color && color < 4 || "zIndex" === prop ? Math.round : 0
                    };
                }
            }
            pt.c = index < end.length ? end.substring(index, end.length) : "";
        } else pt.r = "display" === prop && "none" === end ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
        _relExp.test(end) && (pt.e = 0);
        this._pt = pt;
        return pt;
    }, _keywordToPercent = {
        top: "0%",
        bottom: "100%",
        left: "0%",
        right: "100%",
        center: "50%"
    }, _convertKeywordsToPercentages = function _convertKeywordsToPercentages(value) {
        var split = value.split(" "), x = split[0], y = split[1] || "50%";
        if ("top" === x || "bottom" === x || "left" === y || "right" === y) {
            value = x;
            x = y;
            y = value;
        }
        split[0] = _keywordToPercent[x] || x;
        split[1] = _keywordToPercent[y] || y;
        return split.join(" ");
    }, _renderClearProps = function _renderClearProps(ratio, data) {
        if (data.tween && data.tween._time === data.tween._dur) {
            var prop, clearTransforms, i, target = data.t, style = target.style, props = data.u, cache = target._gsap;
            if ("all" === props || true === props) {
                style.cssText = "";
                clearTransforms = 1;
            } else {
                props = props.split(",");
                i = props.length;
                while (--i > -1) {
                    prop = props[i];
                    if (_transformProps[prop]) {
                        clearTransforms = 1;
                        prop = "transformOrigin" === prop ? _transformOriginProp : _transformProp;
                    }
                    _removeProperty(target, prop);
                }
            }
            if (clearTransforms) {
                _removeProperty(target, _transformProp);
                if (cache) {
                    cache.svg && target.removeAttribute("transform");
                    _parseTransform(target, 1);
                    cache.uncache = 1;
                    _removeIndependentTransforms(style);
                }
            }
        }
    }, _specialProps = {
        clearProps: function clearProps(plugin, target, property, endValue, tween) {
            if ("isFromStart" !== tween.data) {
                var pt = plugin._pt = new PropTween(plugin._pt, target, property, 0, 0, _renderClearProps);
                pt.u = endValue;
                pt.pr = -10;
                pt.tween = tween;
                plugin._props.push(property);
                return 1;
            }
        }
    }, _identity2DMatrix = [ 1, 0, 0, 1, 0, 0 ], _rotationalProperties = {}, _isNullTransform = function _isNullTransform(value) {
        return "matrix(1, 0, 0, 1, 0, 0)" === value || "none" === value || !value;
    }, _getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray(target) {
        var matrixString = _getComputedProperty(target, _transformProp);
        return _isNullTransform(matrixString) ? _identity2DMatrix : matrixString.substr(7).match(_numExp).map(_round);
    }, _getMatrix = function _getMatrix(target, force2D) {
        var parent, nextSibling, temp, addedToDOM, cache = target._gsap || _getCache(target), style = target.style, matrix = _getComputedTransformMatrixAsArray(target);
        if (cache.svg && target.getAttribute("transform")) {
            temp = target.transform.baseVal.consolidate().matrix;
            matrix = [ temp.a, temp.b, temp.c, temp.d, temp.e, temp.f ];
            return "1,0,0,1,0,0" === matrix.join(",") ? _identity2DMatrix : matrix;
        } else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache.svg) {
            temp = style.display;
            style.display = "block";
            parent = target.parentNode;
            if (!parent || !target.offsetParent) {
                addedToDOM = 1;
                nextSibling = target.nextElementSibling;
                _docElement.appendChild(target);
            }
            matrix = _getComputedTransformMatrixAsArray(target);
            temp ? style.display = temp : _removeProperty(target, "display");
            if (addedToDOM) nextSibling ? parent.insertBefore(target, nextSibling) : parent ? parent.appendChild(target) : _docElement.removeChild(target);
        }
        return force2D && matrix.length > 6 ? [ matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13] ] : matrix;
    }, _applySVGOrigin = function _applySVGOrigin(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
        var bounds, determinant, x, y, cache = target._gsap, matrix = matrixArray || _getMatrix(target, true), xOriginOld = cache.xOrigin || 0, yOriginOld = cache.yOrigin || 0, xOffsetOld = cache.xOffset || 0, yOffsetOld = cache.yOffset || 0, a = matrix[0], b = matrix[1], c = matrix[2], d = matrix[3], tx = matrix[4], ty = matrix[5], originSplit = origin.split(" "), xOrigin = parseFloat(originSplit[0]) || 0, yOrigin = parseFloat(originSplit[1]) || 0;
        if (!originIsAbsolute) {
            bounds = _getBBox(target);
            xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
            yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin);
        } else if (matrix !== _identity2DMatrix && (determinant = a * d - b * c)) {
            x = xOrigin * (d / determinant) + yOrigin * (-c / determinant) + (c * ty - d * tx) / determinant;
            y = xOrigin * (-b / determinant) + yOrigin * (a / determinant) - (a * ty - b * tx) / determinant;
            xOrigin = x;
            yOrigin = y;
        }
        if (smooth || false !== smooth && cache.smooth) {
            tx = xOrigin - xOriginOld;
            ty = yOrigin - yOriginOld;
            cache.xOffset = xOffsetOld + (tx * a + ty * c) - tx;
            cache.yOffset = yOffsetOld + (tx * b + ty * d) - ty;
        } else cache.xOffset = cache.yOffset = 0;
        cache.xOrigin = xOrigin;
        cache.yOrigin = yOrigin;
        cache.smooth = !!smooth;
        cache.origin = origin;
        cache.originIsAbsolute = !!originIsAbsolute;
        target.style[_transformOriginProp] = "0px 0px";
        if (pluginToAddPropTweensTo) {
            _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOrigin", xOriginOld, xOrigin);
            _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOrigin", yOriginOld, yOrigin);
            _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOffset", xOffsetOld, cache.xOffset);
            _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOffset", yOffsetOld, cache.yOffset);
        }
        target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
    }, _parseTransform = function _parseTransform(target, uncache) {
        var cache = target._gsap || new GSCache(target);
        if ("x" in cache && !uncache && !cache.uncache) return cache;
        var x, y, z, scaleX, scaleY, rotation, rotationX, rotationY, skewX, skewY, perspective, xOrigin, yOrigin, matrix, angle, cos, sin, a, b, c, d, a12, a22, t1, t2, t3, a13, a23, a33, a42, a43, a32, style = target.style, invertedScaleX = cache.scaleX < 0, px = "px", deg = "deg", cs = getComputedStyle(target), origin = _getComputedProperty(target, _transformOriginProp) || "0";
        x = y = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
        scaleX = scaleY = 1;
        cache.svg = !!(target.getCTM && _isSVG(target));
        if (cs.translate) {
            if ("none" !== cs.translate || "none" !== cs.scale || "none" !== cs.rotate) style[_transformProp] = ("none" !== cs.translate ? "translate3d(" + (cs.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + ("none" !== cs.rotate ? "rotate(" + cs.rotate + ") " : "") + ("none" !== cs.scale ? "scale(" + cs.scale.split(" ").join(",") + ") " : "") + ("none" !== cs[_transformProp] ? cs[_transformProp] : "");
            style.scale = style.rotate = style.translate = "none";
        }
        matrix = _getMatrix(target, cache.svg);
        if (cache.svg) {
            if (cache.uncache) {
                t2 = target.getBBox();
                origin = cache.xOrigin - t2.x + "px " + (cache.yOrigin - t2.y) + "px";
                t1 = "";
            } else t1 = !uncache && target.getAttribute("data-svg-origin");
            _applySVGOrigin(target, t1 || origin, !!t1 || cache.originIsAbsolute, false !== cache.smooth, matrix);
        }
        xOrigin = cache.xOrigin || 0;
        yOrigin = cache.yOrigin || 0;
        if (matrix !== _identity2DMatrix) {
            a = matrix[0];
            b = matrix[1];
            c = matrix[2];
            d = matrix[3];
            x = a12 = matrix[4];
            y = a22 = matrix[5];
            if (6 === matrix.length) {
                scaleX = Math.sqrt(a * a + b * b);
                scaleY = Math.sqrt(d * d + c * c);
                rotation = a || b ? _atan2(b, a) * _RAD2DEG : 0;
                skewX = c || d ? _atan2(c, d) * _RAD2DEG + rotation : 0;
                skewX && (scaleY *= Math.abs(Math.cos(skewX * _DEG2RAD)));
                if (cache.svg) {
                    x -= xOrigin - (xOrigin * a + yOrigin * c);
                    y -= yOrigin - (xOrigin * b + yOrigin * d);
                }
            } else {
                a32 = matrix[6];
                a42 = matrix[7];
                a13 = matrix[8];
                a23 = matrix[9];
                a33 = matrix[10];
                a43 = matrix[11];
                x = matrix[12];
                y = matrix[13];
                z = matrix[14];
                angle = _atan2(a32, a33);
                rotationX = angle * _RAD2DEG;
                if (angle) {
                    cos = Math.cos(-angle);
                    sin = Math.sin(-angle);
                    t1 = a12 * cos + a13 * sin;
                    t2 = a22 * cos + a23 * sin;
                    t3 = a32 * cos + a33 * sin;
                    a13 = a12 * -sin + a13 * cos;
                    a23 = a22 * -sin + a23 * cos;
                    a33 = a32 * -sin + a33 * cos;
                    a43 = a42 * -sin + a43 * cos;
                    a12 = t1;
                    a22 = t2;
                    a32 = t3;
                }
                angle = _atan2(-c, a33);
                rotationY = angle * _RAD2DEG;
                if (angle) {
                    cos = Math.cos(-angle);
                    sin = Math.sin(-angle);
                    t1 = a * cos - a13 * sin;
                    t2 = b * cos - a23 * sin;
                    t3 = c * cos - a33 * sin;
                    a43 = d * sin + a43 * cos;
                    a = t1;
                    b = t2;
                    c = t3;
                }
                angle = _atan2(b, a);
                rotation = angle * _RAD2DEG;
                if (angle) {
                    cos = Math.cos(angle);
                    sin = Math.sin(angle);
                    t1 = a * cos + b * sin;
                    t2 = a12 * cos + a22 * sin;
                    b = b * cos - a * sin;
                    a22 = a22 * cos - a12 * sin;
                    a = t1;
                    a12 = t2;
                }
                if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
                    rotationX = rotation = 0;
                    rotationY = 180 - rotationY;
                }
                scaleX = _round(Math.sqrt(a * a + b * b + c * c));
                scaleY = _round(Math.sqrt(a22 * a22 + a32 * a32));
                angle = _atan2(a12, a22);
                skewX = Math.abs(angle) > 2e-4 ? angle * _RAD2DEG : 0;
                perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
            }
            if (cache.svg) {
                t1 = target.getAttribute("transform");
                cache.forceCSS = target.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(target, _transformProp));
                t1 && target.setAttribute("transform", t1);
            }
        }
        if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) if (invertedScaleX) {
            scaleX *= -1;
            skewX += rotation <= 0 ? 180 : -180;
            rotation += rotation <= 0 ? 180 : -180;
        } else {
            scaleY *= -1;
            skewX += skewX <= 0 ? 180 : -180;
        }
        uncache = uncache || cache.uncache;
        cache.x = x - ((cache.xPercent = x && (!uncache && cache.xPercent || (Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0))) ? target.offsetWidth * cache.xPercent / 100 : 0) + px;
        cache.y = y - ((cache.yPercent = y && (!uncache && cache.yPercent || (Math.round(target.offsetHeight / 2) === Math.round(-y) ? -50 : 0))) ? target.offsetHeight * cache.yPercent / 100 : 0) + px;
        cache.z = z + px;
        cache.scaleX = _round(scaleX);
        cache.scaleY = _round(scaleY);
        cache.rotation = _round(rotation) + deg;
        cache.rotationX = _round(rotationX) + deg;
        cache.rotationY = _round(rotationY) + deg;
        cache.skewX = skewX + deg;
        cache.skewY = skewY + deg;
        cache.transformPerspective = perspective + px;
        if (cache.zOrigin = parseFloat(origin.split(" ")[2]) || 0) style[_transformOriginProp] = _firstTwoOnly(origin);
        cache.xOffset = cache.yOffset = 0;
        cache.force3D = _config.force3D;
        cache.renderTransform = cache.svg ? _renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms;
        cache.uncache = 0;
        return cache;
    }, _firstTwoOnly = function _firstTwoOnly(value) {
        return (value = value.split(" "))[0] + " " + value[1];
    }, _addPxTranslate = function _addPxTranslate(target, start, value) {
        var unit = getUnit(start);
        return _round(parseFloat(start) + parseFloat(_convertToUnit(target, "x", value + "px", unit))) + unit;
    }, _renderNon3DTransforms = function _renderNon3DTransforms(ratio, cache) {
        cache.z = "0px";
        cache.rotationY = cache.rotationX = "0deg";
        cache.force3D = 0;
        _renderCSSTransforms(ratio, cache);
    }, _zeroDeg = "0deg", _zeroPx = "0px", _endParenthesis = ") ", _renderCSSTransforms = function _renderCSSTransforms(ratio, cache) {
        var _ref = cache || this, xPercent = _ref.xPercent, yPercent = _ref.yPercent, x = _ref.x, y = _ref.y, z = _ref.z, rotation = _ref.rotation, rotationY = _ref.rotationY, rotationX = _ref.rotationX, skewX = _ref.skewX, skewY = _ref.skewY, scaleX = _ref.scaleX, scaleY = _ref.scaleY, transformPerspective = _ref.transformPerspective, force3D = _ref.force3D, target = _ref.target, zOrigin = _ref.zOrigin, transforms = "", use3D = "auto" === force3D && ratio && 1 !== ratio || true === force3D;
        if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
            var cos, angle = parseFloat(rotationY) * _DEG2RAD, a13 = Math.sin(angle), a33 = Math.cos(angle);
            angle = parseFloat(rotationX) * _DEG2RAD;
            cos = Math.cos(angle);
            x = _addPxTranslate(target, x, a13 * cos * -zOrigin);
            y = _addPxTranslate(target, y, -Math.sin(angle) * -zOrigin);
            z = _addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
        }
        if (transformPerspective !== _zeroPx) transforms += "perspective(" + transformPerspective + _endParenthesis;
        if (xPercent || yPercent) transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
        if (use3D || x !== _zeroPx || y !== _zeroPx || z !== _zeroPx) transforms += z !== _zeroPx || use3D ? "translate3d(" + x + ", " + y + ", " + z + ") " : "translate(" + x + ", " + y + _endParenthesis;
        if (rotation !== _zeroDeg) transforms += "rotate(" + rotation + _endParenthesis;
        if (rotationY !== _zeroDeg) transforms += "rotateY(" + rotationY + _endParenthesis;
        if (rotationX !== _zeroDeg) transforms += "rotateX(" + rotationX + _endParenthesis;
        if (skewX !== _zeroDeg || skewY !== _zeroDeg) transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
        if (1 !== scaleX || 1 !== scaleY) transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
        target.style[_transformProp] = transforms || "translate(0, 0)";
    }, _renderSVGTransforms = function _renderSVGTransforms(ratio, cache) {
        var a11, a21, a12, a22, temp, _ref2 = cache || this, xPercent = _ref2.xPercent, yPercent = _ref2.yPercent, x = _ref2.x, y = _ref2.y, rotation = _ref2.rotation, skewX = _ref2.skewX, skewY = _ref2.skewY, scaleX = _ref2.scaleX, scaleY = _ref2.scaleY, target = _ref2.target, xOrigin = _ref2.xOrigin, yOrigin = _ref2.yOrigin, xOffset = _ref2.xOffset, yOffset = _ref2.yOffset, forceCSS = _ref2.forceCSS, tx = parseFloat(x), ty = parseFloat(y);
        rotation = parseFloat(rotation);
        skewX = parseFloat(skewX);
        skewY = parseFloat(skewY);
        if (skewY) {
            skewY = parseFloat(skewY);
            skewX += skewY;
            rotation += skewY;
        }
        if (rotation || skewX) {
            rotation *= _DEG2RAD;
            skewX *= _DEG2RAD;
            a11 = Math.cos(rotation) * scaleX;
            a21 = Math.sin(rotation) * scaleX;
            a12 = Math.sin(rotation - skewX) * -scaleY;
            a22 = Math.cos(rotation - skewX) * scaleY;
            if (skewX) {
                skewY *= _DEG2RAD;
                temp = Math.tan(skewX - skewY);
                temp = Math.sqrt(1 + temp * temp);
                a12 *= temp;
                a22 *= temp;
                if (skewY) {
                    temp = Math.tan(skewY);
                    temp = Math.sqrt(1 + temp * temp);
                    a11 *= temp;
                    a21 *= temp;
                }
            }
            a11 = _round(a11);
            a21 = _round(a21);
            a12 = _round(a12);
            a22 = _round(a22);
        } else {
            a11 = scaleX;
            a22 = scaleY;
            a21 = a12 = 0;
        }
        if (tx && !~(x + "").indexOf("px") || ty && !~(y + "").indexOf("px")) {
            tx = _convertToUnit(target, "x", x, "px");
            ty = _convertToUnit(target, "y", y, "px");
        }
        if (xOrigin || yOrigin || xOffset || yOffset) {
            tx = _round(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
            ty = _round(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
        }
        if (xPercent || yPercent) {
            temp = target.getBBox();
            tx = _round(tx + xPercent / 100 * temp.width);
            ty = _round(ty + yPercent / 100 * temp.height);
        }
        temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
        target.setAttribute("transform", temp);
        forceCSS && (target.style[_transformProp] = temp);
    }, _addRotationalPropTween = function _addRotationalPropTween(plugin, target, property, startNum, endValue) {
        var direction, pt, cap = 360, isString = _isString(endValue), endNum = parseFloat(endValue) * (isString && ~endValue.indexOf("rad") ? _RAD2DEG : 1), change = endNum - startNum, finalValue = startNum + change + "deg";
        if (isString) {
            direction = endValue.split("_")[1];
            if ("short" === direction) {
                change %= cap;
                if (change !== change % (cap / 2)) change += change < 0 ? cap : -cap;
            }
            if ("cw" === direction && change < 0) change = (change + cap * CSSPlugin_bigNum) % cap - ~~(change / cap) * cap; else if ("ccw" === direction && change > 0) change = (change - cap * CSSPlugin_bigNum) % cap - ~~(change / cap) * cap;
        }
        plugin._pt = pt = new PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
        pt.e = finalValue;
        pt.u = "deg";
        plugin._props.push(property);
        return pt;
    }, _assign = function _assign(target, source) {
        for (var p in source) target[p] = source[p];
        return target;
    }, _addRawTransformPTs = function _addRawTransformPTs(plugin, transforms, target) {
        var endCache, p, startValue, endValue, startNum, endNum, startUnit, endUnit, startCache = _assign({}, target._gsap), exclude = "perspective,force3D,transformOrigin,svgOrigin", style = target.style;
        if (startCache.svg) {
            startValue = target.getAttribute("transform");
            target.setAttribute("transform", "");
            style[_transformProp] = transforms;
            endCache = _parseTransform(target, 1);
            _removeProperty(target, _transformProp);
            target.setAttribute("transform", startValue);
        } else {
            startValue = getComputedStyle(target)[_transformProp];
            style[_transformProp] = transforms;
            endCache = _parseTransform(target, 1);
            style[_transformProp] = startValue;
        }
        for (p in _transformProps) {
            startValue = startCache[p];
            endValue = endCache[p];
            if (startValue !== endValue && exclude.indexOf(p) < 0) {
                startUnit = getUnit(startValue);
                endUnit = getUnit(endValue);
                startNum = startUnit !== endUnit ? _convertToUnit(target, p, startValue, endUnit) : parseFloat(startValue);
                endNum = parseFloat(endValue);
                plugin._pt = new PropTween(plugin._pt, endCache, p, startNum, endNum - startNum, _renderCSSProp);
                plugin._pt.u = endUnit || 0;
                plugin._props.push(p);
            }
        }
        _assign(endCache, startCache);
    };
    _forEachName("padding,margin,Width,Radius", (function(name, index) {
        var t = "Top", r = "Right", b = "Bottom", l = "Left", props = (index < 3 ? [ t, r, b, l ] : [ t + l, t + r, b + r, b + l ]).map((function(side) {
            return index < 2 ? name + side : "border" + side + name;
        }));
        _specialProps[index > 1 ? "border" + name : name] = function(plugin, target, property, endValue, tween) {
            var a, vars;
            if (arguments.length < 4) {
                a = props.map((function(prop) {
                    return _get(plugin, prop, property);
                }));
                vars = a.join(" ");
                return 5 === vars.split(a[0]).length ? a[0] : vars;
            }
            a = (endValue + "").split(" ");
            vars = {};
            props.forEach((function(prop, i) {
                return vars[prop] = a[i] = a[i] || a[(i - 1) / 2 | 0];
            }));
            plugin.init(target, vars, tween);
        };
    }));
    var CSSPlugin = {
        name: "css",
        register: _initCore,
        targetTest: function targetTest(target) {
            return target.style && target.nodeType;
        },
        init: function init(target, vars, tween, index, targets) {
            var startValue, endValue, endNum, startNum, type, specialProp, p, startUnit, endUnit, relative, isTransformRelated, transformPropTween, cache, smooth, hasPriority, inlineProps, props = this._props, style = target.style, startAt = tween.vars.startAt;
            _pluginInitted || _initCore();
            this.styles = this.styles || _getStyleSaver(target);
            inlineProps = this.styles.props;
            this.tween = tween;
            for (p in vars) {
                if ("autoRound" === p) continue;
                endValue = vars[p];
                if (_plugins[p] && _checkPlugin(p, vars, tween, index, target, targets)) continue;
                type = typeof endValue;
                specialProp = _specialProps[p];
                if ("function" === type) {
                    endValue = endValue.call(tween, index, target, targets);
                    type = typeof endValue;
                }
                if ("string" === type && ~endValue.indexOf("random(")) endValue = _replaceRandom(endValue);
                if (specialProp) specialProp(this, target, p, endValue, tween) && (hasPriority = 1); else if ("--" === p.substr(0, 2)) {
                    startValue = (getComputedStyle(target).getPropertyValue(p) + "").trim();
                    endValue += "";
                    _colorExp.lastIndex = 0;
                    if (!_colorExp.test(startValue)) {
                        startUnit = getUnit(startValue);
                        endUnit = getUnit(endValue);
                    }
                    endUnit ? startUnit !== endUnit && (startValue = _convertToUnit(target, p, startValue, endUnit) + endUnit) : startUnit && (endValue += startUnit);
                    this.add(style, "setProperty", startValue, endValue, index, targets, 0, 0, p);
                    props.push(p);
                    inlineProps.push(p, 0, style[p]);
                } else if ("undefined" !== type) {
                    if (startAt && p in startAt) {
                        startValue = "function" === typeof startAt[p] ? startAt[p].call(tween, index, target, targets) : startAt[p];
                        _isString(startValue) && ~startValue.indexOf("random(") && (startValue = _replaceRandom(startValue));
                        getUnit(startValue + "") || (startValue += _config.units[p] || getUnit(_get(target, p)) || "");
                        "=" === (startValue + "").charAt(1) && (startValue = _get(target, p));
                    } else startValue = _get(target, p);
                    startNum = parseFloat(startValue);
                    relative = "string" === type && "=" === endValue.charAt(1) && endValue.substr(0, 2);
                    relative && (endValue = endValue.substr(2));
                    endNum = parseFloat(endValue);
                    if (p in _propertyAliases) {
                        if ("autoAlpha" === p) {
                            if (1 === startNum && "hidden" === _get(target, "visibility") && endNum) startNum = 0;
                            inlineProps.push("visibility", 0, style.visibility);
                            _addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
                        }
                        if ("scale" !== p && "transform" !== p) {
                            p = _propertyAliases[p];
                            ~p.indexOf(",") && (p = p.split(",")[0]);
                        }
                    }
                    isTransformRelated = p in _transformProps;
                    if (isTransformRelated) {
                        this.styles.save(p);
                        if (!transformPropTween) {
                            cache = target._gsap;
                            cache.renderTransform && !vars.parseTransform || _parseTransform(target, vars.parseTransform);
                            smooth = false !== vars.smoothOrigin && cache.smooth;
                            transformPropTween = this._pt = new PropTween(this._pt, style, _transformProp, 0, 1, cache.renderTransform, cache, 0, -1);
                            transformPropTween.dep = 1;
                        }
                        if ("scale" === p) {
                            this._pt = new PropTween(this._pt, cache, "scaleY", cache.scaleY, (relative ? _parseRelative(cache.scaleY, relative + endNum) : endNum) - cache.scaleY || 0, _renderCSSProp);
                            this._pt.u = 0;
                            props.push("scaleY", p);
                            p += "X";
                        } else if ("transformOrigin" === p) {
                            inlineProps.push(_transformOriginProp, 0, style[_transformOriginProp]);
                            endValue = _convertKeywordsToPercentages(endValue);
                            if (cache.svg) _applySVGOrigin(target, endValue, 0, smooth, 0, this); else {
                                endUnit = parseFloat(endValue.split(" ")[2]) || 0;
                                endUnit !== cache.zOrigin && _addNonTweeningPT(this, cache, "zOrigin", cache.zOrigin, endUnit);
                                _addNonTweeningPT(this, style, p, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
                            }
                            continue;
                        } else if ("svgOrigin" === p) {
                            _applySVGOrigin(target, endValue, 1, smooth, 0, this);
                            continue;
                        } else if (p in _rotationalProperties) {
                            _addRotationalPropTween(this, cache, p, startNum, relative ? _parseRelative(startNum, relative + endValue) : endValue);
                            continue;
                        } else if ("smoothOrigin" === p) {
                            _addNonTweeningPT(this, cache, "smooth", cache.smooth, endValue);
                            continue;
                        } else if ("force3D" === p) {
                            cache[p] = endValue;
                            continue;
                        } else if ("transform" === p) {
                            _addRawTransformPTs(this, endValue, target);
                            continue;
                        }
                    } else if (!(p in style)) p = _checkPropPrefix(p) || p;
                    if (isTransformRelated || (endNum || 0 === endNum) && (startNum || 0 === startNum) && !_complexExp.test(endValue) && p in style) {
                        startUnit = (startValue + "").substr((startNum + "").length);
                        endNum || (endNum = 0);
                        endUnit = getUnit(endValue) || (p in _config.units ? _config.units[p] : startUnit);
                        startUnit !== endUnit && (startNum = _convertToUnit(target, p, startValue, endUnit));
                        this._pt = new PropTween(this._pt, isTransformRelated ? cache : style, p, startNum, (relative ? _parseRelative(startNum, relative + endNum) : endNum) - startNum, !isTransformRelated && ("px" === endUnit || "zIndex" === p) && false !== vars.autoRound ? _renderRoundedCSSProp : _renderCSSProp);
                        this._pt.u = endUnit || 0;
                        if (startUnit !== endUnit && "%" !== endUnit) {
                            this._pt.b = startValue;
                            this._pt.r = _renderCSSPropWithBeginning;
                        }
                    } else if (!(p in style)) {
                        if (p in target) this.add(target, p, startValue || target[p], relative ? relative + endValue : endValue, index, targets); else if ("parseTransform" !== p) {
                            _missingPlugin(p, endValue);
                            continue;
                        }
                    } else _tweenComplexCSSString.call(this, target, p, startValue, relative ? relative + endValue : endValue);
                    isTransformRelated || (p in style ? inlineProps.push(p, 0, style[p]) : inlineProps.push(p, 1, startValue || target[p]));
                    props.push(p);
                }
            }
            hasPriority && _sortPropTweensByPriority(this);
        },
        render: function render(ratio, data) {
            if (data.tween._time || !CSSPlugin_reverting()) {
                var pt = data._pt;
                while (pt) {
                    pt.r(ratio, pt.d);
                    pt = pt._next;
                }
            } else data.styles.revert();
        },
        get: _get,
        aliases: _propertyAliases,
        getSetter: function getSetter(target, property, plugin) {
            var p = _propertyAliases[property];
            p && p.indexOf(",") < 0 && (property = p);
            return property in _transformProps && property !== _transformOriginProp && (target._gsap.x || _get(target, "x")) ? plugin && _recentSetterPlugin === plugin ? "scale" === property ? _setterScale : _setterTransform : (_recentSetterPlugin = plugin || {}) && ("scale" === property ? _setterScaleWithRender : _setterTransformWithRender) : target.style && !_isUndefined(target.style[property]) ? _setterCSSStyle : ~property.indexOf("-") ? _setterCSSProp : _getSetter(target, property);
        },
        core: {
            _removeProperty,
            _getMatrix
        }
    };
    gsap.utils.checkPrefix = _checkPropPrefix;
    gsap.core.getStyleSaver = _getStyleSaver;
    (function(positionAndScale, rotation, others, aliases) {
        var all = _forEachName(positionAndScale + "," + rotation + "," + others, (function(name) {
            _transformProps[name] = 1;
        }));
        _forEachName(rotation, (function(name) {
            _config.units[name] = "deg";
            _rotationalProperties[name] = 1;
        }));
        _propertyAliases[all[13]] = positionAndScale + "," + rotation;
        _forEachName(aliases, (function(name) {
            var split = name.split(":");
            _propertyAliases[split[1]] = all[split[0]];
        }));
    })("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
    _forEachName("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", (function(name) {
        _config.units[name] = "px";
    }));
    gsap.registerPlugin(CSSPlugin);
    var gsapWithCSS = gsap.registerPlugin(CSSPlugin) || gsap;
    gsapWithCSS.core.Tween;
    var defaultInstanceSettings = {
        update: null,
        begin: null,
        loopBegin: null,
        changeBegin: null,
        change: null,
        changeComplete: null,
        loopComplete: null,
        complete: null,
        loop: 1,
        direction: "normal",
        autoplay: true,
        timelineOffset: 0
    };
    var defaultTweenSettings = {
        duration: 1e3,
        delay: 0,
        endDelay: 0,
        easing: "easeOutElastic(1, .5)",
        round: 0
    };
    var validTransforms = [ "translateX", "translateY", "translateZ", "rotate", "rotateX", "rotateY", "rotateZ", "scale", "scaleX", "scaleY", "scaleZ", "skew", "skewX", "skewY", "perspective", "matrix", "matrix3d" ];
    var cache = {
        CSS: {},
        springs: {}
    };
    function minMax(val, min, max) {
        return Math.min(Math.max(val, min), max);
    }
    function stringContains(str, text) {
        return str.indexOf(text) > -1;
    }
    function applyArguments(func, args) {
        return func.apply(null, args);
    }
    var is = {
        arr: function(a) {
            return Array.isArray(a);
        },
        obj: function(a) {
            return stringContains(Object.prototype.toString.call(a), "Object");
        },
        pth: function(a) {
            return is.obj(a) && a.hasOwnProperty("totalLength");
        },
        svg: function(a) {
            return a instanceof SVGElement;
        },
        inp: function(a) {
            return a instanceof HTMLInputElement;
        },
        dom: function(a) {
            return a.nodeType || is.svg(a);
        },
        str: function(a) {
            return "string" === typeof a;
        },
        fnc: function(a) {
            return "function" === typeof a;
        },
        und: function(a) {
            return "undefined" === typeof a;
        },
        nil: function(a) {
            return is.und(a) || null === a;
        },
        hex: function(a) {
            return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a);
        },
        rgb: function(a) {
            return /^rgb/.test(a);
        },
        hsl: function(a) {
            return /^hsl/.test(a);
        },
        col: function(a) {
            return is.hex(a) || is.rgb(a) || is.hsl(a);
        },
        key: function(a) {
            return !defaultInstanceSettings.hasOwnProperty(a) && !defaultTweenSettings.hasOwnProperty(a) && "targets" !== a && "keyframes" !== a;
        }
    };
    function parseEasingParameters(string) {
        var match = /\(([^)]+)\)/.exec(string);
        return match ? match[1].split(",").map((function(p) {
            return parseFloat(p);
        })) : [];
    }
    function spring(string, duration) {
        var params = parseEasingParameters(string);
        var mass = minMax(is.und(params[0]) ? 1 : params[0], .1, 100);
        var stiffness = minMax(is.und(params[1]) ? 100 : params[1], .1, 100);
        var damping = minMax(is.und(params[2]) ? 10 : params[2], .1, 100);
        var velocity = minMax(is.und(params[3]) ? 0 : params[3], .1, 100);
        var w0 = Math.sqrt(stiffness / mass);
        var zeta = damping / (2 * Math.sqrt(stiffness * mass));
        var wd = zeta < 1 ? w0 * Math.sqrt(1 - zeta * zeta) : 0;
        var a = 1;
        var b = zeta < 1 ? (zeta * w0 + -velocity) / wd : -velocity + w0;
        function solver(t) {
            var progress = duration ? duration * t / 1e3 : t;
            if (zeta < 1) progress = Math.exp(-progress * zeta * w0) * (a * Math.cos(wd * progress) + b * Math.sin(wd * progress)); else progress = (a + b * progress) * Math.exp(-progress * w0);
            if (0 === t || 1 === t) return t;
            return 1 - progress;
        }
        function getDuration() {
            var cached = cache.springs[string];
            if (cached) return cached;
            var frame = 1 / 6;
            var elapsed = 0;
            var rest = 0;
            while (true) {
                elapsed += frame;
                if (1 === solver(elapsed)) {
                    rest++;
                    if (rest >= 16) break;
                } else rest = 0;
            }
            var duration = elapsed * frame * 1e3;
            cache.springs[string] = duration;
            return duration;
        }
        return duration ? solver : getDuration;
    }
    function steps(steps) {
        if (void 0 === steps) steps = 10;
        return function(t) {
            return Math.ceil(minMax(t, 1e-6, 1) * steps) * (1 / steps);
        };
    }
    var bezier = function() {
        var kSplineTableSize = 11;
        var kSampleStepSize = 1 / (kSplineTableSize - 1);
        function A(aA1, aA2) {
            return 1 - 3 * aA2 + 3 * aA1;
        }
        function B(aA1, aA2) {
            return 3 * aA2 - 6 * aA1;
        }
        function C(aA1) {
            return 3 * aA1;
        }
        function calcBezier(aT, aA1, aA2) {
            return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
        }
        function getSlope(aT, aA1, aA2) {
            return 3 * A(aA1, aA2) * aT * aT + 2 * B(aA1, aA2) * aT + C(aA1);
        }
        function binarySubdivide(aX, aA, aB, mX1, mX2) {
            var currentX, currentT, i = 0;
            do {
                currentT = aA + (aB - aA) / 2;
                currentX = calcBezier(currentT, mX1, mX2) - aX;
                if (currentX > 0) aB = currentT; else aA = currentT;
            } while (Math.abs(currentX) > 1e-7 && ++i < 10);
            return currentT;
        }
        function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
            for (var i = 0; i < 4; ++i) {
                var currentSlope = getSlope(aGuessT, mX1, mX2);
                if (0 === currentSlope) return aGuessT;
                var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
                aGuessT -= currentX / currentSlope;
            }
            return aGuessT;
        }
        function bezier(mX1, mY1, mX2, mY2) {
            if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) return;
            var sampleValues = new Float32Array(kSplineTableSize);
            if (mX1 !== mY1 || mX2 !== mY2) for (var i = 0; i < kSplineTableSize; ++i) sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
            function getTForX(aX) {
                var intervalStart = 0;
                var currentSample = 1;
                var lastSample = kSplineTableSize - 1;
                for (;currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) intervalStart += kSampleStepSize;
                --currentSample;
                var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
                var guessForT = intervalStart + dist * kSampleStepSize;
                var initialSlope = getSlope(guessForT, mX1, mX2);
                if (initialSlope >= .001) return newtonRaphsonIterate(aX, guessForT, mX1, mX2); else if (0 === initialSlope) return guessForT; else return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
            }
            return function(x) {
                if (mX1 === mY1 && mX2 === mY2) return x;
                if (0 === x || 1 === x) return x;
                return calcBezier(getTForX(x), mY1, mY2);
            };
        }
        return bezier;
    }();
    var penner = function() {
        var eases = {
            linear: function() {
                return function(t) {
                    return t;
                };
            }
        };
        var functionEasings = {
            Sine: function() {
                return function(t) {
                    return 1 - Math.cos(t * Math.PI / 2);
                };
            },
            Circ: function() {
                return function(t) {
                    return 1 - Math.sqrt(1 - t * t);
                };
            },
            Back: function() {
                return function(t) {
                    return t * t * (3 * t - 2);
                };
            },
            Bounce: function() {
                return function(t) {
                    var pow2, b = 4;
                    while (t < ((pow2 = Math.pow(2, --b)) - 1) / 11) ;
                    return 1 / Math.pow(4, 3 - b) - 7.5625 * Math.pow((3 * pow2 - 2) / 22 - t, 2);
                };
            },
            Elastic: function(amplitude, period) {
                if (void 0 === amplitude) amplitude = 1;
                if (void 0 === period) period = .5;
                var a = minMax(amplitude, 1, 10);
                var p = minMax(period, .1, 2);
                return function(t) {
                    return 0 === t || 1 === t ? t : -a * Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1 - p / (2 * Math.PI) * Math.asin(1 / a)) * (2 * Math.PI) / p);
                };
            }
        };
        var baseEasings = [ "Quad", "Cubic", "Quart", "Quint", "Expo" ];
        baseEasings.forEach((function(name, i) {
            functionEasings[name] = function() {
                return function(t) {
                    return Math.pow(t, i + 2);
                };
            };
        }));
        Object.keys(functionEasings).forEach((function(name) {
            var easeIn = functionEasings[name];
            eases["easeIn" + name] = easeIn;
            eases["easeOut" + name] = function(a, b) {
                return function(t) {
                    return 1 - easeIn(a, b)(1 - t);
                };
            };
            eases["easeInOut" + name] = function(a, b) {
                return function(t) {
                    return t < .5 ? easeIn(a, b)(2 * t) / 2 : 1 - easeIn(a, b)(-2 * t + 2) / 2;
                };
            };
            eases["easeOutIn" + name] = function(a, b) {
                return function(t) {
                    return t < .5 ? (1 - easeIn(a, b)(1 - 2 * t)) / 2 : (easeIn(a, b)(2 * t - 1) + 1) / 2;
                };
            };
        }));
        return eases;
    }();
    function parseEasings(easing, duration) {
        if (is.fnc(easing)) return easing;
        var name = easing.split("(")[0];
        var ease = penner[name];
        var args = parseEasingParameters(easing);
        switch (name) {
          case "spring":
            return spring(easing, duration);

          case "cubicBezier":
            return applyArguments(bezier, args);

          case "steps":
            return applyArguments(steps, args);

          default:
            return applyArguments(ease, args);
        }
    }
    function selectString(str) {
        try {
            var nodes = document.querySelectorAll(str);
            return nodes;
        } catch (e) {
            return;
        }
    }
    function filterArray(arr, callback) {
        var len = arr.length;
        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        var result = [];
        for (var i = 0; i < len; i++) if (i in arr) {
            var val = arr[i];
            if (callback.call(thisArg, val, i, arr)) result.push(val);
        }
        return result;
    }
    function flattenArray(arr) {
        return arr.reduce((function(a, b) {
            return a.concat(is.arr(b) ? flattenArray(b) : b);
        }), []);
    }
    function anime_es_toArray(o) {
        if (is.arr(o)) return o;
        if (is.str(o)) o = selectString(o) || o;
        if (o instanceof NodeList || o instanceof HTMLCollection) return [].slice.call(o);
        return [ o ];
    }
    function arrayContains(arr, val) {
        return arr.some((function(a) {
            return a === val;
        }));
    }
    function cloneObject(o) {
        var clone = {};
        for (var p in o) clone[p] = o[p];
        return clone;
    }
    function replaceObjectProps(o1, o2) {
        var o = cloneObject(o1);
        for (var p in o1) o[p] = o2.hasOwnProperty(p) ? o2[p] : o1[p];
        return o;
    }
    function mergeObjects(o1, o2) {
        var o = cloneObject(o1);
        for (var p in o2) o[p] = is.und(o1[p]) ? o2[p] : o1[p];
        return o;
    }
    function rgbToRgba(rgbValue) {
        var rgb = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(rgbValue);
        return rgb ? "rgba(" + rgb[1] + ",1)" : rgbValue;
    }
    function hexToRgba(hexValue) {
        var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        var hex = hexValue.replace(rgx, (function(m, r, g, b) {
            return r + r + g + g + b + b;
        }));
        var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        var r = parseInt(rgb[1], 16);
        var g = parseInt(rgb[2], 16);
        var b = parseInt(rgb[3], 16);
        return "rgba(" + r + "," + g + "," + b + ",1)";
    }
    function hslToRgba(hslValue) {
        var hsl = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hslValue) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(hslValue);
        var h = parseInt(hsl[1], 10) / 360;
        var s = parseInt(hsl[2], 10) / 100;
        var l = parseInt(hsl[3], 10) / 100;
        var a = hsl[4] || 1;
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + 6 * (q - p) * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }
        var r, g, b;
        if (0 == s) r = g = b = l; else {
            var q = l < .5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        return "rgba(" + 255 * r + "," + 255 * g + "," + 255 * b + "," + a + ")";
    }
    function colorToRgb(val) {
        if (is.rgb(val)) return rgbToRgba(val);
        if (is.hex(val)) return hexToRgba(val);
        if (is.hsl(val)) return hslToRgba(val);
    }
    function anime_es_getUnit(val) {
        var split = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(val);
        if (split) return split[1];
    }
    function getTransformUnit(propName) {
        if (stringContains(propName, "translate") || "perspective" === propName) return "px";
        if (stringContains(propName, "rotate") || stringContains(propName, "skew")) return "deg";
    }
    function getFunctionValue(val, animatable) {
        if (!is.fnc(val)) return val;
        return val(animatable.target, animatable.id, animatable.total);
    }
    function getAttribute(el, prop) {
        return el.getAttribute(prop);
    }
    function convertPxToUnit(el, value, unit) {
        var valueUnit = anime_es_getUnit(value);
        if (arrayContains([ unit, "deg", "rad", "turn" ], valueUnit)) return value;
        var cached = cache.CSS[value + unit];
        if (!is.und(cached)) return cached;
        var baseline = 100;
        var tempEl = document.createElement(el.tagName);
        var parentEl = el.parentNode && el.parentNode !== document ? el.parentNode : document.body;
        parentEl.appendChild(tempEl);
        tempEl.style.position = "absolute";
        tempEl.style.width = baseline + unit;
        var factor = baseline / tempEl.offsetWidth;
        parentEl.removeChild(tempEl);
        var convertedUnit = factor * parseFloat(value);
        cache.CSS[value + unit] = convertedUnit;
        return convertedUnit;
    }
    function getCSSValue(el, prop, unit) {
        if (prop in el.style) {
            var uppercasePropName = prop.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
            var value = el.style[prop] || getComputedStyle(el).getPropertyValue(uppercasePropName) || "0";
            return unit ? convertPxToUnit(el, value, unit) : value;
        }
    }
    function getAnimationType(el, prop) {
        if (is.dom(el) && !is.inp(el) && (!is.nil(getAttribute(el, prop)) || is.svg(el) && el[prop])) return "attribute";
        if (is.dom(el) && arrayContains(validTransforms, prop)) return "transform";
        if (is.dom(el) && "transform" !== prop && getCSSValue(el, prop)) return "css";
        if (null != el[prop]) return "object";
    }
    function getElementTransforms(el) {
        if (!is.dom(el)) return;
        var str = el.style.transform || "";
        var reg = /(\w+)\(([^)]*)\)/g;
        var transforms = new Map;
        var m;
        while (m = reg.exec(str)) transforms.set(m[1], m[2]);
        return transforms;
    }
    function getTransformValue(el, propName, animatable, unit) {
        var defaultVal = stringContains(propName, "scale") ? 1 : 0 + getTransformUnit(propName);
        var value = getElementTransforms(el).get(propName) || defaultVal;
        if (animatable) {
            animatable.transforms.list.set(propName, value);
            animatable.transforms["last"] = propName;
        }
        return unit ? convertPxToUnit(el, value, unit) : value;
    }
    function getOriginalTargetValue(target, propName, unit, animatable) {
        switch (getAnimationType(target, propName)) {
          case "transform":
            return getTransformValue(target, propName, animatable, unit);

          case "css":
            return getCSSValue(target, propName, unit);

          case "attribute":
            return getAttribute(target, propName);

          default:
            return target[propName] || 0;
        }
    }
    function getRelativeValue(to, from) {
        var operator = /^(\*=|\+=|-=)/.exec(to);
        if (!operator) return to;
        var u = anime_es_getUnit(to) || 0;
        var x = parseFloat(from);
        var y = parseFloat(to.replace(operator[0], ""));
        switch (operator[0][0]) {
          case "+":
            return x + y + u;

          case "-":
            return x - y + u;

          case "*":
            return x * y + u;
        }
    }
    function validateValue(val, unit) {
        if (is.col(val)) return colorToRgb(val);
        if (/\s/g.test(val)) return val;
        var originalUnit = anime_es_getUnit(val);
        var unitLess = originalUnit ? val.substr(0, val.length - originalUnit.length) : val;
        if (unit) return unitLess + unit;
        return unitLess;
    }
    function getDistance(p1, p2) {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }
    function getCircleLength(el) {
        return 2 * Math.PI * getAttribute(el, "r");
    }
    function getRectLength(el) {
        return 2 * getAttribute(el, "width") + 2 * getAttribute(el, "height");
    }
    function getLineLength(el) {
        return getDistance({
            x: getAttribute(el, "x1"),
            y: getAttribute(el, "y1")
        }, {
            x: getAttribute(el, "x2"),
            y: getAttribute(el, "y2")
        });
    }
    function getPolylineLength(el) {
        var points = el.points;
        var totalLength = 0;
        var previousPos;
        for (var i = 0; i < points.numberOfItems; i++) {
            var currentPos = points.getItem(i);
            if (i > 0) totalLength += getDistance(previousPos, currentPos);
            previousPos = currentPos;
        }
        return totalLength;
    }
    function getPolygonLength(el) {
        var points = el.points;
        return getPolylineLength(el) + getDistance(points.getItem(points.numberOfItems - 1), points.getItem(0));
    }
    function getTotalLength(el) {
        if (el.getTotalLength) return el.getTotalLength();
        switch (el.tagName.toLowerCase()) {
          case "circle":
            return getCircleLength(el);

          case "rect":
            return getRectLength(el);

          case "line":
            return getLineLength(el);

          case "polyline":
            return getPolylineLength(el);

          case "polygon":
            return getPolygonLength(el);
        }
    }
    function setDashoffset(el) {
        var pathLength = getTotalLength(el);
        el.setAttribute("stroke-dasharray", pathLength);
        return pathLength;
    }
    function getParentSvgEl(el) {
        var parentEl = el.parentNode;
        while (is.svg(parentEl)) {
            if (!is.svg(parentEl.parentNode)) break;
            parentEl = parentEl.parentNode;
        }
        return parentEl;
    }
    function getParentSvg(pathEl, svgData) {
        var svg = svgData || {};
        var parentSvgEl = svg.el || getParentSvgEl(pathEl);
        var rect = parentSvgEl.getBoundingClientRect();
        var viewBoxAttr = getAttribute(parentSvgEl, "viewBox");
        var width = rect.width;
        var height = rect.height;
        var viewBox = svg.viewBox || (viewBoxAttr ? viewBoxAttr.split(" ") : [ 0, 0, width, height ]);
        return {
            el: parentSvgEl,
            viewBox,
            x: viewBox[0] / 1,
            y: viewBox[1] / 1,
            w: width,
            h: height,
            vW: viewBox[2],
            vH: viewBox[3]
        };
    }
    function getPath(path, percent) {
        var pathEl = is.str(path) ? selectString(path)[0] : path;
        var p = percent || 100;
        return function(property) {
            return {
                property,
                el: pathEl,
                svg: getParentSvg(pathEl),
                totalLength: getTotalLength(pathEl) * (p / 100)
            };
        };
    }
    function getPathProgress(path, progress, isPathTargetInsideSVG) {
        function point(offset) {
            if (void 0 === offset) offset = 0;
            var l = progress + offset >= 1 ? progress + offset : 0;
            return path.el.getPointAtLength(l);
        }
        var svg = getParentSvg(path.el, path.svg);
        var p = point();
        var p0 = point(-1);
        var p1 = point(+1);
        var scaleX = isPathTargetInsideSVG ? 1 : svg.w / svg.vW;
        var scaleY = isPathTargetInsideSVG ? 1 : svg.h / svg.vH;
        switch (path.property) {
          case "x":
            return (p.x - svg.x) * scaleX;

          case "y":
            return (p.y - svg.y) * scaleY;

          case "angle":
            return 180 * Math.atan2(p1.y - p0.y, p1.x - p0.x) / Math.PI;
        }
    }
    function decomposeValue(val, unit) {
        var rgx = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g;
        var value = validateValue(is.pth(val) ? val.totalLength : val, unit) + "";
        return {
            original: value,
            numbers: value.match(rgx) ? value.match(rgx).map(Number) : [ 0 ],
            strings: is.str(val) || unit ? value.split(rgx) : []
        };
    }
    function parseTargets(targets) {
        var targetsArray = targets ? flattenArray(is.arr(targets) ? targets.map(anime_es_toArray) : anime_es_toArray(targets)) : [];
        return filterArray(targetsArray, (function(item, pos, self) {
            return self.indexOf(item) === pos;
        }));
    }
    function getAnimatables(targets) {
        var parsed = parseTargets(targets);
        return parsed.map((function(t, i) {
            return {
                target: t,
                id: i,
                total: parsed.length,
                transforms: {
                    list: getElementTransforms(t)
                }
            };
        }));
    }
    function normalizePropertyTweens(prop, tweenSettings) {
        var settings = cloneObject(tweenSettings);
        if (/^spring/.test(settings.easing)) settings.duration = spring(settings.easing);
        if (is.arr(prop)) {
            var l = prop.length;
            var isFromTo = 2 === l && !is.obj(prop[0]);
            if (!isFromTo) {
                if (!is.fnc(tweenSettings.duration)) settings.duration = tweenSettings.duration / l;
            } else prop = {
                value: prop
            };
        }
        var propArray = is.arr(prop) ? prop : [ prop ];
        return propArray.map((function(v, i) {
            var obj = is.obj(v) && !is.pth(v) ? v : {
                value: v
            };
            if (is.und(obj.delay)) obj.delay = !i ? tweenSettings.delay : 0;
            if (is.und(obj.endDelay)) obj.endDelay = i === propArray.length - 1 ? tweenSettings.endDelay : 0;
            return obj;
        })).map((function(k) {
            return mergeObjects(k, settings);
        }));
    }
    function flattenKeyframes(keyframes) {
        var propertyNames = filterArray(flattenArray(keyframes.map((function(key) {
            return Object.keys(key);
        }))), (function(p) {
            return is.key(p);
        })).reduce((function(a, b) {
            if (a.indexOf(b) < 0) a.push(b);
            return a;
        }), []);
        var properties = {};
        var loop = function(i) {
            var propName = propertyNames[i];
            properties[propName] = keyframes.map((function(key) {
                var newKey = {};
                for (var p in key) if (is.key(p)) {
                    if (p == propName) newKey.value = key[p];
                } else newKey[p] = key[p];
                return newKey;
            }));
        };
        for (var i = 0; i < propertyNames.length; i++) loop(i);
        return properties;
    }
    function getProperties(tweenSettings, params) {
        var properties = [];
        var keyframes = params.keyframes;
        if (keyframes) params = mergeObjects(flattenKeyframes(keyframes), params);
        for (var p in params) if (is.key(p)) properties.push({
            name: p,
            tweens: normalizePropertyTweens(params[p], tweenSettings)
        });
        return properties;
    }
    function normalizeTweenValues(tween, animatable) {
        var t = {};
        for (var p in tween) {
            var value = getFunctionValue(tween[p], animatable);
            if (is.arr(value)) {
                value = value.map((function(v) {
                    return getFunctionValue(v, animatable);
                }));
                if (1 === value.length) value = value[0];
            }
            t[p] = value;
        }
        t.duration = parseFloat(t.duration);
        t.delay = parseFloat(t.delay);
        return t;
    }
    function normalizeTweens(prop, animatable) {
        var previousTween;
        return prop.tweens.map((function(t) {
            var tween = normalizeTweenValues(t, animatable);
            var tweenValue = tween.value;
            var to = is.arr(tweenValue) ? tweenValue[1] : tweenValue;
            var toUnit = anime_es_getUnit(to);
            var originalValue = getOriginalTargetValue(animatable.target, prop.name, toUnit, animatable);
            var previousValue = previousTween ? previousTween.to.original : originalValue;
            var from = is.arr(tweenValue) ? tweenValue[0] : previousValue;
            var fromUnit = anime_es_getUnit(from) || anime_es_getUnit(originalValue);
            var unit = toUnit || fromUnit;
            if (is.und(to)) to = previousValue;
            tween.from = decomposeValue(from, unit);
            tween.to = decomposeValue(getRelativeValue(to, from), unit);
            tween.start = previousTween ? previousTween.end : 0;
            tween.end = tween.start + tween.delay + tween.duration + tween.endDelay;
            tween.easing = parseEasings(tween.easing, tween.duration);
            tween.isPath = is.pth(tweenValue);
            tween.isPathTargetInsideSVG = tween.isPath && is.svg(animatable.target);
            tween.isColor = is.col(tween.from.original);
            if (tween.isColor) tween.round = 1;
            previousTween = tween;
            return tween;
        }));
    }
    var setProgressValue = {
        css: function(t, p, v) {
            return t.style[p] = v;
        },
        attribute: function(t, p, v) {
            return t.setAttribute(p, v);
        },
        object: function(t, p, v) {
            return t[p] = v;
        },
        transform: function(t, p, v, transforms, manual) {
            transforms.list.set(p, v);
            if (p === transforms.last || manual) {
                var str = "";
                transforms.list.forEach((function(value, prop) {
                    str += prop + "(" + value + ") ";
                }));
                t.style.transform = str;
            }
        }
    };
    function setTargetsValue(targets, properties) {
        var animatables = getAnimatables(targets);
        animatables.forEach((function(animatable) {
            for (var property in properties) {
                var value = getFunctionValue(properties[property], animatable);
                var target = animatable.target;
                var valueUnit = anime_es_getUnit(value);
                var originalValue = getOriginalTargetValue(target, property, valueUnit, animatable);
                var unit = valueUnit || anime_es_getUnit(originalValue);
                var to = getRelativeValue(validateValue(value, unit), originalValue);
                var animType = getAnimationType(target, property);
                setProgressValue[animType](target, property, to, animatable.transforms, true);
            }
        }));
    }
    function createAnimation(animatable, prop) {
        var animType = getAnimationType(animatable.target, prop.name);
        if (animType) {
            var tweens = normalizeTweens(prop, animatable);
            var lastTween = tweens[tweens.length - 1];
            return {
                type: animType,
                property: prop.name,
                animatable,
                tweens,
                duration: lastTween.end,
                delay: tweens[0].delay,
                endDelay: lastTween.endDelay
            };
        }
    }
    function getAnimations(animatables, properties) {
        return filterArray(flattenArray(animatables.map((function(animatable) {
            return properties.map((function(prop) {
                return createAnimation(animatable, prop);
            }));
        }))), (function(a) {
            return !is.und(a);
        }));
    }
    function getInstanceTimings(animations, tweenSettings) {
        var animLength = animations.length;
        var getTlOffset = function(anim) {
            return anim.timelineOffset ? anim.timelineOffset : 0;
        };
        var timings = {};
        timings.duration = animLength ? Math.max.apply(Math, animations.map((function(anim) {
            return getTlOffset(anim) + anim.duration;
        }))) : tweenSettings.duration;
        timings.delay = animLength ? Math.min.apply(Math, animations.map((function(anim) {
            return getTlOffset(anim) + anim.delay;
        }))) : tweenSettings.delay;
        timings.endDelay = animLength ? timings.duration - Math.max.apply(Math, animations.map((function(anim) {
            return getTlOffset(anim) + anim.duration - anim.endDelay;
        }))) : tweenSettings.endDelay;
        return timings;
    }
    var instanceID = 0;
    function createNewInstance(params) {
        var instanceSettings = replaceObjectProps(defaultInstanceSettings, params);
        var tweenSettings = replaceObjectProps(defaultTweenSettings, params);
        var properties = getProperties(tweenSettings, params);
        var animatables = getAnimatables(params.targets);
        var animations = getAnimations(animatables, properties);
        var timings = getInstanceTimings(animations, tweenSettings);
        var id = instanceID;
        instanceID++;
        return mergeObjects(instanceSettings, {
            id,
            children: [],
            animatables,
            animations,
            duration: timings.duration,
            delay: timings.delay,
            endDelay: timings.endDelay
        });
    }
    var activeInstances = [];
    var engine = function() {
        var raf;
        function play() {
            if (!raf && (!isDocumentHidden() || !anime.suspendWhenDocumentHidden) && activeInstances.length > 0) raf = requestAnimationFrame(step);
        }
        function step(t) {
            var activeInstancesLength = activeInstances.length;
            var i = 0;
            while (i < activeInstancesLength) {
                var activeInstance = activeInstances[i];
                if (!activeInstance.paused) {
                    activeInstance.tick(t);
                    i++;
                } else {
                    activeInstances.splice(i, 1);
                    activeInstancesLength--;
                }
            }
            raf = i > 0 ? requestAnimationFrame(step) : void 0;
        }
        function handleVisibilityChange() {
            if (!anime.suspendWhenDocumentHidden) return;
            if (isDocumentHidden()) raf = cancelAnimationFrame(raf); else {
                activeInstances.forEach((function(instance) {
                    return instance._onDocumentVisibility();
                }));
                engine();
            }
        }
        if ("undefined" !== typeof document) document.addEventListener("visibilitychange", handleVisibilityChange);
        return play;
    }();
    function isDocumentHidden() {
        return !!document && document.hidden;
    }
    function anime(params) {
        if (void 0 === params) params = {};
        var startTime = 0, lastTime = 0, now = 0;
        var children, childrenLength = 0;
        var resolve = null;
        function makePromise(instance) {
            var promise = window.Promise && new Promise((function(_resolve) {
                return resolve = _resolve;
            }));
            instance.finished = promise;
            return promise;
        }
        var instance = createNewInstance(params);
        makePromise(instance);
        function toggleInstanceDirection() {
            var direction = instance.direction;
            if ("alternate" !== direction) instance.direction = "normal" !== direction ? "normal" : "reverse";
            instance.reversed = !instance.reversed;
            children.forEach((function(child) {
                return child.reversed = instance.reversed;
            }));
        }
        function adjustTime(time) {
            return instance.reversed ? instance.duration - time : time;
        }
        function resetTime() {
            startTime = 0;
            lastTime = adjustTime(instance.currentTime) * (1 / anime.speed);
        }
        function seekChild(time, child) {
            if (child) child.seek(time - child.timelineOffset);
        }
        function syncInstanceChildren(time) {
            if (!instance.reversePlayback) for (var i = 0; i < childrenLength; i++) seekChild(time, children[i]); else for (var i$1 = childrenLength; i$1--; ) seekChild(time, children[i$1]);
        }
        function setAnimationsProgress(insTime) {
            var i = 0;
            var animations = instance.animations;
            var animationsLength = animations.length;
            while (i < animationsLength) {
                var anim = animations[i];
                var animatable = anim.animatable;
                var tweens = anim.tweens;
                var tweenLength = tweens.length - 1;
                var tween = tweens[tweenLength];
                if (tweenLength) tween = filterArray(tweens, (function(t) {
                    return insTime < t.end;
                }))[0] || tween;
                var elapsed = minMax(insTime - tween.start - tween.delay, 0, tween.duration) / tween.duration;
                var eased = isNaN(elapsed) ? 1 : tween.easing(elapsed);
                var strings = tween.to.strings;
                var round = tween.round;
                var numbers = [];
                var toNumbersLength = tween.to.numbers.length;
                var progress = void 0;
                for (var n = 0; n < toNumbersLength; n++) {
                    var value = void 0;
                    var toNumber = tween.to.numbers[n];
                    var fromNumber = tween.from.numbers[n] || 0;
                    if (!tween.isPath) value = fromNumber + eased * (toNumber - fromNumber); else value = getPathProgress(tween.value, eased * toNumber, tween.isPathTargetInsideSVG);
                    if (round) if (!(tween.isColor && n > 2)) value = Math.round(value * round) / round;
                    numbers.push(value);
                }
                var stringsLength = strings.length;
                if (!stringsLength) progress = numbers[0]; else {
                    progress = strings[0];
                    for (var s = 0; s < stringsLength; s++) {
                        strings[s];
                        var b = strings[s + 1];
                        var n$1 = numbers[s];
                        if (!isNaN(n$1)) if (!b) progress += n$1 + " "; else progress += n$1 + b;
                    }
                }
                setProgressValue[anim.type](animatable.target, anim.property, progress, animatable.transforms);
                anim.currentValue = progress;
                i++;
            }
        }
        function setCallback(cb) {
            if (instance[cb] && !instance.passThrough) instance[cb](instance);
        }
        function countIteration() {
            if (instance.remaining && true !== instance.remaining) instance.remaining--;
        }
        function setInstanceProgress(engineTime) {
            var insDuration = instance.duration;
            var insDelay = instance.delay;
            var insEndDelay = insDuration - instance.endDelay;
            var insTime = adjustTime(engineTime);
            instance.progress = minMax(insTime / insDuration * 100, 0, 100);
            instance.reversePlayback = insTime < instance.currentTime;
            if (children) syncInstanceChildren(insTime);
            if (!instance.began && instance.currentTime > 0) {
                instance.began = true;
                setCallback("begin");
            }
            if (!instance.loopBegan && instance.currentTime > 0) {
                instance.loopBegan = true;
                setCallback("loopBegin");
            }
            if (insTime <= insDelay && 0 !== instance.currentTime) setAnimationsProgress(0);
            if (insTime >= insEndDelay && instance.currentTime !== insDuration || !insDuration) setAnimationsProgress(insDuration);
            if (insTime > insDelay && insTime < insEndDelay) {
                if (!instance.changeBegan) {
                    instance.changeBegan = true;
                    instance.changeCompleted = false;
                    setCallback("changeBegin");
                }
                setCallback("change");
                setAnimationsProgress(insTime);
            } else if (instance.changeBegan) {
                instance.changeCompleted = true;
                instance.changeBegan = false;
                setCallback("changeComplete");
            }
            instance.currentTime = minMax(insTime, 0, insDuration);
            if (instance.began) setCallback("update");
            if (engineTime >= insDuration) {
                lastTime = 0;
                countIteration();
                if (!instance.remaining) {
                    instance.paused = true;
                    if (!instance.completed) {
                        instance.completed = true;
                        setCallback("loopComplete");
                        setCallback("complete");
                        if (!instance.passThrough && "Promise" in window) {
                            resolve();
                            makePromise(instance);
                        }
                    }
                } else {
                    startTime = now;
                    setCallback("loopComplete");
                    instance.loopBegan = false;
                    if ("alternate" === instance.direction) toggleInstanceDirection();
                }
            }
        }
        instance.reset = function() {
            var direction = instance.direction;
            instance.passThrough = false;
            instance.currentTime = 0;
            instance.progress = 0;
            instance.paused = true;
            instance.began = false;
            instance.loopBegan = false;
            instance.changeBegan = false;
            instance.completed = false;
            instance.changeCompleted = false;
            instance.reversePlayback = false;
            instance.reversed = "reverse" === direction;
            instance.remaining = instance.loop;
            children = instance.children;
            childrenLength = children.length;
            for (var i = childrenLength; i--; ) instance.children[i].reset();
            if (instance.reversed && true !== instance.loop || "alternate" === direction && 1 === instance.loop) instance.remaining++;
            setAnimationsProgress(instance.reversed ? instance.duration : 0);
        };
        instance._onDocumentVisibility = resetTime;
        instance.set = function(targets, properties) {
            setTargetsValue(targets, properties);
            return instance;
        };
        instance.tick = function(t) {
            now = t;
            if (!startTime) startTime = now;
            setInstanceProgress((now + (lastTime - startTime)) * anime.speed);
        };
        instance.seek = function(time) {
            setInstanceProgress(adjustTime(time));
        };
        instance.pause = function() {
            instance.paused = true;
            resetTime();
        };
        instance.play = function() {
            if (!instance.paused) return;
            if (instance.completed) instance.reset();
            instance.paused = false;
            activeInstances.push(instance);
            resetTime();
            engine();
        };
        instance.reverse = function() {
            toggleInstanceDirection();
            instance.completed = instance.reversed ? false : true;
            resetTime();
        };
        instance.restart = function() {
            instance.reset();
            instance.play();
        };
        instance.remove = function(targets) {
            var targetsArray = parseTargets(targets);
            removeTargetsFromInstance(targetsArray, instance);
        };
        instance.reset();
        if (instance.autoplay) instance.play();
        return instance;
    }
    function removeTargetsFromAnimations(targetsArray, animations) {
        for (var a = animations.length; a--; ) if (arrayContains(targetsArray, animations[a].animatable.target)) animations.splice(a, 1);
    }
    function removeTargetsFromInstance(targetsArray, instance) {
        var animations = instance.animations;
        var children = instance.children;
        removeTargetsFromAnimations(targetsArray, animations);
        for (var c = children.length; c--; ) {
            var child = children[c];
            var childAnimations = child.animations;
            removeTargetsFromAnimations(targetsArray, childAnimations);
            if (!childAnimations.length && !child.children.length) children.splice(c, 1);
        }
        if (!animations.length && !children.length) instance.pause();
    }
    function removeTargetsFromActiveInstances(targets) {
        var targetsArray = parseTargets(targets);
        for (var i = activeInstances.length; i--; ) {
            var instance = activeInstances[i];
            removeTargetsFromInstance(targetsArray, instance);
        }
    }
    function stagger(val, params) {
        if (void 0 === params) params = {};
        var direction = params.direction || "normal";
        var easing = params.easing ? parseEasings(params.easing) : null;
        var grid = params.grid;
        var axis = params.axis;
        var fromIndex = params.from || 0;
        var fromFirst = "first" === fromIndex;
        var fromCenter = "center" === fromIndex;
        var fromLast = "last" === fromIndex;
        var isRange = is.arr(val);
        var val1 = isRange ? parseFloat(val[0]) : parseFloat(val);
        var val2 = isRange ? parseFloat(val[1]) : 0;
        var unit = anime_es_getUnit(isRange ? val[1] : val) || 0;
        var start = params.start || 0 + (isRange ? val1 : 0);
        var values = [];
        var maxValue = 0;
        return function(el, i, t) {
            if (fromFirst) fromIndex = 0;
            if (fromCenter) fromIndex = (t - 1) / 2;
            if (fromLast) fromIndex = t - 1;
            if (!values.length) {
                for (var index = 0; index < t; index++) {
                    if (!grid) values.push(Math.abs(fromIndex - index)); else {
                        var fromX = !fromCenter ? fromIndex % grid[0] : (grid[0] - 1) / 2;
                        var fromY = !fromCenter ? Math.floor(fromIndex / grid[0]) : (grid[1] - 1) / 2;
                        var toX = index % grid[0];
                        var toY = Math.floor(index / grid[0]);
                        var distanceX = fromX - toX;
                        var distanceY = fromY - toY;
                        var value = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                        if ("x" === axis) value = -distanceX;
                        if ("y" === axis) value = -distanceY;
                        values.push(value);
                    }
                    maxValue = Math.max.apply(Math, values);
                }
                if (easing) values = values.map((function(val) {
                    return easing(val / maxValue) * maxValue;
                }));
                if ("reverse" === direction) values = values.map((function(val) {
                    return axis ? val < 0 ? -1 * val : -val : Math.abs(maxValue - val);
                }));
            }
            var spacing = isRange ? (val2 - val1) / maxValue : val1;
            return start + spacing * (Math.round(100 * values[i]) / 100) + unit;
        };
    }
    function timeline(params) {
        if (void 0 === params) params = {};
        var tl = anime(params);
        tl.duration = 0;
        tl.add = function(instanceParams, timelineOffset) {
            var tlIndex = activeInstances.indexOf(tl);
            var children = tl.children;
            if (tlIndex > -1) activeInstances.splice(tlIndex, 1);
            function passThrough(ins) {
                ins.passThrough = true;
            }
            for (var i = 0; i < children.length; i++) passThrough(children[i]);
            var insParams = mergeObjects(instanceParams, replaceObjectProps(defaultTweenSettings, params));
            insParams.targets = insParams.targets || params.targets;
            var tlDuration = tl.duration;
            insParams.autoplay = false;
            insParams.direction = tl.direction;
            insParams.timelineOffset = is.und(timelineOffset) ? tlDuration : getRelativeValue(timelineOffset, tlDuration);
            passThrough(tl);
            tl.seek(insParams.timelineOffset);
            var ins = anime(insParams);
            passThrough(ins);
            children.push(ins);
            var timings = getInstanceTimings(children, params);
            tl.delay = timings.delay;
            tl.endDelay = timings.endDelay;
            tl.duration = timings.duration;
            tl.seek(0);
            tl.reset();
            if (tl.autoplay) tl.play();
            return tl;
        };
        return tl;
    }
    anime.version = "3.2.1";
    anime.speed = 1;
    anime.suspendWhenDocumentHidden = true;
    anime.running = activeInstances;
    anime.remove = removeTargetsFromActiveInstances;
    anime.get = getOriginalTargetValue;
    anime.set = setTargetsValue;
    anime.convertPx = convertPxToUnit;
    anime.path = getPath;
    anime.setDashoffset = setDashoffset;
    anime.stagger = stagger;
    anime.timeline = timeline;
    anime.easing = parseEasings;
    anime.penner = penner;
    anime.random = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const anime_es = anime;
    //! E-mail 
    const input = document.querySelector(".form__input");
    function onFocus() {
        var errorDiv = document.querySelector(".form__error");
        if (errorDiv) errorDiv.style.opacity = "0.6"; else console.warn("Error div not found");
    }
    function onBlur() {
        var errorDiv = document.querySelector(".form__error");
        if (errorDiv) errorDiv.style.opacity = "1"; else console.warn("Error div not found");
    }
    input.addEventListener("focus", (function() {
        onFocus();
    }));
    input.addEventListener("blur", (function() {
        onBlur();
    }));
    const script_form = document.querySelector(".form");
    script_form.addEventListener("submit", (function(event) {
        event.preventDefault();
        const errors = formValidate.getErrors(this);
        if (0 === errors) {
            script_form.style.display = "none";
            document.querySelector(".confirmation").style.display = "block";
        }
    }));
    //! Loading screen
        var imagesToPreload = document.querySelectorAll("[data-preload] img");
    var imagesLoaded = 0;
    function preloadImages() {
        for (var i = 0; i < imagesToPreload.length; i++) {
            var img = new Image;
            img.onload = function() {
                imagesLoaded++;
                if (imagesLoaded == imagesToPreload.length) setTimeout((function() {
                    gsapWithCSS.to("#loading-screen", {
                        opacity: 0,
                        duration: .5,
                        onComplete: function() {
                            document.getElementById("loading-screen").style.display = "none";
                        }
                    });
                    gsapWithCSS.to(".carousel", {
                        delay: .5,
                        opacity: 1,
                        duration: 1
                    });
                }), 1e3);
            };
            img.src = imagesToPreload[i].src;
        }
    }
    window.onload = preloadImages;
    //! Loading-screen-fox
        const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const CANVAS_WIDTH = canvas.width = 95;
    const CANVAS_HEIGHT = canvas.height = 95;
    const playerImage = new Image;
    playerImage.src = "img/loading-screen/fox.webp";
    const spriteWidth = 95;
    const spriteHeight = 95;
    let gameFrame = 0;
    let straggerFrames = 17;
    if (window.innerWidth <= 768) straggerFrames = 7;
    const spriteAnimations = [];
    const animationStates = [ {
        name: "idle",
        frames: 3
    } ];
    animationStates.forEach(((state, index) => {
        let frames = {
            loc: []
        };
        for (let j = 0; j < state.frames; j++) {
            let positionX = j * spriteWidth;
            let positionY = index * spriteHeight;
            frames.loc.push({
                x: positionX,
                y: positionY
            });
        }
        spriteAnimations[state.name] = frames;
    }));
    function animate() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        let position = Math.floor(gameFrame / straggerFrames) % spriteAnimations["idle"].loc.length;
        let frameX = spriteWidth * position;
        let frameY = spriteAnimations["idle"].loc[position].y;
        ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
        gameFrame++;
        requestAnimationFrame(animate);
    }
    animate();
    //! Carousel
        document.querySelector(".carousel");
    document.querySelector(".carousel__container");
    document.querySelector(".carousel__images");
    const imageBlocks = document.querySelectorAll(".carousel__image-block");
    const script_images = document.querySelectorAll(".carousel__image-ibg");
    let intervalId;
    imageBlocks.forEach((image => {
        image.classList.remove("active");
    }));
    let currentIndex = 0;
    let time = 100;
    function startCarousel() {
        for (let i = 0; i < imageBlocks.length; i++) script_images[currentIndex + i * script_images.length / imageBlocks.length].classList.add("active");
        intervalId = setInterval((() => {
            for (let i = 0; i < imageBlocks.length; i++) script_images[currentIndex + i * script_images.length / imageBlocks.length].classList.remove("active");
            currentIndex = (currentIndex + 1) % (script_images.length / imageBlocks.length);
            for (let i = 0; i < imageBlocks.length; i++) script_images[currentIndex + i * script_images.length / imageBlocks.length].classList.add("active");
            if (0 === currentIndex) time++;
        }), time);
    }
    startCarousel();
    function killCarousel() {
        clearInterval(intervalId);
        time = 5e3;
    }
    //! Carousel Animations
        gsapWithCSS.set(".carousel__images", {
        delay: 3,
        gridTemplateColumns: "1fr 1fr",
        columnGap: "20px"
    });
    gsapWithCSS.set(".carousel__images", {
        delay: 4,
        gridTemplateRows: "repeat(2, 1fr)",
        rowGap: "20px"
    });
    gsapWithCSS.set(".carousel__images", {
        delay: 5,
        gridTemplateColumns: "repeat(4, 1fr)"
    });
    gsapWithCSS.fromTo(".carousel__images", {
        opacity: 1
    }, {
        delay: 5.5,
        opacity: 0,
        ease: "sine.out",
        duration: 3
    });
    gsapWithCSS.set(".circle", {
        delay: 8.5,
        visibility: "hidden",
        display: "none",
        gridTemplateColumns: "repeat(4, 1fr)"
    });
    setTimeout((() => {
        killCarousel();
    }), 7e3);
    const tl = gsapWithCSS.timeline();
    tl.fromTo(".circle", {
        scale: 0,
        opacity: 0
    }, {
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: "back.out(3)",
        delay: 6
    }).to(".circle", {
        scale: 100,
        opacity: 0,
        duration: 2,
        ease: "expo.out"
    }).from(".main-block", {
        opacity: 0,
        duration: 2
    }, "<0").from(".logo__circle", {
        scale: 0,
        opacity: 0,
        duration: 4.2,
        ease: "Expo.easeOut",
        delay: .5
    }, "<0").from(".contact-block", {
        opacity: 0,
        duration: 2
    }, "<1").from(".main-block__women", {
        x: 10,
        y: 5,
        opacity: 0,
        duration: 4.2,
        ease: "Expo.easeOut"
    }, "<1").from(".contact-block__title > span", {
        opacity: 0,
        y: 5,
        duration: 2
    }, "<1").from(".contact-block__text", {
        y: 5,
        opacity: 0,
        duration: 1
    }, "<1").fromTo(".form", {
        width: "105px",
        opacity: 0
    }, {
        opacity: 1,
        width: "100%",
        duration: 4.5,
        ease: "power4.out"
    }, "<1");
    var textWrapper2 = document.querySelector(".ml2");
    textWrapper2.innerHTML = textWrapper2.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    textWrapper2 = document.querySelector(".ml3");
    textWrapper2.innerHTML = textWrapper2.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    anime_es.timeline().add({
        targets: ".ml2 .letter",
        translateY: [ 60, 0 ],
        translateZ: 0,
        opacity: [ 0, 1 ],
        easing: "easeOutExpo",
        duration: 2e3,
        delay: (el, i) => 50 + 60 * i + 8700
    });
    anime_es.timeline().add({
        targets: ".ml3 .letter",
        translateY: [ 60, 0 ],
        translateZ: 0,
        opacity: [ 0, 1 ],
        easing: "easeOutExpo",
        duration: 2e3,
        delay: (el, i) => 250 + 60 * i + 8700
    });
    window["FLS"] = true;
    isWebp();
})();