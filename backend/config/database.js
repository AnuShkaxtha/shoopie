const path = require('path');

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'postgres');

  const connections = {
    postgres: {
      connection: {
        connectionString: env('DATABASE_URL'),
        host: env('DATABASE_HOST', 'dpg-cqeed1ggph6c73an8hq0-a.oregon-postgres.render.com'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'shopie'),
        user: env('DATABASE_USERNAME', 'shopie_user'),
        password: env('DATABASE_PASSWORD', 'd6vO17oQpE94LDZAUi1Lemc1fFUow1Rw'),
        ssl: env.bool('DATABASE_SSL', true),
        schema: env('DATABASE_SCHEMA', 'public'),
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};

// module.exports = ({ env }) => {

//   const connections = {
//       connection: {
//         client: 'postgres',
//         connectionString: env('DATABASE_URL'),
//         host: env('DATABASE_HOST'),
//         port: env.int('DATABASE_PORT'),
//         database: env('DATABASE_NAME'),
//         user: env('DATABASE_USERNAME'),
//         password: env('DATABASE_PASSWORD'),
//         ssl: env.bool('DATABASE_SSL', true),
//       },
      
//   };

  
// };