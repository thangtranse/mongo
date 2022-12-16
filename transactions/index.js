const { faker } = require("@faker-js/faker");
const express = require("express");
const mongoose = require("mongoose");
const { startSession } = require("mongoose");

const app = express();

app.use(express.json());

mongoose.connect(
  "mongodb://root:password123@localhost:27017/mongodb?authSource=admin",
  {
    useNewUrlParser: true,
  }
);
mongoose.set("strictQuery", true);
const client = mongoose.connection;
client.on("error", console.error.bind(console, "connection error: "));
client.once("open", function () {
  console.log("Connected successfully:", this.name);
});

const personSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

const accountSchema = new mongoose.Schema(
  {
    persional_id: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const UserModel = client.model("user", personSchema);
const AccountModel = client.model("account", accountSchema);

(async () => {
  const session = await startSession();
  try {
    session.startTransaction();

    const objectFakeData = {
      fullname: faker.name.firstName(),
      age: faker.datatype.number({ max: 100 }),
      address: faker.address.city(),
    };
    console.log("Object sẽ được lưu:", JSON.stringify(objectFakeData));

    const createPersonal = await UserModel.create([objectFakeData], {
      session: session,
    });
    console.log("Object đã được lưu", JSON.stringify(createPersonal));
    console.log(
      "Tiến hành tạo Account với ID User vừa tạo",
      createPersonal[0]._id
    );

    await AccountModel.create(
      [
        {
          persional_id: createPersonal[0]._id,
          amount: faker.datatype.number({ max: 10000 }),
        },
      ],
      {
        session: session,
      }
    );

    await session.commitTransaction();
  } catch (error) {
    console.log("Error tất cả sẽ được hủy");
    await session.abortTransaction();
  } finally {
    console.log("Finally");
    await session.endSession();
  }
})();

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
