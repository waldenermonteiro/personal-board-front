import Base from '../../../services/base'
class TaskService extends Base {
  constructor () {
    super('/task')
  }
}
export default new TaskService()
