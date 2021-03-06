# pg-connection
Simple PotgreSQL wrapper for nodejs, to simplify its development.

WIP


## Install
``npm install @schirrel/pg-connection --save``


### Config
Uses `.env`  to aquire credentials.
|Prop|Required| Default | Description |
| ------------ | ------------ | ------------ | ------------ |
|PG_USER| Required | | |
|PG_URL| Required |  | |
|PG_DATABASE |Required  | | |
|PG_PASSWORD |Required  | | |
|PG_PORT | Optional |5432 | |
|PG_SSL | Optional |false | |
|PG_REJECT_UNHAUTHORIZED | Optional | | |
|PG_LOG | Optional |false | |


## Usage

Using in 3 Steps

1. .env


```
PG_USER=postgres
PG_URL=localhost
PG_DATABASE=postgres
PG_PASSWORD=postgres
PG_SCHEMA=mercado_alencar
PG_LOG=true
```

2. Model
```javascript
const Model = require('@schirrel/pg-connection/Model');
class User extends Model{
	constructor(args = {}){
	super("USER");
	this.addColumn('email', 'EMAIL');
	this.addColumn('name', 'NAME');
	this.addColumn('password', 'PASSWORD');
	this.addColumn('active', 'ACTIVE', true);
	this.setValues(args);
	}
}

module.exports = User;
```

3. Repository
```javascript
const Repository = require('@schirrel/pg-connection/Repository');
const User = require('../models/User');

class UserRepository extends Repository{
	constructor(){
		super(User);
	}
}

module.exports = UserRepository;
```

And thats it.


## TL;DR
### Model
- Used as `extends Model` at your model class
- Call `super("TABLE_NAME")` with your table name 
- To add a columns `this.addColumn('email', 'EMAIL');`, it accepts a 3rd parameter as the default value.
- To set values of your constructor use ``this.setValues(args);`` 


### Repository
- Used as `extends Repository` at your repo class
- Call `super(YourClass);` with your class reference
- it already have built in: get(id), create(model), update(model),delete(id), list(), search(options)
