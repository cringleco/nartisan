import Sequelize from 'sequelize';

export default class <%= name %> extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        <% attributes.forEach(function(attribute, index) { %>
          <%= attribute.fieldName %>: DataTypes.<%= attribute.dataFunction ? `${attribute.dataFunction.toUpperCase()}(DataTypes.${attribute.dataType.toUpperCase()})` : attribute.dataValues ? `${attribute.dataType.toUpperCase()}(${attribute.dataValues})` : attribute.dataType.toUpperCase() %>
          <%= (Object.keys(attributes).length - 1) > index ? ',' : '' %>
        <% }) %>
      },
      {
        <%= underscored ? 'underscored: true,' : '' %>
        modelName: '<%= name %>',
        tableName: '<%= tableName.toLowerCase() %>',
        sequelize
      }
    );
  }

  static associate(models) {
    <% associations.forEach(function(association) { %>
      this.<%= association.relation %>(models.<%= association.model %> <%= association.foreignKey ? `, {foreignKey: '${association.foreignKey}'}` : null %>  <%= association.through ? `, {through: '${association.through}'}` : null %> );
    <% }) %>
  }
}