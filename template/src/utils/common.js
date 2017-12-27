/**
 * Created by kevin.si on 2017/12/27.
 */
/*
 * 存放全局公用方法
 * */
var _INCRE = 0, cbMap = {}
export default {
  /**
   * 解析查询条件
   * @param name 条件参数名
   * @returns 参数值
   */
  getQueryString: name => {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i'), r = window.location.search.substr(1).match(reg)
    if (r != null) return decodeURIComponent(r[2])
    return null
  },
  getObjectClass: obj => {
    return Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1]
  },
  /**
   * 控制键盘输入事件，只能输入数字和小数点和删除键
   * @param e keydown事件
   * */
  inputNumber: e => {
    let k = e.which ? e.which : e.keyCode, s = e.shiftKey, tar = e.target
    if (k === 8 || k === 13 || k === 27 || k === 110 || (k === 190 || k >= 48 && k <= 57) && !s || k >= 96 && k <= 105) {
      return true
    } else {
      if (k === 38) {
        tar.value = parseFloat(tar.value) ? parseFloat(tar.value) + 1 : 1
      } else if (k === 40) {
        tar.value = parseFloat(tar.value) - 1 > 0 ? parseFloat(tar.value) - 1 : 0
      }
      return false
    }
  }
}
