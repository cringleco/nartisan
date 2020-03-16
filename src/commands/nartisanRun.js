import { _baseOptions, _underscoreOption } from "../core/yargs";
import helpers from "../helpers";
import clc from "cli-color";
import _ from "lodash";
import * as cp from "child_process";
const npm = process.platform === "win32" ? "npm.cmd" : "npm";

exports.builder = yargs =>
  _underscoreOption(
    _baseOptions(yargs)
      .option("dev", {
        describe: "starts nartisan in dev mode",
        type: "boolean",
        demandOption: false
      })
      .option("prod", {
        describe: "starts nartisan in production mode",
        type: "boolean",
        demandOption: false
      })
  ).argv;

exports.handler = function(args) {
  const destination = process.cwd();

  if (!args.dev && !args.prod) {
    helpers.view.log(clc.blueBright(`Starting nartisan project in dev mode`));

    const result = cp.spawnSync(npm, ["run", "dev"], {
      cwd: destination,
      stdio: [process.stdin, process.stdout, process.stderr],
      encoding: "utf-8"
    });
  }

  if (args.dev) {
    helpers.view.log(clc.blueBright(`Starting nartisan project in dev mode`));

    const result = cp.spawnSync(npm, ["run", "dev"], {
      cwd: destination,
      stdio: [process.stdin, process.stdout, process.stderr],
      encoding: "utf-8"
    });
  } else {
    helpers.view.log(
      clc.blueBright(
        `Starting nartisan project in production mode, please set your env file if you haven't already`
      )
    );

    const result = cp.spawnSync(npm, ["start"], {
      cwd: destination,
      stdio: [process.stdin, process.stdout, process.stderr],
      encoding: "utf-8"
    });
  }
};
