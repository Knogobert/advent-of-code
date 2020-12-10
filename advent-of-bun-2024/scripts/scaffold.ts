import chalk from 'chalk'
import dedent from 'dedent'
import { existsSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'

import { fetchInput } from './api.ts'

export async function scaffold(day: number, year: number) {
  const name = `${day}`.padStart(2, '0')

  const directory = new URL(`../src/${name}/`, import.meta.url)

  if (existsSync(directory)) return

  console.log(`📂 Setting up day ${day} of ${year}`)

  await mkdir(directory)

  const test = dedent`
  import { describe, expect, test } from 'bun:test'
  import fs from "fs"
  import { partOne } from './${name}'

  describe(${`'Day ${day}'`}, () => {
    test('Example', () => {
      const input = fs.readFileSync("src/${name}/example.txt").toString()
      const result = partOne(input)
      const expected = "TODO"
      expect(result).toBe(expected)
    })
  })
  `

  const solution = dedent`
  export function partOne(input: string) {
    return "UNIMPLEMENTED"
  }

  export function partTwo(input: string) {
    return "UNIMPLEMENTED"
  }
  `

  console.log(`📂 Fetching your input`)

  const input = await fetchInput({ day, year }).catch(() => {
    console.log(
      chalk.red.bold(
        '📂 Fetching your input have failed, empty file will be created.'
      )
    )
  })

  await Bun.write(new URL(`${name}.test.ts`, directory.href), test)
  await Bun.write(new URL(`${name}.ts`, directory.href), solution)
  await Bun.write(new URL(`input.txt`, directory.href), input ?? '')
  await Bun.write(new URL(`example.txt`, directory.href), '')

  console.log('📂 You all set up, have fun!')
}
