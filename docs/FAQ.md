The Nartisan Command Line Interface (CLI) Frequently Asked Question

## Initialize nartisan to create from boilerplate,editing package file, .env etc.

Create a new project from boilerplate replace `NAME` argument with your project name. Used for package.json.

```
$ nartisan init NAME
```

## How can i start my new project?

Simply run nartisan serve with either `--dev` or `--prod`. Defaults to : `--dev`

```
$ nartisan serve || nartisan run | nartisan start --dev
```

## How can i create a new api route?

Specify route with `--model` argument and then enter the model which you want a route for, it automatically creates a new api controller for the model too.

```
$ nartisan route:create --model Profile
```

## How can i create a new api controller?

Specify controller with `--model` argument and then enter the model which you want a controller for.

```
$ nartisan controller:create --model Avatar
```

## How can I generate a model?

Specify model name with `--name` argument. List of table fields can be passed with `--attributes` option

```
$ nartisan model:create --name Profile --attributes "name:[type:string],email:[type:string, unique:true]"
```

## How can i create model with associations/relations?

Specify associations with `--associations` argument with following syntax: <relation>:<Model>,

```
$ nartisan model:create --name Profile --attributes .. --associations belongsTo:User,hasOne:Avatar
```

## How can I create a migration?

Specify migration name with `--name` argument

```
$ nartisan migration:create --name <migration_name>
```

## What is the command to execute all migrations?

```
$ nartisan db:migrate
```

## How can I make a migrations rollback?

```
$ nartisan db:migrate:undo:all
```

## How can I create a seeder?

Specify seeder name with `--name` argument

```
$ nartisan seed:create --name <seeder_name>
```

## How can I run the seeders?

```
$ nartisan db:seed:all
```

## How can I make the seeders rollback?

```
$ nartisan db:seed:undo:all
```
