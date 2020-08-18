"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.hasMany(models.product);
    }
  }
  user.init(
    {
      userName: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [1, 99],
            msg: "Name must be 1 to 99 characters",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            msg: "Invalid email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [8, 99],
            msg: "Password must be between 8 and 99 character",
          },
        },
      },
      state: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  
  );
console.log('here')
  user.addHook('beforeCreate', function(pendingUser) {
    console.log('this works')
    console.log(pendingUser)
    // hash the password for us
    let hash = bcrypt.hashSync(pendingUser.password, 12);
    pendingUser.password = hash;
    console.log("Im here in user model");
    // set password to the hash
  });

  user.prototype.validPassword = function(passwordTyped) {
    console.log('look we made it')
    let correctPassword = bcrypt.compareSync(passwordTyped, this.password);
    // return true or false based on correct password
    return correctPassword;
  };

  // remove the password before it gets serialized (answer when used)
  user.prototype.toJSON = function() {
    console.log('console.log')
    let userData = this.get();
    delete userData.password;
    return userData;
  };

  return user;
};
