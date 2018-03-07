module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/whatOT'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
