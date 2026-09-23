import { describe, expect, it } from 'vitest'
import { parseURL } from './parse-url'

describe('parseURL', () => {
  it('returns an empty object for an empty or invalid URL', () => {
    expect(parseURL()).toEqual({})
    expect(parseURL('not a URL')).toEqual({})
  })

  it('parses and decodes URL parts', () => {
    expect(parseURL('https://example.com:8443/path?q=hello%20world#part')).toMatchObject({
      protocol: 'https:',
      hostname: 'example.com',
      port: '8443',
      pathname: '/path',
      query: { q: 'hello world' },
      hash: '#part',
    })
  })

  it('preserves encoded query values when decode is false', () => {
    expect(parseURL('https://example.com/?q=hello%20world', { decode: false }))
      .toMatchObject({ query: { q: 'hello%20world' } })
  })
})
