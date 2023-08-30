/**
 * Questionnaires are created by (hospital) institutions.
 * 
 * Figure out how to onboard B2Bs.
 * But do this later. As a v2
 * 
 * So they'll be created by Employees; that have the proper access level.
 */

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
  class Institution extends Model {
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
   * 1. Maybe check if there's a space/spaces between names provided by google and return first/last names accordingly
   */
  Institution.init({
    id: {
      allowNull: false,
      autoIncrement: true, // Or DataTypes.UUIDV1,
      primaryKey: true,
      type: DataTypes.INTEGER, // TODO: make DataTypes.UUID, everywhere else too
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
    modelName: 'Institution',
    hooks: {}
  });
  Institution.sync()
  return Institution;
};