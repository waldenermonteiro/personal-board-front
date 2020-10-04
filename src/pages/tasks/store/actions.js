/* eslint-disable no-useless-catch */
import TaskService from '../services/TaskService'

export const list = async ({ commit }, params) => {
  try {
    const { data } = await TaskService.list(params)
    commit('SET_DATA', data)
  } catch (error) {
    await error
  }
}
export const create = async ({ commit }, obj) => {
  try {
    await TaskService.create(obj)
  } catch (error) {
    throw error
  }
}
export const update = async ({ commit }, obj) => {
  try {
    await TaskService.updateNoId(obj)
  } catch (error) {
    throw error
  }
}
export const remove = async ({ commit }, obj) => {
  try {
    await TaskService.remove(obj.id)
  } catch (error) {
    throw error
  }
}
