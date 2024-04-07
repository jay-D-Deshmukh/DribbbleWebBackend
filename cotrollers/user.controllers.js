import User from "../models/user.model.js";
import  jwt  from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  try {
    const userdata = req.body;
    const salt = parseInt(process.env.SALT);
    userdata.password = await bcrypt.hash(userdata.password, salt);
    const data = await User.create(userdata);
    res
      .status(200)
      .send({ status: true, message: "User created successfully" });
  } catch (error) {
    console.log("error in registerUser", error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const UserData = await User.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );
    if (!UserData) {
      res.status(401).send({ status: false, message: "Invalid Email" });
      return;
    }
    if (!bcrypt.compare(password, UserData.password)) {
      res.status(401).send({ status: false, message: "Invalid Password" });
      return;
    }

    const jwtToken = await UserData.genarateJWTToken();

    res.cookie("token", jwtToken, {
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });
    
    res.status(200).send({ status: true, message: "Successfully login","token":jwtToken });
  } catch (error) {
    console.log("Error in login ::", error);
  }
  //jwt token genarate
};


