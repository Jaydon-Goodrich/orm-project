const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    //set id
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    //foreign key for product
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product'
      }
    },
    //foreign key for tag
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
