const cors = require('cors');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;
const publicPath = path.join(__dirname, '..', '..', 'build');
const coinsRoutes = require('./routes/coins');
const commentsRoutes = require('./routes/comments');
const criteriaRoutes = require('./routes/criteria');
const authRoutes = require('./routes/auth');

const app = express();

app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/coins/', coinsRoutes);
app.use('/comments/', commentsRoutes);
app.use('/criteria/', criteriaRoutes);
app.use('/auth/', authRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
});