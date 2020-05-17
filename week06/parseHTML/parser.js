
let currentToken = null
let currentAttribute = null
let currentTextNode = null
// 用栈来组装  所以用一个document 方便取出构造的树
let stack = [{type:'document', children:[]}]
// 表示文件结束 处理字符串 也需要 结束标识的
// 只要是唯一的就可以
const EOF = Symbol('EOF') //end of file

// 提交生成 的token 创建元素
function emit(token) {
  // 得到栈顶元素
  let top = stack[stack.length-1]

  if(token.type == 'startTag'){
    let element = {
      type: 'element',
      children: [],
      attributes: []
    }

    element.tagName = token.tagName

    for (var p in token) {
      if( p != 'type' && p != 'tagName'){
        element.attributes.push({
          name: p,
          value: token[p]
        })
      }
    }
    top.children.push(element)
    element.parent = top
    if(!token.isSelfClosing){
      stack.push(element)
    }

    currentTextNode = null
  }else if (token.type == 'endTag') {
    if(token.tagName != top.tagName){
      throw new Error('no match')
    }else {
      stack.pop()
    }

    currentTextNode = null
  }else if (token.type == 'text') {
    if(currentTextNode == null){
      currentTextNode = {
        type: 'text',
        content: ''
      }
      top.children.push(currentTextNode)
    }
    currentTextNode.content += token.content
  }

}

function data(c) {

  if(c == '<'){
    return tagOpen
  }else if (c == EOF) {
    emit({
      type: 'EOF'
    })
    return
  }else {
    emit({
      type: 'text'
    })
    return data
  }
}

function tagOpen(c) {
  if(c == '/'){
    return endTagOpen
  }else if (c.match(/^[a-zA-Z]$/) ) {
    currentToken = {
      type: 'startTag',
      tagName:''
    }
    return tagName(c)
  }else {
    return
  }
}

function endTagOpen(c) {
  if (c.match(/^[a-zA-Z]$/) ) {
    currentToken = {
      type: 'endTag',
      tagName:''
    }
    return tagName(c)
  }else if (c == '>') {

  }else if (c == EOF) {

  }else {

  }
}

function tagName(c) {

  if(c.match(/^[\t\n\f ]$/)){
    return beforeAttributeName
  }else if (c == '/') {
    return selfClosingStartTag
  }else if (c.match(/^[a-zA-Z]$/) ) {
    // 拼接标签
    currentToken.tagName += c
    return tagName
  }else if (c == '>') {
    emit(currentToken)
    return data
  }else {
    return tagName
  }
}


function beforeAttributeName(c) {
  if(c.match(/^[\t\n\f ]$/)){
    return beforeAttributeName
  }else if (c == '=') {

  }else if (c == '>' || c == '/' || c == EOF) {
    return afterQuotedAttributeValue(c)
  }else {
    // 创建一个属性节点
    currentAttribute = {
      name: '',
      value: ''
    }
    return attributeName(c)
  }
}

function attributeName(c) {
  if(c == '='){
    return beforeAttributeValue
  }else if (c.match(/^[\t\n\f ]$/) || c == '>' || c == '/' || c == EOF) {
    return afterQuotedAttributeValue(c)
  }else if(c == '\u0000'){

  }else if(c == '<' || c == '\'' || c == "'"){

  }else {
    currentAttribute.name +=c
    return attributeName
  }
}

function beforeAttributeValue(c){
  if (c.match(/^[\t\n\f ]$/)|| c == '>' || c == '/' || c == EOF) {
    return afterQuotedAttributeValue(c)
  }else if (c == "\"") {
    return dobuleQuotedAttributeValue
  }else if(c == '\''){
    return singleQuotedAttributeValue
  }else if(c == '>'){

  }else {
    return UnquotedAttributeValue(c)
  }
}

// 双引号
function dobuleQuotedAttributeValue(c) {
  if(c == '"'){
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterQuotedAttributeValue
  }else if (c == '\u0000') {

  }else if (c == EOF) {

  }else {
    currentAttribute.value += c
    return dobuleQuotedAttributeValue
  }
}

// 单引号
function singleQuotedAttributeValue(c) {
  if(c == '\''){
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterQuotedAttributeValue
  }else if (c == '\u0000') {

  }else if (c == EOF) {

  }else {
    currentAttribute.value += c
    return singleQuotedAttributeValue
  }
}

//无引号
function UnquotedAttributeValue(c) {
  if(c.match(/^[\t\n\f ]$/)){
    currentToken[currentAttribute.name] = currentAttribute.value
    return beforeAttributeName
  }else if (c == '/') {
    currentToken[currentAttribute.name] = currentAttribute.value
    return selfClosingStartTag
  }else if (c == '>') {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  }else if (c == '\u0000') {

  }else if (c == "\"" || c == '"' || c == '<' || c == '=' || c == '`') {

  }else if (c == EOF) {

  }else {
    currentAttribute.value += c
    return UnquotedAttributeValue
  }
}

// 属性之后
function afterQuotedAttributeValue(c) {
  if(c.match(/^[\t\n\f ]$/)){
    return beforeAttributeName
  }else if (c == '/') {
    return selfClosingStartTag
  }else if (c == '>') {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  }else if (c == EOF) {

  }else {
    currentAttribute.value += c
    return dobuleQuotedAttributeValue
  }
}





// 自闭合标签
function selfClosingStartTag(c) {
  if(c == '>'){
    currentToken.isSelfClosing = true
    // console.log(currentToken,'currentToken');
    emit(currentToken)
    return data
  }else if (c == EOF) {

  }else {

  }
}


module.exports.parserHtml = function parserHtml(html) {
  let state = data
  for (var item of html) {
      state = state(item)
  }
  // 文本节点的结束 随着文件结束 而自然结束的
  state = state(EOF)
  // var stack1 = JSON.stringify(stack)
  console.log(stack[0].children, 'stack');
}
