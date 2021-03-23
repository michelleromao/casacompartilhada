// Update with your config settings.
const dbConfig = require("./src/config/database");
const path = require("path");

const knexfile = {
  development: {
    client: 'postgresql',
    connection: dbConfig,
    migrations: {
      tableName: 'migrations',
      directory: path.resolve(__dirname,'src','database','migrations')
    }
  },

  staging: {
    client: 'postgresql',
    connection: dbConfig,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations',
      directory: path.resolve(__dirname,'src','database','migrations')
    }
  },

  production: {
    client: 'postgresql',
    connection: dbConfig,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations',
      directory: path.resolve(__dirname,'src','database','migrations')
    }
  }

};

export default knexfile;
