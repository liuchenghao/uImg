/* const constantsContext = require.context('./modules/', true, /types\/.*\.js$/)

export default constantsContext.keys().reduce((constants, key) => {
  return Object.assign(constants, constantsContext(key))
}, {})
 */
export const SET_LOGIN_INFO = 'SET_LOGIN_INFO';