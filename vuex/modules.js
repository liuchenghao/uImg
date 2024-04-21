const modulesContext = require.context('../pages/', true, /modules\/store\/.*\.js$/);
let keys = modulesContext.keys();
let readyCreateModules = function(keys = []) {
  let keyContext = {};
  keys.map(function(key) {
    let _path = key.replace(/(^\.\/)|(\.js$)/g, '');
    let path = _path.replace(/[\/]?modules\/store\/.*/, '');
    let paths = path.split(/\//);
    if (paths.length > 1) {
      createSubContext(paths, key, keyContext);
    } else {
      // root
      let keyArray = keyContext[path] = keyContext[path] || [];
      keyArray.push(key);
    }
  });

  function createSubContext(paths, key, keyContext) {
    let path = paths.splice(0, 1);
    let len = paths.length;
    if (len) {
      var keyObject = keyContext[path] = keyContext[path] || [];
      createSubContext(paths, key, keyObject);
    } else {
      var keyArray = keyContext[path] = keyContext[path] || [];
      keyArray.push(key);
    }
  }
  return keyContext;
}
let keyObjects = readyCreateModules(keys);
let createModules = function(keyObjects = {}, modules = {}) {
  let isArray = Array.isArray(keyObjects);
  for (let key in keyObjects) {
    if (keyObjects.hasOwnProperty(key)) {
      let paths = keyObjects[key];
      if (key) {
        if (isArray && typeof paths == "string") {
          let _path = paths.replace(/(^\.\/)|(\.js$)/g, '');
          let _key = _path.replace(/[^\/]*[\/]+/g, '');
          modules[_key] = modulesContext(paths).default
        } else {
          let keyModule = modules[key] = modules[key] || {};
          keyModule.namespaced = true;
          keyModule = keyModule["modules"] = keyModule["modules"] || {};
          createModules(paths, keyModule);
        }
      } else {
        // root
        createModules(paths, modules);
      }
    }
  }
  return modules;
}
export default createModules(keyObjects);
