var tracker = function() {
  // '//s.umeng.com/tracker/clue.js?pid=U-web'
  // 'https://g.alicdn.com/um-f2e/cdn-res/tracker/clue.js?pid=U-web'
  function getPid() {
    var re = /^(?:https?:)?\/\/(?:g\.alicdn\.com\/um-f2e\/cdn-res|s\.umeng\.com)\/tracker\/clue\.js\?pid=([^\?&=]+)(?:&|#|$)/i;
    var scripts = document.getElementsByTagName('script');
    for (var i = 0, len = scripts.length; i < len; i++) {
      var a, el = scripts[i];
      if (el.src && (a = re.exec(el.src))) {
        return decodeURIComponent(a[1]);
      }
    }
    return 'umeng';
  }
  function getUid() {
    var m = document.cookie.match(/umplus_uc_loginid=([^;]+)/);
    return m && m.length > 1 ? decodeURIComponent(m[1]) : 'Unknow(Clue)';
  }
  function checkResult(pid, result) {
    switch (pid) {
      case 'U-web':
        return !!result.data;
      case 'push-3':
        return result.status;
      case 'u-app-haitang':
      case 'uapp':
        return result.result === 'success'
          || result.result === 'ok'
          || result.code === 200
          || result.status === 200
          || result.status === true;
      case 'adplus-apptrack':
      case 'adplus-unitrack':
        return result.ec === 0;
      case 'insight': // co-dip
        return result.status && result.status === 200;
      default:
        return true;
    }
  }
  function getCode(pid, result) {
    switch (pid) {
      case 'U-web':
      case 'push-3':
        return result.code || 9999;
      case 'u-app-haitang':
      case 'uapp':
        return -1;
      case 'insight': // co-dip
        return result.status || 9999;
      default:
        return -1;
    }
  }
  function getMsg(pid, result) {
    if (pid === 'adplus-apptrack' || pid === 'adplus-unitrack') {
      return result.f;
    }
    return result.msg;
  }
  function evaluate(responseText) {
    var result = JSON.parse(responseText);
    // console.log('result', result);
    // ! 接口统计需根据各个产品具体情况修改此处
    // 当符合接口异常统计时（如接口 status 为 false 或 code 为非 200）返回如下对象
    if (!checkResult(pid, result)) {
      return {
        errorCode: getCode(pid, result),
        msg: getMsg(pid, result) || '接口出错(Clue)',
        traceId: result.traceId || ''
      };
    }
  }
  function beforeLog(logItem) {
    if (logItem.code === 3) { // 只针对性能监控合并page地址
      if (pid === 'uapp' || pid === 'u-app-haitang') {
        logItem.page = logItem.page
          .replace(/\/(apps|platform)\/[\da-f]{24}(\/|$)/i, "/$1/\$pid$2")
          .replace(/(\/apps\/\$pid\/channels\/)[\da-f]{24}/i, "$1\$id")
          .replace(/(\/apps\/\$pid\/events\/)[\da-f]{24}/i, "$1\$id")
          .replace(/(\/platform\/\$pid\/channels\/list\/)[\da-f]{24}/i, "$1\$id")
          .replace(/(\/platform\/\$pid\/error_types\/list\/)[\d]{13}/i, "$1\$id")
          .replace(/(\/platform\/\$pid\/function\/events\/detail\/)[\da-f]{24}(\/(?:string|numberic))\/?/i, "$1\$id$2")
          .replace(/(\/platform\/\$pid\/function\/conversion\/)[\da-f]{24}/i, "$1\$id")
          .replace(/(\/platform\/\$pid\/reports\/app_version\/)[\d\.]+/i, "$1\$version")
          .replace(/(\/platform\/\$pid\/board\/)[\da-z]{32}(\/addreport)?/i, "$1\$id$2")
          .replace(/(\/platform\/\$pid\/analysis\/(?:retention|segment|funnel)\/detail\/(?:re|se|fu)_)[\da-z]{32}/i, "$1\$id")
          .replace(/(\/platform\/apps\/group_trend\/)[\da-f]{24}/i, "$1\$id")
          .replace(/(\/platform\/integration\/um_logs\/)[\da-f]{24}/i, "$1\$id")
          ;
      }
    }
    return logItem;
  }
  var pid;
  function init() {
    // ! 此处替换 Clue 项目 ID
    pid = getPid(); // 'U-web', 'u-app-haitang', 'uapp', 'umsite', 'push-3', 'adplus-apptrack', 'adplus-unitrack', 'finplus', 'insight'
    var plugins = [
      [window.performanceTrackerPlugin/*, {sampleRate: 1, oncePerSession: false}*/]
    ];
    if (pid !== 'umsite') {
      var plugin = [window.interfaceTrackerPlugin];
      if (pid !== 'finplus') {
        plugin.push({evaluate: evaluate});
      }
      plugins.push(plugin);
    }
    var tracker = new window.Tracker({
      pid: pid,
      uidResolver: getUid,
      plugins: plugins,
      // sampleRate: 1,
      // ignoreScriptError: false,
      // ignoredQueries: [],
      // msgWhiteList: null,
      // urlWhiteList: null,
      // oncePerSession: false,
      // global: true,
      // debug: true, // for 4.x
      // releaseResolver: function() {},
      // uaParser: function() {},
      beforeLog: beforeLog
    });
    // if (/^4\./.test(tracker.VERSION)) { // 4.x
    tracker.install(); // 启动 tracker 并监听全局 JS 异常
    // } else { // 3.x or lower
    //   tracker.onGlobalError(); // 监听全局 JS 异常
    // }
    return tracker;
  }
  return init();
}();
