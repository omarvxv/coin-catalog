require('dotenv').config();
const mysql = require('mysql');
const {promisify} = require('util');

class Db {

    static connected = false;
    static connection = {};

    constructor() {
        if (!Db.connected) {
            Db.connection = this.connect();
            Db.connected = true;
        }
        this.pool = Db.connection;
    }

    connect() {
        return mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DATABASE
        });
    }

    query() {
        return promisify(this.pool.query).bind(this.pool);
    }
}

module.exports = Db;
