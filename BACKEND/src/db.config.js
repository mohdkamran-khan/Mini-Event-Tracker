const { default: mongoose } = require("mongoose");

exports.ConnectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB Connected with ${db.connection.host}`.bgRed);
  } catch (error) {
    await mongoose.disconnect();
    console.log("DB Connection Failed");
    process.exit(1);
  }
};
