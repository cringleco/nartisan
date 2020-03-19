import helpers from "./index";

const Sequelize = helpers.generic.getSequelize();
const validAttributeFunctionType = ["array", "enum"];

/**
 * Check the given dataType actual exists.
 * @param {string} dataType
 */
function validateDataType(dataType) {
  if (!Sequelize.DataTypes[dataType.toUpperCase()]) {
    throw new Error(`Unknown type '${dataType}'`);
  }

  return dataType;
}

function validateRelation(relation) {
  const options = ["belongsTo", "hasOne", "hasMany", "belongsToMany"];
  if (!options.includes(relation)) {
    throw new Error(`Unknown relation '${relation}'`);
  }
}

function formatAssociations(source, association) {
  const split = association.split(":");
  validateRelation(split[0]);
  const relation = {
    source,
    relation: split[0],
    model: split[1],
    target: split[1],
    columnName: split[1]
  };

  if (relation.relation !== "belongsToMany") {
    relation.source = helpers.migration.getTableName(relation.source);
    relation.target = helpers.migration.getTableName(relation.target);
    if (relation.relation !== "belongsTo") {
      source = relation.source;
      relation.source = relation.target;
      relation.target = source;
    } else {
      relation.foreignKey = relation.columnName + "Id";
    }
  } else {
    const sourc = helpers.path.getModelPath(source);
    const targe = helpers.path.getModelPath(relation.model);

    const sources = helpers.model.modelFileExists(sourc);
    const targets = helpers.model.modelFileExists(targe);

    if (targets) {
      relation.through =
        relation.target + helpers.migration.getTableName(relation.source);
    } else if (sources) {
      relation.through =
        source + helpers.migration.getTableName(relation.target);
    } else {
      relation.through =
        source + helpers.migration.getTableName(relation.target);
    }
  }

  return relation;
}

const removeWhiteSpace = flag =>
  flag
    .split("")
    .map(
      (() => {
        let openValues = false;
        return a => {
          if (a === " ") {
            return "";
          }
          return a;
        };
      })()
    )
    .join("")
    .split(/\s{2,}/);

const splitString = flag =>
  flag
    .split("")
    .map(
      (() => {
        let openValues = false;
        return a => {
          if ((a === "," || a === " ") && !openValues) {
            return "  ";
          }
          if (a === "{") {
            openValues = true;
          }
          if (a === "}") {
            openValues = false;
          }

          return a;
        };
      })()
    )
    .join("")
    .split(/\s{2,}/);

module.exports = {
  transformAssociations({ name, associations }) {
    /*
      possible flag formats:
      - belongsTo:ModelName, hasOne:ModelName, hasMany:ModelName, belongsToMany:ModelName
    */
    const associationStrings = splitString(associations);

    return associationStrings
      .map(association => formatAssociations(name, association))
      .reduce(
        (acc, curr) => {
          if (curr.relation !== "belongsToMany") {
            acc[0].push(curr);
          } else {
            acc[1].push(curr);
          }
          return acc;
        },
        [[], []]
      );
  },

  transformExtAttributes(args, isMigration) {
    const flags = removeWhiteSpace(args.attributes);

    const attr = flags[0].split("]");

    attr.length = attr.length - 1;

    attr[0] = attr[0] + "]";

    if (attr.length > 1) {
      attr[attr.length - 1] = attr[attr.length - 1] + "]";
    }

    let data = [];
    let dataValues = [];

    for (let i = 0; i < attr.length; i++) {
      let element = attr[i];

      if (i !== 0) {
        element = element.substr(1);
      }

      const splittedElement = element.split("[");

      var dataName = splittedElement[0].slice(0, -1);

      let dataTypes;
      if (i === 0 || i === attr.length - 1) {
        dataTypes = splittedElement[1].slice(0, -1);
      } else {
        dataTypes = splittedElement[1];
      }

      let datType = dataTypes.split(",");

      datType.map((el, i) => {
        const dat = el.split(":");
        const ty = dat[0];

        if (dat.length === 1) {
          datType[i] =
            "type" +
            ":" +
            `${isMigration ? "Sequelize" : "DataTypes"}.` +
            dat[0].toUpperCase();
          dat.unshift("type");
          dataValues.push(dat);
        } else {
          if (ty == "type") {
            const val = dat[1].toUpperCase();

            datType[i] =
              ty + ":" + `${isMigration ? "Sequelize" : "DataTypes"}.` + val;
          }
          dataValues.push(dat);
        }
      });
      data.push({ dataName: dataName, dataValues: datType });
    }

    for (let index = 0; index < dataValues.length; index++) {
      const el = dataValues[index];

      if (el[0] == "type") {
        validateDataType(el[1]);
      }
    }
    return data;
  },

  generateFileContent(args) {
    const associations = args.associations
      ? this.transformAssociations(args)
      : [];
    return helpers.template.render("models/model.js", {
      name: args.name,
      tableName: helpers.migration.getTableName(args.name).toLowerCase(),
      attributes: this.transformAttributes(args.attributes),
      associations: associations.length
        ? associations[0].concat(associations[1])
        : [],
      underscored: args.underscored
    });
  },

  generateExtFileContent(args) {
    const associations = args.associations
      ? this.transformAssociations(args)
      : [];
    return helpers.template.render("models/extModel.js", {
      name: args.name,
      tableName: helpers.migration.getTableName(args.name).toLowerCase(),
      attributes: this.transformExtAttributes(args, false),
      associations: associations.length
        ? associations[0].concat(associations[1])
        : [],
      underscored: args.underscored
    });
  },

  checkModelFileExistence(filePath) {
    const modelPath = helpers.path.getModelPath(filePath);
    if (this.modelFileExists(modelPath)) {
      return true;
    } else {
      return false;
    }
  },

  modelFileExists(filePath) {
    return helpers.path.existsSync(filePath);
  },

  generateFile(args) {
    const modelPath = helpers.path.getModelPath(args.name);
    helpers.asset.write(modelPath, this.generateExtFileContent(args));
  }
};
