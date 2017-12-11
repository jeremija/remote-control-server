import { createMiddlewares, isDebugEnabled } from './store.js'
import logger from 'redux-logger'

describe('store', () => {

  it('adds logger to the middlewares when debug is true', () => {
    const m = createMiddlewares(true)
    expect(m).toContain(logger)
  })

  it('does not logger to middlewares when debug is false', () => {
    const m = createMiddlewares(false)
    expect(m).not.toContain(logger)
  })

})

describe('isDebugEnabled', () => {

  let window
  beforeEach(() => {
    window = {
      localStorage: {
        log: '1'
      }
    }
  })

  it('returns true when log localStorage.log is truthy', () => {
    expect(isDebugEnabled(window)).toBe(true)
  })

  it('returns false when localStorage.log is falsy', () => {
    delete window.localStorage.log
    expect(isDebugEnabled(window)).toBe(false)
  })

  it('returns false when no localStorage', () => {
    delete window.localStorage
    expect(isDebugEnabled(window)).toBe(false)
  })

})
