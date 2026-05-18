import { ac as ssr_context, F as fallback, k as attr_class, m as bind_props, A as ensure_array_like, l as attr_style, af as stringify, ai as to_array, aa as slot, O as head, ae as store_set, ad as store_get, j as attr, aj as unsubscribe_stores } from "../../../chunks/renderer.js";
import { w as writable } from "../../../chunks/index.js";
import "clsx";
import easyReactive from "easy-reactive";
import { H as Hero } from "../../../chunks/Hero.js";
function onDestroy(fn) {
  /** @type {SSRContext} */
  ssr_context.r.on_destroy(fn);
}
function Dot($$renderer, $$props) {
  let active = fallback($$props["active"], false);
  $$renderer.push(`<button${attr_class("sc-carousel-button sc-carousel-dot__dot svelte-1mtaq3v", void 0, { "sc-carousel-dot__dot_active": active })}></button>`);
  bind_props($$props, { active });
}
function Dots($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let pagesCount = fallback($$props["pagesCount"], 1);
    let currentPageIndex = fallback($$props["currentPageIndex"], 0);
    $$renderer2.push(`<div class="sc-carousel-dots__container svelte-1pld061"><!--[-->`);
    const each_array = ensure_array_like(Array(pagesCount));
    for (let pageIndex = 0, $$length = each_array.length; pageIndex < $$length; pageIndex++) {
      each_array[pageIndex];
      $$renderer2.push(`<div class="sc-carousel-dots__dot-container svelte-1pld061">`);
      Dot($$renderer2, { active: currentPageIndex === pageIndex });
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { pagesCount, currentPageIndex });
  });
}
const PREV = "prev";
const NEXT = "next";
function Arrow($$renderer, $$props) {
  let direction = fallback($$props["direction"], NEXT);
  let disabled = fallback($$props["disabled"], false);
  $$renderer.push(`<button${attr_class("sc-carousel-button sc-carousel-arrow__circle svelte-1pnlyzn", void 0, { "sc-carousel-arrow__circle_disabled": disabled })}><i${attr_class("sc-carousel-arrow__arrow svelte-1pnlyzn", void 0, {
    "sc-carousel-arrow__arrow-next": direction === NEXT,
    "sc-carousel-arrow__arrow-prev": direction === PREV
  })}></i></button>`);
  bind_props($$props, { direction, disabled });
}
function Progress($$renderer, $$props) {
  let width;
  const MAX_PERCENT = 100;
  let value = fallback($$props["value"], 0);
  width = Math.min(Math.max(value * MAX_PERCENT, 0), MAX_PERCENT);
  $$renderer.push(`<div class="sc-carousel-progress__indicator svelte-1pc71g7"${attr_style(` width: ${stringify(width)}%; `)}></div>`);
  bind_props($$props, { value });
}
function getValueInRange(min, value, max) {
  return Math.max(min, Math.min(value, max));
}
function _getCurrentPageIndexByCurrentParticleIndexInfinite({
  currentParticleIndex,
  particlesCount,
  clonesCountHead,
  clonesCountTotal,
  particlesToScroll
}) {
  if (currentParticleIndex === particlesCount - clonesCountHead) return 0;
  if (currentParticleIndex === 0) return _getPagesCountByParticlesCountInfinite({
    particlesCountWithoutClones: particlesCount - clonesCountTotal,
    particlesToScroll
  }) - 1;
  return Math.floor((currentParticleIndex - clonesCountHead) / particlesToScroll);
}
function _getCurrentPageIndexByCurrentParticleIndexLimited({
  currentParticleIndex,
  particlesToScroll
}) {
  return Math.ceil(currentParticleIndex / particlesToScroll);
}
function getCurrentPageIndexByCurrentParticleIndex({
  currentParticleIndex,
  particlesCount,
  clonesCountHead,
  clonesCountTotal,
  infinite,
  particlesToScroll
}) {
  return infinite ? _getCurrentPageIndexByCurrentParticleIndexInfinite({
    currentParticleIndex,
    particlesCount,
    clonesCountHead,
    clonesCountTotal,
    particlesToScroll
  }) : _getCurrentPageIndexByCurrentParticleIndexLimited({
    currentParticleIndex,
    particlesToScroll
  });
}
function _getPagesCountByParticlesCountInfinite({
  particlesCountWithoutClones,
  particlesToScroll
}) {
  return Math.ceil(particlesCountWithoutClones / particlesToScroll);
}
function _getPagesCountByParticlesCountLimited({
  particlesCountWithoutClones,
  particlesToScroll,
  particlesToShow
}) {
  const partialPageSize = getPartialPageSize({
    particlesCountWithoutClones,
    particlesToScroll,
    particlesToShow
  });
  return Math.ceil(particlesCountWithoutClones / particlesToScroll) - partialPageSize;
}
function getPagesCountByParticlesCount({
  infinite,
  particlesCountWithoutClones,
  particlesToScroll,
  particlesToShow
}) {
  return infinite ? _getPagesCountByParticlesCountInfinite({
    particlesCountWithoutClones,
    particlesToScroll
  }) : _getPagesCountByParticlesCountLimited({
    particlesCountWithoutClones,
    particlesToScroll,
    particlesToShow
  });
}
function _getParticleIndexByPageIndexInfinite({
  pageIndex,
  clonesCountHead,
  clonesCountTail,
  particlesToScroll,
  particlesCount
}) {
  return getValueInRange(
    0,
    Math.min(clonesCountHead + pageIndex * particlesToScroll, particlesCount - clonesCountTail),
    particlesCount - 1
  );
}
function _getParticleIndexByPageIndexLimited({
  pageIndex,
  particlesToScroll,
  particlesCount,
  particlesToShow
}) {
  return getValueInRange(
    0,
    Math.min(pageIndex * particlesToScroll, particlesCount - particlesToShow),
    particlesCount - 1
  );
}
function getParticleIndexByPageIndex({
  infinite,
  pageIndex,
  clonesCountHead,
  clonesCountTail,
  particlesToScroll,
  particlesCount,
  particlesToShow
}) {
  return infinite ? _getParticleIndexByPageIndexInfinite({
    pageIndex,
    clonesCountHead,
    clonesCountTail,
    particlesToScroll,
    particlesCount
  }) : _getParticleIndexByPageIndexLimited({
    pageIndex,
    particlesToScroll,
    particlesCount,
    particlesToShow
  });
}
function applyParticleSizes({
  particlesContainerChildren,
  particleWidth
}) {
  for (let particleIndex = 0; particleIndex < particlesContainerChildren.length; particleIndex++) {
    particlesContainerChildren[particleIndex].style.minWidth = `${particleWidth}px`;
    particlesContainerChildren[particleIndex].style.maxWidth = `${particleWidth}px`;
  }
}
function getPartialPageSize({
  particlesToScroll,
  particlesToShow,
  particlesCountWithoutClones
}) {
  const overlap = particlesToScroll - particlesToShow;
  let particlesCount = particlesToShow;
  while (true) {
    const diff = particlesCountWithoutClones - particlesCount - overlap;
    if (diff < particlesToShow) {
      return Math.max(diff, 0);
    }
    particlesCount += particlesToShow + overlap;
  }
}
function createResizeObserver(onResize) {
  return new ResizeObserver((entries) => {
    onResize({
      width: entries[0].contentRect.width
    });
  });
}
function getClonesCount({
  infinite,
  particlesToShow,
  partialPageSize
}) {
  const clonesCount = infinite ? {
    // need to round with ceil as particlesToShow, particlesToShow can be floating (e.g. 1.5, 3.75)
    head: Math.ceil(partialPageSize || particlesToShow),
    tail: Math.ceil(particlesToShow)
  } : {
    head: 0,
    tail: 0
  };
  return {
    ...clonesCount,
    total: clonesCount.head + clonesCount.tail
  };
}
const get = (object, fieldName, defaultValue) => {
  if (object && object.hasOwnProperty(fieldName)) {
    return object[fieldName];
  }
  return defaultValue;
};
const switcher = (description) => (key) => {
  description[key] && description[key]();
};
function getIndexesOfParticlesWithoutClonesInPage({
  pageIndex,
  particlesToShow,
  particlesToScroll,
  particlesCount
}) {
  const overlap = pageIndex === 0 ? 0 : particlesToShow - particlesToScroll;
  const from = pageIndex * particlesToShow - pageIndex * overlap;
  const to = from + Math.max(particlesToShow, particlesToScroll) - 1;
  const indexes = [];
  for (let i = from; i <= Math.min(particlesCount - 1, to); i++) {
    indexes.push(i);
  }
  return indexes;
}
function getAdjacentIndexes({
  infinite,
  pageIndex,
  pagesCount,
  particlesCount,
  particlesToShow,
  particlesToScroll
}) {
  const _pageIndex = getValueInRange(0, pageIndex, pagesCount - 1);
  let rangeStart = _pageIndex - 1;
  let rangeEnd = _pageIndex + 1;
  rangeStart = infinite ? rangeStart < 0 ? pagesCount - 1 : rangeStart : Math.max(0, rangeStart);
  rangeEnd = infinite ? rangeEnd > pagesCount - 1 ? 0 : rangeEnd : Math.min(pagesCount - 1, rangeEnd);
  const pageIndexes = [.../* @__PURE__ */ new Set([
    rangeStart,
    _pageIndex,
    rangeEnd,
    // because of these values outputs for infinite/non-infinites are the same
    0,
    // needed to clone first page particles
    pagesCount - 1
    // needed to clone last page particles
  ])].sort((a, b) => a - b);
  const particleIndexes = pageIndexes.flatMap(
    (pageIndex2) => getIndexesOfParticlesWithoutClonesInPage({
      pageIndex: pageIndex2,
      particlesToShow,
      particlesToScroll,
      particlesCount
    })
  );
  return {
    pageIndexes,
    particleIndexes: [...new Set(particleIndexes)].sort((a, b) => a - b)
  };
}
const setIntervalImmediate = (fn, ms) => {
  fn();
  return setInterval(fn, ms);
};
const STEP_MS = 35;
const MAX_VALUE = 1;
class ProgressManager {
  constructor({ onProgressValueChange }) {
    this._onProgressValueChange = onProgressValueChange;
    this._autoplayDuration;
    this._onProgressValueChange;
    this._interval;
    this._paused = false;
  }
  setAutoplayDuration(autoplayDuration) {
    this._autoplayDuration = autoplayDuration;
  }
  start(onFinish) {
    return new Promise((resolve) => {
      this.reset();
      const stepMs = Math.min(STEP_MS, Math.max(this._autoplayDuration, 1));
      let progress = -stepMs;
      this._interval = setIntervalImmediate(async () => {
        if (this._paused) {
          return;
        }
        progress += stepMs;
        const value = progress / this._autoplayDuration;
        this._onProgressValueChange(value);
        if (value > MAX_VALUE) {
          this.reset();
          await onFinish();
          resolve();
        }
      }, stepMs);
    });
  }
  pause() {
    this._paused = true;
  }
  resume() {
    this._paused = false;
  }
  reset() {
    clearInterval(this._interval);
    this._onProgressValueChange(MAX_VALUE);
  }
}
function createCarousel(onChange) {
  const progressManager = new ProgressManager({
    onProgressValueChange: (value) => {
      onChange("progressValue", 1 - value);
    }
  });
  const reactive = easyReactive(
    {
      data: {
        particlesCountWithoutClones: 0,
        particlesToShow: 1,
        // normalized
        particlesToShowInit: 1,
        // initial value
        particlesToScroll: 1,
        // normalized
        particlesToScrollInit: 1,
        // initial value
        particlesCount: 1,
        currentParticleIndex: 1,
        infinite: false,
        autoplayDuration: 1e3,
        clonesCountHead: 0,
        clonesCountTail: 0,
        clonesCountTotal: 0,
        partialPageSize: 1,
        currentPageIndex: 1,
        pagesCount: 1,
        pauseOnFocus: false,
        focused: false,
        autoplay: false,
        autoplayDirection: "next",
        disabled: false,
        // disable page change while animation is in progress
        durationMsInit: 1e3,
        durationMs: 1e3,
        offset: 0,
        particleWidth: 0,
        loaded: []
      },
      watch: {
        setLoaded({ data: data2 }) {
          data2.loaded = getAdjacentIndexes({
            infinite: data2.infinite,
            pageIndex: data2.currentPageIndex,
            pagesCount: data2.pagesCount,
            particlesCount: data2.particlesCountWithoutClones,
            particlesToShow: data2.particlesToShow,
            particlesToScroll: data2.particlesToScroll
          }).particleIndexes;
        },
        setCurrentPageIndex({ data: data2 }) {
          data2.currentPageIndex = getCurrentPageIndexByCurrentParticleIndex({
            currentParticleIndex: data2.currentParticleIndex,
            particlesCount: data2.particlesCount,
            clonesCountHead: data2.clonesCountHead,
            clonesCountTotal: data2.clonesCountTotal,
            infinite: data2.infinite,
            particlesToScroll: data2.particlesToScroll
          });
        },
        setPartialPageSize({ data: data2 }) {
          data2.partialPageSize = getPartialPageSize({
            particlesToScroll: data2.particlesToScroll,
            particlesToShow: data2.particlesToShow,
            particlesCountWithoutClones: data2.particlesCountWithoutClones
          });
        },
        setClonesCount({ data: data2 }) {
          const { head: head2, tail } = getClonesCount({
            infinite: data2.infinite,
            particlesToShow: data2.particlesToShow,
            partialPageSize: data2.partialPageSize
          });
          data2.clonesCountHead = head2;
          data2.clonesCountTail = tail;
          data2.clonesCountTotal = head2 + tail;
        },
        setProgressManagerAutoplayDuration({ data: data2 }) {
          progressManager.setAutoplayDuration(data2.autoplayDuration);
        },
        toggleProgressManager({ data: { pauseOnFocus, focused } }) {
          if (pauseOnFocus) {
            if (focused) {
              progressManager.pause();
            } else {
              progressManager.resume();
            }
          }
        },
        initDuration({ data: data2 }) {
          data2.durationMs = data2.durationMsInit;
        },
        applyAutoplay({ data: data2, methods: { _applyAutoplayIfNeeded } }) {
          data2.autoplay && _applyAutoplayIfNeeded(data2.autoplay);
        },
        setPagesCount({ data: data2 }) {
          data2.pagesCount = getPagesCountByParticlesCount({
            infinite: data2.infinite,
            particlesCountWithoutClones: data2.particlesCountWithoutClones,
            particlesToScroll: data2.particlesToScroll,
            particlesToShow: data2.particlesToShow
          });
        },
        setParticlesToShow({ data: data2 }) {
          data2.particlesToShow = getValueInRange(
            1,
            data2.particlesToShowInit,
            data2.particlesCountWithoutClones
          );
        },
        setParticlesToScroll({ data: data2 }) {
          data2.particlesToScroll = getValueInRange(
            1,
            data2.particlesToScrollInit,
            data2.particlesCountWithoutClones
          );
        }
      },
      methods: {
        _prev({ data: data2 }) {
          data2.currentParticleIndex = getParticleIndexByPageIndex({
            infinite: data2.infinite,
            pageIndex: data2.currentPageIndex - 1,
            clonesCountHead: data2.clonesCountHead,
            clonesCountTail: data2.clonesCountTail,
            particlesToScroll: data2.particlesToScroll,
            particlesCount: data2.particlesCount,
            particlesToShow: data2.particlesToShow
          });
        },
        _next({ data: data2 }) {
          data2.currentParticleIndex = getParticleIndexByPageIndex({
            infinite: data2.infinite,
            pageIndex: data2.currentPageIndex + 1,
            clonesCountHead: data2.clonesCountHead,
            clonesCountTail: data2.clonesCountTail,
            particlesToScroll: data2.particlesToScroll,
            particlesCount: data2.particlesCount,
            particlesToShow: data2.particlesToShow
          });
        },
        _moveToParticle({ data: data2 }, particleIndex) {
          data2.currentParticleIndex = getValueInRange(
            0,
            particleIndex,
            data2.particlesCount - 1
          );
        },
        toggleFocused({ data: data2 }) {
          data2.focused = !data2.focused;
        },
        async _applyAutoplayIfNeeded({ data: data2, methods: methods2 }) {
          if (!data2.infinite && (data2.autoplayDirection === NEXT && data2.currentParticleIndex === data2.particlesCount - 1 || data2.autoplayDirection === PREV && data2.currentParticleIndex === 0)) {
            progressManager.reset();
            return;
          }
          if (data2.autoplay) {
            const onFinish = () => switcher({
              [NEXT]: async () => methods2.showNextPage(),
              [PREV]: async () => methods2.showPrevPage()
            })(data2.autoplayDirection);
            await progressManager.start(onFinish);
          }
        },
        // makes delayed jump to 1st or last element
        async _jumpIfNeeded({ data: data2, methods: methods2 }) {
          let jumped = false;
          if (data2.infinite) {
            if (data2.currentParticleIndex === 0) {
              await methods2.showParticle(
                data2.particlesCount - data2.clonesCountTotal,
                {
                  animated: false
                }
              );
              jumped = true;
            } else if (data2.currentParticleIndex === data2.particlesCount - data2.clonesCountTail) {
              await methods2.showParticle(data2.clonesCountHead, {
                animated: false
              });
              jumped = true;
            }
          }
          return jumped;
        },
        async changePage({ data: data2, methods: methods2 }, updateStoreFn, options) {
          progressManager.reset();
          if (data2.disabled) return;
          data2.disabled = true;
          updateStoreFn();
          await methods2.offsetPage({ animated: get(options, "animated", true) });
          data2.disabled = false;
          const jumped = await methods2._jumpIfNeeded();
          !jumped && methods2._applyAutoplayIfNeeded();
        },
        async showNextPage({ data: data2, methods: methods2 }, options) {
          if (data2.disabled) return;
          await methods2.changePage(methods2._next, options);
        },
        async showPrevPage({ data: data2, methods: methods2 }, options) {
          if (data2.disabled) return;
          await methods2.changePage(methods2._prev, options);
        },
        async showParticle({ methods: methods2 }, particleIndex, options) {
          await methods2.changePage(
            () => methods2._moveToParticle(particleIndex),
            options
          );
        },
        _getParticleIndexByPageIndex({ data: data2 }, pageIndex) {
          return getParticleIndexByPageIndex({
            infinite: data2.infinite,
            pageIndex,
            clonesCountHead: data2.clonesCountHead,
            clonesCountTail: data2.clonesCountTail,
            particlesToScroll: data2.particlesToScroll,
            particlesCount: data2.particlesCount,
            particlesToShow: data2.particlesToShow
          });
        },
        async showPage({ methods: methods2 }, pageIndex, options) {
          const particleIndex = methods2._getParticleIndexByPageIndex(pageIndex);
          await methods2.showParticle(particleIndex, options);
        },
        offsetPage({ data: data2 }, options) {
          const animated = get(options, "animated", true);
          return new Promise((resolve) => {
            data2.durationMs = animated ? data2.durationMsInit : 0;
            data2.offset = -data2.currentParticleIndex * data2.particleWidth;
            setTimeout(() => {
              resolve();
            }, data2.durationMs);
          });
        }
      }
    },
    {
      onChange
    }
  );
  const [data, methods] = reactive;
  return [{ data, progressManager }, methods, reactive._internal];
}
function Carousel($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let loaded = [];
    let currentPageIndex;
    let progressValue;
    let offset = 0;
    let durationMs = 0;
    let pagesCount = 1;
    const tmp = createCarousel((key, value) => {
      switcher({
        "currentPageIndex": () => currentPageIndex = value,
        "progressValue": () => progressValue = value,
        "offset": () => offset = value,
        "durationMs": () => durationMs = value,
        "pagesCount": () => pagesCount = value,
        "loaded": () => loaded = value
      })(key);
    }), $$array = to_array(tmp, 3), data = $$array[0].data, progressManager = $$array[0].progressManager, methods = $$array[1];
    $$array[2];
    let timingFunction = fallback($$props["timingFunction"], "ease-in-out");
    let arrows = fallback($$props["arrows"], true);
    let infinite = fallback($$props["infinite"], true);
    let initialPageIndex = fallback($$props["initialPageIndex"], 0);
    let duration = fallback($$props["duration"], 500);
    let autoplay = fallback($$props["autoplay"], false);
    let autoplayDuration = fallback($$props["autoplayDuration"], 3e3);
    let autoplayDirection = fallback($$props["autoplayDirection"], NEXT);
    let pauseOnFocus = fallback($$props["pauseOnFocus"], false);
    let autoplayProgressVisible = fallback($$props["autoplayProgressVisible"], false);
    let dots = fallback($$props["dots"], true);
    let swiping = fallback($$props["swiping"], true);
    let particlesToShow = fallback($$props["particlesToShow"], 1);
    let particlesToScroll = fallback($$props["particlesToScroll"], 1);
    async function goTo(pageIndex, options) {
      const animated = get(options, "animated", true);
      if (typeof pageIndex !== "number") {
        throw new Error("pageIndex should be a number");
      }
      await methods.showPage(pageIndex, { animated });
    }
    async function goToPrev(options) {
      const animated = get(options, "animated", true);
      await methods.showPrevPage({ animated });
    }
    async function goToNext(options) {
      const animated = get(options, "animated", true);
      await methods.showNextPage({ animated });
    }
    let pageWindowWidth = 0;
    let particlesContainer;
    const pageWindowElementResizeObserver = createResizeObserver(({ width }) => {
      pageWindowWidth = width;
      data.particleWidth = pageWindowWidth / data.particlesToShow;
      applyParticleSizes({
        particlesContainerChildren: particlesContainer.children,
        particleWidth: data.particleWidth
      });
      methods.offsetPage({ animated: false });
    });
    onDestroy(() => {
      pageWindowElementResizeObserver.disconnect();
      progressManager.reset();
    });
    async function handlePageChange(pageIndex) {
      await methods.showPage(pageIndex, { animated: true });
    }
    {
      data.infinite = infinite;
    }
    {
      data.durationMsInit = duration;
    }
    {
      data.autoplay = autoplay;
    }
    {
      data.autoplayDuration = autoplayDuration;
    }
    {
      data.autoplayDirection = autoplayDirection;
    }
    {
      data.pauseOnFocus = pauseOnFocus;
    }
    {
      data.particlesToShowInit = particlesToShow;
    }
    {
      data.particlesToScrollInit = particlesToScroll;
    }
    $$renderer2.push(`<div class="sc-carousel__carousel-container svelte-1yu03g9"><div class="sc-carousel__content-container svelte-1yu03g9">`);
    if (
      // call after adding clones
      // gestures
      arrows
    ) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<!--[-->`);
      slot($$renderer2, $$props, "prev", { showPrevPage: methods.showPrevPage }, () => {
        $$renderer2.push(`<div class="sc-carousel__arrow-container svelte-1yu03g9">`);
        Arrow($$renderer2, {
          direction: "prev",
          disabled: !infinite && currentPageIndex === 0
        });
        $$renderer2.push(`<!----></div>`);
      });
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div class="sc-carousel__pages-window svelte-1yu03g9"><div class="sc-carousel__pages-container svelte-1yu03g9"${attr_style(` transform: translateX(${stringify(offset)}px); transition-duration: ${stringify(durationMs)}ms; transition-timing-function: ${stringify(timingFunction)}; `)}><!--[-->`);
    slot($$renderer2, $$props, "default", { loaded, currentPageIndex }, null);
    $$renderer2.push(`<!--]--></div> `);
    if (autoplayProgressVisible) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="sc-carousel-progress__container svelte-1yu03g9">`);
      Progress($$renderer2, { value: progressValue });
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (arrows) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<!--[-->`);
      slot($$renderer2, $$props, "next", { showNextPage: methods.showNextPage }, () => {
        $$renderer2.push(`<div class="sc-carousel__arrow-container svelte-1yu03g9">`);
        Arrow($$renderer2, {
          direction: "next",
          disabled: !infinite && currentPageIndex === pagesCount - 1
        });
        $$renderer2.push(`<!----></div>`);
      });
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (dots) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<!--[-->`);
      slot($$renderer2, $$props, "dots", { currentPageIndex, pagesCount, showPage: handlePageChange }, () => {
        Dots($$renderer2, { pagesCount, currentPageIndex });
      });
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, {
      timingFunction,
      arrows,
      infinite,
      initialPageIndex,
      duration,
      autoplay,
      autoplayDuration,
      autoplayDirection,
      pauseOnFocus,
      autoplayProgressVisible,
      dots,
      swiping,
      particlesToShow,
      particlesToScroll,
      goTo,
      goToPrev,
      goToNext
    });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const images = writable([]);
    let loading = true;
    const imageModules = /* @__PURE__ */ Object.assign({ "/static/club_pics/image0(1).jpeg": () => import("../../../chunks/image0(1).js"), "/static/club_pics/image0(2).jpeg": () => import("../../../chunks/image0(2).js"), "/static/club_pics/image0(3).jpeg": () => import("../../../chunks/image0(3).js"), "/static/club_pics/image0.jpeg": () => import("../../../chunks/image0.js"), "/static/club_pics/image1(1).jpeg": () => import("../../../chunks/image1(1).js"), "/static/club_pics/image1(2).jpeg": () => import("../../../chunks/image1(2).js"), "/static/club_pics/image1(3).jpeg": () => import("../../../chunks/image1(3).js"), "/static/club_pics/image1.jpeg": () => import("../../../chunks/image1.js"), "/static/club_pics/image10(1).jpeg": () => import("../../../chunks/image10(1).js"), "/static/club_pics/image10.jpeg": () => import("../../../chunks/image10.js"), "/static/club_pics/image2(1).jpeg": () => import("../../../chunks/image2(1).js"), "/static/club_pics/image2(2).jpeg": () => import("../../../chunks/image2(2).js"), "/static/club_pics/image2.jpeg": () => import("../../../chunks/image2.js"), "/static/club_pics/image3(1).jpeg": () => import("../../../chunks/image3(1).js"), "/static/club_pics/image3(2).jpeg": () => import("../../../chunks/image3(2).js"), "/static/club_pics/image3(3).jpeg": () => import("../../../chunks/image3(3).js"), "/static/club_pics/image3.jpeg": () => import("../../../chunks/image3.js"), "/static/club_pics/image3_1.jpeg": () => import("../../../chunks/image3_1.js"), "/static/club_pics/image4(1).jpeg": () => import("../../../chunks/image4(1).js"), "/static/club_pics/image4(2).jpeg": () => import("../../../chunks/image4(2).js"), "/static/club_pics/image4(3).jpeg": () => import("../../../chunks/image4(3).js"), "/static/club_pics/image4.jpeg": () => import("../../../chunks/image4.js"), "/static/club_pics/image5(1).jpeg": () => import("../../../chunks/image5(1).js"), "/static/club_pics/image5(2).jpeg": () => import("../../../chunks/image5(2).js"), "/static/club_pics/image5(3).jpeg": () => import("../../../chunks/image5(3).js"), "/static/club_pics/image5.jpeg": () => import("../../../chunks/image5.js"), "/static/club_pics/image5_1.jpeg": () => import("../../../chunks/image5_1.js"), "/static/club_pics/image6(1).jpeg": () => import("../../../chunks/image6(1).js"), "/static/club_pics/image6(2).jpeg": () => import("../../../chunks/image6(2).js"), "/static/club_pics/image6(3).jpeg": () => import("../../../chunks/image6(3).js"), "/static/club_pics/image6.jpeg": () => import("../../../chunks/image6.js"), "/static/club_pics/image7(1).jpeg": () => import("../../../chunks/image7(1).js"), "/static/club_pics/image7(2).jpeg": () => import("../../../chunks/image7(2).js"), "/static/club_pics/image7(3).jpeg": () => import("../../../chunks/image7(3).js"), "/static/club_pics/image7.jpeg": () => import("../../../chunks/image7.js"), "/static/club_pics/image8(1).jpeg": () => import("../../../chunks/image8(1).js"), "/static/club_pics/image8(2).jpeg": () => import("../../../chunks/image8(2).js"), "/static/club_pics/image8(3).jpeg": () => import("../../../chunks/image8(3).js"), "/static/club_pics/image8.jpeg": () => import("../../../chunks/image8.js"), "/static/club_pics/image9(1).jpeg": () => import("../../../chunks/image9(1).js"), "/static/club_pics/image9.jpeg": () => import("../../../chunks/image9.js") });
    async function loadImages() {
      const imagePromises = Object.entries(imageModules).map(async ([path, resolver]) => {
        const module = await resolver();
        return module.default.replace("/static/", "");
      });
      const loadedImages = await Promise.all(imagePromises);
      store_set(images, loadedImages);
      loading = false;
    }
    loadImages();
    head("16h6p05", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Gallery — Cruces Chess Club</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Photos from Cruces Chess Club meetings, tournaments, and events."/> <meta property="og:title" content="Gallery — Cruces Chess Club"/>`);
    });
    Hero($$renderer2, {
      eyebrow: "Photos",
      title: "Club",
      accent: "moments.",
      lead: "Wednesday meets, tournaments, and the occasional after-game.",
      align: "left"
    });
    $$renderer2.push(`<!----> <section class="max-w-5xl mx-auto px-6 py-16" aria-label="Photo gallery"><div class="border border-line rounded-md bg-paper-2/40 overflow-hidden">`);
    if (loading) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="aspect-[16/10] flex items-center justify-center text-mute" role="status" aria-live="polite"><span class="animate-pulse text-sm uppercase tracking-[0.22em]">Loading images…</span></div>`);
    } else if (store_get($$store_subs ??= {}, "$images", images).length > 0) {
      $$renderer2.push("<!--[1-->");
      Carousel($$renderer2, {
        autoplay: true,
        autoplayDuration: 6e3,
        pauseOnFocus: true,
        arrows: true,
        dots: true,
        children: ($$renderer3) => {
          $$renderer3.push(`<!--[-->`);
          const each_array = ensure_array_like(store_get($$store_subs ??= {}, "$images", images));
          for (let i = 0, $$length = each_array.length; i < $$length; i++) {
            let src = each_array[i];
            $$renderer3.push(`<div class="aspect-[16/10] flex items-center justify-center" aria-roledescription="slide"${attr("aria-label", `Photo ${i + 1} of ${store_get($$store_subs ??= {}, "$images", images).length}`)}><img${attr("src", src)}${attr("alt", `Cruces Chess Club photo ${i + 1}`)} class="max-h-[70vh] w-auto max-w-full object-contain"/></div>`);
          }
          $$renderer3.push(`<!--]-->`);
        },
        $$slots: { default: true }
      });
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="aspect-[16/10] flex items-center justify-center text-mute"><p>No images found</p></div>`);
    }
    $$renderer2.push(`<!--]--></div></section>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
