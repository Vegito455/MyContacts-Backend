const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = mongoose.connect(process.env.CONNECTION_STRING);
    connect.then(data=>{
        // console.log("Database Successfully Connected ---HOST--->", data.connection.host, "---NAME--->" ,data.connection.name);
        console.log("Database Successfully Connected");

    })
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
