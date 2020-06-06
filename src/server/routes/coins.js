const query = new (require('../db'))().query();
const {Router} = require('express');
const router = Router();

const CRITERIA_TEMPLATE = {
    country: '', composition: '', quality: '', priceFrom: '',
    priceTo: '', yearFrom: '', yearTo: '', group: ''
}

const COIN_TEMPLATE = {
    name: '', group: '', year: '', price: '', country: '', composition: '', shortdesc: '',
    description: '', quality: '', weight: '', avers: '', revers: '', denomination: ''
};

// запрос данных по всем возможным критериям
router.post('/', async (req, res) => {
    const {limit, keyword, offset} = req.body.criteria;
    const sqlLimit = limit ? ` LIMIT ${limit} OFFSET ${offset || 0}` : '';
    const filters = [];
    let sql = 'SELECT \`id\`, \`name\`, \`shortdesc\`, \`avers\`, \`seen\` FROM \`coins\`';
    const sqlFilters = criteria => ({
        country: `\`country\` = "${criteria.country}"`,
        composition: `\`composition\` = "${criteria.composition}"`,
        quality: `\`quality\` = "${criteria.quality}"`,
        priceFrom: `CAST(SUBSTR(\`price\`, 1, CHAR_LENGTH(\`price\`)-1) AS SIGNED) >= "${criteria.priceFrom}"`,
        priceTo: `CAST(SUBSTR(\`price\`, 1, CHAR_LENGTH(\`price\`)-1) AS SIGNED) <= "${criteria.priceTo}"`,
        yearFrom: `CAST(\`year\` AS SIGNED) >= "${criteria.yearFrom}"`,
        yearTo: `CAST(\`year\` AS SIGNED) <= "${criteria.yearTo}"`,
        group: `\`group\` = "${criteria.group}"`
    })

    function sqlFilterByKeyword(filters, field, keyword) {
        return `${sql}${filters.length ? filters.join(' AND ') + ' AND ' : ""}\`${field}\` LIKE "%${keyword}%"`;
    }

    // получение существующих критериев поиска по шаблону CRITERIA_TEMPLATE
    for (let value in CRITERIA_TEMPLATE) {
        if (req.body.criteria[value]) {
            filters.push(sqlFilters(req.body.criteria)[value]);
        }
    }

    if (filters.length > 0 || keyword) {
        sql += ' WHERE ';
        if (keyword) {
            sql = ['name', 'shortdesc', 'description']
                .map(field => sqlFilterByKeyword(filters, field, keyword)) // последовательность для приоритета поиска
                .join(' UNION ');                                          // по ключевому слову
        } else {
            sql += filters.join(' AND ');
        }
    }

    try {
        const {length} = await query(sql),
            data = await query(sql + sqlLimit);
        if (!data.length) {
            return res.status(404).json({coins: [], message: 'No coins found for these criteria', notfound: true})
        }
        res.status(200).json({coins: data, count: length});
    } catch {
        res.status(500).json({coins: [], message: 'An error occurred while requesting data'})
    }
})

router.get('/:id', async (req, res) => {
    const coinId = req.params.id,
        sql = `SELECT * FROM \`coins\` WHERE id = ${coinId}`,
        sqlToAddSeen = `UPDATE \`coins\` SET \`seen\` = \`seen\` + 1 WHERE id = ${coinId}`;

    try {
        const data = await query(sql);
        if (!data.length) {
            return res.status(404).json({message: 'Coins with the specified id do not exist'});
        }
        req.headers.seen && query(sqlToAddSeen);
        res.status(200).json(data[0]);
    } catch {
        res.status(500).json({message: 'An error occurred while requesting data'});
    }
})

router.post('/add/', async (req, res) => {
    const token = req.body.token,
        sqlToCheckToken = `SELECT role FROM \`tokens\` WHERE \`token\` = "${token}"`,
        coinData = {...COIN_TEMPLATE};

    for (let field in coinData) {
        if (req.body[field]) {
            coinData[field] = req.body[field];
        }
    }
    const sqlToGetAddedCoin = `SELECT * FROM \`coins\` WHERE name = "${coinData.name}"`;
    const keys = [...Object.keys(coinData)],
        sql = `INSERT INTO \`coins\` (${keys.map(key => `\`${key}\``).join(", ")}) 
                 VALUES (${keys.map(key => `"${coinData[key]}"`).join(", ")})`;

    try {
        const data = await query(sqlToCheckToken);
        if (data.length === 0 || data[0].role !== 'admin') {
            return res.status(401).json({message: 'You do not have sufficient permissions to perform this operation'})
        }
        await query(sql);
        const [coin] = await query(sqlToGetAddedCoin);
        res.status(200).json({coin, added: true, message: `Coin ${coin.name} has been successfully added.`});
    } catch {
        res.status(500).json({message: 'An error occurred while requesting data'})
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const coinData = {};
    const token = req.body.token;
    const sqlToCheckToken = `SELECT role FROM \`tokens\` WHERE \`token\` = "${token}"`;
    const sqlToGetUpdatedCoin = `SELECT * FROM \`coins\` WHERE id = ${id}`;

    // получение данных из запроса по шаблону COIN_TEMPLATE
    for (let field in COIN_TEMPLATE) {
        if (req.body[field]) {
            coinData[field] = req.body[field];
        }
    }

    // формирование sql запроса по введённым критериям
    const sql = `UPDATE \`coins\` SET ${[...[...Object.keys(coinData)]
        .map(key => `\`${key}\` = "${coinData[key]}"`)]
        .join(', ')} WHERE id = ${id}`;

    try {
        const token = await query(sqlToCheckToken);
        if (token.length === 0 || token[0].role !== 'admin') {
            return res.status(401).json({message: 'You do not have sufficient permissions to perform this operation'})
        }
        query(sql)
            .then(() => query(sqlToGetUpdatedCoin))
            .then(([coin]) => res.status(200).json({
                coin,
                edited: true,
                message: `Coin ${coin.name} updated successfully`
            }))
    } catch {
        res.status(500).json({message: 'An error occurred while retrieving data'});
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const token = req.body.token;
    const sqlToCheckToken = `SELECT role FROM \`tokens\` WHERE \`token\` = "${token}"`;
    const sqlToGetCoin = `SELECT * FROM \`coins\` WHERE id = "${id}"`;
    const sqlToDeleteCoin = `DELETE FROM \`coins\` WHERE id = "${id}"`;

    try {
        const token = await query(sqlToCheckToken);
        if (token.length === 0 || token[0].role !== 'admin') {
            return res.status(401).json({message: 'You do not have sufficient permissions to perform this operation'})
        }
        const coin = await query(sqlToGetCoin);
        if (!coin.length) {
            return res.status(404).json({message: 'Coins with the specified identifier do not exist'});
        }
        query(sqlToDeleteCoin)
            .then(() => res.status(200).json({
                coin,
                deleted: true,
                message: `Coin ${coin[0].name} removed successfully`
            }));
    } catch {
        res.status(500).json({message: 'An error occurred while requesting data'})
    }
})

module.exports = router;