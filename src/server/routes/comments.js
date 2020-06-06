const query = new (require('../db'))().query();
const {Router} = require('express');
const router = Router();

router.post('/', async (req, res) => {
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

router.post('/add/', async (req, res) => {
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

module.exports = router;