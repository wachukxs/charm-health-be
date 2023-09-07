'use strict';
const {
  Model
} = require('sequelize');
const constants = require('../utils/constants')

/**
 * TODO contribution in OSS.
 * @param {*} sequelize 
 * @param {*} DataTypes 
 * @returns 
 */

module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Answer.belongsTo(models.Question, { // Answer is the source model.
        foreignKey: 'questionId',
        allowNull: false
      })

    }
  }

  /**
   * TODO:
   */
  Answer.init({
    id: {
      allowNull: false,
      autoIncrement: true, // Or DataTypes.UUIDV1,
      primaryKey: true,
      type: DataTypes.INTEGER, // TODO: make DataTypes.UUID, everywhere else too
    },
    answer: {
      type: DataTypes.STRING,
    },
    /**
     * Free text answer?
     * Media type answer?
     * Would be determined based on the question type.
     * So this field might not be necessary.
     */
    type: {
      type: DataTypes.STRING,
    },
    /**
     * id of the patient that provided the answer
     */
    providedBy: {
      type: DataTypes.STRING,
    },
    questionId: {
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
    modelName: 'Answer',
    hooks: {}
  });
  Answer.sync({ force: true })
  return Answer;
};