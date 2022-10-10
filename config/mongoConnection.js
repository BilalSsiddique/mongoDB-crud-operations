const { default: mongoose } = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
// Connection URL
const url = "mongodb://localhost:27017/Raheem_Ali_lab4";






// Use connect method to connect to the Server
const dbConnection = async () => {
  try {
    const con = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${con.connection.host} `);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = { dbConnection };
