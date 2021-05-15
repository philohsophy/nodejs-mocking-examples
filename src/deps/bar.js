const returnBarAsync = () => new Promise((resolve) => setTimeout(() => resolve('bar'), 1000));

module.exports = {
  returnBarAsync,
};
