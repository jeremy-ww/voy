import { TEXT_COLOR, NpmCommand, NpmRemovePackageOptions } from './interface'
import { spawnSync } from 'child_process'
import chalk from 'chalk'

function color (severity: TEXT_COLOR, message: string, content = '') {
  console.log(
    chalk[severity](message) +
    (content.length ? `\n${content}` : '') +
    '\n'
  )
}

function run (
  command: NpmCommand,
  packages: string[],
  options?: NpmRemovePackageOptions
) {
  const args = options
    ? [command, ...packages].concat(options)
    : [command, ...packages]
  spawnSync('npm', args, { stdio: 'inherit', cwd: process.cwd() })
}

export {
  color,
  run
}
