const fs = require('fs-extra-promise')
const tokenizer = require('./tokenizer')

const fileName = 'test.js'

fs.readFileAsync(fileName).then((data) => {
  console.log(tokenizer(data, 1, 1))
});

