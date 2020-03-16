import { _baseOptions, _underscoreOption } from "../core/yargs";

import helpers from "../helpers";
import clc from "cli-color";

exports.builder = yargs =>
  _underscoreOption(
    _baseOptions(yargs).option("model", {
      describe: "Specify the model for the controller",
      type: "string",
      demandOption: true
    })
  ).argv;

exports.handler = function(args) {
  ensureControllersFolder();
  checkControllerFileExistence(args);

  try {
    generateFile(args);
  } catch (error) {
    console.log(error);
  }

  process.exit(0);
};

function ensureControllersFolder() {
  if (!helpers.path.existsSync(helpers.path.getPath("controller"))) {
    helpers.view.error(
      "Unable to find controllers path (" +
        helpers.path.getPath("controller") +
        "). Did you run " +
        clc.blueBright("nartisan init") +
        "?"
    );
  }
}

function generateFileContent(args) {
  return helpers.template.render(
    "controllers/controller.js",
    {
      modelName: args.model
    },
    { beautify: false, preserve_newlines: true }
  );
}

function generateFile(args) {
  const modelPath = helpers.path.getControllerPath(args.model);
  helpers.asset.write(modelPath, generateFileContent(args));

  helpers.view.log(
    "New Controller was created at",
    clc.blueBright(modelPath),
    ""
  );
}

function checkControllerFileExistence(args) {
  const modelPath = helpers.path.getControllerPath(args.model);

  if (args.force === undefined && helpers.path.existsSync(modelPath)) {
    helpers.view.notifyAboutExistingFile(modelPath);
    process.exit(1);
  }
}
