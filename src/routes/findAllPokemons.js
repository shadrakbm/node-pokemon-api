const pokemons = require('../db/mock-pokemons')
const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    Pokemon.findAll()
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
      .catch(error => {
        message = `La liste des pokémons n'a pas pu être récupérée. Veuillez réessayer plus tard.`
        res.status(500).json({ message, data: error })
      })
  })
}