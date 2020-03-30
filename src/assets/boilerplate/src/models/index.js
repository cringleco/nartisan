import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import SimpleCache from "sequelize-simple-cache";

const env = process.env.NODE_ENV || "development";
// eslint-disable-next-line
const config = require(`${__dirname}/../config/index.js`)[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const cache = new SimpleCache(
  {
    User: { ttl: 24 * 60 * 60 * 60, limit: 50 }
  },
  { debug: false }
);

const models = Object.assign(
  {},
  ...fs
    .readdirSync(__dirname)
    .filter(file => file.indexOf(".") !== 0 && file !== "index.js")
    .map(file => {
      // eslint-disable-next-line
      const model = require(path.join(__dirname, file)).default;

      return {
        [model.name]: model.init(sequelize, Sequelize)
      };
    })
);

// eslint-disable-next-line
for (const model of Object.keys(models)) {
  // eslint-disable-next-line
  typeof models[model].associate === "function" &&
    models[model].associate(models);
}

//Don't remove the line below its for importing models and AutoCompletion
//IMPORTS
import User from "./user";

const db = {
  User: User,
  sequelize,
  Sequelize
};

//Don't remove the line below its for creating new caching instance
//CACHING
db.User = cache.init(db.User);

export default db;
