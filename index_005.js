/* global KISSY:true */
KISSY.use(['npm/@ali/pi-kissy-pc/index', '@page/data'], function(S, pageInit, data) {
  var mods = data.modules;
  for (var i = 0; i < mods.length; i++) {
    var mod = mods[i];
    mod.moduleinfo = mod.data && mod.data.moduleinfo;
    mod.fullName += '/index';
  }

  if (!/taobao\.com/.test(location.hostname)) {
    window.InitModeAjaxInTmsPreview = true;
  }

  // ======= Page Plugins =======
  var noop = function() {};
  var plugins = window.__plugins || {};

  (plugins.beforePageInit || noop)(mods, data.page);
  pageInit(mods);
  (plugins.afterPageInit || noop)(mods, data.page);
});