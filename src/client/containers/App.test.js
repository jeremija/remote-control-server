import * as c from '../../constants'
import App from './App'
import Mouse from '../components/Mouse'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'
import _ from 'lodash'
import socket from '../socket'
import { BUTTONS as ARROW_BUTTONS } from '../components/Arrows'
import { BUTTONS, KEYS } from '../components/Buttons'
import { Provider } from 'react-redux'
import { VIEWS } from '../components/App'
import { createStore } from '../store'

jest.mock('../socket')
jest.mock('lodash')
jest.useFakeTimers()

_.throttle.mockImplementation(fn => fn)

describe('containers/App', () => {

  let store, component, node
  beforeEach(() => {
    store = createStore()
    const { dispatch } = store
    store.dispatch = jest.fn().mockImplementation(dispatch.bind(store))

    socket.emit.mockClear()

    component = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <App />
      </Provider>
    )

    node = ReactDOM.findDOMNode(component)
  })

  afterEach(() => {
    jest.runAllTimers()
  })

  describe('render', () => {

    it('renders without issues', () => {
      expect(!!node).toBeTruthy()
    })

  })

  function expectAction (type, payload) {
    expect(type).toEqual(jasmine.any(String))
    expect(store.dispatch.mock.calls).toEqual([[{
      type,
      payload
    }]])
  }

  function expectSocketMessage (type, payload) {
    expect(type).toEqual(jasmine.any(String))
    expect(socket.emit.mock.calls).toEqual([[ type, payload ]])
  }

  describe('Nav', () => {

    ;['mouse', 'arrows'].forEach(view => {
      it(`can switch view to ${view}`, () => {
        const navButton = node.querySelector(`.nav-button.${view}`)
        TestUtils.Simulate.click(navButton)
        expectAction(c.VIEW_SET, { view })
        TestUtils.findRenderedComponentWithType(
          component, VIEWS[view])
      })
    })

  })

  describe('Arrows', () => {

    beforeEach(() => {
      const navButton = node.querySelector(`.nav-button.arrows`)
      TestUtils.Simulate.click(navButton)
      store.dispatch.mockClear()
    })

    ARROW_BUTTONS
    .filter(button => 'code' in button)
    .forEach(button => {
      it(`dispatches key code ${button.code}`, () => {
        const className = '.' + button.className.replace(/ /g, '.')
        const btn = node.querySelector(className)
        TestUtils.Simulate.click(btn)
        expectSocketMessage(c.WS_KEY_PRESS, {
          alt: undefined,
          ctrl: undefined,
          meta: undefined,
          shift: undefined,
          string: undefined,
          code: button.code
        })
      })
    })
  })

  describe('Mouse', () => {

    let mouse, mouseComponent, preventDefault
    beforeEach(() => {
      preventDefault = jest.fn()
      const navButton = node.querySelector(`.nav-button.mouse`)
      TestUtils.Simulate.click(navButton)
      store.dispatch.mockClear()
      mouse = node.querySelector('.view-mouse')
      mouseComponent = TestUtils.findRenderedComponentWithType(component, Mouse)
      preventDefault = jest.fn()
    })

    function touchStart (touches) {
      TestUtils.Simulate.touchStart(mouse, {
        preventDefault,
        touches
      })
    }

    describe('move', () => {
      it('sends movement websocket message', () => {
        TestUtils.Simulate.mouseMove(mouse, {
          clientX: 10,
          clientY: 11
        })
        expectSocketMessage(c.WS_MOUSE_MOVE, {
          scroll: false,
          x: 10,
          y: 11
        })
      })
    })

    describe('click', () => {
      ;['left', 'middle', 'right'].forEach((button, i) => {
        it(`sends ${button} button click event`, () => {
          TestUtils.Simulate.click(mouse, {
            button: i
          })
          expectSocketMessage(c.WS_MOUSE_CLICK, {
            button,
            double: false
          })
        })
      })
    })

    describe('doubleClick', () => {
      ;['left', 'middle', 'right'].forEach((button, i) => {
        it(`sends ${button} button double click event`, () => {
          TestUtils.Simulate.doubleClick(mouse, {
            button: i
          })
          expectSocketMessage(c.WS_MOUSE_CLICK, {
            button,
            double: true
          })
        })
      })
    })

    describe('mouseEnter', () => {
      it('tracks coordinates', () => {
        TestUtils.Simulate.mouseEnter(mouse, {
          clientX: 15,
          clientY: 16
        })
        expect(mouseComponent.lastX).toEqual(15)
        expect(mouseComponent.lastY).toEqual(16)
      })
    })

    describe('touchEnter', () => {
      it('tracks coordinates and calls prevent default after a delay', () => {
        expect(mouseComponent.timeout).toBe(null)
        touchStart([{
          clientX: 15,
          clientY: 16
        }])
        expect(mouseComponent.lastX).toEqual(15)
        expect(mouseComponent.lastY).toEqual(16)
      })

      it('calls preventDefault after a delay', () => {
        expect(mouseComponent.timeout).toBe(null)
        touchStart([{
          clientX: 15,
          clientY: 16
        }])
        expect(preventDefault.mock.calls.length).toBe(0)
        jest.runAllTimers()
        expect(preventDefault.mock.calls.length).toBe(1)
      })
    })

    describe('touchMove', () => {

      beforeEach(() => {
        TestUtils.Simulate.touchStart(mouse, {
          touches: [{
            clientX: 15,
            clientY: 16
          }]
        })
      })

      it('calls event.preventDefault', () => {
        TestUtils.Simulate.touchMove(mouse, {
          preventDefault,
          touches: [{
            clientX: 20,
            clientY: 30
          }]
        })
        expect(preventDefault.mock.calls.length).toBe(1)
      })

      it('moves mouse when single touch', () => {
        TestUtils.Simulate.touchMove(mouse, {
          touches: [{
            clientX: 20,
            clientY: 30
          }]
        })
        expectSocketMessage(c.WS_MOUSE_MOVE, {
          scroll: false,
          x: 20 - 15,
          y: 30 - 16
        })
      })

      it('scrolls when multiple touches', () => {
        TestUtils.Simulate.touchMove(mouse, {
          touches: [{
            clientX: 20,
            clientY: 30
          }, {
            clientX: 0,
            clientY: 0
          }]
        })
        expectSocketMessage(c.WS_MOUSE_MOVE, {
          scroll: true,
          x: 20 - 15,
          y: 30 - 16
        })
      })

      it('does nothing when scroll below threshold', () => {
        TestUtils.Simulate.touchMove(mouse, {
          touches: [{
            clientX: 20,
            clientY: 13
          }, {
            clientX: 0,
            clientY: 13
          }]
        })
        expect(socket.emit.mock.calls.length).toBe(0)
      })
    })

    describe('touchEnd', () => {
      beforeEach(() => {
        touchStart([{
          clientX: 15,
          clientY: 16
        }])
      })

      it('clears preventDefault timeout', () => {
        expect(mouseComponent.timeout).toEqual(jasmine.any(Number))
        TestUtils.Simulate.touchEnd(mouse)
        jest.runAllTimers()
        expect(preventDefault.mock.calls.length).toBe(0)
      })
    })

  })

  describe('Buttons', () => {

    beforeEach(() => {
      const navButton = node.querySelector(`.nav-button.mouse`)
      TestUtils.Simulate.click(navButton)
      store.dispatch.mockClear()
    })

    BUTTONS.forEach(button => {
      it(`toggles ${button} mouse button`, () => {
        const btn = node.querySelector('.button.' + button)
        ;[true, false].forEach(pressed => {
          TestUtils.Simulate.mouseDown(btn)
          expectSocketMessage(c.WS_MOUSE_TOGGLE, {
            button,
            pressed
          })
          socket.emit.mockClear()
        })
      })
    })

    KEYS.forEach(key => {
      it(`toggles ${key} key`, () => {
        const btn = node.querySelector('.key.' + key)
        ;[true, false].forEach(pressed => {
          TestUtils.Simulate.mouseDown(btn)
          expectSocketMessage(c.WS_KEY_TOGGLE, {
            key,
            pressed
          })
          socket.emit.mockClear()
        })
      })
    })

  })

  describe('Input', () => {

    let input
    beforeEach(() => {
      input = node.querySelector('.input input')
    })

    ;['keyCode', 'which'].forEach(keyCodeProp => {
      it(`dispatches press event on type (${keyCodeProp})`, () => {
        TestUtils.Simulate.keyUp(input, {
          [keyCodeProp]: 74,
          target: {
            value: 'J'
          }
        })
        expectSocketMessage(c.WS_KEY_PRESS, {
          alt: false,
          ctrl: false,
          shift: false,
          meta: false,
          string: 'J',
          code: 74
        })
      })

      it(`dispatches press event w/ modifiers on type (${keyCodeProp})`, () => {
        TestUtils.Simulate.keyUp(input, {
          altKey: true,
          ctrlKey: true,
          shiftKey: true,
          metaKey: true,
          [keyCodeProp]: 74,
          target: {
            value: 'J'
          }
        })
        expectSocketMessage(c.WS_KEY_PRESS, {
          alt: true,
          ctrl: true,
          shift: true,
          meta: true,
          string: 'J',
          code: 74
        })
      })
    })

  })

})
