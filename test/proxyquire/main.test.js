const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const proxyquire = require('proxyquire').noCallThru();
const log = require('loglevel');

log.setLevel(log.levels.INFO);

const { expect } = chai;
chai.use(chaiAsPromised);

let Main;
const modulePath = '../../src/main';

describe('main (proxyquire)', () => {
  describe('mocking foo', () => {
    context('Change return value of returnFooSync()', () => {
      let main;
      let expectation;
      let result;
      const fooStubRes = 'foo (mocked)';

      before('Stub dependencies', () => {
        const fooStub = {
          returnFooSync: () => fooStubRes,
        };

        Main = proxyquire(modulePath, {
          './deps/foo': fooStub,
        });

        main = new Main();
      });

      it('it should return the mocked value', () => {
        expectation = fooStubRes;
        result = main.callReturnFooSync();
        expect(result).to.equal(expectation);
      });

      it('it should not affect the other dependencies bar & Baz', async () => {
        expectation = 'bar';
        result = main.callReturnBarAsync();
        await expect(result).to.become(expectation);

        expectation = 'baz';
        result = main.callReturnBazSync();
        expect(result).to.equal(expectation);
      });
    });

    context('Let returnFooSync() throw an error', () => {
      const error = 'returnFooSyncError';

      before('Stub dependencies', () => {
        const fooStub = {
          returnFooSync: () => {
            throw new Error(error);
          },
        };

        Main = proxyquire(modulePath, {
          './deps/foo': fooStub,
        });
      });

      it('it should raise the thrown error', () => {
        const main = new Main();
        expect(() => main.callReturnFooSync()).to.throw(error);
      });
    });
  });

  describe('mocking bar', () => {
    context('Change return value of returnBarAsync()', () => {
      let main;
      let expectation;
      let result;
      const barStubRes = 'bar (mocked)';

      before('Stub dependencies', () => {
        const barStub = {
          returnBarAsync: () => Promise.resolve(barStubRes),
        };

        Main = proxyquire(modulePath, {
          './deps/bar': barStub,
        });

        main = new Main();
      });

      it('it should return the mocked value', async () => {
        expectation = barStubRes;
        const promise = main.callReturnBarAsync();
        await expect(promise).to.become(expectation);
      });

      it('it should not affect the other dependencies foo & Baz', async () => {
        expectation = 'foo';
        result = main.callReturnFooSync();
        expect(result).to.equal(expectation);

        expectation = 'baz';
        const promise = main.callReturnBazAsync();
        await expect(promise).to.become(expectation);
      });
    });

    context('Let returnBarAsync() throw an error', () => {
      const error = 'returnBarAsyncError';

      before('Stub dependencies', () => {
        const barStub = {
          returnBarAsync: () => Promise.reject(error),
        };

        Main = proxyquire(modulePath, {
          './deps/bar': barStub,
        });
      });

      it('it should raise the thrown error', async () => {
        const main = new Main();
        const promise = main.callReturnBarAsync();
        await expect(promise).to.be.rejectedWith(error);
      });
    });
  });

  describe('mocking Baz', () => {
    describe('Mocking constructor() of Baz', () => {
      context('Change internal "delay" of Baz', () => {
        const delay = 200;

        before('Stub Baz', () => {
          class BazStub {
            constructor() {
              this.delay = delay;
              log.info(`\t(Baz initialized via mocked constructor)`);
            }

            getDelay = () => this.delay;
          }

          Main = proxyquire(modulePath, {
            './deps/baz': BazStub,
          });
        });

        it(`it should have a delay of ${delay} ms`, () => {
          const expectation = delay;

          const main = new Main();
          const result = main.getInternalDelayOfBaz();
          expect(result).to.equal(expectation);
        });
      });

      context('Let constructor of Baz throw', () => {
        const error = 'constructorError';

        before('Stub Baz', () => {
          class BazStub {
            constructor() {
              throw new Error(error);
            }
          }

          Main = proxyquire(modulePath, {
            './deps/baz': BazStub,
          });
        });

        it('Main should fail initialization', () => {
          expect(() => new Main()).to.throw(error);
        });
      });
    });

    describe('Mocking returnBazSync/Async() of Baz', () => {
      context('Change return values of returnBazSync/Async()', () => {
        const bazStubRes = 'baz (mocked)';

        before('Stub Baz', () => {
          class BazStub {
            returnBazSync = () => bazStubRes;

            returnBazAsync = () => Promise.resolve(bazStubRes);
          }

          Main = proxyquire(modulePath, {
            './deps/baz': BazStub,
          });
        });

        it('it should return the mocked values', async () => {
          const expectation = bazStubRes;

          const main = new Main();
          const result = main.callReturnBazSync();
          expect(result).to.equal(expectation);

          const promise = main.callReturnBazAsync();
          await expect(promise).to.become(expectation);
        });
      });

      context('Let returnBazSync/Async() throw an error', () => {
        const error = 'bazError';

        before('Stub Baz', () => {
          class BazStub {
            returnBazSync = () => {
              throw new Error(error);
            };

            returnBazAsync = () => Promise.reject(error);
          }

          Main = proxyquire(modulePath, {
            './deps/baz': BazStub,
          });
        });

        it('it should raise the thrown errors', async () => {
          const main = new Main();
          expect(() => main.callReturnBazSync()).to.throw(error);

          await expect(main.callReturnBazAsync()).to.be.rejectedWith(error);
        });
      });
    });
  });
});
