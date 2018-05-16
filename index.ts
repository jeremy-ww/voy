import { color, run, TEXT_COLOR, NpmRemovePackageOptions } from './utils'
import * as fs from 'fs-extra'
import * as d from 'debug'

const pkg = fs.readJsonSync(process.cwd() + '/package.json')
const debug = d('cli')

enum VOY_FIELDS {
  dep = 'dependencies',
  dev = 'devDependencies'
}

class Voy {
  private _field: string
  private _filter: RegExp

  static fields = VOY_FIELDS

  constructor ({ field = 'dep', filter = '' } = {}) {
    this._field = Voy.fields[field]
    this._filter = new RegExp(filter)
  }

  get packages () {
    const { _filter, _field } = this
    const dependencies = pkg[_field]
    const dep2List = Object.keys(dependencies).map(pkg => ({ pkg, version: dependencies[pkg] }))
    return dep2List
      .filter(({ pkg }) => _filter.test(pkg))
      .map(({ pkg, version }) => version ? `${pkg}@${version}` : pkg)
  }

  warn (packages) {
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

export default options => new Voy(options)
