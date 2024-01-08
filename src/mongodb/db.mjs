import "../../env.mjs"
import mongoose from "mongoose"

async function connectDB(){
    await mongoose.connect(process.env.DB_URL)
}
mongoose.connection.on('connected', () => {
    console.log('mongoDB connected')
});
  
mongoose.connection.on('error', err => {
    console.error("connection error", err);
});

export {connectDB}