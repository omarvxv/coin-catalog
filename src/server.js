const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const {genSaltSync, hashSync} = require('bcrypt');
const randomString = require('./randomString');

const app = express();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1346794613',
    database: 'coin_catalog'
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

const COIN_TEMPLATE = {
    name: '', group: '', year: '', price: '', country: '', composition: '', shortdesc: '', description: '',
    quality: '', weight: '', avers: '', revers: '', denomination: ''
};

const CRITERIA_TEMPLATE = {
    country: '', composition: '', quality: '', priceFrom: '',
    priceTo: '', yearFrom: '', yearTo: '', group: ''
}

app.post('/auth/', (req, res) => {
    const {login, password} = req.body;
    const sqlToGetUser = `SELECT salt, password, login FROM \`users\` WHERE login = "${login}"`;

    pool.query(sqlToGetUser, (err, data) => {
        if (err) {
            res.status(500).json({message: 'An error occurred while retrieving data'});
        } else if (data.length === 0) {
            res.status(404).json({message: 'Invalid username'});
        } else {
            const salt = data[0].salt;
            if (hashSync(password, salt) === data[0].password) {
                pool.query(`SELECT id FROM \`tokens\` WHERE login = "${login}"`, (err, data) => {
                    if (err) {
                        res.status(500).json({message: 'An error occurred while retrieving data'});
                    } else if (data.length > 0) {
                        pool.query(`DELETE FROM \`tokens\` WHERE id = ${data[0].id}`, err => {
                            if (err) {
                                res.status(500).json({message: 'Failed to complete receiving token operation'});
                            }
                        })
                    }
                    const token = randomString();
                    pool.query(`INSERT INTO \`tokens\` (\`token\`, \`login\`) VALUES ("${token}", "${login}")`, err => {
                        if (err) {
                            res.status(400).json({message: 'An error occurred while registering the token'})
                        } else {
                            res.status(200).json({
                                authorised: true,
                                token,
                                login,
                                message: 'You have successfully logged in'
                            });
                        }
                    })
                })
            } else {
                res.json({message: 'Password entered incorrectly'})
            }

        }
    })
})

app.post('/registration/', (req, res) => {
    const salt = genSaltSync(10);
    const {login, password} = req.body;
    const hashedPassword = hashSync(password, salt);
    const sqlToRegistration = `INSERT INTO \`users\` (\`login\`, \`salt\`, \`password\`) VALUES 
    ("${login}", "${salt}", "${hashedPassword}")`;

    const sqlToGetUser = `SELECT id, login, password FROM \`users\` WHERE login = "${login}"`;

    pool.query(sqlToGetUser, (err, data) => {
        if (err) {
            res.status(500).json({message: 'An error occurred while retrieving data'});
        } else if (data.length > 0) {
            res.status(400).json({message: 'User with this login already exists.'});
        } else {
            pool.query(sqlToRegistration, err => {
                if (err) {
                    res.status(500).json({message: 'An error occurred while writing data'})
                } else {
                    pool.query(sqlToGetUser, (err, data) => {
                        if (err) {
                            res.status(500).json({message: 'An error occurred while retrieving data'})
                        } else {
                            res.status(200).json({data, message: 'You have successfully registered'});
                        }
                    })
                }
            })
        }
    })


})

app.get('/coins/:id', (req, res) => {
    const coinId = req.params.id;
    const sql = `SELECT * FROM \`coins\` WHERE id = ${coinId}`;

    pool.query(sql, (err, data) => {
        if (err) {
            res.status(500).json({message: 'An error occurred while requesting data'});
        } else if (data.length === 0) {
            res.status(404).json({message: 'Coins with the specified id do not exist'});
        } else {
            if(req.headers.seen){
                pool.query(`UPDATE \`coins\` SET \`seen\` = \`seen\` + 1 WHERE id = ${coinId}`)
            }
            res.status(200).json(data[0]);
        }
    })
})

app.post('/coins/add/', (req, res) => {
    const token = req.body.token;
    const sqlToCheckToken = `SELECT id FROM \`tokens\` WHERE \`token\` = "${token}"`;
    const coinData = {...COIN_TEMPLATE};

    for (let field in coinData) {
        if(req.body[field]){
            coinData[field] = req.body[field];
        }
    }

    const keys = [...Object.keys(coinData)];
    const sql = `INSERT INTO \`coins\` (${keys.map(key => `\`${key}\``).join(", ")}) 
                 VALUES (${keys.map(key => `"${coinData[key]}"`).join(", ")})`;

    pool.query(sqlToCheckToken, (err, data) => {
        if (err) {
            res.status(500).json({message: 'An error occurred while requesting data'})
        } else if (data.length === 0) {
            res.status(401).json({message: 'You do not have sufficient permissions to perform this operation'})
        } else {
            pool.query(sql, (err) => {
                if (err) {
                    res.status(500).json({message: 'An error occurred while writing data'});
                } else {
                    pool.query(`SELECT * FROM \`coins\` WHERE name = "${coinData.name}"`, (err, data) => {
                        if (err) {
                            res.status(500).json({message: 'An error occurred while retrieving data'});
                        } else {
                            res.status(200).json({coin: data[0], message: `Coin ${data[0].name} has been successfully added.`, sql});
                        }
                    })
                }
            })
        }
    })
})

