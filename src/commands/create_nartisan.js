import { _baseOptions, _underscoreOption } from "../core/yargs";

import _ from "lodash";
import helpers from "../helpers";
import clc from "cli-color";
import fs from "fs-extra";
import path from "path";
import dotEnvHelper from "../helpers/dotenv-helper";
import * as cp from "child_process";
const npm = process.platform === "win32" ? "npm.cmd" : "npm";

exports.builder = yargs => _underscoreOption(_baseOptions(yargs)).argv;

exports.handler = function(args) {
  const destination = process.cwd();

  const source = path.join(__dirname, "../assets/boilerplate");

  helpers.view.log("", clc.blueBright("Creating a new Nartisan Project"), "");

  console.log(" ");

  console.log("Please wait a few seconds");

  console.log(" ");

  let packagePath = process.cwd() + "\\package.json";

  let name = "nartisan-starter";

  if (args._.length > 1) {
    name = args._[1].toLowerCase();

    for (let index = 0; index < args._.length; index++) {
      const el = args._[index];

      if (index > 1) {
        name = name + "-" + el.toLowerCase();
      }
    }
  }

  fs.copy(source, destination)
    .then(() => {
      var path = destination;

      helpers.view.log("", clc.blueBright("Installing node_modules"), "");

      console.log(" ");

      const result = cp.spawnSync(npm, ["install"], {
        cwd: path,
        stdio: [0, 1, 2]
      });

      console.log(" ");

      helpers.view.log("", clc.blueBright("Updating Package.json"), "");

      console.log(" ");

      let packag;

      fs.readFile(packagePath, "utf-8", function(err, data) {
        if (err) {
          helpers.view.error("Error editing Package.json" + err);
          process.exit(0);
        }
        packag = data;

        const projectName = name;

        packag = packag.replace(`express-api-starter`, `${projectName}`);

        fs.writeFile(packagePath, packag, function(err) {
          if (err) {
            helpers.view.error("Error writing Package.json" + err);
            process.exit(0);
          }
          helpers.view.log(
            "Updated Package.json: ",
            clc.blueBright(packagePath),
            ""
          );

          console.log(" ");

          helpers.view.log(
            "",
            clc.blueBright("Successfully created Nartisan Project"),
            ""
          );

          const env = dotEnvHelper();

          console.log(" ");
        });
      });
    })
    .catch(err => {
      helpers.view.log(
        "",
        clc.blueBright("Error creating Nartisan Project"),
        err
      );

      process.exit(0);
    });
};
