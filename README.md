# Voy [![Build Status](https://flat.badgen.net/circleci/github/Army-U/voy/master)](https://circleci.com/gh/Army-U/voy) [![npm package](https://flat.badgen.net/npm/v/voy)](https://www.npmjs.com/package/voy)

Batch modify the NPM dependent CLI tools, simplify the module uninstall and migration operations. [中文文档](README.zh-cn.md)

![Voy](https://user-images.githubusercontent.com/11404005/40111668-209fa756-5936-11e8-8b52-4333a687aa4f.png)

## Quick Start

``` bash
$ npx voy rm <match-rule> [options]
$ npx voy mg <match-rule> [options]
```

Examples:

``` bash
$ npx voy rm ^eslint -D   # remove package which's name start with `eslint` in `devDependencies`
$ npx voy mg '^(?!react)' # remove package which's name not start with `react` in `dependencies`
$ npx voy rm loader$ -D   # remove package which's name end with `loader` in `devDependencies`
```

## Options

Name: `match-rule`<br>
Type: `RegExp|string`<br>
Options: `all`

Module corresponding to name matching, Can be regular expressions or the string that matching all modules.

Name: `options`<br>
Type: `string`<br>
Options: `-D`

Whether it works on the `devDependencies` field in `package.json`, which is consistent with the `npm I package -D` in NPM.

## Batch delete module

Batch deletion uses the `voy rm` command to receive a regular expression or a string valued at `all` as a parameter. Such as:

```bash
$ npx voy rm babel
```

The above command delete all the module in the `package.json` `dependencies` which's name including the `babel`. If you want to delete the module in `devDependencies`, you need to add a `-D` parameter. Such as:

```bash
$ npx voy rm babel -D
```

If you want to uninstall all the modules in the `dependencies`, you can do it directly through the `all` command.

```bash
$ npx voy rm all
```

## Batch migration module

Module migration refers to the switch between `dependencies` and `devDependencies` locations that depend on `package.json`. For example, when the `eject` command is executed in the `create-react-app` generated project, all the modules will exist in the `dependencies` module. Execution at this time:

```bash
$ npx voy mg '^(?!react)'
```

You can transfer all the `dependencies` modules which' name don't start with `React` to the `devDependencies` field.

Of course, you can transfer all modules from `devDependencies` to the `dependencies` field.

```bash
$ npx voy mg all -D
```

## Using in node

```bash
$ npm i voy -S
```

### Options

Name: filter<br>
Type: `RegExp`

Name: field<br>
Type: `string`<br>
Options: `dep|dev`

### Examples

```js
const voy = require('voy')
voy({ filter: /loader$/, field: 'dep' }).rm()
voy({ filter: /vue/ }).mg()
```

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2017-present, Army-U
