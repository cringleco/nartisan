module.exports = {
  development: {
    username: 'root',
    password: '',
    database: 'sql-starter',
    host: 'localhost',
    dialect: 'mysql'
  },
  test: {
    username: 'root',
    password: '',
    database: 'sql-starter',
    host: 'localhost',
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  },
  keys: {
    SECRET_KEY:
      process.env.SECRET_KEY || 'BrUQpX/ea6+gFhFNrUlwJZAztOA2kL59Ldyynk6DfrA=',
    REFRESH_KEY:
      process.env.REFRESH_KEY || 'NrUlwJZAztOA2kL59Ldyynk6DfrA=BrUQpX/ea6+gFhF'
  }
};
