var z=Object.defineProperty;var W=(r,t,i)=>t in r?z(r,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):r[t]=i;var M=(r,t,i)=>(W(r,typeof t!="symbol"?t+"":t,i),i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))e(l);new MutationObserver(l=>{for(const d of l)if(d.type==="childList")for(const p of d.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&e(p)}).observe(document,{childList:!0,subtree:!0});function i(l){const d={};return l.integrity&&(d.integrity=l.integrity),l.referrerPolicy&&(d.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?d.credentials="include":l.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function e(l){if(l.ep)return;l.ep=!0;const d=i(l);fetch(l.href,d)}})();function g(r,t,i){return Math.max(r,Math.min(t,i))}class N{advance(t){var h;if(!this.isRunning)return;let i=!1;if(this.lerp)this.value=(e=this.value,l=this.to,d=60*this.lerp,p=t,function(a,o,V){return(1-V)*a+V*o}(e,l,1-Math.exp(-d*p))),Math.round(this.value)===this.to&&(this.value=this.to,i=!0);else{this.currentTime+=t;const a=g(0,this.currentTime/this.duration,1);i=a>=1;const o=i?1:this.easing(a);this.value=this.from+(this.to-this.from)*o}var e,l,d,p;(h=this.onUpdate)==null||h.call(this,this.value,i),i&&this.stop()}stop(){this.isRunning=!1}fromTo(t,i,{lerp:e=.1,duration:l=1,easing:d=a=>a,onStart:p,onUpdate:h}){this.from=this.value=t,this.to=i,this.lerp=e,this.duration=l,this.easing=d,this.currentTime=0,this.isRunning=!0,p==null||p(),this.onUpdate=h}}class P{constructor({wrapper:t,content:i,autoResize:e=!0}={}){M(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});M(this,"onWrapperResize",()=>{this.wrapper===window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});M(this,"onContentResize",()=>{this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth});if(this.wrapper=t,this.content=i,e){const l=function(d,p){let h;return function(){let a=arguments,o=this;clearTimeout(h),h=setTimeout(function(){d.apply(o,a)},p)}}(this.resize,250);this.wrapper!==window&&(this.wrapperResizeObserver=new ResizeObserver(l),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(l),this.contentResizeObserver.observe(this.content)}this.resize()}destroy(){var t,i;(t=this.wrapperResizeObserver)==null||t.disconnect(),(i=this.contentResizeObserver)==null||i.disconnect()}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}}class x{constructor(){this.events={}}emit(t,...i){let e=this.events[t]||[];for(let l=0,d=e.length;l<d;l++)e[l](...i)}on(t,i){var e;return(e=this.events[t])!=null&&e.push(i)||(this.events[t]=[i]),()=>{var l;this.events[t]=(l=this.events[t])==null?void 0:l.filter(d=>i!==d)}}off(t,i){var e;this.events[t]=(e=this.events[t])==null?void 0:e.filter(l=>i!==l)}destroy(){this.events={}}}class q{constructor(t,{wheelMultiplier:i=1,touchMultiplier:e=2,normalizeWheel:l=!1}){M(this,"onTouchStart",t=>{const{clientX:i,clientY:e}=t.targetTouches?t.targetTouches[0]:t;this.touchStart.x=i,this.touchStart.y=e,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:t})});M(this,"onTouchMove",t=>{const{clientX:i,clientY:e}=t.targetTouches?t.targetTouches[0]:t,l=-(i-this.touchStart.x)*this.touchMultiplier,d=-(e-this.touchStart.y)*this.touchMultiplier;this.touchStart.x=i,this.touchStart.y=e,this.lastDelta={x:l,y:d},this.emitter.emit("scroll",{deltaX:l,deltaY:d,event:t})});M(this,"onTouchEnd",t=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:t})});M(this,"onWheel",t=>{let{deltaX:i,deltaY:e}=t;this.normalizeWheel&&(i=g(-100,i,100),e=g(-100,e,100)),i*=this.wheelMultiplier,e*=this.wheelMultiplier,this.emitter.emit("scroll",{deltaX:i,deltaY:e,event:t})});this.element=t,this.wheelMultiplier=i,this.touchMultiplier=e,this.normalizeWheel=l,this.touchStart={x:null,y:null},this.emitter=new x,this.element.addEventListener("wheel",this.onWheel,{passive:!1}),this.element.addEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.addEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.addEventListener("touchend",this.onTouchEnd,{passive:!1})}on(t,i){return this.emitter.on(t,i)}destroy(){this.emitter.destroy(),this.element.removeEventListener("wheel",this.onWheel,{passive:!1}),this.element.removeEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.removeEventListener("touchmove",this.onTouchMove,{passive:!1}),this.element.removeEventListener("touchend",this.onTouchEnd,{passive:!1})}}class j{constructor({wrapper:t=window,content:i=document.documentElement,wheelEventsTarget:e=t,eventsTarget:l=e,smoothWheel:d=!0,syncTouch:p=!1,syncTouchLerp:h=.075,touchInertiaMultiplier:a=35,duration:o,easing:V=s=>Math.min(1,1.001-Math.pow(2,-10*s)),lerp:c=!o&&.1,infinite:L=!1,orientation:H="vertical",gestureOrientation:C="vertical",touchMultiplier:f=1,wheelMultiplier:n=1,normalizeWheel:y=!1,autoResize:w=!0}={}){this.__isSmooth=!1,this.__isScrolling=!1,this.__isStopped=!1,this.__isLocked=!1,this.onVirtualScroll=({deltaX:s,deltaY:A,event:_})=>{if(_.ctrlKey)return;const u=_.type.includes("touch"),b=_.type.includes("wheel");if(this.options.syncTouch&&u&&_.type==="touchstart")return void this.reset();const I=s===0&&A===0,O=this.options.gestureOrientation==="vertical"&&A===0||this.options.gestureOrientation==="horizontal"&&s===0;if(I||O)return;let E=_.composedPath();if(E=E.slice(0,E.indexOf(this.rootElement)),E.find(Z=>{var F,v,m,B;return((F=Z.hasAttribute)===null||F===void 0?void 0:F.call(Z,"data-lenis-prevent"))||u&&((v=Z.hasAttribute)===null||v===void 0?void 0:v.call(Z,"data-lenis-prevent-touch"))||b&&((m=Z.hasAttribute)===null||m===void 0?void 0:m.call(Z,"data-lenis-prevent-wheel"))||((B=Z.classList)===null||B===void 0?void 0:B.contains("lenis"))}))return;if(this.isStopped||this.isLocked)return void _.preventDefault();if(this.isSmooth=this.options.syncTouch&&u||this.options.smoothWheel&&b,!this.isSmooth)return this.isScrolling=!1,void this.animate.stop();_.preventDefault();let D=A;this.options.gestureOrientation==="both"?D=Math.abs(A)>Math.abs(s)?A:s:this.options.gestureOrientation==="horizontal"&&(D=s);const R=u&&this.options.syncTouch,G=u&&_.type==="touchend"&&Math.abs(D)>5;G&&(D=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+D,Object.assign({programmatic:!1},R?{lerp:G?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}))},this.onNativeScroll=()=>{if(!this.__preventNextScrollEvent&&!this.isScrolling){const s=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.velocity=0,this.direction=Math.sign(this.animatedScroll-s),this.emit()}},window.lenisVersion="1.0.37",t!==document.documentElement&&t!==document.body||(t=window),this.options={wrapper:t,content:i,wheelEventsTarget:e,eventsTarget:l,smoothWheel:d,syncTouch:p,syncTouchLerp:h,touchInertiaMultiplier:a,duration:o,easing:V,lerp:c,infinite:L,gestureOrientation:C,orientation:H,touchMultiplier:f,wheelMultiplier:n,normalizeWheel:y,autoResize:w},this.animate=new N,this.emitter=new x,this.dimensions=new P({wrapper:t,content:i,autoResize:w}),this.toggleClassName("lenis",!0),this.velocity=0,this.isLocked=!1,this.isStopped=!1,this.isSmooth=p||d,this.isScrolling=!1,this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,{passive:!1}),this.virtualScroll=new q(l,{touchMultiplier:f,wheelMultiplier:n,normalizeWheel:y}),this.virtualScroll.on("scroll",this.onVirtualScroll)}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,{passive:!1}),this.virtualScroll.destroy(),this.dimensions.destroy(),this.toggleClassName("lenis",!1),this.toggleClassName("lenis-smooth",!1),this.toggleClassName("lenis-scrolling",!1),this.toggleClassName("lenis-stopped",!1),this.toggleClassName("lenis-locked",!1)}on(t,i){return this.emitter.on(t,i)}off(t,i){return this.emitter.off(t,i)}setScroll(t){this.isHorizontal?this.rootElement.scrollLeft=t:this.rootElement.scrollTop=t}resize(){this.dimensions.resize()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.velocity=0,this.animate.stop()}start(){this.isStopped=!1,this.reset()}stop(){this.isStopped=!0,this.animate.stop(),this.reset()}raf(t){const i=t-(this.time||t);this.time=t,this.animate.advance(.001*i)}scrollTo(t,{offset:i=0,immediate:e=!1,lock:l=!1,duration:d=this.options.duration,easing:p=this.options.easing,lerp:h=!d&&this.options.lerp,onComplete:a,force:o=!1,programmatic:V=!0}={}){if(!this.isStopped&&!this.isLocked||o){if(["top","left","start"].includes(t))t=0;else if(["bottom","right","end"].includes(t))t=this.limit;else{let c;if(typeof t=="string"?c=document.querySelector(t):t!=null&&t.nodeType&&(c=t),c){if(this.options.wrapper!==window){const H=this.options.wrapper.getBoundingClientRect();i-=this.isHorizontal?H.left:H.top}const L=c.getBoundingClientRect();t=(this.isHorizontal?L.left:L.top)+this.animatedScroll}}if(typeof t=="number"){if(t+=i,t=Math.round(t),this.options.infinite?V&&(this.targetScroll=this.animatedScroll=this.scroll):t=g(0,t,this.limit),e)return this.animatedScroll=this.targetScroll=t,this.setScroll(this.scroll),this.reset(),void(a==null||a(this));if(!V){if(t===this.targetScroll)return;this.targetScroll=t}this.animate.fromTo(this.animatedScroll,t,{duration:d,easing:p,lerp:h,onStart:()=>{l&&(this.isLocked=!0),this.isScrolling=!0},onUpdate:(c,L)=>{this.isScrolling=!0,this.velocity=c-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=c,this.setScroll(this.scroll),V&&(this.targetScroll=c),L||this.emit(),L&&(this.reset(),this.emit(),a==null||a(this),this.__preventNextScrollEvent=!0,requestAnimationFrame(()=>{delete this.__preventNextScrollEvent}))}})}}}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){return this.isHorizontal?this.rootElement.scrollLeft:this.rootElement.scrollTop}get scroll(){return this.options.infinite?(t=this.animatedScroll,i=this.limit,(t%i+i)%i):this.animatedScroll;var t,i}get progress(){return this.limit===0?1:this.scroll/this.limit}get isSmooth(){return this.__isSmooth}set isSmooth(t){this.__isSmooth!==t&&(this.__isSmooth=t,this.toggleClassName("lenis-smooth",t))}get isScrolling(){return this.__isScrolling}set isScrolling(t){this.__isScrolling!==t&&(this.__isScrolling=t,this.toggleClassName("lenis-scrolling",t))}get isStopped(){return this.__isStopped}set isStopped(t){this.__isStopped!==t&&(this.__isStopped=t,this.toggleClassName("lenis-stopped",t))}get isLocked(){return this.__isLocked}set isLocked(t){this.__isLocked!==t&&(this.__isLocked=t,this.toggleClassName("lenis-locked",t))}get className(){let t="lenis";return this.isStopped&&(t+=" lenis-stopped"),this.isLocked&&(t+=" lenis-locked"),this.isScrolling&&(t+=" lenis-scrolling"),this.isSmooth&&(t+=" lenis-smooth"),t}toggleClassName(t,i){this.rootElement.classList.toggle(t,i),this.emitter.emit("className change",this)}}const S=new j;S.on("scroll",r=>{});function k(r){S.raf(r),requestAnimationFrame(k)}requestAnimationFrame(k);window.onload=()=>{console.log("Page loaded"),setTimeout(()=>{document.querySelector(".loadingCover").classList.remove("active")},100),setTimeout(()=>{const r=document.querySelector(".submitBtn");console.log(r),document.querySelector(".form").addEventListener("submit",t=>{t.preventDefault();const i=new FormData(t.target),e=Object.fromEntries(i);fetch("https://formspree.io/f/mjvnbenz",{method:"POST",mode:"no-cors",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams(e).toString()}).then(l=>l.text()).then(l=>{t.target.reset(),r.classList.add("background-green"),r.textContent="Successfully Submitted",setTimeout(()=>{r.classList.remove("background-green"),r.textContent="Submit"},3e3)}).catch(l=>console.error("Error:",l))})},200),setTimeout(()=>{(function(r,t){if(!t.__SV){var i,e,l,d;window.mixpanel=t,t._i=[],t.init=function(p,h,a){function o(L,H){var C=H.split(".");C.length==2&&(L=L[C[0]],H=C[1]),L[H]=function(){L.push([H].concat(Array.prototype.slice.call(arguments,0)))}}var V=t;for(typeof a<"u"?V=t[a]=[]:a="mixpanel",V.people=V.people||[],V.toString=function(L){var H="mixpanel";return a!=="mixpanel"&&(H+="."+a),L||(H+=" (stub)"),H},V.people.toString=function(){return V.toString(1)+".people (stub)"},l="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" "),d=0;d<l.length;d++)o(V,l[d]);var c="set set_once union unset remove delete".split(" ");V.get_group=function(){function L(n){H[n]=function(){call2_args=arguments,call2=[n].concat(Array.prototype.slice.call(call2_args,0)),V.push([C,call2])}}for(var H={},C=["get_group"].concat(Array.prototype.slice.call(arguments,0)),f=0;f<c.length;f++)L(c[f]);return H},t._i.push([p,h,a])},t.__SV=1.2,i=r.createElement("script"),i.type="text/javascript",i.async=!0,i.src=typeof MIXPANEL_CUSTOM_LIB_URL<"u"?MIXPANEL_CUSTOM_LIB_URL:r.location.protocol==="file:"&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js",e=r.getElementsByTagName("script")[0],e.parentNode.insertBefore(i,e)}})(document,window.mixpanel||[]),mixpanel.init("760a2d80887c2b8c68664aa632bb9c03",{debug:!0,track_pageview:!0,persistence:"localStorage"}),mixpanel.track("Page load"),mixpanel.track_links("#nav a","click nav link",{referrer:document.referrer})},250)};function U(r,t,i={}){this.routes=t,this.errorHTML=i.errorHTML?i.errorHTML:"<div>Not Found</div>",this.container=document.getElementById(r),window.router=this;const e=(o,V,c,L={})=>{if(L.clearAnchor&&(c.innerHTML=""),this[o]=V,typeof V=="string"){const H=document.createElement("div");H.innerHTML=V,c.appendChild(H)}else if(typeof V=="function"){const H=V({params:L.params});e(o,H,c,L)}else c.appendChild(V)},l=o=>{o.querySelectorAll(".router-link").forEach(V=>{const c=V.pathname,L=V.search;V.onclick=()=>d(c,!1,L),V.href="javascript:void(null);"})},d=(o,V,c=window.location.search)=>{if(V&&typeof V=="boolean"||window.history.pushState({},o,window.location.origin+o+c),this.routes[o])p(o);else{const L=[],H=o.split("/");for(const C in this.routes){const f=C.split("/");f.length===H.length&&L.push(f)}for(let C of L){const f={};if(h(H,C,f))return p(C.join("/"),f)}e("currentView",this.errorHTML,a,{clearAnchor:!0}),i.debug&&console.log(`%cRoute not found: ${o}`,"color: red; font-size: 14px;")}};this.goTo=d;const p=(o,V)=>{e("currentView",this.routes[o],a,{clearAnchor:!0,params:V}),i.debug&&console.log(`%cNavigated to: ${o}`,"color: green; font-size: 14px;"),l(a)};function h(o,V,c){for(let L=0;L<o.length;L++){if(V[L][0]!==":"&&o[L]!==V[L])return!1;V[L][0]===":"&&(c[V[L].slice(1)]=o[L])}return!0}i.header&&e("header",i.header,this.container);const a=document.createElement("div");this.container.appendChild(a),i.footer&&e("footer",i.footer,this.container),this.goTo(window.location.pathname,!0),l(document),i.debug&&(console.log(`%cRouter Initialized with Routes: ${Object.keys(this.routes).join(", ")}`,"color: blue; font-size: 14px;"),console.log(`%cCurrent Path: ${window.location.pathname}`,"color: orange; font-size: 14px;")),window.onpopstate=()=>d(window.location.pathname,!0)}function Y(){document.querySelector("#root").innerHTML=`<div class="home-page visible" id="Home" data-page >
  <section class="first row">
    <h1 class="mainHeading text-center almost-full-width">
      Your partner for <br />
      <span style="color: #e1524c; font-size: 5rem">Success</span>
    </h1>

    <div class="train-station-wrapper">
      <svg
        width="100%"
        height="424"
        viewBox="0 0 1190 324"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Train Station" filter="url(#filter0_d_196_22)">
          <g id="Isolation_Mode" clip-path="url(#clip0_196_22)">
            <path
              id="Vector"
              d="M895.601 41.436V47.1199H899.808C901.252 47.1199 901.371 47.2369 901.373 48.6367C901.373 49.4227 901.373 50.2071 901.373 50.9931C901.373 51.6557 901.053 52.0016 900.366 51.9984H856.483C855.147 51.9984 855.002 51.8571 854.993 50.5677C854.993 49.8628 854.993 49.1597 854.993 48.4565C854.993 47.3197 855.182 47.1232 856.318 47.1216C857.775 47.1216 859.232 47.1216 860.735 47.1216V41.4376H856.651C855.088 41.4376 854.995 41.3532 854.995 39.8461C854.995 39.3313 854.995 38.8165 854.995 38.3017C854.995 37.3582 855.415 36.6615 856.18 36.1012C856.307 36.0021 856.412 35.8793 856.489 35.7398C856.566 35.6004 856.615 35.4472 856.631 35.2892C856.67 33.3128 856.642 31.3364 856.654 29.36C856.675 25.646 859.576 22.7537 863.268 22.7488C866.96 22.7439 869.875 25.6314 869.902 29.3405C869.915 31.2893 869.943 33.2381 869.884 35.1869C869.862 35.856 870.193 36.2457 870.711 36.2538C871.294 36.262 871.597 35.8349 871.577 35.1512C871.524 33.23 871.551 31.3056 871.561 29.3828C871.581 25.659 874.461 22.7618 878.148 22.7472C881.882 22.7325 884.789 25.6297 884.809 29.3941C884.819 31.3429 884.843 33.2917 884.794 35.2405C884.775 35.9193 885.158 36.2603 885.669 36.249C886.125 36.2376 886.497 35.9031 886.482 35.2535C886.428 33.2787 886.453 31.3007 886.466 29.3243C886.491 25.6232 889.413 22.7358 893.11 22.7439C896.77 22.7537 899.679 25.6265 899.71 29.2853C899.729 31.2617 899.694 33.2381 899.735 35.2145C899.764 35.5579 899.93 35.8763 900.197 36.0996C900.931 36.6501 901.356 37.3224 901.366 38.2286C901.376 38.8782 901.366 39.5278 901.366 40.1774C901.366 41.2037 901.141 41.4262 900.116 41.4295C898.638 41.4409 897.153 41.436 895.601 41.436ZM868.246 35.7033C868.246 33.4979 868.268 31.3884 868.246 29.2805C868.211 26.5034 866.023 24.3679 863.265 24.3793C860.506 24.3906 858.349 26.5408 858.323 29.3259C858.303 31.2455 858.323 33.165 858.323 35.0846C858.332 35.2917 858.352 35.4982 858.382 35.7033H868.246ZM883.05 35.7033C883.092 35.6156 883.133 35.5701 883.133 35.5231C883.141 33.4411 883.17 31.3592 883.145 29.2772C883.112 26.5018 880.918 24.3679 878.158 24.3809C875.398 24.3939 873.253 26.5408 873.226 29.3308C873.206 31.2503 873.226 33.1699 873.226 35.0895C873.226 35.2957 873.266 35.5003 873.286 35.7017L883.05 35.7033ZM888.138 35.6838H898.032C898.032 33.3567 898.123 31.0831 898.007 28.8209C897.878 26.3021 895.651 24.3809 893.088 24.3793C890.525 24.3776 888.304 26.3037 888.168 28.8144C888.052 31.0782 888.138 33.3518 888.138 35.6838ZM899.687 48.8105H856.712V50.3062H899.692L899.687 48.8105ZM865.788 47.055H875.647V41.4993H865.788V47.055ZM880.726 41.4815V47.0517H890.55V41.4815H880.726ZM869.903 39.7795V38.9675C869.903 37.4816 869.809 37.3809 868.332 37.3809H858.816C856.584 37.3809 856.558 37.4085 856.684 39.6122C856.684 39.6577 856.733 39.7016 856.778 39.7746L869.903 39.7795ZM884.804 39.7795C884.804 39.4547 884.804 39.2079 884.804 38.9675C884.804 37.4816 884.709 37.3809 883.231 37.3809H873.72C871.489 37.3809 871.46 37.4101 871.589 39.6122C871.589 39.6577 871.637 39.7016 871.683 39.7746L884.804 39.7795ZM899.704 39.7795C899.704 39.4547 899.704 39.2095 899.704 38.9675C899.704 37.4816 899.609 37.3809 898.131 37.3809H888.623C886.391 37.3809 886.365 37.4085 886.492 39.6122C886.492 39.6577 886.54 39.7016 886.587 39.7746L899.704 39.7795ZM864.044 47.0988V41.4815H862.521V47.0939L864.044 47.0988ZM877.416 41.4815V47.0826H878.956V41.4815H877.416ZM892.317 41.4815V47.0793H893.853V41.4815H892.317Z"
              fill="black"
            />
            <path
              id="Vector_2"
              d="M903.023 18.6888H866.402C865.087 18.6888 864.937 18.5394 864.937 17.2386C864.937 13.2869 864.937 9.33523 864.937 5.38353C864.937 4.25811 865.137 4.06161 866.283 4.06161H903.025C903.025 3.50945 903.025 3.03038 903.025 2.55131C903.055 1.06049 904.126 -0.0194648 905.548 0.00164698C906.935 0.0227588 907.972 1.09134 907.992 2.54806C908.007 3.62963 907.992 4.71283 907.992 5.79603V50.5449C907.992 51.8522 907.846 51.9968 906.531 52.0065C905.758 52.0065 904.987 52.0065 904.214 52.0065C903.278 52.0065 903.037 51.7629 903.02 50.8697C903.02 50.5709 903.02 50.2737 903.02 49.9765V18.6888H903.023ZM866.649 5.72619V16.9934H906.283V5.72619H866.649ZM906.272 50.3484V18.7457H904.748V50.3484H906.272ZM906.328 4.02426C906.328 3.43151 906.424 2.88747 906.293 2.41976C906.207 2.11283 905.796 1.69709 905.517 1.69384C905.237 1.69059 904.81 2.10146 904.73 2.40352C904.598 2.90209 904.694 3.45911 904.694 4.02751L906.328 4.02426Z"
              fill="black"
            />
            <path
              id="Vector_3"
              d="M868.246 35.7033H858.381C858.35 35.4982 858.33 35.2917 858.321 35.0846C858.321 33.165 858.303 31.2455 858.321 29.3259C858.348 26.5408 860.508 24.3906 863.258 24.3793C866.008 24.3679 868.205 26.5034 868.24 29.2804C868.271 31.3884 868.246 33.4979 868.246 35.7033Z"
              fill="white"
            />
            <path
              id="Vector_4"
              d="M883.05 35.7017H873.283C873.263 35.5003 873.223 35.2957 873.223 35.0895C873.223 33.1699 873.205 31.2503 873.223 29.3308C873.249 26.544 875.405 24.3923 878.155 24.3793C880.905 24.3663 883.108 26.5002 883.142 29.2756C883.166 31.3575 883.142 33.4395 883.13 35.5214C883.133 35.5685 883.092 35.614 883.05 35.7017Z"
              fill="white"
            />
            <path
              id="Vector_5"
              d="M888.138 35.6838C888.138 33.3518 888.047 31.0782 888.163 28.816C888.292 26.3037 890.527 24.3776 893.088 24.3793C895.649 24.3809 897.878 26.3021 898.007 28.8209C898.123 31.0831 898.032 33.3567 898.032 35.6838H888.138Z"
              fill="white"
            />
            <path
              id="Vector_6"
              d="M899.692 48.8105V50.3062H856.712V48.8105H899.692Z"
              fill="white"
            />
            <path
              id="Vector_7"
              d="M865.788 47.055V41.4993H875.647V47.055H865.788Z"
              fill="white"
            />
            <path
              id="Vector_8"
              d="M880.726 41.4814H890.55V47.0517H880.726V41.4814Z"
              fill="white"
            />
            <path
              id="Vector_9"
              d="M869.904 39.773H856.778C856.733 39.6951 856.687 39.6512 856.684 39.6106C856.558 37.4069 856.584 37.3793 858.816 37.3793H868.332C869.809 37.3793 869.909 37.48 869.904 38.9659V39.773Z"
              fill="white"
            />
            <path
              id="Vector_10"
              d="M884.809 39.773H871.683C871.637 39.6951 871.591 39.6512 871.589 39.6106C871.46 37.4085 871.49 37.3793 873.72 37.3793H883.236C884.714 37.3793 884.812 37.48 884.809 38.9659C884.807 39.2079 884.809 39.4434 884.809 39.773Z"
              fill="white"
            />
            <path
              id="Vector_11"
              d="M899.712 39.773H886.587C886.54 39.6951 886.494 39.6512 886.492 39.6106C886.365 37.4069 886.391 37.3793 888.623 37.3793H898.139C899.618 37.3793 899.715 37.48 899.712 38.9659C899.711 39.2079 899.712 39.4434 899.712 39.773Z"
              fill="white"
            />
            <path
              id="Vector_12"
              d="M864.044 47.0988H862.521V41.4814H864.044V47.0988Z"
              fill="white"
            />
            <path
              id="Vector_13"
              d="M877.417 41.4814H878.956V47.0826H877.417V41.4814Z"
              fill="white"
            />
            <path
              id="Vector_14"
              d="M892.322 41.4814H893.858V47.0793H892.322V41.4814Z"
              fill="white"
            />
            <path
              id="Vector_15"
              d="M866.649 5.7262H906.283V16.9934H866.649V5.7262ZM879.842 11.3289C879.842 12.3553 879.842 13.3817 879.842 14.4145C879.842 15.1242 880.188 15.449 880.903 15.4474C882.693 15.4409 884.483 15.4409 886.271 15.4474C886.944 15.4474 887.299 15.1372 887.299 14.4649V8.30021C887.299 7.63113 886.958 7.30958 886.281 7.30958C884.491 7.30958 882.701 7.30958 880.913 7.30958C880.14 7.30958 879.825 7.68148 879.84 8.41552C879.86 9.38342 879.84 10.3562 879.842 11.3289ZM871.96 12.188C873.557 12.188 874.94 12.188 876.312 12.188C876.882 12.188 877.327 11.9915 877.335 11.3842C877.344 10.7768 876.913 10.5559 876.342 10.5576C875.514 10.5576 874.687 10.5576 873.859 10.5576H872.125L872.014 10.2896C872.266 10.1202 872.507 9.93641 872.736 9.73907C873.124 9.36717 873.216 8.92707 872.806 8.52595C872.395 8.12483 871.955 8.21902 871.567 8.59578C870.842 9.29951 870.12 10.0076 869.402 10.72C869.016 11.1032 868.937 11.5319 869.332 11.9428C870.079 12.74 870.867 13.4988 871.693 14.2164C871.91 14.3983 872.504 14.3788 872.773 14.2164C873.208 13.9501 873.147 13.4726 872.811 13.0796C872.586 12.823 872.337 12.5827 871.96 12.188ZM896.805 10.564C898.792 10.564 900.768 10.564 902.75 10.564C903.345 10.564 903.836 10.3935 903.83 9.73582C903.823 9.0781 903.321 8.92382 902.732 8.92382C898.795 8.92382 894.859 8.92382 890.923 8.92382C890.34 8.92382 889.82 9.05049 889.804 9.70983C889.785 10.4228 890.325 10.5624 890.941 10.5592C892.896 10.5592 894.85 10.564 896.805 10.564ZM896.772 13.812C898.725 13.812 900.679 13.812 902.634 13.812C903.235 13.812 903.81 13.7324 903.828 13.0179C903.846 12.3033 903.298 12.175 902.682 12.1767C898.773 12.1832 894.864 12.1832 890.956 12.1767C890.343 12.1767 889.797 12.2952 889.797 13.0098C889.797 13.7243 890.381 13.8218 890.984 13.812C892.918 13.8071 894.845 13.8136 896.772 13.8136V13.812Z"
              fill="white"
            />
            <path
              id="Vector_16"
              d="M906.272 50.3484H904.748V18.7457H906.272V50.3484Z"
              fill="white"
            />
            <path
              id="Vector_17"
              d="M906.328 4.02424H904.694C904.694 3.45909 904.598 2.90206 904.73 2.40025C904.81 2.09819 905.245 1.68732 905.517 1.69057C905.788 1.69382 906.207 2.10956 906.293 2.41649C906.424 2.89394 906.328 3.43148 906.328 4.02424Z"
              fill="white"
            />
            <path
              id="Vector_18"
              d="M879.84 11.3289C879.84 10.3545 879.855 9.38015 879.84 8.40576C879.825 7.67172 880.14 7.29658 880.913 7.29983C882.701 7.30957 884.491 7.29983 886.28 7.29983C886.958 7.29983 887.299 7.62462 887.299 8.29046V14.447C887.299 15.1193 886.944 15.4295 886.27 15.4295C884.482 15.4295 882.693 15.4295 880.903 15.4295C880.188 15.4295 879.837 15.1047 879.842 14.3966C879.847 13.3865 879.842 12.3553 879.84 11.3289ZM881.569 8.96279V13.7568H885.567V8.96279H881.569Z"
              fill="black"
            />
            <path
              id="Vector_19"
              d="M871.996 13.5367C872.238 13.7777 872.397 13.9245 872.542 14.0832C872.754 14.3193 872.797 14.6109 872.517 14.7775C872.345 14.8767 871.964 14.8906 871.825 14.7775C871.295 14.3392 870.789 13.8758 870.31 13.3889C870.056 13.141 870.107 12.8761 870.355 12.6421C870.816 12.2076 871.279 11.7752 871.744 11.3447C871.993 11.1146 872.275 11.0561 872.539 11.3021C872.802 11.5481 872.743 11.8159 872.494 12.043C872.347 12.1635 872.192 12.2758 872.031 12.3792L872.102 12.5429H873.212C873.743 12.5429 874.274 12.5429 874.805 12.5429C875.175 12.5429 875.452 12.6778 875.443 13.0477C875.433 13.4177 875.152 13.5436 874.786 13.5387C873.905 13.5347 873.021 13.5367 871.996 13.5367Z"
              fill="black"
            />
            <path
              id="Vector_20"
              d="M873.59 8.74907C873.348 8.50805 873.188 8.36126 873.044 8.20256C872.831 7.96651 872.789 7.67491 873.068 7.50828C873.24 7.40909 873.622 7.39521 873.761 7.50828C874.291 7.94653 874.796 8.41 875.275 8.89685C875.529 9.14481 875.478 9.40963 875.231 9.64371C874.77 10.0781 874.307 10.5106 873.842 10.941C873.593 11.1711 873.31 11.2297 873.047 10.9837C872.784 10.7377 872.843 10.4699 873.092 10.2428C873.239 10.1222 873.393 10.01 873.555 9.90654L873.484 9.74289L872.374 9.74289C871.843 9.74289 871.311 9.74289 870.78 9.74289C870.411 9.74289 870.134 9.608 870.143 9.23804C870.153 8.86809 870.434 8.74212 870.8 8.74708C871.681 8.75105 872.565 8.74907 873.59 8.74907Z"
              fill="black"
            />
            <path
              id="Vector_21"
              d="M896.805 10.564C894.85 10.564 892.896 10.564 890.941 10.564C890.325 10.564 889.782 10.4276 889.804 9.71468C889.82 9.05534 890.34 8.92704 890.923 8.92867C894.858 8.93516 898.794 8.93516 902.732 8.92867C903.321 8.92867 903.823 9.07807 903.83 9.74066C903.836 10.4032 903.345 10.5705 902.75 10.5689C900.768 10.5591 898.787 10.564 896.805 10.564Z"
              fill="black"
            />
            <path
              id="Vector_22"
              d="M896.772 13.8136C894.845 13.8136 892.918 13.8136 890.991 13.8136C890.388 13.8136 889.818 13.7275 889.804 13.0113C889.789 12.2952 890.343 12.1766 890.962 12.1782C894.871 12.1847 898.78 12.1847 902.689 12.1782C903.305 12.1782 903.848 12.3065 903.835 13.0195C903.821 13.7324 903.242 13.8168 902.641 13.8136C900.679 13.8071 898.734 13.8136 896.772 13.8136Z"
              fill="black"
            />
            <path
              id="Vector_23"
              d="M881.569 8.96277H885.567V13.7568H881.569V8.96277Z"
              fill="white"
            />
          </g>
          <path
            id="Vector_24"
            d="M845.276 42.1684V47.9972H849.448C850.88 47.9972 850.998 48.1171 851 49.5527C851 50.3587 851 51.1631 851 51.9691C851 52.6486 850.683 53.0033 850.002 53H806.478C805.153 53 805.008 52.8551 805 51.5328C805 50.81 805 50.0889 805 49.3678C805 48.202 805.187 48.0005 806.314 47.9989C807.759 47.9989 809.204 47.9989 810.695 47.9989V42.1701H806.644C805.094 42.1701 805.002 42.0835 805.002 40.538C805.002 40.0101 805.002 39.4822 805.002 38.9543C805.002 37.9867 805.419 37.2722 806.177 36.6977C806.303 36.5961 806.407 36.4701 806.484 36.3271C806.56 36.1841 806.608 36.027 806.624 35.865C806.663 33.8382 806.635 31.8115 806.647 29.7847C806.668 25.976 809.545 23.01 813.207 23.005C816.869 23 819.76 25.961 819.787 29.7647C819.8 31.7632 819.828 33.7616 819.768 35.7601C819.747 36.4462 820.076 36.8459 820.589 36.8542C821.167 36.8625 821.468 36.4246 821.448 35.7234C821.396 33.7533 821.422 31.7798 821.432 29.808C821.452 25.9894 824.309 23.0183 827.966 23.0034C831.668 22.9884 834.552 25.9594 834.571 29.8197C834.581 31.8181 834.606 33.8166 834.557 35.815C834.539 36.5112 834.918 36.8609 835.425 36.8492C835.877 36.8376 836.246 36.4945 836.232 35.8284C836.177 33.8033 836.202 31.7748 836.215 29.7481C836.24 25.9527 839.138 22.9917 842.805 23C846.435 23.01 849.32 25.956 849.351 29.7081C849.369 31.7349 849.335 33.7616 849.376 35.7884C849.404 36.1406 849.569 36.467 849.834 36.696C850.562 37.2606 850.984 37.95 850.993 38.8793C851.003 39.5455 850.993 40.2116 850.993 40.8778C850.993 41.9303 850.77 42.1584 849.754 42.1618C848.287 42.1734 846.814 42.1684 845.276 42.1684ZM818.145 36.2897C818.145 34.0281 818.166 31.8648 818.145 29.7031C818.11 26.8553 815.939 24.6654 813.204 24.677C810.468 24.6887 808.328 26.8937 808.302 29.7498C808.282 31.7182 808.302 33.6867 808.302 35.6552C808.311 35.8675 808.331 36.0793 808.361 36.2897H818.145ZM832.828 36.2897C832.869 36.1997 832.91 36.1531 832.91 36.1048C832.918 33.9698 832.946 31.8348 832.921 29.6998C832.888 26.8537 830.713 24.6654 827.975 24.6787C825.238 24.692 823.11 26.8937 823.084 29.7548C823.064 31.7232 823.084 33.6917 823.084 35.6602C823.084 35.8717 823.123 36.0815 823.143 36.288L832.828 36.2897ZM837.874 36.2697H847.686C847.686 33.8832 847.777 31.5517 847.662 29.2318C847.534 26.6488 845.325 24.6787 842.783 24.677C840.241 24.6754 838.038 26.6505 837.903 29.2252C837.788 31.5467 837.874 33.8782 837.874 36.2697ZM849.328 49.7309H806.704V51.2647H849.333L849.328 49.7309ZM815.706 47.9306H825.484V42.2334H815.706V47.9306ZM830.522 42.215V47.9273H840.266V42.215H830.522ZM819.788 40.4697V39.6371C819.788 38.1132 819.695 38.01 818.23 38.01H808.791C806.578 38.01 806.552 38.0383 806.677 40.2982C806.677 40.3448 806.726 40.3898 806.77 40.4647L819.788 40.4697ZM834.566 40.4697C834.566 40.1367 834.566 39.8835 834.566 39.6371C834.566 38.1132 834.473 38.01 833.007 38.01H823.573C821.361 38.01 821.332 38.04 821.46 40.2982C821.46 40.3448 821.507 40.3898 821.553 40.4647L834.566 40.4697ZM849.345 40.4697C849.345 40.1367 849.345 39.8852 849.345 39.6371C849.345 38.1132 849.251 38.01 847.785 38.01H838.355C836.141 38.01 836.115 38.0383 836.241 40.2982C836.241 40.3448 836.289 40.3898 836.335 40.4647L849.345 40.4697ZM813.977 47.9756V42.215H812.466V47.9706L813.977 47.9756ZM827.24 42.215V47.9589H828.767V42.215H827.24ZM842.018 42.215V47.9556H843.542V42.215H842.018Z"
            fill="black"
          />
          <path
            id="Vector_25"
            d="M369.276 44.1684V49.9972H373.448C374.88 49.9972 374.998 50.1171 375 51.5527C375 52.3587 375 53.1631 375 53.9691C375 54.6486 374.683 55.0033 374.002 55H330.478C329.153 55 329.008 54.8551 329 53.5328C329 52.81 329 52.0889 329 51.3678C329 50.202 329.187 50.0005 330.314 49.9989C331.759 49.9989 333.204 49.9989 334.695 49.9989V44.1701H330.644C329.094 44.1701 329.002 44.0835 329.002 42.538C329.002 42.0101 329.002 41.4822 329.002 40.9543C329.002 39.9867 329.419 39.2722 330.177 38.6977C330.303 38.5961 330.407 38.4701 330.484 38.3271C330.56 38.1841 330.608 38.027 330.624 37.865C330.663 35.8382 330.635 33.8115 330.647 31.7847C330.668 27.976 333.545 25.01 337.207 25.005C340.869 25 343.76 27.961 343.787 31.7647C343.8 33.7632 343.828 35.7616 343.768 37.7601C343.747 38.4462 344.076 38.8459 344.589 38.8542C345.167 38.8625 345.468 38.4246 345.448 37.7234C345.396 35.7533 345.422 33.7798 345.432 31.808C345.452 27.9894 348.309 25.0183 351.966 25.0034C355.668 24.9884 358.552 27.9594 358.571 31.8197C358.581 33.8181 358.606 35.8166 358.557 37.815C358.539 38.5112 358.918 38.8609 359.425 38.8492C359.877 38.8376 360.246 38.4945 360.232 37.8284C360.177 35.8033 360.202 33.7748 360.215 31.7481C360.24 27.9527 363.138 24.9917 366.805 25C370.435 25.01 373.32 27.956 373.351 31.7081C373.369 33.7349 373.335 35.7616 373.376 37.7884C373.404 38.1406 373.569 38.467 373.834 38.696C374.562 39.2606 374.984 39.95 374.993 40.8793C375.003 41.5455 374.993 42.2116 374.993 42.8778C374.993 43.9303 374.77 44.1584 373.754 44.1618C372.287 44.1734 370.814 44.1684 369.276 44.1684ZM342.145 38.2897C342.145 36.0281 342.166 33.8648 342.145 31.7031C342.11 28.8553 339.939 26.6654 337.204 26.677C334.468 26.6887 332.328 28.8937 332.302 31.7498C332.282 33.7182 332.302 35.6867 332.302 37.6552C332.311 37.8675 332.331 38.0793 332.361 38.2897H342.145ZM356.828 38.2897C356.869 38.1997 356.91 38.1531 356.91 38.1048C356.918 35.9698 356.946 33.8348 356.921 31.6998C356.888 28.8537 354.713 26.6654 351.975 26.6787C349.238 26.692 347.11 28.8937 347.084 31.7548C347.064 33.7232 347.084 35.6917 347.084 37.6602C347.084 37.8717 347.123 38.0815 347.143 38.288L356.828 38.2897ZM361.874 38.2697H371.686C371.686 35.8832 371.777 33.5517 371.662 31.2318C371.534 28.6488 369.325 26.6787 366.783 26.677C364.241 26.6754 362.038 28.6505 361.903 31.2252C361.788 33.5467 361.874 35.8782 361.874 38.2697ZM373.328 51.7309H330.704V53.2647H373.333L373.328 51.7309ZM339.706 49.9306H349.484V44.2334H339.706V49.9306ZM354.522 44.215V49.9273H364.266V44.215H354.522ZM343.788 42.4697V41.6371C343.788 40.1132 343.695 40.01 342.23 40.01H332.791C330.578 40.01 330.552 40.0383 330.677 42.2982C330.677 42.3448 330.726 42.3898 330.77 42.4647L343.788 42.4697ZM358.566 42.4697C358.566 42.1367 358.566 41.8835 358.566 41.6371C358.566 40.1132 358.473 40.01 357.007 40.01H347.573C345.361 40.01 345.332 40.04 345.46 42.2982C345.46 42.3448 345.507 42.3898 345.553 42.4647L358.566 42.4697ZM373.345 42.4697C373.345 42.1367 373.345 41.8852 373.345 41.6371C373.345 40.1132 373.251 40.01 371.785 40.01H362.355C360.141 40.01 360.115 40.0383 360.241 42.2982C360.241 42.3448 360.289 42.3898 360.335 42.4647L373.345 42.4697ZM337.977 49.9756V44.215H336.466V49.9706L337.977 49.9756ZM351.24 44.215V49.9589H352.767V44.215H351.24ZM366.018 44.215V49.9556H367.542V44.215H366.018Z"
            fill="black"
          />
          <path
            id="Vector_26"
            d="M315.276 44.1684V49.9972H319.448C320.88 49.9972 320.998 50.1171 321 51.5527C321 52.3587 321 53.1631 321 53.9691C321 54.6486 320.683 55.0033 320.002 55H276.478C275.153 55 275.008 54.8551 275 53.5328C275 52.81 275 52.0889 275 51.3678C275 50.202 275.187 50.0005 276.314 49.9989C277.759 49.9989 279.204 49.9989 280.695 49.9989V44.1701H276.644C275.094 44.1701 275.002 44.0835 275.002 42.538C275.002 42.0101 275.002 41.4822 275.002 40.9543C275.002 39.9867 275.419 39.2722 276.177 38.6977C276.303 38.5961 276.407 38.4701 276.484 38.3271C276.56 38.1841 276.608 38.027 276.624 37.865C276.663 35.8382 276.635 33.8115 276.647 31.7847C276.668 27.976 279.545 25.01 283.207 25.005C286.869 25 289.76 27.961 289.787 31.7647C289.8 33.7632 289.828 35.7616 289.768 37.7601C289.747 38.4462 290.076 38.8459 290.589 38.8542C291.167 38.8625 291.468 38.4246 291.448 37.7234C291.396 35.7533 291.422 33.7798 291.432 31.808C291.452 27.9894 294.309 25.0183 297.966 25.0034C301.668 24.9884 304.552 27.9594 304.571 31.8197C304.581 33.8181 304.606 35.8166 304.557 37.815C304.539 38.5112 304.918 38.8609 305.425 38.8492C305.877 38.8376 306.246 38.4945 306.232 37.8284C306.177 35.8033 306.202 33.7748 306.215 31.7481C306.24 27.9527 309.138 24.9917 312.805 25C316.435 25.01 319.32 27.956 319.351 31.7081C319.369 33.7349 319.335 35.7616 319.376 37.7884C319.404 38.1406 319.569 38.467 319.834 38.696C320.562 39.2606 320.984 39.95 320.993 40.8793C321.003 41.5455 320.993 42.2116 320.993 42.8778C320.993 43.9303 320.77 44.1584 319.754 44.1618C318.287 44.1734 316.814 44.1684 315.276 44.1684ZM288.145 38.2897C288.145 36.0281 288.166 33.8648 288.145 31.7031C288.11 28.8553 285.939 26.6654 283.204 26.677C280.468 26.6887 278.328 28.8937 278.302 31.7498C278.282 33.7182 278.302 35.6867 278.302 37.6552C278.311 37.8675 278.331 38.0793 278.361 38.2897H288.145ZM302.828 38.2897C302.869 38.1997 302.91 38.1531 302.91 38.1048C302.918 35.9698 302.946 33.8348 302.921 31.6998C302.888 28.8537 300.713 26.6654 297.975 26.6787C295.238 26.692 293.11 28.8937 293.084 31.7548C293.064 33.7232 293.084 35.6917 293.084 37.6602C293.084 37.8717 293.123 38.0815 293.143 38.288L302.828 38.2897ZM307.874 38.2697H317.686C317.686 35.8832 317.777 33.5517 317.662 31.2318C317.534 28.6488 315.325 26.6787 312.783 26.677C310.241 26.6754 308.038 28.6505 307.903 31.2252C307.788 33.5467 307.874 35.8782 307.874 38.2697ZM319.328 51.7309H276.704V53.2647H319.333L319.328 51.7309ZM285.706 49.9306H295.484V44.2334H285.706V49.9306ZM300.522 44.215V49.9273H310.266V44.215H300.522ZM289.788 42.4697V41.6371C289.788 40.1132 289.695 40.01 288.23 40.01H278.791C276.578 40.01 276.552 40.0383 276.677 42.2982C276.677 42.3448 276.726 42.3898 276.77 42.4647L289.788 42.4697ZM304.566 42.4697C304.566 42.1367 304.566 41.8835 304.566 41.6371C304.566 40.1132 304.473 40.01 303.007 40.01H293.573C291.361 40.01 291.332 40.04 291.46 42.2982C291.46 42.3448 291.507 42.3898 291.553 42.4647L304.566 42.4697ZM319.345 42.4697C319.345 42.1367 319.345 41.8852 319.345 41.6371C319.345 40.1132 319.251 40.01 317.785 40.01H308.355C306.141 40.01 306.115 40.0383 306.241 42.2982C306.241 42.3448 306.289 42.3898 306.335 42.4647L319.345 42.4697ZM283.977 49.9756V44.215H282.466V49.9706L283.977 49.9756ZM297.24 44.215V49.9589H298.767V44.215H297.24ZM312.018 44.215V49.9556H313.542V44.215H312.018Z"
            fill="black"
          />
          <g id="Rail way tracks">
            <g id="Group">
              <g id="Group_2">
                <g id="Group_3">
                  <path
                    id="Vector_27"
                    d="M915.502 244.177L916.138 252.273V259.315L915.893 265.232V281.202L916.138 287.12V294.162L915.502 302.258H910.527L909.891 294.162V287.12L910.136 281.202V265.232L909.891 259.315V252.273L910.527 244.177H915.502Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_28"
                    d="M909.891 287.881V293.399H916.138V287.881H909.891Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_29"
                    d="M909.891 253.035V258.552H916.138V253.035H909.891Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_30"
                    d="M909.891 258.552V259.314H916.138V258.552H909.891Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_31"
                    d="M909.891 252.272V253.035H916.138V252.272H909.891Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_32"
                    d="M909.891 293.399V294.161H916.138V293.399H909.891Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_33"
                    d="M909.891 287.119V287.881H916.138V287.119H909.891Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_34"
                    d="M914.684 253.295H911.345V258.29H914.684V253.295Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_35"
                    d="M914.684 288.144H911.345V293.139H914.684V288.144Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_36"
                    d="M910.136 281.202L909.891 287.12H916.138L915.893 281.202H910.136Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_37"
                    d="M910.136 265.232L909.891 259.315H916.138L915.893 265.232H910.136Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_38"
                    d="M915.583 301.223L916.138 294.162H909.891L910.444 301.223H915.583Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_39"
                    d="M915.583 245.211L916.138 252.273H909.891L910.444 245.211H915.583Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_4">
                  <path
                    id="Vector_40"
                    d="M932.927 244.177L933.562 252.273V259.315L933.317 265.232V281.202L933.562 287.12V294.162L932.927 302.258H927.951L927.316 294.162V287.12L927.56 281.202V265.232L927.316 259.315V252.273L927.951 244.177H932.927Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_41"
                    d="M927.316 287.881V293.399H933.562V287.881H927.316Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_42"
                    d="M927.316 253.035V258.552H933.562V253.035H927.316Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_43"
                    d="M927.316 258.552V259.314H933.562V258.552H927.316Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_44"
                    d="M927.316 252.273V253.035H933.562V252.273H927.316Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_45"
                    d="M927.316 293.399V294.161H933.562V293.399H927.316Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_46"
                    d="M927.316 287.119V287.881H933.562V287.119H927.316Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_47"
                    d="M932.108 253.295H928.77V258.29H932.108V253.295Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_48"
                    d="M932.108 288.144H928.77V293.139H932.108V288.144Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_49"
                    d="M927.56 281.202L927.316 287.12H933.562L933.317 281.202H927.56Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_50"
                    d="M927.56 265.232L927.316 259.315H933.562L933.317 265.232H927.56Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_51"
                    d="M933.008 301.223L933.562 294.162H927.316L927.868 301.223H933.008Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_52"
                    d="M933.008 245.211L933.562 252.273H927.316L927.868 245.211H933.008Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_5">
                  <path
                    id="Vector_53"
                    d="M950.351 244.177L950.986 252.273V259.315L950.742 265.232V281.202L950.986 287.12V294.162L950.351 302.258H945.375L944.74 294.162V287.12L944.985 281.202V265.232L944.74 259.315V252.273L945.375 244.177H950.351Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_54"
                    d="M944.74 287.881V293.399H950.987V287.881H944.74Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_55"
                    d="M944.74 253.035V258.552H950.987V253.035H944.74Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_56"
                    d="M944.74 258.552V259.314H950.987V258.552H944.74Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_57"
                    d="M944.74 252.273V253.035H950.986V252.273H944.74Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_58"
                    d="M944.74 293.399V294.161H950.987V293.399H944.74Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_59"
                    d="M944.74 287.119V287.881H950.987V287.119H944.74Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_60"
                    d="M949.533 253.295H946.194V258.29H949.533V253.295Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_61"
                    d="M949.533 288.144H946.194V293.139H949.533V288.144Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_62"
                    d="M944.985 281.202L944.74 287.12H950.987L950.742 281.202H944.985Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_63"
                    d="M944.985 265.232L944.74 259.315H950.987L950.742 265.232H944.985Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_64"
                    d="M950.432 301.223L950.987 294.162H944.74L945.295 301.223H950.432Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_65"
                    d="M950.432 245.211L950.987 252.273H944.74L945.295 245.211H950.432Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_6">
                  <path
                    id="Vector_66"
                    d="M967.775 244.177L968.411 252.273V259.315L968.166 265.232V281.202L968.411 287.12V294.162L967.775 302.258H962.8L962.164 294.162V287.12L962.409 281.202V265.232L962.164 259.315V252.273L962.8 244.177H967.775Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_67"
                    d="M962.164 287.881V293.399H968.411V287.881H962.164Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_68"
                    d="M962.164 253.035V258.552H968.411V253.035H962.164Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_69"
                    d="M962.164 258.552V259.314H968.411V258.552H962.164Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_70"
                    d="M962.164 252.272V253.035H968.411V252.272H962.164Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_71"
                    d="M962.164 293.399V294.161H968.411V293.399H962.164Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_72"
                    d="M962.164 287.119V287.881H968.411V287.119H962.164Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_73"
                    d="M966.957 253.295H963.618V258.29H966.957V253.295Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_74"
                    d="M966.957 288.144H963.618V293.139H966.957V288.144Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_75"
                    d="M962.409 281.202L962.164 287.12H968.411L968.166 281.202H962.409Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_76"
                    d="M962.409 265.232L962.164 259.315H968.411L968.166 265.232H962.409Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_77"
                    d="M967.856 301.223L968.411 294.162H962.164L962.717 301.223H967.856Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_78"
                    d="M967.856 245.211L968.411 252.273H962.164L962.717 245.211H967.856Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_7">
                  <path
                    id="Vector_79"
                    d="M985.2 244.177L985.835 252.273V259.315L985.59 265.232V281.202L985.835 287.12V294.162L985.2 302.258H980.224L979.589 294.162V287.12L979.833 281.202V265.232L979.589 259.315V252.273L980.224 244.177H985.2Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_80"
                    d="M979.589 287.881V293.399H985.835V287.881H979.589Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_81"
                    d="M979.589 253.035V258.552H985.835V253.035H979.589Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_82"
                    d="M979.589 258.552V259.314H985.835V258.552H979.589Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_83"
                    d="M979.589 252.272V253.035H985.835V252.272H979.589Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_84"
                    d="M979.589 293.399V294.161H985.835V293.399H979.589Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_85"
                    d="M979.589 287.119V287.881H985.835V287.119H979.589Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_86"
                    d="M984.381 253.295H981.042V258.29H984.381V253.295Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_87"
                    d="M984.381 288.144H981.042V293.139H984.381V288.144Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_88"
                    d="M979.833 281.202L979.589 287.12H985.835L985.591 281.202H979.833Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_89"
                    d="M979.833 265.232L979.589 259.315H985.835L985.591 265.232H979.833Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_90"
                    d="M985.281 301.223L985.835 294.162H979.589L980.142 301.223H985.281Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_91"
                    d="M985.281 245.211L985.835 252.273H979.589L980.142 245.211H985.281Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_8">
                  <path
                    id="Vector_92"
                    d="M1002.62 244.177L1003.26 252.273V259.315L1003.01 265.232V281.202L1003.26 287.12V294.162L1002.62 302.258H997.648L997.013 294.162V287.12L997.258 281.202V265.232L997.013 259.315V252.273L997.648 244.177H1002.62Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_93"
                    d="M997.013 287.881V293.399H1003.26V287.881H997.013Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_94"
                    d="M997.013 253.035V258.552H1003.26V253.035H997.013Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_95"
                    d="M997.013 258.552V259.314H1003.26V258.552H997.013Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_96"
                    d="M997.013 252.272V253.035H1003.26V252.272H997.013Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_97"
                    d="M997.013 293.399V294.161H1003.26V293.399H997.013Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_98"
                    d="M997.013 287.119V287.881H1003.26V287.119H997.013Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_99"
                    d="M1001.81 253.295H998.467V258.29H1001.81V253.295Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_100"
                    d="M1001.81 288.144H998.467V293.139H1001.81V288.144Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_101"
                    d="M997.258 281.202L997.013 287.12H1003.26L1003.02 281.202H997.258Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_102"
                    d="M997.258 265.232L997.013 259.315H1003.26L1003.02 265.232H997.258Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_103"
                    d="M1002.71 301.223L1003.26 294.162H997.013L997.566 301.223H1002.71Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_104"
                    d="M1002.71 245.211L1003.26 252.273H997.013L997.566 245.211H1002.71Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_9">
                  <path
                    id="Vector_105"
                    d="M1020.05 244.177L1020.68 252.273V259.315L1020.44 265.232V281.202L1020.68 287.12V294.162L1020.05 302.258H1015.07L1014.44 294.162V287.12L1014.68 281.202V265.232L1014.44 259.315V252.273L1015.07 244.177H1020.05Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_106"
                    d="M1014.44 287.881V293.399H1020.68V287.881H1014.44Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_107"
                    d="M1014.44 253.035V258.552H1020.68V253.035H1014.44Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_108"
                    d="M1014.44 258.552V259.314H1020.68V258.552H1014.44Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_109"
                    d="M1014.44 252.273V253.035H1020.68V252.273H1014.44Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_110"
                    d="M1014.44 293.399V294.161H1020.68V293.399H1014.44Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_111"
                    d="M1014.44 287.119V287.881H1020.68V287.119H1014.44Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_112"
                    d="M1019.23 253.295H1015.89V258.29H1019.23V253.295Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_113"
                    d="M1019.23 288.144H1015.89V293.139H1019.23V288.144Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_114"
                    d="M1014.68 281.202L1014.44 287.12H1020.68L1020.44 281.202H1014.68Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_115"
                    d="M1014.68 265.232L1014.44 259.315H1020.68L1020.44 265.232H1014.68Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_116"
                    d="M1020.13 301.223L1020.68 294.162H1014.44L1014.99 301.223H1020.13Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_117"
                    d="M1020.13 245.211L1020.68 252.273H1014.44L1014.99 245.211H1020.13Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_10">
                  <path
                    id="Vector_118"
                    d="M1037.47 244.177L1038.11 252.273V259.315L1037.86 265.232V281.202L1038.11 287.12V294.162L1037.47 302.258H1032.5L1031.86 294.162V287.12L1032.11 281.202V265.232L1031.86 259.315V252.273L1032.5 244.177H1037.47Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_119"
                    d="M1031.86 287.881V293.399H1038.11V287.881H1031.86Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_120"
                    d="M1031.86 253.035V258.552H1038.11V253.035H1031.86Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_121"
                    d="M1031.86 258.552V259.314H1038.11V258.552H1031.86Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_122"
                    d="M1031.86 252.273V253.035H1038.11V252.273H1031.86Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_123"
                    d="M1031.86 293.399V294.161H1038.11V293.399H1031.86Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_124"
                    d="M1031.86 287.119V287.881H1038.11V287.119H1031.86Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_125"
                    d="M1036.65 253.295H1033.32V258.29H1036.65V253.295Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_126"
                    d="M1036.65 288.144H1033.32V293.139H1036.65V288.144Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_127"
                    d="M1032.11 281.202L1031.86 287.12H1038.11L1037.86 281.202H1032.11Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_128"
                    d="M1032.11 265.232L1031.86 259.315H1038.11L1037.86 265.232H1032.11Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_129"
                    d="M1037.55 301.223L1038.11 294.162H1031.86L1032.42 301.223H1037.55Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_130"
                    d="M1037.55 245.211L1038.11 252.273H1031.86L1032.42 245.211H1037.55Z"
                    fill="#90A4AE"
                  />
                </g>
              </g>
              <g id="Group_11">
                <path
                  id="Vector_131"
                  d="M1043.7 254.05H904.302V257.535H1043.7V254.05Z"
                  fill="#455A64"
                />
                <path
                  id="Vector_132"
                  d="M1043.7 288.899H904.302V292.384H1043.7V288.899Z"
                  fill="#455A64"
                />
                <path
                  id="Vector_133"
                  d="M1043.7 289.533H904.302V291.749H1043.7V289.533Z"
                  fill="#526873"
                />
                <path
                  id="Vector_134"
                  d="M1043.7 254.686H904.302V256.902H1043.7V254.686Z"
                  fill="#526873"
                />
              </g>
            </g>
            <g id="Group_12">
              <g id="Group_13">
                <g id="Group_14">
                  <path
                    id="Vector_135"
                    d="M1057.2 130.611L1057.84 138.707V145.749L1057.59 151.666V167.637L1057.84 173.554V180.596L1057.2 188.692H1052.23L1051.59 180.596V173.554L1051.83 167.637V151.666L1051.59 145.749V138.707L1052.23 130.611H1057.2Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_136"
                    d="M1051.59 174.316V179.833H1057.84V174.316H1051.59Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_137"
                    d="M1051.59 139.469V144.986H1057.84V139.469H1051.59Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_138"
                    d="M1051.59 144.987V145.749H1057.84V144.987H1051.59Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_139"
                    d="M1051.59 138.707V139.469H1057.84V138.707H1051.59Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_140"
                    d="M1051.59 179.833V180.595H1057.84V179.833H1051.59Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_141"
                    d="M1051.59 173.554V174.316H1057.84V173.554H1051.59Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_142"
                    d="M1056.38 139.73H1053.04V144.725H1056.38V139.73Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_143"
                    d="M1056.38 174.578H1053.04V179.573H1056.38V174.578Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_144"
                    d="M1051.83 167.637L1051.59 173.554H1057.84L1057.59 167.637H1051.83Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_145"
                    d="M1051.83 151.666L1051.59 145.749H1057.84L1057.59 151.666H1051.83Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_146"
                    d="M1057.28 187.657L1057.84 180.596H1051.59L1052.14 187.657H1057.28Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_147"
                    d="M1057.28 131.646L1057.84 138.707H1051.59L1052.14 131.646H1057.28Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_15">
                  <path
                    id="Vector_148"
                    d="M1074.63 130.611L1075.26 138.707V145.749L1075.02 151.666V167.637L1075.26 173.554V180.596L1074.63 188.692H1069.65L1069.01 180.596V173.554L1069.26 167.637V151.666L1069.01 145.749V138.707L1069.65 130.611H1074.63Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_149"
                    d="M1069.01 174.316V179.833H1075.26V174.316H1069.01Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_150"
                    d="M1069.01 139.469V144.987H1075.26V139.469H1069.01Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_151"
                    d="M1069.01 144.987V145.749H1075.26V144.987H1069.01Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_152"
                    d="M1069.01 138.707V139.469H1075.26V138.707H1069.01Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_153"
                    d="M1069.01 179.833V180.595H1075.26V179.833H1069.01Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_154"
                    d="M1069.01 173.554V174.316H1075.26V173.554H1069.01Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_155"
                    d="M1073.81 139.73H1070.47V144.725H1073.81V139.73Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_156"
                    d="M1073.81 174.578H1070.47V179.573H1073.81V174.578Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_157"
                    d="M1069.26 167.637L1069.01 173.554H1075.26L1075.02 167.637H1069.26Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_158"
                    d="M1069.26 151.666L1069.01 145.749H1075.26L1075.02 151.666H1069.26Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_159"
                    d="M1074.71 187.657L1075.26 180.596H1069.01L1069.57 187.657H1074.71Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_160"
                    d="M1074.71 131.646L1075.26 138.707H1069.01L1069.57 131.646H1074.71Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_16">
                  <path
                    id="Vector_161"
                    d="M1092.05 130.611L1092.69 138.707V145.749L1092.44 151.666V167.637L1092.69 173.554V180.596L1092.05 188.692H1087.07L1086.44 180.596V173.554L1086.68 167.637V151.666L1086.44 145.749V138.707L1087.07 130.611H1092.05Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_162"
                    d="M1086.44 174.316V179.833H1092.69V174.316H1086.44Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_163"
                    d="M1086.44 139.469V144.987H1092.69V139.469H1086.44Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_164"
                    d="M1086.44 144.987V145.749H1092.69V144.987H1086.44Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_165"
                    d="M1086.44 138.707V139.469H1092.68V138.707H1086.44Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_166"
                    d="M1086.44 179.833V180.595H1092.69V179.833H1086.44Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_167"
                    d="M1086.44 173.554V174.316H1092.69V173.554H1086.44Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_168"
                    d="M1091.23 139.73H1087.89V144.725H1091.23V139.73Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_169"
                    d="M1091.23 174.578H1087.89V179.573H1091.23V174.578Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_170"
                    d="M1086.68 167.637L1086.44 173.554H1092.69L1092.44 167.637H1086.68Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_171"
                    d="M1086.68 151.666L1086.44 145.749H1092.69L1092.44 151.666H1086.68Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_172"
                    d="M1092.13 187.657L1092.69 180.596H1086.44L1086.99 187.657H1092.13Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_173"
                    d="M1092.13 131.646L1092.69 138.707H1086.44L1086.99 131.646H1092.13Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_17">
                  <path
                    id="Vector_174"
                    d="M1109.47 130.611L1110.11 138.707V145.749L1109.86 151.666V167.637L1110.11 173.554V180.596L1109.47 188.692H1104.5L1103.86 180.596V173.554L1104.11 167.637V151.666L1103.86 145.749V138.707L1104.5 130.611H1109.47Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_175"
                    d="M1103.86 174.316V179.833H1110.11V174.316H1103.86Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_176"
                    d="M1103.86 139.469V144.987H1110.11V139.469H1103.86Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_177"
                    d="M1103.86 144.987V145.749H1110.11V144.987H1103.86Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_178"
                    d="M1103.86 138.707V139.469H1110.11V138.707H1103.86Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_179"
                    d="M1103.86 179.833V180.595H1110.11V179.833H1103.86Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_180"
                    d="M1103.86 173.554V174.316H1110.11V173.554H1103.86Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_181"
                    d="M1108.66 139.73H1105.32V144.725H1108.66V139.73Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_182"
                    d="M1108.66 174.578H1105.32V179.573H1108.66V174.578Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_183"
                    d="M1104.11 167.637L1103.86 173.554H1110.11L1109.86 167.637H1104.11Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_184"
                    d="M1104.11 151.666L1103.86 145.749H1110.11L1109.86 151.666H1104.11Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_185"
                    d="M1109.55 187.657L1110.11 180.596H1103.86L1104.42 187.657H1109.55Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_186"
                    d="M1109.55 131.646L1110.11 138.707H1103.86L1104.42 131.646H1109.55Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_18">
                  <path
                    id="Vector_187"
                    d="M1126.9 130.611L1127.53 138.707V145.749L1127.29 151.666V167.637L1127.53 173.554V180.596L1126.9 188.692H1121.92L1121.29 180.596V173.554L1121.53 167.637V151.666L1121.29 145.749V138.707L1121.92 130.611H1126.9Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_188"
                    d="M1121.29 174.316V179.833H1127.53V174.316H1121.29Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_189"
                    d="M1121.29 139.469V144.987H1127.53V139.469H1121.29Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_190"
                    d="M1121.29 144.987V145.749H1127.53V144.987H1121.29Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_191"
                    d="M1121.29 138.707V139.469H1127.53V138.707H1121.29Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_192"
                    d="M1121.29 179.833V180.595H1127.53V179.833H1121.29Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_193"
                    d="M1121.29 173.554V174.316H1127.53V173.554H1121.29Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_194"
                    d="M1126.08 139.73H1122.74V144.725H1126.08V139.73Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_195"
                    d="M1126.08 174.578H1122.74V179.573H1126.08V174.578Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_196"
                    d="M1121.53 167.637L1121.29 173.554H1127.53L1127.29 167.637H1121.53Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_197"
                    d="M1121.53 151.666L1121.29 145.749H1127.53L1127.29 151.666H1121.53Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_198"
                    d="M1126.98 187.657L1127.53 180.596H1121.29L1121.84 187.657H1126.98Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_199"
                    d="M1126.98 131.646L1127.53 138.707H1121.29L1121.84 131.646H1126.98Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_19">
                  <path
                    id="Vector_200"
                    d="M1144.32 130.611L1144.96 138.707V145.749L1144.71 151.666V167.637L1144.96 173.554V180.596L1144.32 188.692H1139.35L1138.71 180.596V173.554L1138.96 167.637V151.666L1138.71 145.749V138.707L1139.35 130.611H1144.32Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_201"
                    d="M1138.71 174.316V179.833H1144.96V174.316H1138.71Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_202"
                    d="M1138.71 139.469V144.987H1144.96V139.469H1138.71Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_203"
                    d="M1138.71 144.987V145.749H1144.96V144.987H1138.71Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_204"
                    d="M1138.71 138.707V139.469H1144.96V138.707H1138.71Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_205"
                    d="M1138.71 179.833V180.595H1144.96V179.833H1138.71Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_206"
                    d="M1138.71 173.554V174.316H1144.96V173.554H1138.71Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_207"
                    d="M1143.5 139.73H1140.17V144.725H1143.5V139.73Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_208"
                    d="M1143.5 174.578H1140.17V179.573H1143.5V174.578Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_209"
                    d="M1138.96 167.637L1138.71 173.554H1144.96L1144.71 167.637H1138.96Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_210"
                    d="M1138.96 151.666L1138.71 145.749H1144.96L1144.71 151.666H1138.96Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_211"
                    d="M1144.4 187.657L1144.96 180.596H1138.71L1139.26 187.657H1144.4Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_212"
                    d="M1144.4 131.646L1144.96 138.707H1138.71L1139.26 131.646H1144.4Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_20">
                  <path
                    id="Vector_213"
                    d="M1161.75 130.611L1162.38 138.707V145.749L1162.14 151.666V167.637L1162.38 173.554V180.596L1161.75 188.692H1156.77L1156.14 180.596V173.554L1156.38 167.637V151.666L1156.14 145.749V138.707L1156.77 130.611H1161.75Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_214"
                    d="M1156.14 174.316V179.833H1162.38V174.316H1156.14Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_215"
                    d="M1156.14 139.469V144.987H1162.38V139.469H1156.14Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_216"
                    d="M1156.14 144.987V145.749H1162.38V144.987H1156.14Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_217"
                    d="M1156.14 138.707V139.469H1162.38V138.707H1156.14Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_218"
                    d="M1156.14 179.833V180.595H1162.38V179.833H1156.14Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_219"
                    d="M1156.14 173.554V174.316H1162.38V173.554H1156.14Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_220"
                    d="M1160.93 139.73H1157.59V144.725H1160.93V139.73Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_221"
                    d="M1160.93 174.578H1157.59V179.573H1160.93V174.578Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_222"
                    d="M1156.38 167.637L1156.14 173.554H1162.38L1162.14 167.637H1156.38Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_223"
                    d="M1156.38 151.666L1156.14 145.749H1162.38L1162.14 151.666H1156.38Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_224"
                    d="M1161.83 187.657L1162.38 180.596H1156.14L1156.69 187.657H1161.83Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_225"
                    d="M1161.83 131.646L1162.38 138.707H1156.14L1156.69 131.646H1161.83Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_21">
                  <path
                    id="Vector_226"
                    d="M1179.17 130.611L1179.81 138.707V145.749L1179.56 151.666V167.637L1179.81 173.554V180.596L1179.17 188.692H1174.2L1173.56 180.596V173.554L1173.81 167.637V151.666L1173.56 145.749V138.707L1174.2 130.611H1179.17Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_227"
                    d="M1173.56 174.316V179.833H1179.81V174.316H1173.56Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_228"
                    d="M1173.56 139.469V144.987H1179.81V139.469H1173.56Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_229"
                    d="M1173.56 144.987V145.749H1179.81V144.987H1173.56Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_230"
                    d="M1173.56 138.707V139.469H1179.81V138.707H1173.56Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_231"
                    d="M1173.56 179.833V180.595H1179.81V179.833H1173.56Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_232"
                    d="M1173.56 173.554V174.316H1179.81V173.554H1173.56Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_233"
                    d="M1178.35 139.73H1175.01V144.725H1178.35V139.73Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_234"
                    d="M1178.35 174.578H1175.01V179.573H1178.35V174.578Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_235"
                    d="M1173.81 167.637L1173.56 173.554H1179.81L1179.56 167.637H1173.81Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_236"
                    d="M1173.81 151.666L1173.56 145.749H1179.81L1179.56 151.666H1173.81Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_237"
                    d="M1179.25 187.657L1179.81 180.596H1173.56L1174.11 187.657H1179.25Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_238"
                    d="M1179.25 131.646L1179.81 138.707H1173.56L1174.11 131.646H1179.25Z"
                    fill="#90A4AE"
                  />
                </g>
              </g>
              <g id="Group_22">
                <path
                  id="Vector_239"
                  d="M1185.39 140.485H1046V143.969H1185.39V140.485Z"
                  fill="#455A64"
                />
                <path
                  id="Vector_240"
                  d="M1185.39 175.333H1046V178.818H1185.39V175.333Z"
                  fill="#455A64"
                />
                <path
                  id="Vector_241"
                  d="M1185.39 175.967H1046V178.183H1185.39V175.967Z"
                  fill="#526873"
                />
                <path
                  id="Vector_242"
                  d="M1185.39 141.12H1046V143.336H1185.39V141.12Z"
                  fill="#526873"
                />
              </g>
            </g>
            <g id="Group_23">
              <g id="Group_24">
                <g id="Group_25">
                  <path
                    id="Vector_243"
                    d="M1052.2 244L1052.84 252.096V259.138L1052.59 265.055V281.026L1052.84 286.943V293.985L1052.2 302.081H1047.23L1046.59 293.985V286.943L1046.83 281.026V265.055L1046.59 259.138V252.096L1047.23 244H1052.2Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_244"
                    d="M1046.59 287.705V293.223H1052.84V287.705H1046.59Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_245"
                    d="M1046.59 252.858V258.376H1052.84V252.858H1046.59Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_246"
                    d="M1046.59 258.376V259.138H1052.84V258.376H1046.59Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_247"
                    d="M1046.59 252.096V252.858H1052.84V252.096H1046.59Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_248"
                    d="M1046.59 293.223V293.985H1052.84V293.223H1046.59Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_249"
                    d="M1046.59 286.943V287.705H1052.84V286.943H1046.59Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_250"
                    d="M1051.38 253.119H1048.04V258.114H1051.38V253.119Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_251"
                    d="M1051.38 287.967H1048.04V292.962H1051.38V287.967Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_252"
                    d="M1046.83 281.026L1046.59 286.943H1052.84L1052.59 281.026H1046.83Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_253"
                    d="M1046.83 265.055L1046.59 259.138H1052.84L1052.59 265.055H1046.83Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_254"
                    d="M1052.28 301.046L1052.84 293.985H1046.59L1047.14 301.046H1052.28Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_255"
                    d="M1052.28 245.035L1052.84 252.096H1046.59L1047.14 245.035H1052.28Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_26">
                  <path
                    id="Vector_256"
                    d="M1069.63 244L1070.26 252.096V259.138L1070.02 265.055V281.026L1070.26 286.943V293.985L1069.63 302.081H1064.65L1064.01 293.985V286.943L1064.26 281.026V265.055L1064.01 259.138V252.096L1064.65 244H1069.63Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_257"
                    d="M1064.01 287.705V293.223H1070.26V287.705H1064.01Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_258"
                    d="M1064.01 252.858V258.376H1070.26V252.858H1064.01Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_259"
                    d="M1064.01 258.376V259.138H1070.26V258.376H1064.01Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_260"
                    d="M1064.01 252.096V252.858H1070.26V252.096H1064.01Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_261"
                    d="M1064.01 293.223V293.985H1070.26V293.223H1064.01Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_262"
                    d="M1064.01 286.943V287.705H1070.26V286.943H1064.01Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_263"
                    d="M1068.81 253.119H1065.47V258.114H1068.81V253.119Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_264"
                    d="M1068.81 287.967H1065.47V292.962H1068.81V287.967Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_265"
                    d="M1064.26 281.026L1064.01 286.943H1070.26L1070.02 281.026H1064.26Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_266"
                    d="M1064.26 265.055L1064.01 259.138H1070.26L1070.02 265.055H1064.26Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_267"
                    d="M1069.71 301.046L1070.26 293.985H1064.01L1064.57 301.046H1069.71Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_268"
                    d="M1069.71 245.035L1070.26 252.096H1064.01L1064.57 245.035H1069.71Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_27">
                  <path
                    id="Vector_269"
                    d="M1087.05 244L1087.69 252.096V259.138L1087.44 265.055V281.026L1087.69 286.943V293.985L1087.05 302.081H1082.07L1081.44 293.985V286.943L1081.68 281.026V265.055L1081.44 259.138V252.096L1082.07 244H1087.05Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_270"
                    d="M1081.44 287.705V293.223H1087.69V287.705H1081.44Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_271"
                    d="M1081.44 252.858V258.376H1087.69V252.858H1081.44Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_272"
                    d="M1081.44 258.376V259.138H1087.69V258.376H1081.44Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_273"
                    d="M1081.44 252.096V252.858H1087.68V252.096H1081.44Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_274"
                    d="M1081.44 293.223V293.985H1087.69V293.223H1081.44Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_275"
                    d="M1081.44 286.943V287.705H1087.69V286.943H1081.44Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_276"
                    d="M1086.23 253.119H1082.89V258.114H1086.23V253.119Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_277"
                    d="M1086.23 287.967H1082.89V292.962H1086.23V287.967Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_278"
                    d="M1081.68 281.026L1081.44 286.943H1087.69L1087.44 281.026H1081.68Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_279"
                    d="M1081.68 265.055L1081.44 259.138H1087.69L1087.44 265.055H1081.68Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_280"
                    d="M1087.13 301.046L1087.69 293.985H1081.44L1081.99 301.046H1087.13Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_281"
                    d="M1087.13 245.035L1087.69 252.096H1081.44L1081.99 245.035H1087.13Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_28">
                  <path
                    id="Vector_282"
                    d="M1104.47 244L1105.11 252.096V259.138L1104.86 265.055V281.026L1105.11 286.943V293.985L1104.47 302.081H1099.5L1098.86 293.985V286.943L1099.11 281.026V265.055L1098.86 259.138V252.096L1099.5 244H1104.47Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_283"
                    d="M1098.86 287.705V293.223H1105.11V287.705H1098.86Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_284"
                    d="M1098.86 252.858V258.376H1105.11V252.858H1098.86Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_285"
                    d="M1098.86 258.376V259.138H1105.11V258.376H1098.86Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_286"
                    d="M1098.86 252.096V252.858H1105.11V252.096H1098.86Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_287"
                    d="M1098.86 293.223V293.985H1105.11V293.223H1098.86Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_288"
                    d="M1098.86 286.943V287.705H1105.11V286.943H1098.86Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_289"
                    d="M1103.66 253.119H1100.32V258.114H1103.66V253.119Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_290"
                    d="M1103.66 287.967H1100.32V292.962H1103.66V287.967Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_291"
                    d="M1099.11 281.026L1098.86 286.943H1105.11L1104.86 281.026H1099.11Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_292"
                    d="M1099.11 265.055L1098.86 259.138H1105.11L1104.86 265.055H1099.11Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_293"
                    d="M1104.55 301.046L1105.11 293.985H1098.86L1099.42 301.046H1104.55Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_294"
                    d="M1104.55 245.035L1105.11 252.096H1098.86L1099.42 245.035H1104.55Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_29">
                  <path
                    id="Vector_295"
                    d="M1121.9 244L1122.53 252.096V259.138L1122.29 265.055V281.026L1122.53 286.943V293.985L1121.9 302.081H1116.92L1116.29 293.985V286.943L1116.53 281.026V265.055L1116.29 259.138V252.096L1116.92 244H1121.9Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_296"
                    d="M1116.29 287.705V293.223H1122.53V287.705H1116.29Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_297"
                    d="M1116.29 252.858V258.376H1122.53V252.858H1116.29Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_298"
                    d="M1116.29 258.376V259.138H1122.53V258.376H1116.29Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_299"
                    d="M1116.29 252.096V252.858H1122.53V252.096H1116.29Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_300"
                    d="M1116.29 293.223V293.985H1122.53V293.223H1116.29Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_301"
                    d="M1116.29 286.943V287.705H1122.53V286.943H1116.29Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_302"
                    d="M1121.08 253.119H1117.74V258.114H1121.08V253.119Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_303"
                    d="M1121.08 287.967H1117.74V292.962H1121.08V287.967Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_304"
                    d="M1116.53 281.026L1116.29 286.943H1122.53L1122.29 281.026H1116.53Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_305"
                    d="M1116.53 265.055L1116.29 259.138H1122.53L1122.29 265.055H1116.53Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_306"
                    d="M1121.98 301.046L1122.53 293.985H1116.29L1116.84 301.046H1121.98Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_307"
                    d="M1121.98 245.035L1122.53 252.096H1116.29L1116.84 245.035H1121.98Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_30">
                  <path
                    id="Vector_308"
                    d="M1139.32 244L1139.96 252.096V259.138L1139.71 265.055V281.026L1139.96 286.943V293.985L1139.32 302.081H1134.35L1133.71 293.985V286.943L1133.96 281.026V265.055L1133.71 259.138V252.096L1134.35 244H1139.32Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_309"
                    d="M1133.71 287.705V293.223H1139.96V287.705H1133.71Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_310"
                    d="M1133.71 252.858V258.376H1139.96V252.858H1133.71Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_311"
                    d="M1133.71 258.376V259.138H1139.96V258.376H1133.71Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_312"
                    d="M1133.71 252.096V252.858H1139.96V252.096H1133.71Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_313"
                    d="M1133.71 293.223V293.985H1139.96V293.223H1133.71Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_314"
                    d="M1133.71 286.943V287.705H1139.96V286.943H1133.71Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_315"
                    d="M1138.5 253.119H1135.17V258.114H1138.5V253.119Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_316"
                    d="M1138.5 287.967H1135.17V292.962H1138.5V287.967Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_317"
                    d="M1133.96 281.026L1133.71 286.943H1139.96L1139.71 281.026H1133.96Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_318"
                    d="M1133.96 265.055L1133.71 259.138H1139.96L1139.71 265.055H1133.96Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_319"
                    d="M1139.4 301.046L1139.96 293.985H1133.71L1134.26 301.046H1139.4Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_320"
                    d="M1139.4 245.035L1139.96 252.096H1133.71L1134.26 245.035H1139.4Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_31">
                  <path
                    id="Vector_321"
                    d="M1156.75 244L1157.38 252.096V259.138L1157.14 265.055V281.026L1157.38 286.943V293.985L1156.75 302.081H1151.77L1151.14 293.985V286.943L1151.38 281.026V265.055L1151.14 259.138V252.096L1151.77 244H1156.75Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_322"
                    d="M1151.14 287.705V293.223H1157.38V287.705H1151.14Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_323"
                    d="M1151.14 252.858V258.376H1157.38V252.858H1151.14Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_324"
                    d="M1151.14 258.376V259.138H1157.38V258.376H1151.14Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_325"
                    d="M1151.14 252.096V252.858H1157.38V252.096H1151.14Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_326"
                    d="M1151.14 293.223V293.985H1157.38V293.223H1151.14Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_327"
                    d="M1151.14 286.943V287.705H1157.38V286.943H1151.14Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_328"
                    d="M1155.93 253.119H1152.59V258.114H1155.93V253.119Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_329"
                    d="M1155.93 287.967H1152.59V292.962H1155.93V287.967Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_330"
                    d="M1151.38 281.026L1151.14 286.943H1157.38L1157.14 281.026H1151.38Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_331"
                    d="M1151.38 265.055L1151.14 259.138H1157.38L1157.14 265.055H1151.38Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_332"
                    d="M1156.83 301.046L1157.38 293.985H1151.14L1151.69 301.046H1156.83Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_333"
                    d="M1156.83 245.035L1157.38 252.096H1151.14L1151.69 245.035H1156.83Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_32">
                  <path
                    id="Vector_334"
                    d="M1174.17 244L1174.81 252.096V259.138L1174.56 265.055V281.026L1174.81 286.943V293.985L1174.17 302.081H1169.2L1168.56 293.985V286.943L1168.81 281.026V265.055L1168.56 259.138V252.096L1169.2 244H1174.17Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_335"
                    d="M1168.56 287.705V293.223H1174.81V287.705H1168.56Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_336"
                    d="M1168.56 252.858V258.376H1174.81V252.858H1168.56Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_337"
                    d="M1168.56 258.376V259.138H1174.81V258.376H1168.56Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_338"
                    d="M1168.56 252.096V252.858H1174.81V252.096H1168.56Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_339"
                    d="M1168.56 293.223V293.985H1174.81V293.223H1168.56Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_340"
                    d="M1168.56 286.943V287.705H1174.81V286.943H1168.56Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_341"
                    d="M1173.35 253.119H1170.01V258.114H1173.35V253.119Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_342"
                    d="M1173.35 287.967H1170.01V292.962H1173.35V287.967Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_343"
                    d="M1168.81 281.026L1168.56 286.943H1174.81L1174.56 281.026H1168.81Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_344"
                    d="M1168.81 265.055L1168.56 259.138H1174.81L1174.56 265.055H1168.81Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_345"
                    d="M1174.25 301.046L1174.81 293.985H1168.56L1169.11 301.046H1174.25Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_346"
                    d="M1174.25 245.035L1174.81 252.096H1168.56L1169.11 245.035H1174.25Z"
                    fill="#90A4AE"
                  />
                </g>
              </g>
              <g id="Group_33">
                <path
                  id="Vector_347"
                  d="M1180.39 253.874H1041V257.359H1180.39V253.874Z"
                  fill="#455A64"
                />
                <path
                  id="Vector_348"
                  d="M1180.39 288.723H1041V292.207H1180.39V288.723Z"
                  fill="#455A64"
                />
                <path
                  id="Vector_349"
                  d="M1180.39 289.356H1041V291.572H1180.39V289.356Z"
                  fill="#526873"
                />
                <path
                  id="Vector_350"
                  d="M1180.39 254.509H1041V256.725H1180.39V254.509Z"
                  fill="#526873"
                />
              </g>
              <path
                id="Vector_351"
                d="M293.201 130L293.836 138.096V145.138L293.592 151.055V167.026L293.836 172.943V179.985L293.201 188.081H288.225L287.59 179.985V172.943L287.835 167.026V151.055L287.59 145.138V138.096L288.225 130H293.201Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_352"
                d="M154.201 130L154.836 138.096V145.138L154.592 151.055V167.026L154.836 172.943V179.985L154.201 188.081H149.225L148.59 179.985V172.943L148.835 167.026V151.055L148.59 145.138V138.096L149.225 130H154.201Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_353"
                d="M15.2008 130L15.8362 138.096V145.138L15.5916 151.055V167.026L15.8362 172.943V179.985L15.2008 188.081H10.2252L9.58984 179.985V172.943L9.8345 167.026V151.055L9.58984 145.138V138.096L10.2252 130H15.2008Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_354"
                d="M287.59 173.705V179.223H293.836V173.705H287.59Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_355"
                d="M148.59 173.705V179.223H154.836V173.705H148.59Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_356"
                d="M9.58984 173.705V179.223H15.8362V173.705H9.58984Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_357"
                d="M287.59 138.858V144.376H293.836V138.858H287.59Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_358"
                d="M148.59 138.858V144.376H154.836V138.858H148.59Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_359"
                d="M9.58984 138.858V144.376H15.8362V138.858H9.58984Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_360"
                d="M287.59 144.376V145.138H293.836V144.376H287.59Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_361"
                d="M148.59 144.376V145.138H154.836V144.376H148.59Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_362"
                d="M9.58984 144.376V145.138H15.8362V144.376H9.58984Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_363"
                d="M287.59 138.096V138.858H293.836V138.096H287.59Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_364"
                d="M148.59 138.096V138.858H154.836V138.096H148.59Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_365"
                d="M9.58984 138.096V138.858H15.8362V138.096H9.58984Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_366"
                d="M287.59 179.223V179.985H293.836V179.223H287.59Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_367"
                d="M148.59 179.223V179.985H154.836V179.223H148.59Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_368"
                d="M9.58984 179.223V179.985H15.8362V179.223H9.58984Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_369"
                d="M287.59 172.943V173.705H293.836V172.943H287.59Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_370"
                d="M148.59 172.943V173.705H154.836V172.943H148.59Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_371"
                d="M9.58984 172.943V173.705H15.8362V172.943H9.58984Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_372"
                d="M287.835 167.026L287.59 172.943H293.836L293.592 167.026H287.835Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_373"
                d="M148.835 167.026L148.59 172.943H154.836L154.592 167.026H148.835Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_374"
                d="M9.8345 167.026L9.58984 172.943H15.8362L15.5916 167.026H9.8345Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_375"
                d="M287.835 151.055L287.59 145.138H293.836L293.592 151.055H287.835Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_376"
                d="M148.835 151.055L148.59 145.138H154.836L154.592 151.055H148.835Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_377"
                d="M9.8345 151.055L9.58984 145.138H15.8362L15.5916 151.055H9.8345Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_378"
                d="M293.282 187.046L293.836 179.985H287.59L288.142 187.046H293.282Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_379"
                d="M154.282 187.046L154.836 179.985H148.59L149.142 187.046H154.282Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_380"
                d="M15.2818 187.046L15.8362 179.985H9.58984L10.1425 187.046H15.2818Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_381"
                d="M293.282 131.035L293.836 138.096H287.59L288.142 131.035H293.282Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_382"
                d="M154.282 131.035L154.836 138.096H148.59L149.142 131.035H154.282Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_383"
                d="M15.2818 131.035L15.8362 138.096H9.58984L10.1425 131.035H15.2818Z"
                fill="#90A4AE"
              />
              <g id="Group_34">
                <path
                  id="Vector_384"
                  d="M310.625 130L311.261 138.096V145.138L311.016 151.055V167.026L311.261 172.943V179.985L310.625 188.081H305.65L305.014 179.985V172.943L305.259 167.026V151.055L305.014 145.138V138.096L305.65 130H310.625Z"
                  fill="#B0BEC5"
                />
                <path
                  id="Vector_385"
                  d="M305.014 173.705V179.223H311.261V173.705H305.014Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_386"
                  d="M305.014 138.858V144.376H311.261V138.858H305.014Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_387"
                  d="M305.014 144.376V145.138H311.261V144.376H305.014Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_388"
                  d="M305.014 138.096V138.858H311.261V138.096H305.014Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_389"
                  d="M305.014 179.223V179.985H311.261V179.223H305.014Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_390"
                  d="M305.014 172.943V173.705H311.261V172.943H305.014Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_391"
                  d="M309.807 139.119H306.468V144.114H309.807V139.119Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_392"
                  d="M309.807 173.967H306.468V178.962H309.807V173.967Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_393"
                  d="M305.259 167.026L305.014 172.943H311.261L311.016 167.026H305.259Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_394"
                  d="M305.259 151.055L305.014 145.138H311.261L311.016 151.055H305.259Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_395"
                  d="M310.706 187.046L311.261 179.985H305.014L305.567 187.046H310.706Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_396"
                  d="M310.706 131.035L311.261 138.096H305.014L305.567 131.035H310.706Z"
                  fill="#90A4AE"
                />
              </g>
              <g id="Group_35">
                <path
                  id="Vector_397"
                  d="M171.625 130L172.261 138.096V145.138L172.016 151.055V167.026L172.261 172.943V179.985L171.625 188.081H166.65L166.014 179.985V172.943L166.259 167.026V151.055L166.014 145.138V138.096L166.65 130H171.625Z"
                  fill="#B0BEC5"
                />
                <path
                  id="Vector_398"
                  d="M166.014 173.705V179.223H172.261V173.705H166.014Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_399"
                  d="M166.014 138.858V144.376H172.261V138.858H166.014Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_400"
                  d="M166.014 144.376V145.138H172.261V144.376H166.014Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_401"
                  d="M166.014 138.096V138.858H172.261V138.096H166.014Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_402"
                  d="M166.014 179.223V179.985H172.261V179.223H166.014Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_403"
                  d="M166.014 172.943V173.705H172.261V172.943H166.014Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_404"
                  d="M170.807 139.119H167.468V144.114H170.807V139.119Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_405"
                  d="M170.807 173.967H167.468V178.962H170.807V173.967Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_406"
                  d="M166.259 167.026L166.014 172.943H172.261L172.016 167.026H166.259Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_407"
                  d="M166.259 151.055L166.014 145.138H172.261L172.016 151.055H166.259Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_408"
                  d="M171.706 187.046L172.261 179.985H166.014L166.567 187.046H171.706Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_409"
                  d="M171.706 131.035L172.261 138.096H166.014L166.567 131.035H171.706Z"
                  fill="#90A4AE"
                />
              </g>
              <g id="Group_36">
                <path
                  id="Vector_410"
                  d="M32.6253 130L33.2606 138.096V145.138L33.016 151.055V167.026L33.2606 172.943V179.985L32.6253 188.081H27.6496L27.0143 179.985V172.943L27.2589 167.026V151.055L27.0143 145.138V138.096L27.6496 130H32.6253Z"
                  fill="#B0BEC5"
                />
                <path
                  id="Vector_411"
                  d="M27.0143 173.705V179.223H33.2606V173.705H27.0143Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_412"
                  d="M27.0143 138.858V144.376H33.2606V138.858H27.0143Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_413"
                  d="M27.0143 144.376V145.138H33.2606V144.376H27.0143Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_414"
                  d="M27.0142 138.096V138.858H33.2605V138.096H27.0142Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_415"
                  d="M27.0143 179.223V179.985H33.2606V179.223H27.0143Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_416"
                  d="M27.0143 172.943V173.705H33.2606V172.943H27.0143Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_417"
                  d="M31.8068 139.119H28.468V144.114H31.8068V139.119Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_418"
                  d="M31.8068 173.967H28.468V178.962H31.8068V173.967Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_419"
                  d="M27.2589 167.026L27.0143 172.943H33.2606L33.016 167.026H27.2589Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_420"
                  d="M27.2589 151.055L27.0143 145.138H33.2606L33.016 151.055H27.2589Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_421"
                  d="M32.7062 187.046L33.2606 179.985H27.0143L27.5669 187.046H32.7062Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_422"
                  d="M32.7062 131.035L33.2606 138.096H27.0143L27.5669 131.035H32.7062Z"
                  fill="#90A4AE"
                />
              </g>
              <g id="Group_37">
                <path
                  id="Vector_423"
                  d="M328.05 130L328.685 138.096V145.138L328.44 151.055V167.026L328.685 172.943V179.985L328.05 188.081H323.074L322.439 179.985V172.943L322.683 167.026V151.055L322.439 145.138V138.096L323.074 130H328.05Z"
                  fill="#B0BEC5"
                />
                <path
                  id="Vector_424"
                  d="M322.439 173.705V179.223H328.685V173.705H322.439Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_425"
                  d="M322.439 138.858V144.376H328.685V138.858H322.439Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_426"
                  d="M322.439 144.376V145.138H328.685V144.376H322.439Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_427"
                  d="M322.438 138.096V138.858H328.685V138.096H322.438Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_428"
                  d="M322.439 179.223V179.985H328.685V179.223H322.439Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_429"
                  d="M322.439 172.943V173.705H328.685V172.943H322.439Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_430"
                  d="M327.231 139.119H323.892V144.114H327.231V139.119Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_431"
                  d="M327.231 173.967H323.892V178.962H327.231V173.967Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_432"
                  d="M322.683 167.026L322.439 172.943H328.685L328.44 167.026H322.683Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_433"
                  d="M322.683 151.055L322.439 145.138H328.685L328.44 151.055H322.683Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_434"
                  d="M328.131 187.046L328.685 179.985H322.439L322.993 187.046H328.131Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_435"
                  d="M328.131 131.035L328.685 138.096H322.439L322.993 131.035H328.131Z"
                  fill="#90A4AE"
                />
              </g>
              <g id="Group_38">
                <path
                  id="Vector_436"
                  d="M189.05 130L189.685 138.096V145.138L189.44 151.055V167.026L189.685 172.943V179.985L189.05 188.081H184.074L183.439 179.985V172.943L183.683 167.026V151.055L183.439 145.138V138.096L184.074 130H189.05Z"
                  fill="#B0BEC5"
                />
                <path
                  id="Vector_437"
                  d="M183.439 173.705V179.223H189.685V173.705H183.439Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_438"
                  d="M183.439 138.858V144.376H189.685V138.858H183.439Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_439"
                  d="M183.439 144.376V145.138H189.685V144.376H183.439Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_440"
                  d="M183.438 138.096V138.858H189.685V138.096H183.438Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_441"
                  d="M183.439 179.223V179.985H189.685V179.223H183.439Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_442"
                  d="M183.439 172.943V173.705H189.685V172.943H183.439Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_443"
                  d="M188.231 139.119H184.892V144.114H188.231V139.119Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_444"
                  d="M188.231 173.967H184.892V178.962H188.231V173.967Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_445"
                  d="M183.683 167.026L183.439 172.943H189.685L189.44 167.026H183.683Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_446"
                  d="M183.683 151.055L183.439 145.138H189.685L189.44 151.055H183.683Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_447"
                  d="M189.131 187.046L189.685 179.985H183.439L183.993 187.046H189.131Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_448"
                  d="M189.131 131.035L189.685 138.096H183.439L183.993 131.035H189.131Z"
                  fill="#90A4AE"
                />
              </g>
              <g id="Group_39">
                <path
                  id="Vector_449"
                  d="M50.0496 130L50.685 138.096V145.138L50.4403 151.055V167.026L50.685 172.943V179.985L50.0496 188.081H45.074L44.4386 179.985V172.943L44.6832 167.026V151.055L44.4386 145.138V138.096L45.074 130H50.0496Z"
                  fill="#B0BEC5"
                />
                <path
                  id="Vector_450"
                  d="M44.4387 173.705V179.223H50.6851V173.705H44.4387Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_451"
                  d="M44.4387 138.858V144.376H50.6851V138.858H44.4387Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_452"
                  d="M44.4387 144.376V145.138H50.6851V144.376H44.4387Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_453"
                  d="M44.4385 138.096V138.858H50.6849V138.096H44.4385Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_454"
                  d="M44.4387 179.223V179.985H50.6851V179.223H44.4387Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_455"
                  d="M44.4387 172.943V173.705H50.6851V172.943H44.4387Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_456"
                  d="M49.2312 139.119H45.8925V144.114H49.2312V139.119Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_457"
                  d="M49.2312 173.967H45.8925V178.962H49.2312V173.967Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_458"
                  d="M44.6834 167.026L44.4387 172.943H50.6851L50.4404 167.026H44.6834Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_459"
                  d="M44.6834 151.055L44.4387 145.138H50.6851L50.4404 151.055H44.6834Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_460"
                  d="M50.1307 187.046L50.6851 179.985H44.4387L44.9931 187.046H50.1307Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_461"
                  d="M50.1307 131.035L50.6851 138.096H44.4387L44.9931 131.035H50.1307Z"
                  fill="#90A4AE"
                />
              </g>
              <g id="Group_40">
                <path
                  id="Vector_462"
                  d="M345.474 130L346.109 138.096V145.138L345.865 151.055V167.026L346.109 172.943V179.985L345.474 188.081H340.498L339.863 179.985V172.943L340.107 167.026V151.055L339.863 145.138V138.096L340.498 130H345.474Z"
                  fill="#B0BEC5"
                />
                <path
                  id="Vector_463"
                  d="M339.863 173.705V179.223H346.109V173.705H339.863Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_464"
                  d="M339.863 138.858V144.376H346.109V138.858H339.863Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_465"
                  d="M339.863 144.376V145.138H346.109V144.376H339.863Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_466"
                  d="M339.863 138.096V138.858H346.109V138.096H339.863Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_467"
                  d="M339.863 179.223V179.985H346.109V179.223H339.863Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_468"
                  d="M339.863 172.943V173.705H346.109V172.943H339.863Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_469"
                  d="M344.655 139.119H341.317V144.114H344.655V139.119Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_470"
                  d="M344.655 173.967H341.317V178.962H344.655V173.967Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_471"
                  d="M340.108 167.026L339.863 172.943H346.109L345.865 167.026H340.108Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_472"
                  d="M340.108 151.055L339.863 145.138H346.109L345.865 151.055H340.108Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_473"
                  d="M345.555 187.046L346.109 179.985H339.863L340.416 187.046H345.555Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_474"
                  d="M345.555 131.035L346.109 138.096H339.863L340.416 131.035H345.555Z"
                  fill="#90A4AE"
                />
              </g>
              <g id="Group_41">
                <path
                  id="Vector_475"
                  d="M206.474 130L207.109 138.096V145.138L206.865 151.055V167.026L207.109 172.943V179.985L206.474 188.081H201.498L200.863 179.985V172.943L201.107 167.026V151.055L200.863 145.138V138.096L201.498 130H206.474Z"
                  fill="#B0BEC5"
                />
                <path
                  id="Vector_476"
                  d="M200.863 173.705V179.223H207.109V173.705H200.863Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_477"
                  d="M200.863 138.858V144.376H207.109V138.858H200.863Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_478"
                  d="M200.863 144.376V145.138H207.109V144.376H200.863Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_479"
                  d="M200.863 138.096V138.858H207.109V138.096H200.863Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_480"
                  d="M200.863 179.223V179.985H207.109V179.223H200.863Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_481"
                  d="M200.863 172.943V173.705H207.109V172.943H200.863Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_482"
                  d="M205.655 139.119H202.317V144.114H205.655V139.119Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_483"
                  d="M205.655 173.967H202.317V178.962H205.655V173.967Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_484"
                  d="M201.108 167.026L200.863 172.943H207.109L206.865 167.026H201.108Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_485"
                  d="M201.108 151.055L200.863 145.138H207.109L206.865 151.055H201.108Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_486"
                  d="M206.555 187.046L207.109 179.985H200.863L201.416 187.046H206.555Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_487"
                  d="M206.555 131.035L207.109 138.096H200.863L201.416 131.035H206.555Z"
                  fill="#90A4AE"
                />
              </g>
              <g id="Group_42">
                <path
                  id="Vector_488"
                  d="M67.4738 130L68.1092 138.096V145.138L67.8645 151.055V167.026L68.1092 172.943V179.985L67.4738 188.081H62.4982L61.8628 179.985V172.943L62.1075 167.026V151.055L61.8628 145.138V138.096L62.4982 130H67.4738Z"
                  fill="#B0BEC5"
                />
                <path
                  id="Vector_489"
                  d="M61.8629 173.705V179.223H68.1093V173.705H61.8629Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_490"
                  d="M61.8629 138.858V144.376H68.1093V138.858H61.8629Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_491"
                  d="M61.8629 144.376V145.138H68.1093V144.376H61.8629Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_492"
                  d="M61.8627 138.096V138.858H68.1091V138.096H61.8627Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_493"
                  d="M61.8629 179.223V179.985H68.1093V179.223H61.8629Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_494"
                  d="M61.8629 172.943V173.705H68.1093V172.943H61.8629Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_495"
                  d="M66.6554 139.119H63.3167V144.114H66.6554V139.119Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_496"
                  d="M66.6554 173.967H63.3167V178.962H66.6554V173.967Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_497"
                  d="M62.1076 167.026L61.8629 172.943H68.1093L67.8646 167.026H62.1076Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_498"
                  d="M62.1076 151.055L61.8629 145.138H68.1093L67.8646 151.055H62.1076Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_499"
                  d="M67.5549 187.046L68.1093 179.985H61.8629L62.4156 187.046H67.5549Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_500"
                  d="M67.5549 131.035L68.1093 138.096H61.8629L62.4156 131.035H67.5549Z"
                  fill="#90A4AE"
                />
              </g>
              <g id="Group_43">
                <path
                  id="Vector_501"
                  d="M362.898 130L363.534 138.096V145.138L363.289 151.055V167.026L363.534 172.943V179.985L362.898 188.081H357.923L357.287 179.985V172.943L357.532 167.026V151.055L357.287 145.138V138.096L357.923 130H362.898Z"
                  fill="#B0BEC5"
                />
                <path
                  id="Vector_502"
                  d="M357.287 173.705V179.223H363.534V173.705H357.287Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_503"
                  d="M357.287 138.858V144.376H363.534V138.858H357.287Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_504"
                  d="M357.287 144.376V145.138H363.534V144.376H357.287Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_505"
                  d="M357.287 138.096V138.858H363.533V138.096H357.287Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_506"
                  d="M357.287 179.223V179.985H363.534V179.223H357.287Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_507"
                  d="M357.287 172.943V173.705H363.534V172.943H357.287Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_508"
                  d="M362.08 139.119H358.741V144.114H362.08V139.119Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_509"
                  d="M362.08 173.967H358.741V178.962H362.08V173.967Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_510"
                  d="M357.532 167.026L357.287 172.943H363.534L363.289 167.026H357.532Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_511"
                  d="M357.532 151.055L357.287 145.138H363.534L363.289 151.055H357.532Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_512"
                  d="M362.979 187.046L363.534 179.985H357.287L357.84 187.046H362.979Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_513"
                  d="M362.979 131.035L363.534 138.096H357.287L357.84 131.035H362.979Z"
                  fill="#90A4AE"
                />
              </g>
              <g id="Group_44">
                <path
                  id="Vector_514"
                  d="M223.898 130L224.534 138.096V145.138L224.289 151.055V167.026L224.534 172.943V179.985L223.898 188.081H218.923L218.287 179.985V172.943L218.532 167.026V151.055L218.287 145.138V138.096L218.923 130H223.898Z"
                  fill="#B0BEC5"
                />
                <path
                  id="Vector_515"
                  d="M218.287 173.705V179.223H224.534V173.705H218.287Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_516"
                  d="M218.287 138.858V144.376H224.534V138.858H218.287Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_517"
                  d="M218.287 144.376V145.138H224.534V144.376H218.287Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_518"
                  d="M218.287 138.096V138.858H224.533V138.096H218.287Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_519"
                  d="M218.287 179.223V179.985H224.534V179.223H218.287Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_520"
                  d="M218.287 172.943V173.705H224.534V172.943H218.287Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_521"
                  d="M223.08 139.119H219.741V144.114H223.08V139.119Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_522"
                  d="M223.08 173.967H219.741V178.962H223.08V173.967Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_523"
                  d="M218.532 167.026L218.287 172.943H224.534L224.289 167.026H218.532Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_524"
                  d="M218.532 151.055L218.287 145.138H224.534L224.289 151.055H218.532Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_525"
                  d="M223.979 187.046L224.534 179.985H218.287L218.84 187.046H223.979Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_526"
                  d="M223.979 131.035L224.534 138.096H218.287L218.84 131.035H223.979Z"
                  fill="#90A4AE"
                />
              </g>
              <g id="Group_45">
                <path
                  id="Vector_527"
                  d="M84.8982 130L85.5336 138.096V145.138L85.2889 151.055V167.026L85.5336 172.943V179.985L84.8982 188.081H79.9226L79.2872 179.985V172.943L79.5319 167.026V151.055L79.2872 145.138V138.096L79.9226 130H84.8982Z"
                  fill="#B0BEC5"
                />
                <path
                  id="Vector_528"
                  d="M79.2874 173.705V179.223H85.5337V173.705H79.2874Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_529"
                  d="M79.2874 138.858V144.376H85.5337V138.858H79.2874Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_530"
                  d="M79.2874 144.376V145.138H85.5337V144.376H79.2874Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_531"
                  d="M79.2871 138.096V138.858H85.5335V138.096H79.2871Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_532"
                  d="M79.2874 179.223V179.985H85.5337V179.223H79.2874Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_533"
                  d="M79.2874 172.943V173.705H85.5337V172.943H79.2874Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_534"
                  d="M84.0798 139.119H80.741V144.114H84.0798V139.119Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_535"
                  d="M84.0798 173.967H80.741V178.962H84.0798V173.967Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_536"
                  d="M79.532 167.026L79.2874 172.943H85.5337L85.2891 167.026H79.532Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_537"
                  d="M79.532 151.055L79.2874 145.138H85.5337L85.2891 151.055H79.532Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_538"
                  d="M84.9793 187.046L85.5337 179.985H79.2874L79.84 187.046H84.9793Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_539"
                  d="M84.9793 131.035L85.5337 138.096H79.2874L79.84 131.035H84.9793Z"
                  fill="#90A4AE"
                />
              </g>
              <g id="Group_46">
                <path
                  id="Vector_540"
                  d="M380.323 130L380.958 138.096V145.138L380.713 151.055V167.026L380.958 172.943V179.985L380.323 188.081H375.347L374.712 179.985V172.943L374.956 167.026V151.055L374.712 145.138V138.096L375.347 130H380.323Z"
                  fill="#B0BEC5"
                />
                <path
                  id="Vector_541"
                  d="M374.712 173.705V179.223H380.958V173.705H374.712Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_542"
                  d="M374.712 138.858V144.376H380.958V138.858H374.712Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_543"
                  d="M374.712 144.376V145.138H380.958V144.376H374.712Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_544"
                  d="M374.711 138.096V138.858H380.958V138.096H374.711Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_545"
                  d="M374.712 179.223V179.985H380.958V179.223H374.712Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_546"
                  d="M374.712 172.943V173.705H380.958V172.943H374.712Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_547"
                  d="M379.504 139.119H376.165V144.114H379.504V139.119Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_548"
                  d="M379.504 173.967H376.165V178.962H379.504V173.967Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_549"
                  d="M374.956 167.026L374.712 172.943H380.958L380.714 167.026H374.956Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_550"
                  d="M374.956 151.055L374.712 145.138H380.958L380.714 151.055H374.956Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_551"
                  d="M380.404 187.046L380.958 179.985H374.712L375.264 187.046H380.404Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_552"
                  d="M380.404 131.035L380.958 138.096H374.712L375.264 131.035H380.404Z"
                  fill="#90A4AE"
                />
              </g>
              <g id="Group_47">
                <path
                  id="Vector_553"
                  d="M241.323 130L241.958 138.096V145.138L241.713 151.055V167.026L241.958 172.943V179.985L241.323 188.081H236.347L235.712 179.985V172.943L235.956 167.026V151.055L235.712 145.138V138.096L236.347 130H241.323Z"
                  fill="#B0BEC5"
                />
                <path
                  id="Vector_554"
                  d="M235.712 173.705V179.223H241.958V173.705H235.712Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_555"
                  d="M235.712 138.858V144.376H241.958V138.858H235.712Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_556"
                  d="M235.712 144.376V145.138H241.958V144.376H235.712Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_557"
                  d="M235.711 138.096V138.858H241.958V138.096H235.711Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_558"
                  d="M235.712 179.223V179.985H241.958V179.223H235.712Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_559"
                  d="M235.712 172.943V173.705H241.958V172.943H235.712Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_560"
                  d="M240.504 139.119H237.165V144.114H240.504V139.119Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_561"
                  d="M240.504 173.967H237.165V178.962H240.504V173.967Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_562"
                  d="M235.956 167.026L235.712 172.943H241.958L241.714 167.026H235.956Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_563"
                  d="M235.956 151.055L235.712 145.138H241.958L241.714 151.055H235.956Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_564"
                  d="M241.404 187.046L241.958 179.985H235.712L236.264 187.046H241.404Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_565"
                  d="M241.404 131.035L241.958 138.096H235.712L236.264 131.035H241.404Z"
                  fill="#90A4AE"
                />
              </g>
              <g id="Group_48">
                <path
                  id="Vector_566"
                  d="M102.323 130L102.958 138.096V145.138L102.713 151.055V167.026L102.958 172.943V179.985L102.323 188.081H97.3469L96.7115 179.985V172.943L96.9562 167.026V151.055L96.7115 145.138V138.096L97.3469 130H102.323Z"
                  fill="#B0BEC5"
                />
                <path
                  id="Vector_567"
                  d="M96.7118 173.705V179.223H102.958V173.705H96.7118Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_568"
                  d="M96.7118 138.858V144.376H102.958V138.858H96.7118Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_569"
                  d="M96.7118 144.376V145.138H102.958V144.376H96.7118Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_570"
                  d="M96.7114 138.096V138.858H102.958V138.096H96.7114Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_571"
                  d="M96.7118 179.223V179.985H102.958V179.223H96.7118Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_572"
                  d="M96.7118 172.943V173.705H102.958V172.943H96.7118Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_573"
                  d="M101.504 139.119H98.1654V144.114H101.504V139.119Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_574"
                  d="M101.504 173.967H98.1654V178.962H101.504V173.967Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_575"
                  d="M96.9565 167.026L96.7118 172.943H102.958L102.714 167.026H96.9565Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_576"
                  d="M96.9565 151.055L96.7118 145.138H102.958L102.714 151.055H96.9565Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_577"
                  d="M102.404 187.046L102.958 179.985H96.7118L97.2644 187.046H102.404Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_578"
                  d="M102.404 131.035L102.958 138.096H96.7118L97.2644 131.035H102.404Z"
                  fill="#90A4AE"
                />
              </g>
              <g id="Group_49">
                <path
                  id="Vector_579"
                  d="M397.747 130L398.382 138.096V145.138L398.138 151.055V167.026L398.382 172.943V179.985L397.747 188.081H392.771L392.136 179.985V172.943L392.381 167.026V151.055L392.136 145.138V138.096L392.771 130H397.747Z"
                  fill="#B0BEC5"
                />
                <path
                  id="Vector_580"
                  d="M392.136 173.705V179.223H398.382V173.705H392.136Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_581"
                  d="M392.136 138.858V144.376H398.382V138.858H392.136Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_582"
                  d="M392.136 144.376V145.138H398.382V144.376H392.136Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_583"
                  d="M392.136 138.096V138.858H398.382V138.096H392.136Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_584"
                  d="M392.136 179.223V179.985H398.382V179.223H392.136Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_585"
                  d="M392.136 172.943V173.705H398.382V172.943H392.136Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_586"
                  d="M396.929 139.119H393.59V144.114H396.929V139.119Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_587"
                  d="M396.929 173.967H393.59V178.962H396.929V173.967Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_588"
                  d="M392.381 167.026L392.136 172.943H398.382L398.138 167.026H392.381Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_589"
                  d="M392.381 151.055L392.136 145.138H398.382L398.138 151.055H392.381Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_590"
                  d="M397.828 187.046L398.382 179.985H392.136L392.689 187.046H397.828Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_591"
                  d="M397.828 131.035L398.382 138.096H392.136L392.689 131.035H397.828Z"
                  fill="#90A4AE"
                />
              </g>
              <g id="Group_50">
                <path
                  id="Vector_592"
                  d="M258.747 130L259.382 138.096V145.138L259.138 151.055V167.026L259.382 172.943V179.985L258.747 188.081H253.771L253.136 179.985V172.943L253.381 167.026V151.055L253.136 145.138V138.096L253.771 130H258.747Z"
                  fill="#B0BEC5"
                />
                <path
                  id="Vector_593"
                  d="M253.136 173.705V179.223H259.382V173.705H253.136Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_594"
                  d="M253.136 138.858V144.376H259.382V138.858H253.136Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_595"
                  d="M253.136 144.376V145.138H259.382V144.376H253.136Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_596"
                  d="M253.136 138.096V138.858H259.382V138.096H253.136Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_597"
                  d="M253.136 179.223V179.985H259.382V179.223H253.136Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_598"
                  d="M253.136 172.943V173.705H259.382V172.943H253.136Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_599"
                  d="M257.929 139.119H254.59V144.114H257.929V139.119Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_600"
                  d="M257.929 173.967H254.59V178.962H257.929V173.967Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_601"
                  d="M253.381 167.026L253.136 172.943H259.382L259.138 167.026H253.381Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_602"
                  d="M253.381 151.055L253.136 145.138H259.382L259.138 151.055H253.381Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_603"
                  d="M258.828 187.046L259.382 179.985H253.136L253.689 187.046H258.828Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_604"
                  d="M258.828 131.035L259.382 138.096H253.136L253.689 131.035H258.828Z"
                  fill="#90A4AE"
                />
              </g>
              <g id="Group_51">
                <path
                  id="Vector_605"
                  d="M119.747 130L120.382 138.096V145.138L120.138 151.055V167.026L120.382 172.943V179.985L119.747 188.081H114.771L114.136 179.985V172.943L114.381 167.026V151.055L114.136 145.138V138.096L114.771 130H119.747Z"
                  fill="#B0BEC5"
                />
                <path
                  id="Vector_606"
                  d="M114.136 173.705V179.223H120.382V173.705H114.136Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_607"
                  d="M114.136 138.858V144.376H120.382V138.858H114.136Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_608"
                  d="M114.136 144.376V145.138H120.382V144.376H114.136Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_609"
                  d="M114.136 138.096V138.858H120.382V138.096H114.136Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_610"
                  d="M114.136 179.223V179.985H120.382V179.223H114.136Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_611"
                  d="M114.136 172.943V173.705H120.382V172.943H114.136Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_612"
                  d="M118.929 139.119H115.59V144.114H118.929V139.119Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_613"
                  d="M118.929 173.967H115.59V178.962H118.929V173.967Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_614"
                  d="M114.381 167.026L114.136 172.943H120.382L120.138 167.026H114.381Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_615"
                  d="M114.381 151.055L114.136 145.138H120.382L120.138 151.055H114.381Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_616"
                  d="M119.828 187.046L120.382 179.985H114.136L114.689 187.046H119.828Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_617"
                  d="M119.828 131.035L120.382 138.096H114.136L114.689 131.035H119.828Z"
                  fill="#90A4AE"
                />
              </g>
              <g id="Group_52">
                <path
                  id="Vector_618"
                  d="M415.171 130L415.807 138.096V145.138L415.562 151.055V167.026L415.807 172.943V179.985L415.171 188.081H410.196L409.56 179.985V172.943L409.805 167.026V151.055L409.56 145.138V138.096L410.196 130H415.171Z"
                  fill="#B0BEC5"
                />
                <path
                  id="Vector_619"
                  d="M409.561 173.705V179.223H415.807V173.705H409.561Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_620"
                  d="M409.561 138.858V144.376H415.807V138.858H409.561Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_621"
                  d="M409.561 144.376V145.138H415.807V144.376H409.561Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_622"
                  d="M409.56 138.096V138.858H415.807V138.096H409.56Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_623"
                  d="M409.561 179.223V179.985H415.807V179.223H409.561Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_624"
                  d="M409.561 172.943V173.705H415.807V172.943H409.561Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_625"
                  d="M414.353 139.119H411.014V144.114H414.353V139.119Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_626"
                  d="M414.353 173.967H411.014V178.962H414.353V173.967Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_627"
                  d="M409.805 167.026L409.561 172.943H415.807L415.562 167.026H409.805Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_628"
                  d="M409.805 151.055L409.561 145.138H415.807L415.562 151.055H409.805Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_629"
                  d="M415.252 187.046L415.807 179.985H409.561L410.115 187.046H415.252Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_630"
                  d="M415.252 131.035L415.807 138.096H409.561L410.115 131.035H415.252Z"
                  fill="#90A4AE"
                />
              </g>
              <g id="Group_53">
                <path
                  id="Vector_631"
                  d="M276.171 130L276.807 138.096V145.138L276.562 151.055V167.026L276.807 172.943V179.985L276.171 188.081H271.196L270.56 179.985V172.943L270.805 167.026V151.055L270.56 145.138V138.096L271.196 130H276.171Z"
                  fill="#B0BEC5"
                />
                <path
                  id="Vector_632"
                  d="M270.561 173.705V179.223H276.807V173.705H270.561Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_633"
                  d="M270.561 138.858V144.376H276.807V138.858H270.561Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_634"
                  d="M270.561 144.376V145.138H276.807V144.376H270.561Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_635"
                  d="M270.56 138.096V138.858H276.807V138.096H270.56Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_636"
                  d="M270.561 179.223V179.985H276.807V179.223H270.561Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_637"
                  d="M270.561 172.943V173.705H276.807V172.943H270.561Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_638"
                  d="M275.353 139.119H272.014V144.114H275.353V139.119Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_639"
                  d="M275.353 173.967H272.014V178.962H275.353V173.967Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_640"
                  d="M270.805 167.026L270.561 172.943H276.807L276.562 167.026H270.805Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_641"
                  d="M270.805 151.055L270.561 145.138H276.807L276.562 151.055H270.805Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_642"
                  d="M276.252 187.046L276.807 179.985H270.561L271.115 187.046H276.252Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_643"
                  d="M276.252 131.035L276.807 138.096H270.561L271.115 131.035H276.252Z"
                  fill="#90A4AE"
                />
              </g>
              <g id="Group_54">
                <path
                  id="Vector_644"
                  d="M137.171 130L137.807 138.096V145.138L137.562 151.055V167.026L137.807 172.943V179.985L137.171 188.081H132.196L131.56 179.985V172.943L131.805 167.026V151.055L131.56 145.138V138.096L132.196 130H137.171Z"
                  fill="#B0BEC5"
                />
                <path
                  id="Vector_645"
                  d="M131.561 173.705V179.223H137.807V173.705H131.561Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_646"
                  d="M131.561 138.858V144.376H137.807V138.858H131.561Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_647"
                  d="M131.561 144.376V145.138H137.807V144.376H131.561Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_648"
                  d="M131.56 138.096V138.858H137.807V138.096H131.56Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_649"
                  d="M131.561 179.223V179.985H137.807V179.223H131.561Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_650"
                  d="M131.561 172.943V173.705H137.807V172.943H131.561Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_651"
                  d="M136.353 139.119H133.014V144.114H136.353V139.119Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_652"
                  d="M136.353 173.967H133.014V178.962H136.353V173.967Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_653"
                  d="M131.805 167.026L131.561 172.943H137.807L137.562 167.026H131.805Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_654"
                  d="M131.805 151.055L131.561 145.138H137.807L137.562 151.055H131.805Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_655"
                  d="M137.252 187.046L137.807 179.985H131.561L132.115 187.046H137.252Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_656"
                  d="M137.252 131.035L137.807 138.096H131.561L132.115 131.035H137.252Z"
                  fill="#90A4AE"
                />
              </g>
              <g id="Group_55">
                <path
                  id="Vector_657"
                  d="M421.395 139.874H282V143.359H421.395V139.874Z"
                  fill="#455A64"
                />
                <path
                  id="Vector_658"
                  d="M421.395 174.723H282V178.207H421.395V174.723Z"
                  fill="#455A64"
                />
                <path
                  id="Vector_659"
                  d="M421.395 175.356H282V177.572H421.395V175.356Z"
                  fill="#526873"
                />
                <path
                  id="Vector_660"
                  d="M421.395 140.509H282V142.725H421.395V140.509Z"
                  fill="#526873"
                />
              </g>
              <g id="Group_56">
                <path
                  id="Vector_661"
                  d="M282.395 139.874H143V143.359H282.395V139.874Z"
                  fill="#455A64"
                />
                <path
                  id="Vector_662"
                  d="M282.395 174.723H143V178.207H282.395V174.723Z"
                  fill="#455A64"
                />
                <path
                  id="Vector_663"
                  d="M282.395 175.356H143V177.572H282.395V175.356Z"
                  fill="#526873"
                />
                <path
                  id="Vector_664"
                  d="M282.395 140.509H143V142.725H282.395V140.509Z"
                  fill="#526873"
                />
              </g>
              <g id="Group_57">
                <path
                  id="Vector_665"
                  d="M143.395 139.874H4V143.359H143.395V139.874Z"
                  fill="#455A64"
                />
                <path
                  id="Vector_666"
                  d="M143.395 174.723H4V178.207H143.395V174.723Z"
                  fill="#455A64"
                />
                <path
                  id="Vector_667"
                  d="M143.395 175.356H4V177.572H143.395V175.356Z"
                  fill="#526873"
                />
                <path
                  id="Vector_668"
                  d="M143.395 140.509H4V142.725H143.395V140.509Z"
                  fill="#526873"
                />
              </g>
            </g>
            <g id="Group_58">
              <g id="Group_59">
                <g id="Group_60">
                  <path
                    id="Vector_669"
                    d="M711.246 129L711.88 137.079V144.107L711.635 150.012V165.949L711.88 171.854V178.882L711.246 186.961H706.28L705.646 178.882V171.854L705.89 165.949V150.012L705.646 144.107V137.079L706.28 129H711.246Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_670"
                    d="M705.646 172.615V178.121H711.88V172.615H705.646Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_671"
                    d="M705.646 137.84V143.346H711.88V137.84H705.646Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_672"
                    d="M705.646 143.346V144.107H711.88V143.346H705.646Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_673"
                    d="M705.646 137.079V137.84H711.879V137.079H705.646Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_674"
                    d="M705.646 178.121V178.881H711.88V178.121H705.646Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_675"
                    d="M705.646 171.854V172.615H711.88V171.854H705.646Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_676"
                    d="M710.429 138.1H707.097V143.085H710.429V138.1Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_677"
                    d="M710.429 172.877H707.097V177.861H710.429V172.877Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_678"
                    d="M705.89 165.949L705.646 171.854H711.88L711.636 165.949H705.89Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_679"
                    d="M705.89 150.012L705.646 144.107H711.88L711.636 150.012H705.89Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_680"
                    d="M711.326 185.929L711.88 178.882H705.646L706.198 185.929H711.326Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_681"
                    d="M711.326 130.033L711.88 137.079H705.646L706.198 130.033H711.326Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_61">
                  <path
                    id="Vector_682"
                    d="M728.634 129L729.268 137.079V144.107L729.024 150.012V165.949L729.268 171.854V178.882L728.634 186.961H723.669L723.035 178.882V171.854L723.279 165.949V150.012L723.035 144.107V137.079L723.669 129H728.634Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_683"
                    d="M723.035 172.615V178.121H729.268V172.615H723.035Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_684"
                    d="M723.035 137.84V143.346H729.268V137.84H723.035Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_685"
                    d="M723.035 143.346V144.106H729.268V143.346H723.035Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_686"
                    d="M723.035 137.079V137.84H729.268V137.079H723.035Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_687"
                    d="M723.035 178.121V178.881H729.268V178.121H723.035Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_688"
                    d="M723.035 171.854V172.615H729.268V171.854H723.035Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_689"
                    d="M727.817 138.1H724.485V143.085H727.817V138.1Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_690"
                    d="M727.817 172.877H724.485V177.861H727.817V172.877Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_691"
                    d="M723.279 165.949L723.035 171.854H729.268L729.024 165.949H723.279Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_692"
                    d="M723.279 150.012L723.035 144.107H729.268L729.024 150.012H723.279Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_693"
                    d="M728.715 185.928L729.268 178.882H723.035L723.586 185.928H728.715Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_694"
                    d="M728.715 130.033L729.268 137.079H723.035L723.586 130.033H728.715Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_62">
                  <path
                    id="Vector_695"
                    d="M746.023 129L746.657 137.079V144.107L746.412 150.012V165.949L746.657 171.854V178.882L746.023 186.961H741.057L740.423 178.882V171.854L740.667 165.949V150.012L740.423 144.107V137.079L741.057 129H746.023Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_696"
                    d="M740.423 172.615V178.121H746.657V172.615H740.423Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_697"
                    d="M740.423 137.84V143.346H746.657V137.84H740.423Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_698"
                    d="M740.423 143.346V144.106H746.657V143.346H740.423Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_699"
                    d="M740.423 137.079V137.84H746.656V137.079H740.423Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_700"
                    d="M740.423 178.121V178.881H746.657V178.121H740.423Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_701"
                    d="M740.423 171.854V172.615H746.657V171.854H740.423Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_702"
                    d="M745.206 138.1H741.874V143.085H745.206V138.1Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_703"
                    d="M745.206 172.877H741.874V177.861H745.206V172.877Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_704"
                    d="M740.667 165.949L740.423 171.854H746.657L746.412 165.949H740.667Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_705"
                    d="M740.667 150.012L740.423 144.107H746.657L746.412 150.012H740.667Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_706"
                    d="M746.103 185.928L746.657 178.882H740.423L740.976 185.928H746.103Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_707"
                    d="M746.103 130.033L746.657 137.079H740.423L740.976 130.033H746.103Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_63">
                  <path
                    id="Vector_708"
                    d="M763.411 129L764.045 137.079V144.107L763.8 150.012V165.949L764.045 171.854V178.882L763.411 186.961H758.445L757.811 178.882V171.854L758.055 165.949V150.012L757.811 144.107V137.079L758.445 129H763.411Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_709"
                    d="M757.811 172.615V178.121H764.045V172.615H757.811Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_710"
                    d="M757.811 137.84V143.346H764.045V137.84H757.811Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_711"
                    d="M757.811 143.346V144.106H764.045V143.346H757.811Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_712"
                    d="M757.811 137.079V137.84H764.045V137.079H757.811Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_713"
                    d="M757.811 178.121V178.881H764.045V178.121H757.811Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_714"
                    d="M757.811 171.854V172.615H764.045V171.854H757.811Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_715"
                    d="M762.594 138.1H759.262V143.085H762.594V138.1Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_716"
                    d="M762.594 172.877H759.262V177.861H762.594V172.877Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_717"
                    d="M758.056 165.949L757.811 171.854H764.045L763.801 165.949H758.056Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_718"
                    d="M758.056 150.012L757.811 144.107H764.045L763.801 150.012H758.056Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_719"
                    d="M763.492 185.928L764.045 178.882H757.811L758.363 185.928H763.492Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_720"
                    d="M763.492 130.033L764.045 137.079H757.811L758.363 130.033H763.492Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_64">
                  <path
                    id="Vector_721"
                    d="M780.799 129L781.433 137.079V144.107L781.189 150.012V165.949L781.433 171.854V178.882L780.799 186.961H775.834L775.2 178.882V171.854L775.444 165.949V150.012L775.2 144.107V137.079L775.834 129H780.799Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_722"
                    d="M775.2 172.615V178.121H781.433V172.615H775.2Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_723"
                    d="M775.2 137.84V143.346H781.433V137.84H775.2Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_724"
                    d="M775.2 143.346V144.106H781.433V143.346H775.2Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_725"
                    d="M775.2 137.079V137.84H781.433V137.079H775.2Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_726"
                    d="M775.2 178.121V178.881H781.433V178.121H775.2Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_727"
                    d="M775.2 171.854V172.615H781.433V171.854H775.2Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_728"
                    d="M779.982 138.1H776.651V143.085H779.982V138.1Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_729"
                    d="M779.982 172.877H776.651V177.861H779.982V172.877Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_730"
                    d="M775.444 165.949L775.2 171.854H781.433L781.189 165.949H775.444Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_731"
                    d="M775.444 150.012L775.2 144.107H781.433L781.189 150.012H775.444Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_732"
                    d="M780.88 185.928L781.433 178.882H775.2L775.751 185.928H780.88Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_733"
                    d="M780.88 130.033L781.433 137.079H775.2L775.751 130.033H780.88Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_65">
                  <path
                    id="Vector_734"
                    d="M798.188 129L798.822 137.079V144.107L798.577 150.012V165.949L798.822 171.854V178.882L798.188 186.961H793.222L792.588 178.882V171.854L792.832 165.949V150.012L792.588 144.107V137.079L793.222 129H798.188Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_735"
                    d="M792.588 172.615V178.121H798.822V172.615H792.588Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_736"
                    d="M792.588 137.84V143.346H798.822V137.84H792.588Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_737"
                    d="M792.588 143.346V144.106H798.822V143.346H792.588Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_738"
                    d="M792.588 137.079V137.84H798.822V137.079H792.588Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_739"
                    d="M792.588 178.121V178.881H798.822V178.121H792.588Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_740"
                    d="M792.588 171.854V172.615H798.822V171.854H792.588Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_741"
                    d="M797.371 138.1H794.039V143.085H797.371V138.1Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_742"
                    d="M797.371 172.877H794.039V177.861H797.371V172.877Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_743"
                    d="M792.832 165.949L792.588 171.854H798.822L798.578 165.949H792.832Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_744"
                    d="M792.832 150.012L792.588 144.107H798.822L798.578 150.012H792.832Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_745"
                    d="M798.268 185.928L798.822 178.882H792.588L793.14 185.928H798.268Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_746"
                    d="M798.268 130.033L798.822 137.079H792.588L793.14 130.033H798.268Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_66">
                  <path
                    id="Vector_747"
                    d="M815.576 129L816.21 137.079V144.107L815.966 150.012V165.949L816.21 171.854V178.882L815.576 186.961H810.611L809.977 178.882V171.854L810.221 165.949V150.012L809.977 144.107V137.079L810.611 129H815.576Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_748"
                    d="M809.977 172.615V178.121H816.21V172.615H809.977Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_749"
                    d="M809.977 137.84V143.346H816.21V137.84H809.977Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_750"
                    d="M809.977 143.346V144.106H816.21V143.346H809.977Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_751"
                    d="M809.976 137.079V137.84H816.21V137.079H809.976Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_752"
                    d="M809.977 178.121V178.881H816.21V178.121H809.977Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_753"
                    d="M809.977 171.854V172.615H816.21V171.854H809.977Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_754"
                    d="M814.759 138.1H811.427V143.085H814.759V138.1Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_755"
                    d="M814.759 172.877H811.427V177.861H814.759V172.877Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_756"
                    d="M810.221 165.949L809.977 171.854H816.21L815.966 165.949H810.221Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_757"
                    d="M810.221 150.012L809.977 144.107H816.21L815.966 150.012H810.221Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_758"
                    d="M815.657 185.928L816.21 178.882H809.977L810.528 185.928H815.657Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_759"
                    d="M815.657 130.033L816.21 137.079H809.977L810.528 130.033H815.657Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_67">
                  <path
                    id="Vector_760"
                    d="M832.964 129L833.598 137.079V144.107L833.354 150.012V165.949L833.598 171.854V178.882L832.964 186.961H827.999L827.365 178.882V171.854L827.609 165.949V150.012L827.365 144.107V137.079L827.999 129H832.964Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_761"
                    d="M827.365 172.615V178.121H833.599V172.615H827.365Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_762"
                    d="M827.365 137.84V143.346H833.599V137.84H827.365Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_763"
                    d="M827.365 143.346V144.106H833.599V143.346H827.365Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_764"
                    d="M827.365 137.079V137.84H833.598V137.079H827.365Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_765"
                    d="M827.365 178.121V178.881H833.599V178.121H827.365Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_766"
                    d="M827.365 171.854V172.615H833.599V171.854H827.365Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_767"
                    d="M832.148 138.1H828.816V143.085H832.148V138.1Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_768"
                    d="M832.148 172.877H828.816V177.861H832.148V172.877Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_769"
                    d="M827.609 165.949L827.365 171.854H833.599L833.354 165.949H827.609Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_770"
                    d="M827.609 150.012L827.365 144.107H833.599L833.354 150.012H827.609Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_771"
                    d="M833.045 185.928L833.599 178.882H827.365L827.918 185.928H833.045Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_772"
                    d="M833.045 130.033L833.599 137.079H827.365L827.918 130.033H833.045Z"
                    fill="#90A4AE"
                  />
                </g>
              </g>
              <g id="Group_68">
                <path
                  id="Vector_773"
                  d="M839.175 138.853H700.068V142.331H839.175V138.853Z"
                  fill="#455A64"
                />
                <path
                  id="Vector_774"
                  d="M839.175 173.63H700.068V177.108H839.175V173.63Z"
                  fill="#455A64"
                />
                <path
                  id="Vector_775"
                  d="M839.175 174.263H700.068V176.474H839.175V174.263Z"
                  fill="#526873"
                />
                <path
                  id="Vector_776"
                  d="M839.175 139.487H700.068V141.699H839.175V139.487Z"
                  fill="#526873"
                />
              </g>
            </g>
            <g id="Group_69">
              <g id="Group_70">
                <g id="Group_71">
                  <path
                    id="Vector_777"
                    d="M849.149 129L849.783 137.079V144.107L849.539 150.012V165.949L849.783 171.854V178.882L849.149 186.961H844.184L843.55 178.882V171.854L843.794 165.949V150.012L843.55 144.107V137.079L844.184 129H849.149Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_778"
                    d="M843.55 172.615V178.121H849.783V172.615H843.55Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_779"
                    d="M843.55 137.84V143.346H849.783V137.84H843.55Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_780"
                    d="M843.55 143.346V144.107H849.783V143.346H843.55Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_781"
                    d="M843.55 137.079V137.84H849.783V137.079H843.55Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_782"
                    d="M843.55 178.121V178.881H849.783V178.121H843.55Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_783"
                    d="M843.55 171.854V172.615H849.783V171.854H843.55Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_784"
                    d="M848.332 138.1H845V143.085H848.332V138.1Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_785"
                    d="M848.332 172.877H845V177.861H848.332V172.877Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_786"
                    d="M843.794 165.949L843.55 171.854H849.783L849.539 165.949H843.794Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_787"
                    d="M843.794 150.012L843.55 144.107H849.783L849.539 150.012H843.794Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_788"
                    d="M849.23 185.929L849.783 178.882H843.55L844.101 185.929H849.23Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_789"
                    d="M849.23 130.033L849.783 137.079H843.55L844.101 130.033H849.23Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_72">
                  <path
                    id="Vector_790"
                    d="M866.538 129L867.172 137.079V144.107L866.928 150.012V165.949L867.172 171.854V178.882L866.538 186.961H861.572L860.938 178.882V171.854L861.182 165.949V150.012L860.938 144.107V137.079L861.572 129H866.538Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_791"
                    d="M860.938 172.615V178.121H867.172V172.615H860.938Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_792"
                    d="M860.938 137.84V143.346H867.172V137.84H860.938Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_793"
                    d="M860.938 143.346V144.106H867.172V143.346H860.938Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_794"
                    d="M860.938 137.079V137.84H867.172V137.079H860.938Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_795"
                    d="M860.938 178.121V178.881H867.172V178.121H860.938Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_796"
                    d="M860.938 171.854V172.615H867.172V171.854H860.938Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_797"
                    d="M865.721 138.1H862.389V143.085H865.721V138.1Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_798"
                    d="M865.721 172.877H862.389V177.861H865.721V172.877Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_799"
                    d="M861.182 165.949L860.938 171.854H867.172L866.928 165.949H861.182Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_800"
                    d="M861.182 150.012L860.938 144.107H867.172L866.928 150.012H861.182Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_801"
                    d="M866.618 185.928L867.172 178.882H860.938L861.49 185.928H866.618Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_802"
                    d="M866.618 130.033L867.172 137.079H860.938L861.49 130.033H866.618Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_73">
                  <path
                    id="Vector_803"
                    d="M883.926 129L884.56 137.079V144.107L884.316 150.012V165.949L884.56 171.854V178.882L883.926 186.961H878.961L878.327 178.882V171.854L878.571 165.949V150.012L878.327 144.107V137.079L878.961 129H883.926Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_804"
                    d="M878.327 172.615V178.121H884.56V172.615H878.327Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_805"
                    d="M878.327 137.84V143.346H884.56V137.84H878.327Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_806"
                    d="M878.327 143.346V144.106H884.56V143.346H878.327Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_807"
                    d="M878.327 137.079V137.84H884.56V137.079H878.327Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_808"
                    d="M878.327 178.121V178.881H884.56V178.121H878.327Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_809"
                    d="M878.327 171.854V172.615H884.56V171.854H878.327Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_810"
                    d="M883.109 138.1H879.777V143.085H883.109V138.1Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_811"
                    d="M883.109 172.877H879.777V177.861H883.109V172.877Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_812"
                    d="M878.571 165.949L878.327 171.854H884.56L884.316 165.949H878.571Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_813"
                    d="M878.571 150.012L878.327 144.107H884.56L884.316 150.012H878.571Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_814"
                    d="M884.007 185.928L884.56 178.882H878.327L878.88 185.928H884.007Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_815"
                    d="M884.007 130.033L884.56 137.079H878.327L878.88 130.033H884.007Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_74">
                  <path
                    id="Vector_816"
                    d="M901.314 129L901.948 137.079V144.107L901.704 150.012V165.949L901.948 171.854V178.882L901.314 186.961H896.349L895.715 178.882V171.854L895.959 165.949V150.012L895.715 144.107V137.079L896.349 129H901.314Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_817"
                    d="M895.715 172.615V178.121H901.948V172.615H895.715Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_818"
                    d="M895.715 137.84V143.346H901.948V137.84H895.715Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_819"
                    d="M895.715 143.346V144.106H901.948V143.346H895.715Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_820"
                    d="M895.715 137.079V137.84H901.948V137.079H895.715Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_821"
                    d="M895.715 178.121V178.881H901.948V178.121H895.715Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_822"
                    d="M895.715 171.854V172.615H901.948V171.854H895.715Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_823"
                    d="M900.498 138.1H897.166V143.085H900.498V138.1Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_824"
                    d="M900.498 172.877H897.166V177.861H900.498V172.877Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_825"
                    d="M895.959 165.949L895.715 171.854H901.948L901.704 165.949H895.959Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_826"
                    d="M895.959 150.012L895.715 144.107H901.948L901.704 150.012H895.959Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_827"
                    d="M901.395 185.928L901.948 178.882H895.715L896.266 185.928H901.395Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_828"
                    d="M901.395 130.033L901.948 137.079H895.715L896.266 130.033H901.395Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_75">
                  <path
                    id="Vector_829"
                    d="M918.703 129L919.337 137.079V144.107L919.093 150.012V165.949L919.337 171.854V178.882L918.703 186.961H913.737L913.103 178.882V171.854L913.347 165.949V150.012L913.103 144.107V137.079L913.737 129H918.703Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_830"
                    d="M913.103 172.615V178.121H919.337V172.615H913.103Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_831"
                    d="M913.103 137.84V143.346H919.337V137.84H913.103Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_832"
                    d="M913.103 143.346V144.106H919.337V143.346H913.103Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_833"
                    d="M913.103 137.079V137.84H919.337V137.079H913.103Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_834"
                    d="M913.103 178.121V178.881H919.337V178.121H913.103Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_835"
                    d="M913.103 171.854V172.615H919.337V171.854H913.103Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_836"
                    d="M917.886 138.1H914.554V143.085H917.886V138.1Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_837"
                    d="M917.886 172.877H914.554V177.861H917.886V172.877Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_838"
                    d="M913.348 165.949L913.103 171.854H919.337L919.093 165.949H913.348Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_839"
                    d="M913.348 150.012L913.103 144.107H919.337L919.093 150.012H913.348Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_840"
                    d="M918.784 185.928L919.337 178.882H913.103L913.655 185.928H918.784Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_841"
                    d="M918.784 130.033L919.337 137.079H913.103L913.655 130.033H918.784Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_76">
                  <path
                    id="Vector_842"
                    d="M936.091 129L936.725 137.079V144.107L936.481 150.012V165.949L936.725 171.854V178.882L936.091 186.961H931.126L930.492 178.882V171.854L930.736 165.949V150.012L930.492 144.107V137.079L931.126 129H936.091Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_843"
                    d="M930.492 172.615V178.121H936.725V172.615H930.492Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_844"
                    d="M930.492 137.84V143.346H936.725V137.84H930.492Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_845"
                    d="M930.492 143.346V144.106H936.725V143.346H930.492Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_846"
                    d="M930.492 137.079V137.84H936.725V137.079H930.492Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_847"
                    d="M930.492 178.121V178.881H936.725V178.121H930.492Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_848"
                    d="M930.492 171.854V172.615H936.725V171.854H930.492Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_849"
                    d="M935.274 138.1H931.943V143.085H935.274V138.1Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_850"
                    d="M935.274 172.877H931.943V177.861H935.274V172.877Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_851"
                    d="M930.736 165.949L930.492 171.854H936.725L936.481 165.949H930.736Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_852"
                    d="M930.736 150.012L930.492 144.107H936.725L936.481 150.012H930.736Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_853"
                    d="M936.172 185.928L936.725 178.882H930.492L931.043 185.928H936.172Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_854"
                    d="M936.172 130.033L936.725 137.079H930.492L931.043 130.033H936.172Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_77">
                  <path
                    id="Vector_855"
                    d="M953.48 129L954.114 137.079V144.107L953.869 150.012V165.949L954.114 171.854V178.882L953.48 186.961H948.514L947.88 178.882V171.854L948.124 165.949V150.012L947.88 144.107V137.079L948.514 129H953.48Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_856"
                    d="M947.88 172.615V178.121H954.114V172.615H947.88Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_857"
                    d="M947.88 137.84V143.346H954.114V137.84H947.88Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_858"
                    d="M947.88 143.346V144.106H954.114V143.346H947.88Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_859"
                    d="M947.88 137.079V137.84H954.114V137.079H947.88Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_860"
                    d="M947.88 178.121V178.881H954.114V178.121H947.88Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_861"
                    d="M947.88 171.854V172.615H954.114V171.854H947.88Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_862"
                    d="M952.663 138.1H949.331V143.085H952.663V138.1Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_863"
                    d="M952.663 172.877H949.331V177.861H952.663V172.877Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_864"
                    d="M948.124 165.949L947.88 171.854H954.114L953.87 165.949H948.124Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_865"
                    d="M948.124 150.012L947.88 144.107H954.114L953.87 150.012H948.124Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_866"
                    d="M953.56 185.928L954.114 178.882H947.88L948.432 185.928H953.56Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_867"
                    d="M953.56 130.033L954.114 137.079H947.88L948.432 130.033H953.56Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_78">
                  <path
                    id="Vector_868"
                    d="M970.868 129L971.502 137.079V144.107L971.258 150.012V165.949L971.502 171.854V178.882L970.868 186.961H965.903L965.269 178.882V171.854L965.513 165.949V150.012L965.269 144.107V137.079L965.903 129H970.868Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_869"
                    d="M965.269 172.615V178.121H971.502V172.615H965.269Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_870"
                    d="M965.269 137.84V143.346H971.502V137.84H965.269Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_871"
                    d="M965.269 143.346V144.106H971.502V143.346H965.269Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_872"
                    d="M965.268 137.079V137.84H971.502V137.079H965.268Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_873"
                    d="M965.269 178.121V178.881H971.502V178.121H965.269Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_874"
                    d="M965.269 171.854V172.615H971.502V171.854H965.269Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_875"
                    d="M970.051 138.1H966.719V143.085H970.051V138.1Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_876"
                    d="M970.051 172.877H966.719V177.861H970.051V172.877Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_877"
                    d="M965.513 165.949L965.269 171.854H971.502L971.258 165.949H965.513Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_878"
                    d="M965.513 150.012L965.269 144.107H971.502L971.258 150.012H965.513Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_879"
                    d="M970.949 185.928L971.502 178.882H965.269L965.822 185.928H970.949Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_880"
                    d="M970.949 130.033L971.502 137.079H965.269L965.822 130.033H970.949Z"
                    fill="#90A4AE"
                  />
                </g>
              </g>
              <g id="Group_79">
                <path
                  id="Vector_881"
                  d="M977.079 138.853H837.971V142.331H977.079V138.853Z"
                  fill="#455A64"
                />
                <path
                  id="Vector_882"
                  d="M977.079 173.63H837.971V177.108H977.079V173.63Z"
                  fill="#455A64"
                />
                <path
                  id="Vector_883"
                  d="M977.079 174.263H837.971V176.474H977.079V174.263Z"
                  fill="#526873"
                />
                <path
                  id="Vector_884"
                  d="M977.079 139.487H837.971V141.699H977.079V139.487Z"
                  fill="#526873"
                />
              </g>
            </g>
            <g id="Group_80">
              <g id="Group_81">
                <g id="Group_82">
                  <path
                    id="Vector_885"
                    d="M918.478 130.507L919.112 138.587V145.614L918.868 151.519V167.457L919.112 173.362V180.389L918.478 188.468H913.512L912.878 180.389V173.362L913.122 167.457V151.519L912.878 145.614V138.587L913.512 130.507H918.478Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_886"
                    d="M912.878 174.122V179.628H919.112V174.122H912.878Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_887"
                    d="M912.878 139.347V144.853H919.112V139.347H912.878Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_888"
                    d="M912.878 144.853V145.614H919.112V144.853H912.878Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_889"
                    d="M912.878 138.586V139.347H919.112V138.586H912.878Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_890"
                    d="M912.878 179.628V180.389H919.112V179.628H912.878Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_891"
                    d="M912.878 173.361V174.122H919.112V173.361H912.878Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_892"
                    d="M917.661 139.607H914.329V144.592H917.661V139.607Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_893"
                    d="M917.661 174.384H914.329V179.368H917.661V174.384Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_894"
                    d="M913.123 167.457L912.878 173.362H919.112L918.868 167.457H913.123Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_895"
                    d="M913.123 151.519L912.878 145.614H919.112L918.868 151.519H913.123Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_896"
                    d="M918.559 187.436L919.112 180.389H912.878L913.43 187.436H918.559Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_897"
                    d="M918.559 131.54L919.112 138.587H912.878L913.43 131.54H918.559Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_83">
                  <path
                    id="Vector_898"
                    d="M935.866 130.507L936.5 138.587V145.614L936.256 151.519V167.457L936.5 173.362V180.389L935.866 188.468H930.901L930.267 180.389V173.362L930.511 167.457V151.519L930.267 145.614V138.587L930.901 130.507H935.866Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_899"
                    d="M930.267 174.122V179.628H936.5V174.122H930.267Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_900"
                    d="M930.267 139.347V144.853H936.5V139.347H930.267Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_901"
                    d="M930.267 144.853V145.614H936.5V144.853H930.267Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_902"
                    d="M930.267 138.586V139.347H936.5V138.586H930.267Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_903"
                    d="M930.267 179.628V180.389H936.5V179.628H930.267Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_904"
                    d="M930.267 173.361V174.122H936.5V173.361H930.267Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_905"
                    d="M935.049 139.607H931.718V144.592H935.049V139.607Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_906"
                    d="M935.049 174.384H931.718V179.368H935.049V174.384Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_907"
                    d="M930.511 167.457L930.267 173.362H936.5L936.256 167.457H930.511Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_908"
                    d="M930.511 151.519L930.267 145.614H936.5L936.256 151.519H930.511Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_909"
                    d="M935.947 187.436L936.5 180.389H930.267L930.818 187.436H935.947Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_910"
                    d="M935.947 131.54L936.5 138.587H930.267L930.818 131.54H935.947Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_84">
                  <path
                    id="Vector_911"
                    d="M953.255 130.507L953.889 138.587V145.614L953.644 151.519V167.457L953.889 173.362V180.389L953.255 188.468H948.289L947.655 180.389V173.362L947.899 167.457V151.519L947.655 145.614V138.587L948.289 130.507H953.255Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_912"
                    d="M947.655 174.122V179.628H953.889V174.122H947.655Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_913"
                    d="M947.655 139.347V144.853H953.889V139.347H947.655Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_914"
                    d="M947.655 144.853V145.614H953.889V144.853H947.655Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_915"
                    d="M947.655 138.586V139.347H953.889V138.586H947.655Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_916"
                    d="M947.655 179.628V180.389H953.889V179.628H947.655Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_917"
                    d="M947.655 173.361V174.122H953.889V173.361H947.655Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_918"
                    d="M952.438 139.607H949.106V144.592H952.438V139.607Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_919"
                    d="M952.438 174.384H949.106V179.368H952.438V174.384Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_920"
                    d="M947.899 167.457L947.655 173.362H953.889L953.645 167.457H947.899Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_921"
                    d="M947.899 151.519L947.655 145.614H953.889L953.645 151.519H947.899Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_922"
                    d="M953.335 187.436L953.889 180.389H947.655L948.209 187.436H953.335Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_923"
                    d="M953.335 131.54L953.889 138.587H947.655L948.209 131.54H953.335Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_85">
                  <path
                    id="Vector_924"
                    d="M970.643 130.507L971.277 138.587V145.614L971.033 151.519V167.457L971.277 173.362V180.389L970.643 188.468H965.677L965.043 180.389V173.362L965.287 167.457V151.519L965.043 145.614V138.587L965.677 130.507H970.643Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_925"
                    d="M965.043 174.122V179.628H971.277V174.122H965.043Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_926"
                    d="M965.043 139.347V144.853H971.277V139.347H965.043Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_927"
                    d="M965.043 144.853V145.614H971.277V144.853H965.043Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_928"
                    d="M965.043 138.586V139.347H971.277V138.586H965.043Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_929"
                    d="M965.043 179.628V180.389H971.277V179.628H965.043Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_930"
                    d="M965.043 173.361V174.122H971.277V173.361H965.043Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_931"
                    d="M969.826 139.607H966.494V144.592H969.826V139.607Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_932"
                    d="M969.826 174.384H966.494V179.368H969.826V174.384Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_933"
                    d="M965.288 167.457L965.043 173.362H971.277L971.033 167.457H965.288Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_934"
                    d="M965.288 151.519L965.043 145.614H971.277L971.033 151.519H965.288Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_935"
                    d="M970.724 187.436L971.277 180.389H965.043L965.595 187.436H970.724Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_936"
                    d="M970.724 131.54L971.277 138.587H965.043L965.595 131.54H970.724Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_86">
                  <path
                    id="Vector_937"
                    d="M988.031 130.507L988.665 138.587V145.614L988.421 151.519V167.457L988.665 173.362V180.389L988.031 188.468H983.066L982.432 180.389V173.362L982.676 167.457V151.519L982.432 145.614V138.587L983.066 130.507H988.031Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_938"
                    d="M982.432 174.122V179.628H988.665V174.122H982.432Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_939"
                    d="M982.432 139.347V144.853H988.665V139.347H982.432Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_940"
                    d="M982.432 144.853V145.614H988.665V144.853H982.432Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_941"
                    d="M982.432 138.586V139.347H988.665V138.586H982.432Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_942"
                    d="M982.432 179.628V180.389H988.665V179.628H982.432Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_943"
                    d="M982.432 173.361V174.122H988.665V173.361H982.432Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_944"
                    d="M987.214 139.607H983.883V144.592H987.214V139.607Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_945"
                    d="M987.214 174.384H983.883V179.368H987.214V174.384Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_946"
                    d="M982.676 167.457L982.432 173.362H988.665L988.421 167.457H982.676Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_947"
                    d="M982.676 151.519L982.432 145.614H988.665L988.421 151.519H982.676Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_948"
                    d="M988.112 187.436L988.665 180.389H982.432L982.984 187.436H988.112Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_949"
                    d="M988.112 131.54L988.665 138.587H982.432L982.984 131.54H988.112Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_87">
                  <path
                    id="Vector_950"
                    d="M1005.42 130.507L1006.05 138.587V145.614L1005.81 151.519V167.457L1006.05 173.362V180.389L1005.42 188.468H1000.45L999.82 180.389V173.362L1000.06 167.457V151.519L999.82 145.614V138.587L1000.45 130.507H1005.42Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_951"
                    d="M999.82 174.122V179.628H1006.05V174.122H999.82Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_952"
                    d="M999.82 139.347V144.853H1006.05V139.347H999.82Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_953"
                    d="M999.82 144.853V145.614H1006.05V144.853H999.82Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_954"
                    d="M999.82 138.586V139.347H1006.05V138.586H999.82Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_955"
                    d="M999.82 179.628V180.389H1006.05V179.628H999.82Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_956"
                    d="M999.82 173.361V174.122H1006.05V173.361H999.82Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_957"
                    d="M1004.6 139.607H1001.27V144.592H1004.6V139.607Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_958"
                    d="M1004.6 174.384H1001.27V179.368H1004.6V174.384Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_959"
                    d="M1000.06 167.457L999.82 173.362H1006.05L1005.81 167.457H1000.06Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_960"
                    d="M1000.06 151.519L999.82 145.614H1006.05L1005.81 151.519H1000.06Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_961"
                    d="M1005.5 187.436L1006.05 180.389H999.82L1000.37 187.436H1005.5Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_962"
                    d="M1005.5 131.54L1006.05 138.587H999.82L1000.37 131.54H1005.5Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_88">
                  <path
                    id="Vector_963"
                    d="M1022.81 130.507L1023.44 138.587V145.614L1023.2 151.519V167.457L1023.44 173.362V180.389L1022.81 188.468H1017.84L1017.21 180.389V173.362L1017.45 167.457V151.519L1017.21 145.614V138.587L1017.84 130.507H1022.81Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_964"
                    d="M1017.21 174.122V179.628H1023.44V174.122H1017.21Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_965"
                    d="M1017.21 139.347V144.853H1023.44V139.347H1017.21Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_966"
                    d="M1017.21 144.853V145.614H1023.44V144.853H1017.21Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_967"
                    d="M1017.21 138.586V139.347H1023.44V138.586H1017.21Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_968"
                    d="M1017.21 179.628V180.389H1023.44V179.628H1017.21Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_969"
                    d="M1017.21 173.361V174.122H1023.44V173.361H1017.21Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_970"
                    d="M1021.99 139.607H1018.66V144.592H1021.99V139.607Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_971"
                    d="M1021.99 174.384H1018.66V179.368H1021.99V174.384Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_972"
                    d="M1017.45 167.457L1017.21 173.362H1023.44L1023.2 167.457H1017.45Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_973"
                    d="M1017.45 151.519L1017.21 145.614H1023.44L1023.2 151.519H1017.45Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_974"
                    d="M1022.89 187.436L1023.44 180.389H1017.21L1017.76 187.436H1022.89Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_975"
                    d="M1022.89 131.54L1023.44 138.587H1017.21L1017.76 131.54H1022.89Z"
                    fill="#90A4AE"
                  />
                </g>
                <g id="Group_89">
                  <path
                    id="Vector_976"
                    d="M1040.2 130.507L1040.83 138.587V145.614L1040.59 151.519V167.457L1040.83 173.362V180.389L1040.2 188.468H1035.23L1034.6 180.389V173.362L1034.84 167.457V151.519L1034.6 145.614V138.587L1035.23 130.507H1040.2Z"
                    fill="#B0BEC5"
                  />
                  <path
                    id="Vector_977"
                    d="M1034.6 174.122V179.628H1040.83V174.122H1034.6Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_978"
                    d="M1034.6 139.347V144.853H1040.83V139.347H1034.6Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_979"
                    d="M1034.6 144.853V145.614H1040.83V144.853H1034.6Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_980"
                    d="M1034.6 138.586V139.347H1040.83V138.586H1034.6Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_981"
                    d="M1034.6 179.628V180.389H1040.83V179.628H1034.6Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_982"
                    d="M1034.6 173.361V174.122H1040.83V173.361H1034.6Z"
                    fill="#CFD8DC"
                  />
                  <path
                    id="Vector_983"
                    d="M1039.38 139.607H1036.05V144.592H1039.38V139.607Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_984"
                    d="M1039.38 174.384H1036.05V179.368H1039.38V174.384Z"
                    fill="#37474F"
                  />
                  <path
                    id="Vector_985"
                    d="M1034.84 167.457L1034.6 173.362H1040.83L1040.59 167.457H1034.84Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_986"
                    d="M1034.84 151.519L1034.6 145.614H1040.83L1040.59 151.519H1034.84Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_987"
                    d="M1040.28 187.436L1040.83 180.389H1034.6L1035.15 187.436H1040.28Z"
                    fill="#90A4AE"
                  />
                  <path
                    id="Vector_988"
                    d="M1040.28 131.54L1040.83 138.587H1034.6L1035.15 131.54H1040.28Z"
                    fill="#90A4AE"
                  />
                </g>
              </g>
              <g id="Group_90">
                <path
                  id="Vector_989"
                  d="M1046.41 140.361H907.3V143.838H1046.41V140.361Z"
                  fill="#455A64"
                />
                <path
                  id="Vector_990"
                  d="M1046.41 175.137H907.3V178.615H1046.41V175.137Z"
                  fill="#455A64"
                />
                <path
                  id="Vector_991"
                  d="M1046.41 175.77H907.3V177.981H1046.41V175.77Z"
                  fill="#526873"
                />
                <path
                  id="Vector_992"
                  d="M1046.41 140.995H907.3V143.206H1046.41V140.995Z"
                  fill="#526873"
                />
              </g>
            </g>
            <g id="Group_91">
              <path
                id="Vector_993"
                d="M729.156 273.779L729.79 265.699V248.572L729.546 242.667V238.146L729.79 232.241V215.115L729.156 207.035H724.19L723.556 215.115V232.241L723.801 238.146V242.667L723.556 248.572V265.699L724.19 273.779H729.156Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_994"
                d="M723.801 238.146L723.556 232.241H729.79L729.546 238.146H723.801Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_995"
                d="M723.801 242.667L723.556 248.572H729.79L729.546 242.667H723.801Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_996"
                d="M729.237 208.068L729.79 215.115H723.556L724.11 208.068H729.237Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_997"
                d="M729.237 272.746L729.79 265.699H723.556L724.11 272.746H729.237Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_92">
              <path
                id="Vector_998"
                d="M746.544 279.87L747.178 271.79V254.664L746.934 248.759V244.238L747.178 238.331V221.206L746.544 213.127H741.579L740.945 221.206V238.331L741.189 244.238V248.759L740.945 254.664V271.79L741.579 279.87H746.544Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_999"
                d="M741.189 244.238L740.945 238.333H747.178L746.934 244.238H741.189Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1000"
                d="M741.189 248.759L740.945 254.664H747.178L746.934 248.759H741.189Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1001"
                d="M746.625 214.158L747.178 221.206H740.945L741.496 214.158H746.625Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1002"
                d="M746.625 278.837L747.178 271.791H740.945L741.496 278.837H746.625Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_93">
              <path
                id="Vector_1003"
                d="M763.932 285.959L764.566 277.88V260.753L764.322 254.848V250.327L764.566 244.422V227.296L763.932 219.216H758.967L758.333 227.296V244.422L758.577 250.327V254.848L758.333 260.753V277.88L758.967 285.959H763.932Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_1004"
                d="M758.577 250.327L758.333 244.422H764.566L764.322 250.327H758.577Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1005"
                d="M758.577 254.848L758.333 260.753H764.566L764.322 254.848H758.577Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1006"
                d="M764.013 220.249L764.566 227.295H758.333L758.885 220.249H764.013Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1007"
                d="M764.013 284.927L764.566 277.88H758.333L758.885 284.927H764.013Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_94">
              <path
                id="Vector_1008"
                d="M781.321 291.61L781.955 283.53V266.404L781.711 260.498V255.978L781.955 250.073V232.946L781.321 224.866H776.356L775.721 232.946V250.073L775.966 255.978V260.498L775.721 266.404V283.53L776.356 291.61H781.321Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_1009"
                d="M775.966 255.977L775.721 250.072H781.955L781.711 255.977H775.966Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1010"
                d="M775.966 260.498L775.721 266.403H781.955L781.711 260.498H775.966Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1011"
                d="M781.402 225.899L781.955 232.946H775.721L776.273 225.899H781.402Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1012"
                d="M781.402 290.577L781.955 283.53H775.721L776.273 290.577H781.402Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_95">
              <path
                id="Vector_1013"
                d="M798.709 295.122L799.343 287.043V269.916L799.099 264.011V259.49L799.343 253.585V236.459L798.709 228.379H793.744L793.11 236.459V253.585L793.354 259.49V264.011L793.11 269.916V287.043L793.744 295.122H798.709Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_1014"
                d="M793.354 259.49L793.11 253.585H799.343L799.099 259.49H793.354Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1015"
                d="M793.354 264.011L793.11 269.916H799.343L799.099 264.011H793.354Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1016"
                d="M798.79 229.412L799.343 236.459H793.11L793.661 229.412H798.79Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1017"
                d="M798.79 294.09L799.343 287.043H793.11L793.661 294.09H798.79Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_96">
              <path
                id="Vector_1018"
                d="M816.097 300.335L816.732 292.256V275.129L816.487 269.224V264.703L816.732 258.796V241.672L816.097 233.592H811.132L810.498 241.672V258.796L810.742 264.703V269.224L810.498 275.129V292.256L811.132 300.335H816.097Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_1019"
                d="M810.742 264.703L810.498 258.798H816.732L816.487 264.703H810.742Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1020"
                d="M810.742 269.224L810.498 275.129H816.732L816.487 269.224H810.742Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1021"
                d="M816.178 234.625L816.732 241.672H810.498L811.051 234.625H816.178Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1022"
                d="M816.178 299.303L816.732 292.256H810.498L811.051 299.303H816.178Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_97">
              <path
                id="Vector_1023"
                d="M833.507 302.566L834.141 294.487V277.36L833.895 271.455V266.934L834.141 261.029V243.902L833.507 235.823H828.54L827.908 243.902V261.029L828.152 266.934V271.455L827.908 277.36V294.487L828.54 302.566H833.507Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_1024"
                d="M828.152 266.934L827.908 261.029H834.141L833.895 266.934H828.152Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1025"
                d="M828.152 271.455L827.908 277.36H834.141L833.895 271.455H828.152Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1026"
                d="M833.588 236.856L834.141 243.902H827.908L828.459 236.856H833.588Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1027"
                d="M833.588 301.535L834.141 294.487H827.908L828.459 301.535H833.588Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_98">
              <path
                id="Vector_1028"
                d="M850.895 304.266L851.529 296.187V279.06L851.283 273.155V268.634L851.529 262.727V245.602L850.895 237.523H845.928L845.296 245.602V262.727L845.54 268.634V273.155L845.296 279.06V296.187L845.928 304.266H850.895Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_1029"
                d="M845.54 268.634L845.296 262.729H851.529L851.283 268.634H845.54Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1030"
                d="M845.54 273.155L845.296 279.06H851.529L851.283 273.155H845.54Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1031"
                d="M850.976 238.556L851.529 245.602H845.296L845.847 238.556H850.976Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1032"
                d="M850.976 303.234L851.529 296.187H845.296L845.847 303.234H850.976Z"
                fill="#90A4AE"
              />
            </g>
            <path
              id="Vector_1033"
              d="M868.255 305.336L868.868 297.308V280.292L868.63 274.425V269.933L868.868 264.064V247.049L868.255 239.021H863.451L862.839 247.049V264.064L863.075 269.933V274.425L862.839 280.292V297.308L863.451 305.336H868.255Z"
              fill="#B0BEC5"
            />
            <path
              id="Vector_1034"
              d="M863.075 269.918L862.839 263.889H868.868L868.63 269.918H863.075Z"
              fill="#90A4AE"
            />
            <path
              id="Vector_1035"
              d="M863.075 274.439L862.839 280.468H868.868L868.63 274.439H863.075Z"
              fill="#90A4AE"
            />
            <path
              id="Vector_1036"
              d="M868.333 239.775L868.868 246.557H862.839L863.373 239.775H868.333Z"
              fill="#90A4AE"
            />
            <path
              id="Vector_1037"
              d="M885.587 306.843L886.2 298.724V281.514L885.964 275.58V271.037L886.2 265.104V247.894L885.587 239.775H880.783L880.171 247.894V265.104L880.408 271.037V275.58L880.171 281.514V298.724L880.783 306.843H885.587Z"
              fill="#B0BEC5"
            />
            <path
              id="Vector_1038"
              d="M880.408 271.425L880.171 265.396H886.2L885.964 271.425H880.408Z"
              fill="#90A4AE"
            />
            <path
              id="Vector_1039"
              d="M880.408 275.946L880.171 281.975H886.2L885.964 275.946H880.408Z"
              fill="#90A4AE"
            />
            <path
              id="Vector_1040"
              d="M885.665 241.282L886.2 248.064H880.171L880.705 241.282H885.665Z"
              fill="#90A4AE"
            />
            <g id="Group_99">
              <g id="Group_100">
                <path
                  id="Vector_1041"
                  d="M894.33 244.543L893.667 252.621L893.643 259.648L893.868 265.553L893.811 281.491L893.546 287.396L893.522 294.423L894.128 302.505L899.095 302.522L899.755 294.445L899.78 287.417L899.557 281.512L899.611 265.575L899.876 259.669L899.901 252.642L899.295 244.561L894.33 244.543Z"
                  fill="#B0BEC5"
                />
                <path
                  id="Vector_1042"
                  d="M893.559 288.162L893.54 293.668L899.773 293.69L899.793 288.184L893.559 288.162Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_1043"
                  d="M893.642 253.363L893.623 258.869L899.856 258.89L899.875 253.384L893.642 253.363Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_1044"
                  d="M893.667 258.896L893.664 259.657L899.898 259.679L899.9 258.918L893.667 258.896Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_1045"
                  d="M893.688 252.63L893.686 253.39L899.919 253.412L899.922 252.652L893.688 252.63Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_1046"
                  d="M893.547 293.673L893.544 294.434L899.778 294.455L899.78 293.695L893.547 293.673Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_1047"
                  d="M893.568 287.405L893.565 288.165L899.799 288.187L899.801 287.426L893.568 287.405Z"
                  fill="#CFD8DC"
                />
                <path
                  id="Vector_1048"
                  d="M895.103 257.876L895.1 258.63L898.434 258.641L898.437 257.888L895.103 257.876Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_1049"
                  d="M895.118 253.646L895.115 254.399L898.449 254.411L898.452 253.657L895.118 253.646Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_1050"
                  d="M895.001 292.665L894.998 293.419L898.33 293.43L898.333 292.676L895.001 292.665Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_1051"
                  d="M894.988 288.414L894.985 289.168L898.319 289.179L898.322 288.426L894.988 288.414Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_1052"
                  d="M899.557 281.512L899.78 287.417L893.546 287.396L893.811 281.491L899.557 281.512Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_1053"
                  d="M899.611 265.574L899.876 259.669L893.643 259.648L893.868 265.553L899.611 265.574Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_1054"
                  d="M894.05 301.472L893.522 294.423L899.755 294.445L899.179 301.489L894.05 301.472Z"
                  fill="#90A4AE"
                />
                <path
                  id="Vector_1055"
                  d="M894.243 245.576L893.667 252.621L899.901 252.642L899.372 245.594L894.243 245.576Z"
                  fill="#90A4AE"
                />
              </g>
              <g id="Group_101">
                <path
                  id="Vector_1056"
                  d="M728.223 254.409H724.889V260.65H728.223V254.409Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_1057"
                  d="M728.223 217.094H724.889V223.335H728.223V217.094Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_1058"
                  d="M745.727 261.157H742.395V267.398H745.727V261.157Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_1059"
                  d="M745.727 224.283H742.395V230.524H745.727V224.283Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_1060"
                  d="M763.116 267.247H759.784V273.487H763.116V267.247Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_1061"
                  d="M763.116 230.373H759.784V236.613H763.116V230.373Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_1062"
                  d="M780.465 272.142H777.134V278.382H780.465V272.142Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_1063"
                  d="M780.465 236.144H777.134V242.385H780.465V236.144Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_1064"
                  d="M797.892 276.231H794.561V282.471H797.892V276.231Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_1065"
                  d="M797.892 240.674H794.561V246.914H797.892V240.674Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_1066"
                  d="M815.281 280.339H811.949V286.579H815.281V280.339Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_1067"
                  d="M815.281 244.343H811.949V250.584H815.281V244.343Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_1068"
                  d="M832.611 282.852H829.28V289.093H832.611V282.852Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_1069"
                  d="M832.611 247.735H829.28V253.975H832.611V247.735Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_1070"
                  d="M850.079 285.332H846.745V291.573H850.079V285.332Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_1071"
                  d="M850.079 250.215H846.745V256.455H850.079V250.215Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_1072"
                  d="M867.583 286.945H864.251V293.185H867.583V286.945Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_1073"
                  d="M867.583 251.827H864.251V258.068H867.583V251.827Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_1074"
                  d="M884.856 287.649H881.522V293.89H884.856V287.649Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_1075"
                  d="M884.856 252.971H881.522V259.211H884.856V252.971Z"
                  fill="#37474F"
                />
                <path
                  id="Vector_1076"
                  d="M719.841 256.854C719.841 256.854 722.469 257.915 727.069 259.773C728.219 260.235 729.493 260.748 730.88 261.305C732.28 261.83 733.794 262.399 735.41 263.005C737.028 263.611 738.749 264.257 740.563 264.937C741.468 265.286 742.409 265.606 743.37 265.94C744.331 266.274 745.315 266.614 746.319 266.964C748.329 267.659 750.422 268.386 752.588 269.136C754.773 269.834 757.03 270.556 759.352 271.299C760.513 271.669 761.689 272.045 762.88 272.424C764.071 272.807 765.292 273.141 766.518 273.506C768.975 274.225 771.483 274.957 774.037 275.704C776.6 276.413 779.217 277.089 781.862 277.797C783.184 278.145 784.514 278.507 785.854 278.849C787.2 279.173 788.552 279.496 789.91 279.821C791.267 280.146 792.63 280.472 793.999 280.799C795.367 281.124 796.735 281.466 798.119 281.747C800.882 282.338 803.657 282.929 806.432 283.521C807.816 283.832 809.214 284.073 810.607 284.34C812 284.602 813.391 284.863 814.78 285.125C816.17 285.385 817.555 285.645 818.938 285.903C820.325 286.13 821.709 286.354 823.088 286.579C824.467 286.804 825.839 287.027 827.205 287.248C828.572 287.466 829.928 287.705 831.287 287.879C833.999 288.251 836.677 288.62 839.314 288.984C839.972 289.072 840.628 289.168 841.283 289.249C841.938 289.323 842.589 289.397 843.239 289.47C844.537 289.616 845.823 289.762 847.095 289.906C849.64 290.183 852.125 290.501 854.558 290.689C856.987 290.904 859.349 291.111 861.634 291.313C862.205 291.362 862.772 291.413 863.334 291.462C863.896 291.499 864.455 291.534 865.006 291.569C866.111 291.639 867.195 291.71 868.258 291.776C870.381 291.912 872.417 292.04 874.352 292.163C876.29 292.24 878.129 292.314 879.857 292.382C881.585 292.451 883.201 292.514 884.696 292.572C885.444 292.609 886.161 292.614 886.846 292.625C887.531 292.635 888.186 292.646 888.806 292.655C893.771 292.73 896.608 292.772 896.608 292.772L896.618 289.295C896.618 289.295 893.803 289.253 888.876 289.177C888.259 289.168 887.611 289.158 886.93 289.147C886.25 289.137 885.537 289.13 884.796 289.094C883.312 289.036 881.708 288.973 879.992 288.907C878.278 288.838 876.453 288.764 874.53 288.689C872.608 288.568 870.588 288.439 868.481 288.304C867.427 288.237 866.35 288.169 865.254 288.099C864.706 288.063 864.153 288.028 863.594 287.991C863.037 287.942 862.475 287.893 861.908 287.844C859.641 287.644 857.296 287.438 854.884 287.226C852.471 287.039 850.005 286.725 847.479 286.448C846.216 286.305 844.941 286.161 843.652 286.015C843.007 285.943 842.361 285.87 841.711 285.796C841.061 285.715 840.412 285.62 839.758 285.532C837.143 285.172 834.484 284.807 831.793 284.436C830.446 284.266 829.099 284.027 827.743 283.811C826.387 283.592 825.024 283.369 823.655 283.147C822.287 282.924 820.914 282.701 819.537 282.476C818.165 282.22 816.79 281.962 815.411 281.703C814.032 281.445 812.652 281.185 811.269 280.925C809.889 280.66 808.501 280.421 807.126 280.114C804.372 279.526 801.62 278.939 798.876 278.352C797.501 278.073 796.143 277.734 794.787 277.411C793.429 277.086 792.077 276.763 790.73 276.44C789.383 276.116 788.041 275.795 786.704 275.475C785.373 275.135 784.056 274.776 782.742 274.43C780.118 273.728 777.52 273.057 774.977 272.352C772.444 271.613 769.953 270.884 767.515 270.171C766.298 269.807 765.086 269.477 763.904 269.098C762.722 268.72 761.554 268.348 760.402 267.979C758.098 267.243 755.856 266.526 753.689 265.833C751.539 265.088 749.461 264.368 747.468 263.676C746.47 263.33 745.495 262.991 744.54 262.659C743.584 262.327 742.652 262.009 741.754 261.663C739.954 260.988 738.245 260.347 736.64 259.745C735.034 259.142 733.533 258.579 732.143 258.057C730.766 257.504 729.503 256.996 728.36 256.536C723.795 254.692 721.187 253.638 721.187 253.638L719.841 256.854Z"
                  fill="#455A64"
                />
                <path
                  id="Vector_1077"
                  d="M733.26 224.771C733.26 224.771 735.695 225.753 739.954 227.473C741.018 227.901 742.199 228.377 743.483 228.894C744.779 229.38 746.18 229.905 747.677 230.466C749.173 231.028 750.768 231.625 752.447 232.255C753.283 232.58 754.155 232.875 755.045 233.183C755.936 233.492 756.845 233.806 757.774 234.13C759.633 234.774 761.57 235.447 763.574 236.142C765.596 236.787 767.684 237.454 769.832 238.139C770.905 238.484 771.994 238.831 773.096 239.183C774.197 239.537 775.328 239.843 776.461 240.182C778.732 240.846 781.054 241.526 783.414 242.216C785.786 242.871 788.206 243.495 790.651 244.15C791.875 244.473 793.105 244.798 794.343 245.125C795.586 245.421 796.837 245.722 798.093 246.02C799.349 246.321 800.608 246.623 801.873 246.925C803.137 247.225 804.402 247.545 805.682 247.803C808.238 248.349 810.802 248.896 813.366 249.444C814.645 249.733 815.94 249.953 817.225 250.199C818.513 250.441 819.798 250.682 821.082 250.923C822.366 251.163 823.647 251.404 824.925 251.644C826.208 251.852 827.488 252.061 828.761 252.266C830.035 252.473 831.305 252.681 832.567 252.884C833.83 253.085 835.084 253.309 836.34 253.468C838.847 253.812 841.323 254.153 843.759 254.488C844.369 254.571 844.975 254.66 845.579 254.734C846.185 254.802 846.787 254.869 847.388 254.938C848.588 255.073 849.777 255.206 850.952 255.34C853.304 255.596 855.601 255.893 857.849 256.064C860.094 256.262 862.277 256.453 864.39 256.64C864.919 256.687 865.442 256.733 865.96 256.778C866.48 256.812 866.995 256.843 867.506 256.877C868.526 256.942 869.529 257.005 870.509 257.068C872.473 257.193 874.354 257.314 876.142 257.428C877.934 257.498 879.632 257.567 881.229 257.63C882.825 257.693 884.32 257.753 885.702 257.808C886.392 257.843 887.056 257.848 887.69 257.857C888.324 257.866 888.929 257.876 889.501 257.883C894.091 257.953 896.711 257.994 896.711 257.994L896.722 254.516C896.722 254.516 894.121 254.476 889.57 254.405C889.001 254.397 888.402 254.388 887.773 254.379C887.144 254.37 886.487 254.365 885.802 254.33C884.432 254.275 882.95 254.218 881.366 254.154C879.781 254.091 878.097 254.024 876.321 253.956C874.547 253.842 872.682 253.722 870.734 253.599C869.761 253.538 868.767 253.475 867.755 253.41C867.249 253.378 866.738 253.345 866.222 253.313C865.707 253.267 865.187 253.222 864.664 253.176C862.569 252.992 860.403 252.8 858.178 252.603C855.949 252.435 853.671 252.14 851.338 251.885C850.172 251.753 848.993 251.622 847.802 251.486C847.207 251.42 846.61 251.353 846.009 251.284C845.41 251.211 844.81 251.121 844.205 251.04C841.79 250.708 839.335 250.371 836.848 250.029C835.602 249.872 834.359 249.649 833.107 249.451C831.854 249.247 830.595 249.043 829.332 248.836C828.068 248.63 826.799 248.425 825.528 248.219C824.261 247.982 822.99 247.743 821.716 247.505C820.443 247.266 819.168 247.025 817.891 246.786C816.614 246.542 815.332 246.324 814.064 246.036C811.52 245.493 808.975 244.951 806.443 244.41C805.173 244.153 803.919 243.837 802.665 243.539C801.411 243.238 800.16 242.94 798.915 242.641C797.669 242.344 796.429 242.047 795.195 241.752C793.967 241.427 792.746 241.106 791.533 240.785C789.109 240.135 786.706 239.516 784.356 238.867C782.015 238.182 779.712 237.509 777.459 236.848C776.334 236.513 775.212 236.209 774.12 235.858C773.027 235.508 771.947 235.162 770.883 234.823C768.752 234.144 766.679 233.481 764.675 232.842C762.687 232.152 760.766 231.484 758.921 230.845C757.999 230.525 757.097 230.213 756.213 229.905C755.33 229.6 754.465 229.306 753.636 228.985C751.97 228.36 750.391 227.766 748.905 227.209C747.419 226.653 746.029 226.131 744.744 225.65C743.47 225.137 742.301 224.666 741.243 224.239C737.017 222.534 734.602 221.559 734.602 221.559L733.26 224.771Z"
                  fill="#455A64"
                />
                <path
                  id="Vector_1078"
                  d="M733.505 224.188C733.505 224.188 735.935 225.17 740.189 226.886C741.254 227.315 742.431 227.789 743.713 228.305C745.007 228.79 746.405 229.315 747.902 229.875C749.396 230.436 750.988 231.033 752.665 231.664C753.501 231.988 754.371 232.282 755.259 232.591C756.148 232.898 757.056 233.214 757.985 233.536C759.842 234.18 761.776 234.851 763.778 235.547C765.796 236.192 767.883 236.857 770.027 237.542C771.1 237.885 772.186 238.232 773.287 238.584C774.387 238.939 775.516 239.244 776.647 239.581C778.916 240.245 781.233 240.923 783.59 241.612C785.956 242.265 788.375 242.889 790.816 243.544C792.038 243.867 793.266 244.192 794.503 244.519C795.744 244.815 796.993 245.114 798.247 245.414C799.501 245.715 800.759 246.015 802.022 246.317C803.285 246.618 804.548 246.935 805.826 247.194C808.376 247.738 810.937 248.284 813.5 248.832C814.777 249.12 816.068 249.342 817.353 249.588C818.639 249.828 819.923 250.071 821.205 250.311C822.487 250.552 823.766 250.793 825.041 251.031C826.322 251.239 827.6 251.446 828.872 251.653C830.144 251.86 831.412 252.066 832.671 252.271C833.932 252.472 835.184 252.696 836.437 252.855C838.94 253.199 841.413 253.538 843.844 253.873C844.451 253.956 845.057 254.045 845.66 254.119C846.264 254.188 846.866 254.254 847.465 254.323C848.663 254.458 849.85 254.592 851.024 254.723C853.372 254.98 855.666 255.277 857.911 255.447C860.152 255.645 862.333 255.837 864.441 256.023C864.968 256.071 865.491 256.116 866.009 256.162C866.529 256.195 867.044 256.227 867.553 256.26C868.572 256.325 869.573 256.388 870.553 256.45C872.513 256.575 874.391 256.696 876.177 256.81C877.965 256.88 879.662 256.947 881.257 257.01C882.851 257.073 884.343 257.133 885.723 257.188C886.413 257.223 887.076 257.228 887.708 257.237C888.34 257.246 888.944 257.254 889.517 257.263C894.099 257.333 896.717 257.374 896.717 257.374L896.724 255.162C896.724 255.162 894.119 255.122 889.561 255.052C888.992 255.043 888.391 255.034 887.761 255.025C887.132 255.017 886.471 255.011 885.786 254.976C884.415 254.922 882.929 254.864 881.343 254.801C879.757 254.737 878.069 254.671 876.29 254.6C874.512 254.486 872.643 254.367 870.694 254.242C869.719 254.181 868.725 254.117 867.71 254.052C867.202 254.021 866.691 253.987 866.174 253.956C865.658 253.91 865.138 253.864 864.615 253.817C862.518 253.633 860.348 253.441 858.118 253.244C855.885 253.074 853.604 252.779 851.268 252.524C850.1 252.393 848.92 252.261 847.727 252.126C847.132 252.059 846.533 251.992 845.93 251.924C845.329 251.85 844.729 251.76 844.123 251.679C841.704 251.348 839.243 251.009 836.755 250.666C835.508 250.51 834.262 250.287 833.008 250.086C831.754 249.883 830.493 249.677 829.228 249.472C827.964 249.266 826.692 249.061 825.419 248.853C824.151 248.615 822.877 248.376 821.602 248.137C820.327 247.898 819.05 247.657 817.771 247.417C816.493 247.173 815.209 246.953 813.939 246.667C811.39 246.122 808.844 245.58 806.306 245.037C805.034 244.78 803.776 244.464 802.521 244.166C801.265 243.865 800.012 243.565 798.765 243.266C797.518 242.968 796.277 242.671 795.04 242.376C793.811 242.051 792.588 241.728 791.373 241.406C788.945 240.755 786.539 240.135 784.186 239.485C781.841 238.798 779.535 238.125 777.278 237.465C776.152 237.128 775.028 236.826 773.933 236.473C772.839 236.123 771.757 235.777 770.691 235.436C768.557 234.755 766.483 234.093 764.475 233.452C762.483 232.76 760.56 232.092 758.712 231.451C757.789 231.131 756.884 230.817 756.001 230.511C755.117 230.206 754.251 229.912 753.42 229.589C751.752 228.962 750.169 228.369 748.682 227.81C747.194 227.253 745.801 226.73 744.514 226.249C743.238 225.736 742.067 225.263 741.008 224.836C736.775 223.129 734.358 222.153 734.358 222.153L733.505 224.188Z"
                  fill="#526873"
                />
                <path
                  id="Vector_1079"
                  d="M720.086 256.269C720.086 256.269 722.71 257.33 727.303 259.185C728.451 259.647 729.723 260.158 731.109 260.714C732.507 261.24 734.017 261.807 735.633 262.413C737.249 263.019 738.967 263.663 740.78 264.341C741.682 264.691 742.622 265.011 743.583 265.344C744.543 265.678 745.525 266.019 746.528 266.367C748.534 267.062 750.624 267.788 752.788 268.538C754.969 269.235 757.225 269.955 759.543 270.696C760.702 271.067 761.877 271.441 763.067 271.82C764.256 272.203 765.475 272.535 766.699 272.9C769.152 273.617 771.659 274.349 774.207 275.094C776.766 275.802 779.38 276.478 782.022 277.184C783.342 277.532 784.67 277.894 786.009 278.236C787.352 278.558 788.703 278.883 790.059 279.208C791.415 279.533 792.776 279.858 794.141 280.184C795.507 280.509 796.874 280.85 798.256 281.131C801.015 281.719 803.787 282.311 806.557 282.903C807.939 283.212 809.335 283.455 810.727 283.72C812.118 283.982 813.507 284.242 814.894 284.503C816.282 284.763 817.666 285.021 819.047 285.28C820.432 285.506 821.815 285.731 823.19 285.954C824.567 286.177 825.937 286.4 827.302 286.621C828.666 286.839 830.021 287.078 831.377 287.25C834.085 287.623 836.76 287.991 839.391 288.353C840.05 288.441 840.703 288.538 841.356 288.618C842.01 288.692 842.661 288.766 843.31 288.84C844.606 288.986 845.89 289.131 847.16 289.274C849.701 289.551 852.183 289.867 854.612 290.055C857.038 290.269 859.396 290.477 861.68 290.679C862.251 290.728 862.816 290.779 863.376 290.828C863.939 290.865 864.495 290.9 865.047 290.935C866.15 291.005 867.232 291.074 868.293 291.142C870.413 291.278 872.447 291.406 874.379 291.529C876.314 291.606 878.15 291.68 879.874 291.748C881.599 291.817 883.215 291.88 884.708 291.938C885.454 291.973 886.171 291.98 886.856 291.991C887.541 292.001 888.194 292.012 888.813 292.021C893.771 292.096 896.604 292.138 896.604 292.138L896.611 289.927C896.611 289.927 893.792 289.885 888.858 289.809C888.242 289.801 887.592 289.79 886.911 289.779C886.229 289.769 885.516 289.762 884.773 289.727C883.287 289.669 881.68 289.606 879.964 289.539C878.248 289.47 876.42 289.397 874.494 289.319C872.571 289.196 870.548 289.068 868.438 288.935C867.383 288.868 866.306 288.798 865.208 288.729C864.659 288.694 864.105 288.659 863.547 288.622C862.988 288.573 862.426 288.524 861.857 288.474C859.586 288.274 857.238 288.067 854.825 287.854C852.408 287.666 849.938 287.352 847.409 287.076C846.144 286.934 844.867 286.79 843.577 286.644C842.932 286.57 842.284 286.498 841.632 286.425C840.982 286.344 840.331 286.249 839.676 286.161C837.057 285.801 834.394 285.436 831.7 285.064C830.351 284.891 829.002 284.652 827.644 284.436C826.287 284.215 824.922 283.994 823.552 283.771C822.182 283.548 820.807 283.323 819.428 283.1C818.054 282.843 816.677 282.585 815.297 282.327C813.916 282.067 812.534 281.807 811.15 281.547C809.766 281.282 808.376 281.043 807.001 280.734C804.244 280.146 801.486 279.557 798.739 278.971C797.362 278.691 796.003 278.351 794.643 278.027C793.284 277.702 791.93 277.377 790.581 277.054C789.232 276.731 787.886 276.41 786.55 276.088C785.218 275.748 783.897 275.387 782.582 275.041C779.954 274.339 777.353 273.664 774.806 272.96C772.27 272.219 769.776 271.49 767.335 270.777C766.116 270.413 764.902 270.081 763.718 269.702C762.534 269.324 761.365 268.95 760.211 268.583C757.903 267.845 755.66 267.129 753.489 266.435C751.335 265.689 749.256 264.968 747.259 264.275C746.261 263.929 745.283 263.588 744.327 263.258C743.372 262.926 742.436 262.608 741.538 262.26C739.734 261.584 738.024 260.943 736.417 260.34C734.809 259.736 733.304 259.172 731.913 258.651C730.534 258.096 729.268 257.588 728.125 257.128C723.553 255.282 720.941 254.226 720.941 254.226L720.086 256.269Z"
                  fill="#526873"
                />
                <path
                  id="Vector_1080"
                  d="M722.138 216.334L720.796 219.542L733.29 224.768L734.632 221.56L722.138 216.334Z"
                  fill="#455A64"
                />
                <path
                  id="Vector_1081"
                  d="M721.892 216.916L721.039 218.957L733.532 224.182L734.386 222.142L721.892 216.916Z"
                  fill="#526873"
                />
                <path
                  id="Vector_1082"
                  d="M713.148 250.307L711.807 253.513L719.827 256.869L721.168 253.662L713.148 250.307Z"
                  fill="#455A64"
                />
                <path
                  id="Vector_1083"
                  d="M712.906 250.895L712.052 252.935L720.073 256.29L720.926 254.25L712.906 250.895Z"
                  fill="#526873"
                />
                <g id="Group_102">
                  <path
                    id="Vector_1084"
                    d="M896.625 254.422L896.623 257.906L905.335 257.912L905.337 254.427L896.625 254.422Z"
                    fill="#455A64"
                  />
                  <path
                    id="Vector_1085"
                    d="M896.625 255.057L896.623 257.273L905.335 257.278L905.337 255.062L896.625 255.057Z"
                    fill="#526873"
                  />
                  <path
                    id="Vector_1086"
                    d="M896.605 289.271L896.602 292.755L905.315 292.761L905.317 289.276L896.605 289.271Z"
                    fill="#455A64"
                  />
                  <path
                    id="Vector_1087"
                    d="M896.604 289.906L896.603 292.122L905.315 292.127L905.316 289.911L896.604 289.906Z"
                    fill="#526873"
                  />
                </g>
              </g>
            </g>
            <g id="Group_103">
              <path
                id="Vector_1088"
                d="M554.897 205.483L555.531 197.403V180.192V173.165L554.897 165.085H549.93L549.296 173.165V180.192V197.403L549.93 205.483H554.897Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_1089"
                d="M555.53 179.432V173.925H549.297V179.432H555.53Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1090"
                d="M555.53 173.925V173.165H549.297V173.925H555.53Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1091"
                d="M555.53 180.192V179.432H549.297V180.192H555.53Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1092"
                d="M554.977 166.118L555.531 173.165H549.296L549.849 166.118H554.977Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1093"
                d="M554.977 204.45L555.531 197.403H549.296L549.849 204.45H554.977Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_104">
              <path
                id="Vector_1094"
                d="M537.508 205.483L538.14 197.403V180.192V173.165L537.508 165.085H532.541L531.907 173.165V180.192V197.403L532.541 205.483H537.508Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_1095"
                d="M538.141 179.432V173.925H531.908V179.432H538.141Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1096"
                d="M538.141 173.925V173.165H531.908V173.925H538.141Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1097"
                d="M538.141 180.192V179.432H531.908V180.192H538.141Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1098"
                d="M537.589 166.118L538.14 173.165H531.907L532.46 166.118H537.589Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1099"
                d="M537.589 204.45L538.14 197.403H531.907L532.46 204.45H537.589Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_105">
              <path
                id="Vector_1100"
                d="M520.12 205.483L520.752 197.403V180.192V173.165L520.12 165.085H515.153L514.519 173.165V180.192V197.403L515.153 205.483H520.12Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_1101"
                d="M520.753 179.432V173.925H514.52V179.432H520.753Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1102"
                d="M520.753 173.925V173.165H514.52V173.925H520.753Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1103"
                d="M520.753 180.192V179.432H514.52V180.192H520.753Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1104"
                d="M520.201 166.118L520.752 173.165H514.519L515.072 166.118H520.201Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1105"
                d="M520.201 204.45L520.752 197.403H514.519L515.072 204.45H520.201Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_106">
              <path
                id="Vector_1106"
                d="M502.731 205.483L503.365 197.403V180.192V173.165L502.731 165.085H497.764L497.13 173.165V180.192V197.403L497.764 205.483H502.731Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_1107"
                d="M503.364 179.432V173.925H497.131V179.432H503.364Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1108"
                d="M503.364 173.925V173.165H497.131V173.925H503.364Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1109"
                d="M503.364 180.192V179.432H497.131V180.192H503.364Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1110"
                d="M502.812 166.118L503.365 173.165H497.13L497.683 166.118H502.812Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1111"
                d="M502.812 204.45L503.365 197.403H497.13L497.683 204.45H502.812Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_107">
              <path
                id="Vector_1112"
                d="M485.343 205.483L485.975 197.403V180.192V173.165L485.343 165.085H480.376L479.742 173.165V180.192V197.403L480.376 205.483H485.343Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_1113"
                d="M485.976 179.432V173.925H479.743V179.432H485.976Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1114"
                d="M485.976 173.925V173.165H479.743V173.925H485.976Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1115"
                d="M485.976 180.192V179.432H479.743V180.192H485.976Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1116"
                d="M485.424 166.118L485.975 173.165H479.742L480.295 166.118H485.424Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1117"
                d="M485.424 204.45L485.975 197.403H479.742L480.295 204.45H485.424Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_108">
              <path
                id="Vector_1118"
                d="M433.178 187.715L433.81 179.635V172.608L433.566 166.703V150.765L433.81 144.859V137.833L433.178 129.754H428.211L427.577 137.833V144.859L427.821 150.765V166.703L427.577 172.608V179.635L428.211 187.715H433.178Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_1119"
                d="M433.812 144.099V138.592H427.578V144.099H433.812Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1120"
                d="M433.812 178.874V173.367H427.578V178.874H433.812Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1121"
                d="M433.812 173.367V172.607H427.578V173.367H433.812Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1122"
                d="M433.812 179.634V178.873H427.578V179.634H433.812Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1123"
                d="M433.812 138.592V137.832H427.578V138.592H433.812Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1124"
                d="M433.812 144.859V144.099H427.578V144.859H433.812Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1125"
                d="M432.361 173.628H429.027V178.613H432.361V173.628Z"
                fill="#37474F"
              />
              <path
                id="Vector_1126"
                d="M432.361 138.852H429.027V143.836H432.361V138.852Z"
                fill="#37474F"
              />
              <path
                id="Vector_1127"
                d="M427.821 150.765L427.577 144.859H433.81L433.566 150.765H427.821Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1128"
                d="M427.821 166.701L427.577 172.608H433.81L433.566 166.701H427.821Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1129"
                d="M433.259 130.785L433.81 137.833H427.577L428.13 130.785H433.259Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1130"
                d="M433.259 186.682L433.81 179.635H427.577L428.13 186.682H433.259Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_109">
              <path
                id="Vector_1131"
                d="M450.566 187.715L451.198 179.635V172.608L450.954 166.703V150.765L451.198 144.859V137.833L450.566 129.754H445.599L444.965 137.833V144.859L445.209 150.765V166.703L444.965 172.608V179.635L445.599 187.715H450.566Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_1132"
                d="M451.2 144.099V138.592H444.966V144.099H451.2Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1133"
                d="M451.2 178.874V173.367H444.966V178.874H451.2Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1134"
                d="M451.2 173.367V172.607H444.966V173.367H451.2Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1135"
                d="M451.2 179.634V178.874H444.966V179.634H451.2Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1136"
                d="M451.2 138.592V137.832H444.966V138.592H451.2Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1137"
                d="M451.2 144.859V144.099H444.966V144.859H451.2Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1138"
                d="M449.749 173.628H446.416V178.613H449.749V173.628Z"
                fill="#37474F"
              />
              <path
                id="Vector_1139"
                d="M449.749 138.852H446.416V143.836H449.749V138.852Z"
                fill="#37474F"
              />
              <path
                id="Vector_1140"
                d="M445.209 150.765L444.965 144.859H451.198L450.954 150.765H445.209Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1141"
                d="M445.209 166.701L444.965 172.608H451.198L450.954 166.701H445.209Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1142"
                d="M450.647 130.785L451.198 137.833H444.965L445.518 130.785H450.647Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1143"
                d="M450.647 186.682L451.198 179.635H444.965L445.518 186.682H450.647Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_110">
              <path
                id="Vector_1144"
                d="M467.955 187.715L468.589 179.635V172.608L468.343 166.703V150.765L468.589 144.859V137.833L467.955 129.754H462.988L462.354 137.833V144.859L462.599 150.765V166.703L462.354 172.608V179.635L462.988 187.715H467.955Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_1145"
                d="M468.589 144.099V138.592H462.355V144.099H468.589Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1146"
                d="M468.589 178.874V173.367H462.355V178.874H468.589Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1147"
                d="M468.589 173.367V172.607H462.355V173.367H468.589Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1148"
                d="M468.589 179.634V178.874H462.355V179.634H468.589Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1149"
                d="M468.589 138.592V137.832H462.355V138.592H468.589Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1150"
                d="M468.589 144.859V144.098H462.355V144.859H468.589Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1151"
                d="M467.138 173.628H463.804V178.613H467.138V173.628Z"
                fill="#37474F"
              />
              <path
                id="Vector_1152"
                d="M467.138 138.852H463.804V143.836H467.138V138.852Z"
                fill="#37474F"
              />
              <path
                id="Vector_1153"
                d="M462.599 150.765L462.354 144.859H468.589L468.343 150.765H462.599Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1154"
                d="M462.599 166.701L462.354 172.608H468.589L468.343 166.701H462.599Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1155"
                d="M468.035 130.785L468.589 137.833H462.354L462.907 130.785H468.035Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1156"
                d="M468.035 186.682L468.589 179.635H462.354L462.907 186.682H468.035Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_111">
              <path
                id="Vector_1157"
                d="M485.343 187.715L485.975 179.635V172.608L485.731 166.703V150.765L485.975 144.859V137.833L485.343 129.754H480.376L479.742 137.833V144.859L479.986 150.765V166.703L479.742 172.608V179.635L480.376 187.715H485.343Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_1158"
                d="M485.977 144.099V138.592H479.743V144.099H485.977Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1159"
                d="M485.977 178.874V173.367H479.743V178.874H485.977Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1160"
                d="M485.977 173.367V172.607H479.743V173.367H485.977Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1161"
                d="M485.977 138.592V137.832H479.743V138.592H485.977Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1162"
                d="M485.977 144.859V144.098H479.743V144.859H485.977Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1163"
                d="M484.526 173.628H481.193V178.613H484.526V173.628Z"
                fill="#37474F"
              />
              <path
                id="Vector_1164"
                d="M484.526 138.852H481.193V143.836H484.526V138.852Z"
                fill="#37474F"
              />
              <path
                id="Vector_1165"
                d="M479.986 150.765L479.742 144.859H485.975L485.731 150.765H479.986Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1166"
                d="M479.986 166.701L479.742 172.608H485.975L485.731 166.701H479.986Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1167"
                d="M485.424 130.785L485.975 137.833H479.742L480.295 130.785H485.424Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_112">
              <path
                id="Vector_1168"
                d="M502.731 187.715L503.365 179.635V172.608L503.119 166.703V150.765L503.365 144.859V137.833L502.731 129.754H497.764L497.13 137.833V144.859L497.376 150.765V166.703L497.13 172.608V179.635L497.764 187.715H502.731Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_1169"
                d="M503.365 144.099V138.592H497.132V144.099H503.365Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1170"
                d="M503.365 178.874V173.367H497.132V178.874H503.365Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1171"
                d="M503.365 173.367V172.607H497.131V173.367H503.365Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1172"
                d="M503.365 138.592V137.832H497.132V138.592H503.365Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1173"
                d="M503.365 144.859V144.099H497.131V144.859H503.365Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1174"
                d="M501.914 173.628H498.581V178.613H501.914V173.628Z"
                fill="#37474F"
              />
              <path
                id="Vector_1175"
                d="M501.914 138.852H498.581V143.836H501.914V138.852Z"
                fill="#37474F"
              />
              <path
                id="Vector_1176"
                d="M497.376 150.765L497.13 144.859H503.365L503.119 150.765H497.376Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1177"
                d="M497.376 166.701L497.13 172.608H503.365L503.119 166.701H497.376Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1178"
                d="M502.812 130.785L503.365 137.833H497.13L497.683 130.785H502.812Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_113">
              <path
                id="Vector_1179"
                d="M520.12 187.715L520.752 179.635V172.608L520.508 166.703V150.765L520.752 144.859V137.833L520.12 129.754H515.153L514.519 137.833V144.859L514.765 150.765V166.703L514.519 172.608V179.635L515.153 187.715H520.12Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_1180"
                d="M520.754 144.099V138.592H514.52V144.099H520.754Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1181"
                d="M520.754 178.874V173.367H514.52V178.874H520.754Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1182"
                d="M520.754 173.367V172.607H514.52V173.367H520.754Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1183"
                d="M520.754 138.592V137.832H514.52V138.592H520.754Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1184"
                d="M520.754 144.859V144.098H514.52V144.859H520.754Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1185"
                d="M519.303 173.628H515.969V178.613H519.303V173.628Z"
                fill="#37474F"
              />
              <path
                id="Vector_1186"
                d="M519.303 138.852H515.969V143.836H519.303V138.852Z"
                fill="#37474F"
              />
              <path
                id="Vector_1187"
                d="M514.765 150.765L514.519 144.859H520.752L520.508 150.765H514.765Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1188"
                d="M514.765 166.701L514.519 172.608H520.752L520.508 166.701H514.765Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1189"
                d="M520.201 130.785L520.752 137.833H514.519L515.072 130.785H520.201Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_114">
              <path
                id="Vector_1190"
                d="M537.508 187.715L538.14 179.635V172.608L537.896 166.703V150.765L538.14 144.859V137.833L537.508 129.754H532.541L531.907 137.833V144.859L532.153 150.765V166.703L531.907 172.608V179.635L532.541 187.715H537.508Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_1191"
                d="M538.142 144.099V138.592H531.908V144.099H538.142Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1192"
                d="M538.142 178.874V173.367H531.908V178.874H538.142Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1193"
                d="M538.142 173.367V172.607H531.908V173.367H538.142Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1194"
                d="M538.142 138.592V137.832H531.908V138.592H538.142Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1195"
                d="M538.142 144.859V144.099H531.908V144.859H538.142Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1196"
                d="M536.691 173.628H533.358V178.613H536.691V173.628Z"
                fill="#37474F"
              />
              <path
                id="Vector_1197"
                d="M536.691 138.852H533.358V143.836H536.691V138.852Z"
                fill="#37474F"
              />
              <path
                id="Vector_1198"
                d="M532.153 150.765L531.907 144.859H538.14L537.896 150.765H532.153Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1199"
                d="M532.153 166.701L531.907 172.608H538.14L537.896 166.701H532.153Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1200"
                d="M537.589 130.785L538.14 137.833H531.907L532.46 130.785H537.589Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_115">
              <path
                id="Vector_1201"
                d="M554.897 187.715L555.531 179.635V172.608L555.285 166.703V150.765L555.531 144.859V137.833L554.897 129.754H549.93L549.296 137.833V144.859L549.54 150.765V166.703L549.296 172.608V179.635L549.93 187.715H554.897Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_1202"
                d="M555.531 144.099V138.592H549.297V144.099H555.531Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1203"
                d="M555.531 178.874V173.367H549.297V178.874H555.531Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1204"
                d="M555.531 173.367V172.607H549.297V173.367H555.531Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1205"
                d="M555.531 138.592V137.832H549.297V138.592H555.531Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1206"
                d="M555.531 144.859V144.098H549.297V144.859H555.531Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1207"
                d="M554.08 173.628H550.746V178.613H554.08V173.628Z"
                fill="#37474F"
              />
              <path
                id="Vector_1208"
                d="M554.08 138.852H550.746V143.836H554.08V138.852Z"
                fill="#37474F"
              />
              <path
                id="Vector_1209"
                d="M549.54 150.765L549.296 144.859H555.531L555.285 150.765H549.54Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1210"
                d="M549.54 166.701L549.296 172.608H555.531L555.285 166.701H549.54Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1211"
                d="M554.977 130.785L555.531 137.833H549.296L549.849 130.785H554.977Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_116">
              <g id="Group_117">
                <path
                  id="Vector_1212"
                  d="M483.602 174.809C485.366 174.919 487.191 175.032 489.075 175.15C491.188 175.334 493.373 175.525 495.62 175.722C496.742 175.82 497.882 175.919 499.034 176.019C500.186 176.116 501.347 176.27 502.524 176.395C504.876 176.658 507.28 176.927 509.724 177.201C511.336 177.407 512.968 177.633 514.612 177.86H561.107V174.382H483.602V174.809Z"
                  fill="#455A64"
                />
                <path
                  id="Vector_1213"
                  d="M448.081 174.382H422.144V177.86H448.081V174.382Z"
                  fill="#455A64"
                />
              </g>
              <path
                id="Vector_1214"
                d="M561.107 139.607H422V143.085H561.107V139.607Z"
                fill="#455A64"
              />
              <path
                id="Vector_1215"
                d="M561.107 140.241H422V142.452H561.107V140.241Z"
                fill="#526873"
              />
              <g id="Group_118">
                <path
                  id="Vector_1216"
                  d="M489.075 175.15C491.188 175.334 493.373 175.525 495.619 175.722C496.742 175.82 497.882 175.919 499.034 176.019C500.186 176.116 501.347 176.27 502.524 176.395C504.876 176.658 507.28 176.927 509.723 177.201C509.783 177.208 509.845 177.219 509.904 177.226H561.105V175.014H486.908C487.623 175.06 488.343 175.104 489.075 175.15Z"
                  fill="#526873"
                />
                <path
                  id="Vector_1217"
                  d="M447.937 175.014H422V177.226H447.937V175.014Z"
                  fill="#526873"
                />
              </g>
            </g>
            <g id="Group_119">
              <path
                id="Vector_1218"
                d="M572.285 218.656L572.919 210.576V180.192V173.165L572.285 165.085H567.318L566.684 173.165V180.192V210.576L567.318 218.656H572.285Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_1219"
                d="M572.918 179.432V173.925H566.685V179.432H572.918Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1220"
                d="M572.918 173.925V173.165H566.685V173.925H572.918Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1221"
                d="M572.918 180.192V179.432H566.685V180.192H572.918Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1222"
                d="M572.366 166.118L572.919 173.165H566.684L567.237 166.118H572.366Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1223"
                d="M572.366 217.623L572.919 210.576H566.684L567.237 217.623H572.366Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_120">
              <path
                id="Vector_1224"
                d="M589.673 218.656L590.306 210.576V180.192V173.165L589.673 165.085H584.706L584.072 173.165V180.192V210.576L584.706 218.656H589.673Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_1225"
                d="M588.855 196.274H585.523V202.514H588.855V196.274Z"
                fill="#37474F"
              />
              <path
                id="Vector_1226"
                d="M590.307 179.432V173.925H584.073V179.432H590.307Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1227"
                d="M590.307 173.925V173.165H584.073V173.925H590.307Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1228"
                d="M590.307 180.192V179.432H584.073V180.192H590.307Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1229"
                d="M589.754 166.118L590.306 173.165H584.072L584.626 166.118H589.754Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1230"
                d="M589.754 217.623L590.306 210.576H584.072L584.626 217.623H589.754Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1231"
                d="M571.468 190.594H568.135V196.834H571.468V190.594Z"
                fill="#37474F"
              />
              <path
                id="Vector_1232"
                d="M554.08 185.958H550.746V192.199H554.08V185.958Z"
                fill="#37474F"
              />
            </g>
            <g id="Group_121">
              <path
                id="Vector_1233"
                d="M607.062 218.656L607.694 210.576V180.192V173.165L607.062 165.085H602.095L601.461 173.165V180.192V210.576L602.095 218.656H607.062Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_1234"
                d="M606.243 202.653H602.911V208.894H606.243V202.653Z"
                fill="#37474F"
              />
              <path
                id="Vector_1235"
                d="M607.695 179.432V173.925H601.462V179.432H607.695Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1236"
                d="M607.695 173.925V173.165H601.462V173.925H607.695Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1237"
                d="M607.695 180.192V179.432H601.462V180.192H607.695Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1238"
                d="M607.143 166.118L607.694 173.165H601.461L602.014 166.118H607.143Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1239"
                d="M607.143 217.623L607.694 210.576H601.461L602.014 217.623H607.143Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_122">
              <path
                id="Vector_1240"
                d="M624.45 243.224L625.082 235.145V180.192V173.165L624.45 165.085H619.483L618.849 173.165V180.192V235.145L619.483 243.224H624.45Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_1241"
                d="M623.632 209.914H620.3V216.154H623.632V209.914Z"
                fill="#37474F"
              />
              <path
                id="Vector_1242"
                d="M625.083 179.432V173.925H618.85V179.432H625.083Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1243"
                d="M625.083 173.925V173.165H618.85V173.925H625.083Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1244"
                d="M625.083 180.192V179.432H618.85V180.192H625.083Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1245"
                d="M624.531 166.118L625.082 173.165H618.849L619.402 166.118H624.531Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1246"
                d="M624.531 242.191L625.082 235.145H618.849L619.402 242.191H624.531Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_123">
              <path
                id="Vector_1247"
                d="M641.839 243.224L642.473 235.145V180.192V173.165L641.839 165.085H636.871L636.237 173.165V180.192V235.145L636.871 243.224H641.839Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_1248"
                d="M641.02 217.175H637.688V223.415H641.02V217.175Z"
                fill="#37474F"
              />
              <path
                id="Vector_1249"
                d="M642.472 179.432V173.925H636.238V179.432H642.472Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1250"
                d="M642.472 173.925V173.165H636.238V173.925H642.472Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1251"
                d="M642.472 180.192V179.432H636.238V180.192H642.472Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1252"
                d="M641.919 166.118L642.473 173.165H636.237L636.791 166.118H641.919Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1253"
                d="M641.919 242.191L642.473 235.145H636.237L636.791 242.191H641.919Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_124">
              <path
                id="Vector_1254"
                d="M659.227 243.224L659.859 235.145V180.192V173.165L659.227 165.085H654.26L653.626 173.165V180.192V235.145L654.26 243.224H659.227Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_1255"
                d="M658.776 224.591H655.444V230.831H658.776V224.591Z"
                fill="#37474F"
              />
              <path
                id="Vector_1256"
                d="M659.86 179.432V173.925H653.627V179.432H659.86Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1257"
                d="M659.86 173.925V173.165H653.627V173.925H659.86Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1258"
                d="M659.86 180.192V179.432H653.627V180.192H659.86Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1259"
                d="M659.308 166.118L659.859 173.165H653.626L654.179 166.118H659.308Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1260"
                d="M659.308 242.191L659.859 235.145H653.626L654.179 242.191H659.308Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_125">
              <path
                id="Vector_1261"
                d="M676.615 218.656L677.248 210.576V180.192V173.165L676.615 165.085H671.648L671.014 173.165V180.192V210.576L671.648 218.656H676.615Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_1262"
                d="M677.249 179.432V173.925H671.015V179.432H677.249Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1263"
                d="M677.249 173.925V173.165H671.015V173.925H677.249Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1264"
                d="M677.249 180.192V179.432H671.015V180.192H677.249Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1265"
                d="M676.696 166.118L677.248 173.165H671.014L671.567 166.118H676.696Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1266"
                d="M676.696 217.623L677.248 210.576H671.014L671.567 217.623H676.696Z"
                fill="#90A4AE"
              />
            </g>
            <path
              id="Vector_1267"
              d="M694.181 256.354L694.793 248.235V231.025L694.557 225.091V220.548L694.793 214.614V197.404L694.181 189.286H689.378L688.764 197.404V214.614L689 220.548V225.091L688.764 231.025V248.235L689.378 256.354H694.181Z"
              fill="#B0BEC5"
            />
            <path
              id="Vector_1268"
              d="M689 220.182L688.764 214.907H694.793L694.557 220.182H689Z"
              fill="#90A4AE"
            />
            <path
              id="Vector_1269"
              d="M689 224.704L688.764 230.732H694.793L694.557 224.704H689Z"
              fill="#90A4AE"
            />
            <path
              id="Vector_1270"
              d="M694.259 190.039L694.793 197.575H688.764L689.299 190.039H694.259Z"
              fill="#90A4AE"
            />
            <path
              id="Vector_1271"
              d="M711.513 264.643L712.125 256.524V239.314L711.889 233.38V228.837L712.125 222.904V205.694L711.513 197.575H706.71L706.096 205.694V222.904L706.333 228.837V233.38L706.096 239.314V256.524L706.71 264.643H711.513Z"
              fill="#B0BEC5"
            />
            <path
              id="Vector_1272"
              d="M706.333 229.225L706.096 223.196H712.125L711.889 229.225H706.333Z"
              fill="#90A4AE"
            />
            <path
              id="Vector_1273"
              d="M706.333 233.746L706.096 239.021H712.125L711.889 233.746H706.333Z"
              fill="#90A4AE"
            />
            <path
              id="Vector_1274"
              d="M711.592 199.082L712.125 205.864H706.096L706.631 199.082H711.592Z"
              fill="#90A4AE"
            />
            <path
              id="Vector_1275"
              d="M728.844 270.671L729.457 262.553V245.343L729.219 239.409V234.866L729.457 228.932V211.722L728.844 203.604H724.042L723.429 211.722V228.932L723.665 234.866V239.409L723.429 245.343V262.553L724.042 270.671H728.844Z"
              fill="#B0BEC5"
            />
            <path
              id="Vector_1276"
              d="M723.665 234.5L723.429 229.225H729.457L729.219 234.5H723.665Z"
              fill="#90A4AE"
            />
            <path
              id="Vector_1277"
              d="M723.665 239.021L723.429 245.05H729.457L729.219 239.021H723.665Z"
              fill="#90A4AE"
            />
            <path
              id="Vector_1278"
              d="M728.922 205.111L729.457 211.893H723.429L723.964 205.111H728.922Z"
              fill="#90A4AE"
            />
            <g id="Group_126">
              <path
                id="Vector_1279"
                d="M676.615 249.488L677.248 241.408V224.282L677.003 218.376V213.855L677.248 207.95V190.824L676.615 182.744H671.648L671.014 190.824V207.95L671.26 213.855V218.376L671.014 224.282V241.408L671.648 249.488H676.615Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_1280"
                d="M671.26 213.855L671.014 207.95H677.248L677.003 213.855H671.26Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1281"
                d="M671.26 218.376L671.014 224.281H677.248L677.003 218.376H671.26Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1282"
                d="M676.696 248.455L677.248 241.408H671.014L671.567 248.455H676.696Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_127">
              <path
                id="Vector_1283"
                d="M572.285 187.715L572.919 179.635V172.608L572.673 166.703V150.765L572.919 144.859V137.833L572.285 129.754H567.318L566.684 137.833V144.859L566.928 150.765V166.703L566.684 172.608V179.635L567.318 187.715H572.285Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_1284"
                d="M572.919 144.099V138.592H566.685V144.099H572.919Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1285"
                d="M572.919 178.874V173.367H566.685V178.874H572.919Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1286"
                d="M572.919 173.367V172.607H566.685V173.367H572.919Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1287"
                d="M572.919 179.634V178.874H566.685V179.634H572.919Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1288"
                d="M572.919 138.592V137.832H566.685V138.592H572.919Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1289"
                d="M572.919 144.859V144.099H566.685V144.859H572.919Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1290"
                d="M571.468 173.628H568.135V178.613H571.468V173.628Z"
                fill="#37474F"
              />
              <path
                id="Vector_1291"
                d="M571.468 138.852H568.135V143.836H571.468V138.852Z"
                fill="#37474F"
              />
              <path
                id="Vector_1292"
                d="M566.928 150.765L566.684 144.859H572.919L572.673 150.765H566.928Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1293"
                d="M566.928 166.701L566.684 172.608H572.919L572.673 166.701H566.928Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1294"
                d="M572.366 130.785L572.919 137.833H566.684L567.237 130.785H572.366Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_128">
              <path
                id="Vector_1295"
                d="M589.673 187.715L590.306 179.635V172.608L590.061 166.703V150.765L590.306 144.859V137.833L589.673 129.754H584.706L584.072 137.833V144.859L584.318 150.765V166.703L584.072 172.608V179.635L584.706 187.715H589.673Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_1296"
                d="M590.307 144.099V138.592H584.074V144.099H590.307Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1297"
                d="M590.307 178.874V173.367H584.074V178.874H590.307Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1298"
                d="M590.307 173.367V172.607H584.074V173.367H590.307Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1299"
                d="M590.307 179.634V178.874H584.074V179.634H590.307Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1300"
                d="M590.307 138.592V137.832H584.074V138.592H590.307Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1301"
                d="M590.307 144.859V144.099H584.074V144.859H590.307Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1302"
                d="M588.855 173.628H585.523V178.613H588.855V173.628Z"
                fill="#37474F"
              />
              <path
                id="Vector_1303"
                d="M588.855 138.852H585.523V143.836H588.855V138.852Z"
                fill="#37474F"
              />
              <path
                id="Vector_1304"
                d="M584.318 150.765L584.072 144.859H590.306L590.061 150.765H584.318Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1305"
                d="M584.318 166.701L584.072 172.608H590.306L590.061 166.701H584.318Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1306"
                d="M589.754 130.785L590.306 137.833H584.072L584.625 130.785H589.754Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_129">
              <path
                id="Vector_1307"
                d="M607.062 187.715L607.694 179.635V172.608L607.45 166.703V150.765L607.694 144.859V137.833L607.062 129.754H602.095L601.461 137.833V144.859L601.705 150.765V166.703L601.461 172.608V179.635L602.095 187.715H607.062Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_1308"
                d="M607.696 144.099V138.592H601.462V144.099H607.696Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1309"
                d="M607.696 178.874V173.367H601.462V178.874H607.696Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1310"
                d="M607.696 173.367V172.607H601.462V173.367H607.696Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1311"
                d="M607.695 179.634V178.874H601.462V179.634H607.695Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1312"
                d="M607.696 138.592V137.832H601.462V138.592H607.696Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1313"
                d="M607.696 144.859V144.098H601.462V144.859H607.696Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1314"
                d="M606.243 173.628H602.911V178.613H606.243V173.628Z"
                fill="#37474F"
              />
              <path
                id="Vector_1315"
                d="M606.243 138.852H602.911V143.836H606.243V138.852Z"
                fill="#37474F"
              />
              <path
                id="Vector_1316"
                d="M601.705 150.765L601.461 144.859H607.694L607.45 150.765H601.705Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1317"
                d="M601.705 166.701L601.461 172.608H607.694L607.45 166.701H601.705Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1318"
                d="M607.143 130.785L607.694 137.833H601.461L602.014 130.785H607.143Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_130">
              <path
                id="Vector_1319"
                d="M624.45 187.715L625.082 179.635V172.608L624.838 166.703V150.765L625.082 144.859V137.833L624.45 129.754H619.483L618.849 137.833V144.859L619.093 150.765V166.703L618.849 172.608V179.635L619.483 187.715H624.45Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_1320"
                d="M625.084 144.099V138.592H618.85V144.099H625.084Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1321"
                d="M625.084 178.874V173.367H618.85V178.874H625.084Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1322"
                d="M625.084 173.367V172.607H618.85V173.367H625.084Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1323"
                d="M625.084 179.634V178.874H618.85V179.634H625.084Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1324"
                d="M625.084 138.592V137.832H618.85V138.592H625.084Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1325"
                d="M625.084 144.859V144.099H618.85V144.859H625.084Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1326"
                d="M623.632 173.628H620.3V178.613H623.632V173.628Z"
                fill="#37474F"
              />
              <path
                id="Vector_1327"
                d="M623.632 138.852H620.3V143.836H623.632V138.852Z"
                fill="#37474F"
              />
              <path
                id="Vector_1328"
                d="M619.093 150.765L618.849 144.859H625.082L624.838 150.765H619.093Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1329"
                d="M619.093 166.701L618.849 172.608H625.082L624.838 166.701H619.093Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1330"
                d="M624.531 130.785L625.082 137.833H618.849L619.402 130.785H624.531Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_131">
              <path
                id="Vector_1331"
                d="M641.839 187.715L642.473 179.635V172.608L642.227 166.703V150.765L642.473 144.859V137.833L641.839 129.754H636.871L636.237 137.833V144.859L636.482 150.765V166.703L636.237 172.608V179.635L636.871 187.715H641.839Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_1332"
                d="M642.473 144.099V138.592H636.239V144.099H642.473Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1333"
                d="M642.473 178.874V173.367H636.239V178.874H642.473Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1334"
                d="M642.473 173.367V172.607H636.239V173.367H642.473Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1335"
                d="M642.473 179.634V178.874H636.239V179.634H642.473Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1336"
                d="M642.473 138.592V137.832H636.239V138.592H642.473Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1337"
                d="M642.472 144.859V144.099H636.239V144.859H642.472Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1338"
                d="M641.02 173.628H637.688V178.613H641.02V173.628Z"
                fill="#37474F"
              />
              <path
                id="Vector_1339"
                d="M641.02 138.852H637.688V143.836H641.02V138.852Z"
                fill="#37474F"
              />
              <path
                id="Vector_1340"
                d="M636.482 150.765L636.237 144.859H642.473L642.227 150.765H636.482Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1341"
                d="M636.482 166.701L636.237 172.608H642.473L642.227 166.701H636.482Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1342"
                d="M641.919 130.785L642.473 137.833H636.237L636.791 130.785H641.919Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_132">
              <path
                id="Vector_1343"
                d="M659.227 187.715L659.859 179.635V172.608L659.615 166.703V150.765L659.859 144.859V137.833L659.227 129.754H654.26L653.626 137.833V144.859L653.87 150.765V166.703L653.626 172.608V179.635L654.26 187.715H659.227Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_1344"
                d="M659.861 144.099V138.592H653.627V144.099H659.861Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1345"
                d="M659.861 178.874V173.367H653.627V178.874H659.861Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1346"
                d="M659.861 173.367V172.607H653.627V173.367H659.861Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1347"
                d="M659.861 179.634V178.874H653.627V179.634H659.861Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1348"
                d="M659.861 138.592V137.832H653.627V138.592H659.861Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1349"
                d="M659.861 144.859V144.098H653.627V144.859H659.861Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1350"
                d="M658.408 173.628H655.077V178.613H658.408V173.628Z"
                fill="#37474F"
              />
              <path
                id="Vector_1351"
                d="M658.408 138.852H655.077V143.836H658.408V138.852Z"
                fill="#37474F"
              />
              <path
                id="Vector_1352"
                d="M653.87 150.765L653.626 144.859H659.859L659.615 150.765H653.87Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1353"
                d="M653.87 166.701L653.626 172.608H659.859L659.615 166.701H653.87Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1354"
                d="M659.308 130.785L659.859 137.833H653.626L654.179 130.785H659.308Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_133">
              <path
                id="Vector_1355"
                d="M676.615 187.715L677.248 179.635V172.608L677.003 166.703V150.765L677.248 144.859V137.833L676.615 129.754H671.648L671.014 137.833V144.859L671.26 150.765V166.703L671.014 172.608V179.635L671.648 187.715H676.615Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_1356"
                d="M677.249 144.099V138.592H671.016V144.099H677.249Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1357"
                d="M677.249 178.874V173.367H671.016V178.874H677.249Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1358"
                d="M677.249 173.367V172.607H671.016V173.367H677.249Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1359"
                d="M677.249 179.634V178.874H671.016V179.634H677.249Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1360"
                d="M677.249 138.592V137.832H671.016V138.592H677.249Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1361"
                d="M677.249 144.859V144.099H671.016V144.859H677.249Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1362"
                d="M675.797 173.628H672.465V178.613H675.797V173.628Z"
                fill="#37474F"
              />
              <path
                id="Vector_1363"
                d="M675.797 138.852H672.465V143.836H675.797V138.852Z"
                fill="#37474F"
              />
              <path
                id="Vector_1364"
                d="M671.26 150.765L671.014 144.859H677.248L677.003 150.765H671.26Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1365"
                d="M671.26 166.701L671.014 172.608H677.248L677.003 166.701H671.26Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1366"
                d="M676.696 130.785L677.248 137.833H671.014L671.567 130.785H676.696Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_134">
              <path
                id="Vector_1367"
                d="M694.004 187.715L694.636 179.635V172.608L694.392 166.703V150.765L694.636 144.859V137.833L694.004 129.754H689.037L688.403 137.833V144.859L688.647 150.765V166.703L688.403 172.608V179.635L689.037 187.715H694.004Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_1368"
                d="M694.638 144.099V138.592H688.404V144.099H694.638Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1369"
                d="M694.638 178.874V173.367H688.404V178.874H694.638Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1370"
                d="M694.638 173.367V172.607H688.404V173.367H694.638Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1371"
                d="M694.637 179.634V178.874H688.404V179.634H694.637Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1372"
                d="M694.638 138.592V137.832H688.404V138.592H694.638Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1373"
                d="M694.638 144.859V144.098H688.404V144.859H694.638Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_1374"
                d="M693.185 173.628H689.853V178.613H693.185V173.628Z"
                fill="#37474F"
              />
              <path
                id="Vector_1375"
                d="M693.185 138.852H689.853V143.836H693.185V138.852Z"
                fill="#37474F"
              />
              <path
                id="Vector_1376"
                d="M688.647 150.765L688.403 144.859H694.636L694.392 150.765H688.647Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1377"
                d="M688.647 166.701L688.403 172.608H694.636L694.392 166.701H688.647Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1378"
                d="M694.085 130.785L694.636 137.833H688.403L688.956 130.785H694.085Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_1379"
                d="M694.085 186.682L694.636 179.635H688.403L688.956 186.682H694.085Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_135">
              <path
                id="Vector_1380"
                d="M623.568 177.86L624.87 174.677L632.891 178.027L631.553 181.236L623.568 177.86Z"
                fill="#455A64"
              />
              <g id="Group_136">
                <path
                  id="Vector_1381"
                  d="M623.568 177.86H700.214V174.382H616.283C616.054 174.382 615.991 174.696 616.202 174.784L623.568 177.86Z"
                  fill="#455A64"
                />
                <path
                  id="Vector_1382"
                  d="M610.926 174.382H561.107V177.86H618.162C618.401 177.86 618.468 177.531 618.246 177.438L610.926 174.382Z"
                  fill="#455A64"
                />
              </g>
              <path
                id="Vector_1383"
                d="M700.214 139.607H561.107V143.085H700.214V139.607Z"
                fill="#455A64"
              />
              <path
                id="Vector_1384"
                d="M700.214 140.241H561.107V142.452H700.214V140.241Z"
                fill="#526873"
              />
              <g id="Group_137">
                <path
                  id="Vector_1385"
                  d="M623.688 177.226H700.214V175.014H618.392L623.688 177.226Z"
                  fill="#526873"
                />
                <path
                  id="Vector_1386"
                  d="M612.438 175.014H561.107V177.226H617.734L612.438 175.014Z"
                  fill="#526873"
                />
              </g>
            </g>
            <path
              id="Vector_1387"
              d="M495.85 204.357V179.489H494.343V204.357H495.85Z"
              fill="#455A64"
            />
            <g id="Group_138">
              <g id="Group_139">
                <path
                  id="Vector_1388"
                  d="M617.627 171.774C617.051 171.544 616.443 171.3 615.807 171.045C615.169 170.79 614.506 170.52 613.803 170.263C612.401 169.74 610.886 169.174 609.264 168.57C607.643 167.968 605.92 167.327 604.102 166.65C602.269 166.016 600.342 165.351 598.331 164.655C597.324 164.307 596.299 163.954 595.252 163.592C594.728 163.412 594.2 163.231 593.668 163.046C593.13 162.874 592.589 162.702 592.043 162.528C589.856 161.833 587.597 161.112 585.274 160.373C582.957 159.609 580.542 158.941 578.086 158.216C576.857 157.858 575.615 157.496 574.361 157.129C573.734 156.946 573.104 156.762 572.471 156.577C571.837 156.4 571.194 156.235 570.553 156.063C567.982 155.379 565.368 154.686 562.723 153.983C561.404 153.618 560.061 153.316 558.715 152.989C557.37 152.668 556.017 152.343 554.658 152.018C553.3 151.693 551.935 151.368 550.569 151.039C549.194 150.744 547.815 150.449 546.434 150.152C545.052 149.857 543.668 149.562 542.282 149.265C540.895 148.974 539.512 148.658 538.114 148.41C535.327 147.885 532.538 147.362 529.761 146.84C528.375 146.566 526.98 146.353 525.593 146.125C524.205 145.898 522.821 145.674 521.444 145.451C520.065 145.227 518.694 145.004 517.327 144.781C515.959 144.579 514.592 144.402 513.238 144.212C512.622 144.13 512.016 144.044 511.403 143.959H479.498V144.179C480.524 144.244 481.567 144.309 482.628 144.374C484.895 144.571 487.238 144.774 489.648 144.985C490.853 145.09 492.074 145.198 493.31 145.305C494.547 145.41 495.792 145.573 497.055 145.707C499.579 145.99 502.157 146.28 504.779 146.575C507.397 146.907 510.054 147.289 512.745 147.655C514.09 147.843 515.444 148.02 516.804 148.22C518.16 148.44 519.521 148.661 520.889 148.884C522.257 149.107 523.631 149.33 525.008 149.553C526.385 149.78 527.769 149.991 529.144 150.263C531.9 150.781 534.668 151.301 537.435 151.821C538.82 152.067 540.194 152.381 541.569 152.671C542.944 152.964 544.318 153.258 545.69 153.551C547.061 153.844 548.43 154.138 549.794 154.431C551.152 154.756 552.504 155.079 553.853 155.402C555.201 155.725 556.544 156.047 557.879 156.367C559.214 156.692 560.547 156.99 561.857 157.352C564.483 158.049 567.077 158.738 569.629 159.416C570.267 159.588 570.903 159.749 571.533 159.927C572.162 160.109 572.787 160.292 573.409 160.473C574.654 160.837 575.887 161.195 577.106 161.551C579.543 162.272 581.94 162.934 584.239 163.693C586.545 164.427 588.788 165.142 590.957 165.832C591.5 166.004 592.038 166.176 592.57 166.346C593.098 166.529 593.624 166.71 594.142 166.889C595.18 167.248 596.198 167.599 597.198 167.943C599.193 168.633 601.108 169.294 602.926 169.923C604.729 170.593 606.44 171.231 608.049 171.828C609.651 172.425 611.149 172.984 612.537 173.502H621.946C620.807 173.049 619.357 172.468 617.627 171.774Z"
                  fill="#455A64"
                />
                <path
                  id="Vector_1389"
                  d="M447.937 174.382C447.937 174.382 450.561 174.415 455.154 174.473C456.303 174.489 457.572 174.505 458.958 174.524C460.341 174.577 461.837 174.633 463.435 174.693C465.034 174.753 466.734 174.816 468.527 174.883C469.425 174.905 470.342 174.97 471.281 175.028C472.221 175.086 473.183 175.148 474.165 175.209C476.129 175.332 478.175 175.459 480.293 175.59C482.406 175.775 484.591 175.966 486.838 176.163C487.96 176.261 489.1 176.36 490.252 176.46C491.404 176.557 492.565 176.711 493.742 176.836C496.094 177.099 498.498 177.368 500.942 177.642C503.381 177.953 505.856 178.311 508.364 178.65C509.618 178.824 510.878 179 512.146 179.175C513.409 179.381 514.677 179.588 515.952 179.795C517.227 180.003 518.506 180.21 519.788 180.419C521.07 180.63 522.359 180.823 523.641 181.079C526.209 181.562 528.786 182.047 531.364 182.532C532.655 182.758 533.934 183.055 535.216 183.324C536.496 183.598 537.777 183.872 539.054 184.144C540.331 184.418 541.606 184.69 542.877 184.961C544.142 185.265 545.401 185.567 546.657 185.867C547.913 186.168 549.162 186.468 550.407 186.765C551.651 187.067 552.892 187.343 554.111 187.682C556.556 188.331 558.973 188.973 561.348 189.603C561.941 189.763 562.535 189.914 563.122 190.077C563.707 190.248 564.288 190.418 564.868 190.588C566.027 190.927 567.174 191.261 568.31 191.593C570.579 192.264 572.812 192.877 574.953 193.587C577.099 194.27 579.189 194.936 581.209 195.578C581.715 195.738 582.216 195.898 582.711 196.056C583.203 196.226 583.691 196.395 584.174 196.562C585.142 196.896 586.09 197.224 587.019 197.546C588.879 198.187 590.66 198.801 592.355 199.386C594.034 200.012 595.629 200.605 597.126 201.164C598.624 201.722 600.024 202.244 601.32 202.727C601.97 202.962 602.585 203.213 603.173 203.449C603.761 203.684 604.322 203.909 604.856 204.123C609.117 205.829 611.551 206.804 611.551 206.804L610.22 210.016C610.22 210.016 607.805 209.05 603.579 207.359C603.05 207.146 602.495 206.923 601.91 206.689C601.327 206.456 600.718 206.206 600.073 205.973C598.787 205.493 597.398 204.977 595.912 204.424C594.426 203.87 592.847 203.282 591.18 202.66C589.499 202.081 587.733 201.471 585.888 200.834C584.966 200.516 584.025 200.189 583.066 199.859C582.586 199.694 582.103 199.525 581.615 199.356C581.123 199.2 580.626 199.042 580.124 198.882C578.12 198.245 576.049 197.584 573.918 196.906C571.797 196.202 569.582 195.596 567.33 194.93C566.204 194.602 565.064 194.27 563.916 193.933C563.341 193.764 562.763 193.595 562.184 193.427C561.603 193.263 561.014 193.114 560.424 192.956C558.067 192.331 555.671 191.695 553.246 191.05C552.037 190.713 550.804 190.441 549.571 190.141C548.338 189.845 547.096 189.549 545.853 189.25C544.608 188.951 543.359 188.651 542.105 188.351C540.844 188.082 539.579 187.812 538.313 187.541C537.046 187.271 535.776 186.998 534.506 186.728C533.235 186.461 531.967 186.168 530.686 185.943C528.131 185.461 525.573 184.982 523.027 184.502C521.757 184.248 520.476 184.056 519.205 183.847C517.933 183.64 516.663 183.435 515.4 183.229C514.137 183.024 512.878 182.818 511.626 182.614C510.368 182.44 509.118 182.267 507.874 182.094C505.387 181.759 502.932 181.402 500.513 181.095C498.089 180.823 495.706 180.556 493.372 180.294C492.203 180.169 491.053 180.017 489.91 179.92C488.766 179.822 487.637 179.723 486.523 179.627C484.294 179.432 482.129 179.242 480.032 179.059C477.931 178.929 475.901 178.803 473.953 178.682C472.978 178.62 472.024 178.561 471.092 178.503C470.159 178.445 469.249 178.38 468.359 178.357C466.579 178.29 464.893 178.229 463.307 178.169C461.721 178.109 460.239 178.053 458.867 178.002C457.493 177.984 456.232 177.967 455.094 177.951C450.538 177.893 447.933 177.862 447.933 177.862V174.382H447.937Z"
                  fill="#455A64"
                />
                <path
                  id="Vector_1390"
                  d="M447.937 175.014C447.937 175.014 450.557 175.048 455.143 175.106C456.29 175.121 457.56 175.137 458.941 175.157C460.321 175.208 461.816 175.264 463.411 175.325C465.007 175.385 466.704 175.448 468.496 175.515C469.391 175.538 470.308 175.601 471.246 175.661C472.184 175.719 473.145 175.78 474.125 175.84C476.087 175.961 478.129 176.089 480.244 176.221C482.354 176.405 484.537 176.595 486.78 176.792C487.902 176.888 489.038 176.989 490.189 177.089C491.339 177.185 492.499 177.34 493.674 177.465C496.022 177.728 498.423 177.997 500.863 178.271C503.299 178.582 505.768 178.94 508.273 179.277C509.525 179.451 510.783 179.625 512.049 179.801C513.31 180.006 514.577 180.212 515.85 180.421C517.122 180.628 518.4 180.835 519.681 181.042C520.961 181.253 522.248 181.446 523.529 181.703C526.093 182.184 528.666 182.669 531.24 183.152C532.529 183.378 533.806 183.673 535.086 183.942C536.365 184.216 537.643 184.488 538.918 184.761C540.194 185.033 541.467 185.305 542.735 185.577C543.998 185.879 545.256 186.182 546.508 186.482C547.762 186.782 549.009 187.081 550.253 187.378C551.494 187.68 552.734 187.956 553.952 188.293C556.393 188.941 558.806 189.582 561.177 190.211C561.771 190.371 562.363 190.52 562.948 190.685C563.531 190.855 564.112 191.026 564.692 191.194C565.849 191.532 566.996 191.867 568.129 192.197C570.395 192.868 572.626 193.478 574.761 194.187C576.906 194.87 578.991 195.534 581.009 196.177C581.513 196.337 582.014 196.497 582.509 196.655C583.001 196.825 583.487 196.994 583.97 197.161C584.936 197.495 585.883 197.821 586.812 198.143C588.669 198.784 590.448 199.397 592.139 199.982C593.817 200.607 595.408 201.199 596.903 201.756C598.397 202.312 599.797 202.834 601.092 203.315C601.742 203.549 602.355 203.8 602.941 204.037C603.53 204.273 604.088 204.497 604.62 204.71C608.874 206.414 611.305 207.387 611.305 207.387L610.459 209.429C610.459 209.429 608.04 208.462 603.809 206.767C603.28 206.554 602.723 206.331 602.138 206.097C601.554 205.864 600.944 205.613 600.298 205.381C599.01 204.901 597.618 204.383 596.132 203.828C594.644 203.275 593.061 202.685 591.393 202.063C589.71 201.482 587.94 200.872 586.094 200.235C585.17 199.915 584.228 199.59 583.268 199.258C582.788 199.091 582.303 198.924 581.813 198.756C581.32 198.599 580.823 198.441 580.32 198.281C578.313 197.642 576.239 196.982 574.106 196.302C571.981 195.598 569.763 194.99 567.509 194.323C566.382 193.992 565.242 193.66 564.09 193.325C563.513 193.156 562.936 192.988 562.354 192.817C561.771 192.654 561.183 192.505 560.593 192.347C558.232 191.72 555.833 191.084 553.404 190.437C552.193 190.1 550.959 189.826 549.724 189.526C548.487 189.231 547.246 188.932 546 188.634C544.753 188.335 543.501 188.035 542.247 187.734C540.984 187.464 539.718 187.193 538.45 186.923C537.181 186.652 535.91 186.38 534.636 186.108C533.363 185.841 532.093 185.546 530.811 185.321C528.25 184.84 525.691 184.358 523.141 183.879C521.869 183.624 520.587 183.431 519.314 183.222C518.038 183.015 516.769 182.808 515.502 182.602C514.236 182.397 512.976 182.191 511.721 181.986C510.461 181.812 509.209 181.638 507.964 181.464C505.473 181.128 503.014 180.772 500.59 180.463C498.163 180.19 495.776 179.924 493.438 179.662C492.268 179.537 491.116 179.384 489.971 179.288C488.826 179.188 487.695 179.089 486.579 178.993C484.349 178.798 482.178 178.608 480.079 178.425C477.975 178.295 475.943 178.169 473.991 178.048C473.015 177.986 472.061 177.926 471.127 177.868C470.192 177.811 469.281 177.747 468.39 177.723C466.609 177.656 464.919 177.595 463.332 177.535C461.744 177.475 460.258 177.419 458.884 177.368C457.509 177.35 456.246 177.333 455.106 177.317C450.543 177.259 447.935 177.227 447.935 177.227L447.937 175.014Z"
                  fill="#526873"
                />
                <g id="Group_140">
                  <path
                    id="Vector_1391"
                    d="M617.393 172.364C616.817 172.134 616.211 171.891 615.575 171.637C614.939 171.382 614.268 171.141 613.566 170.887C612.166 170.365 610.659 169.77 609.041 169.167C607.423 168.565 605.7 167.924 603.886 167.249C602.056 166.617 600.131 165.951 598.122 165.257C597.117 164.911 596.091 164.557 595.046 164.197C594.523 164.016 593.996 163.835 593.464 163.65C592.928 163.48 592.387 163.306 591.841 163.132C589.657 162.437 587.4 161.718 585.08 160.979C582.767 160.215 580.356 159.549 577.904 158.826C576.676 158.467 575.436 158.105 574.183 157.74C573.556 157.557 572.928 157.375 572.295 157.19C571.661 157.013 571.02 156.85 570.379 156.676C567.811 155.994 565.201 155.3 562.56 154.6C561.242 154.236 559.9 153.934 558.557 153.607C557.213 153.286 555.862 152.961 554.507 152.638C553.151 152.313 551.788 151.988 550.423 151.661C549.049 151.366 547.672 151.071 546.294 150.776C544.913 150.481 543.531 150.186 542.147 149.891C540.763 149.601 539.38 149.283 537.986 149.035C535.202 148.512 532.418 147.989 529.645 147.467C528.261 147.193 526.868 146.98 525.482 146.752C524.096 146.527 522.714 146.302 521.339 146.078C519.962 145.855 518.592 145.631 517.227 145.41C515.86 145.208 514.496 145.031 513.143 144.841C510.96 144.546 508.805 144.244 506.669 143.959H485.15C486.641 144.089 488.157 144.221 489.704 144.356C490.911 144.462 492.133 144.569 493.371 144.678C494.61 144.783 495.858 144.946 497.121 145.08C499.649 145.364 502.231 145.654 504.858 145.949C507.479 146.283 510.14 146.666 512.834 147.031C514.181 147.219 515.537 147.397 516.898 147.597C518.256 147.816 519.621 148.038 520.989 148.261C522.359 148.484 523.734 148.707 525.113 148.932C526.492 149.158 527.878 149.369 529.255 149.643C532.014 150.163 534.786 150.683 537.557 151.205C538.945 151.45 540.32 151.767 541.699 152.055C543.076 152.35 544.453 152.643 545.826 152.936C547.2 153.231 548.57 153.525 549.936 153.818C551.296 154.143 552.65 154.468 554.001 154.789C555.35 155.113 556.695 155.434 558.032 155.755C559.368 156.08 560.703 156.381 562.015 156.742C564.644 157.441 567.242 158.13 569.798 158.808C570.435 158.98 571.073 159.143 571.705 159.319C572.334 159.502 572.961 159.684 573.583 159.867C574.83 160.231 576.065 160.591 577.285 160.947C579.725 161.667 582.126 162.331 584.427 163.09C586.737 163.826 588.981 164.541 591.154 165.233C591.697 165.405 592.236 165.577 592.77 165.748C593.298 165.93 593.824 166.111 594.343 166.29C595.383 166.649 596.404 167.002 597.403 167.346C599.402 168.036 601.318 168.698 603.14 169.329C604.947 170.002 606.659 170.639 608.27 171.238C609.881 171.839 611.388 172.401 612.78 172.921C613.306 173.11 613.804 173.309 614.291 173.504H620.24C619.399 173.168 618.452 172.787 617.393 172.364Z"
                    fill="#526873"
                  />
                </g>
                <path
                  id="Vector_1392"
                  d="M447.938 177.861V174.384H439.244V177.861H447.938Z"
                  fill="#455A64"
                />
                <path
                  id="Vector_1393"
                  d="M447.938 177.228V175.016H439.244V177.228H447.938Z"
                  fill="#526873"
                />
                <g id="Group_141">
                  <path
                    id="Vector_1394"
                    d="M618.151 213.333L619.491 210.124L611.468 206.774L610.128 209.983L618.151 213.333Z"
                    fill="#455A64"
                  />
                  <path
                    id="Vector_1395"
                    d="M618.397 212.755L619.249 210.715L611.226 207.365L610.374 209.406L618.397 212.755Z"
                    fill="#526873"
                  />
                  <path
                    id="Vector_1396"
                    d="M623.175 177.011L624.626 175.26L632.649 178.61L631.797 180.651L623.175 177.011Z"
                    fill="#526873"
                  />
                </g>
              </g>
            </g>
            <path
              id="Vector_1397"
              d="M675.954 231.486H672.186V237.514H675.954V231.486Z"
              fill="#37474F"
            />
            <path
              id="Vector_1398"
              d="M693.286 239.021H689.518V245.05H693.286V239.021Z"
              fill="#37474F"
            />
            <path
              id="Vector_1399"
              d="M727.95 215.661H724.936V221.689H727.95V215.661Z"
              fill="#37474F"
            />
            <path
              id="Vector_1400"
              d="M710.618 208.879H707.604V214.907H710.618V208.879Z"
              fill="#37474F"
            />
            <path
              id="Vector_1401"
              d="M693.286 201.343H689.518V207.371H693.286V201.343Z"
              fill="#37474F"
            />
            <path
              id="Vector_1402"
              d="M675.954 193.807H672.186V199.836H675.954V193.807Z"
              fill="#37474F"
            />
            <path
              id="Vector_1403"
              d="M658.621 187.025H654.854V193.054H658.621V187.025Z"
              fill="#37474F"
            />
            <path
              id="Vector_1404"
              d="M619.6 209.787L618.241 212.988L746.293 267.343L747.652 264.142L619.6 209.787Z"
              fill="#455A64"
            />
            <path
              id="Vector_1405"
              d="M633.033 177.709L631.674 180.911L759.726 235.266L761.085 232.064L633.033 177.709Z"
              fill="#455A64"
            />
            <path
              id="Vector_1406"
              d="M632.786 178.294L631.922 180.33L759.973 234.685L760.838 232.649L632.786 178.294Z"
              fill="#526873"
            />
            <path
              id="Vector_1407"
              d="M619.353 210.368L618.489 212.404L746.541 266.758L747.405 264.723L619.353 210.368Z"
              fill="#526873"
            />
            <path
              id="Vector_1408"
              d="M635.053 169.693H612.654V173.461H637.949C638.244 173.461 638.387 173.073 638.172 172.854L635.053 169.693Z"
              fill="#455A64"
            />
            <path
              id="Vector_1409"
              d="M635.211 170.566H612.975L612.654 170.446V172.707H637.521L635.211 170.566Z"
              fill="#526873"
            />
            <path
              id="Vector_1410"
              d="M499.618 173.385V146.408C499.618 145.949 499.955 145.579 500.371 145.579C500.788 145.579 501.125 145.949 501.125 146.408V173.385C501.125 173.843 500.788 174.214 500.371 174.214C499.955 174.214 499.618 173.843 499.618 173.385Z"
              fill="#455A64"
            />
            <path
              id="Vector_1411"
              d="M534.282 174.13V151.691C534.282 151.228 534.619 150.854 535.036 150.854C535.452 150.854 535.789 151.228 535.789 151.691V174.13C535.789 174.593 535.452 174.968 535.036 174.968C534.619 174.968 534.282 174.593 534.282 174.13Z"
              fill="#455A64"
            />
            <path
              id="Vector_1412"
              d="M497.357 218.675V202.85H486.054V218.675H497.357Z"
              fill="#455A64"
            />
            <path
              id="Vector_1413"
              d="M495.85 217.168V204.357H487.561V217.168H495.85Z"
              fill="#526873"
            />
          </g>
          <g id="Carriage-Accounting">
            <path
              id="Rectangle 146"
              d="M96.5 138C96.5 129.44 103.44 122.5 112 122.5H215.643C224.203 122.5 231.143 129.44 231.143 138V182.111C231.143 190.671 224.203 197.611 215.643 197.611H112C103.44 197.611 96.5 190.671 96.5 182.111V138Z"
              fill="#E1524C"
              stroke="black"
            />
            <path
              id="ACCOUNTING"
              d="M113.613 164.882H111.247L115.627 153.896H118.007L122.38 164.882H120.014L119.113 162.524H114.514L113.613 164.882ZM115.254 160.546H118.381L116.814 156.474L115.254 160.546ZM132.971 163.505C132.458 164.003 131.85 164.394 131.147 164.677C130.444 164.96 129.68 165.102 128.855 165.102C128.02 165.102 127.251 164.96 126.547 164.677C125.844 164.389 125.232 163.989 124.709 163.476C124.192 162.958 123.789 162.353 123.501 161.659C123.213 160.966 123.068 160.209 123.068 159.389C123.068 158.569 123.213 157.812 123.501 157.118C123.789 156.42 124.192 155.815 124.709 155.302C125.232 154.789 125.844 154.391 126.547 154.108C127.251 153.82 128.02 153.676 128.855 153.676C129.675 153.676 130.434 153.818 131.132 154.101C131.836 154.384 132.443 154.777 132.956 155.28L131.381 156.862C131.074 156.486 130.698 156.191 130.254 155.976C129.814 155.756 129.336 155.646 128.818 155.646C128.325 155.646 127.868 155.742 127.448 155.932C127.033 156.117 126.67 156.381 126.357 156.723C126.045 157.06 125.803 157.455 125.632 157.909C125.461 158.364 125.376 158.854 125.376 159.382C125.376 159.919 125.461 160.414 125.632 160.868C125.803 161.323 126.045 161.721 126.357 162.062C126.67 162.399 127.033 162.663 127.448 162.853C127.868 163.039 128.325 163.132 128.818 163.132C129.336 163.132 129.814 163.024 130.254 162.809C130.693 162.59 131.067 162.292 131.374 161.916L132.971 163.505ZM143.957 163.505C143.444 164.003 142.837 164.394 142.133 164.677C141.43 164.96 140.666 165.102 139.841 165.102C139.006 165.102 138.237 164.96 137.534 164.677C136.831 164.389 136.218 163.989 135.695 163.476C135.178 162.958 134.775 162.353 134.487 161.659C134.199 160.966 134.055 160.209 134.055 159.389C134.055 158.569 134.199 157.812 134.487 157.118C134.775 156.42 135.178 155.815 135.695 155.302C136.218 154.789 136.831 154.391 137.534 154.108C138.237 153.82 139.006 153.676 139.841 153.676C140.661 153.676 141.421 153.818 142.119 154.101C142.822 154.384 143.43 154.777 143.943 155.28L142.368 156.862C142.06 156.486 141.684 156.191 141.24 155.976C140.8 155.756 140.322 155.646 139.804 155.646C139.311 155.646 138.855 155.742 138.435 155.932C138.02 156.117 137.656 156.381 137.343 156.723C137.031 157.06 136.789 157.455 136.618 157.909C136.447 158.364 136.362 158.854 136.362 159.382C136.362 159.919 136.447 160.414 136.618 160.868C136.789 161.323 137.031 161.721 137.343 162.062C137.656 162.399 138.02 162.663 138.435 162.853C138.855 163.039 139.311 163.132 139.804 163.132C140.322 163.132 140.8 163.024 141.24 162.809C141.679 162.59 142.053 162.292 142.36 161.916L143.957 163.505ZM150.827 165.102C149.992 165.102 149.221 164.96 148.513 164.677C147.81 164.389 147.197 163.989 146.674 163.476C146.157 162.958 145.754 162.353 145.466 161.659C145.183 160.966 145.041 160.209 145.041 159.389C145.041 158.569 145.183 157.812 145.466 157.118C145.754 156.42 146.157 155.815 146.674 155.302C147.197 154.789 147.81 154.391 148.513 154.108C149.221 153.82 149.992 153.676 150.827 153.676C151.662 153.676 152.431 153.82 153.134 154.108C153.838 154.391 154.445 154.789 154.958 155.302C155.476 155.815 155.879 156.42 156.167 157.118C156.455 157.812 156.599 158.569 156.599 159.389C156.599 160.209 156.455 160.966 156.167 161.659C155.879 162.353 155.476 162.958 154.958 163.476C154.445 163.989 153.838 164.389 153.134 164.677C152.431 164.96 151.662 165.102 150.827 165.102ZM150.827 163.132C151.32 163.132 151.777 163.036 152.197 162.846C152.622 162.656 152.99 162.392 153.303 162.055C153.615 161.713 153.857 161.318 154.028 160.868C154.204 160.414 154.292 159.921 154.292 159.389C154.292 158.857 154.204 158.364 154.028 157.909C153.857 157.455 153.615 157.06 153.303 156.723C152.99 156.381 152.622 156.117 152.197 155.932C151.777 155.742 151.32 155.646 150.827 155.646C150.329 155.646 149.868 155.742 149.443 155.932C149.023 156.117 148.654 156.381 148.337 156.723C148.025 157.06 147.78 157.455 147.605 157.909C147.434 158.364 147.348 158.857 147.348 159.389C147.348 159.921 147.434 160.414 147.605 160.868C147.78 161.323 148.025 161.721 148.337 162.062C148.654 162.399 149.023 162.663 149.443 162.853C149.868 163.039 150.329 163.132 150.827 163.132ZM167.6 153.896V159.938C167.6 161.013 167.407 161.935 167.021 162.707C166.64 163.478 166.091 164.072 165.373 164.487C164.66 164.897 163.803 165.102 162.802 165.102C161.806 165.102 160.949 164.897 160.232 164.487C159.514 164.072 158.962 163.478 158.576 162.707C158.195 161.935 158.005 161.013 158.005 159.938V153.896H160.261V159.66C160.261 160.427 160.356 161.066 160.547 161.579C160.742 162.092 161.027 162.48 161.403 162.743C161.779 163.002 162.246 163.132 162.802 163.132C163.359 163.132 163.825 163.002 164.201 162.743C164.577 162.48 164.86 162.092 165.051 161.579C165.246 161.066 165.344 160.427 165.344 159.66V153.896H167.6ZM179.37 164.882H176.777L171.643 157.382V164.882H169.387V153.896H171.98L177.114 161.41V153.896H179.37V164.882ZM185.91 164.882H183.654V155.866H180.417V153.896H189.155V155.866H185.91V164.882ZM192.458 153.896V164.882H190.202V153.896H192.458ZM204.228 164.882H201.635L196.501 157.382V164.882H194.245V153.896H196.838L201.972 161.41V153.896H204.228V164.882ZM213.962 156.657C213.64 156.335 213.254 156.086 212.805 155.91C212.36 155.734 211.884 155.646 211.377 155.646C210.869 155.646 210.405 155.734 209.985 155.91C209.565 156.086 209.204 156.337 208.901 156.664C208.598 156.992 208.364 157.382 208.198 157.836C208.032 158.285 207.949 158.788 207.949 159.345C207.949 159.902 208.032 160.412 208.198 160.876C208.369 161.34 208.608 161.74 208.916 162.077C209.228 162.409 209.597 162.668 210.022 162.853C210.451 163.039 210.925 163.132 211.443 163.132C211.872 163.132 212.265 163.066 212.622 162.934C212.983 162.802 213.3 162.614 213.574 162.37C213.847 162.126 214.072 161.83 214.248 161.484C214.428 161.137 214.553 160.749 214.621 160.319H211.435V158.598H216.606L216.672 159.448C216.672 160.283 216.543 161.047 216.284 161.74C216.03 162.433 215.669 163.032 215.2 163.534C214.731 164.033 214.172 164.418 213.523 164.692C212.878 164.965 212.163 165.102 211.377 165.102C210.561 165.102 209.804 164.958 209.106 164.67C208.413 164.382 207.805 163.979 207.282 163.461C206.765 162.944 206.362 162.338 206.074 161.645C205.786 160.947 205.642 160.192 205.642 159.382C205.642 158.571 205.783 157.822 206.067 157.133C206.355 156.44 206.755 155.834 207.268 155.317C207.785 154.799 208.388 154.396 209.077 154.108C209.765 153.82 210.515 153.676 211.325 153.676C212.082 153.676 212.815 153.808 213.523 154.072C214.231 154.335 214.863 154.711 215.42 155.2L213.962 156.657Z"
              fill="white"
            />
            <rect
              id="Rectangle 149"
              x="108.057"
              y="130.289"
              width="112.282"
              height="8.28929"
              rx="4.14464"
              fill="black"
            />
            <rect
              id="Rectangle 150"
              x="109.564"
              y="178.518"
              width="112.282"
              height="8.28929"
              rx="4.14464"
              fill="black"
            />
          </g>
          <g id="Carriage-VA">
            <path
              id="Rectangle 146_2"
              d="M855.5 141C855.5 132.44 862.44 125.5 871 125.5H974.643C983.203 125.5 990.143 132.44 990.143 141V185.111C990.143 193.671 983.203 200.611 974.643 200.611H871C862.44 200.611 855.5 193.671 855.5 185.111V141Z"
              fill="#E1524C"
              stroke="black"
            />
            <path
              id="VIRTUAL ASSISTANCE"
              d="M897.033 158.839H894.645L890.265 147.853H892.631L895.839 156.261L899.032 147.853H901.405L897.033 158.839ZM904.797 147.853V158.839H902.541V147.853H904.797ZM915.461 158.839H912.963L910.656 154.87H908.84V158.839H906.584V147.853H910.758C911.642 147.853 912.399 147.992 913.029 148.27C913.659 148.549 914.14 148.952 914.472 149.479C914.809 150.001 914.977 150.629 914.977 151.361C914.977 152.113 914.799 152.755 914.443 153.288C914.091 153.815 913.588 154.21 912.934 154.474L915.461 158.839ZM908.84 153.075H910.59C911.259 153.075 911.772 152.936 912.128 152.658C912.489 152.374 912.67 151.972 912.67 151.449C912.67 150.927 912.489 150.526 912.128 150.248C911.772 149.965 911.259 149.823 910.59 149.823H908.84V153.075ZM921.188 158.839H918.932V149.823H915.695V147.853H924.433V149.823H921.188V158.839ZM935.075 147.853V153.895C935.075 154.97 934.882 155.893 934.496 156.664C934.115 157.435 933.566 158.029 932.848 158.444C932.135 158.854 931.279 159.059 930.278 159.059C929.281 159.059 928.424 158.854 927.707 158.444C926.989 158.029 926.437 157.435 926.051 156.664C925.671 155.893 925.48 154.97 925.48 153.895V147.853H927.736V153.617C927.736 154.384 927.831 155.023 928.022 155.536C928.217 156.049 928.503 156.437 928.879 156.701C929.255 156.959 929.721 157.089 930.278 157.089C930.834 157.089 931.3 156.959 931.676 156.701C932.052 156.437 932.336 156.049 932.526 155.536C932.721 155.023 932.819 154.384 932.819 153.617V147.853H935.075ZM938.29 158.839H935.924L940.304 147.853H942.685L947.057 158.839H944.692L943.791 156.481H939.191L938.29 158.839ZM939.931 154.503H943.058L941.491 150.431L939.931 154.503ZM955.304 158.839H948.127V147.853H950.383V156.869H955.304V158.839ZM878.627 177.839H876.261L880.641 166.853H883.022L887.394 177.839H885.029L884.128 175.481H879.528L878.627 177.839ZM880.268 173.503H883.395L881.828 169.431L880.268 173.503ZM887.951 176.653L889.02 174.932C889.357 175.205 889.682 175.43 889.994 175.605C890.312 175.776 890.624 175.903 890.932 175.986C891.239 176.064 891.554 176.103 891.877 176.103C892.258 176.103 892.587 176.05 892.865 175.942C893.144 175.835 893.359 175.681 893.51 175.481C893.666 175.281 893.744 175.049 893.744 174.785C893.744 174.477 893.647 174.219 893.451 174.009C893.256 173.799 893 173.616 892.682 173.459C892.37 173.298 892.03 173.144 891.664 172.998C891.308 172.852 890.949 172.693 890.588 172.522C890.231 172.346 889.902 172.139 889.599 171.899C889.301 171.66 889.059 171.37 888.874 171.028C888.693 170.681 888.603 170.261 888.603 169.768C888.603 169.123 888.764 168.567 889.086 168.098C889.413 167.629 889.86 167.268 890.426 167.014C890.993 166.76 891.64 166.633 892.367 166.633C892.88 166.633 893.412 166.702 893.964 166.838C894.521 166.975 895.075 167.183 895.627 167.461L894.74 169.285C894.394 169.075 894.02 168.909 893.62 168.787C893.219 168.664 892.843 168.603 892.492 168.603C892.174 168.603 891.896 168.652 891.657 168.75C891.423 168.848 891.239 168.984 891.108 169.16C890.976 169.331 890.91 169.534 890.91 169.768C890.91 170.046 891.005 170.288 891.195 170.493C891.386 170.693 891.633 170.872 891.935 171.028C892.243 171.184 892.572 171.34 892.924 171.497C893.285 171.653 893.649 171.824 894.015 172.009C894.386 172.195 894.723 172.414 895.026 172.668C895.334 172.917 895.58 173.218 895.766 173.569C895.956 173.916 896.051 174.333 896.051 174.822C896.051 175.466 895.881 176.033 895.539 176.521C895.197 177.004 894.721 177.383 894.111 177.656C893.5 177.925 892.79 178.059 891.979 178.059C891.237 178.059 890.527 177.939 889.848 177.7C889.169 177.461 888.537 177.112 887.951 176.653ZM896.813 176.653L897.883 174.932C898.219 175.205 898.544 175.43 898.857 175.605C899.174 175.776 899.487 175.903 899.794 175.986C900.102 176.064 900.417 176.103 900.739 176.103C901.12 176.103 901.449 176.05 901.728 175.942C902.006 175.835 902.221 175.681 902.372 175.481C902.529 175.281 902.607 175.049 902.607 174.785C902.607 174.477 902.509 174.219 902.314 174.009C902.118 173.799 901.862 173.616 901.545 173.459C901.232 173.298 900.893 173.144 900.527 172.998C900.17 172.852 899.811 172.693 899.45 172.522C899.093 172.346 898.764 172.139 898.461 171.899C898.163 171.66 897.922 171.37 897.736 171.028C897.555 170.681 897.465 170.261 897.465 169.768C897.465 169.123 897.626 168.567 897.948 168.098C898.276 167.629 898.722 167.268 899.289 167.014C899.855 166.76 900.502 166.633 901.23 166.633C901.742 166.633 902.275 166.702 902.826 166.838C903.383 166.975 903.937 167.183 904.489 167.461L903.603 169.285C903.256 169.075 902.883 168.909 902.482 168.787C902.082 168.664 901.706 168.603 901.354 168.603C901.037 168.603 900.758 168.652 900.519 168.75C900.285 168.848 900.102 168.984 899.97 169.16C899.838 169.331 899.772 169.534 899.772 169.768C899.772 170.046 899.867 170.288 900.058 170.493C900.248 170.693 900.495 170.872 900.798 171.028C901.105 171.184 901.435 171.34 901.786 171.497C902.148 171.653 902.511 171.824 902.878 172.009C903.249 172.195 903.586 172.414 903.888 172.668C904.196 172.917 904.443 173.218 904.628 173.569C904.819 173.916 904.914 174.333 904.914 174.822C904.914 175.466 904.743 176.033 904.401 176.521C904.059 177.004 903.583 177.383 902.973 177.656C902.362 177.925 901.652 178.059 900.841 178.059C900.099 178.059 899.389 177.939 898.71 177.7C898.031 177.461 897.399 177.112 896.813 176.653ZM908.591 166.853V177.839H906.335V166.853H908.591ZM909.865 176.653L910.934 174.932C911.271 175.205 911.596 175.43 911.908 175.605C912.226 175.776 912.538 175.903 912.846 175.986C913.154 176.064 913.468 176.103 913.791 176.103C914.172 176.103 914.501 176.05 914.779 175.942C915.058 175.835 915.273 175.681 915.424 175.481C915.58 175.281 915.658 175.049 915.658 174.785C915.658 174.477 915.561 174.219 915.365 174.009C915.17 173.799 914.914 173.616 914.596 173.459C914.284 173.298 913.945 173.144 913.578 172.998C913.222 172.852 912.863 172.693 912.502 172.522C912.145 172.346 911.816 172.139 911.513 171.899C911.215 171.66 910.973 171.37 910.788 171.028C910.607 170.681 910.517 170.261 910.517 169.768C910.517 169.123 910.678 168.567 911 168.098C911.327 167.629 911.774 167.268 912.341 167.014C912.907 166.76 913.554 166.633 914.281 166.633C914.794 166.633 915.326 166.702 915.878 166.838C916.435 166.975 916.989 167.183 917.541 167.461L916.654 169.285C916.308 169.075 915.934 168.909 915.534 168.787C915.133 168.664 914.758 168.603 914.406 168.603C914.089 168.603 913.81 168.652 913.571 168.75C913.337 168.848 913.154 168.984 913.022 169.16C912.89 169.331 912.824 169.534 912.824 169.768C912.824 170.046 912.919 170.288 913.11 170.493C913.3 170.693 913.547 170.872 913.849 171.028C914.157 171.184 914.487 171.34 914.838 171.497C915.199 171.653 915.563 171.824 915.929 172.009C916.3 172.195 916.637 172.414 916.94 172.668C917.248 172.917 917.494 173.218 917.68 173.569C917.87 173.916 917.966 174.333 917.966 174.822C917.966 175.466 917.795 176.033 917.453 176.521C917.111 177.004 916.635 177.383 916.025 177.656C915.414 177.925 914.704 178.059 913.893 178.059C913.151 178.059 912.441 177.939 911.762 177.7C911.083 177.461 910.451 177.112 909.865 176.653ZM923.986 177.839H921.73V168.823H918.493V166.853H927.231V168.823H923.986V177.839ZM929.047 177.839H926.681L931.061 166.853H933.442L937.814 177.839H935.448L934.548 175.481H929.948L929.047 177.839ZM930.688 173.503H933.815L932.248 169.431L930.688 173.503ZM948.866 177.839H946.274L941.139 170.339V177.839H938.883V166.853H941.476L946.611 174.368V166.853H948.866V177.839ZM960.182 176.462C959.67 176.96 959.062 177.351 958.359 177.634C957.655 177.917 956.891 178.059 956.066 178.059C955.231 178.059 954.462 177.917 953.759 177.634C953.056 177.346 952.443 176.946 951.921 176.433C951.403 175.915 951 175.31 950.712 174.617C950.424 173.923 950.28 173.166 950.28 172.346C950.28 171.526 950.424 170.769 950.712 170.076C951 169.377 951.403 168.772 951.921 168.259C952.443 167.747 953.056 167.349 953.759 167.065C954.462 166.777 955.231 166.633 956.066 166.633C956.886 166.633 957.646 166.775 958.344 167.058C959.047 167.341 959.655 167.734 960.168 168.237L958.593 169.819C958.285 169.443 957.909 169.148 957.465 168.933C957.026 168.713 956.547 168.603 956.029 168.603C955.536 168.603 955.08 168.699 954.66 168.889C954.245 169.075 953.881 169.338 953.569 169.68C953.256 170.017 953.014 170.413 952.843 170.867C952.673 171.321 952.587 171.811 952.587 172.339C952.587 172.876 952.673 173.372 952.843 173.826C953.014 174.28 953.256 174.678 953.569 175.019C953.881 175.356 954.245 175.62 954.66 175.81C955.08 175.996 955.536 176.089 956.029 176.089C956.547 176.089 957.026 175.981 957.465 175.767C957.904 175.547 958.278 175.249 958.586 174.873L960.182 176.462ZM961.574 177.839V166.853H968.664V168.823H963.83V171.321H968.363V173.298H963.83V175.869H968.737V177.839H961.574Z"
              fill="white"
            />
            <rect
              id="Rectangle 149_2"
              x="867.057"
              y="133.289"
              width="112.282"
              height="8.28929"
              rx="4.14464"
              fill="black"
            />
            <rect
              id="Rectangle 150_2"
              x="868.564"
              y="181.518"
              width="112.282"
              height="8.28929"
              rx="4.14464"
              fill="black"
            />
          </g>
          <g id="Carriage-IT">
            <path
              id="Rectangle 146_3"
              d="M1025.5 255C1025.5 246.44 1032.44 239.5 1041 239.5H1144.64C1153.2 239.5 1160.14 246.44 1160.14 255V299.111C1160.14 307.671 1153.2 314.611 1144.64 314.611H1041C1032.44 314.611 1025.5 307.671 1025.5 299.111V255Z"
              fill="#50DBF5"
              stroke="black"
            />
            <path
              id="IT"
              d="M1086.22 265.027V287H1081.71V265.027H1086.22ZM1099.28 287H1094.77V268.968H1088.3V265.027H1105.77V268.968H1099.28V287Z"
              fill="white"
            />
            <rect
              id="Rectangle 149_3"
              x="1037.06"
              y="247.289"
              width="112.282"
              height="8.28929"
              rx="4.14464"
              fill="black"
            />
            <rect
              id="Rectangle 150_3"
              x="1038.56"
              y="295.518"
              width="112.282"
              height="8.28929"
              rx="4.14464"
              fill="black"
            />
          </g>
          <g id="Carriage-Legal">
            <path
              id="Rectangle 146_4"
              d="M631.837 185.308C634.594 177.204 643.399 172.87 651.503 175.627L749.622 209.014C757.726 211.771 762.06 220.576 759.303 228.68L745.093 270.44C742.336 278.544 733.531 282.878 725.426 280.121L627.308 246.734C619.204 243.977 614.87 235.172 617.627 227.068L631.837 185.308Z"
              fill="#50DBF5"
              stroke="black"
            />
            <path
              id="LEGAL"
              d="M665.925 230.585L656.865 227.502L661.583 213.634L664.431 214.603L660.558 225.984L666.771 228.098L665.925 230.585ZM667.441 231.1L672.16 217.233L681.109 220.278L680.263 222.765L674.161 220.689L673.088 223.841L678.811 225.788L677.962 228.285L672.239 226.337L671.135 229.582L677.329 231.69L676.483 234.177L667.441 231.1ZM692.108 227.909C691.84 227.364 691.46 226.884 690.968 226.469C690.483 226.057 689.92 225.741 689.279 225.523C688.638 225.305 688.014 225.217 687.409 225.258C686.803 225.3 686.239 225.462 685.717 225.745C685.194 226.028 684.73 226.42 684.326 226.922C683.923 227.418 683.602 228.017 683.363 228.72C683.124 229.422 683.01 230.102 683.02 230.759C683.037 231.418 683.167 232.026 683.41 232.583C683.662 233.137 684.016 233.622 684.473 234.038C684.936 234.457 685.494 234.778 686.147 235C686.689 235.184 687.214 235.27 687.72 235.257C688.233 235.246 688.714 235.145 689.164 234.954C689.614 234.763 690.025 234.487 690.396 234.125C690.772 233.765 691.096 233.328 691.367 232.815L687.346 231.447L688.085 229.274L694.612 231.495L694.33 232.596C693.972 233.65 693.48 234.559 692.856 235.323C692.237 236.089 691.524 236.689 690.717 237.122C689.911 237.55 689.04 237.796 688.102 237.863C687.171 237.931 686.21 237.796 685.217 237.459C684.188 237.108 683.295 236.601 682.537 235.938C681.786 235.276 681.191 234.507 680.754 233.629C680.323 232.754 680.075 231.816 680.009 230.817C679.945 229.812 680.087 228.798 680.435 227.775C680.784 226.752 681.284 225.867 681.937 225.119C682.599 224.368 683.364 223.775 684.234 223.342C685.109 222.911 686.044 222.662 687.036 222.594C688.029 222.526 689.037 222.666 690.06 223.014C691.015 223.339 691.883 223.82 692.664 224.457C693.444 225.094 694.081 225.84 694.574 226.696L692.108 227.909ZM695.851 240.767L692.865 239.751L703.112 227.765L706.117 228.787L706.918 244.533L703.931 243.517L703.807 240.153L698.001 238.177L695.851 240.767ZM699.784 235.999L703.732 237.342L703.503 231.529L699.784 235.999ZM717.328 248.075L708.267 244.992L712.986 231.125L715.833 232.093L711.961 243.474L718.174 245.588L717.328 248.075Z"
              fill="white"
            />
            <rect
              id="Rectangle 149_4"
              x="645.262"
              y="181.731"
              width="112.282"
              height="8.28929"
              rx="4.14464"
              transform="rotate(18.7916 645.262 181.731)"
              fill="black"
            />
            <rect
              id="Rectangle 150_4"
              x="629.742"
              y="228.025"
              width="112.282"
              height="8.28929"
              rx="4.14464"
              transform="rotate(18.7916 629.742 228.025)"
              fill="black"
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_d_196_22"
            x="0"
            y="0"
            width="1189.39"
            height="323.111"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_196_22"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_196_22"
              result="shape"
            />
          </filter>
          <clipPath id="clip0_196_22">
            <rect
              width="53"
              height="52"
              fill="white"
              transform="translate(855)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>

    <br><br>
    <h2 style="text-align: center;">Streamline your operations and focus on your core business while we take care of the rest!</h2><br>
    <p class="text-center almost-full-width">
      Our outsourcing services provide comprehensive solutions tailored to meet your specific needs,
      allowing you to maximize efficiency and productivity.
      From customer support and administrative tasks to IT management and beyond,
      trust us to handle the intricacies of outsourcing so you can devote your time and resources
      to what truly matters – growing your business.<br>
    </p>
  </section>

  <section class="second row">
    <div class="who-we-are-wrapper flexB">
      <div class="description">
        <h2 class="subHeading spacing">
          Who <span style="color: #e1524c; font-size: 4rem">We</span> Are
        </h2>
        <p class="spacing">
        We are your dedicated partners in business growth. With tailored outsourcing solutions and a team of experienced professionals,
        we alleviate your burdens and propel your organization forward.
        Our commitment to excellence, transparency, and reliability ensures that we deliver results that exceed expectations,
        allowing you to focus on leading your business to success. Trust us to be your strategic ally in achieving your goals.</p>
        <!-- <button class="readMore" data-readMoreBtn ="#AboutUs">Read More</button> -->
        <a class="router-link" href="/aboutUs" >Read More</a>
      </div>

      <div class="meeting-in-the-carriage">
        <img
          src="Meeting inside carriage.svg"
          alt="Meeting inside the carriage"
        />
      </div>
    </div>
  </section>

  <section class="third row almost-full-width" style="min-height: 1700px">
    <h2 class="subHeading text-center spacing">Our Services</h2>
    <div class="service-station-wrapper">
      <div class="tracks">
        <svg
          width="158"
          height="1536"
          viewBox="0 0 158 1536"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="service-track">
            <g id="Group">
              <path
                id="Vector"
                d="M158 30.4698L135.976 32.1982L116.82 32.1982L100.723 31.5327L57.2777 31.5327L41.1809 32.1982L22.0246 32.1982L0.000343132 30.4698L0.000343724 16.9345L22.0246 15.206L41.1809 15.206L57.2777 15.8716L100.723 15.8716L116.82 15.2061L135.976 15.2061L158 16.9345L158 30.4698Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_2"
                d="M39.1088 15.2062L24.0988 15.2062L24.0988 32.1984L39.1088 32.1984L39.1088 15.2062Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_3"
                d="M133.904 15.2062L118.894 15.2062L118.894 32.1984L133.904 32.1984L133.904 15.2062Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_4"
                d="M118.894 15.2062L116.82 15.2062L116.82 32.1984L118.894 32.1984L118.894 15.2062Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_5"
                d="M135.977 15.2059L133.904 15.2059L133.904 32.1981L135.977 32.1981L135.977 15.2059Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_6"
                d="M24.0988 15.2062L22.0257 15.2062L22.0257 32.1984L24.0988 32.1984L24.0988 15.2062Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_7"
                d="M41.1819 15.2062L39.1088 15.2062L39.1088 32.1984L41.1819 32.1984L41.1819 15.2062Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_8"
                d="M133.194 28.2435L133.194 19.1609L119.606 19.1609L119.606 28.2435L133.194 28.2435Z"
                fill="#37474F"
              />
              <path
                id="Vector_9"
                d="M38.3948 28.2435L38.3948 19.1609L24.8068 19.1609L24.8068 28.2435L38.3948 28.2435Z"
                fill="#37474F"
              />
              <path
                id="Vector_10"
                d="M57.2777 15.8718L41.1809 15.2062L41.1809 32.1984L57.2777 31.5329L57.2777 15.8718Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_11"
                d="M100.723 15.8718L116.82 15.2062L116.82 32.1984L100.723 31.5329L100.723 15.8718Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_12"
                d="M2.81534 30.6903L22.0244 32.1984L22.0244 15.2062L2.81534 16.7096L2.81534 30.6903Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_13"
                d="M155.185 30.6903L135.976 32.1984L135.976 15.2062L155.185 16.7096L155.185 30.6903Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_2">
              <path
                id="Vector_14"
                d="M158 313.47L135.976 315.198L116.82 315.198L100.723 314.533L57.2777 314.533L41.1809 315.198L22.0246 315.198L0.000343132 313.47L0.000343724 299.935L22.0246 298.206L41.1809 298.206L57.2777 298.872L100.723 298.872L116.82 298.206L135.976 298.206L158 299.935L158 313.47Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_15"
                d="M39.1088 298.206L24.0988 298.206L24.0988 315.198L39.1088 315.198L39.1088 298.206Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_16"
                d="M133.904 298.206L118.894 298.206L118.894 315.198L133.904 315.198L133.904 298.206Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_17"
                d="M118.894 298.206L116.82 298.206L116.82 315.198L118.894 315.198L118.894 298.206Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_18"
                d="M135.977 298.206L133.904 298.206L133.904 315.198L135.977 315.198L135.977 298.206Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_19"
                d="M24.0988 298.206L22.0257 298.206L22.0257 315.198L24.0988 315.198L24.0988 298.206Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_20"
                d="M41.1819 298.206L39.1088 298.206L39.1088 315.198L41.1819 315.198L41.1819 298.206Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_21"
                d="M133.194 311.244L133.194 302.161L119.606 302.161L119.606 311.244L133.194 311.244Z"
                fill="#37474F"
              />
              <path
                id="Vector_22"
                d="M38.3948 311.244L38.3948 302.161L24.8068 302.161L24.8068 311.244L38.3948 311.244Z"
                fill="#37474F"
              />
              <path
                id="Vector_23"
                d="M57.2777 298.872L41.1809 298.206L41.1809 315.198L57.2777 314.533L57.2777 298.872Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_24"
                d="M100.723 298.872L116.82 298.206L116.82 315.198L100.723 314.533L100.723 298.872Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_25"
                d="M2.81534 313.69L22.0244 315.198L22.0244 298.206L2.81534 299.71L2.81534 313.69Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_26"
                d="M155.185 313.69L135.976 315.198L135.976 298.206L155.185 299.71L155.185 313.69Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_3">
              <path
                id="Vector_27"
                d="M158 655.47L135.976 657.198L116.82 657.198L100.723 656.533L57.2777 656.533L41.1809 657.198L22.0246 657.198L0.000343132 655.47L0.000343724 641.935L22.0246 640.206L41.1809 640.206L57.2777 640.872L100.723 640.872L116.82 640.206L135.976 640.206L158 641.935L158 655.47Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_28"
                d="M39.1088 640.206L24.0988 640.206L24.0988 657.198L39.1088 657.198L39.1088 640.206Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_29"
                d="M133.904 640.206L118.894 640.206L118.894 657.198L133.904 657.198L133.904 640.206Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_30"
                d="M118.894 640.206L116.82 640.206L116.82 657.198L118.894 657.198L118.894 640.206Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_31"
                d="M135.977 640.206L133.904 640.206L133.904 657.198L135.977 657.198L135.977 640.206Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_32"
                d="M24.0988 640.206L22.0257 640.206L22.0257 657.198L24.0988 657.198L24.0988 640.206Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_33"
                d="M41.1819 640.206L39.1088 640.206L39.1088 657.198L41.1819 657.198L41.1819 640.206Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_34"
                d="M133.194 653.244L133.194 644.161L119.606 644.161L119.606 653.244L133.194 653.244Z"
                fill="#37474F"
              />
              <path
                id="Vector_35"
                d="M38.3948 653.244L38.3948 644.161L24.8068 644.161L24.8068 653.244L38.3948 653.244Z"
                fill="#37474F"
              />
              <path
                id="Vector_36"
                d="M57.2777 640.872L41.1809 640.206L41.1809 657.198L57.2777 656.533L57.2777 640.872Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_37"
                d="M100.723 640.872L116.82 640.206L116.82 657.198L100.723 656.533L100.723 640.872Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_38"
                d="M2.81534 655.69L22.0244 657.198L22.0244 640.206L2.81534 641.71L2.81534 655.69Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_39"
                d="M155.185 655.69L135.976 657.198L135.976 640.206L155.185 641.71L155.185 655.69Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_4">
              <path
                id="Vector_40"
                d="M158 997.47L135.976 999.198L116.82 999.198L100.723 998.533L57.2777 998.533L41.1809 999.198L22.0246 999.198L0.000343132 997.47L0.000343724 983.935L22.0246 982.206L41.1809 982.206L57.2777 982.872L100.723 982.872L116.82 982.206L135.976 982.206L158 983.935L158 997.47Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_41"
                d="M39.1088 982.206L24.0988 982.206L24.0988 999.198L39.1088 999.198L39.1088 982.206Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_42"
                d="M133.904 982.206L118.894 982.206L118.894 999.198L133.904 999.198L133.904 982.206Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_43"
                d="M118.894 982.206L116.82 982.206L116.82 999.198L118.894 999.198L118.894 982.206Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_44"
                d="M135.977 982.206L133.904 982.206L133.904 999.198L135.977 999.198L135.977 982.206Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_45"
                d="M24.0988 982.206L22.0257 982.206L22.0257 999.198L24.0988 999.198L24.0988 982.206Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_46"
                d="M41.1819 982.206L39.1088 982.206L39.1088 999.198L41.1819 999.198L41.1819 982.206Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_47"
                d="M133.194 995.244L133.194 986.161L119.606 986.161L119.606 995.244L133.194 995.244Z"
                fill="#37474F"
              />
              <path
                id="Vector_48"
                d="M38.3948 995.244L38.3948 986.161L24.8068 986.161L24.8068 995.244L38.3948 995.244Z"
                fill="#37474F"
              />
              <path
                id="Vector_49"
                d="M57.2777 982.872L41.1809 982.206L41.1809 999.198L57.2777 998.533L57.2777 982.872Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_50"
                d="M100.723 982.872L116.82 982.206L116.82 999.198L100.723 998.533L100.723 982.872Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_51"
                d="M2.81534 997.69L22.0244 999.198L22.0244 982.206L2.81534 983.71L2.81534 997.69Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_52"
                d="M155.185 997.69L135.976 999.198L135.976 982.206L155.185 983.71L155.185 997.69Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_5">
              <path
                id="Vector_53"
                d="M158 77.8701L135.976 79.5986L116.82 79.5986L100.723 78.9331L57.2777 78.9331L41.1809 79.5986L22.0246 79.5986L0.000343132 77.8701L0.000343724 64.3348L22.0246 62.6064L41.1809 62.6064L57.2777 63.2719L100.723 63.2719L116.82 62.6064L135.976 62.6064L158 64.3348L158 77.8701Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_54"
                d="M39.1088 62.6064L24.0988 62.6064L24.0988 79.5986L39.1088 79.5986L39.1088 62.6064Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_55"
                d="M133.904 62.6064L118.894 62.6064L118.894 79.5986L133.904 79.5986L133.904 62.6064Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_56"
                d="M118.894 62.6064L116.82 62.6064L116.82 79.5986L118.894 79.5986L118.894 62.6064Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_57"
                d="M135.976 62.6061L133.903 62.6061L133.903 79.5984L135.976 79.5984L135.976 62.6061Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_58"
                d="M24.0988 62.6064L22.0257 62.6064L22.0257 79.5986L24.0988 79.5986L24.0988 62.6064Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_59"
                d="M41.1819 62.6064L39.1088 62.6064L39.1088 79.5986L41.1819 79.5986L41.1819 62.6064Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_60"
                d="M133.194 75.6437L133.194 66.5611L119.606 66.5611L119.606 75.6437L133.194 75.6437Z"
                fill="#37474F"
              />
              <path
                id="Vector_61"
                d="M38.3948 75.6437L38.3948 66.5611L24.8068 66.5611L24.8068 75.6437L38.3948 75.6437Z"
                fill="#37474F"
              />
              <path
                id="Vector_62"
                d="M57.2777 63.2719L41.1809 62.6064L41.1809 79.5986L57.2777 78.9331L57.2777 63.2719Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_63"
                d="M100.723 63.2719L116.82 62.6064L116.82 79.5986L100.723 78.9331L100.723 63.2719Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_64"
                d="M2.81534 78.0904L22.0244 79.5986L22.0244 62.6064L2.81534 64.1098L2.81534 78.0904Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_65"
                d="M155.185 78.0904L135.976 79.5986L135.976 62.6064L155.185 64.1098L155.185 78.0904Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_6">
              <path
                id="Vector_66"
                d="M158 360.87L135.976 362.599L116.82 362.599L100.723 361.933L57.2777 361.933L41.1809 362.599L22.0246 362.599L0.000343132 360.87L0.000343724 347.335L22.0246 345.606L41.1809 345.606L57.2777 346.272L100.723 346.272L116.82 345.606L135.976 345.606L158 347.335L158 360.87Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_67"
                d="M39.1088 345.606L24.0988 345.606L24.0988 362.599L39.1088 362.599L39.1088 345.606Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_68"
                d="M133.904 345.606L118.894 345.606L118.894 362.599L133.904 362.599L133.904 345.606Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_69"
                d="M118.894 345.606L116.82 345.606L116.82 362.599L118.894 362.599L118.894 345.606Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_70"
                d="M135.976 345.606L133.903 345.606L133.903 362.598L135.976 362.598L135.976 345.606Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_71"
                d="M24.0988 345.606L22.0257 345.606L22.0257 362.599L24.0988 362.599L24.0988 345.606Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_72"
                d="M41.1819 345.606L39.1088 345.606L39.1088 362.599L41.1819 362.599L41.1819 345.606Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_73"
                d="M133.194 358.644L133.194 349.561L119.606 349.561L119.606 358.644L133.194 358.644Z"
                fill="#37474F"
              />
              <path
                id="Vector_74"
                d="M38.3948 358.644L38.3948 349.561L24.8068 349.561L24.8068 358.644L38.3948 358.644Z"
                fill="#37474F"
              />
              <path
                id="Vector_75"
                d="M57.2777 346.272L41.1809 345.606L41.1809 362.599L57.2777 361.933L57.2777 346.272Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_76"
                d="M100.723 346.272L116.82 345.606L116.82 362.599L100.723 361.933L100.723 346.272Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_77"
                d="M2.81534 361.09L22.0244 362.599L22.0244 345.606L2.81534 347.11L2.81534 361.09Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_78"
                d="M155.185 361.09L135.976 362.599L135.976 345.606L155.185 347.11L155.185 361.09Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_7">
              <path
                id="Vector_79"
                d="M158 702.87L135.976 704.599L116.82 704.599L100.723 703.933L57.2777 703.933L41.1809 704.599L22.0246 704.599L0.000343132 702.87L0.000343724 689.335L22.0246 687.606L41.1809 687.606L57.2777 688.272L100.723 688.272L116.82 687.606L135.976 687.606L158 689.335L158 702.87Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_80"
                d="M39.1088 687.606L24.0988 687.606L24.0988 704.599L39.1088 704.599L39.1088 687.606Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_81"
                d="M133.904 687.606L118.894 687.606L118.894 704.599L133.904 704.599L133.904 687.606Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_82"
                d="M118.894 687.606L116.82 687.606L116.82 704.599L118.894 704.599L118.894 687.606Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_83"
                d="M135.976 687.606L133.903 687.606L133.903 704.598L135.976 704.598L135.976 687.606Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_84"
                d="M24.0988 687.606L22.0257 687.606L22.0257 704.599L24.0988 704.599L24.0988 687.606Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_85"
                d="M41.1819 687.606L39.1088 687.606L39.1088 704.599L41.1819 704.599L41.1819 687.606Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_86"
                d="M133.194 700.644L133.194 691.561L119.606 691.561L119.606 700.644L133.194 700.644Z"
                fill="#37474F"
              />
              <path
                id="Vector_87"
                d="M38.3948 700.644L38.3948 691.561L24.8068 691.561L24.8068 700.644L38.3948 700.644Z"
                fill="#37474F"
              />
              <path
                id="Vector_88"
                d="M57.2777 688.272L41.1809 687.606L41.1809 704.599L57.2777 703.933L57.2777 688.272Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_89"
                d="M100.723 688.272L116.82 687.606L116.82 704.599L100.723 703.933L100.723 688.272Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_90"
                d="M2.81534 703.09L22.0244 704.599L22.0244 687.606L2.81534 689.11L2.81534 703.09Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_91"
                d="M155.185 703.09L135.976 704.599L135.976 687.606L155.185 689.11L155.185 703.09Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_8">
              <path
                id="Vector_92"
                d="M158 1044.87L135.976 1046.6L116.82 1046.6L100.723 1045.93L57.2777 1045.93L41.1809 1046.6L22.0246 1046.6L0.000343132 1044.87L0.000343724 1031.33L22.0246 1029.61L41.1809 1029.61L57.2777 1030.27L100.723 1030.27L116.82 1029.61L135.976 1029.61L158 1031.33L158 1044.87Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_93"
                d="M39.1088 1029.61L24.0988 1029.61L24.0988 1046.6L39.1088 1046.6L39.1088 1029.61Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_94"
                d="M133.904 1029.61L118.894 1029.61L118.894 1046.6L133.904 1046.6L133.904 1029.61Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_95"
                d="M118.894 1029.61L116.82 1029.61L116.82 1046.6L118.894 1046.6L118.894 1029.61Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_96"
                d="M135.976 1029.61L133.903 1029.61L133.903 1046.6L135.976 1046.6L135.976 1029.61Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_97"
                d="M24.0988 1029.61L22.0257 1029.61L22.0257 1046.6L24.0988 1046.6L24.0988 1029.61Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_98"
                d="M41.1819 1029.61L39.1088 1029.61L39.1088 1046.6L41.1819 1046.6L41.1819 1029.61Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_99"
                d="M133.194 1042.64L133.194 1033.56L119.606 1033.56L119.606 1042.64L133.194 1042.64Z"
                fill="#37474F"
              />
              <path
                id="Vector_100"
                d="M38.3948 1042.64L38.3948 1033.56L24.8068 1033.56L24.8068 1042.64L38.3948 1042.64Z"
                fill="#37474F"
              />
              <path
                id="Vector_101"
                d="M57.2777 1030.27L41.1809 1029.61L41.1809 1046.6L57.2777 1045.93L57.2777 1030.27Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_102"
                d="M100.723 1030.27L116.82 1029.61L116.82 1046.6L100.723 1045.93L100.723 1030.27Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_103"
                d="M2.81534 1045.09L22.0244 1046.6L22.0244 1029.61L2.81534 1031.11L2.81534 1045.09Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_104"
                d="M155.185 1045.09L135.976 1046.6L135.976 1029.61L155.185 1031.11L155.185 1045.09Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_9">
              <path
                id="Vector_105"
                d="M158 1233.87L135.976 1235.6L116.82 1235.6L100.723 1234.93L57.2777 1234.93L41.1809 1235.6L22.0246 1235.6L0.000343132 1233.87L0.000343724 1220.33L22.0246 1218.61L41.1809 1218.61L57.2777 1219.27L100.723 1219.27L116.82 1218.61L135.976 1218.61L158 1220.33L158 1233.87Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_106"
                d="M39.1088 1218.61L24.0988 1218.61L24.0988 1235.6L39.1088 1235.6L39.1088 1218.61Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_107"
                d="M133.904 1218.61L118.894 1218.61L118.894 1235.6L133.904 1235.6L133.904 1218.61Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_108"
                d="M118.894 1218.61L116.82 1218.61L116.82 1235.6L118.894 1235.6L118.894 1218.61Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_109"
                d="M135.976 1218.61L133.903 1218.61L133.903 1235.6L135.976 1235.6L135.976 1218.61Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_110"
                d="M24.0988 1218.61L22.0257 1218.61L22.0257 1235.6L24.0988 1235.6L24.0988 1218.61Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_111"
                d="M41.1819 1218.61L39.1088 1218.61L39.1088 1235.6L41.1819 1235.6L41.1819 1218.61Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_112"
                d="M133.194 1231.64L133.194 1222.56L119.606 1222.56L119.606 1231.64L133.194 1231.64Z"
                fill="#37474F"
              />
              <path
                id="Vector_113"
                d="M38.3948 1231.64L38.3948 1222.56L24.8068 1222.56L24.8068 1231.64L38.3948 1231.64Z"
                fill="#37474F"
              />
              <path
                id="Vector_114"
                d="M57.2777 1219.27L41.1809 1218.61L41.1809 1235.6L57.2777 1234.93L57.2777 1219.27Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_115"
                d="M100.723 1219.27L116.82 1218.61L116.82 1235.6L100.723 1234.93L100.723 1219.27Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_116"
                d="M2.81534 1234.09L22.0244 1235.6L22.0244 1218.61L2.81534 1220.11L2.81534 1234.09Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_117"
                d="M155.185 1234.09L135.976 1235.6L135.976 1218.61L155.185 1220.11L155.185 1234.09Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_10">
              <path
                id="Vector_118"
                d="M158 125.27L135.976 126.999L116.82 126.999L100.723 126.333L57.2777 126.333L41.1809 126.999L22.0246 126.999L0.000343132 125.27L0.000343724 111.735L22.0246 110.006L41.1809 110.006L57.2777 110.672L100.723 110.672L116.82 110.006L135.976 110.006L158 111.735L158 125.27Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_119"
                d="M39.1088 110.007L24.0988 110.007L24.0988 126.999L39.1088 126.999L39.1088 110.007Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_120"
                d="M133.904 110.007L118.894 110.007L118.894 126.999L133.904 126.999L133.904 110.007Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_121"
                d="M118.894 110.007L116.82 110.007L116.82 126.999L118.894 126.999L118.894 110.007Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_122"
                d="M135.976 110.006L133.903 110.006L133.903 126.998L135.976 126.998L135.976 110.006Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_123"
                d="M24.0988 110.007L22.0257 110.007L22.0257 126.999L24.0988 126.999L24.0988 110.007Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_124"
                d="M41.1819 110.007L39.1088 110.007L39.1088 126.999L41.1819 126.999L41.1819 110.007Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_125"
                d="M133.194 123.044L133.194 113.961L119.606 113.961L119.606 123.044L133.194 123.044Z"
                fill="#37474F"
              />
              <path
                id="Vector_126"
                d="M38.3948 123.044L38.3948 113.961L24.8068 113.961L24.8068 123.044L38.3948 123.044Z"
                fill="#37474F"
              />
              <path
                id="Vector_127"
                d="M57.2777 110.672L41.1809 110.007L41.1809 126.999L57.2777 126.333L57.2777 110.672Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_128"
                d="M100.723 110.672L116.82 110.007L116.82 126.999L100.723 126.333L100.723 110.672Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_129"
                d="M2.81534 125.491L22.0244 126.999L22.0244 110.007L2.81534 111.515L2.81534 125.491Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_130"
                d="M155.185 125.491L135.976 126.999L135.976 110.007L155.185 111.515L155.185 125.491Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_11">
              <path
                id="Vector_131"
                d="M158 408.27L135.976 409.999L116.82 409.999L100.723 409.333L57.2777 409.333L41.1809 409.999L22.0246 409.999L0.000343132 408.27L0.000343724 394.735L22.0246 393.006L41.1809 393.006L57.2777 393.672L100.723 393.672L116.82 393.006L135.976 393.006L158 394.735L158 408.27Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_132"
                d="M39.1088 393.007L24.0988 393.007L24.0988 409.999L39.1088 409.999L39.1088 393.007Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_133"
                d="M133.904 393.007L118.894 393.007L118.894 409.999L133.904 409.999L133.904 393.007Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_134"
                d="M118.894 393.007L116.82 393.007L116.82 409.999L118.894 409.999L118.894 393.007Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_135"
                d="M135.976 393.006L133.903 393.006L133.903 409.998L135.976 409.998L135.976 393.006Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_136"
                d="M24.0988 393.007L22.0257 393.007L22.0257 409.999L24.0988 409.999L24.0988 393.007Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_137"
                d="M41.1819 393.007L39.1088 393.007L39.1088 409.999L41.1819 409.999L41.1819 393.007Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_138"
                d="M133.194 406.044L133.194 396.961L119.606 396.961L119.606 406.044L133.194 406.044Z"
                fill="#37474F"
              />
              <path
                id="Vector_139"
                d="M38.3948 406.044L38.3948 396.961L24.8068 396.961L24.8068 406.044L38.3948 406.044Z"
                fill="#37474F"
              />
              <path
                id="Vector_140"
                d="M57.2777 393.672L41.1809 393.007L41.1809 409.999L57.2777 409.333L57.2777 393.672Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_141"
                d="M100.723 393.672L116.82 393.007L116.82 409.999L100.723 409.333L100.723 393.672Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_142"
                d="M2.81534 408.491L22.0244 409.999L22.0244 393.007L2.81534 394.515L2.81534 408.491Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_143"
                d="M155.185 408.491L135.976 409.999L135.976 393.007L155.185 394.515L155.185 408.491Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_12">
              <path
                id="Vector_144"
                d="M158 750.27L135.976 751.999L116.82 751.999L100.723 751.333L57.2777 751.333L41.1809 751.999L22.0246 751.999L0.000343132 750.27L0.000343724 736.735L22.0246 735.006L41.1809 735.006L57.2777 735.672L100.723 735.672L116.82 735.006L135.976 735.006L158 736.735L158 750.27Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_145"
                d="M39.1088 735.007L24.0988 735.007L24.0988 751.999L39.1088 751.999L39.1088 735.007Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_146"
                d="M133.904 735.007L118.894 735.007L118.894 751.999L133.904 751.999L133.904 735.007Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_147"
                d="M118.894 735.007L116.82 735.007L116.82 751.999L118.894 751.999L118.894 735.007Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_148"
                d="M135.976 735.006L133.903 735.006L133.903 751.998L135.976 751.998L135.976 735.006Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_149"
                d="M24.0988 735.007L22.0257 735.007L22.0257 751.999L24.0988 751.999L24.0988 735.007Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_150"
                d="M41.1819 735.007L39.1088 735.007L39.1088 751.999L41.1819 751.999L41.1819 735.007Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_151"
                d="M133.194 748.044L133.194 738.961L119.606 738.961L119.606 748.044L133.194 748.044Z"
                fill="#37474F"
              />
              <path
                id="Vector_152"
                d="M38.3948 748.044L38.3948 738.961L24.8068 738.961L24.8068 748.044L38.3948 748.044Z"
                fill="#37474F"
              />
              <path
                id="Vector_153"
                d="M57.2777 735.672L41.1809 735.007L41.1809 751.999L57.2777 751.333L57.2777 735.672Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_154"
                d="M100.723 735.672L116.82 735.007L116.82 751.999L100.723 751.333L100.723 735.672Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_155"
                d="M2.81534 750.491L22.0244 751.999L22.0244 735.007L2.81534 736.515L2.81534 750.491Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_156"
                d="M155.185 750.491L135.976 751.999L135.976 735.007L155.185 736.515L155.185 750.491Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_13">
              <path
                id="Vector_157"
                d="M158 1092.27L135.976 1094L116.82 1094L100.723 1093.33L57.2777 1093.33L41.1809 1094L22.0246 1094L0.000343132 1092.27L0.000343724 1078.73L22.0246 1077.01L41.1809 1077.01L57.2777 1077.67L100.723 1077.67L116.82 1077.01L135.976 1077.01L158 1078.73L158 1092.27Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_158"
                d="M39.1088 1077.01L24.0988 1077.01L24.0988 1094L39.1088 1094L39.1088 1077.01Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_159"
                d="M133.904 1077.01L118.894 1077.01L118.894 1094L133.904 1094L133.904 1077.01Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_160"
                d="M118.894 1077.01L116.82 1077.01L116.82 1094L118.894 1094L118.894 1077.01Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_161"
                d="M135.976 1077.01L133.903 1077.01L133.903 1094L135.976 1094L135.976 1077.01Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_162"
                d="M24.0988 1077.01L22.0257 1077.01L22.0257 1094L24.0988 1094L24.0988 1077.01Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_163"
                d="M41.1819 1077.01L39.1088 1077.01L39.1088 1094L41.1819 1094L41.1819 1077.01Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_164"
                d="M133.194 1090.04L133.194 1080.96L119.606 1080.96L119.606 1090.04L133.194 1090.04Z"
                fill="#37474F"
              />
              <path
                id="Vector_165"
                d="M38.3948 1090.04L38.3948 1080.96L24.8068 1080.96L24.8068 1090.04L38.3948 1090.04Z"
                fill="#37474F"
              />
              <path
                id="Vector_166"
                d="M57.2777 1077.67L41.1809 1077.01L41.1809 1094L57.2777 1093.33L57.2777 1077.67Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_167"
                d="M100.723 1077.67L116.82 1077.01L116.82 1094L100.723 1093.33L100.723 1077.67Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_168"
                d="M2.81534 1092.49L22.0244 1094L22.0244 1077.01L2.81534 1078.51L2.81534 1092.49Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_169"
                d="M155.185 1092.49L135.976 1094L135.976 1077.01L155.185 1078.51L155.185 1092.49Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_14">
              <path
                id="Vector_170"
                d="M158 1281.27L135.976 1283L116.82 1283L100.723 1282.33L57.2777 1282.33L41.1809 1283L22.0246 1283L0.000343132 1281.27L0.000343724 1267.73L22.0246 1266.01L41.1809 1266.01L57.2777 1266.67L100.723 1266.67L116.82 1266.01L135.976 1266.01L158 1267.73L158 1281.27Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_171"
                d="M39.1088 1266.01L24.0988 1266.01L24.0988 1283L39.1088 1283L39.1088 1266.01Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_172"
                d="M133.904 1266.01L118.894 1266.01L118.894 1283L133.904 1283L133.904 1266.01Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_173"
                d="M118.894 1266.01L116.82 1266.01L116.82 1283L118.894 1283L118.894 1266.01Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_174"
                d="M135.976 1266.01L133.903 1266.01L133.903 1283L135.976 1283L135.976 1266.01Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_175"
                d="M24.0988 1266.01L22.0257 1266.01L22.0257 1283L24.0988 1283L24.0988 1266.01Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_176"
                d="M41.1819 1266.01L39.1088 1266.01L39.1088 1283L41.1819 1283L41.1819 1266.01Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_177"
                d="M133.194 1279.04L133.194 1269.96L119.606 1269.96L119.606 1279.04L133.194 1279.04Z"
                fill="#37474F"
              />
              <path
                id="Vector_178"
                d="M38.3948 1279.04L38.3948 1269.96L24.8068 1269.96L24.8068 1279.04L38.3948 1279.04Z"
                fill="#37474F"
              />
              <path
                id="Vector_179"
                d="M57.2777 1266.67L41.1809 1266.01L41.1809 1283L57.2777 1282.33L57.2777 1266.67Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_180"
                d="M100.723 1266.67L116.82 1266.01L116.82 1283L100.723 1282.33L100.723 1266.67Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_181"
                d="M2.81534 1281.49L22.0244 1283L22.0244 1266.01L2.81534 1267.51L2.81534 1281.49Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_182"
                d="M155.185 1281.49L135.976 1283L135.976 1266.01L155.185 1267.51L155.185 1281.49Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_15">
              <path
                id="Vector_183"
                d="M158 172.67L135.976 174.398L116.82 174.398L100.723 173.732L57.2777 173.732L41.1809 174.398L22.0246 174.398L0.000343132 172.67L0.000343724 159.134L22.0246 157.406L41.1809 157.406L57.2777 158.071L100.723 158.071L116.82 157.406L135.976 157.406L158 159.134L158 172.67Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_184"
                d="M39.1088 157.406L24.0988 157.406L24.0988 174.398L39.1088 174.398L39.1088 157.406Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_185"
                d="M133.904 157.406L118.894 157.406L118.894 174.398L133.904 174.398L133.904 157.406Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_186"
                d="M118.894 157.406L116.82 157.406L116.82 174.398L118.894 174.398L118.894 157.406Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_187"
                d="M135.977 157.406L133.904 157.406L133.904 174.398L135.977 174.398L135.977 157.406Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_188"
                d="M24.0988 157.406L22.0257 157.406L22.0257 174.398L24.0988 174.398L24.0988 157.406Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_189"
                d="M41.1819 157.406L39.1088 157.406L39.1088 174.398L41.1819 174.398L41.1819 157.406Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_190"
                d="M133.194 170.444L133.194 161.361L119.606 161.361L119.606 170.444L133.194 170.444Z"
                fill="#37474F"
              />
              <path
                id="Vector_191"
                d="M38.3948 170.444L38.3948 161.361L24.8068 161.361L24.8068 170.444L38.3948 170.444Z"
                fill="#37474F"
              />
              <path
                id="Vector_192"
                d="M57.2777 158.072L41.1809 157.406L41.1809 174.398L57.2777 173.733L57.2777 158.072Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_193"
                d="M100.723 158.072L116.82 157.406L116.82 174.398L100.723 173.733L100.723 158.072Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_194"
                d="M2.81534 172.89L22.0244 174.398L22.0244 157.406L2.81534 158.91L2.81534 172.89Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_195"
                d="M155.185 172.89L135.976 174.398L135.976 157.406L155.185 158.91L155.185 172.89Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_16">
              <path
                id="Vector_196"
                d="M158 455.67L135.976 457.398L116.82 457.398L100.723 456.732L57.2777 456.732L41.1809 457.398L22.0246 457.398L0.000343132 455.67L0.000343724 442.134L22.0246 440.406L41.1809 440.406L57.2777 441.071L100.723 441.071L116.82 440.406L135.976 440.406L158 442.134L158 455.67Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_197"
                d="M39.1088 440.406L24.0988 440.406L24.0988 457.398L39.1088 457.398L39.1088 440.406Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_198"
                d="M133.904 440.406L118.894 440.406L118.894 457.398L133.904 457.398L133.904 440.406Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_199"
                d="M118.894 440.406L116.82 440.406L116.82 457.398L118.894 457.398L118.894 440.406Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_200"
                d="M135.977 440.406L133.904 440.406L133.904 457.398L135.977 457.398L135.977 440.406Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_201"
                d="M24.0988 440.406L22.0257 440.406L22.0257 457.398L24.0988 457.398L24.0988 440.406Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_202"
                d="M41.1819 440.406L39.1088 440.406L39.1088 457.398L41.1819 457.398L41.1819 440.406Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_203"
                d="M133.194 453.444L133.194 444.361L119.606 444.361L119.606 453.444L133.194 453.444Z"
                fill="#37474F"
              />
              <path
                id="Vector_204"
                d="M38.3948 453.444L38.3948 444.361L24.8068 444.361L24.8068 453.444L38.3948 453.444Z"
                fill="#37474F"
              />
              <path
                id="Vector_205"
                d="M57.2777 441.072L41.1809 440.406L41.1809 457.398L57.2777 456.733L57.2777 441.072Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_206"
                d="M100.723 441.072L116.82 440.406L116.82 457.398L100.723 456.733L100.723 441.072Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_207"
                d="M2.81534 455.89L22.0244 457.398L22.0244 440.406L2.81534 441.91L2.81534 455.89Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_208"
                d="M155.185 455.89L135.976 457.398L135.976 440.406L155.185 441.91L155.185 455.89Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_17">
              <path
                id="Vector_209"
                d="M158 797.67L135.976 799.398L116.82 799.398L100.723 798.732L57.2777 798.732L41.1809 799.398L22.0246 799.398L0.000343132 797.67L0.000343724 784.134L22.0246 782.406L41.1809 782.406L57.2777 783.071L100.723 783.071L116.82 782.406L135.976 782.406L158 784.134L158 797.67Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_210"
                d="M39.1088 782.406L24.0988 782.406L24.0988 799.398L39.1088 799.398L39.1088 782.406Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_211"
                d="M133.904 782.406L118.894 782.406L118.894 799.398L133.904 799.398L133.904 782.406Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_212"
                d="M118.894 782.406L116.82 782.406L116.82 799.398L118.894 799.398L118.894 782.406Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_213"
                d="M135.977 782.406L133.904 782.406L133.904 799.398L135.977 799.398L135.977 782.406Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_214"
                d="M24.0988 782.406L22.0257 782.406L22.0257 799.398L24.0988 799.398L24.0988 782.406Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_215"
                d="M41.1819 782.406L39.1088 782.406L39.1088 799.398L41.1819 799.398L41.1819 782.406Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_216"
                d="M133.194 795.444L133.194 786.361L119.606 786.361L119.606 795.444L133.194 795.444Z"
                fill="#37474F"
              />
              <path
                id="Vector_217"
                d="M38.3948 795.444L38.3948 786.361L24.8068 786.361L24.8068 795.444L38.3948 795.444Z"
                fill="#37474F"
              />
              <path
                id="Vector_218"
                d="M57.2777 783.072L41.1809 782.406L41.1809 799.398L57.2777 798.733L57.2777 783.072Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_219"
                d="M100.723 783.072L116.82 782.406L116.82 799.398L100.723 798.733L100.723 783.072Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_220"
                d="M2.81534 797.89L22.0244 799.398L22.0244 782.406L2.81534 783.91L2.81534 797.89Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_221"
                d="M155.185 797.89L135.976 799.398L135.976 782.406L155.185 783.91L155.185 797.89Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_18">
              <path
                id="Vector_222"
                d="M158 1139.67L135.976 1141.4L116.82 1141.4L100.723 1140.73L57.2777 1140.73L41.1809 1141.4L22.0246 1141.4L0.000343132 1139.67L0.000343724 1126.13L22.0246 1124.41L41.1809 1124.41L57.2777 1125.07L100.723 1125.07L116.82 1124.41L135.976 1124.41L158 1126.13L158 1139.67Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_223"
                d="M39.1088 1124.41L24.0988 1124.41L24.0988 1141.4L39.1088 1141.4L39.1088 1124.41Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_224"
                d="M133.904 1124.41L118.894 1124.41L118.894 1141.4L133.904 1141.4L133.904 1124.41Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_225"
                d="M118.894 1124.41L116.82 1124.41L116.82 1141.4L118.894 1141.4L118.894 1124.41Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_226"
                d="M135.977 1124.41L133.904 1124.41L133.904 1141.4L135.977 1141.4L135.977 1124.41Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_227"
                d="M24.0988 1124.41L22.0257 1124.41L22.0257 1141.4L24.0988 1141.4L24.0988 1124.41Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_228"
                d="M41.1819 1124.41L39.1088 1124.41L39.1088 1141.4L41.1819 1141.4L41.1819 1124.41Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_229"
                d="M133.194 1137.44L133.194 1128.36L119.606 1128.36L119.606 1137.44L133.194 1137.44Z"
                fill="#37474F"
              />
              <path
                id="Vector_230"
                d="M38.3948 1137.44L38.3948 1128.36L24.8068 1128.36L24.8068 1137.44L38.3948 1137.44Z"
                fill="#37474F"
              />
              <path
                id="Vector_231"
                d="M57.2777 1125.07L41.1809 1124.41L41.1809 1141.4L57.2777 1140.73L57.2777 1125.07Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_232"
                d="M100.723 1125.07L116.82 1124.41L116.82 1141.4L100.723 1140.73L100.723 1125.07Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_233"
                d="M2.81534 1139.89L22.0244 1141.4L22.0244 1124.41L2.81534 1125.91L2.81534 1139.89Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_234"
                d="M155.185 1139.89L135.976 1141.4L135.976 1124.41L155.185 1125.91L155.185 1139.89Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_19">
              <path
                id="Vector_235"
                d="M158 1328.67L135.976 1330.4L116.82 1330.4L100.723 1329.73L57.2777 1329.73L41.1809 1330.4L22.0246 1330.4L0.000343132 1328.67L0.000343724 1315.13L22.0246 1313.41L41.1809 1313.41L57.2777 1314.07L100.723 1314.07L116.82 1313.41L135.976 1313.41L158 1315.13L158 1328.67Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_236"
                d="M39.1088 1313.41L24.0988 1313.41L24.0988 1330.4L39.1088 1330.4L39.1088 1313.41Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_237"
                d="M133.904 1313.41L118.894 1313.41L118.894 1330.4L133.904 1330.4L133.904 1313.41Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_238"
                d="M118.894 1313.41L116.82 1313.41L116.82 1330.4L118.894 1330.4L118.894 1313.41Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_239"
                d="M135.977 1313.41L133.904 1313.41L133.904 1330.4L135.977 1330.4L135.977 1313.41Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_240"
                d="M24.0988 1313.41L22.0257 1313.41L22.0257 1330.4L24.0988 1330.4L24.0988 1313.41Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_241"
                d="M41.1819 1313.41L39.1088 1313.41L39.1088 1330.4L41.1819 1330.4L41.1819 1313.41Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_242"
                d="M133.194 1326.44L133.194 1317.36L119.606 1317.36L119.606 1326.44L133.194 1326.44Z"
                fill="#37474F"
              />
              <path
                id="Vector_243"
                d="M38.3948 1326.44L38.3948 1317.36L24.8068 1317.36L24.8068 1326.44L38.3948 1326.44Z"
                fill="#37474F"
              />
              <path
                id="Vector_244"
                d="M57.2777 1314.07L41.1809 1313.41L41.1809 1330.4L57.2777 1329.73L57.2777 1314.07Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_245"
                d="M100.723 1314.07L116.82 1313.41L116.82 1330.4L100.723 1329.73L100.723 1314.07Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_246"
                d="M2.81534 1328.89L22.0244 1330.4L22.0244 1313.41L2.81534 1314.91L2.81534 1328.89Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_247"
                d="M155.185 1328.89L135.976 1330.4L135.976 1313.41L155.185 1314.91L155.185 1328.89Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_20">
              <path
                id="Vector_248"
                d="M158 220.07L135.976 221.798L116.82 221.798L100.723 221.133L57.2777 221.133L41.1809 221.798L22.0246 221.798L0.000343132 220.07L0.000343724 206.535L22.0246 204.806L41.1809 204.806L57.2777 205.472L100.723 205.472L116.82 204.806L135.976 204.806L158 206.535L158 220.07Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_249"
                d="M39.1088 204.807L24.0988 204.807L24.0988 221.799L39.1088 221.799L39.1088 204.807Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_250"
                d="M133.904 204.807L118.894 204.807L118.894 221.799L133.904 221.799L133.904 204.807Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_251"
                d="M118.894 204.807L116.82 204.807L116.82 221.799L118.894 221.799L118.894 204.807Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_252"
                d="M135.977 204.806L133.904 204.806L133.904 221.798L135.977 221.798L135.977 204.806Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_253"
                d="M24.0988 204.807L22.0257 204.807L22.0257 221.799L24.0988 221.799L24.0988 204.807Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_254"
                d="M41.1819 204.807L39.1088 204.807L39.1088 221.799L41.1819 221.799L41.1819 204.807Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_255"
                d="M133.194 217.843L133.194 208.761L119.606 208.761L119.606 217.843L133.194 217.843Z"
                fill="#37474F"
              />
              <path
                id="Vector_256"
                d="M38.3948 217.843L38.3948 208.761L24.8068 208.761L24.8068 217.843L38.3948 217.843Z"
                fill="#37474F"
              />
              <path
                id="Vector_257"
                d="M57.2777 205.472L41.1809 204.807L41.1809 221.799L57.2777 221.133L57.2777 205.472Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_258"
                d="M100.723 205.472L116.82 204.807L116.82 221.799L100.723 221.133L100.723 205.472Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_259"
                d="M2.81534 220.29L22.0244 221.799L22.0244 204.807L2.81534 206.31L2.81534 220.29Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_260"
                d="M155.185 220.29L135.976 221.799L135.976 204.807L155.185 206.31L155.185 220.29Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_21">
              <path
                id="Vector_261"
                d="M158 503.07L135.976 504.798L116.82 504.798L100.723 504.133L57.2777 504.133L41.1809 504.798L22.0246 504.798L0.000343132 503.07L0.000343724 489.535L22.0246 487.806L41.1809 487.806L57.2777 488.472L100.723 488.472L116.82 487.806L135.976 487.806L158 489.535L158 503.07Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_262"
                d="M39.1088 487.807L24.0988 487.807L24.0988 504.799L39.1088 504.799L39.1088 487.807Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_263"
                d="M133.904 487.807L118.894 487.807L118.894 504.799L133.904 504.799L133.904 487.807Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_264"
                d="M118.894 487.807L116.82 487.807L116.82 504.799L118.894 504.799L118.894 487.807Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_265"
                d="M135.977 487.806L133.904 487.806L133.904 504.798L135.977 504.798L135.977 487.806Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_266"
                d="M24.0988 487.807L22.0257 487.807L22.0257 504.799L24.0988 504.799L24.0988 487.807Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_267"
                d="M41.1819 487.807L39.1088 487.807L39.1088 504.799L41.1819 504.799L41.1819 487.807Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_268"
                d="M133.194 500.843L133.194 491.761L119.606 491.761L119.606 500.843L133.194 500.843Z"
                fill="#37474F"
              />
              <path
                id="Vector_269"
                d="M38.3948 500.843L38.3948 491.761L24.8068 491.761L24.8068 500.843L38.3948 500.843Z"
                fill="#37474F"
              />
              <path
                id="Vector_270"
                d="M57.2777 488.472L41.1809 487.807L41.1809 504.799L57.2777 504.133L57.2777 488.472Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_271"
                d="M100.723 488.472L116.82 487.807L116.82 504.799L100.723 504.133L100.723 488.472Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_272"
                d="M2.81534 503.29L22.0244 504.799L22.0244 487.807L2.81534 489.31L2.81534 503.29Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_273"
                d="M155.185 503.29L135.976 504.799L135.976 487.807L155.185 489.31L155.185 503.29Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_22">
              <path
                id="Vector_274"
                d="M158 845.07L135.976 846.798L116.82 846.798L100.723 846.133L57.2777 846.133L41.1809 846.798L22.0246 846.798L0.000343132 845.07L0.000343724 831.535L22.0246 829.806L41.1809 829.806L57.2777 830.472L100.723 830.472L116.82 829.806L135.976 829.806L158 831.535L158 845.07Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_275"
                d="M39.1088 829.807L24.0988 829.807L24.0988 846.799L39.1088 846.799L39.1088 829.807Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_276"
                d="M133.904 829.807L118.894 829.807L118.894 846.799L133.904 846.799L133.904 829.807Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_277"
                d="M118.894 829.807L116.82 829.807L116.82 846.799L118.894 846.799L118.894 829.807Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_278"
                d="M135.977 829.806L133.904 829.806L133.904 846.798L135.977 846.798L135.977 829.806Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_279"
                d="M24.0988 829.807L22.0257 829.807L22.0257 846.799L24.0988 846.799L24.0988 829.807Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_280"
                d="M41.1819 829.807L39.1088 829.807L39.1088 846.799L41.1819 846.799L41.1819 829.807Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_281"
                d="M133.194 842.843L133.194 833.761L119.606 833.761L119.606 842.843L133.194 842.843Z"
                fill="#37474F"
              />
              <path
                id="Vector_282"
                d="M38.3948 842.843L38.3948 833.761L24.8068 833.761L24.8068 842.843L38.3948 842.843Z"
                fill="#37474F"
              />
              <path
                id="Vector_283"
                d="M57.2777 830.472L41.1809 829.807L41.1809 846.799L57.2777 846.133L57.2777 830.472Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_284"
                d="M100.723 830.472L116.82 829.807L116.82 846.799L100.723 846.133L100.723 830.472Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_285"
                d="M2.81534 845.29L22.0244 846.799L22.0244 829.807L2.81534 831.31L2.81534 845.29Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_286"
                d="M155.185 845.29L135.976 846.799L135.976 829.807L155.185 831.31L155.185 845.29Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_23">
              <path
                id="Vector_287"
                d="M158 1187.07L135.976 1188.8L116.82 1188.8L100.723 1188.13L57.2777 1188.13L41.1809 1188.8L22.0246 1188.8L0.000343132 1187.07L0.000343724 1173.53L22.0246 1171.81L41.1809 1171.81L57.2777 1172.47L100.723 1172.47L116.82 1171.81L135.976 1171.81L158 1173.53L158 1187.07Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_288"
                d="M39.1088 1171.81L24.0988 1171.81L24.0988 1188.8L39.1088 1188.8L39.1088 1171.81Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_289"
                d="M133.904 1171.81L118.894 1171.81L118.894 1188.8L133.904 1188.8L133.904 1171.81Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_290"
                d="M118.894 1171.81L116.82 1171.81L116.82 1188.8L118.894 1188.8L118.894 1171.81Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_291"
                d="M135.977 1171.81L133.904 1171.81L133.904 1188.8L135.977 1188.8L135.977 1171.81Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_292"
                d="M24.0988 1171.81L22.0257 1171.81L22.0257 1188.8L24.0988 1188.8L24.0988 1171.81Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_293"
                d="M41.1819 1171.81L39.1088 1171.81L39.1088 1188.8L41.1819 1188.8L41.1819 1171.81Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_294"
                d="M133.194 1184.84L133.194 1175.76L119.606 1175.76L119.606 1184.84L133.194 1184.84Z"
                fill="#37474F"
              />
              <path
                id="Vector_295"
                d="M38.3948 1184.84L38.3948 1175.76L24.8068 1175.76L24.8068 1184.84L38.3948 1184.84Z"
                fill="#37474F"
              />
              <path
                id="Vector_296"
                d="M57.2777 1172.47L41.1809 1171.81L41.1809 1188.8L57.2777 1188.13L57.2777 1172.47Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_297"
                d="M100.723 1172.47L116.82 1171.81L116.82 1188.8L100.723 1188.13L100.723 1172.47Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_298"
                d="M2.81534 1187.29L22.0244 1188.8L22.0244 1171.81L2.81534 1173.31L2.81534 1187.29Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_299"
                d="M155.185 1187.29L135.976 1188.8L135.976 1171.81L155.185 1173.31L155.185 1187.29Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_24">
              <path
                id="Vector_300"
                d="M158 1376.07L135.976 1377.8L116.82 1377.8L100.723 1377.13L57.2777 1377.13L41.1809 1377.8L22.0246 1377.8L0.000343132 1376.07L0.000343724 1362.53L22.0246 1360.81L41.1809 1360.81L57.2777 1361.47L100.723 1361.47L116.82 1360.81L135.976 1360.81L158 1362.53L158 1376.07Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_301"
                d="M39.1088 1360.81L24.0988 1360.81L24.0988 1377.8L39.1088 1377.8L39.1088 1360.81Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_302"
                d="M133.904 1360.81L118.894 1360.81L118.894 1377.8L133.904 1377.8L133.904 1360.81Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_303"
                d="M118.894 1360.81L116.82 1360.81L116.82 1377.8L118.894 1377.8L118.894 1360.81Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_304"
                d="M135.977 1360.81L133.904 1360.81L133.904 1377.8L135.977 1377.8L135.977 1360.81Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_305"
                d="M24.0988 1360.81L22.0257 1360.81L22.0257 1377.8L24.0988 1377.8L24.0988 1360.81Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_306"
                d="M41.1819 1360.81L39.1088 1360.81L39.1088 1377.8L41.1819 1377.8L41.1819 1360.81Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_307"
                d="M133.194 1373.84L133.194 1364.76L119.606 1364.76L119.606 1373.84L133.194 1373.84Z"
                fill="#37474F"
              />
              <path
                id="Vector_308"
                d="M38.3948 1373.84L38.3948 1364.76L24.8068 1364.76L24.8068 1373.84L38.3948 1373.84Z"
                fill="#37474F"
              />
              <path
                id="Vector_309"
                d="M57.2777 1361.47L41.1809 1360.81L41.1809 1377.8L57.2777 1377.13L57.2777 1361.47Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_310"
                d="M100.723 1361.47L116.82 1360.81L116.82 1377.8L100.723 1377.13L100.723 1361.47Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_311"
                d="M2.81534 1376.29L22.0244 1377.8L22.0244 1360.81L2.81534 1362.31L2.81534 1376.29Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_312"
                d="M155.185 1376.29L135.976 1377.8L135.976 1360.81L155.185 1362.31L155.185 1376.29Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_25">
              <path
                id="Vector_313"
                d="M158 267.47L135.976 269.198L116.82 269.198L100.723 268.533L57.2777 268.533L41.1809 269.198L22.0246 269.198L0.000343132 267.47L0.000343724 253.935L22.0246 252.206L41.1809 252.206L57.2777 252.872L100.723 252.872L116.82 252.206L135.976 252.206L158 253.935L158 267.47Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_314"
                d="M39.1088 252.207L24.0988 252.207L24.0988 269.199L39.1088 269.199L39.1088 252.207Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_315"
                d="M133.904 252.207L118.894 252.207L118.894 269.199L133.904 269.199L133.904 252.207Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_316"
                d="M118.894 252.207L116.82 252.207L116.82 269.199L118.894 269.199L118.894 252.207Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_317"
                d="M135.977 252.206L133.904 252.206L133.904 269.198L135.977 269.198L135.977 252.206Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_318"
                d="M24.0988 252.207L22.0257 252.207L22.0257 269.199L24.0988 269.199L24.0988 252.207Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_319"
                d="M41.1819 252.207L39.1088 252.207L39.1088 269.199L41.1819 269.199L41.1819 252.207Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_320"
                d="M133.194 265.244L133.194 256.161L119.606 256.161L119.606 265.244L133.194 265.244Z"
                fill="#37474F"
              />
              <path
                id="Vector_321"
                d="M38.3948 265.244L38.3948 256.161L24.8068 256.161L24.8068 265.244L38.3948 265.244Z"
                fill="#37474F"
              />
              <path
                id="Vector_322"
                d="M57.2777 252.872L41.1809 252.207L41.1809 269.199L57.2777 268.533L57.2777 252.872Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_323"
                d="M100.723 252.872L116.82 252.207L116.82 269.199L100.723 268.533L100.723 252.872Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_324"
                d="M2.81534 267.691L22.0244 269.199L22.0244 252.207L2.81534 253.71L2.81534 267.691Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_325"
                d="M155.185 267.691L135.976 269.199L135.976 252.207L155.185 253.71L155.185 267.691Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_26">
              <path
                id="Vector_326"
                d="M158 550.47L135.976 552.198L116.82 552.198L100.723 551.533L57.2777 551.533L41.1809 552.198L22.0246 552.198L0.000343132 550.47L0.000343724 536.935L22.0246 535.206L41.1809 535.206L57.2777 535.872L100.723 535.872L116.82 535.206L135.976 535.206L158 536.935L158 550.47Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_327"
                d="M39.1088 535.207L24.0988 535.207L24.0988 552.199L39.1088 552.199L39.1088 535.207Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_328"
                d="M133.904 535.207L118.894 535.207L118.894 552.199L133.904 552.199L133.904 535.207Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_329"
                d="M118.894 535.207L116.82 535.207L116.82 552.199L118.894 552.199L118.894 535.207Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_330"
                d="M135.977 535.206L133.904 535.206L133.904 552.198L135.977 552.198L135.977 535.206Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_331"
                d="M24.0988 535.207L22.0257 535.207L22.0257 552.199L24.0988 552.199L24.0988 535.207Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_332"
                d="M41.1819 535.207L39.1088 535.207L39.1088 552.199L41.1819 552.199L41.1819 535.207Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_333"
                d="M133.194 548.244L133.194 539.161L119.606 539.161L119.606 548.244L133.194 548.244Z"
                fill="#37474F"
              />
              <path
                id="Vector_334"
                d="M38.3948 548.244L38.3948 539.161L24.8068 539.161L24.8068 548.244L38.3948 548.244Z"
                fill="#37474F"
              />
              <path
                id="Vector_335"
                d="M57.2777 535.872L41.1809 535.207L41.1809 552.199L57.2777 551.533L57.2777 535.872Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_336"
                d="M100.723 535.872L116.82 535.207L116.82 552.199L100.723 551.533L100.723 535.872Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_337"
                d="M2.81534 550.691L22.0244 552.199L22.0244 535.207L2.81534 536.71L2.81534 550.691Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_338"
                d="M155.185 550.691L135.976 552.199L135.976 535.207L155.185 536.71L155.185 550.691Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_27">
              <path
                id="Vector_339"
                d="M158 892.47L135.976 894.198L116.82 894.198L100.723 893.533L57.2777 893.533L41.1809 894.198L22.0246 894.198L0.000343132 892.47L0.000343724 878.935L22.0246 877.206L41.1809 877.206L57.2777 877.872L100.723 877.872L116.82 877.206L135.976 877.206L158 878.935L158 892.47Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_340"
                d="M39.1088 877.207L24.0988 877.207L24.0988 894.199L39.1088 894.199L39.1088 877.207Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_341"
                d="M133.904 877.207L118.894 877.207L118.894 894.199L133.904 894.199L133.904 877.207Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_342"
                d="M118.894 877.207L116.82 877.207L116.82 894.199L118.894 894.199L118.894 877.207Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_343"
                d="M135.977 877.206L133.904 877.206L133.904 894.198L135.977 894.198L135.977 877.206Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_344"
                d="M24.0988 877.207L22.0257 877.207L22.0257 894.199L24.0988 894.199L24.0988 877.207Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_345"
                d="M41.1819 877.207L39.1088 877.207L39.1088 894.199L41.1819 894.199L41.1819 877.207Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_346"
                d="M133.194 890.244L133.194 881.161L119.606 881.161L119.606 890.244L133.194 890.244Z"
                fill="#37474F"
              />
              <path
                id="Vector_347"
                d="M38.3948 890.244L38.3948 881.161L24.8068 881.161L24.8068 890.244L38.3948 890.244Z"
                fill="#37474F"
              />
              <path
                id="Vector_348"
                d="M57.2777 877.872L41.1809 877.207L41.1809 894.199L57.2777 893.533L57.2777 877.872Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_349"
                d="M100.723 877.872L116.82 877.207L116.82 894.199L100.723 893.533L100.723 877.872Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_350"
                d="M2.81534 892.691L22.0244 894.199L22.0244 877.207L2.81534 878.71L2.81534 892.691Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_351"
                d="M155.185 892.691L135.976 894.199L135.976 877.207L155.185 878.71L155.185 892.691Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_28">
              <path
                id="Vector_352"
                d="M158 1234.47L135.976 1236.2L116.82 1236.2L100.723 1235.53L57.2777 1235.53L41.1809 1236.2L22.0246 1236.2L0.000343132 1234.47L0.000343724 1220.93L22.0246 1219.21L41.1809 1219.21L57.2777 1219.87L100.723 1219.87L116.82 1219.21L135.976 1219.21L158 1220.93L158 1234.47Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_353"
                d="M39.1088 1219.21L24.0988 1219.21L24.0988 1236.2L39.1088 1236.2L39.1088 1219.21Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_354"
                d="M133.904 1219.21L118.894 1219.21L118.894 1236.2L133.904 1236.2L133.904 1219.21Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_355"
                d="M118.894 1219.21L116.82 1219.21L116.82 1236.2L118.894 1236.2L118.894 1219.21Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_356"
                d="M135.977 1219.21L133.904 1219.21L133.904 1236.2L135.977 1236.2L135.977 1219.21Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_357"
                d="M24.0988 1219.21L22.0257 1219.21L22.0257 1236.2L24.0988 1236.2L24.0988 1219.21Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_358"
                d="M41.1819 1219.21L39.1088 1219.21L39.1088 1236.2L41.1819 1236.2L41.1819 1219.21Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_359"
                d="M133.194 1232.24L133.194 1223.16L119.606 1223.16L119.606 1232.24L133.194 1232.24Z"
                fill="#37474F"
              />
              <path
                id="Vector_360"
                d="M38.3948 1232.24L38.3948 1223.16L24.8068 1223.16L24.8068 1232.24L38.3948 1232.24Z"
                fill="#37474F"
              />
              <path
                id="Vector_361"
                d="M57.2777 1219.87L41.1809 1219.21L41.1809 1236.2L57.2777 1235.53L57.2777 1219.87Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_362"
                d="M100.723 1219.87L116.82 1219.21L116.82 1236.2L100.723 1235.53L100.723 1219.87Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_363"
                d="M2.81534 1234.69L22.0244 1236.2L22.0244 1219.21L2.81534 1220.71L2.81534 1234.69Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_364"
                d="M155.185 1234.69L135.976 1236.2L135.976 1219.21L155.185 1220.71L155.185 1234.69Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_29">
              <path
                id="Vector_365"
                d="M158 1423.47L135.976 1425.2L116.82 1425.2L100.723 1424.53L57.2777 1424.53L41.1809 1425.2L22.0246 1425.2L0.000343132 1423.47L0.000343724 1409.93L22.0246 1408.21L41.1809 1408.21L57.2777 1408.87L100.723 1408.87L116.82 1408.21L135.976 1408.21L158 1409.93L158 1423.47Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_366"
                d="M39.1088 1408.21L24.0988 1408.21L24.0988 1425.2L39.1088 1425.2L39.1088 1408.21Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_367"
                d="M133.904 1408.21L118.894 1408.21L118.894 1425.2L133.904 1425.2L133.904 1408.21Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_368"
                d="M118.894 1408.21L116.82 1408.21L116.82 1425.2L118.894 1425.2L118.894 1408.21Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_369"
                d="M135.977 1408.21L133.904 1408.21L133.904 1425.2L135.977 1425.2L135.977 1408.21Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_370"
                d="M24.0988 1408.21L22.0257 1408.21L22.0257 1425.2L24.0988 1425.2L24.0988 1408.21Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_371"
                d="M41.1819 1408.21L39.1088 1408.21L39.1088 1425.2L41.1819 1425.2L41.1819 1408.21Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_372"
                d="M133.194 1421.24L133.194 1412.16L119.606 1412.16L119.606 1421.24L133.194 1421.24Z"
                fill="#37474F"
              />
              <path
                id="Vector_373"
                d="M38.3948 1421.24L38.3948 1412.16L24.8068 1412.16L24.8068 1421.24L38.3948 1421.24Z"
                fill="#37474F"
              />
              <path
                id="Vector_374"
                d="M57.2777 1408.87L41.1809 1408.21L41.1809 1425.2L57.2777 1424.53L57.2777 1408.87Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_375"
                d="M100.723 1408.87L116.82 1408.21L116.82 1425.2L100.723 1424.53L100.723 1408.87Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_376"
                d="M2.81534 1423.69L22.0244 1425.2L22.0244 1408.21L2.81534 1409.71L2.81534 1423.69Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_377"
                d="M155.185 1423.69L135.976 1425.2L135.976 1408.21L155.185 1409.71L155.185 1423.69Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_30">
              <path
                id="Vector_378"
                d="M158 314.87L135.976 316.598L116.819 316.598L100.723 315.933L57.2774 315.933L41.1805 316.598L22.0243 316.598L-2.30785e-05 314.87L-2.24869e-05 301.334L22.0243 299.606L41.1805 299.606L57.2774 300.272L100.723 300.272L116.819 299.606L135.976 299.606L158 301.334L158 314.87Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_379"
                d="M39.1085 299.607L24.0984 299.607L24.0984 316.599L39.1085 316.599L39.1085 299.607Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_380"
                d="M133.903 299.607L118.893 299.607L118.893 316.599L133.903 316.599L133.903 299.607Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_381"
                d="M118.893 299.607L116.82 299.607L116.82 316.599L118.893 316.599L118.893 299.607Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_382"
                d="M135.976 299.606L133.903 299.606L133.903 316.598L135.976 316.598L135.976 299.606Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_383"
                d="M24.0985 299.607L22.0253 299.607L22.0253 316.599L24.0985 316.599L24.0985 299.607Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_384"
                d="M41.1816 299.607L39.1084 299.607L39.1084 316.599L41.1816 316.599L41.1816 299.607Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_385"
                d="M133.194 312.644L133.194 303.561L119.606 303.561L119.606 312.644L133.194 312.644Z"
                fill="#37474F"
              />
              <path
                id="Vector_386"
                d="M38.3945 312.644L38.3945 303.561L24.8065 303.561L24.8065 312.644L38.3945 312.644Z"
                fill="#37474F"
              />
              <path
                id="Vector_387"
                d="M57.2774 300.272L41.1806 299.607L41.1806 316.599L57.2774 315.933L57.2774 300.272Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_388"
                d="M100.723 300.272L116.82 299.607L116.82 316.599L100.723 315.933L100.723 300.272Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_389"
                d="M2.815 315.091L22.024 316.599L22.024 299.607L2.815 301.11L2.815 315.091Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_390"
                d="M155.185 315.091L135.976 316.599L135.976 299.607L155.185 301.11L155.185 315.091Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_31">
              <path
                id="Vector_391"
                d="M158 597.87L135.976 599.598L116.819 599.598L100.723 598.933L57.2774 598.933L41.1805 599.598L22.0243 599.598L-2.30785e-05 597.87L-2.24869e-05 584.334L22.0243 582.606L41.1805 582.606L57.2774 583.272L100.723 583.272L116.819 582.606L135.976 582.606L158 584.334L158 597.87Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_392"
                d="M39.1085 582.607L24.0984 582.607L24.0984 599.599L39.1085 599.599L39.1085 582.607Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_393"
                d="M133.903 582.607L118.893 582.607L118.893 599.599L133.903 599.599L133.903 582.607Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_394"
                d="M118.893 582.607L116.82 582.607L116.82 599.599L118.893 599.599L118.893 582.607Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_395"
                d="M135.976 582.606L133.903 582.606L133.903 599.598L135.976 599.598L135.976 582.606Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_396"
                d="M24.0985 582.607L22.0253 582.607L22.0253 599.599L24.0985 599.599L24.0985 582.607Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_397"
                d="M41.1816 582.607L39.1084 582.607L39.1084 599.599L41.1816 599.599L41.1816 582.607Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_398"
                d="M133.194 595.644L133.194 586.561L119.606 586.561L119.606 595.644L133.194 595.644Z"
                fill="#37474F"
              />
              <path
                id="Vector_399"
                d="M38.3945 595.644L38.3945 586.561L24.8065 586.561L24.8065 595.644L38.3945 595.644Z"
                fill="#37474F"
              />
              <path
                id="Vector_400"
                d="M57.2774 583.272L41.1806 582.607L41.1806 599.599L57.2774 598.933L57.2774 583.272Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_401"
                d="M100.723 583.272L116.82 582.607L116.82 599.599L100.723 598.933L100.723 583.272Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_402"
                d="M2.815 598.091L22.024 599.599L22.024 582.607L2.815 584.11L2.815 598.091Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_403"
                d="M155.185 598.091L135.976 599.599L135.976 582.607L155.185 584.11L155.185 598.091Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_32">
              <path
                id="Vector_404"
                d="M158 939.87L135.976 941.598L116.819 941.598L100.723 940.933L57.2774 940.933L41.1805 941.598L22.0243 941.598L-2.30785e-05 939.87L-2.24869e-05 926.334L22.0243 924.606L41.1805 924.606L57.2774 925.272L100.723 925.272L116.819 924.606L135.976 924.606L158 926.334L158 939.87Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_405"
                d="M39.1085 924.607L24.0984 924.607L24.0984 941.599L39.1085 941.599L39.1085 924.607Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_406"
                d="M133.903 924.607L118.893 924.607L118.893 941.599L133.903 941.599L133.903 924.607Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_407"
                d="M118.893 924.607L116.82 924.607L116.82 941.599L118.893 941.599L118.893 924.607Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_408"
                d="M135.976 924.606L133.903 924.606L133.903 941.598L135.976 941.598L135.976 924.606Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_409"
                d="M24.0985 924.607L22.0253 924.607L22.0253 941.599L24.0985 941.599L24.0985 924.607Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_410"
                d="M41.1816 924.607L39.1084 924.607L39.1084 941.599L41.1816 941.599L41.1816 924.607Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_411"
                d="M133.194 937.644L133.194 928.561L119.606 928.561L119.606 937.644L133.194 937.644Z"
                fill="#37474F"
              />
              <path
                id="Vector_412"
                d="M38.3945 937.644L38.3945 928.561L24.8065 928.561L24.8065 937.644L38.3945 937.644Z"
                fill="#37474F"
              />
              <path
                id="Vector_413"
                d="M57.2774 925.272L41.1806 924.607L41.1806 941.599L57.2774 940.933L57.2774 925.272Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_414"
                d="M100.723 925.272L116.82 924.607L116.82 941.599L100.723 940.933L100.723 925.272Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_415"
                d="M2.815 940.091L22.024 941.599L22.024 924.607L2.815 926.11L2.815 940.091Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_416"
                d="M155.185 940.091L135.976 941.599L135.976 924.607L155.185 926.11L155.185 940.091Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_33">
              <path
                id="Vector_417"
                d="M158 1281.87L135.976 1283.6L116.819 1283.6L100.723 1282.93L57.2774 1282.93L41.1805 1283.6L22.0243 1283.6L-2.30785e-05 1281.87L-2.24869e-05 1268.33L22.0243 1266.61L41.1805 1266.61L57.2774 1267.27L100.723 1267.27L116.819 1266.61L135.976 1266.61L158 1268.33L158 1281.87Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_418"
                d="M39.1085 1266.61L24.0984 1266.61L24.0984 1283.6L39.1085 1283.6L39.1085 1266.61Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_419"
                d="M133.903 1266.61L118.893 1266.61L118.893 1283.6L133.903 1283.6L133.903 1266.61Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_420"
                d="M118.893 1266.61L116.82 1266.61L116.82 1283.6L118.893 1283.6L118.893 1266.61Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_421"
                d="M135.976 1266.61L133.903 1266.61L133.903 1283.6L135.976 1283.6L135.976 1266.61Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_422"
                d="M24.0985 1266.61L22.0253 1266.61L22.0253 1283.6L24.0985 1283.6L24.0985 1266.61Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_423"
                d="M41.1816 1266.61L39.1084 1266.61L39.1084 1283.6L41.1816 1283.6L41.1816 1266.61Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_424"
                d="M133.194 1279.64L133.194 1270.56L119.606 1270.56L119.606 1279.64L133.194 1279.64Z"
                fill="#37474F"
              />
              <path
                id="Vector_425"
                d="M38.3945 1279.64L38.3945 1270.56L24.8065 1270.56L24.8065 1279.64L38.3945 1279.64Z"
                fill="#37474F"
              />
              <path
                id="Vector_426"
                d="M57.2774 1267.27L41.1806 1266.61L41.1806 1283.6L57.2774 1282.93L57.2774 1267.27Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_427"
                d="M100.723 1267.27L116.82 1266.61L116.82 1283.6L100.723 1282.93L100.723 1267.27Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_428"
                d="M2.815 1282.09L22.024 1283.6L22.024 1266.61L2.815 1268.11L2.815 1282.09Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_429"
                d="M155.185 1282.09L135.976 1283.6L135.976 1266.61L155.185 1268.11L155.185 1282.09Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_34">
              <path
                id="Vector_430"
                d="M158 1470.87L135.976 1472.6L116.819 1472.6L100.723 1471.93L57.2774 1471.93L41.1805 1472.6L22.0243 1472.6L-2.30785e-05 1470.87L-2.24869e-05 1457.33L22.0243 1455.61L41.1805 1455.61L57.2774 1456.27L100.723 1456.27L116.819 1455.61L135.976 1455.61L158 1457.33L158 1470.87Z"
                fill="#B0BEC5"
              />
              <path
                id="Vector_431"
                d="M39.1085 1455.61L24.0984 1455.61L24.0984 1472.6L39.1085 1472.6L39.1085 1455.61Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_432"
                d="M133.903 1455.61L118.893 1455.61L118.893 1472.6L133.903 1472.6L133.903 1455.61Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_433"
                d="M118.893 1455.61L116.82 1455.61L116.82 1472.6L118.893 1472.6L118.893 1455.61Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_434"
                d="M135.976 1455.61L133.903 1455.61L133.903 1472.6L135.976 1472.6L135.976 1455.61Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_435"
                d="M24.0985 1455.61L22.0253 1455.61L22.0253 1472.6L24.0985 1472.6L24.0985 1455.61Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_436"
                d="M41.1816 1455.61L39.1084 1455.61L39.1084 1472.6L41.1816 1472.6L41.1816 1455.61Z"
                fill="#CFD8DC"
              />
              <path
                id="Vector_437"
                d="M133.194 1468.64L133.194 1459.56L119.606 1459.56L119.606 1468.64L133.194 1468.64Z"
                fill="#37474F"
              />
              <path
                id="Vector_438"
                d="M38.3945 1468.64L38.3945 1459.56L24.8065 1459.56L24.8065 1468.64L38.3945 1468.64Z"
                fill="#37474F"
              />
              <path
                id="Vector_439"
                d="M57.2774 1456.27L41.1806 1455.61L41.1806 1472.6L57.2774 1471.93L57.2774 1456.27Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_440"
                d="M100.723 1456.27L116.82 1455.61L116.82 1472.6L100.723 1471.93L100.723 1456.27Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_441"
                d="M2.815 1471.09L22.024 1472.6L22.024 1455.61L2.815 1457.11L2.815 1471.09Z"
                fill="#90A4AE"
              />
              <path
                id="Vector_442"
                d="M155.185 1471.09L135.976 1472.6L135.976 1455.61L155.185 1457.11L155.185 1471.09Z"
                fill="#90A4AE"
              />
            </g>
            <g id="Group_35">
              <path
                id="Vector_443"
                d="M131.14 379.2L131.14 0L121.66 -4.14383e-07L121.66 379.2L131.14 379.2Z"
                fill="#455A64"
              />
              <path
                id="Vector_444"
                d="M36.3399 379.2L36.34 0L26.86 -4.14383e-07L26.86 379.2L36.3399 379.2Z"
                fill="#455A64"
              />
              <path
                id="Vector_445"
                d="M34.6162 379.2L34.6162 0L28.5883 -2.63487e-07L28.5883 379.2L34.6162 379.2Z"
                fill="#526873"
              />
              <path
                id="Vector_446"
                d="M129.412 379.2L129.412 0L123.384 -2.6349e-07L123.384 379.2L129.412 379.2Z"
                fill="#526873"
              />
            </g>
            <g id="Group_36">
              <path
                id="Vector_447"
                d="M131.14 662.2L131.14 283L121.66 283L121.66 662.2L131.14 662.2Z"
                fill="#455A64"
              />
              <path
                id="Vector_448"
                d="M36.3399 662.2L36.34 283L26.86 283L26.86 662.2L36.3399 662.2Z"
                fill="#455A64"
              />
              <path
                id="Vector_449"
                d="M34.6162 662.2L34.6162 283L28.5883 283L28.5883 662.2L34.6162 662.2Z"
                fill="#526873"
              />
              <path
                id="Vector_450"
                d="M129.412 662.2L129.412 283L123.384 283L123.384 662.2L129.412 662.2Z"
                fill="#526873"
              />
            </g>
            <g id="Group_37">
              <path
                id="Vector_451"
                d="M131.14 1004.2L131.14 625L121.66 625L121.66 1004.2L131.14 1004.2Z"
                fill="#455A64"
              />
              <path
                id="Vector_452"
                d="M36.3399 1004.2L36.34 625L26.86 625L26.86 1004.2L36.3399 1004.2Z"
                fill="#455A64"
              />
              <path
                id="Vector_453"
                d="M34.6162 1004.2L34.6162 625L28.5883 625L28.5883 1004.2L34.6162 1004.2Z"
                fill="#526873"
              />
              <path
                id="Vector_454"
                d="M129.412 1004.2L129.412 625L123.384 625L123.384 1004.2L129.412 1004.2Z"
                fill="#526873"
              />
            </g>
            <g id="Group_38">
              <path
                id="Vector_455"
                d="M131.14 1346.2L131.14 967L121.66 967L121.66 1346.2L131.14 1346.2Z"
                fill="#455A64"
              />
              <path
                id="Vector_456"
                d="M36.3399 1346.2L36.34 967L26.86 967L26.86 1346.2L36.3399 1346.2Z"
                fill="#455A64"
              />
              <path
                id="Vector_457"
                d="M34.6162 1346.2L34.6162 967L28.5883 967L28.5883 1346.2L34.6162 1346.2Z"
                fill="#526873"
              />
              <path
                id="Vector_458"
                d="M129.412 1346.2L129.412 967L123.384 967L123.384 1346.2L129.412 1346.2Z"
                fill="#526873"
              />
            </g>
            <g id="Group_39">
              <path
                id="Vector_459"
                d="M131.14 1535.2L131.14 1156L121.66 1156L121.66 1535.2L131.14 1535.2Z"
                fill="#455A64"
              />
              <path
                id="Vector_460"
                d="M36.3399 1535.2L36.34 1156L26.86 1156L26.86 1535.2L36.3399 1535.2Z"
                fill="#455A64"
              />
              <path
                id="Vector_461"
                d="M34.6162 1535.2L34.6162 1156L28.5883 1156L28.5883 1535.2L34.6162 1535.2Z"
                fill="#526873"
              />
              <path
                id="Vector_462"
                d="M129.412 1535.2L129.412 1156L123.384 1156L123.384 1535.2L129.412 1535.2Z"
                fill="#526873"
              />
            </g>
          </g>
        </svg>
      </div>

      <div class="service-carriage">
        <svg
          width="165"
          height="294"
          viewBox="0 0 165 294"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.5 278L0.500003 16C0.500003 7.43961 7.43959 0.5 16 0.5L148.967 0.500002C157.527 0.500002 164.467 7.43958 164.467 16L164.467 278C164.467 286.56 157.527 293.5 148.967 293.5L16 293.5C7.43958 293.5 0.5 286.56 0.5 278Z"
            fill="#E1524C"
            stroke="black"
          />
          <rect
            x="17.9667"
            y="267.867"
            width="243.367"
            height="17.9667"
            rx="8.98333"
            transform="rotate(-90 17.9667 267.867)"
            fill="black"
          />
          <rect
            x="133"
            y="268.367"
            width="243.367"
            height="17.9667"
            rx="8.98333"
            transform="rotate(-90 133 268.367)"
            fill="black"
          />
        </svg>
      </div>
    </div>
    <div class="types_of_services">
      <div class="service  accountancy flexB">
        <div>
          <div class="service_icon flexB">
            <img src="Accounting Icon.svg" alt="Accountancy">
          </div>
          <br>
          <h3>Accounting and Bookkeeping</h3>
          <br>
          <div class="description">
            Our accounting and bookkeeping services are designed to handle all aspects of your financial management needs,
            from daily transactions to financial reporting and analysis.
            We employ the latest software tools and methodologies to ensure your financial data is accurate, up-to-date, and compliant with relevant standards.
          </div>
          <br>
          <!-- <button class="readMore" data-readMoreBtn = "#Accountancy">Read More</button> -->
          <a class="router-link" href="/Accounting-and-Bookkeeping">Read More</a>
        </div>
      </div>
      <div class="service  legal flexB flex-Right">
        <div>
          <div class="service_icon flexB">
            <img src="Legal Icon.svg" alt="legal">
          </div>
          <br>
          <h3>Legal Contract Drafting</h3>
          <br>
          <div class="description">
            Navigate the complexities of legal documentation with our legal contract drafting services.
            Our team of legal professionals is skilled in crafting clear, comprehensive contracts that protect your interests and facilitate your business operations.
          </div>
          <br>
          <!-- <button class="readMore" data-readMoreBtn="#Legal">Read More</button> -->
          <a class="router-link" href="/Legal-Contract-Drafting">Read More</a>
        </div>
      </div>
      <div class="service  VA flexB">
        <div>
          <div class="service_icon flexB">
            <img src="VA Icon.svg" alt="Virtual Assistance">
          </div>
          <br>
          <h3>Virtual Assistants</h3>
          <br>
          <div class="description">
            Our virtual assistant services offer flexible, on-demand support for a variety of administrative tasks.
            Whether you need help with scheduling, email management, or any other administrative burden, our virtual assistants are equipped to boost your productivity and streamline your operations.
          </div>
          <br>
          <!-- <button class="readMore" data-readMoreBtn = "#VA">Read More</button> -->
          <a class="router-link" href="/Virtual-Assistants">Read More</a>
        </div>
      </div>
      <div class="service  IT flexB flex-Right">
        <div>
          <div class="service_icon flexB">
            <img src="IT Icon.svg" alt="IT">
          </div>
          <br>
          <h3>IT Infrastructure and Services</h3>
          <br>
          <div class="description">
            Whether you need web development, software engineering, data analysis, or cybersecurity, we have the expertise and technology to help you.<br>
            Our IT professionals are certified and innovative, and they use the best practices and standards to ensure quality and security.<br>
            You can trust us to provide you with IT services that are reliable and cutting-edge.
          </div>
          <br>
          <!-- <button class="readMore" data-readMoreBtn ="#It">Read More</button> -->
          <a class="router-link" href="/IT-Infrastructure-and-Services">Read More</a>
        </div>
      </div>
    </div>
  </section>

  <section class="fourth row">
    <!-- <div class="overview_of_benefits flexB">
      <p>urance</p>
      <p>Specialized expertise</p>
      <p>Flexibility</p>
      <p>Risk reduction</p>
      <p>Scalability</p>
      <p>Quality Ass</p>
    </div> -->

    <h2 class="subHeading almost-full-width text-center ">
      Why
      Outsource
      Station?
    </h2>

    <div class="benefits almost-full-width">
      <div class="sliding-image" >
        <img src="Guy pointing.svg" alt="">
      </div>

      <div class="benefit flexB">
        <div>
          <h3>Comprehensive Solution</h3>
          <br>
          <p>Catering to diverse business needs, Outsource Station specializes in outsourcing services across multiple domains including accounting, legal, IT, and beyond.</p><br>
          <p>Our team of seasoned experts is dedicated to simplifying and optimizing your operations, ensuring seamless efficiency and productivity.</p><br>
          <p>With Outsource Station, you can confidently delegate tasks knowing that your business is in capable hands, allowing you to focus on core objectives and strategic growth initiatives.</p>
        </div>
      </div>

      <div class="benefit flexB ">
        <div>
          <h3>Proven Expertise</h3>
          <br>
          <!--<p>Outsource Station is a leader in business process outsourcing. Our experienced team delivers quality results for every project. We use our expertise to improve your processes, performance, and growth.</p>-->
          <p>Outsource Station stands at the forefront of business process outsourcing, renowned for our exceptional track record of delivering high-quality results across every project.</p><br>
          <p>With a seasoned team of experts, we leverage our extensive experience to optimize your processes, enhance performance, and drive sustainable growth for your business.</p><br>
          <p>Trust us to be your dedicated partner in achieving operational excellence and unlocking your organization's full potential.</p>
        </div>
      </div>
      <div class="benefit flexB">
        <div>
          <h3>Tailored Approach</h3>
          <br>
          <!--<p>Outsource Station customizes its services for each client. We work with you to understand your goals, challenges, and industry. Our outsourcing solutions match your business objectives and offer a unique experience.</p>-->
          <p>Outsource Station prides itself on delivering tailored solutions that are specifically crafted to meet the unique needs of each client.</p><br>
          <p>We collaborate closely with you to gain a deep understanding of your goals, challenges, and industry dynamics.</p><br>
          <p>By leveraging this insight, we meticulously design outsourcing solutions that precisely align with your business objectives, ensuring a personalized and unparalleled experience that drives success.</p>
        </div>
      </div>
      <!--
      <div class="benefit flexB">
        <div>
          <h3>Comprehensive Solution</h3>
          <p>
            Outsource Station provides outsourcing services in various
            domains. We have experts in legal, accounting, IT, and more.
            Outsource Station makes your operations easier and smoother.
          </p>
        </div>
      </div>
      -->
      <div class="benefit flexB">
        <div>
          <h3>Commitment to Compliance & Security</h3>
          <br>
          <!--<p>Outsource Station values trust and compliance in outsourcing. We follow industry regulations and data security standards. We make sure your operations are legal, secure, and protected. You can trust us with your sensitive information.</p>-->
          <p>Outsource Station places utmost importance on trust and compliance within the realm of outsourcing.</p><br>
          <p>We adhere rigorously to industry regulations and stringent data security standards, safeguarding your operations to ensure legality, confidentiality, and integrity at every step.</p><br>
          <p>Rest assured, your sensitive information is in safe hands with us, as we prioritize your peace of mind and the protection of your valuable assets.</p>
        </div>
      </div>
      <div class="benefit flexB">
        <div>
          <h3>Results-Driven Focus</h3>
          <br>
          <!--<p>Outsource Station delivers results, not just services. We are results-oriented and measure success by your business impact. We improve efficiency, cut costs, and satisfy customers. We help your organization succeed and grow.</p>-->
          <p>Outsource Station is dedicated to delivering tangible results, going beyond mere services to drive meaningful business impact.</p><br>
          <p>With a relentless focus on outcomes, we measure success based on the real, measurable impact we create for your organization.</p><br>
          <p>From enhancing efficiency and reducing costs to ensuring customer satisfaction, our results-oriented approach is geared towards helping your organization thrive and achieve sustainable growth.</p>
        </div>
      </div>
      <!--
      <div class="benefit flexB">
        <div>
          <h3>Optimized Processes</h3>
          <p>
            Outsource Station optimizes your processes with our expertise.
            We analyze your workflows and find ways to improve, save, and
            gain. Outsource Hub works with you to make strategic changes
            that boost your business performance.
          </p>
        </div>
      </div>
      -->
    </div>
  </section>

  <!-- <section class="fifth row almost-full-width">
    <h2 class="subHeading text-center">How does it works</h2>
    <div class="instructions">
      <div class="instruction flexB">
        <div class="flexB">
          <img
            src="AssetsIntroduction Call.svg"
            alt="introduction call"
          />
          <div class="description">
            <p>1. Introduction Call</p>
            <p>
              A preliminary phone call between a company and the client to
              introduce each other and discuss the goals and expectations
              of the project
            </p>
          </div>
        </div>
      </div>

      <div class="instruction flexB flex-Right">
        <div class="flexB">
          <img
            src="AssetsExpert-matching.svg"
            alt="introduction call"
          />
          <div class="description">
            <p>2.Expert Matching</p>
            <p>
              Based on the needs discussed in the introduction call, the
              company matches the client with the most suitable expert for
              the project.
            </p>
          </div>
        </div>
      </div>

      <div class="instruction flexB">
        <div class="flexB">
          <img
            src="AssetsReview-with-a-client.svg"
            alt="introduction call"
          />
          <div class="description">
            <p>3.Pool Review with a client</p>
            <p>
              The company presents a pool of potential experts\u2028to the
              client for review and selection
            </p>
          </div>
        </div>
      </div>

      <div class="instruction flexB" style="justify-content: center">
        <div
          class="flexB"
          style="flex-direction: column; align-items: center"
        >
          <img
            src="AssetsInterview.svg"
            alt="introduction call"
          />
          <div class="description">
            <p>3.Pool Review with a client</p>
            <p>
              The company presents a pool of potential experts\u2028to the
              client for review and selection
            </p>
          </div>
        </div>
      </div>

      <div class="instruction flexB flex-Right">
        <div class="flexB">
          <img src="Assetscontact.svg" alt="introduction call" />
          <div class="description">
            <p>5.Contact</p>
            <p>
              Once the client and the expert(s) agree to work together, a
              contract is signed to establish the terms of the project,
              including deliverables, timeline, and payment.
            </p>
          </div>
        </div>
      </div>

      <div class="instruction flexB">
        <div class="flexB">
          <img
            src="AssetsCelebration.svg"
            alt="introduction call"
          />
          <div class="description">
            <p>3.Pool Review with a client</p>
            <p>
              The company presents a pool of potential experts\u2028to the
              client for review and selection
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="getStarted-wrapper flexB">
      <button class="getStarted">Get Started</button>
    </div>
  </section> -->

  <section class="sixth row almost-full-width">
    <div class="contact-form-wrapper flexB">
      <form class = "form" >
        <input type="hidden" name="_next" value="/">
        <h2 class="subHeading text-center">
          Get in <br />
          touch
        </h2>
        <p class="text-center">You can reach us anytime</p>

        <div class="inputs flexB">
          <input
            type="text"
            name="first-name"
            id="first-name"
            placeholder="First Name"
            required
          />
          <br />
          <input
            type="text"
            name="first-name"
            id="first-name"
            placeholder="Last Name"
            required
          />
          <br />

          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your Email"
            required
          />

          <input
            type="number"
            name="phone"
            id="phone"
            placeholder="Your Phone Number"
            required
          />

          <input type="text" name="help" id="help" placeholder="How can we help you?">
        </div>
        <div class="submit-wrapper flexB">
          <button type="submit" class="submitBtn">Submit</button>
        </div>
      </form>

      <img src="contact-us.svg" alt="contact us" />
    </div>
  </section>
</div>`}function X(){document.querySelector("#root").innerHTML=`
  <section class="about-us-page service-page  " id="AboutUs" data-page >
    <h2 class="subHeading text-center">About Us</h2>
    <div class="contents flexB">
     <img src="Meeting inside carriage.svg" alt="Accountant">
     <div class="description almost-full-width">
       <p>We are more than just an outsourcing company – we're your strategic partner in business growth.
       With a deep understanding of the challenges modern businesses face, we have curated a suite of outsourcing solutions
       designed to alleviate your burdens and propel your organization forward.
       Our team comprises seasoned professionals with extensive expertise across various industries,
       ensuring that we deliver results that exceed expectations.</p>
       <p>Driven by a passion for excellence and a commitment to client satisfaction, we approach every project
       with diligence, creativity, and innovation. Our tailored approach means that we don't just offer cookie-cutter solutions;
       instead, we take the time to understand your unique objectives, challenges, and culture to provide
       personalized outsourcing strategies that align with your vision and goals.</p>
       <p>At the heart of our company is a dedication to reliability and integrity.
       We understand the importance of trust in outsourcing partnerships, which is why we prioritize
       transparency, communication, and accountability every step of the way.
       Whether you're looking to streamline your operations, enhance customer experiences, or scale your business,
       you can rely on us to deliver results that drive success.</p>
       <p>You can confidently entrust your outsourcing needs to a partner who is invested in your success.
       Let us empower your business to thrive while you focus on what you do best – leading your organization into a prosperous future.</p>
     </div>


    </div>
   </section>`}function $(){document.querySelector("#root").innerHTML=`
 <section class="accountant-page service-page " id="Accountancy" data-page >
  <div class="service_heading_and_other_services_nav flexB almost-full-width">
   <h2 class="subHeading ">Accounting and Bookkeeping</h2>
   <div class="otherServicesWrapper">
    <p>Other Services</p>
    <div class="otherServices flexB">
      <a href="/Accounting-and-Bookkeeping" class="router-link">Accounting and Bookkeeping</a><a href="/Legal-Contract-Drafting" class="router-link">Legal Contract Drafting</a><a href="/Virtual-Assistants" class="router-link">Virtual Assistants</a><a href="/IT-Infrastructure-and-Services" class="router-link">IT Infrastructure and Services</a>
     </div>
  </div>
  </div>

  <div class="contents flexB">
   <img src="Accountant Person.svg" alt="Accountant">
   <div class="description almost-full-width">
     <!--
     <p>We offer a range of accountancy services to help you manage your finances and tax obligations. Whether you need bookkeeping, payroll, auditing, or tax preparation,
     we have the expertise and experience to handle it for you. Our accountants are certified and reliable, and they use the latest software and tools to ensure accuracy and efficiency.
     You can trust us to handle your accountancy needs with professionalism and care.</p>
     -->
     <p>Our accounting and bookkeeping services are designed to handle all aspects of your financial management needs, from daily transactions to financial reporting and analysis.
     We employ the latest software tools and methodologies to ensure your financial data is accurate, up-to-date, and compliant with relevant standards.</p>
     <h4>Services Include:</h4>
     <br>
     <ul>
       <li>Daily transaction processing</li>
       <li>Payroll processing</li>
       <li>Financial statement preparation (monthly, quarterly, and annual)</li>
       <li>Cash flow forecasting</li>
       <li>Budgeting and financial planning</li>
       <li>Compliance and tax filing support</li>
     </ul>
     <br><br>
     <h4>Benefits:</h4>
     <br>
     <ul>
       <li>Cost savings on internal accounting departments</li>
       <li>Access to specialized expertise</li>
       <li>Enhanced financial accuracy and compliance</li>
       <li>Timely insights into your financial health</li>
     </ul>
     <br><br>

   </div>


  </div>
 </section>`}function K(){document.querySelector("#root").innerHTML=` <section class="legal-page service-page" id="Legal" data-page >
  <div class="service_heading_and_other_services_nav flexB almost-full-width">
    <h2 class="subHeading ">Legal Contract Drafting</h2>
    <div class="otherServicesWrapper">
     <p>Other Services</p>
     <div class="otherServices flexB">
      <a href="/Accounting-and-Bookkeeping" class="router-link">Accounting and Bookkeeping</a><a href="/Legal-Contract-Drafting" class="router-link">Legal Contract Drafting</a><a href="/Virtual-Assistants" class="router-link">Virtual Assistants</a><a href="/IT-Infrastructure-and-Services" class="router-link">IT Infrastructure and Services</a>
     </div>
   </div>
   </div>
  <div class="contents flexB">
   <img src="Lawyer Person.svg" alt="Accountant">
   <div class="description almost-full-width">
     <!--
     <p>We provide legal services to clients who need assistance with various legal matters. Whether you need contract drafting, dispute resolution, intellectual property protection,
     or compliance advice, we have the knowledge and skills to help you. Our lawyers are qualified and experienced, and they work with you to understand your goals and needs.
     You can rely on us to provide you with legal services that are effective and affordable.</p>
     -->
     <p>Navigate the complexities of legal documentation with our legal contract drafting services. Our team of legal professionals is skilled in crafting clear,
     comprehensive contracts that protect your interests and facilitate your business operations.</p>
    <h4>Services Include:</h4>
    <br>
    <ul>
      <li>Drafting of business contracts and agreements</li>
      <li>Contract review and analysis</li>
      <li>Compliance checks with local and international laws</li>
      <li>Intellectual property rights agreements</li>
      <li>Employment contracts and NDAs</li>
    </ul>
    <br><br>
    <h4>Benefits:</h4>
    <br>
    <ul>
      <li>Minimized legal risks</li>
      <li>Protection of intellectual property and business interests</li>
      <li>Improved contract efficiency and clarity</li>
      <li>Access to legal expertise</li>
    </ul>
    <br><br>

   </div>


  </div>
 </section>`}function Q(){document.querySelector("#root").innerHTML=`  <section class="va-page service-page " id="VA" data-page >
  <div class="service_heading_and_other_services_nav flexB almost-full-width">
    <h2 class="subHeading ">Virtual Assistants</h2>
    <div class="otherServicesWrapper">
     <p>Other Services</p>
     <div class="otherServices flexB">
      <a href="/Accounting-and-Bookkeeping" class="router-link">Accounting and Bookkeeping</a><a href="/Legal-Contract-Drafting" class="router-link">Legal Contract Drafting</a><a href="/Virtual-Assistants" class="router-link">Virtual Assistants</a><a href="/IT-Infrastructure-and-Services" class="router-link">IT Infrastructure and Services</a>
     </div>
   </div>
   </div>
  <div class="contents flexB">
   <img src="VA Person.svg" alt="Accountant">
   <div class="description almost-full-width">
     <!--
     <p>We provide virtual assistant services to clients who need help with various tasks and projects. Whether you need administrative support,
     customer service, social media management, or research, we have the talent and resources to help you.
     Our virtual assistants are skilled and versatile, and they work remotely to save you time and money. You can count on us to provide you with
     virtual assistant services that are flexible and convenient.</p>
     -->
     <p>Our virtual assistant services offer flexible, on-demand support for a variety of administrative tasks.
     Whether you need help with scheduling, email management, or any other administrative burden,
     our virtual assistants are equipped to boost your productivity and streamline your operations.</p>
    <h4>Services Include:</h4>
    <br>
    <ul>
      <li>Email management and correspondence</li>
      <li>Schedule and calendar management</li>
      <li>Data entry and management</li>
      <li>Customer support and communication</li>
      <li>Research and presentation preparation</li>
    </ul>
    <br><br>
    <h4>Benefits:</h4>
    <br>
    <ul>
      <li>Increased operational efficiency</li>
      <li>Significant time savings on administrative tasks</li>
      <li>Scalable support tailored to your needs</li>
      <li>Enhanced work-life balance for your team</li>
    </ul>
    <br><br>

   </div>


  </div>
 </section>`}function J(){document.querySelector("#root").innerHTML=` <section class="it-page service-page" id="It" data-page>
  <div class="service_heading_and_other_services_nav flexB almost-full-width">
    <h2 class="subHeading ">IT Infrastructure and Services</h2>
    <div class="otherServicesWrapper">
     <p>Other Services</p>
     <div class="otherServices flexB">
      <a href="/Accounting-and-Bookkeeping" class="router-link">Accounting and Bookkeeping</a><a href="/Legal-Contract-Drafting" class="router-link">Legal Contract Drafting</a><a href="/Virtual-Assistants" class="router-link">Virtual Assistants</a><a href="/IT-Infrastructure-and-Services" class="router-link">IT Infrastructure and Services</a>
     </div>
   </div>
   </div>
  <div class="contents flexB">
   <img src="IT Person.svg" alt="Accountant">
   <div class="description almost-full-width">
     <p>We provide IT services to clients who need help with various IT issues and challenges. Whether you need web development,
     software engineering, data analysis, or cybersecurity, we have the expertise and technology to help you.</p>
     <p>Our IT professionals are certified and innovative, and they use the best practices and standards to ensure quality and security.
     You can trust us to provide you with IT services that are reliable and cutting-edge.</p>

   </div>


  </div>
 </section>
`}const t1={"/":Y,"/aboutUs":X,"/Accounting-and-Bookkeeping":$,"/Legal-Contract-Drafting":K,"/Virtual-Assistants":Q,"/IT-Infrastructure-and-Services":J},T=new U("root",t1);document.querySelectorAll("a").forEach(r=>{r.addEventListener("click",t=>{t.preventDefault(),T.navigate(r.getAttribute("href"))})});T.init();
