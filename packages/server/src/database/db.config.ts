import path from 'path';

export default {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite'),
  },
  migrations: {
    directory: path.resolve(__dirname, 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, 'seeds'),
  },
  pool: {
    afterCreate: function (conn: any, cb: Function) {
      return conn.run('PRAGMA foreign_keys = ON', function (err: any) {
        if (err) {
          return cb(err, conn);
        } else {
          return cb(err, conn);
        }
      });
    },
  },
  useNullAsDefault: true,
};
