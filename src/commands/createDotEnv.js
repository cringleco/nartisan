import { _baseOptions, _underscoreOption } from "../core/yargs";

import _ from "lodash";
import dotEnvHelper from "../helpers/dotenv-helper";

exports.builder = yargs => _underscoreOption(_baseOptions(yargs)).argv;

exports.handler = function(args) {
  try {
    const env = dotEnvHelper();
  } catch (error) {
    console.log(error);
  }
};
