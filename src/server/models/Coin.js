const query = new (require('../db'))().query();
const Auth = require('./Auth');

class Coin {

    static template = {
        name: '', group: '', year: '', price: '', country: '', composition: '', shortdesc: '',
        description: '', quality: '', weight: '', avers: '', revers: '', denomination: ''
    };

    constructor(coin, id = undefined) {
        this.coin = {};
        this.target = id;
        this.user = new Auth({token: coin.token});
        for (let field in Coin.template) {
            if (coin[field]) {
                this.coin[field] = coin[field];
            }
        }
    }

    async add() {
        const hasPermission = await this.user.hasPermissions('admin');
        if (hasPermission.perm) {
            const keys = [...Object.keys(this.coin)],
                sql = `INSERT INTO \`coins\` (${keys.map(key => `\`${key}\``).join(", ")}) 
                 VALUES (${keys.map(key => `"${this.coin[key]}"`).join(", ")})`;

            await query(sql);
            const coin = await this.get();
            return {
                status: 201,
                coin,
                added: true,
                message: `Coin ${coin.name} has been successfully added.`
            }
        } else {
            return hasPermission
        }
    }

    async update() {
        const hasPermission = await this.user.hasPermissions('admin');
        if (hasPermission.perm) {
            const sql = `UPDATE \`coins\` SET ${[...[...Object.keys(this.coin)]
                .map(key => `\`${key}\` = "${this.coin[key]}"`)]
                .join(', ')} WHERE id = ${this.target}`;

            await query(sql);
            const coin = await this.get();
            return {
                status: 200,
                coin,
                edited: true,
                message: `Coin ${coin.name} updated successfully`
            }
        } else {
            return hasPermission
        }
    }

    async delete() {
        const hasPermission = await this.user.hasPermissions('admin');
        if (hasPermission.perm) {
            const sql = `DELETE FROM \`coins\` WHERE id = "${this.target}"`;

            const coin = await this.get();
            if(!coin.id){
                return coin;
            } else {
                await query(sql);
                return {
                    status: 200,
                    deleted: true,
                    message: `Coin ${coin.name} removed successfully`,
                    coin
                }
            }
        } else {
            return hasPermission
        }
    }

    async get(seen) {
        let sql = `SELECT * FROM \`coins\` WHERE `;
        sql += this.target ? `id = "${this.target}"` : `name = "${this.coin.name}"`;
        seen && this.addSeen();
        const data = await query(sql);
        if (!data.length) {
            return {
                status: 404,
                message: 'Coins with the specified id do not exist'
            }
        }
        return {
            status: 200,
            ...data[0]
        }
    }

    addSeen() {
        return query(`UPDATE \`coins\` SET \`seen\` = \`seen\` + 1 WHERE id = ${this.target}`)
    }
}

module.exports = Coin;