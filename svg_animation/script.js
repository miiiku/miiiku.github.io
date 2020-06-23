window.onload = function() {
  let items = Array.from(document.querySelectorAll(".item-box"))
  items.forEach(item => {
    let circle = item.querySelector(".circle__progress--fill")
    let span = item.querySelector(".percent-int")
    let dec = item.querySelector(".percent-dec")
    let value = item.dataset.value
    let r = circle.r.baseVal.value
    strokeTransition(circle, value, r, 2000)
    setTimeout(() => {
      let vs = value.split(".")
      numberTransition(span, 2000, 0, vs[0], false)
      numberTransition(dec, 2000, 0, vs[1], true)
    }, 500);

  })
}

/**
 * 定义圆形过渡
 *
 * @param {*} circle circle元素
 * @param {*} v 百分比值
 * @param {*} r 圆形的半径
 * @param {*} d 过渡时间(毫秒)
 */
function strokeTransition(circle, v, r, d) {
  let len = parseInt(2 * r * Math.PI)
  let roat = parseFloat(len - v / 10 * len).toFixed(2)
  circle.style.setProperty('--initialStroke', len)
  setTimeout(() => {
    circle.style.setProperty('--transitionDuration', `${d}ms`)
    circle.style.strokeDashoffset = roat
  }, 500);
}

/**
 * 定制内部数字过渡
 *
 * @param {*} span 数字元素
 * @param {*} duration 过渡时间(毫秒)
 * @param {*} selfVal 当前的值
 * @param {*} endVal 结束的值
 */
function numberTransition(span, duration, selfVal, endVal, isComplement) {
  // 最小更新间隔为100毫秒
  endVal = parseInt(endVal)
  let interval = Math.max(100, parseInt(duration / endVal))
  let amount = Number((endVal / (duration / interval)).toFixed(2))
  selfVal = Math.ceil(selfVal + amount)
  span.innerText = isComplement ? add0(selfVal) : selfVal
  if (selfVal >= endVal) {
    span.innerText = isComplement ? add0(endVal) : endVal
  } else {
    setTimeout(() => numberTransition(span, duration, selfVal, endVal, isComplement), interval);
  }
}

/**
 * 数字补0
 *
 * @param {*} value 传入的值
 * @returns 补0后的值
 */
function add0(value) {
  return value < 9 ? `0${value}` : value
}