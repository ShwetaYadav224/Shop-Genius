const mongoose = require('mongoose')

async function connectDB(){
    try {
        await mongoose.connect(process.env.DATABASE_API)

        const connection = mongoose.connection

        connection.on('connected',()=>{
            console.log("Connect to DB")
        })

        connection.on('error',(error)=>{
            console.log("Something is wrong in mongodb ",error)
        })
    } catch (error) {
        console.log("Something is wrong ",error)
    }
}

module.exports = connectDB