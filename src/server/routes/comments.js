const Comment = require('../models/Comment');
const {Router} = require('express');
const router = Router();

router.post('/', async (req, res) => {
    const {token, coinid} = req.body;
    const comment = new Comment({}, {token});

    try {
        const {status, ...data} = await comment.getAllComments(coinid);
        res.status(status).json(data)
    } catch {
        res.status(500).json({message: 'An error occurred while requesting data', comments: []});
    }
})

router.post('/add/', async (req, res) => {
    const token = {token: req.body.token};
    const comment = new Comment(req.body, token);

    try {
        const {status, ...data} = await comment.add();
        res.status(status).json(data);
    } catch {
        res.status(500).json({message: 'An error occurred while requesting data'})
    }
})

module.exports = router;