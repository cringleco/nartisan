import _ from "lodash";
import helpers from "./index";

const Sequelize = helpers.generic.getSequelize();

module.exports = {
  getTableName(modelName) {
    return Sequelize.Utils.pluralize(modelName);
  },

  generateExtTableCreationFileContent(args) {
    return helpers.template.render("migrations/create-ext-table.js", {
      tableName: this.getTableName(args.name).toLowerCase(),
      attributes: helpers.model.transformExtAttributes(args, true),
      createdAt: args.underscored ? "created_at" : "createdAt",
      updatedAt: args.underscored ? "updated_at" : "updatedAt"
    });
  },

  generateAssociationCreationFileContent(associations) {
    return helpers.template.render("migrations/add-relation-to-table.js", {
      associations
    });
  },

  generateJoinTableFileContent(association) {
    return helpers.template.render("migrations/create-join-table.js", {
      tableName: association.through,
      source: association.source,
      target: association.target
    });
  },

  generateMigrationName(args) {
    return _.trimStart(_.kebabCase("create-" + args), "-");
  },

  generateAssociationName(args) {
    return _.trimStart(_.kebabCase("-add-relation-to" + args.name), "-");
  },

  generateTableCreationFile(args) {
    const migrationName = this.generateMigrationName(args.name);
    const migrationPath = helpers.path.getMigrationPath(migrationName);

    helpers.asset.write(
      migrationPath,
      this.generateExtTableCreationFileContent(args)
    );
  },

  generateAssociationCreationFile(args) {
    if (args.associations) {
      const [others, belongsToMany] = helpers.model.transformAssociations(args);

      if (belongsToMany.length > 0) {
        for (let index = 0; index < belongsToMany.length; index++) {
          const sourc = helpers.path.getModelPath(belongsToMany[index].source);
          const targe = helpers.path.getModelPath(belongsToMany[index].model);

          const source = helpers.model.modelFileExists(sourc);
          const target = helpers.model.modelFileExists(targe);

          if ((source && !target) || (target && !source)) {
            const joinTableName = this.generateMigrationName(
              belongsToMany[index].through.toLowerCase()
            );
            const joinTablePath = helpers.path.getMigrationPath(joinTableName);
            helpers.asset.write(
              joinTablePath,
              this.generateJoinTableFileContent(belongsToMany[index])
            );
          }
        }
      }

      const migrationName = this.generateAssociationName(args);
      const migrationPath = helpers.path.getMigrationPath(migrationName);
      let toMigrate = [];

      for (let index = 0; index < others.length; index++) {
        const element = others[index];

        if (element.relation == "belongsTo") {
          toMigrate.push(element);
        }
      }

      if (toMigrate.length > 0) {
        helpers.asset.write(
          migrationPath,
          this.generateAssociationCreationFileContent(toMigrate)
        );
      }
    }
  }
};
