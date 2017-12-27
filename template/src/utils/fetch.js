/**
 * Created by kevin.si on 2017/12/27.
 */
import $methods from './common'
var Ajax = function () {
  var _param = function (param) {
    var params = {};
    if (param) {
      var type = $methods.getObjectClass(param);
      if (type == 'Object') {
        for (var k in param) {
          if (param[k] === null) continue;
          params[k] =param[k];
        }
      } else {
        console.error('参数类型只能为对象类型！');
      }
    }
    // if (!$store.getters.sign || !$store.getters.busparam) {
    //   $store.dispatch('setBusparam', $methods.getQueryString('busparam'))
    //   $store.dispatch('setSign', $methods.getQueryString('sign'))
    // }
    // params.busparam = $store.getters.busparam
    // params.sign = $store.getters.sign
    return params;
  };
  var _execute = function (method, url, params, success, error) {
    var obj = {
      type: method,
      cache: false,
      url: url,
      data: params,
      success: function(data, status){
        if ($methods.getObjectClass(data) != 'Object') {
          error('没有数据！');
          return
        }
        if (!data.error_code) {
          success && success(JSON.parse(data.response), status,data);
        } else {
          if (!!error) error(data.error_msg);
          else {
            window.HMO_APP.$vux.alert.show({
              title: '提示',
              content: data.error_msg
            })
          }
        }
      },
      error: function (data) {
        if (data.statusText == 'abort') {
          if (!!error) error(0);
          return;
        }
        var result = ''
        if(!navigator.onLine){
          result = '请检查您的网络！';
        } else {
          result = '后端服务异常，请刷新后重试！';
        }
        if (!!error) {
          error(result);
        } else {
          window.HMO_APP.$vux.alert.show({
            title: '提示',
            content: result
          })
        }
      }
    }
    // if (method == 'post' || method == 'put') {
    //   obj.contentType = 'application/json; charset=utf-8'
    //   obj.data = JSON.stringify(params)
    // } else {
    //   obj.data=params;
    // }
    obj.data=params;
    return $.ajax(obj);
  };
  var _action = function (method, api, bizParam, callback1, callback2) {
    var url = ajaxPath + api, type = $methods.getObjectClass(bizParam);
    if (type == 'Function') {
      return _execute(method, url, _param(null), bizParam, callback1);
    } else {
      return _execute(method, url, _param(bizParam, method), callback1, callback2);
    }
  };
  return {
    action: function (method, api, bizParam, callback1, callback2) {
      return _action(method, api, bizParam, callback1, callback2)
    }
  }
}
export default {
  get: function (api, bizParam, callback1, callback2) {
    if (!ajax) var ajax = new Ajax();
    return ajax.action('get', api, bizParam, callback1, callback2);
  },
  post: function (api, bizParam, callback1, callback2) {
    if (!ajax) var ajax = new Ajax();
    return ajax.action('post', api, bizParam, callback1, callback2);
  },
  put: function (api, bizParam, callback1, callback2) {
    if (!ajax) var ajax = new Ajax();
    return ajax.action('put', api, bizParam, callback1, callback2);
  }
}
