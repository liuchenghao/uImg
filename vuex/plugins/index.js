// 中间件
import createLogger from 'vuex/dist/logger'
const plugins = []
const debug = process.env.NODE_ENV !== 'production'
if (debug) {
  plugins.unshift(createLogger())
}
export default plugins
