const Comment = require('../models/Comment');
const {Router} = require('express');
const response = require('./response');
const router = Router();

router.post('/', async (req, res) => {
    const {token, coinid} = req.body;
    const comment = new Comment({}, {token});
    await response(res, () => comment.getAllComments(coinid));
})

router.post('/add/', async (req, res) => {
    const token = {token: req.body.token};
    const comment = new Comment(req.body, token);
    await response(res, () => comment.add());
})

module.exports = router;