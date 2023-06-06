const express = require("express");

// const { PORT } = require("./config/server-config");
const app = express();

const PORT = 3001;
const prepareStartServer = () => {
  app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
  });
};

prepareStartServer();
