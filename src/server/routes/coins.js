const {Router} = require('express');
const router = Router();
const Coin = require('../models/Coin');
const CoinList = require('../models/CoinList');

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const coin = new Coin({}, id);

    try {
        const {status, ...data} = await coin.get(req.headers.seen);
        res.status(status).json(data.coin);
    } catch {
        res.status(500).json({message: 'An error occurred while retrieving data'});
    }
})

router.post('/', async (req, res) => {
    const list = new CoinList(req.body.criteria);

    try {
        const {status, ...data} = await list.getCoins();
        res.status(status).json(data);
    } catch {
        res.status(500).json({coins: [], message: 'An error occurred while requesting data'})
    }
})

router.post('/add/', async (req, res) => {
    const coin = new Coin(req.body);

    try {
        const {status, ...data} = await coin.add();
        res.status(status).json(data);
    } catch {
        res.status(500).json({message: 'An error occurred while retrieving data'});
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const coin = new Coin(req.body, id);

    try {
        const {status, ...data} = await coin.update();
        res.status(status).json(data);
    } catch {
        res.status(500).json({message: 'An error occurred while retrieving data'});
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const token = {token: req.body.token};
    const coin = new Coin(token, id);

    try {
        const {status, ...data} = await coin.delete();
        res.status(status).json(data);
    } catch {
        res.status(500).json({message: 'An error occurred while retrieving data'});
    }
})

module.exports = router;