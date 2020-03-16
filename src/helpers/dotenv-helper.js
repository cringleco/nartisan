import inquirer from "inquirer";
import helpers from "./index";
import _ from "lodash";
import clc from "cli-color";

const questions = [
  {
    name: "DB_NAME",
    type: "input",
    message: "Enter your Database name",
    default: ""
  },
  {
    name: "DB_HOST",
    type: "input",
    message: "Enter your Database Host",
    default: "localhost"
  },
  {
    name: "DB_USER",
    type: "input",
    message: "Enter your Database User",
    default: "root"
  },
  {
    name: "DB_PASS",
    type: "input",
    message: "Enter your Database Password",
    default: ""
  },
  {
    name: "DOMAIN_FOR_COOKIES",
    type: "input",
    message: "Enter your Domain, this is used for cookies auth",
    default: "localhost"
  }
];

function generateFileContent(env) {
  return helpers.template.render(
    ".env",
    {
      DB_NAME: env.DB_NAME,
      DB_HOST: env.DB_HOST,
      DB_USER: env.DB_USER,
      DB_PASS: env.DB_PASS,
      DOMAIN_FOR_COOKIES: env.DOMAIN_FOR_COOKIES,
      SECRET_KEY: getRandomKey(),
      REFRESH_KEY: getRandomKey()
    },
    { beautify: false, preserve_newlines: true }
  );
}

function askQuestions() {
  helpers.view.log(
    "Creating .env file please answer the questions or press enter for default"
  );
  console.log(" ");

  inquirer
    .prompt(questions)
    .then(answers => {
      generateFile(answers);
    })
    .catch(err => {
      console.log(err);
      process.exit(0);
    });
}

function generateFile(env) {
  const modelPath = process.cwd() + "\\.env";
  helpers.asset.write(modelPath, generateFileContent(env));

  helpers.view.log("Env file edited", clc.blueBright(modelPath), "");
  process.exit(0);
}

function getRandomKey() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}

export default askQuestions;
