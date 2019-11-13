const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'DATABASE_NAME',
  process.env['DB_USER'],
  process.env['DB_PASSWORD'],
  {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432
  }
);

module.exports = sequelize;
