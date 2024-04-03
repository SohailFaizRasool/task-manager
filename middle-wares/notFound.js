const notFound = (req, res) => {
    console.log('page Not found ');
    res.status(404).send('Route does not exist')
}

module.exports = notFound
