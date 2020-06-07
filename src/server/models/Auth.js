const query = new (require('../db'))().query();
const {hashSync} = require('bcrypt');
const randomString = require('./randomString');
const {genSaltSync} = require("bcrypt");

class Auth {
    constructor(data) {
        this.login = data.login || '';
        this.password = data.password || '';
        this.token = data.token || '';
    }

    async registration(){
        const salt = genSaltSync(10);
        const hashedPassword = hashSync(this.password, salt);
        const sql = `INSERT INTO \`users\` (\`login\`, \`salt\`, \`password\`) VALUES ("${this.login}", "${salt}", "${hashedPassword}")`;
        const sqlToGetUser = `SELECT id, login, password FROM \`users\` WHERE login = "${this.login}"`;

        const user = await query(sqlToGetUser);

        if (user.length) {
            return {
                status: 400,
                message: 'User with this login already exists.'
            }
        }
        await query(sql);
        const data = await query(sqlToGetUser);
        return {
            status: 201,
            data,
            message: 'You have successfully registered',
            registered: true
        }
    }

    async authorization() {
        const sql = `SELECT salt, password, login, id FROM \`users\` WHERE login = "${this.login}"`;
        const sqlToGetToken = `SELECT id FROM \`tokens\` WHERE login = "${this.login}"`;
        const [user] = await query(sql);
        if (!user) {
            return {
                status: 401,
                message: 'Invalid username'
            };
        }
        const {salt, id} = user;
        const role = id === 1 ? 'admin' : 'user';
        if (hashSync(this.password, salt) !== user.password) {
            return {
                status: 401,
                message: 'Password entered incorrectly'
            };
        }
        const [isTokenAlreadyExists] = await query(sqlToGetToken);
        if (isTokenAlreadyExists) {
            query(`DELETE FROM \`tokens\` WHERE id = ${isTokenAlreadyExists.id}`);
        }
        const token = randomString();
        await query(`INSERT INTO \`tokens\` (\`token\`, \`login\`, \`role\`) VALUES ("${token}", "${this.login}", "${role}")`);
        return {
            status: 200,
            authorised: true,
            id, role, token,
            login: this.login,
            message: 'You have successfully logged in'
        };
    }

    async authentication() {
        const sql = `SELECT login, token, role FROM \`tokens\` WHERE token = "${this.token}"`;

        const data = await query(sql);
        if (!data.length) {
            return {status: 401, authorised: false, message: 'You are not authorized'};
        }
        const {login, token, role} = data[0];
        return {status: 200, authorised: true, login, token, role, message: 'You have successfully logged in'};
    }

    async hasPermissions(role) {
        const sql = `SELECT role FROM \`tokens\` WHERE \`token\` = "${this.token}"`;
        const token = await query(sql);
        if (token.length === 0 || (role === 'admin' && token[0].role !== role)) {
            return {
                perm: false,
                status: 401,
                message: 'You do not have sufficient permissions to perform this operation'
            };
        }
        return {perm: true}
    }
}

module.exports = Auth;