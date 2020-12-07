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
