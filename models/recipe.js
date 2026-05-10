// models/recipe.js

const Sequelize = require('sequelize');

module.exports = class Recipe extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            // 레시피 속성들 정의
            title: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            ingredients: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            instructions: {
                type: Sequelize.TEXT,
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Recipe',
            tableName: 'recipes',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Comment.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
      }
    };
    