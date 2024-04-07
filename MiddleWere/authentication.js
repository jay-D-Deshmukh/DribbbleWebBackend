import jwt from "jsonwebtoken";


const isLoggedIn = (req, res, next) => {
    const { token } = req.cookies;
    const tokenDelails = jwt.verify(token,process.env.JWT_PASSWORD);
  
  if (!token || !tokenDelails) {
     res.status(401).send({ auth: false, message: "You are not logged in" });
      
  }

  req.user = tokenDelails;
  next();
};

export default isLoggedIn;
