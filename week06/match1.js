function match(iterable) {
  var flageA = false
    for (var item of iterable) {
      if(item == 'a'){
        flageA = true
      }else if(flageA && item == 'b'){
        return true
      }else {
        flageA = false
      }
    }
    return false
}
var str = 'absdasdfsdfs'
console.log(match(str))
