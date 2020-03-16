'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('<%= tableName %>', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },

        <% attributes.forEach(function(attribute, index) { %>
            <%= attribute.dataName %>:{
                <% attribute.dataValues.forEach(function(value, index) { %>
                    <%=value%><%=index === attribute.dataValues.length - 1 ? '' : ',' %>
                  <% }) %>
            },
          <% }) %>

        <%= createdAt %>: {
          allowNull: false,
          type: Sequelize.DATE
        },

        <%= updatedAt %>: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('<%= tableName %>');
  }
};
