const constantsContext = require.context('./modules/', true, /constants\/.*\.js$/)

export default constantsContext.keys().reduce((constants, key) => {
  return Object.assign(constants, constantsContext(key))
}, {})
