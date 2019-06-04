this.performanceTrackerPlugin=function(e){function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}var t={};return r.m=e,r.c=t,r.d=function(e,r,t){},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},r.p="",r(r.s=5)}({0:function(e,r){function t(e){return"object"==typeof e&&null!==e}var n=function(e){return"[object Number]"===Object.prototype.toString.call(e)};r.isNumber=n,r.isNaN=function(e){return n(e)&&e!==+e},r.isArray=function(e){return Array.isArray?Array.isArray(e):-1!==Object.prototype.toString.call(e).toUpperCase().indexOf("ARRAY")},r.noop=function(e){return e||""},r.extend=function(e,r){for(var t in r)r.hasOwnProperty(t)&&(e[t]=r[t]);return e},r.shallowMerge=function(e,r,t){for(var n in r)r.hasOwnProperty(n)&&(t||e[n]===undefined)&&(e[n]=r[n])},r.getSpm=function(){var e="",t="",n=window.goldlog||{},i=n.spmAb||n.spm_ab;return i&&r.isArray(i)&&(e=i[0],i[1]&&(t=i[1])),{a:e,b:t}},r.unifyErrorMsg=function(e){return/^script error\.?$/i.test(e)?"Script error":e},r.getScreenSize=function(){return window.screen.width+"x"+window.screen.height},r.generateIdentifier=function(e){return[e.type,e.uid,e.page,e.msg||"",e.ajaxurl||""].join("_")},r.addEvent=function(e,r,t){e.addEventListener?e.addEventListener(r,t,!1):e.attachEvent("on"+r,function(){return t.call(e,window.event)})},r.isError=function(e){var r={}.toString.call(e);return t(e)&&"[object Error]"===r||"[object Exception]"===r||e instanceof Error}},5:function(e,r,t){function n(e,r){var t=window.performance||window.webkitPerformance||window.msPerformance||window.mozPerformance;if(t&&t.timing){var n=t.setResourceTimingBufferSize||t.webkitSetResourceTimingBufferSize;n&&n.call(t,200);var s={sampleRate:.1,isCalEntry:!1,dirtyThreshold:6e4,scriptThreshold:250,cssThreshold:250,imgThreshold:500};r&&(r.scriptThreshold!==undefined&&i.isNumber(r.scriptThreshold)&&r.scriptThreshold<=s.scriptThreshold&&(r.scriptThreshold=s.scriptThreshold),r.cssThreshold!==undefined&&i.isNumber(r.cssThreshold)&&r.cssThreshold<=s.cssThreshold&&(r.cssThreshold=s.cssThreshold),r.imgThreshold!==undefined&&i.isNumber(r.imgThreshold)&&r.imgThreshold<=s.imgThreshold&&(r.imgThreshold=s.imgThreshold));var c=i.extend(s,r),d={scriptLog:function(){var r={code:3};return r.pid=e.pid,r.page=window.location.href.split("?")[0],r.sampleRate=c.sampleRate,r},scriptPageLog:function(){var e=this.scriptLog();this.needSend=!0;var r=t.timing,n=r.navigationStart,i=this.collectPerformanceTiming(r);for(var o in i)i.hasOwnProperty(o)&&(e[o]=i[o]);return e.firstPaintTime=this.collectFirstPaint(r,n),this.collectNetworkInformation()&&(e.effectiveType=this.collectNetworkInformation()),e},scriptEntryLog:function(){var e=this.scriptLog(),r=t.getEntriesByType("resource");return e.entry=JSON.stringify(this.collectEntries(r)),e},collectPerformanceTiming:function(e){var r={};r.loadTime=e.loadEventEnd-e.fetchStart,r.domReadyTime=e.domComplete-e.domInteractive,r.readyStart=e.fetchStart-e.navigationStart,r.redirectTime=e.redirectEnd-e.redirectStart,r.appcacheTime=e.domainLookupStart-e.fetchStart,r.unloadEventTime=e.unloadEventEnd-e.unloadEventStart,r.lookupDomainTime=e.domainLookupEnd-e.domainLookupStart,r.connectTime=e.connectEnd-e.connectStart,r.requestTime=e.responseEnd-e.requestStart,r.initDomTreeTime=e.domInteractive-e.responseEnd,r.loadEventTime=e.loadEventEnd-e.loadEventStart,r.tillDomLookupEndTime=e.domainLookupEnd-e.navigationStart,r.tillResponseEndTime=e.responseEnd-e.navigationStart,r.tillDomReadyTime=e.domInteractive-e.navigationStart,r.totalTime=e.loadEventEnd-e.navigationStart;for(var t in r)r.hasOwnProperty(t)&&(!i.isNumber(r[t])||i.isNaN(r[t])||r[t]<0?r[t]=-1:r[t]>=c.dirtyThreshold?r[t]=-2:r[t]=parseFloat(r[t].toFixed(2)));return r},collectFirstPaint:function(e,r){var t;if(window.chrome&&window.chrome.loadTimes?t=1e3*window.chrome.loadTimes().firstPaintTime:i.isNumber(e.msFirstPaint)&&(t=e.msFirstPaint),t===undefined||!i.isNumber(t)||i.isNaN(t))return-1;var n;return n=t>=r?parseFloat((t-r).toFixed(2)):-1,n>=c.dirtyThreshold&&(n=-2),n},collectNetworkInformation:function(){if(navigator.connection&&navigator.connection.effectiveType)return navigator.connection.effectiveType},collectEntries:function(e){for(var r,t={},n=0;n<e.length;n++)r=e[n].responseEnd-e[n].fetchStart,(0===e[n].decodedBodySize||!i.isNumber(r)||i.isNaN(r)||"script"===e[n].initiatorType&&r>=c.scriptThreshold||"css"===e[n].initiatorType&&r>=c.cssThreshold||"img"===e[n].initiatorType&&r>=c.imgThreshold)&&(t[e[n].name]={size:e[n].decodedBodySize,type:e[n].initiatorType,loadTime:r});return t},checkDirtyIndexes:function(e){var r=!0;for(var t in e)if(e.hasOwnProperty(t)&&-2===e[t]){r=!1;break}return r},getPagePerformance:function(){var r=this;try{var t=r.scriptPageLog();t.base=a,c.isCalEntry&&(t=i.extend(t,r.scriptEntryLog())),r.checkDirtyIndexes(t)&&e.log(t)}catch(n){e.logError(n,{pid:"fsp",code:12,c4:e.pid})}}},l=/iPad|iPod|iPhone/.test(navigator.userAgent),u=l?"pagehide":"beforeunload";o(window,u,function(){/loaded|complete/.test(document.readyState)&&d.getPagePerformance()})}}var i=t(0),o=i.addEvent,a="/fsp.1.3";e.exports=n}});