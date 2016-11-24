# node_restful_webservice

This does not require babel to perform transpiling as later version of node have ES6 support natively, however current version of node used here does not support import so require is being used.

Requires
========

Node v6.9.1

Setup
=====

***Database***

1. Create a directory "database" under your project "node_restful_webservice"
2. Start mongoDB with the following command "mongod -dbpath ./Projects/node_restful_webservice/database" 
3. Open another console and run "mongo"
4. Type "use node_restful_example"
5. Type "db.users.save({name: "example", password: "password", role: "admin"})"
6. Type "db.users.save({name: "tester", password: "password", role: "user"})"
7. Type "db.users.find()" to confirm you see both entries in users doc

Testing
=======

npm test

Running
=======

npm start

### The node server is set to run on

**http://localhost:3000**