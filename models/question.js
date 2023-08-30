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
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Question.hasOne(models.Answer, {
        foreignKey: 'questionId',
        allowNull: true
      })

      Question.belongsTo(models.Questionnaire, {
        foreignKey: 'questionnaireId',
        allowNull: false
      })

    }
  }

  /**
   * TODO:
   * 1. Maybe check if there's a space/spaces between names provided by google and return first/last names accordingly
   */
  Question.init({
    id: {
      allowNull: false,
      autoIncrement: true, // Or DataTypes.UUIDV1,
      primaryKey: true,
      type: DataTypes.INTEGER, // TODO: make DataTypes.UUID, everywhere else too
    },
    question: {
      type: DataTypes.STRING,
    },
    questionnaireId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM,
      values: Object.values(constants.questionTypes)
    },
    /**
     * about this field.
     * Should be a comma, separated list of possible answers we expect.
     */
    expectedAnswers: {
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
    modelName: 'Question',
    hooks: {}
  });
  Question.sync({ force: true })
  return Question;
};