const isProd = process.env.NODE_ENV === 'production'
const mysqlConfig = require('./mysql.config')

const config = {
  database: 'smile',
  user: 'root',
  password: mysqlConfig.password,
  options: {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: false,
    }
  }
}

module.exports = config
