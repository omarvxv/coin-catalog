require('dotenv').config();
const cors = require('cors');
const path = require('path');
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const randomString = require('./randomString');
const {genSaltSync, hashSync} = require('bcrypt');
const PORT = process.env.PORT || 3001;
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '1346794613';
const DATABASE = process.env.DATABASE || 'coin_catalog';
const publicPath = path.join(__dirname, '..', 'build');
const {promisify} = require('util');

const app = express();

const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DATABASE
});

const query = promisify(pool.query).bind(pool);

app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

const COIN_TEMPLATE = {
    name: '', group: '', year: '', price: '', country: '', composition: '', shortdesc: '',
    description: '', quality: '', weight: '', avers: '', revers: '', denomination: ''
};

const CRITERIA_TEMPLATE = {
    country: '', composition: '', quality: '', priceFrom: '',
    priceTo: '', yearFrom: '', yearTo: '', group: ''
}

app.post('/registration/', async (req, res) => {
    const salt = genSaltSync(10);
    const {login, password} = req.body;
    const hashedPassword = hashSync(password, salt);
    const sqlToRegistration = `INSERT INTO \`users\` (\`login\`, \`salt\`, \`password\`) VALUES 
    ("${login}", "${salt}", "${hashedPassword}")`;

    const sqlToGetUser = `SELECT id, login, password FROM \`users\` WHERE login = "${login}"`;

    try {
        const user = await query(sqlToGetUser);
        if (user.length) {
            return res.status(400).json({message: 'User with this login already exists.'});
        }
        await query(sqlToRegistration);
        const data = await query(sqlToGetUser);
        res.status(200).json({data, message: 'You have successfully registered', registered: true});
    } catch {
        res.status(500).json({message: 'An error occurred while retrieving data'});
    }
})

app.post('/auth/', async (req, res) => {
    const {login, password} = req.body;
    const sqlToGetUser = `SELECT salt, password, login, id FROM \`users\` WHERE login = "${login}"`;
    const sqlToGetToken = `SELECT id FROM \`tokens\` WHERE login = "${login}"`;

    try {
        const [user] = await query(sqlToGetUser);
        if (!user) {
            return res.status(401).json({message: 'Invalid username'});
        }
        const {salt, id} = user;
        const role = id === 1 ? 'admin' : 'user';
        if (hashSync(password, salt) !== user.password) {
            return res.status(401).json({message: 'Password entered incorrectly'});
        }
        const [isTokenAlreadyExists] = await query(sqlToGetToken);
        if (isTokenAlreadyExists) {
            query(`DELETE FROM \`tokens\` WHERE id = ${isTokenAlreadyExists.id}`);
        }
        const token = randomString();
        await query(`INSERT INTO \`tokens\` (\`token\`, \`login\`, \`role\`) VALUES ("${token}", "${login}", "${role}")`);
        res.status(200).json({authorised: true, id, role, token, login, message: 'You have successfully logged in'});
    } catch {
        res.status(500).json({message: 'An error occurred while retrieving data'});
    }
})

app.post('/authentication/', async (req, res) => {
    const token = req.body.token,
        sqlToCheckToken = `SELECT login, token, role FROM \`tokens\` WHERE token = "${token}"`;

    try {
        const data = await query(sqlToCheckToken);
        if (!data.length) {
            return res.status(401).json({authorised: false, message: 'You are not authorized'})
        }
        const {login, token, role} = data[0];
        res.status(200).json({authorised: true, login, token, role, message: 'You have successfully logged in'});
    } catch {
        res.status(500).json({message: 'An error occurred while retrieving data'})
    }
})

// получение критериев для поиска. данные записываются в Advanced filter
app.get('/getCriteria/', async (req, res) => {
    const sql = `SELECT \`country\`, \`quality\`, \`composition\` FROM \`coins\``;

    try {
        const data = await query(sql),
            country = new Set(),
            quality = new Set(),
            composition = new Set();
        data.map(coin => {
            // для того чтобы данные не повторялись
            country.add(coin.country);
            quality.add(coin.quality);
            composition.add(coin.composition);
        })

        const countries = [...country.values()],
            qualities = [...quality.values()],
            compositions = [...composition.values()];

        res.status(200).json({data: {countries, qualities, compositions}})
    } catch {
        res.status(500).json({message: 'An error occurred while requesting data'})
    }
})

// запрос данных по всем возможным критериям
app.post('/coins/', async (req, res) => {
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

    // получение существующиъ критериев поиска по шаблону CRITERIA_TEMPLATE
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

app.get('/coins/:id', async (req, res) => {
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

app.post('/coins/add/', async (req, res) => {
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

app.put('/coins/:id', async (req, res) => {
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

app.delete('/coins/:id', async (req, res) => {
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

app.post('/get-comments/', async (req, res) => {
    const {token, coinid} = req.body;
    const sqlToCheckToken = `SELECT id FROM \`tokens\` WHERE \`token\` = "${token}"`;
    let sqlToGetComments = `SELECT * FROM \`comments\` WHERE \`type\` = "blog"`;
    if (coinid !== null) {
        sqlToGetComments = `SELECT * FROM \`comments\` WHERE \`type\` = "coin" AND coinid = "${coinid}"`;
    }

    try {
        const token = await query(sqlToCheckToken);
        if (token.length === 0) {
            return res.status(401).json({
                comments: [],
                message: 'You do not have sufficient permissions to perform this operation'
            });
        }
        query(sqlToGetComments)
            .then(data => res.status(200).json({comments: data}));
    } catch {
        res.status(500).json({comments: [], message: 'An error occurred while requesting data'});
    }
})

app.post('/add-comment/', async (req, res) => {
    const {userid, comment, type, user, coinid, token} = req.body;
    const sqlToCheckToken = `SELECT id FROM \`tokens\` WHERE \`token\` = "${token}"`;
    const sqlToAddComment = type === 'coin' ?
        `INSERT INTO \`comments\` (\`user\`, \`userid\`, \`comment\`, \`type\`, \`coinid\`) 
        VALUES ("${user}", "${userid}", "${comment}", "${type}", "${coinid}")` :
        `INSERT INTO \`comments\` (\`user\`, \`userid\`, \`comment\`) VALUES ("${user}", "${userid}", "${comment}")`;
    const sqlToGetComment = `SELECT * FROM \`comments\` ORDER BY id DESC LIMIT 1`;

    try {
        const token = await query(sqlToCheckToken);
        if (token.length === 0) {
            return res.status(401).json({
                comments: [],
                message: 'You do not have sufficient permissions to perform this operation'
            });
        }
        query(sqlToAddComment)
            .then(() => query(sqlToGetComment))
            .then(data => res.status(200).json({added: true, comment: data[0]}));
    } catch {
        res.status(500).json({message: 'An error occurred while requesting data'})
    }
})

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
});