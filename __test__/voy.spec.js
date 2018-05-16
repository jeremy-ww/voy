process.chdir('./__test__')

const voy = require('../dist')
const fs = require('fs')

function removeVersionSymbol (dependencies) {
  Object.keys(dependencies).forEach(v => {
    dependencies[v] = dependencies[v].replace(/[^\d.]/g, '')
  })
  return dependencies
}

function readPackageAsJSON () {
  const { dependencies, devDependencies } = JSON.parse(fs.readFileSync(__dirname + '/package.json'))
  return {
    dependencies: removeVersionSymbol(dependencies),
    devDependencies: removeVersionSymbol(devDependencies)
  }
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

  voy.default({ field: 'dep', filter: '^babel' }).remove()

  expect(readPackageAsJSON().devDependencies)
    .toEqual({})
})
