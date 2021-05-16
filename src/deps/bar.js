const returnBarAsync = () => new Promise((resolve) => setTimeout(() => resolve('bar'), 100));

module.exports = {
  returnBarAsync,
};
