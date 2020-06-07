const {Router} = require('express');
const router = Router();
const Coin = require('../models/Coin');
const response = require('./response');
const CoinList = require('../models/CoinList');

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const coin = new Coin({}, id);
    await response(res, () => coin.get(req.headers.seen));
})

router.post('/', async (req, res) => {
    const list = new CoinList(req.body.criteria);
    await response(res, () => list.getCoins());
})

router.post('/add/', async (req, res) => {
    const coin = new Coin(req.body);
    await response(res, () => coin.add());
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const coin = new Coin(req.body, id);
    await response(res, () => coin.update());
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const token = {token: req.body.token};
    const coin = new Coin(token, id);
    await response(res, () => coin.delete());
})

module.exports = router;