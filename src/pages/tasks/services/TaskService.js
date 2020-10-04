import Base from '../../../services/base'
class TaskService extends Base {
  constructor () {
    super('/tasks')
  }
}
export default new TaskService()
