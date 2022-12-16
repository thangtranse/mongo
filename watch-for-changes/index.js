const { faker } = require("@faker-js/faker");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose.connect(
  "mongodb://root:password123@localhost:27017/mongodb?authSource=admin",
  {
    useNewUrlParser: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

const personSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);
const Person = db.model("person", personSchema);
Person.watch().on("change", (data) => {
  console.log(new Date().toLocaleString() + ":", data);
});

// Tự động tạo dữ liệu sau 5s
setInterval(() => {
  const data = new Person({
    fullname: faker.name.firstName(),
    age: faker.datatype.number({ max: 100 }),
    address: faker.address.city(),
  });
  data.save();
}, 5000);

// const changeStream = User.watch();
// changeStream.on('change', (change) => {
//     console.log(change); // You could parse out the needed info and send only that data.
//     io.emit('changeData', change);
// });
// io.on('connection', function () {
//     console.log('connected');
// });

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
