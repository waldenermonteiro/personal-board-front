/* eslint-disable no-useless-catch */
import FrameService from '../services/FrameService'

export const list = async ({ commit }, params) => {
  try {
    const { data } = await FrameService.list(params)
    commit('SET_DATA', data)
  } catch (error) {
    throw error
  }
}
export const create = async ({ commit }, obj) => {
  try {
    await FrameService.create(obj)
  } catch (error) {
    throw error
  }
}
export const update = async ({ commit }, obj) => {
  try {
    await FrameService.updateNoId(obj)
  } catch (error) {
    throw error
  }
}
export const remove = async ({ commit }, obj) => {
  try {
    await FrameService.remove(obj.id)
  } catch (error) {
    throw error
  }
}
