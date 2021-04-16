import mysql from 'mysql';
import config from './config.json';
 
let db = mysql.createPool(config);

export default db;

