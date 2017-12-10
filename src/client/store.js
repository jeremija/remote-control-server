import logger from 'redux-logger'
import reducers from './reducers'
import { applyMiddleware, createStore as _createStore } from 'redux'

const DEBUG_ENABLED = window.localStorage && window.localStorage.log

export function createMiddlewares (debug = DEBUG_ENABLED) {
  const m = []
  if (debug) {
    m.push(logger)
  }
  return m
}

export function createStore () {
  return _createStore(
    reducers,
    applyMiddleware(...createMiddlewares())
  )
}

export const store = createStore()
