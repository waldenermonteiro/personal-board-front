import Base from '../../../services/base'
class FrameService extends Base {
  constructor () {
    super('/frames')
  }
}
export default new FrameService()
