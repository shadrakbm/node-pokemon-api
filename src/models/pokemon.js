const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée']

module.exports = (sequelize, DataTypes) => { 
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Ce nom est déjà pris.'
        },
        validate: {
          notEmpty: { msg: 'Le nom ne peut pas être vide.' },
          notNull : { msg: 'Le nom est une propriété requise.' }
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'Utilisez des nombres entiers pour les points de vie.' },
          min: {
            args: [0],
            msg: 'Les points de vie doivent être supérieurs ou égaux à 0.'
          },
          max: {
            args: [999],
            msq: 'Les points de vie doivent être inférieurs ou égaux à 999.'
          },
          notNull: { msg: 'Les points de vie sont une propriété requise.' }
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: 'Utilisez des nombres entiers pour les points de dégâts.'},
          min: {
            args: [0],
            msg: 'Les points de dégâts doivent être supérieurs ou égaux à 0.'
          },
          max: {
            args: [99],
            msq: 'Les points de dégâts doivent être inférieurs ou égaux à 999.'
          },
          notNull: { msg: 'Les points de dégâts sont une propriété requise.' }
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: `Utilisez une URL valide pour l'image.` },
          notNull: { msg: `L'image est une propriété requise.`}
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('types').split(',')
        },
        set(types) {
          this.setDataValue('types', types.join())
        },
        validate: {
          isTypesValid(value) {
            if (!value) {
              throw new Error('Le pokémon doit avoir au moins un type.')
            }
            if (value.split(',').length > 3) {
              throw new Error('Le pokémon doit avoir maximum 3 types')
            }
            value.split(',').forEach(type => {
              if (!validTypes.includes(type)) {
                throw new Error(`Le pokémon doit avoir un type issu de la liste suivante : ${validTypes}`)
              }
            })
          }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
}