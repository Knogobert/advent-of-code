import { describe, expect, test } from 'bun:test'
import fs from "fs"
import { partOne } from './01'

describe('Day 1', () => {
  test('Example', () => {
    const input = fs.readFileSync("src/01/example.txt").toString()
    const result = partOne(input)
    const expected = "11"
    expect(result).toBe(expected)
  })
})