const { Pokemon } = require('../db/sequelize')
const { Op, and } = require('sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    if (req.query.name) {
      const name = req.query.name
      const limit = parseInt(req.query.limit) || 5
      if (!(name.length > 1)) {
        const message = 'Le terme de recherche doit contenir minimum 2 caractères.'
        return res.status(400).json({ message })
      }
      return Pokemon.findAndCountAll({ 
        where: { 
          name: {
            [Op.like]: `%${name}%`
          }  
        },
        order: ['name'],
        limit: limit
      })
      .then(({ count, rows }) => {
        const message = `Il y a ${count} pokémon(s) qui correspond(ent) au terme de recherche ${name}.`
        res.json({ message, data: rows })
      })
    }
    Pokemon.findAll({ order: ['name'] })
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