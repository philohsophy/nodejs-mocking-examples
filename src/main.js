const Dep = require('./dep');

const runDirectRequire = async () => {
  const param = 'direct require';
  const dep = new Dep(param);
  dep.funcSync(param);
  await dep.funcAsync(param);
};

const runDepedencyInjection = async (injectedDep) => {
  const param = 'dependency injection';
  injectedDep.funcSync(param);
  await injectedDep.funcAsync(param);
};

module.exports = {
  runDirectRequire,
  runDepedencyInjection,
};
