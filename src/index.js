const express = require("express");
const apiRoutes = require("./routes/index");
const bodyParser = require("body-parser");

// const { User } = require("./models/index");
// const bcrypt = require("bcrypt");
// const UserRepository = require("./repository/user-repository");

// const { PORT } = require("./config/server-config");
const app = express();

const PORT = 3001;
const prepareStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", apiRoutes);

  app.listen(PORT, async () => {
    console.log(`Server started on PORT: ${PORT}`);
    // const repo = new UserRepository();
    // const response = await repo.getById(1);
    // console.log(response);
    // const incomingPassword = "99118822";
    // const user = await User.findByPk(3);
    // const response = bcrypt.compareSync(incomingPassword, user.password);
    // console.log(response);
  });
};

prepareStartServer();
