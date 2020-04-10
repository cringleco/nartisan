'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('<%= tableName.toLowerCase() %>', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },

        <% attributes.forEach(function(attribute) { %>
          <%= attribute.fieldName %>: {
            type: Sequelize.<%= attribute.dataFunction ? `${attribute.dataFunction.toUpperCase()}(Sequelize.${attribute.dataType.toUpperCase()})` : attribute.dataValues ? `${attribute.dataType.toUpperCase()}(${attribute.dataValues})` : attribute.dataType.toUpperCase() %>
          },
        <% }) %>

        <%= createdAt %>: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("NOW()"),
        },

        <%= updatedAt %>: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("NOW()"),
        },

        deletedAt: {
          allowNull: true,
          type: Sequelize.DATE,
        },
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('<%= tableName.toLowerCase() %>');
  }
};
