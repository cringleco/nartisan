'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    <% associations.forEach(function(association, i) { %>
      <%= i ? '.then(() => {' : null %> 
        return queryInterface.addColumn(
          '<%= association.source.toLowerCase() %>',
          '<%=association.columnName%>Id',
          {
            type: Sequelize.INTEGER,
            references: {
              model: {
                tableName: '<%=association.target.toLowerCase()%>' 
              },
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          }
        )
        <%= i ? '})' : null %>
    <% }) %>;
  },

  down: (queryInterface, Sequelize) => {
    <% associations.forEach(function(association, i) { %>
      <%= i ? '.then(() => {' : null %> 
        return queryInterface.removeColumn(
          '<%= association.source.toLowerCase() %>',
          '<%=association.columnName%>Id'
        )
      <%= i ? '})' : null %>
    <% }) %>;
  }
};
