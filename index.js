const _ = require('lodash')
const immutable = require('immutable')
const fs = require('fs-extra-promise')
const esprima = require('esprima')

const options = {

}

const MAIN_DELIMITER = '@#@'
const COUNT_DELIMITER = ','
const TOKEN_DELIMITER = '@@::@@'

const filterTokens = function (type, token) {
  return token.type == type
}

const tokenTypes = immutable.List.of(
  'Boolean',
  'Identifier',
  'Keyword',
  'Null',
  'Numeric', 
  'Punctuator',
  'String',
  'RegularExpression'
)

const tokenFilters = tokenTypes.map((tokenType) => {
  return _.partial(filterTokens, tokenType)
})

const fileName = 'test.js'

fs.readFileAsync(fileName).then((data) => {
  const tokens = immutable.List(esprima.tokenize(data, options))

  // TODO: reduce to map
  const filteredTokens = tokenFilters.map((tokenFilter) => {
    return tokens.filter(tokenFilter)
  })
  //filteredTokens.map((tokenType) => {
  //  console.log(tokenType.size)
  //})

  // TODO: search by token types as well
  let uniqueTokens = immutable.Map()
  tokens.forEach((token) => {
    if (uniqueTokens.has(token.value)) {
      newUniqueTokens = uniqueTokens.updateIn([ token.value ], (count) => { return count + 1 })
    } else {
      newUniqueTokens = uniqueTokens.set(token.value, 1)
    }
    uniqueTokens = newUniqueTokens
  })

  tokenPairs = uniqueTokens.map((count, token) => {
    return `${token}${COUNT_DELIMITER}${count}`
  })
  output = `1,2,${MAIN_DELIMITER}${tokenPairs.join(TOKEN_DELIMITER)}`

  console.log(output)

});

