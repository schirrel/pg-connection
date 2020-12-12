# pg-connection
Simple PotgreSQL wrapper for nodejs, to simplyfi its development


WIP



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
|PG_LOG | Optional |false | |


## Usage

1. Model
```
const Model = require('@schirrel/pg-connection/Model');
class User extends Model{
	constructor(args = {}){
	super("USER")
	this.addColumn('email', 'EMAIL');
	this.addColumn('name', 'NAME');
	this.addColumn('password', 'PASSWORD');
	this.setValues(args);
	}
}

module.exports = User;
```

2. Repository
```
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

### Database
#### connect
Function to start connection, desired to be calling on your server initialization 

--------------------------------------------------

### Model
The model to your table.

#### constructor(tableName)


#### setValues(vals, fromDatabase)(tableName)

#### addColumn(property, column, defaultVal)

#### getColumn(property)

#### createUpdateObject() 

#### createPersistObject()


--------------------------------------------------
### Repository
Repository to your entity
#### constructor(_table)
Requires the _table class object

#### persist(model)

#### get(id)

#### create(model)

#### update(model)

#### delete(id)

#### list()

#### search(options)

#### paginate(options) TODO
