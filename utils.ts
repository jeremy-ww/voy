import { spawnSync } from 'child_process'
import * as chalk from 'chalk'

export enum TEXT_COLOR {
  success = 'green',
  info = 'blue',
  note = 'white',
  warning = 'yellow',
  error = 'red'
}

export type NpmRemovePackageOptions = '-S' | '-D'

type NpmCommand = 'rm' | 'i'

function color (severity: TEXT_COLOR, message: string, content = '') {
  console.log(
    chalk[TEXT_COLOR[severity]](message) +
    (content.length ? `\n${content}` : '') +
    '\n'
  )
}

function run (
  command: NpmCommand,
  packages: any[],
  options?: NpmRemovePackageOptions
) {
  spawnSync('npm', [command, ...packages, options], { stdio: 'inherit', cwd: process.cwd() })
}

export {
  color,
  run
}
