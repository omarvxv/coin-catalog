const {Router} = require('express');
const Auth = require('../models/Auth');
const response = require('./response');
const router = Router();

router.post('/', async (req, res) => {
    const user = new Auth(req.body);
    await response(res, () => user.authorization());
})

router.post('/authentication/', async (req, res) => {
    const user = new Auth(req.body);
    await response(res, () => user.authentication());
})

router.post('/registration/', async (req, res) => {
    const user = new Auth(req.body);
    await response(res, () => user.registration());
})

module.exports = router;