app.put('/coins/:id', (req, res) => {
    const id = req.params.id;
    const coinData = {};
    const token = req.body.token;
    const sqlToCheckToken = `SELECT id FROM \`tokens\` WHERE \`token\` = "${token}"`;

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

    pool.query(sqlToCheckToken, (err, data) => {
        if (err) {
            res.status(500).json({message: 'An error occurred while requesting data'})
        } else if (data.length === 0) {
            res.status(401).json({message: 'You do not have sufficient permissions to perform this operation'})
        } else {
            pool.query(sql, err => {
                if (err) {
                    res.status(500).json({message: 'An error occurred while saving data'});
                } else {
                    pool.query(`SELECT * FROM \`coins\` WHERE id = ${id}`, (err, data) => {
                        if (err) {
                            res.status(500).json({message: 'An error occurred while retrieving data'});
                        } else {
                            res.status(200).json({coin: data[0], edited: true, message: `Coin ${data[0].name} updated successfully`});
                        }
                    });
                }
            })
        }
    })
})

app.delete('/coins/:id', (req, res) => {
    const id = req.params.id;
    const token = req.body.token;
    const sqlToCheckToken = `SELECT id FROM \`tokens\` WHERE \`token\` = "${token}"`;
    const sqlToGetCoin = `SELECT * FROM \`coins\` WHERE id = "${id}"`;
    const sqlToDeleteCoin = `DELETE FROM \`coins\` WHERE id = "${id}"`;

    pool.query(sqlToCheckToken, (err, data) => {
        if (err) {
            res.status(500).json({message: 'An error occurred while requesting data'})
        } else if (data.length === 0) {
            res.status(401).json({message: 'You do not have sufficient permissions to perform this operation'})
        } else {
            pool.query(sqlToGetCoin, (err, data) => {
                if (err) {
                    res.status(500).json({message: 'An error occurred while retrieving data'});
                } else if (data.length === 0) {
                    res.status(404).json({message: 'Coins with the specified identifier do not exist'});
                } else {
                    pool.query(sqlToDeleteCoin, err => {
                        if (err) {
                            res.status(500).json({message: 'An error occurred while deleting data.'})
                        } else {
                            res.status(200).json({data, message: `Coin ${data[0].name} removed successfully`});
                        }
                    })
                }
            })
        }
    })
})

app.post('/authentication/', (req, res) => {
    const token = req.body.token;
    const sqlToCheckToken = `SELECT login, token FROM \`tokens\` WHERE token = "${token}"`;

    pool.query(sqlToCheckToken, (err, data) => {
        if (err) {
            res.status(500).json({message: 'An error occurred while retrieving data'})
        } else if (data.length === 0) {
            res.status(401).json({authorised: false, message: 'You are not authorized'})
        } else {
            res.status(200).json({
                authorised: true, login: data[0].login, token: data[0].token,
                message: 'You have successfully logged in'
            });
        }
    })
})

// получение критериев для поиска. данные записываются в Advanced filter
app.get('/getCriteria/', (req, res) => {
    const sql = `SELECT \`country\`, \`quality\`, \`composition\` FROM \`coins\``;

    pool.query(sql, (err, data) => {
        if (err) {
            res.status(500).json({message: 'An error occurred while requesting data'})
        } else {
            const country = new Set(),
                quality = new Set(),
                composition = new Set();
            data.map(coin => {
                // для того чтобы данные не повторялись
                country.add(coin.country);
                quality.add(coin.quality);
                composition.add(coin.composition);
            })

            const countries = [...country.values()];
            const qualities = [...quality.values()];
            const compositions = [...composition.values()];

            res.status(200).json({data: {countries, qualities, compositions}})
        }
    })
})

// запрос данных по всем возможным критериям
app.post('/coins/', (req, res) => {
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

    pool.query(sql, (err, count) => {
        if (err) {
            res.status(500).json({ coins: [], message: 'An error occurred while requesting data'})
        } else {
            pool.query(sql + sqlLimit, (err, data) => {
                if (err) {
                    res.status(500).json({coins: [], message: 'An error occurred while requesting data'});
                } else if (data.length === 0) {
                    res.status(404).json({coins: [], message: 'No coins found for these criteria', notfound: true})
                } else {
                    res.status(200).json({coins: data, count: count.length});
                }
            })
        }
    })
})

app.listen(3001, () => {
    console.log('Server is running')
});