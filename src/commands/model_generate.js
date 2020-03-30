import { _baseOptions, _underscoreOption } from "../core/yargs";

import helpers from "../helpers";
import clc from "cli-color";

exports.builder = yargs =>
  _underscoreOption(
    _baseOptions(yargs)
      .option("name", {
        describe: "Defines the name of the new model",
        type: "string",
        demandOption: true,
        alias: "n"
      })
      .option("attributes", {
        describe: "A list of attributes",
        type: "string",
        demandOption: false,
        alias: "a"
      })
      .option("associations", {
        describe: "A list of associations",
        type: "string",
        demandOption: false,
        alias: "r"
      })
      .option("cache", {
        describe: "Add Cache for current model",
        type: "boolean",
        demandOption: false,
        alias: "c"
      })
      .option("force", {
        describe: "Forcefully re-creates model with the same name",
        type: "string",
        alias: "f",
        demandOption: false
      })
  ).argv;

exports.handler = function(args) {
  ensureModelsFolder();
  ensureMigrationsFolder();
  checkModelFileExistence(args);

  helpers.migration.generateTableCreationFile(args);
  helpers.migration.generateAssociationCreationFile(args);

  try {
    helpers.model.generateFile(args);
    helpers.model.editModelIndex(args);
  } catch (err) {
    helpers.view.error(err.message);
  }
};

function ensureModelsFolder() {
  if (!helpers.path.existsSync(helpers.path.getModelsPath())) {
    helpers.view.error(
      "Unable to find models path (" +
        helpers.path.getModelsPath() +
        "). Did you run " +
        clc.blueBright("sequelize init") +
        "?"
    );
  }
}

function ensureMigrationsFolder() {
  if (!helpers.path.existsSync(helpers.path.getPath("migration"))) {
    helpers.view.error(
      "Unable to find migrations path (" +
        helpers.path.getPath("migration") +
        "). Did you run " +
        clc.blueBright("sequelize init") +
        "?"
    );
  }
}

function checkModelFileExistence(args) {
  const modelPath = helpers.path.getModelPath(args.name);

  if (args.force === undefined && helpers.model.modelFileExists(modelPath)) {
    helpers.view.notifyAboutExistingFile(modelPath);
    process.exit(1);
  }
}
