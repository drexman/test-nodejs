const env = {
  database: 'projeto',
  username: 'postgres',
  password: 'admin123',
  host: 'localhost',
  port: 5432,
  dialect: 'postgresql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = env;