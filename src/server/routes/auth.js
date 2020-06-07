const {Router} = require('express');
const Auth = require('../models/Auth');
const router = Router();

router.post('/', async (req, res) => {
    const user = new Auth(req.body);

    try {
        const {status, ...data} = await user.authorization();
        res.status(status).json(data);
    } catch {
        res.status(500).json({message: 'An error occurred while retrieving data'});
    }
})

router.post('/authentication/', async (req, res) => {
    const user = new Auth(req.body);

    try {
        const {status, ...data} = await user.authentication();
        res.status(status).json(data);
    } catch {
        res.status(500).json({message: 'An error occurred while retrieving data'})
    }
})

router.post('/registration/', async (req, res) => {
    const user = new Auth(req.body);

    try {
        const {status, ...data} = user.registration();
        res.status(status).json(data);
    } catch {
        res.status(500).json({message: 'An error occurred while retrieving data'});
    }
})

module.exports = router;