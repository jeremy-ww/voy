export type Field = 'dep' | 'dev'

export type NpmRemovePackageOptions = '-S' | '-D'

export type NpmCommand = 'rm' | 'i'

export enum TEXT_COLOR {
  success = 'green',
  info = 'blue',
  note = 'white',
  warning = 'yellow',
  error = 'red'
}

export interface Options {
  field?: Field
  filter?: string | RegExp
}
