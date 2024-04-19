const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
  checkPassword(loginPassword) {
    return bcrypt.compareSync(loginPassword, this.password);
  }
}

User.init(
  {
      id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
      },
      username: {
          type: DataTypes.STRING,
          allowNull: false
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [4]
          }
      }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  }
);

module.exports = User;
