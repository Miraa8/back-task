import mongoose from "mongoose";
let db_connection = async()=>{
    await mongoose.connect(process.env.CONNECTION_URL_LOCAL).then(()=>{
        console.log("Data base connected successfully");
    }).catch((err)=>{
        console.log("Data Base Connection Failed", err);
    })
}
export default db_connection;