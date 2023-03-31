const mongoose = require("mongoose");
let DB_URL = process.env.MONGODB_URI;

async function connection() {
    try {
        await mongoose.connect(
            DB_URL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
                autoIndex: true,
            },
            (error) => {
                if (error) return new Error("Failed to connect to database");
                console.log("================💯connected==============");
            }
        );
    } catch (error) {
        console.log(error);
    }
}

module.exports = connection;
