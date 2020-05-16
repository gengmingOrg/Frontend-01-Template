function match(str) {
    for (var i = 0; i < str.length; i++) {
      if(str[i] == 'a'){
        return true
      }
    }
    return false
}
var str = 'asdasdfsdfs'
console.log(match(str))
