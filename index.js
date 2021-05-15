const log = require('loglevel');
const Main = require('./src/main');
const Baz = require('./src/deps/baz');

log.setLevel(log.levels.INFO);

const callFuncsOfMain = async (main) => {
  log.info('--> Foo (sync): ', main.callReturnFooSync());
  log.info('--> Bar (async): ', await main.callReturnBarAsync());
  log.info('--> Baz (sync): ', main.callReturnBazSync());
  log.info('--> Delay of Baz (async): ', main.getInternalDelayOfBaz());
  log.info('--> Baz (async): ', await main.callReturnBazAsync());
};

const run = async () => {
  let main;

  log.info('=====> Main directly requiring foo, bar, Baz <=====');
  main = new Main();
  await callFuncsOfMain(main);

  log.info('=====> Main directly requiring foo, bar + injecting Baz via DI <=====');
  const injectedBaz = new Baz();
  main = new Main(injectedBaz);
  await callFuncsOfMain(main);
};

run();
