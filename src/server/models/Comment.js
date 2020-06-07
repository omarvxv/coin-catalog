const query = new (require('../db'))().query();
const Auth = require('./Auth');

class Comment {
    constructor(comment = {}, token) {
        this.comment = comment;
        this.user = new Auth(token);
    }

    async getAllComments(coinid) {
        const hasPermission = await this.user.hasPermissions('user');
        if (hasPermission.perm) {
            let sql = `SELECT * FROM \`comments\` WHERE \`type\` = "blog"`;
            if (coinid !== null) {
                sql = `SELECT * FROM \`comments\` WHERE \`type\` = "coin" AND coinid = "${coinid}"`;
            }
            const data = await query(sql);
            return {
                status: 200,
                comments: data
            }
        }
        return {
            ...hasPermission,
            comments: []
        }
    }

    getLastComment() {
        const sql = `SELECT * FROM \`comments\` ORDER BY id DESC LIMIT 1`;
        return query(sql);
    }

    async add() {
        const hasPermission = await this.user.hasPermissions('user');
        if (hasPermission.perm) {
            const {userid, comment, type, user, coinid} = this.comment;
            const sql = type === 'coin' ?
                `INSERT INTO \`comments\` (\`user\`, \`userid\`, \`comment\`, \`type\`, \`coinid\`) 
             VALUES ("${user}", "${userid}", "${comment}", "${type}", "${coinid}")` :
                `INSERT INTO \`comments\` (\`user\`, \`userid\`, \`comment\`) VALUES ("${user}", "${userid}", "${comment}")`;
            await query(sql);
            const [addedComment] = await this.getLastComment();
            return {
                status: 200,
                added: true,
                comment: addedComment,
            }
        }
        return {
            ...hasPermission,
            comments: []
        }

    }
}

module.exports = Comment;