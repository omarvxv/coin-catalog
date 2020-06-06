const query = new (require('../db'))().query();
const {genSaltSync, hashSync} = require('bcrypt');
const {Router} = require('express');
const router = Router();

router.post('/', async (req, res) => {
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
        query(sqlToRegistration)
            .then(() => query(sqlToGetUser))
            .then(data => res.status(200).json({data, message: 'You have successfully registered', registered: true}))
    } catch {
        res.status(500).json({message: 'An error occurred while retrieving data'});
    }
})

module.exports = router;