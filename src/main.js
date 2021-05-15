const foo = require('./deps/foo');
const bar = require('./deps/bar');
const Baz = require('./deps/baz');

module.exports = class Main {
  constructor(injectedBaz) {
    if (injectedBaz) {
      this.baz = injectedBaz;
      return;
    }

    this.baz = new Baz();
  }

  callReturnFooSync = () => foo.returnFooSync();

  callReturnBarAsync = () => bar.returnBarAsync();

  getInternalDelayOfBaz = () => this.baz.getDelay();

  callReturnBazSync = () => this.baz.returnBazSync();

  callReturnBazAsync = () => this.baz.returnBazAsync();
};
