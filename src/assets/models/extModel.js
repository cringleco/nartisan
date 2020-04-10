import Sequelize from 'sequelize';

export default class <%= name %> extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        <% attributes.forEach(function(attribute, index) { %>
            <%= attribute.dataName %>:{
                <% attribute.dataValues.forEach(function(value, index) { %>
                    <%=value%><%=index === attribute.dataValues.length - 1 ? '' : ',' %>
                  <% }) %>
            },
          <% }) %>
      },
      {
        <%= underscored ? 'underscored: true,' : '' %>
        modelName: '<%= name %>',
        tableName: '<%= tableName.toLowerCase() %>',
        paranoid: true,
        sequelize
      }
    );

  }

  static associate(models) {
    <% associations.forEach(function(association) { %>
      this.<%= association.relation %>(models.<%= association.model %> <%= association.foreignKey ? `, {foreignKey: '${association.foreignKey}'}` : null %>   <%= association.through ? `, {through: '${association.through}'}` : null %> );
    <% }) %>
  }
}