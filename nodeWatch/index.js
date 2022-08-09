const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose.connect(
  "mongodb://root:password123@localhost:27017/usersdb?authSource=admin",
  {
    useNewUrlParser: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const personSchema = new mongoose.Schema({ name: String });
const Person = db.model("Person", personSchema);
Person.watch().on("change", (data) => console.log(new Date(), data));

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
