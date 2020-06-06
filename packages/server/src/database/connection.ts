import knex from 'knex';
import dbConfig from './db.config';

const connection = knex(dbConfig);

export default connection;
