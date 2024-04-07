import mongoose from "mongoose";

const connectToDatabase = async (url) => {
  try {

    const { connection } = await mongoose.connect(url);
    
    if (connection) {
      console.log(`Database connected at ${url}`);
    }
    
  } catch (error) {

    console.log("dataBase is not connected some thing is error at DBconnection.js ::", erroe);
    
  }
 
};

export default connectToDatabase;