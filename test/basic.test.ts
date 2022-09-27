import { it } from 'vitest'
import { assert, expect, test } from 'vitest'
import { bench, describe } from 'vitest'

test('Math.sqrt()', () => {
  expect(Math.sqrt(4)).toBe(2)
  expect(Math.sqrt(144)).toBe(12)
  expect(Math.sqrt(2)).toBe(Math.SQRT2)
})


