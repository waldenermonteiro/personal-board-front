export const SET_DATA = (state, payload) => {
  state.frames = payload.sort(function (a, b) {
    return a.position < b.position ? -1 : 1
  })
  for (const frame of state.frames) {
    frame.tasks = frame.tasks.sort(function (a, b) {
      return a.position < b.position ? -1 : 1
    })
  }
}
