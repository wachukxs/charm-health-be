/**
 * Clinicians would ideally create institutions as they register.
 */

"use strict";
const { Model } = require("sequelize");
const constants = require("../utils/constants");

/**
 * @param {*} sequelize
 * @param {*} DataTypes
 * @returns
 */

module.exports = (sequelize, DataTypes) => {
  class Clinician extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Clinician.belongsTo(models.Institution, {
        foreignKey: 'institutionId',
        allowNull: false
      })
    }
  }

  /**
   * TODO:
   */
  Clinician.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true, // Or DataTypes.UUIDV1,
        primaryKey: true,
        type: DataTypes.INTEGER, // TODO: make DataTypes.UUID, everywhere else too
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      institutionId: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Clinician",
      hooks: {},
    }
  );
  Clinician.sync({ force: true });
  return Clinician;
};
