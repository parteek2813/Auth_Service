const express = require("express");
const apiRoutes = require("./routes/index");
const bodyParser = require("body-parser");

// const { PORT } = require("./config/server-config");
const app = express();

const PORT = 3001;
const prepareStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", apiRoutes);

  app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
  });
};

prepareStartServer();
