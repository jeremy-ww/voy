import { TEXT_COLOR, Options, Field, NpmRemovePackageOptions } from './interface'
import isType from 'sewing/dist/isType'
import { color, run } from './utils'
import * as fs from 'fs-extra'
import * as d from 'debug'

const pkg = fs.readJsonSync(process.cwd() + '/package.json')
const debug = d('cli')

export enum VOY_FIELDS {
  dep = 'dependencies',
  dev = 'devDependencies'
}

export class Voy {
  private _field: string
  private _filter: RegExp

  static fields = VOY_FIELDS

  constructor ({ field = 'dep', filter = '' }: Options = {}) {
    this._field = Voy.fields[field]
    this._filter = isType(filter, 'RegExp')
      ? filter as RegExp
      : new RegExp(filter)
  }

  get packages (): string[] {
    const { _filter, _field } = this
    const dependencies = pkg[_field]
    const dep2List = Object.keys(dependencies)
      .map(pkg => ({ pkg, version: dependencies[pkg] }))

    return dep2List
      .filter(({ pkg }) => _filter.test(pkg))
      .map(({ pkg, version }) => version ? `${pkg}@${version}` : pkg)
  }

  warn (packages: string[]) {
    if (packages.length === 0) {
      color(TEXT_COLOR.error, `nothing can be removed in ${this._field} !`)
      process.exit(0)
    }
  }

  remove () {
    const { packages } = this
    this.warn(packages)
    color(TEXT_COLOR.success, 'will remove packages:', packages.join('\n'))
    debug(`npm rm ${packages.join(' ')}`)
    run('rm', packages.map(pkg => pkg.replace(/(.+)@.+/, '$1')))
  }

  migrate () {
    this.remove()
    const { packages } = this
    const options: NpmRemovePackageOptions = this._field === 'devDependencies' ? '-S' : '-D'
    color(TEXT_COLOR.success, 'will add packages:', packages.join('\n'))
    debug(`npm i ${packages.join(' ')} ${options}`)
    run('i', packages, options)
  }
}

export default (options: Options) => new Voy(options)
