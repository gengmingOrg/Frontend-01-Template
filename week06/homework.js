function match(iterable) {
  let state = start
  for (var item of iterable) {
      state = state(item)
  }
  return state == end
}

function start(c){
  if(c == 'a'){
    return foundA
  }else {
    return start
  }
}

function foundA(c){
  if(c == 'b'){
    return foundB
  }
  return start(c)
}

function foundB(c){
  if(c == 'a'){
    return foundA1
  }
  return start(c)
}

function foundA1(c){
  if(c == 'b'){
    return foundB1
  }
  return start(c)
}


function foundB1(c){
  if(c == 'a'){
    return foundA2
  }
  return start(c)
}

function foundA2(c){
  if(c == 'b'){
    return foundB2
  }
  return start(c)
}

function foundB2(c){
  if(c == 'x'){
    return end
  }
  return foundB1(c)
}
// 只返回自身状态
function end(c){
  return end
}

// var str = 'ababababx'
// var str = 'abababx'
var str = 'ababaabx'
console.log(match(str))
