# nartisan(cli)

The [Nartisan Sequelize API](https://sequelize.org) Command Line Interface (CLI) is a wrapper around the [Sequelize-CLI](https://github.com/sequelize/cli).

Nartisan started as boilerplate project for a node/express api. We then decided to enhance this project even more.
We're now enhancing the [Sequelize-CLI](https://github.com/sequelize/cli), enhanced the model generation feature with associations, youre creating models now with the command

```bash
$ nartisan model:generate --name Profile --attributes "name:[type:string],email:[type:string, unique:true]"
```

For adding associations/relations you can append --associations

```bash
$  --associations belongsTo:User,belongsToMany:Cars
```

Nartisan enhances the [Sequelize-CLI](https://github.com/sequelize/cli) with some new features for model generation, api routes, controllers.
It has already included a authentication and authorization system (Using JWT). With secure http coookies.
Everything you need to start your new express api sequelize project with just one command. nartisan init( aliases: create|new)

## Table of Contents

-   [Installation](#installation)
-   [Contributing](#contributing)
-   [Documentation](#documentation)

## Installation

Nartisan can be installed globally via

```bash
$ npm install -g nartisan
```

Please don't use npx because it will not work with npx, need to look into this problem.

And then you should be able to run the CLI with

```bash
$ nartisan
```

### Usage

```
Nartisan CLI [Node: 10.15.0, CLI: 1.0.0, ORM: 5.11.0]

nartisan [command]

Commands:

  nartisan init name                         Inits project from boilerplate in current folder[aliases: create, new]
  nartisan init:dotenv                       Initializes a new .env file        [aliases: init:env]
  nartisan init:config                       Initializes configuration
  nartisan init:migrations                   Initializes migrations
  nartisan init:models                       Initializes models
  nartisan init:seeders                      Initializes seeders
  nartisan db:migrate                        Run pending migrations
  nartisan db:migrate:schema:timestamps:add  Update migration table to have timestamps
  nartisan db:migrate:status                 List the status of all migrations
  nartisan db:migrate:undo                   Reverts a migration
  nartisan db:migrate:undo:all               Revert all migrations ran
  nartisan db:seed                           Run specified seeder
  nartisan db:seed:undo                      Deletes data from the database
  nartisan db:seed:all                       Run every seeder
  nartisan db:seed:undo:all                  Deletes data from the database
  nartisan db:create                         Create database specified by configuration
  nartisan db:drop                           Drop database specified by configuration
  nartisan migration:generate                Generates a new migration file       [aliases: migration:create]
  nartisan model:generate                    Generates a model and its migration  [aliases: model:create]
  nartisan seed:generate                     Generates a new seed file            [aliases: seed:create]
  nartisan controller:generate               Generates a new controller           [aliases: controller:create]
  nartisan route:generate                    Generates a new route for model      [aliases: route:create]
  nartisan serve                             Starts the nartisan project          [aliases: start, run]

Options:
  --version  Show version number                                         [boolean]
  --help     Show help                                                   [boolean]
```

## Contributing

Nartisan is always looking for contributions. You can help us by fixing bugs, reporting bugs or improving documentation.

## Documentation

-   [Migrations Documentation](https://sequelize.org/master/manual/migrations.html)
-   [Frequently Asked Questions](docs/FAQ.md)
