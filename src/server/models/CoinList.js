const query = new (require('../db'))().query();

class CoinList {

    static template = {
        country: '', composition: '', quality: '', priceFrom: '',
        priceTo: '', yearFrom: '', yearTo: '', group: ''
    }

    constructor(criteria) {
        this.coins = [];
        this.totalCount = 0;
        this.filters = [];
        this.criteria = {...criteria};
        const {limit, offset} = this.criteria;
        this.sql = 'SELECT \`id\`, \`name\`, \`shortdesc\`, \`avers\`, \`seen\` FROM \`coins\`';
        this.sqlLimit = limit ? ` LIMIT ${limit} OFFSET ${offset || 0}` : '';
    }

    async getCoins() {
        await this.setList();
        if (!this.totalCount) {
            return {
                status: 404,
                coins: [],
                message: 'No coins found for these criteria',
                notfound: true
            }
        }
        return {
            status: 200,
            coins: this.coins,
            count: this.totalCount
        }
    }

    setList() {
        // получение существующих критериев поиска по шаблону
        for (let value in CoinList.template) {
            if (this.criteria[value]) {
                this.filters.push(this.sqlFilters()[value]);
            }
        }

        if (this.filters.length > 0 || this.criteria.keyword) {
            this.sql += ' WHERE ';
            if (this.criteria.keyword) {
                this.sql = ['name', 'shortdesc', 'description']
                    .map(field => this.sqlFilterByKeyword(field)) // последовательность для приоритета поиска
                    .join(' UNION ');                             // по ключевому слову
            } else {
                this.sql += this.filters.join(' AND ');
            }
        }

        return this.getData()
            .then(data => {
                this.coins = data.data;
                this.totalCount = data.length
            })
    }

    sqlFilterByKeyword(field) {
        return `${this.sql}
        ${this.filters.length ? this.filters.join(' AND ') + ' AND ' : ""}
        \`${field}\` LIKE "%${this.criteria.keyword}%"`;
    }

    sqlFilters() {
        return {
            country: `\`country\` = "${this.criteria.country}"`,
            composition: `\`composition\` = "${this.criteria.composition}"`,
            quality: `\`quality\` = "${this.criteria.quality}"`,
            priceFrom: `CAST(SUBSTR(\`price\`, 1, CHAR_LENGTH(\`price\`)-1) AS SIGNED) >= "${this.criteria.priceFrom}"`,
            priceTo: `CAST(SUBSTR(\`price\`, 1, CHAR_LENGTH(\`price\`)-1) AS SIGNED) <= "${this.criteria.priceTo}"`,
            yearFrom: `CAST(\`year\` AS SIGNED) >= "${this.criteria.yearFrom}"`,
            yearTo: `CAST(\`year\` AS SIGNED) <= "${this.criteria.yearTo}"`,
            group: `\`group\` = "${this.criteria.group}"`
        }
    }

    async getData() {
        const {length} = await query(this.sql);
        const data = await query(this.sql + this.sqlLimit);
        return {length, data}
    }
}

module.exports = CoinList;