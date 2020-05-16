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
  if(c == 'c'){
    return end
  }
  return start(c)
}

// 只返回自身状态
function end(c){
  return end
}

var str = 'abcabx'
console.log(match(str))
