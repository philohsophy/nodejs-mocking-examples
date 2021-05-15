const log = require('loglevel');

module.exports = class Baz {
  constructor() {
    this.delay = 1000;
    this.name = 'baz';
    log.info('Baz initialized via default constructor');
  }

  getDelay = () => this.delay;

  returnBazSync = () => 'baz';

  returnBazAsync = async () => {
    log.info(`Baz.returnBazAsync() will resolve in ${this.delay} ms...`);
    return new Promise((resolve) => setTimeout(() => resolve(this.name), this.delay));
  }
};
