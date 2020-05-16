function match(iterable) {
  var flageA = false
  var flageB = false
  var flageC = false

  for (var item of iterable) {
    if (item == 'a') {
      flageA = true
    } else if (flageA && item == 'b') {
      flageB = true
    } else if (flageB && item == 'c') {
      return true
    }else{
      flageA = false
      flageB = false
      flageC = false
    }
  }
  return false
}
var str = 'abcsdasdfcsdfs'
console.log(match(str))
