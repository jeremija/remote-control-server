import c from '../../constants'

export const setView = view => {
  return {
    type: c.VIEW_SET,
    payload: { view }
  }
}
