const express = require("express");
const apiRoutes = require("./routes/index");
const bodyParser = require("body-parser");

const UserService = require("./services/user-services");

// const { PORT } = require("./config/server-config");
const app = express();

const PORT = 3001;
const prepareStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", apiRoutes);

  app.listen(PORT, async () => {
    console.log(`Server started on PORT: ${PORT}`);

    const service = new UserService();
    // const newToken = service.createToken({
    //   email: "newdummy@gmail.com",
    //   id: 1,
    // });
    // console.log("New token is ", newToken);

    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5ld2R1bW15QGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE2ODYxMjI5NTgsImV4cCI6MTY4NjcyNzc1OH0.fuuV-uK_ta4g-E5BYgroiGukICyfTR3eJL5GFIg0LF8";
    // const response = service.verifyToken(token);
    // console.log(response);
  });
};

prepareStartServer();
