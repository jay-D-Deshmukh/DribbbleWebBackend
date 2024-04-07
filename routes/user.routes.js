import express from "express";
import { registerUser,loginUser, } from "../cotrollers/user.controllers.js";


const routes = express.Router();

routes.post("/register", registerUser);
routes.post("/login", loginUser);


export default routes;
