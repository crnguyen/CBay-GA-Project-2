'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.hasMany(models.product)
      models.user.hasOne(models.claimed)
      models.user.hasMany(models.shipment)
    }
  };
  user.init({
    userName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 99],
          msg: 'Password must be between 8 and 99 character'
        }
      }
    },
    fullName: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Name must be 1 to 99 characters'
        }
      }
    },
    streetAddress: DataTypes.STRING,
    streetAddress2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [2],
          msg: 'Please enter your state abbreviation'
        }
      }
    },
    zipCode: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [5],
          msg: 'Please enter a 5 digit zipcode'
        }
      }
    },
    country: DataTypes.STRING,
    phoneNumber: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [9],
          msg: 'Please enter a 9 digit phone number'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  user.addHook('beforeCreate', function(pendingUser) {
    // hash the password for us
     let hash = bcrypt.hashSync(pendingUser.password, 12);
     console.log('Im here in user model')
    // set password to the hash 
    pendingUser.password = hash;
  });

  user.prototype.validPassword = function(passwordTyped) {
    let correctPassword = bcrypt.compareSync(passwordTyped, this.password);
    // return true or false based on correct password
    return correctPassword;
  };
  
  // remove the password before it get serialized (answer when used)
  user.prototype.toJSON = function() {
    let userData = this.get();
    delete userData.password;
    return userData;
  };
  return user;
};