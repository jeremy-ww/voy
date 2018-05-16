# Voy [![Build Status](https://img.shields.io/circleci/project/github/Army-U/voy.svg?style=flat-square)](https://circleci.com/gh/Army-U/voy) [![npm package](https://img.shields.io/npm/v/voy.svg?style=flat-square)](https://www.npmjs.com/package/voy)

批量修改 NPM 依赖的 CLI 工具, 简化模块卸载与迁移的操作. [English Doc](README.md)

![Voy](https://user-images.githubusercontent.com/11404005/40111668-209fa756-5936-11e8-8b52-4333a687aa4f.png)

## 使用

``` bash
$ npx voy rm <match-rule> [options]
$ npx voy mg <match-rule> [options]
```

示例:

``` bash
$ npx voy rm ^eslint -D   # 移除 `devDependencies` 中 `eslint` 后缀的模块
$ npx voy mg '^(?!react)' # 移除 `dependencies` 中不以 `react` 开头的模块
$ npx voy rm loader$ -D   # 移除 `devDependencies` 中以 `loader` 结尾的模块
```

## 选项

名称: `match-rule`<br>
类型: `RegExp|string`<br>
选项: `all`

匹配模块名, 可以是正则表达式或者是匹配所有模块的字符串 `all`.

名称: `options`<br>
类型: `string`<br>
选项: `-D`

是否作用于 `package.json` 中的 `devDependencies` 字段, 这与 NPM 中的 `npm i package -D` 保持一致.

## 批量删除模块

批量删除用到的是 `voy rm` 命令接收一个正则表达式或者值为 `all` 的字符串作为参数. 如：

```bash
$ npx voy rm babel
```

上面这个命令会删除 `package.json` 的 `dependencies` 中 所有模块名包含了 `babel` 的模块, 如果需要删除 `devDependencies` 中的模块则需要添加一个 `-D` 的参数. 如:

```bash
$ npx voy rm babel -D
```

如果想卸载 `dependencies` 中的所有模块, 直接通过 `all` 命令来实现.

```bash
$ npx voy rm all
```

## 批量迁移模块

模块迁移是指将依赖在 `package.json` 中的 `dependencies` 与 `devDependencies` 位置切换. 例如：`create-react-app` 生成的项目中执行 `eject` 命令后, 所有的模块都会存在于 `dependencies` 模块下. 这时执行

```bash
$ npx voy mg '^(?!react)'
```

命令, 就能将所有名称不以 `React` 开始的 `dependencies` 模块转移到 `devDependencies` 字段下.

当然你可以转移全部模块:

```bash
$ npx voy mg all -D
```

## 直接在 node 中使用

```bash
$ npm i voy -S
```
### 选项

名称: filter<br>
类型: `RegExp`

名称: field<br>
类型: `string`<br>
选项: `dep|dev`

### Examples

```js
const voy = require('voy')
voy({ filter: /loader$/, field: 'dep' }).rm()
voy({ filter: /vue/ }).mg()
```

## 证书

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2017-present, Army-U
