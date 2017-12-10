import { createMiddlewares } from './store.js'
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
