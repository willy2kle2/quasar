const
  appPaths = require('../app-paths')

module.exports = class IndexAPI {
  constructor ({ extId, opts }) {
    this.extId = extId
    this.opts = opts

    this.__hooks = {
      extendQuasarConf: [],
      extendWebpack: [],
      chainWebpack: [],
      commands: {}
    }
  }

  get resolve () {
    return appPaths.resolve
  }

  get appDir () {
    return appPaths.appDir
  }

  /**
   * Check if another app cli extension is installed
   *
   * @param {string} extId
   * @return {boolean} has the extension installed.
   */
  hasExtension (extId) {
    const extensionJson = require('./extension-json')
    return extensionJson.has(extId)
  }

  /**
   * Extend quasar.conf
   *
   * @param {function} fn
   *   (cfg: Object, ctx: Object) => undefined
   */
  extendQuasarConf (fn) {
    this.__hooks.extendQuasarConf.push({ extId: this.extId, fn })
  }

  /**
   * Chain webpack config
   *
   * @param {function} fn
   *   (cfg: ChainObject, ctx: Object) => undefined
   */
  chainWebpack (fn) {
    this.__hooks.chainWebpack.push({ extId: this.extId, fn })
  }

  /**
   * Extend webpack config
   *
   * @param {function} fn
   *   (cfg: Object, ctx: Object) => undefined
   */
  extendWebpack (fn) {
    this.__hooks.extendWebpack.push({ extId: this.extId, fn })
  }

  /**
   * Register a command that will become available as
   * `quasar run <ext-id> <cmd> [args]`.
   *
   * @param {string} commandName
   * @param {function} fn
   *   (args: { [ string ] }, params: {object} }) => ?Promise
   */
  registerCommand (commandName, fn) {
    this.__hooks.commands[commandName] = fn
  }

  /**
   * Private methods
   */

  __getHooks () {
    return this.__hooks
  }
}