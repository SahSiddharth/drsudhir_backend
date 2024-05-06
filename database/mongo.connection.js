const mongoose = require("mongoose")

const dbConnection = () => {
    try {
        mongoose.connect(process.env.MONGO_URI).then((res)=>{
            console.log(`DATABASE CONNECTED.`);
        }).catch(err => {
            throw new Error(err)
        })
    } catch (error) {
        console.log('DATABASE CONNECTION FAILD:: '+error);
    }
}

module.exports = dbConnection