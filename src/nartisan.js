#!/usr/bin/env node

import getYArgs from "./core/yargs";
import Promise from "bluebird";
import { isEmpty } from "lodash";

const yargs = getYArgs();

Promise.coroutine.addYieldHandler(yieldedValue => {
  if (Array.isArray(yieldedValue)) {
    return Promise.all(yieldedValue);
  }
});

Promise.coroutine.addYieldHandler(yieldedValue => {
  if (isEmpty(yieldedValue)) {
    return Promise.resolve(yieldedValue);
  }
});

import init from "./commands/init";
import migrate from "./commands/migrate";
import migrateUndo from "./commands/migrate_undo";
import migrateUndoAll from "./commands/migrate_undo_all";
import seed from "./commands/seed";
import seedOne from "./commands/seed_one";
import migrationGenerate from "./commands/migration_generate";
import modelGenerate from "./commands/model_generate";
import seedGenerate from "./commands/seed_generate";
import database from "./commands/database";
import createNartisan from "./commands/create_nartisan";
import controllerGenerate from "./commands/controller_generate";
import routeGenerate from "./commands/route_generate";
import nartisanRun from "./commands/nartisanRun";
import createDotEnv from "./commands/createDotEnv";

import helpers from "./helpers/index";

helpers.view.teaser();

const cli = yargs
  .help()
  .version()
  .command(
    ["create", "init", "new"],
    "Setup new nartisan project",
    createNartisan
  )
  .command("db:migrate", "Run pending migrations", migrate)
  .command(
    "db:migrate:schema:timestamps:add",
    "Update migration table to have timestamps",
    migrate
  )
  .command("db:migrate:status", "List the status of all migrations", migrate)
  .command("db:migrate:undo", "Reverts a migration", migrateUndo)
  .command("db:migrate:undo:all", "Revert all migrations ran", migrateUndoAll)
  .command("db:seed", "Run specified seeder", seedOne)
  .command("db:seed:undo", "Deletes data from the database", seedOne)
  .command("db:seed:all", "Run every seeder", seed)
  .command("db:seed:undo:all", "Deletes data from the database", seed)
  .command("db:create", "Create database specified by configuration", database)
  .command("db:drop", "Drop database specified by configuration", database)
  .command(["init:dotenv", "init:env"], "Creates a new .env file", createDotEnv)
  .command("init:config", "Initializes configuration", init)
  .command("init:migrations", "Initializes migrations", init)
  .command("init:models", "Initializes models", init)
  .command("init:seeders", "Initializes seeders", init)
  .command(
    ["migration:generate", "migration:create"],
    "Generates a new migration file",
    migrationGenerate
  )
  .command(
    ["model:generate", "model:create"],
    "Generates a model and its migration",
    modelGenerate
  )
  .command(
    ["controller:generate", "controller:create"],
    "Generates a controller with simple crud rest api functions",
    controllerGenerate
  )
  .command(
    ["route:generate", "route:create"],
    "Generates a route and if needed and route controller for given model",
    routeGenerate
  )
  .command(
    ["serve", "start", "run"],
    "Starts the nartisan node project",
    nartisanRun
  )
  .command(
    ["seed:generate", "seed:create"],
    "Generates a new seed file",
    seedGenerate
  )
  .wrap(yargs.terminalWidth())
  .strict();

const args = cli.argv;

// if no command then show help
if (!args._[0]) {
  cli.showHelp();
}
