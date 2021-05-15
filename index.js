const log = require('loglevel');
const main = require('./src/main');
const Dep = require('./src/dep');

log.setLevel(log.levels.INFO);

const run = async () => {
  log.info('=====> Running main.runDirectRequire() <=====');
  await main.runDirectRequire();

  log.info('=====> Running main.runDepedencyInjection() <=====');
  const injectedDep = new Dep('injected');
  await main.runDepedencyInjection(injectedDep);
};

run();
