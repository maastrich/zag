export function toArray<T>(v: T | T[] | undefined | null): T[] {
  if (v == null) return []
  return Array.isArray(v) ? v : [v]
}

export const fromLength = (length: number) => Array.from(Array(length).keys())

export const first = <T>(v: T[]): T | undefined => v[0]

export const last = <T>(v: T[]): T | undefined => v[v.length - 1]

export const isEmpty = <T>(v: T[]): boolean => v.length === 0

export const has = <T>(v: T[], t: T): boolean => v.indexOf(t) !== -1

export const add = <T>(v: T[], ...items: T[]): T[] => v.concat(items)

export const remove = <T>(v: T[], ...items: T[]): T[] => v.filter((t) => !items.includes(t))

export const removeAt = <T>(v: T[], i: number): T[] => v.filter((_, idx) => idx !== i)

export const insertAt = <T>(v: T[], i: number, ...items: T[]): T[] => [...v.slice(0, i), ...items, ...v.slice(i)]

export const uniq = <T>(v: T[]): T[] => Array.from(new Set(v))

export const diff = <T>(a: T[], b: T[]): T[] => {
  const set = new Set(b)
  return a.filter((t) => !set.has(t))
}

export const addOrRemove = <T>(v: T[], item: T): T[] => (has(v, item) ? remove(v, item) : add(v, item))

export function clear<T>(v: T[]): T[] {
  while (v.length > 0) v.pop()
  return v
}

export type IndexOptions = {
  step?: number | undefined
  loop?: boolean | undefined
}

export function nextIndex<T>(v: T[], idx: number, opts: IndexOptions = {}): number {
  const { step = 1, loop = true } = opts
  const next = idx + step
  const len = v.length
  const last = len - 1
  if (idx === -1) return step > 0 ? 0 : last
  if (next < 0) return loop ? last : 0
  if (next >= len) return loop ? 0 : idx > len ? len : idx
  return next
}

export function next<T>(v: T[], idx: number, opts: IndexOptions = {}): T | undefined {
  return v[nextIndex(v, idx, opts)]
}

export function prevIndex<T>(v: T[], idx: number, opts: IndexOptions = {}): number {
  const { step = 1, loop = true } = opts
  return nextIndex(v, idx, { step: -step, loop })
}

export function prev<T>(v: T[], index: number, opts: IndexOptions = {}): T | undefined {
  return v[prevIndex(v, index, opts)]
}

export function chunk<T>(v: T[], size: number): T[][] {
  return v.reduce<T[][]>((rows, value, index) => {
    if (index % size === 0) rows.push([value])
    else last(rows)?.push(value)
    return rows
  }, [])
}

export function flatArray<T>(arr: T[]): T[] {
  return arr.reduce<T[]>((flat, item) => {
    if (Array.isArray(item)) {
      return flat.concat(flatArray(item))
    }
    return flat.concat(item)
  }, [])
}

export function partition<T>(arr: T[], fn: (value: T) => boolean): [T[], T[]] {
  return arr.reduce<[T[], T[]]>(
    ([pass, fail], value) => {
      if (fn(value)) pass.push(value)
      else fail.push(value)
      return [pass, fail]
    },
    [[], []],
  )
}
