const query = new (require('../db'))().query();
const {hashSync} = require('bcrypt');
const randomString = require('../randomString');
const {Router} = require('express');
const router = Router();

router.post('/', async (req, res) => {
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

router.post('/authentication/', async (req, res) => {
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

module.exports = router;