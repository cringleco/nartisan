import { _baseOptions, _underscoreOption } from "../core/yargs";

import helpers from "../helpers";
import clc from "cli-color";
import fs from "fs";

exports.builder = yargs =>
  _underscoreOption(
    _baseOptions(yargs).option("model", {
      describe: "Specify the model for the controller",
      type: "string",
      demandOption: true
    })
  ).argv;

exports.handler = function(args) {
  ensureRoutesFolder();
  ensureControllersFolder();
  checkRouteFileExistence(args);

  try {
    generateFile(args);
  } catch (error) {
    console.log(error);
  }

  let newIndex;

  const routeIndexPath = helpers.path.getRoutesIndexPath("index");

  fs.readFile(routeIndexPath, "utf-8", function(err, data) {
    if (err) {
      helpers.view.error("Error editing Route Index file" + err);
      process.exit(0);
    }
    newIndex = data;

    const modelName = helpers.migration.getTableName(args.model).toLowerCase();

    newIndex = newIndex.replace(
      `import express from "express";`,
      `import express from "express";\n\nimport ${modelName} from "./${modelName}";`
    );

    newIndex = newIndex.replace(
      `module.exports = router;`,
      `router.use("/${modelName}", ${modelName});\n\nmodule.exports = router; \n`
    );

    fs.writeFile(routeIndexPath, newIndex, function(err) {
      if (err) {
        helpers.view.error("Error editing Route Index file" + err);
        process.exit(0);
      }
      helpers.view.log(
        "Updated Route Index at: ",
        clc.blueBright(routeIndexPath),
        ""
      );
    });
  });
};

function ensureRoutesFolder() {
  if (!helpers.path.existsSync(helpers.path.getPath("route"))) {
    helpers.view.error(
      "Unable to find routes path (" +
        helpers.path.getPath("route") +
        "). Did you run " +
        clc.blueBright("nartisan init") +
        "?"
    );
  }
}

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
    "routes/route.js",
    {
      modelName: args.model,
      modelPluralized: helpers.migration.getTableName(args.model)
    },
    { beautify: false, preserve_newlines: true }
  );
}

function generateFile(args) {
  if (!checkControllerFileExistence(args.model)) {
    generateControllerFile(args);

    helpers.view.log(
      "New Controller was created at",
      clc.blueBright(helpers.path.getControllerPath(args.model)),
      ""
    );
  }

  const modelPath = helpers.path.getRoutesPath(args.model);

  helpers.view.log("New Route was created at", clc.blueBright(modelPath), "");
  helpers.asset.write(modelPath, generateFileContent(args));
}

function checkRouteFileExistence(args) {
  const modelPath = helpers.path.getRoutesPath(args.model);

  if (args.force === undefined && helpers.path.existsSync(modelPath)) {
    helpers.view.notifyAboutExistingFile(modelPath);
    process.exit(1);
  }
}

function checkControllerFileExistence(args) {
  const modelPath = helpers.path.getControllerPath(args.model);

  if (args.force === undefined && helpers.path.existsSync(modelPath)) {
    return true;
  } else {
    return false;
  }
}

function generateControllerContent(args) {
  return helpers.template.render(
    "controllers/controller.js",
    {
      modelName: args.model
    },
    { beautify: false, preserve_newlines: true }
  );
}

function generateControllerFile(args) {
  const modelPath = helpers.path.getControllerPath(args.model);
  helpers.asset.write(modelPath, generateControllerContent(args));
}
