const log = require('loglevel');

module.exports = class Dep {
  constructor(param) {
    this.delay = 1000;
    this.param = param;
    log.info(`Dep's default constructor was called with <${param}>`);
  }

  funcSync = (text) => {
    log.info(`Dep's funcSync was called with <${text}>`);
    const res = `Received: <${text}>`;
    return res;
  }

  async funcAsync(text) {
    log.info(`Dep's funcAsync was called with <${text}>, resolving in ${this.delay} ms...`);
    const res = `Received: <${text}> (delay=${this.delay})`;
    return new Promise((resolve) => setTimeout(() => resolve(res), this.delay));
  }
};
