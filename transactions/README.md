# NodeJS

Project use method Watch of mongo to listen all modified.

# REQ

1. NodeJs
1. Mongoose
1. ExpressJs
1. Running `docker-compose.yml` to start mongodb
1. Config URL connect to mongodb

# Guide

1. Creating a transaction
1. Committing the transaction if it succeeds
1. Aborting the transaction if your operation throws
1. Retrying in the event of a transient transaction error.

# REF

1. [mongoosejs transactions](https://mongoosejs.com/docs/transactions.html)
1. [mongodb docs transactions](https://www.mongodb.com/docs/v6.0/core/transactions/)
1. [fakerjs](https://fakerjs.dev/)
