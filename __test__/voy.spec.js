process.chdir('./__test__')

const voy = require('../dist')
const fs = require('fs')

function readPackageAsJSON () {
  return JSON.parse(fs.readFileSync(__dirname + '/package.json'))
}

test('voy test', function () {
  expect(require('./package.json').devDependencies)
    .toEqual({
      'babel': '6.23.0',
      'babel-loader': '7.1.4',
      'eslint': '4.19.1',
      'eslint-loader': '2.0.0'
    })

  voy.default({ field: 'dev', filter: '^eslint' }).migrate()

  expect(readPackageAsJSON().dependencies)
    .toEqual({
      "react": "16.3.2",
      'eslint': '4.19.1',
      'eslint-loader': '2.0.0'
    })

  voy.default({ field: 'dev', filter: '^babel' }).remove()

  expect(readPackageAsJSON().devDependencies)
    .toEqual({})
})
