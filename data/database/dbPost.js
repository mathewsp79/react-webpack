/**
 * Manapaho (https://github.com/manapaho/)
 *
 * Copyright © 2015 Manapaho. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Create the database entity.
 */
export default function (sequelize, DataTypes) {
  // Define the model.
  var model = sequelize.define('post', {
      // Declare the properties.
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    // Declare the associations.
    {
      classMethods: {
        associate: function (models) {
          model.belongsTo(models.person);
          model.hasMany(models.comment);
        }
      }
    }
  );
  // Create the model.
  return model;
}
