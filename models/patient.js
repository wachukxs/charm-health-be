/**
 * Patients would, ideally, be created by institutions.
 * We can also have an API to auto create a patient after they've booked an appointment.
 * This is can be fully integrated via API.
 */

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
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }

  /**
   * TODO:
   * 1. How do we identify patients that are patients of different hospitals? (Outside the scope of this hackathon?)
   *    Have a National means of identification, eg Passport Number, SSN (for United States, etc.), DL, NIN (for Nigeria, etc)
   * 2. How can we tell the questionnaires a patient has answered?
   *    Do we need a Junction Model?
   */
  Patient.init({
    id: {
      allowNull: false,
      autoIncrement: true, // Or DataTypes.UUIDV1,
      primaryKey: true,
      type: DataTypes.INTEGER, // TODO: make DataTypes.UUID, everywhere else too
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
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
    modelName: 'Patient',
    hooks: {}
  });
  Patient.sync({ force: true })
  return Patient;
};