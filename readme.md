## Server using Express - MongoDB

# Connect to database - MongoDB

For this exercise we have downloaded the local program of MongoDB to our machine. Once downloaded, we create a folder called "mongoDB" and a subfolder called "data".

To start the mongoDB database, navigate to the folder on your PC where the "data" folder is located.

On the terminal, execute:

mongod --dbpath=data --bind_ip 127.0.0.1

This should get the database server up and running.

In a separate terminal you can type "mongo" to enter the REPL shell, which allows you to interact with your running database server. Here you can execute commands like: 
* db (logs the database you're ine)
* use "dbname" (changes you or creates the new database)
* db.help() (shows all available commands for your db)
* db.'col'.help() (shows all available commands for the 'col' collection)
* db.dishes.insert({ name: "testname", description: "Test" }); (adds a new item to your collection)
* db.dishes.find().pretty(); (logs the full contents of your collection, pretty for readabilitty)

Type exit to leave the REPL shell.

# Express Generator and the template

We make use of a node module to generate a basic express template, install it:

* npm install express-generator@4.16.0 -g

Once installed, we can scaffold a basic express app, on the command prompt:

express <nameOfYourapp>

Then run npm install to install all the required dependencies defined by the package-json.

With this your main file will be the app.js. 

# Interacting with your mongoDb database from the express App

To use mongoDB from your express app, install the module:

* npm install mongodb@3.0.10 --save
* npm install assert@1.4.1 --save

Assert is an extra module that allows us to do revisions of errors. 

Then you can modify your app.js to connect to your mongoDB

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017/';
const dbname = 'nameOfyourDB';

MongoClient.connect(url, (err, client) => {
 ...
}

# To create data schemas and also handle connections, we use Mongoose too

* npm install mongoose --save

# To handle authentication, we can use Express Sessions

* npm install express-session --save
* npm install session-file-store --save

# Modifiying the admin should only be done directly by the database user... not for normal logins

db.users.update({"username":"admin"}, {$set:{"admin": true}})