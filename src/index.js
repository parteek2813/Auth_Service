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
    // const newToken = service.createToken({ email: "dummy@gmail.com", id: 1 });
    // console.log("New token is ", newToken);

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImR1bW15QGdtYWlsLmNvbSIsImlkIjoxLCJpYXQiOjE2ODYxMTQ4MDcsImV4cCI6MTY4NjExODQwN30.75bnIoBI-bur53-Jq6H8toX58Kk5FL9WAFrrMO0FpMM";
    const response = service.verifyToken(token);
    console.log(response);
  });
};

prepareStartServer();
