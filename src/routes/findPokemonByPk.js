const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        if (pokemon === null) {
          const message = `Le pokémon demandé n'existe pas. Veuillez réessayer avec un autre identifiant.`
          return res.status(404).json({ message, data: error })
        }
        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: pokemon })
      })
      .catch(error => {
        const message = `Le pokémon demandé n'a pas pu être récupéré. Veuillez réessayer plus tard.`
        res.status(500).json({ message, data: error })
      })
  })
}