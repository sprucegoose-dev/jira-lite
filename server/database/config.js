module.exports = {
  development: {
    dialect: 'sqlite',
    storage: ':memory:',
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
  },
  production: {
    dialect: 'sqlite',
    storage: 'prod.sqlite',
  }
};
