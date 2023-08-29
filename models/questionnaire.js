'use strict';
const {
  Model
} = require('sequelize');
const constants = require('../utils/constants')

/**
 * @param {*} sequelize 
 * @param {*} DataTypes 
 * @returns 
 */

module.exports = (sequelize, DataTypes) => {
  class Questionnaire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Questionnaire.hasMany(models.Question, { // Answer is the target model.
        foreignKey: 'questionId',
        allowNull: true
      })

    }
  }

  /**
   * TODO:
   * 1. Maybe check if there's a space/spaces between names provided by google and return first/last names accordingly
   */
  Questionnaire.init({
    id: {
      allowNull: false,
      autoIncrement: true, // Or DataTypes.UUIDV1,
      primaryKey: true,
      type: DataTypes.INTEGER, // TODO: make DataTypes.UUID, everywhere else too
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    /**
     * Just a field to allow for internal customization within the hospital.
     * The internal code for this questionnaire.
     */
    code: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    /**
     * about this field.
     * Should be a comma, separated list of possible related medical conditions this questionnaire would be for.
     */
    tags: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Questionnaire',
    hooks: {}
  });
  Questionnaire.sync()
  return Questionnaire;
};