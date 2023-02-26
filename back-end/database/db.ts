import mysql from "mysql2/promise";
import secret from "../secret";

const pool = mysql.createPool({
    host: 'localhost',
    user: 'jabcho',
    password: secret.dbpw,
    database: 'todo',
    connectionLimit: 30
})

export default pool;