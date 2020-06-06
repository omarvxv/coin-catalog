const query = new (require('../db'))().query();
const {Router} = require('express');
const router = Router();

// получение критериев для поиска. данные записываются в Advanced filter
router.get('/', async (req, res) => {
    const sql = `SELECT \`country\`, \`quality\`, \`composition\` FROM \`coins\``;

    try {
        const data = await query(sql),
            country = new Set(),
            quality = new Set(),
            composition = new Set();
        data.map(coin => {
            // для того чтобы данные не повторялись
            country.add(coin.country);
            quality.add(coin.quality);
            composition.add(coin.composition);
        })

        const countries = [...country.values()],
            qualities = [...quality.values()],
            compositions = [...composition.values()];

        res.status(200).json({data: {countries, qualities, compositions}})
    } catch {
        res.status(500).json({message: 'An error occurred while requesting data'})
    }
})

module.exports = router;