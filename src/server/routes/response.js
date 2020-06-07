async function response(res, fn){
    try {
        const {status, ...data} = await fn();
        res.status(status).json(data);
    } catch {
        res.status(500).json({message: 'An error occurred while retrieving data'});
    }
}

module.exports = response;