const log = require('loglevel');

module.exports = class Baz {
  constructor() {
    this.delay = 100;
    this.name = 'baz';
    log.info('\t(Baz initialized via default constructor)');
  }

  getDelay = () => this.delay;

  returnBazSync = () => this.name;

  returnBazAsync = async () => {
    log.info(`\t(Baz.returnBazAsync() will resolve in ${this.delay} ms...)`);
    return new Promise((resolve) => setTimeout(() => resolve(this.name), this.delay));
  }
};
